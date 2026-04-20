"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNotificationStore, NotificationType } from "@/store/useNotificationStore";
import { AlertCircle, CheckCircle2, Info, Sparkles, X } from "lucide-react";

const icons: Record<NotificationType, any> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  ritual: Sparkles,
};

const colors: Record<NotificationType, string> = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-brand-navy",
  ritual: "bg-brand-orange",
};

export default function Toaster() {
  const { notifications, dismiss } = useNotificationStore();

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = icons[notification.type];
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto relative group"
            >
              <div className="bg-white/90 backdrop-blur-2xl border border-brand-navy/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 rounded-[2rem] flex items-center gap-4 overflow-hidden">
                {/* Accent Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors[notification.type]}`} />
                
                <div className={`p-3 rounded-2xl ${colors[notification.type]} text-white shadow-lg`}>
                   <Icon size={20} />
                </div>
                
                <div className="flex-1 pr-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 mb-1 font-noto">
                    {notification.type === 'ritual' ? 'রিচুয়াল আপডেট' : 'সিস্টেম মেসেজ'}
                  </h4>
                  <p className="text-sm font-bold text-brand-navy font-noto leading-tight">
                    {notification.message}
                  </p>
                </div>

                <button 
                  onClick={() => dismiss(notification.id)}
                  className="p-1.5 hover:bg-brand-navy/5 rounded-lg text-brand-navy/20 hover:text-brand-navy transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
