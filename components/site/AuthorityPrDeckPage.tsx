"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Crown,
  Eye,
  Megaphone,
  MessageCircle,
  Mic2,
  Newspaper,
  PenSquare,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/site/ChatWidget";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { cn } from "@/lib/utils";

type Tone = "navy" | "amber" | "teal" | "rose" | "violet";
type Shape = "circle" | "diamond" | "pill";

type LogoItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
  filterClass: string;
  snippet: string;
};

type TextPoint = {
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
};

type LeaderTile = {
  title: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
  span?: string;
};

type FlowStep = {
  title: string;
  description: string;
  example: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
};

type MediaCard =
  | {
      kind: "image";
      title: string;
      outlet: string;
      src: string;
      rowSpan?: string;
      tone: Tone;
    }
  | {
      kind: "headline";
      title: string;
      outlet: string;
      rowSpan?: string;
      tone: Tone;
    };

type PersonaSlide = {
  id: string;
  title: string;
  scenario: string;
  pain: string;
  outcome: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
};

type CaseStudy = {
  id: string;
  company: string;
  category: string;
  summary: string;
  trafficIncrease: string;
  drGrowth: string;
  placements: string[];
  chartValues: number[];
  tone: Tone;
};

const pageContainerClass = "mx-auto w-full max-w-[1240px] px-6";
const heroContainerClass = "mx-auto w-full max-w-[1320px] px-6";

const revealProps = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
} as const;

const trustLogos: LogoItem[] = [
  {
    src: "/publication-logos/nytimes.webp",
    alt: "The New York Times",
    width: 520,
    height: 90,
    className: "h-8 w-auto sm:h-9",
    filterClass: "opacity-100",
    snippet: "Founder insights featured in national business coverage.",
  },
  {
    src: "/publication-logos/forbes.webp",
    alt: "Forbes",
    width: 280,
    height: 90,
    className: "h-10 w-auto sm:h-11",
    filterClass: "opacity-100",
    snippet: "Industry commentary included in high-authority editorial.",
  },
  {
    src: "/publication-logos/guardian.webp",
    alt: "The Guardian",
    width: 320,
    height: 95,
    className: "h-7 w-auto sm:h-8",
    filterClass: "opacity-100",
    snippet: "Brand perspective positioned in mainstream conversations.",
  },
  {
    src: "/publication-logos/healthline.webp",
    alt: "healthline",
    width: 360,
    height: 70,
    className: "h-7 w-auto sm:h-8",
    filterClass: "opacity-100",
    snippet: "Quoted expert placements for trust-led category topics.",
  },
  {
    src: "/publication-logos/bbc.svg",
    alt: "BBC",
    width: 112,
    height: 40,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert",
    snippet: "Topical commentary aligned to live news moments.",
  },
  {
    src: "/publication-logos/daily-express-clean.webp",
    alt: "Daily Express",
    width: 3816,
    height: 454,
    className: "h-4 w-auto sm:h-5",
    filterClass: "invert",
    snippet: "Authority-building interviews and trend-led thought leadership.",
  },
  {
    src: "/publication-logos/wsj-clean.webp",
    alt: "WSJ",
    width: 3690,
    height: 2091,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert",
    snippet: "Premium editorial validation in financially trusted channels.",
  },
  {
    src: "/publication-logos/hubspot-clean.webp",
    alt: "HubSpot",
    width: 800,
    height: 232,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert",
    snippet: "Authority-led contributed insights for commercial audiences.",
  },
] as const;

const whatIsPoints: TextPoint[] = [
  {
    title: "Visibility that matters",
    description: "Appear in the channels where your market forms opinions about who to trust.",
    Icon: Eye,
    tone: "amber",
    shape: "pill",
  },
  {
    title: "Trust through third-party proof",
    description: "Earn validation from credible outlets instead of relying on self-claims.",
    Icon: ShieldCheck,
    tone: "teal",
    shape: "diamond",
  },
  {
    title: "Recognition that compounds",
    description: "Build a reputation where clients, partners, and media already see authority.",
    Icon: Crown,
    tone: "navy",
    shape: "circle",
  },
] as const;

const leaderTiles: LeaderTile[] = [
  {
    title: "Become the go-to expert",
    description: "Win category recall in the moments that influence buying decisions.",
    detail: "When the topic comes up, your brand becomes the reference point instead of an alternative.",
    Icon: BadgeCheck,
    tone: "amber",
    shape: "diamond",
    span: "md:col-span-3",
  },
  {
    title: "Dominate more of the conversation",
    description: "Increase share of voice in the places that shape demand.",
    detail: "Coverage is coordinated across multiple channel types to build a narrative, not isolated wins.",
    Icon: Megaphone,
    tone: "navy",
    shape: "circle",
    span: "md:col-span-3",
  },
  {
    title: "Strengthen trust faster",
    description: "Third-party validation reduces hesitation and improves perceived credibility.",
    detail: "Prospects trust earned authority signals long before they see your offer page.",
    Icon: Users,
    tone: "teal",
    shape: "pill",
    span: "md:col-span-2",
  },
  {
    title: "Raise founder profile",
    description: "Position leadership as recognized voices in strategic conversations.",
    detail: "Founders and spokespeople become quoted experts, not just company representatives.",
    Icon: UserRound,
    tone: "rose",
    shape: "diamond",
    span: "md:col-span-2",
  },
  {
    title: "Stand out with authority",
    description: "Differentiate through reputation, not just messaging.",
    detail: "Authority PR helps brands become established names, not interchangeable options.",
    Icon: Target,
    tone: "violet",
    shape: "circle",
    span: "md:col-span-2",
  },
] as const;

