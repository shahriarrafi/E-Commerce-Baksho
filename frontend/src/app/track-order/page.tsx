"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    router.push(`/order/track/${orderId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-32 pb-20 font-noto">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="space-y-4 mb-16 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange bg-brand-orange/10 px-6 py-2 rounded-full border border-brand-orange/20 italic">মেনিফেস্টেশন ট্র্যাকিং</span>
            <h1 className="text-4xl md:text-6xl font-bold font-anek text-brand-navy lowercase">আপনার <span className="text-brand-orange italic font-anek">প্যাকেজ খুঁজুন।</span></h1>
            <p className="text-sm text-brand-navy/50 max-w-sm mx-auto leading-relaxed font-medium">আপনার কিউরেটেড পার্সেলের বর্তমান অবস্থান জানতে অর্ডার নম্বরটি প্রদান করুন।</p>
        </div>

        <form onSubmit={handleTrack} className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-brand-navy/5 border border-brand-orange/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-brand-navy group-hover:rotate-12 transition-transform duration-1000">
            <Search size={140} />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-3">
              <label htmlFor="orderId" className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 block ml-2">অর্ডার আইডি (BK-XXXXXX)</label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="যেমন: BK-ABC123"
                  className="flex-1 bg-brand-cream/30 border-none rounded-2xl px-8 py-5 text-brand-navy font-bold placeholder:text-brand-navy/20 focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                />
                <button
                  disabled={loading}
                  className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-orange transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[140px] shadow-xl shadow-brand-navy/10"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "অনুসন্ধান করুন"}
                </button>
              </div>
            </div>
            <p className="text-[9px] text-brand-navy/30 text-center font-bold uppercase tracking-widest">সুরক্ষিত এনক্রিপ্টেড সংযোগ সক্রিয়</p>
          </div>
        </form>
      </div>
    </div>
  );
}
