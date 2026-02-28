import { randomUUID } from "crypto";
import { Pool } from "pg";
import {
  cmsAuthorInputSchema,
  cmsAuthorPatchSchema,
  cmsBlocksSchema,
  cmsEntryInputSchema,
  cmsEntryPatchSchema,
  cmsEntryQuerySchema,
  type CmsAuthor,
  type CmsAuthorInput,
  type CmsAuthorPatch,
  type CmsEntry,
  type CmsEntryInput,
  type CmsEntryListItem,
  type CmsEntryPatch,
  type CmsEntryType,
  type CmsMedia,
  type CmsStatus,
  type CmsSortBy,
  type CmsSortOrder,
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
  author_id: string | null;
  published_at: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  author_record_id?: string | null;
  author_name?: string | null;
  author_role?: string | null;
  author_bio?: string | null;
  author_image_url?: string | null;
  author_linkedin_url?: string | null;
  author_x_url?: string | null;
  author_youtube_url?: string | null;
  author_created_at?: Date | string | null;
  author_updated_at?: Date | string | null;
};

type CmsAuthorRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  linkedin_url: string;
  x_url: string;
  youtube_url: string;
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
  code: "NOT_FOUND" | "SLUG_EXISTS" | "CONFIG" | "INVALID_AUTHOR";

  constructor(code: "NOT_FOUND" | "SLUG_EXISTS" | "CONFIG" | "INVALID_AUTHOR", message: string) {
    super(message);
    this.code = code;
  }
}

let pool: Pool | null = null;
let schemaPromise: Promise<void> | null = null;

const entrySelectColumns = `
  e.id,
  e.type,
  e.status,
  e.title,
  e.slug,
  e.excerpt,
  e.body_html,
  e.content,
  e.featured_image_url,
  e.featured_image_alt,
  e.seo_title,
  e.seo_description,
  e.canonical_url,
  e.noindex,
  e.author_id,
  e.published_at,
  e.created_at,
  e.updated_at,
  a.id AS author_record_id,
  a.name AS author_name,
  a.role AS author_role,
  a.bio AS author_bio,
  a.image_url AS author_image_url,
  a.linkedin_url AS author_linkedin_url,
  a.x_url AS author_x_url,
  a.youtube_url AS author_youtube_url,
  a.created_at AS author_created_at,
  a.updated_at AS author_updated_at
`;

