"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import RichTextEditor from "@/app/admin/content/RichTextEditor";
import type { CmsBlock, CmsEntry, CmsEntryInput } from "@/lib/cms-types";
import { slugifyCmsValue } from "@/lib/cms-types";

type Props = {
  mode: "create" | "edit";
  entryId?: string;
  initialEntry?: CmsEntry;
};

const BLOCK_TYPES: Array<{ type: CmsBlock["type"]; label: string }> = [
  { type: "image", label: "Image" },
  { type: "faq", label: "FAQ" },
  { type: "table", label: "Table" },
];

function makeDefaultInput(): CmsEntryInput {
  return {
    type: "blog",
    status: "draft",
    title: "",
    slug: "",
    excerpt: "",
    bodyHtml: "",
    content: [],
    featuredImageUrl: "",
    featuredImageAlt: "",
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    noindex: false,
    publishedAt: "",
  };
}

function entryToInput(entry: CmsEntry): CmsEntryInput {
  return {
    type: entry.type,
    status: entry.status,
    title: entry.title,
    slug: entry.slug,
    excerpt: entry.excerpt,
    bodyHtml: entry.bodyHtml || "",
    content: entry.content,
    featuredImageUrl: entry.featuredImageUrl,
    featuredImageAlt: entry.featuredImageAlt,
    seoTitle: entry.seoTitle,
    seoDescription: entry.seoDescription,
    canonicalUrl: entry.canonicalUrl,
    noindex: entry.noindex,
    publishedAt: entry.publishedAt ?? "",
  };
}

function createBlock(type: CmsBlock["type"]): CmsBlock {
  switch (type) {
    case "heading":
      return { type: "heading", level: 2, text: "" };
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "image":
      return { type: "image", src: "", alt: "", caption: "" };
    case "faq":
      return { type: "faq", question: "", answer: "" };
    case "table":
      return {
        type: "table",
        caption: "",
        headers: ["Column 1", "Column 2"],
        rows: [["", ""]],
      };
    case "quote":
      return { type: "quote", text: "", cite: "" };
    case "list":
      return { type: "list", ordered: false, items: [""] };
    default:
      return { type: "paragraph", text: "" };
  }
}

function buildPreviewPath(type: CmsEntryInput["type"], slug: string): string {
  const cleanedSlug = slugifyCmsValue(slug);
  if (!cleanedSlug) {
    return "";
  }

  if (type === "blog") {
    return `/admin/preview/blog/${cleanedSlug}`;
  }

  if (type === "case-study") {
    return `/admin/preview/case-studies/${cleanedSlug}`;
  }

  return `/admin/preview/pages/${cleanedSlug}`;
}

function toDateInputValue(value: string): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const iso = date.toISOString();
  return iso.slice(0, 16);
}

function normalizeDateInput(value: string): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString();
}

function parseListItems(value: string): string[] {
  const items = value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : [""];
}

function parseTableHeaders(value: string): string[] {
  const headers = value
    .split(",")
    .map((header) => header.trim())
    .filter(Boolean);
  return headers.length > 0 ? headers : ["Column 1"];
}

function parseTableRows(value: string, headerCount: number): string[][] {
  const rows = value
    .split("\n")
    .map((line) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .slice(0, headerCount),
    )
    .map((row) => {
      const normalized = [...row];
      while (normalized.length < headerCount) {
        normalized.push("");
      }
      return normalized;
    })
    .filter((row) => row.some((cell) => cell.length > 0));

  return rows.length > 0 ? rows : [Array.from({ length: headerCount }, () => "")];
}

function formatTableRows(rows: string[][]): string {
  return rows.map((row) => row.join(" | ")).join("\n");
}

