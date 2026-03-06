import type { Metadata } from "next";
import { CmsCollectionShowcase } from "@/components/cms/CmsCollectionShowcase";
import { countPublishedEntriesByType, listPublishedEntrySummariesByType } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 8;

type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export const metadata: Metadata = {
  title: "Blog | Linkifi",
  description: "Insights, frameworks, and tactical guides from Linkifi on Digital PR and SEO growth.",
  alternates: {
    canonical: "https://linkifi.io/blog",
  },
};

export default async function BlogIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const totalEntries = await countPublishedEntriesByType("blog", normalizedQuery);
  const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const entries =
    totalEntries > 0
      ? await listPublishedEntrySummariesByType("blog", {
          search: normalizedQuery,
          limit: PAGE_SIZE,
          offset: startIndex,
        })
      : [];

  return (
    <CmsCollectionShowcase
      entries={entries}
      kind="blog"
      basePath="/blog"
      eyebrow="Linkifi Blog"
      title="Strategy, Systems, And Editorial Wins"
      description="Explore our playbooks, analysis, and tactical frameworks for SEO Digital PR, authority growth, and high-signal editorial performance."
      searchQuery={query}
      currentPage={currentPage}
      totalPages={totalPages}
      totalEntries={totalEntries}
    />
  );
}
