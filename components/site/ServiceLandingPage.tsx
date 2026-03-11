"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Fingerprint,
  Megaphone,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type ServicePage = "seo" | "authority";
type BillingMode = "monthly" | "oneTime";

type FeatureCardData = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

type PricingCardData = {
  title: string;
  cadence?: string;
  price: string;
  priceDetail?: string;
  description?: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  badge?: string;
};

const trustLogos = [
  { src: "/publication-logos/forbes.png", alt: "Forbes", width: 280, height: 90 },
  { src: "/publication-logos/bbc.svg", alt: "BBC", width: 112, height: 40 },
  { src: "/publication-logos/guardian.png", alt: "The Guardian", width: 320, height: 95 },
  { src: "/publication-logos/daily-express-clean.png", alt: "Daily Express", width: 3816, height: 454 },
  { src: "/publication-logos/hubspot-clean.png", alt: "HubSpot", width: 800, height: 232 },
  { src: "/publication-logos/wsj-clean.png", alt: "WSJ", width: 3690, height: 2091 },
] as const;

const seoFeatureCards: FeatureCardData[] = [
  {
    title: "Editorial Media Coverage",
    description: "Earned placements in trusted publications where links cannot be purchased.",
    Icon: Megaphone,
  },
  {
    title: "Algorithmic Authority",
    description: "High quality editorial links that strengthen search engine trust signals.",
    Icon: Fingerprint,
  },
  {
    title: "Expert Positioning",
    description: "Founders and experts are positioned as authoritative sources.",
    Icon: Users,
  },
  {
    title: "Sustainable Rankings",
    description: "Editorial coverage builds authority that compounds.",
    Icon: TrendingUp,
  },
];

const authorityFeatureCards: FeatureCardData[] = [
  {
    title: "Multi-System Visibility",
    description: "Build authority signals that influence search engines, AI systems, and editorial platforms together.",
    Icon: Boxes,
  },
  {
    title: "Citation Opportunity Discovery",
    description: "Identify the recommendation surfaces and editorial sources that shape commercial discovery.",
    Icon: MessageCircle,
  },
  {
    title: "Authority Asset Creation",
    description: "Create strategic comparison assets, landing pages, and supporting content that reinforce expertise.",
    Icon: Sparkles,
  },
  {
    title: "Authority Reinforcement",
    description: "Strengthen the credibility layer around your brand so recommendations compound over time.",
    Icon: Trophy,
  },
];

const seoProcessSteps: ProcessStep[] = [
  {
    step: "Step 1",
    title: "Expert Positioning",
    description: "We identify credible experts and align them with topics journalists are covering.",
  },
  {
    step: "Step 2",
    title: "Media Opportunity Monitoring",
    description: "We track inbound journalist requests across major publications.",
  },
  {
    step: "Step 3",
    title: "Editorial Placement",
    description: "We secure earned coverage and links in trusted publications.",
  },
];

