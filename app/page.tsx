"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Shield,
  Zap,
  Menu,
  X,
  TrendingUp,
  Newspaper,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-[#5A4DBF]/20 selection:text-[#5A4DBF]">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass top-0 transition-all duration-300">
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
            <a
              href="#expert-quote"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Expert Quote
            </a>
            <a
              href="#digital-pr"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Digital PR
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#case-studies"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Case Studies
            </a>
            <a
              href="#blog"
              className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors"
            >
              Blog
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-[#5A4DBF] hover:bg-[#483d99] text-white shadow-lg shadow-[#5A4DBF]/20 transition-all duration-300 hover:scale-105 rounded-full px-6">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              <a href="#" className="text-[#535479] font-medium py-2">
                Digital PR
              </a>
              <a href="#" className="text-[#535479] font-medium py-2">
                Pricing
              </a>
              <a href="#" className="text-[#535479] font-medium py-2">
                Case Studies
              </a>
              <Button className="w-full bg-[#5A4DBF] text-white rounded-full">
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-24 lg:mb-32">
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
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full text-lg bg-[#5A4DBF] hover:bg-[#483d99] text-white shadow-xl shadow-[#5A4DBF]/20 transition-all hover:scale-105 w-full sm:w-auto font-bold"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-full text-lg border-gray-200 text-[#535479] hover:text-[#5A4DBF] hover:bg-purple-50 w-full sm:w-auto font-medium"
                >
                  View Case Studies
                </Button>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="flex flex-wrap gap-8 items-center grayscale opacity-60"
              >
                <span className="text-xl font-bold text-gray-400 font-serif">
                  Forbes
                </span>
                <span className="text-xl font-bold text-gray-400 font-sans tracking-tight">
                  TechCrunch
                </span>
                <span className="text-xl font-bold text-gray-400 font-mono">
                  WIRED
                </span>
                <span className="text-xl font-bold text-gray-400 font-serif italic">
                  The New York Times
                </span>
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
                        alt="L"
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

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-mesh rounded-full blur-3xl opacity-50 z-0"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* The Best Links Are Earned Section */}
        <section className="py-20 bg-gray-50 mb-24 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#A197EC 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F] mb-6">
                The best Links are earned.
              </h2>
              <p className="text-lg text-[#535479] leading-relaxed">
                With our digital PR campaigns, we control the narrative and
                directly pitch stories to journalists. Each campaign is
                meticulously designed for maximum exposure on some of the
                world&apos;s largest publications.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-[#5A4DBF]">
                  <Newspaper className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Strategic Placement</h3>
                <p className="text-[#535479]">
                  Where others scatter links, we strategically strike. We focus
                  on digital PR, placing links in publications that matter.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6 text-[#D733A2]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Viral Campaigns</h3>
                <p className="text-[#535479]">
                  When a campaign goes viral, it sends signals to Google into
                  overdrive, boosting your authority significantly.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">White-Hat Only</h3>
                <p className="text-[#535479]">
                  We focus on digital PR, the only true white-hat method left
                  for sustainable SERP visibility and brand growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="container mx-auto px-6 mb-32">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F] mb-8">
                So, how exactly does this work?
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A4DBF] text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      You choose your package
                    </h3>
                    <p className="text-[#535479]">
                      We help you determine how many links you need and from
                      which kind of publications. We piece together a strategy
                      that makes sense.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A4DBF] text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      We pitch journalists
                    </h3>
                    <p className="text-[#535479]">
                      Based on your goals, we craft a digital PR strategy. By
                      staying ahead of trends and expertly pitching to
                      journalists, we position you as the expert.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A4DBF] text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      We monitor & report
                    </h3>
                    <p className="text-[#535479]">
                      Every link we secure is instantly added to your report in
                      real-time. Get ready to fill your "featured in" section!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-[#5A4DBF]/5 rounded-3xl p-8 border border-[#5A4DBF]/10">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-medium text-[#0F0F0F]">
                      Pitch Sent: TechCrunch
                    </span>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">
                    10:42 AM
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border-l-4 border-green-500">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="font-medium text-[#0F0F0F]">
                      Link Secured: Forbes
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Live
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="font-medium text-[#0F0F0F]">
                      Drafting: Industry Report
                    </span>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    In Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="container mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#0F0F0F] mb-4">
              Simple Pricing.
            </h2>
            <p className="text-[#535479]">
              Choose the package that fits your growth goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 10 Links */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-[#0F0F0F] mb-2">
                10-LINKS
              </h3>
              <p className="text-sm text-[#535479] mb-6 uppercase tracking-wider font-semibold">
                6 Monthly Payments
              </p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-[#0F0F0F]">
                  $1,375
                </span>
                <span className="text-[#535479]">/mo</span>
                <p className="text-sm text-[#535479] mt-2">$825 per link</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">DR 40 - 95 PR Links</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">
                    Guaranteed Average DR 70+
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">
                    US & UK News Publications
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">Real-Time Reporting</span>
                </div>
              </div>

              <Button className="w-full bg-[#5A4DBF] hover:bg-[#483d99] text-white rounded-full h-12 font-bold">
                Get Started
              </Button>
            </div>

            {/* 20 Links - Popular */}
            <div className="p-8 rounded-3xl bg-[#0F0F0F] text-white shadow-2xl relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-[#D733A2] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl uppercase">
                Most Popular
              </div>

              <h3 className="text-2xl font-bold mb-2">20-LINKS</h3>
              <p className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-semibold">
                6 Monthly Payments
              </p>

              <div className="mb-8">
                <span className="text-4xl font-bold">$2,667</span>
                <span className="text-gray-400">/mo</span>
                <p className="text-sm text-gray-400 mt-2">$800 per link</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D733A2]" />
                  <span>DR 40 - 95 PR Links</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D733A2]" />
                  <span>Guaranteed Average DR 70+</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D733A2]" />
                  <span>US & UK News Publications</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D733A2]" />
                  <span>Real-Time Reporting</span>
                </div>
              </div>

              <Button className="w-full bg-[#D733A2] hover:bg-[#b02a85] text-white rounded-full h-12 font-bold">
                Get Started
              </Button>
            </div>

            {/* 50 Links */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <h3 className="text-2xl font-bold text-[#0F0F0F] mb-2">
                50-LINKS
              </h3>
              <p className="text-sm text-[#535479] mb-6 uppercase tracking-wider font-semibold">
                12 Monthly Payments
              </p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-[#0F0F0F]">
                  $3,125
                </span>
                <span className="text-[#535479]">/mo</span>
                <p className="text-sm text-[#535479] mt-2">$750 per link</p>
              </div>

              <div className="space-y-4 mb-8 flex-1">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">DR 40 - 95 PR Links</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">
                    Guaranteed Average DR 70+
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">
                    US & UK News Publications
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5A4DBF]" />
                  <span className="text-[#0F0F0F]">Real-Time Reporting</span>
                </div>
              </div>

              <Button className="w-full bg-[#5A4DBF] hover:bg-[#483d99] text-white rounded-full h-12 font-bold">
                Get Started
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-center mb-16">
              But don&apos;t just take our word for it.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-lg text-[#535479] mb-6 italic">
                  &quot;I&apos;ve been working with Linkifi for close to 4 months
                  now; Chris and his team have been one of the few services in
                  the world that have been able to consistently get me
                  high-level PR links without charging extortionate rates.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                      alt="Charles"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F0F0F]">Charles Floate</p>
                    <p className="text-sm text-[#5A4DBF]">charlesfloate.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-lg text-[#535479] mb-6 italic">
                  &quot;Linkifi masters the art of acquiring impressive,
                  white-hat PR links fast, even for new sites. It&apos;s the
                  first link-building service I&apos;ve endorsed in four years,
                  thanks to their exceptional results.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
                      alt="Mike"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#0F0F0F]">Mike Futia</p>
                    <p className="text-sm text-[#5A4DBF]">stupidsimpleseo.co</p>
                  </div>
                </div>
              </div>
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
                  Building the most powerful links on the planet through Digital
                  PR.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-6">Services</h4>
                <ul className="space-y-4 text-[#535479]">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Digital PR
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Link Building
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Strategy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-6">Company</h4>
                <ul className="space-y-4 text-[#535479]">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0F0F0F] mb-6">Legal</h4>
                <ul className="space-y-4 text-[#535479]">
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-[#5A4DBF] transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[#9aa0b0] text-sm">
              <p>© 2026 Linkifi. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
