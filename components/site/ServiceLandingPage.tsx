"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  CircleDollarSign,
  FileSearch,
  Fingerprint,
  Link2,
  Megaphone,
  MessageCircle,
  Newspaper,
  Orbit,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type ServicePage = "seo" | "authority";
type BillingMode = "monthly" | "oneTime";
type PanelTone = "white" | "muted" | "gradient" | "dark";

type FeatureCardData = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
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
  footnote?: string;
};

type StatItem = {
  value: string;
  label: string;
};

type ProofCardData = {
  value: string;
  label: string;
  description: string;
  Icon: LucideIcon;
};

type BlueprintItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const pageContainerClass = "mx-auto w-full max-w-[1200px] px-6";
const heroContainerClass = "mx-auto w-full max-w-[1280px] px-6";

const trustLogos = [
  {
    src: "/publication-logos/nytimes.png",
    alt: "The New York Times",
    width: 520,
    height: 90,
    className: "h-8 w-auto sm:h-9",
    filterClass: "opacity-95",
  },
  {
    src: "/publication-logos/forbes.png",
    alt: "Forbes",
    width: 280,
    height: 90,
    className: "h-10 w-auto sm:h-11",
    filterClass: "opacity-95",
  },
  {
    src: "/publication-logos/guardian.png",
    alt: "The Guardian",
    width: 320,
    height: 95,
    className: "h-7 w-auto sm:h-8",
    filterClass: "opacity-95",
  },
  {
    src: "/publication-logos/healthline.png",
    alt: "healthline",
    width: 360,
    height: 70,
    className: "h-7 w-auto sm:h-8",
    filterClass: "opacity-95",
  },
  {
    src: "/publication-logos/bbc.svg",
    alt: "BBC",
    width: 112,
    height: 40,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert opacity-90",
  },
  {
    src: "/publication-logos/daily-express-clean.png",
    alt: "Daily Express",
    width: 3816,
    height: 454,
    className: "h-4 w-auto sm:h-5",
    filterClass: "invert opacity-90",
  },
  {
    src: "/publication-logos/wsj-clean.png",
    alt: "WSJ",
    width: 3690,
    height: 2091,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert opacity-90",
  },
  {
    src: "/publication-logos/hubspot-clean.png",
    alt: "HubSpot",
    width: 800,
    height: 232,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert opacity-90",
  },
] as const;

const seoHeroStats: StatItem[] = [
  { value: "150+", label: "campaigns delivered" },
  { value: "15,000+", label: "journalist responses" },
  { value: "$17M+", label: "revenue influenced" },
];

const authorityHeroStats: StatItem[] = [
  { value: "150+", label: "authority campaigns delivered" },
  { value: "10-20", label: "AI citation surfaces mapped" },
  { value: "$17M+", label: "revenue influenced" },
];

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
    description: "Editorial coverage builds authority that compounds over time.",
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
    description: "Create comparison assets, landing pages, and authority content that reinforce expertise.",
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
    description: "We identify credible experts and align them with the topics journalists are actively covering.",
    Icon: Users,
  },
  {
    step: "Step 2",
    title: "Media Monitoring",
    description: "We monitor inbound journalist requests and identify the openings most aligned with commercial authority.",
    Icon: Radar,
  },
  {
    step: "Step 3",
    title: "Editorial Placement",
    description: "We secure earned placements and links in trusted publications, then report wins in real time.",
    Icon: Newspaper,
  },
];

const seoProofCards: ProofCardData[] = [
  {
    value: "59",
    label: "editorial placements",
    description: "Coverage landed across Forbes, BBC, Business Insider, and other trusted outlets.",
    Icon: Newspaper,
  },
  {
    value: "DR70+",
    label: "average authority",
    description: "Links built from high-trust publications rather than commodity placements.",
    Icon: ShieldCheck,
  },
  {
    value: "$17M+",
    label: "revenue influenced",
    description: "Editorial visibility supporting commercially meaningful discovery and demand.",
    Icon: CircleDollarSign,
  },
];

