import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
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
  Tv,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/site/ChatWidget";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { cn } from "@/lib/utils";

type IconItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const trustLogos = [
  {
    src: "/publication-logos/nytimes.webp",
    alt: "The New York Times",
    width: 520,
    height: 90,
    className: "h-8 w-auto sm:h-9",
    filterClass: "opacity-100",
  },
  {
    src: "/publication-logos/forbes.webp",
    alt: "Forbes",
    width: 280,
    height: 90,
    className: "h-10 w-auto sm:h-11",
    filterClass: "opacity-100",
  },
  {
    src: "/publication-logos/guardian.webp",
    alt: "The Guardian",
    width: 320,
    height: 95,
    className: "h-7 w-auto sm:h-8",
    filterClass: "opacity-100",
  },
  {
    src: "/publication-logos/healthline.webp",
    alt: "healthline",
    width: 360,
    height: 70,
    className: "h-7 w-auto sm:h-8",
    filterClass: "opacity-100",
  },
  {
    src: "/publication-logos/bbc.svg",
    alt: "BBC",
    width: 112,
    height: 40,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert",
  },
  {
    src: "/publication-logos/daily-express-clean.webp",
    alt: "Daily Express",
    width: 3816,
    height: 454,
    className: "h-4 w-auto sm:h-5",
    filterClass: "invert",
  },
  {
    src: "/publication-logos/wsj-clean.webp",
    alt: "WSJ",
    width: 3690,
    height: 2091,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert",
  },
  {
    src: "/publication-logos/hubspot-clean.webp",
    alt: "HubSpot",
    width: 800,
    height: 232,
    className: "h-6 w-auto sm:h-7",
    filterClass: "invert",
  },
] as const;

const builtFor: IconItem[] = [
  {
    title: "Brands",
    description: "That want to become the go-to name in their category.",
    Icon: Building2,
  },
  {
    title: "Founders",
    description: "Who want to be seen as recognized industry voices.",
    Icon: UserRound,
  },
  {
    title: "Experts",
    description: "Who want to be quoted, trusted, and remembered.",
    Icon: BadgeCheck,
  },
];

const promisePillars: IconItem[] = [
  {
    title: "More visible",
    description: "Show up in the spaces that shape perception and reputation.",
    Icon: Eye,
  },
  {
    title: "More trusted",
    description: "Build third-party validation through earned media credibility.",
    Icon: ShieldCheck,
  },
  {
    title: "More recognized",
    description: "Become the brand people recognize and the expert people quote.",
    Icon: Crown,
  },
];

const authorityOutcomes: IconItem[] = [
  {
    title: "Become the go-to expert in your industry",
    description: "Be the first name people think of when the topic comes up.",
    Icon: BadgeCheck,
  },
  {
    title: "Build stronger authority in your market",
    description: "Increase your perceived expertise and category leadership.",
    Icon: Target,
  },
  {
    title: "Dominate more of the conversation in your space",
    description: "Expand your share of voice in high-trust channels.",
    Icon: Megaphone,
  },
  {
    title: "Raise founder and spokesperson profile",
    description: "Position leadership as credible voices people want to hear from.",
    Icon: UserRound,
  },
  {
    title: "Strengthen trust with customers and partners",
    description: "Earn the kind of media presence that accelerates trust decisions.",
    Icon: Users,
  },
  {
    title: "Stand out from competitors through credibility",
    description: "Win mindshare with authority, not noise.",
    Icon: CheckCircle2,
  },
];

const authorityFlow = [
  {
    title: "Positioning and authority angle",
    description: "Define the narrative that turns your expertise into media relevance.",
    Icon: Target,
  },
  {
    title: "Proactive pitching",
    description: "Pitch interviews, features, bylines, and op-eds to target outlets.",
    Icon: Newspaper,
  },
  {
    title: "Reactive opportunity capture",
    description: "Respond to journalist requests and timely commentary openings.",
    Icon: MessageCircle,
  },
  {
    title: "Third-party validation",
    description: "Secure earned placements that strengthen market trust.",
    Icon: Quote,
  },
  {
    title: "Compounding authority",
    description: "Convert visibility into recognition, trust, and category mindshare.",
    Icon: BadgeCheck,
  },
] as const;

