import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { CmsCollectionShowcase } from "@/components/cms/CmsCollectionShowcase";
import { countPublishedEntriesByType, listPublishedEntrySummariesByType } from "@/lib/cms-repository";

export const revalidate = 300;
const GRID_PAGE_SIZE = 6;
const FIRST_PAGE_FETCH_SIZE = GRID_PAGE_SIZE + 1;

type SearchParams = Promise<{
  q?: string;
  page?: string;
}>;

export const metadata: Metadata = {
  title: "Case Studies | Linkifi",
  description: "Real campaign outcomes and measurable authority growth delivered by Linkifi.",
  alternates: {
    canonical: "https://linkifi.io/case-studies",
  },
};

const getCachedCaseStudyCount = unstable_cache(
  async (search: string) => countPublishedEntriesByType("case-study", search),
  ["cms-case-study-count"],
  { revalidate },
);

const getCachedCaseStudyEntries = unstable_cache(
  async (search: string, limit: number, offset: number) =>
    listPublishedEntrySummariesByType("case-study", {
      search,
      limit,
      offset,
    }),
  ["cms-case-study-entries"],
  { revalidate },
);

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

export default async function CaseStudiesIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const normalizedQuery = query.toLowerCase();
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const totalEntries = await getCachedCaseStudyCount(normalizedQuery);
  const totalPages = getTotalPages(totalEntries);
  const currentPage = Math.min(requestedPage, totalPages);
  const showFeatured = currentPage === 1;
  const limit = showFeatured ? FIRST_PAGE_FETCH_SIZE : GRID_PAGE_SIZE;
  const startIndex = showFeatured
    ? 0
    : FIRST_PAGE_FETCH_SIZE + (currentPage - 2) * GRID_PAGE_SIZE;
  const entries =
    totalEntries > 0
      ? await getCachedCaseStudyEntries(normalizedQuery, limit, startIndex)
      : [];

  return (
    <CmsCollectionShowcase
      entries={entries}
      kind="case-study"
      basePath="/case-studies"
      eyebrow="Linkifi Case Studies"
      title="Real Campaign Outcomes, Not Vanity Metrics"
      description="Detailed campaign breakdowns showing exactly how we convert expert positioning into authority signals, tier-one placements, and measurable organic growth."
      searchQuery={query}
      currentPage={currentPage}
      totalPages={totalPages}
      totalEntries={totalEntries}
      showFeatured={showFeatured}
    />
  );
}
