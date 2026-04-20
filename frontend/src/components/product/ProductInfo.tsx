"use client";

import { useState } from "react";
import {
  Star,
  Share2,
  Heart,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { triggerHaptic } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStorageUrl } from "@/lib/api";

interface ProductInfoProps {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    inStock: boolean;
    category: string | null;
    category_slug: string | null;
    description: string;
    main_image?: string;
    images?: string[];
    variants?: { type: string, options: { id: number, name: string }[] }[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, { id: number, name: string }>>(
    product.variants?.reduce((acc, v) => ({ ...acc, [v.type]: v.options[0] }), {}) || {}
  );

  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const isOutOfStock = !product.inStock;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    triggerHaptic();

    // Pick the primary variant ID if multiple types exist (standard commerce ritual)
    const variantId = Object.values(selectedVariants)[0]?.id;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getStorageUrl(product.main_image),
      slug: product.slug,
      variant_id: variantId
    }, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    triggerHaptic();

    const variantId = Object.values(selectedVariants)[0]?.id;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getStorageUrl(product.main_image),
      slug: product.slug,
      variant_id: variantId
    }, quantity, false);
    router.push("/checkout");
  };

  const updateQuantity = (newQty: number) => {
    triggerHaptic();
    setQuantity(newQty);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-navy/30 font-noto">
        <Link href="/" className="hover:text-brand-orange">হোম</Link> <ChevronRight size={8} />
        {product.category_slug && (
          <>
            <Link href={`/category/${product.category_slug}`} className="hover:text-brand-orange uppercase">{product.category}</Link> 
            <ChevronRight size={8} />
          </>
        )}
        <span className="text-brand-orange truncate max-w-[100px] uppercase">{product.slug}</span>
      </div>

      {/* 2. Title & Icons */}
      <div className="flex justify-between items-start gap-4">
        <h1 className="text-xl md:text-2xl font-bold font-anek text-brand-navy leading-tight">
          {product.name}
        </h1>
        <div className="flex gap-2 shrink-0 pt-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-cream/30 text-brand-navy hover:bg-brand-navy hover:text-white transition-all"><Share2 size={14} /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-cream/30 text-brand-navy hover:bg-brand-navy hover:text-white transition-all"><Heart size={14} /></button>
        </div>
      </div>

      {/* 3. Rating Summary */}
      <div className="flex items-center gap-3 font-noto">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="fill-brand-orange text-brand-orange" />)}
        </div>
        <Link href="#reviews" className="text-[10px] font-bold text-blue-500 hover:underline">৪২টি রেটিং</Link>
        <div className="w-[1px] h-3 bg-brand-cream" />
        <Link href="#qa" className="text-[10px] font-bold text-blue-500 hover:underline">১২টি প্রশ্নোত্তর</Link>
      </div>

      {/* 5. Price Area */}
      <div className="py-2 border-y border-brand-cream/50 my-1 font-noto">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-brand-orange tracking-tighter font-anek">{formatPrice(product.price)}</span>
          {isOutOfStock && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-black uppercase">স্টক নেই</span>}
        </div>
      </div>

      {/* 6. Variants - Live from API */}
      {product.variants?.map((variant) => (
        <div key={variant.type} className="flex flex-col gap-2 font-noto">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">{variant.type}:</span>
            <span className="text-[10px] font-black text-brand-navy uppercase">{selectedVariants[variant.type]?.name}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.type]: option }))}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border ${selectedVariants[variant.type]?.id === option.id
                  ? 'border-brand-orange bg-brand-orange/5 text-brand-orange shadow-sm'
                  : 'border-brand-cream bg-white text-brand-navy/60 hover:border-brand-orange/30'
                  }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 7. Quantity Selector */}
      <div className="flex items-center gap-4 py-2 mt-2 font-noto">
        <span className="text-[10px] font-bold text-brand-navy/40 uppercase tracking-widest">পরিমাণ:</span>
        <div className="flex items-center bg-brand-cream/20 rounded-lg border border-brand-cream overflow-hidden">
          <button onClick={() => updateQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-brand-cream transition-colors text-brand-navy">-</button>
          <div className="w-10 h-8 flex items-center justify-center font-black text-[11px] text-brand-navy border-x border-brand-cream bg-white font-sans">{quantity}</div>
          <button onClick={() => updateQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-brand-cream transition-colors text-brand-navy">+</button>
        </div>
      </div>

      {/* 8. Action Buttons */}
      <div className="flex gap-3 pt-4 font-noto">
        <button
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className="flex-1 bg-brand-orange text-white py-4 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-brand-orange/20 hover:bg-brand-navy transition-all active:scale-95 disabled:opacity-50"
        >
          এখনই কিনুন
        </button>
        <button
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="flex-1 bg-brand-navy text-white py-4 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-brand-navy/20 hover:bg-brand-orange transition-all active:scale-95 disabled:opacity-50"
        >
          কার্টে যোগ করুন
        </button>
      </div>
    </div>
  );
}
