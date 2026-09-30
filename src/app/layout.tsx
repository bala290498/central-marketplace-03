import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { BottomNav } from "@/components/BottomNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Central Marketplace | Local Listing Platform",
    template: "%s | Central Marketplace - Local Listing Platform",
  },
  description:
    "Central Marketplace is your premier local listing platform to discover verified neighborhood deals, local business listings, dining discounts, and offers near you.",
  metadataBase: new URL("https://centralmarketplace.in"),
  keywords: [
    "local listing platform",
    "neighborhood deals",
    "local business listings",
    "Central Marketplace",
    "nearby discounts",
  ],
  openGraph: {
    title: "Central Marketplace | Local Listing Platform",
    description:
      "Central Marketplace is your local listing platform for exclusive verified discounts, neighborhood deals, and local business listings around you.",
    url: "https://centralmarketplace.in",
    siteName: "Central Marketplace - Local Listing Platform",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo/logo.svg",
        width: 800,
        height: 800,
        alt: "Central Marketplace - Local Listing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Central Marketplace | Local Listing Platform",
    description:
      "Discover exclusive verified discounts, neighborhood deals, and local business listings around you.",
    images: ["/logo/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/logo/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo/logo.svg",
    apple: [
      { url: "/logo/logo.svg", type: "image/svg+xml" },
      { url: "/logo/logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Central Marketplace",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50/60 text-slate-900 pb-20 md:pb-0">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
