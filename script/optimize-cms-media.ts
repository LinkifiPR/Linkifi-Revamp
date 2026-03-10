import {
  listCmsMediaBinaries,
  updateCmsMediaBinary,
  type CmsMediaBinaryRecord,
} from "../lib/cms-repository";
import { optimizeCmsImage } from "../lib/cms-image-optimizer";

const BATCH_SIZE = 120;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function optimizeRecord(record: CmsMediaBinaryRecord): Promise<{
  updated: boolean;
  bytesSaved: number;
}> {
  const optimized = await optimizeCmsImage({
    bytes: record.bytes,
    filename: record.filename,
    mimeType: record.mimeType,
  });

  if (!optimized.optimized || optimized.sizeBytes >= record.sizeBytes) {
    return { updated: false, bytesSaved: 0 };
  }

  await updateCmsMediaBinary({
    id: record.id,
    filename: optimized.filename,
    mimeType: optimized.mimeType,
    sizeBytes: optimized.sizeBytes,
    bytes: optimized.bytes,
  });

  return {
    updated: true,
    bytesSaved: record.sizeBytes - optimized.sizeBytes,
  };
}

async function main() {
  let offset = 0;
  let inspected = 0;
  let updated = 0;
  let totalBytesSaved = 0;

  for (;;) {
    const batch = await listCmsMediaBinaries({ limit: BATCH_SIZE, offset });
    if (batch.length === 0) {
      break;
    }

    for (const record of batch) {
      inspected += 1;
      const result = await optimizeRecord(record);
      if (!result.updated) {
        continue;
      }

      updated += 1;
      totalBytesSaved += result.bytesSaved;
      console.log(
        `[optimized] ${record.id} ${record.filename} -> saved ${formatBytes(result.bytesSaved)}`,
      );
    }

    offset += batch.length;
  }

  console.log("");
  console.log(`Inspected: ${inspected}`);
  console.log(`Optimized: ${updated}`);
  console.log(`Saved: ${formatBytes(totalBytesSaved)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
