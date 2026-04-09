"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && typeof window.navigator.vibrate === "function") {
      window.navigator.vibrate(10);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[140] bg-brand-navy/60 backdrop-blur-sm"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[150] bg-white rounded-t-[40px] shadow-2xl overflow-hidden pb-[env(safe-area-inset-bottom)]"
          >
            {/* Indicator / Drag Handle */}
            <div className="w-full flex justify-center py-3">
              <div className="w-12 h-1 bg-brand-navy/10 rounded-full" />
            </div>

            <div className="px-6 pb-6 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  {title && (
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-brand-navy/40">
                      {title}
                    </h3>
                  )}
                  <button 
                    onClick={() => {
                        triggerHaptic();
                        onClose();
                    }}
                    className="p-2 bg-brand-navy/5 rounded-full text-brand-navy/40"
                  >
                    <X size={18} />
                  </button>
                </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
