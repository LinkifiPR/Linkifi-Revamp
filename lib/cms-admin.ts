import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { CMS_SESSION_COOKIE, verifyAdminSession } from "@/lib/cms-auth";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  return session;
}

export async function requireAdminApiSession(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get(CMS_SESSION_COOKIE)?.value;
  const session = await verifyAdminSession(token);

  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return null;
}
