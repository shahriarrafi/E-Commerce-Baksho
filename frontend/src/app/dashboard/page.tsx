"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Clock, 
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  ShieldCheck,
  Wallet
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

type Tab = "overview" | "orders" | "addresses" | "settings";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "History", icon: Package },
    { id: "addresses", label: "Address", icon: MapPin },
    { id: "settings", label: "Identity", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-cream/30 pt-28 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          
          {/* Sidebar / Mobile Nav */}
          <aside className="lg:w-80 flex flex-col gap-6">
            {/* User Profile Card - Compact on mobile */}
            <div className="bg-brand-navy rounded-3xl md:rounded-[40px] p-6 md:p-10 text-white shadow-2xl shadow-brand-navy/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                  <User size={60} md-size={80} />
               </div>
               <div className="relative z-10 flex items-center md:block gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-orange/20 border border-brand-orange/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                     <span className="text-xl md:text-2xl font-black text-brand-orange">{user?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold md:mt-6">{user?.name}</h2>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Verified Member</p>
                  </div>
               </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block bg-white rounded-[40px] p-3 shadow-xl shadow-brand-navy/5 border border-brand-orange/5">
               {tabs.map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all group ${activeTab === tab.id ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "text-brand-navy/50 hover:bg-brand-cream/50"}`}
                 >
                    <div className="flex items-center gap-4">
                       <tab.icon size={18} className={activeTab === tab.id ? "text-white" : "text-brand-navy/30 group-hover:text-brand-orange transition-colors"} />
                       <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                    </div>
                    <ChevronRight size={14} className={`transition-transform ${activeTab === tab.id ? "translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"}`} />
                 </button>
               ))}
               <div className="h-[1px] bg-brand-navy/5 my-3" />
               <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-3xl text-brand-navy/40 hover:text-brand-orange transition-colors">
                  <LogOut size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
               </button>
            </nav>

            {/* Mobile Horizontal Navigation */}
            <div className="lg:hidden flex overflow-x-auto no-scrollbar gap-2 p-1 bg-white rounded-2xl border border-brand-orange/10">
               {tabs.map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "text-brand-navy/40 bg-transparent"}`}
                 >
                    <tab.icon size={16} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                 </button>
               ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
             <div className="bg-white rounded-3xl md:rounded-[45px] p-6 md:p-14 shadow-2xl shadow-brand-navy/5 border border-brand-orange/5 min-h-[400px] md:min-h-[600px]">
                {activeTab === "overview" && <Overview user={user} />}
                {activeTab === "orders" && <Orders />}
                {activeTab === "addresses" && <Addresses />}
                {activeTab === "settings" && <SettingsView user={user} />}
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Overview({ user }: any) {
  const stats = [
    { label: "Ritual Score", value: "2,840", icon: ShieldCheck, color: "text-brand-orange", desc: "Expert Curator" },
    { label: "The Collection", value: "08", icon: Package, color: "text-brand-navy", desc: "Unboxed Pieces" },
    { label: "Vault Credit", value: "$120", icon: Wallet, color: "text-brand-orange", desc: "Available Rituals" },
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-serif text-brand-navy leading-tight">Welcome back to <span className="text-brand-orange italic">The Vault.</span></h1>
            <p className="text-[11px] text-brand-navy/40 uppercase font-black tracking-[0.3em] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Secure Connection Established
            </p>
          </div>
          <div className="flex gap-2">
             <div className="px-5 py-3 bg-brand-navy text-white rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest">Ritual Tier: Elite</span>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
         {stats.map((stat, i) => (
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             key={stat.label} 
             className="bg-white border border-brand-orange/5 p-8 md:p-10 rounded-[3rem] flex flex-col gap-6 group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-700 relative overflow-hidden"
           >
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                  <stat.icon size={120} />
              </div>
              <div className={`w-14 h-14 bg-brand-cream/50 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${stat.color}`}>
                 <stat.icon size={28} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/30 mb-2">{stat.label}</p>
                 <p className="text-4xl font-black text-brand-navy tracking-tighter mb-1">{stat.value}</p>
                 <p className="text-[10px] font-bold text-brand-orange uppercase italic">{stat.desc}</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Featured Vault Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                  <Package size={140} />
              </div>
              <div className="relative z-10 space-y-6">
                <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/10 italic">Your Next Unboxing</span>
                <h3 className="text-4xl font-serif">Curated for Your Space.</h3>
                <p className="text-sm text-white/50 max-w-xs leading-relaxed">Based on your recent rituals, we've set aside a special piece in our workshop just for you.</p>
                <button className="bg-brand-orange text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-all active:scale-95">
                    View Private Offer
                </button>
              </div>
          </div>

          <div className="bg-brand-cream/30 rounded-[3rem] p-10 border border-brand-orange/5 flex flex-col justify-between items-start group">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Clock className="text-brand-orange" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Recent History</span>
                </div>
                <h3 className="text-3xl font-serif text-brand-navy">Ritual Log</h3>
                <div className="space-y-3 mt-6">
                   {[
                       { event: "Package Delivered", time: "2 hours ago", icon: "✓" },
                       { event: "Score Updated", time: "Yesterday", icon: "+" }
                   ].map((item) => (
                       <div key={item.event} className="flex items-center gap-4 text-xs font-bold text-brand-navy/60 group-hover:translate-x-1 transition-transform">
                           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-[10px] text-brand-orange shadow-sm font-black">{item.icon}</div>
                           <span>{item.event}</span>
                           <span className="text-[10px] text-brand-navy/20 uppercase font-black ml-auto">{item.time}</span>
                       </div>
                   ))}
                </div>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-brand-orange border-b-2 border-brand-orange pb-1 mt-8 hover:translate-x-2 transition-transform">
                View Full Dossier
             </button>
          </div>
      </div>
    </div>
  );
}



function Orders() {
  const dummyOrders = [
    { id: "BK-99023", date: "Now 12, 2023", total: 199.00, status: "Shipped", items: 2 },
    { id: "BK-88120", date: "Oct 28, 2023", total: 320.50, status: "Processing", items: 4 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl md:text-3xl font-serif text-brand-navy">Identity Logs</h2>
      </div>

      <div className="space-y-3">
         {dummyOrders.map((order) => (
           <div key={order.id} className="bg-white border border-brand-orange/5 p-4 md:p-8 rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 group hover:bg-brand-cream/20 transition-all duration-500 shadow-sm">
              <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto">
                 <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-navy rounded-2xl md:rounded-3xl flex items-center justify-center text-brand-orange flex-shrink-0">
                    <Package size={24} md-size={28} />
                 </div>
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-bold text-brand-navy text-sm md:text-base">{order.id}</h4>
                       <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest ${order.status === "Shipped" ? "bg-green-100 text-green-600" : "bg-brand-orange/10 text-brand-orange"}`}>
                          {order.status}
                       </span>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-navy/30">
                       {order.date} • {order.items} Items
                    </p>
                 </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-6 md:gap-10 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-brand-cream/50">
                 <div className="md:text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-navy/30">Total Amount</p>
                    <p className="text-lg font-black text-brand-navy">${order.total.toFixed(2)}</p>
                 </div>
                 <button className="p-3 md:p-4 bg-brand-navy text-white rounded-xl md:rounded-2xl hover:bg-brand-orange transition-colors">
                    <ChevronRight size={18} />
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

function Addresses() {
  const [addresses] = useState([
    { id: 1, name: "Home Portfolio", address: "1/A, Banani, Block-E", city: "Dhaka", phone: "+88017XXXXXXXX" }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl md:text-3xl font-serif text-brand-navy">Vault Addresses</h2>
         <button className="flex items-center gap-2 px-5 py-3 bg-brand-navy text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all">
            <Plus size={14} /> Add
         </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         {addresses.map((addr) => (
           <div key={addr.id} className="bg-brand-cream/30 border border-brand-orange/5 p-5 md:p-8 rounded-[30px] relative group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 bg-white shadow-sm flex items-center justify-center rounded-lg text-brand-orange">
                    <MapPin size={16} />
                 </div>
                 <h4 className="font-bold text-brand-navy text-sm font-serif">{addr.name}</h4>
              </div>
              <div className="space-y-2 text-[11px] text-brand-navy/60 font-medium">
                 <p>{addr.address}</p>
                 <p>{addr.city}</p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                 <button className="p-2.5 bg-white border border-brand-navy/5 rounded-lg text-brand-navy/40 hover:text-brand-orange transition-colors">
                    <Edit2 size={12} />
                 </button>
                 <button className="p-2.5 bg-white border border-brand-navy/5 rounded-lg text-brand-navy/40 hover:text-red-400 transition-colors">
                    <Trash2 size={12} />
                 </button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

function SettingsView({ user }: any) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl md:text-3xl font-serif text-brand-navy">Identity Settings</h2>

      <div className="flex flex-col md:flex-row gap-10">
         <div className="space-y-5 flex-1 w-full text-center md:text-left">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto md:mx-0 bg-brand-cream rounded-full border-4 border-brand-orange/10 flex items-center justify-center mb-4">
               <User size={30} md-size={40} className="text-brand-orange" />
            </div>
            <button className="text-[9px] font-black uppercase tracking-widest text-brand-orange underline underline-offset-4">Change Motif</button>
         </div>
         <div className="flex-[2] space-y-5 w-full">
            <div className="flex flex-col gap-2">
               <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Identity Name</label>
               <input defaultValue={user?.name} className="w-full bg-brand-cream/30 border border-brand-orange/10 rounded-xl p-4 text-brand-navy text-sm font-medium" />
            </div>
            <div className="flex flex-col gap-2">
               <label className="text-[9px] font-black uppercase tracking-widest text-brand-navy/40 ml-1">Email Connection</label>
               <input disabled defaultValue={user?.email} className="w-full bg-brand-cream/20 border border-brand-orange/5 rounded-xl p-4 text-brand-navy/40 cursor-not-allowed text-sm font-medium" />
            </div>
         </div>
      </div>

      <div className="pt-8 border-t border-brand-navy/5 flex justify-end">
         <button className="w-full md:w-auto bg-brand-navy text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-orange transition-all">
            Save Identity
         </button>
      </div>
    </div>
  );
}
