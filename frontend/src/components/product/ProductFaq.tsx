"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface ProductFaqProps {
  faqs: { question: string, answer: string }[];
}

export default function ProductFaq({ faqs }: ProductFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-12 bg-brand-cream/10 border-t border-brand-cream/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8 font-noto">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange">
              <HelpCircle size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">জানুন</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy">জিজ্ঞাসিত প্রশ্নাবলী</h2>
            <p className="text-brand-navy/60 max-w-lg mx-auto text-sm md:text-base">
              এই পণ্যটির ব্যবহার, যত্ন এবং বিশেষ বৈশিষ্ট্য সম্পর্কে আপনার যা কিছু জানা প্রয়োজন।
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`border rounded-3xl overflow-hidden transition-all duration-500 ${openIndex === i ? 'bg-white border-brand-orange/20 shadow-xl shadow-brand-orange/5' : 'bg-white/50 border-brand-cream hover:border-brand-orange/10'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <span className={`text-sm md:text-lg font-bold font-anek transition-colors ${openIndex === i ? 'text-brand-navy' : 'text-brand-navy/70 group-hover:text-brand-navy'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-brand-orange text-white' : 'bg-brand-orange/10 text-brand-orange'}`}>
                    {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <div className="w-full h-[1px] bg-brand-cream mb-6" />
                        <p className="text-brand-navy/60 leading-relaxed text-sm md:text-base italic">
                          {faq.answer}
                        </p>
                      </div>
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
