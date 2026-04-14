
import { ArrowUpRight, Hexagon, Sparkles, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const COLLECTIONS = [
  {
    title: "নতুন কালেকশন",
    desc: "সামার ২০২৪ কালেকশন",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
    slug: "new-arrivals",
    icon: Sparkles,
    size: "large",
  },
  {
    title: "সেরা বিক্রিত",
    desc: "আনবক্সিং-এ গ্রাহকদের সেরা পছন্দ",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    slug: "best-sellers",
    icon: Trophy,
    size: "medium",
  },
  {
    title: "এক্সক্লুসিভ বক্স",
    desc: "লিমিটেড সিরিজ #০০১",
    image: "https://images.unsplash.com/photo-1607344645866-009c323b63e0?q=80&w=2080&auto=format&fit=crop",
    slug: "exclusive-boxes",
    icon: TrendingUp,
    size: "medium",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-16 bg-brand-cream relative overflow-hidden">
      {/* Hexagonal Background Motif */}
      <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none">
        <Hexagon size={400} fill="currentColor" className="text-brand-orange" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-center md:text-left">
          <div className="space-y-3">
             <div className="flex items-center justify-center md:justify-start gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase font-hind">
                <span className="w-8 h-[1px] bg-brand-orange" />
                সেরা কালেকশন
             </div>
             <h2 className="text-3xl md:text-4xl font-serif text-brand-navy leading-tight">
                নির্বাচিত <br />
                <span className="italic">কালেকশনসমূহ।</span>
             </h2>
          </div>
          <Link href="/shop" className="group flex items-center justify-center md:justify-start gap-3 text-[10px] font-black uppercase tracking-widest text-brand-navy/60 hover:text-brand-orange transition-colors font-hind">
            সব ক্যাটাগরি দেখুন
            <div className="w-8 h-8 rounded-full border border-brand-navy/10 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all">
               <ArrowUpRight size={14} />
            </div>
          </Link>
        </div>

        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px] md:auto-rows-[280px]">
          {COLLECTIONS.map((col, i) => (
            <div
              key={col.slug}
              className={`group relative rounded-[35px] overflow-hidden border border-brand-orange/5 transition-all duration-500 hover:shadow-xl ${col.size === "large" ? "md:row-span-2" : ""}`}
            >
              {/* Image with Zoom Effect */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={col.image} 
                  alt={col.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                 <div className="mb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                       <col.icon size={20} />
                    </div>
                 </div>
                 
                 <div className="space-y-1">
                    <h3 className="text-2xl font-serif text-white">{col.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50 font-hind">{col.desc}</p>
                 </div>

                 <Link 
                   href={`/category/${col.slug}`}
                   className="mt-6 px-5 py-2.5 bg-white text-brand-navy rounded-xl text-[9px] font-black uppercase tracking-widest w-fit opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:bg-brand-orange hover:text-white font-hind"
                 >
                   সংগ্রহটি দেখুন
                 </Link>
              </div>

              {/* Decorative Hexagon */}
              <div className="absolute top-6 right-6 text-brand-orange/20 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform group-hover:rotate-45">
                 <Hexagon size={50} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
