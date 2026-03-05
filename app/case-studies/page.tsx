import type { Metadata } from "next";
import { CmsCollectionShowcase } from "@/components/cms/CmsCollectionShowcase";
import { listPublishedEntriesByType } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 8;

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

export default async function CaseStudiesIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const allEntries = await listPublishedEntriesByType("case-study", 500);
  const filteredEntries = query
    ? allEntries.filter((entry) =>
        `${entry.title} ${entry.excerpt}`.toLowerCase().includes(query),
      )
    : allEntries;

  const totalEntries = filteredEntries.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const entries = filteredEntries.slice(startIndex, startIndex + PAGE_SIZE);

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
    />
  );
}