export default function CmsEntryEditor({ mode, entryId, initialEntry }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<CmsEntryInput>(() =>
    initialEntry ? entryToInput(initialEntry) : makeDefaultInput(),
  );
  const [slugDirty, setSlugDirty] = useState(Boolean(initialEntry));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const previewPath = useMemo(() => buildPreviewPath(form.type, form.slug), [form.type, form.slug]);

  function updateBlock(index: number, updater: (block: CmsBlock) => CmsBlock) {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, blockIndex) =>
        blockIndex === index ? updater(block) : block,
      ),
    }));
  }

  function moveBlock(index: number, direction: "up" | "down") {
    setForm((prev) => {
      const next = [...prev.content];
      const target = direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target >= next.length) {
        return prev;
      }

      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);

      return {
        ...prev,
        content: next,
      };
    });
  }

  async function uploadImage(index: number, file: File) {
    setUploadingIndex(index);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const currentBlock = form.content[index];
      if (currentBlock && currentBlock.type === "image" && currentBlock.alt) {
        formData.append("alt", currentBlock.alt);
      }

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Upload failed.");
      }

      updateBlock(index, (block) => {
        if (block.type !== "image") {
          return block;
        }

        return {
          ...block,
          src: payload.url || block.src,
          alt: block.alt || file.name,
        };
      });
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploadingIndex(null);
    }
  }

  async function uploadFeaturedImage(file: File) {
    setUploadingFeatured(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (form.featuredImageAlt) {
        formData.append("alt", form.featuredImageAlt);
      }

      const response = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { error?: string; url?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Upload failed.");
      }

      setForm((prev) => ({
        ...prev,
        featuredImageUrl: payload.url || prev.featuredImageUrl,
        featuredImageAlt: prev.featuredImageAlt || file.name,
      }));
      setSuccess("Featured image uploaded.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploadingFeatured(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload: CmsEntryInput = {
      ...form,
      slug: slugifyCmsValue(form.slug || form.title),
      publishedAt: normalizeDateInput(form.publishedAt),
    };

    const endpoint = mode === "create" ? "/api/admin/content" : `/api/admin/content/${entryId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { entry?: CmsEntry; error?: string };
      if (!response.ok || !result.entry) {
        throw new Error(result.error || "Save failed.");
      }

      setForm(entryToInput(result.entry));
      setSuccess("Saved successfully.");

      if (mode === "create") {
        router.replace(`/admin/content/${result.entry.id}`);
        router.refresh();
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!entryId || mode !== "edit") {
      return;
    }

    const confirmed = window.confirm("Delete this entry permanently?");
    if (!confirmed) {
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/content/${entryId}`, { method: "DELETE" });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Delete failed.");
      }

      router.push("/admin/content");
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080a15] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-display font-bold">
              {mode === "create" ? "Create Content" : "Edit Content"}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/content"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Back to Content
            </Link>
            {previewPath ? (
              <Link
                href={previewPath}
                target="_blank"
                className="rounded-full border border-[#8f7bff]/55 bg-[#8f7bff]/15 px-4 py-2 text-sm text-white hover:bg-[#8f7bff]/25 transition-colors"
              >
                Open Preview
              </Link>
            ) : null}
          </div>
        </header>

        <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-6">
          <section className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Core Settings</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Type</span>
                <select
                  value={form.type}
                  onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as CmsEntryInput["type"] }))}
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                >
                  <option value="blog">Blog</option>
                  <option value="case-study">Case Study</option>
                  <option value="page">Page</option>
                </select>
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Status</span>
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, status: event.target.value as CmsEntryInput["status"] }))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>

              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="text-[#d0d4f2]">Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    setForm((prev) => ({
                      ...prev,
                      title: nextTitle,
                      slug: slugDirty ? prev.slug : slugifyCmsValue(nextTitle),
                    }));
                  }}
                  required
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="text-[#d0d4f2]">Slug</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugDirty(true);
                    setForm((prev) => ({ ...prev, slug: slugifyCmsValue(event.target.value) }));
                  }}
                  required
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm md:col-span-2">
                <span className="text-[#d0d4f2]">Excerpt</span>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(event) => setForm((prev) => ({ ...prev, excerpt: event.target.value }))}
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Featured Image URL</span>
                <input
                  type="text"
                  value={form.featuredImageUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, featuredImageUrl: event.target.value.trim() }))
                  }
                  placeholder="https://... or /api/media/..."
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void uploadFeaturedImage(file);
                    }
                  }}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white file:mr-3 file:rounded-lg file:border-0 file:bg-[#5A4DBF] file:px-3 file:py-1.5 file:text-white"
                />
                <p className="text-xs text-[#8f95be]">
                  {uploadingFeatured
                    ? "Uploading featured image..."
                    : "Upload stores image in CMS DB and fills the URL automatically."}
                </p>
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Featured Image Alt Text</span>
                <input
                  type="text"
                  value={form.featuredImageAlt}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, featuredImageAlt: event.target.value }))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Publish Date (optional)</span>
                <input
                  type="datetime-local"
                  value={toDateInputValue(form.publishedAt)}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, publishedAt: normalizeDateInput(event.target.value) }))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="flex items-center gap-3 text-sm pt-7">
                <input
                  type="checkbox"
                  checked={form.noindex}
                  onChange={(event) => setForm((prev) => ({ ...prev, noindex: event.target.checked }))}
                  className="h-4 w-4 rounded border-white/30 bg-[#11142a]"
                />
                <span className="text-[#d0d4f2]">Noindex this page</span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Main Writing</h2>
            <p className="mt-2 text-sm text-[#b8bfe8]">
              Write normal content here. Use heading and link tools inline. Blocks below are now
              only for structured components like images, FAQs, and tables.
            </p>
            <div className="mt-4">
              <RichTextEditor
                value={form.bodyHtml}
                onChange={(nextHtml) => setForm((prev) => ({ ...prev, bodyHtml: nextHtml }))}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">SEO Settings</h2>
            <div className="mt-4 grid gap-4">
              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">SEO Title</span>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(event) => setForm((prev) => ({ ...prev, seoTitle: event.target.value }))}
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">SEO Description</span>
                <textarea
                  rows={3}
                  value={form.seoDescription}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, seoDescription: event.target.value }))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>

              <label className="space-y-1.5 text-sm">
                <span className="text-[#d0d4f2]">Canonical URL</span>
                <input
                  type="url"
                  value={form.canonicalUrl}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, canonicalUrl: event.target.value.trim() }))
                  }
                  className="w-full rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-white"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold">Content Blocks</h2>
              <div className="flex flex-wrap gap-2">
                {BLOCK_TYPES.map((blockType) => (
                  <button
                    key={blockType.type}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        content: [...prev.content, createBlock(blockType.type)],
                      }))
                    }
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                  >
                    + {blockType.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {form.content.map((block, index) => (
                <article key={`${block.type}-${index}`} className="rounded-2xl border border-white/15 bg-[#0f1328] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">{block.type}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "up")}
                        className="rounded-md border border-white/20 px-2 py-1 text-xs"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "down")}
                        className="rounded-md border border-white/20 px-2 py-1 text-xs"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            content: prev.content.filter((_, blockIndex) => blockIndex !== index),
                          }))
                        }
                        className="rounded-md border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-2 py-1 text-xs text-[#ffd3dd]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-3 text-sm">
                    {block.type === "heading" ? (
                      <>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Heading Level</span>
                          <select
                            value={block.level}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "heading"
                                  ? { ...current, level: Number(event.target.value) as 2 | 3 | 4 }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          >
                            <option value={2}>H2</option>
                            <option value={3}>H3</option>
                            <option value={4}>H4</option>
                          </select>
                        </label>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Text</span>
                          <input
                            type="text"
                            value={block.text}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "heading"
                                  ? { ...current, text: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                      </>
                    ) : null}

                    {block.type === "paragraph" ? (
                      <label className="space-y-1.5 block">
                        <span className="text-[#d0d4f2]">Paragraph Text</span>
                        <textarea
                          rows={5}
                          value={block.text}
                          onChange={(event) =>
                            updateBlock(index, (current) =>
                              current.type === "paragraph"
                                ? { ...current, text: event.target.value }
                                : current,
                            )
                          }
                          className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                        />
                      </label>
                    ) : null}

                    {block.type === "image" ? (
                      <>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Image URL</span>
                          <input
                            type="text"
                            value={block.src}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "image"
                                  ? { ...current, src: event.target.value.trim() }
                                  : current,
                              )
                            }
                            placeholder="https://... or /api/media/..."
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>

                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Alt Text</span>
                          <input
                            type="text"
                            value={block.alt}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "image"
                                  ? { ...current, alt: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>

                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Caption</span>
                          <input
                            type="text"
                            value={block.caption || ""}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "image"
                                  ? { ...current, caption: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>

                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                void uploadImage(index, file);
                              }
                            }}
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white file:mr-3 file:rounded-lg file:border-0 file:bg-[#5A4DBF] file:px-3 file:py-1.5 file:text-white"
                          />
                          {uploadingIndex === index ? (
                            <p className="text-xs text-[#b7bcdf]">Uploading...</p>
                          ) : (
                            <p className="text-xs text-[#8f95be]">
                              Upload stores image in CMS DB and returns a stable `/api/media/...` URL.
                            </p>
                          )}
                        </label>
                      </>
                    ) : null}

                    {block.type === "faq" ? (
                      <>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Question</span>
                          <input
                            type="text"
                            value={block.question}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "faq"
                                  ? { ...current, question: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Answer</span>
                          <textarea
                            rows={4}
                            value={block.answer}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "faq"
                                  ? { ...current, answer: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                      </>
                    ) : null}

                    {block.type === "table" ? (
                      <>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Caption</span>
                          <input
                            type="text"
                            value={block.caption || ""}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "table"
                                  ? { ...current, caption: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Headers (comma-separated)</span>
                          <input
                            type="text"
                            value={block.headers.join(", ")}
                            onChange={(event) =>
                              updateBlock(index, (current) => {
                                if (current.type !== "table") {
                                  return current;
                                }
                                const headers = parseTableHeaders(event.target.value);
                                const rows = current.rows.map((row) => {
                                  const nextRow = [...row];
                                  while (nextRow.length < headers.length) {
                                    nextRow.push("");
                                  }
                                  return nextRow.slice(0, headers.length);
                                });
                                return {
                                  ...current,
                                  headers,
                                  rows,
                                };
                              })
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Rows (one row per line, cells separated by |)</span>
                          <textarea
                            rows={5}
                            value={formatTableRows(block.rows)}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "table"
                                  ? {
                                      ...current,
                                      rows: parseTableRows(event.target.value, current.headers.length),
                                    }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                      </>
                    ) : null}

                    {block.type === "quote" ? (
                      <>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Quote</span>
                          <textarea
                            rows={4}
                            value={block.text}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "quote"
                                  ? { ...current, text: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Citation</span>
                          <input
                            type="text"
                            value={block.cite || ""}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "quote"
                                  ? { ...current, cite: event.target.value }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                      </>
                    ) : null}

                    {block.type === "list" ? (
                      <>
                        <label className="flex items-center gap-3 text-sm pt-1">
                          <input
                            type="checkbox"
                            checked={block.ordered}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "list"
                                  ? { ...current, ordered: event.target.checked }
                                  : current,
                              )
                            }
                            className="h-4 w-4 rounded border-white/30 bg-[#11142a]"
                          />
                          <span className="text-[#d0d4f2]">Ordered list</span>
                        </label>
                        <label className="space-y-1.5 block">
                          <span className="text-[#d0d4f2]">Items (one per line)</span>
                          <textarea
                            rows={5}
                            value={block.items.join("\n")}
                            onChange={(event) =>
                              updateBlock(index, (current) =>
                                current.type === "list"
                                  ? { ...current, items: parseListItems(event.target.value) }
                                  : current,
                              )
                            }
                            className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                          />
                        </label>
                      </>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {BLOCK_TYPES.map((blockType) => (
                <button
                  key={`bottom-${blockType.type}`}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      content: [...prev.content, createBlock(blockType.type)],
                    }))
                  }
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
                >
                  + {blockType.label}
                </button>
              ))}
            </div>
          </section>

          {error ? <p className="text-sm text-[#ff9fb2]">{error}</p> : null}
          {success ? <p className="text-sm text-[#b2f0c8]">{success}</p> : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#6b57e6] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a47ce] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Content"}
            </button>

            {mode === "edit" ? (
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
      </div>
    </main>
  );
}
