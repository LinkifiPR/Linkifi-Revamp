"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCopy,
  Globe,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export type ContactPageContext = {
  service?: string;
  packageName?: string;
  program?: string;
};

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  service: string;
  brief: string;
};

const BOOKING_URL = "https://book.linkifi.io/widget/bookings/pr-discovery-call";
const CALENDLY_URL = "https://calendly.com/linkifi/15min";

const publicationLogos = [
  {
    src: "/publication-logos/forbes.png",
    alt: "Forbes",
    width: 280,
    height: 90,
    className: "h-7 w-auto",
  },
  {
    src: "/publication-logos/bbc.svg",
    alt: "BBC",
    width: 112,
    height: 40,
    className: "h-6 w-auto",
  },
  {
    src: "/publication-logos/guardian.png",
    alt: "The Guardian",
    width: 320,
    height: 95,
    className: "h-7 w-auto",
  },
  {
    src: "/publication-logos/healthline.png",
    alt: "Healthline",
    width: 360,
    height: 70,
    className: "h-7 w-auto",
  },
] as const;

const routeCards = [
  {
    title: "Book a PR discovery call",
    description: "The fastest path if you already know you want to talk through campaign fit, timelines, and the best service path.",
    href: BOOKING_URL,
    label: "Open booking",
    icon: CalendarDays,
    accentClass:
      "border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(124,92,255,0.14))] text-white",
  },
  {
    title: "Take a quick 15-minute intro",
    description: "Use the short Calendly option if you want a lighter first conversation before a deeper strategy session.",
    href: CALENDLY_URL,
    label: "Open Calendly",
    icon: Sparkles,
    accentClass:
      "border-[#e4def6] bg-[linear-gradient(145deg,#fbfaff_0%,#f0edff_100%)] text-[#1f2241]",
  },
  {
    title: "Message via the live chat widget",
    description: "The site-wide chat is already live, so you can send context there any time if you prefer a written first touch.",
    href: "#brief-builder",
    label: "Use the brief builder",
    icon: MessageSquareText,
    accentClass:
      "border-[#e4def6] bg-[linear-gradient(145deg,#ffffff_0%,#f7f5ff_100%)] text-[#1f2241]",
  },
] as const;

const faqItems = [
  {
    value: "what-should-i-share",
    question: "What should I bring to the call?",
    answer:
      "A homepage URL, the product or service you need authority around, and any target outcomes you care about most. The brief builder on this page helps you package that up in a way that is easy to carry into the call.",
  },
  {
    value: "service-fit",
    question: "Can we discuss SEO Digital PR versus Authority PR?",
    answer:
      "Yes. If you arrived here from a service page, we keep that context visible, but the call can still be used to compare both options and decide which one best matches your goals.",
  },
  {
    value: "package-context",
    question: "Will you know which package or program I clicked from?",
    answer:
      "Yes. Package and program query params are surfaced on this page so the selected offer is not lost when someone comes in from a CTA on another page.",
  },
] as const;

