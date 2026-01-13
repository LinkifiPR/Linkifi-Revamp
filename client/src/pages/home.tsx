import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe, BarChart3, Shield, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-primary/10 selection:text-primary">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass top-0 transition-all duration-300 border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-display font-bold text-slate-900 tracking-tight">Linkifi</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">About</a>
            <a href="#blog" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Blog</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-slate-600 hover:text-primary hover:bg-slate-50 font-medium">Log in</Button>
            <Button className="bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 rounded-full px-6">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="text-slate-600" /> : <Menu className="text-slate-600" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-white border-b border-slate-100"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#" className="text-slate-600 font-medium py-2">Features</a>
              <a href="#" className="text-slate-600 font-medium py-2">Pricing</a>
              <a href="#" className="text-slate-600 font-medium py-2">Log in</a>
              <Button className="w-full bg-primary text-white rounded-full">Get Started</Button>
            </div>
          </motion.div>
        )}
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-24 lg:mb-32">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New Release 2.0 is live
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight"
            >
              One Link to <br className="hidden md:block"/>
              <span className="text-gradient">Connect Everything.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              The freshest way to manage your digital presence. Create a beautiful, 
              customizable landing page for all your links in seconds. 
              No coding required.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-primary hover:bg-blue-600 shadow-xl shadow-blue-500/20 transition-all hover:scale-105 w-full sm:w-auto">
                Claim your Linkifi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 w-full sm:w-auto">
                View Demo
              </Button>
            </motion.div>

            {/* Dashboard Preview / Abstract Graphic */}
            <motion.div 
              variants={fadeIn}
              className="relative mx-auto max-w-5xl rounded-2xl p-2 bg-gradient-to-b from-slate-100 to-white border border-slate-200 shadow-2xl shadow-slate-200/50"
            >
              <div className="rounded-xl overflow-hidden bg-white aspect-[16/9] relative">
                 {/* Mock UI Elements */}
                 <div className="absolute top-0 left-0 w-full h-12 border-b border-slate-100 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                 </div>
                 <div className="absolute top-12 left-0 w-64 h-full border-r border-slate-50 hidden md:block p-6">
                    <div className="h-8 w-3/4 bg-slate-100 rounded mb-6"></div>
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-slate-50 rounded"></div>
                        <div className="h-4 w-5/6 bg-slate-50 rounded"></div>
                        <div className="h-4 w-4/5 bg-slate-50 rounded"></div>
                    </div>
                 </div>
                 <div className="md:ml-64 pt-12 p-8 grid grid-cols-2 gap-6">
                    <div className="col-span-2 h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-1">24.5k</div>
                            <div className="text-sm text-blue-400 font-medium">Total Views</div>
                        </div>
                    </div>
                    <div className="h-32 bg-slate-50 rounded-xl border border-slate-100"></div>
                    <div className="h-32 bg-slate-50 rounded-xl border border-slate-100"></div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Partners */}
        <section className="py-12 border-y border-slate-50 bg-slate-50/50 mb-24">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-medium text-slate-400 mb-8 uppercase tracking-wider">Trusted by over 10,000 creators</p>
                <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50">
                    {/* Placeholder Logos */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-24 bg-slate-300/50 rounded animate-pulse"></div>
                    ))}
                </div>
            </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-6 mb-32">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">Everything you need to grow.</h2>
                <p className="text-xl text-slate-500">
                    Powerful features packed into a simple, elegant interface. 
                    Designed to help you convert more visitors.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <Globe className="w-6 h-6 text-blue-600" />,
                        title: "Custom Domains",
                        desc: "Connect your own domain name to maintain full brand consistency."
                    },
                    {
                        icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
                        title: "Deep Analytics",
                        desc: "Understand your audience with detailed insights and click tracking."
                    },
                    {
                        icon: <Zap className="w-6 h-6 text-amber-500" />,
                        title: "Instant Updates",
                        desc: "Changes go live instantly. No loading times, no deployment delays."
                    },
                    {
                        icon: <Shield className="w-6 h-6 text-emerald-500" />,
                        title: "Enterprise Security",
                        desc: "Bank-grade encryption and security features to keep your data safe."
                    },
                    {
                        icon: <CheckCircle2 className="w-6 h-6 text-rose-500" />,
                        title: "Verified Badge",
                        desc: "Stand out with a verified checkmark on your profile."
                    },
                    {
                        icon: <Globe className="w-6 h-6 text-cyan-500" />,
                        title: "Global CDN",
                        desc: "Your page loads lightning fast from anywhere in the world."
                    }
                ].map((feature, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* Value Proposition / Bento Grid Style */}
        <section className="container mx-auto px-6 mb-32">
            <div className="rounded-3xl bg-slate-900 p-8 md:p-16 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Designed for speed. <br/>Built for scale.</h2>
                        <div className="space-y-6">
                            {[
                                "Lightning fast page loads (99/100 Google PageSpeed)",
                                "SEO optimized out of the box",
                                "Mobile-first responsive design",
                                "Zero maintenance required"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-lg text-slate-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <Button size="lg" className="mt-10 bg-white text-slate-900 hover:bg-slate-100 rounded-full px-8 h-12">
                            Start Building Now
                        </Button>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                        {/* Fake Code Block / Tech Vibe */}
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="space-y-2 font-mono text-sm text-slate-400">
                            <p><span className="text-purple-400">const</span> <span className="text-blue-400">profile</span> = <span className="text-yellow-400">new</span> <span className="text-emerald-400">Linkifi</span>();</p>
                            <p><span className="text-blue-400">profile</span>.<span className="text-yellow-400">setTheme</span>(<span className="text-orange-400">'sleek-white'</span>);</p>
                            <p><span className="text-blue-400">profile</span>.<span className="text-yellow-400">addLinks</span>([</p>
                            <p className="pl-4"><span className="text-orange-400">'twitter.com/linkifi'</span>,</p>
                            <p className="pl-4"><span className="text-orange-400">'instagram.com/linkifi'</span>,</p>
                            <p className="pl-4"><span className="text-orange-400">'youtube.com/linkifi'</span></p>
                            <p>]);</p>
                            <p className="text-slate-500">// Your page is ready in milliseconds</p>
                            <p><span className="text-blue-400">profile</span>.<span className="text-yellow-400">deploy</span>();</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 mb-32 max-w-3xl">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium text-slate-800">Is it really free?</AccordionTrigger>
                    <AccordionContent className="text-slate-500 text-lg leading-relaxed">
                        Yes! Our basic plan is completely free forever. You get unlimited links, basic analytics, and custom themes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium text-slate-800">Can I use my own domain?</AccordionTrigger>
                    <AccordionContent className="text-slate-500 text-lg leading-relaxed">
                        Absolutely. With our Pro plan, you can connect any custom domain to your Linkifi page for a fully branded experience.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium text-slate-800">Is it SEO friendly?</AccordionTrigger>
                    <AccordionContent className="text-slate-500 text-lg leading-relaxed">
                        We built Linkifi with SEO at its core. Your page is optimized for search engines automatically, ensuring you rank for your name and brand.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-100 bg-slate-50 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-xl font-display font-bold text-slate-900 tracking-tight">Linkifi</span>
                        </div>
                        <p className="text-slate-500 mb-6">
                            Making the internet simple, one link at a time.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Examples</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
                    <p>© 2026 Linkifi Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-slate-600 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
      </main>
    </div>
  );
}
