import { redirect } from "next/navigation";
import AdminMediaLibraryClient from "@/app/admin/media/AdminMediaLibraryClient";
import { requireAdminSession } from "@/lib/cms-admin";
import { listCmsMedia } from "@/lib/cms-repository";
import type { CmsMedia } from "@/lib/cms-types";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  let media: CmsMedia[] = [];
  let error = "";

  try {
    media = await listCmsMedia(250);
  } catch (fetchError) {
    error = fetchError instanceof Error ? fetchError.message : "Could not load media.";
  }

  return <AdminMediaLibraryClient initialMedia={media} initialError={error} />;
}
