export interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[];
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    children: [
      {
        id: '1-1',
        name: 'Laptops',
        slug: 'laptops',
        children: [
          { id: '1-1-1', name: 'Gaming', slug: 'gaming' },
          { id: '1-1-2', name: 'Ultrabooks', slug: 'ultrabooks' },
        ],
      },
      { id: '1-2', name: 'Accessories', slug: 'accessories' },
    ],
  },
  {
    id: '2',
    name: 'Lifestyle',
    slug: 'lifestyle',
    children: [
      { id: '2-1', name: 'Home Decor', slug: 'home-decor' },
      { id: '2-2', name: 'Premium Boxes', slug: 'premium-boxes' },
    ],
  },
  {
    id: '3',
    name: 'New Arrivals',
    slug: 'new-arrivals',
  },
];

export const MOCK_PRODUCT = {
  id: "p1",
  name: "The Signature Baksho Box",
  slug: "signature-baksho-box",
  price: 129.00,
  description: "Crafted from sustainable materials, our Signature Box is more than just packaging—it's an experience. Designed to protect your most precious items while adding a touch of elegance to your home.",
  images: [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607344645866-009c323b63e0?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
  ],
  category: "Premium Boxes",
  specifications: [
    { label: "Material", value: "Recycled Wood & Velvet" },
    { label: "Dimensions", value: "24cm x 24cm x 12cm" },
    { label: "Weight", value: "1.2kg" },
    { label: "Finish", value: "Matte Walnut" }
  ],
  shippingInfo: "Free express shipping on all orders over $100. Standard shipping takes 3-5 business days. International shipping available."
};
