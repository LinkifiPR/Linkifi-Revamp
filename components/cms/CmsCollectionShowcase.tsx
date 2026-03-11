import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { CmsEntrySummary } from "@/lib/cms-types";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type CollectionKind = "blog" | "case-study";

type Props = {
  entries: CmsEntrySummary[];
  kind: CollectionKind;
  basePath: string;
  eyebrow: string;
  title: string;
  description: string;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  showFeatured: boolean;
};

const COLLECTION_THEME = {
  pageAura:
    "bg-[radial-gradient(circle_at_14%_0%,rgba(106,89,255,0.18),transparent_34%),radial-gradient(circle_at_86%_8%,rgba(72,185,255,0.16),transparent_30%),radial-gradient(circle_at_50%_38%,rgba(215,87,197,0.08),transparent_36%)]",
  heroBackground:
    "bg-[radial-gradient(circle_at_16%_20%,rgba(128,109,255,0.34),transparent_24%),radial-gradient(circle_at_84%_14%,rgba(75,190,255,0.22),transparent_24%),linear-gradient(135deg,#091127_0%,#241c7c_48%,#0f1738_100%)]",
  chip: "bg-[#f3f0ff] text-[#5c4de0] border-[#ded6ff]",
  cardBorder: "border-[#e4defd]",
  cardGlow: "hover:shadow-[0_28px_68px_rgba(67,57,186,0.2)]",
  featuredFrame:
    "bg-[linear-gradient(130deg,rgba(119,101,255,0.64),rgba(74,186,255,0.34),rgba(255,255,255,0.76))]",
  primaryButton:
    "bg-[linear-gradient(135deg,#161b4a_0%,#5a4dbf_48%,#58b8ff_100%)] shadow-[0_18px_38px_rgba(83,74,196,0.34)] hover:shadow-[0_22px_46px_rgba(83,74,196,0.44)]",
  secondaryChip: "border-[#d8d2ff] bg-[#f3f0ff] text-[#5245c7]",
} as const;

