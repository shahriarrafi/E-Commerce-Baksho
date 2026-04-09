"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotals } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const { subtotal, totalItems } = getTotals();
  const FREE_SHIPPING_THRESHOLD = 500;
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] z-[210] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-brand-cream flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <ShoppingBag className="text-brand-orange" size={24} />
                    <h2 className="text-2xl font-serif font-bold text-brand-navy">Your Ritual</h2>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">
                  {totalItems} Collections Ready
                </p>
              </div>
              <button
                onClick={toggleCart}
                className="w-12 h-12 flex items-center justify-center bg-brand-cream rounded-full transition-all text-brand-navy/40 hover:text-brand-orange hover:bg-brand-orange/10 active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
                <div className="px-8 pt-6 pb-2">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-bold text-brand-navy/60 uppercase tracking-tight">
                            {shippingProgress >= 100 
                                ? "Gratis Shipping Achieved" 
                                : `Add $${remainingForFreeShipping.toFixed(0)} for Free Shipping`}
                        </span>
                        <span className="text-[11px] font-black text-brand-orange">{Math.round(shippingProgress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-brand-cream rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${shippingProgress}%` }}
                            className="h-full bg-brand-orange rounded-full"
                        />
                    </div>
                </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-brand-cream rounded-[2rem] flex items-center justify-center rotate-12">
                    <ShoppingBag className="text-brand-orange/20" size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-brand-navy">Box is Empty</h3>
                    <p className="text-sm text-brand-navy/40 max-w-[200px] leading-relaxed mx-auto">Seal your next ritual with our curated lifestyle pieces.</p>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="bg-brand-navy text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10 active:scale-95"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                    {items.map((item) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id}
                        className="flex gap-5 group"
                    >
                        <div className="relative w-24 h-24 bg-brand-cream rounded-3xl overflow-hidden flex-shrink-0 border border-brand-orange/5">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                            <div className="flex justify-between items-start">
                            <h4 className="font-serif font-bold text-lg text-brand-navy leading-tight hover:text-brand-orange transition-colors cursor-pointer">{item.name}</h4>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 flex items-center justify-center text-brand-navy/20 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                            </div>
                            <p className="text-brand-orange font-black text-lg mt-1 tracking-tighter">${item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center bg-brand-cream/50 rounded-xl p-1.5 border border-brand-orange/5">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-brand-navy/40 hover:text-brand-orange"
                            >
                                <Minus size={14} strokeWidth={2.5} />
                            </button>
                            <span className="w-10 text-center text-xs font-black text-brand-navy">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-brand-navy/40 hover:text-brand-orange"
                            >
                                <Plus size={14} strokeWidth={2.5} />
                            </button>
                            </div>
                        </div>
                        </div>
                    </motion.div>
                    ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-brand-cream bg-white space-y-6 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-brand-cream pb-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">Total Ritual Score</span>
                        <span className="text-4xl font-black text-brand-navy tracking-tighter">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                         <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">Secure Portal</span>
                         <ShieldCheck className="text-brand-orange" size={24} />
                    </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={toggleCart}
                  className="w-full bg-brand-navy text-white py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-brand-orange transition-all hover:shadow-2xl hover:shadow-brand-orange/20 active:scale-[0.98] group"
                >
                  Confirm & Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-orange/40" />
                    <p className="text-[9px] text-brand-navy/40 font-bold uppercase tracking-[0.2em]">
                        Handcrafted Fulfillment • Standard Ritual Shipping
                    </p>
                    <div className="w-1 h-1 rounded-full bg-brand-orange/40" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
