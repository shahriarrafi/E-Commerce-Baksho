"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotals } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { subtotal, totalItems } = getTotals();
  const FREE_SHIPPING_THRESHOLD = 50000; // Updated to 50k Tk
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] z-[210] flex flex-col"
          >
            {/* Header - More Compact */}
            <div className="px-6 py-5 border-b border-brand-cream flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="text-brand-orange" size={18} />
                    <h2 className="text-lg font-serif font-bold text-brand-navy">Your Ritual</h2>
                </div>
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-navy/30">
                  {totalItems} Items Ready
                </p>
              </div>
              <button
                onClick={toggleCart}
                className="w-10 h-10 flex items-center justify-center bg-brand-cream rounded-full transition-all text-brand-navy/40 hover:text-brand-orange hover:bg-brand-orange/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Progress - Compacted */}
            {items.length > 0 && (
                <div className="px-6 pt-4 pb-1">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] font-bold text-brand-navy/60 uppercase tracking-tight">
                            {shippingProgress >= 100 
                                ? "Gratis Shipping Achieved" 
                                : `Add ${formatPrice(remainingForFreeShipping)} for Free Delivery`}
                        </span>
                        <span className="text-[9px] font-black text-brand-orange">{Math.round(shippingProgress)}%</span>
                    </div>
                    <div className="h-1 w-full bg-brand-cream rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${shippingProgress}%` }}
                            className="h-full bg-brand-orange rounded-full"
                        />
                    </div>
                </div>
            )}

            {/* Items List - Compacted Padding & Card Size */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-cream rounded-2xl flex items-center justify-center rotate-12">
                    <ShoppingBag className="text-brand-orange/20" size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-brand-navy">Box is Empty</h3>
                    <p className="text-xs text-brand-navy/40 max-w-[180px] leading-snug mx-auto">Seal your next ritual with curated lifestyle pieces.</p>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="bg-brand-navy text-white px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-brand-orange transition-all active:scale-95"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                    {items.map((item) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id}
                        className="flex gap-4 group"
                    >
                        {/* Smaller Image */}
                        <div className="relative w-16 h-16 bg-brand-cream rounded-2xl overflow-hidden flex-shrink-0 border border-brand-orange/5">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                            <div className="flex justify-between items-start">
                            <h4 className="font-serif font-bold text-sm text-brand-navy leading-tight hover:text-brand-orange transition-colors truncate max-w-[150px]">{item.name}</h4>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="w-6 h-6 flex items-center justify-center text-brand-navy/20 hover:text-red-500 transition-all"
                            >
                                <Trash2 size={12} />
                            </button>
                            </div>
                            <p className="text-brand-orange font-black text-xs mt-0.5">{formatPrice(item.price)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center bg-brand-cream/50 rounded-lg p-1 border border-brand-orange/5">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all text-brand-navy/40 hover:text-brand-orange"
                            >
                                <Minus size={10} strokeWidth={3} />
                            </button>
                            <span className="w-8 text-center text-[10px] font-black text-brand-navy">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all text-brand-navy/40 hover:text-brand-orange"
                            >
                                <Plus size={10} strokeWidth={3} />
                            </button>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                    ))}
                    
                    {/* RECOMMENDED UPSYLL - Compacted */}
                    <div className="pt-8 border-t border-brand-cream/30 space-y-4">
                        <div className="flex flex-col">
                            <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-orange">The Final Touch</h4>
                            <p className="text-xs font-serif font-bold text-brand-navy">Add to your ritual</p>
                        </div>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                            {[
                                { name: "Silk Gift Wrap", price: 550, image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop" },
                                { name: "Handwritten Note", price: 200, image: "https://images.unsplash.com/photo-1623151522295-829919f2e379?q=80&w=2080&auto=format&fit=crop" }
                            ].map((upsell, i) => (
                                <div key={i} className="min-w-[120px] flex flex-col gap-2 group">
                                    <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-cream">
                                        <Image src={upsell.image} alt={upsell.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <button className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-[7px] font-black uppercase tracking-widest text-white">+ Add</span>
                                        </button>
                                    </div>
                                    <div className="space-y-0.5">
                                        <h5 className="text-[9px] font-bold text-brand-navy truncate">{upsell.name}</h5>
                                        <p className="text-[9px] text-brand-orange font-black">{formatPrice(upsell.price)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              )}
            </div>

            {/* Footer - Tighter */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-brand-cream bg-white space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-brand-cream pb-3">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-widest text-brand-navy/30">Total Investment</span>
                        <span className="text-2xl font-black text-brand-navy tracking-tighter">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-40">
                         <ShieldCheck className="text-brand-orange" size={14} />
                         <span className="text-[8px] font-black uppercase tracking-widest text-brand-navy">Secure</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={toggleCart}
                  className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-orange transition-all active:scale-[0.98] group"
                >
                  Finalize Ritual
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center justify-center gap-2 opacity-30">
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-brand-navy">
                        Handcrafted Fulfillment Ritual
                    </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
                
}
