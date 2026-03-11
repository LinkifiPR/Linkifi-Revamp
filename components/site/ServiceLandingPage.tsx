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
};

const heroLogoItems = [
  { src: "/publication-logos/forbes.png", alt: "Forbes", width: 280, height: 90 },
  { src: "/publication-logos/guardian.png", alt: "The Guardian", width: 320, height: 95 },
  { src: "/publication-logos/healthline.png", alt: "Healthline", width: 360, height: 70 },
  { src: "/publication-logos/bbc.svg", alt: "BBC", width: 112, height: 40 },
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
] as const;

const seoProcessSteps: ProcessStep[] = [
  {
    step: "Step 1",
    title: "Expert Positioning",
    description:
      "We identify credible experts and align them with topics journalists are covering.",
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
] as const;

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
] as const;

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
] as const;

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
    description:
      "Designed to build long-term authority signals influencing both AI systems and audiences.",
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
] as const;

const authoritySignals: Array<FeatureCardData & { examples: string[] }> = [
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
    examples: [
      "New comparison listicles",
      "Distributed comparison articles",
      "Guest listicle placements",
    ],
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
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

function SectionDivider() {
  return (
    <div className="mx-auto mt-4 h-px w-full max-w-[1180px] bg-[linear-gradient(90deg,transparent,rgba(154,140,255,0.36),transparent)]" />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/7 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/84 backdrop-blur-md">
      <Sparkles className="h-3.5 w-3.5 text-[#b8a8ff]" />
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
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-white/72 sm:text-xl">{description}</p>
    </div>
  );
}

function GlassPanel({
  className,
  children,
  hoverLift = false,
}: {
  className?: string;
  children: React.ReactNode;
  hoverLift?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(150deg,rgba(15,18,51,0.86),rgba(10,13,37,0.94))] shadow-[0_28px_72px_rgba(3,6,21,0.5)] backdrop-blur-xl",
        hoverLift &&
          "transition duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_34px_90px_rgba(3,6,21,0.62)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(164,125,255,0.2),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(74,142,255,0.18),transparent_30%)] opacity-95 transition duration-500 group-hover:scale-105" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.42),transparent)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HeroButton({
  href,
  label,
  secondary = false,
}: {
  href: string;
  label: string;
  secondary?: boolean;
}) {
  return (
    <Button
      asChild
      className={cn(
        "h-12 rounded-full px-6 text-sm font-semibold sm:h-14 sm:px-7 sm:text-base",
        secondary
          ? "border border-white/16 bg-white/8 text-white hover:bg-white/14"
          : "bg-[linear-gradient(135deg,#8f72ff_0%,#6c60ff_52%,#4f92ff_100%)] text-white shadow-[0_18px_40px_rgba(100,88,255,0.34)] hover:opacity-95",
      )}
      variant="ghost"
    >
      <Link href={href}>
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] border border-white/12 bg-white/[0.06] px-4 py-4 backdrop-blur-md">
      <div className="text-2xl font-display font-bold tracking-[-0.03em] text-white sm:text-3xl">{value}</div>
      <p className="mt-1 text-sm leading-relaxed text-white/62">{label}</p>
    </div>
  );
}

