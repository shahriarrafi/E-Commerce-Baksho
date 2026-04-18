"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, Hexagon } from "lucide-react";

const FILTERS = [
  {
    id: "price",
    name: "দামের পরিসীমা",
    options: ["৫০৳-এর নিচে", "৫০৳ - ১০০৳", "১০০৳ - ৫০০৳", "৫০০৳+"],
  },
  {
    id: "size",
    name: "প্যাকেজের আকার",
    options: ["ছোট (Hex1)", "মাঝারি (Hex2)", "বড় (Hex3)", "অতিরিক্ত বড় (Hex4)"],
  },
];

export default function FilterSidebar() {
  const { slug } = useParams();
  const decodedSlug = slug ? (Array.isArray(slug) ? slug[slug.length - 1] : slug) : null;
  
  const { categories, fetchCategories, isLoading } = useCategoryStore();
  const [openSections, setOpenSections] = useState<string[]>(["categories", "price"]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-32 space-y-8 pb-20">
        <div className="flex items-center justify-between mb-8 pr-4 font-noto">
          <div className="flex items-center gap-3">
             <SlidersHorizontal className="text-brand-orange" size={20} />
             <h2 className="text-base font-bold text-brand-navy">ফিল্টারসমূহ</h2>
          </div>
          <button className="text-[12px] font-bold text-brand-orange hover:underline">সব মুছুন</button>
        </div>

        {/* Robust Category Explorer - Now Live */}
        <div className="border-b border-brand-cream pb-6">
           <button
             onClick={() => toggleSection("categories")}
             className="flex w-full items-center justify-between text-[14px] font-bold text-brand-navy py-2 group mb-4 font-anek"
           >
             রিচুয়াল কালেকশন
             <ChevronDown 
               size={14} 
               className={`transition-transform duration-500 ease-in-out ${openSections.includes("categories") ? "rotate-180" : ""}`} 
             />
           </button>

           <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openSections.includes("categories") ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="space-y-4">
                 {isLoading ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-4 bg-brand-cream rounded w-3/4" />
                        <div className="h-4 bg-brand-cream rounded w-1/2 ml-4" />
                        <div className="h-4 bg-brand-cream rounded w-2/3" />
                    </div>
                 ) : (
                    categories.map((cat) => (
                      <div key={cat.id} className="space-y-2">
                         <Link 
                           href={`/category/${cat.slug}`}
                           className={`flex items-center justify-between group py-1 ${decodedSlug === cat.slug ? 'text-brand-orange' : 'text-brand-navy/60 hover:text-brand-navy'}`}
                         >
                            <span className="text-[14px] font-bold font-anek">{cat.name}</span>
                            {decodedSlug === cat.slug && <motion.div layoutId="activeCat" className="w-1.5 h-1.5 rounded-full bg-brand-orange" />}
                         </Link>
                         
                         {cat.children && (
                           <div className="ml-3 pl-3 border-l border-brand-cream/50 flex flex-col gap-2">
                              {cat.children.map((child) => (
                                <div key={child.id} className="space-y-2">
                                  <Link 
                                    href={`/category/${child.slug}`}
                                    className={`flex items-center justify-between text-[13px] font-bold transition-colors font-anek ${decodedSlug === child.slug ? 'text-brand-orange' : 'text-brand-navy/60 hover:text-brand-navy'}`}
                                  >
                                     {child.name}
                                     {decodedSlug === child.slug && <div className="w-1 h-1 rounded-full bg-brand-orange" />}
                                  </Link>
                                  
                                  {child.children && (
                                    <div className="ml-3 flex flex-col gap-1.5">
                                       {child.children.map(sub => (
                                         <Link 
                                           key={sub.id}
                                           href={`/category/${sub.slug}`}
                                           className={`text-[12px] font-medium transition-colors font-anek py-1 block ${decodedSlug === sub.slug ? 'text-brand-orange font-bold' : 'text-brand-navy/40 hover:text-brand-navy'}`}
                                         >
                                           • {sub.name}
                                         </Link>
                                       ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                           </div>
                         )}
                      </div>
                    ))
                 )}
              </div>
           </div>
        </div>

        {/* Dynamic Filters Area */}
        {FILTERS.map((section) => (
          <div key={section.id} className="border-b border-brand-cream pb-6 overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between text-[14px] font-bold text-brand-navy py-2 group font-anek"
            >
              {section.name}
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-500 ease-in-out ${openSections.includes(section.id) ? "rotate-180" : ""}`} 
              />
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openSections.includes(section.id) ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3.5 font-noto">
                {section.options.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-5 h-5 border border-brand-navy/10 rounded-[6px] group-hover:border-brand-orange transition-all peer-checked:bg-brand-orange peer-checked:border-brand-orange peer-checked:scale-110" />
                      <Hexagon className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity scale-50" size={16} fill="white" />
                    </div>
                    <span className="text-[14px] text-brand-navy/60 group-hover:text-brand-navy transition-colors font-medium">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Brand Motif in Sidebar */}
        <div className="bg-brand-cream/50 rounded-3xl p-6 border border-brand-orange/5 font-noto">
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Hexagon className="text-brand-orange" size={20} />
           </div>
           <h4 className="text-sm font-bold text-brand-navy mb-2">বাকশো গ্যারান্টি</h4>
           <p className="text-[12px] text-brand-navy/60 leading-relaxed font-medium">
             প্রতিটি কালেকশনে প্রিমিয়াম আনবক্সিং অভিজ্ঞতার নিশ্চয়তা।
           </p>
        </div>
      </div>
    </aside>
  );
}
