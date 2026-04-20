import Link from "next/link";
import { MESSAGES } from "@/constants/messages";

interface CategoryHeaderProps {
  categoryPath: string;
  currentCategory: string;
}

export default function CategoryHeader({ categoryPath, currentCategory }: CategoryHeaderProps) {
  return (
    <>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-navy/30 mb-8 font-hind">
        <Link href="/" className="hover:text-brand-orange transition-colors">{MESSAGES.HOME}</Link>
        <span>/</span>
        <span>{MESSAGES.CATEGORY}</span>
        <span>/</span>
        <span className="text-brand-orange">{categoryPath}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 font-hind">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-brand-navy mb-4 capitalize tracking-tight">
            {currentCategory}
          </h1>
          <div className="w-16 h-1.5 bg-brand-orange mb-6 rounded-full"></div>
          <p className="text-brand-navy/60 max-w-2xl font-sans text-base md:text-lg leading-relaxed">
            {MESSAGES.CATEGORY_DESC_PREFIX}
            <span className="text-brand-navy font-black italic">{currentCategory}</span>
            {MESSAGES.CATEGORY_DESC_SUFFIX}
          </p>
        </div>
      </div>
    </>
  );
}
