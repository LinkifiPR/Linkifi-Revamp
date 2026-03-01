"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Fingerprint,
  Linkedin,
  Menu,
  Megaphone,
  MessageCircle,
  Play,
  Sparkles,
  Trophy,
  X,
  TrendingUp,
  Users,
  Youtube,
} from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const strategicSectionRef = useRef<HTMLElement | null>(null);
  const testimonialVideoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const { scrollYProgress: strategicScrollProgress } = useScroll({
    target: strategicSectionRef,
    offset: ["start end", "end start"],
  });
  const strategicLogosParallax = useSpring(
    useTransform(strategicScrollProgress, [0, 1], [16, -16]),
    { stiffness: 90, damping: 22, mass: 0.35 },
  );

  const navigationItems = [
    { label: "SEO Digital PR", href: "#Pricing" },
    { label: "Authority PR", href: "#Pricing" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Press Badge Maker", href: "#howitworks" },
  ] as const;

  const footerMenus = [
    {
      title: "Services",
      links: [
        { label: "SEO Digital PR", href: "#Pricing" },
        { label: "Authority PR", href: "#Pricing" },
        { label: "Press Badge Maker", href: "#howitworks" },
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
      href: "https://www.linkedin.com",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      label: "X",
      href: "https://x.com",
      icon: <span className="text-sm font-black tracking-tight">X</span>,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com",
      icon: <Youtube className="h-5 w-5" />,
    },
  ] as const;

  const featuredPublications = [
    {
      src: "/publication-logos/nytimes.png",
      alt: "The New York Times",
      width: 520,
      height: 90,
      className: "h-9 md:h-10 w-auto",
    },
    {
      src: "/publication-logos/forbes.png",
      alt: "Forbes",
      width: 280,
      height: 90,
      className: "h-11 md:h-12 w-auto",
    },
    {
      src: "/publication-logos/guardian.png",
      alt: "The Guardian",
      width: 320,
      height: 95,
      className: "h-8 md:h-9 w-auto",
    },
    {
      src: "/publication-logos/healthline.png",
      alt: "healthline",
      width: 360,
      height: 70,
      className: "h-8 md:h-9 w-auto",
    },
    {
      src: "/publication-logos/bbc.svg",
      alt: "BBC",
      width: 112,
      height: 40,
      className: "h-7 md:h-8 w-auto",
    },
    {
      src: "/publication-logos/hubspot.png",
      alt: "HubSpot",
      width: 260,
      height: 72,
      className: "h-8 md:h-9 w-auto",
    },
    {
      src: "/publication-logos/elle.svg",
      alt: "ELLE",
      width: 130,
      height: 52,
      className: "h-7 md:h-8 w-auto",
    },
    {
      src: "/publication-logos/menshealth.png",
      alt: "MensHealth",
      width: 320,
      height: 82,
      className: "h-8 md:h-9 w-auto",
    },
  ];
  const heroPublications = [
    {
      src: "/publication-logos/forbes.png",
      alt: "Forbes",
      width: 280,
      height: 90,
      className: "h-6 md:h-7 w-auto",
    },
    {
      src: "/publication-logos/healthline.png",
      alt: "healthline",
      width: 360,
      height: 70,
      className: "h-6 md:h-7 w-auto",
    },
    {
      src: "/publication-logos/bbc.svg",
      alt: "BBC",
      width: 112,
      height: 40,
      className: "h-5 md:h-6 w-auto",
    },
    {
      src: "/publication-logos/guardian.png",
      alt: "The Guardian",
      width: 320,
      height: 95,
      className: "h-7 md:h-8 w-auto",
    },
    {
      src: "/publication-logos/daily-express-clean.png",
      alt: "Daily Express",
      width: 3816,
      height: 454,
      className: "h-4 md:h-5 w-auto",
    },
    {
      src: "/publication-logos/wsj-clean.png",
      alt: "WSJ",
      width: 3690,
      height: 2091,
      className: "h-6 md:h-7 w-auto",
    },
    {
      src: "/publication-logos/realtor-clean.png",
      alt: "realtor.com",
      width: 800,
      height: 147,
      className: "h-5 md:h-6 w-auto",
    },
    {
      src: "/publication-logos/hubspot-clean.png",
      alt: "HubSpot",
      width: 800,
      height: 232,
      className: "h-6 md:h-7 w-auto",
    },
  ];

  const featuredTestimonials = [
    {
      quote:
        "I've been working with Linkifi for close to 4 months now; Chris and his team have been one of the few services in the world that have consistently got me high-level PR links without charging extortionate rates.",
      name: "Charles Floate",
      website: "charlesfloate.com",
      avatarSrc: "/testimonial-charles-floate.jpeg",
      avatarAlt: "Charles Floate",
      gradient: "from-[#5A4DBF] to-[#6B7CFF]",
      tone: "violet",
    },
    {
      quote:
        "Not only is the outcome excellent, but the process of working with Linkifi is excellent. I've yet to meet anyone who is as good at working with this sort of link-building.",
      name: "Jon Dykstra",
      website: "fatstacksblog.com",
      avatarSrc: "/testimonial-jon-dykstra.webp",
      avatarAlt: "Jon Dykstra",
      gradient: "from-[#D733A2] to-[#F25DA4]",
      tone: "pink",
    },
  ];

  const packageOffers = [
    {
      key: "seo",
      title: "SEO Digital PR",
      eyebrow: "Performance-Led Package",
      badge: "Best for Google Rankings",
      description:
        "We identify credible experts and position them strategically around the right topics. We secure editorially earned quotes in major publications where links cannot be bought. This builds algorithmic authority, stronger E-E-A-T signals, and direct SEO impact.",
      tags: ["Editorially earned", "Major publications", "E-E-A-T signals", "Direct SEO impact"],
      bullets: [
        "Expert positioning strategy",
        "Inbound media request monitoring",
        "Tier-one publication placements",
        "Algorithmic authority link signals",
      ],
      miniTitle: "Campaign Framework",
      miniRows: [
        { label: "Expert positioning" },
        { label: "Request monitoring" },
        { label: "Tier-one placements" },
      ],
      outcomeTitle: "World-Class Backlinks",
      outcomeSubtext: "Editorial links built to drive rankings.",
      ctaLabel: "Buy Now",
      tone: "seo",
    },
    {
      key: "authority",
      title: "Authority PR",
      eyebrow: "Brand Authority Package",
      badge: "Best for Visibility",
      description:
        "Authority PR is broader than SEO links alone. It is narrative driven and built to strengthen brand authority, credibility, and media presence. It expands visibility across search and AI platforms while reinforcing commercial trust.",
      tags: ["Brand authority", "Media presence", "Search visibility", "AI visibility"],
      bullets: [
        "Founder media positioning",
        "Bylined features and profiles",
        "Podcasts and speaking placements",
        "Authority narrative campaigns",
      ],
      miniTitle: "Authority Signals Built",
      miniRows: [
        { label: "Media credibility", value: "Expanded" },
        { label: "Brand authority", value: "Elevated" },
        { label: "AI visibility", value: "Compounding" },
      ],
      outcomeTitle: "Credibility + Market Authority",
      outcomeSubtext: "Builds reputation, visibility, and influence over time.",
      ctaLabel: "Discuss Authority PR",
      tone: "authority",
    },
  ] as const;

  const videoTestimonials = [
    {
      name: "Daniel Glazer",
      company: "UK Therapy Rooms",
      role: "Co-Founder",
      src: "/testimonials/videos/daniel-v1-720p.mp4",
    },
    {
      name: "Joy Aumann",
      company: "LUXURYSOCALREALTY",
      role: "Co-Founder",
      src: "/testimonials/videos/joy-v1-720p.mp4",
    },
    {
      name: "Amanda Leemis",
      company: "Hollydog LLC",
      role: "Editor-In-Chief",
      src: "/testimonials/videos/amanda-v1-720p.mp4",
    },
  ] as const;

  const workShowcaseItems = [
    {
      key: "dental",
      href: "/case-studies/6-major-features-13-7m-audience-reach-for-nyc-cosmetic-dentist",
      eyebrow: "Cosmetic Dentistry",
      kicker: "Case Study 01",
      title: "6 Major Features + 13.7M Audience Reach for NYC Cosmetic Dentist",
      summary:
        "We turned specialist clinical expertise into national editorial coverage, giving Lux Smiles NYC the kind of authority, trust, and visibility that compounds across both search and brand demand.",
      statValue: "13.7M",
      statLabel: "Audience Reach",
      proofPoints: ["6 premium features", "DR 85 average", "Clinical expert positioning"],
      gradient: "from-[#725BFF] via-[#4D47D8] to-[#2E8CFF]",
      Icon: Sparkles,
    },
    {
      key: "therapy",
      href: "/case-studies/therapy-room-directory-website",
      eyebrow: "Therapy Rooms",
      kicker: "Case Study 02",
      title: "Digital PR Gets #1 Spot on Google for Therapy Room Directory Website",
      summary:
        "For US Therapy Rooms, we ran a focused campaign built around commercially relevant search demand. The result was stronger rankings, better traffic quality, and a meaningful lift in discoverability.",
      statValue: "#1",
      statLabel: "Google Position",
      proofPoints: ["Doubled organic traffic", "Higher-intent rankings", "Sustained authority growth"],
      gradient: "from-[#35C7FF] via-[#5B6DFF] to-[#7E53FF]",
      Icon: TrendingUp,
    },
    {
      key: "legal",
      href: "/case-studies/59-premium-features-and-national-recognition-for-texas-law-firm",
      eyebrow: "Legal Services",
      kicker: "Case Study 03",
      title: "59 Premium Features and National Recognition for Texas Law Firm",
      summary:
        "We built a national visibility layer for a Texas legal brand, turning credibility into wide editorial recognition across competitive legal and business publications where trust is decisive.",
      statValue: "59",
      statLabel: "Premium Features",
      proofPoints: ["National media presence", "Authority-led trust signals", "Broader branded visibility"],
      gradient: "from-[#FF4FCB] via-[#8A5CFF] to-[#5A4DBF]",
      Icon: Trophy,
    },
  ] as const;

  const socialProofTweets = [
    {
      handle: "@NicheSiteLady",
      url: "https://twitter.com/NicheSiteLady/status/1899434164102840788",
      label: "Client Praise",
    },
    {
      handle: "@nichejason",
      url: "https://twitter.com/nichejason/status/1748309666935800317",
      label: "Results Signal",
    },
    {
      handle: "@patientpublish",
      url: "https://twitter.com/patientpublish/status/1796154692658979117",
      label: "Founder Feedback",
    },
    {
      handle: "@jakezward",
      url: "https://twitter.com/jakezward/status/1833490025855557746",
      label: "Ranking Win",
    },
    {
      handle: "@jakezward",
      url: "https://twitter.com/jakezward/status/1820431498677297447",
      label: "Traffic Lift",
    },
    {
      handle: "@FatStacksBlog",
      url: "https://twitter.com/FatStacksBlog/status/1711730463210099137",
      label: "Operator Review",
    },
    {
      handle: "@NinaClapperton",
      url: "https://twitter.com/NinaClapperton/status/1711753602518385067",
      label: "Client Result",
    },
    {
      handle: "@UKCarlBroadbent",
      url: "https://twitter.com/UKCarlBroadbent/status/1692083844818911353",
      label: "Campaign Proof",
    },
    {
      handle: "@NicheSiteSiry",
      url: "https://twitter.com/NicheSiteSiry/status/1651997948769710103",
      label: "Public Endorsement",
    },
  ] as const;

  const handleTestimonialHoverStart = async (index: number) => {
    const video = testimonialVideoRefs.current[index];
    if (!video) return;

    video.volume = 1;
    video.muted = false;

    try {
      await video.play();
    } catch {
      // Fallback for browsers that block unmuted hover playback.
      video.muted = true;
      try {
        await video.play();
      } catch {
        // Ignore: user can still click to force play/unmute.
      }
    }
  };

  const handleTestimonialHoverEnd = (index: number) => {
    const video = testimonialVideoRefs.current[index];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.muted = true;
  };

  const handleTestimonialClick = async (index: number) => {
    const video = testimonialVideoRefs.current[index];
    if (!video) return;

    video.volume = 1;
    video.muted = false;

    try {
      await video.play();
    } catch {
      video.muted = true;
      await video.play().catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#5A4DBF]/20 selection:text-[#5A4DBF]">
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />

      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[30px] border border-white/12 bg-[linear-gradient(135deg,rgba(8,10,24,0.95),rgba(18,24,60,0.92))] shadow-[0_26px_80px_rgba(3,6,18,0.5)] backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-[54px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <Image
                src="/logo.png"
                alt=""
                fill
                sizes="54px"
                className="object-cover object-left"
                priority
              />
            </div>
            <span className="text-[28px] font-semibold tracking-tight text-white">Linkifi</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center rounded-full border border-white/12 bg-white/[0.92] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_24px_rgba(8,10,24,0.18)]">
            {navigationItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-[0.02em] text-[#4C4D73] transition-all duration-300 hover:bg-white hover:text-[#5A4DBF] hover:shadow-[0_10px_24px_rgba(90,77,191,0.12)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-[0.02em] text-[#4C4D73] transition-all duration-300 hover:bg-white hover:text-[#5A4DBF] hover:shadow-[0_10px_24px_rgba(90,77,191,0.12)]"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact-us">
              <Button className="rounded-full border border-[#8A7BFF]/40 bg-[linear-gradient(135deg,#5A4DBF_0%,#6B5AF3_48%,#8470FF_100%)] px-6 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(90,77,191,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(90,77,191,0.34)]">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? (
              <X className="text-white" />
            ) : (
              <Menu className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden border-t border-white/10 bg-[#0A0D20]/96"
          >
            <div className="px-5 py-5 flex flex-col gap-2">
              {navigationItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/78 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/78 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <Link href="/contact-us">
                <Button className="mt-2 w-full rounded-full bg-[linear-gradient(135deg,#5A4DBF_0%,#6B5AF3_48%,#8470FF_100%)] text-white shadow-[0_16px_30px_rgba(90,77,191,0.24)]">
                  Contact
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
        </div>
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-16 lg:mb-24">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left Content */}
            <div className="max-w-2xl">
              <motion.div variants={fadeIn} className="flex mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A197EC]/10 border border-[#A197EC]/20 text-[#5A4DBF] text-xs font-semibold tracking-wide uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5A4DBF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A4DBF]"></span>
                  </span>
                  Building the Most Powerful Links on the Planet
                </span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#0F0F0F] leading-[1.1] mb-6 tracking-tight"
              >
                Effortless PR <br />
                <span className="text-gradient-purple">Link Building</span>,{" "}
                <br />
                Exceptional Results.
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-[#535479] mb-8 leading-relaxed max-w-lg"
              >
                We control the narrative and directly pitch stories to
                journalists. Get your brand featured on the world&apos;s largest
                publications to supercharge your SEO.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center gap-4 mb-12"
              >
                <a href="#Pricing">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-full text-lg bg-[#5A4DBF] hover:bg-[#483d99] text-white shadow-xl shadow-[#5A4DBF]/20 transition-all hover:scale-105 w-full sm:w-auto font-bold"
                    data-testid="button-hero-get-started"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link href="/case-studies">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 rounded-full text-lg border-gray-200 text-[#535479] hover:text-[#5A4DBF] hover:bg-purple-50 w-full sm:w-auto font-medium"
                    data-testid="button-hero-case-studies"
                  >
                    View Case Studies
                  </Button>
                </Link>
              </motion.div>

            </div>

            {/* Right Graphic - Chat Interface */}
            <motion.div
              variants={fadeIn}
              className="relative mx-auto lg:mr-0 w-full max-w-md lg:max-w-full"
            >
              <div className="relative z-10 p-6 bg-white rounded-3xl shadow-2xl border border-gray-100">
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm text-[#535479]">
                      <p>
                        Hey, just checking in — how&apos;s the campaign coming
                        along?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start justify-end">
                    <div className="bg-[#5A4DBF] p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm text-white shadow-lg shadow-[#5A4DBF]/20">
                      <p className="mb-3">
                        The campaign is going great. Some big links already!
                        Take a look at these placements:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/10 p-2 rounded flex items-center gap-2">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <span className="text-xs font-medium">
                            nytimes.com
                          </span>
                        </div>
                        <div className="bg-white/10 p-2 rounded flex items-center gap-2">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <span className="text-xs font-medium">forbes.com</span>
                        </div>
                        <div className="bg-white/10 p-2 rounded flex items-center gap-2">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <span className="text-xs font-medium">
                            healthline.com
                          </span>
                        </div>
                        <div className="bg-white/10 p-2 rounded flex items-center gap-2">
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                          <span className="text-xs font-medium">zdnet.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#5A4DBF]/10 flex items-center justify-center shrink-0">
                      <Image
                        src="/logo.png"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                        alt="Linkifi"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm text-[#535479]">
                      <p className="text-2xl mb-1">😲🥳🥳🥳</p>
                      <p>
                        I&apos;ve yet to meet anyone who is as good with this
                        sort of link-building...
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -right-8 top-1/2 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase">
                      Organic Traffic
                    </p>
                    <p className="text-lg font-bold text-[#0F0F0F]">+245%</p>
                  </div>
                </motion.div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#5A4DBF]/10 to-[#D733A2]/10 rounded-full blur-3xl opacity-50 z-0"></div>
            </motion.div>

            <motion.div variants={fadeIn} className="lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 items-center justify-items-center gap-x-6 md:gap-x-8 gap-y-5 lg:gap-y-4">
                {heroPublications.map((publication, index) => (
                  <div
                    key={publication.alt}
                    className="w-full min-w-0 flex items-center justify-center"
                  >
                    <Image
                      src={publication.src}
                      alt={publication.alt}
                      width={publication.width}
                      height={publication.height}
                      className={`${publication.className} max-w-full hero-publication-logo hero-publication-pulse`}
                      style={{ animationDelay: `${index * 0.3}s` }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Client Logos Section */}
        <section className="py-16 mb-20 overflow-hidden">
          <div className="container mx-auto px-6 mb-10">
            {/* Handwritten text with wavy arrow */}
            <div className="flex flex-col items-center justify-center relative">
              <p 
                className="text-2xl md:text-3xl text-[#0F0F0F] font-[family-name:var(--font-caveat)] animate-wiggle"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              >
                We work with brands focused on growth
              </p>
              {/* Wavy Arrow SVG */}
              <svg 
                className="w-24 h-12 mt-2 text-[#D733A2] animate-float" 
                viewBox="0 0 100 50" 
                fill="none"
              >
                <path 
                  d="M10 25 Q 25 10, 40 25 T 70 25 T 90 25" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  fill="none"
                />
                <path 
                  d="M80 20 L 90 25 L 80 30" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Infinite scrolling logos */}
          <div className="relative w-full">
            <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
              {/* First set of logos */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16 px-8 shrink-0">
                  <div className="group relative">
                    <Image
                      src="/logos/virtualst.webp"
                      alt="VirtualStaging.com"
                      width={180}
                      height={50}
                      className="h-10 md:h-12 w-auto object-contain logo-stylized"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D733A2]/0 via-[#D733A2]/20 to-[#D733A2]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </div>
                  <div className="group relative">
                    <Image
                      src="/logos/wealthofgeeks.webp"
                      alt="Wealth of Geeks"
                      width={200}
                      height={50}
                      className="h-8 md:h-10 w-auto object-contain logo-stylized"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D733A2]/0 via-[#D733A2]/20 to-[#D733A2]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </div>
                  <div className="group relative">
                    <Image
                      src="/logos/sweatblock.webp"
                      alt="SweatBlock"
                      width={160}
                      height={50}
                      className="h-8 md:h-10 w-auto object-contain logo-stylized"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D733A2]/0 via-[#D733A2]/20 to-[#D733A2]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </div>
                  <div className="group relative">
                    <Image
                      src="/logos/rudis.webp"
                      alt="Rudis Wrestling"
                      width={140}
                      height={50}
                      className="h-10 md:h-12 w-auto object-contain logo-stylized"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D733A2]/0 via-[#D733A2]/20 to-[#D733A2]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </div>
                  <div className="group relative">
                    <Image
                      src="/logos/netify.webp"
                      alt="Netify"
                      width={120}
                      height={50}
                      className="h-10 md:h-12 w-auto object-contain logo-stylized"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D733A2]/0 via-[#D733A2]/20 to-[#D733A2]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </div>
                  <div className="group relative">
                    <Image
                      src="/logos/therapyrooms.webp"
                      alt="US Therapy Rooms"
                      width={200}
                      height={50}
                      className="h-8 md:h-10 w-auto object-contain logo-stylized"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D733A2]/0 via-[#D733A2]/20 to-[#D733A2]/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient fade edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        </section>

        {/* Strategic Strike Section */}
        <section ref={strategicSectionRef} className="container mx-auto px-6 mb-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-[#08090D] border border-[#1A1B22] px-8 py-10 md:px-12 md:py-12 shadow-[0_24px_80px_rgba(15,15,15,0.35)]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
                  Where others scatter <br /> links — we strategically{" "}
                  <span className="text-gradient-purple">strike.</span>
                </h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  In a landscape where strategic precision is key, we focus on digital PR, the only
                  white-hat method left for boosting SERP visibility. Each link is carefully placed
                  in the right publication for maximum impact, not just scattered.
                </p>
                <a href="#howitworks">
                  <Button
                    className="bg-[#D733A2] hover:bg-[#b22a85] text-white rounded-lg px-6 h-11 font-semibold"
                    data-testid="button-see-how-it-works"
                  >
                    See how it works
                  </Button>
                </a>
              </div>

              <div className="flex justify-center">
                <motion.div
                  style={{ y: strategicLogosParallax }}
                  className="space-y-3 md:space-y-4 text-white/95 w-full max-w-md flex flex-col items-center"
                >
                  {featuredPublications.map((publication) => (
                    <div key={publication.src} className="flex justify-center w-full">
                      <Image
                        src={publication.src}
                        alt={publication.alt}
                        width={publication.width}
                        height={publication.height}
                        className={`${publication.className} publication-logo`}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="pb-24 mb-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="inline-flex items-center rounded-full bg-[#F8E4F0] text-[#D733A2] px-4 py-1.5 text-sm font-semibold mb-4">
                Trusted by Industry Leaders
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F]">
                What our clients say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {featuredTestimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className={`testimonial-card ${testimonial.tone === "violet" ? "testimonial-card-violet" : "testimonial-card-pink"} relative overflow-hidden rounded-2xl p-8 md:p-10 text-white bg-gradient-to-r ${testimonial.gradient}`}
                >
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute right-5 top-2 text-6xl text-white/25 font-serif">
                    &quot;
                  </div>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/55 shadow-[0_0_0_2px_rgba(255,255,255,0.18),0_8px_18px_rgba(0,0,0,0.28)]">
                        <Image
                          src={testimonial.avatarSrc}
                          alt={testimonial.avatarAlt}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-xl leading-tight">{testimonial.name}</p>
                        <p className="text-white/85 text-sm">{testimonial.website}</p>
                      </div>
                    </div>

                    <p className="text-white/95 leading-relaxed mb-6">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="tracking-[0.2em] text-[#FFD76A]">★★★★★</span>
                      <span className="text-white/85">Verified Client</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="howitworks" className="container mx-auto px-6 mb-32">
          <div className="relative overflow-hidden rounded-[34px] md:rounded-[44px] bg-[#F2EFF9] px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -left-20 top-10 h-52 w-52 rounded-full bg-[#B65BFF]/18 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#5A4DBF]/14 blur-3xl" />
            <div className="pointer-events-none absolute left-1/4 bottom-8 h-56 w-56 rounded-full bg-[#F04CB7]/12 blur-3xl" />

            <div className="text-center mb-10 md:mb-14 relative z-10">
              <p className="text-sm text-[#5A4DBF] uppercase tracking-wider font-semibold mb-2">
                Our stress-free process
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F]">
                So, how exactly <br />does this work?
              </h2>
            </div>

            <div className="relative z-10 space-y-10 md:space-y-14 lg:space-y-16">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-1"
                >
                  <div className="how-panel-gradient how-panel-rim how-panel-float relative min-h-[320px] md:min-h-[380px] rounded-[30px] md:rounded-[36px] p-6 md:p-10 shadow-[0_30px_60px_rgba(90,77,191,0.15)]">
                    <div className="how-panel-glow absolute inset-0 rounded-[inherit]" />
                    <div className="how-panel-grain absolute inset-0 rounded-[inherit]" />
                    <div className="absolute left-6 right-6 top-1/2 h-24 -translate-y-1/2 rounded-2xl bg-white/20 blur-sm" />
                    <div className="absolute left-8 top-10 h-20 w-20 rounded-full bg-white/20 blur-xl how-orb-drift" />
                    <div className="absolute right-10 bottom-12 h-16 w-16 rounded-full bg-[#F2B4FF]/35 blur-xl how-orb-drift-delayed" />
                    <span className="how-twinkle absolute right-16 top-20 h-2.5 w-2.5 rounded-full bg-white/80" />
                    <span className="how-twinkle how-twinkle-delayed absolute left-16 bottom-20 h-2 w-2 rounded-full bg-white/70" />

                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 mx-auto flex h-full items-center justify-center"
                    >
                      <div className="relative w-full max-w-[255px] md:max-w-[290px] rounded-[20px] md:rounded-[22px] bg-white p-6 md:p-7 shadow-[0_18px_40px_rgba(15,15,15,0.14)]">
                        <div className="how-sheen absolute inset-0 rounded-[inherit]" />
                        <svg
                          className="absolute left-1/2 top-3 h-16 w-20 -translate-x-1/2 text-[#9D4EED]"
                          viewBox="0 0 80 60"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M44 6c8 0 13 9 8 16-4 6 0 11 5 14 8 5 4 18-7 16-8-1-12-8-19-4-8 5-19-3-18-13 1-8 8-12 14-11 5 0 8-3 8-8 0-6 4-10 9-10Z"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <motion.div
                          animate={{ rotate: [0, -1.4, 1.1, -0.7, 0], y: [0, -1, 0] }}
                          transition={{
                            duration: 5.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.22, 0.48, 0.74, 1],
                          }}
                          style={{ transformOrigin: "50% 88%" }}
                          className="relative mx-auto mt-8 h-40 w-36 md:h-44 md:w-40"
                        >
                          <div className="how-bag-shadow absolute inset-x-4 bottom-2 h-5 rounded-full bg-black/15 blur-xl" />
                          <div className="absolute inset-x-2 bottom-0 top-7 rounded-[12px] bg-white border border-[#E8E8F2] shadow-[0_10px_24px_rgba(15,15,15,0.08)]" />
                          <div className="absolute left-1/2 top-0 h-10 w-16 -translate-x-1/2 rounded-t-full border-[3px] border-[#9D4EED] border-b-0" />
                          <div className="absolute inset-x-0 top-[58px] flex justify-center">
                            <Image
                              src="/logo.png"
                              alt="Linkifi"
                              width={86}
                              height={26}
                              className="h-6 w-auto object-contain opacity-95"
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-2 max-w-xl"
                >
                  <div className="flex gap-4 md:gap-5">
                    <div className="how-step-icon">
                      <Boxes className="h-5 w-5 text-[#17131F]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-[#0F0F0F] leading-tight mb-3">
                        You choose your package.
                      </h3>
                      <p className="text-[#2A2733] md:text-lg leading-relaxed">
                        It starts with strategy. Are you aiming for a pure SEO play built on the
                        most authoritative links available, or do you want a broader Authority PR
                        approach that strengthens brand credibility and expands visibility across
                        search, media, and AI platforms? We design a plan around that decision so
                        every placement supports your bigger commercial goals.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-14 items-center">
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-2 lg:order-1 max-w-xl"
                >
                  <div className="flex gap-4 md:gap-5">
                    <div className="how-step-icon">
                      <Megaphone className="h-5 w-5 text-[#17131F]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-[#0F0F0F] leading-tight mb-3">
                        We pitch journalists.
                      </h3>
                      <p className="text-[#2A2733] md:text-lg leading-relaxed">
                        Based on your goals, we craft a digital PR strategy that amplifies your
                        marketing efforts, delivering campaigns with measurable impact. By staying
                        ahead of trends and expertly pitching to journalists, we position you as the
                        go-to expert, ensuring your voice is heard in all the right places.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-1 lg:order-2"
                >
                  <div className="how-panel-gradient how-panel-rim how-panel-float-delayed relative min-h-[320px] md:min-h-[360px] rounded-[30px] md:rounded-[36px] p-6 md:p-8 shadow-[0_30px_60px_rgba(90,77,191,0.15)]">
                    <div className="how-panel-glow absolute inset-0 rounded-[inherit]" />
                    <div className="how-panel-grain absolute inset-0 rounded-[inherit]" />
                    <div className="absolute right-10 top-10 h-14 w-14 rounded-full bg-white/20 blur-xl how-orb-drift" />
                    <div className="absolute left-8 bottom-8 h-20 w-20 rounded-full bg-[#F9A8FF]/25 blur-xl how-orb-drift-delayed" />

                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                      className="how-chat-bubble-white relative z-10 ml-auto max-w-[84%] rounded-[16px] bg-white px-4 py-4 md:px-5 md:py-4 text-[#5A6178] shadow-[0_10px_28px_rgba(20,20,35,0.12)]"
                    >
                      <div className="absolute -right-1.5 top-8 h-4 w-4 rotate-45 rounded-[3px] bg-white" />
                      <p className="text-sm md:text-base leading-relaxed">
                        I would like to speak to CEOs in fintech regarding resilient business models
                        when it comes to rising delinquency.
                      </p>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                      className="how-chat-bubble-dark relative z-10 mt-6 max-w-[86%] rounded-[18px] bg-[#07070B] px-4 py-4 md:px-5 md:py-5 text-white shadow-[0_14px_32px_rgba(0,0,0,0.35)]"
                    >
                      <div className="absolute -left-1.5 top-12 h-4 w-4 rotate-45 rounded-[3px] bg-[#07070B]" />
                      <div className="mb-3 flex items-center gap-1.5">
                        <span className="how-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" />
                        <span className="how-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" style={{ animationDelay: "0.15s" }} />
                        <span className="how-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" style={{ animationDelay: "0.3s" }} />
                        <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
                          Draft Pitch
                        </span>
                      </div>
                      <p className="text-base md:text-lg leading-snug mb-4">
                        We&apos;re currently putting a whitepaper together on this exact subject.
                        Might be worth a chat. Take a look.
                      </p>

                      <div className="relative rounded-xl bg-white p-3 text-[#0F0F0F] shadow-inner">
                        <div className="how-sheen absolute inset-0 rounded-xl" />
                        <p className="text-[9px] md:text-[10px] font-semibold text-center tracking-wide">
                          Fintech Resilience in Small Business Lending
                        </p>
                        <div className="mt-2 space-y-1.5">
                          <div className="h-2 rounded-full bg-gray-200" />
                          <div className="h-2 w-5/6 rounded-full bg-gray-200" />
                          <div className="h-2 w-3/4 rounded-full bg-gray-200" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-1"
                >
                  <div className="how-panel-gradient how-panel-rim how-panel-float relative min-h-[330px] md:min-h-[380px] rounded-[30px] md:rounded-[36px] p-6 md:p-8 shadow-[0_30px_60px_rgba(90,77,191,0.15)]">
                    <div className="how-panel-glow absolute inset-0 rounded-[inherit]" />
                    <div className="how-panel-grain absolute inset-0 rounded-[inherit]" />
                    <div className="absolute left-12 top-10 h-16 w-16 rounded-full bg-white/20 blur-xl how-orb-drift-delayed" />
                    <div className="absolute right-8 bottom-14 h-20 w-20 rounded-full bg-[#F497FF]/25 blur-xl how-orb-drift" />

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="relative z-10 mx-auto mt-10 w-full max-w-[370px] rounded-2xl bg-white p-4 md:p-5 shadow-[0_16px_36px_rgba(20,20,35,0.14)]"
                    >
                      <div className="how-sheen absolute inset-0 rounded-2xl" />
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6F61]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#F8C74A]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#60D394]" />
                        </div>
                        <div className="space-y-1">
                          <span className="block h-1 w-4 rounded-full bg-[#8B82F2]" />
                          <span className="block h-1 w-4 rounded-full bg-[#8B82F2]" />
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-xl border border-[#D8D3FB] bg-[#F4F2FF] p-3 space-y-2.5">
                        <div className="how-report-row">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#D733A2]" />
                          </span>
                          <span className="text-[10px] font-semibold text-[#5A4DBF]">Fintech</span>
                          <span className="truncate text-[10px] text-[#6A6E84]">
                            HuffPost — Resilient Business Models
                          </span>
                          <span className="how-soft-pulse text-[10px] font-bold text-[#5A4DBF]">
                            ACCEPTED
                          </span>
                        </div>

                        <div className="how-report-row">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#D733A2]" />
                          </span>
                          <span className="text-[10px] font-semibold text-[#5A4DBF]">Motoring</span>
                          <span className="truncate text-[10px] text-[#6A6E84]">
                            New York Times — EV &amp; second-hand market
                          </span>
                          <span className="how-soft-pulse text-[10px] font-bold text-[#5A4DBF]">
                            ACCEPTED
                          </span>
                        </div>

                        <div className="how-report-row">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#D733A2]" />
                          </span>
                          <span className="text-[10px] font-semibold text-[#5A4DBF]">Health</span>
                          <span className="truncate text-[10px] text-[#6A6E84]">
                            Healthline — Healthy Sleep New Research
                          </span>
                          <span className="how-soft-pulse text-[10px] font-bold text-[#5A4DBF]">
                            ACCEPTED
                          </span>
                        </div>
                        <div className="how-report-scan absolute inset-x-2 top-2 h-8 rounded-lg" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className="order-2 max-w-xl"
                >
                  <div className="flex gap-4 md:gap-5">
                    <div className="how-step-icon">
                      <BarChart3 className="h-5 w-5 text-[#17131F]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-display font-bold text-[#0F0F0F] leading-tight mb-3">
                        We monitor pitches and report to you.
                      </h3>
                      <p className="text-[#2A2733] md:text-lg leading-relaxed">
                        Every link we secure is instantly added to your report in real-time -
                        exciting, isn&apos;t it? Get ready to make room on your homepage&apos;s
                        press-badge section, because we&apos;re about to fill it with all the juicy
                        links we land for you!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="Pricing" className="container mx-auto px-6 mb-32 scroll-mt-28 md:scroll-mt-32">
          <div className="offer-showcase-shell relative overflow-hidden rounded-[34px] md:rounded-[42px] px-6 py-10 md:px-10 md:py-14">
            <div className="pointer-events-none absolute -left-14 top-8 h-48 w-48 rounded-full bg-[#A566FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#5A4DBF]/12 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#F14EC4]/10 blur-3xl" />

            <div className="relative z-10 text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F] mb-4">
                Our Packages
              </h2>
              <p className="max-w-3xl mx-auto text-[#535479] md:text-lg leading-relaxed">
                Choose SEO Digital PR for ranking-focused performance, or Authority PR for broader
                authority and visibility across search and AI platforms.
              </p>
            </div>

            <div className="relative z-10 grid xl:grid-cols-2 gap-8">
              {packageOffers.map((offer, index) => (
                <motion.article
                  key={offer.key}
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`offer-card offer-card-rim ${
                    offer.tone === "seo" ? "offer-card-seo" : "offer-card-authority"
                  } relative overflow-hidden rounded-[28px] md:rounded-[32px] p-6 md:p-8 h-full`}
                  style={{ animationDelay: `${index * 0.45}s` }}
                >
                  <div className="offer-card-glow absolute inset-0 rounded-[inherit]" />
                  <div className="offer-card-grain absolute inset-0 rounded-[inherit]" />
                  <div className="offer-orb absolute -right-8 top-6 h-24 w-24 rounded-full blur-2xl" />
                  <div className="offer-orb offer-orb-delayed absolute left-6 bottom-8 h-20 w-20 rounded-full blur-2xl" />

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="offer-card-header flex flex-col gap-3 mb-6">
                      <div className="offer-heading-shell flex items-start gap-3 md:gap-4">
                        <div
                          className={`offer-icon-shell ${
                            offer.tone === "seo" ? "offer-icon-shell-seo" : "offer-icon-shell-authority"
                          }`}
                        >
                          {offer.tone === "seo" ? (
                            <div className="offer-header-graph" aria-hidden="true">
                              <span />
                              <span />
                              <span />
                              <span />
                            </div>
                          ) : (
                            <Sparkles className="h-5 w-5 text-[#111018]" />
                          )}
                        </div>
                        <div>
                          <p className="offer-eyebrow">
                            {offer.eyebrow}
                          </p>
                          <h3 className="offer-card-title">
                            {offer.title}
                          </h3>
                        </div>
                      </div>
                      <div
                        className={`offer-chip ${
                          offer.tone === "seo" ? "offer-chip-seo" : "offer-chip-authority"
                        }`}
                      >
                        {offer.tone === "authority" ? (
                          <span className="offer-chip-icon" aria-hidden="true">
                            <Trophy className="h-3.5 w-3.5" />
                          </span>
                        ) : null}
                        {offer.badge}
                      </div>
                    </div>

                    <p
                      className={`offer-description text-white/90 leading-relaxed md:text-[1rem] ${
                        offer.tone === "authority" ? "offer-description-authority" : ""
                      }`}
                    >
                      {offer.description}
                    </p>

                    <div className="offer-tags-row mt-5 flex flex-wrap gap-2.5">
                      {offer.tags.map((tag) => (
                        <span key={tag} className="offer-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-3">
                      {offer.bullets.map((bullet) => (
                        <div key={bullet} className="offer-bullet">
                          <span className="offer-bullet-icon">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm md:text-[15px] text-white/95">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-7 flex justify-center">
                      <Link href="/contact-us" className="w-full sm:w-auto">
                        <Button
                          className={`offer-cta h-12 rounded-full px-6 font-semibold w-full sm:min-w-[220px] justify-center ${
                            offer.tone === "seo"
                              ? "bg-white text-[#3E32A8] hover:bg-white/90"
                              : "bg-[#0F0F0F] text-white hover:bg-black"
                          }`}
                          data-testid={`button-package-${offer.key}`}
                        >
                          {offer.ctaLabel}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="video-testimonials-shell relative overflow-hidden rounded-[34px] md:rounded-[42px] px-6 py-12 md:px-10 md:py-14">
            <div className="video-testimonials-orb absolute -left-12 top-16 h-44 w-44 rounded-full blur-3xl" />
            <div className="video-testimonials-orb video-testimonials-orb-delayed absolute right-8 top-6 h-52 w-52 rounded-full blur-3xl" />
            <div className="video-testimonials-orb absolute left-1/2 bottom-0 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl" />

            <div className="video-side-badge hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="video-side-badge video-side-badge-alt hidden lg:flex absolute left-10 bottom-8">
              <Fingerprint className="h-5 w-5 text-white" />
            </div>

            <div className="relative z-10">
              <h2 className="text-center text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                Testimonials
              </h2>

              <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">
                {videoTestimonials.map((item, index) => (
                  <motion.article
                    key={item.name}
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.2 }}
                    className="video-testimonial-card group relative overflow-hidden rounded-[24px] md:rounded-[26px]"
                    style={{ animationDelay: `${index * 0.22}s` }}
                    onMouseEnter={() => handleTestimonialHoverStart(index)}
                    onMouseLeave={() => handleTestimonialHoverEnd(index)}
                    onFocus={() => handleTestimonialHoverStart(index)}
                    onBlur={() => handleTestimonialHoverEnd(index)}
                    onClick={() => handleTestimonialClick(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play testimonial from ${item.name}`}
                  >
                    <video
                      ref={(node) => {
                        testimonialVideoRefs.current[index] = node;
                      }}
                      src={item.src}
                      className="video-testimonial-media"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="video-testimonial-overlay absolute inset-0" />
                    <div className="video-testimonial-noise absolute inset-0" />

                    <p className="video-testimonial-name absolute top-5 left-1/2 -translate-x-1/2">
                      {item.name}
                    </p>

                    <div className="video-testimonial-play absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Play className="h-4 w-4 text-white" />
                    </div>

                    <div className="video-testimonial-meta absolute inset-x-6 bottom-6 text-center">
                      <p className="video-testimonial-company">{item.company}</p>
                      <p className="video-testimonial-role">{item.role}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-8 flex justify-center md:justify-end">
                <a
                  href="https://book.linkifi.io/widget/bookings/pr-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="video-testimonials-cta h-12 rounded-full px-7 md:px-8 text-base font-semibold bg-[#5A4DBF] hover:bg-[#4C40A6] text-white"
                    data-testid="button-video-testimonials-contact"
                  >
                    Book a Call With Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Work Showcase Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="relative overflow-hidden rounded-[34px] md:rounded-[42px] border border-[#171927] bg-[#07080E] px-6 py-12 md:px-10 md:py-14 shadow-[0_32px_90px_rgba(7,8,14,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(114,91,255,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(53,199,255,0.14),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(215,51,162,0.14),transparent_34%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:44px_44px] opacity-40" />

            <div className="relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold text-[#8F84FF] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                  We&apos;re proud of our results
                </p>
                <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold tracking-tight text-white">
                  Our work
                </h2>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-[#B8B3D9]">
                  Three recent campaigns that show what disciplined digital PR looks like when every
                  placement is built to create measurable commercial impact.
                </p>
              </div>

              <div className="mt-10 space-y-6 md:space-y-7">
                {workShowcaseItems.map((item, index) => {
                  const CardIcon = item.Icon;

                  return (
                    <motion.article
                      key={item.key}
                      variants={fadeIn}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true, amount: 0.15 }}
                      whileHover={{ y: -4 }}
                      className="group grid gap-4 rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,19,30,0.96),rgba(10,11,18,0.96))] p-4 md:gap-6 md:p-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]"
                      style={{ animationDelay: `${index * 0.14}s` }}
                    >
                      <div className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br ${item.gradient} p-[1px] min-h-[250px]`}>
                        <div className="relative h-full rounded-[23px] bg-[linear-gradient(180deg,rgba(8,10,18,0.96),rgba(13,15,24,0.98))] p-6 md:p-7">
                          <div className="absolute inset-0 rounded-[23px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(122,109,255,0.16),transparent_26%)]" />
                          <div className="absolute inset-0 rounded-[23px] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />

                          <div className="relative z-10 flex h-full flex-col justify-between">
                            <div className="flex items-start justify-between gap-4">
                              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                                {item.eyebrow}
                              </div>
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
                                <CardIcon className="h-5 w-5" />
                              </div>
                            </div>

                            <div className="pt-6">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                                {item.statLabel}
                              </p>
                              <p className="mt-3 font-display text-[clamp(3rem,6vw,4.75rem)] font-bold leading-none tracking-[-0.06em] text-white">
                                {item.statValue}
                              </p>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-3">
                              {item.proofPoints.map((proof) => (
                                <div
                                  key={proof}
                                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.14em] text-white/70"
                                >
                                  {proof}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex min-h-[250px] flex-col justify-between rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 md:p-6">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8F84FF]">
                            {item.kicker}
                          </p>
                          <h3 className="mt-3 text-2xl md:text-[2rem] font-display font-bold leading-tight text-white">
                            {item.title}
                          </h3>
                          <p className="mt-4 max-w-2xl text-[15px] md:text-base leading-relaxed text-[#B8B3D9]">
                            {item.summary}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-end md:justify-between">
                          <div className="grid gap-2.5">
                            {item.proofPoints.map((proof) => (
                              <div
                                key={`${item.key}-${proof}`}
                                className="flex items-center gap-2.5 text-sm"
                              >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/8 text-[#9B90FF]">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </span>
                                <span className="font-medium text-white">{proof}</span>
                              </div>
                            ))}
                          </div>

                          <Link href={item.href} className="w-full md:w-auto">
                            <Button
                              className="h-11 w-full rounded-full border border-white/10 bg-white text-[#151327] hover:bg-white/90 md:min-w-[190px]"
                              data-testid={`button-work-showcase-${item.key}`}
                            >
                              Read case study
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-center">
                <Link href="/case-studies">
                  <Button
                    className="h-14 rounded-full px-8 md:px-10 text-base md:text-lg font-semibold bg-white text-[#151327] hover:bg-white/92 shadow-[0_18px_40px_rgba(0,0,0,0.24)]"
                    data-testid="button-work-showcase-all-case-studies"
                  >
                    Read more case studies
                    <ArrowRight className="ml-2.5 h-4.5 w-4.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="relative overflow-hidden rounded-[34px] md:rounded-[42px] border border-[#131521] bg-[#090B12] px-6 py-12 md:px-10 md:py-14 shadow-[0_28px_88px_rgba(9,11,18,0.42)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(114,91,255,0.18),transparent_30%),radial-gradient(circle_at_84%_14%,rgba(53,199,255,0.14),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(215,51,162,0.12),transparent_34%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] [background-size:42px_42px] opacity-40" />

            <div className="relative z-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold text-[#8F84FF]">
                  Public proof
                </p>
                <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold tracking-tight text-white">
                  What our clients have to say
                </h2>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-[#B8B3D9]">
                  Real public feedback from founders, operators, and site owners who have seen the
                  results in their traffic, rankings, and authority.
                </p>
              </div>

              <div className="mt-10 columns-1 gap-5 md:columns-2 xl:columns-3">
                {socialProofTweets.map((tweet, index) => (
                  <motion.article
                    key={tweet.url}
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={{ y: -4 }}
                    className="group relative mb-5 break-inside-avoid overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,19,30,0.96),rgba(10,11,18,0.98))] p-[1px] shadow-[0_20px_48px_rgba(0,0,0,0.26)]"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="relative h-full rounded-[27px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-4">
                      <div className="absolute inset-0 rounded-[27px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(122,109,255,0.12),transparent_28%)]" />

                      <div className="relative z-10">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                            {tweet.label}
                          </div>
                          <a
                            href={tweet.url.replace("twitter.com", "x.com")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-[#C1BAFF] transition-colors hover:text-white"
                          >
                            {tweet.handle}
                          </a>
                        </div>

                        <div className="social-proof-embed relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0b0d15]">
                          <blockquote
                            className="twitter-tweet !m-0"
                            data-theme="dark"
                            data-dnt="true"
                            data-conversation="none"
                            data-chrome="nofooter noborders transparent"
                          >
                            <a href={tweet.url}>View post by {tweet.handle}</a>
                          </blockquote>
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0b0d15] via-[#0b0d15]/85 to-transparent" />
                        </div>

                        <div className="mt-3 flex justify-end">
                          <a
                            href={tweet.url.replace("twitter.com", "x.com")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition-colors hover:text-white"
                          >
                            Open on X
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 mb-24">
          <div className="relative overflow-hidden rounded-[34px] md:rounded-[42px] border border-[#151726] bg-[#090B12] px-6 py-12 md:px-10 md:py-14 shadow-[0_34px_100px_rgba(9,11,18,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(114,91,255,0.2),transparent_30%),radial-gradient(circle_at_84%_20%,rgba(53,199,255,0.14),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(215,51,162,0.16),transparent_34%)]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] [background-size:42px_42px] opacity-40" />

            <div className="relative z-10">
              <div className="mx-auto max-w-4xl text-center">
                <p className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-sm font-semibold text-[#8F84FF]">
                  Ready when you are
                </p>
                <h2 className="mt-5 text-4xl md:text-6xl font-display font-bold tracking-tight text-white">
                  Ready to build powerful links?
                </h2>
                <p className="mt-5 text-base md:text-xl leading-relaxed text-[#C0BCDB]">
                  If you want authoritative coverage that improves rankings, strengthens trust, and
                  compounds across search, media, and AI visibility, this is the next step.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
                {["Tier-one placements", "Editorially earned", "Commercially focused"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/80"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-[#8F84FF]" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#Pricing">
                  <Button
                    size="lg"
                    className="h-14 min-w-[220px] rounded-full bg-[#5A4DBF] px-8 text-lg font-bold text-white shadow-[0_18px_38px_rgba(90,77,191,0.38)] transition-all hover:bg-[#4B40A6] hover:shadow-[0_22px_44px_rgba(90,77,191,0.46)]"
                    data-testid="button-cta-get-started"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link href="/contact-us">
                  <Button
                    size="lg"
                    className="h-14 min-w-[220px] rounded-full border border-white/12 bg-white/[0.08] px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/[0.14]"
                    data-testid="button-cta-contact"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative overflow-hidden border-t border-[#0D1026] bg-[#060710] pt-24 pb-10 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(90,77,191,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(122,98,255,0.14),transparent_34%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="relative container mx-auto px-6">
            <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(145deg,rgba(13,16,38,0.96),rgba(9,11,24,0.94))] px-8 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:px-12 md:py-12">
              <div className="grid gap-12 lg:grid-cols-[1.35fr_repeat(3,1fr)]">
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="relative flex h-12 w-[58px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <Image
                        src="/logo.png"
                        alt=""
                        fill
                        sizes="58px"
                        className="object-cover object-left"
                      />
                    </span>
                    <div>
                      <p className="text-xl font-semibold tracking-tight text-white">Linkifi</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#A79CFF]">
                        Authority-led Digital PR
                      </p>
                    </div>
                  </div>
                  <p className="max-w-sm text-sm leading-7 text-white/72">
                    Built for companies that need authoritative links, stronger brand signals, and
                    visible commercial outcomes across search and media.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                      Editorial placements
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/72">
                      SEO authority
                    </span>
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    {footerSocialLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8A7BFF]/50 hover:bg-[#8A7BFF]/16 hover:text-white hover:shadow-[0_14px_30px_rgba(122,98,255,0.22)]"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {footerMenus.map((menu) => (
                  <div key={menu.title}>
                    <h4 className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#A79CFF]">
                      {menu.title}
                    </h4>
                    <ul className="space-y-4">
                      {menu.links.map((item) => (
                        <li key={item.label}>
                          {item.href.startsWith("#") ? (
                            <a
                              href={item.href}
                              className="text-sm font-medium text-white/74 transition-colors hover:text-white"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-sm font-medium text-white/74 transition-colors hover:text-white"
                            >
                              {item.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
                <p>© 2024 Linkifi. All rights reserved.</p>
                <p className="font-medium text-white/42">
                  Built to turn digital PR into measurable authority.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
