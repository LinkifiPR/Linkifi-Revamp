import type { Metadata } from "next";
import { AuthorityPrDeckPage } from "@/components/site/AuthorityPrDeckPage";

export const metadata: Metadata = {
  title: "Authority PR | Linkifi",
  description:
    "Traditional PR for brands, founders, and spokespeople who want to build real authority in their market.",
  alternates: {
    canonical: "https://linkifi.io/authority-pr",
  },
};

export default function AuthorityPrPage() {
  return <AuthorityPrDeckPage />;
}
