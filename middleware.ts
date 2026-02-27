import { NextRequest, NextResponse } from "next/server";
import { CMS_SESSION_COOKIE, verifyAdminSession } from "@/lib/cms-auth";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(CMS_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  const isLoginRoute = pathname === "/admin/login";
  if (isLoginRoute && session.valid) {
    const target = request.nextUrl.clone();
    target.pathname = "/admin";
    target.search = "";
    return NextResponse.redirect(target);
  }

  if (!isLoginRoute && !session.valid) {
    const target = request.nextUrl.clone();
    target.pathname = "/admin/login";
    target.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(target);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
