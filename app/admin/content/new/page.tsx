import { redirect } from "next/navigation";
import CmsEntryEditor from "@/app/admin/content/CmsEntryEditor";
import { requireAdminSession } from "@/lib/cms-admin";

export const dynamic = "force-dynamic";

export default async function AdminContentCreatePage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  return <CmsEntryEditor mode="create" />;
}
