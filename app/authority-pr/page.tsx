import type { Metadata } from "next";
import { ServiceLandingPage } from "@/components/site/ServiceLandingPage";

export const metadata: Metadata = {
  title: "Authority PR | Linkifi",
  description:
    "Build brand authority that influences search engines, AI systems, editorial media, and human audiences.",
  alternates: {
    canonical: "https://linkifi.io/authority-pr",
  },
};

export default function AuthorityPrPage() {
  return <ServiceLandingPage page="authority" />;
}
