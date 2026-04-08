"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import ProductCard from "../product/ProductCard";

const TRENDING_PRODUCTS = [
  { id: 1, name: "The Signature Box", price: 129.00, slug: "signature-baksho-box", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop" },
  { id: 2, name: "Noir Edition v2", price: 159.00, slug: "noir-edition-v2", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, name: "Eco Craft Lite", price: 89.00, slug: "eco-craft-lite", image: "https://images.unsplash.com/photo-1607344645866-009c323b63e0?q=80&w=2080&auto=format&fit=crop" },
  { id: 4, name: "Velvet Heritage", price: 249.00, slug: "velvet-heritage", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, name: "Minimalist Slate", price: 110.00, slug: "minimalist-slate", image: "https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=2070&auto=format&fit=crop" },
];

export default function TrendingCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase">
                <span className="w-8 h-[1px] bg-brand-orange" />
                Discovery
             </div>
             <h2 className="text-4xl font-serif text-brand-navy leading-tight">
                Trending <br />
                <span className="italic text-brand-orange">Baksho.</span>
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
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 transition-all"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {TRENDING_PRODUCTS.map((product) => (
            <motion.div 
               key={product.id}
               className="min-w-[280px] md:min-w-[360px] snap-center px-1"
               whileHover={{ scale: 1.01 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
               <ProductCard 
                 id={product.id}
                 name={product.name}
                 price={product.price}
                 slug={product.slug}
                 image={product.image}
               />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4 py-6 border-t border-brand-navy/5">
           <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-navy/30">
              <TrendingUp size={12} className="text-brand-orange" />
              Popular Demand Current
           </div>
           <div className="h-[1px] flex-1 bg-brand-navy/10" />
           <p className="text-[10px] font-bold text-brand-navy/40 italic">New arrivals every Sunday at 6 PM BST</p>
        </div>
      </div>
    </section>
  );
}
