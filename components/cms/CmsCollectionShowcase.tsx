import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { CmsEntry } from "@/lib/cms-types";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type CollectionKind = "blog" | "case-study";

type Props = {
  entries: CmsEntry[];
  kind: CollectionKind;
  basePath: string;
  eyebrow: string;
  title: string;
  description: string;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  totalEntries: number;
};

const COLLECTION_THEME: Record<
  CollectionKind,
  {
    heroBackground: string;
    chip: string;
    cardBorder: string;
    cardGlow: string;
  }
> = {
  blog: {
    heroBackground:
      "bg-[radial-gradient(circle_at_16%_24%,rgba(120,105,255,0.32),transparent_26%),radial-gradient(circle_at_84%_10%,rgba(74,176,255,0.18),transparent_24%),linear-gradient(135deg,#0e122b_0%,#2a1d96_47%,#15183b_100%)]",
    chip: "bg-[#f3f0ff] text-[#5c4de0] border-[#ded6ff]",
    cardBorder: "border-[#e8e3ff]",
    cardGlow: "hover:shadow-[0_24px_58px_rgba(61,52,181,0.18)]",
  },
  "case-study": {
    heroBackground:
      "bg-[radial-gradient(circle_at_22%_12%,rgba(95,214,164,0.22),transparent_26%),radial-gradient(circle_at_86%_16%,rgba(110,94,255,0.26),transparent_26%),linear-gradient(135deg,#071526_0%,#111e4d_44%,#1c155a_100%)]",
    chip: "bg-[#ecfff8] text-[#0f8f63] border-[#bdeed8]",
    cardBorder: "border-[#d9efe7]",
    cardGlow: "hover:shadow-[0_24px_58px_rgba(14,131,97,0.16)]",
  },
};

