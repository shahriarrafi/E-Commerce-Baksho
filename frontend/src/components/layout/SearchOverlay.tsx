"use client";

import { motion } from "framer-motion";
import { Search, X, Command, ArrowRight, Package, Clock, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchOverlayProps {
  onClose: () => void;
}

const MOCK_SUGGESTIONS = [
  { id: 1, name: "Premium Hexagonal Box V4", category: "Packaging" },
  { id: 2, name: "Minimalist Desk Organizer", category: "Lifestyle" },
  { id: 3, name: "Tech Bundle Platinum", category: "Electronics" },
  { id: 4, name: "Artisanal Coffee Box", category: "Food & Drink" },
];

const RECENT_SEARCHES = ["Unboxing Kits", "Gift Sets", "Electronic Gadgets"];

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-white/95 backdrop-blur-2xl flex flex-col pt-4 md:pt-32 px-4 md:px-6 overflow-y-auto"
    >
      <div className="max-w-2xl mx-auto w-full">
        {/* Header/Close - More compact on mobile */}
        <div className="flex justify-between items-center mb-6 md:mb-12 mt-4 md:mt-0">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-navy/30">Global Search</h2>
          <button 
            onClick={onClose}
            className="p-2 md:p-3 bg-brand-navy/5 hover:bg-brand-orange hover:text-white rounded-xl transition-all group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Search Input - Compact & Premium */}
        <div className="relative mb-8 md:mb-12">
          <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-brand-orange" size={20} />
          <input
            autoFocus
            type="text"
            placeholder="Search Baksho..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 md:h-20 bg-brand-cream/30 rounded-2xl border border-brand-navy/5 focus:border-brand-orange/50 outline-none pl-12 md:pl-16 pr-16 md:pr-20 text-lg md:text-3xl font-serif text-brand-navy placeholder:text-brand-navy/20 transition-all font-bold"
          />
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-cream rounded-lg text-xs font-black text-brand-navy/40">
            <kbd><Command size={12} /></kbd>
            <span>K</span>
          </div>
        </div>

        {/* Suggestions - More compact list items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-10">
          {/* Ritual Matching (New) */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black tracking-widest text-brand-orange uppercase flex items-center gap-2">
                <ShieldCheck size={12} /> Ritual Matching
            </h3>
            <div className="space-y-3">
                {[
                    { title: "The Morning Minimalist", desc: "Start your day with clarity", icon: "☕" },
                    { title: "The Evening Unwind", desc: "Setting the ritual for sleep", icon: "🌙" }
                ].map((ritual) => (
                    <div 
                        key={ritual.title}
                        className="p-5 rounded-3xl bg-brand-orange/5 border border-brand-orange/10 hover:bg-brand-orange hover:text-white transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{ritual.icon}</span>
                            <div>
                                <h4 className="font-serif font-bold group-hover:text-white">{ritual.title}</h4>
                                <p className="text-[10px] uppercase font-black tracking-widest opacity-40 group-hover:opacity-100">{ritual.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-[10px] font-black tracking-widest text-brand-navy/30 uppercase mb-4 flex items-center gap-2">
                    <Clock size={12} /> Recent
                </h3>
                <div className="flex flex-wrap gap-1.5">
                    {RECENT_SEARCHES.map((search) => (
                    <button 
                        key={search}
                        className="px-3 py-1.5 bg-brand-navy/5 hover:bg-brand-navy/10 rounded-lg text-[11px] font-bold text-brand-navy transition-all"
                    >
                        {search}
                    </button>
                    ))}
                </div>
            </div>
          </div>

          {/* Live Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-[10px] font-black tracking-widest text-brand-navy/30 uppercase flex items-center gap-2">
                <Package size={12} /> Standard Matches
              </h3>
            </div>
            <div className="space-y-2">
              {MOCK_SUGGESTIONS.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-brand-cream/40 hover:bg-brand-orange/5 hover:translate-x-1 transition-all cursor-pointer group border border-transparent hover:border-brand-orange/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-brand-orange shadow-sm border border-brand-orange/5">
                        <Package size={14} />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-bold text-brand-navy transition-colors">{item.name}</h4>
                      <p className="text-[10px] md:text-xs text-brand-navy/40 font-medium uppercase tracking-wider">{item.category}</p>
                    </div>
                  </div>
                  <ArrowRight className="text-brand-orange opacity-0 group-hover:opacity-100 transition-all" size={16} />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-[10px] font-black tracking-widest text-brand-navy/30 uppercase mb-4">Quick Browse</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {["Mega Boxes", "Eco-Packs", "Gift Suites", "Trending"].map(link => (
                  <a key={link} href="#" className="text-sm text-brand-navy/70 hover:text-brand-orange font-bold font-serif transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-brand-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
