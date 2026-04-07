import type { Metadata } from "next";
import { Linkedin, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

type PortraitMode = "cutout" | "photo";
type FounderLayout = "imageTop" | "imageBottom";

type Founder = {
  id: string;
  cardName: string;
  fullName: string;
  role: string;
  bio: string;
  linkedin?: string;
  portrait: {
    src: string;
    mode: PortraitMode;
    objectPosition?: string;
    width?: string;
    x?: string;
    y?: string;
    tint?: number;
    softMask?: boolean;
  };
  layout: FounderLayout;
};

type TeamMember = {
  id: string;
  name: string;
  portrait?: {
    src: string;
    mode: PortraitMode;
    objectPosition?: string;
    width?: string;
    x?: string;
    y?: string;
    tint?: number;
    softMask?: boolean;
  };
};

const founders: Founder[] = [
  {
    id: "chris-panteli",
    cardName: "Chris",
    fullName: "Chris Panteli",
    role: "Co-Founder",
    bio: "Chris drives operational precision and campaign execution. He focuses on process quality, smart systems, and transparent delivery so every campaign produces measurable outcomes for clients.",
    linkedin: "https://www.linkedin.com/in/chrispanteli/",
    portrait: {
      src: "/team/chris-panteli.webp",
      mode: "cutout",
      width: "83%",
      x: "-20%",
      y: "0%",
    },
    layout: "imageBottom",
  },
  {
    id: "nick-biggs",
    cardName: "Nick",
    fullName: "Nick Biggs",
    role: "Co-Founder",
    bio: "Nick brings over a decade of digital marketing and PR expertise. He leads campaign strategy and innovation while ensuring every placement is commercially relevant and built for long-term authority.",
    linkedin: "https://www.linkedin.com/in/nick-biggs/",
    portrait: {
      src: "/team/nick-biggs.webp",
      mode: "cutout",
      width: "83%",
      x: "20%",
      y: "0%",
    },
    layout: "imageTop",
  },
];

const teamMembers: TeamMember[] = [
  {
    id: "damjan",
    name: "Damjan",
    portrait: { src: "/team/processed/damjan.webp", mode: "cutout", width: "82%", x: "-1%" },
  },
  {
    id: "roland",
    name: "Roland",
    portrait: { src: "/team/processed/roland.webp", mode: "cutout", width: "86%", x: "2%" },
  },
  {
    id: "naomi",
    name: "Naomi",
    portrait: { src: "/team/processed/naomi.webp", mode: "cutout", width: "84%" },
  },
  {
    id: "selma",
    name: "Selma",
    portrait: { src: "/team/processed/selma.webp", mode: "cutout", width: "82%" },
  },
  {
    id: "sabina",
    name: "Sabina",
    portrait: { src: "/team/Sabina.webp", mode: "cutout", width: "82%", x: "-8%" },
  },
  {
    id: "sue",
    name: "Sue",
    portrait: { src: "/team/processed/sue.webp", mode: "cutout", width: "86%" },
  },
  {
    id: "agustin",
    name: "Agustin",
    portrait: { src: "/team/agustin.webp", mode: "photo", objectPosition: "50% 21%", tint: 0.78, softMask: true },
  },
  {
    id: "dani",
    name: "Dani",
    portrait: { src: "/team/dani-b.webp", mode: "photo", objectPosition: "50% 16%", tint: 0.76, softMask: true },
  },
  {
    id: "dani-d",
    name: "Dani D",
    portrait: { src: "/team/dani-d.webp", mode: "photo", objectPosition: "50% 18%", tint: 0.82, softMask: true },
  },
  {
    id: "mateos",
    name: "Mateos",
    portrait: { src: "/team/mateos.webp", mode: "photo", objectPosition: "50% 18%", tint: 0.84, softMask: true },
  },
  {
    id: "dario",
    name: "Dario",
    portrait: { src: "/team/processed/dario.webp", mode: "cutout", width: "88%", x: "4%" },
  },
  {
    id: "sandra",
    name: "Sandra",
    portrait: { src: "/team/processed/sandra.webp", mode: "cutout", width: "82%" },
  },
  {
    id: "barbara",
    name: "Barbara",
    portrait: { src: "/team/processed/barbara.webp", mode: "cutout", width: "80%" },
  },
  {
    id: "uros",
    name: "Uros",
    portrait: { src: "/team/processed/uros.webp", mode: "cutout", width: "84%" },
  },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function PurplePortrait({
  name,
  portrait,
  className,
}: {
  name: string;
  portrait?: TeamMember["portrait"] | Founder["portrait"];
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_78%_14%,rgba(179,150,255,0.72),transparent_44%),linear-gradient(160deg,#8a67ee_0%,#7b5ee8_50%,#6f55dc_100%)] ${className}`}
    >
      {portrait ? (
        portrait.mode === "photo" ? (
          <>
            <img
              src={portrait.src}
              alt={`${name} portrait`}
              className="absolute inset-0 h-full w-full scale-[1.12] object-cover blur-[10px] [filter:brightness(0.9)_contrast(1.04)_saturate(0.76)]"
              style={{
                objectPosition: portrait.objectPosition ?? "50% 18%",
              }}
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#7e61e8_0%,#6e5adf_52%,#5f53d4_100%)] mix-blend-multiply"
              style={{ opacity: portrait.tint ?? 0.68 }}
            />
            <img
              src={portrait.src}
              alt={`${name} portrait`}
              className="absolute bottom-0 left-1/2 h-[98%] w-[86%] -translate-x-1/2 object-cover [filter:brightness(1.07)_contrast(1.05)_saturate(1.02)]"
              style={{
                objectPosition: portrait.objectPosition ?? "50% 18%",
                maskImage: portrait.softMask
                  ? "radial-gradient(ellipse 76% 88% at 50% 58%, #000 60%, rgba(0,0,0,0.92) 72%, transparent 92%)"
                  : undefined,
                WebkitMaskImage: portrait.softMask
                  ? "radial-gradient(ellipse 76% 88% at 50% 58%, #000 60%, rgba(0,0,0,0.92) 72%, transparent 92%)"
                  : undefined,
              }}
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(187,164,255,0.7),transparent_46%)]"
              style={{ opacity: portrait.softMask ? 0.48 : 0.34 }}
            />
          </>
        ) : (
          <img
            src={portrait.src}
            alt={`${name} portrait`}
            className="absolute bottom-0 left-1/2 h-auto max-h-[98%] object-contain drop-shadow-[0_18px_28px_rgba(18,11,41,0.36)]"
            style={{
              width: portrait.width ?? "84%",
              transform: `translateX(calc(-50% + ${portrait.x ?? "0%"})) translateY(${portrait.y ?? "0%"})`,
            }}
            loading="lazy"
          />
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-4xl font-display font-bold text-white/92">{initials(name) || "?"}</span>
        </div>
      )}
    </div>
  );
}

function FounderCard({ founder }: { founder: Founder }) {
  const portrait = (
    <PurplePortrait
      name={founder.fullName}
      portrait={founder.portrait}
      className="h-[15rem] sm:h-[17rem] lg:h-[18rem]"
    />
  );

  return (
    <article className="rounded-[2.2rem] border border-white/8 bg-[#0f1117] p-5 shadow-[0_24px_68px_rgba(0,0,0,0.48)] sm:p-6">
      {founder.layout === "imageTop" ? portrait : null}

      <div className={founder.layout === "imageTop" ? "mt-5" : ""}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold tracking-[-0.025em] text-white sm:text-4xl">{founder.cardName}</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{founder.role}</p>
          </div>
          {founder.linkedin ? (
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${founder.cardName} LinkedIn`}
              className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/14 text-white/82 transition-colors hover:border-white/32 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="mt-4 h-px bg-white/12" />
        <p className="mt-4 text-[0.97rem] leading-relaxed text-white/80">{founder.bio}</p>
      </div>

      {founder.layout === "imageBottom" ? <div className="mt-5">{portrait}</div> : null}
    </article>
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
      <main className="relative overflow-hidden bg-[#05060a] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(113,82,219,0.24),transparent_36%),radial-gradient(circle_at_90%_14%,rgba(117,207,255,0.12),transparent_34%)]" />

        <section className="relative">
          <SiteHeader />
          <div className="mx-auto w-full max-w-[1100px] px-6 pb-16 pt-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/88">
                <Sparkles className="h-3.5 w-3.5" />
                Linkifi Team
              </span>
              <h1 className="mt-5 text-balance text-4xl font-display font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                Meet the team.
              </h1>
            </div>

            <div className="mx-auto mt-14 grid max-w-[960px] gap-6 lg:grid-cols-2">
              {founders.map((founder) => (
                <FounderCard key={founder.id} founder={founder} />
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-[960px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/66">Team</p>
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                {teamMembers.map((member) => (
                  <article key={member.id}>
                    <PurplePortrait name={member.name} portrait={member.portrait} className="h-[10.8rem] sm:h-[11.4rem]" />
                    <p className="mt-3 text-2xl font-display font-bold tracking-[-0.02em] text-white sm:text-[1.85rem]">{member.name}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter flushTop />
    </>
  );
}
