"use client";

import { motion } from "framer-motion";
import { Check, Hexagon, Package, ArrowRight, Share2, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    setOrderNumber(`BK-${Math.floor(Math.random() * 900000) + 100000}`);
    
    // Fire confetti for the "wow" factor
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream/30 flex items-center justify-center pt-32 pb-20 px-6">
      <div className="max-w-xl w-full flex flex-col items-center">
        {/* Hexagonal Success Badge */}
        <div className="relative mb-12">
          {/* Outer Ring */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 0.1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -inset-12 text-brand-orange"
          >
            <Hexagon size={280} fill="currentColor" />
          </motion.div>
          
          {/* Main Hexagon */}
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
            }}
            className="relative z-10 w-44 h-44 bg-brand-navy rounded-[40px] flex items-center justify-center shadow-2xl shadow-brand-navy/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="bg-brand-orange p-6 rounded-3xl"
            >
              <Check size={48} className="text-white" strokeWidth={4} />
            </motion.div>
            
            {/* Floating Decorative Elements */}
            <motion.div 
               animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute -top-4 -right-4 bg-brand-orange/10 p-3 rounded-xl blur-[2px]"
            >
               <Package size={24} className="text-brand-orange" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-black text-brand-navy mb-4">
              Your Unboxing <br />
              <span className="text-brand-orange">Awaits.</span>
            </h1>
            <p className="text-brand-navy/50 text-lg font-sans max-w-sm mx-auto leading-relaxed">
               Payment successful! We're preparing your premium Baksho box for its journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-white border border-brand-orange/10 rounded-2xl p-4 inline-flex flex-col gap-1 shadow-sm"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/30 leading-none">Order ID</span>
            <span className="text-xl font-bold text-brand-navy tracking-tight">{orderNumber}</span>
          </motion.div>
        </div>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
          <Link 
            href="/" 
            className="bg-brand-navy text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-orange transition-all hover:shadow-xl hover:shadow-brand-orange/20 group"
          >
            Back to Shop
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button className="bg-white border-2 border-brand-navy/5 text-brand-navy px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-navy hover:text-white transition-all shadow-sm">
            <Download size={18} />
            Download Receipt
          </button>
        </motion.div>
        
        {/* Support Link */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-12 text-[10px] font-bold text-brand-navy/30 uppercase tracking-[0.2em]"
        >
          Questions? <Link href="#" className="text-brand-orange underline underline-offset-4">Concierge Support</Link>
        </motion.p>
      </div>
    </div>
  );
}
