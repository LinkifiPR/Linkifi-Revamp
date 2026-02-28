import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsEntryArticle } from "@/components/cms/CmsEntryArticle";
import { buildEntrySchemas } from "@/lib/cms-render";
import { getCmsEntryBySlug } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCmsEntryBySlug("case-study", slug, { publishedOnly: true });

  if (!entry) {
    return {
      title: "Not Found | Linkifi",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://linkifi.io/case-studies/${entry.slug}`;
  const authorUrl = entry.author?.linkedinUrl || entry.author?.xUrl || entry.author?.youtubeUrl || undefined;

  return {
    title: entry.seoTitle || entry.title,
    description: entry.seoDescription || entry.excerpt,
    authors: entry.author ? [{ name: entry.author.name, url: authorUrl }] : [{ name: "Linkifi" }],
    alternates: {
      canonical: entry.canonicalUrl || url,
    },
    robots: {
      index: !entry.noindex,
      follow: !entry.noindex,
    },
    openGraph: {
      title: entry.seoTitle || entry.title,
      description: entry.seoDescription || entry.excerpt,
      type: "article",
      url,
      images: entry.featuredImageUrl
        ? [{ url: entry.featuredImageUrl, alt: entry.featuredImageAlt || entry.title }]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = await getCmsEntryBySlug("case-study", slug, { publishedOnly: true });

  if (!entry) {
    notFound();
  }

  const url = `https://linkifi.io/case-studies/${entry.slug}`;
  const { articleSchema, faqSchema } = buildEntrySchemas(entry, url);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <CmsEntryArticle entry={entry} />
    </>
  );
}
