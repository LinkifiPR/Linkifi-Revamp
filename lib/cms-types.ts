import { z } from "zod";

export const cmsEntryTypeSchema = z.enum(["blog", "case-study", "page"]);
export const cmsStatusSchema = z.enum(["draft", "published", "archived"]);
export const cmsSortBySchema = z.enum(["updatedAt", "createdAt", "title", "status", "type", "publishedAt"]);
export const cmsSortOrderSchema = z.enum(["asc", "desc"]);
const cmsBlockIdSchema = z.string().min(1).optional();

export const cmsHeadingBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("heading"),
  level: z.number().int().min(2).max(4),
  text: z.string().default(""),
});

export const cmsParagraphBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("paragraph"),
  text: z.string().default(""),
});

export const cmsImageBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("image"),
  src: z.string().default(""),
  alt: z.string().default(""),
  caption: z.string().optional().default(""),
  align: z.enum(["left", "center", "right", "full"]).optional().default("center"),
});

export const cmsFaqBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("faq"),
  question: z.string().default(""),
  answer: z.string().default(""),
});

export const cmsTableBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("table"),
  caption: z.string().optional().default(""),
  headers: z.array(z.string().min(1)).min(1),
  rows: z.array(z.array(z.string())).min(1),
});

export const cmsStatItemSchema = z.object({
  value: z.string().default(""),
  label: z.string().default(""),
});

export const cmsStatsBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("stats"),
  items: z.array(cmsStatItemSchema).length(3),
});

export const cmsQuoteBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("quote"),
  text: z.string().default(""),
  cite: z.string().optional().default(""),
});

export const cmsListBlockSchema = z.object({
  id: cmsBlockIdSchema,
  type: z.literal("list"),
  ordered: z.boolean().default(false),
  items: z.array(z.string()).min(1),
});

export const cmsBlockSchema = z.union([
  cmsHeadingBlockSchema,
  cmsParagraphBlockSchema,
  cmsImageBlockSchema,
  cmsFaqBlockSchema,
  cmsTableBlockSchema,
  cmsStatsBlockSchema,
  cmsQuoteBlockSchema,
  cmsListBlockSchema,
]);

export const cmsBlocksSchema = z.array(cmsBlockSchema);

export const cmsSlugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens");

export const cmsEntryInputSchema = z.object({
  type: cmsEntryTypeSchema,
  status: cmsStatusSchema,
  title: z.string().min(1),
  slug: cmsSlugSchema,
  excerpt: z.string().default(""),
  bodyHtml: z.string().default(""),
  content: cmsBlocksSchema.default([]),
  featuredImageUrl: z.string().optional().default(""),
  featuredImageAlt: z.string().optional().default(""),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
  canonicalUrl: z.string().optional().default(""),
  noindex: z.boolean().default(false),
  authorId: z.string().optional().default(""),
  publishedAt: z.string().optional().default(""),
});

export const cmsEntryPatchSchema = cmsEntryInputSchema.partial();

export const cmsEntryQuerySchema = z.object({
  type: cmsEntryTypeSchema.optional(),
  status: cmsStatusSchema.optional(),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
  offset: z.coerce.number().int().min(0).optional(),
  sortBy: cmsSortBySchema.optional(),
  sortOrder: cmsSortOrderSchema.optional(),
});

export const cmsMediaUploadSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().min(1),
  alt: z.string().optional().default(""),
});

export const cmsAuthorInputSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  linkedinUrl: z.string().optional().default(""),
  xUrl: z.string().optional().default(""),
  youtubeUrl: z.string().optional().default(""),
});

export const cmsAuthorPatchSchema = cmsAuthorInputSchema.partial();

export type CmsEntryType = z.infer<typeof cmsEntryTypeSchema>;
export type CmsStatus = z.infer<typeof cmsStatusSchema>;
export type CmsSortBy = z.infer<typeof cmsSortBySchema>;
export type CmsSortOrder = z.infer<typeof cmsSortOrderSchema>;
export type CmsBlock = z.infer<typeof cmsBlockSchema>;
export type CmsEntryInput = z.infer<typeof cmsEntryInputSchema>;
export type CmsEntryPatch = z.infer<typeof cmsEntryPatchSchema>;
export type CmsAuthorInput = z.infer<typeof cmsAuthorInputSchema>;
export type CmsAuthorPatch = z.infer<typeof cmsAuthorPatchSchema>;

export type CmsAuthor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedinUrl: string;
  xUrl: string;
  youtubeUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsEntry = {
  id: string;
  type: CmsEntryType;
  status: CmsStatus;
  title: string;
  slug: string;
  excerpt: string;
  bodyHtml: string;
  content: CmsBlock[];
  featuredImageUrl: string;
  featuredImageAlt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  noindex: boolean;
  authorId: string | null;
  author: CmsAuthor | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CmsEntryListItem = Pick<
  CmsEntry,
  | "id"
  | "type"
  | "status"
  | "title"
  | "slug"
  | "excerpt"
  | "seoTitle"
  | "seoDescription"
  | "canonicalUrl"
  | "noindex"
  | "authorId"
  | "publishedAt"
  | "createdAt"
  | "updatedAt"
>;

export type CmsMedia = {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  alt: string;
  createdAt: string;
};

export function slugifyCmsValue(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
