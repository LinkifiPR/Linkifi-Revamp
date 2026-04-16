import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Megaphone,
  MessageCircle,
  Mic2,
  Newspaper,
  PenSquare,
  Quote,
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

type CoverageItem = {
  title: string;
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

const outcomes: IconItem[] = [
  {
    title: "Become the go-to expert in your industry",
    description: "Show up like a leader when customers, partners, and media evaluate who to trust.",
    Icon: BadgeCheck,
  },
  {
    title: "Build authority and recognition in your market",
    description: "Create sustained visibility so your name is familiar before a buying decision happens.",
    Icon: Building2,
  },
  {
    title: "Increase trust with customers, partners, and media",
    description: "Third-party validation gives your expertise weight that self-promotion cannot replicate.",
    Icon: Users,
  },
  {
    title: "Raise the profile of your founder or spokesperson",
    description: "Position the right voice in the right conversations at the right time.",
    Icon: UserRound,
  },
  {
    title: "Strengthen perceived expertise",
    description: "Earned coverage compounds the perception that you are a category authority.",
    Icon: Quote,
  },
  {
    title: "Stand out from competitors",
    description: "Become the name people recognise, quote, and trust instead of another brand in the category.",
    Icon: CheckCircle2,
  },
];

const authorityPlacements: CoverageItem[] = [
  { title: "Reputable publications", Icon: Newspaper },
  { title: "Industry and news interviews", Icon: MessageCircle },
  { title: "Podcast appearances", Icon: Mic2 },
  { title: "Expert commentary", Icon: Quote },
  { title: "Quoted expert placements", Icon: MessageCircle },
  { title: "Bylines and contributed articles", Icon: PenSquare },
  { title: "Opinion pieces and op-eds", Icon: PenSquare },
  { title: "Timely media opportunities", Icon: Megaphone },
];

const includedCoverage = [
  "Publication features",
  "Interviews",
  "Podcast placements",
  "Expert quote opportunities",
  "Bylines",
  "Op-eds",
  "Other authority-building placements",
] as const;

const executionModel = [
  {
    mode: "Proactive",
    title: "Publication pitching",
    description:
      "Pitching interviews, features, bylines, and opinion pieces to target publications aligned to your positioning.",
    Icon: Newspaper,
  },
  {
    mode: "Proactive",
    title: "Podcast pitching",
    description:
      "Pitching podcast hosts for guest appearances that reinforce your expertise and category authority.",
    Icon: Mic2,
  },
  {
    mode: "Reactive",
    title: "Journalist requests",
    description:
      "Responding quickly to relevant journalist requests and expert commentary opportunities.",
    Icon: MessageCircle,
  },
  {
    mode: "Reactive",
    title: "Timely commentary",
    description:
      "Newsjacking when there is a strong strategic fit with live conversations in your market.",
    Icon: Megaphone,
  },
] as const;

const audienceCards = [
  {
    title: "Founders",
    description: "Who want to raise their personal profile and be seen as a leader.",
  },
  {
    title: "Brands",
    description: "That want to become more trusted and recognised in their category.",
  },
  {
    title: "Experts",
    description: "Who want to be the go-to voice in their space.",
  },
  {
    title: "Companies",
    description: "That want more than links and want real market authority.",
  },
] as const;

const montageItems = [
  {
    src: "/authority-montage/processed/entrepreneur-uk.webp",
    alt: "Entrepreneur UK editorial feature",
    width: 1244,
    height: 1500,
  },
  {
    src: "/authority-montage/processed/bbc-travel.webp",
    alt: "BBC Travel editorial feature",
    width: 1244,
    height: 1500,
  },
  {
    src: "/authority-montage/processed/fodors-travel.webp",
    alt: "Fodor's editorial feature",
    width: 1244,
    height: 1500,
  },
  {
    src: "/authority-montage/processed/eat-this-not-that.webp",
    alt: "Eat This Not That editorial feature",
    width: 1244,
    height: 1500,
  },
] as const;

const pageContainerClass = "mx-auto w-full max-w-[1200px] px-6";
const heroContainerClass = "mx-auto w-full max-w-[1280px] px-6";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#dedaf0] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#60539d] shadow-[0_12px_28px_rgba(89,84,165,0.08)]">
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
                    Become the go-to expert in your industry.
                  </p>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5b5f79]">
                    Traditional PR for brands, founders, and spokespeople who want to build real authority in their market.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <PrimaryExternalButton
                      href="https://book.linkifi.io/widget/bookings/pr-discovery-call"
                      label="Book Discovery Call"
                    />
                    <SecondaryButton href="#included" label="See What Is Included" />
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-[18px] border border-[#e7e2f3] bg-white/92 px-4 py-4 shadow-[0_16px_34px_rgba(24,31,62,0.06)]">
                      <div className="text-[1.5rem] font-display font-bold tracking-[-0.04em] text-[#171929] sm:text-[1.75rem]">$5,000</div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#646882]">monthly engagement</p>
                    </div>
                    <div className="rounded-[18px] border border-[#e7e2f3] bg-white/92 px-4 py-4 shadow-[0_16px_34px_rgba(24,31,62,0.06)]">
                      <div className="text-[1.5rem] font-display font-bold tracking-[-0.04em] text-[#171929] sm:text-[1.75rem]">~3-4</div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#646882]">pieces per month target</p>
                    </div>
                    <div className="rounded-[18px] border border-[#e7e2f3] bg-white/92 px-4 py-4 shadow-[0_16px_34px_rgba(24,31,62,0.06)]">
                      <div className="text-[1.5rem] font-display font-bold tracking-[-0.04em] text-[#171929] sm:text-[1.75rem]">Built for</div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-[#646882]">brands, founders, and experts</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-[#e4def4] bg-white p-5 shadow-[0_16px_34px_rgba(24,31,62,0.08)] sm:col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5dff]">What it is</p>
                    <h2 className="mt-3 text-[1.55rem] font-display font-semibold leading-[1.2] tracking-[-0.03em] text-[#171929]">
                      Real authority, earned not bought.
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#61657f]">
                      Not vanity press. The goal is meaningful visibility in the places that shape perception, build trust, and separate you from competitors.
                    </p>
                  </div>

                  {montageItems.slice(0, 2).map((item) => (
                    <div
                      key={item.src}
                      className="overflow-hidden rounded-[20px] border border-[#e4def4] bg-white p-1.5 shadow-[0_16px_34px_rgba(24,31,62,0.08)]"
                    >
                      <div className="overflow-hidden rounded-[14px] border border-[#ece8f6]">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          className="h-[12.5rem] w-full object-cover object-top sm:h-[14rem]"
                        />
                      </div>
                    </div>
                  ))}
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
                    The places people already trust
                  </h3>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-4">
                  {trustLogos.map((logo) => (
                    <div key={logo.alt}>
                      <div className="group relative flex h-[78px] items-center justify-center overflow-hidden rounded-[16px] border border-white/24 bg-[linear-gradient(140deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-4 backdrop-blur-sm transition-all duration-300 hover:border-[#d5c8ff] hover:shadow-[0_0_0_1px_rgba(199,188,255,0.5),0_16px_30px_rgba(56,63,168,0.28)]">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <SectionWrap>
            <Panel>
              <Eyebrow>What It Helps You Do</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                Show up like a leader in your market
              </h2>
              <p className="mt-4 max-w-3xl text-[18px] leading-[1.6] text-[#5a5d79]">
                Authority PR is designed to make you the name people recognise, quote, and trust.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {outcomes.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[#e8e5f3] bg-white p-7 shadow-[0_18px_36px_rgba(24,31,62,0.08)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff] shadow-[inset_0_0_0_1px_rgba(111,93,255,0.08)]">
                      <item.Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-[18px] font-display font-semibold leading-[1.35] tracking-[-0.02em] text-[#171929]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <Eyebrow>How We Build Your Authority</Eyebrow>
                  <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                    Earned visibility in the places that matter
                  </h2>
                  <p className="mt-4 text-[18px] leading-[1.6] text-[#5a5d79]">
                    We focus on credible placements that shape how your market perceives your expertise.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {authorityPlacements.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-[14px] border border-[#e6e2f3] bg-white px-4 py-3 text-[14px] font-medium leading-[1.5] text-[#323652] shadow-[0_12px_26px_rgba(24,31,62,0.05)]"
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#efebff] text-[#6f5dff]">
                        <item.Icon className="h-4 w-4" />
                      </span>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </SectionWrap>

          <SectionWrap id="included" className="scroll-mt-8 md:scroll-mt-10">
            <Panel className="bg-[linear-gradient(180deg,#ffffff_0%,#f7f4ff_100%)]">
              <Eyebrow>What Is Included</Eyebrow>
              <h2 className="mt-5 text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                Consistent, meaningful coverage
              </h2>

              <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                <div className="rounded-[20px] border border-[#d8cef8] bg-[linear-gradient(145deg,#19144f_0%,#4538aa_58%,#5d6fff_100%)] p-7 text-white shadow-[0_22px_52px_rgba(77,65,183,0.3)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/72">Engagement</p>
                  <div className="mt-4 text-[3rem] font-display font-bold leading-none tracking-[-0.05em]">$5,000</div>
                  <p className="mt-2 text-[15px] text-white/74">per month</p>
                  <div className="mt-6 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.24),rgba(255,255,255,0.06))]" />
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/72">Target output</p>
                  <div className="mt-3 text-[2.3rem] font-display font-bold leading-none tracking-[-0.05em]">~3-4</div>
                  <p className="mt-2 text-[15px] text-white/74">pieces per month</p>
                </div>

                <div className="rounded-[20px] border border-[#e7e2f3] bg-white p-7 shadow-[0_18px_36px_rgba(24,31,62,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f5dff]">Coverage may include a mix of</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {includedCoverage.map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-[14px] border border-[#ece8f6] bg-[#faf9ff] px-4 py-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#efebff] text-[#6f5dff]">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span className="text-[14px] leading-[1.6] text-[#4f5471]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 rounded-[14px] border border-[#eadff8] bg-[#f8f3ff] px-4 py-3 text-[13px] leading-[1.6] text-[#5b4a87]">
                    PR depends on editorial discretion and timing. Coverage is a target, not a guarantee.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[14px] leading-[1.7] text-[#646882]">
                Core objective: build authority and brand credibility. SEO and AI visibility gains are a downstream byproduct of strong authority signals.
              </p>
            </Panel>
          </SectionWrap>

          <SectionWrap>
            <Panel className="bg-[linear-gradient(180deg,#fbfbff_0%,#f4f3fa_100%)]">
              <Eyebrow>How We Make It Happen</Eyebrow>
              <h2 className="mt-5 max-w-4xl text-balance text-[2rem] font-display font-bold leading-[1.2] tracking-[-0.04em] text-[#171929] sm:text-[2.125rem] md:text-[2.25rem]">
                The work behind the scenes
              </h2>
              <p className="mt-4 max-w-3xl text-[18px] leading-[1.6] text-[#5a5d79]">
                A mix of proactive pitching and reactive opportunity-capture, tuned to the conversations your market is already having.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {executionModel.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[#e8e5f3] bg-white p-7 shadow-[0_18px_36px_rgba(24,31,62,0.08)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-[#d9d3ef] bg-[#f8f6ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5dff]">
                        {item.mode}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#efe9ff_0%,#edf1ff_100%)] text-[#6f5dff]">
                        <item.Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-[20px] font-display font-semibold leading-[1.25] tracking-[-0.02em] text-[#171929]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[#61657f]">{item.description}</p>
                  </div>
                ))}
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
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[#e8e5f3] bg-white p-6 shadow-[0_18px_36px_rgba(24,31,62,0.08)]"
                  >
                    <h3 className="text-[20px] font-display font-semibold leading-[1.2] tracking-[-0.02em] text-[#171929]">
                      {item.title}
                    </h3>
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
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5">
                {montageItems.map((item, index) => (
                  <div
                    key={`${item.src}-${index}`}
                    className="overflow-hidden rounded-[20px] border border-[#e8edf8] bg-white p-1.5 shadow-[0_12px_24px_rgba(28,39,79,0.1)]"
                  >
                    <div className="overflow-hidden rounded-[14px] border border-[#e8edf8] bg-[#edf2fb]">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
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
                <Eyebrow>Next Step</Eyebrow>
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