function formatSlug(value: string | undefined): string {
  if (!value) {
    return "";
  }

  const dictionary: Record<string, string> = {
    ai: "AI",
    pr: "PR",
    seo: "SEO",
    url: "URL",
  };

  return value
    .split("-")
    .filter(Boolean)
    .map((part) => dictionary[part.toLowerCase()] ?? `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

function normalizeService(service: string | undefined): string {
  if (!service) {
    return "General enquiry";
  }

  if (service === "seo-digital-pr") {
    return "SEO Digital PR";
  }

  if (service === "authority-pr") {
    return "Authority PR";
  }

  return formatSlug(service);
}

function buildInitialBrief(serviceLabel: string, selectedOffer: string): string {
  const intro = selectedOffer
    ? `We are exploring ${selectedOffer} under ${serviceLabel} and want to understand fit, timing, and expected authority impact.`
    : `We want to explore how Linkifi can support our authority growth and digital PR goals.`;

  return `${intro}\n\nOur main objective is:\nOur ideal publications or authority targets are:\nAny constraints or launch timing to know:`;
}

function buildBriefText(form: ContactFormState, selectedOffer: string): string {
  const lines = [
    "Linkifi discovery brief",
    `Name: ${form.name || "Not provided"}`,
    `Email: ${form.email || "Not provided"}`,
    `Company: ${form.company || "Not provided"}`,
    `Website: ${form.website || "Not provided"}`,
    `Service interest: ${form.service || "General enquiry"}`,
    `Selected offer: ${selectedOffer || "Not specified"}`,
    "",
    "Campaign notes:",
    form.brief || "Not provided",
  ];

  return lines.join("\n");
}

export function ContactPageClient({ initialContext }: { initialContext: ContactPageContext }) {
  const selectedService = normalizeService(initialContext.service);
  const selectedOffer = formatSlug(initialContext.packageName ?? initialContext.program);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    website: "",
    service: selectedService,
    brief: buildInitialBrief(selectedService, selectedOffer),
  });

  const briefText = buildBriefText(form, selectedOffer);
  const summaryItems = [
    {
      label: "Service",
      value: form.service || "General enquiry",
    },
    {
      label: "Selected offer",
      value: selectedOffer || "Open discovery call",
    },
    {
      label: "Website",
      value: form.website || "Add your domain before the call",
    },
  ];

  async function handleCopyBrief() {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#060816] text-white">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_18%_0%,rgba(118,100,255,0.32),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(76,178,255,0.2),transparent_26%),linear-gradient(180deg,#070a1c_0%,#0a1027_58%,#0c1227_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_52%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-[10rem] h-[18rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />

        <SiteHeader />

        <main>
          <section className="pb-20 pt-10">
            <div className="container mx-auto px-6">
              <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/78">
                    <Sparkles className="h-4 w-4 text-[#b7a4ff]" />
                    Contact Linkifi
                  </div>

                  <h1 className="mt-6 max-w-3xl text-[3.25rem] font-display font-bold leading-[0.94] tracking-[-0.05em] text-white sm:text-[4.2rem]">
                    Turn your next campaign brief into authority momentum.
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">
                    Share the essentials, keep your selected service context intact, and move straight into a
                    discovery call built around real editorial outcomes.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/16 bg-white/7 px-4 py-2 text-sm font-semibold text-white/88">
                      {selectedService}
                    </span>
                    {selectedOffer ? (
                      <span className="rounded-full border border-[#bcaeff]/24 bg-[#7c5cff]/14 px-4 py-2 text-sm font-semibold text-[#d8d0ff]">
                        {selectedOffer}
                      </span>
                    ) : null}
                    <span className="rounded-full border border-white/14 bg-white/6 px-4 py-2 text-sm font-semibold text-white/72">
                      Discovery-ready brief builder
                    </span>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Button
                      asChild
                      className="h-auto rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#15162b] shadow-[0_20px_44px_rgba(10,12,32,0.45)] hover:bg-[#f3f1ff]"
                    >
                      <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                        Book Discovery Call
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-auto rounded-full border-white/18 bg-white/6 px-6 py-3 text-sm font-semibold text-white hover:bg-white/12 hover:text-white"
                    >
                      <Link href="#brief-builder">Build Your Brief</Link>
                    </Button>
                  </div>

                  <div className="mt-14 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_24px_68px_rgba(4,7,24,0.38)] backdrop-blur-sm sm:p-7">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                          Trusted media environments
                        </p>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
                          Linkifi campaigns are designed for brands that need authority signals serious enough
                          to belong in top-tier editorial ecosystems.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#0f1535]/66 px-4 py-2 text-sm font-semibold text-white/84">
                        <ShieldCheck className="h-4 w-4 text-[#b9abff]" />
                        Selected service and offer stay in view
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-5">
                      {publicationLogos.map((logo) => (
                        <Image
                          key={logo.alt}
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          className={`${logo.className} opacity-90 brightness-[0] invert`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.2rem] border border-white/12 bg-[linear-gradient(150deg,rgba(14,19,47,0.96),rgba(10,14,36,0.92))] p-6 shadow-[0_28px_72px_rgba(3,6,23,0.56)] sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
                        Pick your route
                      </p>
                      <h2 className="mt-3 text-3xl font-display font-bold tracking-[-0.03em] text-white">
                        Reach out without losing momentum.
                      </h2>
                    </div>
                    <div className="rounded-2xl border border-white/12 bg-white/6 p-3">
                      <MessageSquareText className="h-6 w-6 text-[#b7a4ff]" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {routeCards.map((route) => {
                      const Icon = route.icon;

                      return (
                        <a
                          key={route.title}
                          href={route.href}
                          target={route.href.startsWith("http") ? "_blank" : undefined}
                          rel={route.href.startsWith("http") ? "noreferrer" : undefined}
                          className={`group block rounded-[1.6rem] border p-5 transition-transform duration-300 hover:-translate-y-1 ${route.accentClass}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="max-w-sm">
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-current/10 bg-white/10">
                                <Icon className="h-5 w-5" />
                              </div>
                              <h3 className="mt-4 text-xl font-display font-bold tracking-[-0.025em]">
                                {route.title}
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-current/76">{route.description}</p>
                            </div>
                            <ArrowRight className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>

                          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                            {route.label}
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </a>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/52">What to expect</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-white/74">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#b9abff]" />
                        A direct booking path into Linkifi&apos;s live PR discovery calendar.
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#b9abff]" />
                        Your chosen service, package, or program context stays visible from the first click.
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#b9abff]" />
                        A short brief builder so your goals are easier to carry into the conversation.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <section
        id="brief-builder"
        className="bg-[radial-gradient(circle_at_12%_18%,rgba(151,132,255,0.08),transparent_32%),linear-gradient(180deg,#f7f4ff_0%,#f3f7ff_100%)]"
      >
        <div className="container mx-auto px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[2.2rem] border border-[#ddd8ef] bg-white p-6 text-[#191b33] shadow-[0_24px_60px_rgba(76,77,115,0.12)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e7091]">Brief builder</p>
                  <h2 className="mt-3 text-3xl font-display font-bold tracking-[-0.03em] text-[#15162b]">
                    Show up to the call with the right context already lined up.
                  </h2>
                </div>
                <div className="hidden rounded-2xl border border-[#ebe6fb] bg-[linear-gradient(145deg,#f7f3ff_0%,#edf2ff_100%)] p-3 sm:block">
                  <Globe className="h-6 w-6 text-[#6f5dff]" />
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-[#414467]">Name</span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Your name"
                    className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-[#fbfaff] px-4 text-sm text-[#191b33] outline-none transition-colors focus:border-[#8f7fff]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#414467]">Work email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="name@company.com"
                    className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-[#fbfaff] px-4 text-sm text-[#191b33] outline-none transition-colors focus:border-[#8f7fff]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#414467]">Company</span>
                  <input
                    value={form.company}
                    onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                    placeholder="Your company"
                    className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-[#fbfaff] px-4 text-sm text-[#191b33] outline-none transition-colors focus:border-[#8f7fff]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-[#414467]">Website</span>
                  <input
                    value={form.website}
                    onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                    placeholder="https://your-site.com"
                    className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-[#fbfaff] px-4 text-sm text-[#191b33] outline-none transition-colors focus:border-[#8f7fff]"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-semibold text-[#414467]">Service interest</span>
                <select
                  value={form.service}
                  onChange={(event) => setForm((prev) => ({ ...prev, service: event.target.value }))}
                  className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-[#fbfaff] px-4 text-sm text-[#191b33] outline-none transition-colors focus:border-[#8f7fff]"
                >
                  <option>General enquiry</option>
                  <option>SEO Digital PR</option>
                  <option>Authority PR</option>
                </select>
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-semibold text-[#414467]">Campaign brief</span>
                <textarea
                  value={form.brief}
                  onChange={(event) => setForm((prev) => ({ ...prev, brief: event.target.value }))}
                  rows={8}
                  className="mt-2 w-full rounded-[1.6rem] border border-[#ddd7ef] bg-[#fbfaff] px-4 py-4 text-sm leading-7 text-[#191b33] outline-none transition-colors focus:border-[#8f7fff]"
                />
              </label>

              <div className="mt-5 grid gap-3 rounded-[1.6rem] border border-[#e7e1f7] bg-[linear-gradient(145deg,#fcfbff_0%,#f4f6ff_100%)] p-4 sm:grid-cols-3">
                {summaryItems.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white bg-white/84 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a7c98]">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#1d1f39]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="h-auto rounded-full bg-[#14162d] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(20,22,45,0.18)] hover:bg-[#20254d]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    Start Discovery Call
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyBrief}
                  className="h-auto rounded-full border-[#d7d1ee] bg-white px-6 py-3 text-sm font-semibold text-[#232645] hover:bg-[#f5f2ff]"
                >
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  {copyState === "copied"
                    ? "Brief copied"
                    : copyState === "error"
                      ? "Copy failed"
                      : "Copy brief"}
                </Button>
              </div>

              <p className="mt-4 text-sm leading-7 text-[#5f6283]">
                Use the copied brief in the booking form notes, or start with the live chat widget if you want to message first.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2.2rem] border border-[#d9d2ee] bg-[linear-gradient(145deg,#0f1227_0%,#171c3b_100%)] p-6 text-white shadow-[0_24px_60px_rgba(14,17,39,0.32)] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/56">Campaign preview</p>
                <h2 className="mt-3 text-3xl font-display font-bold tracking-[-0.03em] text-white">
                  A cleaner handoff from page click to strategy conversation.
                </h2>

                <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/6 p-5">
                  <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-white/78">
                    {briefText}
                  </pre>
                </div>
              </div>

              <div className="rounded-[2.2rem] border border-[#ddd7ef] bg-white p-6 text-[#191b33] shadow-[0_20px_48px_rgba(76,77,115,0.12)] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e7091]">What happens next</p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-[1.5rem] border border-[#ece7fa] bg-[#fbfaff] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7a7c98]">Step 1</p>
                    <p className="mt-2 text-lg font-display font-bold text-[#15162b]">Bring your offer and goals</p>
                    <p className="mt-2 text-sm leading-7 text-[#5f6283]">
                      Keep the service and offer that brought you here, or pivot during the call if the better fit is elsewhere.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#ece7fa] bg-[#fbfaff] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7a7c98]">Step 2</p>
                    <p className="mt-2 text-lg font-display font-bold text-[#15162b]">Pressure-test campaign fit</p>
                    <p className="mt-2 text-sm leading-7 text-[#5f6283]">
                      Use the discovery call to align around authority goals, editorial opportunities, and what a smart next move looks like.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#ece7fa] bg-[#fbfaff] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#7a7c98]">Step 3</p>
                    <p className="mt-2 text-lg font-display font-bold text-[#15162b]">Move with a better brief</p>
                    <p className="mt-2 text-sm leading-7 text-[#5f6283]">
                      After the call, Linkifi has the right context to map the most relevant package, program, or authority path.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.2rem] border border-[#dcd6ef] bg-[linear-gradient(145deg,#ffffff_0%,#f8f6ff_100%)] p-6 text-[#191b33] shadow-[0_20px_48px_rgba(76,77,115,0.12)] sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-[1.4rem] border border-[#ebe6fb] bg-[#f3f0ff]">
                    <Image
                      src="/testimonial-jon-dykstra.webp"
                      alt="Jon Dykstra"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold leading-tight tracking-[-0.02em] text-[#161833]">
                      “The outcome is excellent, and the process of working with Linkifi is excellent.”
                    </p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#7a7c98]">
                      Jon Dykstra, FatStacksBlog
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e7091]">FAQs</p>
              <h2 className="mt-4 max-w-md text-4xl font-display font-bold tracking-[-0.04em] text-[#15162b]">
                Answers before the conversation starts.
              </h2>
              <p className="mt-4 max-w-md text-base leading-8 text-[#5f6283]">
                If you want to know how the first conversation works, what context to bring, or whether your
                service selection can evolve, the essentials are all here.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#ddd7ef] bg-[#fbfaff] p-4 shadow-[0_18px_42px_rgba(76,77,115,0.1)] sm:p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem key={item.value} value={item.value} className="border-b border-[#e7e1f7]">
                    <AccordionTrigger className="text-left text-lg font-display font-bold text-[#191b33] hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-[#5f6283]">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter flushTop />
    </div>
  );
}
