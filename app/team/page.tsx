import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type Founder = {
  id: string;
  name: string;
  imageSrc: string;
  objectPosition?: string;
  zoom?: number;
  offsetY?: string;
};

type TeamMember = {
  id: string;
  name: string;
  imageSrc?: string;
  objectPosition?: string;
  zoom?: number;
  offsetY?: string;
};

const founders: Founder[] = [
  {
    id: "chris-panteli",
    name: "Chris Panteli",
    imageSrc: "/team/chris-panteli.webp",
    objectPosition: "50% 6%",
    zoom: 0.88,
    offsetY: "10%",
  },
  {
    id: "nick-biggs",
    name: "Nick Biggs",
    imageSrc: "/team/nick-biggs.webp",
    objectPosition: "50% 7%",
    zoom: 0.86,
    offsetY: "10%",
  },
];

const teamMembers: TeamMember[] = [
  { id: "agustin", name: "Agustin", imageSrc: "/team/agustin.jpg", objectPosition: "50% 12%", zoom: 1.08 },
  { id: "damjan", name: "Damjan", imageSrc: "/team/Damjan.webp", objectPosition: "50% 4%", zoom: 1.32 },
  { id: "dani", name: "Dani", imageSrc: "/team/dani-b.png", objectPosition: "50% 8%", zoom: 1.26 },
  { id: "dario", name: "Dario", imageSrc: "/team/Dario.webp", objectPosition: "50% 5%", zoom: 1.24 },
  { id: "naomi", name: "Naomi", imageSrc: "/team/Naomi.webp", objectPosition: "50% 5%", zoom: 1.22 },
  { id: "roland", name: "Roland", imageSrc: "/team/Roland.webp", objectPosition: "50% 5%", zoom: 1.24 },
  { id: "sabina", name: "Sabina", imageSrc: "/team/Sabina.webp", objectPosition: "50% 5%", zoom: 1.23 },
  { id: "sandra", name: "Sandra", imageSrc: "/team/Sandra.webp", objectPosition: "50% 5%", zoom: 1.23 },
  { id: "selma", name: "Selma", imageSrc: "/team/Selma.webp", objectPosition: "50% 4%", zoom: 1.22 },
  { id: "sue", name: "Sue", imageSrc: "/team/Sue.webp", objectPosition: "50% 5%", zoom: 1.2 },
  { id: "barbara", name: "Barbara", imageSrc: "/team/Barbara.webp", objectPosition: "50% 5%", zoom: 1.21 },
  { id: "uros", name: "Uros", imageSrc: "/team/Uros.webp", objectPosition: "50% 4%", zoom: 1.21 },
  { id: "mateos", name: "Mateos", imageSrc: "/team/mateos.jpg", objectPosition: "50% 10%", zoom: 1.06 },
  { id: "pending-one", name: "TBD" },
  { id: "pending-two", name: "TBD" },
];

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function Headshot({ person, founder = false }: { person: Founder | TeamMember; founder?: boolean }) {
  const shellClass = founder ? "rounded-[1.55rem] p-[1px]" : "rounded-[1.25rem] p-[1px]";
  const frameClass = founder ? "rounded-[1.5rem]" : "rounded-[1.2rem]";
  const ratioClass = founder ? "aspect-[9/10]" : "aspect-[4/5]";
  const translateY = person.offsetY ?? "0%";

  return (
    <div className={`${shellClass} bg-[linear-gradient(145deg,#ebe8ff,#95e0ff,#dfd6ff)]`}>
      <div className={`${frameClass} ${ratioClass} relative overflow-hidden bg-[radial-gradient(circle_at_24%_12%,rgba(168,148,255,0.64),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(118,214,255,0.4),transparent_32%),linear-gradient(158deg,#6f64ea_0%,#5861d2_52%,#4c66c2_100%)]`}>
        {person.imageSrc ? (
          <img
            src={person.imageSrc}
            alt={`${person.name} headshot`}
            className="h-full w-full object-cover"
            style={{
              objectPosition: person.objectPosition ?? "50% 10%",
              transform: `translateY(${translateY}) scale(${person.zoom ?? 1})`,
              transformOrigin: "center top",
              filter: "brightness(1.1) contrast(1.03) saturate(1.06)",
            }}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-display font-bold text-white/92">{initialsFromName(person.name) || "?"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Team | Linkifi",
  description: "Meet the team behind Linkifi.",
  alternates: {
    canonical: "https://linkifi.io/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <main className="bg-[radial-gradient(circle_at_14%_-4%,rgba(190,173,255,0.46),transparent_34%),radial-gradient(circle_at_88%_4%,rgba(132,221,255,0.4),transparent_34%),linear-gradient(180deg,#344784_0%,#2f4177_42%,#2a3a6c_100%)] pb-24 text-white">
        <section className="relative overflow-hidden">
          <SiteHeader />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="container mx-auto px-6 pb-10 pt-8 md:pb-12 md:pt-10">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Linkifi Team
              </span>
              <h1 className="mt-5 text-balance text-4xl font-display font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
                Meet the team.
              </h1>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">Founders</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {founders.map((founder) => (
                <article
                  key={founder.id}
                  className="relative overflow-hidden rounded-[2rem] border border-white/28 bg-[linear-gradient(160deg,rgba(71,84,157,0.68),rgba(59,72,139,0.8))] p-5 shadow-[0_24px_58px_rgba(24,33,86,0.28)]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-10 h-36 w-36 rounded-full bg-[#7867ff]/22 blur-3xl" />
                  <div className="pointer-events-none absolute -left-10 bottom-2 h-32 w-32 rounded-full bg-[#4ec2ff]/20 blur-3xl" />
                  <Headshot person={founder} founder />
                  <div className="relative mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78">Co-Founder</p>
                    <h2 className="mt-1 text-3xl font-display font-bold tracking-[-0.02em] text-white">{founder.name}</h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-14 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65">Team</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="overflow-hidden rounded-[1.45rem] border border-white/22 bg-[linear-gradient(160deg,rgba(60,71,139,0.72),rgba(50,60,124,0.82))] p-3.5 shadow-[0_16px_38px_rgba(18,27,70,0.24)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Headshot person={member} />
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
