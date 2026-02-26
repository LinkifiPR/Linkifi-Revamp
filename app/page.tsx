"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  CheckCircle2,
  Globe2,
  Menu,
  Megaphone,
  Newspaper,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const strategicSectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-[#5A4DBF]/20 selection:text-[#5A4DBF]">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 top-0 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Linkifi"
              width={160}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/expert-quote"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Expert Quote
            </Link>
            <Link
              href="/digital-pr"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Digital PR
            </Link>
            <a
              href="#Pricing"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Pricing
            </a>
            <Link
              href="/case-studies"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Case Studies
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact-us">
              <Button className="bg-[#5A4DBF] hover:bg-[#483d99] text-white shadow-lg shadow-[#5A4DBF]/20 transition-all duration-300 hover:scale-105 rounded-full px-6">
                Contact
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? (
              <X className="text-[#0F0F0F]" />
            ) : (
              <Menu className="text-[#0F0F0F]" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link href="/expert-quote" className="text-[#535479] font-medium py-2">
                Expert Quote
              </Link>
              <Link href="/digital-pr" className="text-[#535479] font-medium py-2">
                Digital PR
              </Link>
              <a href="#Pricing" className="text-[#535479] font-medium py-2">
                Pricing
              </a>
              <Link href="/case-studies" className="text-[#535479] font-medium py-2">
                Case Studies
              </Link>
              <Link href="/blog" className="text-[#535479] font-medium py-2">
                Blog
              </Link>
              <Link href="/contact-us">
                <Button className="w-full bg-[#5A4DBF] text-white rounded-full">
                  Contact
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
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
        <section id="Pricing" className="container mx-auto px-6 mb-32">
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

            <div className="relative z-10 grid lg:grid-cols-2 gap-8">
              {packageOffers.map((offer, index) => (
                <motion.article
                  key={offer.key}
                  variants={fadeIn}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.2 }}
                  className={`offer-card offer-card-rim ${
                    offer.tone === "seo" ? "offer-card-seo" : "offer-card-authority"
                  } relative overflow-hidden rounded-[28px] md:rounded-[32px] p-6 md:p-8`}
                  style={{ animationDelay: `${index * 0.45}s` }}
                >
                  <div className="offer-card-glow absolute inset-0 rounded-[inherit]" />
                  <div className="offer-card-grain absolute inset-0 rounded-[inherit]" />
                  <div className="offer-orb absolute -right-8 top-6 h-24 w-24 rounded-full blur-2xl" />
                  <div className="offer-orb offer-orb-delayed absolute left-6 bottom-8 h-20 w-20 rounded-full blur-2xl" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="offer-icon-shell">
                          {offer.tone === "seo" ? (
                            <Search className="h-5 w-5 text-[#111018]" />
                          ) : (
                            <Sparkles className="h-5 w-5 text-[#111018]" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/75 font-semibold">
                            {offer.eyebrow}
                          </p>
                          <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mt-1">
                            {offer.title}
                          </h3>
                        </div>
                      </div>
                      <div className="offer-chip">{offer.badge}</div>
                    </div>

                    <p className="text-white/90 leading-relaxed md:text-[1rem]">
                      {offer.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2.5">
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

                    <div className="mt-7 grid md:grid-cols-[1fr_auto] gap-4 items-stretch">
                      <div className="offer-mini-panel relative overflow-hidden rounded-2xl p-4">
                        <div className="offer-glint absolute inset-0" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-[0.18em] font-semibold mb-3">
                            {offer.tone === "seo" ? (
                              <Globe2 className="h-3.5 w-3.5" />
                            ) : (
                              <ShieldCheck className="h-3.5 w-3.5" />
                            )}
                            <span>{offer.miniTitle}</span>
                          </div>
                          <div className="space-y-2.5">
                            {offer.miniRows.map((row, rowIndex) => (
                              <div
                                key={row.label}
                                className="offer-mini-row"
                                style={{ animationDelay: `${rowIndex * 0.15}s` }}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {offer.tone === "seo" ? (
                                    <Newspaper className="h-3.5 w-3.5 text-white/70 shrink-0" />
                                  ) : (
                                    <Bot className="h-3.5 w-3.5 text-white/70 shrink-0" />
                                  )}
                                  <span className="truncate text-white/80 text-xs">{row.label}</span>
                                </div>
                                {row.value ? (
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <span className="text-white/55 text-xs">→</span>
                                    <span className="offer-mini-value">{row.value}</span>
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="offer-outcome-pill flex flex-col rounded-2xl p-4 min-w-[180px]">
                        <p className="text-white font-display font-bold text-lg leading-snug mt-3">
                          {offer.outcomeTitle}
                        </p>
                        <p className="mt-3 text-white/75 text-xs leading-relaxed">
                          {offer.outcomeSubtext}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                      <Link href="/contact-us">
                        <Button
                          className={`h-12 rounded-full px-6 font-semibold ${
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

        {/* FAQ Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#0F0F0F] text-center mb-12">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[#0F0F0F]">
                  What kind of publications do you get links from?
                </AccordionTrigger>
                <AccordionContent className="text-[#535479]">
                  We secure links from high-authority US and UK news publications with Domain Ratings
                  ranging from DR 40 to DR 95. This includes major outlets like Forbes, TechCrunch,
                  HuffPost, Yahoo, The New York Times, ZDNet, Healthline, and many more tier-1 publications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[#0F0F0F]">
                  How long does it take to get links?
                </AccordionTrigger>
                <AccordionContent className="text-[#535479]">
                  Delivery times vary based on your package. For smaller packages (5-10 links), expect
                  delivery within 12 months. Larger packages (20-50 links) may take 18-24 months. We
                  provide real-time reporting so you can track every link as it goes live.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[#0F0F0F]">
                  What is the average DR of links you provide?
                </AccordionTrigger>
                <AccordionContent className="text-[#535479]">
                  We guarantee an average Domain Rating of DR 70+ across all packages. Many of our
                  placements are in DR 80-95 publications, ensuring you get high-authority backlinks
                  that significantly impact your SEO.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[#0F0F0F]">
                  Are these links white-hat and safe?
                </AccordionTrigger>
                <AccordionContent className="text-[#535479]">
                  Absolutely. We exclusively use digital PR methods, which is the only truly white-hat
                  approach to link building. We pitch real stories to real journalists who choose to
                  feature your brand. These are genuine editorial placements, not paid links or PBNs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white border border-gray-200 rounded-2xl px-6">
                <AccordionTrigger className="text-left font-semibold text-[#0F0F0F]">
                  Do you offer payment plans?
                </AccordionTrigger>
                <AccordionContent className="text-[#535479]">
                  Yes! We offer 6-month payment plans for our 10 and 20 link packages, and 12-month
                  payment plans for our 50-link package. You can also choose one-time payment options
                  if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#0F0F0F] py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to build powerful links?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join the brands that trust Linkifi to deliver exceptional PR link building results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#Pricing">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full text-lg bg-[#5A4DBF] hover:bg-[#483d99] text-white font-bold"
                  data-testid="button-cta-get-started"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <Link href="/contact-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-full text-lg border-gray-600 text-white hover:bg-white/10"
                  data-testid="button-cta-contact"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white pt-20 pb-10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <Image
                    src="/logo.png"
                    alt="Linkifi"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <p className="text-[#535479] mb-6">
                  Building the most powerful links on the planet through Digital PR.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-6">Services</h4>
                <ul className="space-y-4 text-[#535479]">
                  <li>
                    <Link href="/expert-quote" className="hover:text-[#5A4DBF] transition-colors">
                      Expert Quote Link Building
                    </Link>
                  </li>
                  <li>
                    <Link href="/digital-pr" className="hover:text-[#5A4DBF] transition-colors">
                      Digital PR Campaigns
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-6">Company</h4>
                <ul className="space-y-4 text-[#535479]">
                  <li>
                    <Link href="/case-studies" className="hover:text-[#5A4DBF] transition-colors">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-[#5A4DBF] transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:text-[#5A4DBF] transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-6">Legal</h4>
                <ul className="space-y-4 text-[#535479]">
                  <li>
                    <Link href="/privacy" className="hover:text-[#5A4DBF] transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-[#5A4DBF] transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[#9aa0b0] text-sm">
              <p>© 2024 Linkifi. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
