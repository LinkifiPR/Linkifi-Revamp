import type { CmsBlock, CmsEntry } from "@/lib/cms-types";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getBlockHeadingId(block: CmsBlock, index: number): string {
  if (block.type !== "heading") {
    return `block-${index}`;
  }

  const base = slugifyHeading(block.text) || `section-${index + 1}`;
  return `${base}-${index + 1}`;
}

export function buildTocFromBlocks(blocks: CmsBlock[]): TocItem[] {
  return blocks.flatMap((block, index) => {
    if (block.type !== "heading") {
      return [];
    }

    return [
      {
        id: getBlockHeadingId(block, index),
        text: block.text,
        level: block.level as 2 | 3 | 4,
      },
    ];
  });
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeCmsHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, 'href="#"');
}

export function renderCmsBodyHtml(bodyHtml: string): { html: string; toc: TocItem[] } {
  const sanitized = sanitizeCmsHtml(bodyHtml || "");
  const toc: TocItem[] = [];
  let headingCount = 0;

  const html = sanitized.replace(
    /<h([2-4])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, levelRaw: string, attrsRaw: string, innerRaw: string) => {
      const level = Number(levelRaw) as 2 | 3 | 4;
      const text = stripHtmlTags(innerRaw);
      headingCount += 1;

      const existingIdMatch = attrsRaw.match(/\sid=["']([^"']+)["']/i);
      const fallbackId = `${slugifyHeading(text) || "section"}-${headingCount}`;
      const id = existingIdMatch?.[1] || fallbackId;

      toc.push({ id, text: text || `Section ${headingCount}`, level });

      const attrsWithoutId = attrsRaw.replace(/\sid=["'][^"']*["']/i, "");
      return `<h${level}${attrsWithoutId} id="${id}">${innerRaw}</h${level}>`;
    },
  );

  return { html, toc };
}

export function extractFaqItems(blocks: CmsBlock[]): FaqItem[] {
  return blocks.flatMap((block) => {
    if (block.type !== "faq") {
      return [];
    }

    return [
      {
        question: block.question,
        answer: block.answer,
      },
    ];
  });
}

export function buildEntrySchemas(entry: CmsEntry, url: string) {
  const authorSameAs = entry.author
    ? [entry.author.linkedinUrl, entry.author.xUrl, entry.author.youtubeUrl].filter(Boolean)
    : [];
  const authorSchema = entry.author
    ? {
        "@type": "Person",
        name: entry.author.name,
        image: entry.author.imageUrl || undefined,
        sameAs: authorSameAs.length > 0 ? authorSameAs : undefined,
      }
    : {
        "@type": "Organization",
        name: "Linkifi",
      };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": entry.type === "case-study" ? "Report" : "Article",
    headline: entry.seoTitle || entry.title,
    description: entry.seoDescription || entry.excerpt,
    datePublished: entry.publishedAt || entry.updatedAt,
    dateModified: entry.updatedAt,
    url,
    image: entry.featuredImageUrl || undefined,
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      name: "Linkifi",
      logo: {
        "@type": "ImageObject",
        url: "https://linkifi.io/logo.png",
      },
    },
  };

  const faqItems = extractFaqItems(entry.content);
  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return {
    articleSchema,
    faqSchema,
  };
}
