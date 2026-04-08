"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductTabsProps {
  description: string;
  specifications: { label: string; value: string }[];
  shippingInfo: string;
}

const TABS = ["Description", "Specifications", "Shipping Info"];

export default function ProductTabs({ description, specifications, shippingInfo }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="w-full mt-8 md:mt-12 mb-12 md:mb-20">
      {/* Tab Headers */}
      <div className="flex border-b border-brand-cream/50 relative overflow-x-auto scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 md:px-8 py-4 text-[10px] md:text-sm font-black uppercase tracking-widest transition-all relative z-10 whitespace-nowrap ${
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
            {activeTab === "Description" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-brand-navy">The Story Behind The Box</h3>
                <p className="text-brand-navy/70 leading-relaxed text-lg font-light">
                  {description}
                </p>
                <div className="h-[1px] w-20 bg-brand-orange/20" />
                <p className="text-brand-navy/70 leading-relaxed text-lg font-light italic">
                  "Every box tells a story. This one is yours."
                </p>
              </div>
            )}

            {activeTab === "Specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-20">
                {specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-brand-cream/30">
                    <span className="text-brand-navy/50 font-medium uppercase tracking-wider text-xs">{spec.label}</span>
                    <span className="text-brand-navy font-semibold text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Shipping Info" && (
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-serif text-brand-navy">Global Craftsmanship, Local Delivery</h3>
                  <p className="text-brand-navy/70 leading-relaxed text-lg font-light">
                    {shippingInfo}
                  </p>
                </div>
                <div className="w-full md:w-1/3 bg-brand-cream/20 p-8 rounded-3xl border border-brand-orange/5">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/60">Express Delivery</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/60">Global Shipping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-navy/60">Secure Packaging</span>
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