function SeoHeroVisual() {
  return (
    <GlassPanel className="min-h-[28rem] p-6 sm:p-8 lg:min-h-[34rem] lg:p-10">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.72, 0.95, 0.72] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(155,116,255,0.46),rgba(88,98,255,0.12)_52%,transparent_72%)] blur-2xl"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex flex-wrap gap-3">
          {heroLogoItems.map((logo, index) => (
            <motion.div
              key={logo.alt}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full border border-white/14 bg-white/[0.07] px-4 py-3 backdrop-blur-md"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-5 w-auto object-contain brightness-0 invert sm:h-6"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <GlassPanel className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c6baff]">
                  Editorial Signal Feed
                </p>
                <h3 className="mt-3 text-2xl font-display font-bold tracking-[-0.03em] text-white sm:text-3xl">
                  Coverage that compounds search trust.
                </h3>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-3">
                <BarChart3 className="h-6 w-6 text-[#d9cfff]" />
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                "Trusted publication placements",
                "Journalist request monitoring",
                "Authority-first topic alignment",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/12">
                    <CheckCircle2 className="h-4 w-4 text-[#d7ceff]" />
                  </span>
                  <span className="text-sm font-medium text-white/84 sm:text-[0.96rem]">{item}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

          <div className="grid gap-4">
            <HeroStat value="DR 70+" label="Average authority benchmark across secured placements." />
            <HeroStat value="US + UK" label="News publication footprint designed for commercial trust." />
            <HeroStat value="Live" label="Real-time reporting so authority gains are visible as they land." />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

function AuthorityHeroVisual() {
  const nodes = [
    { label: "AI citation", top: "16%", left: "18%", size: "h-16 w-16", delay: 0 },
    { label: "Search trust", top: "20%", left: "66%", size: "h-12 w-12", delay: 0.6 },
    { label: "Editorial proof", top: "52%", left: "80%", size: "h-14 w-14", delay: 1.1 },
    { label: "Recommendation", top: "68%", left: "26%", size: "h-12 w-12", delay: 1.6 },
    { label: "Brand recall", top: "74%", left: "60%", size: "h-10 w-10", delay: 2.1 },
  ] as const;

  const lines = [
    "left-[24%] top-[25%] w-[44%] rotate-[12deg]",
    "left-[30%] top-[55%] w-[42%] rotate-[-16deg]",
    "left-[52%] top-[39%] w-[28%] rotate-[28deg]",
    "left-[24%] top-[41%] w-[22%] rotate-[64deg]",
  ] as const;

  return (
    <GlassPanel className="min-h-[28rem] p-6 sm:p-8 lg:min-h-[34rem] lg:p-10">
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.64, 0.88, 0.64] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(146,110,255,0.42),rgba(58,103,255,0.08)_54%,transparent_72%)] blur-2xl"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="rounded-[1.7rem] border border-white/12 bg-white/[0.05] p-5 backdrop-blur-md sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c6baff]">
                Signal Network
              </p>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-[-0.03em] text-white sm:text-3xl">
                Authority signals distributed across the systems that shape discovery.
              </h3>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-3">
              <Boxes className="h-6 w-6 text-[#d9cfff]" />
            </div>
          </div>
        </div>

        <div className="relative mt-6 h-[18rem] sm:h-[20rem]">
          {lines.map((lineClass) => (
            <div
              key={lineClass}
              className={cn(
                "absolute h-px origin-left bg-[linear-gradient(90deg,rgba(149,127,255,0.72),rgba(94,150,255,0.06))]",
                lineClass,
              )}
            />
          ))}

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(160deg,rgba(130,101,255,0.44),rgba(46,79,198,0.2))] shadow-[0_0_48px_rgba(121,103,255,0.34)]"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/18 bg-[#090c23]/90 backdrop-blur-md">
              <Fingerprint className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          {nodes.map((node) => (
            <motion.div
              key={node.label}
              animate={{ y: [0, -10, 0], boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 28px rgba(124,105,255,0.28)", "0 0 0 rgba(0,0,0,0)"] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              className={cn(
                "absolute flex items-center justify-center rounded-full border border-white/16 bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] backdrop-blur-md",
                node.size,
              )}
              style={{ top: node.top, left: node.left }}
            >
              <span className="sr-only">{node.label}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,0.8)]" />
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <HeroStat value="10-20" label="Prompt combinations mapped across service and location intent." />
          <HeroStat value="Multi-system" label="Built for AI assistants, search platforms, and editorial surfaces together." />
        </div>
      </div>
    </GlassPanel>
  );
}

function FeatureCard({ item }: { item: FeatureCardData }) {
  return (
    <motion.div {...revealProps}>
      <GlassPanel hoverLift className="h-full p-6 sm:p-7">
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-white/14 bg-white/9">
          <item.Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="mt-6 text-2xl font-display font-bold tracking-[-0.03em] text-white">{item.title}</h3>
        <p className="mt-4 text-base leading-relaxed text-white/70">{item.description}</p>
      </GlassPanel>
    </motion.div>
  );
}

