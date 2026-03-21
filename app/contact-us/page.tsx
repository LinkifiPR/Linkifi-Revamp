import type { Metadata } from "next";
import { ContactPageClient, type ContactPageContext } from "@/app/contact-us/ContactPageClient";

type SearchParams = Promise<{
  service?: string | string[];
  package?: string | string[];
  program?: string | string[];
}>;

export const metadata: Metadata = {
  title: "Contact Us | Linkifi",
  description:
    "Ready to build the most powerful links on the planet? Contact Linkifi to discuss your digital PR goals, review service fit, and book a discovery call.",
  alternates: {
    canonical: "https://linkifi.io/contact-us",
  },
};

function readQueryValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function ContactUsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const context: ContactPageContext = {
    service: readQueryValue(params.service),
    packageName: readQueryValue(params.package),
    program: readQueryValue(params.program),
  };

  return <ContactPageClient initialContext={context} />;
}
