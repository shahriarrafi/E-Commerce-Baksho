"use client";

import { motion } from "framer-motion";
import { Search, X, Command, ArrowRight, Package, Clock, ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { apiFetch, getStorageUrl } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  onClose: () => void;
}

interface SearchResult {
  id: number;
  name: string;
  slug: string;
  category: {
    name: string;
  };
  main_image?: string;
}

const RECENT_SEARCHES = ["আনবক্সিং কিট", "গিফট সেট", "ইলেকট্রনিক গ্যাজেট"];

export default function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Search ritual with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data } = await apiFetch<{ data: SearchResult[] }>("/products/search", {
          params: { q: query }
        });
        setResults(data);
      } catch (err) {
        console.error("Search ritual failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleResultClick = (slug: string) => {
    onClose();
    router.push(`/product/${slug}`);
  };

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
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-navy/30 font-noto">সার্চ পোর্টাল</h2>
          <button 
            onClick={onClose}
            className="p-2 md:p-3 bg-brand-navy/5 hover:bg-brand-orange hover:text-white rounded-xl transition-all group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Search Input - Compact & Premium */}
        <div className="relative mb-8 md:mb-12">
          {isLoading ? (
            <Loader2 className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-brand-orange animate-spin" size={20} />
          ) : (
            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-brand-orange" size={20} />
          )}
          <input
            autoFocus
            type="text"
            placeholder="বাকশো-তে খুঁজুন..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 md:h-20 bg-brand-cream/30 rounded-2xl border border-brand-navy/5 focus:border-brand-orange/50 outline-none pl-12 md:pl-16 pr-16 md:pr-20 text-lg md:text-3xl font-serif text-brand-navy placeholder:text-brand-navy/20 transition-all font-bold font-anek"
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
            <h3 className="text-[10px] font-black tracking-widest text-brand-orange uppercase flex items-center gap-2 font-noto">
                <ShieldCheck size={12} /> আপনার পছন্দ অনুযায়ী
            </h3>
            <div className="space-y-3">
                {[
                    { title: "মর্নিং মিনিমালিস্ট", desc: "স্বচ্ছতার সাথে আপনার দিন শুরু করুন", icon: "☕" },
                    { title: "আরামদায়ক সন্ধ্যা", desc: "দিনের শেষে প্রশান্তির অনুভুতি", icon: "🌙" }
                ].map((ritual) => (
                    <div 
                        key={ritual.title}
                        className="p-5 rounded-3xl bg-brand-orange/5 border border-brand-orange/10 hover:bg-brand-orange hover:text-white transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{ritual.icon}</span>
                            <div>
                                <h4 className="font-bold font-anek group-hover:text-white leading-tight">{ritual.title}</h4>
                                <p className="text-[10px] uppercase font-bold tracking-widest opacity-40 group-hover:opacity-100 font-noto">{ritual.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-[10px] font-black tracking-widest text-brand-navy/30 uppercase mb-4 flex items-center gap-2 font-noto">
                    <Clock size={12} /> সাম্প্রতিক সার্চ
                </h3>
                <div className="flex flex-wrap gap-1.5 font-noto">
                    {RECENT_SEARCHES.map((search) => (
                    <button 
                        key={search}
                        className="px-3 py-1.5 bg-brand-navy/5 hover:bg-brand-navy/10 rounded-lg text-[11px] font-bold text-brand-navy transition-all"
                        onClick={() => setQuery(search)}
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
               <h3 className="text-[10px] font-black tracking-widest text-brand-navy/30 uppercase flex items-center gap-2 font-noto">
                <Package size={12} /> {query ? "সার্চ ফলাফল" : "সেরা ফলাফল"}
              </h3>
            </div>
            <div className="space-y-2">
              {results.length > 0 ? (
                results.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => handleResultClick(item.slug)}
                    className="flex items-center justify-between p-3 md:p-4 rounded-xl md:rounded-2xl bg-brand-cream/40 hover:bg-brand-orange/5 hover:translate-x-1 transition-all cursor-pointer group border border-transparent hover:border-brand-orange/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-orange shadow-sm border border-brand-orange/5 overflow-hidden">
                          {item.main_image ? (
                             <Image src={getStorageUrl(item.main_image)} alt={item.name} fill className="object-cover" />
                          ) : (
                             <Package size={16} />
                          )}
                      </div>
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-brand-navy transition-colors font-anek">{item.name}</h4>
                        <p className="text-[10px] md:text-xs text-brand-navy/40 font-bold uppercase tracking-wider font-noto">{item.category?.name || "Uncategorized"}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-brand-orange opacity-0 group-hover:opacity-100 transition-all" size={16} />
                  </div>
                ))
              ) : query && !isLoading ? (
                <div className="py-10 text-center">
                  <p className="text-sm font-bold text-brand-navy/40 font-noto">দুঃখিত, কোনো পণ্য পাওয়া যায়নি।</p>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-sm font-bold text-brand-navy/20 font-noto">একটি সার্চ কিওয়ার্ড টাইপ করুন...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
