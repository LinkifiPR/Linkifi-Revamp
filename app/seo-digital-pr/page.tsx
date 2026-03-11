import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/site/ServiceLandingPage";

export const metadata: Metadata = {
  title: "SEO Digital PR | Linkifi",
  description:
    "Editorial media placements that build authority signals, strengthen E-E-A-T, and improve organic rankings.",
  alternates: {
    canonical: "https://linkifi.io/seo-digital-pr",
  },
};

export default function SeoDigitalPrPage() {
  return <ServiceLandingPage page="seo" />;
}
