import type { CmsEntry } from "@/lib/cms-types";
import { buildTocFromBlocks } from "@/lib/cms-render";
import { CmsBlocksRenderer } from "@/components/cms/CmsBlocksRenderer";
import { CmsTableOfContents } from "@/components/cms/CmsTableOfContents";

type Props = {
  entry: CmsEntry;
};

export function CmsEntryArticle({ entry }: Props) {
  const toc = buildTocFromBlocks(entry.content);

  return (
    <main className="bg-gradient-to-b from-[#fbfaff] to-white py-14 md:py-18">
      <div className="container mx-auto px-6">
        <article className="mx-auto max-w-6xl">
          <header className="rounded-3xl border border-[#d8d5f6] bg-white px-6 py-8 md:px-10 md:py-10 shadow-[0_16px_48px_rgba(33,27,94,0.09)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6b6e95] font-semibold">
              {entry.type === "case-study" ? "Case Study" : entry.type === "blog" ? "Blog" : "Page"}
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-[#10112a] leading-tight">
              {entry.title}
            </h1>
            {entry.excerpt ? (
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#3d4067]">{entry.excerpt}</p>
            ) : null}
            {entry.publishedAt ? (
              <p className="mt-5 text-sm text-[#6d7094]">
                Published {new Date(entry.publishedAt).toLocaleDateString()}
              </p>
            ) : null}
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="rounded-3xl border border-[#d9d7f5] bg-white px-6 py-8 md:px-10 md:py-10 shadow-[0_14px_38px_rgba(32,26,90,0.07)]">
              <CmsBlocksRenderer blocks={entry.content} />
            </section>
            <div className="lg:sticky lg:top-24 h-fit">
              <CmsTableOfContents items={toc} />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
