import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import Script from "next/script";
import { MetaPixelPageViewTracker } from "@/components/site/MetaPixelPageViewTracker";
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
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.google.com" />
        <Script
          id="google-gtag-src"
          src="https://www.googletagmanager.com/gtag/js?id=G-V5RGLHQ7W5"
          strategy="afterInteractive"
        />
        <Script id="google-gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V5RGLHQ7W5');
          `}
        </Script>
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1173118473123111');
            fbq('track', 'PageView');
          `}
        </Script>
        <Script
          id="clearbit-tags"
          src="https://tag.clearbitscripts.com/v1/pk_f2aefa5c8fd1bd2d23a69b6c4b47fe6a/tags.js"
          referrerPolicy="strict-origin-when-cross-origin"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${caveat.variable} font-sans antialiased`}
      >
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1173118473123111&ev=PageView&noscript=1"
          />
        </noscript>
        <MetaPixelPageViewTracker />
        {children}
      </body>
    </html>
  );
}
