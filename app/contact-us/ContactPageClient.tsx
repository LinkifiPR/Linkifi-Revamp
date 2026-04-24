"use client";

import Script from "next/script";
import { CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { ChatWidget } from "@/components/site/ChatWidget";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type ContactPageContext = {
  service?: string;
  packageName?: string;
  program?: string;
};

type ContactPageClientProps = {
  initialContext: ContactPageContext;
};

const GHL_FORM_URL = "https://book.linkifi.io/widget/form/KFBG3jsCxHxKTdzgOici";
const GHL_FORM_ID = "KFBG3jsCxHxKTdzgOici";
const GHL_IFRAME_ID = "inline-KFBG3jsCxHxKTdzgOici";
const BOOKING_IFRAME_ID = "R5FU8aNuJJQCDOGyD6j1_1774199086592";
const BOOKING_WIDGET_URL = "https://book.linkifi.io/widget/booking/R5FU8aNuJJQCDOGyD6j1";

const faqItems = [
  {
    value: "speed",
    question: "How quickly can we get started?",
    answer:
      "Most teams begin with either the embedded enquiry form or a discovery call. Once context is clear, Linkifi can outline the next best campaign path quickly.",
  },
  {
    value: "service-fit",
    question: "Can we still change direction if we came from a specific package page?",
    answer:
      "Yes. Service and package context are useful starting points, but strategy can still be adjusted after reviewing your goals and current authority profile.",
  },
  {
    value: "what-to-share",
    question: "What details help the first conversation most?",
    answer:
      "Share your main website, your commercial priorities, and the outcomes you care about most. That gives enough signal to make the first conversation actionable.",
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

export function ContactPageClient({ initialContext }: ContactPageClientProps) {
  const selectedService = normalizeService(initialContext.service);
  const selectedOffer = formatSlug(initialContext.packageName ?? initialContext.program);
  const contextTags = [selectedService !== "General enquiry" ? selectedService : "", selectedOffer].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#f8f9fe] text-[#161934]">
      <ChatWidget />
      <div className="border-b border-[#e8e8f2] bg-white">
        <SiteHeader theme="light" />
      </div>

      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(102,161,255,0.14),transparent_38%),radial-gradient(circle_at_90%_10%,rgba(102,116,255,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f6f8ff_100%)]">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_72%)]" />
          <div className="container relative mx-auto px-6 pb-16 pt-12 sm:pb-20 sm:pt-16">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#dfe4f3] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a7194]">
                  <Sparkles className="h-4 w-4 text-[#4b67ff]" />
                  Linkifi contact
                </div>

                <h1 className="mt-6 text-[2.8rem] font-display font-bold leading-[0.95] tracking-[-0.05em] text-[#0f1230] sm:text-[3.8rem]">
                  Tell us where you want to grow next.
                </h1>

                <p className="mt-6 text-lg leading-8 text-[#4f5779] sm:text-xl">
                  Share your goals and current priorities in the contact form, and our team will come back with
                  clear next steps.
                </p>

                {contextTags.length > 0 ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {contextTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#d9e4ff] bg-[#edf2ff] px-4 py-2 text-sm font-semibold text-[#2f52de]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-10 space-y-4">
                  <div className="rounded-[1.2rem] border border-[#e6e9f4] bg-white p-4 shadow-[0_12px_30px_rgba(35,45,85,0.07)]">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3c5cff]" />
                      <p className="text-sm leading-7 text-[#4e5472]">
                        Share the essentials and we will review the right next step for your campaign.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[1.2rem] border border-[#e6e9f4] bg-white p-4 shadow-[0_12px_30px_rgba(35,45,85,0.07)]">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3c5cff]" />
                      <p className="text-sm leading-7 text-[#4e5472]">
                        Use the form to share your goals, timing, and any package or service context that matters.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[1.2rem] border border-[#e6e9f4] bg-white p-4 shadow-[0_12px_30px_rgba(35,45,85,0.07)]">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3c5cff]" />
                      <p className="text-sm leading-7 text-[#4e5472]">
                        If a live conversation is the better move, you can book a call straight below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-[#e3e7f5] bg-white shadow-[0_28px_70px_rgba(26,40,86,0.15)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(238,243,255,0.9),rgba(255,255,255,0))]" />
                <div className="relative p-5 sm:p-7">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f7799]">Contact form</p>
                      <h2 className="mt-2 text-3xl font-display font-bold tracking-[-0.03em] text-[#111433]">
                        Start your enquiry.
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#e2e8f7] bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <div className="h-[920px] overflow-hidden bg-white sm:h-[820px] lg:h-[700px]">
                      <iframe
                        src={GHL_FORM_URL}
                        className="h-full w-full border-0"
                        style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px" }}
                        id={GHL_IFRAME_ID}
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        data-form-name="Enquiry - New Website"
                        data-height="700"
                        data-layout-iframe-id={GHL_IFRAME_ID}
                        data-form-id={GHL_FORM_ID}
                        title="Enquiry - New Website"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Script src="https://book.linkifi.io/js/form_embed.js" strategy="afterInteractive" />
        </section>

        <section className="border-y border-[#e7ebf7] bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_100%)]">
          <div className="container mx-auto px-6 py-12 sm:py-14">
            <div className="mx-auto max-w-[1140px] overflow-hidden rounded-[2rem] border border-[#e2e8f8] bg-white shadow-[0_28px_70px_rgba(30,49,101,0.12)]">
              <div className="relative border-b border-[#edf1fb] bg-[radial-gradient(circle_at_88%_12%,rgba(118,180,255,0.18),transparent_26%),linear-gradient(180deg,#fbfdff_0%,#f4f8ff_100%)] px-6 py-6 sm:px-8 sm:py-7">
                <div className="pointer-events-none absolute right-8 top-5 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(93,151,255,0.26),transparent_72%)] animate-pulse" />
                <div className="flex items-start gap-4">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] bg-[linear-gradient(145deg,#3f68ff_0%,#73b5ff_100%)] text-white shadow-[0_20px_40px_rgba(56,108,255,0.26)]">
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#8fd0ff] animate-ping" />
                    <PhoneCall className="relative z-10 h-7 w-7" />
                  </div>
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6e7698]">Book a discovery call</p>
                    <h2 className="mt-2 text-3xl font-display font-bold tracking-[-0.03em] text-[#111433] sm:text-[2.2rem]">
                      Pick a time to talk with Linkifi.
                    </h2>
                    <p className="mt-3 text-base leading-8 text-[#4f5779] sm:text-lg">
                      If a live conversation is the better next move, book a slot below and we will talk
                      through your goals, current authority position, and the strongest next step.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2 sm:p-3">
                <iframe
                  src={BOOKING_WIDGET_URL}
                  style={{ width: "100%", border: "none", overflow: "hidden" }}
                  scrolling="no"
                  id={BOOKING_IFRAME_ID}
                  className="min-h-[760px] w-full border-0"
                  title="Linkifi discovery call booking"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7f8ff_100%)]">
          <div className="container mx-auto px-6 py-16 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f7698]">FAQ</p>
                <h2 className="mt-4 text-4xl font-display font-bold tracking-[-0.04em] text-[#0f1230]">
                  Questions before you start?
                </h2>
                <p className="mt-4 max-w-md text-base leading-8 text-[#4f5779]">
                  Everything below is built to keep the jump from enquiry to strategy call clear and quick.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-[#e3e8f6] bg-white p-4 shadow-[0_18px_42px_rgba(31,44,84,0.08)] sm:p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.value} value={item.value} className="border-b border-[#e8ecf7]">
                      <AccordionTrigger className="text-left text-lg font-display font-bold text-[#141834] hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-7 text-[#4f5779]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter flushTop />
    </div>
  );
}
