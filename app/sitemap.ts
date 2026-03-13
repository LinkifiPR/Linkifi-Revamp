import type { MetadataRoute } from "next";
import { listPublishedEntriesByType } from "@/lib/cms-repository";

const DEFAULT_BASE_URL = "https://linkifi.io";
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
export const revalidate = 300;

function normalizeDate(value: string | Date): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [blogs, caseStudies, pages] = await Promise.all([
    listPublishedEntriesByType("blog", 500).catch(() => []),
    listPublishedEntriesByType("case-study", 500).catch(() => []),
    listPublishedEntriesByType("page", 500).catch(() => []),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pages`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/seo-digital-pr`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/authority-pr`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...blogs.map((entry) => ({
      url: `${BASE_URL}/blog/${entry.slug}`,
      lastModified: normalizeDate(entry.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((entry) => ({
      url: `${BASE_URL}/case-studies/${entry.slug}`,
      lastModified: normalizeDate(entry.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...pages.map((entry) => ({
      url: `${BASE_URL}/pages/${entry.slug}`,
      lastModified: normalizeDate(entry.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticUrls, ...dynamicEntries];
}
