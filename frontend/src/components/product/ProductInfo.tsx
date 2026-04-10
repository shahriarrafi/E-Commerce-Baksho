
"use client";

import { useState } from "react";
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { triggerHaptic } from "@/lib/utils";
import { formatPrice, getShippingCountdown } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    triggerHaptic();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug
    }, quantity);
  };

  const handleBuyNow = () => {
    triggerHaptic();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug
    }, quantity, false);
    router.push("/checkout");
  };

  const updateQuantity = (newQty: number) => {
    triggerHaptic();
    setQuantity(newQty);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {/* Breadcrumbs / Category */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30">Shop</span>
        <div className="w-1 h-1 rounded-full bg-brand-orange/40" />
        <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange">{product.category}</span>
      </div>

      {/* Title & Price */}
      <div className="space-y-3 md:space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy leading-tight"
        >
          {product.name}
        </motion.h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="text-2xl md:text-4xl font-black text-brand-navy tracking-tighter">
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-cream/50 rounded-full border border-brand-orange/10 w-fit">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} size={10} className="fill-brand-orange text-brand-orange" />
              ))}
            </div>
            <span className="text-[9px] font-bold text-brand-navy/60 uppercase tracking-widest">4.8 (124 reviews)</span>
          </div>
        </div>
      </div>

      {/* Shipping Urgency - NEW UX HELPER */}
      <div className="flex items-center gap-3 p-3 bg-brand-orange/5 border border-brand-orange/10 rounded-2xl w-fit">
        <Clock size={16} className="text-brand-orange animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy">
            Order in the next <span className="text-brand-orange">{getShippingCountdown()}</span> for <span className="underline decoration-2 underline-offset-4 decoration-brand-orange/30">Dispatch Today</span>
        </p>
      </div>

      {/* Description */}
      <p className="text-brand-navy/60 text-base md:text-lg leading-relaxed font-light">
        {product.description}
      </p>

      {/* Add to Cart Section */}
      <div className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex items-center justify-between sm:justify-start gap-4 px-4 py-2 bg-brand-cream/30 rounded-xl border border-brand-orange/5">
             <button 
               onClick={() => updateQuantity(Math.max(1, quantity - 1))}
               className="w-8 h-8 flex items-center justify-center text-brand-navy font-black text-lg hover:text-brand-orange transition-colors"
             >
               -
             </button>
             <motion.span 
               key={quantity}
               initial={{ y: 5, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="font-black text-brand-navy min-w-[20px] text-center"
             >
               {quantity}
             </motion.span>
             <button 
               onClick={() => updateQuantity(quantity + 1)}
               className="w-8 h-8 flex items-center justify-center text-brand-navy font-black text-lg hover:text-brand-orange transition-colors"
             >
               +
             </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-navy/5 text-brand-navy border border-brand-navy/10 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all active:scale-[0.98] group"
          >
            <ShoppingCart size={16} className="group-hover:rotate-12 transition-transform" />
            Add To Cart
          </button>

          <button 
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-3 bg-brand-orange text-white px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-navy transition-all hover:shadow-2xl hover:shadow-brand-orange/30 active:scale-[0.98] group"
          >
            Buy Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 pt-2 md:pt-6">
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-brand-cream/20 border border-brand-orange/5">
            <ShieldCheck size={14} className="text-brand-orange" />
            <span className="text-[8px] font-black uppercase tracking-widest text-brand-navy">High Quality</span>
          </div>
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-brand-cream/20 border border-brand-orange/5">
            <Truck size={14} className="text-brand-orange" />
            <span className="text-[8px] font-black uppercase tracking-widest text-brand-navy">Quick Delivery</span>
          </div>
          <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-brand-cream/40 border border-brand-orange/5 col-span-2 md:col-span-1">
            <RotateCcw size={14} className="text-brand-orange" />
            <span className="text-[8px] font-black uppercase tracking-widest text-brand-navy">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
