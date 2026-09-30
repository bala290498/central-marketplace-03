"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  CheckCircle2,
  Send,
  Store,
} from "lucide-react";

export function ListYourBusinessClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    businessName: "",
    category: "Dining & Cafes",
    location: "Vickramasingapuram",
    phone: "",
    offerTitle: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      businessName: "",
      category: "Dining & Cafes",
      location: "Vickramasingapuram",
      phone: "",
      offerTitle: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl w-full p-6 sm:p-10 shadow-sm border border-slate-200 text-left">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Registration Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you! Our local onboarding team will verify your shop details and activate your free business listing shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Submit Another Listing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    Free Business Listing
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Fill in your shop and offer details to get listed locally
                  </p>
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Business / Shop Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  placeholder="E.g. Agasthiyar Mess & Restaurant"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-xs"
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-bold outline-none focus:border-orange-500 shadow-xs"
                  >
                    <option value="Dining & Cafes">Dining & Cafes</option>
                    <option value="Salon & Spa">Salon & Spa</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Auto Care">Auto Care</option>
                    <option value="Electronic Services">Electronic Services</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Wholesale">Wholesale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Location / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="E.g. Vickramasingapuram"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-bold outline-none focus:border-orange-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 94431 00000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 shadow-xs"
                />
              </div>

              {/* Offer Title & Discount */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Offer Title & Discount *
                </label>
                <input
                  type="text"
                  required
                  value={formData.offerTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, offerTitle: e.target.value })
                  }
                  placeholder="E.g. 20% Off Lunch Thali Meals"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 shadow-xs"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Description / Offer Terms
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief details about your shop or discount deal..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-orange-500 shadow-xs"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Free Listing Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
