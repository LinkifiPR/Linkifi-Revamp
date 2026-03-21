"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Mail } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export type ContactPageContext = {
  service?: string;
  packageName?: string;
  program?: string;
};

type ContactPageClientProps = {
  initialContext: ContactPageContext;
  isEmailConfigured: boolean;
};

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  service: string;
  message: string;
  honeypot: string;
};

const BOOKING_URL = "https://book.linkifi.io/widget/bookings/pr-discovery-call";
const CALENDLY_URL = "https://calendly.com/linkifi/15min";

const faqItems = [
  {
    value: "what-should-i-send",
    question: "What should I include in the form?",
    answer:
      "A site URL, the service or offer you are interested in, and a short note on what you want the campaign to achieve. That is enough for a useful first reply.",
  },
  {
    value: "service-choice",
    question: "Can I change service direction after submitting?",
    answer:
      "Yes. If you came in from a specific service page we keep that context visible, but the conversation can still move toward whichever route makes the most sense.",
  },
  {
    value: "call-vs-form",
    question: "Should I book a call or use the form?",
    answer:
      "Use the form if you want to send a written brief first. Book a discovery call if talking it through is the faster path for your team.",
  },
  {
    value: "offer-context",
    question: "Will the selected package or program carry through?",
    answer:
      "Yes. If you clicked through from a package or program CTA, that context is preserved on this page and included with the contact submission.",
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

function getMessagePlaceholder(selectedService: string, selectedOffer: string): string {
  if (selectedOffer) {
    return `We are interested in ${selectedOffer} under ${selectedService}. Here is what we want to achieve...`;
  }

  return "Tell us about your site, goals, and what kind of authority or PR support you need.";
}

export function ContactPageClient({
  initialContext,
  isEmailConfigured,
}: ContactPageClientProps) {
  const selectedService = normalizeService(initialContext.service);
  const selectedOffer = formatSlug(initialContext.packageName ?? initialContext.program);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    website: "",
    service: selectedService,
    message: "",
    honeypot: "",
  });

  const contextTags = [
    selectedService !== "General enquiry" ? selectedService : "",
    selectedOffer,
  ].filter(Boolean);

  function updateField<K extends keyof ContactFormState>(field: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting" || !isEmailConfigured) {
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          website: form.website,
          service: form.service,
          selectedOffer,
          message: form.message,
          honeypot: form.honeypot,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "We could not send your message right now.");
      }

      setSubmitState("success");
      setSubmitMessage("Your message has been sent. Linkifi can reply directly to the email you entered.");
      setForm((prev) => ({
        ...prev,
        name: "",
        email: "",
        company: "",
        website: "",
        message: "",
        honeypot: "",
      }));
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "We could not send your message right now.");
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfbff] text-[#17182f]">
      <div className="border-b border-[#ece7f5] bg-white">
        <SiteHeader theme="light" />
      </div>

      <main>
        <section className="bg-[radial-gradient(circle_at_top_left,rgba(124,92,255,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#faf7ff_100%)]">
          <div className="container mx-auto px-6 pb-16 pt-14 sm:pb-20">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="max-w-xl">
                <div className="inline-flex items-center rounded-full border border-[#e7e1f7] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a6d8d]">
                  Contact us
                </div>

                <h1 className="mt-6 text-[3rem] font-display font-bold leading-[0.95] tracking-[-0.05em] text-[#15162b] sm:text-[4rem]">
                  Clean, direct, and ready for a real enquiry.
                </h1>

                <p className="mt-6 text-lg leading-8 text-[#595d7a] sm:text-xl">
                  Send a proper brief through the form below, or skip straight to a discovery call if talking
                  it through is the faster move.
                </p>

                {contextTags.length > 0 ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {contextTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#e6def8] bg-[#f6f1ff] px-4 py-2 text-sm font-semibold text-[#5e48d8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-10 space-y-4">
                  <div className="flex items-start gap-3 rounded-[1.4rem] border border-[#ece6f8] bg-white p-4 shadow-[0_12px_30px_rgba(78,82,120,0.06)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#5e48d8]" />
                    <p className="text-sm leading-7 text-[#4f5372]">
                      The contact form is designed to send a real email, not act as a dead-end placeholder.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-[1.4rem] border border-[#ece6f8] bg-white p-4 shadow-[0_12px_30px_rgba(78,82,120,0.06)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#5e48d8]" />
                    <p className="text-sm leading-7 text-[#4f5372]">
                      Service and offer context from the pages you clicked through from stays attached to the enquiry.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-[1.4rem] border border-[#ece6f8] bg-white p-4 shadow-[0_12px_30px_rgba(78,82,120,0.06)]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#5e48d8]" />
                    <p className="text-sm leading-7 text-[#4f5372]">
                      If you would rather speak first, the discovery-call CTA stays prominent and easy to find.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e6e0f4] bg-white p-6 shadow-[0_24px_60px_rgba(78,82,120,0.1)] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#767996]">Send a message</p>
                    <h2 className="mt-3 text-3xl font-display font-bold tracking-[-0.03em] text-[#15162b]">
                      Contact form
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-[#ece6f8] bg-[#f6f1ff] p-3">
                    <Mail className="h-6 w-6 text-[#5e48d8]" />
                  </div>
                </div>

                {selectedOffer ? (
                  <div className="mt-5 rounded-[1.4rem] border border-[#ece6f8] bg-[#faf7ff] p-4 text-sm leading-7 text-[#555877]">
                    <span className="font-semibold text-[#1b1d36]">Selected context:</span> {selectedService}
                    {" · "}
                    {selectedOffer}
                  </div>
                ) : null}

                {!isEmailConfigured ? (
                  <div className="mt-5 rounded-[1.4rem] border border-[#f3d9aa] bg-[#fff7e8] p-4 text-sm leading-7 text-[#7b5a16]">
                    Email delivery is not configured in this environment yet. Add
                    {" "}
                    <code>RESEND_API_KEY</code>, <code>CONTACT_FORM_TO_EMAIL</code>, and
                    {" "}
                    <code>CONTACT_FORM_FROM_EMAIL</code> to enable live sending.
                  </div>
                ) : null}

                {submitState === "success" ? (
                  <div className="mt-5 rounded-[1.4rem] border border-[#cfe7d6] bg-[#f3fbf5] p-4 text-sm leading-7 text-[#23613a]">
                    {submitMessage}
                  </div>
                ) : null}

                {submitState === "error" ? (
                  <div className="mt-5 rounded-[1.4rem] border border-[#f0d2d7] bg-[#fff6f7] p-4 text-sm leading-7 text-[#8f3040]">
                    {submitMessage}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-semibold text-[#3e4260]">Name</span>
                      <input
                        required
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        placeholder="Your name"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-white px-4 text-sm text-[#17182f] outline-none transition-colors focus:border-[#8e7cff]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-[#3e4260]">Work email</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="name@company.com"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-white px-4 text-sm text-[#17182f] outline-none transition-colors focus:border-[#8e7cff]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-[#3e4260]">Company</span>
                      <input
                        value={form.company}
                        onChange={(event) => updateField("company", event.target.value)}
                        placeholder="Company name"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-white px-4 text-sm text-[#17182f] outline-none transition-colors focus:border-[#8e7cff]"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-semibold text-[#3e4260]">Website</span>
                      <input
                        required
                        value={form.website}
                        onChange={(event) => updateField("website", event.target.value)}
                        placeholder="https://your-site.com"
                        className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-white px-4 text-sm text-[#17182f] outline-none transition-colors focus:border-[#8e7cff]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-semibold text-[#3e4260]">Service interest</span>
                    <select
                      value={form.service}
                      onChange={(event) => updateField("service", event.target.value)}
                      className="mt-2 h-12 w-full rounded-2xl border border-[#ddd7ef] bg-white px-4 text-sm text-[#17182f] outline-none transition-colors focus:border-[#8e7cff]"
                    >
                      <option>General enquiry</option>
                      <option>SEO Digital PR</option>
                      <option>Authority PR</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-[#3e4260]">Message</span>
                    <textarea
                      required
                      rows={7}
                      minLength={10}
                      value={form.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      placeholder={getMessagePlaceholder(form.service, selectedOffer)}
                      className="mt-2 w-full rounded-[1.6rem] border border-[#ddd7ef] bg-white px-4 py-4 text-sm leading-7 text-[#17182f] outline-none transition-colors focus:border-[#8e7cff]"
                    />
                  </label>

                  <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                    <label>
                      Do not fill this out
                      <input
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.honeypot}
                        onChange={(event) => updateField("honeypot", event.target.value)}
                      />
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={submitState === "submitting" || !isEmailConfigured}
                      className="h-auto rounded-full bg-[#17182f] px-6 py-3 text-sm font-semibold text-white hover:bg-[#25284a] disabled:bg-[#b8bbd2]"
                    >
                      {submitState === "submitting" ? "Sending..." : "Send message"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="max-w-md text-sm leading-7 text-[#656885]">
                      The form uses your email address as the reply-to so Linkifi can respond directly.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#ece7f5] bg-[#f8f5ff]">
          <div className="container mx-auto px-6 py-12">
            <div className="rounded-[2rem] border border-[#e6e0f4] bg-white p-6 shadow-[0_20px_48px_rgba(78,82,120,0.08)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#767996]">Prefer to talk first?</p>
                <h2 className="mt-3 text-3xl font-display font-bold tracking-[-0.03em] text-[#15162b]">
                  Book a discovery call.
                </h2>
                <p className="mt-4 text-base leading-8 text-[#595d7a]">
                  If it is easier to walk through your goals live, head straight to the booking page and pick
                  a slot that works for your team.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
                <Button
                  asChild
                  className="h-auto rounded-full bg-[#5e48d8] px-6 py-3 text-sm font-semibold text-white hover:bg-[#503bcc]"
                >
                  <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Book discovery call
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-auto rounded-full border-[#d9d2ee] bg-white px-6 py-3 text-sm font-semibold text-[#25284a] hover:bg-[#f6f2ff]"
                >
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    15-minute intro
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-6 py-16 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#767996]">FAQ</p>
                <h2 className="mt-4 text-4xl font-display font-bold tracking-[-0.04em] text-[#15162b]">
                  A cleaner path to first contact.
                </h2>
                <p className="mt-4 max-w-md text-base leading-8 text-[#595d7a]">
                  The essentials are simple: send a brief, book a call, and keep the context that brought you here.
                </p>
              </div>

              <div className="rounded-[2rem] border border-[#e6e0f4] bg-[#fbfaff] p-4 shadow-[0_18px_42px_rgba(78,82,120,0.08)] sm:p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item) => (
                    <AccordionItem key={item.value} value={item.value} className="border-b border-[#e8e1f7]">
                      <AccordionTrigger className="text-left text-lg font-display font-bold text-[#17182f] hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-7 text-[#595d7a]">
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
