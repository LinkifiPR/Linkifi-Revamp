import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CMS_SESSION_COOKIE, verifyAdminSession } from "@/lib/cms-auth";

const cmsModules = [
  {
    title: "Homepage Content",
    description: "Manage hero copy, packages, testimonial cards, and CTA blocks.",
    status: "Next",
  },
  {
    title: "Media Library",
    description: "Upload and organize logos, videos, and testimonial assets.",
    status: "Next",
  },
  {
    title: "SEO Settings",
    description: "Edit metadata, OG tags, and schema data for core pages.",
    status: "Next",
  },
] as const;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  if (!session.valid || !session.username) {
    redirect("/admin/login");
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
            <form method="POST" action="/api/admin/logout?redirect=/admin/login">
              <button
                type="submit"
                className="rounded-full bg-[#6b57e6] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a47ce] transition-colors"
              >
                Log Out
              </button>
            </form>
          </div>
        </header>

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
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
