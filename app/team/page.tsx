import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type PortraitFit = "cutout" | "cover";

type Founder = {
  id: string;
  name: string;
  imageSrc: string;
  fit: PortraitFit;
  imageWidth?: string;
  imageY?: string;
  objectPosition?: string;
};

type TeamMember = {
  id: string;
  name: string;
  imageSrc?: string;
  fit?: PortraitFit;
  imageWidth?: string;
  imageY?: string;
  objectPosition?: string;
};

const founders: Founder[] = [
  {
    id: "chris-panteli",
    name: "Chris Panteli",
    imageSrc: "/team/processed/chris-panteli.webp",
    fit: "cutout",
    imageWidth: "64%",
    imageY: "0%",
  },
  {
    id: "nick-biggs",
    name: "Nick Biggs",
    imageSrc: "/team/processed/nick-biggs.webp",
    fit: "cutout",
    imageWidth: "63%",
    imageY: "0%",
  },
];

const teamMembers: TeamMember[] = [
  { id: "agustin", name: "Agustin", imageSrc: "/team/agustin.jpg", fit: "cover", objectPosition: "50% 22%" },
  { id: "damjan", name: "Damjan", imageSrc: "/team/processed/damjan.webp", fit: "cutout", imageWidth: "86%" },
  { id: "dani", name: "Dani", imageSrc: "/team/dani-b.png", fit: "cover", objectPosition: "50% 16%" },
  { id: "dario", name: "Dario", imageSrc: "/team/processed/dario.webp", fit: "cutout", imageWidth: "92%" },
  { id: "mateos", name: "Mateos", imageSrc: "/team/mateos.jpg", fit: "cover", objectPosition: "50% 18%" },
  { id: "naomi", name: "Naomi", imageSrc: "/team/processed/naomi.webp", fit: "cutout", imageWidth: "89%" },
  { id: "roland", name: "Roland", imageSrc: "/team/processed/roland.webp", fit: "cutout", imageWidth: "88%" },
  { id: "sabina", name: "Sabina", imageSrc: "/team/processed/sabina.webp", fit: "cutout", imageWidth: "88%" },
  { id: "sandra", name: "Sandra", imageSrc: "/team/processed/sandra.webp", fit: "cutout", imageWidth: "88%" },
  { id: "selma", name: "Selma", imageSrc: "/team/processed/selma.webp", fit: "cutout", imageWidth: "88%" },
  { id: "sue", name: "Sue", imageSrc: "/team/processed/sue.webp", fit: "cutout", imageWidth: "88%" },
  { id: "barbara", name: "Barbara", imageSrc: "/team/processed/barbara.webp", fit: "cutout", imageWidth: "84%" },
  { id: "uros", name: "Uros", imageSrc: "/team/processed/uros.webp", fit: "cutout", imageWidth: "90%" },
  { id: "pending-one", name: "TBD" },
  { id: "pending-two", name: "TBD" },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function PortraitStage({ person, founder = false }: { person: Founder | TeamMember; founder?: boolean }) {
  const fit = person.fit ?? "cutout";

  return (
    <div className={`rounded-[1.25rem] p-[1px] ${founder ? "rounded-[1.4rem]" : ""} bg-[linear-gradient(150deg,rgba(194,183,255,0.94),rgba(121,219,255,0.9),rgba(210,196,255,0.92))]`}>
      <div
        className={`relative overflow-hidden rounded-[1.2rem] ${
          founder ? "aspect-[5/4]" : "aspect-[4/5]"
        } bg-[radial-gradient(circle_at_20%_14%,rgba(166,145,255,0.66),transparent_34%),radial-gradient(circle_at_82%_10%,rgba(128,219,255,0.46),transparent_34%),linear-gradient(160deg,#6c62e9_0%,#5964d2_52%,#4c69be_100%)]`}
      >
        {person.imageSrc ? (
          fit === "cover" ? (
            <img
              src={person.imageSrc}
              alt={`${person.name} portrait`}
              className="h-full w-full object-cover"
              style={{ objectPosition: person.objectPosition ?? "50% 20%" }}
              loading="lazy"
            />
          ) : (
            <img
              src={person.imageSrc}
              alt={`${person.name} portrait`}
              className="absolute bottom-0 left-1/2 h-auto max-h-[97%] -translate-x-1/2 object-contain drop-shadow-[0_18px_28px_rgba(22,22,78,0.36)]"
              style={{
                width: person.imageWidth ?? (founder ? "64%" : "88%"),
                transform: `translateX(-50%) translateY(${person.imageY ?? "0%"})`,
                filter: "brightness(1.08) contrast(1.04) saturate(1.06)",
              }}
              loading="lazy"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-display font-bold text-white/92">{initials(person.name) || "?"}</span>
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
      <main className="bg-[radial-gradient(circle_at_16%_-4%,rgba(196,175,255,0.44),transparent_34%),radial-gradient(circle_at_88%_4%,rgba(142,224,255,0.38),transparent_34%),linear-gradient(180deg,#384a87_0%,#2f4076_44%,#2a396a_100%)] pb-10 text-white">
        <section className="relative overflow-hidden">
          <SiteHeader />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="container mx-auto px-6 pb-10 pt-8 md:pb-12 md:pt-10">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Founders</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {founders.map((founder) => (
                <article
                  key={founder.id}
                  className="relative overflow-hidden rounded-[2rem] border border-white/24 bg-[linear-gradient(165deg,rgba(79,93,170,0.62),rgba(64,79,148,0.72))] p-4 shadow-[0_24px_58px_rgba(22,32,84,0.24)]"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#7f6eff]/18 blur-3xl" />
                  <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-[#69cfff]/16 blur-3xl" />
                  <PortraitStage person={founder} founder />
                  <div className="mt-3 px-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78">Co-Founder</p>
                    <h2 className="mt-1 text-3xl font-display font-bold tracking-[-0.02em] text-white">{founder.name}</h2>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto mt-12 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Team</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member) => (
                <article
                  key={member.id}
                  className="overflow-hidden rounded-[1.4rem] border border-white/20 bg-[linear-gradient(165deg,rgba(66,80,151,0.64),rgba(52,66,129,0.74))] p-3 shadow-[0_14px_34px_rgba(18,27,70,0.24)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <PortraitStage person={member} />
                  <p className="mt-3 px-1 text-xl font-display font-bold tracking-[-0.015em] text-white">{member.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
