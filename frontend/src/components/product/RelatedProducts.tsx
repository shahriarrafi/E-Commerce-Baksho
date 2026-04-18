"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Sparkles, Loader2 } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: string | number;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const { data } = await apiFetch<{ data: any[] }>("/products", {
          params: { limit: "5" }
        });
        // Filter out current product and take first 4
        setProducts(data.filter(p => p.id !== Number(currentProductId)).slice(0, 4));
      } catch (error) {
        console.error("Related manifestations ritual failed:", error);
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
          <div className="space-y-3 font-noto">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 rounded-full text-brand-orange">
                <Sparkles size={12} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">বিশেষ নির্বাচন</span>
             </div>
             <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy">আপনার আরও পছন্দ হতে পারে</h2>
             <p className="text-brand-navy/40 text-xs md:text-sm font-light italic">আপনার বর্তমান নির্বাচনের সাথে সামঞ্জস্যপূর্ণ বিশেষ কিছু পণ্য।</p>
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest text-brand-navy border-b border-brand-navy/20 pb-1 hover:text-brand-orange hover:border-brand-orange transition-all font-noto">পুরো আর্কাইভ দেখুন</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading ? (
             <div className="col-span-full py-10 flex justify-center">
                <Loader2 className="animate-spin text-brand-orange" size={32} />
             </div>
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.main_image}
                slug={product.slug}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