function estimateReadMinutes(entry: CmsEntry): number {
  const raw = `${entry.title} ${entry.excerpt} ${entry.bodyHtml ?? ""}`.replace(/<[^>]+>/g, " ").trim();
  const words = raw ? raw.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

function formatDate(date: string | null): string {
  if (!date) {
    return "Recently published";
  }

  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function EntryImage({ entry, className }: { entry: CmsEntry; className: string }) {
  if (!entry.featuredImageUrl) {
    return (
      <div
        className={`${className} bg-[linear-gradient(140deg,#1f2a64_0%,#5b4dd3_52%,#23a3ff_100%)]`}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      src={entry.featuredImageUrl}
      alt={entry.featuredImageAlt || entry.title}
      className={`${className} object-cover`}
      loading="lazy"
    />
  );
}

function buildPageHref(basePath: string, page: number, query: string): string {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }
  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= totalPages).sort((a, b) => a - b);

  if (sorted[1] > 3) {
    sorted.splice(1, 0, 2);
  }
  if (sorted[sorted.length - 2] < totalPages - 2) {
    sorted.splice(sorted.length - 1, 0, totalPages - 1);
  }

  return sorted;
}

export function CmsCollectionShowcase({
  entries,
  kind,
  basePath,
  eyebrow,
  title,
  description,
  searchQuery,
  currentPage,
  totalPages,
  totalEntries,
}: Props) {
  const theme = COLLECTION_THEME[kind];
  const featured = entries[0];
  const secondary = entries.slice(1);
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(180deg,#f2f4fb_0%,#f8f9fd_34%,#ffffff_100%)] pb-20">
        <section className={`relative overflow-hidden ${theme.heroBackground} text-white`}>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <SiteHeader />
          <div className="container mx-auto px-6 pb-10 pt-8 md:pb-14 md:pt-10">
            <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#9af3d0]" />
              {eyebrow}
            </span>
            <h1 className="mt-4 text-balance text-3xl font-display font-bold leading-[1.04] tracking-[-0.03em] md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/82 md:text-lg">{description}</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-8 px-6 md:mt-10">
        <div className="mb-8 rounded-[1.7rem] border border-[#e8e3ff] bg-white px-5 py-5 shadow-[0_14px_36px_rgba(19,24,58,0.08)] md:px-6">
          <form method="get" action={basePath} className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1">
              <label htmlFor={`${kind}-search`} className="sr-only">
                Search {kind === "blog" ? "blog posts" : "case studies"}
              </label>
              <input
                id={`${kind}-search`}
                name="q"
                defaultValue={searchQuery}
                placeholder={kind === "blog" ? "Search articles…" : "Search case studies…"}
                className="h-12 w-full rounded-2xl border border-[#d9dcf3] bg-[#f8f9ff] px-4 text-[#1a2142] outline-none transition-all focus:border-[#6b5cf1] focus:bg-white focus:ring-2 focus:ring-[#6b5cf1]/20"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#171a3b] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#101332]"
            >
              Search
            </button>
            {searchQuery ? (
              <Link
                href={basePath}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#d3d8f0] bg-[#f3f5ff] px-5 text-sm font-semibold text-[#2d3567] transition-colors hover:bg-[#e9eeff]"
              >
                Clear
              </Link>
            ) : null}
          </form>

          <p className="mt-3 text-sm text-[#5d668f]">
            Showing <span className="font-semibold text-[#212652]">{entries.length}</span> of{" "}
            <span className="font-semibold text-[#212652]">{totalEntries}</span>{" "}
            {kind === "blog" ? "articles" : "case studies"} (page {currentPage} of {totalPages})
          </p>
        </div>

        {featured ? (
          <article
            className={`group relative overflow-hidden rounded-[2rem] border ${theme.cardBorder} bg-white shadow-[0_24px_58px_rgba(20,20,60,0.12)] transition-all duration-300 ${theme.cardGlow}`}
          >
            <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
              <div className="relative p-7 md:p-10">
                <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${theme.chip}`}>
                  {kind === "case-study" ? "Featured Campaign" : "Featured Insight"}
                </div>
                <h2 className="mt-5 text-balance text-3xl font-display font-bold leading-[1.06] tracking-[-0.02em] text-[#15173a] md:text-4xl">
                  {featured.title}
                </h2>
                {featured.excerpt ? (
                  <p className="mt-4 text-base leading-relaxed text-[#4a4f78] md:text-lg">{featured.excerpt}</p>
                ) : null}
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#596089]">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f4ff] px-3 py-1.5">
                    <CalendarDays className="h-4 w-4 text-[#6558d7]" />
                    {formatDate(featured.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f4ff] px-3 py-1.5">
                    <Clock3 className="h-4 w-4 text-[#6558d7]" />
                    {estimateReadMinutes(featured)} min read
                  </span>
                </div>
                <div className="mt-8">
                  <Link
                    href={`${basePath}/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#15183b] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f1230]"
                  >
                    Read Full {kind === "case-study" ? "Case Study" : "Article"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[240px] md:min-h-full">
                <EntryImage entry={featured} className="h-full w-full" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,39,0.03),rgba(13,18,39,0.46))]" />
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-[2rem] border border-[#e7e3ff] bg-white px-8 py-10 text-center shadow-[0_18px_42px_rgba(20,20,60,0.08)]">
            <p className="text-lg font-semibold text-[#22264a]">
              {searchQuery ? "No matching entries found." : "No published entries yet."}
            </p>
            <p className="mt-2 text-[#5a6089]">
              {searchQuery
                ? "Try a different search phrase or clear filters."
                : "Publish content in the CMS and it will appear here automatically."}
            </p>
          </div>
        )}

        {secondary.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {secondary.map((entry) => (
              <article
                key={entry.id}
                className={`group overflow-hidden rounded-[1.7rem] border ${theme.cardBorder} bg-white shadow-[0_14px_36px_rgba(20,20,60,0.09)] transition-all duration-250 ${theme.cardGlow}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <EntryImage
                    entry={entry}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,38,0.05),rgba(10,15,38,0.5))]" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#747da7]">
                    <span>{formatDate(entry.publishedAt)}</span>
                    <span className="text-[#b0b7d6]">•</span>
                    <span>{estimateReadMinutes(entry)} min read</span>
                  </div>
                  <h3 className="mt-3 text-balance text-2xl font-display font-bold leading-[1.1] tracking-[-0.018em] text-[#131739]">
                    {entry.title}
                  </h3>
                  {entry.excerpt ? <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#525882]">{entry.excerpt}</p> : null}
                  <div className="mt-5">
                    <Link
                      href={`${basePath}/${entry.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#d9dff5] bg-[#f6f8ff] px-4 py-2 text-sm font-semibold text-[#2d3360] transition-colors hover:border-[#c9d1ec] hover:bg-[#eef2ff]"
                    >
                      Open
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {totalPages > 1 ? (
          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            <Link
              href={buildPageHref(basePath, Math.max(1, currentPage - 1), searchQuery)}
              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors ${
                currentPage === 1
                  ? "pointer-events-none border border-[#e4e8f6] bg-[#f6f8ff] text-[#acb3cf]"
                  : "border border-[#d8def2] bg-white text-[#2c3568] hover:bg-[#eff3ff]"
              }`}
            >
              Prev
            </Link>

            {visiblePages.map((page, index) => {
              const prev = visiblePages[index - 1];
              const hasGap = prev && page - prev > 1;

              return (
                <div key={page} className="flex items-center gap-2">
                  {hasGap ? <span className="px-1 text-sm font-semibold text-[#8d95b8]">…</span> : null}
                  <Link
                    href={buildPageHref(basePath, page, searchQuery)}
                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors ${
                      page === currentPage
                        ? "bg-[#1a1f46] text-white shadow-[0_10px_24px_rgba(26,31,70,0.24)]"
                        : "border border-[#d8def2] bg-white text-[#2c3568] hover:bg-[#eff3ff]"
                    }`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </Link>
                </div>
              );
            })}

            <Link
              href={buildPageHref(basePath, Math.min(totalPages, currentPage + 1), searchQuery)}
              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors ${
                currentPage === totalPages
                  ? "pointer-events-none border border-[#e4e8f6] bg-[#f6f8ff] text-[#acb3cf]"
                  : "border border-[#d8def2] bg-white text-[#2c3568] hover:bg-[#eff3ff]"
              }`}
            >
              Next
            </Link>
          </nav>
        ) : null}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
