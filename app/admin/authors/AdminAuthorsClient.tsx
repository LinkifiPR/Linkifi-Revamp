"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Linkedin, Youtube } from "lucide-react";
import type { CmsAuthor, CmsAuthorInput } from "@/lib/cms-types";

type Props = {
  initialAuthors: CmsAuthor[];
  initialError?: string;
};

function makeDefaultAuthor(): CmsAuthorInput {
  return {
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    linkedinUrl: "",
    xUrl: "",
    youtubeUrl: "",
  };
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "AU";
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M18.9 2H21l-6.87 7.85L22.2 22h-6.33l-4.95-7.17L4.62 22H2.5l7.35-8.4L2.1 2h6.48l4.48 6.49L18.9 2Zm-2.22 18h1.75L7.63 3.9H5.76L16.68 20Z" />
    </svg>
  );
}

export default function AdminAuthorsClient({ initialAuthors, initialError = "" }: Props) {
  const [authors, setAuthors] = useState<CmsAuthor[]>(initialAuthors);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(initialAuthors[0]?.id ?? null);
  const [form, setForm] = useState<CmsAuthorInput>(() =>
    initialAuthors[0]
      ? {
          name: initialAuthors[0].name,
          role: initialAuthors[0].role,
          bio: initialAuthors[0].bio,
          imageUrl: initialAuthors[0].imageUrl,
          linkedinUrl: initialAuthors[0].linkedinUrl,
          xUrl: initialAuthors[0].xUrl,
          youtubeUrl: initialAuthors[0].youtubeUrl,
        }
      : makeDefaultAuthor(),
  );
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState("");

  const selectedAuthor = useMemo(
    () => authors.find((author) => author.id === selectedAuthorId) ?? null,
    [authors, selectedAuthorId],
  );

  function loadAuthor(author: CmsAuthor) {
    setSelectedAuthorId(author.id);
    setForm({
      name: author.name,
      role: author.role,
      bio: author.bio,
      imageUrl: author.imageUrl,
      linkedinUrl: author.linkedinUrl,
      xUrl: author.xUrl,
      youtubeUrl: author.youtubeUrl,
    });
    setError("");
    setSuccess("");
  }

  function resetForNewAuthor() {
    setSelectedAuthorId(null);
    setForm(makeDefaultAuthor());
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = selectedAuthorId ? `/api/admin/authors/${selectedAuthorId}` : "/api/admin/authors";
      const method = selectedAuthorId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { author?: CmsAuthor; error?: string };
      if (!response.ok || !payload.author) {
        throw new Error(payload.error || "Could not save author.");
      }

      setAuthors((prev) => {
        if (selectedAuthorId) {
          return prev.map((author) => (author.id === payload.author?.id ? payload.author : author));
        }
        return [payload.author!, ...prev];
      });
      loadAuthor(payload.author);
      setSuccess(selectedAuthorId ? "Author updated." : "Author created.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not save author.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedAuthorId) {
      return;
    }

    const confirmed = window.confirm("Delete this author? Posts and case studies will lose the author assignment.");
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/admin/authors/${selectedAuthorId}`, { method: "DELETE" });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not delete author.");
      }

      setAuthors((prev) => prev.filter((author) => author.id !== selectedAuthorId));
      resetForNewAuthor();
      setSuccess("Author deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete author.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080a15] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-4xl font-display font-bold">Authors</h1>
            <p className="mt-2 text-sm text-[#c8cdf0]">
              Manage author bios, photos, and social links for blog posts and case studies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/content"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Content
            </Link>
            <button
              type="button"
              onClick={resetForNewAuthor}
              className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              New Author
            </button>
          </div>
        </header>

        <div className="mt-8 grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <section className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Author Directory</h2>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">
                {authors.length} total
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {authors.length > 0 ? (
                authors.map((author) => (
                  <button
                    key={author.id}
                    type="button"
                    onClick={() => loadAuthor(author)}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                      selectedAuthorId === author.id
                        ? "border-[#8f7bff]/55 bg-[#8f7bff]/12"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {author.imageUrl ? (
                      <img
                        src={author.imageUrl}
                        alt={author.name}
                        className="h-12 w-12 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#171b34] text-sm font-semibold text-[#efe9ff]">
                        {getInitials(author.name)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-white">{author.name}</p>
                      <p className="truncate text-xs text-[#b8bfe8]">{author.role || "No role set"}</p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#b8bfe8]">
                  No authors yet. Create the first one.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#aeb5e5]">
                  {selectedAuthor ? "Editing Author" : "Create Author"}
                </p>
                <h2 className="mt-2 text-2xl font-display font-bold">
                  {selectedAuthor ? selectedAuthor.name : "New Author Profile"}
                </h2>
              </div>

              {selectedAuthor ? (
                <div className="flex items-center gap-3">
                  {selectedAuthor.imageUrl ? (
                    <img
                      src={selectedAuthor.imageUrl}
                      alt={selectedAuthor.name}
                      className="h-16 w-16 rounded-3xl object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#171b34] text-lg font-semibold text-[#efe9ff]">
                      {getInitials(selectedAuthor.name)}
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1.5 text-sm">
                  <span className="text-[#d0d4f2]">Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                  />
                </label>

                <label className="space-y-1.5 text-sm">
                  <span className="text-[#d0d4f2]">Role / Title</span>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
                    className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                  />
                </label>
              </div>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Image URL</span>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(event) => setForm((prev) => ({ ...prev, imageUrl: event.target.value.trim() }))}
                  placeholder="https://... or /api/media/..."
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Bio</span>
                <textarea
                  rows={4}
                  value={form.bio}
                  onChange={(event) => setForm((prev) => ({ ...prev, bio: event.target.value }))}
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-1.5 text-sm">
                  <span className="text-[#d0d4f2]">LinkedIn</span>
                  <input
                    type="url"
                    value={form.linkedinUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, linkedinUrl: event.target.value.trim() }))}
                    className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                  />
                </label>

                <label className="space-y-1.5 text-sm">
                  <span className="text-[#d0d4f2]">X</span>
                  <input
                    type="url"
                    value={form.xUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, xUrl: event.target.value.trim() }))}
                    className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                  />
                </label>

                <label className="space-y-1.5 text-sm">
                  <span className="text-[#d0d4f2]">YouTube</span>
                  <input
                    type="url"
                    value={form.youtubeUrl}
                    onChange={(event) => setForm((prev) => ({ ...prev, youtubeUrl: event.target.value.trim() }))}
                    className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                  />
                </label>
              </div>

              {error ? <p className="text-sm text-[#ff9fb2]">{error}</p> : null}
              {success ? <p className="text-sm text-[#b2f0c8]">{success}</p> : null}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#6b57e6] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a47ce] disabled:opacity-60"
                >
                  {saving ? "Saving..." : selectedAuthor ? "Update Author" : "Create Author"}
                </button>

                {selectedAuthor ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-full border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-5 py-2.5 text-sm font-semibold text-[#ffd3dd] disabled:opacity-60"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                ) : null}
              </div>
            </form>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#aeb5e5]">Social Preview</p>
              <div className="mt-4 flex items-center gap-3 text-[#dbe0ff]">
                {form.linkedinUrl ? (
                  <a href={form.linkedinUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-2 hover:bg-white/10">
                    <Linkedin className="h-4 w-4" />
                  </a>
                ) : null}
                {form.xUrl ? (
                  <a href={form.xUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-2 hover:bg-white/10">
                    <XIcon />
                  </a>
                ) : null}
                {form.youtubeUrl ? (
                  <a href={form.youtubeUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-2 hover:bg-white/10">
                    <Youtube className="h-4 w-4" />
                  </a>
                ) : null}
                {!form.linkedinUrl && !form.xUrl && !form.youtubeUrl ? (
                  <span className="text-sm text-[#b8bfe8]">Add social URLs to show author icons on published content.</span>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
