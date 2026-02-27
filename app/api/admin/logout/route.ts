import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieConfig } from "@/lib/cms-auth";

export async function POST(request: NextRequest) {
  const redirectTo = request.nextUrl.searchParams.get("redirect") || "/admin/login";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  const cookieConfig = getSessionCookieConfig();
  response.cookies.set({
    name: cookieConfig.name,
    value: "",
    httpOnly: cookieConfig.httpOnly,
    sameSite: cookieConfig.sameSite,
    secure: cookieConfig.secure,
    path: cookieConfig.path,
    maxAge: 0,
  });

  return response;
}
