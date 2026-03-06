/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Hammer, 
  Wrench, 
  Construction, 
  Truck, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Award,
  Zap,
  Lightbulb,
  HeartHandshake,
  Download,
  FileText,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const AIImage = ({ prompt, alt, className }: { prompt: string, alt: string, className?: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      } catch (error) {
        console.error("Failed to generate image:", error);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [prompt]);

  if (loading) {
    return (
      <div className={`bg-zinc-100 flex items-center justify-center ${className}`}>
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!imageUrl) {
    return <div className={`bg-zinc-200 ${className}`} />;
  }

  return <img src={imageUrl} alt={alt} className={className} referrerPolicy="no-referrer" />;
};

const SERVICES = [
  {
    id: 'carpentry',
    title: 'Carpentry Division',
    icon: <Hammer className="w-8 h-8" />,
    description: 'Professional carpentry services with high attention to detail and quality.',
    items: [
      'Custom office and household furniture',
      'Built-in wardrobes, shelves, and cabinets',
      'Solid wood doors, windows, and frames',
      'Ceilings, wooden partitions, and paneling',
      'Furniture restoration and repairs'
    ],
    image: 'https://images.unsplash.com/photo-1622675363211-3573053c3751?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fabrication',
    title: 'Fabrication Division',
    icon: <Wrench className="w-8 h-8" />,
    description: 'Manufacturing and installation of a wide range of fabricated metal products.',
    items: [
      'Structural steel for buildings and infrastructure',
      'Fabricated gates, grills, fences, and burglar bars',
      'Industrial tanks, silos, and pipe works',
      'Metal furniture for offices and homes',
      'Repairs, retrofitting, and welding works'
    ],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'construction',
    title: 'Construction Division',
    icon: <Construction className="w-8 h-8" />,
    description: 'Complete building and civil engineering solutions managed by qualified professionals.',
    items: [
      'Residential and commercial building construction',
      'Civil works, roadworks, and drainage systems',
      'Property renovations and alterations',
      'Turnkey infrastructure projects',
      'Site management and consultancy'
    ],
    image: 'https://images.unsplash.com/photo-1589939705384-5185138a047a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'supply',
    title: 'Supply Division',
    icon: <Truck className="w-8 h-8" />,
    description: 'High-quality materials, equipment, and goods for government and private sector projects.',
    items: [
      'Building and construction materials',
      'Office furniture and fittings',
      'Industrial machinery and spare parts',
      'Procurement services for public and private institutions'
    ],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'financial',
    title: 'Financial Advisory',
    icon: <TrendingUp className="w-8 h-8" />,
    description: 'Solutions for SMEs, individuals, and corporates seeking sound financial management.',
    items: [
      'Business and SME financial advisory',
      'Investment planning and guidance',
      'Loan structuring and facilitation',
      'Financial management consultancy',
      'Risk analysis and business planning'
    ],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'
  }
];

const CORE_VALUES = [
  { title: 'Integrity', icon: <ShieldCheck />, desc: 'Honesty, transparency, and ethical standards.' },
  { title: 'Excellence', icon: <Award />, desc: 'Consistently delivering superior services.' },
  { title: 'Customer Commitment', icon: <HeartHandshake />, desc: 'Putting client needs at the center.' },
  { title: 'Professionalism', icon: <Zap />, desc: 'Upholding highest standards of delivery.' },
  { title: 'Innovation', icon: <Lightbulb />, desc: 'Improving processes through technology.' },
  { title: 'Community', icon: <Users />, desc: 'Investing in local skills and employment.' }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-yellow-200 selection:text-red-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-200 overflow-hidden">
                <AIImage 
                  prompt="A modern professional logo for a construction and carpentry company named Rubrit, featuring a stylized 'R' and a hammer, red and yellow theme, minimalist, high quality" 
                  alt="Rubrit Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block leading-none">RUBRIT</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-red-600 font-semibold">Enterprises Ltd</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Services', 'Values', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-red-600 transition-all shadow-lg shadow-zinc-200 hover:shadow-red-200">
                Get a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-zinc-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white border-b border-black/5 px-4 py-6 flex flex-col gap-4"
            >
              {['About', 'Services', 'Values', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-zinc-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-50/50 -skew-x-12 translate-x-1/4 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="w-3 h-3" /> Established 2024
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Driven by <span className="text-red-600">Excellence</span>, Sustained by Integrity.
              </h1>
              <p className="text-xl text-zinc-600 mb-10 max-w-xl leading-relaxed">
                Rubrit Enterprises Limited is a proudly Zambian multi-sector business delivering quality workmanship across carpentry, fabrication, and construction.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-red-700 transition-all flex items-center gap-2 shadow-xl shadow-red-200">
                  Explore Services <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="bg-white border border-zinc-200 text-zinc-900 px-6 py-4 rounded-2xl font-semibold hover:bg-zinc-50 transition-all flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5 text-red-600" /> Profile
                  </button>
                  <button 
                    className="bg-white border border-zinc-200 text-zinc-900 px-6 py-4 rounded-2xl font-semibold hover:bg-zinc-50 transition-all flex items-center gap-2"
                    title="Download Brochure"
                    onClick={() => alert("The company brochure is being prepared and will be available for download shortly. Please contact us for immediate information.")}
                  >
                    <Download className="w-5 h-5 text-red-600" /> Brochure
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <AIImage 
                  prompt="A high-quality photo of a modern construction site in Zambia, with workers in red and yellow safety gear, bright sunny day, professional photography" 
                  alt="Zambian Construction Infrastructure" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-black/5 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm">Zambian Owned</span>
                </div>
                <p className="text-xs text-zinc-500">Proudly operating in the Republic of Zambia.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-600 mb-4">Company Overview</h2>
              <h3 className="text-4xl font-bold mb-8 tracking-tight">Building the Future of Zambia's Infrastructure</h3>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                Based in Buyantanshi, Chingola, Copperbelt Province, we are strategically positioned close to Zambia's mining, manufacturing, and industrial hubs. We offer a broad range of services to both public and private sector clients.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 mt-12">
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <Target className="w-8 h-8 text-red-600 mb-4" />
                  <h4 className="font-bold mb-2">Our Vision</h4>
                  <p className="text-sm text-zinc-500">To be a leading diversified Zambian company known for delivering excellent services and empowering communities.</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <Zap className="w-8 h-8 text-red-600 mb-4" />
                  <h4 className="font-bold mb-2">Our Mission</h4>
                  <p className="text-sm text-zinc-500">To provide high-quality services across carpentry, fabrication, and construction through innovation and integrity.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AIImage 
                prompt="A professional photo of a Zambian carpenter working on high-quality furniture, workshop setting, bright lighting" 
                alt="Carpentry Work" 
                className="rounded-2xl w-full aspect-[4/5] object-cover" 
              />
              <AIImage 
                prompt="A professional photo of a Zambian fabrication specialist welding metal structures, sparks flying, industrial setting" 
                alt="Fabrication Work" 
                className="rounded-2xl w-full aspect-[4/5] object-cover mt-8" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-yellow-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-600 mb-4">Our Expertise</h2>
            <h3 className="text-4xl font-bold tracking-tight">Comprehensive Solutions for Every Sector</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500"
              >
                <div className="h-48 overflow-hidden relative">
                  <AIImage 
                    prompt={`A professional high-quality photo of ${service.title} in an African industrial setting, Zambian context, bright lighting, professional photography`} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white flex items-center gap-3">
                    <div className="p-2 bg-red-500 rounded-lg">
                      {React.cloneElement(service.icon as React.ReactElement, { className: 'w-5 h-5' })}
                    </div>
                    <h4 className="font-bold text-lg">{service.title}</h4>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.slice(0, 4).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                        <ChevronRight className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 text-red-600 font-bold text-sm flex items-center gap-2 group/btn">
                    Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="values" className="py-24 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-500 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400 mb-4">Core Values</h2>
            <h3 className="text-4xl font-bold tracking-tight">The Principles That Guide Us</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES.map((value, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 mb-6">
                  {React.cloneElement(value.icon as React.ReactElement, { className: 'w-6 h-6' })}
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-yellow-50 rounded-[3rem] overflow-hidden border border-black/5">
                <div className="grid lg:grid-cols-2">
                  <div className="p-12 lg:p-20">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-600 mb-4">Contact Us</h2>
                <h3 className="text-4xl font-bold mb-8 tracking-tight">Let's Discuss Your Next Project</h3>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Head Office</h4>
                      <p className="text-zinc-500 text-sm">1437 Kabompo Drive, Buyantanshi,<br />Nchanga North, Chingola, Zambia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Call Us</h4>
                      <p className="text-zinc-500 text-sm">+260 966 632 245<br />+260 966 410 974</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email Us</h4>
                      <p className="text-zinc-500 text-sm">pansiguardian@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-zinc-200">
                  <p className="text-xs text-zinc-400 italic">"Driven by Excellence, Sustained by Integrity."</p>
                </div>
              </div>

              <div className="bg-white p-12 lg:p-20 border-l border-black/5">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Full Name</label>
                      <input type="text" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                      <input type="email" className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Service Required</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all appearance-none">
                      <option>Carpentry</option>
                      <option>Fabrication</option>
                      <option>Construction</option>
                      <option>Supply</option>
                      <option>Financial Advisory</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Message</label>
                    <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                  </div>
                  <button className="w-full bg-red-600 text-white py-5 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white">
                  <Construction className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight uppercase">Rubrit Enterprises</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
                >
                  <FileText className="w-4 h-4" /> Download Profile
                </button>
                <button 
                  className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => alert("The company brochure is being prepared and will be available for download shortly.")}
                >
                  <Download className="w-4 h-4" /> Download Brochure
                </button>
              </div>
              <div className="flex gap-4">
                {/* Social placeholders */}
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                    <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-yellow-400">Compliance</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li>Reg No: 120241002796</li>
                <li>TPIN: 2002620525</li>
                <li>Registered with PACRA</li>
                <li>ZRA Compliant</li>
                <li>NAPSA Registered</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-yellow-400">Location</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                1437 Kabompo Drive,<br />
                Buyantanshi, Nchanga North,<br />
                Chingola, Zambia
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
            <p>© 2024 Rubrit Enterprises Limited. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
