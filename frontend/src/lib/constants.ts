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
  inStock: true,
  description: "Crafted from sustainable materials, our Signature Box is more than just packaging—it's an experience. Designed to protect your most precious items while adding a touch of elegance to your home.",
  images: [
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607344645866-009c323b63e0?q=80&w=2080&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
  ],
  category: "Premium Boxes",
  variants: [
    { type: "Finish", options: ["Matte Walnut", "Polished Oak", "Midnight Ebony"] },
    { type: "Size", options: ["Standard", "Grande", "Architect"] }
  ],
  specifications: [
    { label: "Material", value: "Recycled Wood & Velvet" },
    { label: "Dimensions", value: "24cm x 24cm x 12cm" },
    { label: "Weight", value: "1.2kg" },
    { label: "Finish", value: "Matte Walnut" }
  ],
  shippingInfo: "Free express shipping on all orders over $100. Standard shipping takes 3-5 business days. International shipping available.",
  faqs: [
    { q: "Is the lining removable?", a: "Yes, the velvet interior is designed to be swapped or removed for deep cleaning." },
    { q: "Can I order custom engraving?", a: "Custom engravings can be added during the checkout ritual for a small fee." }
  ],
  reviews: [
    { author: "Zian Ahmed", rating: 5, comment: "The unboxing experience was truly cinematic. The box itself is a work of art.", date: "Oct 12, 2023" },
    { author: "Nora Fatehi", rating: 5, comment: "Exceeded my expectations. The polished oak finish is stunning.", date: "Oct 10, 2023" },
    { author: "Zahir Ahmed", rating: 5, comment: "The material quality is beyond expectations. Best purchase this year.", date: "Oct 08, 2023" },
    { author: "Nusrat Jahan", rating: 4, comment: "Actually very comfortable for long hours. Recommending to my colleagues.", date: "Oct 05, 2023" },
    { author: "Tanvir Hossain", rating: 5, comment: "Premium packaging and fast delivery. Baksho never disappoints.", date: "Oct 01, 2023" },
    { author: "Arifur Rahman", rating: 5, comment: "A masterpiece of design. Fits perfectly as per the size chart.", date: "Sep 28, 2023" },
    { author: "Mariya Karim", rating: 5, comment: "Loved the attention to detail in the stitching. Very satisfied.", date: "Sep 25, 2023" },
    { author: "Sabbir Khan", rating: 4, comment: "Slightly tighter on shoulders but the fabric is amazing.", date: "Sep 20, 2023" },
    { author: "Farhana Mili", rating: 5, comment: "Better than international brands. Proud of this local quality.", date: "Sep 15, 2023" },
    { author: "Rahat Kabir", rating: 5, comment: "Perfect for formal occasions. The texture feels very high-end.", date: "Sep 10, 2023" }
  ]
};
