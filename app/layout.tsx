import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://linkifi.io"),
  title: "Linkifi - Effortless PR Link Building, Exceptional Results",
  description:
    "Building the most powerful links on the planet. We control the narrative and directly pitch stories to journalists to supercharge your SEO with high-authority backlinks from publications like Forbes, TechCrunch, and The New York Times.",
  keywords: [
    "link building",
    "digital PR",
    "SEO",
    "backlinks",
    "PR links",
    "journalist outreach",
    "white-hat SEO",
    "press mentions",
  ],
  authors: [{ name: "Linkifi" }],
  openGraph: {
    title: "Linkifi - Effortless PR Link Building, Exceptional Results",
    description:
      "Building the most powerful links on the planet through strategic digital PR campaigns. Get featured on Forbes, TechCrunch, and major publications.",
    url: "https://linkifi.io",
    siteName: "Linkifi",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Linkifi - PR Link Building",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkifi - Effortless PR Link Building",
    description:
      "Building the most powerful links on the planet through strategic digital PR campaigns.",
    images: ["/opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://linkifi.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${caveat.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
