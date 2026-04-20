import { Metadata } from "next";
import CategoryPageClient from "@/components/category/CategoryPageClient";
import CategoryHeader from "@/components/category/CategoryHeader";
import { apiFetch } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const currentCategory = slug[slug.length - 1].replace(/-/g, ' ');
  
  return {
    title: `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} | Baksho Collection`,
    description: `Explore our curated selection of ${currentCategory} at Baksho. Premium hexagonal unboxing guaranteed.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const lastSlug = slug[slug.length - 1];
  
  // Fetch live products for this category manifestation
  let results = [];
  let meta = null;
  try {
    const response = await apiFetch<{ data: any[], meta: any }>("/products", {
      params: { category: lastSlug, brief: 1 }
    });
    results = response.data;
    meta = response.meta;
  } catch (err) {
    console.error("Category discovery failed:", err);
  }
  
  const categoryPath = slug.map(s => s.replace(/-/g, ' ')).join(" / ");
  const currentCategory = slug[slug.length - 1].replace(/-/g, ' ');

  return (
    <CategoryPageClient 
      initialProducts={results}
      initialMeta={meta}
      categorySlug={lastSlug}
    >
      <CategoryHeader 
        categoryPath={categoryPath} 
        currentCategory={currentCategory} 
      />
    </CategoryPageClient>
  );
}
