"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { triggerHaptic } from "@/lib/utils";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled down 500px, or near the bottom
      const scrolled = window.scrollY;
      const threshold = 500;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrolled + windowHeight >= documentHeight - 100;

      // We show it if they scrolled significantly or reached the end
      if (scrolled > threshold || isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    triggerHaptic();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 lg:bottom-10 left-6 z-[160] w-12 h-12 md:w-14 md:h-14 bg-white border border-brand-orange/10 rounded-2xl shadow-2xl flex items-center justify-center text-brand-navy hover:text-brand-orange hover:border-brand-orange/40 transition-all group active:scale-90"
          aria-label="উপরে যান"
        >
          <div className="relative">
             <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
