"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import RichTextEditor from "@/app/admin/content/RichTextEditor";
import type { CmsBlock, CmsEntry, CmsEntryInput, CmsMedia } from "@/lib/cms-types";
import { slugifyCmsValue } from "@/lib/cms-types";

type Props = {
  mode: "create" | "edit";
  entryId?: string;
  initialEntry?: CmsEntry;
};

type StructuredBlockType = "image" | "faq" | "table";
type StructuredCmsBlock = Extract<CmsBlock, { type: StructuredBlockType }> & { id: string };

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

function makeBlockId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createBlock(type: StructuredBlockType): CmsBlock {
  switch (type) {
    case "image":
      return { id: makeBlockId(), type: "image", src: "", alt: "", caption: "", align: "center" };
    case "faq":
      return { id: makeBlockId(), type: "faq", question: "", answer: "" };
    case "table":
      return {
        id: makeBlockId(),
        type: "table",
        caption: "",
        headers: ["Column 1", "Column 2"],
        rows: [["", ""]],
      };
    default:
      return { id: makeBlockId(), type: "image", src: "", alt: "", caption: "", align: "center" };
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

function getStructuredBlockLabel(type: StructuredBlockType): string {
  if (type === "image") {
    return "Image Block";
  }
  if (type === "faq") {
    return "FAQ Block";
  }
  return "Table Block";
}

function isStructuredBlock(block: CmsBlock): block is StructuredCmsBlock {
  return (
    (block.type === "image" || block.type === "faq" || block.type === "table") &&
    typeof block.id === "string" &&
    block.id.length > 0
  );
}

function extractBlockTokenIds(html: string): string[] {
  const ids: string[] = [];
  const seen = new Set<string>();
  const regex = /data-cms-block-id=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null = regex.exec(html);

  while (match) {
    const id = match[1];
    if (!seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
    match = regex.exec(html);
  }

  return ids;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeBlockTokenFromHtml(html: string, blockId: string): string {
  const escapedId = escapeRegex(blockId);
  const wrappedTokenPattern = new RegExp(
    `<p[^>]*>\\s*<span[^>]*data-cms-block-id=["']${escapedId}["'][^>]*>[\\s\\S]*?<\\/span>\\s*<\\/p>`,
    "gi",
  );
  const bareTokenPattern = new RegExp(
    `<span[^>]*data-cms-block-id=["']${escapedId}["'][^>]*>[\\s\\S]*?<\\/span>`,
    "gi",
  );

  return html
    .replace(wrappedTokenPattern, "")
    .replace(bareTokenPattern, "")
    .replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, "<p><br></p>");
}

function buildStructuredTokenMarkup(block: StructuredCmsBlock): string {
  return `<p><span data-cms-block-id="${block.id}" data-cms-block-type="${block.type}" contenteditable="false" class="cms-inline-block-token">${getStructuredBlockLabel(block.type)}</span></p><p><br></p>`;
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
  const [selectedStructuredBlockId, setSelectedStructuredBlockId] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<CmsMedia[]>([]);
  const [mediaLibraryLoaded, setMediaLibraryLoaded] = useState(false);
  const [mediaLibraryLoading, setMediaLibraryLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const previewPath = useMemo(() => buildPreviewPath(form.type, form.slug), [form.type, form.slug]);
  const canOpenFullPreview = mode === "edit" && Boolean(previewPath);
  const inlineStructuredBlockIds = useMemo(() => extractBlockTokenIds(form.bodyHtml || ""), [form.bodyHtml]);
  const inlineStructuredBlockIdSet = useMemo(
    () => new Set(inlineStructuredBlockIds),
    [inlineStructuredBlockIds],
  );
  const contentById = useMemo(
    () =>
      new Map(
        form.content
          .filter((block) => typeof block.id === "string" && block.id.length > 0)
          .map((block) => [block.id as string, block]),
      ),
    [form.content],
  );
  const inlineStructuredBlocks = useMemo(
    () =>
      inlineStructuredBlockIds.flatMap((blockId) => {
        const block = contentById.get(blockId);
        return block && isStructuredBlock(block) ? [block] : [];
      }),
    [contentById, inlineStructuredBlockIds],
  );
  const detachedStructuredBlocks = useMemo(
    () =>
      form.content.filter(
        (block): block is StructuredCmsBlock =>
          isStructuredBlock(block) && !inlineStructuredBlockIdSet.has(block.id),
      ),
    [form.content, inlineStructuredBlockIdSet],
  );
  const selectedStructuredBlockIndex = useMemo(
    () =>
      selectedStructuredBlockId
        ? form.content.findIndex((block) => block.id === selectedStructuredBlockId)
        : -1,
    [form.content, selectedStructuredBlockId],
  );
  const selectedStructuredBlock =
    selectedStructuredBlockIndex >= 0 && isStructuredBlock(form.content[selectedStructuredBlockIndex])
      ? form.content[selectedStructuredBlockIndex]
      : null;

  useEffect(() => {
    if (!selectedStructuredBlockId) {
      return;
    }

    if (selectedStructuredBlock) {
      return;
    }

    if (inlineStructuredBlocks.length === 0) {
      setSelectedStructuredBlockId(null);
      return;
    }

    setSelectedStructuredBlockId(inlineStructuredBlocks[0].id);
  }, [inlineStructuredBlocks, selectedStructuredBlock, selectedStructuredBlockId]);

  useEffect(() => {
    if (selectedStructuredBlock?.type !== "image" || mediaLibraryLoaded || mediaLibraryLoading) {
      return;
    }

    let cancelled = false;

    async function loadMediaLibrary() {
      setMediaLibraryLoading(true);

      try {
        const response = await fetch("/api/admin/media?limit=24", { cache: "no-store" });
        const payload = (await response.json()) as { media?: CmsMedia[]; error?: string };

        if (!response.ok) {
          throw new Error(payload.error || "Could not load media library.");
        }

        if (!cancelled) {
          setMediaLibrary(payload.media || []);
          setMediaLibraryLoaded(true);
        }
      } catch (mediaError) {
        if (!cancelled) {
          setError(mediaError instanceof Error ? mediaError.message : "Could not load media library.");
        }
      } finally {
        if (!cancelled) {
          setMediaLibraryLoading(false);
        }
      }
    }

    void loadMediaLibrary();

    return () => {
      cancelled = true;
    };
  }, [mediaLibraryLoaded, mediaLibraryLoading, selectedStructuredBlock]);

  function updateBlock(index: number, updater: (block: CmsBlock) => CmsBlock) {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, blockIndex) =>
        blockIndex === index ? updater(block) : block,
      ),
    }));
  }

  function createStructuredBlockForEditor(type: StructuredBlockType) {
    const nextBlock = createBlock(type);
    if (!isStructuredBlock(nextBlock)) {
      return null;
    }

    setForm((prev) => ({
      ...prev,
      content: [...prev.content, nextBlock],
    }));
    setSelectedStructuredBlockId(nextBlock.id);

    return {
      id: nextBlock.id,
      type,
      label: getStructuredBlockLabel(type),
    };
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
            {canOpenFullPreview ? (
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
              Use the toolbar for full formatting, insert structured elements at the cursor, and
              edit the selected insert inside this same writing area.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              {canOpenFullPreview ? (
                <Link
                  href={previewPath}
                  target="_blank"
                  className="rounded-full border border-[#8f7bff]/55 bg-[#8f7bff]/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#8f7bff]/25 transition-colors"
                >
                  Open Draft Preview
                </Link>
              ) : previewPath ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-[#b8bfe8]">
                  Save once to enable draft preview
                </span>
              ) : null}
            </div>
            <div className="mt-4">
              <RichTextEditor
                value={form.bodyHtml}
                onChange={(nextHtml) => setForm((prev) => ({ ...prev, bodyHtml: nextHtml }))}
                onInsertStructuredBlock={createStructuredBlockForEditor}
                onSelectStructuredBlock={setSelectedStructuredBlockId}
                selectedStructuredBlockId={selectedStructuredBlockId}
                contextPanel={
                  selectedStructuredBlock ? (
                    <div className="space-y-3 text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">
                            Block Settings
                          </p>
                          <p className="mt-1 font-semibold text-white">
                            {getStructuredBlockLabel(selectedStructuredBlock.type)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const blockId = selectedStructuredBlock.id;
                            setForm((prev) => ({
                              ...prev,
                              bodyHtml: removeBlockTokenFromHtml(prev.bodyHtml || "", blockId),
                              content: prev.content.filter((block) => block.id !== blockId),
                            }));
                            setSelectedStructuredBlockId(null);
                          }}
                          className="rounded-full border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-3 py-1.5 text-xs font-semibold text-[#ffd3dd]"
                        >
                          Remove Insert
                        </button>
                      </div>

                      {selectedStructuredBlock.type === "image" ? (
                        <div className="grid gap-3">
                          <label className="space-y-1.5 block">
                            <span className="text-[#d0d4f2]">Image URL</span>
                            <input
                              type="text"
                              value={selectedStructuredBlock.src}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
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
                              value={selectedStructuredBlock.alt}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
                                  current.type === "image"
                                    ? { ...current, alt: event.target.value }
                                    : current,
                                )
                              }
                              className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                            />
                          </label>

                          <label className="space-y-1.5 block">
                            <span className="text-[#d0d4f2]">Alignment</span>
                            <select
                              value={selectedStructuredBlock.align || "center"}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
                                  current.type === "image"
                                    ? {
                                        ...current,
                                        align: event.target.value as "left" | "center" | "right" | "full",
                                      }
                                    : current,
                                )
                              }
                              className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                            >
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                              <option value="full">Full Width</option>
                            </select>
                          </label>

                          <label className="space-y-1.5 block">
                            <span className="text-[#d0d4f2]">Caption</span>
                            <input
                              type="text"
                              value={selectedStructuredBlock.caption || ""}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
                                  current.type === "image"
                                    ? { ...current, caption: event.target.value }
                                    : current,
                                )
                              }
                              className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                            />
                          </label>

                          <label className="space-y-1.5 block">
                            <span className="text-[#d0d4f2]">Upload New Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                  void uploadImage(selectedStructuredBlockIndex, file);
                                }
                              }}
                              className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white file:mr-3 file:rounded-lg file:border-0 file:bg-[#5A4DBF] file:px-3 file:py-1.5 file:text-white"
                            />
                            {uploadingIndex === selectedStructuredBlockIndex ? (
                              <p className="text-xs text-[#b7bcdf]">Uploading...</p>
                            ) : (
                              <p className="text-xs text-[#8f95be]">
                                Upload or select an existing asset from the media library below.
                              </p>
                            )}
                          </label>

                          <div className="space-y-2">
                            <p className="text-[#d0d4f2]">Choose From Media Library</p>
                            {mediaLibraryLoading ? (
                              <p className="text-xs text-[#8f95be]">Loading media library...</p>
                            ) : mediaLibrary.length > 0 ? (
                              <div className="grid gap-2 sm:grid-cols-2">
                                {mediaLibrary.map((item) => {
                                  const mediaUrl = `/api/media/${item.id}`;
                                  return (
                                    <button
                                      key={item.id}
                                      type="button"
                                      onClick={() =>
                                        updateBlock(selectedStructuredBlockIndex, (current) =>
                                          current.type === "image"
                                            ? {
                                                ...current,
                                                src: mediaUrl,
                                                alt: current.alt || item.alt || item.filename,
                                              }
                                            : current,
                                        )
                                      }
                                      className={`overflow-hidden rounded-xl border text-left transition-colors ${
                                        selectedStructuredBlock.src === mediaUrl
                                          ? "border-[#8f7bff]/60 bg-[#8f7bff]/10"
                                          : "border-white/10 bg-white/5 hover:bg-white/10"
                                      }`}
                                    >
                                      <img
                                        src={mediaUrl}
                                        alt={item.alt || item.filename}
                                        className="h-20 w-full object-cover"
                                        loading="lazy"
                                      />
                                      <span className="block truncate px-2 py-1.5 text-[11px] text-[#d8ddff]">
                                        {item.filename}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-xs text-[#8f95be]">No uploaded media yet.</p>
                            )}
                          </div>
                        </div>
                      ) : null}

                      {selectedStructuredBlock.type === "faq" ? (
                        <div className="space-y-3">
                          <label className="space-y-1.5 block">
                            <span className="text-[#d0d4f2]">Question</span>
                            <input
                              type="text"
                              value={selectedStructuredBlock.question}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
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
                              value={selectedStructuredBlock.answer}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
                                  current.type === "faq"
                                    ? { ...current, answer: event.target.value }
                                    : current,
                                )
                              }
                              className="w-full rounded-xl border border-white/20 bg-[#151a35] px-3 py-2 text-white"
                            />
                          </label>
                        </div>
                      ) : null}

                      {selectedStructuredBlock.type === "table" ? (
                        <div className="space-y-3">
                          <label className="space-y-1.5 block">
                            <span className="text-[#d0d4f2]">Caption</span>
                            <input
                              type="text"
                              value={selectedStructuredBlock.caption || ""}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
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
                              value={selectedStructuredBlock.headers.join(", ")}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) => {
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
                              value={formatTableRows(selectedStructuredBlock.rows)}
                              onChange={(event) =>
                                updateBlock(selectedStructuredBlockIndex, (current) =>
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
                        </div>
                      ) : null}
                    </div>
                  ) : inlineStructuredBlocks.length > 0 ? (
                    <p className="text-sm text-[#b8bfe8]">
                      Click an insert token in the editor to edit it directly here.
                    </p>
                  ) : detachedStructuredBlocks.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-[#d8d0ae]">
                        Some legacy inserts are not placed in the article body yet.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {detachedStructuredBlocks.map((block) => (
                          <button
                            key={`detached-${block.id}`}
                            type="button"
                            onClick={() => {
                              setForm((prev) => ({
                                ...prev,
                                bodyHtml: `${prev.bodyHtml || "<p><br></p>"}${buildStructuredTokenMarkup(block)}`,
                              }));
                              setSelectedStructuredBlockId(block.id);
                            }}
                            className="rounded-full border border-[#8f7bff]/45 bg-[#8f7bff]/15 px-3 py-1.5 text-xs font-semibold text-[#efe9ff]"
                          >
                            Reinsert {getStructuredBlockLabel(block.type)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-[#b8bfe8]">
                      Use the toolbar to add rich formatting, images, FAQs, and tables directly into
                      the writing flow.
                    </p>
                  )
                }
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
