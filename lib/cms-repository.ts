import { randomUUID } from "crypto";
import { Pool } from "pg";
import {
  cmsBlocksSchema,
  cmsEntryInputSchema,
  cmsEntryPatchSchema,
  cmsEntryQuerySchema,
  type CmsEntry,
  type CmsEntryInput,
  type CmsEntryListItem,
  type CmsEntryPatch,
  type CmsEntryType,
  type CmsMedia,
  type CmsStatus,
} from "@/lib/cms-types";

type CmsEntryRow = {
  id: string;
  type: CmsEntryType;
  status: CmsStatus;
  title: string;
  slug: string;
  excerpt: string;
  body_html: string;
  content: unknown;
  featured_image_url: string;
  featured_image_alt: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  noindex: boolean;
  published_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

type CmsMediaRow = {
  id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  alt: string;
  bytes: Buffer;
  created_at: Date | string;
};

export class CmsRepositoryError extends Error {
  code: "NOT_FOUND" | "SLUG_EXISTS" | "CONFIG";

  constructor(code: "NOT_FOUND" | "SLUG_EXISTS" | "CONFIG", message: string) {
    super(message);
    this.code = code;
  }
}

let pool: Pool | null = null;
let schemaPromise: Promise<void> | null = null;

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL ?? "";
  if (!databaseUrl) {
    throw new CmsRepositoryError(
      "CONFIG",
      "DATABASE_URL is not configured. Add it in your local .env and Netlify environment variables.",
    );
  }
  return databaseUrl;
}

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({ connectionString: getDatabaseUrl(), max: 8 });
  }
  return pool;
}

