import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Phone,
  Share2,
  Compass,
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  Eye,
  PhoneCall,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Central Marketplace | A Better Way to Connect Locally",
  description:
    "Discover why Central Marketplace is a better way to connect locally with direct contact details, stress-free finding, verified feedback loops, and continuous monitoring.",
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

  const steps = [
    {
      num: 1,
      title: "Open the deals page & allow location",
      desc: "We request your location permission so nearby offers can be calculated and sorted automatically by live distance.",
      icon: MapPin,
    },
    {
      num: 2,
      title: "Browse by category, area, or distance",
      desc: "Filter deals by Dining, Salon, Grocery, Electronics, or specific neighborhoods. Each card highlights the offer, validity, and area pin.",
      icon: Compass,
    },
    {
      num: 3,
      title: "Call the business to confirm",
      desc: "Tap the green Call button to speak directly with the merchant and verify availability before visiting.",
      icon: Phone,
    },
    {
      num: 4,
      title: "Navigate & share deals",
      desc: "Use the Maps button for instant driving directions via Google Maps, or share the deal on WhatsApp with one click.",
      icon: Share2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {/* Header Title Banner */}
        <div className="text-center mb-10">
          <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-extrabold text-xs uppercase tracking-wider">
            WHY CENTRAL MARKETPLACE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-3 mb-3 tracking-tight">
            A Better Way to Connect Locally
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

        {/* Section Divider / Title for How It Works */}
        <div className="mb-6 pt-4 border-t border-slate-200/80">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-center">
            How It Works in 4 Simple Steps
          </h2>
        </div>

        {/* Steps List */}
        <div className="space-y-4 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex items-start gap-4 hover:border-orange-300 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500 text-white font-extrabold text-base flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/20">
                  {step.num}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-orange-500" />
                    <h3 className="font-bold text-slate-900 text-base">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Note on Distances:</strong> Distances shown on cards are direct estimations. Tapping the Maps button launches Google Maps for exact driving routes, turn-by-turn navigation, and estimated travel time.
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 transition-all"
          >
            <span>Explore Nearby Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
