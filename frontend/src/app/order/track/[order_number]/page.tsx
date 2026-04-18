"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Box,
  MapPin,
  AlertCircle,
  Loader2,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

interface TrackingStatus {
  status: string;
  label: string;
  time: string;
  is_completed: boolean;
  is_current: boolean;
}

interface OrderDetails {
  order_number: string;
  current_status: string;
  customer_name: string;
  created_at: string;
  items_count: number;
  tracking_history: TrackingStatus[];
}

export default function OrderTrackingPage() {
  const { order_number } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    async function fetchTracking() {
      try {
        const { data } = await apiFetch<{ data: OrderDetails }>(`/orders/track/${order_number}`);
        setOrder(data);
      } catch (err: any) {
        setError(err.message || "ট্র্যাকিং তথ্য পাওয়া যায়নি।");
      } finally {
        setLoading(false);
      }
    }

    if (order_number) {
      fetchTracking();
    }
  }, [order_number]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/10">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-brand-orange" size={48} />
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 font-noto">রিচুয়াল কন্টাক্ট করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/10 p-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-brand-navy/5 text-center space-y-6 max-w-md border border-brand-orange/10 font-noto">
          <AlertCircle className="mx-auto text-brand-orange" size={64} />
          <h2 className="text-2xl font-bold font-anek text-brand-navy italic">তথ্য খুঁজে পাওয়া যায়নি।</h2>
          <p className="text-sm text-brand-navy/60 leading-relaxed font-medium">ভুল অর্ডার নম্বর অথবা নেটওয়ার্ক সমস্যার কারণে আমরা ট্র্যাকিং তথ্য প্রদর্শন করতে পারছি না।</p>
          <button onClick={() => window.location.reload()} className="px-8 py-4 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all">
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ordered': return <Clock size={24} />;
      case 'processing': return <Box size={24} />;
      case 'shipped': return <Truck size={24} />;
      case 'delivered': return <CheckCircle2 size={24} />;
      default: return <Package size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-28 pb-20 md:pt-32 font-noto">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange bg-brand-orange/10 px-4 py-1.5 rounded-full border border-brand-orange/20 italic">অর্ডার ট্র্যাকিং</span>
            <h1 className="text-4xl md:text-6xl font-bold font-anek text-brand-navy lowercase">প্যাকেজ <span className="italic font-anek text-brand-orange">জার্নি।</span></h1>
          </div>
          <div className="bg-white px-6 py-4 rounded-3xl border border-brand-orange/10 shadow-lg shadow-brand-orange/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 mb-1">অর্ডার নম্বর</p>
            <h3 className="text-lg font-black text-brand-navy font-sans">#{order.order_number}</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Current High-Profile Status */}
          <div className="lg:col-span-12">
            <div className="bg-brand-navy rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden group border border-white/5 shadow-2xl shadow-brand-navy/20">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Truck size={180} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold font-anek">বর্তমান অবস্থা: <span className="text-brand-orange italic font-noto">{order.current_status}</span></h2>
                  <p className="text-sm text-white/50 max-w-sm leading-relaxed font-medium">আপনার প্রিমিয়াম সিলেকশনটি বর্তমানে আমাদের রিচুয়াল সেন্টারে প্রস্তুত হচ্ছে।</p>
                </div>
                <div className="flex flex-col gap-2 bg-white/10 p-6 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50">প্রত্যাশিত ডেলিভারি</span>
                  <span className="text-lg font-bold">২-৩ কর্মদিবস</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tracking Manifest */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-brand-navy/5 border border-brand-orange/5 space-y-10">
              <h3 className="text-xl font-bold font-anek text-brand-navy border-b border-brand-cream/50 pb-6 uppercase tracking-tight">ট্র্যাকিং ডিটেইলস</h3>

              <div className="relative space-y-12 pl-4">
                {/* Vertical Line Ritual */}
                <div className="absolute left-[34px] top-4 bottom-4 w-0.5 bg-brand-cream" />

                {order.tracking_history.map((step, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className={`relative flex items-center gap-8 ${step.is_current ? 'opacity-100' : step.is_completed ? 'opacity-60' : 'opacity-20'}`}
                  >
                    <div className={`relative z-10 w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center transition-all ${step.is_current ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : step.is_completed ? 'bg-brand-navy text-white' : 'bg-brand-cream text-brand-navy/20'}`}>
                      {getStatusIcon(step.status)}
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold font-anek leading-tight ${step.is_current ? 'text-brand-navy' : 'text-brand-navy/50'}`}>{step.label}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/20 mt-1">{step.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-brand-navy/5 border border-brand-orange/5">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-brand-navy/30 mb-6 font-noto">গ্রাহক তথ্য</h4>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-orange">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="font-bold text-lg text-brand-navy font-anek">{order.customer_name}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">প্রিমিয়াম কিউরেটর</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-cream">
                <div className="flex items-center gap-3">
                  <MapPin className="text-brand-orange" size={16} />
                  <span className="text-xs font-bold text-brand-navy/60 font-noto">সংরক্ষিত ডেলিভারি গন্তব্য</span>
                </div>
                <div className="flex items-center gap-3">
                  <Box className="text-brand-orange" size={16} />
                  <span className="text-xs font-bold text-brand-navy/60 font-noto">{order.items_count}টি মানিফেস্টেশন পণ্য</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-orange/5 p-8 rounded-[2.5rem] border border-brand-orange/10 flex items-center gap-4">
              <Package className="text-brand-orange shrink-0" size={24} />
              <p className="text-[10px] text-brand-navy/60 leading-relaxed font-bold italic">
                বাকশো প্রতিটি রিচুয়াল পরম যত্নে প্রস্তুত করে। আপনার প্যাকেজটি সর্বোচ্চ সুরক্ষায় পৌঁছে দেওয়া আমাদের অঙ্গীকার।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
