import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Baksho | Premium E-commerce Brand",
  description: "Experience the art of unboxing with Baksho - your destination for premium lifestyle products.",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnboxingTransition from "@/components/animations/UnboxingTransition";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileNav from "@/components/layout/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <body className="antialiased min-h-screen bg-white selection:bg-brand-orange selection:text-white pb-20 lg:pb-0">
        <Header />
        <CartDrawer />
        <UnboxingTransition>
          <main>{children}</main>
        </UnboxingTransition>
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
