"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, LayoutGrid, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { motion } from "framer-motion";

export default function MobileNav() {
  const pathname = usePathname();
  const { toggleCart, getTotals } = useCartStore();
  const { openSearch, openMobileMenu } = useUIStore();
  const { totalItems } = getTotals();

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(10);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "categories", label: "Explore", icon: LayoutGrid, href: "#", action: () => { triggerHaptic(); openMobileMenu(); } },
    { id: "search", label: "Search", icon: Search, href: "#", action: () => { triggerHaptic(); openSearch(); } },
    { id: "cart", label: "Cart", icon: ShoppingBag, href: "#", action: () => { triggerHaptic(); toggleCart(); }, badge: totalItems },
    { id: "account", label: "Vault", icon: User, href: "/dashboard" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden pb-[env(safe-area-inset-bottom)]">
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
              <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${isActive ? "text-brand-orange" : "text-brand-navy/30"}`}>
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
              <button key={item.id} onClick={item.action} className="flex-1 outline-none">
                {content}
              </button>
            );
          }

          return (
            <Link key={item.id} href={item.href} className="flex-1" onClick={triggerHaptic}>
              {content}
            </Link>
          );
        })}
      </div>
      
      {/* Safe Area for Mobile Notch */}
      <div className="h-safe-bottom bg-white/80 backdrop-blur-2xl" />
    </nav>
  );
}
