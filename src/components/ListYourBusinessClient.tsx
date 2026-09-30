"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CheckCircle2,
  Send,
  Store,
  Tag,
  Clock,
  MapPin,
  Phone,
  FileText,
} from "lucide-react";

export function ListYourBusinessClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State matching offers.json fields
  const [formData, setFormData] = useState({
    business: "",
    title: "",
    description: "",
    phone: "",
    badge: "",
    validity: "Valid All Days",
    location: "Vickramasingapuram",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      business: "",
      title: "",
      description: "",
      phone: "",
      badge: "",
      validity: "Valid All Days",
      location: "Vickramasingapuram",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
        {/* Full-Width Form Card Container */}
        <div className="bg-white rounded-3xl w-full p-6 sm:p-10 shadow-sm border border-slate-200 text-left">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Registration Received!
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you! Our onboarding team will verify your details and publish your listing shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors cursor-pointer"
                >
                  Submit Another Listing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Header */}
              <div className="pb-4 border-b border-slate-100">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  Post Details
                </h1>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-orange-500" />
                  <span>Title *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="E.g. 20% Off Lunch Thali Meals"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                />
              </div>

              {/* Row 2: Description (Optional) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-orange-500" />
                  <span>Description</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter additional details, offer terms, working hours, or shop notes..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                />
              </div>

              {/* Row 3: Phone / WhatsApp (Required), Badge (Optional), Validity (Optional), Location / Area (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-orange-500" />
                    <span>Phone / WhatsApp *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 94431 00000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-orange-500" />
                    <span>Badge</span>
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    placeholder="E.g. 20% OFF, BOGO DEAL (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>Validity</span>
                  </label>
                  <select
                    value={formData.validity}
                    onChange={(e) =>
                      setFormData({ ...formData, validity: e.target.value })
                    }
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-bold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                  >
                    <option value="">Select Validity (Optional)</option>
                    <option value="Valid All Days">Valid All Days</option>
                    <option value="Limited">Limited</option>
                    <option value="Expires Soon">Expires Soon</option>
                    <option value="Until Filled">Until Filled</option>
                    <option value="Until Found">Until Found</option>
                    <option value="Available">Available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    <span>Location / Area</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="E.g. Vickramasingapuram (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Submit Button (Auto width, text "Submit") */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-md shadow-orange-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* Footer (Hidden on Mobile) */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
