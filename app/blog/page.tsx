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
  title: "Blog | Linkifi",
  description: "Insights, frameworks, and tactical guides from Linkifi on Digital PR and SEO growth.",
  alternates: {
    canonical: "https://linkifi.io/blog",
  },
};

export default async function BlogIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().toLowerCase();
  const rawPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const allEntries = await listPublishedEntriesByType("blog", 500);
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
