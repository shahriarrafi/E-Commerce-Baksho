"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown, Package, Truck, ArrowRight } from "lucide-react";
import { CATEGORIES, Category } from "@/lib/constants";
import { useUIStore } from "@/store/useUIStore";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const router = useRouter();
  const { slug: currentSlug } = useParams();
  const [expandedCats, setExpandedCats] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedCats(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    closeMobileMenu();
  };

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md z-[140]"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[85%] max-w-[400px] bg-white z-[150] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-cream bg-white/50 backdrop-blur-xl">
              <Link href="/" onClick={closeMobileMenu} className="flex items-center">
                <Image 
                  src="/Logo.webp" 
                  alt="Baksho Logo" 
                  width={100} 
                  height={30} 
                  className="h-8 w-auto object-contain" 
                />
              </Link>
              <button onClick={closeMobileMenu} className="p-2 text-brand-navy/40 hover:text-brand-orange transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content: Focused Category Hierarchy */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="flex flex-col gap-6">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-navy/20 mb-2 font-hind">ক্যাটাগরি তালিকা</p>
                
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((cat) => (
                    <CategoryItem 
                      key={cat.id} 
                      category={cat} 
                      currentSlug={currentSlug as string}
                      isExpanded={expandedCats.includes(cat.id)}
                      onToggle={() => toggleExpand(cat.id)}
                      onNavigate={handleNavigation}
                      level={0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer / Logistics */}
            <div className="p-6 border-t border-brand-cream bg-brand-cream/10">
              <button
                onClick={() => handleNavigation("/track-order")}
                className="w-full bg-brand-navy text-white p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-brand-navy/10 active:scale-95 transition-all font-hind"
              >
                <Truck size={16} className="text-brand-orange" /> অর্ডার ট্র্যাক করুন
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CategoryItem({ 
  category, 
  currentSlug, 
  isExpanded, 
  onToggle, 
  onNavigate,
  level 
}: { 
  category: Category; 
  currentSlug: string;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
  level: number;
}) {
  const hasChildren = category.children && category.children.length > 0;
  const isActive = currentSlug === category.slug;

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <button
          onClick={() => onNavigate(`/category/${category.slug}`)}
          className={`flex-1 flex items-center gap-4 p-3 rounded-2xl transition-all group ${
            isActive ? 'bg-brand-orange/5 text-brand-orange' : 'hover:bg-brand-cream/40 text-brand-navy/80 hover:text-brand-navy'
          }`}
        >
          {level === 0 && (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isActive ? 'bg-brand-orange text-white' : 'bg-brand-cream text-brand-navy/30 group-hover:bg-brand-navy/5 group-hover:text-brand-navy'
            }`}>
              <Package size={20} strokeWidth={1.5} />
            </div>
          )}
          <span className={`${level === 0 ? 'text-lg font-serif' : 'text-sm font-medium'} flex-1 text-left`}>
            {category.name}
          </span>
          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />}
        </button>

        {hasChildren && (
          <button 
            onClick={onToggle}
            className={`p-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} text-brand-navy/20 hover:text-brand-orange`}
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {hasChildren && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden ml-12 border-l border-brand-cream/50 pl-2 mt-1 flex flex-col gap-1"
            >
              {category.children?.map((child) => (
                <CategoryItem 
                  key={child.id}
                  category={child}
                  currentSlug={currentSlug}
                  isExpanded={false} // Would need recursive state for deeper expansion
                  onToggle={() => {}} 
                  onNavigate={onNavigate}
                  level={level + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
