"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const data = await apiFetch<Record<string, FAQItem[]>>("/faqs");
        // Flatten or take the first few from different categories for the home page
        const flattened = Object.values(data).flat().slice(0, 5);
        setFaqs(flattened);
      } catch (err) {
        console.error("Knowledge retrieval failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center bg-white">
        <Loader2 className="animate-spin text-brand-orange" size={32} />
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white border-t border-brand-cream/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-start">
          {/* Left: Branding & Action */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase font-noto">
                <span className="w-8 h-[1px] bg-brand-orange" />
                সহযোগিতা
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy leading-tight">
                সাধারণ কিছু <br />
                <span className="italic">কৌতূহল ও উত্তর।</span>
              </h2>
              <p className="text-brand-navy/60 text-base md:text-lg leading-relaxed max-w-sm font-noto">
                বাকশো অভিজ্ঞতা শুরু করার আগে আপনার যা কিছু জানা প্রয়োজন।
              </p>
            </div>

            <Link
              href="/faq"
              className="inline-flex items-center gap-4 bg-brand-cream/50 text-brand-navy px-6 md:px-8 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all group w-fit font-noto"
            >
              বিস্তারিত দেখুন <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={`group border-b border-brand-cream/30 last:border-0 transition-all duration-500 rounded-3xl md:rounded-[32px] overflow-hidden ${activeIndex === index ? 'bg-brand-cream/20 px-5 mb-2' : 'hover:bg-brand-cream/10 px-5'}`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left outline-none gap-4"
                  >
                    <span className={`text-base md:text-xl font-bold transition-colors leading-snug font-anek ${activeIndex === index ? 'text-brand-orange' : 'text-brand-navy'}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-brand-orange text-white rotate-180' : 'bg-brand-navy text-white'}`}>
                      {activeIndex === index ? <Minus size={14} /> : <Plus size={14} />}
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
                        <p className="pb-6 md:pb-8 text-sm md:text-base text-brand-navy/60 leading-relaxed font-medium font-noto">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-brand-navy/20 font-noto">বর্তমানে কোনো সচরাচর জিজ্ঞাসিত প্রশ্ন নেই।</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
