import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";

const navigationItems = [
  { label: "SEO Digital PR", href: "/seo-digital-pr" },
  { label: "Authority PR", href: "/authority-pr" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Team", href: "/team" },
  { label: "Press Badge Maker", href: "/#howitworks" },
] as const;

const footerMenus = [
  {
    title: "Services",
    links: [
      { label: "SEO Digital PR", href: "/seo-digital-pr" },
      { label: "Authority PR", href: "/authority-pr" },
      { label: "Press Badge Maker", href: "/#howitworks" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Team", href: "/team" },
      { label: "Market Movers Podcast", href: "/blog?category=podcast" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact Us", href: "/contact-us" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

const footerSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/linkifi-agency/",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    label: "X",
    href: "https://x.com/Linkifi_",
    icon: <span className="text-sm font-black tracking-tight">X</span>,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@linkifi",
    icon: <Youtube className="h-5 w-5" />,
  },
] as const;

type HeaderTheme = "dark" | "light";

function BrandMark({ theme = "dark" }: { theme?: HeaderTheme } = {}) {
  const isLight = theme === "light";

  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 items-center gap-3 ${isLight ? "text-[#15162b]" : "text-white"}`}
    >
      <span
        className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ${
          isLight
            ? "border border-[#e3e1f0] bg-[linear-gradient(135deg,#f7f4ff_0%,#eef0ff_100%)] shadow-[0_16px_32px_rgba(92,87,172,0.12)]"
            : "border border-white/18 bg-white/8"
        }`}
      >
        <img src="/brand-mark.png" alt="Linkifi" className="h-7 w-7 object-contain" />
      </span>
      <span
        className={`truncate text-[1.85rem] font-display font-bold leading-none tracking-[-0.03em] sm:text-[2rem] ${
          isLight ? "text-[#15162b]" : "text-white"
        }`}
      >
        Linkifi
      </span>
    </Link>
  );
}

export function SiteHeader({ theme = "dark" }: { theme?: HeaderTheme } = {}) {
  const isLight = theme === "light";

  return (
    <header className="relative z-30 bg-transparent">
      <div className="container mx-auto px-6 pt-6">
        <div
          className={`flex items-center justify-between gap-4 pb-4 ${
            isLight ? "border-b border-[#e5e2f1]" : "border-b border-white/20"
          }`}
        >
          <BrandMark theme={theme} />

          <nav className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  isLight ? "text-[#4c4d73] hover:text-[#1a1c34]" : "text-white/88 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact-us"
            className={`hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex ${
              isLight
                ? "border border-[#d7d2eb] bg-white text-[#2c2f55] shadow-[0_14px_34px_rgba(76,77,115,0.08)] hover:bg-[#f6f4ff]"
                : "border border-white/30 bg-white/8 text-white hover:bg-white/15"
            }`}
          >
            Contact
          </Link>
        </div>

        <nav
          className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 pb-3 md:hidden ${
            isLight ? "border-b border-[#ece9f6]" : "border-b border-white/14"
          }`}
        >
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  isLight ? "text-[#4c4d73] hover:text-[#1a1c34]" : "text-white/92 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact-us"
              className={`ml-auto inline-flex rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                isLight
                  ? "border border-[#d7d2eb] bg-white text-[#2c2f55] hover:bg-[#f6f4ff]"
                  : "border border-white/30 bg-white/10 text-white hover:bg-white/18"
              }`}
            >
              Contact
            </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({
  className = "",
  flushTop = false,
}: { className?: string; flushTop?: boolean } = {}) {
  const topSpacingClass = flushTop ? "mt-0" : "mt-20";

  return (
    <footer
      className={`${topSpacingClass} bg-[radial-gradient(circle_at_24%_10%,rgba(99,90,255,0.24),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(76,178,255,0.2),transparent_30%),linear-gradient(180deg,#080b23_0%,#040617_100%)] pb-12 pt-14 text-white ${className}`}
    >
      <div className="container mx-auto px-6">
        <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(100deg,rgba(14,18,52,0.82),rgba(9,12,34,0.88))] p-8 shadow-[0_28px_62px_rgba(8,10,33,0.55)] md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
            <div>
              <BrandMark />
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/82">
                Built for companies that need authoritative links, stronger brand signals, and visible commercial outcomes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/20 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/88">
                  Editorial Placements
                </span>
                <span className="rounded-full border border-white/20 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/88">
                  SEO Authority
                </span>
              </div>
              <div className="mt-6 flex items-center gap-3">
                {footerSocialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/18 bg-white/7 text-white transition-colors hover:border-white/28 hover:bg-white/12"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {footerMenus.map((menu) => (
              <div key={menu.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">{menu.title}</h3>
                <ul className="mt-5 space-y-3">
                  {menu.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-lg text-white/88 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/14 pt-6 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Linkifi. All rights reserved.</p>
            <p>Built to turn digital PR into measurable authority.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
