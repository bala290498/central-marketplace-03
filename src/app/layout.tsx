import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Central Marketplace | Local Deals Around You",
    template: "%s | Central Marketplace",
  },
  description:
    "Discover verified neighborhood deals, local restaurant offers, salon discounts, grocery savings, and business listings near you.",
  metadataBase: new URL("https://centralmarketplace.in"),
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50/60 text-slate-900 pb-16 md:pb-0">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

