
"use client";
 
import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown, SlidersHorizontal, X, Loader2 } from "lucide-react";
import FilterSidebar from "@/components/category/FilterSidebar";
import ProductCard from "@/components/product/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "@/lib/api";

import { MESSAGES } from "@/constants/messages";

interface CategoryPageClientProps {
  initialProducts: any[];
  initialMeta?: {
    current_page: number;
    last_page: number;
    total: number;
  } | null;
  categorySlug?: string;
  apiUrl?: string;
  children?: React.ReactNode; // For the Server-side Header
}

export default function CategoryPageClient({ 
    initialProducts, 
    initialMeta,
    categorySlug,
    apiUrl = "/products",
    children
}: CategoryPageClientProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [meta, setMeta] = useState(initialMeta);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (!meta || meta.current_page >= meta.last_page || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = meta.current_page + 1;
      const params: any = { page: nextPage, brief: 1 };
      if (categorySlug) params.category = categorySlug;

      const response = await apiFetch<{ data: any[], meta: any }>(apiUrl, { params });
      
      setProducts(prev => [...prev, ...response.data]);
      setMeta(response.meta);
    } catch (err) {
      console.error("Load more data failed:", err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = meta ? meta.current_page < meta.last_page : false;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="container mx-auto px-6 pb-8 md:pb-12">
        {/* Server-side CategoryHeader or other static content */}
        {children}

        {/* Mobile Filter Trigger */}
        <div className="flex justify-end mb-6 lg:hidden font-hind">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-brand-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all"
          >
            {MESSAGES.FILTERS} <SlidersHorizontal size={14} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Sidebar - Persistent on Desktop */}
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
                  image={product.main_image}
                />
              ))}
            </div>

            {/* Load More Section */}
            {hasMore && (
              <div className="mt-16 flex justify-center items-center">
                <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="group relative px-12 py-5 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-brand-orange active:scale-95 disabled:opacity-50 flex items-center gap-3 font-hind"
                >
                    {isLoadingMore ? (
                        <>
                            <Loader2 className="animate-spin" size={16} />
                            {MESSAGES.LOADING_MORE}
                        </>
                    ) : (
                        <>
                            {MESSAGES.LOAD_MORE}
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange group-hover:bg-white transition-colors" />
                        </>
                    )}
                </button>
              </div>
            )}

            {!hasMore && products.length > 0 && (
                <div className="mt-16 text-center">
                    <p className="text-[10px] font-black text-brand-navy/20 uppercase tracking-[0.2em] font-hind">
                        {MESSAGES.ALL_LOADED}
                    </p>
                </div>
            )}
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
              <div className="flex items-center justify-between mb-8 font-hind">
                <h2 className="text-sm font-black uppercase tracking-widest text-brand-navy">{MESSAGES.DISCOVERY_FILTERS}</h2>
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
