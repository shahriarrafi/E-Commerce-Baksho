import { Metadata } from "next";
import { apiFetch } from "@/lib/api";
import CategoryPageClient from "@/components/category/CategoryPageClient";

export const metadata: Metadata = {
  title: "নতুন অফার ও কালেকশন | বাকশো",
  description: "বাকশো-এর সর্বশেষ প্রিমিয়াম কালেকশন এবং নতুন অফারগুলো দেখুন এখানে।",
};

export default async function NewArrivalsPage() {
  // Use the specialized ritual portal for new manifestations
  const { data: products } = await apiFetch<{ data: any[] }>("/new-arrivals");

  return (
    <CategoryPageClient 
      initialProducts={products} 
      currentCategory="নতুন কালেকশন" 
      categoryPath="হোম / নতুন কালেকশন"
    />
  );
}
