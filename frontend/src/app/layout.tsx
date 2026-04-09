import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#111827",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Baksho | Premium E-commerce Brand",
  description: "Experience the art of unboxing with Baksho - your destination for premium lifestyle products.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Baksho",
  },
  formatDetection: {
    telephone: false,
  },
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UnboxingTransition from "@/components/animations/UnboxingTransition";
import CartDrawer from "@/components/cart/CartDrawer";
import MobileNav from "@/components/layout/MobileNav";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileMenu from "@/components/layout/MobileMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <body className="antialiased min-h-screen bg-white selection:bg-brand-orange selection:text-white pb-20 lg:pb-0 pt-16 lg:pt-0">
        <Header />
        <MobileHeader />
        <MobileMenu />
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
