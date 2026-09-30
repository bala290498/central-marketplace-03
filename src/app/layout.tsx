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
    default: "Central Marketplace | Local Deals Around You",
    template: "%s | Central Marketplace",
  },
  description:
    "Discover verified neighborhood deals, local restaurant offers, salon discounts, grocery savings, and business listings near you.",
  metadataBase: new URL("https://centralmarketplace.in"),
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
      <body className="min-h-full flex flex-col font-sans bg-slate-50/60 text-slate-900 pb-16 md:pb-0">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

