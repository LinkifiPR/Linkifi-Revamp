import type { CmsEntry } from "@/lib/cms-types";
import { buildTocFromBlocks, renderCmsBodyHtml } from "@/lib/cms-render";
import { CmsBlocksRenderer, renderCmsBlock } from "@/components/cms/CmsBlocksRenderer";
import { CmsTableOfContents } from "@/components/cms/CmsTableOfContents";

type Props = {
  entry: CmsEntry;
};

type InlinePart =
  | { kind: "html"; html: string }
  | { kind: "block"; blockId: string };

function splitInlineBody(html: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const tokenRegex =
    /<p[^>]*>\s*(<span[^>]*data-cms-block-id=["']([^"']+)["'][^>]*>[\s\S]*?<\/span>)\s*<\/p>(?:\s*<p>\s*(?:<br\s*\/?>)?\s*<\/p>)?|<span[^>]*data-cms-block-id=["']([^"']+)["'][^>]*>[\s\S]*?<\/span>/gi;
  let cursor = 0;
  let match: RegExpExecArray | null = tokenRegex.exec(html);

  while (match) {
    const [tokenHtml] = match;
    const blockId = match[2] || match[3];
    const tokenStart = match.index;
    const tokenEnd = tokenStart + tokenHtml.length;

    if (!blockId) {
      cursor = tokenEnd;
      match = tokenRegex.exec(html);
      continue;
    }

    const htmlBefore = html.slice(cursor, tokenStart);

    if (htmlBefore.trim()) {
      parts.push({ kind: "html", html: htmlBefore });
    }

    parts.push({ kind: "block", blockId });
    cursor = tokenEnd;
    match = tokenRegex.exec(html);
  }

  const trailingHtml = html.slice(cursor);
  if (trailingHtml.trim()) {
    parts.push({ kind: "html", html: trailingHtml });
  }

  return parts;
}

export function CmsEntryArticle({ entry }: Props) {
  const bodyRender = renderCmsBodyHtml(entry.bodyHtml || "");
  const inlineParts = splitInlineBody(bodyRender.html);
  const inlineBlockIds = new Set(
    inlineParts.filter((part): part is { kind: "block"; blockId: string } => part.kind === "block").map((part) => part.blockId),
  );
  const contentById = new Map(
    entry.content
      .filter((block) => typeof block.id === "string" && block.id.length > 0)
      .map((block) => [block.id as string, block]),
  );
  const remainingBlocks = entry.content.filter((block) => !block.id || !inlineBlockIds.has(block.id));
  const toc = [...bodyRender.toc, ...buildTocFromBlocks(entry.content)];

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
              {inlineParts.length > 0 ? (
                <div className="space-y-8">
                  {inlineParts.map((part, index) => {
                    if (part.kind === "html") {
                      return (
                        <section
                          key={`html-${index}`}
                          className="cms-richtext"
                          dangerouslySetInnerHTML={{ __html: part.html }}
                        />
                      );
                    }

                    const block = contentById.get(part.blockId);
                    if (!block) {
                      return null;
                    }

                    return <div key={`block-${part.blockId}`}>{renderCmsBlock(block, index)}</div>;
                  })}
                </div>
              ) : bodyRender.html ? (
                <section
                  className="cms-richtext"
                  dangerouslySetInnerHTML={{ __html: bodyRender.html }}
                />
              ) : null}
              {remainingBlocks.length > 0 ? (
                <div className={bodyRender.html || inlineParts.length > 0 ? "mt-8" : ""}>
                  <CmsBlocksRenderer blocks={remainingBlocks} />
                </div>
              ) : null}
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
