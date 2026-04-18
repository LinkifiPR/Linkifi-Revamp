import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowRight,
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
  {
    title: "CEOs",
    description: "Who want to shape industry narrative, build personal authority, and become the face of their company in the media.",
    Icon: Crown,
  },
  {
    title: "Spokespeople",
    description: "Who represent their brand publicly and need consistent, credible media exposure to build trust and recognition.",
    Icon: Megaphone,
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

const proofImages = [
  {
    src: "/proof%20images/IMG_0502.jpg",
    alt: "Authority coverage example one",
  },
  {
    src: "/proof%20images/IMG_0503.jpg",
    alt: "Authority coverage example two",
  },
  {
    src: "/proof%20images/IMG_0504%202.jpg",
    alt: "Authority coverage example three",
  },
  {
    src: "/proof%20images/IMG_0506.jpg",
    alt: "Authority coverage example four",
  },
  {
    src: "/proof%20images/IMG_0507.jpg",
    alt: "Authority coverage example five",
  },
  {
    src: "/proof%20images/IMG_0508.jpg",
    alt: "Authority coverage example six",
  },
  {
    src: "/proof%20images/IMG_0509.jpg",
    alt: "Authority coverage example seven",
  },
  {
    src: "/proof%20images/IMG_0510.jpg",
    alt: "Authority coverage example eight",
  },
  {
    src: "/proof%20images/IMG_0511.jpg",
    alt: "Authority coverage example nine",
  },
  {
    src: "/proof%20images/IMG_0513.jpg",
    alt: "Authority coverage example ten",
  },
  {
    src: "/proof%20images/IMG_0514.jpg",
    alt: "Authority coverage example eleven",
  },
  {
    src: "/proof%20images/IMG_0515.jpg",
    alt: "Authority coverage example twelve",
  },
] as const;

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

  if (title === "CEOs") {
    return (
      <svg viewBox="0 0 90 56" aria-hidden="true" className="h-10 w-16">
        <path d="M30 16 L38 8 L45 16 L52 8 L60 16 V20 H30 Z" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M45 22 C37 22, 31 27, 31 36 V44 H59 V36 C59 27,53 22,45 22 Z" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M45 27 V34" fill="none" stroke="#8ca8d8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (title === "Spokespeople") {
    return (
      <svg viewBox="0 0 90 56" aria-hidden="true" className="h-10 w-16">
        <path d="M16 30 L34 24 V40 L16 34 Z" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M34 26 L44 20 V44 L34 38" fill="none" stroke="#5f729c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M48 24 C52 27, 52 37, 48 40" fill="none" stroke="#8ca8d8" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 20 C61 26, 61 38, 55 44" fill="none" stroke="#8ca8d8" strokeWidth="2" strokeLinecap="round" />
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

                <div className="relative mx-auto w-full max-w-[620px]">
                  <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(111,93,255,0.18)_0%,rgba(111,93,255,0)_68%)]" />
                  <div className="relative overflow-hidden rounded-[28px] border border-[#dbe4f7] bg-[linear-gradient(150deg,#ffffff_0%,#f4f8ff_58%,#eef2ff_100%)] p-5 shadow-[0_34px_74px_rgba(22,34,72,0.2)] sm:p-6">
                    <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(132,151,194,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(132,151,194,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#d5e1f6] bg-white/92 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#435f9c] shadow-[0_10px_20px_rgba(31,49,96,0.1)]">
                        <Sparkles className="h-3.5 w-3.5 text-[#6d89ff]" />
                        Authority Snapshot
                      </span>
                      <h3 className="mt-4 text-[1.55rem] font-display font-semibold leading-[1.2] tracking-[-0.03em] text-[#202743]">
                        The operating system behind compounding authority
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.6] text-[#5f6787]">
                        Strategic positioning, trusted placements, and validation signals working together to build category trust.
                      </p>

                      <div className="mt-5 rounded-[16px] border border-[#dde6f8] bg-white/88 p-4 shadow-[0_14px_28px_rgba(27,40,78,0.08)]">
                        <div className="flex h-24 items-end gap-2">
                          {[
                            {
                              height: 24,
                              barClass: "bg-[linear-gradient(180deg,#a7bcff_0%,#6f8ef4_100%)] shadow-[0_8px_18px_rgba(92,118,206,0.24)]",
                            },
                            {
                              height: 38,
                              barClass: "bg-[linear-gradient(180deg,#bad0ff_0%,#7ea1f3_100%)] shadow-[0_8px_18px_rgba(99,129,207,0.24)]",
                            },
                            {
                              height: 50,
                              barClass: "bg-[linear-gradient(180deg,#f2c4e4_0%,#9b8ff0_100%)] shadow-[0_8px_18px_rgba(137,112,199,0.24)]",
                            },
                            {
                              height: 66,
                              barClass: "bg-[linear-gradient(180deg,#a3beff_0%,#5f84ee_100%)] shadow-[0_8px_18px_rgba(80,112,196,0.24)]",
                            },
                            {
                              height: 82,
                              barClass: "bg-[linear-gradient(180deg,#c8d8ff_0%,#7d9def_100%)] shadow-[0_8px_18px_rgba(100,127,198,0.24)]",
                            },
                          ].map((bar, index) => (
                            <span
                              key={`authority-bar-${index}`}
                              className={cn("w-full origin-bottom rounded-t-[8px] will-change-transform motion-reduce:[animation:none]", bar.barClass)}
                              style={{
                                height: `${bar.height}%`,
                                animation: `authorityBarRisePulse ${3.1 + index * 0.18}s ease-in-out ${index * 0.22}s infinite`,
                              }}
                            />
                          ))}
                        </div>
                        <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#5870a8]">Authority trajectory</p>
                      </div>

                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-[14px] border border-[#dce5f7] bg-white/90 p-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef3ff_0%,#e7eeff_100%)] text-[#5c79cf]">
                            <Eye className="h-4 w-4" />
                          </span>
                          <p className="mt-2 text-[13px] font-semibold text-[#263154]">Visibility lift</p>
                          <p className="mt-1 text-[12px] leading-[1.45] text-[#6a7290]">Presence across trusted media channels.</p>
                        </div>
                        <div className="rounded-[14px] border border-[#dce5f7] bg-white/90 p-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef3ff_0%,#e7eeff_100%)] text-[#5c79cf]">
                            <ShieldCheck className="h-4 w-4" />
                          </span>
                          <p className="mt-2 text-[13px] font-semibold text-[#263154]">Trust signals</p>
                          <p className="mt-1 text-[12px] leading-[1.45] text-[#6a7290]">Third-party validation that buyers trust.</p>
                        </div>
                        <div className="rounded-[14px] border border-[#dce5f7] bg-white/90 p-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef3ff_0%,#e7eeff_100%)] text-[#5c79cf]">
                            <BadgeCheck className="h-4 w-4" />
                          </span>
                          <p className="mt-2 text-[13px] font-semibold text-[#263154]">Category pull</p>
                          <p className="mt-1 text-[12px] leading-[1.45] text-[#6a7290]">Recognition that compounds over time.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mx-auto mt-6 w-full max-w-[1100px] overflow-hidden border border-[#d8ddec] bg-[linear-gradient(145deg,#f8faff_0%,#edf2fb_100%)] p-3 shadow-[0_16px_32px_rgba(34,45,80,0.11)] [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_16px,100%_calc(100%-16px),calc(100%-16px)_100%,16px_100%,0_calc(100%-16px),0_16px)] sm:p-4">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(170,193,236,0.22),transparent_34%),radial-gradient(circle_at_88%_84%,rgba(168,185,219,0.18),transparent_36%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(111,128,172,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(111,128,172,0.13)_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="relative">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5d6b95]">Built for</p>
                  <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
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
            <Panel className="border-[#dce4f3] bg-[linear-gradient(145deg,#f8fbff_0%,#ecf3ff_54%,#f8f2ff_100%)] p-0 sm:p-0 lg:p-0">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_14%,rgba(82,143,255,0.18),transparent_32%),radial-gradient(circle_at_94%_82%,rgba(126,93,255,0.18),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(102,120,167,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(102,120,167,0.14)_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                <div className="max-w-4xl">
                  <Eyebrow>Main Promise</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                    Authority PR helps clients become more visible, more trusted, and more recognized
                  </h2>
                  <p className="mt-4 max-w-3xl text-[17px] leading-[1.65] text-[#555f82]">
                    We engineer authority signals across earned media so visibility turns into trust, and trust compounds into category recognition.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {promisePillars.map((item, index) => (
                    <span
                      key={`signal-chip-${item.title}`}
                      className="inline-flex items-center rounded-full border border-[#d6deef] bg-white/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#43517f] shadow-[0_8px_16px_rgba(31,46,88,0.08)] backdrop-blur-sm"
                    >
                      Signal {index + 1}: {item.title}
                    </span>
                  ))}
                </div>

                <div className="mt-9 grid gap-6 md:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)_44px_minmax(0,1fr)] md:items-center">
                  {promisePillars.map((item, index) => [
                    <div
                      key={`${item.title}-card`}
                      className="group relative overflow-hidden border border-[#d7e0f1] bg-[linear-gradient(160deg,#ffffff_0%,#f4f8ff_64%,#edf2ff_100%)] p-6 shadow-[0_20px_40px_rgba(24,31,62,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b9c8ec] hover:shadow-[0_28px_50px_rgba(24,31,62,0.16)] [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]"
                    >
                      <div className="pointer-events-none absolute right-3 top-3 h-[2px] w-14 bg-[linear-gradient(90deg,transparent,#7f9dd8)]" />
                      <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-[#c8d4ef]" />

                      <span className="inline-flex items-center rounded-full border border-[#d8e1f2] bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4d5f8d]">
                        Signal 0{index + 1}
                      </span>
                      <span className="mt-4 inline-flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#d9e2f7] bg-[linear-gradient(145deg,#ffffff_0%,#ecf3ff_100%)] text-[#5f6ef6] shadow-[0_12px_24px_rgba(65,85,146,0.14)]">
                        <item.Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 text-[20px] font-display font-semibold tracking-[-0.02em] text-[#171929]">{item.title}</h3>
                      <p className="mt-3 text-[15px] leading-[1.6] text-[#596384]">{item.description}</p>
                    </div>,
                    index < promisePillars.length - 1 ? (
                      <div key={`${item.title}-arrow`} className="hidden md:flex md:items-center md:justify-center">
                        <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#cdd9f5] bg-[linear-gradient(145deg,#ffffff_0%,#eef3ff_100%)] text-[#5f6ef6] shadow-[0_12px_24px_rgba(63,88,168,0.18)] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]">
                          <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(109,129,255,0.28),transparent_70%)] motion-safe:animate-[ping_2.8s_ease-out_infinite]" />
                          <ArrowRight className="relative h-4 w-4" />
                        </span>
                      </div>
                    ) : null,
                  ])}
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap containerClass="w-full">
            <Panel className="overflow-hidden rounded-none border-x-0 border-[#2f3f88] bg-[linear-gradient(132deg,#0f1438_0%,#22357f_46%,#5332a5_100%)] p-0 sm:p-0 lg:p-0">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(130,189,255,0.22),transparent_34%),radial-gradient(circle_at_90%_88%,rgba(163,112,255,0.26),transparent_38%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(193,210,255,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(193,210,255,0.26)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/20" />
              <div className="pointer-events-none absolute -left-16 bottom-8 h-36 w-36 rounded-full border border-white/12" />

              <div className={cn("relative z-10 py-8 sm:py-10 lg:py-12", heroContainerClass)}>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#becbff] bg-[linear-gradient(135deg,#ffffff_0%,#edf2ff_100%)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#2a3f7f] shadow-[0_12px_24px_rgba(6,10,36,0.26)]">
                  <Sparkles className="h-3.5 w-3.5 text-[#6179ff]" />
                  What It Helps You Do
                </span>
                <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-white sm:text-[2.125rem] md:text-[2.25rem]">
                  Show up like a leader and dominate more of the conversation in your space
                </h2>
                <p className="mt-4 max-w-3xl text-[17px] leading-[1.65] text-[#d7deff]">
                  We combine strategic positioning, consistent media visibility, and credibility signals so authority compounds in every channel that shapes buyer perception.
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {["Category leadership", "Share-of-voice expansion", "Recognition flywheel"].map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center rounded-full border border-white/24 bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e8ecff] shadow-[0_10px_20px_rgba(14,22,60,0.22)] backdrop-blur-sm"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {authorityOutcomes.map((item, index) => {
                    const accent =
                      index % 3 === 0
                        ? {
                            edge: "from-[#83a0ff] via-[#9aaeff] to-transparent",
                            pill: "border-[#a8b9ff]/45 text-[#dce4ff]",
                            iconFrame: "border-[#aab9ff]/45 text-[#aebdff]",
                            glow: "bg-[radial-gradient(circle_at_82%_0%,rgba(126,152,255,0.24),transparent_40%)]",
                          }
                        : index % 3 === 1
                          ? {
                              edge: "from-[#9f7bff] via-[#b79aff] to-transparent",
                              pill: "border-[#c5adff]/45 text-[#eadfff]",
                              iconFrame: "border-[#c9b2ff]/45 text-[#c9b3ff]",
                              glow: "bg-[radial-gradient(circle_at_82%_0%,rgba(181,137,255,0.24),transparent_40%)]",
                            }
                          : {
                              edge: "from-[#5fc6ff] via-[#7acfff] to-transparent",
                              pill: "border-[#93d8ff]/45 text-[#def5ff]",
                              iconFrame: "border-[#9bdbff]/45 text-[#9cdcff]",
                              glow: "bg-[radial-gradient(circle_at_82%_0%,rgba(88,198,255,0.24),transparent_40%)]",
                            };

                    return (
                      <div
                        key={item.title}
                        className="group relative overflow-hidden border border-white/22 bg-[linear-gradient(160deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.1)_100%)] p-6 shadow-[0_24px_44px_rgba(10,14,48,0.34)] backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1 hover:border-white/36 hover:shadow-[0_34px_56px_rgba(10,14,48,0.45)] [clip-path:polygon(16px_0,calc(100%-16px)_0,100%_16px,100%_calc(100%-16px),calc(100%-16px)_100%,16px_100%,0_calc(100%-16px),0_16px)]"
                      >
                        <div className={cn("pointer-events-none absolute inset-0", accent.glow)} />
                        <div className={cn("pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r", accent.edge)} />
                        <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-white/24" />

                        <span
                          className={cn(
                            "relative inline-flex items-center rounded-full border bg-white/8 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]",
                            accent.pill,
                          )}
                        >
                          Outcome {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "relative mt-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px] border bg-white/10 shadow-[0_12px_26px_rgba(10,14,48,0.22)]",
                            accent.iconFrame,
                          )}
                        >
                          <item.Icon className="h-5 w-5" />
                        </span>
                        <h3 className="relative mt-4 text-[18px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-white">{item.title}</h3>
                        <p className="relative mt-3 text-[15px] leading-[1.6] text-[#d6ddff]">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap id="flow" className="scroll-mt-8 md:scroll-mt-10">
            <Panel className="overflow-hidden border-[#d6dff4] bg-[linear-gradient(132deg,#f8fbff_0%,#ebf2ff_44%,#f8f2ff_100%)] p-0 sm:p-0 lg:p-0">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(99,150,255,0.2),transparent_32%),radial-gradient(circle_at_92%_85%,rgba(160,104,255,0.22),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(124,142,193,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(124,142,193,0.14)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="pointer-events-none absolute -left-10 top-10 h-24 w-24 rounded-full border border-[#baccf2]/80" />
              <div className="pointer-events-none absolute -right-14 bottom-6 h-32 w-32 rounded-full border border-[#c4b6ff]/70" />

              <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#d0dbf4] bg-white/90 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.13em] text-[#334474] shadow-[0_10px_22px_rgba(23,36,74,0.12)]">
                    <Sparkles className="h-3.5 w-3.5 text-[#6b80ff]" />
                    How It Stacks Up
                  </span>
                </div>

                <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#1b2340] sm:text-[2.125rem] md:text-[2.25rem]">
                  How we turn strategic PR into compounding authority
                </h2>
                <p className="mt-4 max-w-3xl text-[18px] leading-[1.6] text-[#505b80]">
                  Each stage builds on the last: from positioning and pitching to earned validation, then into lasting recognition, trust, and category leadership.
                </p>

                <div className="relative mt-10 overflow-x-auto pb-4">
                  <div className="pointer-events-none absolute left-8 right-8 top-[38%] hidden h-px bg-[linear-gradient(90deg,rgba(117,138,197,0.08),rgba(110,133,255,0.55),rgba(140,105,255,0.5),rgba(117,138,197,0.08))] md:block motion-safe:animate-[pulse_3.8s_ease-in-out_infinite]" />
                  <div className="pointer-events-none absolute left-8 right-8 top-[38%] hidden h-px [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0_10px,rgba(255,255,255,0.45)_10px_18px)] md:block opacity-70" />

                  <div className="flex min-w-max snap-x snap-mandatory gap-4 md:grid md:min-w-0 md:grid-cols-5 md:gap-4">
                    {authorityFlow.map((item, index) => (
                      <div key={item.title} className="relative w-[258px] snap-center md:w-auto">
                        <div className="pointer-events-none absolute -top-3 left-1/2 hidden -translate-x-1/2 md:block">
                          <span
                            className="relative inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#ccd7f5] bg-white/90 text-[#6f5dff] shadow-[0_8px_18px_rgba(34,48,95,0.16)] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"
                            style={{ animationDelay: `${index * 0.22}s` }}
                          >
                            <span
                              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(112,129,255,0.32),transparent_70%)] motion-safe:animate-[ping_2.8s_ease-out_infinite]"
                              style={{ animationDelay: `${index * 0.22}s` }}
                            />
                          </span>
                        </div>

                        <div className="group relative h-full overflow-hidden border border-[#d6def2] bg-[linear-gradient(160deg,rgba(255,255,255,0.95)_0%,rgba(246,249,255,0.9)_70%,rgba(240,245,255,0.92)_100%)] p-5 shadow-[0_20px_38px_rgba(24,31,62,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8c8ef] hover:shadow-[0_28px_48px_rgba(24,31,62,0.16)] [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]">
                          <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-[linear-gradient(90deg,transparent,#8aa4e8,transparent)]" />
                          <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-[#cdd8f3]" />

                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex items-center rounded-full border border-[#d1daf3] bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.19em] text-[#5a6b9a]">
                              Step {index + 1}
                            </span>
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#d2dcf4] bg-[linear-gradient(145deg,#ffffff_0%,#edf3ff_100%)] text-[#6f5dff] shadow-[0_10px_22px_rgba(44,61,116,0.14)]">
                              <item.Icon className="h-5 w-5" />
                            </span>
                          </div>

                          <h3 className="mt-4 text-[16px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-[#1f2744]">{item.title}</h3>
                          <p className="mt-3 text-[14px] leading-[1.6] text-[#5e6785]">{item.description}</p>
                        </div>

                        {index < authorityFlow.length - 1 ? (
                          <div className="pointer-events-none absolute -right-3 top-[42%] hidden -translate-y-1/2 md:flex">
                            <span
                              className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#cfdaf6] bg-[linear-gradient(145deg,#ffffff_0%,#eef3ff_100%)] text-[#6f5dff] shadow-[0_10px_22px_rgba(33,50,102,0.16)] motion-safe:animate-[pulse_3s_ease-in-out_infinite]"
                              style={{ animationDelay: `${index * 0.24}s` }}
                            >
                              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(114,130,255,0.28),transparent_70%)] motion-safe:animate-[ping_3s_ease-out_infinite]" />
                              <ArrowRight className="relative h-4 w-4" />
                            </span>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap containerClass="w-full">
            <Panel className="overflow-hidden rounded-none border-x-0 border-[#e2d2f3] bg-[linear-gradient(126deg,#fff7fc_0%,#f1f4ff_48%,#ffeef9_100%)] p-0 sm:p-0 lg:p-0">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_14%,rgba(255,101,205,0.2),transparent_34%),radial-gradient(circle_at_84%_84%,rgba(128,152,255,0.18),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(149,136,188,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(149,136,188,0.14)_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="pointer-events-none absolute -left-10 top-6 h-20 w-20 rounded-full border border-[#efb8e5]/70" />
              <div className="pointer-events-none absolute -right-16 top-8 h-28 w-28 rounded-full border border-[#c4b8ff]/70" />

              <div className={cn("relative z-10 py-8 sm:py-10 lg:py-12", heroContainerClass)}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#efc7e9] bg-[linear-gradient(135deg,#fff6fc_0%,#ffeaf7_100%)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#b93285] shadow-[0_10px_22px_rgba(124,45,105,0.16)]">
                    <Sparkles className="h-3.5 w-3.5 text-[#ff4cb8]" />
                    How We Build Authority
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#d8d5f7] bg-white/85 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#575f99] shadow-[0_8px_18px_rgba(36,47,92,0.1)]">
                    Earned Visibility Engine
                  </span>
                </div>

                <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#231d3a] sm:text-[2.125rem] md:text-[2.25rem]">
                  Earned visibility in the places that matter
                </h2>
                <p className="mt-4 max-w-3xl text-[18px] leading-[1.6] text-[#5f5c7d]">
                  We place your brand, founders, and experts into high-trust channels that shape perception, influence decisions, and strengthen long-term authority.
                </p>

                <div className="relative mt-10">
                  <div className="pointer-events-none absolute left-8 right-8 top-0 hidden h-px bg-[linear-gradient(90deg,rgba(255,86,190,0.1),rgba(255,86,190,0.72),rgba(126,140,255,0.62),rgba(255,86,190,0.1))] md:block motion-safe:animate-[pulse_4s_ease-in-out_infinite]" />
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {placements.map((item, index) => {
                      const accent =
                        index % 4 === 0
                          ? "from-[#ff5ec7] via-[#ff8cd9] to-transparent"
                          : index % 4 === 1
                            ? "from-[#7d94ff] via-[#a5b4ff] to-transparent"
                            : index % 4 === 2
                              ? "from-[#c17dff] via-[#daa9ff] to-transparent"
                              : "from-[#ff6da8] via-[#ff8ec0] to-transparent";

                      return (
                        <div
                          key={item.title}
                          className="group relative overflow-hidden border border-[#eadff3] bg-[linear-gradient(160deg,rgba(255,255,255,0.95)_0%,rgba(252,247,255,0.94)_100%)] p-5 shadow-[0_16px_34px_rgba(30,29,63,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9caef] hover:shadow-[0_24px_42px_rgba(30,29,63,0.17)] [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_14px,100%_calc(100%-14px),calc(100%-14px)_100%,14px_100%,0_calc(100%-14px),0_14px)]"
                        >
                          <div className={cn("pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r", accent)} />
                          <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-[#e5d8f0]" />
                          <span
                            className="pointer-events-none absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-[#ff5fc5]/80 shadow-[0_0_0_4px_rgba(255,95,197,0.18),0_0_18px_rgba(255,95,197,0.42)] motion-safe:animate-[pulse_2.8s_ease-in-out_infinite]"
                            style={{ animationDelay: `${index * 0.18}s` }}
                          />

                          <span className="inline-flex items-center rounded-full border border-[#ead8f4] bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.19em] text-[#8d4e93]">
                            Placement {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#f0d2e7] bg-[linear-gradient(135deg,#fff5fb_0%,#f4f0ff_100%)] text-[#d3399d] shadow-[0_10px_20px_rgba(147,53,115,0.14)]">
                            <item.Icon className="h-5 w-5" />
                          </span>
                          <h3 className="mt-4 text-[16px] font-display font-semibold leading-[1.35] text-[#281f43]">{item.title}</h3>
                          <p className="mt-2 text-[14px] leading-[1.6] text-[#675f82]">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-9 flex justify-center">
                  <Button
                    asChild
                    variant="ghost"
                    className="h-12 rounded-full border border-[#f4bfe5] bg-[linear-gradient(135deg,#ff4cb8_0%,#c35cff_52%,#6f92ff_100%)] px-7 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(150,55,130,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(255,76,184,0.16),0_24px_44px_rgba(111,78,204,0.32)] sm:h-14 sm:px-8 sm:text-base"
                  >
                    <Link href="#proof">
                      See our work
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap containerClass="w-full" className="py-0">
            <div className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#1b285e] bg-[linear-gradient(134deg,#0f1539_0%,#1d2f73_46%,#2d3f84_100%)] py-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.08)] sm:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(255,112,202,0.2),transparent_32%),radial-gradient(circle_at_84%_88%,rgba(110,169,255,0.18),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(175,192,241,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(175,192,241,0.2)_1px,transparent_1px)] [background-size:20px_20px]" />

              <div className={`relative z-10 ${heroContainerClass}`}>
                <div className="mx-auto max-w-4xl text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#ffb6e8]/65 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_100%)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ffd8f3] backdrop-blur-sm">
                    <Tv className="h-3.5 w-3.5" />
                    Our Client on TV
                  </span>
                  <h3 className="mt-4 text-balance font-display text-[2rem] font-bold tracking-[-0.04em] text-white sm:text-[2.4rem]">
                    Real authority placements that people can see
                  </h3>
                  <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.6] text-[#d2dcff]">
                    This is what high-trust visibility looks like in the real world, not just in a deck.
                  </p>
                </div>

                <div className="relative mx-auto mt-8 w-full max-w-[980px]">
                  <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle,rgba(111,147,255,0.28)_0%,rgba(111,147,255,0)_68%)]" />
                  <div className="relative rounded-[34px] border border-[#d7e0fa] bg-[linear-gradient(150deg,#f5f8ff_0%,#ffffff_46%,#edf4ff_100%)] p-5 shadow-[0_42px_88px_rgba(8,16,43,0.42)] sm:p-6">
                    <div className="rounded-[30px] border border-[#2b3866] bg-[linear-gradient(168deg,#24305a_0%,#151d38_58%,#0d1325_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(255,255,255,0.06),0_20px_40px_rgba(7,11,27,0.56)] sm:p-6">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] border-[3px] border-[#0a1227] bg-[#02040f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_0_0_1px_rgba(121,151,218,0.4)]">
                        <video
                          className="h-full w-full object-cover saturate-[1.16] contrast-[1.1] brightness-[1.04]"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          disablePictureInPicture
                          aria-label="Authority PR TV showcase video"
                        >
                          <source src={heroVideoSrc} type="video/mp4" />
                        </video>
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_2%,rgba(255,101,197,0.22),transparent_36%),radial-gradient(circle_at_92%_100%,rgba(63,222,255,0.24),transparent_32%)] mix-blend-screen" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-[16%] bg-[linear-gradient(90deg,rgba(255,255,255,0.15),transparent)]" />
                        <div className="pointer-events-none absolute inset-x-6 top-2 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.56),transparent)]" />
                      </div>
                      <div className="mt-4 flex items-center justify-between px-2">
                        <div className="h-1.5 w-28 rounded-full bg-[repeating-linear-gradient(90deg,rgba(169,217,255,0.75)_0_4px,rgba(83,112,177,0.24)_4px_7px)] opacity-80" />
                        <span className="rounded-full border border-[#6283cb] bg-[#121d3f] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bedaff]">
                          Linkifi TV
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full border border-[#6f85bb] bg-[#1f2b4d]" />
                          <span className="h-3 w-3 rounded-full border border-[#6f85bb] bg-[#1f2b4d]" />
                        </div>
                      </div>
                    </div>
                    <div className="mx-auto mt-3 h-3 w-16 rounded-[999px] bg-[linear-gradient(180deg,#ccd6f0_0%,#b5c4e3_100%)] shadow-[0_7px_14px_rgba(31,40,78,0.25)]" />
                    <div className="mx-auto mt-1.5 h-4 w-52 rounded-[999px] border border-[#b6c4e5] bg-[linear-gradient(180deg,#edf3ff_0%,#c8d5ed_100%)] shadow-[0_10px_20px_rgba(26,36,78,0.28)]" />
                  </div>
                </div>

                <div className="mt-8 hidden items-center justify-between px-6 lg:flex">
                  <Link
                    href="#included"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ffb8e9]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] text-[#ffd9f4] shadow-[0_12px_26px_rgba(20,32,78,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(255,184,233,0.14),0_18px_30px_rgba(20,32,78,0.34)]"
                  >
                    <ArrowDown className="h-5 w-5 motion-safe:animate-[bounce_2.4s_ease-in-out_infinite]" />
                  </Link>
                  <Link
                    href="#included"
                    className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#b9d2ff]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] text-[#d9e8ff] shadow-[0_12px_26px_rgba(20,32,78,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(185,210,255,0.14),0_18px_30px_rgba(20,32,78,0.34)]"
                  >
                    <ArrowDown className="h-5 w-5 motion-safe:animate-[bounce_2.4s_ease-in-out_infinite]" />
                  </Link>
                </div>

                <div className="mt-7 flex justify-center lg:hidden">
                  <Link
                    href="#included"
                    className="inline-flex items-center gap-2 rounded-full border border-[#c4d8ff]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.08))] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#ddecff] shadow-[0_12px_26px_rgba(20,32,78,0.3)]"
                  >
                    Pricing below
                    <ArrowDown className="h-4 w-4 motion-safe:animate-[bounce_2.4s_ease-in-out_infinite]" />
                  </Link>
                </div>
              </div>
            </div>
          </SectionWrap>

          <SectionWrap id="included" className="scroll-mt-8 md:scroll-mt-10" containerClass="w-full">
            <Panel className="overflow-hidden rounded-none border-x-0 border-[#d8e3f5] bg-[linear-gradient(128deg,#f7f9ff_0%,#edf2ff_50%,#f7faff_100%)] p-0 sm:p-0 lg:p-0">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(118,156,255,0.16),transparent_34%),radial-gradient(circle_at_86%_82%,rgba(98,138,248,0.14),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(129,151,197,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(129,151,197,0.14)_1px,transparent_1px)] [background-size:22px_22px]" />
              <div className="pointer-events-none absolute -left-10 top-8 h-24 w-24 rounded-full border border-[#c8d8f4]/70" />
              <div className="pointer-events-none absolute -right-14 bottom-8 h-32 w-32 rounded-full border border-[#b7ccf0]/70" />

              <div className={cn("relative z-10 py-8 sm:py-10 lg:py-12", heroContainerClass)}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#cddaf2] bg-[linear-gradient(135deg,#ffffff_0%,#eef4ff_100%)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#2f4f89] shadow-[0_10px_22px_rgba(45,71,124,0.14)]">
                    <Sparkles className="h-3.5 w-3.5 text-[#5f84ff]" />
                    What Is Included
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#d3def3] bg-white/92 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4c628f] shadow-[0_8px_18px_rgba(35,45,88,0.1)]">
                    Prices starting from $5,000/month
                  </span>
                </div>

                <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#241d3d] sm:text-[2.125rem] md:text-[2.25rem]">
                  Authority PR engagement built for sustained credibility
                </h2>
                <p className="mt-4 max-w-3xl text-[18px] leading-[1.6] text-[#625c80]">
                  A focused monthly model that combines strategic positioning, proactive outreach, and credible placements to build trust that compounds.
                </p>

                <div className="mt-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="rounded-[22px] border border-[#b7c9ef] bg-[linear-gradient(145deg,#101937_0%,#203369_56%,#2f4b8e_100%)] p-6 text-white shadow-[0_26px_56px_rgba(31,51,101,0.35)] sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/74">Starting investment</p>
                    <div className="mt-4 flex items-end gap-2">
                      <span className="text-[2.65rem] font-display font-bold leading-[1] tracking-[-0.04em]">$5,000</span>
                      <span className="pb-1 text-[15px] font-medium text-white/78">per month</span>
                    </div>
                    <p className="mt-3 text-[14px] leading-[1.55] text-white/84">Typical target output: around 3-4 pieces of earned coverage per month.</p>

                    <div className="mt-5 grid gap-2.5">
                      {[
                        "Strategic positioning and message refinement",
                        "Proactive pitching and reactive media opportunities",
                        "Continuous authority signal reinforcement",
                      ].map((point) => (
                        <div key={point} className="flex items-start gap-2.5 rounded-[12px] border border-white/18 bg-white/10 px-3 py-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#cfe0ff]" />
                          <span className="text-[13px] leading-[1.5] text-white/88">{point}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      className="mt-6 h-12 w-full rounded-full border border-[#b9cdff] bg-[linear-gradient(135deg,#5f84ff_0%,#3d6af0_56%,#274fc0_100%)] px-6 text-sm font-semibold text-white shadow-[0_20px_38px_rgba(41,75,166,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_6px_rgba(95,132,255,0.16),0_26px_46px_rgba(43,74,167,0.36)] sm:h-14 sm:text-base"
                    >
                      <a href="https://book.linkifi.io/widget/bookings/pr-discovery-call" target="_blank" rel="noreferrer">
                        Book a Call
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>

                    <p className="mt-4 text-[12px] leading-[1.5] text-white/72">
                      Coverage is a target, not a guarantee, because outcomes depend on editorial discretion and third-party acceptance.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[18px] border border-[#dbe4f5] bg-white/92 p-5 shadow-[0_16px_34px_rgba(27,32,64,0.1)] backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4864a0]">Monthly operating cadence</p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {cadence.map((item) => (
                          <div key={item} className="rounded-[12px] border border-[#e2e9f6] bg-[linear-gradient(145deg,#ffffff_0%,#f4f8ff_100%)] px-3 py-2.5 text-[13px] leading-[1.5] text-[#586682]">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[18px] border border-[#dbe4f5] bg-white/92 p-5 shadow-[0_16px_34px_rgba(27,32,64,0.1)] backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4864a0]">Coverage may include</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {coverageMix.slice(0, 6).map((item) => (
                          <div key={item.title} className="rounded-[12px] border border-[#e2e9f6] bg-[linear-gradient(145deg,#ffffff_0%,#f4f8ff_100%)] px-3 py-2.5">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#eef3ff_0%,#e8efff_100%)] text-[#4f6fc1]">
                                <item.Icon className="h-4 w-4" />
                              </span>
                              <span className="text-[13px] font-semibold text-[#30425f]">{item.title}</span>
                            </div>
                            <p className="mt-1.5 text-[12px] leading-[1.5] text-[#66748e]">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <section id="proof" className="scroll-mt-8 py-7 md:scroll-mt-10 md:py-8">
            <div className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[#ccd8f2] bg-[linear-gradient(152deg,#edf3ff_0%,#f9f8ff_45%,#eef4ff_100%)] py-14 sm:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(111,93,255,0.16),transparent_36%),radial-gradient(circle_at_88%_82%,rgba(233,132,198,0.14),transparent_34%)]" />
              <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(102,124,186,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(102,124,186,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(84,109,188,0.54),transparent)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,115,180,0.5),transparent)]" />

              <div className="relative z-10 mx-auto w-full max-w-[1640px] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                  <Eyebrow>Proof</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.16] tracking-[-0.045em] text-[#171929] sm:text-[2.2rem] md:text-[2.45rem]">
                    Real authority coverage in mega-authoritative publications
                  </h2>
                  <p className="mx-auto mt-4 max-w-3xl text-[17px] leading-[1.65] text-[#56607f] sm:text-[18px]">
                    Live editorial placements presented in a premium mobile-view wall so credibility is instantly felt.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
                  {proofImages.map((item, index) => (
                    <article key={item.src} className={cn("proof-phone-shell", index % 2 === 0 ? "proof-phone-float" : "proof-phone-float-delayed")}>
                      <div className="proof-phone-bezel">
                        <div className="proof-phone-screen">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={1290}
                            height={2235}
                            className="h-full w-full object-cover object-top"
                            sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 16vw, (min-width: 640px) 29vw, 46vw"
                          />
                          <div className="proof-phone-overlay" />
                          <div className="proof-phone-reflection" />
                        </div>
                        <span className="proof-phone-notch" />
                        <span className="proof-phone-home" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

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
