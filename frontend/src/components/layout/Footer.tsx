import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="hidden lg:block py-24 bg-brand-navy text-white px-6">
      <div className="container mx-auto grid md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6">
            <Image 
              src="/logo.webp" 
              alt="Baksho Logo" 
              width={120} 
              height={36} 
              className="h-10 w-auto object-contain filter brightness-0 invert" 
            />
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm">
            Redefining the shopping experience through premium aesthetics and meticulous hexagonal unboxing.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8 font-sans">Shop</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link href="#" className="hover:text-brand-orange transition-colors">New Arrivals</Link></li>
            <li><Link href="#" className="hover:text-brand-orange transition-colors">Best Sellers</Link></li>
            <li><Link href="#" className="hover:text-brand-orange transition-colors">Gift Boxes</Link></li>
          </ul>
        </div>

        <div>
           <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8 font-sans">Ritual Support</h4>
           <ul className="space-y-4 text-sm font-medium">
             <li><Link href="/track-order" className="hover:text-brand-orange transition-colors">Track Ritual</Link></li>
             <li><Link href="#" className="hover:text-brand-orange transition-colors">Returns & Refunds</Link></li>
             <li><Link href="#" className="hover:text-brand-orange transition-colors">Sanctuary Support</Link></li>
           </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-orange mb-8 font-sans">Newsletter</h4>
          <p className="text-white/40 text-xs mb-6 font-sans uppercase tracking-widest font-black">Join the Hexagon Revolution</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="YOUR@EMAIL.COM" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand-orange transition-colors text-xs font-bold"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-brand-orange text-white px-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all">
              JOIN
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
         <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">© 2026 BAKSHO E-COMMERCE BRAND.</p>
         <div className="flex gap-8">
            <Link href="#" className="text-[10px] text-white/20 hover:text-brand-orange font-black uppercase tracking-[0.2em] transition-colors">Terms of Service</Link>
            <Link href="#" className="text-[10px] text-white/20 hover:text-brand-orange font-black uppercase tracking-[0.2em] transition-colors">Privacy Policy</Link>
         </div>
      </div>
    </footer>
  );
}
