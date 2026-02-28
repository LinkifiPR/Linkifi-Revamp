import { notFound, redirect } from "next/navigation";
import CmsEntryEditor from "@/app/admin/content/CmsEntryEditor";
import { requireAdminSession } from "@/lib/cms-admin";
import { getCmsEntryById, listCmsAuthors } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

export default async function AdminContentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const entry = await getCmsEntryById(id);
  const authors = await listCmsAuthors().catch(() => []);

  if (!entry) {
    notFound();
  }

  return <CmsEntryEditor mode="edit" entryId={entry.id} initialEntry={entry} initialAuthors={authors} />;
}
