import { z } from "zod";

export const cmsEntryTypeSchema = z.enum(["blog", "case-study", "page"]);
export const cmsStatusSchema = z.enum(["draft", "published"]);

export const cmsHeadingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.number().int().min(2).max(4),
  text: z.string().default(""),
});

export const cmsParagraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string().default(""),
});

export const cmsImageBlockSchema = z.object({
  type: z.literal("image"),
  src: z.string().default(""),
  alt: z.string().default(""),
  caption: z.string().optional().default(""),
});

export const cmsFaqBlockSchema = z.object({
  type: z.literal("faq"),
  question: z.string().default(""),
  answer: z.string().default(""),
});

export const cmsTableBlockSchema = z.object({
  type: z.literal("table"),
  caption: z.string().optional().default(""),
  headers: z.array(z.string().min(1)).min(1),
  rows: z.array(z.array(z.string())).min(1),
});

export const cmsQuoteBlockSchema = z.object({
  type: z.literal("quote"),
  text: z.string().default(""),
  cite: z.string().optional().default(""),
});

export const cmsListBlockSchema = z.object({
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
  content: cmsBlocksSchema.default([]),
  featuredImageUrl: z.string().optional().default(""),
  featuredImageAlt: z.string().optional().default(""),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
  canonicalUrl: z.string().optional().default(""),
  noindex: z.boolean().default(false),
  publishedAt: z.string().optional().default(""),
});

export const cmsEntryPatchSchema = cmsEntryInputSchema.partial();

export const cmsEntryQuerySchema = z.object({
  type: cmsEntryTypeSchema.optional(),
  status: cmsStatusSchema.optional(),
  search: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(500).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const cmsMediaUploadSchema = z.object({
  filename: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().int().min(1),
  alt: z.string().optional().default(""),
});

export type CmsEntryType = z.infer<typeof cmsEntryTypeSchema>;
export type CmsStatus = z.infer<typeof cmsStatusSchema>;
export type CmsBlock = z.infer<typeof cmsBlockSchema>;
export type CmsEntryInput = z.infer<typeof cmsEntryInputSchema>;
export type CmsEntryPatch = z.infer<typeof cmsEntryPatchSchema>;

export type CmsEntry = {
  id: string;
  type: CmsEntryType;
  status: CmsStatus;
  title: string;
  slug: string;
  excerpt: string;
  content: CmsBlock[];
  featuredImageUrl: string;
  featuredImageAlt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  noindex: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CmsEntryListItem = Pick<
  CmsEntry,
  "id" | "type" | "status" | "title" | "slug" | "excerpt" | "publishedAt" | "createdAt" | "updatedAt"
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
