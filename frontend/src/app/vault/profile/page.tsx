"use client";

import { useState } from "react";
import { User, Mail, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { user, updateProfile, isLoading, error, clearError } = useAuthStore();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    current_password: "",
    password: "",
    password_confirmation: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setFormData(prev => ({ ...prev, current_password: "", password: "", password_confirmation: "" }));
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Identity update ritual failed:", err);
    }
  };

  return (
    <div className="space-y-10 font-noto">
      <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy">পরিচয় <span className="italic">ব্যবস্থাপনা।</span></h2>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/30">দ্যা ভল্ট আইডেন্টিটি প্রোটোকল</p>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-green-50 border border-green-100 p-6 rounded-[2rem] flex items-center gap-4 text-green-600 mb-6"
          >
            <CheckCircle2 size={24} />
            <div>
              <p className="font-bold text-sm">সফলভাবে আপডেট করা হয়েছে</p>
              <p className="text-[10px] font-medium opacity-70 italic">আপনার পরিচয় প্রোটোকল এখন লাইভ।</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-4 text-red-600 mb-6"
          >
            <AlertCircle size={24} />
            <div>
              <p className="font-bold text-sm">আপডেটে সমস্যা হয়েছে</p>
              <p className="text-[10px] font-medium opacity-70 italic">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
           <div className="bg-brand-cream/20 p-8 rounded-[2.5rem] border border-brand-orange/5 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
                 <User size={16} /> ব্যক্তিগত তথ্য
              </h3>
              
              <div className="space-y-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">পূর্ণ নাম</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="আপনার নাম লিখুন" 
                      className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">ইমেইল সংযোগ</label>
                    <div className="relative">
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ইমেইল এড্রেস" 
                        className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 pl-12 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                      />
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/20" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-brand-navy/5 p-8 rounded-[2.5rem] border border-brand-navy/10 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-navy/40 flex items-center gap-2">
                 <ShieldCheck size={16} /> নিরাপত্তা ও পাসওয়ার্ড
              </h3>
              
              <div className="space-y-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">বর্তমান পাসওয়ার্ড (পরিবর্তনের জন্য আবশ্যক)</label>
                    <input 
                      type="password"
                      value={formData.current_password}
                      onChange={(e) => setFormData({ ...formData, current_password: e.target.value })}
                      placeholder="••••••••" 
                      className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                    />
                 </div>
                 <div className="h-[1px] bg-brand-navy/5 my-2" />
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">নতুন পাসওয়ার্ড</label>
                    <input 
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••" 
                      className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input 
                      type="password"
                      value={formData.password_confirmation}
                      onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                      placeholder="••••••••" 
                      className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                    />
                 </div>
              </div>
           </div>

           <div className="flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => setFormData({ name: user?.name || "", email: user?.email || "", current_password: "", password: "", password_confirmation: "" })}
                className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-all"
              >
                বাতিল করুন
              </button>
              <button 
                disabled={isLoading}
                className="px-10 py-4 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange shadow-xl shadow-brand-navy/5 hover:shadow-brand-orange/20 transition-all flex items-center gap-3 disabled:opacity-50"
              >
                {isLoading && <Loader2 size={16} className="animate-spin" />}
                পরিচয় সংরক্ষণ করুন
              </button>
           </div>
        </div>
      </form>
    </div>
  );
}
