"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, Search, Menu, X, Command, ShoppingBag, User as UserIcon, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/constants";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";

export default function Header() {
  const router = useRouter();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { isSearchOpen, openSearch, closeSearch } = useUIStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  const { toggleCart, getTotals } = useCartStore();
  const { totalItems } = getTotals();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isSearchOpen]);

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
        className={`sticky top-0 z-[60] w-full transition-all duration-300 ${
          isScrolled 
            ? "h-16 bg-white/90 backdrop-blur-xl border-b border-brand-cream shadow-sm" 
            : "h-20 bg-white/0 border-b border-transparent"
        }`}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-6">
          {/* Menu Toggle (Mobile) */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-xl bg-brand-cream/50 text-brand-navy hover:text-brand-orange transition-all"
          >
             <Menu size={20} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-brand-orange/20">
              <Package className="text-white transform group-hover:-rotate-12 transition-all duration-500" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-brand-navy font-serif">Baksho</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <div 
              className="relative h-full flex items-center group cursor-pointer"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="text-[11px] font-black text-brand-navy/60 hover:text-brand-orange transition-colors flex items-center gap-1.5 uppercase tracking-widest py-8">
                Categories
                <motion.div
                  animate={{ rotate: isMegaMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={12} strokeWidth={3} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isMegaMenuOpen && (
                  <MegaMenu categories={CATEGORIES} onClose={() => setIsMegaMenuOpen(false)} />
                )}
              </AnimatePresence>
            </div>
            
            <Link href="#" className="text-[11px] font-black text-brand-navy/60 hover:text-brand-orange transition-colors uppercase tracking-widest">Stories</Link>
            <Link href="#" className="text-[11px] font-black text-brand-navy/60 hover:text-brand-orange transition-colors uppercase tracking-widest">Unboxing</Link>
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
                {mounted && isAuthenticated ? user?.name.split(' ')[0] : "Portal"}
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[300px] bg-white z-[101] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                    <Package className="text-white" size={18} />
                  </div>
                  <span className="text-xl font-bold font-serif">Baksho</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-navy/40 hover:text-brand-orange transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/30 mb-2">Navigation</p>
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <Link 
                    key={cat.id} 
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-serif text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between group"
                  >
                    {cat.name}
                    <ChevronRight size={18} className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
                
                <div className="h-[1px] bg-brand-navy/5 my-4" />
                
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/30 mb-2">Exclusive</p>
                <Link href="#" className="text-lg font-serif text-brand-navy hover:text-brand-orange transition-colors">Stories</Link>
                <Link href="#" className="text-lg font-serif text-brand-navy hover:text-brand-orange transition-colors">Unboxing Ritual</Link>
                
                <div className="mt-auto space-y-4">
                  {!isAuthenticated ? (
                    <button 
                      onClick={() => { router.push("/auth"); setIsMobileMenuOpen(false); }}
                      className="w-full bg-brand-navy text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <UserIcon size={14} /> Identity Portal
                    </button>
                  ) : (
                    <Link 
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full bg-brand-orange text-white p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
                    >
                       <UserIcon size={14} /> The Vault
                    </Link>
                  )}
                  <button 
                    onClick={() => { openSearch(); setIsMobileMenuOpen(false); }}
                    className="w-full bg-brand-cream border border-brand-navy/5 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-brand-navy flex items-center justify-center gap-2"
                  >
                    <Search size={14} /> Secure Search
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay onClose={() => closeSearch()} />
        )}
      </AnimatePresence>
    </>
  );
}
