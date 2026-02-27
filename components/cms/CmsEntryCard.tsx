import Link from "next/link";
import type { CmsEntry } from "@/lib/cms-types";

type Props = {
  entry: CmsEntry;
  basePath: string;
};

export function CmsEntryCard({ entry, basePath }: Props) {
  const date = entry.publishedAt ? new Date(entry.publishedAt) : null;

  return (
    <article className="rounded-3xl border border-[#dcdaf7] bg-white p-6 shadow-[0_12px_32px_rgba(29,24,79,0.08)]">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6f9b]">
        <span>{entry.type === "case-study" ? "Case Study" : entry.type === "blog" ? "Blog" : "Page"}</span>
        {date ? (
          <>
            <span className="text-[#a6a8c8]">•</span>
            <span>{date.toLocaleDateString()}</span>
          </>
        ) : null}
      </div>

      <h2 className="mt-3 text-3xl font-display font-bold text-[#131429]">{entry.title}</h2>
      {entry.excerpt ? <p className="mt-3 text-[#3f4268] leading-relaxed">{entry.excerpt}</p> : null}

      <div className="mt-5">
        <Link
          href={`${basePath}/${entry.slug}`}
          className="inline-flex items-center rounded-full bg-[#5A4DBF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4c3fa8] transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
