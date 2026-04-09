"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";

export default function UnboxingTransition({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the animation has already played in this session
    const hasPlayed = sessionStorage.getItem("unboxing-played");
    
    if (!hasPlayed) {
      setShouldAnimate(true);
      sessionStorage.setItem("unboxing-played", "true");
    }
    
    setIsLoaded(true);
  }, []);

  // During hydration/initial load, we don't know yet if we should animate.
  // To avoid layout shift, we can render just the children if already played,
  // but we need to stay consistent with SSR.
  if (!isLoaded) return <div className="opacity-0">{children}</div>;

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
          className="fixed inset-0 z-[150] pointer-events-none"
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
