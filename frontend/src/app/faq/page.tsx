"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Minus, 
  Search, 
  Truck, 
  CreditCard, 
  RefreshCcw, 
  Package, 
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Mail
} from "lucide-react";
import Link from "next/link";

const faqCategories = [
  {
    id: "shipping",
    name: "Shipping & Rituals",
    icon: <Truck size={24} />,
    questions: [
      {
        q: "Do you offer international fulfillment?",
        a: "Currently, we focus on perfecting the Baksho journey within our primary regions to ensure logistics excellence. International expansion is planned for the near future."
      },
      {
        q: "How do I track my Baksho journey?",
        a: "Once your treasure leaves our vault, a unique tracking code will be sent to your email. You can monitor its progression in real-time through our 'Track Ritual' portal."
      },
      {
        q: "What if my hexagonal box arrives damaged?",
        a: "We take immense pride in our engineering. However, if your box arrives with its integrity compromised, please contact our curators within 24 hours for an immediate replacement."
      }
    ]
  },
  {
    id: "orders",
    name: "Orders & Currency",
    icon: <CreditCard size={24} />,
    questions: [
      {
        q: "What payment methods are embraced?",
        a: "We accept all major credit cards, bKash, Nagad, and secure bank transfers. Every transaction is encrypted to the highest ritual standards."
      },
      {
        q: "Can I manifest changes to my order?",
        a: "As we begin our fulfillment process almost immediately, changes must be made within 1 hour of placement. Contact our Concierge for urgent modifications."
      }
    ]
  },
  {
    id: "returns",
    name: "Returns & Completion",
    icon: <RefreshCcw size={24} />,
    questions: [
      {
        q: "What is your return philosophy?",
        a: "We offer a 14-day window for returns of unused products in their original hexagonal packaging. We believe every piece should be a perfect fit for your lifestyle."
      },
      {
        q: "How do I initiate a return?",
        a: "Simply visit our Support Portal, enter your order ID, and prepare your package for a secure pickup by our logistics partners."
      }
    ]
  },
  {
    id: "brand",
    name: "Brand & Authenticity",
    icon: <ShieldCheck size={24} />,
    questions: [
      {
        q: "Why the hexagonal form?",
        a: "The hexagon is nature's most perfect stable form. It allows for efficient logistics whilst providing unparalleled protection for the treasures within."
      },
      {
        q: "Are all products in the Vault authentic?",
        a: "Absolutely. Every item in the Baksho Vault is sourced directly from certified creators or official global brand partners."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("shipping");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="flex flex-col gap-4">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange">Knowledge Base</span>
             <h1 className="text-5xl md:text-7xl font-serif text-brand-navy leading-tight">
                Curious by <br />
                <span className="italic">Nature.</span>
             </h1>
          </div>
          
          <div className="relative group max-w-xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-orange transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for ritual details..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-orange/10 rounded-2xl py-5 pl-14 pr-6 text-brand-navy focus:outline-none focus:border-brand-orange focus:shadow-2xl focus:shadow-brand-orange/5 transition-all text-sm"
            />
          </div>
        </motion.div>
      </section>

      {/* Main FAQ Content */}
      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-3 sticky top-32">
           {faqCategories.map((cat) => (
             <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIndex(null);
                }}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 group ${activeCategory === cat.id ? 'bg-brand-navy text-white border-brand-navy shadow-xl shadow-brand-navy/20' : 'bg-white text-brand-navy/60 border-brand-orange/5 hover:border-brand-orange/20'}`}
             >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeCategory === cat.id ? 'bg-white/10 text-brand-orange' : 'bg-brand-cream text-brand-navy/40 group-hover:text-brand-orange'}`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
             </button>
           ))}

           {/* Quick Contact Block */}
           <div className="mt-8 p-8 bg-brand-orange rounded-[40px] text-white flex flex-col gap-6 shadow-2xl shadow-brand-orange/20">
              <div className="space-y-2">
                 <h4 className="text-xl font-serif font-black">Need a Concierge?</h4>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Average response: 12 minutes</p>
              </div>
              <div className="flex flex-col gap-2">
                 <Link href="/contact" className="bg-white text-brand-orange py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                    <MessageCircle size={16} /> Live Ritual Chat
                 </Link>
                 <a href="mailto:support@baksho.com" className="bg-brand-navy text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <Mail size={16} /> Support Mail
                 </a>
              </div>
           </div>
        </div>

        {/* FAQ Accordion Area */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeCategory}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
               className="flex flex-col gap-4"
             >
               <div className="mb-6">
                  <h3 className="text-2xl font-serif text-brand-navy font-black">
                     {faqCategories.find(c => c.id === activeCategory)?.name}
                  </h3>
               </div>

               {faqCategories.find(c => c.id === activeCategory)?.questions.map((faq, index) => (
                 <div 
                   key={index}
                   className={`group border h-fit rounded-[32px] transition-all duration-500 overflow-hidden ${activeIndex === index ? 'bg-white border-brand-orange/20 shadow-xl' : 'bg-white/50 border-brand-cream/50 hover:border-brand-orange/10'}`}
                 >
                   <button
                     onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                     className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                   >
                     <span className={`text-lg md:text-xl font-bold transition-colors ${activeIndex === index ? 'text-brand-orange' : 'text-brand-navy'}`}>
                       {faq.q}
                     </span>
                     <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-brand-orange text-white rotate-180' : 'bg-brand-navy text-white'}`}>
                       {activeIndex === index ? <Minus size={14} /> : <Plus size={14} />}
                     </div>
                   </button>
                   <AnimatePresence>
                     {activeIndex === index && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3, ease: "easeInOut" }}
                       >
                         <div className="px-6 md:px-8 pb-8 pt-2">
                           <p className="text-brand-navy/60 leading-relaxed font-medium">
                             {faq.a}
                           </p>
                           <div className="mt-6 flex items-center gap-4 py-4 border-t border-brand-cream pt-6">
                              <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">Helpful?</span>
                              <div className="flex gap-2">
                                 <button className="px-4 py-2 bg-brand-cream/50 rounded-lg text-[10px] font-black text-brand-navy hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest">Yes</button>
                                 <button className="px-4 py-2 bg-brand-cream/50 rounded-lg text-[10px] font-black text-brand-navy hover:bg-brand-navy hover:text-white transition-all uppercase tracking-widest">No</button>
                              </div>
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               ))}
             </motion.div>
           </AnimatePresence>

           {/* Newsletter / CTA */}
           <div className="mt-20 p-12 bg-white rounded-[48px] border border-brand-orange/10 text-center space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-orange">
                 <HelpCircle size={200} />
              </div>
              <div className="max-w-md mx-auto relative z-10 space-y-4">
                 <h4 className="text-3xl font-serif text-brand-navy">Still haven't found <br /> what you're looking for?</h4>
                 <p className="text-brand-navy/60 text-sm">Our expert curators are trained to answer the most unique inquiries perfectly.</p>
              </div>
              <button className="relative z-10 bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10 group-hover:shadow-brand-orange/20">
                 Contact Curator Concierge <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}
