import { spawn } from "child_process";
import { rm, mkdir, writeFile } from "fs/promises";

async function buildAll() {
  console.log("Building Next.js application...");
  
  // Run next build
  await new Promise<void>((resolve, reject) => {
    const nextBuild = spawn("npx", ["next", "build"], {
      cwd: process.cwd(),
      stdio: "inherit",
      env: { ...process.env },
    });

    nextBuild.on("error", (err) => {
      reject(new Error(`Failed to build Next.js: ${err.message}`));
    });

    nextBuild.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Next.js build failed with code ${code}`));
      }
    });
  });

  console.log("Next.js build complete!");

  // Create dist folder with a simple entry point that starts next
  await rm("dist", { recursive: true, force: true });
  await mkdir("dist", { recursive: true });
  
  // Create a simple CJS entry point that spawns next start
  const entryPoint = `
const { spawn } = require("child_process");

const port = process.env.PORT || "5000";

console.log("Starting Next.js production server on port " + port + "...");

const nextProcess = spawn("npx", ["next", "start", "-p", port, "-H", "0.0.0.0"], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: { ...process.env },
});

nextProcess.on("error", (err) => {
  console.error("Failed to start Next.js:", err.message);
  process.exit(1);
});

nextProcess.on("close", (code) => {
  console.log("Next.js process exited with code", code);
  process.exit(code || 0);
});

process.on("SIGINT", () => {
  nextProcess.kill("SIGINT");
});

process.on("SIGTERM", () => {
  nextProcess.kill("SIGTERM");
});
`.trim();

  await writeFile("dist/index.cjs", entryPoint);
  
  console.log("Build complete! Run 'npm run start' to start the production server.");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
