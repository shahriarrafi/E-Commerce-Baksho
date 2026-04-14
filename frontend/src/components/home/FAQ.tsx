"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
   {
      question: "How long does the unboxing ritual take to arrive?",
      answer: "We ensure your premium selection arrives within 2-3 business days. Every journey is fully trackable from our vault to your door."
   },
   {
      question: "Is the hexagonal packaging truly eco-conscious?",
      answer: "Yes. Our signature Baksho boxes are crafted from 100% recycled reinforced fibers and are designed for heirloom storage—not the recycling bin."
   },
   {
      question: "What is your return philosophy?",
      answer: "If your ritual feels incomplete, we offer a 14-day window for returns of unused treasures in their original hexagonal housing."
   }
];

export default function FAQ() {
   const [activeIndex, setActiveIndex] = useState<number | null>(null);

   return (
      <section className="py-24 bg-white border-t border-brand-cream/50">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
               {/* Left: Branding & Action */}
               <div className="lg:col-span-5 flex flex-col gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase">
                        <span className="w-8 h-[1px] bg-brand-orange" />
                        Intelligence
                     </div>
                     <h2 className="text-4xl md:text-5xl font-serif text-brand-navy leading-tight">
                        Curiosities <br />
                        <span className="italic">& Questions.</span>
                     </h2>
                     <p className="text-brand-navy/60 text-lg leading-relaxed max-w-sm">
                        Everything you need to know about the Baksho experience before you begin your next ritual.
                     </p>
                  </div>

                  <Link
                     href="/faq"
                     target="_blank"
                     className="inline-flex items-center gap-4 bg-brand-cream/50 text-brand-navy px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all group w-fit"
                  >
                     Visit Full Archive <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
               </div>

               {/* Right: Accordion */}
               <div className="lg:col-span-7 flex flex-col gap-2">
                  {faqs.map((faq, index) => (
                     <div
                        key={index}
                        className={`group border-b border-brand-cream/30 last:border-0 transition-all duration-500 rounded-[32px] overflow-hidden ${activeIndex === index ? 'bg-brand-cream/20 px-4 mb-2' : 'hover:bg-brand-cream/10 px-4'}`}
                     >
                        <button
                           onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                           className="w-full flex items-center justify-between py-8 text-left outline-none"
                        >
                           <span className={`text-lg md:text-xl font-bold transition-colors ${activeIndex === index ? 'text-brand-orange' : 'text-brand-navy'}`}>
                              {faq.question}
                           </span>
                           <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-brand-orange text-white rotate-180' : 'bg-brand-navy text-white'}`}>
                              {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                           </div>
                        </button>
                        <AnimatePresence>
                           {activeIndex === index && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                 <p className="pb-8 text-brand-navy/60 leading-relaxed font-medium">
                                    {faq.answer}
                                 </p>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
