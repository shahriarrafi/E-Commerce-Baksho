"use client";

import { MapPin, Truck, ShieldCheck, RotateCcw, Info, Store, Search, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ProductDelivery() {
   return (
      <div className="flex flex-col gap-4">
         {/* Delivery Options */}
         <div className="bg-brand-cream/10 rounded-2xl border border-brand-cream/50 p-4 space-y-4 font-hind">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
               <MapPin size={12} className="text-brand-orange" /> ডেলিভারি অপশনসমূহ
            </h4>

            <div className="space-y-4">
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-brand-cream shadow-sm">
                     <Truck size={14} className="text-brand-navy" />
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold text-brand-navy leading-none">স্ট্যান্ডার্ড ডেলিভারি</p>
                        <span className="text-[10px] font-black italic">ফ্রি</span>
                     </div>
                     <p className="text-[9px] text-brand-navy/40 mt-1">২-৪ কার্যদিবস</p>
                  </div>
               </div>

               <div className="flex items-start gap-3 opacity-60">
                  <div className="p-2 bg-white rounded-lg border border-brand-cream">
                     <RotateCcw size={14} className="text-brand-navy" />
                  </div>
                  <div className="flex-1">
                     <p className="text-[10px] font-bold text-brand-navy leading-none">৭ দিন সহজ রিটার্ন</p>
                     <p className="text-[9px] text-brand-navy/40 mt-1">পণ্য ফেরতের সুবিধা রয়েছে</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Trust & Policy */}
         <div className="bg-brand-cream/10 rounded-2xl border border-brand-cream/50 p-4 space-y-3 font-hind">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
               <ShieldCheck size={12} className="text-brand-orange" /> সার্ভিস গ্যারান্টি
            </h4>
            <div className="space-y-2">
               <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-orange" />
                  <p className="text-[10px] font-bold text-brand-navy italic">১০০% অরিজিনাল পণ্য</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-brand-orange" />
                  <p className="text-[10px] font-bold text-brand-navy italic">পরিবেশবান্ধব প্যাকেজিং</p>
               </div>
            </div>
         </div>

         {/* Support & Tracking Actions */}
         <div className="pt-2 space-y-2 font-hind">
            <Link 
              href="/track-order"
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all active:scale-95 shadow-lg shadow-brand-navy/10"
            >
               <Search size={12} /> অর্ডার ট্র্যাক করুন
            </Link>
            <button className="w-full flex items-center justify-center gap-2 py-3 border border-brand-cream text-brand-navy/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-brand-navy hover:text-brand-navy transition-all">
               <MessageSquare size={12} /> কাস্টমার সাপোর্ট
            </button>
         </div>
      </div>
   );
}
