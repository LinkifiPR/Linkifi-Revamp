"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCharacter } from "@/components/site/AnimatedCharacter";
import { SignalParticle } from "@/components/site/SignalParticle";

const ecosystemNodes = [
  { id: "editorial", label: "Editorial media", x: 210, y: 228, duration: 6, delay: 0.45 },
  { id: "search", label: "Search engines", x: 552, y: 78, duration: 7, delay: 1.05 },
  { id: "ai", label: "AI assistants", x: 580, y: 250, duration: 8, delay: 1.75 },
] as const;

export function AuthoritySignalEcosystem({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(reduceMotion);

  return (
    <div className={cn("relative rounded-[24px] border border-white/12 bg-white/6 p-6 backdrop-blur-sm", className)}>
      <div className="ecosystem-motion-overlay pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(135,153,255,0.22),transparent_42%),radial-gradient(circle_at_80%_76%,rgba(157,123,255,0.18),transparent_45%)]" />

      <svg viewBox="0 0 760 320" className="relative z-10 h-full w-full" aria-label="Signal Creatures Carry Authority diagram">
        <defs>
          <linearGradient id="ecosystemPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b6cff" />
            <stop offset="100%" stopColor="#9d7bff" />
          </linearGradient>
          <linearGradient id="ecosystemPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(163,177,255,0.36)" />
            <stop offset="100%" stopColor="rgba(198,179,255,0.42)" />
          </linearGradient>
        </defs>

        <path d="M380 160 C 334 170 270 197 210 228" stroke="url(#ecosystemPathGradient)" strokeWidth="2" strokeDasharray="4 8" fill="none" />
        <path d="M380 160 C 430 126 490 97 552 78" stroke="url(#ecosystemPathGradient)" strokeWidth="2" strokeDasharray="4 8" fill="none" />
        <path d="M380 160 C 438 184 505 221 580 250" stroke="url(#ecosystemPathGradient)" strokeWidth="2" strokeDasharray="4 8" fill="none" />

        <motion.circle
          cx="380"
          cy="160"
          r="62"
          fill="rgba(126,142,255,0.18)"
          animate={shouldReduceMotion ? undefined : { scale: [0.94, 1.08, 0.94], opacity: [0.28, 0.48, 0.28] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: "drop-shadow(0 0 30px rgba(120,140,255,0.25))" }}
        />
        <motion.circle
          cx="380"
          cy="160"
          r="40"
          fill="url(#ecosystemPrimaryGradient)"
          animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <circle cx="380" cy="160" r="24" fill="#ffffff" fillOpacity="0.92" />
        <text x="380" y="152" textAnchor="middle" fontSize="11.2" letterSpacing="0.16em" fill="#475892">
          AUTHORITY
        </text>
        <text x="380" y="169" textAnchor="middle" fontSize="11.2" letterSpacing="0.16em" fill="#475892">
          SIGNALS
        </text>

        {ecosystemNodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="22"
              fill="rgba(255,255,255,0.9)"
              stroke="#c6d0fa"
              strokeWidth="1.3"
              animate={
                shouldReduceMotion
                  ? { opacity: [0.84, 1, 0.84] }
                  : {
                      scale: [1, 1, 1.18, 1],
                      fill: ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.9)", "rgba(197,214,255,0.94)", "rgba(255,255,255,0.9)"],
                    }
              }
              transition={{
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.46, 0.54, 1],
              }}
              style={{ filter: "drop-shadow(0 0 22px rgba(120,140,255,0.25))" }}
            />
            <text x={node.x + 30} y={node.y + 4} fontSize="11.5" letterSpacing="0.03em" fill="rgba(255,255,255,0.9)">
              {node.label}
            </text>
          </g>
        ))}

        <path d="M193 230 L208 216 L223 230 L208 244 Z" fill="rgba(150,166,255,0.42)" stroke="#c6d0fa" strokeWidth="1.1" />
        <path d="M541 78 L552 66 L563 78 L552 90 Z" fill="rgba(150,166,255,0.42)" stroke="#c6d0fa" strokeWidth="1.1" />
        <rect x="568" y="238" width="24" height="24" rx="7" fill="rgba(150,166,255,0.42)" stroke="#c6d0fa" strokeWidth="1.1" />

        <SignalParticle
          origin={{ x: 380, y: 160 }}
          path={[
            { x: 0, y: 0 },
            { x: -18, y: -8 },
            { x: -28, y: -18 },
            { x: -42, y: -28 },
          ]}
          duration={3}
          delay={0}
          radius={3}
          color="#9d7bff"
          glow="rgba(157,123,255,0.45)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 380, y: 160 }}
          path={[
            { x: 0, y: 0 },
            { x: 16, y: -12 },
            { x: 28, y: -26 },
            { x: 42, y: -36 },
          ]}
          duration={3.4}
          delay={0.6}
          radius={3}
          color="#8fa3ff"
          glow="rgba(120,140,255,0.45)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 380, y: 160 }}
          path={[
            { x: 0, y: 0 },
            { x: 14, y: 10 },
            { x: 32, y: 24 },
            { x: 46, y: 36 },
          ]}
          duration={3.8}
          delay={1.2}
          radius={3}
          color="#9d7bff"
          glow="rgba(157,123,255,0.4)"
          reducedMotion={shouldReduceMotion}
        />

        <AnimatedCharacter
          kind="fox"
          carry="document"
          start={{ x: 352, y: 144 }}
          path={[
            { x: 0, y: 0 },
            { x: -44, y: 16 },
            { x: -96, y: 34 },
            { x: -138, y: 56 },
            { x: -160, y: 74 },
            { x: -138, y: 56 },
            { x: -96, y: 34 },
            { x: -44, y: 16 },
            { x: 0, y: 0 },
          ]}
          rotatePath={[0, -4, -7, -5, -2, -2, -4, -2, 0]}
          duration={6}
          delay={0.45}
          reducedMotion={shouldReduceMotion}
        />
        <AnimatedCharacter
          kind="bird"
          carry="link"
          start={{ x: 362, y: 120 }}
          path={[
            { x: 0, y: 0 },
            { x: 36, y: -28 },
            { x: 82, y: -56 },
            { x: 126, y: -82 },
            { x: 160, y: -98 },
            { x: 126, y: -82 },
            { x: 82, y: -56 },
            { x: 36, y: -28 },
            { x: 0, y: 0 },
          ]}
          rotatePath={[0, 4, 8, 10, 12, 10, 8, 4, 0]}
          duration={7}
          delay={1.05}
          reducedMotion={shouldReduceMotion}
        />
        <AnimatedCharacter
          kind="bug"
          carry="chip"
          start={{ x: 364, y: 172 }}
          path={[
            { x: 0, y: 0 },
            { x: 38, y: 16 },
            { x: 82, y: 36 },
            { x: 126, y: 56 },
            { x: 162, y: 78 },
            { x: 126, y: 56 },
            { x: 82, y: 36 },
            { x: 38, y: 16 },
            { x: 0, y: 0 },
          ]}
          rotatePath={[0, 2, 4, 5, 4, 5, 4, 2, 0]}
          duration={8}
          delay={1.75}
          reducedMotion={shouldReduceMotion}
        />
      </svg>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .ecosystem-motion-overlay {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
