import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Store,
  ArrowRight,
  Zap,
  ShieldCheck,
  Eye,
  PhoneCall,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Central Marketplace",
  description:
    "Connecting neighborhood customers with local merchants through simple, direct, real-time offer cards.",
};

export default function AboutUsPage() {
  const pillars = [
    {
      badge: "DIRECT",
      title: "Direct contact details",
      desc: "We provide direct contact details. You speak directly with property owners, sellers and service providers.",
      icon: PhoneCall,
      color: "bg-orange-50 text-orange-600 border-orange-200",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      badge: "FAST & EASY",
      title: "Stress-free finding",
      desc: "One local desk. One area-based organized list. No spam groups or searching through endless chat messages.",
      icon: Zap,
      color: "bg-blue-50 text-blue-600 border-blue-200",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      badge: "VERIFIED",
      title: "Feedback loop",
      desc: "Every interaction generates private feedback for the desk to maintain high quality and trusted connections.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      badge: "MONITORED",
      title: "Continuous monitoring",
      desc: "If a listing is reported as fake or problematic, the desk reviews it immediately and takes swift action.",
      icon: Eye,
      color: "bg-purple-50 text-purple-600 border-purple-200",
      badgeColor: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Header Title Banner with Logo Icon */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-orange-500/25 font-black text-xl tracking-tighter select-none">
            CM
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Why Central Marketplace?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Connecting neighborhood customers with local merchants through simple, direct, real-time offer cards.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-1.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore CTA */}
        <div className="text-center">
          <Link
            href="/list"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 transition-all"
          >
            <span>Explore Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
