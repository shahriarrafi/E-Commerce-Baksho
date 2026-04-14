
import type { Metadata, Viewport } from "next";
import { Poppins, Lora } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

// Normal import for the transition wrapper to avoid SSR issues with dynamic in root layout
import UnboxingTransition from "@/components/animations/UnboxingTransition";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
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
  title: "Baksho | Premium E-commerce Brand",
  description: "Experience the art of unboxing with Baksho - your destination for premium lifestyle products.",
  applicationName: "Baksho",
  icons: {
    icon: "/metadata-logo.webp",
    apple: "/metadata-logo.webp",
  },
  openGraph: {
    title: "Baksho | Premium E-commerce Brand",
    description: "Experience the art of unboxing with Baksho - your destination for premium lifestyle products.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
      <body className="antialiased min-h-screen bg-white selection:bg-brand-orange selection:text-white pb-24 lg:pb-0">
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
          <Footer />
        </UnboxingTransition>
      </body>
    </html>
  );
}
