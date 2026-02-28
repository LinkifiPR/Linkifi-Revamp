import type { ReactNode } from "react";
import { CalendarDays, Clock3, Linkedin, Youtube } from "lucide-react";
import type { CmsAuthor, CmsEntry } from "@/lib/cms-types";
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

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadMinutes(entry: CmsEntry): number {
  const plainText = [entry.title, entry.excerpt, stripHtml(entry.bodyHtml || "")]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = plainText ? plainText.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function getAuthorPrimaryUrl(author: CmsAuthor): string {
  return author.linkedinUrl || author.xUrl || author.youtubeUrl || "";
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        className="fill-current"
        d="M18.9 2H21l-6.87 7.85L22.2 22h-6.33l-4.95-7.17L4.62 22H2.5l7.35-8.4L2.1 2h6.48l4.48 6.49L18.9 2Zm-2.22 18h1.75L7.63 3.9H5.76L16.68 20Z"
      />
    </svg>
  );
}

function AuthorSocialLinks({ author }: { author: CmsAuthor }) {
  const socials = [
    author.linkedinUrl
      ? {
          href: author.linkedinUrl,
          label: "LinkedIn",
          icon: <Linkedin className="h-4 w-4" />,
        }
      : null,
    author.xUrl
      ? {
          href: author.xUrl,
          label: "X",
          icon: <XIcon />,
        }
      : null,
    author.youtubeUrl
      ? {
          href: author.youtubeUrl,
          label: "YouTube",
          icon: <Youtube className="h-4 w-4" />,
        }
      : null,
  ].filter(Boolean) as Array<{ href: string; label: string; icon: ReactNode }>;

  if (socials.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8d3ff] bg-white text-[#5e50da] transition-colors hover:border-[#7f6cff] hover:text-[#4738da]"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

function AuthorSidebarCard({ author }: { author: CmsAuthor }) {
  const primaryUrl = getAuthorPrimaryUrl(author);

  return (
    <aside className="rounded-[2rem] border border-[#d9d2ff] bg-white p-6 shadow-[0_20px_44px_rgba(71,56,218,0.08)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7871b5]">Author</p>
      <div className="mt-4 flex items-start gap-4">
        {author.imageUrl ? (
          <img
            src={author.imageUrl}
            alt={author.name}
            className="h-20 w-20 rounded-[1.4rem] border border-[#d9d2ff] object-cover shadow-[0_12px_24px_rgba(71,56,218,0.12)]"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#5b4ef0,#3ea9ff)] text-xl font-bold text-white shadow-[0_12px_24px_rgba(71,56,218,0.2)]">
            {author.name
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() ?? "")
              .join("")}
          </div>
        )}
        <div className="min-w-0 flex-1">
          {primaryUrl ? (
            <a
              href={primaryUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xl font-display font-bold text-[#13142f] transition-colors hover:text-[#4b3dd9]"
            >
              {author.name}
            </a>
          ) : (
            <p className="text-xl font-display font-bold text-[#13142f]">{author.name}</p>
          )}
          {author.role ? (
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#7069a7]">{author.role}</p>
          ) : null}
        </div>
      </div>

      {author.bio ? (
        <p className="mt-5 text-sm leading-relaxed text-[#45476a]">{author.bio}</p>
      ) : (
        <p className="mt-5 text-sm leading-relaxed text-[#6a6d92]">
          Linkifi contributor profile attached to this entry.
        </p>
      )}

      <div className="mt-5 border-t border-[#ece8ff] pt-5">
        <AuthorSocialLinks author={author} />
      </div>
    </aside>
  );
}

function articleKindLabel(entry: CmsEntry): string {
  if (entry.type === "case-study") {
    return "Case Study";
  }
  if (entry.type === "blog") {
    return "Blog";
  }
  return "Page";
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
  const readMinutes = estimateReadMinutes(entry);
  const contentGridClass = entry.author
    ? toc.length > 0
      ? "xl:grid-cols-[240px_minmax(0,1fr)_300px]"
      : "xl:grid-cols-[minmax(0,1fr)_300px]"
    : toc.length > 0
      ? "xl:grid-cols-[240px_minmax(0,1fr)]"
      : "";

  return (
    <main className="bg-[linear-gradient(180deg,#f5f2ff_0%,#f9f8ff_36%,#ffffff_100%)] pb-20 text-[#13142f]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(129,116,255,0.38),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(61,172,255,0.22),transparent_28%),linear-gradient(135deg,#120f2d_0%,#3f33c8_42%,#20174e_100%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08))]" />
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#9af3d0]" />
              {articleKindLabel(entry)}
            </div>
            <h1 className="mt-6 text-4xl font-display font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">
              {entry.title}
            </h1>
            {entry.excerpt ? (
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/82 md:text-xl">
                {entry.excerpt}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/78">
              {entry.author ? (
                <div className="flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  {entry.author.imageUrl ? (
                    <img
                      src={entry.author.imageUrl}
                      alt={entry.author.name}
                      className="h-9 w-9 rounded-full border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/14 text-xs font-semibold text-white">
                      {entry.author.name
                        .split(/\s+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase() ?? "")
                        .join("")}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-white">{entry.author.name}</p>
                    {entry.author.role ? <p className="text-xs text-white/65">{entry.author.role}</p> : null}
                  </div>
                </div>
              ) : (
                <div className="rounded-full border border-white/12 bg-white/10 px-4 py-2 font-semibold text-white">
                  Linkifi Editorial
                </div>
              )}

              {entry.publishedAt ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 backdrop-blur-sm">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(entry.publishedAt).toLocaleDateString()}</span>
                </div>
              ) : null}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 backdrop-blur-sm">
                <Clock3 className="h-4 w-4" />
                <span>{readMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6">
        {entry.featuredImageUrl ? (
          <div className="-mt-10 md:-mt-14">
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white p-3 shadow-[0_28px_60px_rgba(49,35,153,0.16)]">
              <img
                src={entry.featuredImageUrl}
                alt={entry.featuredImageAlt || entry.title}
                className="h-[220px] w-full rounded-[1.45rem] object-cover md:h-[380px]"
              />
            </div>
          </div>
        ) : null}

        <div className={`mt-10 grid gap-8 ${contentGridClass}`}>
          {toc.length > 0 ? (
            <div className="order-2 h-fit xl:order-1 xl:sticky xl:top-24">
              <CmsTableOfContents items={toc} />
            </div>
          ) : null}

          <article className="order-1 overflow-hidden rounded-[2rem] border border-[#ded8ff] bg-white shadow-[0_24px_56px_rgba(49,35,153,0.08)]">
            <div className="border-b border-[#ede8ff] bg-[linear-gradient(180deg,rgba(248,246,255,0.9),rgba(255,255,255,0.95))] px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#d8d0ff] bg-[#f7f4ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6559d7]">
                  <span className="h-2 w-2 rounded-full bg-[#6559d7]" />
                  {entry.type === "case-study" ? "Campaign Breakdown" : "Editorial Article"}
                </span>
                {entry.author ? (
                  <span className="text-sm text-[#6c679c]">
                    By <span className="font-semibold text-[#1a1b36]">{entry.author.name}</span>
                  </span>
                ) : null}
              </div>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
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
                <section className="cms-richtext" dangerouslySetInnerHTML={{ __html: bodyRender.html }} />
              ) : null}

              {remainingBlocks.length > 0 ? (
                <div className={bodyRender.html || inlineParts.length > 0 ? "mt-8" : ""}>
                  <CmsBlocksRenderer blocks={remainingBlocks} />
                </div>
              ) : null}
            </div>
          </article>

          {entry.author ? (
            <div className="order-3 h-fit xl:sticky xl:top-24">
              <AuthorSidebarCard author={entry.author} />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
