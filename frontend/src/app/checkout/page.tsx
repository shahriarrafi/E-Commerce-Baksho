"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck,
  Package,
  MapPin,
  Smartphone,
  User,
  Mail,
  Loader2,
  AlertCircle,
  Plus,
  Home,
  Building2
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useAddressStore, Address } from "@/store/useAddressStore";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { getStorageUrl } from "@/lib/api";

export default function CheckoutPage() {
  const { items, getTotals, submitOrder, isLoading: isSubmitting, error: orderError, clearError } = useCartStore();
  const { subtotal } = getTotals();
  const { isAuthenticated, user } = useAuthStore();
  const { addresses, fetchAddresses, isLoading: isAddressesLoading } = useAddressStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Guest form state
  const [guestData, setGuestData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && mounted) {
      router.push("/");
    }
  }, [items, router, mounted]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchAddresses();
      // Pre-populate guest data for "add new" convenience or fallback
      setGuestData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [isAuthenticated, user, fetchAddresses]);

  // Set default address if available
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId && !isAddingNew) {
      const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId, isAddingNew]);

  if (!mounted || items.length === 0) return null;

  const handleCompletePurchase = async () => {
    if (isAuthenticated && !selectedAddressId && !isAddingNew) {
      alert("অনুগ্রহ করে একটি ডেলিভারি ঠিকানা নির্বাচন করুন।");
      return;
    }

    if (!isAuthenticated || isAddingNew) {
      if (!guestData.name || !guestData.phone || !guestData.address || (!isAuthenticated && !guestData.email)) {
        alert("অনুগ্রহ করে আপনার সমস্ত শিপিং তথ্য প্রদান করুন।");
        return;
      }
    }

    clearError();
    
    try {
      const result = await submitOrder(
        (isAuthenticated && !isAddingNew) ? (selectedAddressId || undefined) : undefined,
        (!isAuthenticated || isAddingNew) ? guestData : undefined
      );
      router.push(`/checkout/success?order=${result.order_number}`);
    } catch (err) {
      console.error("Order ritual failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-24 md:pt-32 pb-20 font-noto">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <div className="flex flex-col gap-3">
             <Link href="/" className="flex items-center gap-2 text-brand-navy/40 hover:text-brand-orange transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">সংগ্রহে ফিরে যান</span>
             </Link>
             <h1 className="text-4xl md:text-6xl font-bold font-anek text-brand-navy lowercase">চূড়ান্ত <span className="italic font-anek text-brand-orange">সিদ্ধান্ত।</span></h1>
          </div>
          
          {!isAuthenticated && (
            <div className="flex items-center gap-4 p-4 md:p-6 bg-white rounded-3xl border border-brand-orange/10 shadow-lg shadow-brand-orange/5">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                    <User size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">ইতিমধ্যেই সদস্য?</p>
                    <Link href="/auth" className="text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors">
                        লগইন করুন →
                    </Link>
                </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. Cash On Delivery Banner */}
            <div className="bg-brand-navy rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden group border border-white/5">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                    <Truck size={160} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-brand-orange" size={24} />
                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/10 italic">সিঙ্গেল পেমেন্ট রিচুয়াল</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-bold font-anek">শুধুমাত্র ক্যাশ অন ডেলিভারি।</h2>
                        <p className="text-sm text-white/50 max-w-sm leading-relaxed font-medium">
                            আপনাদের বিশ্বস্ততার জন্য আমরা বর্তমানে শুধুমাত্র **ক্যাশ অন ডেলিভারি** প্রটোকল ব্যবহার করছি। পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করুন।
                        </p>
                    </div>
                </div>
            </div>

            {orderError && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 p-6 rounded-[2rem] flex items-center gap-4 text-red-600 mb-2"
              >
                <AlertCircle className="shrink-0" size={24} />
                <div className="flex-1">
                  <h4 className="text-sm font-bold font-anek">অর্ডার সম্পন্ন করা যায়নি</h4>
                  <p className="text-xs font-medium">{orderError}</p>
                </div>
                <button onClick={clearError} className="text-xs font-black uppercase tracking-widest opacity-50 hover:opacity-100">X</button>
              </motion.div>
            )}

            {/* 2. Identity & Sanctuary Manifestation */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-brand-navy/5 border border-brand-orange/5 space-y-10">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold font-anek text-brand-navy">ডেলিভারি গন্তব্য</h3>
                    {isAuthenticated && !isAddingNew && (
                        <button 
                          onClick={() => setIsAddingNew(true)}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-orange hover:translate-x-1 transition-transform"
                        >
                            <Plus size={14} /> নতুন ঠিকানা যোগ করুন
                        </button>
                    )}
                </div>

                {isAuthenticated ? (
                  <div className="space-y-4">
                    {/* Authenticated Address Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(Array.isArray(addresses) ? addresses : []).map((addr) => (
                        <button
                          key={addr.id}
                          onClick={() => { setSelectedAddressId(addr.id); setIsAddingNew(false); }}
                          className={`relative p-6 rounded-[2rem] border transition-all text-left group ${selectedAddressId === addr.id && !isAddingNew ? 'border-brand-orange bg-brand-orange/5 shadow-lg shadow-brand-orange/5' : 'border-brand-cream hover:border-brand-orange/30'}`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${selectedAddressId === addr.id && !isAddingNew ? 'bg-brand-orange text-white' : 'bg-brand-cream text-brand-navy/30'}`}>
                               {addr.label.toLowerCase().includes('হোম') ? <Home size={16} /> : <MapPin size={16} />}
                            </div>
                            <span className="font-bold text-sm text-brand-navy font-anek lowercase">{addr.label}</span>
                          </div>
                          <p className="text-xs text-brand-navy/50 leading-relaxed font-medium mb-1">{addr.address}</p>
                          <p className="text-[10px] font-black text-brand-navy/30">{addr.phone}</p>
                        </button>
                      ))}
                    </div>

                    {isAddingNew && (
                        <div className="p-8 bg-brand-cream/20 rounded-[2.5rem] border border-brand-orange/10 space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 italic">নতুন একটি ঠিকানা যোগ করুন (অথবা ভল্ট থেকে নির্বাচন করুন)</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input 
                                  label="ঠিকানার নাম" 
                                  placeholder="যেমন: আমার বাড়ি" 
                                  value={guestData.name} 
                                  onChange={(val) => setGuestData({ ...guestData, name: val })} 
                                />
                                <Input 
                                  label="ফোন নম্বর" 
                                  placeholder="017XXXXXXXX" 
                                  value={guestData.phone} 
                                  onChange={(val) => setGuestData({ ...guestData, phone: val })} 
                                />
                                <div className="md:col-span-2">
                                    <Input 
                                      label="বিস্তারিত ঠিকানা" 
                                      placeholder="সম্পূর্ণ ডেলিভারি ঠিকানা..." 
                                      value={guestData.address} 
                                      onChange={(val) => setGuestData({ ...guestData, address: val })} 
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsAddingNew(false)}
                                className="text-xs font-bold text-brand-navy/40 hover:text-brand-navy transition-all"
                            >
                                ← আগের তালিকায় ফিরে যান
                            </button>
                        </div>
                    )}
                  </div>
                ) : (
                   /* Guest Form Ritual */
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input 
                        label="পুরো নাম" 
                        placeholder="আপনার নাম লিখুন" 
                        icon={<User size={16} />} 
                        value={guestData.name}
                        onChange={(val) => setGuestData({ ...guestData, name: val })}
                      />
                      <Input 
                        label="ফোন নম্বর" 
                        placeholder="017XXXXXXXX" 
                        icon={<Smartphone size={16} />} 
                        value={guestData.phone}
                        onChange={(val) => setGuestData({ ...guestData, phone: val })}
                      />
                      <div className="md:col-span-2">
                        <Input 
                          label="ইমেইল অ্যাড্রেস" 
                          placeholder="ritual@baksho.com" 
                          icon={<Mail size={16} />} 
                          value={guestData.email}
                          onChange={(val) => setGuestData({ ...guestData, email: val })}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Input 
                          label="বিস্তারিত ডেলিভারি ঠিকানা" 
                          placeholder="রাস্তা, এলাকা, বাড়ি নম্বর ইত্যাদি" 
                          icon={<MapPin size={16} />} 
                          value={guestData.address}
                          onChange={(val) => setGuestData({ ...guestData, address: val })}
                        />
                      </div>
                   </div>
                )}
            </div>

            {/* 3. Final Affirmation */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-brand-navy/5 border border-brand-orange/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-brand-cream/50 pb-6">
                    <ShieldCheck className="text-brand-orange" size={24} />
                    <h3 className="text-2xl font-bold font-anek text-brand-navy uppercase tracking-tight">অর্ডার রিভিও</h3>
                </div>
                
                <div className="divide-y divide-brand-cream/50">
                    {items.map((item) => (
                      <div key={item.id} className="py-6 flex items-center justify-between group">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-brand-cream rounded-2xl overflow-hidden relative border border-brand-orange/5 shadow-sm">
                            <Image src={getStorageUrl(item.image)} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                             <h4 className="font-bold text-brand-navy text-lg font-anek lowercase">{item.name}</h4>
                             <p className="text-[10px] text-brand-orange font-black uppercase tracking-[0.2em] mt-1">পরিমাণ: {item.quantity}</p>
                          </div>
                        </div>
                         <p className="font-bold text-brand-navy text-xl font-anek">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                </div>

                <div className="bg-brand-orange/5 p-6 md:p-8 rounded-[2rem] border border-brand-orange/10 flex flex-col md:flex-row items-center gap-6">
                   <div className="p-4 bg-white rounded-2xl text-brand-orange shadow-sm">
                      <ShieldCheck size={32} />
                   </div>
                   <p className="text-xs text-brand-navy/60 leading-relaxed font-bold italic text-center md:text-left">
                      "অর্ডার সম্পন্ন করুন" বাটনে ক্লিক করার মাধ্যমে বাকশো আপনার প্রিমিয়ম রিচুয়ালটি প্রস্তুত করতে শুরু করবে। ডেলিভারির সময় আপনাকে মূল্য পরিশোধ করতে হবে।
                   </p>
                </div>

                <button 
                  onClick={handleCompletePurchase}
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange text-white py-6 md:py-8 rounded-[3rem] font-black text-sm md:text-base uppercase tracking-[0.3em] hover:bg-brand-navy transition-all shadow-2xl shadow-brand-orange/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>প্রসেস হচ্ছে... <Loader2 size={24} className="animate-spin" /></>
                  ) : (
                    <>অর্ডার নিশ্চিত করুন <CheckCircle2 size={24} /></>
                  )}
                </button>
            </div>
          </div>

          {/* Sticky Ritual Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
             <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-brand-navy/5 border border-brand-orange/5 group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                    <Package size={140} />
                </div>
                <h3 className="text-xl font-bold font-anek text-brand-navy mb-8 border-b border-brand-cream/50 pb-4">রিচুয়াল সামারি</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-navy/30 font-bold uppercase tracking-widest text-[10px]">পণ্যের মূল্য</span>
                    <span className="font-bold text-brand-navy font-anek">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-navy/30 font-bold uppercase tracking-widest text-[10px]">ডেলিভারি চার্জ</span>
                    <span className="text-brand-orange font-black uppercase text-[10px] tracking-widest italic">ফ্রি (কমপ্লিমেন্টারি)</span>
                  </div>
                  <div className="h-[1px] bg-brand-cream/50 my-6" />
                  <div className="flex flex-col gap-1">
                    <span className="text-brand-navy/30 font-black uppercase text-[10px] tracking-[0.3em]">সর্বমোট প্রদেয়</span>
                    <span className="text-5xl font-black tracking-tighter text-brand-navy font-anek">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-brand-cream/30 space-y-4 border border-brand-orange/5">
                   <div className="flex items-center gap-2">
                     <Package className="text-brand-orange" size={16} />
                     <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/60">প্রত্যাশিত ডেলিভারি</span>
                   </div>
                   <p className="text-sm font-bold text-brand-navy leading-relaxed">আপনার ঠিকানায় ২-৩ কর্মদিবসের মধ্যে পৌঁছে যাবে ইনশাআল্লাহ।</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder, icon, value, onChange }: { label: string; placeholder: string; icon?: any; value?: string; onChange?: (val: string) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-2">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-brand-navy/20">{icon}</div>}
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-brand-cream/10 border border-brand-orange/5 rounded-2xl p-4 text-brand-navy font-bold focus:outline-none focus:border-brand-orange transition-all placeholder:text-brand-navy/10 text-sm ${icon ? "pl-12" : ""}`}
        />
      </div>
    </div>
  );
}
