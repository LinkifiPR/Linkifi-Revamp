"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/site/ChatWidget";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { cn } from "@/lib/utils";

type Tone = "ink" | "amber" | "sea" | "rose" | "plum";
type Shape = "circle" | "diamond" | "pill";

type StoryCard = {
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
  className?: string;
  dark?: boolean;
};

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
};

type PlacementCard = {
  title: string;
  description: string;
  Icon: LucideIcon;
  tone: Tone;
  shape: Shape;
};

const pageContainerClass = "mx-auto w-full max-w-[1220px] px-6";
const heroContainerClass = "mx-auto w-full max-w-[1300px] px-6";

const revealProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
} as const;

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

const builtFor = [
  { label: "Brands", tone: "amber" as const },
  { label: "Founders", tone: "sea" as const },
  { label: "Experts", tone: "rose" as const },
] as const;

const promisePillars = [
  {
    title: "More visible",
    description: "Show up in the places that shape perception, trust, and reputation.",
    Icon: Eye,
    tone: "amber" as const,
    shape: "pill" as const,
  },
  {
    title: "More trusted",
    description: "Build the kind of third-party validation that makes people trust you faster.",
    Icon: ShieldCheck,
    tone: "sea" as const,
    shape: "diamond" as const,
  },
  {
    title: "More recognized",
    description: "Become the brand people recognize and the expert people quote.",
    Icon: Crown,
    tone: "ink" as const,
    shape: "circle" as const,
  },
] as const;

const outcomeCards: StoryCard[] = [
  {
    title: "Become the go-to expert in your industry",
    description: "Build the kind of visibility that makes your name the default reference point in your market.",
    Icon: BadgeCheck,
    tone: "amber",
    shape: "diamond",
    className: "md:col-span-3 bg-[#fff8ee]",
  },
  {
    title: "Own more category mindshare",
    description: "This is not about getting mentions. It is about dominating more of the conversation in your space.",
    Icon: Crown,
    tone: "sea",
    shape: "pill",
    className: "md:col-span-3 bg-[#0f1738]",
    dark: true,
  },
  {
    title: "Build trust with customers, partners, and media",
    description: "Earned media helps people see you as credible, established, and worth paying attention to.",
    Icon: Users,
    tone: "sea",
    shape: "circle",
    className: "md:col-span-2 bg-[#e8f6f1]",
  },
  {
    title: "Raise the profile of founders and spokespeople",
    description: "Position the right voice as a recognized industry presence in the channels that matter.",
    Icon: UserRound,
    tone: "rose",
    shape: "diamond",
    className: "md:col-span-2 bg-[#fff0ec]",
  },
  {
    title: "Stand out through credible media presence",
    description: "Become the company people trust, not just another logo in the category.",
    Icon: CheckCircle2,
    tone: "plum",
    shape: "pill",
    className: "md:col-span-2 bg-[#f4efff]",
  },
];

const processSteps: ProcessStep[] = [
  {
    step: "Step 1",
    title: "Authority positioning",
    description: "We sharpen the angle, narrative, and expertise story that the market should associate with your name.",
    Icon: Target,
    tone: "amber",
    shape: "diamond",
  },
  {
    step: "Step 2",
    title: "Proactive pitching",
    description: "We pitch interviews, features, bylines, and opinion-led stories to the outlets that shape how your category thinks.",
    Icon: Newspaper,
    tone: "ink",
    shape: "circle",
  },
  {
    step: "Step 3",
    title: "Reactive opportunity capture",
    description: "We move on journalist requests, expert commentary, and timely moments when your voice should be in the conversation.",
    Icon: MessageCircle,
    tone: "sea",
    shape: "pill",
  },
  {
    step: "Step 4",
    title: "Third-party validation",
    description: "Coverage lands across publications, interviews, podcasts, and quoted expert placements that compound trust.",
    Icon: Quote,
    tone: "rose",
    shape: "diamond",
  },
  {
    step: "Step 5",
    title: "Compounding authority",
    description: "Visibility becomes recognition, recognition becomes trust, and trust becomes category authority.",
    Icon: Crown,
    tone: "amber",
    shape: "circle",
  },
] as const;

