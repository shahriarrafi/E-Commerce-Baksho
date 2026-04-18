"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Loader2, Package } from "lucide-react";
import ProductCard from "../product/ProductCard";
import { apiFetch } from "@/lib/api";

interface SimpleProduct {
  id: number;
  name: string;
  price: number;
  slug: string;
  main_image?: string;
}

export default function TrendingCarousel() {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data } = await apiFetch<{ data: SimpleProduct[] }>("/products", {
          params: { trending: "1", limit: "8" }
        });
        setProducts(data);
      } catch (err) {
        console.error("Trending discovery failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTrending();
  }, []);

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 bg-white">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-brand-navy/20 font-noto">ট্রেন্ডিং কালেকশন লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase font-noto">
                <span className="w-8 h-[1px] bg-brand-orange" />
                অনুসন্ধান
             </div>
             <h2 className="text-4xl font-bold font-anek text-brand-navy leading-tight">
                জনপ্রিয় <br />
                <span className="italic text-brand-orange">বাকশোসমূহ।</span>
             </h2>
          </div>
          
          <div className="flex gap-3">
             <button 
               onClick={scrollLeft}
               className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all text-brand-navy/40"
             >
                <ChevronLeft size={18} />
             </button>
             <button 
               onClick={scrollRight}
               className="w-10 h-10 rounded-full border border-brand-navy/10 flex items-center justify-center hover:bg-brand-navy hover:text-white transition-all text-brand-navy/40"
             >
                <ChevronRight size={18} />
             </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="flex gap-3 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 transition-all"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product.id}
                className="min-w-[280px] md:min-w-[360px] snap-center px-1 hover:scale-[1.01] transition-transform duration-300 ease-out"
              >
                <ProductCard 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  image={product.main_image}
                />
              </div>
            ))
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-brand-navy/10 rounded-[40px] text-brand-navy/30">
              <Package size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-bold font-noto">বর্তমানে কোনো জনপ্রিয় পণ্য নেই।</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 py-6 border-t border-brand-navy/5">
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-navy/30 font-noto">
              <TrendingUp size={12} className="text-brand-orange" />
              বর্তমানে গ্রাহকদের সেরা পছন্দ
           </div>
           <div className="h-[1px] flex-1 bg-brand-navy/10" />
           <p className="text-[10px] font-bold text-brand-navy/40 italic font-noto">প্রতি রবিবার সন্ধ্যা ৬ টায় নতুন কালেকশন</p>
        </div>
      </div>
    </section>
  );
}
