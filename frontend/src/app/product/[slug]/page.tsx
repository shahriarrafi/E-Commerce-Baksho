
import { Metadata } from "next";
import { api } from "@/lib/api";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
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
      {/* Product Content Section */}
      <div className="container mx-auto px-6 pb-16 md:pt-22 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: Image Gallery */}
          <div className="lg:sticky lg:top-32">
            <ProductGallery images={product.images} />
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col">
            <ProductInfo product={product} />

            {/* Elegant Divider */}
            <div className="w-full h-[1px] bg-brand-cream/50 my-10 md:my-12" />

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 italic font-serif">Brand Promise</h3>
              <p className="text-brand-navy/60 leading-relaxed font-light text-sm md:text-base">
                Our commitment to craftsmanship ensures that every Baksho product is a masterpiece of design and functionality. We prioritize sustainability and elegance in every detail.
              </p>
            </div>
          </div>
        </div>

        {/* Full Width Tabs Section */}
        <div className="mt-12 md:mt-20">
          <ProductTabs
            description={product.description}
            specifications={product.specifications}
            shippingInfo={product.shippingInfo}
          />
        </div>
      </div>

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
