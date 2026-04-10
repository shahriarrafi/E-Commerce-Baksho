import { Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";

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
  
  const productData = { 
    id: id.toString(), 
    name: name || `Premium Product #${id}`, 
    price, 
    image, 
    slug 
  };

  return (
    <Link href={productPath} className="group block h-full">
      <div className="flex flex-col h-full bg-white rounded-2xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/5] bg-brand-cream rounded-2xl overflow-hidden border border-brand-navy/5 group-hover:shadow-md transition-shadow">
          <Image
            src={image}
            alt={productData.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Subtle Badge */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg border border-brand-navy/5 shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[8px] font-black uppercase tracking-widest text-brand-navy">Ready</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="pt-3 pb-1 flex flex-col flex-1">
          <h3 className="text-[10px] sm:text-xs font-bold text-brand-navy leading-snug line-clamp-2 mb-1.5 group-hover:text-brand-orange transition-colors">
            {productData.name}
          </h3>
          
          <div className="mt-auto flex flex-col gap-1.5">
            <span className="text-sm font-black text-brand-navy tracking-tight">
              {formatPrice(productData.price)}
            </span>
            
            <div className="flex items-center gap-1.5">
               <Package size={10} className="text-brand-orange" />
               <span className="text-[9px] font-bold text-brand-navy/40 uppercase tracking-tighter italic">Ships in 24-48h</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
