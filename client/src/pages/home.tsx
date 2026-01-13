import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  BarChart3, 
  Shield, 
  Zap, 
  Menu, 
  X,
  Layout,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Palette,
  Share2
} from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoUrl from "@assets/Linkifi_Logo_-_transparent_black_(8)_1768320496237.png";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-[#5A4DBF]/20 selection:text-[#5A4DBF]">
      {/* Navbar - Clean White with Linkifi Logo */}
      <nav className="fixed w-full z-50 glass top-0 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo Image */}
            <img 
              src={logoUrl} 
              alt="Linkifi" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors">Pricing</a>
            <a href="#blog" className="text-sm font-medium text-[#535479] hover:text-[#5A4DBF] transition-colors">Blog</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-[#0F0F0F] hover:text-[#5A4DBF] hover:bg-purple-50 font-medium">Log in</Button>
            <Button className="bg-[#5A4DBF] hover:bg-[#483d99] text-white shadow-lg shadow-[#5A4DBF]/20 transition-all duration-300 hover:scale-105 rounded-full px-6">
              Sign Up Free
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-[#0F0F0F]" /> : <Menu className="text-[#0F0F0F]" />}
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
              <a href="#" className="text-[#535479] font-medium py-2">Features</a>
              <a href="#" className="text-[#535479] font-medium py-2">Pricing</a>
              <a href="#" className="text-[#535479] font-medium py-2">Log in</a>
              <Button className="w-full bg-[#5A4DBF] text-white rounded-full">Sign Up Free</Button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-32">
        {/* Hero Section - Split Layout */}
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
                  The #1 Link in Bio Tool
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#0F0F0F] leading-[1.1] mb-6 tracking-tight"
              >
                Everything you are. <br/>
                <span className="text-gradient-purple">In one simple link.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg md:text-xl text-[#535479] mb-8 leading-relaxed max-w-lg"
              >
                Join 25M+ people using Linkifi for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center gap-4 mb-12"
              >
                <div className="relative w-full sm:w-auto flex-1 max-w-sm">
                   <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 h-14 shadow-sm focus-within:ring-2 focus-within:ring-[#5A4DBF] transition-all">
                      <span className="text-gray-400 font-medium whitespace-nowrap">linkifi.io/</span>
                      <input 
                        type="text" 
                        placeholder="yourname" 
                        className="w-full bg-transparent border-none focus:outline-none text-[#0F0F0F] font-medium ml-1 placeholder:text-gray-300"
                      />
                   </div>
                </div>
                <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-[#D733A2] hover:bg-[#b02a85] text-white shadow-xl shadow-[#D733A2]/20 transition-all hover:scale-105 w-full sm:w-auto font-bold">
                  Claim your Linkifi
                </Button>
              </motion.div>
            </div>

            {/* Right Graphic - Mobile Mockups */}
            <motion.div variants={fadeIn} className="relative mx-auto lg:mr-0">
               {/* Decorative blobs */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-mesh rounded-full blur-3xl opacity-60 z-0"></div>
               
               {/* Phone Mockup Wrapper */}
               <div className="relative z-10 flex gap-6 justify-center lg:justify-end perspective-1000">
                  {/* Phone 1 (Behind) */}
                  <div className="w-64 h-[500px] bg-[#F3F4F6] rounded-[2.5rem] border-8 border-white shadow-2xl rotate-[-6deg] translate-y-12 hidden md:block overflow-hidden relative">
                    <div className="absolute top-0 w-full h-full bg-white flex flex-col items-center pt-12 px-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                        <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-24 h-3 bg-gray-100 rounded mb-6"></div>
                        <div className="w-full space-y-3">
                           <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
                           <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
                           <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
                        </div>
                    </div>
                  </div>

                  {/* Phone 2 (Main) */}
                  <div className="w-72 h-[580px] bg-[#0F0F0F] rounded-[3rem] border-8 border-[#0F0F0F] shadow-2xl relative overflow-hidden">
                      {/* Screen Content */}
                      <div className="w-full h-full bg-white overflow-hidden flex flex-col items-center pt-14 px-6 relative">
                          <div className="absolute top-0 left-0 w-full h-32 bg-[#5A4DBF]"></div>
                          
                          <div className="w-24 h-24 bg-white p-1 rounded-full relative z-10 mb-3 shadow-lg">
                             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop" alt="User" className="w-full h-full rounded-full object-cover" />
                          </div>
                          
                          <h3 className="text-xl font-bold text-[#0F0F0F] relative z-10">Sarah Creator</h3>
                          <p className="text-sm text-[#535479] mb-6 relative z-10">Digital Artist & Designer</p>
                          
                          <div className="w-full space-y-4 relative z-10">
                              <div className="h-14 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full flex items-center justify-between px-6 cursor-pointer transition-colors border border-gray-100">
                                 <span className="font-medium text-[#0F0F0F]">Latest YouTube Video</span>
                                 <Youtube className="w-5 h-5 text-red-500" />
                              </div>
                              <div className="h-14 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full flex items-center justify-between px-6 cursor-pointer transition-colors border border-gray-100">
                                 <span className="font-medium text-[#0F0F0F]">My Portfolio</span>
                                 <Palette className="w-5 h-5 text-[#5A4DBF]" />
                              </div>
                              <div className="h-14 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-full flex items-center justify-between px-6 cursor-pointer transition-colors border border-gray-100">
                                 <span className="font-medium text-[#0F0F0F]">Follow on Twitter</span>
                                 <Twitter className="w-5 h-5 text-blue-400" />
                              </div>
                              <div className="h-14 bg-[#D733A2] text-white rounded-full flex items-center justify-center px-6 cursor-pointer shadow-lg shadow-[#D733A2]/20">
                                 <span className="font-bold">Subscribe to Newsletter</span>
                              </div>
                          </div>

                          <div className="mt-auto mb-8 flex gap-4 text-[#535479]">
                             <Instagram className="w-5 h-5 hover:text-[#D733A2]" />
                             <Twitter className="w-5 h-5 hover:text-blue-400" />
                             <Linkedin className="w-5 h-5 hover:text-blue-700" />
                          </div>
                      </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Social Proof / Brands */}
        <section className="py-10 bg-gray-50 mb-24">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-semibold text-[#535479] mb-8 uppercase tracking-widest">Trusted by 25M+ Creators & Brands</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-60 mix-blend-multiply">
                    {/* Placeholder Brand Logos */}
                    <div className="text-xl font-bold font-display text-[#0F0F0F]">Shopify</div>
                    <div className="text-xl font-bold font-display text-[#0F0F0F]">Substack</div>
                    <div className="text-xl font-bold font-display text-[#0F0F0F]">Square</div>
                    <div className="text-xl font-bold font-display text-[#0F0F0F]">Patreon</div>
                    <div className="text-xl font-bold font-display text-[#0F0F0F]">Twitch</div>
                </div>
            </div>
        </section>

        {/* Feature Highlights */}
        <section id="features" className="container mx-auto px-6 mb-32">
            <div className="grid md:grid-cols-3 gap-12">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#5A4DBF]/10 flex items-center justify-center mb-6 text-[#5A4DBF] group-hover:bg-[#5A4DBF] group-hover:text-white transition-colors duration-300">
                        <Share2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-[#0F0F0F] mb-3">Share it anywhere</h3>
                    <p className="text-[#535479] leading-relaxed">
                        Take your Linkifi wherever your audience is, to help them discover all your important content.
                    </p>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#D733A2]/10 flex items-center justify-center mb-6 text-[#D733A2] group-hover:bg-[#D733A2] group-hover:text-white transition-colors duration-300">
                        <Layout className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-[#0F0F0F] mb-3">Easy to customize</h3>
                    <p className="text-[#535479] leading-relaxed">
                        Design your Linkifi to match your brand and style. No coding needed, just drag and drop.
                    </p>
                </motion.div>

                <motion.div 
                    whileHover={{ y: -5 }}
                    className="group"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#A197EC]/20 flex items-center justify-center mb-6 text-[#5A4DBF] group-hover:bg-[#5A4DBF] group-hover:text-white transition-colors duration-300">
                        <BarChart3 className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-[#0F0F0F] mb-3">Analyze your audience</h3>
                    <p className="text-[#535479] leading-relaxed">
                        Track your engagement over time, monitor revenue and learn what’s converting your audience.
                    </p>
                </motion.div>
            </div>
        </section>

        {/* Big Value Prop Section */}
        <section className="bg-[#5A4DBF] py-24 text-white relative overflow-hidden mb-32">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D733A2] rounded-full blur-[128px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
             
             <div className="container mx-auto px-6 relative z-10 text-center">
                 <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                     Analyze your audience and keep <br/> your followers engaged.
                 </h2>
                 <p className="text-[#A197EC] text-lg md:text-xl max-w-2xl mx-auto mb-12">
                     Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.
                 </p>
                 <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-white text-[#5A4DBF] hover:bg-gray-100 font-bold">
                    Get Started for Free
                 </Button>
             </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 mb-32 max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-[#0F0F0F] mb-10 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium text-[#0F0F0F]">How much does Linkifi cost?</AccordionTrigger>
                    <AccordionContent className="text-[#535479] text-lg leading-relaxed">
                        Linkifi has a free plan with unlimited links and standard themes. Our Pro plan ($6/month) unlocks custom domains, advanced analytics, and premium themes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium text-[#0F0F0F]">Can I use my own domain name?</AccordionTrigger>
                    <AccordionContent className="text-[#535479] text-lg leading-relaxed">
                        Yes! With Linkifi Pro, you can connect your own domain (e.g., links.yourbrand.com) instead of using linkifi.io/yourname.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium text-[#0F0F0F]">Is it safe?</AccordionTrigger>
                    <AccordionContent className="text-[#535479] text-lg leading-relaxed">
                        Security is our top priority. Linkifi is trusted by millions of users and uses industry-standard encryption to protect your data.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img 
                              src={logoUrl} 
                              alt="Linkifi" 
                              className="h-8 w-auto object-contain"
                            />
                        </div>
                        <p className="text-[#535479] mb-6 max-w-sm">
                            The simple, beautiful way to link to everything you create.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-[#0F0F0F] mb-6">Company</h4>
                        <ul className="space-y-4 text-[#535479]">
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">The Linkifi Blog</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Engineering Blog</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Marketplace</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">What's New</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-[#0F0F0F] mb-6">Community</h4>
                        <ul className="space-y-4 text-[#535479]">
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Linkifi for Enterprise</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Creators</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Charities</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-[#0F0F0F] mb-6">Support</h4>
                        <ul className="space-y-4 text-[#535479]">
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Help Topics</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Getting Started</a></li>
                            <li><a href="#" className="hover:text-[#5A4DBF] transition-colors">Features</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[#9aa0b0] text-sm">
                    <p>© 2026 Linkifi Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#5A4DBF] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#5A4DBF] transition-colors">Terms of Use</a>
                        <a href="#" className="hover:text-[#5A4DBF] transition-colors">Cookie Notice</a>
                    </div>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
