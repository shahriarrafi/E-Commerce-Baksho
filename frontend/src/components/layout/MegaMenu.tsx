"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Hexagon } from "lucide-react";
import { Category } from "@/lib/constants";

interface MegaMenuProps {
  categories: Category[];
  onClose: () => void;
}

export default function MegaMenu({ categories, onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white border border-brand-cream rounded-3xl shadow-2xl overflow-hidden z-[70] p-8"
    >
      <div className="grid grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.id} className="space-y-4">
            <Link 
              href={`/category/${category.slug}`}
              onClick={onClose}
              className="flex items-center gap-2 group/title"
            >
              <div className="relative">
                <Hexagon className="text-brand-orange/20 fill-brand-orange/5 group-hover/title:fill-brand-orange/20 transition-all" size={24} />
                <Hexagon className="absolute inset-0 text-brand-orange group-hover/title:scale-75 transition-transform" size={24} />
              </div>
              <h3 className="font-bold text-brand-navy font-serif group-hover/title:text-brand-orange transition-colors">
                {category.name}
              </h3>
            </Link>

            {category.children && (
              <div className="space-y-2 pl-8 border-l border-brand-cream">
                {category.children.map((sub) => (
                  <div key={sub.id} className="group/item">
                    <Link 
                      href={`/category/${category.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="text-sm text-brand-navy/60 hover:text-brand-orange flex items-center justify-between transition-colors py-1"
                    >
                      {sub.name}
                      <ChevronRight className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" size={14} />
                    </Link>
                    
                    {sub.children && (
                       <div className="pl-4 mt-1 space-y-1">
                          {sub.children.map(child => (
                             <Link 
                               key={child.id}
                               href={`/category/${category.slug}/${sub.slug}/${child.slug}`}
                               onClick={onClose}
                               className="block text-xs text-brand-navy/40 hover:text-brand-orange transition-colors"
                             >
                               • {child.name}
                             </Link>
                          ))}
                       </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Promotional Card in Mega Menu */}
        <div className="col-span-3 mt-4 pt-6 border-t border-brand-cream">
           <div className="bg-brand-cream rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="bg-white p-2 rounded-xl shadow-sm">
                    <Hexagon className="text-brand-orange" size={24} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-brand-navy">Limited HexBox Edition</h4>
                    <p className="text-xs text-brand-navy/50 font-sans">Save 20% on your first premium unboxing experience.</p>
                 </div>
              </div>
              <button className="text-xs font-bold text-brand-orange hover:translate-x-1 transition-transform flex items-center gap-1">
                 VIEW OFFERS <ChevronRight size={14} />
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
