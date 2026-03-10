import { Buffer } from "buffer";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiSession } from "@/lib/cms-admin";
import { optimizeCmsImage } from "@/lib/cms-image-optimizer";
import { CmsRepositoryError, createCmsMedia } from "@/lib/cms-repository";

export const runtime = "nodejs";

const MAX_SOURCE_UPLOAD_BYTES = 25 * 1024 * 1024;
const MAX_STORED_BYTES = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const authError = await requireAdminApiSession(request);
  if (authError) {
    return authError;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported." }, { status: 400 });
    }

    if (file.size > MAX_SOURCE_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "Image is too large. Max allowed source size is 25MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const optimized = await optimizeCmsImage({
      filename: file.name,
      mimeType: file.type,
      bytes: Buffer.from(arrayBuffer),
    });

    if (optimized.sizeBytes > MAX_STORED_BYTES) {
      return NextResponse.json(
        { error: "Image is still too large after compression. Keep it under 8MB." },
        { status: 400 },
      );
    }

    const media = await createCmsMedia({
      filename: optimized.filename,
      mimeType: optimized.mimeType,
      sizeBytes: optimized.sizeBytes,
      bytes: optimized.bytes,
      alt: String(formData.get("alt") ?? ""),
    });

    return NextResponse.json({
      media,
      url: `/api/media/${media.id}`,
    });
  } catch (error) {
    if (error instanceof CmsRepositoryError) {
      const status = error.code === "CONFIG" ? 503 : 400;
      return NextResponse.json({ error: error.message }, { status });
    }

    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
