import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Briefcase, Users, FileText, Headphones, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "We're hiring | Central Marketplace",
  description:
    "Join the Central Marketplace team to help bring neighborhood deals to local communities in Chennai.",
};

export default function WeAreHiringPage() {
  const roles = [
    {
      title: "City Sales & Merchant Onboarding",
      desc: "Onboard neighborhood shops, restaurants, salons, and local service providers.",
      icon: Users,
    },
    {
      title: "Content & Copywriting",
      desc: "Write engaging, punchy offer cards and verified business summaries.",
      icon: FileText,
    },
    {
      title: "Merchant & Customer Support",
      desc: "Assist shoppers and merchants in confirming deals and resolving queries.",
      icon: Headphones,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Page Title Header with Matching Icon */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Briefcase className="w-7 h-7" />
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-wider">
            Careers
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-4 mb-3 tracking-tight">
            We&apos;re Hiring!
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Help us bring local deals to more neighborhoods and empower neighborhood merchants.
          </p>
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {role.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Location & Apply CTA Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">
            <MapPin className="w-4 h-4" />
            <span>Chennai First</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Remote & Field Roles Available
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            We are looking for energetic team members passionate about local commerce and hyper-local marketplaces.
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Send your resume or intro to get in touch.
            </span>
            <a
              href="mailto:jobs@centralmarketplace.in?subject=Application"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Apply at jobs@centralmarketplace.in</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
