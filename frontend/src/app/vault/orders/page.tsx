"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Loader2, 
  ShoppingBag,
  ExternalLink,
  Box,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { getStorageUrl } from "@/lib/api";

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
    slug: string;
  };
}

interface Order {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}

export default function VaultOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await apiFetch<any>("/orders");
        console.log("--- Order Manifestation Ritual ---");
        console.log("Raw Response Spirit:", response);
        
        // Resilient unboxing: Handle both direct arrays, paginated objects, and data-wrapped objects
        let manifestation = [];
        if (Array.isArray(response)) {
            manifestation = response;
        } else if (response && Array.isArray(response.data)) {
            manifestation = response.data;
        } else if (response && response.data) {
            // In case it's a single object in data for some reason
            manifestation = [response.data];
        }
        
        console.log("Unboxed Manifestation:", manifestation);
        setOrders(manifestation);
      } catch (err: any) {
        setError(err.message || "অর্ডার তথ্য পাওয়া যায়নি।");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
        <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 font-noto">অর্ডার ইতিহাস লোড হচ্ছে...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-24 text-center space-y-8 font-noto">
        <div className="w-24 h-24 bg-brand-cream/30 rounded-full flex items-center justify-center mx-auto text-brand-navy/10">
          <ShoppingBag size={48} />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-4xl font-bold font-anek text-brand-navy">এখনও কোনো অর্ডার নেই।</h2>
          <p className="text-sm text-brand-navy/40 max-w-xs mx-auto font-medium">আপনার প্রথম প্রিমিয়াম রিচুয়ালটি শুরু করতে কেনাকাটা পোর্টালে ফিরে যান।</p>
        </div>
        <Link href="/category/new-arrivals" className="inline-flex px-12 py-5 bg-brand-navy text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all shadow-xl shadow-brand-navy/10 active:scale-95">
           কেনাকাটা শুরু করুন
        </Link>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ordered': return { label: 'অর্ডার করা হয়েছে', color: 'text-blue-500 bg-blue-50', icon: <Package size={14} /> };
      case 'processing': return { label: 'প্রস্তুত হচ্ছে', color: 'text-brand-orange bg-brand-orange/5', icon: <Clock size={14} /> };
      case 'shipped': return { label: 'ডেলিভারিতে আছে', color: 'text-purple-500 bg-purple-50', icon: <Truck size={14} /> };
      case 'delivered': return { label: 'ডেলিভারি হয়েছে', color: 'text-green-600 bg-green-50', icon: <CheckCircle2 size={14} /> };
      default: return { label: status, color: 'text-brand-navy/40 bg-brand-cream/30', icon: <Box size={14} /> };
    }
  };

  return (
    <div className="space-y-10 font-noto">
      <div className="space-y-2">
         <h2 className="text-3xl md:text-5xl font-bold font-anek text-brand-navy lowercase">আপনার <span className="italic">ইতিহাস।</span></h2>
         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-navy/30">সংরক্ষিত এবং সম্পন্ন কৃত সকল রিচুয়াল</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order, i) => {
          const status = getStatusInfo(order.status);
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={order.id} 
              className="group bg-brand-cream/10 border border-brand-orange/5 rounded-[3rem] overflow-hidden hover:bg-white hover:shadow-2xl hover:shadow-brand-navy/5 transition-all duration-700"
            >
               <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                     <div className="flex flex-col gap-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30">অর্ডার নম্বর</span>
                        <h3 className="text-xl font-bold text-brand-navy font-sans tracking-tight">#{order.order_number}</h3>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${status.color}`}>
                           {status.icon}
                           {status.label}
                        </div>
                        <Link 
                          href={`/order/track/${order.order_number}`}
                          className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-brand-orange transition-colors"
                        >
                           ট্র্যাক <ExternalLink size={12} />
                        </Link>
                     </div>
                  </div>

                  <div className="min-h-[1px] bg-brand-orange/5 w-full mb-8" />

                  <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                     <div className="flex flex-wrap gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl overflow-hidden border border-brand-orange/10 group-hover:shadow-lg transition-all duration-700">
                             <Image 
                               src={getStorageUrl(item.product.image)} 
                               alt={item.product.name} 
                               fill 
                               className="object-cover"
                             />
                             <div className="absolute top-1 right-1 bg-brand-navy text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-lg shadow-lg">
                                {item.quantity}
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="flex flex-col items-end gap-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30">সর্বমোট প্রদেয়</span>
                        <p className="text-3xl font-black text-brand-navy font-anek">{formatPrice(order.total_amount)}</p>
                        <p className="text-[10px] font-bold text-brand-navy/20 uppercase tracking-widest">
                           {new Date(order.created_at).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                     </div>
                  </div>
               </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
