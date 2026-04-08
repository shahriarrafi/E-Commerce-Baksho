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
  Wallet
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const { items, getTotals, clearCart } = useCartStore();
  const { subtotal } = getTotals();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (items.length === 0 && mounted) {
      router.push("/");
    }
  }, [items, router, mounted]);

  if (!mounted || items.length === 0) return null;

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: ShieldCheck },
  ];

  const handleNext = () => {
    if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("review");
    else if (step === "review") {
      // Simulate order processing
      router.push("/checkout/success");
      setTimeout(() => clearCart(), 500);
    }
  };

  const handleBack = () => {
    if (step === "payment") setStep("shipping");
    else if (step === "review") setStep("payment");
  };

  return (
    <div className="min-h-screen bg-brand-cream/30 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Step Progress */}
            <div className="flex items-center justify-between px-4">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-4 group">
                  <div className={`flex items-center gap-3 ${step === s.id ? "text-brand-orange" : "text-brand-navy/30"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step === s.id ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/30" : "bg-white border border-brand-navy/10"}`}>
                      <s.icon size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-12 h-[1px] bg-brand-navy/10 mx-2 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl shadow-brand-navy/5 min-h-[500px] border border-brand-orange/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === "shipping" && <ShippingStep onNext={handleNext} />}
                  {step === "payment" && <PaymentStep onNext={handleNext} onBack={handleBack} />}
                  {step === "review" && <ReviewStep onNext={handleNext} onBack={handleBack} items={items} subtotal={subtotal} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-brand-navy text-white rounded-[40px] p-10 sticky top-32 shadow-2xl shadow-brand-navy/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Package size={160} />
              </div>
              
              <h3 className="text-2xl font-serif mb-8 relative z-10 text-white/90">Order Summary</h3>
              
              <div className="space-y-6 mb-10 relative z-10">
                <div className="flex justify-between items-center text-white/60 text-sm font-medium">
                  <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} Items)</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-white/60 text-sm font-medium">
                  <span>Shipping</span>
                  <span className="text-brand-orange font-black uppercase tracking-tighter text-[10px]">Free Express</span>
                </div>
                <div className="flex justify-between items-center text-white/60 text-sm font-medium">
                  <span>Taxes</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="h-[1px] bg-white/10 my-6" />
                <div className="flex justify-between items-end">
                  <span className="text-white/80 font-medium">Total Price</span>
                  <span className="text-4xl font-black tracking-tighter text-white">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="text-brand-orange" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Baksho Integrity</span>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Your transaction is protected by state-of-the-art encryption. Premium unboxing experience guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-8 bg-brand-orange rounded-full" />
        <h2 className="text-3xl font-serif text-brand-navy">Where shall we deliver?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input label="First Name" placeholder="e.g. Shahriar" />
        <Input label="Last Name" placeholder="e.g. Rafi" />
        <div className="md:col-span-2">
           <Input label="Full Address" placeholder="Street name, Apartment, etc." />
        </div>
        <Input label="City" placeholder="e.g. Dhaka" />
        <Input label="Postal Code" placeholder="e.g. 1200" />
        <div className="md:col-span-2">
          <Input label="Phone Number" placeholder="+8801XXXXXXXXX" icon={<Smartphone size={16} />} />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button 
          onClick={onNext}
          className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-orange transition-all group"
        >
          Proceed To Payment
          <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>
    </div>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [method, setMethod] = useState("card");

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-8 bg-brand-orange rounded-full" />
        <h2 className="text-3xl font-serif text-brand-navy">Payment Method</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PaymentOption 
          active={method === "card"} 
          onClick={() => setMethod("card")}
          icon={<CreditCard size={24} />}
          label="Credit Card"
          desc="Visa / MasterCard"
        />
        <PaymentOption 
          active={method === "mfs"} 
          onClick={() => setMethod("mfs")}
          icon={<Wallet size={24} />}
          label="MFS"
          desc="bKash / Nagad"
        />
        <PaymentOption 
          active={method === "cod"} 
          onClick={() => setMethod("cod")}
          icon={<Package size={24} />}
          label="Cash on Delivery"
          desc="Dhaka only"
        />
      </div>

      <div className="bg-brand-cream/50 p-8 rounded-3xl border border-brand-orange/5 space-y-6">
        {method === "card" && (
           <div className="grid grid-cols-2 gap-6">
             <div className="col-span-2">
               <Input label="Card Number" placeholder="0000 0000 0000 0000" />
             </div>
             <Input label="Expiry Date" placeholder="MM/YY" />
             <Input label="CVV" placeholder="***" />
           </div>
        )}
        {method === "mfs" && (
          <div className="flex items-center gap-8 py-4">
             <div className="w-20 h-20 bg-brand-navy rounded-2xl flex items-center justify-center p-4">
                <span className="text-white font-black text-xs">bKash</span>
             </div>
             <div className="w-20 h-20 bg-brand-navy rounded-2xl flex items-center justify-center p-4 opacity-50 grayscale">
                <span className="text-white font-black text-xs">Nagad</span>
             </div>
             <p className="text-sm text-brand-navy/50">Select your preferred gateway and follow instructions.</p>
          </div>
        )}
        {method === "cod" && (
          <p className="text-sm text-brand-navy/60 leading-relaxed italic">
            You will pay the full amount of your order to our delivery representative at your doorstep. We accept cash and major local cards.
          </p>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t border-brand-navy/5">
        <button 
          onClick={onBack}
          className="text-brand-navy/40 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button 
          onClick={onNext}
          className="bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-brand-orange transition-all group"
        >
          Final Review
          <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={18} />
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ onNext, onBack, items, subtotal }: { onNext: () => void; onBack: () => void; items: any[]; subtotal: number }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="w-1.5 h-8 bg-brand-orange rounded-full" />
        <h2 className="text-3xl font-serif text-brand-navy">Review & Confirm</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-4 text-brand-navy/40 uppercase font-black text-[10px] tracking-widest px-4">
           <MapPin size={14} /> Shipping to Dhaka, Bangladesh
        </div>
        
        <div className="divide-y divide-brand-cream/50">
          {items.map((item) => (
            <div key={item.id} className="py-6 flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-brand-cream rounded-xl overflow-hidden relative">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                   <h4 className="font-serif font-bold text-brand-navy">{item.name}</h4>
                   <p className="text-sm text-brand-orange font-bold">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-black text-brand-navy">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-orange/5 p-8 rounded-[40px] border border-brand-orange/10 flex flex-col items-center text-center gap-4">
         <ShieldCheck className="text-brand-orange" size={40} />
         <div>
            <h4 className="font-serif font-bold text-lg text-brand-navy">Ready For Your Unboxing?</h4>
            <p className="text-xs text-brand-navy/50 max-w-sm">By placing this order, you agree to our Terms of Experience. You'll receive a confirmation email shortly.</p>
         </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-brand-navy/5">
        <button 
          onClick={onBack}
          className="text-brand-navy/40 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-brand-navy transition-colors"
        >
          <ArrowLeft size={16} /> Back to Payment
        </button>
        <button 
          onClick={onNext}
          className="bg-brand-navy text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-brand-orange transition-all group hover:scale-[1.02] shadow-2xl shadow-brand-navy/20 active:scale-95"
        >
          Complete Purchase
          <CheckCircle2 size={20} className="group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function Input({ label, placeholder, icon }: { label: string; placeholder: string; icon?: any }) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <label className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-brand-navy/30">{icon}</div>}
        <input 
          type="text" 
          placeholder={placeholder}
          className={`w-full bg-brand-cream/30 border border-brand-orange/10 rounded-2xl p-4 text-brand-navy focus:outline-none focus:border-brand-orange transition-colors placeholder:text-brand-navy/20 text-sm ${icon ? "pl-12" : ""}`}
        />
      </div>
    </div>
  );
}

function PaymentOption({ active, onClick, icon, label, desc }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-8 rounded-[32px] border-2 transition-all flex flex-col items-center text-center gap-4 group ${active ? "border-brand-orange bg-brand-orange/5 shadow-lg shadow-brand-orange/10" : "border-brand-navy/5 hover:border-brand-navy/10"}`}
    >
      <div className={`p-4 rounded-2xl transition-colors ${active ? "bg-brand-orange text-white" : "bg-brand-cream text-brand-navy/30 group-hover:bg-brand-cream/100"}`}>
        {icon}
      </div>
      <div>
        <h4 className={`text-sm font-bold uppercase tracking-widest ${active ? "text-brand-orange" : "text-brand-navy"}`}>{label}</h4>
        <p className="text-[10px] text-brand-navy/40 font-medium mt-1">{desc}</p>
      </div>
    </button>
  );
}
