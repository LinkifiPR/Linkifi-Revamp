import type { Metadata } from "next";
import { CmsEntryCard } from "@/components/cms/CmsEntryCard";
import { listPublishedEntriesByType } from "@/lib/cms-repository";

export const revalidate = 3600; // Re-generate at most once per hour

export const metadata: Metadata = {
  title: "Pages | Linkifi",
  description: "Published CMS pages.",
  alternates: {
    canonical: "https://linkifi.io/pages",
  },
};

export default async function PagesIndexPage() {
  const entries = await listPublishedEntriesByType("page", 200);

  return (
    <main className="bg-gradient-to-b from-[#fbfaff] to-white py-14 md:py-18 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6a6f98] font-semibold">CMS Pages</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold text-[#111128]">Published Pages</h1>
          <p className="mt-4 text-lg text-[#3f4268]">Use this area for evergreen pages managed through the CMS.</p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <CmsEntryCard key={entry.id} entry={entry} basePath="/pages" />
          ))}
        </div>

        {entries.length === 0 ? (
          <p className="mt-10 text-[#50537a]">No pages published yet. Add one from the CMS.</p>
        ) : null}
      </div>
    </main>
  );
}
