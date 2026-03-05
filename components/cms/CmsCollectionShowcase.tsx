import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { CmsEntry } from "@/lib/cms-types";

type CollectionKind = "blog" | "case-study";

type Props = {
  entries: CmsEntry[];
  kind: CollectionKind;
  basePath: string;
  eyebrow: string;
  title: string;
  description: string;
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

export function CmsCollectionShowcase({ entries, kind, basePath, eyebrow, title, description }: Props) {
  const theme = COLLECTION_THEME[kind];
  const featured = entries[0];
  const secondary = entries.slice(1);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f2f4fb_0%,#f8f9fd_34%,#ffffff_100%)] pb-20">
      <section className={`relative overflow-hidden ${theme.heroBackground} text-white`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="container mx-auto px-6 py-14 md:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#9af3d0]" />
              {eyebrow}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-display font-bold leading-[1.03] tracking-[-0.03em] md:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/82 md:text-xl">{description}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto -mt-8 px-6 md:-mt-12">
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
            <p className="text-lg font-semibold text-[#22264a]">No published entries yet.</p>
            <p className="mt-2 text-[#5a6089]">Publish content in the CMS and it will appear here automatically.</p>
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
      </section>
    </main>
  );
}
