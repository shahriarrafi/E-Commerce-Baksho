"use client";

import { useEffect, useState } from "react";
import { Plus, MapPin, Edit2, Trash2, Loader2, CheckCircle2, AlertCircle, Home, Building2, Landmark, Phone } from "lucide-react";
import { useAddressStore, Address } from "@/store/useAddressStore";
import { motion, AnimatePresence } from "framer-motion";

export default function AddressesPage() {
  const { addresses, fetchAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, isLoading, error } = useAddressStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    label: "",
    address: "",
    phone: "",
    is_default: false
  });

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAddress(editingId, formData);
      } else {
        await addAddress(formData);
      }
      resetForm();
    } catch (err) {
      console.error("Address ritual failed:", err);
    }
  };

  const resetForm = () => {
    setFormData({ label: "", address: "", phone: "", is_default: false });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (addr: Address) => {
      setFormData({
          label: addr.label,
          address: addr.address,
          phone: addr.phone,
          is_default: addr.is_default
      });
      setEditingId(addr.id);
      setIsAdding(true);
  };

  return (
    <div className="space-y-10 font-noto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy lowercase">আপনার <span className="italic">নিজস্ব ডায়েরি।</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/30">সংরক্ষিত শিপিং ঠিকানা এবং কন্টাক্ট</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-3 px-8 py-4 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange shadow-xl shadow-brand-navy/10 hover:shadow-brand-orange/20 transition-all active:scale-95"
          >
            <Plus size={16} /> নতুন ঠিকানা যোগ করুন
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-brand-cream/10 border border-brand-orange/10 p-8 rounded-[3rem] shadow-2xl shadow-brand-orange/5"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">ঠিকানার নাম (যেমন: বাড়ি, অফিস)</label>
                    <input 
                      required
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      placeholder="যেমন: আমার বাড়ি" 
                      className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                    />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">ফোন নম্বর</label>
                    <div className="relative">
                       <input 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX" 
                        className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 pl-12 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all" 
                      />
                      <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-navy/20" />
                    </div>
                 </div>
                 <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-1">সম্পূর্ণ ঠিকানা</label>
                    <textarea 
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="আপনার পূর্ণ ঠিকানাটি এখানে লিখুন..." 
                      className="w-full bg-white border border-brand-orange/10 rounded-2xl p-4 text-brand-navy text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all h-32 resize-none" 
                    />
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <input 
                   type="checkbox" 
                   id="is_default"
                   checked={formData.is_default}
                   onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                   className="w-4 h-4 accent-brand-orange" 
                 />
                 <label htmlFor="is_default" className="text-[10px] font-black uppercase tracking-widest text-brand-navy/50">ডিফল্ট ঠিকানা হিসেবে সেট করুন</label>
              </div>

              <div className="flex justify-end gap-4 p-2">
                 <button 
                   type="button"
                   onClick={resetForm}
                   className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-all"
                 >
                   বাতিল করুন
                 </button>
                 <button 
                   disabled={isLoading}
                   className="px-12 py-4 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange shadow-xl transition-all flex items-center gap-3 disabled:opacity-50"
                 >
                   {isLoading && <Loader2 size={16} className="animate-spin" />}
                   {editingId ? "তথ্য আপডেট করুন" : "ঠিকানা যোগ করুন"}
                 </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(addresses) && addresses.length > 0 ? (
          addresses.map((addr) => (
            <motion.div 
              layout
              key={addr.id} 
              className={`bg-brand-cream/10 border ${addr.is_default ? 'border-brand-orange' : 'border-brand-orange/10'} p-8 rounded-[3rem] relative group hover:bg-white hover:shadow-2xl hover:shadow-brand-navy/5 transition-all duration-700`}
            >
               {addr.is_default && (
                  <div className="absolute top-6 right-8 bg-brand-orange text-white text-[7px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                     ডিফল্ট ঠিকানা
                  </div>
               )}
               
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-2xl text-brand-orange">
                     {addr.label.toLowerCase().includes('হোম') || addr.label.toLowerCase().includes('বাড়ি') ? <Home size={20} /> : 
                      addr.label.toLowerCase().includes('অফিস') ? <Building2 size={20} /> : <MapPin size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-xl font-anek lowercase">{addr.label}</h4>
                    <p className="text-[11px] font-bold text-brand-navy/40 flex items-center gap-1">
                      <Phone size={10} /> {addr.phone}
                    </p>
                  </div>
               </div>
               
               <p className="text-sm text-brand-navy/60 leading-relaxed font-medium mb-8 min-h-[60px]">
                  {addr.address}
               </p>

               <div className="flex items-center gap-3 border-t border-brand-navy/5 pt-6">
                  <button 
                    onClick={() => handleEdit(addr)}
                    className="flex-1 py-3 bg-brand-navy/5 rounded-xl text-brand-navy/40 hover:bg-brand-navy hover:text-white transition-all text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                     <Edit2 size={14} /> এডিট
                  </button>
                  <button 
                    onClick={() => deleteAddress(addr.id)}
                    className="p-3 bg-red-50 text-red-300 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                     <Trash2 size={14} />
                  </button>
                  {!addr.is_default && (
                    <button 
                      onClick={() => setDefaultAddress(addr.id)}
                      className="px-4 py-3 bg-brand-cream text-brand-navy/40 rounded-xl hover:bg-brand-orange hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                    >
                      ডিফল্ট করুন
                    </button>
                  )}
               </div>
            </motion.div>
          ))
        ) : !isAdding && (
          <div className="col-span-1 md:col-span-2 py-24 text-center space-y-6 bg-brand-cream/5 rounded-[4rem] border-2 border-dashed border-brand-cream">
             <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto text-brand-cream">
                <Landmark size={40} />
             </div>
             <div className="space-y-2">
                <p className="text-sm font-bold text-brand-navy/40 uppercase tracking-widest">এখনও কোনো ঠিকানা যোগ করা হয়নি</p>
                <p className="text-xs text-brand-navy/20 italic">আপনার প্রথম 'স্যাঙ্কচুয়ারি' সিগনেচার করুন।</p>
             </div>
             <button 
               onClick={() => setIsAdding(true)}
               className="px-8 py-4 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all"
             >
               নতুন ঠিকানা যোগ করুন
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