function estimateReadMinutes(entry: CmsEntrySummary): number {
  const raw = `${entry.title} ${entry.excerpt}`.trim();
  const words = raw ? raw.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

function formatDate(date: string | null): string {
  const fallback = "Recently published";

  if (!date) {
    return fallback;
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return fallback;
  }

  return parsedDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function EntryImage({ entry, className }: { entry: CmsEntrySummary; className: string }) {
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
  showFeatured,
}: Props) {
  const theme = COLLECTION_THEME;
  const featured = showFeatured ? entries[0] : null;
  const secondary = showFeatured ? entries.slice(1) : entries;
  const hasEntries = entries.length > 0;
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#eef2ff_0%,#f6f7ff_32%,#ffffff_100%)] pb-24">
        <div className={`pointer-events-none absolute inset-0 ${theme.pageAura}`} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(42,48,86,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(42,48,86,0.03)_1px,transparent_1px)] bg-[size:52px_52px] opacity-45" />

        <section className={`relative z-10 overflow-hidden ${theme.heroBackground} text-white`}>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="pointer-events-none absolute -left-16 top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-8 h-44 w-44 rounded-full bg-[#9af3d0]/14 blur-3xl" />
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

        <section className="relative z-10 container mx-auto mt-8 px-6 md:mt-10">
          <div className="relative mb-10 overflow-hidden rounded-[1.9rem] border border-white/70 bg-white/[0.82] px-5 py-5 shadow-[0_24px_56px_rgba(17,22,64,0.12)] backdrop-blur-xl md:px-7 md:py-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(98,86,255,0.08),transparent_36%),radial-gradient(circle_at_88%_84%,rgba(66,177,255,0.07),transparent_32%)]" />
            <form method="get" action={basePath} className="relative z-10 flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex-1">
                <label htmlFor={`${kind}-search`} className="sr-only">
                  Search {kind === "blog" ? "blog posts" : "case studies"}
                </label>
                <input
                  id={`${kind}-search`}
                  name="q"
                  defaultValue={searchQuery}
                  placeholder={kind === "blog" ? "Search articles…" : "Search case studies…"}
                  className="h-12 w-full rounded-2xl border border-[#d9dcf3] bg-white/85 px-4 text-[#1a2142] outline-none transition-all focus:border-[#6b5cf1] focus:bg-white focus:ring-2 focus:ring-[#6b5cf1]/20"
                />
              </div>
              <button
                type="submit"
                className={`inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 ${theme.primaryButton}`}
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

            <p className="relative z-10 mt-4 inline-flex rounded-full border border-[#dfe3f6] bg-[#f7f8ff] px-4 py-1.5 text-sm text-[#5d668f]">
              Showing <span className="mx-1 font-semibold text-[#212652]">{entries.length}</span> of{" "}
              <span className="mx-1 font-semibold text-[#212652]">{totalEntries}</span>{" "}
              {kind === "blog" ? "articles" : "case studies"} (page {currentPage} of {totalPages})
            </p>
          </div>

          {featured ? (
            <article
              className={`group relative overflow-hidden rounded-[2.15rem] p-[1px] transition-all duration-300 ${theme.featuredFrame}`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="relative grid gap-0 overflow-hidden rounded-[2.1rem] border border-white/65 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(243,246,255,0.96))] shadow-[0_30px_72px_rgba(20,22,56,0.16)] md:grid-cols-[1.1fr_1fr]">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#7a6cff]/18 blur-3xl" />
                <div className="relative p-7 md:p-10">
                  <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${theme.chip}`}>
                    {kind === "case-study" ? "Featured Campaign" : "Featured Insight"}
                  </div>
                  <h2 className="mt-5 text-balance text-3xl font-display font-bold leading-[1.06] tracking-[-0.02em] text-[#15173a] md:text-4xl">
                    <Link
                      href={`${basePath}/${featured.slug}`}
                      className="transition-colors hover:text-[#2c3470]"
                    >
                      {featured.title}
                    </Link>
                  </h2>
                  {featured.excerpt ? (
                    <p className="mt-4 text-base leading-relaxed text-[#4a4f78] md:text-lg">{featured.excerpt}</p>
                  ) : null}
                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#596089]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9ddf3] bg-white/92 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      <CalendarDays className="h-4 w-4 text-[#6558d7]" />
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9ddf3] bg-white/92 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      <Clock3 className="h-4 w-4 text-[#6558d7]" />
                      {estimateReadMinutes(featured)} min read
                    </span>
                  </div>
                  <div className="mt-8">
                    <Link
                      href={`${basePath}/${featured.slug}`}
                      className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 ${theme.primaryButton}`}
                    >
                      Read Full {kind === "case-study" ? "Case Study" : "Article"}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="relative min-h-[260px] md:min-h-full">
                  <EntryImage entry={featured} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,39,0.02),rgba(13,18,39,0.48))]" />
                </div>
              </div>
            </article>
          ) : null}

          {!hasEntries ? (
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
          ) : null}

          {secondary.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {secondary.map((entry) => (
                <article
                  key={entry.id}
                  className={`group relative overflow-hidden rounded-[1.8rem] border ${theme.cardBorder} bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(250,251,255,0.98))] shadow-[0_18px_42px_rgba(20,20,60,0.1)] transition-all duration-300 hover:-translate-y-1 ${theme.cardGlow}`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(88,101,168,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,168,0.06)_1px,transparent_1px)] [background-size:30px_30px]" />
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <EntryImage
                      entry={entry}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,38,0.08),rgba(10,15,38,0.5))]" />
                    <div className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${theme.secondaryChip}`}>
                      {kind === "blog" ? "Insight" : "Case Study"}
                    </div>
                  </div>
                  <div className="relative p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#747da7]">
                      <span>{formatDate(entry.publishedAt)}</span>
                      <span className="text-[#b0b7d6]">•</span>
                      <span>{estimateReadMinutes(entry)} min read</span>
                    </div>
                    <h3 className="mt-3 text-balance text-2xl font-display font-bold leading-[1.1] tracking-[-0.018em] text-[#131739]">
                      <Link
                        href={`${basePath}/${entry.slug}`}
                        className="transition-colors hover:text-[#2c3470]"
                      >
                        {entry.title}
                      </Link>
                    </h3>
                    {entry.excerpt ? <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#525882]">{entry.excerpt}</p> : null}
                    <div className="mt-5">
                      <Link
                        href={`${basePath}/${entry.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#d9dff5] bg-white/90 px-4 py-2 text-sm font-semibold text-[#2d3360] transition-colors hover:border-[#c9d1ec] hover:bg-[#eef2ff]"
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
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/84 px-4 py-3 shadow-[0_16px_38px_rgba(20,20,60,0.1)] backdrop-blur"
              aria-label="Pagination"
            >
              {canGoPrev ? (
                <Link
                  href={buildPageHref(basePath, currentPage - 1, searchQuery)}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#d8def2] bg-white px-3 text-sm font-semibold text-[#2c3568] transition-colors hover:bg-[#eff3ff]"
                >
                  Prev
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-xl border border-[#e4e8f6] bg-[#f6f8ff] px-3 text-sm font-semibold text-[#acb3cf]"
                >
                  Prev
                </span>
              )}

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

              {canGoNext ? (
                <Link
                  href={buildPageHref(basePath, currentPage + 1, searchQuery)}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl border border-[#d8def2] bg-white px-3 text-sm font-semibold text-[#2c3568] transition-colors hover:bg-[#eff3ff]"
                >
                  Next
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-xl border border-[#e4e8f6] bg-[#f6f8ff] px-3 text-sm font-semibold text-[#acb3cf]"
                >
                  Next
                </span>
              )}
            </nav>
          ) : null}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