const flowSteps: FlowStep[] = [
  {
    title: "Positioning",
    description: "Define the authority angle and narrative that should own mindshare.",
    example: "Example: founder reframed as category expert for emerging regulation commentary.",
    Icon: Target,
    tone: "amber",
    shape: "diamond",
  },
  {
    title: "Placement",
    description: "Secure earned features, interviews, and quoted expert opportunities.",
    example: "Example: interview + commentary placement stack in target vertical outlets.",
    Icon: Newspaper,
    tone: "navy",
    shape: "circle",
  },
  {
    title: "Amplification",
    description: "Use cross-channel repetition so each win reinforces perceived authority.",
    example: "Example: publication feature supported by podcast appearance and byline.",
    Icon: Mic2,
    tone: "teal",
    shape: "pill",
  },
  {
    title: "Recognition",
    description: "Become repeatedly seen, heard, and quoted by trusted third parties.",
    example: "Example: journalists begin requesting your viewpoint proactively.",
    Icon: Quote,
    tone: "rose",
    shape: "diamond",
  },
  {
    title: "Compounding Authority",
    description: "Visibility turns into trust, then trust turns into market leadership.",
    example: "Example: brand cited as the default authority across multiple conversations.",
    Icon: Crown,
    tone: "amber",
    shape: "circle",
  },
] as const;

const graphValues = [14, 17, 21, 28, 35, 43, 51, 63, 72, 81, 90];
const graphLabels = ["Launch", "M2", "M4", "M6", "M8", "M10", "M12"] as const;
const graphTickIndices = [0, 2, 4, 6, 8, 9, 10] as const;
const graphMilestones = [
  { index: 3, label: "Forbes feature", note: "Authority signal spike" },
  { index: 6, label: "Podcast appearance", note: "Voice amplification" },
  { index: 9, label: "Top 3 ranking", note: "Recognition compounding" },
] as const;

const mediaCards: MediaCard[] = [
  {
    kind: "image",
    title: "Travel authority commentary",
    outlet: "BBC Travel",
    src: "/authority-montage/processed/bbc-travel.webp",
    rowSpan: "md:row-span-2",
    tone: "navy",
  },
  {
    kind: "headline",
    title: "How founders build trust in crowded categories",
    outlet: "Entrepreneur UK",
    rowSpan: "md:row-span-1",
    tone: "amber",
  },
  {
    kind: "image",
    title: "Expert positioning in editorial list features",
    outlet: "Eat This, Not That",
    src: "/authority-montage/processed/eat-this-not-that.webp",
    rowSpan: "md:row-span-1",
    tone: "teal",
  },
  {
    kind: "headline",
    title: "The shift from mentions to market authority",
    outlet: "Fodor's",
    rowSpan: "md:row-span-2",
    tone: "rose",
  },
  {
    kind: "image",
    title: "Category narrative anchored by earned media",
    outlet: "Entrepreneur UK",
    src: "/authority-montage/processed/entrepreneur-uk.webp",
    rowSpan: "md:row-span-2",
    tone: "violet",
  },
  {
    kind: "image",
    title: "Public trust through repeated editorial validation",
    outlet: "Fodor's",
    src: "/authority-montage/processed/fodors-travel.webp",
    rowSpan: "md:row-span-1",
    tone: "amber",
  },
] as const;

const pricingTimeline = [
  {
    month: "Month 1",
    title: "Positioning and media angle architecture",
    detail: "Narrative alignment, authority priorities, and target opportunity map.",
  },
  {
    month: "Month 2",
    title: "Active pitching and expert commentary capture",
    detail: "Interview, byline, and request-response velocity against live media demand.",
  },
  {
    month: "Month 3+",
    title: "Compounding visibility and recognition",
    detail: "A repeatable authority engine where placements reinforce each other over time.",
  },
] as const;

const personaSlides: PersonaSlide[] = [
  {
    id: "founders",
    title: "Founders",
    scenario: "You are building personal authority to support company growth.",
    pain: "Great expertise, low visibility in the conversations that influence trust.",
    outcome: "Recognized voice positioning that gets you quoted, invited, and trusted faster.",
    Icon: UserRound,
    tone: "amber",
    shape: "diamond",
  },
  {
    id: "brands",
    title: "Brands",
    scenario: "You need stronger category recognition against louder competitors.",
    pain: "Your product is strong, but market perception does not yet reflect that.",
    outcome: "Consistent earned media presence that increases trust and category authority.",
    Icon: Building2,
    tone: "navy",
    shape: "circle",
  },
  {
    id: "experts",
    title: "Experts",
    scenario: "You want to be seen as the go-to source in your niche.",
    pain: "Knowledge exists, but third-party validation is missing.",
    outcome: "Expert commentary and byline momentum that strengthens your authority profile.",
    Icon: BadgeCheck,
    tone: "teal",
    shape: "pill",
  },
  {
    id: "companies",
    title: "Companies",
    scenario: "You want authority-led growth, not just periodic PR wins.",
    pain: "Mentions happen occasionally but do not create sustained recognition.",
    outcome: "Systematic authority program that compounds trust and market mindshare.",
    Icon: Crown,
    tone: "rose",
    shape: "diamond",
  },
] as const;

const caseStudies: CaseStudy[] = [
  {
    id: "lux-smiles",
    company: "Lux Smiles NYC",
    category: "Healthcare",
    summary: "Turned specialist expertise into broad editorial trust signals.",
    trafficIncrease: "+132%",
    drGrowth: "DR 42 -> 63",
    placements: ["Forbes quote", "Healthline commentary", "Podcast interview"],
    chartValues: [22, 24, 27, 35, 44, 58, 71],
    tone: "amber",
  },
  {
    id: "northridge-finance",
    company: "Northridge Finance",
    category: "Financial Services",
    summary: "Shifted from low recognition to strong third-party authority perception.",
    trafficIncrease: "+96%",
    drGrowth: "DR 38 -> 58",
    placements: ["WSJ mention", "Founder byline", "Industry interview"],
    chartValues: [16, 19, 21, 28, 37, 47, 58],
    tone: "navy",
  },
  {
    id: "atlas-travel",
    company: "Atlas Travel Group",
    category: "Travel",
    summary: "Built consistent visibility in trusted travel and lifestyle publications.",
    trafficIncrease: "+149%",
    drGrowth: "DR 35 -> 61",
    placements: ["BBC Travel feature", "Fodor's inclusion", "Expert quote stack"],
    chartValues: [18, 20, 25, 33, 46, 61, 77],
    tone: "teal",
  },
] as const;

