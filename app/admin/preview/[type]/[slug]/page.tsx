import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CmsEntryArticle } from "@/components/cms/CmsEntryArticle";
import { requireAdminSession } from "@/lib/cms-admin";
import { getCmsEntryBySlug } from "@/lib/cms-repository";
import type { CmsEntryType } from "@/lib/cms-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Preview | Linkifi CMS",
  robots: {
    index: false,
    follow: false,
  },
};

const routeTypeToEntryType: Record<string, CmsEntryType> = {
  blog: "blog",
  "case-studies": "case-study",
  pages: "page",
};

export default async function AdminContentPreviewPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  const { type, slug } = await params;
  const entryType = routeTypeToEntryType[type];
  if (!entryType) {
    notFound();
  }

  const entry = await getCmsEntryBySlug(entryType, slug, { publishedOnly: false });
  if (!entry) {
    notFound();
  }

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-[#d8d5f6] bg-[#10122b] text-white">
        <div className="container mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">
            Preview mode: <span className="font-semibold">{entry.status.toUpperCase()}</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/content/${entry.id}`}
              className="rounded-full border border-white/25 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Edit Entry
            </Link>
            <Link
              href="/admin/content"
              className="rounded-full bg-[#6b57e6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              Back to Content
            </Link>
          </div>
        </div>
      </div>
      <CmsEntryArticle entry={entry} />
    </>
  );
}