const authorityProofCards: ProofCardData[] = [
  {
    value: "10-20",
    label: "AI citation sources",
    description: "Presence built across listicles, recommendation pages, and comparison surfaces.",
    Icon: Bot,
  },
  {
    value: "59",
    label: "editorial placements",
    description: "Authority signals reinforced through credible media features and expert commentary.",
    Icon: Newspaper,
  },
  {
    value: "DR70+",
    label: "average authority",
    description: "Search, AI, and editorial trust signals distributed across the surfaces that matter.",
    Icon: ShieldCheck,
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
    footnote: "Max delivery window: 6-month campaign.",
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
    footnote: "Max delivery window: 6-month campaign.",
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
    footnote: "Max delivery window: 12-month campaign.",
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
    footnote: "Delivery schedule confirmed during onboarding.",
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
    footnote: "Delivery schedule confirmed during onboarding.",
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
    footnote: "Delivery schedule confirmed during onboarding.",
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
      "Citation monitoring",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=ai-visibility-core",
    footnote: "Minimum delivery window: 6 months.",
  },
  {
    title: "AI Visibility Growth",
    price: "$2,500",
    priceDetail: "per month",
    cadence: "Minimum 6 months",
    description: "Designed to expand both citation capture and citation creation.",
    bullets: [
      "6 AI visibility signals per month",
      "Distributed comparison articles",
      "Guest listicles",
      "Authority content assets",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=ai-visibility-growth",
    footnote: "Minimum delivery window: 6 months.",
  },
  {
    title: "AI Discovery + SEO",
    price: "$3,000",
    priceDetail: "per month",
    cadence: "Minimum 6 months",
    description: "Combines AI visibility growth with direct SEO reinforcement.",
    bullets: [
      "Everything in AI Visibility Growth",
      "Up to 5 page optimizations",
      "Internal linking improvements",
      "Content refreshes",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=ai-discovery-seo-optimization",
    footnote: "Minimum delivery window: 6 months.",
  },
  {
    title: "Authority PR Engine",
    price: "$6,000",
    priceDetail: "starting at per month",
    cadence: "Premium tier",
    description: "A broader authority engine influencing AI systems, editorial media, and human audiences together.",
    bullets: [
      "AI visibility signals",
      "Podcast appearances",
      "Expert commentary placements",
      "Editorial media features",
      "Interviews and thought leadership placements",
    ],
    ctaLabel: "Book Strategy Call",
    ctaHref: "/contact-us?service=authority-pr&program=authority-pr-engine",
    footnote: "Minimum delivery window: 6 months.",
  },
];

const blueprintItems: BlueprintItem[] = [
  {
    title: "AI perception analysis",
    description: "Audit how recommendation systems currently describe your company and category fit.",
    Icon: BrainCircuit,
  },
  {
    title: "Competitor visibility mapping",
    description: "Identify which rivals are surfacing most often and the signals driving that advantage.",
    Icon: Radar,
  },
  {
    title: "Citation source analysis",
    description: "Map the domains and listicles shaping recommendation outputs.",
    Icon: Link2,
  },
  {
    title: "Authority signal discovery",
    description: "Surface the media, content, and entity signals already working in your favor.",
    Icon: Sparkles,
  },
  {
    title: "Content gap analysis",
    description: "Pinpoint missing landing pages and explainers suppressing visibility.",
    Icon: FileSearch,
  },
  {
    title: "Recommendation triggers",
    description: "Reveal the prompt and intent patterns that currently unlock recommendations.",
    Icon: Target,
  },
];

const revealProps = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: "easeOut" },
} as const;

function SectionWrap({
  children,
  containerClass = pageContainerClass,
  className,
}: {
  children: React.ReactNode;
  containerClass?: string;
  className?: string;
}) {
  return (
    <section className={cn("py-4 md:py-5", className)}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}

function PagePanel({
  children,
  tone = "white",
  className,
}: {
  children: React.ReactNode;
  tone?: PanelTone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] p-8 sm:p-10 lg:p-12",
        tone === "white" &&
          "border border-[#e8e3f3] bg-white shadow-[0_28px_60px_rgba(24,31,62,0.08)]",
        tone === "muted" &&
          "border border-[#ece7f4] bg-[linear-gradient(180deg,#fbfbff_0%,#f4f3fa_100%)] shadow-[0_28px_60px_rgba(24,31,62,0.06)]",
        tone === "gradient" &&
          "border border-[#e7e1f5] bg-[linear-gradient(180deg,#ffffff_0%,#f7f4ff_100%)] shadow-[0_30px_66px_rgba(24,31,62,0.07)]",
        tone === "dark" &&
          "bg-[linear-gradient(135deg,#090d22_0%,#10173a_52%,#11162f_100%)] text-white shadow-[0_34px_88px_rgba(8,11,29,0.32)]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          tone === "dark"
            ? "bg-[radial-gradient(circle_at_18%_18%,rgba(115,93,255,0.24),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(87,157,255,0.14),transparent_26%)]"
            : "bg-[radial-gradient(circle_at_top_right,rgba(149,122,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(87,157,255,0.08),transparent_24%)]",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(123,99,255,0.18),transparent)]",
          tone === "dark" && "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]",
        )}
      />
      {tone === "dark" ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:44px_44px]" />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

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
  inverted = false,
}: {
  label: string;
  title: string;
  description: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow inverted={inverted}>{label}</Eyebrow>
      <h2
        className={cn(
          "mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] sm:text-[2.125rem] md:text-[2.25rem]",
          inverted ? "text-white" : "text-[#171929]",
        )}
      >
        {title}
      </h2>
      <p className={cn("mt-4 text-[18px] leading-[1.6]", inverted ? "text-white/72" : "text-[#5a5d79]")}>{description}</p>
    </div>
  );
}

