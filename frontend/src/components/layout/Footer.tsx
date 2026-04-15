import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="hidden lg:block py-24 bg-brand-navy text-white px-6">
      <div className="container mx-auto grid md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6">
            <Link href="/">
              <Image 
                src="/Logo.webp" 
                alt="Baksho Logo" 
                width={120} 
                height={36} 
                className="h-10 w-auto object-contain filter brightness-0 invert" 
              />
            </Link>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm font-anek">
            প্রিমিয়াম ই-কমার্স অভিজ্ঞতা এবং দৃষ্টিনন্দন ‘হেক্সাগোনাল আনবক্সিং’-এর মাধ্যমে কেনাকাটার সংজ্ঞাকে নতুন করে সাজানো।
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8 font-sans">কেনাকাটা</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="hover:text-brand-orange transition-colors font-hind">নতুন কালেকশন</Link></li>
            <li><Link href="#" className="hover:text-brand-orange transition-colors font-hind">সেরা বিক্রিত</Link></li>
            <li><Link href="#" className="hover:text-brand-orange transition-colors font-hind">উপহার বক্স</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8 font-sans">সহযোগিতা</h4>
           <ul className="space-y-4 text-sm font-medium">
             <li><Link href="/track-order" className="hover:text-brand-orange transition-colors font-hind">অর্ডার ট্র্যাকিং</Link></li>
             <li><Link href="#" className="hover:text-brand-orange transition-colors font-hind">রিটার্ন ও রিফান্ড</Link></li>
             <li><Link href="#" className="hover:text-brand-orange transition-colors font-hind">সহযোগিতা কেন্দ্র</Link></li>
           </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8 font-sans">নিউজলেটার</h4>
          <p className="text-white/40 text-xs mb-6 font-sans uppercase tracking-widest font-black font-hind">আমাদের নতুন আপডেট পেতে যুক্ত হোন</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="আপনার ইমেইল" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-orange transition-colors text-xs font-bold"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-brand-orange text-white px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all font-hind font-black">
              যুক্ত হোন
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em] font-hind">© ২০২৬ বাকশো ই-কমার্স ব্র্যান্ড। সর্বস্বত্ব সংরক্ষিত।</p>
         <div className="flex gap-8">
            <Link href="#" className="text-[10px] text-white/20 hover:text-brand-orange font-black uppercase tracking-[0.2em] transition-colors font-hind">শর্তাবলী</Link>
            <Link href="#" className="text-[10px] text-white/20 hover:text-brand-orange font-black uppercase tracking-[0.2em] transition-colors font-hind">প্রাইভেসি পলিসি</Link>
         </div>
      </div>
    </footer>
  );
}