function buildLineGeometry(values: number[]) {
  const chartWidth = 840;
  const chartHeight = 360;
  const padding = { top: 26, right: 24, bottom: 42, left: 26 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const max = Math.max(...values) * 1.06;
  const baselineY = padding.top + plotHeight;

  const points = values.map((value, index) => ({
    x: padding.left + (index / (values.length - 1)) * plotWidth,
    y: padding.top + (1 - value / max) * plotHeight,
  }));

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;

  return { chartWidth, chartHeight, points, linePath, areaPath, baselineY, padding };
}

function getToneClasses(tone: Tone) {
  return {
    navy: {
      bg: "bg-[linear-gradient(135deg,#10183a_0%,#27447e_100%)]",
      text: "text-white",
      shadow: "shadow-[0_16px_30px_rgba(16,24,58,0.22)]",
      border: "border-[#2d4278]",
    },
    amber: {
      bg: "bg-[linear-gradient(135deg,#f1be74_0%,#d37b34_100%)]",
      text: "text-[#24140a]",
      shadow: "shadow-[0_16px_30px_rgba(196,118,46,0.24)]",
      border: "border-[#dc9b53]",
    },
    teal: {
      bg: "bg-[linear-gradient(135deg,#b8f0df_0%,#2b8f81_100%)]",
      text: "text-[#08211d]",
      shadow: "shadow-[0_16px_30px_rgba(43,143,129,0.2)]",
      border: "border-[#65b7aa]",
    },
    rose: {
      bg: "bg-[linear-gradient(135deg,#ffd9cf_0%,#b85e4a_100%)]",
      text: "text-[#2f0f08]",
      shadow: "shadow-[0_16px_30px_rgba(184,94,74,0.2)]",
      border: "border-[#d99484]",
    },
    violet: {
      bg: "bg-[linear-gradient(135deg,#efe0ff_0%,#7253b8_100%)]",
      text: "text-[#1f1435]",
      shadow: "shadow-[0_16px_30px_rgba(114,83,184,0.18)]",
      border: "border-[#a289da]",
    },
  }[tone];
}

function SectionWrap({
  children,
  className,
  id,
  containerClass = pageContainerClass,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClass?: string;
}) {
  return (
    <section id={id} className={cn("py-4 md:py-5", className)}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, inverted = false }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        inverted
          ? "border border-white/18 bg-white/10 text-white/88"
          : "border border-[#d8cfbe] bg-white/82 text-[#6c592d] shadow-[0_12px_24px_rgba(44,38,26,0.08)]",
      )}
    >
      <Sparkles className={cn("h-3.5 w-3.5", inverted ? "text-white/90" : "text-[#b6782f]")} />
      {children}
    </span>
  );
}

function PrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="group h-12 rounded-full bg-[linear-gradient(135deg,#0d1837_0%,#22376f_56%,#2f7c8a_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(16,24,56,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(22,41,94,0.12),0_24px_46px_rgba(16,24,56,0.34)] sm:h-14 sm:px-7 sm:text-base"
    >
      <a href={href} target="_blank" rel="noreferrer">
        {label}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
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
          ? "border border-white/16 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/16"
          : "border border-[#d6cebf] bg-white text-[#1f2945] shadow-[0_16px_34px_rgba(24,31,62,0.06)] hover:-translate-y-0.5 hover:bg-[#faf5ed] hover:shadow-[0_0_0_5px_rgba(182,120,47,0.08),0_18px_38px_rgba(24,31,62,0.08)]",
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

function IconShell({
  Icon,
  tone,
  shape,
  className,
}: {
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
  className?: string;
}) {
  const toneClasses = getToneClasses(tone);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center border",
        toneClasses.bg,
        toneClasses.text,
        toneClasses.shadow,
        toneClasses.border,
        shape === "circle" && "h-14 w-14 rounded-full",
        shape === "diamond" && "h-14 w-14 rotate-45 rounded-[18px]",
        shape === "pill" && "h-12 w-[4.15rem] rounded-[18px]",
        className,
      )}
    >
      <Icon className={cn("h-5 w-5", shape === "diamond" && "-rotate-45")} />
    </div>
  );
}

