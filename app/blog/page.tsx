import type { Metadata } from "next";
import { CmsEntryCard } from "@/components/cms/CmsEntryCard";
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
    <main className="bg-gradient-to-b from-[#fbfaff] to-white py-14 md:py-18 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6a6f98] font-semibold">Linkifi Blog</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-[#111128]">Latest Articles</h1>
          <p className="mt-4 text-lg text-[#3f4268]">
            In-depth content on SEO Digital PR, authority building, and editorial growth systems.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <CmsEntryCard key={entry.id} entry={entry} basePath="/blog" />
          ))}
        </div>

        {entries.length === 0 ? (
          <p className="mt-10 text-[#50537a]">No published posts yet. Create your first post in the CMS.</p>
        ) : null}
      </div>
    </main>
  );
}
