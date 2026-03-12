"use client";

import { motion, useReducedMotion } from "framer-motion";

type Point = {
  x: number;
  y: number;
};

type CharacterKind = "fox" | "bird" | "bug";
type CarryType = "document" | "link" | "chip";

type AnimatedCharacterProps = {
  kind: CharacterKind;
  carry: CarryType;
  start: Point;
  path: Point[];
  rotatePath?: number[];
  duration: number;
  delay?: number;
  reducedMotion?: boolean;
};

function CarryToken({ type }: { type: CarryType }) {
  if (type === "document") {
    return (
      <g transform="translate(31 6)">
        <rect x="0" y="0" width="12" height="14" rx="3" fill="#f5f7ff" stroke="#6c7ecf" strokeWidth="1.1" />
        <line x1="3" y1="5" x2="9" y2="5" stroke="#7a8ce0" strokeWidth="1" strokeLinecap="round" />
        <line x1="3" y1="8" x2="8" y2="8" stroke="#7a8ce0" strokeWidth="1" strokeLinecap="round" />
      </g>
    );
  }

  if (type === "link") {
    return (
      <g transform="translate(31 8)" fill="none" stroke="#5e74d8" strokeWidth="1.4" strokeLinecap="round">
        <rect x="0" y="0" width="8" height="5" rx="2.5" />
        <rect x="5" y="4" width="8" height="5" rx="2.5" />
      </g>
    );
  }

  return (
    <g transform="translate(31 7)">
      <rect x="0" y="0" width="13" height="13" rx="3" fill="#eef2ff" stroke="#5f73d8" strokeWidth="1.1" />
      <circle cx="6.5" cy="6.5" r="2.1" fill="#90a2ff" />
      <line x1="6.5" y1="-1" x2="6.5" y2="1.2" stroke="#5f73d8" strokeWidth="1" />
      <line x1="6.5" y1="11.8" x2="6.5" y2="14" stroke="#5f73d8" strokeWidth="1" />
      <line x1="-1" y1="6.5" x2="1.2" y2="6.5" stroke="#5f73d8" strokeWidth="1" />
      <line x1="11.8" y1="6.5" x2="14" y2="6.5" stroke="#5f73d8" strokeWidth="1" />
    </g>
  );
}

function CharacterShape({ kind }: { kind: CharacterKind }) {
  if (kind === "fox") {
    return (
      <>
        <path d="M8 25 L17 15 L28 16 L35 24 L29 33 L16 33 Z" fill="#ffe7d4" stroke="#4f5f92" strokeWidth="1.2" />
        <path d="M18 16 L22 10 L26 16 Z" fill="#ffd2b1" stroke="#4f5f92" strokeWidth="1.2" />
        <path d="M30 24 L42 20 L41 32 L30 30 Z" fill="#ffbf95" stroke="#4f5f92" strokeWidth="1.2" />
        <circle cx="20.2" cy="23.4" r="1.1" fill="#32426b" />
      </>
    );
  }

  if (kind === "bird") {
    return (
      <>
        <ellipse cx="22" cy="24" rx="12" ry="8.8" fill="#e9efff" stroke="#4f5f92" strokeWidth="1.2" />
        <path d="M16 24 Q23 14 30 24 Q23 29 16 24 Z" fill="#d7e4ff" stroke="#4f5f92" strokeWidth="1.2" />
        <path d="M33 22 L40 24 L33 27 Z" fill="#ffd59f" stroke="#4f5f92" strokeWidth="1.2" />
        <circle cx="18.4" cy="22.3" r="1" fill="#32426b" />
      </>
    );
  }

  return (
    <>
      <ellipse cx="22" cy="24" rx="10.5" ry="9.2" fill="#edf1ff" stroke="#4f5f92" strokeWidth="1.2" />
      <rect x="16.2" y="18.8" width="11.6" height="10.4" rx="2.6" fill="#dbe4ff" stroke="#4f5f92" strokeWidth="1.1" />
      <circle cx="19.7" cy="23.7" r="1" fill="#4f5f92" />
      <circle cx="24.3" cy="23.7" r="1" fill="#4f5f92" />
      <line x1="12" y1="20" x2="8.5" y2="18" stroke="#4f5f92" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="27" x2="8.5" y2="29" stroke="#4f5f92" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="20" x2="35.5" y2="18" stroke="#4f5f92" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="27" x2="35.5" y2="29" stroke="#4f5f92" strokeWidth="1.2" strokeLinecap="round" />
    </>
  );
}

export function AnimatedCharacter({
  kind,
  carry,
  start,
  path,
  rotatePath,
  duration,
  delay = 0,
  reducedMotion,
}: AnimatedCharacterProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = reducedMotion ?? prefersReducedMotion;
  const travelPath = path.length > 0 ? path : [{ x: 0, y: 0 }];
  const rotation = rotatePath && rotatePath.length === travelPath.length ? rotatePath : travelPath.map(() => 0);

  return (
    <motion.g
      transform={`translate(${start.x} ${start.y})`}
      style={{ transformOrigin: "24px 24px" }}
      animate={
        shouldReduce
          ? {
              y: [0, -2, 0],
              opacity: [0.85, 1, 0.85],
            }
          : {
              x: travelPath.map((point) => point.x),
              y: travelPath.map((point) => point.y),
              rotate: rotation,
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <CharacterShape kind={kind} />
      <CarryToken type={carry} />
    </motion.g>
  );
}
