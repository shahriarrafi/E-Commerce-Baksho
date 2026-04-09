export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  featuredProduct?: {
      id: string;
      name: string;
      image: string;
      price: number;
      slug: string;
  };
}

export const MOCK_STORIES: Story[] = [
  {
    id: "s1",
    slug: "ritual-of-minimalism",
    title: "The Ritual of Minimalism: Designing Your Space for Serenity",
    excerpt: "Discover how the art of subtractive design can transform your living environment into a sanctuary of peace.",
    date: "April 12, 2026",
    author: "Elena Vance",
    readTime: "6 min read",
    category: "Philosophy",
    coverImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
    content: "Minimalism is not about having less; it's about making room for more of what matters. In this editorial, we explore how Baksho's philosophy of 'Unboxing Life' aligns with the minimalist movement...",
    featuredProduct: {
        id: "p1",
        name: "Minimalist Oak Box",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
        price: 89,
        slug: "minimalist-oak-box"
    }
  },
  {
    id: "s2",
    slug: "craftsmanship-of-patience",
    title: "The Patience of Craft: Why Slow Production Matters",
    excerpt: "In a world of fast fashion and instant gratification, we dive deep into the workshop where every Baksho is made.",
    date: "April 08, 2026",
    author: "Julian Thorne",
    readTime: "8 min read",
    category: "Craftsmanship",
    coverImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop",
    content: "Our artisans spend upwards of 40 hours on a single Signature Box. It starts with the selection of the wood—sourced from sustainable forests...",
  },
  {
    id: "s3",
    slug: "future-of-sustainable-boxing",
    title: "Sustainability is the New Luxury",
    excerpt: "How Baksho is leading the charge in eco-friendly premium packaging without compromising on elegance.",
    date: "April 02, 2026",
    author: "Sarah Chen",
    readTime: "5 min read",
    category: "Innovation",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    content: "Luxury has long been associated with excess, but at Baksho, we define it by the footprint we leave behind...",
  }
];