const placementCards: PlacementCard[] = [
  {
    title: "Reputable publications",
    description: "Earned visibility in the outlets people already trust.",
    Icon: Newspaper,
    tone: "ink",
    shape: "circle",
  },
  {
    title: "Industry and news interviews",
    description: "Voice-led exposure that raises the profile of the client and the spokesperson.",
    Icon: MessageCircle,
    tone: "amber",
    shape: "pill",
  },
  {
    title: "Podcast appearances",
    description: "Longer-form placements that deepen credibility and narrative control.",
    Icon: Mic2,
    tone: "sea",
    shape: "diamond",
  },
  {
    title: "Expert commentary opportunities",
    description: "The right quote in the right story can shift perception quickly.",
    Icon: Megaphone,
    tone: "rose",
    shape: "circle",
  },
  {
    title: "Quoted expert placements",
    description: "Fast, credible authority reinforcement inside relevant industry coverage.",
    Icon: Quote,
    tone: "plum",
    shape: "diamond",
  },
  {
    title: "Bylines and contributed articles",
    description: "Thought leadership that puts your expertise in front of the right audience.",
    Icon: PenSquare,
    tone: "amber",
    shape: "pill",
  },
  {
    title: "Opinion pieces and op-eds",
    description: "Clear perspective-building around the themes your market cares about.",
    Icon: PenSquare,
    tone: "sea",
    shape: "circle",
  },
  {
    title: "Timely media opportunities",
    description: "Visibility tied to live conversations when your voice should be present.",
    Icon: Sparkles,
    tone: "rose",
    shape: "pill",
  },
] as const;

const coverageMix = [
  "Publication features",
  "Interviews",
  "Podcast placements",
  "Expert commentary",
  "Quoted expert opportunities",
  "Bylines",
  "Op-eds",
  "Other authority-building coverage",
] as const;

const monthCadence = [
  { label: "Angles", description: "story development and positioning", tone: "amber" as const },
  { label: "Pitch", description: "outreach to priority targets", tone: "ink" as const },
  { label: "Respond", description: "requests and commentary openings", tone: "sea" as const },
  { label: "Compound", description: "placement follow-through and next wave", tone: "rose" as const },
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

const audienceCards = [
  {
    title: "Founders",
    description: "Who want to raise their personal profile and be seen as recognized leaders.",
  },
  {
    title: "Brands",
    description: "That want to become the go-to name in their market and category.",
  },
  {
    title: "Experts",
    description: "Who want to be quoted, trusted, and remembered in the spaces that matter.",
  },
  {
    title: "Companies",
    description: "That want more than mentions and need real authority growth.",
  },
] as const;

function SectionWrap({
  children,
  className,
  containerClass = pageContainerClass,
  id,
}: {
  children: ReactNode;
  className?: string;
  containerClass?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-4 md:py-5", className)}>
      <div className={containerClass}>{children}</div>
    </section>
  );
}

function Eyebrow({ children, inverted = false }: { children: ReactNode; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]",
        inverted
          ? "border border-white/16 bg-white/10 text-white/88"
          : "border border-[#d8cfbf] bg-white/80 text-[#6d5a32] shadow-[0_12px_26px_rgba(52,42,22,0.08)]",
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
      className="h-12 rounded-full bg-[linear-gradient(135deg,#0d1837_0%,#22376f_56%,#2f7c8a_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(16,24,56,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(22,41,94,0.1),0_24px_46px_rgba(16,24,56,0.34)] sm:h-14 sm:px-7 sm:text-base"
    >
      <a href={href} target="_blank" rel="noreferrer">
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
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
          ? "border border-white/16 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/14"
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
  const toneClassMap = {
    ink: "bg-[linear-gradient(135deg,#10193a_0%,#27447e_100%)] text-white shadow-[0_16px_30px_rgba(16,25,58,0.22)]",
    amber: "bg-[linear-gradient(135deg,#f1be74_0%,#d37b34_100%)] text-[#24140a] shadow-[0_16px_30px_rgba(196,118,46,0.24)]",
    sea: "bg-[linear-gradient(135deg,#b8f0df_0%,#2b8f81_100%)] text-[#08211d] shadow-[0_16px_30px_rgba(43,143,129,0.2)]",
    rose: "bg-[linear-gradient(135deg,#ffd9cf_0%,#b85e4a_100%)] text-[#2f0f08] shadow-[0_16px_30px_rgba(184,94,74,0.2)]",
    plum: "bg-[linear-gradient(135deg,#efe0ff_0%,#7253b8_100%)] text-[#1f1435] shadow-[0_16px_30px_rgba(114,83,184,0.18)]",
  } as const;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        shape === "circle" && "h-14 w-14 rounded-full",
        shape === "diamond" && "h-14 w-14 rotate-45 rounded-[18px]",
        shape === "pill" && "h-12 w-[4.1rem] rounded-[18px]",
        toneClassMap[tone],
        className,
      )}
    >
      <Icon className={cn("h-5 w-5", shape === "diamond" && "-rotate-45")} />
    </div>
  );
}

