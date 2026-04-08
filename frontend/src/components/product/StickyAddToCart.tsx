"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

interface StickyAddToCartProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
}

export default function StickyAddToCart({ product }: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[95%] max-w-4xl"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-brand-orange/10 rounded-3xl p-3 md:p-4 shadow-2xl shadow-brand-navy/10 flex items-center justify-between gap-3 md:gap-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Star className="text-brand-orange animate-pulse" size={40} />
             </div>

            <div className="flex items-center gap-3 md:gap-4 lg:min-w-0">
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="hidden sm:block truncate">
                <h4 className="text-brand-navy font-bold text-xs md:text-sm tracking-tight truncate max-w-[150px]">{product.name}</h4>
                <p className="text-brand-orange font-bold text-base md:text-lg">${product.price.toFixed(2)}</p>
              </div>
              <div className="sm:hidden">
                 <p className="text-brand-orange font-bold text-base md:text-lg">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex gap-1.5 px-4 py-2 bg-brand-cream rounded-2xl border border-brand-orange/5 flex-shrink-0">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} size={10} className="fill-brand-orange text-brand-orange" />
                ))}
                <span className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-tighter ml-1">4.9 / 5.0</span>
              </div>
              
              <button className="flex items-center gap-3 bg-brand-navy text-white px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-brand-orange transition-all hover:shadow-xl hover:shadow-brand-orange/20 active:scale-95 group whitespace-nowrap">
                <ShoppingCart size={14} className="group-hover:translate-x-1 transition-transform" />
                Quick Add
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
