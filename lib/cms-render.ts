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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": entry.type === "case-study" ? "Report" : "Article",
    headline: entry.seoTitle || entry.title,
    description: entry.seoDescription || entry.excerpt,
    datePublished: entry.publishedAt || entry.updatedAt,
    dateModified: entry.updatedAt,
    url,
    image: entry.featuredImageUrl || undefined,
    author: {
      "@type": "Organization",
      name: "Linkifi",
    },
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
