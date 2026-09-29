"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Sparkles, Navigation, Loader2 } from "lucide-react";
import { UserLocation } from "@/types/offer";
import { lookupUserArea } from "@/lib/utils";

interface NavbarProps {
  userLocation?: UserLocation | null;
  userAreaLabel?: string;
  onDetectLocation?: () => void;
  isLocating?: boolean;
}

export function Navbar({
  userLocation,
  userAreaLabel = "",
  onDetectLocation,
  isLocating = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Scroll listener for compact chrome
  useEffect(() => {
    let lastY = window.scrollY || 0;
    let upTravel = 0;

    const handleScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const delta = y - lastY;
      lastY = y;

      if (y < 40) {
        setIsCompact(false);
        upTravel = 0;
        return;
      }

      if (delta > 10) {
        upTravel = 0;
        setIsCompact(true);
        setIsOpen(false);
      } else if (delta < -10) {
        upTravel += -delta;
        if (upTravel > 60) {
          setIsCompact(false);
        }
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
      className={`sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
        isCompact ? "py-2 shadow-sm" : "py-3 shadow-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl p-1 -ml-1 transition-all"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              CM
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                Central Marketplace
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Local deals around you
              </span>
            </div>
          </Link>

          {/* Location Button (Desktop & Header) */}
          {onDetectLocation && (
            <div className="hidden md:flex items-center">
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 border ${
                  userLocation && userAreaLabel
                    ? "bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800 hover:bg-orange-100"
                    : "bg-orange-500 text-white border-transparent hover:bg-orange-600 shadow-sm shadow-orange-500/20"
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
                    <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 fill-orange-500/20" />
                    <span>📍 {userAreaLabel}</span>
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
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {onDetectLocation && (
              <button
                type="button"
                onClick={onDetectLocation}
                disabled={isLocating}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all ${
                  userLocation && userAreaLabel
                    ? "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                    : "bg-orange-500 text-white"
                }`}
              >
                {isLocating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <MapPin className="w-3.5 h-3.5" />
                )}
                <span className="max-w-[100px] truncate">
                  {isLocating ? "Locating..." : userAreaLabel ? userAreaLabel : "Location"}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 w-72 h-full bg-white dark:bg-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white font-extrabold flex items-center justify-center text-sm">
              CM
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Menu</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-3 py-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                  isActive
                    ? "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          © Central Marketplace
        </div>
      </div>
    </header>
  );
}