function SurfaceCard({
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
        "group relative overflow-hidden rounded-[18px] border border-[#e8e5f3] bg-white shadow-[0_18px_36px_rgba(24,31,62,0.08)]",
        hoverLift && "transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_rgba(24,31,62,0.12)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,122,255,0.1),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(87,157,255,0.08),transparent_24%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-12 rounded-full bg-[linear-gradient(135deg,#6f5dff_0%,#5a4dbf_52%,#4d92ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(103,89,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(111,93,255,0.12),0_24px_46px_rgba(103,89,255,0.34)] sm:h-14 sm:px-7 sm:text-base"
    >
      <Link href={href}>
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

function SecondaryButton({ href, label, dark = false }: { href: string; label: string; dark?: boolean }) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "h-12 rounded-full px-6 text-sm font-semibold transition-all duration-300 sm:h-14 sm:px-7 sm:text-base",
        dark
          ? "border border-white/16 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/14"
          : "border border-[#d8d3eb] bg-white text-[#252846] shadow-[0_16px_34px_rgba(24,31,62,0.06)] hover:-translate-y-0.5 hover:bg-[#f7f4ff] hover:shadow-[0_0_0_5px_rgba(111,93,255,0.08),0_18px_38px_rgba(24,31,62,0.08)]",
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

function HeroStats({ items }: { items: StatItem[] }) {
  return (
    <motion.div {...revealProps} className="mt-8 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[18px] border border-[#e7e2f3] bg-white/92 px-4 py-4 shadow-[0_16px_34px_rgba(24,31,62,0.06)] backdrop-blur"
        >
          <div className="text-[1.5rem] font-display font-bold tracking-[-0.04em] text-[#171929] sm:text-[1.75rem]">{item.value}</div>
          <p className="mt-1 text-[14px] leading-[1.6] text-[#646882]">{item.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

function HeroSignalPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[#ebe6f6] bg-[#fbfaff] px-4 py-3 text-[14px] leading-[1.5] text-[#3d425d] shadow-[0_12px_26px_rgba(24,31,62,0.05)]">
      {children}
    </div>
  );
}

function TrustArchitecture() {
  return (
    <SectionWrap>
      <PagePanel tone="white" className="py-8 sm:py-10">
        <div className="relative rounded-[20px] border border-[#d7d1f0] bg-[linear-gradient(135deg,#0e1433_0%,#141f4b_50%,#1e2b62_100%)] px-5 py-8 shadow-[0_24px_52px_rgba(16,22,56,0.28)] sm:px-7 sm:py-10">
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="relative z-10 border-y border-white/16 py-6 sm:py-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/72">Trusted by journalists at</p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {trustLogos.map((logo) => (
                <motion.div key={logo.alt} {...revealProps} whileHover={{ y: -4, scale: 1.01 }}>
                  <div className="group relative flex h-[74px] items-center justify-center overflow-hidden rounded-[16px] border border-white/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 backdrop-blur-sm transition-all duration-300 hover:border-[#b9adff] hover:shadow-[0_0_0_1px_rgba(168,149,255,0.38),0_12px_26px_rgba(105,89,219,0.3)]">
                    <div className="pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(173,146,255,0.45),transparent_70%)] blur-xl" />
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className={cn(
                        "relative z-10 object-contain transition-opacity duration-300 group-hover:opacity-100",
                        logo.className,
                        logo.filterClass,
                      )}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PagePanel>
    </SectionWrap>
  );
}

function SeoHeroVisual() {
  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 -top-4 z-20 hidden rounded-[18px] border border-[#e4dff6] bg-white px-4 py-3 shadow-[0_22px_46px_rgba(26,31,62,0.12)] lg:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Editorial velocity</p>
        <p className="mt-2 text-lg font-display font-bold tracking-[-0.03em] text-[#171929]">Trusted publication wins</p>
      </motion.div>

      <div className="grid gap-5">
        <div className="rounded-[24px] bg-[linear-gradient(135deg,#181447_0%,#4b42b4_56%,#6960ff_100%)] p-6 text-white shadow-[0_24px_52px_rgba(54,49,130,0.34)] sm:p-7">
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
            <HeroSignalPill>Inbound journalist requests monitored</HeroSignalPill>
            <HeroSignalPill>Expert-led commentary angles</HeroSignalPill>
            <HeroSignalPill>Editorial placements logged in real time</HeroSignalPill>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard className="p-5 sm:p-6">
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
                  <span className="text-[14px] font-medium text-[#323652]">{item}</span>
                </div>
              ))}
            </div>
          </SurfaceCard>

          <div className="grid gap-4">
            <SurfaceCard className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Average authority</p>
              <p className="mt-3 text-[2rem] font-display font-bold tracking-[-0.04em] text-[#171929]">DR 70+</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#656982]">Coverage built to sit inside commercially relevant, trusted media contexts.</p>
            </SurfaceCard>
            <SurfaceCard className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Publication footprint</p>
              <p className="mt-3 text-[2rem] font-display font-bold tracking-[-0.04em] text-[#171929]">US + UK</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#656982]">Editorial opportunities aligned with search trust and brand authority goals.</p>
            </SurfaceCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthorityHeroVisual() {
  const nodes = [
    { title: "Editorial media", Icon: Newspaper, position: "col-[2] row-[1]" },
    { title: "AI citations", Icon: Bot, position: "col-[3] row-[2]" },
    { title: "Search visibility", Icon: TrendingUp, position: "col-[2] row-[3]" },
    { title: "Comparison surfaces", Icon: Radar, position: "col-[1] row-[2]" },
  ] as const;

  return (
    <div className="relative">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 top-5 z-20 hidden rounded-[18px] border border-[#e4dff6] bg-white px-4 py-3 shadow-[0_22px_46px_rgba(26,31,62,0.12)] lg:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Recommendation layer</p>
        <p className="mt-2 text-lg font-display font-bold tracking-[-0.03em] text-[#171929]">Search + AI + editorial</p>
      </motion.div>

      <SurfaceCard className="p-6 sm:p-8">
        <div className="rounded-[24px] border border-[#ece7f7] bg-[linear-gradient(135deg,#f8f6ff_0%,#eef1ff_100%)] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Authority signal map</p>
              <h3 className="mt-3 text-2xl font-display font-bold tracking-[-0.035em] text-[#171929] sm:text-3xl">
                Build the network behind recommendation visibility.
              </h3>
            </div>
            <div className="rounded-2xl border border-[#e2ddf5] bg-white p-3 text-[#6f5dff] shadow-[0_14px_32px_rgba(24,31,62,0.08)]">
              <Orbit className="h-6 w-6" />
            </div>
          </div>

          <div className="relative mt-8 h-[17rem] overflow-hidden rounded-[20px] border border-[#e4e0f4] bg-white px-6 py-6 sm:h-[18rem]">
            <div className="absolute left-1/2 top-1/2 h-[1px] w-[64%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(111,93,255,0.1),rgba(111,93,255,0.4),rgba(77,146,255,0.12))]" />
            <div className="absolute left-1/2 top-1/2 h-[64%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(111,93,255,0.1),rgba(111,93,255,0.42),rgba(77,146,255,0.14))]" />
            <div className="relative grid h-full grid-cols-3 grid-rows-3 items-center justify-items-center">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.title}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.28 }}
                  className={cn(
                    "flex h-[68px] w-[96px] flex-col items-center justify-center rounded-[14px] border border-[#e6e2f3] bg-white px-2.5 py-2 text-center shadow-[0_14px_30px_rgba(24,31,62,0.08)] sm:h-[74px] sm:w-[130px] sm:rounded-[16px] sm:px-3 sm:py-3",
                    node.position,
                  )}
                >
                  <node.Icon className="h-4 w-4 text-[#6f5dff]" />
                  <span className="mt-1 text-[10px] font-semibold leading-[1.25] text-[#2f3450] sm:text-[12px]">{node.title}</span>
                </motion.div>
              ))}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="col-[2] row-[2] flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6f5dff_0%,#4d92ff_100%)] shadow-[0_22px_52px_rgba(99,90,255,0.28)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.14)]">
                  <BrainCircuit className="h-7 w-7" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}

function DarkSignalDiagram({ destinations }: { destinations: string[] }) {
  return (
    <div className="relative rounded-[24px] border border-white/12 bg-white/6 p-6 backdrop-blur-sm">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative rounded-[20px] border border-white/12 bg-white/8 p-5 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/58">Core signal</p>
          <h3 className="mt-3 text-[1.75rem] font-display font-bold leading-[1.1] tracking-[-0.04em]">Authority signals</h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-white/72">
            Editorial proof, credible expertise, and structured authority assets flow into the systems shaping discovery.
          </p>
        </div>

        <div className="relative grid gap-4">
          <div className="pointer-events-none absolute bottom-6 left-0 top-6 hidden w-10 border-t border-white/16 lg:block" />
          {destinations.map((item, index) => (
            <motion.div
              key={item}
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
              className="relative rounded-[18px] border border-white/12 bg-white/8 px-5 py-4 text-[15px] font-medium leading-[1.5] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div>{item}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DarkHighlightPanel({
  label,
  title,
  description,
  chips,
  ctaHref,
  ctaLabel,
}: {
  label: string;
  title: string;
  description: string;
  chips: string[];
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <motion.div {...revealProps}>
      <PagePanel tone="dark" className="p-8 sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading label={label} title={title} description={description} inverted />
            <div className="mt-6 flex flex-wrap gap-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/78"
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <PrimaryButton href={ctaHref} label={ctaLabel} />
            </div>
          </div>

          <DarkSignalDiagram
            destinations={[
              "Search engines",
              "AI assistants",
              "Editorial recommendations",
            ]}
          />
        </div>
      </PagePanel>
    </motion.div>
  );
}

function FeatureCard({ item }: { item: FeatureCardData }) {
  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <SurfaceCard hoverLift className="h-full p-7 sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[4deg]">
          <item.Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-6 text-[18px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
        <p className="mt-4 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
      </SurfaceCard>
    </motion.div>
  );
}

function ProcessCard({ item }: { item: ProcessStep }) {
  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <SurfaceCard hoverLift className="h-full p-7 sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)] transition-transform duration-300 group-hover:scale-110">
          <item.Icon className="h-6 w-6" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#7c6de0]">{item.step}</p>
        <h3 className="mt-2 text-[20px] font-display font-semibold leading-[1.25] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
        <p className="mt-4 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
      </SurfaceCard>
    </motion.div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ddd7f0] bg-white text-[#6f5dff] shadow-[0_12px_28px_rgba(24,31,62,0.06)]">
        <ArrowRight className="h-5 w-5" />
      </div>
    </div>
  );
}

function ProofCard({ item }: { item: ProofCardData }) {
  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <div className="relative h-full overflow-hidden rounded-[18px] border border-[#e5def5] bg-[linear-gradient(135deg,#faf8ff_0%,#eef3ff_100%)] p-7 shadow-[0_18px_38px_rgba(24,31,62,0.08)] transition duration-500 hover:shadow-[0_24px_50px_rgba(24,31,62,0.12)]">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(127,108,255,0.18),transparent_70%)] blur-2xl" />
        <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#6f5dff] shadow-[0_14px_30px_rgba(24,31,62,0.08)]">
          <item.Icon className="h-5 w-5" />
        </span>
        <div className="relative mt-6 text-[2rem] font-display font-bold leading-none tracking-[-0.05em] text-[#171929]">
          {item.value}
        </div>
        <h3 className="relative mt-3 text-[18px] font-display font-semibold leading-[1.35] text-[#171929]">{item.label}</h3>
        <p className="relative mt-4 text-[15px] leading-[1.6] text-[#5f637c]">{item.description}</p>
      </div>
    </motion.div>
  );
}

function ProofSection({ cards }: { cards: ProofCardData[] }) {
  return (
    <SectionWrap>
      <PagePanel tone="white">
        <SectionHeading
          label="Proof"
          title="Results from real authority campaigns"
          description="A stronger offer needs clear proof before pricing. These outcomes anchor the commercial story before the user evaluates packages."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {cards.map((item) => (
            <ProofCard key={`${item.value}-${item.label}`} item={item} />
          ))}
        </div>
      </PagePanel>
    </SectionWrap>
  );
}

function GradientPricingCard({
  card,
  billingMode,
}: {
  card: PricingCardData;
  billingMode: BillingMode;
}) {
  const isHighlighted = Boolean(card.badge);
  const isMonthly = billingMode === "monthly";

  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <div className="relative mx-auto w-full max-w-[360px] pt-6">
        {card.badge ? (
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a38dff]/40 bg-[linear-gradient(135deg,#7f6aff_0%,#5a4dbf_100%)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_rgba(103,89,255,0.28)]">
            {card.badge}
          </div>
        ) : null}

        <div
          className={cn(
            "group relative h-full overflow-hidden rounded-[18px] p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition duration-500 hover:shadow-[0_18px_42px_rgba(86,74,193,0.18)]",
            isHighlighted && "shadow-[0_0_0_1px_rgba(138,114,255,0.42),0_16px_42px_rgba(86,74,193,0.22)]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0",
              isMonthly
                ? "bg-[linear-gradient(135deg,#8470ff_0%,#5a4dbf_48%,#437dff_100%)]"
                : "bg-[linear-gradient(135deg,#9962ff_0%,#7a46d8_45%,#ff5ac4_100%)]",
            )}
          />
          <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-white/12 blur-3xl" />
          <div
            className={cn(
              "absolute left-8 top-8 h-20 w-20 rounded-full blur-3xl",
              isMonthly ? "bg-[#f46bcb]/18" : "bg-[#ffd260]/20",
            )}
          />
          <div
            className={cn(
              "relative flex h-full flex-col rounded-[17px] p-9 text-white",
              isMonthly
                ? "bg-[linear-gradient(155deg,#161243_0%,#3f36a7_58%,#5f6bff_100%)]"
                : "bg-[linear-gradient(155deg,#25104a_0%,#6931b1_58%,#d14ea6_100%)]",
            )}
          >
            <div>
              <h3 className="text-[18px] font-display font-semibold leading-[1.35] tracking-[-0.02em]">{card.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/68">
                {card.cadence ?? (isMonthly ? "Monthly package" : "One-time package")}
              </p>
            </div>

            <div className="mt-8">
              <div className="text-[2.75rem] font-display font-bold leading-none tracking-[-0.05em]">{card.price}</div>
              {card.priceDetail ? <p className="mt-2 text-[15px] leading-[1.6] text-white/62">{card.priceDetail}</p> : null}
              {card.description ? <p className="mt-3 text-[15px] leading-[1.6] text-white/76">{card.description}</p> : null}
            </div>

            <div className="mt-8 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.24),rgba(255,255,255,0.06))]" />

            <div className="mt-8 space-y-4">
              {card.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/12 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] leading-[1.6] text-white/84">{bullet}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8">
              <Button
                asChild
                variant="ghost"
                className="h-12 w-full rounded-full bg-white text-[#3f36a7] shadow-[0_16px_34px_rgba(255,255,255,0.14)] transition-all duration-300 hover:bg-white/92 hover:shadow-[0_0_0_5px_rgba(255,255,255,0.08),0_18px_38px_rgba(255,255,255,0.18)]"
              >
                <Link href={card.ctaHref}>
                  {card.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {card.footnote ? <p className="mt-4 text-[13px] leading-[1.6] text-white/62">{card.footnote}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgramPricingCard({
  card,
  premium = false,
  index,
}: {
  card: PricingCardData;
  premium?: boolean;
  index: number;
}) {
  const toneClass = [
    "bg-[linear-gradient(135deg,#7766ff_0%,#5549bf_52%,#437dff_100%)]",
    "bg-[linear-gradient(135deg,#6653ff_0%,#4458d6_52%,#2f84ff_100%)]",
    "bg-[linear-gradient(135deg,#7c5bff_0%,#5d43cc_52%,#3b6bff_100%)]",
    "bg-[linear-gradient(135deg,#8a76ff_0%,#5a4dbf_48%,#437dff_100%)]",
  ][index] ?? "bg-[linear-gradient(135deg,#7766ff_0%,#5549bf_52%,#437dff_100%)]";

  return (
    <motion.div {...revealProps} whileHover={{ y: -6 }}>
      <div
        className={cn(
          "relative h-full min-h-[440px] overflow-hidden rounded-[20px] p-[1px] shadow-[0_12px_34px_rgba(24,31,62,0.1)] transition duration-500 hover:shadow-[0_20px_46px_rgba(24,31,62,0.16)]",
          premium
            ? "shadow-[0_0_0_1px_rgba(138,114,255,0.48),0_18px_44px_rgba(86,74,193,0.26)]"
            : "",
        )}
      >
        <div
          className={cn("absolute inset-0", toneClass)}
        />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/12 blur-3xl" />
        {premium ? <div className="absolute left-6 top-6 rounded-full border border-white/18 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Premium tier</div> : null}
        <div className="relative flex h-full flex-col rounded-[19px] bg-[linear-gradient(155deg,#161243_0%,#332b8b_58%,#5568ff_100%)] p-7 text-white">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62">{card.cadence}</p>
            <h3 className="mt-4 text-[1.35rem] font-display font-semibold leading-[1.2] tracking-[-0.03em]">{card.title}</h3>
          </div>

          <div className="mt-6">
            <div className="text-[2.25rem] font-display font-bold leading-none tracking-[-0.05em]">{card.price}</div>
            {card.priceDetail ? <p className="mt-2 text-[14px] leading-[1.6] text-white/64">{card.priceDetail}</p> : null}
            {card.description ? <p className="mt-3 text-[14px] leading-[1.6] text-white/76">{card.description}</p> : null}
          </div>

          <div className="mt-6 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.24),rgba(255,255,255,0.06))]" />

          <div className="mt-6 space-y-3">
            {card.bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/12 text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-[14px] leading-[1.55] text-white/84">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-7">
            <Button
              asChild
              variant="ghost"
              className="h-11 w-full rounded-full bg-white text-[#302c8b] shadow-[0_16px_34px_rgba(255,255,255,0.12)] transition-all duration-300 hover:bg-white/92 hover:shadow-[0_0_0_5px_rgba(255,255,255,0.08),0_18px_38px_rgba(255,255,255,0.16)]"
            >
              <Link href={card.ctaHref}>
                {card.ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {card.footnote ? <p className="mt-3 text-[12px] leading-[1.6] text-white/62">{card.footnote}</p> : null}
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
    <SectionWrap>
      <PagePanel
        tone="gradient"
        className={cn(
          "lg:p-14",
          billingMode === "monthly"
            ? "bg-[linear-gradient(180deg,#ffffff_0%,#f7f4ff_100%)]"
            : "bg-[linear-gradient(180deg,#ffffff_0%,#fbf1ff_100%)]",
        )}
      >
        <SectionHeading
          label="Packages"
          title="Packages designed for scalable authority growth"
          description="Choose a retained monthly campaign or a one-time authority burst built around earned editorial placements and commercially relevant authority signals."
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

        <div className="mt-10 grid gap-8 xl:grid-cols-3">
          {cards.map((card) => (
            <GradientPricingCard key={`${billingMode}-${card.title}`} card={card} billingMode={billingMode} />
          ))}
        </div>
      </PagePanel>
    </SectionWrap>
  );
}

function AuthorityProgramsSection() {
  return (
    <SectionWrap>
      <PagePanel tone="gradient" className="lg:p-14">
        <SectionHeading
          label="Monthly Programs"
          title="Programs built to influence recommendation systems over time"
          description="The cards now read like SaaS tiers instead of generic retainers. Authority PR Engine is treated as the premium program rather than another equivalent block."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-[0.95fr_0.95fr_1fr_1.18fr] xl:items-stretch">
          {authorityPrograms.map((card, index) => (
            <ProgramPricingCard key={card.title} card={card} index={index} premium={index === authorityPrograms.length - 1} />
          ))}
        </div>

        <motion.div {...revealProps} className="mt-8">
          <SurfaceCard className="overflow-hidden p-0">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="bg-[linear-gradient(135deg,#faf8ff_0%,#eef3ff_100%)] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Optional add-on</p>
                <h3 className="mt-3 text-[20px] font-display font-semibold leading-[1.3] tracking-[-0.02em] text-[#171929]">Content Engine</h3>
                <p className="mt-3 max-w-2xl text-[15px] leading-[1.6] text-[#5d617b]">
                  A structured content layer supporting authority positioning, comparison visibility, and AI discovery.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Content strategy blueprint",
                    "5 expert content pieces per month",
                    "Authority positioning topics",
                    "Structured for AI discovery",
                  ].map((item) => (
                    <div key={item} className="rounded-full border border-[#ddd7ef] bg-white px-4 py-2 text-[13px] font-medium text-[#4f5471]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[linear-gradient(145deg,#1a1a53_0%,#3d39aa_58%,#5b6eff_100%)] p-6 text-white sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">Monthly add-on</p>
                <div className="mt-3 text-5xl font-display font-bold tracking-[-0.05em]">$2,000</div>
                <p className="mt-2 text-[14px] text-white/72">per month</p>
                <p className="mt-4 text-[14px] leading-[1.6] text-white/74">
                  Built for teams that need compounding authority content to support both AI and search visibility programs.
                </p>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="ghost"
                    className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-[#352f96] shadow-[0_16px_34px_rgba(255,255,255,0.14)] transition-all duration-300 hover:bg-white/92"
                  >
                    <Link href="/contact-us?service=authority-pr&program=content-engine">
                      Add Content Engine
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </SurfaceCard>
        </motion.div>
      </PagePanel>
    </SectionWrap>
  );
}

function BlueprintSection() {
  return (
    <SectionWrap>
      <PagePanel tone="white" className="lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              label="AI Visibility Strategy Blueprint"
              title="A strategic diagnostic before bigger authority decisions"
              description="A deep analysis of how AI systems currently perceive your company and what must change for AI to recommend you."
            />
            <div className="mt-8 rounded-[20px] border border-[#e5e0f4] bg-[linear-gradient(135deg,#f9f7ff_0%,#eef2ff_100%)] p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">One-time engagement</p>
              <div className="mt-4 text-5xl font-display font-bold tracking-[-0.05em] text-[#171929]">$500</div>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#60647d]">Includes enhanced AI visibility scoring, prompt analysis, citation review, and an actionable roadmap.</p>
              <div className="mt-8">
                <PrimaryButton href="/contact-us?service=authority-pr&program=ai-visibility-blueprint" label="Start Blueprint" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {blueprintItems.map((item) => (
              <motion.div key={item.title} {...revealProps} whileHover={{ y: -6 }}>
                <SurfaceCard hoverLift className="h-full min-h-[160px] p-5 sm:p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] transition-transform duration-300 group-hover:scale-110">
                    <item.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-[16px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-[#5f637d]">{item.description}</p>
                </SurfaceCard>
              </motion.div>
            ))}
          </div>
        </div>
      </PagePanel>
    </SectionWrap>
  );
}

function BuildSignalsSection() {
  const flow = [
    {
      title: "Brand Authority",
      description: "Entity clarity, credible positioning, and defensible expertise signals.",
      Icon: Fingerprint,
    },
    {
      title: "Editorial Media",
      description: "Trusted coverage that validates expertise and expands source availability.",
      Icon: Newspaper,
    },
    {
      title: "AI Citations",
      description: "Presence in the sources recommendation systems already consult and quote.",
      Icon: Bot,
    },
    {
      title: "Search & Recommendation Visibility",
      description: "Stronger inclusion across search results, assistants, comparisons, and curated lists.",
      Icon: Workflow,
    },
  ] as const;

  return (
    <SectionWrap>
      <PagePanel tone="gradient">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              label="Build The Signals"
              title="Authority flows through systems, not just media placements"
              description="This section replaces the generic card stack with a clearer visual story: authority starts with brand credibility, then compounds through editorial citations into search and recommendation visibility."
            />
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="pointer-events-none absolute left-1/2 top-10 bottom-10 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(111,93,255,0.12),rgba(111,93,255,0.44),rgba(77,146,255,0.18))]" />
            <div className="space-y-5">
              {flow.map((item, index) => (
                <motion.div key={item.title} {...revealProps} transition={{ ...revealProps.transition, delay: index * 0.06 }}>
                  <div className="relative mx-auto max-w-[440px] rounded-[18px] border border-[#e7e2f3] bg-white px-5 py-5 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)]">
                        <item.Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-[18px] font-display font-semibold leading-[1.3] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                        <p className="mt-2 text-[14px] leading-[1.6] text-[#60647d]">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PagePanel>
    </SectionWrap>
  );
}

function CompoundingAuthoritySection() {
  const nodes = [
    { title: "Editorial Authority", Icon: Newspaper, position: "col-[2] row-[1]" },
    { title: "Search Rankings", Icon: TrendingUp, position: "col-[3] row-[2]" },
    { title: "AI Recommendations", Icon: Bot, position: "col-[2] row-[3]" },
    { title: "E-E-A-T Signals", Icon: ShieldCheck, position: "col-[1] row-[2]" },
  ] as const;

  return (
    <SectionWrap>
      <PagePanel tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              label="Why This Works"
              title="Authority that compounds"
              description="SEO Digital PR builds editorial authority signals that search engines trust. Each placement strengthens credibility, improves ranking potential, and increases the chance that both search systems and AI systems recognize your brand as a trusted source."
            />
            <div className="mt-8">
              <PrimaryButton href="/contact-us" label="Book a Strategy Call" />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] rounded-[22px] border border-[#ece7f4] bg-[linear-gradient(180deg,#fcfbff_0%,#f5f4ff_100%)] p-6 shadow-[0_18px_38px_rgba(24,31,62,0.08)]">
            <div className="absolute left-1/2 top-1/2 h-[1px] w-[66%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,rgba(111,93,255,0.1),rgba(111,93,255,0.42),rgba(111,93,255,0.1))]" />
            <div className="absolute left-1/2 top-1/2 h-[66%] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,rgba(111,93,255,0.1),rgba(111,93,255,0.42),rgba(77,146,255,0.12))]" />
            <div className="relative grid h-[360px] grid-cols-3 grid-rows-3 items-center justify-items-center">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.title}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.28 }}
                  className={cn(
                    "flex h-[70px] w-[120px] items-center gap-2 rounded-[14px] border border-[#e4def3] bg-white px-2.5 py-2 text-[#171929] shadow-[0_16px_34px_rgba(24,31,62,0.08)] sm:h-[84px] sm:w-[148px] sm:gap-3 sm:rounded-[16px] sm:px-4 sm:py-3",
                    node.position,
                  )}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] sm:h-9 sm:w-9">
                    <node.Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </span>
                  <span className="text-[11px] font-semibold leading-[1.25] sm:text-[13px] sm:leading-[1.3]">{node.title}</span>
                </motion.div>
              ))}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                className="col-[2] row-[2] flex h-32 w-32 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6f5dff_0%,#4d92ff_100%)] text-white shadow-[0_24px_54px_rgba(99,90,255,0.28)]"
              >
                <div className="text-center">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">Core outcome</div>
                  <div className="mt-2 text-[1rem] font-display font-semibold leading-[1.2]">Compounding authority</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </PagePanel>
    </SectionWrap>
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
      <PagePanel tone="dark" className="text-center lg:p-14">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(110,94,255,0.26),transparent_66%)] blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Eyebrow inverted>Ready to move</Eyebrow>
          <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-white sm:text-[2.25rem] md:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-4 text-[18px] leading-[1.6] text-white/72">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryButton href={primaryHref} label={primaryLabel} />
            <SecondaryButton href={secondaryHref} label={secondaryLabel} dark />
          </div>
        </div>
      </PagePanel>
    </motion.div>
  );
}

function SeoLandingContent() {
  return (
    <>
      <SectionWrap containerClass={heroContainerClass} className="pt-5">
        <PagePanel tone="white" className="overflow-hidden bg-[radial-gradient(circle_at_14%_0%,rgba(144,122,255,0.18),transparent_26%),radial-gradient(circle_at_88%_10%,rgba(79,155,255,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#fbfbff_100%)] lg:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(117,110,174,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(117,110,174,0.12)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
            <motion.div {...revealProps}>
              <Eyebrow>SEO Digital PR</Eyebrow>
              <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.055em] text-[#171929] sm:text-6xl md:text-7xl">
                SEO Digital PR
              </h1>
              <p className="mt-5 max-w-xl text-balance text-xl leading-relaxed text-[#4e526d] sm:text-2xl">
                Editorial media placements that build authority signals and improve organic rankings.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5b5f79]">
                We position credible experts in the media around the topics journalists are actively covering. Through inbound media opportunities and editorial placements we earn coverage in trusted publications that strengthens rankings, E-E-A-T signals, and brand authority.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="#packages" label="View Packages" />
                <SecondaryButton href="/contact-us" label="Book Strategy Call" />
              </div>
              <HeroStats items={seoHeroStats} />
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
              <SeoHeroVisual />
            </motion.div>
          </div>
        </PagePanel>
      </SectionWrap>

      <TrustArchitecture />

      <SectionWrap>
        <DarkHighlightPanel
          label="Authority highlight"
          title="Where others scatter links, we build authority"
          description="The goal is not random link volume. The goal is earned editorial coverage around commercially relevant topics that compounds into stronger search trust over time."
          chips={[
            "E-E-A-T reinforcement",
            "Editorial trust",
            "Commercial relevance",
          ]}
          ctaHref="#packages"
          ctaLabel="View Packages"
        />
      </SectionWrap>

      <SectionWrap>
        <PagePanel tone="white">
          <SectionHeading
            label="What SEO Digital PR Does"
            title="Four reasons the model is built for authority, not noise"
            description="The feature grid stays clean, but the cards now have clearer iconography, stronger padding, and enough visual weight to feel intentional rather than generic."
            align="center"
          />
          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {seoFeatureCards.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </PagePanel>
      </SectionWrap>

      <SectionWrap>
        <PagePanel tone="muted">
          <SectionHeading
            label="Delivery System"
            title="A process flow built for earned authority"
            description="The delivery section now explains the system visually instead of relying on another generic card row. Each step connects directly to the next."
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
            <ProcessCard item={seoProcessSteps[0]} />
            <FlowArrow />
            <ProcessCard item={seoProcessSteps[1]} />
            <FlowArrow />
            <ProcessCard item={seoProcessSteps[2]} />
          </div>
        </PagePanel>
      </SectionWrap>

      <ProofSection cards={seoProofCards} />
      <SeoPricingSection />
      <CompoundingAuthoritySection />

      <SectionWrap className="pb-12">
        <FinalCta
          title="Turn editorial authority into search and AI visibility"
          description="If you want rankings supported by real editorial trust, the next move is simple: choose the package model or book a strategy call."
          primaryHref="/contact-us"
          primaryLabel="Book Strategy Call"
          secondaryHref="#packages"
          secondaryLabel="View Packages"
        />
      </SectionWrap>
    </>
  );
}

function AuthorityLandingContent() {
  return (
    <>
      <SectionWrap containerClass={heroContainerClass} className="pt-5">
        <PagePanel tone="white" className="overflow-hidden bg-[radial-gradient(circle_at_14%_0%,rgba(144,122,255,0.18),transparent_26%),radial-gradient(circle_at_88%_10%,rgba(79,155,255,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#fbfbff_100%)] lg:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(117,110,174,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(117,110,174,0.12)_1px,transparent_1px)] [background-size:54px_54px]" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
            <motion.div {...revealProps}>
              <Eyebrow>Authority PR</Eyebrow>
              <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.055em] text-[#171929] sm:text-6xl md:text-7xl">
                Authority PR
              </h1>
              <p className="mt-5 max-w-xl text-balance text-xl leading-relaxed text-[#4e526d] sm:text-2xl">
                Build brand authority that influences search engines, AI systems, and human audiences.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5b5f79]">
                Modern discovery is shaped by search engines, AI assistants, comparison platforms, and editorial media. Authority PR builds the signals that influence how companies are recommended across those systems.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/contact-us" label="Book Strategy Call" />
                <SecondaryButton href="#programs" label="View Programs" />
              </div>
              <HeroStats items={authorityHeroStats} />
            </motion.div>

            <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
              <AuthorityHeroVisual />
            </motion.div>
          </div>
        </PagePanel>
      </SectionWrap>

      <TrustArchitecture />

      <SectionWrap>
        <DarkHighlightPanel
          label="Authority highlight"
          title="Build the signals that travel across search, AI, and editorial discovery"
          description="Authority PR is narrative-led, system-aware, and built for a world where recommendation engines increasingly shape demand."
          chips={[
            "Multi-system visibility",
            "Citation density",
            "Expert reinforcement",
          ]}
          ctaHref="#programs"
          ctaLabel="View Programs"
        />
      </SectionWrap>

      <SectionWrap>
        <PagePanel tone="white">
          <SectionHeading
            label="Authority PR Overview"
            title="A more strategic product story, still structured like software"
            description="The features stay bright and readable, but the section now carries more weight through stronger icon treatment, cleaner hierarchy, and more intentional panel framing."
            align="center"
          />
          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
            {authorityFeatureCards.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </div>
        </PagePanel>
      </SectionWrap>

      <BlueprintSection />
      <BuildSignalsSection />
      <ProofSection cards={authorityProofCards} />
      <AuthorityProgramsSection />

      <SectionWrap className="pb-12">
        <FinalCta
          title="Turn editorial authority into search and AI visibility"
          description="Search engines, AI assistants, editorial sources, and comparison platforms increasingly determine discovery. Authority PR is built to influence those systems together."
          primaryHref="/contact-us"
          primaryLabel="Book Strategy Call"
          secondaryHref="#programs"
          secondaryLabel="View Programs"
        />
      </SectionWrap>
    </>
  );
}

export function ServiceLandingPage({ page }: { page: ServicePage }) {
  return (
    <>
      <main className="bg-[#f3f2f7] text-[#171929]">
        <div className="relative">
          <SiteHeader theme="light" />
          {page === "seo" ? <SeoLandingContent /> : <AuthorityLandingContent />}
        </div>
      </main>
      <SiteFooter flushTop />
    </>
  );
}
