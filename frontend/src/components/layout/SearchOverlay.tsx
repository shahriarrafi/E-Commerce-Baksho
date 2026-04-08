"use client";

import { motion } from "framer-motion";
import { Search, X, Command, ArrowRight, Package, Clock } from "lucide-react";
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
      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col pt-32 px-6"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header/Close */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose}
            className="p-3 bg-brand-navy/5 hover:bg-brand-orange hover:text-white rounded-full transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-orange" size={32} />
          <input
            autoFocus
            type="text"
            placeholder="Search Baksho..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-24 bg-transparent border-b-4 border-brand-navy/10 focus:border-brand-orange outline-none px-20 text-4xl md:text-5xl font-serif text-brand-navy placeholder:text-brand-navy/20 transition-all font-bold"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 bg-brand-cream rounded-lg text-xs font-black text-brand-navy/40">
            <kbd><Command size={12} /></kbd>
            <span>K</span>
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Live Suggestions */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-6 flex items-center gap-2">
              <Package size={14} /> Top Suggestions
            </h3>
            <div className="space-y-4">
              {MOCK_SUGGESTIONS.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-brand-cream/50 hover:bg-brand-orange/10 hover:translate-x-2 transition-all cursor-pointer group"
                >
                  <div>
                    <h4 className="font-bold text-brand-navy group-hover:text-brand-orange transition-colors">{item.name}</h4>
                    <p className="text-xs text-brand-navy/40">{item.category}</p>
                  </div>
                  <ArrowRight className="text-brand-orange opacity-0 group-hover:opacity-100 transition-all" size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent & Categories */}
          <div>
            <div className="mb-10">
              <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-6 flex items-center gap-2">
                <Clock size={14} /> Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((search) => (
                  <button 
                    key={search}
                    className="px-4 py-2 bg-brand-navy/5 hover:bg-brand-navy/10 rounded-full text-sm font-medium text-brand-navy transition-all"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-6">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Laptops", "Home Decor", "Gift Boxes", "Trending"].map(link => (
                  <a key={link} href="#" className="text-brand-navy hover:text-brand-orange font-bold text-lg font-serif transition-colors">
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
