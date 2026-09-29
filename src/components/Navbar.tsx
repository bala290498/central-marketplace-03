"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { UserLocation } from "@/types/offer";

interface NavbarProps {
  userLocation?: UserLocation | null;
  userAreaLabel?: string;
  onDetectLocation?: () => void;
  isLocating?: boolean;
  children?: React.ReactNode;
}

export function Navbar({
  userLocation,
  userAreaLabel = "",
  onDetectLocation,
  isLocating = false,
  children,
}: NavbarProps) {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Scroll listener for hide-on-scroll-down and show-on-scroll-up header
  useEffect(() => {
    let lastY = window.scrollY || 0;

    const handleScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const delta = y - lastY;
      lastY = y;

      if (y < 30) {
        setIsHidden(false);
        setIsCompact(false);
        return;
      }

      if (delta > 6) {
        setIsHidden(true);
        setIsCompact(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Deals" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/list-your-business", label: "List your business" },
    { href: "/we-are-hiring", label: "We're hiring" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ${
        isHidden ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      } ${isCompact ? "py-2 shadow-xs" : "py-3 shadow-sm"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl p-1 -ml-1 transition-all"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              CM
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight group-hover:text-orange-600 transition-colors">
                Central Marketplace
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Local deals around you
              </span>
            </div>
          </Link>

          {/* Location Button (Desktop Header) */}
          {onDetectLocation && (
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 border ${
                  userLocation && userAreaLabel
                    ? "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                    : "bg-orange-500 text-white border-transparent hover:bg-orange-600 shadow-xs shadow-orange-500/20"
                }`}
                title={userAreaLabel ? `Location: ${userAreaLabel}` : "Allow location access"}
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Locating...</span>
                  </>
                ) : userLocation && userAreaLabel ? (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-orange-600 fill-orange-500/20" />
                    <span>{userAreaLabel}</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Allow location</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Location Header Button */}
          {onDetectLocation && (
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  userLocation && userAreaLabel
                    ? "bg-orange-50 text-orange-700 border border-orange-200"
                    : "bg-orange-500 text-white"
                }`}
              >
                {isLocating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MapPin className="w-3.5 h-3.5" />
                )}
                <span className="max-w-[110px] truncate">
                  {isLocating ? "Locating..." : userAreaLabel ? userAreaLabel : "Location"}
                </span>
              </button>
            </div>
          )}
        </div>
        {children}
      </div>
    </header>
  );
}
