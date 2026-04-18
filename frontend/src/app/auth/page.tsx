"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
    return () => clearError();
  }, [isAuthenticated, router, clearError]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({ 
          name, 
          email, 
          password, 
          password_confirmation: passwordConfirmation 
        });
      }
      // Successful login/register will be handled by the useEffect redirect
    } catch (err) {
      // Error is handled in the store and displayed via state
      console.error("Auth ritual failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle Background Geometry */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-10">
           <Link href="/" className="mb-6 group">
              <div className="w-12 h-12 bg-brand-navy rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-navy/20 group-hover:rotate-12 transition-all">
                <Package className="text-white" size={24} />
              </div>
           </Link>
           <h1 className="text-2xl font-serif text-brand-navy font-bold">{mode === "login" ? "Welcome Back" : "Join the Identity"}</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/30 mt-2">Baksho Secure Portal</p>
        </div>

        <div className="bg-brand-navy rounded-[40px] shadow-2xl p-8 md:p-10 border border-white/5 relative overflow-hidden">
           {/* Form Header */}
           <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/5 mb-10 relative">
             <motion.div 
               layoutId="tab-bg"
               animate={{ x: mode === "login" ? "0%" : "100%" }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-brand-orange rounded-xl"
             />
             <button 
               onClick={() => { setMode("login"); clearError(); }}
               className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${mode === "login" ? "text-white" : "text-white/40 hover:text-white/60"}`}
             >
               Login
             </button>
             <button 
               onClick={() => { setMode("register"); clearError(); }}
               className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${mode === "register" ? "text-white" : "text-white/40 hover:text-white/60"}`}
             >
               Join
             </button>
           </div>

           <form onSubmit={handleAuth} className="space-y-6">
             <AnimatePresence mode="wait">
               <motion.div
                 key={mode}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.2 }}
                 className="space-y-6"
               >
                 {mode === "register" && (
                   <AuthInput 
                     label="Your Name" 
                     icon={User} 
                     placeholder="Shahriar Rafi" 
                     value={name}
                     onChange={(e: any) => setName(e.target.value)}
                     required
                   />
                 )}
                 <AuthInput 
                   label="Identity Email" 
                   icon={Mail} 
                   placeholder="admin@baksho.com" 
                   type="email" 
                   value={email}
                   onChange={(e: any) => setEmail(e.target.value)}
                   required
                 />
                 <AuthInput 
                   label="Security Keyword" 
                   icon={Lock} 
                   placeholder="••••••••" 
                   type="password" 
                   value={password}
                   onChange={(e: any) => setPassword(e.target.value)}
                   required
                 />
                 {mode === "register" && (
                   <AuthInput 
                     label="Confirm Keyword" 
                     icon={Lock} 
                     placeholder="••••••••" 
                     type="password" 
                     value={passwordConfirmation}
                     onChange={(e: any) => setPasswordConfirmation(e.target.value)}
                     required
                   />
                 )}
               </motion.div>
             </AnimatePresence>

             {error && (
               <motion.p 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 className="text-brand-orange text-[10px] font-bold uppercase tracking-wider bg-brand-orange/10 p-4 rounded-xl border border-brand-orange/20 text-center"
               >
                 {error}
               </motion.p>
             )}

             <button 
               type="submit"
               disabled={isLoading}
               className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-brand-orange/30 transition-all active:scale-95 disabled:opacity-50 group"
             >
               {isLoading ? "Verifying Ritual..." : (mode === "login" ? "Enter Portal" : "Forge Identity")}
               {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
             </button>
           </form>

           <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-white/20">
             <Link href="#" className="hover:text-white transition-colors">Recover Keyword</Link>
             <div className="w-1 h-1 bg-white/10 rounded-full" />
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
           </div>
        </div>
      </div>
    </div>
  );
}

function AuthInput({ label, icon: Icon, placeholder, type = "text", value, onChange, required = false }: any) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 ml-1">{label}</label>
      <div className="relative flex items-center">
        <div className="absolute left-5 text-white/10">
          <Icon size={18} />
        </div>
        <input 
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 pl-14 text-white focus:outline-none focus:border-brand-orange transition-all placeholder:text-white/10 text-sm font-medium"
        />
      </div>
    </div>
  );
}
