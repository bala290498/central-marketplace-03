"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  FileText,
  Headphones,
  Mail,
  MapPin,
  X,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Send,
  Phone,
  User,
} from "lucide-react";

export function WeAreHiringClient() {
  const roles = [
    {
      title: "City Sales & Merchant Onboarding",
      desc: "Onboard neighborhood shops, restaurants, salons, and local service providers.",
      icon: Users,
      tag: "Field / Sales",
    },
    {
      title: "Content & Copywriting",
      desc: "Write engaging, punchy offer cards and verified business summaries.",
      icon: FileText,
      tag: "Remote / Hybrid",
    },
    {
      title: "Merchant & Customer Support",
      desc: "Assist shoppers and merchants in confirming deals and resolving queries.",
      icon: Headphones,
      tag: "Support Desk",
    },
  ];

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenModal = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setIsSubmitted(false);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNum = "919443100000";
    const textLines = [
      `*Job Application / Interest*`,
      `Position: *${selectedRole || "General Application"}*`,
      `Name: ${name}`,
      `Phone/WhatsApp: ${phone}`,
      note ? `Note: ${note}` : "",
      `Sent via Central Marketplace Careers Desk`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(textLines)}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
    setIsSubmitted(true);
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Page Title Header with Matching Icon */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <Briefcase className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          We&apos;re Hiring!
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium">
          Help us bring local deals to more neighborhoods and empower neighborhood merchants.
        </p>
      </div>

      {/* Roles Grid (Interactive Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {roles.map((role, idx) => {
          const Icon = role.icon;
          return (
            <div
              key={idx}
              onClick={() => handleOpenModal(role.title)}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between cursor-pointer group text-left"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px] tracking-wider uppercase">
                    {role.tag}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-orange-600 transition-colors">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {role.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
                <span>Express Interest</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Location & Apply CTA Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs mb-10 text-left">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">
          <MapPin className="w-4 h-4" />
          <span>Chennai First</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
          Remote &amp; Field Roles Available
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          We are looking for energetic team members passionate about local commerce and hyper-local marketplaces. Click any role above or send your intro to get started.
        </p>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-medium text-slate-500">
            Have questions? Email us directly anytime.
          </span>
          <a
            href="mailto:jobs@centralmarketplace.in?subject=Application"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>jobs@centralmarketplace.in</span>
          </a>
        </div>
      </div>

      {/* Express Interest Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 text-left">
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xl">Opening WhatsApp...</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Your details have been prepared in WhatsApp. Click the button below if WhatsApp didn&apos;t open automatically.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Express Interest
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Role: <span className="font-bold text-slate-800">{selectedRole}</span>
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-orange-500" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs"
                  />
                </div>

                {/* Role Select Dropdown */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                    Interested Role *
                  </label>
                  <select
                    value={selectedRole || ""}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 shadow-2xs cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r.title} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Note / Message */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                    Short Bio / Experience (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Tell us briefly about yourself..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-orange-500 resize-none shadow-2xs"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Apply via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