function ProcessCard({ item, index }: { item: ProcessStep; index: number }) {
  return (
    <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: index * 0.08 }}>
      <GlassPanel hoverLift className="h-full p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(145deg,#9380ff,#5a78ff)] text-sm font-bold text-white">
            {index + 1}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c6baff]">{item.step}</p>
            <h3 className="mt-2 text-2xl font-display font-bold tracking-[-0.03em] text-white">
              {item.title}
            </h3>
          </div>
        </div>
        <p className="mt-5 text-base leading-relaxed text-white/70">{item.description}</p>
      </GlassPanel>
    </motion.div>
  );
}

function PricingCard({
  card,
  highlighted = false,
}: {
  card: PricingCardData;
  highlighted?: boolean;
}) {
  return (
    <motion.div {...revealProps}>
      <GlassPanel
        hoverLift
        className={cn(
          "flex h-full flex-col p-6 sm:p-7",
          highlighted && "border-[#bdafff]/26 shadow-[0_32px_90px_rgba(76,92,255,0.42)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[1.75rem] font-display font-bold tracking-[-0.03em] text-white">
              {card.title}
            </h3>
            {card.cadence ? (
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c6baff]">
                {card.cadence}
              </p>
            ) : null}
          </div>
          {highlighted ? (
            <span className="rounded-full border border-white/16 bg-white/9 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82">
              Popular
            </span>
          ) : null}
        </div>

        <div className="mt-7">
          <div className="text-4xl font-display font-bold tracking-[-0.04em] text-white sm:text-5xl">
            {card.price}
          </div>
          {card.priceDetail ? (
            <p className="mt-2 text-sm font-medium text-white/58">{card.priceDetail}</p>
          ) : null}
          {card.description ? (
            <p className="mt-4 text-base leading-relaxed text-white/72">{card.description}</p>
          ) : null}
        </div>

        <div className="mt-7 space-y-3">
          {card.bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/9">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#e0d7ff]" />
              </span>
              <span className="text-sm leading-relaxed text-white/78 sm:text-[0.96rem]">{bullet}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <Button
            asChild
            variant="ghost"
            className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#8f72ff_0%,#6c60ff_52%,#4f92ff_100%)] text-sm font-semibold text-white shadow-[0_18px_38px_rgba(100,88,255,0.28)] hover:opacity-95"
          >
            <Link href={card.ctaHref}>
              {card.ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function SeoPackagesSection() {
  const [billingMode, setBillingMode] = useState<BillingMode>("monthly");
  const cards = billingMode === "monthly" ? seoMonthlyPackages : seoOneTimePackages;

  return (
    <section id="packages" className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
      <motion.div {...revealProps}>
        <GlassPanel className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              label="Packages"
              title="Productized editorial authority packages."
              description="Choose between a retained campaign or a one-time authority burst. Every package is built around earned editorial coverage, trusted publication quality, and reporting clarity."
            />

            <div className="inline-flex rounded-full border border-white/12 bg-white/7 p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setBillingMode("monthly")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5",
                  billingMode === "monthly"
                    ? "bg-[linear-gradient(135deg,#8f72ff_0%,#5d6dff_100%)] text-white"
                    : "text-white/66 hover:text-white",
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
                    ? "bg-[linear-gradient(135deg,#8f72ff_0%,#5d6dff_100%)] text-white"
                    : "text-white/66 hover:text-white",
                )}
              >
                One-Time
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-3">
            {cards.map((card, index) => (
              <PricingCard
                key={`${billingMode}-${card.title}`}
                card={card}
                highlighted={index === 1}
              />
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}

function BlueprintPanel() {
  return (
    <motion.section {...revealProps} className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
      <GlassPanel className="p-6 sm:p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <SectionHeading
              label="AI Visibility Strategy Blueprint"
              title="A strategic diagnostic before bigger authority decisions."
              description="A deep analysis of how AI systems currently perceive your company and what must change for AI to recommend you."
            />
            <div className="mt-8 rounded-[1.6rem] border border-white/12 bg-white/[0.05] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6baff]">
                One-time engagement
              </p>
              <div className="mt-4 text-5xl font-display font-bold tracking-[-0.04em] text-white">
                $500
              </div>
              <Button
                asChild
                variant="ghost"
                className="mt-8 h-12 rounded-full bg-[linear-gradient(135deg,#8f72ff_0%,#6c60ff_52%,#4f92ff_100%)] px-6 text-sm font-semibold text-white hover:opacity-95"
              >
                <Link href="/contact-us?service=authority-pr&program=ai-visibility-blueprint">
                  Start Blueprint
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {authorityFeatureBullets.map((bullet) => (
              <div
                key={bullet}
                className="rounded-[1.4rem] border border-white/12 bg-white/[0.05] px-4 py-4 backdrop-blur-md"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/9">
                    <CheckCircle2 className="h-4 w-4 text-[#e0d7ff]" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/78">{bullet}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </motion.section>
  );
}

function AuthorityProgramsSection() {
  return (
    <section id="programs" className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
      <motion.div {...revealProps}>
        <GlassPanel className="p-6 sm:p-8 md:p-10">
          <SectionHeading
            label="Monthly Programs"
            title="Programs built to influence recommendation systems over time."
            description="Each program combines authority signal acquisition, citation work, and visibility reinforcement with a clear delivery cadence."
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {authorityPrograms.map((card, index) => (
              <PricingCard key={card.title} card={card} highlighted={index === 1 || index === 3} />
            ))}
          </div>

          <div className="mt-8">
            <GlassPanel className="p-6 sm:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c6baff]">
                    Optional add-on
                  </p>
                  <h3 className="mt-3 text-3xl font-display font-bold tracking-[-0.03em] text-white">
                    Content Engine
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/72">
                    $2,000 per month for a structured content layer designed to support authority
                    positioning and AI discovery.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/12 bg-white/[0.05] p-5 md:min-w-[19rem]">
                  <div className="text-4xl font-display font-bold tracking-[-0.04em] text-white">
                    $2,000
                  </div>
                  <p className="mt-2 text-sm text-white/60">per month</p>
                  <div className="mt-5 space-y-2 text-sm text-white/78">
                    <p>Content strategy blueprint</p>
                    <p>5 expert content pieces per month</p>
                    <p>Authority positioning topics</p>
                    <p>Structured content designed for AI discovery</p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}

function SeoLandingContent() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 pt-10 sm:pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
            <motion.div {...revealProps}>
              <SectionLabel>SEO Digital PR</SectionLabel>
              <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
                SEO Digital PR
              </h1>
              <p className="mt-5 max-w-xl text-balance text-xl leading-relaxed text-white/78 sm:text-2xl">
                Editorial media placements that build authority signals and improve organic rankings.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/66">
                We position credible experts in the media around the topics journalists are actively
                covering. Through inbound media opportunities and editorial placements we earn
                coverage in trusted publications that strengthens rankings, E-E-A-T signals and
                brand authority.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <HeroButton href="#packages" label="View Packages" />
                <HeroButton href="/contact-us" label="Book Strategy Call" secondary />
              </div>
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
              <SeoHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
        <SectionHeading
          label="What SEO Digital PR Does"
          title="Authority signals built through earned editorial placements."
          description="The product is simple: position credible experts, secure trusted media coverage, and turn that coverage into compounding search authority."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {seoFeatureCards.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
        <SectionHeading
          label="How It Works"
          title="A clean operational system from expert matching to earned coverage."
          description="The workflow is built to keep campaigns commercially relevant, journalist aligned, and measurable."
        />

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[linear-gradient(180deg,rgba(150,131,255,0.4),transparent)] md:left-1/2 md:block md:-translate-x-1/2" />
          <div className="grid gap-6 md:grid-cols-3">
            {seoProcessSteps.map((item, index) => (
              <ProcessCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <SeoPackagesSection />

      <SectionDivider />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
        <motion.div {...revealProps}>
          <GlassPanel className="p-6 sm:p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <SectionLabel>Why This Works</SectionLabel>
                <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
                  Authority that compounds
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
                  SEO Digital PR builds editorial authority signals that search engines trust. Each
                  placement strengthens credibility, improves ranking potential and increases the
                  likelihood that both search engines and AI systems recognize your brand as a
                  trusted source.
                </p>
                <div className="mt-8">
                  <HeroButton href="/contact-us" label="Book a Strategy Call" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <HeroStat value="E-E-A-T" label="Signals layered through consistent expert-led editorial wins." />
                <HeroStat value="Editorial" label="Coverage that cannot be bought carries stronger trust weight." />
                <HeroStat value="Compounding" label="Authority value persists beyond the campaign window." />
                <HeroStat value="Search + AI" label="Visibility signals influence both rankings and recommendations." />
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </section>
    </>
  );
}

function AuthorityLandingContent() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 pt-10 sm:pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
            <motion.div {...revealProps}>
              <SectionLabel>Authority PR</SectionLabel>
              <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.05em] text-white sm:text-6xl md:text-7xl">
                Authority PR
              </h1>
              <p className="mt-5 max-w-xl text-balance text-xl leading-relaxed text-white/78 sm:text-2xl">
                Build brand authority that influences search engines, AI systems, and human
                audiences.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/66">
                Modern discovery is shaped by search engines, AI assistants, comparison platforms
                and editorial media. Authority PR builds the signals that influence how companies
                are recommended across those systems.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <HeroButton href="/contact-us" label="Book Strategy Call" />
                <HeroButton href="#programs" label="View Programs" secondary />
              </div>
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
              <AuthorityHeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <BlueprintPanel />

      <SectionDivider />

      <AuthorityProgramsSection />

      <SectionDivider />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
        <SectionHeading
          label="How AI Visibility Signals Work"
          title="Three signal layers that influence recommendation systems."
          description="Authority PR is not one placement type. It is a system for capturing existing citations, creating new citations, and reinforcing the expertise signals around them."
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {authoritySignals.map((item, index) => (
            <motion.div
              key={item.title}
              {...revealProps}
              transition={{ ...revealProps.transition, delay: index * 0.08 }}
            >
              <GlassPanel hoverLift className="h-full p-6 sm:p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-white/14 bg-white/9">
                  <item.Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-6 text-2xl font-display font-bold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/72">{item.description}</p>
                <div className="mt-6 space-y-3">
                  {item.examples.map((example) => (
                    <div key={example} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/9">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#e0d7ff]" />
                      </span>
                      <span className="text-sm leading-relaxed text-white/78">{example}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
        <motion.div {...revealProps}>
          <GlassPanel className="p-6 sm:p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <SectionLabel>Visual Example Mix</SectionLabel>
                <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.035em] text-white sm:text-5xl">
                  Example monthly mix
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
                  A typical engagement blends capture, creation, and reinforcement so your brand is
                  visible in more recommendation paths every month.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "3 listicle placements",
                  "1 distributed comparison article",
                  "1 authority article",
                  "1 landing page asset",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-white/12 bg-white/[0.05] px-5 py-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/9">
                        <CheckCircle2 className="h-4 w-4 text-[#e0d7ff]" />
                      </span>
                      <span className="text-base leading-relaxed text-white/78">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </section>

      <SectionDivider />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-24 sm:py-28">
        <motion.div {...revealProps}>
          <GlassPanel className="p-6 sm:p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <SectionLabel>Final Section</SectionLabel>
                <h2 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
                  Build authority where discovery happens
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
                  Search engines, AI assistants and editorial sources increasingly determine how
                  companies are discovered. Authority PR builds the signals that influence these
                  systems and position your brand as a trusted recommendation.
                </p>
                <div className="mt-8">
                  <HeroButton href="/contact-us" label="Book Strategy Call" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <HeroStat value="Search" label="Reinforce discoverability through authority-rich brand signals." />
                <HeroStat value="AI" label="Shape how assistant and recommendation systems describe you." />
                <HeroStat value="Editorial" label="Earn the proof points that create durable trust." />
                <HeroStat value="Narrative" label="Control the authority story that compounds across channels." />
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      </section>
    </>
  );
}

export function ServiceLandingPage({ page }: { page: ServicePage }) {
  return (
    <>
      <main className="relative overflow-hidden bg-[#04050d] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(117,90,255,0.24),transparent_34%),radial-gradient(circle_at_86%_14%,rgba(99,176,255,0.16),transparent_30%),radial-gradient(circle_at_50%_78%,rgba(221,92,255,0.08),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[linear-gradient(180deg,rgba(72,68,158,0.4)_0%,rgba(4,5,13,0)_100%)]" />

        <section className="relative">
          <SiteHeader />
          {page === "seo" ? <SeoLandingContent /> : <AuthorityLandingContent />}
        </section>
      </main>

      <SiteFooter flushTop />
    </>
  );
}
