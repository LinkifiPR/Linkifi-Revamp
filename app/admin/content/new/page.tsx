import { redirect } from "next/navigation";
import CmsEntryEditor from "@/app/admin/content/CmsEntryEditor";
import { requireAdminSession } from "@/lib/cms-admin";
import { listCmsAuthors } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

export default async function AdminContentCreatePage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  const authors = await listCmsAuthors().catch(() => []);

  return <CmsEntryEditor mode="create" initialAuthors={authors} />;
}
