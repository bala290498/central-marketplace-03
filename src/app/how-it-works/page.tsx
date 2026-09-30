import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Share2, Compass, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Central Marketplace | Central Marketplace",
  description:
    "Learn why Central Marketplace connects neighborhood customers with local merchants through simple, direct, real-time offer cards.",
};

export default function HowItWorksPage() {
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

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-wider">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3 tracking-tight">
            Why Central Marketplace
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Connecting neighborhood customers with local merchants through simple, direct, real-time offer cards.
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4 hover:border-orange-300 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white font-extrabold text-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/20">
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
          <div>
            <strong>Note on Distances:</strong> Distances shown on cards are direct estimations. Tapping the Maps button launches Google Maps for exact driving routes, turn-by-turn navigation, and estimated travel time.
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all"
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
