"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full max-h-[600px]">
      {/* Thumbnails - Vertical Filmstrip on Desktop */}
      <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 shrink-0">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative min-w-[70px] md:min-w-0 aspect-[4/5] md:aspect-square rounded-xl overflow-hidden border-2 transition-all duration-500 ${
              currentIndex === index 
                ? "border-brand-orange scale-95 shadow-lg shadow-brand-orange/10" 
                : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
            }`}
          >
            <Image
              src={image}
              alt={`View ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image - The Aperitif */}
      <div className="order-1 md:order-2 flex-1 relative aspect-[4/5] rounded-[32px] overflow-hidden bg-brand-cream/20 group border border-brand-orange/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={images[currentIndex]}
              fill
              priority
              className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/20 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
          <button
            onClick={prevImage}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white backdrop-blur-xl flex items-center justify-center text-brand-navy pointer-events-auto transition-all shadow-xl active:scale-90 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white backdrop-blur-xl flex items-center justify-center text-brand-navy pointer-events-auto transition-all shadow-xl active:scale-90 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Cinematic Badge */}
        <div className="absolute bottom-6 left-6 flex items-center gap-3">
           <div className="px-3 py-1.5 rounded-full bg-brand-navy/80 backdrop-blur-md text-white border border-white/10 flex items-center gap-2">
              <span className="text-[8px] font-black uppercase tracking-widest">{currentIndex + 1}</span>
              <div className="w-[1px] h-3 bg-white/20" />
              <span className="text-[8px] font-black uppercase tracking-widest opacity-40">{images.length}</span>
           </div>
        </div>
      </div>
    </div>
  );
}
