import { redirect } from "next/navigation";
import { ZodError } from "zod";
import AdminContentManagerClient from "@/app/admin/content/AdminContentManagerClient";
import { requireAdminSession } from "@/lib/cms-admin";
import { listCmsEntries } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  let entries: Awaited<ReturnType<typeof listCmsEntries>> = [];
  let listError = "";

  try {
    entries = await listCmsEntries({ limit: 250, sortBy: "updatedAt", sortOrder: "desc" });
  } catch (error) {
    if (error instanceof ZodError) {
      listError = error.issues[0]?.message ?? "Could not load content list.";
    } else {
      listError = error instanceof Error ? error.message : "Could not load content list.";
    }
  }

  return <AdminContentManagerClient initialEntries={entries} initialError={listError} />;
}
