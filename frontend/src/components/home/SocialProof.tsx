"use client";

import { motion } from "framer-motion";
import { Star, Heart, Quote, ArrowRight } from "lucide-react";
import Image from "next/image";

// Using Lucide alternatives or keeping placeholders if explicitly missing in current version
// But I checked and Lucide actually has Instagram and Twitter in most versions. 
// If they are missing, I'll use placeholders.

const TESTIMONIALS = [
  { id: 1, text: "The unboxing experience alone is worth the price. Truly a boutique feeling from start to finish.", author: "@rafael_dev", role: "Creative Director" },
  { id: 2, text: "My collection finally has a home that matches its value. The hexagonal design is sheer genius.", author: "@sophia_arts", role: "Art Curator" },
  { id: 3, text: "Structural integrity and elegance combined. Baksho is redefining premium packaging.", author: "@liam_tech", role: "Tech Enthusiast" },
  { id: 4, text: "I bought it for the product, but I'm staying for the box. Absolutely stunning craftsmanship.", author: "@emma_lux", role: "Lifestyle Blogger" },
  { id: 5, text: "Finally, a brand that understands the psychological value of a good unboxing ritual.", author: "@marcus_v", role: "Product Designer" },
];

const UGC_IMAGES = [
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607344645866-009c323b63e0?q=80&w=2080&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white overflow-hidden relative">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
         <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent" />
         <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto px-6 mb-10 text-center">
         <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 text-brand-orange tracking-[0.4em] font-black text-[10px] uppercase">
               Voices of the Vault
            </div>
            <h2 className="text-4xl font-serif text-brand-navy max-w-2xl leading-tight">
               As Seen on <span className="italic">the Curated.</span>
            </h2>
            <div className="flex items-center gap-1.5 pt-1">
               {[1, 2, 3, 4, 5].map((s) => (
                 <Star key={s} size={12} className="fill-brand-orange text-brand-orange" />
               ))}
               <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-2">4.9/5 Based on 2,400+ Reviews</span>
            </div>
         </div>
      </div>

      {/* Marquee Testimonials */}
      <div className="flex flex-col gap-6">
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex animate-marquee group-hover:pause-marquee py-2">
             {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
               <div key={`${t.id}-${i}`} className="mx-3 min-w-[320px] bg-brand-cream/40 border border-brand-orange/5 p-6 rounded-[30px] flex flex-col gap-4 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500">
                  <div className="flex items-center gap-1.5 text-brand-orange">
                     {[1, 2, 3, 4, 5].map((s) => (
                       <Star key={s} size={10} className="fill-brand-orange" />
                     ))}
                  </div>
                  <p className="text-brand-navy text-base leading-relaxed font-serif italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between border-t border-brand-navy/5 pt-4">
                     <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-brand-orange/20" />
                        <div>
                           <h5 className="font-bold text-brand-navy text-[10px]">{t.author}</h5>
                           <p className="text-[8px] font-medium text-brand-navy/30 uppercase tracking-widest">{t.role}</p>
                        </div>
                     </div>
                     <Quote size={16} className="text-brand-orange/10" />
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* UGC Gallery View */}
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex animate-marquee-reverse group-hover:pause-marquee py-2">
             {[...UGC_IMAGES, ...UGC_IMAGES].map((img, i) => (
               <div key={i} className="mx-2 w-60 aspect-[4/5] rounded-[30px] overflow-hidden relative border-4 border-brand-cream shadow-2xl transition-all duration-700 hover:rotate-1 hover:scale-105">
                  <Image src={img} alt="User Generated Content" fill className="object-cover" />
                  <div className="absolute inset-0 bg-brand-navy/0 hover:bg-brand-navy/20 transition-colors duration-500 flex items-center justify-center group/icon">
                     <div className="w-6 h-6 border border-white rounded-lg flex items-center justify-center">
                        <div className="w-3 h-3 border border-white rounded-full" />
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-10 text-center">
         <div className="inline-flex items-center gap-6 py-3 px-6 bg-brand-navy rounded-full text-white text-[9px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all cursor-pointer group">
            <span className="flex items-center gap-2">
               <div className="w-3 h-3 border border-white rounded flex items-center justify-center">
                  <div className="w-1 h-1 border border-white rounded-full" />
               </div>
               @BakshoOfficial
            </span>
            <div className="w-[1px] h-3 bg-white/20" />
            <span className="flex items-center gap-2">
               <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
               Join the Identity
            </span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
         </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .pause-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
