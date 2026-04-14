"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const list = await api.products.list();
        // Filter out current product and take first 4
        setProducts(list.filter(p => p.id !== currentProductId).slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch related products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [currentProductId]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-16 bg-brand-cream/5 border-t border-brand-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange">
                <Sparkles size={12} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curation</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-serif text-brand-navy">You May Also Seek</h2>
             <p className="text-brand-navy/40 text-xs md:text-sm font-light italic">Hand-picked rituals that harmonize with your current selection.</p>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-brand-navy border-b border-brand-navy/20 pb-1 hover:text-brand-orange hover:border-brand-orange transition-all">Explore Whole Archive</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-brand-cream animate-pulse rounded-3xl" />
            ))
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                slug={product.slug}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
