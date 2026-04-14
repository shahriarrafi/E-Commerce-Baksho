
"use client";

import { MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 lg:bottom-10 right-6 z-[150] hidden lg:flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="bg-white rounded-[2rem] p-6 shadow-2xl border border-brand-orange/10 mb-2 w-64"
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-orange font-hind">সহযোগিতা</h4>
                <p className="text-sm font-serif font-black text-brand-navy">আমাদের সাথে কথা বলুন</p>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/yournumber"
                  target="_blank"
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors group"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center text-white">
                    <Phone size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#075E54] font-hind">WhatsApp</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 p-3 bg-brand-navy/5 rounded-2xl hover:bg-brand-navy/10 transition-colors group"
                >
                  <div className="w-8 h-8 bg-brand-navy rounded-xl flex items-center justify-center text-white">
                    <MessageSquare size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy font-hind">Messenger</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-brand-navy text-white rotate-90' : 'bg-brand-orange text-white'}`}
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}
