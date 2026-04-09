"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(10);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[120] lg:hidden">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl border-b border-brand-orange/5" />
      
      <div className="relative h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {!isHome ? (
              <motion.button
                key="back"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={() => {
                  triggerHaptic();
                  router.back();
                }}
                className="p-2 -ml-2 text-brand-navy hover:text-brand-orange transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.button>
            ) : null}
          </AnimatePresence>
          
          <Link 
            href="/" 
            className="text-lg font-serif font-black tracking-tighter text-brand-navy"
            onClick={triggerHaptic}
          >
            BAKSHO
          </Link>
        </div>

        {/* Right side is now empty to focus on branding and navigation */}
        <div className="w-10" /> 
      </div>
    </header>
  );
}