async function ensureSchema(): Promise<void> {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const client = await getPool().connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS cms_entries (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL CHECK (type IN ('blog', 'case-study', 'page')),
            status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
            title TEXT NOT NULL,
            slug TEXT NOT NULL,
            excerpt TEXT NOT NULL DEFAULT '',
            body_html TEXT NOT NULL DEFAULT '',
            content JSONB NOT NULL DEFAULT '[]'::jsonb,
            featured_image_url TEXT NOT NULL DEFAULT '',
            featured_image_alt TEXT NOT NULL DEFAULT '',
            seo_title TEXT NOT NULL DEFAULT '',
            seo_description TEXT NOT NULL DEFAULT '',
            canonical_url TEXT NOT NULL DEFAULT '',
            noindex BOOLEAN NOT NULL DEFAULT FALSE,
            published_at TIMESTAMPTZ NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE (type, slug)
          );
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS cms_entries_type_status_published_idx
          ON cms_entries (type, status, published_at DESC);
        `);

        await client.query(`
          ALTER TABLE cms_entries
          ADD COLUMN IF NOT EXISTS body_html TEXT NOT NULL DEFAULT '';
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS cms_media (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            size_bytes INTEGER NOT NULL,
            alt TEXT NOT NULL DEFAULT '',
            bytes BYTEA NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS cms_media_created_idx
          ON cms_media (created_at DESC);
        `);
      } finally {
        client.release();
      }
    })();
  }

  await schemaPromise;
}

function toIso(value: Date | string | null): string | null {
  if (!value) {
    return null;
  }
  return new Date(value).toISOString();
}

function mapEntryRow(row: CmsEntryRow): CmsEntry {
  const blocksParsed = cmsBlocksSchema.safeParse(row.content);

  return {
    id: row.id,
    type: row.type,
    status: row.status,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    bodyHtml: row.body_html ?? "",
    content: blocksParsed.success ? blocksParsed.data : [],
    featuredImageUrl: row.featured_image_url,
    featuredImageAlt: row.featured_image_alt,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    canonicalUrl: row.canonical_url,
    noindex: Boolean(row.noindex),
    publishedAt: toIso(row.published_at),
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
  };
}

function mapListRow(row: CmsEntryRow): CmsEntryListItem {
  const mapped = mapEntryRow(row);
  return {
    id: mapped.id,
    type: mapped.type,
    status: mapped.status,
    title: mapped.title,
    slug: mapped.slug,
    excerpt: mapped.excerpt,
    publishedAt: mapped.publishedAt,
    createdAt: mapped.createdAt,
    updatedAt: mapped.updatedAt,
  };
}

function mapMediaRow(row: CmsMediaRow): CmsMedia {
  return {
    id: row.id,
    filename: row.filename,
    mimeType: row.mime_type,
    sizeBytes: row.size_bytes,
    alt: row.alt,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
  };
}

function normalizePublishedAt(status: CmsStatus, publishedAt?: string): string | null {
  if (status !== "published") {
    return null;
  }

  if (!publishedAt) {
    return new Date().toISOString();
  }

  const parsed = new Date(publishedAt);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }

  return parsed.toISOString();
}

function buildPatchInput(current: CmsEntry, patch: CmsEntryPatch): CmsEntryInput {
  return {
    type: patch.type ?? current.type,
    status: patch.status ?? current.status,
    title: patch.title ?? current.title,
    slug: patch.slug ?? current.slug,
    excerpt: patch.excerpt ?? current.excerpt,
    bodyHtml: patch.bodyHtml ?? current.bodyHtml,
    content: patch.content ?? current.content,
    featuredImageUrl: patch.featuredImageUrl ?? current.featuredImageUrl,
    featuredImageAlt: patch.featuredImageAlt ?? current.featuredImageAlt,
    seoTitle: patch.seoTitle ?? current.seoTitle,
    seoDescription: patch.seoDescription ?? current.seoDescription,
    canonicalUrl: patch.canonicalUrl ?? current.canonicalUrl,
    noindex: patch.noindex ?? current.noindex,
    publishedAt: patch.publishedAt ?? current.publishedAt ?? "",
  };
}

function isUniqueViolation(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  const pgError = error as Error & { code?: string; constraint?: string };
  return pgError.code === "23505" && pgError.constraint === "cms_entries_type_slug_key";
}

export async function listCmsEntries(rawQuery: unknown = {}): Promise<CmsEntryListItem[]> {
  await ensureSchema();
  const query = cmsEntryQuerySchema.parse(rawQuery);

  const whereClauses: string[] = [];
  const values: Array<string | number> = [];

  if (query.type) {
    values.push(query.type);
    whereClauses.push(`type = $${values.length}`);
  }

  if (query.status) {
    values.push(query.status);
    whereClauses.push(`status = $${values.length}`);
  }

  if (query.search) {
    values.push(`%${query.search}%`);
    whereClauses.push(`title ILIKE $${values.length}`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const limit = query.limit ?? 50;
  const offset = query.offset ?? 0;

  values.push(limit);
  values.push(offset);

  const sql = `
    SELECT id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
           seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
    FROM cms_entries
    ${whereSql}
    ORDER BY COALESCE(published_at, updated_at) DESC, updated_at DESC
    LIMIT $${values.length - 1}
    OFFSET $${values.length}
  `;

  const result = await getPool().query<CmsEntryRow>(sql, values);
  return result.rows.map(mapListRow);
}

export async function getCmsEntryById(id: string): Promise<CmsEntry | null> {
  await ensureSchema();
  const result = await getPool().query<CmsEntryRow>(
    `
    SELECT id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
           seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
    FROM cms_entries
    WHERE id = $1
    LIMIT 1
    `,
    [id],
  );

  return result.rows[0] ? mapEntryRow(result.rows[0]) : null;
}

export async function getCmsEntryBySlug(
  type: CmsEntryType,
  slug: string,
  options: { publishedOnly?: boolean } = {},
): Promise<CmsEntry | null> {
  await ensureSchema();
  const params: Array<string> = [type, slug];
  const statusClause = options.publishedOnly ? "AND status = 'published'" : "";

  const result = await getPool().query<CmsEntryRow>(
    `
    SELECT id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
           seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
    FROM cms_entries
    WHERE type = $1 AND slug = $2
    ${statusClause}
    LIMIT 1
    `,
    params,
  );

  return result.rows[0] ? mapEntryRow(result.rows[0]) : null;
}

export async function createCmsEntry(rawInput: unknown): Promise<CmsEntry> {
  await ensureSchema();
  const input = cmsEntryInputSchema.parse(rawInput);
  const id = randomUUID();
  const publishedAt = normalizePublishedAt(input.status, input.publishedAt);

  try {
    const result = await getPool().query<CmsEntryRow>(
      `
      INSERT INTO cms_entries (
        id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
        seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, $15, NOW(), NOW()
      )
      RETURNING id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
                seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
      `,
      [
        id,
        input.type,
        input.status,
        input.title,
        input.slug,
        input.excerpt,
        input.bodyHtml,
        JSON.stringify(input.content),
        input.featuredImageUrl,
        input.featuredImageAlt,
        input.seoTitle,
        input.seoDescription,
        input.canonicalUrl,
        input.noindex,
        publishedAt,
      ],
    );

    return mapEntryRow(result.rows[0]);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new CmsRepositoryError(
        "SLUG_EXISTS",
        `Slug "${input.slug}" already exists for ${input.type}. Use a different slug.`,
      );
    }
    throw error;
  }
}

export async function updateCmsEntry(id: string, rawPatch: unknown): Promise<CmsEntry> {
  await ensureSchema();

  const existing = await getCmsEntryById(id);
  if (!existing) {
    throw new CmsRepositoryError("NOT_FOUND", "Entry not found.");
  }

  const patch = cmsEntryPatchSchema.parse(rawPatch);
  const merged = cmsEntryInputSchema.parse(buildPatchInput(existing, patch));
  const publishedAt = normalizePublishedAt(merged.status, merged.publishedAt);

  try {
    const result = await getPool().query<CmsEntryRow>(
      `
      UPDATE cms_entries
      SET
        type = $2,
        status = $3,
        title = $4,
        slug = $5,
        excerpt = $6,
        body_html = $7,
        content = $8::jsonb,
        featured_image_url = $9,
        featured_image_alt = $10,
        seo_title = $11,
        seo_description = $12,
        canonical_url = $13,
        noindex = $14,
        published_at = $15,
        updated_at = NOW()
      WHERE id = $1
      RETURNING id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
                seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
      `,
      [
        id,
        merged.type,
        merged.status,
        merged.title,
        merged.slug,
        merged.excerpt,
        merged.bodyHtml,
        JSON.stringify(merged.content),
        merged.featuredImageUrl,
        merged.featuredImageAlt,
        merged.seoTitle,
        merged.seoDescription,
        merged.canonicalUrl,
        merged.noindex,
        publishedAt,
      ],
    );

    if (!result.rows[0]) {
      throw new CmsRepositoryError("NOT_FOUND", "Entry not found.");
    }

    return mapEntryRow(result.rows[0]);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new CmsRepositoryError(
        "SLUG_EXISTS",
        `Slug "${merged.slug}" already exists for ${merged.type}. Use a different slug.`,
      );
    }
    throw error;
  }
}

export async function deleteCmsEntry(id: string): Promise<void> {
  await ensureSchema();
  await getPool().query("DELETE FROM cms_entries WHERE id = $1", [id]);
}

export async function listPublishedEntriesByType(type: CmsEntryType, limit = 100): Promise<CmsEntry[]> {
  await ensureSchema();
  const result = await getPool().query<CmsEntryRow>(
    `
    SELECT id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
           seo_title, seo_description, canonical_url, noindex, published_at, created_at, updated_at
    FROM cms_entries
    WHERE type = $1 AND status = 'published'
    ORDER BY COALESCE(published_at, updated_at) DESC, updated_at DESC
    LIMIT $2
    `,
    [type, limit],
  );

  return result.rows.map(mapEntryRow);
}

export async function getCmsStats(): Promise<{
  total: number;
  published: number;
  drafts: number;
  blog: number;
  caseStudy: number;
  page: number;
}> {
  await ensureSchema();
  const result = await getPool().query<{
    total: string;
    published: string;
    drafts: string;
    blog: string;
    case_study: string;
    page: string;
  }>(`
    SELECT
      COUNT(*)::text AS total,
      COUNT(*) FILTER (WHERE status = 'published')::text AS published,
      COUNT(*) FILTER (WHERE status = 'draft')::text AS drafts,
      COUNT(*) FILTER (WHERE type = 'blog')::text AS blog,
      COUNT(*) FILTER (WHERE type = 'case-study')::text AS case_study,
      COUNT(*) FILTER (WHERE type = 'page')::text AS page
    FROM cms_entries
  `);

  const row = result.rows[0];
  return {
    total: Number(row?.total ?? 0),
    published: Number(row?.published ?? 0),
    drafts: Number(row?.drafts ?? 0),
    blog: Number(row?.blog ?? 0),
    caseStudy: Number(row?.case_study ?? 0),
    page: Number(row?.page ?? 0),
  };
}

export async function createCmsMedia(input: {
  filename: string;
  mimeType: string;
  bytes: Buffer;
  sizeBytes: number;
  alt?: string;
}): Promise<CmsMedia> {
  await ensureSchema();

  const id = randomUUID();
  const result = await getPool().query<CmsMediaRow>(
    `
    INSERT INTO cms_media (id, filename, mime_type, size_bytes, alt, bytes, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING id, filename, mime_type, size_bytes, alt, bytes, created_at
    `,
    [id, input.filename, input.mimeType, input.sizeBytes, input.alt ?? "", input.bytes],
  );

  return mapMediaRow(result.rows[0]);
}

export async function listCmsMedia(limit = 40): Promise<CmsMedia[]> {
  await ensureSchema();
  const result = await getPool().query<CmsMediaRow>(
    `
    SELECT id, filename, mime_type, size_bytes, alt, bytes, created_at
    FROM cms_media
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [limit],
  );

  return result.rows.map(mapMediaRow);
}

export async function getCmsMediaBinary(id: string): Promise<{ mimeType: string; bytes: Buffer } | null> {
  await ensureSchema();
  const result = await getPool().query<CmsMediaRow>(
    `
    SELECT id, filename, mime_type, size_bytes, alt, bytes, created_at
    FROM cms_media
    WHERE id = $1
    LIMIT 1
    `,
    [id],
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  return {
    mimeType: row.mime_type,
    bytes: row.bytes,
  };
}
