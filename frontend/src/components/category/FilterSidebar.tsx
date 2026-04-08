"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, Hexagon } from "lucide-react";

const FILTERS = [
  {
    id: "price",
    name: "Price Range",
    options: ["Under $50", "$50 - $100", "$100 - $500", "$500+"],
  },
  {
    id: "size",
    name: "Package Size",
    options: ["Small (Hex1)", "Medium (Hex2)", "Large (Hex3)", "Extra Large (Hex4)"],
  },
  {
    id: "brand",
    name: "Brand Curator",
    options: ["Baksho Originals", "TechArt", "Minimalia", "EcoHex"],
  },
];

export default function FilterSidebar() {
  const [openSections, setOpenSections] = useState<string[]>(["price", "size"]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-32 space-y-8">
        <div className="flex items-center justify-between mb-8 pr-4">
          <div className="flex items-center gap-3">
             <SlidersHorizontal className="text-brand-orange" size={20} />
             <h2 className="text-sm font-black uppercase tracking-widest text-brand-navy">Filters</h2>
          </div>
          <button className="text-[10px] font-bold text-brand-orange hover:underline uppercase tracking-tighter">Clear</button>
        </div>

        {FILTERS.map((section) => (
          <div key={section.id} className="border-b border-brand-cream pb-6 overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between text-[11px] font-black uppercase tracking-[0.15em] text-brand-navy py-2 group"
            >
              {section.name}
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-500 ease-in-out ${openSections.includes(section.id) ? "rotate-180" : ""}`} 
              />
            </button>
            
            <div 
              className={`transition-all duration-500 ease-in-out ${
                openSections.includes(section.id) ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-3.5">
                {section.options.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="w-5 h-5 border border-brand-navy/10 rounded-[6px] group-hover:border-brand-orange transition-all peer-checked:bg-brand-orange peer-checked:border-brand-orange peer-checked:scale-110" />
                      <Hexagon className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity scale-50" size={16} fill="white" />
                    </div>
                    <span className="text-[13px] text-brand-navy/60 group-hover:text-brand-navy transition-colors font-medium">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Brand Motif in Sidebar */}
        <div className="bg-brand-cream/50 rounded-3xl p-6 border border-brand-orange/5">
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <Hexagon className="text-brand-orange" size={20} />
           </div>
           <h4 className="text-sm font-bold text-brand-navy mb-2">Baksho Guarantee</h4>
           <p className="text-[11px] text-brand-navy/50 leading-relaxed uppercase tracking-tighter font-black">
             Premium unboxing experience guaranteed with every collection.
           </p>
        </div>
      </div>
    </aside>
  );
}
