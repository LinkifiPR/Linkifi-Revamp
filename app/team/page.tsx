import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type Founder = {
  id: string;
  name: string;
  imageSrc: string;
  objectPosition?: string;
};

type TeamMember = {
  id: string;
  name: string;
  imageSrc?: string;
  objectPosition?: string;
};

const founders: Founder[] = [
  {
    id: "chris-panteli",
    name: "Chris Panteli",
    imageSrc: "/team/chris-panteli.webp",
    objectPosition: "50% 18%",
  },
  {
    id: "nick-biggs",
    name: "Nick Biggs",
    imageSrc: "/team/nick-biggs.webp",
    objectPosition: "50% 18%",
  },
];

const teamMembers: TeamMember[] = [
  { id: "agustin", name: "Agustin", imageSrc: "/team/agustin.jpg", objectPosition: "50% 20%" },
  { id: "damjan", name: "Damjan", imageSrc: "/team/Damjan.webp", objectPosition: "50% 16%" },
  { id: "dani-b", name: "Dani", imageSrc: "/team/dani-b.png", objectPosition: "50% 16%" },
  { id: "dario", name: "Dario", imageSrc: "/team/Dario.webp", objectPosition: "50% 16%" },
  { id: "naomi", name: "Naomi", imageSrc: "/team/Naomi.webp", objectPosition: "50% 16%" },
  { id: "roland", name: "Roland", imageSrc: "/team/Roland.webp", objectPosition: "50% 16%" },
  { id: "sabina", name: "Sabina", imageSrc: "/team/Sabina.webp", objectPosition: "50% 16%" },
  { id: "sandra", name: "Sandra", imageSrc: "/team/Sandra.webp", objectPosition: "50% 16%" },
  { id: "selma", name: "Selma", imageSrc: "/team/Selma.webp", objectPosition: "50% 16%" },
  { id: "sue", name: "Sue", imageSrc: "/team/Sue.webp", objectPosition: "50% 16%" },
  { id: "barbara", name: "Barbara", imageSrc: "/team/Barbara.webp", objectPosition: "50% 16%" },
  { id: "uros", name: "Uros", imageSrc: "/team/Uros.webp", objectPosition: "50% 16%" },
  { id: "pending-one", name: "TBD" },
  { id: "pending-two", name: "TBD" },
];

function PlaceholderPortrait({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-white/18 bg-[radial-gradient(circle_at_20%_12%,rgba(129,111,255,0.4),transparent_32%),linear-gradient(140deg,#181d4b_0%,#2d2a89_52%,#1a336f_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:30px_30px] opacity-45" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-display font-bold tracking-[-0.02em] text-white/92">{initials || "?"}</span>
      </div>
    </div>
  );
}

function Portrait({ member }: { member: TeamMember | Founder }) {
  if (!member.imageSrc) {
    return <PlaceholderPortrait name={member.name} />;
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] border border-white/18 bg-[linear-gradient(170deg,#131845_0%,#1f296d_100%)]">
      <img
        src={member.imageSrc}
        alt={`${member.name} portrait`}
        className="h-full w-full object-contain object-top"
        style={{ objectPosition: member.objectPosition ?? "50% 18%" }}
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(6,9,27,0.45)_100%)]" />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Team | Linkifi",
  description: "Meet the people behind Linkifi.",
  alternates: {
    canonical: "https://linkifi.io/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <main className="bg-[radial-gradient(circle_at_18%_8%,rgba(108,91,255,0.26),transparent_30%),radial-gradient(circle_at_78%_10%,rgba(64,183,255,0.2),transparent_26%),linear-gradient(180deg,#060816_0%,#090d24_48%,#050711_100%)] pb-24 text-white">
        <section className="relative overflow-hidden">
          <SiteHeader />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="container mx-auto px-6 pb-12 pt-8 md:pb-16 md:pt-10">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Linkifi Team
              </span>
              <h1 className="mt-5 text-balance text-4xl font-display font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
                Meet The Team
              </h1>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/62">Founders</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {founders.map((founder) => (
                <article
                  key={founder.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/18 bg-[linear-gradient(165deg,rgba(15,20,56,0.92),rgba(11,15,42,0.95))] p-5 shadow-[0_28px_72px_rgba(2,5,18,0.55)]"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#6f5fff]/22 blur-3xl" />
                  <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-[#45b6ff]/18 blur-3xl" />
                  <Portrait member={founder} />
                  <div className="mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/66">Co-Founder</p>
                    <h2 className="mt-1 text-3xl font-display font-bold tracking-[-0.02em] text-white">{founder.name}</h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-14 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/62">Team</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="group overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(160deg,rgba(17,22,56,0.88),rgba(9,14,39,0.92))] p-4 shadow-[0_18px_42px_rgba(1,4,16,0.55)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <Portrait member={member} />
                  <p className="mt-3 text-xl font-display font-bold tracking-[-0.015em] text-white">{member.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
