import { spawn } from "child_process";

function log(message: string, source = "server") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const port = process.env.PORT || "5000";
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  log("Starting Next.js production server...", "next");
  
  const nextProcess = spawn("npx", ["next", "start", "-p", port, "-H", "0.0.0.0"], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: { ...process.env },
  });

  nextProcess.on("error", (err) => {
    log(`Failed to start Next.js: ${err.message}`, "next");
    process.exit(1);
  });

  nextProcess.on("close", (code) => {
    log(`Next.js process exited with code ${code}`, "next");
    process.exit(code || 0);
  });
} else {
  log("Starting Next.js development server...", "next");

  const nextProcess = spawn("npx", ["next", "dev", "-p", port, "-H", "0.0.0.0"], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: { ...process.env },
  });

  nextProcess.on("error", (err) => {
    log(`Failed to start Next.js: ${err.message}`, "next");
    process.exit(1);
  });

  nextProcess.on("close", (code) => {
    log(`Next.js process exited with code ${code}`, "next");
    process.exit(code || 0);
  });
}

// Handle process termination
process.on("SIGINT", () => {
  process.exit(0);
});

process.on("SIGTERM", () => {
  process.exit(0);
});
