"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Hexagon, Star } from "lucide-react";
import Image from "next/image";

export default function BrandExperience() {
  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Abstract Design Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Visual Experience */}
          <div className="relative group">
             {/* Mock Video/Visual Area */}
             <div className="aspect-[4/5] md:aspect-square bg-white shadow-2xl rounded-[40px] overflow-hidden relative border border-white/10 group-hover:rotate-1 transition-transform duration-1000 group-hover:scale-105">
                <Image 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Baksho Unboxing Experience" 
                  fill 
                  className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-8 right-8 z-20">
                   <div className="w-14 h-14 bg-brand-orange text-white rounded-full flex flex-col items-center justify-center p-2 shadow-xl shadow-brand-orange/20 border-4 border-white/20 animate-pulse">
                      <span className="text-[9px] font-black uppercase tracking-tighter text-white">The</span>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-white">Box</span>
                   </div>
                </div>

                {/* Video Play Overlay Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2" />
                   </div>
                </div>
             </div>

             {/* Background Decorations */}
             <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          </div>

          {/* Right Side: Text Narrative */}
          <div className="space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-brand-orange font-black text-[10px] uppercase tracking-[0.3em]">
                <span className="w-8 h-[1px] bg-brand-orange" />
                The Baksho Experience
              </div>
              <h2 className="text-5xl font-serif leading-[1.1]">
                Mastering the <br />
                <span className="italic text-brand-orange">Unboxing Ritual.</span>
              </h2>
              <p className="text-lg text-white/40 leading-relaxed font-light font-sans max-w-lg">
                 Our signature hexagonal packaging isn't just a container; it's the first volume of your story. Every box is handcrafted with precision, designed to be as enduring as the treasures within.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
               <div className="space-y-3 p-6 bg-white/5 rounded-[30px] border border-white/5 group hover:bg-white/10 transition-colors">
                  <ShieldCheck size={28} className="text-brand-orange group-hover:scale-110 transition-transform" />
                  <h4 className="text-base font-serif">Structural Integrity</h4>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">Recycled Walnut & Velvet lining for lifetime preservation.</p>
               </div>
               <div className="space-y-3 p-6 bg-white/5 rounded-[30px] border border-white/5 group hover:bg-white/10 transition-colors">
                  <Star size={28} className="text-brand-orange group-hover:scale-110 transition-transform" />
                  <h4 className="text-base font-serif">Signature Hexagon</h4>
                  <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">The perfect geometry for the modern curator's collection.</p>
               </div>
            </div>

            <div className="pt-6 flex items-center gap-6">
               <button className="bg-white text-brand-navy px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all shadow-xl shadow-brand-navy/20 active:scale-95 group">
                  Learn Our Craft 
               </button>
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">#BakshoEx</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
