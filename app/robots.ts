import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://linkifi.io/sitemap.xml",
    host: "https://linkifi.io",
  };
}
