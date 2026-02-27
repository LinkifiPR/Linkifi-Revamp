import { NextRequest, NextResponse } from "next/server";
import { getCmsMediaBinary } from "@/lib/cms-repository";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const media = await getCmsMediaBinary(id);

  if (!media) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(media.bytes, {
    status: 200,
    headers: {
      "Content-Type": media.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
