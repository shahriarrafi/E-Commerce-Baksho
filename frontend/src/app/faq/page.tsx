"use client";
import React, { useState, useEffect, useMemo } from "react";
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
  Mail,
  Loader2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { useFAQStore } from "@/store/useFAQStore";

// High-fidelity Icon Mapping Ritual
const getCategoryIcon = (category: string) => {
  const norm = category.toLowerCase();
  if (norm.includes("ship")) return <Truck size={24} />;
  if (norm.includes("order") || norm.includes("payment")) return <CreditCard size={24} />;
  if (norm.includes("return") || norm.includes("refund")) return <RefreshCcw size={24} />;
  if (norm.includes("brand") || norm.includes("auth")) return <ShieldCheck size={24} />;
  if (norm.includes("privacy") || norm.includes("security")) return <Lock size={24} />;
  if (norm.includes("product") || norm.includes("inventory")) return <Package size={24} />;
  return <HelpCircle size={24} />;
};

export default function FAQPage() {
  const { faqGroups, isLoading, error, fetchFAQs } = useFAQStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  // Expertly Synchronize the initial active category once rituals manifest
  useEffect(() => {
    const categories = Object.keys(faqGroups);
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [faqGroups, activeCategory]);

  // Filtering Ritual: Discover matching enlightenment across all groups
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return faqGroups;
    
    const query = searchQuery.toLowerCase();
    const result: Record<string, any[]> = {};
    
    Object.entries(faqGroups).forEach(([cat, questions]) => {
      const matches = questions.filter(
        f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query)
      );
      if (matches.length > 0) result[cat] = matches;
    });
    
    return result;
  }, [faqGroups, searchQuery]);

  const categories = Object.keys(filteredGroups);

  if (isLoading && categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/10">
         <div className="flex flex-col items-center gap-6">
            <Loader2 className="animate-spin text-brand-orange" size={48} />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-navy/40 font-noto">সংগ্রহশালা থেকে তথ্য সংগ্রহীত হচ্ছে...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream/10 pt-32 pb-24 font-noto">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="flex flex-col gap-4">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange italic font-anek">Knowledge Base</span>
             <h1 className="text-5xl md:text-7xl font-serif text-brand-navy leading-tight font-anek font-bold">
                সাধারণ <br />
                <span className="italic text-brand-orange">জিজ্ঞাসা।</span>
             </h1>
          </div>
          
          <div className="relative group max-w-xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-navy/30 group-focus-within:text-brand-orange transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="আপনার প্রশ্নটি এখানে খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-orange/10 rounded-2xl py-5 pl-14 pr-6 text-brand-navy focus:outline-none focus:border-brand-orange focus:shadow-2xl focus:shadow-brand-orange/5 transition-all text-sm font-bold font-anek"
            />
          </div>
        </motion.div>
      </section>

      {/* Main FAQ Content */}
      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-3 lg:sticky lg:top-32">
           {categories.map((cat) => (
             <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveIndex(null);
                }}
                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 group ${activeCategory === cat ? 'bg-brand-navy text-white border-brand-navy shadow-xl shadow-brand-navy/20' : 'bg-white text-brand-navy/60 border-brand-orange/5 hover:border-brand-orange/20'}`}
             >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeCategory === cat ? 'bg-white/10 text-brand-orange' : 'bg-brand-cream text-brand-navy/40 group-hover:text-brand-orange'}`}>
                   {getCategoryIcon(cat)}
                </div>
                <span className="text-xs font-black uppercase tracking-widest font-anek">{cat}</span>
             </button>
           ))}

           {categories.length === 0 && !isLoading && (
              <div className="p-8 text-center bg-white rounded-[32px] border border-brand-orange/5 border-dashed">
                 <p className="text-sm font-bold text-brand-navy/20 uppercase tracking-widest font-anek italic">কোনো ফলাফল পাওয়া যায়নি।</p>
              </div>
           )}

           {/* Quick Contact Block */}
           <div className="mt-8 p-8 bg-brand-orange rounded-[40px] text-white flex flex-col gap-6 shadow-2xl shadow-brand-orange/20 group">
              <div className="space-y-2">
                 <h4 className="text-xl font-bold font-anek italic">সহায়তা প্রয়োজন?</h4>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/60 font-noto">গড় উত্তর প্রদান সময়: ১২ মিনিট</p>
              </div>
              <div className="flex flex-col gap-2 font-noto font-bold">
                 <Link href="/contact" className="bg-white text-brand-orange py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                    <MessageCircle size={16} /> লাইভ রিচুয়াল চ্যাট
                 </Link>
                 <a href="mailto:support@baksho.com" className="bg-brand-navy text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <Mail size={16} /> সাপোর্ট মেইল
                 </a>
              </div>
           </div>
        </div>

        {/* FAQ Accordion Area */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeCategory + searchQuery}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
               className="flex flex-col gap-4"
             >
               {activeCategory && filteredGroups[activeCategory] && (
                 <>
                   <div className="mb-6">
                      <h3 className="text-2xl text-brand-navy font-bold font-anek italic border-b border-brand-orange/10 pb-4">
                         {activeCategory}
                      </h3>
                   </div>

                   {filteredGroups[activeCategory].map((faq, index) => (
                     <div 
                       key={faq.id}
                       className={`group border h-fit rounded-[32px] transition-all duration-500 overflow-hidden ${activeIndex === index ? 'bg-white border-brand-orange/20 shadow-xl' : 'bg-white/50 border-brand-cream/50 hover:border-brand-orange/10'}`}
                     >
                       <button
                         onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                         className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                       >
                         <span className={`text-lg md:text-xl font-bold transition-colors font-anek leading-tight ${activeIndex === index ? 'text-brand-orange' : 'text-brand-navy'}`}>
                           {faq.question}
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
                               <p className="text-brand-navy/60 leading-relaxed font-bold font-anek">
                                 {faq.answer}
                               </p>
                               <div className="mt-6 flex items-center gap-4 py-4 border-t border-brand-cream pt-6 font-noto">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30">উপকার হয়েছে?</span>
                                  <div className="flex gap-2">
                                     <button className="px-4 py-2 bg-brand-cream/50 rounded-lg text-[10px] font-black text-brand-navy hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest">হ্যাঁ</button>
                                     <button className="px-4 py-2 bg-brand-cream/50 rounded-lg text-[10px] font-black text-brand-navy hover:bg-brand-navy hover:text-white transition-all uppercase tracking-widest">না</button>
                                  </div>
                               </div>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   ))}
                 </>
               )}
             </motion.div>
           </AnimatePresence>

           {/* Newsletter / CTA */}
           <div className="mt-20 p-12 bg-white rounded-[48px] border border-brand-orange/10 text-center space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-orange">
                 <HelpCircle size={200} />
              </div>
              <div className="max-w-md mx-auto relative z-10 space-y-4">
                 <h4 className="text-3xl font-bold font-anek text-brand-navy italic leading-tight">আপনার কাঙ্ক্ষিত <br /> উত্তর খুঁজে পাননি?</h4>
                 <p className="text-brand-navy/60 text-sm font-bold font-noto">আমাদের অভিজ্ঞ কিউরেটররা আপনার যেকোনো প্রিমিয়াম জিজ্ঞাসার উত্তর দিতে প্রস্তুত।</p>
              </div>
              <button className="relative z-10 bg-brand-navy text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mx-auto hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10 group-hover:shadow-brand-orange/20 font-noto">
                 কিউরেটরদের সাথে কথা বলুন <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
}
