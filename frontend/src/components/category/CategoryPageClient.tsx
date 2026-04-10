
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react";
import FilterSidebar from "@/components/category/FilterSidebar";
import ProductCard from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryPageClientProps {
  categoryPath: string;
  currentCategory: string;
  initialProducts: any[];
}

export default function CategoryPageClient({ categoryPath, currentCategory, initialProducts }: CategoryPageClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="container mx-auto px-6 pb-8 md:pb-12">
        {/* Animated Breadcrumbs */}
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-navy/30 mb-8 font-sans">
          <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
          <span>/</span>
          <span>Category</span>
          <span>/</span>
          <span className="text-brand-orange">{categoryPath}</span>
        </div>

        {/* Category Header & Sort Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-navy mb-4 capitalize tracking-tight">
              {currentCategory}
            </h1>
            <div className="w-16 h-1.5 bg-brand-orange mb-6 rounded-full"></div>
            <p className="text-brand-navy/60 max-w-2xl font-sans text-base md:text-lg leading-relaxed">
              Every item in our <span className="text-brand-navy font-black italic">{currentCategory}</span> collection represents the pinnacle of hexagonal design and unboxing craft.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-5 py-3 bg-brand-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all"
            >
              Filters <SlidersHorizontal size={14} />
            </button>
            <button className="flex items-center gap-3 px-5 py-3 bg-brand-cream/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-navy hover:bg-brand-orange hover:text-white transition-all">
              Sort By <ArrowUpDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sidebar - Persistent on Desktop, Drawer on Mobile */}
          <div className="hidden lg:block w-72 flex-shrink-0">
             <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-10 md:gap-y-16">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  image={product.images[0]}
                />
              ))}
            </div>

            {/* Pagination Mock */}
            <div className="mt-16 flex justify-center items-center gap-3">
              <div className="w-10 h-10 bg-brand-navy text-white rounded-xl flex items-center justify-center font-black text-[10px]">1</div>
              <div className="w-10 h-10 bg-brand-cream/50 text-brand-navy rounded-xl flex items-center justify-center font-black text-[10px] hover:bg-brand-orange hover:text-white transition-colors cursor-pointer">2</div>
              <div className="w-10 h-10 bg-brand-cream/50 text-brand-navy rounded-xl flex items-center justify-center font-black text-[10px] hover:bg-brand-orange hover:text-white transition-colors cursor-pointer">3</div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-md z-[160]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[300px] bg-white z-[170] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase tracking-widest text-brand-navy">Discovery Filters</h2>
                <button onClick={() => setIsFilterOpen(false)} className="text-brand-navy/40 hover:text-brand-orange transition-colors">
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
