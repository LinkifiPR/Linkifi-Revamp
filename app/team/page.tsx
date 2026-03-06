import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  areas: string[];
  imageSrc?: string;
};

const leadership: TeamMember[] = [
  {
    id: "chris",
    name: "Chris",
    role: "Co-Founder",
    bio: "Leads commercial strategy, campaign direction, and editorial positioning for high-authority growth.",
    areas: ["Campaign Strategy", "Editorial Positioning", "Growth Systems"],
  },
  {
    id: "nick",
    name: "Nick",
    role: "Co-Founder",
    bio: "Owns delivery systems, partner operations, and execution quality across every Linkifi campaign.",
    areas: ["Operations", "Delivery Quality", "Client Success"],
  },
];

const teamPods: TeamMember[] = [
  { id: "agustin", name: "Agustin", role: "PR Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/agustin.jpg" },
  { id: "damjan", name: "Damjan", role: "Digital PR Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Damjan.webp" },
  { id: "dani-b", name: "Dani B", role: "Campaign Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/dani-b.png" },
  { id: "dario", name: "Dario", role: "Outreach Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Dario.webp" },
  { id: "naomi", name: "Naomi", role: "Editorial Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Naomi.webp" },
  { id: "roland", name: "Roland", role: "Outreach Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Roland.webp" },
  { id: "sabina", name: "Sabina", role: "Content Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Sabina.webp" },
  { id: "sandra", name: "Sandra", role: "Campaign Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Sandra.webp" },
  { id: "selma", name: "Selma", role: "Campaign Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Selma.webp" },
  { id: "sue", name: "Sue", role: "Editorial QA", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Sue.webp" },
  { id: "barbara", name: "Barbara", role: "PR Specialist", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Barbara.webp" },
  { id: "uros", name: "Uros", role: "Campaign Delivery", bio: "Full profile copy coming soon.", areas: [], imageSrc: "/team/Uros.webp" },
  { id: "pending-one", name: "Name Pending", role: "Team Specialist", bio: "Awaiting final name and headshot.", areas: [] },
  { id: "pending-two", name: "Name Pending", role: "Team Specialist", bio: "Awaiting final name and headshot.", areas: [] },
];

const operatingPrinciples = [
  {
    title: "Small Pods, Fast Iteration",
    detail: "Campaign squads run in tight loops so positioning, outreach, and narrative adjustments happen quickly.",
  },
  {
    title: "Editorial-First Thinking",
    detail: "Every campaign starts from a publishable angle, then expands into link equity and measurable growth.",
  },
  {
    title: "Clear Ownership",
    detail: "Each campaign has named owners from strategy through reporting to keep momentum and accountability high.",
  },
] as const;

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function PortraitPlaceholder({ name, size = "large" }: { name: string; size?: "large" | "small" }) {
  const isLarge = size === "large";

  return (
    <div
      className={`relative overflow-hidden rounded-[1.4rem] border border-[#d8d4ff] ${
        isLarge ? "h-48" : "h-28"
      } bg-[radial-gradient(circle_at_20%_18%,rgba(106,94,255,0.42),transparent_38%),linear-gradient(140deg,#221e5a_0%,#4335bf_56%,#2a5fff_100%)]`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`${isLarge ? "text-5xl" : "text-3xl"} font-display font-bold text-white/92`}>
          {getInitials(name)}
        </span>
      </div>
    </div>
  );
}

function TeamPortrait({ member, size = "large" }: { member: TeamMember; size?: "large" | "small" }) {
  const isLarge = size === "large";

  if (!member.imageSrc) {
    return <PortraitPlaceholder name={member.name} size={size} />;
  }

  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border border-[#d8d4ff] ${isLarge ? "h-48" : "h-28"} bg-[#eceefe]`}
    >
      <img src={member.imageSrc} alt={`${member.name} portrait`} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Team | Linkifi",
  description: "Meet the strategists, operators, and specialists behind Linkifi campaigns.",
  alternates: {
    canonical: "https://linkifi.io/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <main className="bg-[linear-gradient(180deg,#f2f4fb_0%,#f8f9fd_34%,#ffffff_100%)] pb-24 text-[#141735]">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_16%_18%,rgba(120,105,255,0.3),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(56,184,255,0.14),transparent_24%),linear-gradient(135deg,#0d112b_0%,#281f96_44%,#14183a_100%)] text-white">
          <SiteHeader />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="container mx-auto px-6 pb-12 pt-8 md:pb-16 md:pt-10">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                The Team Behind The Campaigns
              </span>
              <h1 className="mt-5 text-balance text-4xl font-display font-bold leading-[1.04] tracking-[-0.03em] md:text-6xl">
                Meet The Linkifi Team
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/84 md:text-lg">
                This is the upgraded team page skeleton. We will slot in final portraits and richer bios next.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-10 px-6 md:mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6c66a5]">Leadership</p>
              <h2 className="mt-2 text-3xl font-display font-bold tracking-[-0.02em] text-[#171a40] md:text-4xl">
                Founders & Campaign Direction
              </h2>
            </div>
            <span className="hidden rounded-full border border-[#d9dfff] bg-[#f4f7ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#495189] md:inline-flex">
              Visual placeholders active
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {leadership.map((member) => (
              <article
                key={member.id}
                className="overflow-hidden rounded-[2rem] border border-[#dcd9ff] bg-white p-6 shadow-[0_22px_52px_rgba(26,22,78,0.1)]"
              >
                <TeamPortrait member={member} />
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6e68a8]">{member.role}</p>
                  <h3 className="mt-2 text-3xl font-display font-bold tracking-[-0.02em] text-[#14163b]">{member.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4a5077]">{member.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.areas.map((area) => (
                      <span
                        key={area}
                        className="rounded-full border border-[#d8ddf7] bg-[#f5f7ff] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#394175]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto mt-12 px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6c66a5]">Campaign Pods</p>
          <h2 className="mt-2 text-3xl font-display font-bold tracking-[-0.02em] text-[#171a40] md:text-4xl">
            Specialists Across Outreach, Editorial, And Delivery
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamPods.map((member) => (
              <article
                key={member.id}
                className="rounded-[1.6rem] border border-[#e3e0ff] bg-white p-4 shadow-[0_14px_36px_rgba(26,22,78,0.08)]"
              >
                <TeamPortrait member={member} size="small" />
                <p className="mt-3 text-lg font-display font-bold text-[#14163b]">{member.name}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6863a4]">{member.role}</p>
                <p className="mt-2 text-sm text-[#545b83]">{member.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto mt-12 px-6">
          <div className="rounded-[2rem] border border-[#d9d6ff] bg-[linear-gradient(135deg,#f7f5ff,#ffffff)] p-7 shadow-[0_20px_46px_rgba(26,22,78,0.08)] md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6c66a5]">How We Operate</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {operatingPrinciples.map((principle) => (
                <article key={principle.title} className="rounded-[1.3rem] border border-[#e3e7fb] bg-white p-5">
                  <h3 className="text-xl font-display font-bold tracking-[-0.01em] text-[#14163b]">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4f567d]">{principle.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-12 px-6">
          <div className="rounded-[2rem] border border-[#d4d0ff] bg-[radial-gradient(circle_at_18%_18%,rgba(120,105,255,0.2),transparent_30%),linear-gradient(135deg,#ffffff_0%,#f7f6ff_62%,#f2f8ff_100%)] px-7 py-8 md:px-10">
            <h2 className="text-3xl font-display font-bold tracking-[-0.02em] text-[#161942] md:text-4xl">
              Team visuals are next
            </h2>
            <p className="mt-3 max-w-2xl text-base text-[#4e567f]">
              Send over the portraits and we will replace every placeholder with polished cards, social links, and full profile content.
            </p>
            <div className="mt-6">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#161a3e] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#101333]"
              >
                Start The Final Team Build
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
