import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_SESSION_COOKIE, verifyAdminSession } from "@/lib/cms-auth";
import { getCmsStats } from "@/lib/cms-repository";

export const dynamic = "force-dynamic";

const cmsModules = [
  {
    title: "Content Manager",
    description: "Create blog posts, case studies, and pages with structured content blocks.",
    status: "Live",
    href: "/admin/content",
  },
  {
    title: "Media Library",
    description: "Upload images into CMS storage and reuse stable `/api/media/...` links.",
    status: "Live",
    href: "/admin/media",
  },
  {
    title: "SEO Controls",
    description: "Set per-entry metadata, canonical URLs, noindex, and schema-friendly blocks.",
    status: "Live",
    href: "/admin/seo",
  },
] as const;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  if (!session.valid || !session.username) {
    redirect("/admin/login");
  }

  let stats = {
    total: 0,
    published: 0,
    drafts: 0,
    archived: 0,
    blog: 0,
    caseStudy: 0,
    page: 0,
  };
  let statsError = "";

  try {
    stats = await getCmsStats();
  } catch (error) {
    statsError = error instanceof Error ? error.message : "Could not load CMS stats.";
  }

  return (
    <main className="min-h-screen bg-[#080a15] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#aeb5e5]">Linkifi CMS</p>
            <h1 className="mt-2 text-4xl font-display font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-[#c8cdf0] text-sm">Signed in as {session.username}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              View Site
            </Link>
            <Link
              href="/admin/content"
              className="rounded-full bg-[#6b57e6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
            >
              Manage Content
            </Link>
            <form method="POST" action="/api/admin/logout?redirect=/admin/login">
              <button
                type="submit"
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
              >
                Log Out
              </button>
            </form>
          </div>
        </header>

        {statsError ? (
          <p className="mb-4 rounded-xl border border-[#ff6d8b]/45 bg-[#ff6d8b]/15 px-4 py-3 text-sm text-[#ffd3dd]">
            {statsError}
          </p>
        ) : null}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Total</p>
            <p className="mt-2 text-2xl font-semibold">{stats.total}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Published</p>
            <p className="mt-2 text-2xl font-semibold text-[#8df0bd]">{stats.published}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Drafts</p>
            <p className="mt-2 text-2xl font-semibold text-[#ffe29d]">{stats.drafts}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Archived</p>
            <p className="mt-2 text-2xl font-semibold text-[#f7b2d0]">{stats.archived}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Blog</p>
            <p className="mt-2 text-2xl font-semibold">{stats.blog}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Case Studies</p>
            <p className="mt-2 text-2xl font-semibold">{stats.caseStudy}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#aeb5e5]">Pages</p>
            <p className="mt-2 text-2xl font-semibold">{stats.page}</p>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {cmsModules.map((module) => (
            <article
              key={module.title}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-[#d8dcf8]">
                {module.status}
              </div>
              <h2 className="text-xl font-display font-bold">{module.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#c8cdf0]">{module.description}</p>
              <Link
                href={module.href}
                className="mt-4 inline-flex rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Open
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
