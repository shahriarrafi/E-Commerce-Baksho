"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck,
  Package,
  MapPin,
  Smartphone,
  Wallet,
  User,
  Mail
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatPrice } from "@/lib/format";
import Image from "next/image";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const { items, getTotals, clearCart } = useCartStore();
  const { subtotal } = getTotals();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("shipping");

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && mounted) {
      router.push("/");
    }
  }, [items, router, mounted]);

  if (!mounted || items.length === 0) return null;

  const handleCompletePurchase = () => {
    // Simulate order processing
    router.push("/checkout/success");
    setTimeout(() => clearCart(), 500);
  };

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <div className="flex flex-col gap-3">
             <Link href="/" className="flex items-center gap-2 text-brand-navy/40 hover:text-brand-orange transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Ritual</span>
             </Link>
             <h1 className="text-4xl md:text-6xl font-serif text-brand-navy">Final Ritual</h1>
          </div>
          
          {/* Guest Checkout Experience: Show Login Option */}
          {!isAuthenticated && (
            <div className="flex items-center gap-4 p-4 md:p-6 bg-white rounded-3xl border border-brand-orange/10 shadow-lg shadow-brand-orange/5">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                    <User size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">Already a Member?</p>
                    <Link href="/auth" className="text-sm font-bold text-brand-navy hover:text-brand-orange transition-colors">
                        Login for a Faster Ritual →
                    </Link>
                </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* 1. Shipping Section */}
            <CheckoutSection 
              id="shipping" 
              number="01" 
              title="Identity & Delivery" 
              isActive={activeAccordion === "shipping"}
              onToggle={() => setActiveAccordion("shipping")}
              isCompleted={activeAccordion !== "shipping"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!isAuthenticated && (
                  <div className="md:col-span-2">
                    <Input label="Email Address" placeholder="ritual@baksho.com" icon={<Mail size={16} />} />
                    <p className="text-[9px] text-brand-navy/30 mt-2 ml-2 uppercase font-bold">For order tracking and unboxing guides</p>
                  </div>
                )}
                <Input label="First Name" placeholder="e.g. Shahriar" />
                <Input label="Last Name" placeholder="e.g. Rafi" />
                <div className="md:col-span-2">
                   <Input label="Full Address" placeholder="Street name, Apartment, etc." />
                </div>
                <Input label="City" placeholder="e.g. Dhaka" />
                <Input label="Phone Number" placeholder="+8801XXXXXXXXX" icon={<Smartphone size={16} />} />
                <div className="md:col-span-2 pt-4">
                  <button 
                    onClick={() => setActiveAccordion("payment")}
                    className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10"
                  >
                    Confirm & Proceed to Payment
                  </button>
                </div>
              </div>
            </CheckoutSection>

            {/* 2. Payment Section */}
            <CheckoutSection 
              id="payment" 
              number="02" 
              title="Secure Ritual" 
              isActive={activeAccordion === "payment"}
              onToggle={() => setActiveAccordion("payment")}
              isCompleted={activeAccordion === "review"}
            >
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <PaymentOptionSleek active label="Credit Card" icon={<CreditCard size={20} />} />
                   <PaymentOptionSleek label="bKash / Nagad" icon={<Wallet size={20} />} />
                   <PaymentOptionSleek label="Cash On Delivery" icon={<Package size={20} />} />
                </div>
                
                <div className="space-y-6 bg-brand-cream/30 p-6 md:p-8 rounded-3xl border border-brand-orange/5">
                   <div className="grid grid-cols-2 gap-6">
                     <div className="col-span-2">
                       <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                     </div>
                     <Input label="Expiry Date" placeholder="MM/YY" />
                     <Input label="CVV" placeholder="***" />
                   </div>
                </div>

                <button 
                  onClick={() => setActiveAccordion("review")}
                  className="w-full bg-brand-navy text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10"
                >
                  Save & Final Review
                </button>
              </div>
            </CheckoutSection>

            {/* 3. Review Section */}
            <CheckoutSection 
              id="review" 
              number="03" 
              title="Final Affirmation" 
              isActive={activeAccordion === "review"}
              onToggle={() => setActiveAccordion("review")}
              isCompleted={false}
            >
               <div className="flex flex-col gap-8">
                  <div className="divide-y divide-brand-cream/50">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-cream rounded-xl overflow-hidden relative">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                             <h4 className="font-bold text-brand-navy text-sm">{item.name}</h4>
                             <p className="text-[10px] text-brand-orange font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                        </div>
                         <p className="font-black text-brand-navy text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-brand-orange/5 p-6 rounded-3xl border border-brand-orange/10 flex items-center gap-4">
                     <ShieldCheck className="text-brand-orange shrink-0" size={32} />
                     <p className="text-[11px] text-brand-navy/60 leading-relaxed font-medium">
                        By clicking "Complete Ritual", you authorize Baksho to process your premium order and prepare your unboxing experience.
                     </p>
                  </div>

                  <button 
                    onClick={handleCompletePurchase}
                    className="w-full bg-brand-orange text-white py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-brand-navy transition-all shadow-2xl shadow-brand-orange/20 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Complete Ritual <CheckCircle2 size={20} />
                  </button>
               </div>
            </CheckoutSection>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
             <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-brand-navy/5 border border-brand-orange/5">
                <h3 className="text-xl font-serif text-brand-navy mb-8 border-b border-brand-cream pb-4">Manifest</h3>
                                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-navy/40">Creation Cost</span>
                    <span className="font-bold text-brand-navy">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-navy/40">Secure Shipping</span>
                    <span className="text-brand-orange font-black uppercase text-[10px] tracking-widest">Complimentary</span>
                  </div>
                  <div className="h-[1px] bg-brand-cream/50 my-6" />
                  <div className="flex justify-between items-end">
                    <span className="text-brand-navy font-black uppercase text-[10px] tracking-widest">Investment</span>
                    <span className="text-4xl font-black tracking-tighter text-brand-navy">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-brand-cream/50 space-y-3">
                   <div className="flex items-center gap-2">
                     <Package className="text-brand-orange" size={16} />
                     <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/60">Estimated Delivery</span>
                   </div>
                   <p className="text-sm font-bold text-brand-navy">2-3 Deciding Days</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutSection({ id, number, title, children, isActive, onToggle, isCompleted }: any) {
  return (
    <div className={`overflow-hidden transition-all duration-500 rounded-[2.5rem] border ${isActive ? "bg-white border-brand-orange/20 shadow-2xl shadow-brand-orange/5" : "bg-white/50 border-brand-cream/50"}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center font-black text-xs md:text-sm transition-all ${isActive ? "bg-brand-orange text-white" : isCompleted ? "bg-green-500 text-white" : "bg-brand-cream text-brand-navy/20"}`}>
            {isCompleted ? <CheckCircle2 size={18} /> : number}
          </div>
          <div>
            <h3 className={`text-lg md:text-xl font-serif ${isActive ? "text-brand-navy" : "text-brand-navy/40"}`}>{title}</h3>
            {isCompleted && !isActive && <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1">Confirmed</p>}
          </div>
        </div>
        {!isActive && (
           <div className="w-10 h-10 rounded-full border border-brand-cream flex items-center justify-center text-brand-navy/20 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all">
              <ChevronRight size={18} />
           </div>
        )}
      </button>

      <motion.div
        initial={false}
        animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-12 pb-8 md:pb-12 border-t border-brand-cream/50 pt-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function Input({ label, placeholder, icon }: { label: string; placeholder: string; icon?: any }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30 ml-2">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-brand-navy/30">{icon}</div>}
        <input 
          type="text" 
          placeholder={placeholder}
          className={`w-full bg-brand-cream/10 border border-brand-orange/5 rounded-2xl p-4 text-brand-navy focus:outline-none focus:border-brand-orange transition-colors placeholder:text-brand-navy/10 text-sm ${icon ? "pl-12" : ""}`}
        />
      </div>
    </div>
  );
}

function PaymentOptionSleek({ active, icon, label }: any) {
  return (
    <button className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${active ? "bg-brand-navy text-white border-brand-navy" : "bg-white border-brand-cream hover:border-brand-orange/30 text-brand-navy/60"}`}>
       <div className={`${active ? "text-brand-orange" : "text-brand-navy/20"}`}>
        {icon}
       </div>
       <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

