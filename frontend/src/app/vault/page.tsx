"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Package, Wallet, Clock } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function VaultOverview() {
  const { user } = useAuthStore();

  const stats = [
    { label: "Ritual Score", value: "2,840", icon: ShieldCheck, color: "text-brand-orange", desc: "Expert Curator" },
    { label: "The Collection", value: "08", icon: Package, color: "text-brand-navy", desc: "Unboxed Pieces" },
    { label: "Vault Credit", value: "৳০.০০", icon: Wallet, color: "text-brand-orange", desc: "Available Rituals" },
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold font-anek text-brand-navy leading-tight">
                স্বাগতম, <span className="text-brand-orange italic font-anek">{user?.name.split(' ')[0]}।</span>
            </h1>
            <p className="text-[11px] text-brand-navy/40 uppercase font-black tracking-[0.3em] flex items-center gap-2 font-noto">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> সুরক্ষিত সংযোগ স্থাপিত
            </p>
          </div>
          <div className="flex gap-2">
             <div className="px-5 py-3 bg-brand-navy text-white rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest font-noto">সদস্য স্তর: এলিট</span>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 font-noto">
         {stats.map((stat, i) => (
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             key={stat.label} 
             className="bg-white border border-brand-orange/5 p-8 md:p-10 rounded-[3rem] flex flex-col gap-6 group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-700 relative overflow-hidden"
           >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                  <stat.icon size={120} />
              </div>
              <div className={`w-14 h-14 bg-brand-cream/50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${stat.color}`}>
                 <stat.icon size={28} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 mb-2">{stat.label}</p>
                 <p className="text-4xl font-black text-brand-navy tracking-tighter mb-1 font-anek">{stat.value}</p>
                 <p className="text-[10px] font-bold text-brand-orange uppercase italic">{stat.desc}</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Featured Vault Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-noto">
          <div className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Package size={140} />
              </div>
              <div className="relative z-10 space-y-6">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/10 italic">পরবর্তী আনবক্সিং</span>
                <h3 className="text-4xl font-bold font-anek">আপনার জন্য কিউরেটেড।</h3>
                <p className="text-sm text-white/50 max-w-xs leading-relaxed font-medium">আপনার সাম্প্রতিক কেনাকাটার উপর ভিত্তি করে, আমরা আমাদের ওয়ার্কশপে একটি বিশেষ পণ্য আলাদা করে রেখেছি।</p>
                <button className="bg-brand-orange text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all active:scale-95">
                    অফারটি দেখুন
                </button>
              </div>
          </div>

          <div className="bg-brand-cream/30 rounded-[3rem] p-10 border border-brand-orange/5 flex flex-col justify-between items-start group">
             <div className="space-y-4 w-full">
                <div className="flex items-center gap-3">
                    <Clock className="text-brand-orange" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">সাম্প্রতিক ইতিহাস</span>
                </div>
                <h3 className="text-3xl font-bold font-anek text-brand-navy italic">রিচুয়াল লগ</h3>
                <div className="space-y-3 mt-6">
                   {[
                       { event: "প্যাকেজ ডেলিভারি হয়েছে", time: "২ ঘণ্টা আগে", icon: "✓" },
                       { event: "স্কোর আপডেট করা হয়েছে", time: "গতকাল", icon: "+" }
                   ].map((item) => (
                       <div key={item.event} className="flex items-center gap-4 text-xs font-bold text-brand-navy/60 group-hover:translate-x-1 transition-transform">
                           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] text-brand-orange shadow-sm font-black">{item.icon}</div>
                           <span className="font-medium">{item.event}</span>
                           <span className="text-[10px] text-brand-navy/20 uppercase font-black ml-auto">{item.time}</span>
                       </div>
                   ))}
                </div>
             </div>
             <Link href="/vault/orders" className="text-[10px] font-black uppercase tracking-widest text-brand-orange border-b-2 border-brand-orange pb-1 mt-8 hover:translate-x-2 transition-transform inline-block">
                সম্পূর্ণ তথ্য দেখুন
             </Link>
          </div>
      </div>
    </div>
  );
}
