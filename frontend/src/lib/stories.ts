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
    title: "মিনিমালিজমের বিশেষ রিচুয়াল: প্রশান্তির জন্য আপনার ঘর সাজান",
    excerpt: "জানুন কীভাবে মিনিমালিস্ট ডিজাইনের মাধ্যমে আপনার ঘরের পরিবেশকে শান্তিময় স্বর্গের মতো করে তোলা সম্ভব।",
    date: "১২ এপ্রিল, ২০২৪",
    author: "এলেনা ভ্যান্স",
    readTime: "৬ মিনিটের পড়া",
    category: "দর্শন",
    coverImage: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
    content: "মিনিমালিজম মানে কেবল কম জিনিস থাকা নয়; এটি হলো আপনার প্রয়োজনীয় জিনিসগুলোর জন্য সঠিক স্থান তৈরি করা। আমাদের এই ফিচারে আমরা আলোচনা করেছি কীভাবে বাকশোর 'আনবক্সিং লাইফ' দর্শন মিনিমালিস্ট মুভমেন্টের সাথে মিলে যায়...",
    featuredProduct: {
        id: "p1",
        name: "মিনিমালিস্ট ওক বক্স",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
        price: 8900,
        slug: "minimalist-oak-box"
    }
  },
  {
    id: "s2",
    slug: "craftsmanship-of-patience",
    title: "কারুশিল্পের ধৈর্য: কেন ধীর উৎপাদন গুরুত্বপূর্ণ",
    excerpt: "তাত্ক্ষণিক চাহিদার এই যুগে, আমরা আপনাকে নিয়ে যাব সেই কারখানায় যেখানে প্রতিটি বাকশো পরম মমতায় তৈরি হয়।",
    date: "০৮ এপ্রিল, ২০২৪",
    author: "জুলিয়ান থর্ন",
    readTime: "৮ মিনিটের পড়া",
    category: "কারুশিল্প",
    coverImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop",
    content: "আমাদের কারিগররা একটি সিগনেচার বক্স তৈরি করতে ৪০ ঘণ্টারও বেশি সময় ব্যয় করেন। এটি শুরু হয় সঠিক কাঠ নির্বাচনের মাধ্যমে, যা পরিবেশবান্ধব বন থেকে সংগ্রহ করা হয়...",
  },
  {
    id: "s3",
    slug: "future-of-sustainable-boxing",
    title: "স্থায়িত্বই এখন নতুন বিলাসিতা",
    excerpt: "কীভাবে বাকশো আভিজাত্যের সাথে আপস না করেই পরিবেশবান্ধব প্রিমিয়াম প্যাকেজিংয়ের নেতৃত্ব দিচ্ছে।",
    date: "০২ এপ্রিল, ২০২৪",
    author: "সারা চেন",
    readTime: "৫ মিনিটের পড়া",
    category: "উদ্ভাবন",
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
    content: "বিলাসিতা মানে দীর্ঘকাল ধরে অতিরিক্ত কিছুকে বোঝানো হতো, কিন্তু বাকশোতে আমরা এটিকে সংজ্ঞায়িত করি আমাদের স্থায়িত্বের মাধ্যমে...",
  }
];
