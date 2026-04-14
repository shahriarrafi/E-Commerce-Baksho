
import { Metadata } from "next";
import { api } from "@/lib/api";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ProductReviews from "@/components/product/ProductReviews";
import ProductFaq from "@/components/product/ProductFaq";
import ProductDelivery from "@/components/product/ProductDelivery";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyAddToCart from "@/components/product/StickyAddToCart";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await api.products.getBySlug(slug);

  return {
    title: `${product.name} | Baksho`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await api.products.getBySlug(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Product Discovery Section - The Grid */}
      <div className="container mx-auto px-6 pb-8 md:pt-16 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Column 1: Immersive Gallery (40%) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ProductGallery images={product.images} />
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
            specifications={product.specifications}
            shippingInfo={product.shippingInfo}
          />
        </div>
      </div>

      {/* Standalone Reviews Section */}
      <ProductReviews reviews={product.reviews || []} />

      {/* Standalone FAQ Section */}
      <ProductFaq faqs={product.faqs || []} />

      {/* Discovery Feed - Related Products */}
      <RelatedProducts currentProductId={product.id} />

      {/* Sticky Bar */}
      <StickyAddToCart product={{
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug
      }} />
    </div>
  );
}
