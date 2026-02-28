import { redirect } from "next/navigation";
import AdminAuthorsClient from "@/app/admin/authors/AdminAuthorsClient";
import { requireAdminSession } from "@/lib/cms-admin";
import type { CmsAuthor } from "@/lib/cms-types";
import { listCmsAuthors } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

export default async function AdminAuthorsPage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  let authors: CmsAuthor[] = [];
  let listError = "";

  try {
    authors = await listCmsAuthors();
  } catch (error) {
    listError = error instanceof Error ? error.message : "Could not load authors.";
  }

  return <AdminAuthorsClient initialAuthors={authors} initialError={listError} />;
}
