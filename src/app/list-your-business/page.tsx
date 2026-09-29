import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Store, CheckCircle, Mail, Phone, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: "List your business | Central Marketplace",
  description:
    "Promote your shop, restaurant, salon, clinic, or service to nearby customers on Central Marketplace.",
};

export default function ListYourBusinessPage() {
  const benefits = [
    {
      title: "One listing for your business",
      desc: "Ideal for local shops, restaurants, salons, clinics, home services, or wholesale suppliers.",
      icon: Store,
    },
    {
      title: "Direct customer interaction",
      desc: "Shoppers can call your business and open driving directions directly from your deal card.",
      icon: Phone,
    },
    {
      title: "WhatsApp Share-Ready",
      desc: "Every deal includes pre-formatted share text so customers can forward your offers to friends.",
      icon: Share2,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-xs uppercase tracking-wider">
            For Businesses
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-3 tracking-tight">
            List Your Business on Central Marketplace
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Reach thousands of nearby neighborhood shoppers with a clean, high-converting offer card.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Instructions Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-orange-500" />
            <span>What to include in your listing request</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span><strong>Business Name & Category:</strong> E.g. ABC Restaurant (Food)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span><strong>Area & Google Map Pin:</strong> Neighborhood name and exact GPS coordinates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span><strong>Offer Title & Description:</strong> E.g. "20% Off Total Bill"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 font-bold">•</span>
              <span><strong>Phone Number & Validity:</strong> Customer helpline and offer expiry date</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Ready to showcase your store? Send us an email today.
            </div>
            <a
              href="mailto:hello@centralmarketplace.in?subject=List%20my%20business"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email to list your business</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
