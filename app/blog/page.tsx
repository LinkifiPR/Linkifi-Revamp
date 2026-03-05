import type { Metadata } from "next";
import { CmsCollectionShowcase } from "@/components/cms/CmsCollectionShowcase";
import { listPublishedEntriesByType } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Linkifi",
  description: "Insights, frameworks, and tactical guides from Linkifi on Digital PR and SEO growth.",
  alternates: {
    canonical: "https://linkifi.io/blog",
  },
};

export default async function BlogIndexPage() {
  const entries = await listPublishedEntriesByType("blog", 200);

  return (
    <CmsCollectionShowcase
      entries={entries}
      kind="blog"
      basePath="/blog"
      eyebrow="Linkifi Blog"
      title="Strategy, Systems, And Editorial Wins"
      description="Explore our playbooks, analysis, and tactical frameworks for SEO Digital PR, authority growth, and high-signal editorial performance."
    />
  );
}
