"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Package, Truck, CheckCircle2, Search, ArrowLeft, Clock, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_STEPS = [
  { id: "ordered", label: "Ritual Initiated", icon: <Clock size={20} />, description: "Order has been received." },
  { id: "processing", label: "Curating Ritual", icon: <Package size={20} />, description: "We are hand-picking your items." },
  { id: "shipped", label: "Ritual Path", icon: <Truck size={20} />, description: "Your order is with our courier curator." },
  { id: "delivered", label: "Manifested", icon: <CheckCircle2 size={20} />, description: "Delivered to your sanctuary." }
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError("");
    setTrackingData(null);

    try {
      const data = await api.orders.track(orderId);
      setTrackingData(data);
    } catch (err) {
      setError("Unable to find that ritual order. Please check the ID.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = trackingData
    ? STATUS_STEPS.findIndex(s => s.id === trackingData.status)
    : -1;

  return (
    <div className="min-h-screen bg-brand-cream/5 pt-15 pb-10">
      <div className="container mx-auto px-6 max-w-2xl">

        <div className="space-y-4 mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-navy">Track Your Ritual</h1>
          <p className="text-brand-navy/60 font-medium italic">Enter your Order ID to see the manifestation of your Baksho journey.</p>
        </div>

        {/* Input Block */}
        <form onSubmit={handleTrack} className="bg-white p-8 rounded-[40px] shadow-2xl shadow-brand-navy/5 border border-brand-cream relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-navy">
            <Search size={120} />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <label htmlFor="orderId" className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 block ml-1">Order Manifest ID</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. BK-99210"
                  className="flex-1 bg-brand-cream/20 border-none rounded-2xl px-6 py-4 text-brand-navy font-bold placeholder:text-brand-navy/20 focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                />
                <button
                  disabled={loading}
                  className="bg-brand-orange text-white px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-navy transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Seek"}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}
          </div>
        </form>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {trackingData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 space-y-12"
            >
              {/* Order Info Summary */}
              <div className="flex items-center justify-between px-8 py-4 bg-brand-navy text-white rounded-2xl shadow-xl shadow-brand-navy/20">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Ritual Path For</p>
                  <p className="text-xs font-bold">{trackingData.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Estimated Sanctuary Arrival</p>
                  <p className="text-xs font-bold">{trackingData.estimatedArrival}</p>
                </div>
              </div>

              {/* Status Stepper - DARAZ inspired UI */}
              <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-cream">
                {STATUS_STEPS.map((step, i) => {
                  const isCompleted = i <= currentStatusIndex;
                  const isCurrent = i === currentStatusIndex;

                  return (
                    <div key={step.id} className="relative group">
                      {/* Dot */}
                      <div className={`absolute -left-8 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all z-10 ${isCompleted ? 'bg-brand-orange text-white' : 'bg-brand-cream text-brand-navy/10'}`}>
                        {isCompleted && <div className="w-2 h-2 rounded-full bg-white transition-all transform scale-100" />}
                      </div>

                      {/* Content */}
                      <div className={`transition-all ${isCompleted ? 'opacity-100' : 'opacity-30'}`}>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`transition-colors ${isCurrent ? 'text-brand-orange' : 'text-brand-navy'}`}>
                            {step.icon}
                          </span>
                          <h3 className={`font-black text-[10px] md:text-xs uppercase tracking-widest ${isCurrent ? 'text-brand-orange underline underline-offset-4 decoration-2' : 'text-brand-navy'}`}>
                            {step.label}
                            {isCurrent && <span className="ml-3 text-[8px] bg-brand-orange/10 px-2 py-0.5 rounded-full inline-block align-middle font-serif italic normal-case">Moving Now</span>}
                          </h3>
                        </div>
                        <p className="text-[10px] md:text-sm text-brand-navy/50 font-medium">{step.description}</p>
                        {isCurrent && (
                          <div className="mt-4 flex items-center gap-4 bg-white p-4 rounded-2xl border border-brand-orange/10 shadow-sm animate-pulse">
                            <MapPin size={14} className="text-brand-orange" />
                            <span className="text-[9px] font-bold text-brand-navy italic uppercase tracking-widest">Ritual currently crossing [Dhaka Hub] Manifesting Path</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-10 text-center">
                <p className="text-[10px] font-bold text-brand-navy/20 uppercase tracking-widest ornament-before ornament-after px-10">End of Manifestation Path</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
