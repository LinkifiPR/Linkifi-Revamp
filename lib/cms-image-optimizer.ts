import sharp from "sharp";

const NON_OPTIMIZABLE_MIME_TYPES = new Set(["image/svg+xml", "image/gif"]);
const DEFAULT_MAX_DIMENSION = 1920;
const DEFAULT_QUALITY = 78;
const DEFAULT_MIN_SAVINGS_RATIO = 0.08;

function normalizeFilenameToWebp(filename: string): string {
  const trimmed = filename.trim();
  if (!trimmed) {
    return "image.webp";
  }

  const lastDot = trimmed.lastIndexOf(".");
  if (lastDot <= 0) {
    return `${trimmed}.webp`;
  }

  return `${trimmed.slice(0, lastDot)}.webp`;
}

export type OptimizeCmsImageInput = {
  bytes: Buffer;
  filename: string;
  mimeType: string;
  maxDimension?: number;
  quality?: number;
  minSavingsRatio?: number;
};

export type OptimizeCmsImageResult = {
  bytes: Buffer;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  optimized: boolean;
};

export async function optimizeCmsImage({
  bytes,
  filename,
  mimeType,
  maxDimension = DEFAULT_MAX_DIMENSION,
  quality = DEFAULT_QUALITY,
  minSavingsRatio = DEFAULT_MIN_SAVINGS_RATIO,
}: OptimizeCmsImageInput): Promise<OptimizeCmsImageResult> {
  const normalizedMimeType = mimeType.toLowerCase();
  if (!normalizedMimeType.startsWith("image/") || NON_OPTIMIZABLE_MIME_TYPES.has(normalizedMimeType)) {
    return {
      bytes,
      filename,
      mimeType,
      sizeBytes: bytes.length,
      optimized: false,
    };
  }

  try {
    const input = sharp(bytes, { failOn: "none" });
    const metadata = await input.metadata();
    if (!metadata.width || !metadata.height) {
      return {
        bytes,
        filename,
        mimeType,
        sizeBytes: bytes.length,
        optimized: false,
      };
    }

    const needsResize = metadata.width > maxDimension || metadata.height > maxDimension;
    const transformed = sharp(bytes, { failOn: "none" }).rotate();

    if (needsResize) {
      transformed.resize({
        width: maxDimension,
        height: maxDimension,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    const optimizedBytes = await transformed.webp({ quality, effort: 4 }).toBuffer();
    const savingsRatio = 1 - optimizedBytes.length / bytes.length;
    const shouldUseOptimized = needsResize || savingsRatio >= minSavingsRatio;

    if (!shouldUseOptimized) {
      return {
        bytes,
        filename,
        mimeType,
        sizeBytes: bytes.length,
        optimized: false,
      };
    }

    return {
      bytes: optimizedBytes,
      filename: normalizeFilenameToWebp(filename),
      mimeType: "image/webp",
      sizeBytes: optimizedBytes.length,
      optimized: true,
    };
  } catch {
    return {
      bytes,
      filename,
      mimeType,
      sizeBytes: bytes.length,
      optimized: false,
    };
  }
}
