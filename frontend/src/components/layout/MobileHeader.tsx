"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Package, ArrowLeft, Truck, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUIStore } from "@/store/useUIStore";
import { useState, useEffect, useRef } from "react";
import { triggerHaptic } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import Image from "next/image";

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { openMobileMenu, openSearch } = useUIStore();
  
  const isVisible = useScrollDirection();


  return (
    <motion.header 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed top-0 left-0 right-0 z-[120] lg:hidden bg-white border-b border-brand-cream/50 shadow-sm"
    >
      <div className="flex flex-col">
        {/* Top Row: Menu & Logo */}
        <div className="h-12 px-4 flex items-center gap-2.5">
          <button
            onClick={() => {
              triggerHaptic();
              openMobileMenu();
            }}
            className="p-1.5 -ml-1 text-brand-navy hover:text-brand-orange transition-colors"
            aria-label="Open Menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          <Link 
            href="/" 
            className="flex items-center"
            onClick={() => triggerHaptic()}
          >
            <Image 
              src="/logo.webp" 
              alt="Baksho Logo" 
              width={90} 
              height={28} 
              priority
              className="h-7 w-auto object-contain" 
            />
          </Link>

          {/* Logistics & Contact Shortcut Group */}
          <div className="ml-auto flex items-center gap-1">
             <Link 
               href="/track-order"
               className="p-1.5 text-brand-navy hover:text-brand-orange transition-colors"
               onClick={() => triggerHaptic()}
               aria-label="Track Order"
             >
               <Truck size={18} strokeWidth={1.5} />
             </Link>
             <Link 
               href="https://m.me/yourpage"
               target="_blank"
               className="p-1.5 text-brand-navy hover:text-brand-orange transition-colors"
               onClick={() => triggerHaptic()}
               aria-label="Contact Messenger"
             >
               <MessageSquare size={18} strokeWidth={1.5} />
             </Link>
          </div>
        </div>

        {/* Second Row: Search Bar */}
        <div className="px-4 pb-2">
          <div 
            onClick={() => {
              triggerHaptic();
              openSearch();
            }}
            className="relative flex items-center w-full h-9 bg-brand-cream/30 border border-brand-navy/5 rounded-xl px-3 text-brand-navy/40 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Search size={16} className="text-brand-navy/30 mr-2" />
            <span className="text-xs font-medium">Search products...</span>
            
            {/* Suffix area */}
            <div className="ml-auto flex items-center gap-2">
              <div className="w-px h-3 bg-brand-navy/10 mx-1" />
              <div className="w-6 h-6 bg-brand-orange rounded-lg flex items-center justify-center">
                 <Search size={12} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
