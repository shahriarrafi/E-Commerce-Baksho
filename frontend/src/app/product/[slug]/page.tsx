import { MOCK_PRODUCT } from "@/lib/constants";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import StickyAddToCart from "@/components/product/StickyAddToCart";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Note: Using MOCK_PRODUCT for development as per Phase 2 requirements
  const product = MOCK_PRODUCT;

  return (
    <div className="min-h-screen bg-white">
      {/* Product Content Section */}
      <div className="container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
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
        name: product.name,
        price: product.price,
        image: product.images[0]
      }} />
    </div>
  );
}
