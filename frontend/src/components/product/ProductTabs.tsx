"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductTabsProps {
  description: string;
  specifications: { label: string; value: string }[];
  shippingInfo: string;
}

const TABS = ["বিস্তারিত", "বৈশিষ্ট্য", "শিপিং তথ্য"];

export default function ProductTabs({ description, specifications, shippingInfo }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="w-full mt-8 md:mt-12 mb-12 md:mb-20">
      {/* Tab Headers */}
      <div className="flex border-b border-brand-cream/50 relative overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 no-scrollbar font-noto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-8 py-4 text-[10px] md:text-sm font-bold uppercase tracking-widest transition-all relative z-10 whitespace-nowrap ${
              activeTab === tab 
                ? "text-brand-orange" 
                : "text-brand-navy/30 hover:text-brand-navy"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-10 px-4 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="prose prose-brand-navy max-w-none"
          >
            {activeTab === "বিস্তারিত" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-anek text-brand-navy">পণ্যের পেছনের গল্প</h3>
                <div 
                  className="text-brand-navy/70 leading-relaxed text-lg font-medium font-noto prose-p:mb-4"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <div className="h-[1px] w-20 bg-brand-orange/20" />
                <p className="text-brand-navy/70 leading-relaxed text-lg font-medium italic font-noto">
                  "প্রতিটি বক্স একটি গল্প বলে। আমাদের কারুশিল্প এখন আপনার হাতে।"
                </p>
              </div>
            )}

            {activeTab === "বৈশিষ্ট্য" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20 font-noto">
                {specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-brand-cream/30">
                    <span className="text-brand-navy/50 font-bold uppercase tracking-wider text-xs">{spec.label}</span>
                    <span className="text-brand-navy font-bold text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "শিপিং তথ্য" && (
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold font-anek text-brand-navy">গ্লোবাল কারুশিল্প, লোকাল ডেলিভারি</h3>
                  <div 
                    className="text-brand-navy/70 leading-relaxed text-lg font-medium font-noto"
                    dangerouslySetInnerHTML={{ __html: shippingInfo }}
                  />
                </div>
                <div className="w-full md:w-1/3 bg-brand-cream/20 p-8 rounded-3xl border border-brand-orange/5 font-noto">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/60">এক্সপ্রেস ডেলিভারি</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/60">গ্লোবাল শিপিং</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/60">নিরাপদ প্যাকেজিং</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