const placements: IconItem[] = [
  { title: "Reputable publications", description: "Coverage where credibility compounds.", Icon: Newspaper },
  { title: "Industry and news interviews", description: "Voice-led exposure in trusted channels.", Icon: MessageCircle },
  { title: "Podcast appearances", description: "Deeper storytelling with engaged audiences.", Icon: Mic2 },
  { title: "Expert commentary opportunities", description: "Fast-response thought leadership moments.", Icon: Megaphone },
  { title: "Quoted expert placements", description: "High-trust citations in relevant articles.", Icon: Quote },
  { title: "Bylines and contributed articles", description: "Controlled narrative in third-party media.", Icon: PenSquare },
  { title: "Opinion pieces and op-eds", description: "Clear perspective leadership on category topics.", Icon: PenSquare },
  { title: "Timely media opportunities", description: "Visibility tied to live industry conversations.", Icon: Sparkles },
];

const coverageMix: IconItem[] = [
  { title: "Publication features", description: "Feature-led visibility", Icon: Newspaper },
  { title: "Interviews", description: "Founder and expert interviews", Icon: MessageCircle },
  { title: "Podcast placements", description: "Authority voice distribution", Icon: Mic2 },
  { title: "Expert commentary", description: "Fast-turn media contribution", Icon: Megaphone },
  { title: "Quoted expert opportunities", description: "Credibility citations", Icon: Quote },
  { title: "Bylines", description: "Thought leadership articles", Icon: PenSquare },
  { title: "Op-eds", description: "Perspective-led authority", Icon: PenSquare },
  { title: "Other authority-building coverage", description: "Strategic editorial opportunities", Icon: Sparkles },
];

const cadence = [
  "Week 1: story angles and positioning updates",
  "Week 2: proactive pitching to priority outlets",
  "Week 3: interview and commentary follow-through",
  "Week 4: placement consolidation and next wave setup",
] as const;

const audienceCards = [
  { title: "Founders", description: "Who want to raise their personal profile and be seen as leaders." },
  { title: "Brands", description: "That want to become more trusted and recognized in their category." },
  { title: "Experts", description: "Who want to become the go-to voice in their market." },
  { title: "Companies", description: "That want more than mentions and need real authority growth." },
] as const;

const proofImages = [
  {
    src: "/authority-montage/processed/entrepreneur-uk.webp",
    alt: "Entrepreneur UK editorial feature",
  },
  {
    src: "/authority-montage/processed/bbc-travel.webp",
    alt: "BBC Travel editorial feature",
  },
  {
    src: "/authority-montage/processed/fodors-travel.webp",
    alt: "Fodor's Travel editorial feature",
  },
  {
    src: "/authority-montage/processed/eat-this-not-that.webp",
    alt: "Eat This Not That editorial feature",
  },
] as const;

