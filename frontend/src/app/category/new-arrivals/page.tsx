import { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import CategoryPageClient from "@/components/category/CategoryPageClient";
import CategoryHeader from "@/components/category/CategoryHeader";

export const metadata: Metadata = {
  title: "নতুন অফার ও কালেকশন | বাকশো",
  description: "বাকশো-এর সর্বশেষ প্রিমিয়াম কালেকশন এবং নতুন অফারগুলো দেখুন এখানে।",
};

export default async function NewArrivalsPage() {
  // Use the specialized ritual portal for new manifestations
  const { data: products, meta } = await apiFetch<{ data: any[], meta: any }>("/new-arrivals", {
    params: { brief: 1 }
  });

  return (
    <CategoryPageClient 
      initialProducts={products} 
      initialMeta={meta}
      apiUrl="/new-arrivals"
    >
      <CategoryHeader 
        currentCategory="নতুন কালেকশন" 
        categoryPath="হোম / নতুন কালেকশন"
      />
    </CategoryPageClient>
  );
}
