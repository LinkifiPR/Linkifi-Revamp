import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession } from "@/lib/cms-admin";
import { CmsRepositoryError, createCmsEntry, listCmsEntries } from "@/lib/cms-repository";

function toErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    const detail = error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ error: detail }, { status: 400 });
  }

  if (error instanceof CmsRepositoryError) {
    if (error.code === "SLUG_EXISTS") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    if (error.code === "CONFIG") {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

export async function GET(request: NextRequest) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const params = request.nextUrl.searchParams;
    const result = await listCmsEntries({
      type: params.get("type") ?? undefined,
      status: params.get("status") ?? undefined,
      search: params.get("search") ?? undefined,
      limit: params.get("limit") ?? undefined,
      offset: params.get("offset") ?? undefined,
    });

    return NextResponse.json({ entries: result });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const payload = await request.json();
    const entry = await createCmsEntry(payload);
    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
