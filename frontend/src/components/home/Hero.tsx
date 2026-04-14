"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hexagon } from "lucide-react";

export default function Hero() {
   const sectionRef = useRef<HTMLDivElement>(null);
   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end start"]
   });

   // Parallax transforms
   const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
   const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
   const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

   return (
      <section 
        ref={sectionRef}
        className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-white"
      >
         {/* Background Parallax Layers */}
         <motion.div
            style={{ y: y1, scale }}
            className="absolute inset-0 z-0 pointer-events-none"
         >
            {/* Primary Brand Motif */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square opacity-[0.02] text-brand-orange">
               <Hexagon size="100%" strokeWidth={0.5} />
            </div>
            {/* Soft Glows - Tighter */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-brand-navy/5 blur-[100px] rounded-full" />
         </motion.div>

         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
            <motion.div
               style={{ opacity }}
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               className="text-center lg:text-left flex flex-col gap-6 md:gap-8"
            >
               <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                     <div className="w-8 h-[1px] bg-brand-orange" />
                     <span className="text-[10px] font-bold text-brand-orange font-noto">অসাধারণ অভিজ্ঞতা</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-brand-navy leading-[1.1] tracking-tighter">
                     নিখুঁত <br />
                     <span className="italic">আনবক্সিং</span> <br />
                     এর শিল্পকলা।
                  </h1>
               </div>

               <p className="text-base md:text-lg text-brand-navy/60 max-w-md mx-auto lg:mx-0 font-sans leading-relaxed">
                  আমাদের সিগনেচার প্যাকেজিংয়ে কিউরেটেড প্রিমিয়াম পণ্যগুলো আপনার কাছে পৌঁছে দিতে আমরা বদ্ধপরিকর। বাকশো-এর সাথে আপনার প্রতিদিনের জীবনকে করে তুলুন অনন্য।
               </p>

               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <Link
                     href="/category/new-arrivals"
                     className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-[14px] flex items-center gap-3 hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/30 transition-all group active:scale-95 font-noto"
                  >
                     ভল্ট অন্বেষণ করুন <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </motion.div>

            {/* Cinematic Unboxing Visual - Compacted */}
            <motion.div
               style={{ y: y2 }}
               className="hidden lg:flex justify-center relative"
            >
               <div className="relative w-full max-w-lg aspect-square">
                  {/* Entrace Unfolding Decoration */}
                  <motion.div
                     initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                     animate={{ scale: 1, opacity: 1, rotate: 0 }}
                     transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                     className="absolute inset-0 bg-brand-cream rounded-[80px] border border-brand-orange/10 shadow-xl overflow-hidden group"
                  >
                     <motion.div className="absolute inset-0">
                        <Image
                           src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"
                           alt="সিগনেচার পিস"
                           fill
                           priority
                           className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/30 to-transparent" />
                     </motion.div>

                     {/* Center Focus Icon */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                           animate={{ rotate: 360 }}
                           transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                           className="hidden group-hover:block"
                        >
                           <Hexagon size={120} className="text-white/20" strokeWidth={1} />
                        </motion.div>
                     </div>
                  </motion.div>

                  {/* Satellite Elements - Smaller */}
                  <motion.div
                     animate={{ y: [0, -15, 0] }}
                     transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                     className="absolute -bottom-6 -right-6 bg-brand-orange p-6 rounded-[30px] shadow-xl text-white z-20"
                  >
                     <Hexagon size={24} className="mb-2" />
                     <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-white/50 font-noto">হস্তনির্মিত</p>
                        <p className="text-base font-bold font-noto">আমাদের ওয়ার্কশপ থেকে</p>
                     </div>
                  </motion.div>
               </div>
            </motion.div>
         </div>

         {/* Scroll Indicator - Minimal */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-brand-navy/10"
         >
            <span className="text-[9px] font-bold font-noto">নিচে যান</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-brand-navy/10 to-transparent" />
         </motion.div>
      </section>
   );
}
