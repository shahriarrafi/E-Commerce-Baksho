"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Search, Menu, X, Command, ShoppingBag, User as UserIcon, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import SearchOverlay from "./SearchOverlay";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
export default function Header() {
  const router = useRouter();
  const { isSearchOpen, openSearch, closeSearch, openMobileMenu } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { toggleCart, getTotals } = useCartStore();
  const { totalItems } = getTotals();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] w-full transition-all duration-300 hidden lg:block ${isScrolled
          ? "h-16 bg-white/90 backdrop-blur-xl border-b border-brand-cream shadow-sm"
          : "h-20 bg-white/0 border-b border-transparent"
          }`}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/Logo.webp"
              alt="Baksho Logo"
              width={110}
              height={32}
              priority
              className="h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav - High Density */}
          <nav className="hidden lg:flex items-center gap-10">
            <button
              onClick={() => openMobileMenu()}
              className="text-[11px] font-black text-brand-navy/60 hover:text-brand-orange transition-colors flex items-center gap-1.5 uppercase tracking-widest py-8"
            >
              Categories
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <Link href="/category/new-arrivals" className="text-[11px] font-black text-brand-navy/60 hover:text-brand-orange transition-colors uppercase tracking-widest">Shop</Link>
            <Link href="/track-order" className="text-[11px] font-black text-brand-navy/60 hover:text-brand-orange transition-colors uppercase tracking-widest">Track Order</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openSearch()}
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-brand-cream/50 rounded-xl border border-brand-orange/5 hover:border-brand-orange/20 transition-all text-brand-navy/40 group overflow-hidden relative"
            >
              <Search size={14} className="group-hover:text-brand-orange transition-colors relative z-10" />
              <span className="text-[10px] font-black uppercase tracking-wider relative z-10">Global Search</span>
              <kbd className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded border border-brand-navy/10 bg-white text-[8px] font-black relative z-10">
                <Command size={10} />K
              </kbd>
            </button>

            {/* Auth section */}
            <div className="relative">
              <button
                onClick={() => mounted && isAuthenticated ? setIsAccountOpen(!isAccountOpen) : router.push("/auth")}
                className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-colors px-4 py-2 bg-brand-cream/30 rounded-xl border border-brand-orange/5"
              >
                <UserIcon size={14} className={mounted && isAuthenticated ? "text-brand-orange" : ""} />
                {mounted && isAuthenticated ? user?.name.split(' ')[0] : ""}
                {mounted && isAuthenticated && (
                  <motion.div animate={{ rotate: isAccountOpen ? 180 : 0 }}>
                    <ChevronDown size={12} />
                  </motion.div>
                )}
              </button>

              <AnimatePresence>
                {mounted && isAuthenticated && isAccountOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsAccountOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-brand-navy rounded-3xl shadow-2xl p-3 border border-white/10 z-50 overflow-hidden"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsAccountOpen(false)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon size={16} className="text-brand-orange" />
                          The Vault
                        </div>
                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                      <div className="h-[1px] bg-white/5 my-2" />
                      <button
                        onClick={() => { logout(); setIsAccountOpen(false); }}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all text-left"
                      >
                        <LogOut size={16} />
                        Logout Identity
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleCart}
              className="relative bg-brand-navy text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange hover:shadow-xl hover:shadow-brand-orange/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <ShoppingBag size={14} />
              <span className="hidden xs:inline">Cart</span> ({mounted ? totalItems : 0})
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange border-2 border-white"></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay onClose={() => closeSearch()} />
        )}
      </AnimatePresence>
    </>
  );
}
