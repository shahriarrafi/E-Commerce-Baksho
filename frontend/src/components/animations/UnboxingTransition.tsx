"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

export default function UnboxingTransition({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("unboxing-played");
    if (!hasPlayed) {
      setShouldAnimate(true);
      sessionStorage.setItem("unboxing-played", "true");
    }
    setMounted(true);
  }, []);

  // During SSR and before Hydration, we show the static loader lids at y:0
  // to prevent any content from flashing.
  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-brand-navy z-[10000] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-orange rounded-3xl flex items-center justify-center shadow-2xl">
              <Package className="text-white" size={40} />
            </div>
         </div>
      </div>
    );
  }

  if (!shouldAnimate) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key="unboxing-overlay"
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[10000] pointer-events-none"
        >
          {/* Top Lid */}
          <motion.div
            variants={{
              initial: { y: 0 },
              animate: {
                y: "calc(-100% - 100px)",
                transition: {
                  duration: 1.2, // Slightly slower for the "first entry" feel
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5
                }
              }
            }}
            className="fixed inset-x-0 top-0 h-1/2 bg-brand-navy flex items-end justify-center pb-8 border-b border-brand-orange/20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 mb-[-60px] z-[110]"
            >
              <div className="w-24 h-24 bg-brand-orange rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-orange/40">
                <Package className="text-white" size={48} />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Lid */}
          <motion.div
            variants={{
              initial: { y: 0 },
              animate: {
                y: "100%",
                transition: {
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5
                }
              }
            }}
            className="fixed inset-x-0 bottom-0 h-1/2 bg-brand-navy flex items-start justify-center pt-8 border-t border-brand-orange/20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/10 font-serif text-[12vw] font-black uppercase tracking-tighter absolute bottom-10 select-none"
            >
              Baksho
            </motion.span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
}
