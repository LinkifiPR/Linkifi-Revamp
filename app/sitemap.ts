import type { MetadataRoute } from "next";
import { listPublishedEntriesByType } from "@/lib/cms-repository";

const BASE_URL = "https://linkifi.io";
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, caseStudies, pages] = await Promise.all([
    listPublishedEntriesByType("blog", 500),
    listPublishedEntriesByType("case-study", 500),
    listPublishedEntriesByType("page", 500),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/seo-digital-pr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/authority-pr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...blogs.map((entry) => ({
      url: `${BASE_URL}/blog/${entry.slug}`,
      lastModified: new Date(entry.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((entry) => ({
      url: `${BASE_URL}/case-studies/${entry.slug}`,
      lastModified: new Date(entry.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...pages.map((entry) => ({
      url: `${BASE_URL}/pages/${entry.slug}`,
      lastModified: new Date(entry.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticUrls, ...dynamicEntries];
}
