"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
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
  const [pricingTab, setPricingTab] = useState<"monthly" | "onetime">("monthly");
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
      src: "/publication-logos/nytimes.png",
      alt: "The New York Times",
      width: 520,
      height: 90,
      className: "h-6 md:h-7 w-auto",
    },
    {
      src: "/publication-logos/hubspot.svg",
      alt: "HubSpot",
      width: 260,
      height: 72,
      className: "h-6 md:h-7 w-auto",
    },
    {
      src: "/publication-logos/menshealth.png",
      alt: "Men's Health",
      width: 320,
      height: 82,
      className: "h-6 md:h-7 w-auto",
    },
    {
      src: "/publication-logos/elle.svg",
      alt: "ELLE",
      width: 130,
      height: 52,
      className: "h-5 md:h-6 w-auto",
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

  const monthlyPricing = [
    {
      links: "10-LINKS",
      period: "6 MONTHLY PAYMENTS",
      price: "$1,375",
      perLink: "$825 per link",
      deliveryNote: "*Max delivery time 12 months.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-10-links-monthly/",
      popular: false,
    },
    {
      links: "20-LINKS",
      period: "6 MONTHLY PAYMENTS",
      price: "$2,667",
      perLink: "$800 per link",
      deliveryNote: "*Max delivery time 18 months.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-20-links-monthly/",
      popular: true,
    },
    {
      links: "50-LINKS",
      period: "12 MONTHLY PAYMENTS",
      price: "$3,125",
      perLink: "$750 per link",
      deliveryNote: "*Max delivery time 24 months.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-50-links-monthly/",
      popular: false,
    },
  ];

  const onetimePricing = [
    {
      links: "5-LINKS",
      period: "ONE-TIME PAYMENT",
      price: "$4,250",
      perLink: "$850 per link",
      deliveryNote: "*Max delivery time 12 months.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-5-links/",
      popular: false,
    },
    {
      links: "10-LINKS",
      period: "ONE-TIME PAYMENT",
      price: "$8,250",
      perLink: "$825 per link",
      deliveryNote: "*Max delivery time 12 months.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-10-links/",
      popular: true,
    },
    {
      links: "20-LINKS",
      period: "ONE-TIME PAYMENT",
      price: "$16,000",
      perLink: "$800 per link",
      deliveryNote: "*Max delivery time 18 months.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-20-links/",
      popular: false,
    },
    {
      links: "50-LINKS",
      period: "ONE-TIME PAYMENT",
      price: "$37,500",
      perLink: "$750 per link",
      deliveryNote: "*Max delivery time 24 months. Payment Plan Available.",
      checkoutUrl: "https://linkifi.thrivecart.com/linkifi-50-links/",
      popular: false,
    },
  ];

  const currentPricing = pricingTab === "monthly" ? monthlyPricing : onetimePricing;

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
          <div className="text-center mb-4">
            <p className="text-sm text-[#5A4DBF] uppercase tracking-wider font-semibold mb-2">
              Our stress-free process
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F]">
              So, how exactly <br />does this work?
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
            {/* Left - Bag illustration placeholder */}
            <div className="bg-gradient-to-br from-[#5A4DBF]/10 to-[#D733A2]/10 rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-[#5A4DBF]/20 rounded-3xl flex items-center justify-center mb-4">
                  <span className="text-6xl">📦</span>
                </div>
                <p className="text-[#535479] font-medium">Your link building package</p>
              </div>
            </div>

            {/* Right - Steps */}
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#5A4DBF] text-white flex items-center justify-center shrink-0">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0F0F0F]">
                    You choose your package.
                  </h3>
                  <p className="text-[#535479] leading-relaxed">
                    It all begins with strategy. What&apos;s your ultimate goal? Are you aiming for
                    brand awareness or a boost in organic traffic? Determining how many links you
                    need to build and from which kind of publications is crucial. We piece together
                    a strategy that makes sense and sets you on the path to achieving your objectives.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#5A4DBF] text-white flex items-center justify-center shrink-0">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0F0F0F]">
                    We pitch journalists.
                  </h3>
                  <p className="text-[#535479] leading-relaxed">
                    Based on your goals, we craft a digital PR strategy that amplifies your marketing
                    efforts, delivering campaigns with measurable impact. By staying ahead of trends
                    and expertly pitching to journalists, we position you as the go-to expert, ensuring
                    your voice is heard in all the right places.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#5A4DBF] text-white flex items-center justify-center shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#0F0F0F]">
                    We monitor pitches and report to you.
                  </h3>
                  <p className="text-[#535479] leading-relaxed">
                    Every link we secure is instantly added to your report in real-time – exciting,
                    isn&apos;t it? Get ready to make room on your homepage&apos;s press-badge section,
                    because we&apos;re about to fill it with all the juicy links we land for you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="Pricing" className="container mx-auto px-6 mb-32">
          <div className="text-center mb-12">
            <p className="text-sm text-[#5A4DBF] uppercase tracking-wider font-semibold mb-2">
              Choose what&apos;s best for you
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F] mb-8">
              Simple pricing.
            </h2>

            {/* Pricing Toggle */}
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setPricingTab("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  pricingTab === "monthly"
                    ? "bg-[#5A4DBF] text-white"
                    : "text-[#535479] hover:text-[#0F0F0F]"
                }`}
                data-testid="button-pricing-monthly"
              >
                MONTHLY
              </button>
              <button
                onClick={() => setPricingTab("onetime")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  pricingTab === "onetime"
                    ? "bg-[#5A4DBF] text-white"
                    : "text-[#535479] hover:text-[#0F0F0F]"
                }`}
                data-testid="button-pricing-onetime"
              >
                ONE-TIME
              </button>
            </div>
          </div>

          <div className={`grid gap-8 max-w-7xl mx-auto ${currentPricing.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-3 max-w-6xl'}`}>
            {currentPricing.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl flex flex-col relative ${
                  plan.popular
                    ? "bg-[#0F0F0F] text-white shadow-2xl transform lg:-translate-y-4"
                    : "bg-white border border-gray-200 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#D733A2] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-3xl uppercase">
                    Most Popular
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-1 ${plan.popular ? "text-white" : "text-[#0F0F0F]"}`}>
                  {plan.links}
                </h3>
                <p className={`text-sm mb-6 uppercase tracking-wider font-semibold ${plan.popular ? "text-gray-400" : "text-[#535479]"}`}>
                  {plan.period}
                </p>

                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${plan.popular ? "text-[#D733A2]" : "text-[#5A4DBF]"}`} />
                    <span>DR 40 - 95 PR Links</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${plan.popular ? "text-[#D733A2]" : "text-[#5A4DBF]"}`} />
                    <span>Guaranteed Average DR 70+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${plan.popular ? "text-[#D733A2]" : "text-[#5A4DBF]"}`} />
                    <span>US & UK News Publications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${plan.popular ? "text-[#D733A2]" : "text-[#5A4DBF]"}`} />
                    <span>Real-Time Reporting</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className={`text-xs mb-1 ${plan.popular ? "text-gray-400" : "text-[#535479]"}`}>only</p>
                  <p className="text-4xl font-bold">
                    {plan.price}
                    {pricingTab === "monthly" && <span className={`text-lg font-normal ${plan.popular ? "text-gray-400" : "text-[#535479]"}`}>/m</span>}
                  </p>
                  <p className={`text-sm mt-1 ${plan.popular ? "text-gray-400" : "text-[#535479]"}`}>
                    {plan.perLink}
                  </p>
                </div>

                <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full rounded-full h-12 font-bold ${
                      plan.popular
                        ? "bg-[#D733A2] hover:bg-[#b02a85] text-white"
                        : "bg-[#5A4DBF] hover:bg-[#483d99] text-white"
                    }`}
                    data-testid={`button-get-started-${plan.links.toLowerCase()}`}
                  >
                    Get started
                  </Button>
                </a>

                <p className={`text-xs mt-4 text-center ${plan.popular ? "text-gray-500" : "text-[#9aa0b0]"}`}>
                  {plan.deliveryNote}
                </p>
              </div>
            ))}
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
