import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession } from "@/lib/cms-admin";
import { CmsRepositoryError, listCmsMedia } from "@/lib/cms-repository";

function toErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    const detail = error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ error: detail }, { status: 400 });
  }

  if (error instanceof CmsRepositoryError) {
    const status = error.code === "CONFIG" ? 503 : 400;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const limitRaw = request.nextUrl.searchParams.get("limit") || "120";
    const limit = Math.min(Math.max(Number(limitRaw) || 120, 1), 500);
    const media = await listCmsMedia(limit);

    return NextResponse.json({ media });
  } catch (error) {
    return toErrorResponse(error);
  }
}
