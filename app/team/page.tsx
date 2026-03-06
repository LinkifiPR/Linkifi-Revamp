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
    objectPosition: "50% 16%",
  },
];

const teamMembers: TeamMember[] = [
  { id: "agustin", name: "Agustin", imageSrc: "/team/agustin.jpg", objectPosition: "50% 18%" },
  { id: "damjan", name: "Damjan", imageSrc: "/team/Damjan.webp", objectPosition: "50% 16%" },
  { id: "dani", name: "Dani", imageSrc: "/team/dani-b.png", objectPosition: "50% 16%" },
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
  const frameClass = founder ? "rounded-[1.5rem] p-2.5" : "rounded-[1.2rem] p-2";
  const ratioClass = founder ? "aspect-[4/5]" : "aspect-[4/5]";

  return (
    <div className={`${shellClass} bg-[linear-gradient(150deg,rgba(163,153,255,0.85),rgba(99,195,255,0.7),rgba(180,166,255,0.82))]`}>
      <div
        className={`${frameClass} ${ratioClass} overflow-hidden bg-[radial-gradient(circle_at_24%_12%,rgba(138,122,255,0.55),transparent_35%),radial-gradient(circle_at_82%_8%,rgba(113,207,255,0.35),transparent_30%),linear-gradient(145deg,#3a2ca2_0%,#2f3193_46%,#273a88_100%)]`}
      >
        {person.imageSrc ? (
          <img
            src={person.imageSrc}
            alt={`${person.name} headshot`}
            className="h-full w-full object-contain object-top"
            style={{
              objectPosition: person.objectPosition ?? "50% 16%",
              filter: "brightness(1.09) contrast(1.06) saturate(1.08)",
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
      <main className="bg-[radial-gradient(circle_at_14%_-4%,rgba(141,119,255,0.5),transparent_36%),radial-gradient(circle_at_88%_4%,rgba(82,200,255,0.42),transparent_34%),linear-gradient(180deg,#1a1f4a_0%,#161b3f_42%,#121735_100%)] pb-24 text-white">
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
                  className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-[linear-gradient(160deg,rgba(35,38,94,0.9),rgba(28,32,80,0.94))] p-5 shadow-[0_24px_58px_rgba(7,10,34,0.45)]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-10 h-36 w-36 rounded-full bg-[#7867ff]/32 blur-3xl" />
                  <div className="pointer-events-none absolute -left-10 bottom-2 h-32 w-32 rounded-full bg-[#4ec2ff]/26 blur-3xl" />
                  <Headshot person={founder} founder />
                  <div className="relative mt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/68">Co-Founder</p>
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
                  className="overflow-hidden rounded-[1.45rem] border border-white/16 bg-[linear-gradient(160deg,rgba(30,34,86,0.86),rgba(24,28,72,0.92))] p-3.5 shadow-[0_16px_38px_rgba(5,8,27,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
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
