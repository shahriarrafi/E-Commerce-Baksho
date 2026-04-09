"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, Hexagon } from "lucide-react";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import BrandExperience from "@/components/home/BrandExperience";
import SubCategoryGrid from "@/components/home/SubCategoryGrid";
import SocialProof from "@/components/home/SocialProof";

export default function Home() {
   const containerRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end start"]
   });

   // Parallax transforms
   const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
   const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

   return (
      <div className="flex flex-col min-h-screen" ref={containerRef}>
         {/* Cinematic Hero Section */}
         <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-white">
            {/* Background Parallax Layers */}
            <motion.div
               style={{ y: y1, scale }}
               className="absolute inset-0 z-0 pointer-events-none"
            >
               {/* Primary Brand Motif */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square opacity-[0.03] text-brand-orange">
                  <Hexagon size="100%" strokeWidth={0.5} />
               </div>
               {/* Soft Glows */}
               <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-orange/10 blur-[150px] rounded-full" />
               <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brand-navy/5 blur-[120px] rounded-full" />
            </motion.div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
               <motion.div
                  style={{ opacity }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center lg:text-left flex flex-col gap-8 md:gap-10"
               >
                  <div className="flex flex-col gap-4">
                     <div className="flex items-center justify-center lg:justify-start gap-3">
                        <div className="w-12 h-[1px] bg-brand-orange" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange">Ritual Excellence</span>
                     </div>
                     <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-brand-navy leading-[1] tracking-tighter">
                        The Art of <br />
                        <span className="italic">Unboxing</span> <br />
                        Perfection.
                     </h1>
                  </div>

                  <p className="text-lg md:text-xl text-brand-navy/60 max-w-lg mx-auto lg:mx-0 font-sans leading-relaxed">
                     Discover curated premium products delivered in our signature hexagonal packaging. Elevate your everyday with Baksho.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                     <Link
                        href="/category/new-arrivals"
                        className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/40 transition-all group active:scale-95"
                     >
                        Explore the Vault <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>
               </motion.div>

               {/* Cinematic Unboxing Visual */}
               <motion.div
                  style={{ y: y2 }}
                  className="hidden lg:flex justify-center relative"
               >
                  <div className="relative w-full max-w-xl aspect-square">
                     {/* Entrace Unfolding Decoration */}
                     <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-brand-cream rounded-[100px] border border-brand-orange/10 shadow-2xl overflow-hidden group"
                     >
                        {/* Reveal Image on Hover / Load */}
                        <motion.div
                           className="absolute inset-0"
                        >
                           <Image
                              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"
                              alt="Signature Piece"
                              fill
                              className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000"
                           />
                           <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 to-transparent" />
                        </motion.div>

                        {/* Center Focus Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                           <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                              className="hidden group-hover:block"
                           >
                              <Hexagon size={160} className="text-white/20" strokeWidth={1} />
                           </motion.div>
                        </div>
                     </motion.div>

                     {/* Satellite Elements */}
                     <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="absolute -bottom-10 -right-10 bg-brand-orange p-8 rounded-[40px] shadow-2xl text-white z-20"
                     >
                        <Hexagon size={40} className="mb-4" />
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Handcrafted In</p>
                           <p className="text-xl font-serif font-bold">The Workshop</p>
                        </div>
                     </motion.div>
                  </div>
               </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 2 }}
               className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-brand-navy/20"
            >
               <span className="text-[9px] font-black uppercase tracking-widest">Descend for More</span>
               <div className="w-[1px] h-16 bg-gradient-to-b from-brand-navy/20 to-transparent" />
            </motion.div>
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

