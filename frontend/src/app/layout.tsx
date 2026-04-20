import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Inter, Noto_Sans_Bengali } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

// Normal import for the transition wrapper to avoid SSR issues with dynamic in root layout
import UnboxingTransition from "@/components/animations/UnboxingTransition";
import AuthInitializer from "@/components/layout/AuthInitializer";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  variable: "--font-anek",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "700"],
  variable: "--font-noto",
  display: "swap",
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
  title: "বাকশো | প্রিমিয়াম ই-কমার্স ব্র্যান্ড",
  description: "বাকশো-এর সাথে আনবক্সিং-এর নতুন অভিজ্ঞতা নিন - আপনার প্রিয় প্রিমিয়াম পণ্যগুলি পাওয়ার একমাত্র স্থান।",
  applicationName: "বাকশো",
  icons: {
    icon: "/metadata-logo.webp",
    apple: "/metadata-logo.webp",
  },
  openGraph: {
    title: "বাকশো | প্রিমিয়াম ই-কমার্স ব্র্যান্ড",
    description: "বাকশো-এর সাথে আনবক্সিং-এর নতুন অভিজ্ঞতা নিন - আপনার প্রিয় প্রিমিয়াম পণ্যগুলি পাওয়ার একমাত্র স্থান।",
    images: ["/metadata-logo.webp"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Baksho",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

// Lazy load non-critical components
const Header = dynamic(() => import("@/components/layout/Header"));
const Footer = dynamic(() => import("@/components/layout/Footer"));
const MobileHeader = dynamic(() => import("@/components/layout/MobileHeader"));
const MobileNav = dynamic(() => import("@/components/layout/MobileNav"));
const MobileMenu = dynamic(() => import("@/components/layout/MobileMenu"));
const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"));
const FloatingConcierge = dynamic(() => import("@/components/layout/FloatingConcierge"));
const ScrollToTop = dynamic(() => import("@/components/layout/ScrollToTop"));
const Toaster = dynamic(() => import("@/components/common/Toaster"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${anekBangla.variable} ${inter.variable} ${notoBengali.variable}`}>
      <body className="antialiased min-h-screen bg-white selection:bg-brand-orange selection:text-white pb-24 lg:pb-0 font-anek">
        <AuthInitializer />
        <UnboxingTransition>
          <Header />
          <MobileHeader />
          <MobileMenu />
          <CartDrawer />
          <div className="pt-24 lg:pt-0">
            <main>{children}</main>
          </div>
          <MobileNav />
          <FloatingConcierge />
          <ScrollToTop />
          <Toaster />
          <Footer />
        </UnboxingTransition>
      </body>
    </html>
  );
}
