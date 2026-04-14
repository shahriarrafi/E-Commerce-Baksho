
import { Laptop, Lamp, Package, Coffee, Briefcase, Camera, Music, WalletCards } from "lucide-react";
import Link from "next/link";

const SUB_CATEGORIES = [
  { id: 1, name: "টেক ভল্ট", icon: Laptop, count: 24, slug: "tech" },
  { id: 2, name: "লুমিনা", icon: Lamp, count: 18, slug: "lamps" },
  { id: 3, name: "বাকশো প্রো", icon: Package, count: 42, slug: "professional" },
  { id: 4, name: "রিচুয়ালস", icon: Coffee, count: 15, slug: "rituals" },
  { id: 5, name: "লেগাসি", icon: Briefcase, count: 31, slug: "legacy" },
  { id: 6, name: "ফোকাস", icon: Camera, count: 12, slug: "focus" },
  { id: 7, name: "পালস", icon: Music, count: 19, slug: "pulse" },
  { id: 8, name: "পকেট", icon: WalletCards, count: 26, slug: "pocket" },
];

export default function SubCategoryGrid() {
  return (
    <section className="py-16 bg-brand-cream/30 border-y border-brand-navy/5 font-hind">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-brand-orange tracking-[0.3em] font-black text-[10px] uppercase">
              <span className="w-8 h-[1px] bg-brand-orange" />
              অন্বেষণ
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-navy leading-tight">
              বিশেষত্ব <br />
              <span className="italic">অনুযায়ী কেনাকাটা।</span>
            </h2>
          </div>
          <p className="text-[10px] font-bold text-brand-navy/30 uppercase tracking-widest max-w-[200px]">৮টি বিশেষ ক্যাটাগরি রয়েছে</p>
        </div>

        {/* Minimal Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
          {SUB_CATEGORIES.map((sub) => (
            <div key={sub.slug}>
              <Link
                href={`/category/${sub.slug}`}
                className="group flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-[32px] border border-brand-orange/5 hover:border-brand-orange/30 hover:bg-brand-orange hover:shadow-2xl hover:shadow-brand-orange/20 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-brand-cream/50 rounded-2xl flex items-center justify-center text-brand-navy/40 group-hover:bg-white/20 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                  <sub.icon size={24} />
                </div>
                <div className="text-center group-hover:px-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy group-hover:text-white transition-colors">{sub.name}</h4>
                  <p className="text-[9px] mt-0.5 font-black text-brand-navy/20 group-hover:text-white/60 uppercase tracking-tighter">{sub.count} টি পণ্য</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
