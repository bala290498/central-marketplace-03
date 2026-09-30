"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  Sparkles,
  HelpCircle,
  Briefcase,
  Users,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

interface MoreDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MoreDrawer({ isOpen, onClose }: MoreDrawerProps) {
  if (!isOpen) return null;

  const menuItems = [
    {
      href: "/",
      label: "All Deals & Listings",
      desc: "Browse verified local offers near you",
      icon: Sparkles,
      color: "bg-orange-100 text-orange-600",
    },
    {
      href: "/how-it-works",
      label: "Why Central Marketplace",
      desc: "Learn how to discover, call and navigate",
      icon: HelpCircle,
      color: "bg-blue-100 text-blue-600",
    },
    {
      href: "/list-your-business",
      label: "Free Listing",
      desc: "Showcase your shop or service to local buyers",
      icon: Briefcase,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      href: "/we-are-hiring",
      label: "We're Hiring",
      desc: "Join our team in bringing local deals",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      href: "/report-an-issue",
      label: "Report an Issue",
      desc: "Report inappropriate or fake listings",
      icon: ShieldAlert,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200 md:hidden">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Attached Modal Container */}
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-6 pb-24 z-10 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Handle Bar Indicator */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <img
              src="/logo/logo.svg"
              alt="Central Marketplace Logo"
              className="w-8 h-8 rounded-xl object-cover shadow-xs"
            />
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Explore Marketplace</h3>
              <p className="text-[11px] text-slate-500">Quick access to all pages & services</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
