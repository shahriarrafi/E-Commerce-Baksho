"use client";

import { motion } from "framer-motion";
import { Package, Plus, Heart, Hexagon } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

interface ProductCardProps {
  id: number | string;
  slug?: string;
  name?: string;
  price?: number;
  image?: string;
}

export default function ProductCard({ 
  id, 
  slug = "signature-baksho-box", 
  name, 
  price = 199.00,
  image = "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"
}: ProductCardProps) {
  const productPath = `/product/${slug}`;
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  
  const productData = { 
    id: id.toString(), 
    name: name || `HexBox Premium v${id}`, 
    price, 
    image, 
    slug 
  };

  const isFavorited = isInWishlist(productData.id);

  return (
    <div className="group relative">
      {/* Visual Container */}
      <div className="aspect-[4/5] bg-brand-cream rounded-[40px] mb-6 overflow-hidden relative border border-brand-orange/5 transition-all duration-700 group-hover:border-brand-orange/20 group-hover:shadow-2xl group-hover:shadow-brand-orange/10 group-hover:-translate-y-2">
        {/* Link Wrapper for the whole image area */}
        <Link href={productPath} className="absolute inset-0 z-10">
          <span className="sr-only">View {productData.name}</span>
        </Link>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/5 transition-colors duration-500 z-0" />
        
        {/* Design Motif Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-1000">
          <Hexagon size={240} fill="currentColor" className="text-brand-orange" />
        </div>

        {/* Floating Icons - Above the link */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
           <button 
             onClick={(e) => { 
               e.preventDefault(); 
               e.stopPropagation(); 
               toggleItem(productData);
             }}
             className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 duration-500 ${
               isFavorited 
                 ? "bg-brand-orange text-white opacity-100 translate-x-0" 
                 : "bg-white/80 backdrop-blur-md text-brand-navy hover:bg-brand-orange hover:text-white"
             }`}
           >
             <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
           </button>
        </div>

        {/* Quick Add Interaction - Above the link */}
        <div className="absolute bottom-8 inset-x-8 z-20 flex justify-center">
           <button 
             onClick={(e) => { 
               e.preventDefault(); 
               e.stopPropagation(); 
               addItem(productData);
             }}
             className="w-full bg-brand-navy text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 translate-y-32 group-hover:translate-y-0 transition-all duration-500 hover:bg-brand-orange shadow-lg shadow-brand-navy/20"
           >
             <Plus size={16} /> Quick Add
           </button>
        </div>

        {/* Product Visual Mock */}
        <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
           <motion.div 
             animate={{ rotate: [0, 5, -5, 0] }}
             transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
             className="relative"
           >
              <Package size={120} className="text-brand-orange/30 group-hover:text-brand-orange transition-colors duration-500" />
              <div className="absolute -inset-8 bg-brand-orange/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           </motion.div>
        </div>

        {/* Hex Badge */}
        <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
           <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl border border-brand-orange/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <Hexagon className="text-brand-orange" size={14} />
           </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4">
        <Link href={productPath} className="block group/title">
          <div className="flex justify-between items-start mb-2">
             <div>
                <h3 className="text-xl font-bold text-brand-navy font-serif group-hover/title:text-brand-orange transition-colors mb-1">
                  {productData.name}
                </h3>
                <p className="text-[11px] font-bold text-brand-navy/30 uppercase tracking-tighter">Limited Series / Curator #0{id}</p>
             </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-xl font-black text-brand-navy font-sans tracking-tight">${productData.price.toFixed(2)}</span>
            <div className="h-4 w-[1px] bg-brand-navy/10"></div>
            <span className="text-[11px] font-black text-brand-orange uppercase tracking-[0.1em]">Ready to Post</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