function AuthorityDashboardMockup() {
  const points = [16, 20, 24, 31, 39, 51, 62, 70, 81];
  const geometry = buildLineGeometry(points);

  return (
    <motion.div
      {...revealProps}
      transition={{ ...revealProps.transition, delay: 0.08 }}
      className="relative h-full min-h-[28rem] rounded-[30px] border border-[#d8cfbe] bg-[linear-gradient(150deg,#fff9ee_0%,#eef4ff_40%,#f7f2ff_100%)] p-6 shadow-[0_28px_58px_rgba(44,38,26,0.12)] sm:p-7"
    >
      <div className="pointer-events-none absolute left-1/2 top-10 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,168,255,0.34),transparent_66%)] blur-3xl" />

      <div className="relative z-10 grid gap-4">
        <div className="rounded-[20px] border border-[#d6dced] bg-white/85 p-4 shadow-[0_16px_30px_rgba(20,28,60,0.08)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1e2e5a]">Authority Dashboard</p>
            <span className="rounded-full border border-[#cdd6ea] bg-[#f4f7ff] px-2.5 py-1 text-[11px] font-semibold text-[#4b5d8d]">
              Live
            </span>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {["Media mentions", "Expert quotes", "Brand recall"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.42 }}
                className="rounded-[12px] border border-[#d9dff0] bg-[#fbfcff] px-3 py-2 text-[12px] font-medium text-[#4b577c]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border border-[#d2d9ea] bg-white p-3 shadow-[0_16px_30px_rgba(20,28,60,0.08)]">
          <svg viewBox={`0 0 ${geometry.chartWidth} ${geometry.chartHeight}`} className="h-[11rem] w-full sm:h-[12rem]">
            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
              const y = geometry.padding.top + (geometry.baselineY - geometry.padding.top) * fraction;
              return (
                <line
                  key={fraction}
                  x1={geometry.padding.left}
                  x2={geometry.chartWidth - geometry.padding.right}
                  y1={y}
                  y2={y}
                  stroke="#e8edf7"
                  strokeDasharray="4 6"
                />
              );
            })}
            <motion.path
              d={geometry.areaPath}
              fill="url(#dashboardArea)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={geometry.linePath}
              fill="none"
              stroke="#20407d"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
            />
            {geometry.points.map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#20407d"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + index * 0.08, duration: 0.28 }}
              />
            ))}
            <defs>
              <linearGradient id="dashboardArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f8de4" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#4f8de4" stopOpacity="0.04" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="space-y-2">
          {[
            "Forbes: founder insight quoted",
            "BBC: category trend mention",
            "Podcast: expert episode released",
          ].map((mention, index) => (
            <motion.div
              key={mention}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.14, duration: 0.4 }}
              className="rounded-[14px] border border-[#d6dced] bg-white px-4 py-3 text-[13px] font-medium text-[#3f496a] shadow-[0_10px_20px_rgba(20,28,60,0.07)]"
            >
              {mention}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ speed = 18, reverse = false }: { speed?: number; reverse?: boolean }) {
  const rows = [...trustLogos, ...trustLogos];

  return (
    <div className="overflow-hidden py-1">
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {rows.map((logo, index) => (
          <div key={`${logo.alt}-${index}`} className="group relative">
            <div className="flex h-[82px] min-w-[170px] items-center justify-center rounded-[16px] border border-white/16 bg-white/10 px-5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-w-[220px]">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className={cn("object-contain", logo.className, logo.filterClass)}
              />
            </div>
            <div className="pointer-events-none absolute -bottom-10 left-1/2 z-20 w-56 -translate-x-1/2 rounded-[12px] border border-white/20 bg-[#121c44]/95 px-3 py-2 text-xs leading-[1.45] text-white/82 opacity-0 shadow-[0_16px_28px_rgba(6,10,24,0.4)] transition duration-250 group-hover:opacity-100">
              {logo.snippet}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function AuthorityNetworkDiagram() {
  const nodes = [
    { id: "brand", label: "Brand Authority", x: 50, y: 50, tone: "amber" as Tone },
    { id: "media", label: "Editorial Media", x: 20, y: 24, tone: "navy" as Tone },
    { id: "voice", label: "Expert Voice", x: 82, y: 25, tone: "teal" as Tone },
    { id: "trust", label: "Market Trust", x: 20, y: 76, tone: "rose" as Tone },
    { id: "recognition", label: "Recognition", x: 82, y: 76, tone: "violet" as Tone },
  ] as const;

  const links = [
    ["brand", "media"],
    ["brand", "voice"],
    ["brand", "trust"],
    ["brand", "recognition"],
    ["media", "trust"],
    ["voice", "recognition"],
  ] as const;

  const getNode = (id: string) => nodes.find((node) => node.id === id)!;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#d8cfbe] bg-[linear-gradient(145deg,#fff8ee_0%,#f1f7ff_100%)] p-6 shadow-[0_22px_44px_rgba(44,38,26,0.1)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(212,136,61,0.12),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(61,154,184,0.1),transparent_22%)]" />

      <svg viewBox="0 0 100 100" className="relative z-10 h-[18rem] w-full sm:h-[20rem]">
        {links.map(([from, to], index) => {
          const fromNode = getNode(from);
          const toNode = getNode(to);

          return (
            <motion.line
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#98a8c9"
              strokeWidth="0.7"
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            />
          );
        })}

        {nodes.map((node, index) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="10"
              fill={
                node.tone === "amber"
                  ? "#f5be76"
                  : node.tone === "navy"
                    ? "#264881"
                    : node.tone === "teal"
                      ? "#51a89b"
                      : node.tone === "rose"
                        ? "#cd7f6c"
                        : "#8f72cb"
              }
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.44, delay: 0.18 + index * 0.09 }}
            />
            <motion.text
              x={node.x}
              y={node.y + 16}
              textAnchor="middle"
              fontSize="3.4"
              fill="#253252"
              fontWeight="700"
              initial={{ opacity: 0, y: 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.35, delay: 0.32 + index * 0.08 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LeaderTileCard({ tile }: { tile: LeaderTile }) {
  return (
    <motion.div
      {...revealProps}
      whileHover={{ y: -5, rotate: 0.3 }}
      className={cn("group relative overflow-hidden rounded-[22px] border border-[#dfd4c2] bg-white p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]", tile.span)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_14%_18%,rgba(191,150,81,0.14),transparent_26%),radial-gradient(circle_at_84%_78%,rgba(67,149,173,0.12),transparent_26%)]" />
      <div className="relative z-10">
        <IconShell Icon={tile.Icon} tone={tile.tone} shape={tile.shape} className="group-hover:scale-110 transition-transform duration-300" />
        <h3 className="mt-5 text-[1.35rem] font-display font-bold leading-[1.1] tracking-[-0.03em] text-[#111729]">
          {tile.title}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-[#5f6577]">{tile.description}</p>
        <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100">
          <p className="rounded-[12px] border border-[#ddd2bf] bg-[#faf4e8] px-3 py-2.5 text-[13px] leading-[1.55] text-[#4f5871]">
            {tile.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FlowStepCard({ step, index }: { step: FlowStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.52, delay: index * 0.08 }}
      className="relative min-w-[250px] snap-center rounded-[20px] border border-[#ddd2bf] bg-white p-5 shadow-[0_16px_32px_rgba(24,31,62,0.08)] sm:min-w-[260px]"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f6733]">{`Step ${index + 1}`}</span>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="text-[1.1rem] font-display font-bold tracking-[-0.02em] text-[#111729]">{step.title}</h3>
        <IconShell Icon={step.Icon} tone={step.tone} shape={step.shape} className="scale-90" />
      </div>
      <p className="mt-3 text-[14px] leading-[1.65] text-[#5e6476]">{step.description}</p>
      <p className="mt-4 rounded-[12px] border border-[#ddd2bf] bg-[#faf5eb] px-3 py-2 text-[12px] leading-[1.55] text-[#49506a]">{step.example}</p>
    </motion.div>
  );
}

function MomentumGraph() {
  const graphRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: graphRef,
    offset: ["start 78%", "end 24%"],
  });
  const pathProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 20, mass: 0.4 });

  const geometry = buildLineGeometry(graphValues);
  const milestoneOpacityOne = useTransform(scrollYProgress, [0.18, 0.35], [0, 1]);
  const milestoneOpacityTwo = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const milestoneOpacityThree = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);

  return (
    <div
      ref={graphRef}
      className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(135deg,#0a112b_0%,#121f4a_46%,#1f3d5f_72%,#2c5e66_100%)] p-8 text-white shadow-[0_30px_70px_rgba(9,16,41,0.32)] sm:p-10 lg:p-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,196,107,0.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(97,210,191,0.14),transparent_24%),radial-gradient(circle_at_56%_84%,rgba(255,126,91,0.1),transparent_28%)]" />
      <div className="relative z-10">
        <Eyebrow inverted>Compounding Authority</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-balance text-[2rem] font-display font-bold leading-[1.05] tracking-[-0.05em] sm:text-[2.35rem]">
          Momentum builds when authority wins stack over time
        </h2>
        <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-white/72">
          As you scroll, the curve builds from launch to sustained authority. Each milestone reinforces recognition and trust.
        </p>

        <div className="relative mt-9 rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur sm:p-5">
          <svg viewBox={`0 0 ${geometry.chartWidth} ${geometry.chartHeight}`} className="h-[20rem] w-full sm:h-[22rem]">
            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
              const y = geometry.padding.top + (geometry.baselineY - geometry.padding.top) * fraction;

              return (
                <line
                  key={fraction}
                  x1={geometry.padding.left}
                  x2={geometry.chartWidth - geometry.padding.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.2)"
                  strokeDasharray="4 8"
                />
              );
            })}

            <motion.path d={geometry.areaPath} fill="url(#authorityMomentumFill)" style={{ opacity: pathProgress }} />
            <motion.path
              d={geometry.linePath}
              fill="none"
              stroke="#76d9c4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: pathProgress }}
            />
            {geometry.points.map((point, index) => (
              <circle key={index} cx={point.x} cy={point.y} r="3.8" fill="#9ce9d7" />
            ))}

            {graphTickIndices.map((tickIndex, idx) => (
              <text
                key={tickIndex}
                x={geometry.points[tickIndex].x}
                y={geometry.baselineY + 24}
                textAnchor="middle"
                fill="rgba(255,255,255,0.64)"
                fontSize="11"
                fontWeight="600"
              >
                {graphLabels[idx]}
              </text>
            ))}

            <defs>
              <linearGradient id="authorityMomentumFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#57cdb2" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#57cdb2" stopOpacity="0.04" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            style={{ opacity: milestoneOpacityOne }}
            className="pointer-events-none absolute left-[24%] top-[31%] rounded-[12px] border border-[#88dbc7]/36 bg-[#154d50]/78 px-3 py-2 text-xs font-medium text-white/92"
          >
            Forbes feature
          </motion.div>
          <motion.div
            style={{ opacity: milestoneOpacityTwo }}
            className="pointer-events-none absolute left-[52%] top-[43%] rounded-[12px] border border-[#f0c288]/38 bg-[#744a1f]/72 px-3 py-2 text-xs font-medium text-white/92"
          >
            Podcast appearance
          </motion.div>
          <motion.div
            style={{ opacity: milestoneOpacityThree }}
            className="pointer-events-none absolute left-[74%] top-[22%] rounded-[12px] border border-[#f1a798]/34 bg-[#7f3d34]/72 px-3 py-2 text-xs font-medium text-white/92"
          >
            Top 3 ranking
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function MediaMosaicCard({ item, index }: { item: MediaCard; index: number }) {
  const toneClassMap = {
    navy: "from-[#0f183a] to-[#27447d]",
    amber: "from-[#f1be74] to-[#d37b34]",
    teal: "from-[#b8f0df] to-[#2b8f81]",
    rose: "from-[#ffd9cf] to-[#b85e4a]",
    violet: "from-[#efe0ff] to-[#7253b8]",
  } as const;

  return (
    <motion.div
      {...revealProps}
      transition={{ ...revealProps.transition, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={cn("group relative overflow-hidden rounded-[22px] border border-[#ddd2bf] bg-white shadow-[0_18px_36px_rgba(24,31,62,0.08)]", item.rowSpan)}
    >
      {item.kind === "image" ? (
        <div className="relative h-full min-h-[12rem]">
          <Image src={item.src} alt={item.title} fill className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(6,9,24,0.76)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/64">{item.outlet}</p>
            <p className="mt-2 text-[15px] font-semibold leading-[1.45] text-white">{item.title}</p>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative flex h-full min-h-[12rem] flex-col justify-between bg-gradient-to-br p-5",
            toneClassMap[item.tone],
          )}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">{item.outlet}</div>
          <h3 className="mt-8 text-[1.25rem] font-display font-bold leading-[1.15] tracking-[-0.03em] text-white">{item.title}</h3>
          <p className="mt-3 text-[13px] leading-[1.6] text-white/78">
            Hover to preview how this placement supports authority perception.
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle,rgba(16,24,58,0.84)_0%,rgba(16,24,58,0.86)_66%)] p-6 text-center opacity-0 transition duration-300 group-hover:opacity-100">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/64">{item.outlet}</p>
          <h4 className="mt-3 text-[1.25rem] font-display font-bold leading-[1.15] tracking-[-0.03em] text-white">{item.title}</h4>
          <p className="mt-3 text-[14px] leading-[1.6] text-white/74">Authority placement preview available in campaign reporting.</p>
        </div>
      </div>
    </motion.div>
  );
}

function PricingFeaturePanel({
  title,
  description,
  tone,
}: {
  title: string;
  description: string;
  tone: Tone;
}) {
  const toneBg = {
    navy: "bg-[#e8eefc]",
    amber: "bg-[#fff1da]",
    teal: "bg-[#e8f6f1]",
    rose: "bg-[#fff0ec]",
    violet: "bg-[#f1ecfb]",
  } as const;

  return (
    <div className={cn("rounded-[20px] border border-[#ddd2bf] p-5 shadow-[0_12px_24px_rgba(44,38,26,0.06)]", toneBg[tone])}>
      <h3 className="text-[17px] font-display font-bold tracking-[-0.02em] text-[#111729]">{title}</h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-[#5b6276]">{description}</p>
    </div>
  );
}

function CaseStudySparkline({ values, tone }: { values: number[]; tone: Tone }) {
  const width = 220;
  const height = 90;
  const padding = 6;
  const max = Math.max(...values) * 1.06;
  const plotW = width - padding * 2;
  const plotH = height - padding * 2;

  const points = values.map((value, index) => ({
    x: padding + (index / (values.length - 1)) * plotW,
    y: padding + (1 - value / max) * plotH,
  }));

  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const toneStroke = {
    navy: "#1f3d76",
    amber: "#c46d2f",
    teal: "#2d8f81",
    rose: "#b56552",
    violet: "#6f51b6",
  } as const;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-20 w-full">
      <path d={path} fill="none" stroke={toneStroke[tone]} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r="2.8" fill={toneStroke[tone]} />
      ))}
    </svg>
  );
}

export function AuthorityPrDeckPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(heroProgress, [0, 1], [0, 46]);

  const [activePersona, setActivePersona] = useState(personaSlides[0].id);
  const [activeCase, setActiveCase] = useState<CaseStudy | null>(null);
  const selectedPersona = personaSlides.find((item) => item.id === activePersona) ?? personaSlides[0];

  return (
    <>
      <ChatWidget />
      <main className="overflow-x-hidden bg-[#f4efe7] text-[#171929]">
        <div className="relative">
          <SiteHeader theme="light" />

          <SectionWrap containerClass={heroContainerClass} className="pt-5">
            <div
              ref={heroRef}
              className="relative overflow-hidden rounded-[34px] border border-[#dfd4c2] bg-[linear-gradient(135deg,#fbf6ee_0%,#eef4ff_48%,#fff0da_100%)] px-8 py-10 shadow-[0_30px_70px_rgba(44,38,26,0.12)] sm:px-10 lg:px-14 lg:py-14"
            >
              <motion.div
                style={{ y: heroParallaxY }}
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(212,136,61,0.12),transparent_25%),radial-gradient(circle_at_86%_16%,rgba(33,95,120,0.12),transparent_24%),radial-gradient(circle_at_60%_80%,rgba(114,83,184,0.08),transparent_28%)]"
              />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(21,28,48,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(21,28,48,0.14)_1px,transparent_1px)] [background-size:54px_54px]" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <motion.div {...revealProps}>
                  <Eyebrow>Authority PR</Eyebrow>
                  <h1 className="mt-6 max-w-3xl text-balance text-5xl font-display font-bold leading-[0.95] tracking-[-0.055em] text-[#101729] sm:text-6xl md:text-7xl">
                    Become the go-to expert and go-to brand in your market.
                  </h1>
                  <p className="mt-5 max-w-2xl text-[1.25rem] leading-[1.6] text-[#30384f] sm:text-[1.45rem]">
                    A premium Authority PR service built to increase visibility, strengthen trust, and help you dominate mindshare through earned media.
                  </p>
                  <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-[#58607a]">
                    This is not about random mentions. It is a system for building category authority through placements that shape perception and reputation.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton href="https://book.linkifi.io/widget/bookings/pr-discovery-call" label="Book Discovery Call" />
                    <SecondaryButton href="#authority-flow" label="See The Mechanism" />
                  </div>
                </motion.div>

                <AuthorityDashboardMockup />
              </div>
            </div>
          </SectionWrap>

          <section className="relative py-14">
            <div className="relative left-1/2 w-screen -translate-x-1/2 bg-[linear-gradient(120deg,#0d1431_0%,#162453_44%,#27456f_100%)] py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,196,107,0.16),transparent_24%),radial-gradient(circle_at_90%_18%,rgba(97,210,191,0.12),transparent_22%)]" />
              <div className={heroContainerClass}>
                <motion.div {...revealProps} className="relative z-10 mx-auto max-w-4xl text-center">
                  <Eyebrow inverted>Authority Wall</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.1] tracking-[-0.045em] text-white sm:text-[2.45rem]">
                    Trusted by journalists in the outlets that shape market perception
                  </h2>
                  <p className="mt-4 text-[17px] leading-[1.7] text-white/70">
                    Multiple layers, multiple speeds, and live-feeling movement so this proof section feels active, not static.
                  </p>
                  <div className="mt-8 space-y-3">
                    <MarqueeRow speed={22} />
                    <MarqueeRow speed={27} reverse />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <SectionWrap>
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <motion.div {...revealProps}>
                <AuthorityNetworkDiagram />
              </motion.div>

              <motion.div {...revealProps} transition={{ ...revealProps.transition, delay: 0.08 }}>
                <div className="rounded-[30px] border border-[#dfd4c2] bg-[#fffaf2] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10">
                  <Eyebrow>What Is Authority PR</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-[#111729] sm:text-[2.3rem]">
                    A system for becoming more visible, more trusted, and more recognized
                  </h2>

                  <div className="relative mt-8 space-y-4 pl-5">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true, amount: 0.45 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute left-0 top-0 w-[2px] rounded-full bg-[linear-gradient(180deg,#d5934a_0%,#375f84_40%,#2c8a7c_100%)]"
                    />
                    {whatIsPoints.map((item, index) => (
                      <div key={item.title} className="rounded-[18px] border border-[#ddd2bf] bg-white p-4 shadow-[0_10px_24px_rgba(44,38,26,0.05)]">
                        <div className="flex items-start gap-3">
                          <IconShell Icon={item.Icon} tone={item.tone} shape={item.shape} className="scale-[0.82]" />
                          <div>
                            <h3 className="text-[17px] font-display font-bold tracking-[-0.02em] text-[#111729]">{item.title}</h3>
                            <p className="mt-2 text-[14px] leading-[1.65] text-[#5d6476]">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <motion.div {...revealProps} className="rounded-[30px] border border-[#dfd4c2] bg-[#fbf6ee] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10 lg:p-12">
              <Eyebrow>Show Up Like A Leader</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.08] tracking-[-0.05em] text-[#111729] sm:text-[2.35rem]">
                Interactive outcomes grid: authority turns into recognition, trust, and category leadership
              </h2>
              <div className="mt-10 grid gap-4 md:grid-cols-6">
                {leaderTiles.map((tile) => (
                  <LeaderTileCard key={tile.title} tile={tile} />
                ))}
              </div>
            </motion.div>
          </SectionWrap>

          <SectionWrap id="authority-flow" className="scroll-mt-10 md:scroll-mt-12">
            <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <motion.div
                  {...revealProps}
                  className="rounded-[30px] border border-[#dfd4c2] bg-[linear-gradient(145deg,#fef8ef_0%,#f5eee2_100%)] p-8 shadow-[0_22px_48px_rgba(44,38,26,0.08)] sm:p-10"
                >
                  <Eyebrow>Authority Flow</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.05] tracking-[-0.05em] text-[#111729] sm:text-[2.25rem]">
                    Positioning to Placement to Amplification to Recognition to Compounding
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.75] text-[#5b6276]">
                    Scroll through the timeline to see how each phase activates and contributes to market authority.
                  </p>
                </motion.div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-[6.6rem] hidden h-[2px] bg-[linear-gradient(90deg,#d5934a_0%,#375f84_40%,#2c8a7c_100%)] lg:block" />
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
                  {flowSteps.map((step, index) => (
                    <div key={step.title} className="relative">
                      {index < flowSteps.length - 1 ? (
                        <span className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border border-[#ddd2bf] bg-white p-1 text-[#8f6733] shadow-[0_10px_18px_rgba(24,31,62,0.08)] lg:inline-flex">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      ) : null}
                      <FlowStepCard step={step} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <MomentumGraph />
          </SectionWrap>

          <SectionWrap>
            <motion.div {...revealProps} className="rounded-[30px] border border-[#dfd4c2] bg-[linear-gradient(145deg,#fbf6ee_0%,#f1ece5_100%)] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10">
              <Eyebrow>Earned Visibility</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-[#111729] sm:text-[2.3rem]">
                Media mosaic proof across screenshots, headlines, and outlet context
              </h2>
              <div className="mt-10 grid gap-4 md:auto-rows-[180px] md:grid-cols-3">
                {mediaCards.map((item, index) => (
                  <MediaMosaicCard key={`${item.kind}-${item.title}`} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          </SectionWrap>

          <SectionWrap id="pricing" className="scroll-mt-10 md:scroll-mt-12">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div {...revealProps} className="space-y-5">
                <div className="rounded-[20px] border border-[#dfd4c2] bg-[#fffaf2] p-6 shadow-[0_18px_38px_rgba(44,38,26,0.08)]">
                  <Eyebrow>Pricing Context</Eyebrow>
                  <h3 className="mt-4 text-[1.55rem] font-display font-bold leading-[1.08] tracking-[-0.03em] text-[#111729]">
                    Premium retained program, built as a real authority engine
                  </h3>
                </div>
                <PricingFeaturePanel
                  title="Who it is for"
                  description="Brands, founders, spokespeople, and experts serious about owning category authority."
                  tone="amber"
                />
                <PricingFeaturePanel
                  title="Core objective"
                  description="Become the name people recognize, the expert people quote, and the company people trust."
                  tone="teal"
                />
                <PricingFeaturePanel
                  title="Downstream effect"
                  description="SEO and AI visibility gains can happen, but authority and trust are the primary goals."
                  tone="violet"
                />
              </motion.div>

              <motion.div
                {...revealProps}
                transition={{ ...revealProps.transition, delay: 0.08 }}
                whileHover={{ y: -4 }}
                className="relative rounded-[30px] p-[1px] shadow-[0_30px_64px_rgba(16,24,56,0.24)]"
              >
                <div className="absolute inset-0 rounded-[30px] bg-[linear-gradient(135deg,#9cc9ff_0%,#88d7c4_36%,#f2ba7c_68%,#d98f75_100%)] opacity-80 blur-[1px]" />
                <div className="relative rounded-[29px] border border-[#23325b] bg-[linear-gradient(145deg,#0f1738_0%,#1f2d62_60%,#285c5c_100%)] p-8 text-white sm:p-10">
                  <Eyebrow inverted>Authority PR Engagement</Eyebrow>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-white/16 bg-white/10 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">Fee</p>
                      <div className="mt-2 text-[2.6rem] font-display font-bold leading-none tracking-[-0.06em]">$5,000</div>
                      <p className="mt-2 text-[13px] text-white/74">per month</p>
                    </div>
                    <div className="rounded-[18px] border border-white/16 bg-white/10 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">Target output</p>
                      <div className="mt-2 text-[2.6rem] font-display font-bold leading-none tracking-[-0.06em]">3-4</div>
                      <p className="mt-2 text-[13px] text-white/74">pieces/month</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">What happens each month</p>
                    <div className="relative mt-4 space-y-4 pl-6">
                      <div className="pointer-events-none absolute left-[9px] top-1 bottom-1 w-[2px] bg-[linear-gradient(180deg,#f1be74_0%,#68d5c1_52%,#7ea7ea_100%)]" />
                      {pricingTimeline.map((item, index) => (
                        <div key={item.month} className="relative rounded-[14px] border border-white/14 bg-white/8 p-4">
                          <span className="absolute -left-[23px] top-5 h-4 w-4 rounded-full border-[3px] border-[#1d2b58] bg-[#f1be74]" />
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/58">{item.month}</p>
                          <h4 className="mt-2 text-[15px] font-semibold leading-[1.45] text-white">{item.title}</h4>
                          <p className="mt-2 text-[13px] leading-[1.6] text-white/74">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-8 rounded-[14px] border border-white/14 bg-white/10 px-4 py-3 text-[13px] leading-[1.55] text-white/80">
                    Target output is not guaranteed. PR depends on editorial discretion and third-party acceptance.
                  </p>
                </div>
              </motion.div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr] lg:items-start">
              <motion.div
                {...revealProps}
                className="rounded-[30px] border border-[#dfd4c2] bg-[#fffaf2] p-8 shadow-[0_22px_48px_rgba(44,38,26,0.08)] sm:p-10"
              >
                <Eyebrow>Built For Brands</Eyebrow>
                <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-[#111729] sm:text-[2.25rem]">
                  Real-world context by persona
                </h2>
                <p className="mt-4 text-[16px] leading-[1.72] text-[#5b6276]">
                  Switch between personas to see the scenario, pain point, and authority outcome.
                </p>
              </motion.div>

              <motion.div
                {...revealProps}
                transition={{ ...revealProps.transition, delay: 0.08 }}
                className="rounded-[30px] border border-[#dfd4c2] bg-[linear-gradient(145deg,#fbf6ee_0%,#f1ece5_100%)] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10"
              >
                <div className="flex flex-wrap gap-2">
                  {personaSlides.map((slide) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActivePersona(slide.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-semibold transition",
                        activePersona === slide.id
                          ? "border-[#2a3d72] bg-[#20386e] text-white shadow-[0_12px_24px_rgba(32,56,110,0.24)]"
                          : "border-[#d8cfbe] bg-white text-[#39405b] hover:bg-[#f8f1e4]",
                      )}
                    >
                      {slide.title}
                    </button>
                  ))}
                </div>

                <motion.div
                  key={selectedPersona.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 rounded-[24px] border border-[#ddd2bf] bg-white p-6 shadow-[0_12px_24px_rgba(44,38,26,0.06)]"
                >
                  <div className="flex items-start gap-4">
                    <IconShell Icon={selectedPersona.Icon} tone={selectedPersona.tone} shape={selectedPersona.shape} />
                    <div>
                      <h3 className="text-[1.35rem] font-display font-bold tracking-[-0.03em] text-[#111729]">{selectedPersona.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.65] text-[#5c6377]">{selectedPersona.scenario}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[14px] border border-[#efceb0] bg-[#fff1da] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8c5f27]">Pain point</p>
                      <p className="mt-2 text-[14px] leading-[1.6] text-[#5b4f3a]">{selectedPersona.pain}</p>
                    </div>
                    <div className="rounded-[14px] border border-[#cfe3dd] bg-[#e8f6f1] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1b685d]">Outcome</p>
                      <p className="mt-2 text-[14px] leading-[1.6] text-[#355f58]">{selectedPersona.outcome}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <motion.div {...revealProps} className="rounded-[30px] border border-[#dfd4c2] bg-[#fffaf2] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10">
              <Eyebrow>Interactive Proof</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-[#111729] sm:text-[2.3rem]">
                Click a case study to expand traffic, authority growth, and placement outcomes
              </h2>

              <div className="mt-9 grid gap-4 md:grid-cols-3">
                {caseStudies.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCase(item)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={cn(
                      "group overflow-hidden rounded-[22px] border p-5 text-left shadow-[0_16px_32px_rgba(24,31,62,0.08)]",
                      index === 0 && "border-[#efceb0] bg-[#fff1da]",
                      index === 1 && "border-[#ccd9ec] bg-[#e8eefc]",
                      index === 2 && "border-[#cfe3dd] bg-[#e8f6f1]",
                    )}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6a5b3e]">{item.category}</p>
                    <h3 className="mt-3 text-[1.3rem] font-display font-bold leading-[1.1] tracking-[-0.03em] text-[#111729]">{item.company}</h3>
                    <p className="mt-3 text-[14px] leading-[1.6] text-[#51586e]">{item.summary}</p>
                    <div className="mt-4 rounded-[12px] border border-white/65 bg-white/62 px-3 py-2">
                      <CaseStudySparkline values={item.chartValues} tone={item.tone} />
                    </div>
                    <p className="mt-4 text-[13px] font-semibold text-[#25355f]">Click to open full breakdown</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </SectionWrap>

          <SectionWrap className="pb-12">
            <motion.div
              {...revealProps}
              className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(130deg,#0b122d_0%,#121f49_48%,#1f5360_100%)] p-10 text-white shadow-[0_34px_88px_rgba(8,11,29,0.32)] sm:p-12"
            >
              <motion.div
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255,196,107,0.26), transparent 28%), radial-gradient(circle at 82% 20%, rgba(97,210,191,0.2), transparent 30%), radial-gradient(circle at 56% 82%, rgba(255,147,118,0.16), transparent 32%)",
                  backgroundSize: "150% 150%",
                }}
              />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <Eyebrow inverted>Next Step</Eyebrow>
                  <h2 className="mt-5 max-w-xl text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-white sm:text-[2.4rem]">
                    Let&apos;s build the authority your market already trusts
                  </h2>
                  <p className="mt-5 max-w-xl text-[17px] leading-[1.75] text-white/72">
                    If you want to become the recognized brand and quoted expert in your category, let&apos;s map fit, positioning, and opportunities.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:items-start">
                  <PrimaryButton href="https://book.linkifi.io/widget/bookings/pr-discovery-call" label="Start Authority PR" />
                  <SecondaryButton href="/contact-us" label="Book A Strategy Call" dark />
                </div>
              </div>
            </motion.div>
          </SectionWrap>
        </div>
      </main>

      <AnimatePresence>
        {activeCase ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#050913]/72 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.28 }}
              className="relative w-full max-w-3xl rounded-[28px] border border-[#d4ccbe] bg-[#fffaf2] p-7 shadow-[0_36px_76px_rgba(9,16,36,0.34)] sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="absolute right-4 top-4 rounded-full border border-[#d9cfbf] bg-white p-2 text-[#39405b] transition hover:bg-[#f6f0e3]"
                aria-label="Close case study modal"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6130]">{activeCase.category}</p>
              <h3 className="mt-3 text-[2rem] font-display font-bold leading-[1.02] tracking-[-0.045em] text-[#111729]">{activeCase.company}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#5a6174]">{activeCase.summary}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[16px] border border-[#efceb0] bg-[#fff1da] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8d6028]">Traffic growth</p>
                  <p className="mt-2 text-[2rem] font-display font-bold tracking-[-0.04em] text-[#111729]">{activeCase.trafficIncrease}</p>
                </div>
                <div className="rounded-[16px] border border-[#cfdbe9] bg-[#e8eefc] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#334f8d]">Authority growth</p>
                  <p className="mt-2 text-[2rem] font-display font-bold tracking-[-0.04em] text-[#111729]">{activeCase.drGrowth}</p>
                </div>
              </div>

              <div className="mt-5 rounded-[16px] border border-[#ddd2bf] bg-white p-4">
                <CaseStudySparkline values={activeCase.chartValues} tone={activeCase.tone} />
              </div>

              <div className="mt-5 rounded-[16px] border border-[#ddd2bf] bg-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8f6733]">Media placements</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {activeCase.placements.map((item) => (
                    <div key={item} className="rounded-[12px] border border-[#ece3d1] bg-[#fcf8ef] px-3 py-2 text-[13px] font-medium text-[#4e5670]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SiteFooter flushTop />
    </>
  );
}