function createChartGeometry(values: number[]) {
  const chartWidth = 660;
  const chartHeight = 300;
  const padding = { top: 24, right: 20, bottom: 36, left: 20 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const baselineY = padding.top + plotHeight;
  const max = Math.max(...values) * 1.08;

  const points = values.map((value, index) => ({
    x: padding.left + (index / (values.length - 1)) * plotWidth,
    y: padding.top + (1 - value / max) * plotHeight,
  }));

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${baselineY} L ${points[0].x} ${baselineY} Z`;

  return { chartWidth, chartHeight, points, linePath, areaPath, baselineY };
}

const momentumSeries = [18, 22, 26, 32, 40, 51, 60, 71, 82, 91];
const momentumLabels = ["Launch", "Month 2", "Month 4", "Month 6", "Month 9", "Month 12"] as const;
const momentumTickIndices = [0, 2, 4, 6, 8, 9] as const;
const momentumChart = createChartGeometry(momentumSeries);

const pageContainerClass = "mx-auto w-full max-w-[1200px] px-6";
const heroContainerClass = "mx-auto w-full max-w-[1280px] px-6";
const heroVideoSrc = "/homepage/HERO/hero1.mp4";

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

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-[#e8e3f3] bg-white p-8 shadow-[0_28px_60px_rgba(24,31,62,0.08)] sm:p-10 lg:p-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(149,122,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(87,157,255,0.08),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(123,99,255,0.18),transparent)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        dark
          ? "border border-white/18 bg-white/10 text-white/88"
          : "border border-[#dedaf0] bg-white text-[#60539d] shadow-[0_12px_28px_rgba(89,84,165,0.08)]",
      )}
    >
      <Sparkles className={cn("h-3.5 w-3.5", dark ? "text-white/90" : "text-[#6f5dff]")} />
      {children}
    </span>
  );
}

function PrimaryExternalButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-12 rounded-full bg-[linear-gradient(135deg,#6f5dff_0%,#5a4dbf_52%,#4d92ff_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(103,89,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(111,93,255,0.12),0_24px_46px_rgba(103,89,255,0.34)] sm:h-14 sm:px-7 sm:text-base"
    >
      <a href={href} target="_blank" rel="noreferrer">
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </Button>
  );
}

function SecondaryButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-12 rounded-full border border-[#d8d3eb] bg-white px-6 text-sm font-semibold text-[#252846] shadow-[0_16px_34px_rgba(24,31,62,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7f4ff] hover:shadow-[0_0_0_5px_rgba(111,93,255,0.08),0_18px_38px_rgba(24,31,62,0.08)] sm:h-14 sm:px-7 sm:text-base"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

function BuiltForSketch({ title }: { title: string }) {
  if (title === "Brands") {
    return (
      <svg viewBox="0 0 90 56" aria-hidden="true" className="h-10 w-16">
        <path d="M10 22 H80 L74 14 H16 Z" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 22 V44 H72 V22" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M34 44 V30 H56 V44" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M8 12 C20 8, 34 9, 46 12 C58 15, 72 16, 82 12" fill="none" stroke="#8ca8d8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Founders") {
    return (
      <svg viewBox="0 0 90 56" aria-hidden="true" className="h-10 w-16">
        <circle cx="45" cy="18" r="8" fill="none" stroke="#5f729c" strokeWidth="2.2" />
        <path d="M27 44 C30 32, 38 28, 45 28 C52 28, 60 32, 63 44" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M23 15 L18 12 M67 15 L72 12 M45 8 V4" fill="none" stroke="#8ca8d8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 90 56" aria-hidden="true" className="h-10 w-16">
      <path d="M14 18 H58 C63 18,66 21,66 26 V34 C66 39,63 42,58 42 H42 L34 48 V42 H14 C9 42,6 39,6 34 V26 C6 21,9 18,14 18 Z" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M45 15 L47 19 L51 19 L48 22 L49 26 L45 24 L41 26 L42 22 L39 19 L43 19 Z" fill="none" stroke="#8ca8d8" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 27 H48 M20 33 H40" fill="none" stroke="#5f729c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AuthorityPrDeckPage() {
  return (
    <>
      <ChatWidget />
      <main className="bg-[#f3f2f7] text-[#171929]">
        <div className="relative">
          <SiteHeader theme="light" />

          <SectionWrap containerClass={heroContainerClass} className="pt-5">
            <Panel className="overflow-hidden bg-[radial-gradient(circle_at_14%_0%,rgba(144,122,255,0.18),transparent_26%),radial-gradient(circle_at_88%_10%,rgba(79,155,255,0.12),transparent_24%),linear-gradient(180deg,#ffffff_0%,#fbfbff_100%)] lg:p-14">
              <div className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(117,110,174,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(117,110,174,0.12)_1px,transparent_1px)] [background-size:54px_54px]" />

              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
                <div>
                  <Eyebrow>A Linkifi Service</Eyebrow>
                  <h1 className="mt-6 text-balance text-5xl font-display font-bold tracking-[-0.055em] text-[#171929] sm:text-6xl md:text-7xl">
                    Authority PR
                  </h1>
                  <p className="mt-5 max-w-2xl text-balance text-xl leading-relaxed text-[#4e526d] sm:text-2xl">
                    Become the go-to expert and go-to brand in your market.
                  </p>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5b5f79]">
                    Traditional PR for brands, founders, and spokespeople who want to dominate mindshare, strengthen trust, and build category authority through earned media.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryExternalButton
                      href="https://book.linkifi.io/widget/bookings/pr-discovery-call"
                      label="Book Discovery Call"
                    />
                    <SecondaryButton href="#flow" label="See The Authority Flow" />
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-[600px]">
                  <div className="pointer-events-none absolute right-4 top-3 z-20 sm:right-8 sm:top-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#ff9de1] bg-[linear-gradient(135deg,#fff0fb_0%,#ffe2f5_100%)] px-2 py-1.5 text-[12px] font-semibold tracking-[0.02em] text-[#c71585] shadow-[0_14px_28px_rgba(199,52,146,0.28)] sm:text-[13px]">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff49bf_0%,#ff8ad9_100%)] text-white shadow-[0_0_0_3px_rgba(255,73,191,0.2),0_10px_20px_rgba(199,52,146,0.35)] motion-safe:animate-[pulse_4.8s_ease-in-out_infinite]">
                        <Tv className="h-3.5 w-3.5" />
                      </span>
                      Our Client on TV
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(111,93,255,0.2)_0%,rgba(111,93,255,0)_66%)]" />
                  <div className="relative rounded-[32px] border border-[#ece7ff] bg-[linear-gradient(155deg,#f7f4ff_0%,#ffffff_42%,#eef7ff_100%)] p-4 shadow-[0_38px_80px_rgba(16,24,58,0.28)] sm:p-5">
                    <div className="pointer-events-none absolute inset-x-12 top-2 h-1 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)]" />
                    <div className="rounded-[26px] border border-[#1f2d6c] bg-[linear-gradient(170deg,#24377d_0%,#141c44_52%,#0c1129_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(255,255,255,0.08),0_14px_34px_rgba(8,12,34,0.5)] sm:p-4">
                      <div className="mb-2 flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#ff5f6e]" />
                          <span className="h-2 w-2 rounded-full bg-[#ffc149]" />
                          <span className="h-2 w-2 rounded-full bg-[#57d769]" />
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#6ddcff66] bg-[#0d1f4f] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#89e9ff]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#54f2ff] shadow-[0_0_10px_rgba(84,242,255,0.9)] motion-safe:animate-[pulse_3.8s_ease-in-out_infinite]" />
                          Live
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-[#77d7ff66] bg-[#03061a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_0_1px_rgba(115,219,255,0.2)]">
                        <video
                          className="h-full w-full object-cover saturate-[1.14] contrast-[1.1] brightness-[1.03]"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          disablePictureInPicture
                          aria-label="Authority PR hero video"
                        >
                          <source src={heroVideoSrc} type="video/mp4" />
                        </video>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_2%,rgba(255,101,197,0.22),transparent_36%),radial-gradient(circle_at_92%_100%,rgba(63,222,255,0.24),transparent_32%)] mix-blend-screen" />
                        <div className="pointer-events-none absolute inset-x-6 top-2 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.62),transparent)]" />
                      </div>
                      <div className="mt-3 flex items-center justify-between px-1">
                        <div className="h-1.5 w-20 rounded-full bg-[repeating-linear-gradient(90deg,rgba(156,210,255,0.9)_0_4px,rgba(81,110,174,0.2)_4px_7px)] opacity-80" />
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#3fd7ff] shadow-[0_0_10px_rgba(63,215,255,0.85)]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#8f6bff] shadow-[0_0_10px_rgba(143,107,255,0.85)]" />
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto mt-3 h-2 w-12 rounded-full bg-[linear-gradient(180deg,#d2d8ee_0%,#bac3de_100%)] shadow-[0_6px_12px_rgba(40,48,88,0.22)]" />
                    <div className="mx-auto mt-2 h-3 w-36 rounded-full bg-[linear-gradient(180deg,#e9edf9_0%,#c8d1ea_100%)] shadow-[0_10px_18px_rgba(26,36,78,0.24)]" />
                  </div>
                </div>
              </div>

              <div className="relative z-10 mx-auto mt-6 w-full max-w-[820px] overflow-hidden border border-[#d8ddec] bg-[linear-gradient(145deg,#f8faff_0%,#edf2fb_100%)] p-3 shadow-[0_16px_32px_rgba(34,45,80,0.11)] [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_16px,100%_calc(100%-16px),calc(100%-16px)_100%,16px_100%,0_calc(100%-16px),0_16px)] sm:p-4">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(170,193,236,0.22),transparent_34%),radial-gradient(circle_at_88%_84%,rgba(168,185,219,0.18),transparent_36%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(111,128,172,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(111,128,172,0.13)_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="relative">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5d6b95]">Built for</p>
                  <div className="mt-2.5 grid gap-2.5 md:grid-cols-3">
                    {builtFor.map((item) => (
                      <div
                        key={item.title}
                        className="relative border border-[#d7deef] bg-[linear-gradient(155deg,#ffffff_0%,#f4f7ff_100%)] p-3.5 shadow-[0_10px_20px_rgba(35,46,84,0.08)] transition-transform duration-300 hover:-translate-y-0.5 [clip-path:polygon(12px_0,calc(100%-12px)_0,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0_calc(100%-12px),0_12px)]"
                      >
                        <div className="pointer-events-none absolute right-2 top-2 h-[2px] w-10 bg-[linear-gradient(90deg,transparent,#8ca8d8)]" />
                        <span className="inline-flex items-center justify-center border border-[#dde4f2] bg-[linear-gradient(135deg,#fdfdff_0%,#eef4ff_100%)] px-2 py-1 shadow-[0_7px_14px_rgba(64,74,122,0.1)] [clip-path:polygon(8px_0,calc(100%-8px)_0,100%_8px,100%_calc(100%-8px),calc(100%-8px)_100%,8px_100%,0_calc(100%-8px),0_8px)]">
                          <BuiltForSketch title={item.title} />
                        </span>
                        <h3 className="mt-2.5 font-mono text-[17px] font-semibold uppercase tracking-[0.08em] text-[#243152]">{item.title}</h3>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#5f6787]">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <section className="relative py-14">
            <div className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#141d52] bg-[linear-gradient(130deg,#13194c_0%,#25348b_48%,#33439a_100%)] py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(173,146,255,0.22),transparent_70%)]" />
              <div className={`relative z-10 ${heroContainerClass}`}>
                <div className="mx-auto max-w-4xl text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f4f1ff] [text-shadow:0_1px_0_rgba(8,10,28,0.35)]">
                    Trusted by journalists at
                  </p>
                  <h3 className="mt-3 text-balance font-display text-[2rem] font-bold tracking-[-0.04em] text-white sm:text-[2.4rem]">
                    The places that shape perception, trust, and reputation
                  </h3>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-4">
                  {trustLogos.map((logo) => (
                    <div key={logo.alt} className="group relative flex h-[78px] items-center justify-center overflow-hidden rounded-[16px] border border-white/24 bg-[linear-gradient(140deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-4 backdrop-blur-sm transition-all duration-300 hover:border-[#d5c8ff] hover:shadow-[0_0_0_1px_rgba(199,188,255,0.5),0_16px_30px_rgba(56,63,168,0.28)]">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className={cn("relative z-10 object-contain transition-opacity duration-300 group-hover:opacity-100", logo.className, logo.filterClass)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <SectionWrap>
            <Panel>
              <div className="max-w-4xl">
                <Eyebrow>Main Promise</Eyebrow>
                <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                  Authority PR helps clients become more visible, more trusted, and more recognized
                </h2>
              </div>
              <div className="mt-9 grid gap-6 md:grid-cols-3">
                {promisePillars.map((item) => (
                  <div key={item.title} className="rounded-[18px] border border-[#e8e5f3] bg-white p-7 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)]">
                      <item.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-[20px] font-display font-semibold tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
              <Eyebrow>What It Helps You Do</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                Show up like a leader and dominate more of the conversation in your space
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {authorityOutcomes.map((item) => (
                  <div key={item.title} className="rounded-[18px] border border-[#e8e5f3] bg-white p-7 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)]">
                      <item.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[18px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap id="flow" className="scroll-mt-8 md:scroll-mt-10">
            <Panel>
              <Eyebrow>How It Stacks Up</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                A scrollable authority flow from positioning to compounding recognition
              </h2>
              <p className="mt-4 max-w-3xl text-[18px] leading-[1.6] text-[#5a5d79]">
                On mobile, scroll horizontally to follow the full stack. On desktop, the full flow is visible in one sequence.
              </p>

              <div className="mt-10 overflow-x-auto pb-4">
                <div className="flex min-w-max snap-x snap-mandatory gap-4 md:grid md:min-w-0 md:grid-cols-5 md:gap-4">
                  {authorityFlow.map((item, index) => (
                    <div key={item.title} className="relative w-[250px] snap-center md:w-auto">
                      <div className="h-full rounded-[18px] border border-[#e8e5f3] bg-white p-5 shadow-[0_14px_30px_rgba(24,31,62,0.08)]">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5dff]">Step {index + 1}</span>
                        <span className="mt-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff]">
                          <item.Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 text-[16px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                        <p className="mt-3 text-[14px] leading-[1.6] text-[#61657f]">{item.description}</p>
                      </div>
                      {index < authorityFlow.length - 1 ? (
                        <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 md:block">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#ddd7f0] bg-white text-[#6f5dff] shadow-[0_8px_18px_rgba(24,31,62,0.08)]">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel className="bg-[linear-gradient(180deg,#fbfbff_0%,#f3f4fb_100%)]">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <Eyebrow>Authority Momentum</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                    How sustained authority work compounds over time
                  </h2>
                  <p className="mt-4 text-[18px] leading-[1.6] text-[#5a5d79]">
                    This is a model of the growth curve we are building toward: stronger recognition, stronger trust, and stronger category positioning.
                  </p>

                  <div className="mt-7 rounded-[20px] border border-[#e3e6f2] bg-white p-4 shadow-[0_16px_34px_rgba(24,31,62,0.08)] sm:p-5">
                    <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#ebedf5] pb-3">
                      <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Authority index</div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#dde2ef] bg-[#f8f9ff] px-3 py-1 text-[12px] font-medium text-[#4d5474]">
                        <BarChart3 className="h-3.5 w-3.5 text-[#6f5dff]" />
                        Direction of travel
                      </span>
                    </div>
                    <svg viewBox={`0 0 ${momentumChart.chartWidth} ${momentumChart.chartHeight}`} className="h-[17rem] w-full sm:h-[18rem]">
                      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
                        const y = 24 + (momentumChart.baselineY - 24) * fraction;
                        return (
                          <line
                            key={fraction}
                            x1="20"
                            x2={momentumChart.chartWidth - 20}
                            y1={y}
                            y2={y}
                            stroke="#e8ebf4"
                            strokeDasharray="4 6"
                          />
                        );
                      })}

                      <path d={momentumChart.areaPath} fill="url(#authorityArea)" opacity="0.9" />
                      <path d={momentumChart.linePath} fill="none" stroke="#5b49d1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                      {momentumChart.points.map((point, index) => (
                        <circle key={index} cx={point.x} cy={point.y} r="4.2" fill="#5b49d1" />
                      ))}

                      {momentumTickIndices.map((tickIndex, idx) => (
                        <text
                          key={tickIndex}
                          x={momentumChart.points[tickIndex].x}
                          y={momentumChart.baselineY + 22}
                          textAnchor="middle"
                          fill="#8a90a8"
                          fontSize="11"
                          fontWeight="500"
                        >
                          {momentumLabels[idx]}
                        </text>
                      ))}

                      <defs>
                        <linearGradient id="authorityArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6f5dff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#6f5dff" stopOpacity="0.03" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[18px] border border-[#e8e5f3] bg-white p-5 shadow-[0_12px_26px_rgba(24,31,62,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">What moves the graph</p>
                    <ul className="mt-4 space-y-3">
                      {[
                        "Consistent earned placements",
                        "Founder and expert visibility",
                        "Third-party trust reinforcement",
                        "Narrative consistency in high-trust channels",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#58607f]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5dff]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[18px] border border-[#e4ddf8] bg-[linear-gradient(140deg,#f8f5ff_0%,#eef2ff_100%)] p-5 shadow-[0_12px_26px_rgba(24,31,62,0.06)]">
                    <p className="text-[15px] leading-[1.6] text-[#3f4563]">
                      We help clients become the go-to name in their space by getting them seen, heard, and quoted in the right places.
                    </p>
                  </div>
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel>
              <Eyebrow>How We Build Authority</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                Earned visibility in the places that matter
              </h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {placements.map((item) => (
                  <div key={item.title} className="rounded-[16px] border border-[#e8e5f3] bg-white p-5 shadow-[0_12px_26px_rgba(24,31,62,0.06)]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff]">
                      <item.Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-[16px] font-display font-semibold leading-[1.35] text-[#171929]">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[#61657f]">{item.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap id="included" className="scroll-mt-8 md:scroll-mt-10">
            <Panel className="bg-[linear-gradient(180deg,#ffffff_0%,#f7f4ff_100%)]">
              <Eyebrow>What Is Included</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                A stronger engagement structure, not just a single pricing card
              </h2>

              <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-6">
                  <div className="rounded-[20px] border border-[#d8cef8] bg-[linear-gradient(145deg,#1a1655_0%,#473aaa_58%,#5d6fff_100%)] p-6 text-white shadow-[0_22px_52px_rgba(77,65,183,0.3)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">Engagement model</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[14px] border border-white/18 bg-white/10 px-4 py-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Fee</p>
                        <p className="mt-2 text-[1.9rem] font-display font-bold tracking-[-0.04em]">$5,000</p>
                        <p className="mt-1 text-[13px] text-white/72">per month</p>
                      </div>
                      <div className="rounded-[14px] border border-white/18 bg-white/10 px-4 py-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Target output</p>
                        <p className="mt-2 text-[1.9rem] font-display font-bold tracking-[-0.04em]">~3-4</p>
                        <p className="mt-1 text-[13px] text-white/72">pieces per month</p>
                      </div>
                    </div>
                    <p className="mt-5 rounded-[12px] border border-white/16 bg-white/10 px-3 py-2 text-[13px] leading-[1.55] text-white/82">
                      Coverage is a target, not a guarantee, because PR outcomes depend on editorial discretion and third-party acceptance.
                    </p>
                  </div>

                  <div className="rounded-[20px] border border-[#e8e5f3] bg-white p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Monthly operating cadence</p>
                    <div className="mt-4 space-y-3">
                      {cadence.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-[12px] border border-[#ece8f6] bg-[#faf9ff] px-3 py-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#6f5dff]" />
                          <p className="text-[14px] leading-[1.55] text-[#58607f]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-[#e8e5f3] bg-white p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">Coverage may include a mix of</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {coverageMix.map((item) => (
                      <div key={item.title} className="rounded-[14px] border border-[#ece8f6] bg-[#faf9ff] px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#efebff] text-[#6f5dff]">
                            <item.Icon className="h-4 w-4" />
                          </span>
                          <span className="text-[14px] font-semibold text-[#2f3450]">{item.title}</span>
                        </div>
                        <p className="mt-2 text-[13px] leading-[1.55] text-[#626780]">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-[14px] leading-[1.7] text-[#646882]">
                    SEO and AI visibility gains can happen downstream, but the primary objective is authority and brand credibility.
                  </p>
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel>
              <Eyebrow>Who It Is For</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                Built for brands that want real market authority
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-[#5a5d79]">
                The brands that win are not the loudest. They are the ones people already trust.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {audienceCards.map((item) => (
                  <div key={item.title} className="rounded-[18px] border border-[#e8e5f3] bg-white p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                    <h3 className="text-[20px] font-display font-semibold leading-[1.2] tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel>
              <Eyebrow>Proof</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                Real authority coverage in market-facing publications
              </h2>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {proofImages.map((item) => (
                  <div key={item.src} className="overflow-hidden rounded-[20px] border border-[#e8edf8] bg-white p-1.5 shadow-[0_12px_24px_rgba(28,39,79,0.1)]">
                    <div className="overflow-hidden rounded-[14px] border border-[#e8edf8] bg-[#edf2fb]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={1244}
                        height={1500}
                        className="h-[13.75rem] w-full object-cover object-top sm:h-[15rem] lg:h-[16rem]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap className="pb-12">
            <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(130deg,#090d22_0%,#111a44_50%,#17275e_100%)] p-10 text-white shadow-[0_34px_88px_rgba(8,11,29,0.32)] sm:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(115,93,255,0.24),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(87,157,255,0.14),transparent_26%)]" />
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <Eyebrow dark>Next Step</Eyebrow>
                <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-white sm:text-[2.25rem] md:text-[2.5rem]">
                  Let&apos;s build your authority
                </h2>
                <p className="mt-4 text-[18px] leading-[1.6] text-white/72">
                  If you want to become the go-to expert in your industry, let&apos;s talk about fit, positioning, and opportunities.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <PrimaryExternalButton
                    href="https://book.linkifi.io/widget/bookings/pr-discovery-call"
                    label="Book Discovery Call"
                  />
                  <SecondaryButton href="/contact-us" label="Talk to the Team" />
                </div>
              </div>
            </div>
          </SectionWrap>
        </div>
      </main>
      <SiteFooter flushTop />
    </>
  );
}
