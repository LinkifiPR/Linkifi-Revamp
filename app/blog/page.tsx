import type { Metadata } from "next";
import { CmsCollectionShowcase } from "@/components/cms/CmsCollectionShowcase";
import { countPublishedEntriesByType, listPublishedEntrySummariesByType } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";
const GRID_PAGE_SIZE = 6;
const FIRST_PAGE_FETCH_SIZE = GRID_PAGE_SIZE + 1;

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

function getTotalPages(totalEntries: number): number {
  if (totalEntries <= 0) {
    return 1;
  }

  if (totalEntries <= FIRST_PAGE_FETCH_SIZE) {
    return 1;
  }

  const remainingAfterFirstPage = totalEntries - FIRST_PAGE_FETCH_SIZE;
  return 1 + Math.ceil(remainingAfterFirstPage / GRID_PAGE_SIZE);
}

export default async function BlogIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const totalEntries = await countPublishedEntriesByType("blog", normalizedQuery);
  const totalPages = getTotalPages(totalEntries);
  const currentPage = Math.min(requestedPage, totalPages);
  const showFeatured = currentPage === 1;
  const limit = showFeatured ? FIRST_PAGE_FETCH_SIZE : GRID_PAGE_SIZE;
  const startIndex = showFeatured
    ? 0
    : FIRST_PAGE_FETCH_SIZE + (currentPage - 2) * GRID_PAGE_SIZE;
  const entries =
    totalEntries > 0
      ? await listPublishedEntrySummariesByType("blog", {
          search: normalizedQuery,
          limit,
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
      showFeatured={showFeatured}
    />
  );
}
