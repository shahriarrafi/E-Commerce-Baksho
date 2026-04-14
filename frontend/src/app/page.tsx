"use client";
import React from "react";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import SubCategoryGrid from "@/components/home/SubCategoryGrid";
import SocialProof from "@/components/home/SocialProof";
import Hero from "@/components/home/Hero";
import FAQ from "@/components/home/FAQ";

export default function Home() {
   return (
      <div className="flex flex-col min-h-screen">
         <Hero />
         <FeaturedCollections />
         <TrendingCarousel />
         <SubCategoryGrid />
         <SocialProof />
         <FAQ />
      </div>
   );
}
