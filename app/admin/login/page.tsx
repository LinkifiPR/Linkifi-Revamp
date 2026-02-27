import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "./AdminLoginForm";
import { CMS_SESSION_COOKIE, hasCmsAuthConfig, verifyAdminSession } from "@/lib/cms-auth";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  if (session.valid) {
    redirect("/admin");
  }

  const configured = hasCmsAuthConfig();

  return (
    <main className="min-h-screen bg-[#090a16] px-6 py-20">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-[#b6bbe6] mb-3">Linkifi CMS</p>
        <h1 className="text-3xl font-display font-bold text-white mb-6">Admin Login</h1>

        {!configured ? (
          <div className="mb-5 rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
            CMS auth env vars are not configured. Set <code>CMS_ADMIN_USERNAME</code>,{" "}
            <code>CMS_ADMIN_PASSWORD</code>, and <code>CMS_SESSION_SECRET</code> first.
          </div>
        ) : null}

        <AdminLoginForm />

        <div className="mt-6 text-sm text-[#c9cdf0]">
          <Link href="/" className="hover:text-white transition-colors">
            Return to site
          </Link>
        </div>
      </div>
    </main>
  );
}