function StoryCardBlock({ item }: { item: StoryCard }) {
  return (
    <motion.div {...revealProps} className={cn("rounded-[24px] border p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]", item.className, item.dark ? "border-[#23325b]" : "border-[#e3d8c6]")}>
      <IconShell Icon={item.Icon} tone={item.tone} shape={item.shape} />
      <h3 className={cn("mt-5 text-[1.35rem] font-display font-bold leading-[1.1] tracking-[-0.03em]", item.dark ? "text-white" : "text-[#111729]")}>
        {item.title}
      </h3>
      <p className={cn("mt-3 text-[15px] leading-[1.7]", item.dark ? "text-white/72" : "text-[#5e6476]")}>{item.description}</p>
    </motion.div>
  );
}

function PlacementBlock({ item, index }: { item: PlacementCard; index: number }) {
  const backgroundClass = [
    "bg-white/8 border-white/12",
    "bg-[#153a3d]/42 border-[#3e7a74]/40",
    "bg-[#4f2d20]/38 border-[#8b5a45]/45",
    "bg-[#2b2452]/42 border-[#62529f]/42",
  ][index % 4];

  return (
    <motion.div
      {...revealProps}
      transition={{ ...revealProps.transition, delay: index * 0.05 }}
      className={cn("rounded-[20px] border p-5 backdrop-blur-sm", backgroundClass)}
    >
      <IconShell Icon={item.Icon} tone={item.tone} shape={item.shape} className="scale-90" />
      <h3 className="mt-4 text-[18px] font-display font-semibold leading-[1.25] tracking-[-0.02em] text-white">{item.title}</h3>
      <p className="mt-3 text-[14px] leading-[1.65] text-white/70">{item.description}</p>
    </motion.div>
  );
}

function FloatingAudienceChip({
  label,
  tone,
  className,
}: {
  label: string;
  tone: Tone;
  className?: string;
}) {
  const chipClass = {
    amber: "bg-[#fff1da] text-[#7a4a17] border-[#efcb97]",
    sea: "bg-[#dff4ee] text-[#0d5d54] border-[#8bcabd]",
    rose: "bg-[#ffe6df] text-[#92422f] border-[#e2a28f]",
    ink: "bg-[#ebf0ff] text-[#213663] border-[#b6c3ea]",
    plum: "bg-[#efe7ff] text-[#5a4095] border-[#ccbdf2]",
  } as const;

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      className={cn("rounded-full border px-4 py-2 text-sm font-semibold shadow-[0_14px_26px_rgba(22,30,60,0.1)]", chipClass[tone], className)}
    >
      {label}
    </motion.div>
  );
}

