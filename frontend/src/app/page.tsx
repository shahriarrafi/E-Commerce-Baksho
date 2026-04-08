"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Hexagon } from "lucide-react";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import BrandExperience from "@/components/home/BrandExperience";
import SubCategoryGrid from "@/components/home/SubCategoryGrid";
import SocialProof from "@/components/home/SocialProof";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-cream pt-28 pb-12 md:pt-40 md:pb-20">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-6 animate-pulse">
               <div className="w-2 h-2 rounded-full bg-brand-orange" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-navy/40">Exclusive Launch Series</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-brand-navy leading-[1.1] tracking-tight mb-6">
               The Art of <br />
               <span className="italic text-brand-orange">Unboxing</span> <br />
               Perfection.
            </h1>
            <p className="text-base md:text-lg text-brand-navy/60 mb-8 max-w-lg mx-auto md:mx-0 font-sans leading-relaxed">
               Discover curated premium products delivered in our signature hexagonal packaging. Elevate your everyday with Baksho's exclusive collections.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button className="bg-brand-navy text-white px-8 py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/30 transition-all group active:scale-95">
                Explore the Vault <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-colors">
                The Heritage Story
                <div className="w-8 h-8 rounded-full border border-brand-navy/10 flex items-center justify-center">
                   <Package size={14} />
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
            className="flex justify-center relative"
          >
            {/* Geometric Motif Representation */}
            <div className="relative w-full max-w-lg aspect-square">
               {/* Animated Hexagonal Ring */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                 className="absolute inset-0 opacity-10"
               >
                  <Hexagon size="100%" className="text-brand-orange" />
               </motion.div>
               
               <div className="absolute inset-4 overflow-hidden rounded-[80px] bg-white shadow-2xl flex items-center justify-center border-l border-t border-brand-orange/10 group">
                  <Package size={180} className="text-brand-orange/30 transition-all duration-1000 group-hover:scale-125 group-hover:text-brand-orange/60" strokeWidth={0.5} />
                  
                  {/* Floating Identity Marker */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute bottom-12 right-12 bg-brand-navy p-4 rounded-2xl shadow-xl"
                  >
                     <p className="text-[8px] font-black uppercase tracking-widest text-white/50 mb-1">Authentic Series</p>
                     <p className="text-sm font-serif font-bold text-white tracking-tighter">BK-88204</p>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Journey */}
      <FeaturedCollections />

      {/* Discovery Carousel */}
      <TrendingCarousel />

      {/* Craftsmanship & Narrative */}
      <BrandExperience />

      {/* Direct Domain/Niche Nav */}
      <SubCategoryGrid />

      {/* Social Verification */}
      <SocialProof />
    </div>
  );
}
