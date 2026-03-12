"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Point = {
  x: number;
  y: number;
};

type SignalParticleProps = {
  origin: Point;
  path: Point[];
  duration?: number;
  delay?: number;
  radius?: number;
  color?: string;
  glow?: string;
  className?: string;
  reducedMotion?: boolean;
};

export function SignalParticle({
  origin,
  path,
  duration = 6,
  delay = 0,
  radius = 3,
  color = "#9d7bff",
  glow = "rgba(120,140,255,0.45)",
  className,
  reducedMotion,
}: SignalParticleProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = reducedMotion ?? prefersReducedMotion;
  const travelPath = path.length > 0 ? path : [{ x: 0, y: 0 }];

  return (
    <motion.circle
      cx={origin.x}
      cy={origin.y}
      r={radius}
      className={cn("will-change-transform", className)}
      fill={color}
      style={{ filter: `drop-shadow(0 0 10px ${glow})` }}
      animate={
        shouldReduce
          ? {
              opacity: [0.45, 0.85, 0.45],
              scale: [0.92, 1.08, 0.92],
            }
          : {
              x: travelPath.map((point) => point.x),
              y: travelPath.map((point) => point.y),
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.6],
            }
      }
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: shouldReduce ? undefined : [0, 0.18, 0.82, 1],
      }}
    />
  );
}
