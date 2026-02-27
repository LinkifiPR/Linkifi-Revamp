import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createAdminSession,
  getSessionCookieConfig,
  hasCmsAuthConfig,
  validateAdminCredentials,
} from "@/lib/cms-auth";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!hasCmsAuthConfig()) {
    return NextResponse.json(
      { error: "CMS auth is not configured on the server." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const { username, password } = parsed.data;
  const valid = validateAdminCredentials(username, password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  const session = await createAdminSession(username);
  const response = NextResponse.json({ ok: true });
  const cookieConfig = getSessionCookieConfig();
  response.cookies.set({
    name: cookieConfig.name,
    value: session,
    httpOnly: cookieConfig.httpOnly,
    sameSite: cookieConfig.sameSite,
    secure: cookieConfig.secure,
    path: cookieConfig.path,
    maxAge: cookieConfig.maxAge,
  });

  return response;
}