function ScrollingLogos() {
  const loop = [...trustLogos, ...trustLogos];

  return (
    <div className="mt-10 overflow-hidden">
      <div className="flex w-max gap-4 animate-scroll-left pr-4">
        {loop.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex h-[86px] min-w-[170px] items-center justify-center rounded-[18px] border border-white/16 bg-white/8 px-5 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-w-[220px]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={cn("object-contain", logo.className, logo.filterClass)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AuthorityPrDeckPage() {
  return (
    <>
      <ChatWidget />
      <main className="overflow-x-hidden bg-[#f4efe7] text-[#171929]">
        <div className="relative">
          <SiteHeader theme="light" />

          <SectionWrap containerClass={heroContainerClass} className="pt-5">
            <div className="relative overflow-hidden rounded-[34px] border border-[#dfd4c2] bg-[linear-gradient(135deg,#fbf6ee_0%,#eef4ff_48%,#fff0da_100%)] px-8 py-10 shadow-[0_30px_70px_rgba(44,38,26,0.12)] sm:px-10 lg:px-14 lg:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(212,136,61,0.12),transparent_25%),radial-gradient(circle_at_86%_16%,rgba(33,95,120,0.12),transparent_24%),radial-gradient(circle_at_60%_80%,rgba(114,83,184,0.08),transparent_28%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(21,28,48,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(21,28,48,0.14)_1px,transparent_1px)] [background-size:54px_54px]" />

              <div className="relative z-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <motion.div {...revealProps}>
                  <Eyebrow>Traditional PR, built for authority</Eyebrow>
                  <h1 className="mt-6 max-w-3xl text-balance text-5xl font-display font-bold leading-[0.95] tracking-[-0.055em] text-[#101729] sm:text-6xl md:text-7xl">
                    Authority PR
                  </h1>
                  <p className="mt-5 max-w-2xl text-balance text-[1.3rem] leading-[1.45] text-[#30384f] sm:text-[1.6rem]">
                    Become the go-to expert and the go-to brand in your market.
                  </p>
                  <p className="mt-6 max-w-2xl text-[17px] leading-[1.75] text-[#58607a]">
                    We use earned media to help clients dominate mindshare, strengthen trust, and become the name people already see as credible, established, and worth paying attention to.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryButton href="https://book.linkifi.io/widget/bookings/pr-discovery-call" label="Book Discovery Call" />
                    <SecondaryButton href="#delivery-flow" label="See The Delivery Flow" />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {promisePillars.map((item) => (
                      <div
                        key={item.title}
                        className="inline-flex items-center gap-3 rounded-full border border-[#ddd2bf] bg-white/75 px-4 py-2.5 text-sm font-medium text-[#28324d] shadow-[0_12px_22px_rgba(44,38,26,0.08)] backdrop-blur"
                      >
                        <IconShell Icon={item.Icon} tone={item.tone} shape={item.shape} className="h-9 w-9 min-w-9 scale-[0.68] rounded-full" />
                        {item.title}
                      </div>
                    ))}
                  </div>

                  <p className="mt-8 max-w-xl text-[1.75rem] leading-none text-[#b6632a] font-handwritten rotate-[-2deg]">
                    This is not about getting mentions. It is about owning more authority.
                  </p>
                </motion.div>

                <motion.div
                  {...revealProps}
                  transition={{ ...revealProps.transition, delay: 0.08 }}
                  className="relative min-h-[34rem] sm:min-h-[38rem]"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-0 top-0 z-30 flex flex-col gap-3"
                  >
                    {builtFor.map((item, index) => (
                      <FloatingAudienceChip
                        key={item.label}
                        label={item.label}
                        tone={item.tone}
                        className={cn(index === 0 && "mr-10", index === 1 && "mr-2", index === 2 && "mr-14")}
                      />
                    ))}
                  </motion.div>

                  <motion.div
                    animate={{ rotate: [-2, 0, -2], y: [0, -6, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 top-0 z-20 w-[56%] overflow-hidden rounded-[28px] border border-[#d6ccbc] bg-white p-2 shadow-[0_28px_50px_rgba(44,38,26,0.16)]"
                  >
                    <div className="overflow-hidden rounded-[22px] border border-[#ece5d9]">
                      <Image
                        src={proofImages[0].src}
                        alt={proofImages[0].alt}
                        width={1244}
                        height={1500}
                        className="h-[18rem] w-full object-cover object-top sm:h-[20rem]"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: [3, 1, 3], y: [0, -10, 0] }}
                    transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    className="absolute bottom-[5.5rem] left-[8%] z-20 w-[34%] overflow-hidden rounded-[24px] border border-[#d6ccbc] bg-white p-2 shadow-[0_24px_44px_rgba(44,38,26,0.14)]"
                  >
                    <div className="overflow-hidden rounded-[18px] border border-[#ece5d9]">
                      <Image
                        src={proofImages[1].src}
                        alt={proofImages[1].alt}
                        width={1244}
                        height={1500}
                        className="h-[10rem] w-full object-cover object-top sm:h-[11rem]"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: [-1, 2, -1], y: [0, -7, 0] }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute right-[5%] top-[8rem] z-10 w-[36%] overflow-hidden rounded-[24px] border border-[#d6ccbc] bg-white p-2 shadow-[0_24px_44px_rgba(44,38,26,0.14)]"
                  >
                    <div className="overflow-hidden rounded-[18px] border border-[#ece5d9]">
                      <Image
                        src={proofImages[2].src}
                        alt={proofImages[2].alt}
                        width={1244}
                        height={1500}
                        className="h-[11rem] w-full object-cover object-top sm:h-[12rem]"
                      />
                    </div>
                  </motion.div>

                  <div className="absolute inset-x-0 bottom-0 z-0 rounded-[30px] bg-[linear-gradient(145deg,#0d1737_0%,#1f2e63_52%,#2d6662_100%)] p-7 text-white shadow-[0_28px_60px_rgba(17,24,50,0.26)] sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/64">Authority result</p>
                        <h2 className="mt-3 max-w-md text-[2rem] font-display font-bold leading-[1.02] tracking-[-0.05em] sm:text-[2.3rem]">
                          Own more mindshare in the places people already trust.
                        </h2>
                      </div>
                      <IconShell Icon={Crown} tone="amber" shape="diamond" />
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {[
                        "Seen in trusted media",
                        "Heard in relevant conversations",
                        "Remembered as the authority",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className={cn(
                            "rounded-[18px] border px-4 py-4 text-sm leading-[1.55]",
                            index === 0 && "border-white/12 bg-white/10",
                            index === 1 && "border-[#8dcfbb]/20 bg-[#1f6b63]/26",
                            index === 2 && "border-[#f0c082]/20 bg-[#915e28]/20",
                          )}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </SectionWrap>

          <section className="relative py-14">
            <div className="relative left-1/2 w-screen -translate-x-1/2 bg-[linear-gradient(120deg,#0d1431_0%,#162453_44%,#27456f_100%)] py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.08)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,196,107,0.16),transparent_24%),radial-gradient(circle_at_90%_18%,rgba(97,210,191,0.12),transparent_22%)]" />
              <div className={heroContainerClass}>
                <motion.div {...revealProps} className="relative z-10 mx-auto max-w-4xl text-center">
                  <Eyebrow inverted>Seen In The Right Places</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.1] tracking-[-0.045em] text-white sm:text-[2.5rem]">
                    The channels that shape perception, trust, and reputation
                  </h2>
                  <p className="mt-4 text-[17px] leading-[1.7] text-white/70">
                    Authority PR is about getting clients seen, heard, and quoted in the places that move market perception.
                  </p>
                  <ScrollingLogos />
                </motion.div>
              </div>
            </div>
          </section>

          <SectionWrap>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                {...revealProps}
                className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,#0f1738_0%,#1a2953_54%,#28435f_100%)] p-8 text-white shadow-[0_26px_58px_rgba(15,23,56,0.22)] sm:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,196,107,0.14),transparent_26%),radial-gradient(circle_at_78%_20%,rgba(97,210,191,0.12),transparent_24%)]" />
                <div className="relative z-10">
                  <Eyebrow inverted>Main Promise</Eyebrow>
                  <h2 className="mt-5 max-w-xl text-balance text-[2rem] font-display font-bold leading-[1.02] tracking-[-0.05em] sm:text-[2.35rem]">
                    We help clients become more visible, more trusted, and more recognized.
                  </h2>
                  <p className="mt-5 max-w-xl text-[17px] leading-[1.75] text-white/72">
                    Another way to say it: we help clients become the brand people recognize, the expert people quote, and the company people trust.
                  </p>
                  <div className="mt-8 rounded-[22px] border border-white/12 bg-white/8 px-5 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">Not the goal</p>
                    <p className="mt-2 text-[18px] leading-[1.55] text-white/76">Random mentions or vanity press.</p>
                    <div className="mt-5 h-px bg-white/10" />
                    <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">The real goal</p>
                    <p className="mt-2 text-[18px] leading-[1.55] text-white">Dominate mindshare and build category authority through earned media.</p>
                  </div>
                  <p className="mt-8 text-[1.75rem] leading-none text-[#ffd197] font-handwritten rotate-[-1deg]">
                    Visibility is the input. Trust is the outcome.
                  </p>
                </div>
              </motion.div>

              <motion.div
                {...revealProps}
                transition={{ ...revealProps.transition, delay: 0.08 }}
                className="rounded-[30px] border border-[#dfd4c2] bg-[#fffaf2] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10"
              >
                <Eyebrow>What This Builds</Eyebrow>
                <div className="mt-8 space-y-5">
                  {promisePillars.map((item, index) => (
                    <div
                      key={item.title}
                      className={cn(
                        "flex gap-4 rounded-[20px] border p-5",
                        index === 0 && "border-[#ecd9b7] bg-[#fff2dd]",
                        index === 1 && "border-[#cde4dd] bg-[#e8f6f1]",
                        index === 2 && "border-[#d7d0ea] bg-[#f1ecfb]",
                      )}
                    >
                      <IconShell Icon={item.Icon} tone={item.tone} shape={item.shape} />
                      <div>
                        <h3 className="text-[1.15rem] font-display font-bold tracking-[-0.02em] text-[#12192b]">{item.title}</h3>
                        <p className="mt-2 text-[15px] leading-[1.65] text-[#5e6476]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <motion.div {...revealProps} className="rounded-[30px] border border-[#dfd4c2] bg-[#fbf6ee] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10 lg:p-12">
              <Eyebrow>What It Helps You Do</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.08] tracking-[-0.05em] text-[#111729] sm:text-[2.35rem]">
                Show up like a leader, own more of the conversation, and stand out through credibility
              </h2>
              <div className="mt-10 grid gap-4 md:grid-cols-6">
                {outcomeCards.map((item) => (
                  <StoryCardBlock key={item.title} item={item} />
                ))}
              </div>
            </motion.div>
          </SectionWrap>

          <SectionWrap id="delivery-flow" className="scroll-mt-10 md:scroll-mt-12">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <motion.div {...revealProps} className="rounded-[30px] border border-[#dfd4c2] bg-[linear-gradient(145deg,#fef8ef_0%,#f5eee2_100%)] p-8 shadow-[0_22px_48px_rgba(44,38,26,0.08)] sm:p-10">
                  <Eyebrow>Scroll-Led Delivery</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.05] tracking-[-0.05em] text-[#111729] sm:text-[2.3rem]">
                    The authority flow from positioning to compounding recognition
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.75] text-[#5b6276]">
                    This is the rhythm behind the service. Each stage feeds the next so visibility becomes trust instead of isolated media wins.
                  </p>
                  <div className="mt-8 rounded-[22px] border border-[#ddd2bf] bg-white px-5 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#916326]">Simple explanation</p>
                    <p className="mt-3 text-[17px] leading-[1.7] text-[#28324d]">
                      We help clients become the go-to name in their space by getting them seen, heard, and quoted in the right places.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="relative pl-8 sm:pl-10">
                <div className="pointer-events-none absolute left-3 top-2 bottom-2 w-[2px] bg-[linear-gradient(180deg,#d5934a_0%,#375f84_35%,#2c8a7c_68%,#b86655_100%)] sm:left-5" />
                <div className="space-y-6">
                  {processSteps.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? 28 : -28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                      className={cn("relative", index % 2 === 1 && "lg:ml-12")}
                    >
                      <span className="absolute -left-[2.15rem] top-8 h-5 w-5 rounded-full border-[4px] border-[#f4efe7] bg-[#d5934a] sm:-left-[2.55rem]" />
                      <div
                        className={cn(
                          "rounded-[24px] border p-6 shadow-[0_20px_40px_rgba(24,31,62,0.08)]",
                          index === 0 && "border-[#ecd9b7] bg-[#fff2dd]",
                          index === 1 && "border-[#d4d9e8] bg-[#0f1738] text-white",
                          index === 2 && "border-[#cde4dd] bg-[#e8f6f1]",
                          index === 3 && "border-[#efcec5] bg-[#fff0ec]",
                          index === 4 && "border-[#d8d0ea] bg-[#f1ecfb]",
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className={cn("text-[11px] font-semibold uppercase tracking-[0.2em]", index === 1 ? "text-white/56" : "text-[#8b6233]")}>{item.step}</p>
                            <h3 className={cn("mt-3 text-[1.45rem] font-display font-bold leading-[1.08] tracking-[-0.03em]", index === 1 ? "text-white" : "text-[#111729]")}>
                              {item.title}
                            </h3>
                          </div>
                          <IconShell Icon={item.Icon} tone={item.tone} shape={item.shape} />
                        </div>
                        <p className={cn("mt-4 max-w-xl text-[15px] leading-[1.75]", index === 1 ? "text-white/72" : "text-[#5d6476]")}>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <motion.div
              {...revealProps}
              className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#0d1431_0%,#162453_42%,#27456f_72%,#37504e_100%)] p-8 text-white shadow-[0_30px_70px_rgba(13,20,49,0.26)] sm:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,196,107,0.14),transparent_22%),radial-gradient(circle_at_84%_22%,rgba(97,210,191,0.12),transparent_24%),radial-gradient(circle_at_58%_82%,rgba(255,153,119,0.1),transparent_26%)]" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                <div>
                  <Eyebrow inverted>Where Authority Gets Built</Eyebrow>
                  <h2 className="mt-5 max-w-lg text-balance text-[2rem] font-display font-bold leading-[1.05] tracking-[-0.05em] text-white sm:text-[2.35rem]">
                    Earned visibility in the channels that create trust and shape perception
                  </h2>
                  <p className="mt-5 max-w-lg text-[16px] leading-[1.75] text-white/72">
                    We build authority by securing earned visibility across reputable third-party channels including publications, podcasts, interviews, bylines, op-eds, and expert commentary.
                  </p>
                  <p className="mt-8 text-[1.7rem] leading-none text-[#ffd197] font-handwritten rotate-[-1deg]">
                    Authority grows where other people validate you.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {placementCards.map((item, index) => (
                    <PlacementBlock key={item.title} item={item} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </SectionWrap>

          <SectionWrap id="included" className="scroll-mt-10 md:scroll-mt-12">
            <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <motion.div
                  {...revealProps}
                  className="overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,#0f1738_0%,#1f2d62_60%,#285c5c_100%)] p-8 text-white shadow-[0_28px_60px_rgba(15,23,56,0.24)] sm:p-10"
                >
                  <Eyebrow inverted>The Engagement</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.04] tracking-[-0.05em] text-white sm:text-[2.25rem]">
                    Structured like a retained authority-building engine
                  </h2>
                  <div className="mt-8 grid gap-4">
                    <div className="rounded-[22px] border border-white/16 bg-white/10 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">Fee</p>
                      <div className="mt-2 text-[3rem] font-display font-bold leading-none tracking-[-0.06em]">$5,000</div>
                      <p className="mt-2 text-[14px] text-white/72">per month</p>
                    </div>
                    <div className="rounded-[22px] border border-white/16 bg-white/10 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58">Target output</p>
                      <div className="mt-2 text-[3rem] font-display font-bold leading-none tracking-[-0.06em]">3-4</div>
                      <p className="mt-2 text-[14px] text-white/72">pieces of coverage per month</p>
                    </div>
                  </div>
                  <div className="mt-8 rounded-[22px] border border-white/16 bg-white/8 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/56">Important note</p>
                    <p className="mt-3 text-[15px] leading-[1.7] text-white/78">
                      This is a target, not a guarantee, because PR outcomes depend on editorial discretion and third-party acceptance.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  {...revealProps}
                  transition={{ ...revealProps.transition, delay: 0.08 }}
                  className="rounded-[30px] border border-[#dfd4c2] bg-[#fffaf2] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10"
                >
                  <Eyebrow>Coverage Mix</Eyebrow>
                  <h3 className="mt-5 text-[1.85rem] font-display font-bold leading-[1.08] tracking-[-0.04em] text-[#111729]">
                    Coverage can flex across the formats that build authority best
                  </h3>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {coverageMix.map((item, index) => (
                      <div
                        key={item}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-[0_12px_22px_rgba(44,38,26,0.05)]",
                          index % 4 === 0 && "border-[#efcf9e] bg-[#fff1da] text-[#7a4a17]",
                          index % 4 === 1 && "border-[#c6e0d9] bg-[#e8f6f1] text-[#0f5f55]",
                          index % 4 === 2 && "border-[#ecc4b8] bg-[#fff0ec] text-[#92422f]",
                          index % 4 === 3 && "border-[#d7cbed] bg-[#f1ecfb] text-[#5c4297]",
                        )}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  {...revealProps}
                  transition={{ ...revealProps.transition, delay: 0.12 }}
                  className="rounded-[30px] border border-[#dfd4c2] bg-[linear-gradient(145deg,#fbf6ee_0%,#f1ece5_100%)] p-8 shadow-[0_24px_52px_rgba(44,38,26,0.08)] sm:p-10"
                >
                  <Eyebrow>Monthly Rhythm</Eyebrow>
                  <div className="mt-8 grid gap-4 md:grid-cols-4">
                    {monthCadence.map((item, index) => (
                      <div key={item.label} className="rounded-[22px] border border-[#ddd2bf] bg-white p-4 shadow-[0_12px_24px_rgba(44,38,26,0.05)]">
                        <div
                          className={cn(
                            "h-2 rounded-full",
                            index === 0 && "bg-[linear-gradient(90deg,#f1be74_0%,#d37b34_100%)]",
                            index === 1 && "bg-[linear-gradient(90deg,#10193a_0%,#27447e_100%)]",
                            index === 2 && "bg-[linear-gradient(90deg,#b8f0df_0%,#2b8f81_100%)]",
                            index === 3 && "bg-[linear-gradient(90deg,#ffd9cf_0%,#b85e4a_100%)]",
                          )}
                        />
                        <h3 className="mt-4 text-[17px] font-display font-bold tracking-[-0.02em] text-[#111729]">{item.label}</h3>
                        <p className="mt-2 text-[14px] leading-[1.6] text-[#5e6476]">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 rounded-[18px] border border-[#ddd2bf] bg-white px-5 py-4 text-[15px] leading-[1.7] text-[#434c66] shadow-[0_12px_24px_rgba(44,38,26,0.04)]">
                    SEO and AI visibility can happen downstream, but the service is built first and foremost to increase authority, recognition, and trust in-market.
                  </p>
                </motion.div>
              </div>
            </div>
          </SectionWrap>

          <SectionWrap>
            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
              <motion.div
                {...revealProps}
                className="relative min-h-[34rem] overflow-hidden rounded-[32px] border border-[#dfd4c2] bg-[linear-gradient(145deg,#efe6d6_0%,#f7f2ea_42%,#eef4ff_100%)] p-8 shadow-[0_24px_54px_rgba(44,38,26,0.08)] sm:p-10"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(184,94,74,0.09),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(43,143,129,0.08),transparent_22%)]" />
                <div className="relative z-10">
                  <Eyebrow>Proof</Eyebrow>
                  <h2 className="mt-5 max-w-lg text-balance text-[2rem] font-display font-bold leading-[1.05] tracking-[-0.05em] text-[#111729] sm:text-[2.25rem]">
                    Real authority coverage that looks and feels market-facing
                  </h2>
                </div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-8 top-[9.5rem] z-20 w-[55%] overflow-hidden rounded-[26px] border border-[#d6ccbc] bg-white p-2 shadow-[0_26px_44px_rgba(44,38,26,0.16)]"
                >
                  <div className="overflow-hidden rounded-[20px] border border-[#ece5d9]">
                    <Image
                      src={proofImages[0].src}
                      alt={proofImages[0].alt}
                      width={1244}
                      height={1500}
                      className="h-[15rem] w-full object-cover object-top sm:h-[17rem]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -9, 0], rotate: [2, 0, 2] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute right-8 top-[14rem] z-10 w-[33%] overflow-hidden rounded-[24px] border border-[#d6ccbc] bg-white p-2 shadow-[0_20px_36px_rgba(44,38,26,0.12)]"
                >
                  <div className="overflow-hidden rounded-[18px] border border-[#ece5d9]">
                    <Image
                      src={proofImages[1].src}
                      alt={proofImages[1].alt}
                      width={1244}
                      height={1500}
                      className="h-[10rem] w-full object-cover object-top"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [-3, -1, -3] }}
                  transition={{ duration: 7.1, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                  className="absolute bottom-8 left-[17%] z-30 w-[35%] overflow-hidden rounded-[24px] border border-[#d6ccbc] bg-white p-2 shadow-[0_20px_36px_rgba(44,38,26,0.12)]"
                >
                  <div className="overflow-hidden rounded-[18px] border border-[#ece5d9]">
                    <Image
                      src={proofImages[2].src}
                      alt={proofImages[2].alt}
                      width={1244}
                      height={1500}
                      className="h-[10rem] w-full object-cover object-top"
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                {...revealProps}
                transition={{ ...revealProps.transition, delay: 0.08 }}
                className="rounded-[32px] border border-[#dfd4c2] bg-white p-8 shadow-[0_24px_54px_rgba(44,38,26,0.08)] sm:p-10"
              >
                <Eyebrow>Who It Is For</Eyebrow>
                <h2 className="mt-5 max-w-xl text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-[#111729] sm:text-[2.25rem]">
                  Built for brands that want real market authority, not just more noise
                </h2>
                <div className="mt-8 space-y-4">
                  {audienceCards.map((item, index) => (
                    <div
                      key={item.title}
                      className={cn(
                        "rounded-[20px] border p-5",
                        index === 0 && "border-[#ecd9b7] bg-[#fff2dd]",
                        index === 1 && "border-[#cde4dd] bg-[#e8f6f1]",
                        index === 2 && "border-[#efcec5] bg-[#fff0ec]",
                        index === 3 && "border-[#d7cbed] bg-[#f1ecfb]",
                      )}
                    >
                      <h3 className="text-[18px] font-display font-bold tracking-[-0.02em] text-[#111729]">{item.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.65] text-[#5e6476]">{item.description}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-[1.65rem] leading-none text-[#b6632a] font-handwritten rotate-[-1deg]">
                  The brands that win are the ones people already trust.
                </p>
              </motion.div>
            </div>
          </SectionWrap>

          <SectionWrap className="pb-12">
            <motion.div
              {...revealProps}
              className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(130deg,#0b122d_0%,#121f49_48%,#1f5360_100%)] p-10 text-white shadow-[0_34px_88px_rgba(8,11,29,0.32)] sm:p-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,196,107,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(97,210,191,0.14),transparent_24%)]" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <Eyebrow inverted>Next Step</Eyebrow>
                  <h2 className="mt-5 max-w-xl text-balance text-[2rem] font-display font-bold leading-[1.06] tracking-[-0.05em] text-white sm:text-[2.4rem]">
                    Let&apos;s build the kind of authority your market cannot ignore
                  </h2>
                  <p className="mt-5 max-w-xl text-[17px] leading-[1.75] text-white/72">
                    If you want to become the go-to expert or the go-to brand in your industry, the next step is a conversation about fit, positioning, and opportunities.
                  </p>
                </div>
                <div className="flex flex-col gap-4 lg:items-start">
                  <PrimaryButton href="https://book.linkifi.io/widget/bookings/pr-discovery-call" label="Book Discovery Call" />
                  <SecondaryButton href="/contact-us" label="Talk To The Team" dark />
                </div>
              </div>
            </motion.div>
          </SectionWrap>
        </div>
      </main>
      <SiteFooter flushTop />
    </>
  );
}
