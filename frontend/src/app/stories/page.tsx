import { MOCK_STORIES } from "@/lib/stories";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StoriesPage() {
  const featuredStory = MOCK_STORIES[0];
  const regularStories = MOCK_STORIES.slice(1);

  return (
    <main className="min-h-screen bg-white pb-32">
       {/* Hero Section */}
       <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
          <Image 
            src={featuredStory.coverImage}
            alt={featuredStory.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10 text-white max-w-5xl">
             <div className="flex flex-col gap-6 items-center text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                    Featured Ritual
                </span>
                <h1 className="text-5xl md:text-8xl font-serif leading-tight">
                    {featuredStory.title}
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
                    {featuredStory.excerpt}
                </p>
                <Link 
                    href={`/stories/${featuredStory.slug}`}
                    className="mt-4 bg-brand-orange text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all flex items-center gap-3 group"
                >
                    Begin Reading
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
             </div>
          </div>
       </section>

       {/* Story Grid */}
       <section className="container mx-auto px-6 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {regularStories.map((story) => (
                <Link 
                    key={story.id} 
                    href={`/stories/${story.slug}`}
                    className="group"
                >
                   <div className="flex flex-col gap-6">
                      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-navy/10">
                         <Image 
                            src={story.coverImage}
                            alt={story.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                         />
                         <div className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-md text-brand-navy px-4 py-2 rounded-xl">
                            {story.category}
                         </div>
                      </div>
                      <div className="space-y-3 px-2">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-navy/30">
                            <span>{story.date}</span>
                            <span>{story.readTime}</span>
                         </div>
                         <h2 className="text-3xl font-serif text-brand-navy group-hover:text-brand-orange transition-colors">
                            {story.title}
                         </h2>
                         <p className="text-brand-navy/50 leading-relaxed font-light">
                            {story.excerpt}
                         </p>
                         <div className="flex items-center gap-2 text-brand-orange font-black text-[10px] uppercase tracking-widest pt-2 group-hover:underline underline-offset-8">
                            Read Story <ArrowUpRight size={14} />
                         </div>
                      </div>
                   </div>
                </Link>
             ))}
          </div>
       </section>

       {/* Newsletter Ritual */}
       <section className="container mx-auto px-6 mt-32">
          <div className="bg-brand-cream/30 rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center gap-8 border border-brand-orange/5">
             <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center text-brand-orange shadow-xl shadow-brand-orange/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
             </div>
             <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-serif text-brand-navy">Join the Ritual</h3>
                <p className="text-brand-navy/40 max-w-md mx-auto leading-relaxed">
                    Receive weekly insights on minimalism, design, and exclusive unboxing experiences delivered to your inbox.
                </p>
             </div>
             <div className="w-full max-w-md flex flex-col md:flex-row gap-4">
                <input 
                    type="email" 
                    placeholder="Enter your ritual email..."
                    className="flex-1 bg-white border border-brand-cream/50 rounded-2xl px-6 py-4 outline-none focus:border-brand-orange transition-colors text-brand-navy font-bold text-sm"
                />
                <button className="bg-brand-navy text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-orange transition-all active:scale-95">
                    Subscribe
                </button>
             </div>
          </div>
       </section>
    </main>
  );
}
