import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdminApiSession } from "@/lib/cms-admin";
import { CmsRepositoryError, createCmsAuthor, listCmsAuthors } from "@/lib/cms-repository";

function toErrorResponse(error: unknown) {
  if (error instanceof ZodError) {
    const detail = error.issues[0]?.message ?? "Invalid request payload.";
    return NextResponse.json({ error: detail }, { status: 400 });
  }

  if (error instanceof CmsRepositoryError) {
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
    const authors = await listCmsAuthors();
    return NextResponse.json({ authors });
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
    const author = await createCmsAuthor(payload);
    return NextResponse.json({ author }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
