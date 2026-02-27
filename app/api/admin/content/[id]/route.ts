import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession } from "@/lib/cms-admin";
import {
  CmsRepositoryError,
  deleteCmsEntry,
  getCmsEntryById,
  updateCmsEntry,
} from "@/lib/cms-repository";

function toErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    const detail = error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ error: detail }, { status: 400 });
  }

  if (error instanceof CmsRepositoryError) {
    if (error.code === "SLUG_EXISTS") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    if (error.code === "NOT_FOUND") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error.code === "CONFIG") {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;
    const entry = await getCmsEntryById(id);

    if (!entry) {
      return NextResponse.json({ error: "Entry not found." }, { status: 404 });
    }

    return NextResponse.json({ entry });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;
    const payload = await request.json();
    const entry = await updateCmsEntry(id, payload);
    return NextResponse.json({ entry });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;
    await deleteCmsEntry(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
