import Link from "next/link";
import { Linkedin, Youtube } from "lucide-react";

const navigationItems = [
  { label: "SEO Digital PR", href: "/#Pricing" },
  { label: "Authority PR", href: "/#Pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Press Badge Maker", href: "/#howitworks" },
] as const;

const footerMenus = [
  {
    title: "Services",
    links: [
      { label: "SEO Digital PR", href: "/#Pricing" },
      { label: "Authority PR", href: "/#Pricing" },
      { label: "Press Badge Maker", href: "/#howitworks" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
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

function BrandMark() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 text-white">
      <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/18 bg-white/8">
        <img src="/icon.png" alt="Linkifi" className="h-7 w-7 object-contain" />
      </span>
      <span className="text-[2rem] font-display font-bold tracking-[-0.03em] leading-none">Linkifi</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[linear-gradient(100deg,#0b0f2a_0%,#1c2154_54%,#1f1753_100%)] backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 rounded-[1.9rem] border border-white/14 bg-[#0e1230]/75 px-5 py-3 shadow-[0_16px_34px_rgba(10,14,41,0.36)]">
          <BrandMark />

          <nav className="hidden rounded-full border border-[#dcd9f6] bg-white p-1 md:flex md:items-center">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#3a4070] transition-colors hover:bg-[#f4f5ff]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center rounded-full bg-[#6b5cf1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5847e3]"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-[radial-gradient(circle_at_24%_10%,rgba(99,90,255,0.24),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(76,178,255,0.2),transparent_30%),linear-gradient(180deg,#080b23_0%,#040617_100%)] pb-12 pt-14 text-white">
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
                    rel="noreferrer"
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
