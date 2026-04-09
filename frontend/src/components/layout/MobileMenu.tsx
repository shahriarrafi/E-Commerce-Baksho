"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronRight, User as UserIcon, LogOut, Package, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useUIStore } from "@/store/useUIStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    closeMobileMenu();
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md z-[110]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[85%] max-w-[400px] bg-white z-[111] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-cream">
              <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                  <Package className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold font-serif text-brand-navy">Baksho</span>
              </Link>
              <button onClick={closeMobileMenu} className="p-2 text-brand-navy/40 hover:text-brand-orange transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">

              {/* Browse Categories */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/30">Browse Collections</p>
                <div className="grid grid-cols-1 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavigation(`/category/${cat.slug}`)}
                      className="flex items-center justify-between p-1 group hover:pl-2 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-navy/40 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-colors">
                          {/* In a real app, use cat.icon or thumbnail */}
                          <Package size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-lg font-serif text-brand-navy group-hover:text-brand-orange transition-colors">{cat.name}</span>
                      </div>
                      <ChevronRight size={18} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/30">Exclusive</p>
                <div className="space-y-4 pl-1">
                  <Link href="#" className="block text-lg font-serif text-brand-navy hover:text-brand-orange transition-colors">Baksho Stories</Link>
                  <Link href="#" className="block text-lg font-serif text-brand-navy hover:text-brand-orange transition-colors">Unboxing Ritual</Link>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-brand-cream bg-brand-cream/20">
              <button
                onClick={() => { openSearch(); closeMobileMenu(); }}
                className="w-full bg-white border border-brand-navy/5 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-navy flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-all"
              >
                <Search size={16} className="text-brand-orange" /> Secure Search
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
