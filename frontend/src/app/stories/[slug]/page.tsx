import { MOCK_STORIES } from "@/lib/stories";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ShoppingCart } from "lucide-react";

export default async function StoryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = MOCK_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="relative h-[60vh] md:h-[70vh] w-full pt-32 px-6">
        <div className="container mx-auto max-w-4xl h-full flex flex-col justify-end pb-12">
            <Link 
                href="/stories" 
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-orange transition-colors mb-8 font-hind"
            >
                <ArrowLeft size={14} /> স্টোরিসে ফিরুন
            </Link>
            <div className="space-y-6">
                <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                    {story.category}
                </span>
                <h1 className="text-4xl md:text-7xl font-serif text-brand-navy leading-tight">
                    {story.title}
                </h1>
                <div className="flex items-center gap-6 pt-4 border-t border-brand-cream text-[10px] font-black uppercase tracking-widest text-brand-navy/30">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-brand-cream border border-brand-orange/10" />
                         <span>{story.author}</span>
                    </div>
                    <span>{story.date}</span>
                    <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{story.readTime}</span>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-4xl pb-32">
        <div className="relative aspect-video rounded-[3rem] overflow-hidden mb-16 shadow-2xl shadow-brand-navy/10">
            <Image 
                src={story.coverImage} 
                alt={story.title}
                fill
                className="object-cover"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 font-hind">
                <div className="prose prose-xl prose-brand max-w-none font-serif text-brand-navy/80 leading-relaxed space-y-8">
                    <p className="text-2xl font-light italic text-brand-navy leading-relaxed mb-12">
                        {story.excerpt}
                    </p>
                    <p>{story.content}</p>
                    <p>
                        কেবলমাত্র বাহ্যিক সৌন্দর্য নয়, একটি বাকশোর প্রকৃত মূল্য লুকিয়ে থাকে এর পেছনের উদ্দেশ্যের মধ্যে। 
                        এটি স্মৃতির একটি আধার, সৌন্দর্যের রক্ষক এবং এই ডিজিটাল যুগে আপনার ব্যক্তিত্বের এক অনন্য প্রকাশ।
                    </p>
                    <div className="h-[2px] w-24 bg-brand-orange/20 my-16" />
                    <p>
                        ২০২৪ সাল যত এগিয়ে চলেছে, আমাদের জাগতিক এবং ডিজিটাল অস্তিত্বের সীমা তত বেশি বিলীন হচ্ছে। 
                        তবুও, বাস্তব কোনো কিছু আনবক্সিং করার আনন্দ এখনও অপরিবর্তিত। এটি একটি স্পর্শকাতর রিচুয়াল যা আমাদের স্থায়িত্বের অনুভূতি দেয়।
                    </p>
                </div>
            </div>

            {/* Featured Product Sidebar */}
            {story.featuredProduct && (
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit font-hind">
                    <div className="bg-brand-cream/20 rounded-[2.5rem] p-8 border border-brand-orange/10 shadow-xl shadow-brand-navy/5">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 mb-6 flex items-center gap-2">
                             <ShoppingCart size={12} /> আর্টিকেলে উল্লিখিত
                        </h4>
                        <div className="space-y-6">
                            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-brand-orange/10">
                                <Image 
                                    src={story.featuredProduct.image}
                                    alt={story.featuredProduct.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <h5 className="text-xl font-serif text-brand-navy font-bold leading-tight">
                                        {story.featuredProduct.name}
                                    </h5>
                                    <p className="text-xl font-black tracking-tighter text-brand-orange">
                                        {story.featuredProduct.price}৳
                                    </p>
                                </div>
                                <Link 
                                    href={`/product/${story.featuredProduct.slug}`}
                                    className="w-full bg-brand-navy text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-orange transition-all active:scale-[0.98]"
                                >
                                    বিস্তারিত দেখুন
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </article>
  );
}
