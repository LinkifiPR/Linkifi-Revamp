import type { Metadata } from "next";
import { CmsCollectionShowcase } from "@/components/cms/CmsCollectionShowcase";
import { listPublishedEntriesByType } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies | Linkifi",
  description: "Real campaign outcomes and measurable authority growth delivered by Linkifi.",
  alternates: {
    canonical: "https://linkifi.io/case-studies",
  },
};

export default async function CaseStudiesIndexPage() {
  const entries = await listPublishedEntriesByType("case-study", 200);

  return (
    <CmsCollectionShowcase
      entries={entries}
      kind="case-study"
      basePath="/case-studies"
      eyebrow="Linkifi Case Studies"
      title="Real Campaign Outcomes, Not Vanity Metrics"
      description="Detailed campaign breakdowns showing exactly how we convert expert positioning into authority signals, tier-one placements, and measurable organic growth."
    />
  );
}