const seoMonthlyPackages: PricingCardData[] = [
  {
    title: "10 Links",
    cadence: "6 monthly payments",
    price: "$1,375",
    priceDetail: "per month",
    bullets: [
      "DR 50-95 PR Links",
      "Guaranteed Average DR 70+",
      "US & UK News Publications",
      "Real-Time Reporting",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact-us?service=seo-digital-pr&package=10-links-monthly",
  },
  {
    title: "20 Links",
    cadence: "6 monthly payments",
    price: "$2,667",
    priceDetail: "per month",
    bullets: [
      "DR 50-95 PR Links",
      "Guaranteed Average DR 70+",
      "US & UK News Publications",
      "Real-Time Reporting",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact-us?service=seo-digital-pr&package=20-links-monthly",
    badge: "Most popular",
  },
  {
    title: "50 Links",
    cadence: "12 monthly payments",
    price: "$3,125",
    priceDetail: "per month",
    bullets: [
      "DR 50-95 PR Links",
      "Guaranteed Average DR 70+",
      "US & UK News Publications",
      "Real-Time Reporting",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact-us?service=seo-digital-pr&package=50-links-monthly",
  },
];

const seoOneTimePackages: PricingCardData[] = [
  {
    title: "5 Links",
    price: "$4,250",
    description: "One-time campaign burst for high-authority editorial placements.",
    bullets: [
      "DR 50-95 PR Links",
      "Guaranteed Average DR 70+",
      "US & UK News Publications",
      "Real-Time Reporting",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact-us?service=seo-digital-pr&package=5-links-one-time",
  },
  {
    title: "10 Links",
    price: "$8,250",
    description: "Expanded one-off package for heavier authority acceleration.",
    bullets: [
      "DR 50-95 PR Links",
      "Guaranteed Average DR 70+",
      "US & UK News Publications",
      "Real-Time Reporting",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact-us?service=seo-digital-pr&package=10-links-one-time",
    badge: "Most popular",
  },
  {
    title: "20 Links",
    price: "$16,000",
    description: "Built for larger campaigns that need stronger editorial volume fast.",
    bullets: [
      "DR 50-95 PR Links",
      "Guaranteed Average DR 70+",
      "US & UK News Publications",
      "Real-Time Reporting",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact-us?service=seo-digital-pr&package=20-links-one-time",
  },
];

const authorityPrograms: PricingCardData[] = [
  {
    title: "AI Visibility Core",
    price: "$1,500",
    priceDetail: "per month",
    cadence: "Minimum 6 months",
    description: "Focused on capturing existing AI citation opportunities.",
    bullets: [
      "3 AI visibility signals per month",
      "Listicle placements",
      "Comparison site inclusions",
      "Curated recommendation placements",
      "Citation monitoring",
      "Opportunity discovery",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=ai-visibility-core",
  },
  {
    title: "AI Visibility Growth",
    price: "$2,500",
    priceDetail: "per month",
    cadence: "Minimum 6 months",
    description: "Designed to expand both citation capture and citation creation.",
    bullets: [
      "6 AI visibility signals per month",
      "Listicle placements",
      "Distributed comparison articles",
      "Guest listicles",
      "Authority content assets",
      "Landing page content assets",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=ai-visibility-growth",
    badge: "Recommended",
  },
  {
    title: "AI Discovery + SEO Optimization",
    price: "$3,000",
    priceDetail: "per month",
    cadence: "Minimum 6 months",
    description: "Combines AI visibility growth with SEO reinforcement.",
    bullets: [
      "Everything in AI Visibility Growth",
      "Optimization of up to 5 pages per month",
      "Internal linking improvements",
      "Content refreshes",
      "On-page SEO implementation",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=ai-discovery-seo-optimization",
  },
  {
    title: "Authority PR Engine",
    price: "Starting at $6,000",
    priceDetail: "per month",
    cadence: "Minimum 6 months",
    description: "Designed to build long-term authority signals influencing both AI systems and audiences.",
    bullets: [
      "AI visibility signals",
      "Podcast appearances",
      "Expert commentary placements",
      "Editorial media features",
      "Interviews and thought leadership placements",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=authority-pr-engine",
  },
];

const authoritySignals = [
  {
    title: "Citation Capture",
    description: "Places your company into sources AI systems already cite.",
    Icon: MessageCircle,
    examples: [
      "Best provider listicles",
      "Comparison articles",
      "Curated recommendation pages",
      "Industry roundups",
    ],
  },
  {
    title: "Citation Creation",
    description: "Creates new sources when opportunities are limited.",
    Icon: Boxes,
    examples: ["New comparison listicles", "Distributed comparison articles", "Guest listicle placements"],
  },
  {
    title: "Authority Reinforcement",
    description: "Strengthens expertise signals.",
    Icon: Trophy,
    examples: [
      "Authority content articles",
      "Service explainers",
      "Landing page assets",
      "Comparison guides",
    ],
  },
] as const;

const authorityFeatureBullets = [
  "Enhanced AI visibility score",
  "Analysis of what AI currently knows about your company",
  "AI knowledge gap analysis",
  "Prompt analysis across 10-20 service/location combinations",
  "Up to 5 discovery prompts per service",
  "AI citation and source analysis",
  "Competitor visibility analysis",
  "Landing page opportunity mapping",
  "AI visibility strategy roadmap",
] as const;

const revealProps = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

function Eyebrow({ children, inverted = false }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        inverted
          ? "border border-white/16 bg-white/10 text-white/90"
          : "border border-[#dedaf0] bg-white text-[#60539d] shadow-[0_12px_28px_rgba(89,84,165,0.08)]",
      )}
    >
      <Sparkles className={cn("h-3.5 w-3.5", inverted ? "text-white" : "text-[#7b63ff]")} />
      {children}
    </span>
  );
}

function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow>{label}</Eyebrow>
      <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.04em] text-[#171929] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-[#5a5d79] sm:text-xl">{description}</p>
    </div>
  );
}

function SurfaceCard({ className, children, hoverLift = false }: { className?: string; children: React.ReactNode; hoverLift?: boolean }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-[#e8e5f3] bg-white shadow-[0_28px_60px_rgba(24,31,62,0.08)]",
        hoverLift && "transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_80px_rgba(24,31,62,0.14)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,122,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(87,157,255,0.08),transparent_24%)] opacity-90" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(123,99,255,0.22),transparent)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-12 rounded-full bg-[linear-gradient(135deg,#6f5dff_0%,#5a4dbf_52%,#4d92ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(103,89,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_rgba(103,89,255,0.34)] sm:h-14 sm:px-7 sm:text-base"
    >
      <Link href={href}>
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

function SecondaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-12 rounded-full border border-[#d8d3eb] bg-white px-6 text-sm font-semibold text-[#252846] shadow-[0_16px_34px_rgba(24,31,62,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7f4ff] sm:h-14 sm:px-7 sm:text-base"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#e6e2f2] bg-white px-4 py-4 shadow-[0_16px_34px_rgba(24,31,62,0.06)]">
      <div className="text-[1.75rem] font-display font-bold tracking-[-0.035em] text-[#171929] sm:text-[2rem]">{value}</div>
      <p className="mt-1 text-sm leading-relaxed text-[#636782]">{label}</p>
    </div>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-[#ece8f5] bg-white">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-6 py-7 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#6b6e8d]">
          Seen in trusted publications
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {trustLogos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center opacity-60 grayscale transition-opacity hover:opacity-90">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-5 w-auto object-contain sm:h-6"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoHeroVisual() {
  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 -top-4 z-20 hidden rounded-[1.35rem] border border-[#e4dff6] bg-white px-4 py-3 shadow-[0_22px_46px_rgba(26,31,62,0.12)] sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Editorial velocity</p>
        <p className="mt-2 text-lg font-display font-bold tracking-[-0.03em] text-[#171929]">Trusted publication wins</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 -left-3 z-20 hidden rounded-[1.35rem] border border-[#ded9f1] bg-white px-4 py-3 shadow-[0_22px_46px_rgba(26,31,62,0.12)] sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Average authority</p>
        <p className="mt-2 text-lg font-display font-bold tracking-[-0.03em] text-[#171929]">DR 70+</p>
      </motion.div>

      <SurfaceCard className="overflow-hidden p-6 sm:p-8">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(127,108,255,0.22),transparent_62%)] blur-3xl" />
        <div className="grid gap-5">
          <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,#1b1748_0%,#4e45b6_58%,#6a61ff_100%)] p-6 text-white shadow-[0_24px_52px_rgba(54,49,130,0.34)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">SEO Digital PR dashboard</p>
                <h3 className="mt-3 text-2xl font-display font-bold tracking-[-0.035em] sm:text-3xl">
                  Build authority signals that move rankings.
                </h3>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/10 p-3">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Inbound journalist requests monitored",
                "Expert-led commentary angles",
                "Editorial placements logged in real time",
              ].map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-white/12 bg-white/10 px-4 py-3 text-sm text-white/78">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SurfaceCard className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Signal stack</p>
              <div className="mt-4 space-y-3">
                {[
                  "Editorial relevance",
                  "Search trust",
                  "Brand authority",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#ece8f5] bg-[#faf9ff] px-4 py-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#efebff] text-[#6f5dff]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-[#323652]">{item}</span>
                  </div>
                ))}
              </div>
            </SurfaceCard>

            <div className="grid gap-4">
              <HeroMetric value="US + UK" label="Publication footprint built for commercial trust." />
              <HeroMetric value="Live" label="Reporting updates as editorial wins land." />
            </div>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

function AuthorityHeroVisual() {
  const nodes = [
    { top: "14%", left: "16%", size: "h-14 w-14", delay: 0 },
    { top: "18%", left: "68%", size: "h-10 w-10", delay: 0.5 },
    { top: "48%", left: "78%", size: "h-12 w-12", delay: 1 },
    { top: "68%", left: "24%", size: "h-11 w-11", delay: 1.4 },
    { top: "74%", left: "60%", size: "h-9 w-9", delay: 1.8 },
  ] as const;

  const lines = [
    "left-[23%] top-[24%] w-[43%] rotate-[11deg]",
    "left-[30%] top-[52%] w-[40%] rotate-[-14deg]",
    "left-[52%] top-[38%] w-[24%] rotate-[28deg]",
    "left-[24%] top-[40%] w-[20%] rotate-[62deg]",
  ] as const;

  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 top-6 z-20 hidden rounded-[1.35rem] border border-[#e4dff6] bg-white px-4 py-3 shadow-[0_22px_46px_rgba(26,31,62,0.12)] sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Recommendation layer</p>
        <p className="mt-2 text-lg font-display font-bold tracking-[-0.03em] text-[#171929]">Search + AI + editorial</p>
      </motion.div>

      <SurfaceCard className="overflow-hidden p-6 sm:p-8">
        <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(127,108,255,0.18),transparent_62%)] blur-3xl" />
        <div className="grid gap-5">
          <div className="rounded-[1.8rem] border border-[#ece7f7] bg-[linear-gradient(135deg,#f8f6ff_0%,#eef1ff_100%)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Authority signal map</p>
                <h3 className="mt-3 text-2xl font-display font-bold tracking-[-0.035em] text-[#171929] sm:text-3xl">
                  Build the authority network behind recommendation visibility.
                </h3>
              </div>
              <div className="rounded-2xl border border-[#e2ddf5] bg-white p-3 text-[#6f5dff] shadow-[0_14px_32px_rgba(24,31,62,0.08)]">
                <Boxes className="h-6 w-6" />
              </div>
            </div>

            <div className="relative mt-8 h-[15rem] overflow-hidden rounded-[1.6rem] border border-[#e4e0f4] bg-white sm:h-[16rem]">
              {lines.map((lineClass) => (
                <div
                  key={lineClass}
                  className={cn(
                    "absolute h-px origin-left bg-[linear-gradient(90deg,rgba(116,95,255,0.45),rgba(95,152,255,0.06))]",
                    lineClass,
                  )}
                />
              ))}

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6f5dff_0%,#4d92ff_100%)] shadow-[0_22px_52px_rgba(99,90,255,0.28)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.14)]">
                  <Fingerprint className="h-7 w-7" />
                </div>
              </motion.div>

              {nodes.map((node, index) => (
                <motion.div
                  key={`${node.top}-${node.left}`}
                  animate={{ y: [0, -9, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                  className={cn(
                    "absolute flex items-center justify-center rounded-full border border-[#e5e1f6] bg-white shadow-[0_14px_30px_rgba(24,31,62,0.08)]",
                    node.size,
                  )}
                  style={{ top: node.top, left: node.left }}
                >
                  <span className={cn("rounded-full bg-[#6f5dff] shadow-[0_0_18px_rgba(111,93,255,0.34)]", index % 2 === 0 ? "h-3 w-3" : "h-2.5 w-2.5")} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <HeroMetric value="10-20" label="Prompt combinations mapped across service and location intent." />
            <HeroMetric value="Multi-system" label="Signals designed for AI, search, editorial, and comparison surfaces." />
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

function DarkHighlightPanel({
  label,
  title,
  description,
  proofs,
}: {
  label: string;
  title: string;
  description: string;
  proofs: string[];
}) {
  return (
    <motion.div {...revealProps}>
      <div className="relative overflow-hidden rounded-[2.4rem] bg-[linear-gradient(135deg,#090d22_0%,#11173b_52%,#121730_100%)] px-6 py-8 text-white shadow-[0_34px_88px_rgba(8,11,29,0.32)] sm:px-8 sm:py-10 md:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(115,93,255,0.22),transparent_30%),radial-gradient(circle_at_84%_22%,rgba(87,157,255,0.14),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow inverted>{label}</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.04em] text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">{description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {proofs.map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/84">{item}</span>
                </div>
              </div>
            ))}
            <div className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Authority proof</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {trustLogos.slice(0, 6).map((logo) => (
                  <div key={logo.alt} className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-4 opacity-80">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/78">{logo.alt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ item }: { item: FeatureCardData }) {
  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <SurfaceCard hoverLift className="h-full p-6 sm:p-7">
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#f3efff_0%,#eef2ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)]">
          <item.Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-[1.7rem] font-display font-bold tracking-[-0.035em] text-[#171929]">{item.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-[#61657f]">{item.description}</p>
      </SurfaceCard>
    </motion.div>
  );
}

function ProcessCard({ item, index }: { item: ProcessStep; index: number }) {
  return (
    <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: index * 0.08 }}>
      <SurfaceCard hoverLift className="h-full p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#dcd6f0] bg-white text-sm font-bold text-[#6f5dff] shadow-[0_12px_28px_rgba(89,84,165,0.08)]">
            {index + 1}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6de0]">{item.step}</p>
            <h3 className="mt-2 text-2xl font-display font-bold tracking-[-0.03em] text-[#171929]">{item.title}</h3>
          </div>
        </div>
        <p className="mt-5 text-base leading-relaxed text-[#61657f]">{item.description}</p>
      </SurfaceCard>
    </motion.div>
  );
}

function GradientPricingCard({ card }: { card: PricingCardData }) {
  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <div className="group relative h-full overflow-hidden rounded-[2rem] p-[1px] shadow-[0_26px_66px_rgba(86,74,193,0.18)] transition duration-500 hover:shadow-[0_34px_84px_rgba(86,74,193,0.24)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#8470ff_0%,#5a4dbf_48%,#437dff_100%)]" />
        <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-white/12 blur-3xl" />
        <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-[#f46bcb]/18 blur-3xl" />
        <div className="relative flex h-full flex-col rounded-[calc(2rem-1px)] bg-[linear-gradient(155deg,#161243_0%,#3f36a7_58%,#5f6bff_100%)] p-6 text-white sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[1.8rem] font-display font-bold tracking-[-0.035em]">{card.title}</h3>
              {card.cadence ? (
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/68">{card.cadence}</p>
              ) : null}
            </div>
            {card.badge ? (
              <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/88">
                {card.badge}
              </span>
            ) : null}
          </div>

          <div className="mt-7">
            <div className="text-4xl font-display font-bold tracking-[-0.05em] sm:text-5xl">{card.price}</div>
            {card.priceDetail ? <p className="mt-2 text-sm text-white/62">{card.priceDetail}</p> : null}
            {card.description ? <p className="mt-4 text-base leading-relaxed text-white/76">{card.description}</p> : null}
          </div>

          <div className="mt-7 space-y-3">
            {card.bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/12">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-white/84">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <Button
              asChild
              variant="ghost"
              className="h-12 w-full rounded-full bg-white text-[#3f36a7] shadow-[0_16px_34px_rgba(255,255,255,0.14)] transition-all duration-300 hover:bg-white/92"
            >
              <Link href={card.ctaHref}>
                {card.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SeoPricingSection() {
  const [billingMode, setBillingMode] = useState<BillingMode>("monthly");
  const cards = billingMode === "monthly" ? seoMonthlyPackages : seoOneTimePackages;

  return (
    <section id="packages" className="bg-white py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <SectionHeading
          label="Packages"
          title="Productized editorial authority packages."
          description="Choose a retained monthly campaign or a one-time authority burst. This is the only place on the page where the gradient card language takes over."
          align="center"
        />

        <motion.div {...revealProps} className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-[#ddd9ef] bg-[#f8f6ff] p-1.5 shadow-[0_14px_28px_rgba(24,31,62,0.06)]">
            <button
              type="button"
              onClick={() => setBillingMode("monthly")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                billingMode === "monthly"
                  ? "bg-[linear-gradient(135deg,#6f5dff_0%,#4d92ff_100%)] text-white"
                  : "text-[#555974] hover:text-[#171929]",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingMode("oneTime")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                billingMode === "oneTime"
                  ? "bg-[linear-gradient(135deg,#6f5dff_0%,#4d92ff_100%)] text-white"
                  : "text-[#555974] hover:text-[#171929]",
              )}
            >
              One-Time
            </button>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {cards.map((card) => (
            <GradientPricingCard key={`${billingMode}-${card.title}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#fbfaff_0%,#f3f2fb_100%)] py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <motion.div {...revealProps}>
          <SurfaceCard className="mx-auto max-w-[1080px] overflow-hidden p-6 sm:p-8 md:p-10">
            <div className="absolute -right-14 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(127,108,255,0.18),transparent_64%)] blur-3xl" />
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionHeading
                  label="AI Visibility Strategy Blueprint"
                  title="A strategic diagnostic before bigger authority decisions."
                  description="A deep analysis of how AI systems currently perceive your company and what must change for AI to recommend you."
                />
                <div className="mt-8 rounded-[1.75rem] border border-[#e5e0f4] bg-[linear-gradient(135deg,#f9f7ff_0%,#eef2ff_100%)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">One-time engagement</p>
                  <div className="mt-4 text-5xl font-display font-bold tracking-[-0.05em] text-[#171929]">$500</div>
                  <div className="mt-8">
                    <PrimaryButton href="/contact-us?service=authority-pr&program=ai-visibility-blueprint" label="Start Blueprint" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {authorityFeatureBullets.map((bullet) => (
                  <div key={bullet} className="rounded-[1.4rem] border border-[#e8e5f3] bg-white px-4 py-4 shadow-[0_14px_30px_rgba(24,31,62,0.05)]">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0ecff] text-[#6f5dff]">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="text-sm leading-relaxed text-[#575b76]">{bullet}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>
        </motion.div>
      </div>
    </section>
  );
}

function AuthorityProgramsSection() {
  return (
    <section id="programs" className="bg-white py-24 sm:py-28">
      <div className="mx-auto w-full max-w-[1180px] px-6">
        <SectionHeading
          label="Monthly Programs"
          title="Programs built to influence recommendation systems over time."
          description="These tiers are designed to feel like product packages, not generic retainers."
          align="center"
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {authorityPrograms.map((card) => (
            <GradientPricingCard key={card.title} card={card} />
          ))}
        </div>

        <motion.div {...revealProps} className="mt-8">
          <SurfaceCard className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Optional add-on</p>
                <h3 className="mt-3 text-3xl font-display font-bold tracking-[-0.035em] text-[#171929]">Content Engine</h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5d617b]">
                  $2,000 per month for a structured content layer that supports authority positioning, comparison visibility, and AI discovery.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-[#e7e3f4] bg-[linear-gradient(135deg,#faf8ff_0%,#eef2ff_100%)] p-5 md:min-w-[19rem]">
                <div className="text-4xl font-display font-bold tracking-[-0.04em] text-[#171929]">$2,000</div>
                <p className="mt-2 text-sm text-[#6a6f8a]">per month</p>
                <div className="mt-5 space-y-2 text-sm text-[#565a75]">
                  <p>Content strategy blueprint</p>
                  <p>5 expert content pieces per month</p>
                  <p>Authority positioning topics</p>
                  <p>Structured content designed for AI discovery</p>
                </div>
              </div>
            </div>
          </SurfaceCard>
        </motion.div>
      </div>
    </section>
  );
}

function SignalCard({ item }: { item: (typeof authoritySignals)[number] }) {
  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <SurfaceCard hoverLift className="h-full p-6 sm:p-7">
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#f3efff_0%,#eef2ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)]">
          <item.Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-[1.7rem] font-display font-bold tracking-[-0.035em] text-[#171929]">{item.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-[#61657f]">{item.description}</p>
        <div className="mt-6 space-y-3">
          {item.examples.map((example) => (
            <div key={example} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f0ecff] text-[#6f5dff]">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-relaxed text-[#575b76]">{example}</span>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </motion.div>
  );
}

function FinalCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <motion.div {...revealProps}>
      <SurfaceCard className="overflow-hidden p-6 sm:p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(127,108,255,0.12),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(87,157,255,0.08),transparent_26%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Eyebrow>Ready to move</Eyebrow>
          <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.04em] text-[#171929] sm:text-5xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#5b5f79] sm:text-xl">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton href={primaryHref} label={primaryLabel} />
            <SecondaryButton href={secondaryHref} label={secondaryLabel} />
          </div>
        </div>
      </SurfaceCard>
    </motion.div>
  );
}

function SeoLandingContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#ede9f6] bg-[radial-gradient(circle_at_14%_0%,rgba(144,122,255,0.18),transparent_26%),radial-gradient(circle_at_88%_10%,rgba(79,155,255,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#fbfbff_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(117,110,174,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(117,110,174,0.12)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-20 pt-10 sm:pb-24">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
            <motion.div {...revealProps}>
              <Eyebrow>SEO Digital PR</Eyebrow>
              <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.055em] text-[#171929] sm:text-6xl md:text-7xl">
                SEO Digital PR
              </h1>
              <p className="mt-5 max-w-xl text-balance text-xl leading-relaxed text-[#4e526d] sm:text-2xl">
                Editorial media placements that build authority signals and improve organic rankings.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5b5f79]">
                We position credible experts in the media around the topics journalists are actively covering. Through inbound media opportunities and editorial placements we earn coverage in trusted publications that strengthens rankings, E-E-A-T signals and brand authority.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="#packages" label="View Packages" />
                <SecondaryButton href="/contact-us" label="Book Strategy Call" />
              </div>
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
              <SeoHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <DarkHighlightPanel
            label="Authority highlight"
            title="Where others scatter links, we build authority."
            description="The goal is not random link volume. The goal is earned editorial coverage around commercially relevant topics that compounds into stronger search trust over time."
            proofs={[
              "Trusted publication coverage built around journalist demand",
              "Expert positioning that strengthens E-E-A-T signals",
              "Editorial links that cannot simply be bought",
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <SectionHeading
            label="What SEO Digital PR Does"
            title="Four reasons the model is built for authority, not noise."
            description="This section stays intentionally clean: white cards, strong hierarchy, and enough space for the product story to breathe."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {seoFeatureCards.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f4fb] py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <SectionHeading
            label="How It Works"
            title="A simple delivery system with clear operational steps."
            description="The process section is lighter and cleaner by design, mirroring the homepage rhythm rather than reverting to another heavy dark block."
            align="center"
          />
          <div className="relative mt-12">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(121,109,214,0.32),transparent)] md:left-1/2 md:block md:-translate-x-1/2" />
            <div className="grid gap-6 md:grid-cols-3">
              {seoProcessSteps.map((item, index) => (
                <ProcessCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SeoPricingSection />

      <section className="bg-[linear-gradient(180deg,#fbfbff_0%,#f3f2fb_100%)] py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <motion.div {...revealProps}>
            <SurfaceCard className="p-6 sm:p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <SectionHeading
                    label="Why This Works"
                    title="Authority that compounds."
                    description="SEO Digital PR builds editorial authority signals that search engines trust. Each placement strengthens credibility, improves ranking potential, and increases the chance that both search systems and AI systems recognize your brand as a trusted source."
                  />
                  <div className="mt-8">
                    <PrimaryButton href="/contact-us" label="Book a Strategy Call" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <HeroMetric value="E-E-A-T" label="Signals layered through consistent expert-led editorial wins." />
                  <HeroMetric value="Editorial" label="Coverage that cannot be bought carries stronger trust weight." />
                  <HeroMetric value="Compounding" label="Authority value persists beyond the campaign window." />
                  <HeroMetric value="Search + AI" label="Visibility signals influence both rankings and recommendations." />
                </div>
              </div>
            </SurfaceCard>
          </motion.div>
        </div>
      </section>

      <section className="bg-white pb-24 pt-2 sm:pb-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <FinalCta
            title="Ready to turn editorial coverage into ranking leverage?"
            description="If you want a cleaner authority layer around your brand, the next move is simple: choose the package model or book a strategy call."
            primaryHref="/contact-us"
            primaryLabel="Book Strategy Call"
            secondaryHref="#packages"
            secondaryLabel="View Packages"
          />
        </div>
      </section>
    </>
  );
}

function AuthorityLandingContent() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#ede9f6] bg-[radial-gradient(circle_at_14%_0%,rgba(144,122,255,0.18),transparent_26%),radial-gradient(circle_at_88%_10%,rgba(79,155,255,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#fbfbff_100%)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(117,110,174,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(117,110,174,0.12)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-20 pt-10 sm:pb-24">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
            <motion.div {...revealProps}>
              <Eyebrow>Authority PR</Eyebrow>
              <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.055em] text-[#171929] sm:text-6xl md:text-7xl">
                Authority PR
              </h1>
              <p className="mt-5 max-w-xl text-balance text-xl leading-relaxed text-[#4e526d] sm:text-2xl">
                Build brand authority that influences search engines, AI systems, and human audiences.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5b5f79]">
                Modern discovery is shaped by search engines, AI assistants, comparison platforms and editorial media. Authority PR builds the signals that influence how companies are recommended across those systems.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/contact-us" label="Book Strategy Call" />
                <SecondaryButton href="#programs" label="View Programs" />
              </div>
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
              <AuthorityHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <DarkHighlightPanel
            label="Authority highlight"
            title="Build the signals that travel across search, AI, and editorial discovery."
            description="Authority PR is narrative-led, system-aware, and built for a world where recommendation engines increasingly shape demand."
            proofs={[
              "Influence how AI systems and search surfaces describe your company",
              "Create stronger citation density across trusted recommendation sources",
              "Reinforce expertise through editorial and authority content assets",
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <SectionHeading
            label="Authority PR Overview"
            title="A more strategic product story, still structured like software."
            description="The visual language stays clean and bright here: white cards, measured shadows, and only enough accent color to signal hierarchy."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {authorityFeatureCards.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <BlueprintSection />

      <AuthorityProgramsSection />

      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <SectionHeading
            label="How AI Visibility Signals Work"
            title="Three signal layers that influence recommendation systems."
            description="Keep the explanation section readable and structured. White background, short explanations, and enough card separation to feel premium rather than dense."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {authoritySignals.map((item) => (
              <SignalCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f4fb] py-24 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <motion.div {...revealProps}>
            <SurfaceCard className="p-6 sm:p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <SectionHeading
                    label="Example Monthly Mix"
                    title="A realistic blend of capture, creation, and reinforcement."
                    description="A typical month is not one tactic. It is a portfolio of authority signals distributed across the systems that matter."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "3 listicle placements",
                    "1 distributed comparison article",
                    "1 authority article",
                    "1 landing page asset",
                  ].map((item) => (
                    <div key={item} className="rounded-[1.5rem] border border-[#e7e3f4] bg-[linear-gradient(135deg,#faf8ff_0%,#eef2ff_100%)] px-5 py-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#6f5dff] shadow-[0_10px_24px_rgba(89,84,165,0.08)]">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="text-base leading-relaxed text-[#565a75]">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </motion.div>
        </div>
      </section>

      <section className="bg-white pb-24 pt-2 sm:pb-28">
        <div className="mx-auto w-full max-w-[1180px] px-6">
          <FinalCta
            title="Build authority where discovery happens."
            description="Search engines, AI assistants, editorial sources, and comparison platforms increasingly determine how brands are discovered. Authority PR is built for that environment."
            primaryHref="/contact-us"
            primaryLabel="Book Strategy Call"
            secondaryHref="#programs"
            secondaryLabel="View Programs"
          />
        </div>
      </section>
    </>
  );
}

export function ServiceLandingPage({ page }: { page: ServicePage }) {
  return (
    <>
      <main className="bg-[#fbfbfe] text-[#171929]">
        <div className="relative">
          <SiteHeader theme="light" />
          {page === "seo" ? <SeoLandingContent /> : <AuthorityLandingContent />}
        </div>
      </main>
      <SiteFooter flushTop />
    </>
  );
}
