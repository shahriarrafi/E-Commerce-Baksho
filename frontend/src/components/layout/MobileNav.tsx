"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, ShoppingBag, User, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { triggerHaptic } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";

export default function MobileNav() {
  const pathname = usePathname();
  const { toggleCart, getTotals } = useCartStore();
  const { openSearch } = useUIStore();
  const { totalItems } = getTotals();

  const isVisible = !useScrollDirection();

  const navItems = [
    { id: "home", label: "হোম", icon: Home, href: "/" },
    { id: "arrivals", label: "নতুন", icon: Sparkles, href: "/category/new-arrivals" },
    { id: "search", label: "খুঁজুন", icon: Search, href: "#", action: () => { triggerHaptic(); openSearch(); } },
    { id: "cart", label: "কার্ট", icon: ShoppingBag, href: "#", action: () => { triggerHaptic(); toggleCart(); }, badge: totalItems },
    { id: "account", label: "ভল্ট", icon: User, href: "/dashboard" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden pb-[env(safe-area-inset-bottom)]"
    >
      {/* Glossy Backdrop */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border-t border-brand-orange/10" />

      <div className="relative container mx-auto px-4 h-20 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href && item.href !== "#";
          const Icon = item.icon;

          const content = (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1.5 relative py-2 px-1"
            >
              <motion.div
                animate={isActive ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
                className={`transition-colors duration-300 ${isActive ? "text-brand-orange" : "text-brand-navy/30"}`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className={`text-[8px] font-black uppercase tracking-widest transition-colors font-hind ${isActive ? "text-brand-orange" : "text-brand-navy/30"}`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 w-1 h-1 bg-brand-orange rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {item.badge !== undefined && item.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm"
                >
                  {item.badge}
                </motion.span>
              )}
            </motion.div>
          );

          if (item.action) {
            return (
              <button key={item.id} onClick={item.action} className="flex-1 outline-none" aria-label={item.label}>
                {content}
              </button>
            );
          }

          return (
            <Link key={item.id} href={item.href} className="flex-1" onClick={() => triggerHaptic()} aria-label={item.label}>
              {content}
            </Link>
          );
        })}
      </div>

      {/* Safe Area for Mobile Notch */}
      <div className="h-safe-bottom bg-white/80 backdrop-blur-2xl" />
    </motion.nav>
  );
}
