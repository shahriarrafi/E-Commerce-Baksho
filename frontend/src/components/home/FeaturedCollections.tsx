"use client";

import { ArrowUpRight, Hexagon, Sparkles, TrendingUp, Trophy, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { apiFetch, getStorageUrl } from "@/lib/api";

interface FeaturedProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  main_image?: string;
  category?: {
    name: string;
    slug: string;
  };
}

export default function FeaturedCollections() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data } = await apiFetch<{ data: FeaturedProduct[] }>("/products", {
          params: { featured: "1", limit: "3" }
        });
        setProducts(data);
      } catch (err) {
        console.error("Featured manifestation ritual failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const icons = [Sparkles, Trophy, TrendingUp];

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 bg-brand-cream">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
        <p className="text-xs font-black uppercase tracking-widest text-brand-navy/30 font-noto">সংগ্রহগুলো অনুসন্ধান করা হচ্ছে...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-brand-cream relative overflow-hidden">
      {/* Hexagonal Background Motif */}
      <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none">
        <Hexagon size={400} fill="currentColor" className="text-brand-orange" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-center md:text-left">
          <div className="space-y-3">
             <div className="flex items-center justify-center md:justify-start gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase font-noto">
                <span className="w-8 h-[1px] bg-brand-orange" />
                সেরা কালেকশন
             </div>
             <h2 className="text-3xl md:text-4xl font-bold font-anek text-brand-navy leading-tight">
                নির্বাচিত <br />
                <span className="italic">কালেকশনসমূহ।</span>
             </h2>
          </div>
          <Link href="/category/new-arrivals" className="group flex items-center justify-center md:justify-start gap-3 text-[11px] font-black uppercase tracking-widest text-brand-navy/60 hover:text-brand-orange transition-colors font-noto">
            সব পণ্য দেখুন
            <div className="w-8 h-8 rounded-full border border-brand-navy/10 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
               <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>

        {/* Bento-style Grid - Now Live */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          {products.length > 0 ? (
            products.map((col, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={col.id}
                  className={`group relative rounded-[35px] overflow-hidden border border-brand-orange/5 transition-all duration-500 hover:shadow-xl ${i === 0 ? "md:row-span-2" : ""}`}
                >
                  {/* Image with Zoom Effect */}
                  <div className="absolute inset-0 z-0 bg-brand-navy/5">
                    {col.main_image ? (
                      <Image 
                        src={getStorageUrl(col.main_image)} 
                        alt={col.name} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-navy/10">
                        <Package size={64} />
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                    <div className="mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                          <Icon size={20} />
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold font-anek text-white">{col.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 font-noto">{col.category?.name || "Premium ritual"}</p>
                    </div>

                    <Link 
                      href={`/product/${col.slug}`}
                      className="mt-6 px-6 py-3 bg-white text-brand-navy rounded-xl text-[10px] font-black uppercase tracking-widest w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-brand-orange hover:text-white font-noto"
                    >
                      ভিতরে দেখুন
                    </Link>
                  </div>

                  {/* Decorative Hexagon */}
                  <div className="absolute top-6 right-6 text-brand-orange/20 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform group-hover:rotate-45">
                    <Hexagon size={50} />
                  </div>
                </div>
              );
            })
          ) : (
             <div className="col-span-full py-20 text-center bg-white/50 rounded-[40px] border border-dashed border-brand-navy/10">
                <p className="text-sm font-bold text-brand-navy/30 font-noto">বর্তমানে কোনো নির্বাচিত কালেকশন নেই।</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
