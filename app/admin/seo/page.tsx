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

export default async function AdminSeoPage() {
  const session = await requireAdminSession();
  if (!session.valid) {
    redirect("/admin/login");
  }

  let entries: Awaited<ReturnType<typeof listCmsEntries>> = [];
  let error = "";

  try {
    entries = await listCmsEntries({ limit: 250, sortBy: "updatedAt", sortOrder: "desc" });
  } catch (fetchError) {
    error = fetchError instanceof Error ? fetchError.message : "Could not load SEO controls.";
  }

  const withMissingSeo = entries.filter(
    (entry) => !entry.seoTitle.trim() || !entry.seoDescription.trim(),
  ).length;
  const noindexCount = entries.filter((entry) => entry.noindex).length;

  return (
    <main className="min-h-screen bg-[#080a15] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-4xl font-display font-bold">SEO Controls</h1>
            <p className="mt-2 text-[#c8cdf0] text-sm">
              Audit metadata, canonical strategy, and indexability across all content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/content"
              className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              Content Manager
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Entries Scanned</p>
            <p className="mt-2 text-2xl font-semibold">{entries.length}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Missing SEO Title</p>
            <p className="mt-2 text-2xl font-semibold text-[#ffe29d]">{withMissingSeo}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Indexable Entries</p>
            <p className="mt-2 text-2xl font-semibold text-[#8df0bd]">{noindexCount}</p>
          </article>
        </section>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-4 py-3 text-sm text-[#ffd3dd]">
            {error}
          </p>
        ) : null}

        <section className="mt-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/10 text-[#d9def9] uppercase tracking-[0.12em] text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">SEO</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => {
                  const seoOk = Boolean(entry.seoTitle.trim() && entry.seoDescription.trim());
                  return (
                    <tr key={entry.id} className="border-t border-white/10 text-[#eef1ff]">
                      <td className="px-4 py-3 font-medium">{entry.title}</td>
                      <td className="px-4 py-3 text-[#c6ccf4]">{typeLabel(entry.type)}</td>
                      <td className="px-4 py-3 text-[#c6ccf4]">{entry.status}</td>
                      <td className="px-4 py-3">
                        {seoOk ? (
                          <span className="inline-flex rounded-full bg-[#2a8f5f]/25 px-2.5 py-1 text-xs font-semibold text-[#8df0bd]">
                            Healthy
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-[#c59f2f]/25 px-2.5 py-1 text-xs font-semibold text-[#ffe29d]">
                            Needs Work
                          </span>
                        )}
                        {entry.noindex ? (
                          <span className="ml-2 inline-flex rounded-full bg-[#cf4f88]/25 px-2.5 py-1 text-xs font-semibold text-[#ffb8d7]">
                            Noindex
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/content/${entry.id}`}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10"
                        >
                          Edit SEO
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
