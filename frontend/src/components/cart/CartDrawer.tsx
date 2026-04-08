"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
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
            className="fixed inset-0 bg-brand-navy/40 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[210] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-cream flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-brand-orange" size={24} />
                <h2 className="text-xl font-serif font-bold text-brand-navy">Your Baksho Cart</h2>
                <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                  {totalItems} Items
                </span>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-brand-cream rounded-full transition-colors text-brand-navy/40 hover:text-brand-navy"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-brand-navy/20" size={40} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-brand-navy">Empty as a Box</h3>
                    <p className="text-sm text-brand-navy/50">Start your unboxing journey with our premium picks.</p>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="bg-brand-navy text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange transition-all"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-24 h-24 bg-brand-cream rounded-2xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif font-bold text-brand-navy leading-tight">{item.name}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-brand-navy/20 hover:text-brand-orange transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-brand-orange font-bold text-sm mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-brand-cream/50 rounded-lg p-1 border border-brand-orange/5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-brand-orange transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-brand-navy">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-brand-orange transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-xs font-black text-brand-navy/40">
                          Total: <span className="text-brand-navy">${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-cream bg-brand-cream/10 space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-navy/50">Subtotal</span>
                    <span className="text-brand-navy font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-navy/50">Shipping</span>
                    <span className="text-brand-orange font-black uppercase tracking-tighter text-[10px]">Calculated at Checkout</span>
                  </div>
                  <div className="h-[1px] bg-brand-navy/5 my-2" />
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-serif font-bold text-brand-navy">Total</span>
                    <span className="text-3xl font-black text-brand-navy tracking-tighter">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={toggleCart}
                  className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-orange transition-all hover:shadow-2xl hover:shadow-brand-orange/20 group"
                >
                  Secure Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-center text-[10px] text-brand-navy/30 font-bold uppercase tracking-widest">
                  Includes taxes. Free shipping on orders over $150.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
