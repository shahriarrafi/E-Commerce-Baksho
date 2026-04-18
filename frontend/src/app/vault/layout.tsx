"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight,
  LayoutDashboard
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !isAuthenticated) {
      router.push("/auth");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) return null;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "/vault" },
    { id: "orders", label: "History", icon: Package, href: "/vault/orders" },
    { id: "addresses", label: "Address", icon: MapPin, href: "/vault/addresses" },
    { id: "profile", label: "Identity", icon: Settings, href: "/vault/profile" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-brand-cream/30 pt-28 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-80 flex flex-col gap-6">
            <div className="bg-brand-navy rounded-3xl md:rounded-[40px] p-6 md:p-10 text-white shadow-2xl shadow-brand-navy/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <User size={60} />
               </div>
               <div className="relative z-10 flex items-center md:block gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-orange/20 border border-brand-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                     <span className="text-xl md:text-2xl font-black text-brand-orange">{user?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold font-anek md:mt-6 leading-tight">{user?.name}</h2>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Verified Member</p>
                  </div>
               </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block bg-white rounded-[40px] p-3 shadow-xl shadow-brand-navy/5 border border-brand-orange/5">
               {tabs.map((tab) => {
                 const isActive = pathname === tab.href;
                 return (
                   <Link
                      key={tab.id}
                      href={tab.href}
                      className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all group ${isActive ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "text-brand-navy/50 hover:bg-brand-cream/50"}`}
                   >
                      <div className="flex items-center gap-4">
                         <tab.icon size={18} className={isActive ? "text-white" : "text-brand-navy/30 group-hover:text-brand-orange transition-colors"} />
                         <span className="text-[10px] font-black uppercase tracking-widest font-noto">{tab.label}</span>
                      </div>
                      <ChevronRight size={14} className={`transition-transform ${isActive ? "translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                   </Link>
                 );
               })}
               <div className="h-[1px] bg-brand-navy/5 my-3" />
               <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-3xl text-brand-navy/40 hover:text-brand-orange transition-colors">
                  <LogOut size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest font-noto">Logout</span>
               </button>
            </nav>

            {/* Mobile Horizontal Navigation */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-2 p-1 bg-white rounded-2xl border border-brand-orange/10">
               {tabs.map((tab) => {
                 const isActive = pathname === tab.href;
                 return (
                   <Link
                      key={tab.id}
                      href={tab.href}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${isActive ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "text-brand-navy/40 bg-transparent"}`}
                   >
                      <tab.icon size={16} />
                      <span className="text-[9px] font-black uppercase tracking-widest font-noto">{tab.label}</span>
                   </Link>
                 );
               })}
            </div>
          </aside>

          {/* Main Sanctuary Content Area */}
          <main className="flex-1">
             <div className="bg-white rounded-3xl md:rounded-[45px] p-6 md:p-14 shadow-2xl shadow-brand-navy/5 border border-brand-orange/5 min-h-[400px] md:min-h-[600px]">
                {children}
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}
