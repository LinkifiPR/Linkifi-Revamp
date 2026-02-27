import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/cms-admin";
import { listCmsEntries } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

function typeLabel(type: string) {
  if (type === "case-study") {
    return "Case Study";
  }

  return type === "blog" ? "Blog" : "Page";
}

export default async function AdminContentPage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  let entries: Awaited<ReturnType<typeof listCmsEntries>> = [];
  let listError = "";

  try {
    entries = await listCmsEntries({ limit: 200 });
  } catch (error) {
    listError = error instanceof Error ? error.message : "Could not load content list.";
    entries = [];
  }

  return (
    <main className="min-h-screen bg-[#080a15] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-4xl font-display font-bold">Content Manager</h1>
            <p className="mt-2 text-[#c8cdf0] text-sm">Create and publish blog posts, case studies, and pages.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/content/new"
              className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              Create Content
            </Link>
          </div>
        </header>

        {listError ? (
          <p className="mt-8 rounded-xl border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-4 py-3 text-sm text-[#ffd3dd]">
            {listError}
          </p>
        ) : null}

        <section className="mt-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/10 text-[#d9def9] uppercase tracking-[0.12em] text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const previewBase =
                    entry.type === "blog"
                      ? "/blog"
                      : entry.type === "case-study"
                        ? "/case-studies"
                        : "/pages";

                  return (
                    <tr key={entry.id} className="border-t border-white/10 text-[#eef1ff]">
                      <td className="px-4 py-3 font-medium">{entry.title}</td>
                      <td className="px-4 py-3 text-[#c6ccf4]">{typeLabel(entry.type)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            entry.status === "published"
                              ? "bg-[#2a8f5f]/25 text-[#8df0bd]"
                              : "bg-[#c59f2f]/25 text-[#ffe29d]"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#c6ccf4]">/{entry.slug}</td>
                      <td className="px-4 py-3 text-[#b8bfe8]">
                        {new Date(entry.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/content/${entry.id}`}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`${previewBase}/${entry.slug}`}
                            target="_blank"
                            className="rounded-full border border-[#8f7bff]/50 bg-[#8f7bff]/15 px-3 py-1 text-xs text-white hover:bg-[#8f7bff]/25"
                          >
                            Preview
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[#b6bce6]">
                      No CMS content yet. Create your first post.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
