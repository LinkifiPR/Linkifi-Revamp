"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CmsEntryListItem, CmsSortBy, CmsSortOrder, CmsStatus, CmsEntryType } from "@/lib/cms-types";

type Props = {
  initialEntries: CmsEntryListItem[];
  initialError?: string;
};

type QueryState = {
  search: string;
  type: "all" | CmsEntryType;
  status: "all" | CmsStatus;
  sortBy: CmsSortBy;
  sortOrder: CmsSortOrder;
};

const defaultQuery: QueryState = {
  search: "",
  type: "all",
  status: "all",
  sortBy: "updatedAt",
  sortOrder: "desc",
};

function typeLabel(type: CmsEntryType) {
  if (type === "case-study") {
    return "Case Study";
  }

  return type === "blog" ? "Blog" : "Page";
}

function previewBaseForType(type: CmsEntryType) {
  if (type === "blog") {
    return "/admin/preview/blog";
  }

  if (type === "case-study") {
    return "/admin/preview/case-studies";
  }

  return "/admin/preview/pages";
}

function liveBaseForType(type: CmsEntryType) {
  if (type === "blog") {
    return "/blog";
  }

  if (type === "case-study") {
    return "/case-studies";
  }

  return "/pages";
}

export default function AdminContentManagerClient({ initialEntries, initialError = "" }: Props) {
  const [entries, setEntries] = useState<CmsEntryListItem[]>(initialEntries);
  const [query, setQuery] = useState<QueryState>(defaultQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [rowBusy, setRowBusy] = useState<Record<string, boolean>>({});

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("limit", "250");
    params.set("sortBy", query.sortBy);
    params.set("sortOrder", query.sortOrder);

    if (query.search.trim()) {
      params.set("search", query.search.trim());
    }

    if (query.type !== "all") {
      params.set("type", query.type);
    }

    if (query.status !== "all") {
      params.set("status", query.status);
    }

    return params.toString();
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);

      try {
        const response = await fetch(`/api/admin/content?${queryString}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        const payload = (await response.json()) as { entries?: CmsEntryListItem[]; error?: string };
        if (!response.ok) {
          throw new Error(payload.error || "Could not load content.");
        }

        setEntries(payload.entries || []);
        setError("");
      } catch (loadError) {
        if ((loadError as Error).name === "AbortError") {
          return;
        }
        setError(loadError instanceof Error ? loadError.message : "Could not load content.");
      } finally {
        setLoading(false);
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [queryString]);

  async function setStatus(id: string, status: CmsStatus) {
    setRowBusy((prev) => ({ ...prev, [id]: true }));
    setError("");

    try {
      const response = await fetch(`/api/admin/content/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const payload = (await response.json()) as { entry?: CmsEntryListItem; error?: string };
      if (!response.ok || !payload.entry) {
        throw new Error(payload.error || "Status update failed.");
      }

      setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, status } : entry)));
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Status update failed.");
    } finally {
      setRowBusy((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function deleteEntry(id: string) {
    const confirmed = window.confirm("Delete this entry permanently?");
    if (!confirmed) {
      return;
    }

    setRowBusy((prev) => ({ ...prev, [id]: true }));
    setError("");

    try {
      const response = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Delete failed.");
      }

      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Delete failed.");
    } finally {
      setRowBusy((prev) => ({ ...prev, [id]: false }));
    }
  }

  return (
    <main className="min-h-screen bg-[#080a15] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-4xl font-display font-bold">Content Manager</h1>
            <p className="mt-2 text-[#c8cdf0] text-sm">
              Filter, sort, publish, archive, and delete content from one place.
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
              href="/admin/media"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Media Library
            </Link>
            <Link
              href="/admin/seo"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              SEO Controls
            </Link>
            <Link
              href="/admin/content/new"
              className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              Create Content
            </Link>
          </div>
        </header>

        <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-4 md:p-5 backdrop-blur-sm">
          <div className="grid gap-3 md:grid-cols-5">
            <input
              type="text"
              value={query.search}
              onChange={(event) => setQuery((prev) => ({ ...prev, search: event.target.value }))}
              placeholder="Search title..."
              className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white md:col-span-2"
            />

            <select
              value={query.type}
              onChange={(event) =>
                setQuery((prev) => ({ ...prev, type: event.target.value as QueryState["type"] }))
              }
              className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white"
            >
              <option value="all">All Types</option>
              <option value="blog">Blog</option>
              <option value="case-study">Case Study</option>
              <option value="page">Page</option>
            </select>

            <select
              value={query.status}
              onChange={(event) =>
                setQuery((prev) => ({ ...prev, status: event.target.value as QueryState["status"] }))
              }
              className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <div className="grid grid-cols-2 gap-3 md:col-span-1">
              <select
                value={query.sortBy}
                onChange={(event) =>
                  setQuery((prev) => ({ ...prev, sortBy: event.target.value as CmsSortBy }))
                }
                className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white"
              >
                <option value="updatedAt">Updated</option>
                <option value="createdAt">Created</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
                <option value="type">Type</option>
                <option value="publishedAt">Published</option>
              </select>
              <select
                value={query.sortOrder}
                onChange={(event) =>
                  setQuery((prev) => ({ ...prev, sortOrder: event.target.value as CmsSortOrder }))
                }
                className="rounded-xl border border-white/20 bg-[#11142a] px-3 py-2 text-sm text-white"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
          </div>
        </section>

        {loading ? (
          <p className="mt-3 text-sm text-[#b8bfe8]">Loading content...</p>
        ) : null}

        {error ? (
          <p className="mt-4 rounded-xl border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-4 py-3 text-sm text-[#ffd3dd]">
            {error}
          </p>
        ) : null}

        <section className="mt-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/10 text-[#d9def9] uppercase tracking-[0.12em] text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const busy = Boolean(rowBusy[entry.id]);
                  return (
                    <tr key={entry.id} className="border-t border-white/10 text-[#eef1ff] align-top">
                      <td className="px-4 py-3 font-medium max-w-[260px] truncate">{entry.title}</td>
                      <td className="px-4 py-3 text-[#c6ccf4]">{typeLabel(entry.type)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            entry.status === "published"
                              ? "bg-[#2a8f5f]/25 text-[#8df0bd]"
                              : entry.status === "archived"
                                ? "bg-[#cf4f88]/25 text-[#ffb8d7]"
                                : "bg-[#c59f2f]/25 text-[#ffe29d]"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#c6ccf4]">/{entry.slug}</td>
                      <td className="px-4 py-3 text-[#b8bfe8]">
                        {new Date(entry.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/content/${entry.id}`}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`${previewBaseForType(entry.type)}/${entry.slug}`}
                            target="_blank"
                            className="rounded-full border border-[#8f7bff]/50 bg-[#8f7bff]/15 px-3 py-1 text-xs text-white hover:bg-[#8f7bff]/25"
                          >
                            Preview
                          </Link>
                          {entry.status === "published" ? (
                            <Link
                              href={`${liveBaseForType(entry.type)}/${entry.slug}`}
                              target="_blank"
                              className="rounded-full border border-[#2a8f5f]/45 bg-[#2a8f5f]/20 px-3 py-1 text-xs text-[#c9ffdf] hover:bg-[#2a8f5f]/30"
                            >
                              Live
                            </Link>
                          ) : null}

                          {entry.status !== "published" ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void setStatus(entry.id, "published")}
                              className="rounded-full border border-[#2a8f5f]/45 bg-[#2a8f5f]/20 px-3 py-1 text-xs text-[#c9ffdf] hover:bg-[#2a8f5f]/30 disabled:opacity-55"
                            >
                              Publish
                            </button>
                          ) : null}

                          {entry.status !== "draft" ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void setStatus(entry.id, "draft")}
                              className="rounded-full border border-[#c59f2f]/45 bg-[#c59f2f]/20 px-3 py-1 text-xs text-[#ffe29d] hover:bg-[#c59f2f]/30 disabled:opacity-55"
                            >
                              Draft
                            </button>
                          ) : null}

                          {entry.status !== "archived" ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void setStatus(entry.id, "archived")}
                              className="rounded-full border border-[#cf4f88]/45 bg-[#cf4f88]/20 px-3 py-1 text-xs text-[#ffd0e4] hover:bg-[#cf4f88]/30 disabled:opacity-55"
                            >
                              Archive
                            </button>
                          ) : null}

                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => void deleteEntry(entry.id)}
                            className="rounded-full border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-3 py-1 text-xs text-[#ffd3dd] hover:bg-[#ff6d8b]/25 disabled:opacity-55"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-[#b6bce6]">
                      No entries match this filter.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
