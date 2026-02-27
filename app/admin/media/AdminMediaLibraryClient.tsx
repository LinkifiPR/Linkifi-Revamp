"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { CmsMedia } from "@/lib/cms-types";

type Props = {
  initialMedia: CmsMedia[];
  initialError?: string;
};

export default function AdminMediaLibraryClient({ initialMedia, initialError = "" }: Props) {
  const [media, setMedia] = useState<CmsMedia[]>(initialMedia);
  const [error, setError] = useState(initialError);
  const [uploading, setUploading] = useState(false);
  const [uploadAlt, setUploadAlt] = useState("");

  async function refreshMedia() {
    const response = await fetch("/api/admin/media?limit=250", { cache: "no-store" });
    const payload = (await response.json()) as { media?: CmsMedia[]; error?: string };
    if (!response.ok) {
      throw new Error(payload.error || "Could not load media.");
    }
    setMedia(payload.media || []);
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const fileInput = formElement.elements.namedItem("file") as HTMLInputElement | null;
    const file = fileInput?.files?.[0];

    if (!file) {
      setError("Choose an image first.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", uploadAlt);

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Upload failed.");
      }

      setUploadAlt("");
      formElement.reset();
      await refreshMedia();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function copyUrl(id: string) {
    const value = `${window.location.origin}/api/media/${id}`;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      setError("Could not copy URL to clipboard.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080a15] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-4xl font-display font-bold">Media Library</h1>
            <p className="mt-2 text-[#c8cdf0] text-sm">
              Upload images and copy stable URLs for featured images and content blocks.
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
              className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              Content Manager
            </Link>
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
          <h2 className="text-lg font-semibold">Upload New Image</h2>
          <form onSubmit={handleUpload} className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <input
              type="file"
              name="file"
              accept="image/*"
              className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white file:mr-3 file:rounded-lg file:border-0 file:bg-[#5A4DBF] file:px-3 file:py-1.5 file:text-white"
            />
            <input
              type="text"
              value={uploadAlt}
              onChange={(event) => setUploadAlt(event.target.value)}
              placeholder="Alt text (optional)"
              className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white"
            />
            <button
              type="submit"
              disabled={uploading}
              className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
          {error ? (
            <p className="mt-3 rounded-xl border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-3 py-2 text-sm text-[#ffd3dd]">
              {error}
            </p>
          ) : null}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {media.map((item) => (
            <article key={item.id} className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <img
                src={`/api/media/${item.id}`}
                alt={item.alt || item.filename}
                className="h-44 w-full rounded-xl border border-white/10 bg-[#11142a] object-cover"
                loading="lazy"
              />
              <p className="mt-3 truncate text-sm font-semibold text-white">{item.filename}</p>
              <p className="mt-1 text-xs text-[#b8bfe8]">{Math.round(item.sizeBytes / 1024)} KB</p>
              <p className="mt-1 text-xs text-[#b8bfe8] truncate">Alt: {item.alt || "(empty)"}</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void copyUrl(item.id)}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10"
                >
                  Copy URL
                </button>
                <a
                  href={`/api/media/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#8f7bff]/50 bg-[#8f7bff]/15 px-3 py-1.5 text-xs text-white hover:bg-[#8f7bff]/25"
                >
                  Open
                </a>
              </div>
            </article>
          ))}
          {media.length === 0 ? (
            <p className="text-sm text-[#b8bfe8]">No uploads yet.</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