const entrySelectJoin = `
  FROM cms_entries e
  LEFT JOIN cms_authors a ON a.id = e.author_id
`;

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
          CREATE TABLE IF NOT EXISTS cms_authors (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT '',
            bio TEXT NOT NULL DEFAULT '',
            image_url TEXT NOT NULL DEFAULT '',
            linkedin_url TEXT NOT NULL DEFAULT '',
            x_url TEXT NOT NULL DEFAULT '',
            youtube_url TEXT NOT NULL DEFAULT '',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        await client.query(`
          CREATE INDEX IF NOT EXISTS cms_authors_updated_idx
          ON cms_authors (updated_at DESC, name ASC);
        `);

        await client.query(`
          CREATE TABLE IF NOT EXISTS cms_entries (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL CHECK (type IN ('blog', 'case-study', 'page')),
            status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')),
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
          ALTER TABLE cms_entries
          ADD COLUMN IF NOT EXISTS author_id TEXT NULL;
        `);

        await client.query(`
          DO $$
          DECLARE
            constraint_name text;
          BEGIN
            SELECT conname INTO constraint_name
            FROM pg_constraint
            WHERE conrelid = 'cms_entries'::regclass
              AND contype = 'c'
              AND pg_get_constraintdef(oid) ILIKE '%status%';

            IF constraint_name IS NOT NULL THEN
              EXECUTE format('ALTER TABLE cms_entries DROP CONSTRAINT %I', constraint_name);
            END IF;
          END
          $$;
        `);

        await client.query(`
          ALTER TABLE cms_entries
          ADD CONSTRAINT cms_entries_status_check
          CHECK (status IN ('draft', 'published', 'archived'));
        `).catch(() => undefined);

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
  const author =
    row.author_record_id && row.author_name
      ? {
          id: row.author_record_id,
          name: row.author_name,
          role: row.author_role ?? "",
          bio: row.author_bio ?? "",
          imageUrl: row.author_image_url ?? "",
          linkedinUrl: row.author_linkedin_url ?? "",
          xUrl: row.author_x_url ?? "",
          youtubeUrl: row.author_youtube_url ?? "",
          createdAt: toIso(row.author_created_at ?? null) ?? new Date().toISOString(),
          updatedAt: toIso(row.author_updated_at ?? null) ?? new Date().toISOString(),
        }
      : null;

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
    authorId: row.author_id,
    author,
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
    seoTitle: mapped.seoTitle,
    seoDescription: mapped.seoDescription,
    canonicalUrl: mapped.canonicalUrl,
    noindex: mapped.noindex,
    authorId: mapped.authorId,
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

function mapAuthorRow(row: CmsAuthorRow): CmsAuthor {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    imageUrl: row.image_url,
    linkedinUrl: row.linkedin_url,
    xUrl: row.x_url,
    youtubeUrl: row.youtube_url,
    createdAt: toIso(row.created_at) ?? new Date().toISOString(),
    updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
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

function normalizeAuthorId(authorId?: string | null): string | null {
  const trimmed = (authorId ?? "").trim();
  return trimmed || null;
}

async function assertAuthorExists(authorId: string | null): Promise<void> {
  if (!authorId) {
    return;
  }

  const result = await getPool().query<{ id: string }>(
    `
    SELECT id
    FROM cms_authors
    WHERE id = $1
    LIMIT 1
    `,
    [authorId],
  );

  if (!result.rows[0]) {
    throw new CmsRepositoryError("INVALID_AUTHOR", "Selected author was not found.");
  }
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
    authorId: patch.authorId ?? current.authorId ?? "",
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
    whereClauses.push(`e.type = $${values.length}`);
  }

  if (query.status) {
    values.push(query.status);
    whereClauses.push(`e.status = $${values.length}`);
  }

  if (query.search) {
    values.push(`%${query.search}%`);
    whereClauses.push(`e.title ILIKE $${values.length}`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
  const limit = query.limit ?? 50;
  const offset = query.offset ?? 0;
  const sortBy: CmsSortBy = query.sortBy ?? "updatedAt";
  const sortOrder: CmsSortOrder = query.sortOrder ?? "desc";

  const sortColumns: Record<CmsSortBy, string> = {
    updatedAt: "updated_at",
    createdAt: "created_at",
    title: "title",
    status: "status",
    type: "type",
    publishedAt: "published_at",
  };
  const orderColumn = sortColumns[sortBy];
  const orderDirection = sortOrder === "asc" ? "ASC" : "DESC";
  const nullOrder = sortBy === "publishedAt" ? "NULLS LAST" : "";

  values.push(limit);
  values.push(offset);

  const sql = `
    SELECT ${entrySelectColumns}
    ${entrySelectJoin}
    ${whereSql}
    ORDER BY e.${orderColumn} ${orderDirection} ${nullOrder}, e.updated_at DESC
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
    SELECT ${entrySelectColumns}
    ${entrySelectJoin}
    WHERE e.id = $1
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
  const statusClause = options.publishedOnly ? "AND e.status = 'published'" : "";

  const result = await getPool().query<CmsEntryRow>(
    `
    SELECT ${entrySelectColumns}
    ${entrySelectJoin}
    WHERE e.type = $1 AND e.slug = $2
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
  const authorId = normalizeAuthorId(input.authorId);

  await assertAuthorExists(authorId);

  try {
    const result = await getPool().query<CmsEntryRow>(
      `
      INSERT INTO cms_entries (
        id, type, status, title, slug, excerpt, body_html, content, featured_image_url, featured_image_alt,
        seo_title, seo_description, canonical_url, noindex, author_id, published_at, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW()
      )
      RETURNING id
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
        authorId,
        publishedAt,
      ],
    );

    const createdEntry = await getCmsEntryById(result.rows[0].id);
    if (!createdEntry) {
      throw new CmsRepositoryError("NOT_FOUND", "Entry not found after creation.");
    }

    return createdEntry;
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
  const authorId = normalizeAuthorId(merged.authorId);

  await assertAuthorExists(authorId);

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
        author_id = $15,
        published_at = $16,
        updated_at = NOW()
      WHERE id = $1
      RETURNING id
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
        authorId,
        publishedAt,
      ],
    );

    if (!result.rows[0]) {
      throw new CmsRepositoryError("NOT_FOUND", "Entry not found.");
    }

    const updatedEntry = await getCmsEntryById(result.rows[0].id);
    if (!updatedEntry) {
      throw new CmsRepositoryError("NOT_FOUND", "Entry not found.");
    }

    return updatedEntry;
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
    SELECT ${entrySelectColumns}
    ${entrySelectJoin}
    WHERE e.type = $1 AND e.status = 'published'
    ORDER BY COALESCE(e.published_at, e.updated_at) DESC, e.updated_at DESC
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
  archived: number;
  blog: number;
  caseStudy: number;
  page: number;
}> {
  await ensureSchema();
  const result = await getPool().query<{
    total: string;
    published: string;
    drafts: string;
    archived: string;
    blog: string;
    case_study: string;
    page: string;
  }>(`
    SELECT
      COUNT(*)::text AS total,
      COUNT(*) FILTER (WHERE status = 'published')::text AS published,
      COUNT(*) FILTER (WHERE status = 'draft')::text AS drafts,
      COUNT(*) FILTER (WHERE status = 'archived')::text AS archived,
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
    archived: Number(row?.archived ?? 0),
    blog: Number(row?.blog ?? 0),
    caseStudy: Number(row?.case_study ?? 0),
    page: Number(row?.page ?? 0),
  };
}

export async function listCmsAuthors(): Promise<CmsAuthor[]> {
  await ensureSchema();
  const result = await getPool().query<CmsAuthorRow>(
    `
    SELECT id, name, role, bio, image_url, linkedin_url, x_url, youtube_url, created_at, updated_at
    FROM cms_authors
    ORDER BY updated_at DESC, name ASC
    `,
  );

  return result.rows.map(mapAuthorRow);
}

export async function getCmsAuthorById(id: string): Promise<CmsAuthor | null> {
  await ensureSchema();
  const result = await getPool().query<CmsAuthorRow>(
    `
    SELECT id, name, role, bio, image_url, linkedin_url, x_url, youtube_url, created_at, updated_at
    FROM cms_authors
    WHERE id = $1
    LIMIT 1
    `,
    [id],
  );

  return result.rows[0] ? mapAuthorRow(result.rows[0]) : null;
}

export async function createCmsAuthor(rawInput: unknown): Promise<CmsAuthor> {
  await ensureSchema();
  const input = cmsAuthorInputSchema.parse(rawInput);
  const id = randomUUID();

  const result = await getPool().query<CmsAuthorRow>(
    `
    INSERT INTO cms_authors (
      id, name, role, bio, image_url, linkedin_url, x_url, youtube_url, created_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()
    )
    RETURNING id, name, role, bio, image_url, linkedin_url, x_url, youtube_url, created_at, updated_at
    `,
    [id, input.name, input.role, input.bio, input.imageUrl, input.linkedinUrl, input.xUrl, input.youtubeUrl],
  );

  return mapAuthorRow(result.rows[0]);
}

export async function updateCmsAuthor(id: string, rawPatch: unknown): Promise<CmsAuthor> {
  await ensureSchema();

  const existing = await getCmsAuthorById(id);
  if (!existing) {
    throw new CmsRepositoryError("NOT_FOUND", "Author not found.");
  }

  const patch = cmsAuthorPatchSchema.parse(rawPatch);
  const merged = cmsAuthorInputSchema.parse({
    name: patch.name ?? existing.name,
    role: patch.role ?? existing.role,
    bio: patch.bio ?? existing.bio,
    imageUrl: patch.imageUrl ?? existing.imageUrl,
    linkedinUrl: patch.linkedinUrl ?? existing.linkedinUrl,
    xUrl: patch.xUrl ?? existing.xUrl,
    youtubeUrl: patch.youtubeUrl ?? existing.youtubeUrl,
  });

  const result = await getPool().query<CmsAuthorRow>(
    `
    UPDATE cms_authors
    SET
      name = $2,
      role = $3,
      bio = $4,
      image_url = $5,
      linkedin_url = $6,
      x_url = $7,
      youtube_url = $8,
      updated_at = NOW()
    WHERE id = $1
    RETURNING id, name, role, bio, image_url, linkedin_url, x_url, youtube_url, created_at, updated_at
    `,
    [id, merged.name, merged.role, merged.bio, merged.imageUrl, merged.linkedinUrl, merged.xUrl, merged.youtubeUrl],
  );

  if (!result.rows[0]) {
    throw new CmsRepositoryError("NOT_FOUND", "Author not found.");
  }

  return mapAuthorRow(result.rows[0]);
}

export async function deleteCmsAuthor(id: string): Promise<void> {
  await ensureSchema();

  await getPool().query(
    `
    UPDATE cms_entries
    SET author_id = NULL, updated_at = NOW()
    WHERE author_id = $1
    `,
    [id],
  );

  await getPool().query(
    `
    DELETE FROM cms_authors
    WHERE id = $1
    `,
    [id],
  );
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
