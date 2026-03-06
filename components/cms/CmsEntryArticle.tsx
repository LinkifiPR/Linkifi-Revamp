import type { ReactNode } from "react";
import { CalendarDays, Clock3, Linkedin, Youtube } from "lucide-react";
import type { CmsAuthor, CmsEntry } from "@/lib/cms-types";
import { buildTocFromBlocks, renderCmsBodyHtml } from "@/lib/cms-render";
import { CmsBlocksRenderer, renderCmsBlock } from "@/components/cms/CmsBlocksRenderer";
import { CmsTableOfContents } from "@/components/cms/CmsTableOfContents";
import { SearchDemandWidget } from "@/components/cms/SearchDemandWidget";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

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
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#ddd8ff] bg-[#f7f5ff] text-[#5d4fe0] transition-all duration-200 hover:border-[#8b7cff] hover:bg-white hover:text-[#4738da]"
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
    <aside className="relative overflow-hidden rounded-[1.9rem] border border-[#e7e2ff] bg-[linear-gradient(180deg,#ffffff,#fbfaff)] p-6 shadow-[0_20px_48px_rgba(35,29,91,0.08)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(109,93,255,0.06),transparent_24%),radial-gradient(circle_at_8%_96%,rgba(74,176,255,0.04),transparent_20%)]" />
      <div className="relative mb-5 h-1 w-20 rounded-full bg-[linear-gradient(90deg,#6d5dff,#4ab0ff)]" />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7871b5]">Author</p>
      <div className="relative mt-4 flex items-start gap-4">
        {author.imageUrl ? (
          <img
            src={author.imageUrl}
            alt={author.name}
            className="h-20 w-20 rounded-[1.4rem] border border-[#d9d2ff] object-cover shadow-[0_14px_28px_rgba(71,56,218,0.14)]"
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
        <p className="relative mt-5 text-sm leading-relaxed text-[#45476a]">{author.bio}</p>
      ) : (
        <p className="relative mt-5 text-sm leading-relaxed text-[#6a6d92]">
          Linkifi contributor profile attached to this entry.
        </p>
      )}

      <div className="relative mt-5 border-t border-[#ece8ff] pt-5">
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

function PressCoverageCheatSheetCta() {
  return (
    <section className="container mx-auto mt-12 px-6 md:mt-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-[#2b326a] bg-[radial-gradient(circle_at_18%_20%,rgba(120,105,255,0.35),transparent_28%),radial-gradient(circle_at_86%_14%,rgba(65,185,255,0.22),transparent_24%),linear-gradient(135deg,#0f122c_0%,#2b1fa0_46%,#0f1233_100%)] px-7 py-10 text-white shadow-[0_34px_80px_rgba(21,18,64,0.44)] md:px-12 md:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-[#6a5bff]/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-[#49b5ff]/28 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
            Free Resource
          </span>

          <h2 className="mt-5 text-balance text-3xl font-display font-bold leading-[1.02] tracking-[-0.03em] md:text-[2.75rem]">
            Get The Press Coverage Cheat Sheet
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/82 md:text-lg">
            Everything you need to land your first few pieces of tier-one, mega tier-one,
            editorially earned coverage. No fluff. Just the exact playbook.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://go.linkifi.io/press-coverage-cheat-sheet-page"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-[#1a1b35] shadow-[0_14px_30px_rgba(255,255,255,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f0f2ff]"
            >
              Download The Cheat Sheet
            </a>
            <span className="rounded-2xl border border-white/18 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/82">
              Tier-One Pitch Angles • Outreach Scripts • Editorial Workflow
            </span>
          </div>
        </div>
      </div>
    </section>
  );
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
      ? "xl:grid-cols-[220px_minmax(0,1fr)_280px]"
      : "xl:grid-cols-[minmax(0,1fr)_280px]"
    : toc.length > 0
      ? "xl:grid-cols-[220px_minmax(0,1fr)]"
      : "";

  return (
    <>
      <main className="bg-[linear-gradient(180deg,#f2f4fb_0%,#f8f9fd_34%,#ffffff_100%)] pb-24 text-[#13142f]">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_20%,rgba(120,105,255,0.28),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(51,180,255,0.1),transparent_22%),linear-gradient(135deg,#0e122b_0%,#2b1fa0_44%,#16183a_100%)] text-white">
        <SiteHeader />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.1))]" />

        <div className="container mx-auto px-6 pb-12 pt-8 md:pb-16 md:pt-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.9] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#9af3d0]" />
              {articleKindLabel(entry)}
            </div>

            <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-display font-bold leading-[1.04] tracking-[-0.035em] text-white md:text-5xl xl:text-[3.85rem]">
              {entry.title}
            </h1>

            {entry.excerpt ? (
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/[0.8] md:text-[1.08rem]">
                {entry.excerpt}
              </p>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white/[0.8]">
              {entry.author ? (
                <div className="flex items-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.08] px-3 py-2 backdrop-blur-sm">
                  {entry.author.imageUrl ? (
                    <img
                      src={entry.author.imageUrl}
                      alt={entry.author.name}
                      className="h-9 w-9 rounded-full border border-white/[0.18] object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.12] text-xs font-semibold text-white">
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
                    {entry.author.role ? <p className="text-xs text-white/[0.66]">{entry.author.role}</p> : null}
                  </div>
                </div>
              ) : (
                <div className="rounded-full border border-white/[0.14] bg-white/[0.08] px-4 py-2 font-semibold text-white">
                  Linkifi Editorial
                </div>
              )}

              {entry.publishedAt ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.08] px-4 py-2 backdrop-blur-sm">
                  <CalendarDays className="h-4 w-4" />
                  <span>{new Date(entry.publishedAt).toLocaleDateString()}</span>
                </div>
              ) : null}

              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.08] px-4 py-2 backdrop-blur-sm">
                <Clock3 className="h-4 w-4" />
                <span>{readMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section className="container mx-auto mt-8 px-6 md:mt-10">
        <div className={`grid gap-6 xl:gap-8 ${contentGridClass}`}>
          {toc.length > 0 ? (
            <div className="order-2 h-fit xl:order-1 xl:sticky xl:top-24">
              <CmsTableOfContents items={toc} />
            </div>
          ) : null}

          <article className="order-1 overflow-hidden rounded-[2rem] border border-[#ebe7ff] bg-white shadow-[0_24px_60px_rgba(31,25,86,0.08)]">
            <div className="h-1.5 w-full bg-[linear-gradient(90deg,#6d5dff,#48b5ff,#6d5dff)]" />
            <div className="border-b border-[#f0ecff] px-6 py-5 md:px-10 md:py-6">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
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

            <div className="px-6 py-8 md:px-10 md:py-11">
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
            <div className="order-3 h-fit space-y-4 xl:sticky xl:top-24">
              <SearchDemandWidget />
              <AuthorSidebarCard author={entry.author} />
            </div>
          ) : null}
        </div>
        </section>

        <PressCoverageCheatSheetCta />
      </main>
      <SiteFooter />
    </>
  );
}
