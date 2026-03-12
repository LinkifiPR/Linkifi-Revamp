"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SignalParticle } from "@/components/site/SignalParticle";

const beltLabels = ["EDITORIAL", "CITATION", "DATA", "INSIGHT"] as const;

const distributionNodes = [
  { id: "search", label: "Search engines", x: 686, y: 84, duration: 6.2, delay: 0.2 },
  { id: "ai", label: "AI systems", x: 760, y: 138, duration: 6.2, delay: 0.55 },
  { id: "editorial", label: "Editorial media", x: 760, y: 204, duration: 6.2, delay: 0.95 },
  { id: "comparison", label: "Comparison platforms", x: 686, y: 264, duration: 6.2, delay: 1.35 },
] as const;

export function AuthoritySignalFactory({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = Boolean(reduceMotion);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[20px] border border-[#e4e0f4] bg-[linear-gradient(140deg,#fdfcff_0%,#f2f4ff_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(157,123,255,0.16),transparent_42%),radial-gradient(circle_at_82%_66%,rgba(91,108,255,0.16),transparent_45%)]" />

      <svg viewBox="0 0 900 320" className="relative z-10 h-full w-full" aria-label="Authority Signal Factory diagram">
        <defs>
          <linearGradient id="factoryPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5b6cff" />
            <stop offset="100%" stopColor="#9d7bff" />
          </linearGradient>
          <linearGradient id="factoryBeltGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d7defc" />
            <stop offset="100%" stopColor="#e7ddff" />
          </linearGradient>
          <clipPath id="factoryBeltWindow">
            <rect x="210" y="148" width="320" height="94" rx="18" />
          </clipPath>
        </defs>

        <rect x="38" y="70" width="146" height="188" rx="22" fill="#ffffff" stroke="#dde3f8" strokeWidth="1.2" />
        <circle cx="110" cy="116" r="30" fill="#edf2ff" stroke="#7084d7" strokeWidth="1.3" />
        <circle cx="100" cy="112" r="3.4" fill="#5f74c9" />
        <circle cx="120" cy="112" r="3.4" fill="#5f74c9" />
        <rect x="78" y="148" width="64" height="58" rx="14" fill="#eef2ff" stroke="#7084d7" strokeWidth="1.3" />
        <rect x="90" y="206" width="40" height="24" rx="8" fill="#e4ebff" stroke="#7084d7" strokeWidth="1.1" />
        <text x="110" y="254" textAnchor="middle" fontSize="10.5" letterSpacing="0.18em" fill="#5f6d9d">
          PR BOT
        </text>

        <motion.g
          animate={shouldReduceMotion ? undefined : { rotate: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.24, 0.45, 1] }}
          style={{ transformOrigin: "150px 176px" }}
        >
          <rect x="146" y="168" width="14" height="42" rx="7" fill="#dce5ff" stroke="#7084d7" strokeWidth="1.1" />
          <rect x="141" y="205" width="22" height="14" rx="4" fill="url(#factoryPrimaryGradient)" />
        </motion.g>

        <g>
          <rect x="160" y="188" width="102" height="20" rx="8" fill="#ffffff" stroke="#d4ddfa" strokeWidth="1.1" />
          <rect x="164" y="166" width="102" height="20" rx="8" fill="#ffffff" stroke="#d4ddfa" strokeWidth="1.1" />
          <rect x="168" y="144" width="102" height="20" rx="8" fill="#ffffff" stroke="#d4ddfa" strokeWidth="1.1" />
          <text x="219" y="158" textAnchor="middle" fontSize="9.2" letterSpacing="0.18em" fill="#5966a3">
            EDITORIAL
          </text>
          <text x="215" y="180" textAnchor="middle" fontSize="9.2" letterSpacing="0.18em" fill="#5966a3">
            CITATION
          </text>
          <text x="211" y="202" textAnchor="middle" fontSize="9.2" letterSpacing="0.18em" fill="#5966a3">
            EXPERT
          </text>
        </g>

        <motion.circle
          cx="173"
          cy="212"
          r="8"
          fill="rgba(130,146,255,0.26)"
          animate={shouldReduceMotion ? undefined : { scale: [0.2, 1.35, 0.3], opacity: [0, 0.9, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.42, times: [0, 0.25, 1] }}
        />

        <rect x="210" y="206" width="320" height="22" rx="11" fill="url(#factoryBeltGradient)" stroke="#c8d5fb" strokeWidth="1.1" />
        <g clipPath="url(#factoryBeltWindow)">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.rect
              key={`belt-stripe-${index}`}
              x={206 + index * 36}
              y="212"
              width="18"
              height="10"
              rx="5"
              fill="rgba(130,146,255,0.32)"
              animate={shouldReduceMotion ? undefined : { x: [0, 36] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.08,
              }}
            />
          ))}

          {beltLabels.map((label, index) => (
            <motion.g
              key={label}
              animate={
                shouldReduceMotion
                  ? { y: [0, -1.6, 0] }
                  : {
                      x: [-260, 320],
                      y: [0, -2, 0],
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 4.8 : 8,
                repeat: Infinity,
                ease: shouldReduceMotion ? "easeInOut" : "linear",
                delay: index * 1.25,
              }}
            >
              <rect x="250" y="168" width="74" height="30" rx="9" fill="#ffffff" stroke="#c7d6ff" strokeWidth="1.1" />
              <text x="287" y="186" textAnchor="middle" fontSize="9.2" letterSpacing="0.14em" fill="#5061a0">
                {label}
              </text>
            </motion.g>
          ))}
        </g>

        <motion.g
          animate={shouldReduceMotion ? undefined : { y: [-28, 7, 7], opacity: [0, 1, 1, 0], scale: [0.88, 1, 1, 0.96] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.45, times: [0, 0.2, 0.76, 1] }}
        >
          <rect x="236" y="160" width="76" height="30" rx="9" fill="#ffffff" stroke="#c7d6ff" strokeWidth="1.1" />
          <text x="274" y="178" textAnchor="middle" fontSize="9.2" letterSpacing="0.14em" fill="#5061a0">
            EDITORIAL
          </text>
        </motion.g>

        <circle cx="548" cy="216" r="10" fill="#edf2ff" stroke="#98a7db" strokeWidth="1.1" />
        <path d="M558 216 C 585 215 598 214 610 208" stroke="#b9c6ef" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M558 216 C 610 162 640 116 677 88" stroke="#b8c2f0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M558 216 C 620 180 690 150 760 138" stroke="#b8c2f0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M558 216 C 620 226 700 214 760 204" stroke="#b8c2f0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M558 216 C 608 250 642 262 686 264" stroke="#b8c2f0" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        <g>
          <circle cx="712" cy="172" r="30" fill="#f1f4ff" stroke="#b7c3ee" strokeWidth="1.2" />
          <circle cx="684" cy="180" r="24" fill="#f1f4ff" stroke="#b7c3ee" strokeWidth="1.2" />
          <circle cx="739" cy="186" r="24" fill="#f1f4ff" stroke="#b7c3ee" strokeWidth="1.2" />
          <circle cx="706" cy="195" r="26" fill="#f1f4ff" stroke="#b7c3ee" strokeWidth="1.2" />
          <text x="711" y="178" textAnchor="middle" fontSize="10" letterSpacing="0.16em" fill="#5967a8">
            SIGNAL
          </text>
          <text x="711" y="193" textAnchor="middle" fontSize="10" letterSpacing="0.16em" fill="#5967a8">
            CLOUD
          </text>
        </g>

        {distributionNodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="17"
              fill="rgba(244,247,255,0.92)"
              stroke="#a7b6e8"
              strokeWidth="1.2"
              animate={
                shouldReduceMotion
                  ? { opacity: [0.85, 1, 0.85] }
                  : {
                      scale: [1, 1, 1.18, 1],
                      fill: ["rgba(244,247,255,0.92)", "rgba(244,247,255,0.92)", "rgba(197,214,255,0.95)", "rgba(244,247,255,0.92)"],
                    }
              }
              transition={{
                duration: node.duration,
                delay: node.delay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.76, 0.86, 1],
              }}
              style={{ filter: "drop-shadow(0 0 18px rgba(120,140,255,0.25))" }}
            />
            <text
              x={node.x + (node.id === "search" || node.id === "comparison" ? -98 : 24)}
              y={node.y + 4}
              fontSize="11"
              letterSpacing="0.04em"
              fill="#4f5e95"
            >
              {node.label}
            </text>
          </g>
        ))}

        <SignalParticle
          origin={{ x: 173, y: 212 }}
          path={[
            { x: 0, y: 0 },
            { x: 36, y: -10 },
            { x: 82, y: -4 },
          ]}
          duration={4}
          delay={0.42}
          radius={3.5}
          color="#91a0ff"
          glow="rgba(120,140,255,0.45)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 530, y: 216 }}
          path={[
            { x: 0, y: 0 },
            { x: 34, y: 0 },
            { x: 72, y: -8 },
          ]}
          duration={4}
          delay={0.85}
          radius={3}
          color="#9c83ff"
          glow="rgba(157,123,255,0.45)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 558, y: 216 }}
          path={[
            { x: 0, y: 0 },
            { x: 54, y: -42 },
            { x: 98, y: -78 },
            { x: 128, y: -132 },
          ]}
          duration={6.2}
          delay={0.2}
          radius={3}
          color="#90a5ff"
          glow="rgba(120,140,255,0.45)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 558, y: 216 }}
          path={[
            { x: 0, y: 0 },
            { x: 66, y: -26 },
            { x: 148, y: -54 },
            { x: 204, y: -78 },
          ]}
          duration={6.2}
          delay={0.55}
          radius={3}
          color="#9e88ff"
          glow="rgba(157,123,255,0.42)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 558, y: 216 }}
          path={[
            { x: 0, y: 0 },
            { x: 72, y: 10 },
            { x: 148, y: 0 },
            { x: 202, y: -12 },
          ]}
          duration={6.2}
          delay={0.95}
          radius={3}
          color="#8da3ff"
          glow="rgba(120,140,255,0.42)"
          reducedMotion={shouldReduceMotion}
        />
        <SignalParticle
          origin={{ x: 558, y: 216 }}
          path={[
            { x: 0, y: 0 },
            { x: 54, y: 30 },
            { x: 100, y: 56 },
            { x: 128, y: 78 },
          ]}
          duration={6.2}
          delay={1.35}
          radius={3}
          color="#9a82ff"
          glow="rgba(157,123,255,0.42)"
          reducedMotion={shouldReduceMotion}
        />
      </svg>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          :global(.authority-factory-soften) {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
