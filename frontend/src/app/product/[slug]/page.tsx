import { Metadata } from "next";
import { apiFetch, getStorageUrl } from "@/lib/api";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ProductReviews from "@/components/product/ProductReviews";
import ProductFaq from "@/components/product/ProductFaq";
import ProductDelivery from "@/components/product/ProductDelivery";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyAddToCart from "@/components/product/StickyAddToCart";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const { data } = await apiFetch<{ data: any }>(`/products/${slug}`);
    return data;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Product Not Found | Baksho" };

  return {
    title: `${product.name} | Baksho`,
    description: product.description,
    openGraph: {
      images: [getStorageUrl(product.main_image)],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Pre-process images for gallery
  const galleryImages = [
    getStorageUrl(product.main_image),
    ...(product.gallery || []).map((img: any) => getStorageUrl(img.path || img))
  ];

  let reviewsData = { average_rating: 0, total_reviews: 0, reviews: [] };
  try {
    const response = await apiFetch<any>(`/products/${slug}/reviews`);
    if (response && typeof response === 'object') {
       reviewsData = {
         average_rating: response.average_rating || 0,
         total_reviews: response.total_reviews || 0,
         reviews: Array.isArray(response.reviews) ? response.reviews : []
       };
    }
  } catch (err) {
    console.error("Collective feedback ritual manifestation delayed:", err);
  }

  const reviewSlug = product.slug || slug;

  console.log("--- Server Side Product Ritual ---");
  console.log(`Unboxed Slug (Params): ${slug}`);
  console.log(`Product Identity Manifested (Keys):`, Object.keys(product || {}));
  console.log(`Product Slug Spirit: ${product?.slug}`);
  console.log(`Review Data Manifested Count:`, reviewsData.reviews?.length || 0);
  console.log(`Passing Props to ProductReviews - ID: ${product.id}, Slug: ${reviewSlug}`);
  console.log("----------------------------------");

  return (
    <div className="min-h-screen bg-white">
      {/* Product Discovery Section - The Grid */}
      <div className="container mx-auto px-6 pb-8 md:pt-16 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Column 1: Immersive Gallery (40%) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ProductGallery images={galleryImages} />
          </div>

          {/* Column 2: The Manifesto (40%) */}
          <div className="lg:col-span-4 flex flex-col pt-4 lg:pt-0">
            <ProductInfo product={product} />
          </div>

          {/* Column 3: Trust & Logistics Sidebar (20%) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <ProductDelivery />
          </div>
        </div>

        {/* Long-form Ritual Content - Handled by Tabs for scalability */}
        <div className="mt-12 md:mt-16 border-t border-brand-cream pt-12">
          <ProductTabs
            description={product.description}
            specifications={product.specifications || []}
            shippingInfo={product.shippingInfo}
          />
        </div>
      </div>

      {/* Standalone Reviews Section */}
      <ProductReviews 
        productId={product.id} 
        productSlug={reviewSlug} 
        collectiveFeedbackData={reviewsData} 
      />

      {/* Standalone FAQ Section */}
      <ProductFaq faqs={product.faqs || []} />

      {/* Discovery Feed - Related Products */}
      <RelatedProducts currentProductId={product.id} />

      {/* Sticky Bar */}
      <StickyAddToCart product={{
        id: product.id,
        name: product.name,
        price: product.price,
        image: getStorageUrl(product.main_image),
        slug: product.slug
      }} />
    </div>
  );
}
