"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  UserPlus,
  ClipboardList,
  PhoneCall,
  CheckCircle2,
  X,
  Send,
  Store,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

export function ListYourBusinessClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const steps = [
    {
      stepLabel: "Step 1",
      title: "Register",
      description: "Create your profile",
      icon: UserPlus,
    },
    {
      stepLabel: "Step 2",
      title: "Free Listing",
      description: "Get listed",
      icon: ClipboardList,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({
        businessName: "",
        category: "Dining & Cafes",
        location: "Vickramasingapuram",
        phone: "",
        offerTitle: "",
        description: "",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center justify-center text-center">
        {/* Desktop View: 3 Steps Directly in a Horizontal Row with Horizontal Arrows */}
        <div className="hidden md:flex items-center justify-center gap-6 py-6 mb-10 w-full">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Step Item */}
                <div className="flex-1 text-center flex flex-col items-center justify-center px-2">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white mb-3 shadow-lg shadow-orange-500/25 transition-transform duration-300 hover:scale-105">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-orange-500 font-extrabold text-xs uppercase tracking-wider mb-1">
                    {step.stepLabel}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-[200px] leading-relaxed mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Horizontal Arrow Pointing to Next Step */}
                {!isLast && (
                  <div className="flex-shrink-0 flex items-center justify-center self-center px-1">
                    <ArrowRight className="w-7 h-7 text-orange-500 stroke-[2.5]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile View: 3 Steps Vertically Stacked with Vertical Arrows */}
        <div className="flex md:hidden flex-col items-center justify-center gap-6 py-4 mb-10 w-full">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;
            return (
              <React.Fragment key={idx}>
                {/* Step Item */}
                <div className="text-center flex flex-col items-center justify-center px-4 max-w-xs mx-auto">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white mb-2.5 shadow-lg shadow-orange-500/25">
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className="text-orange-500 font-extrabold text-xs uppercase tracking-wider mb-1">
                    {step.stepLabel}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Arrow Pointing Down to Next Step */}
                {!isLast && (
                  <div className="py-1">
                    <ArrowDown className="w-6 h-6 text-orange-500 stroke-[2.5]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Centered CTA Register Button */}
        <div className="text-center w-full flex justify-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-12 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-orange-500/25 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
          >
            Register Now
          </button>
        </div>
      </main>

      {/* Registration Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150 text-left">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  Registration Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-xs mx-auto">
                  Thank you! Our local onboarding team will activate your free business listing shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                      Free Business Listing
                    </h3>
                    <p className="text-xs text-slate-500">
                      Enter your shop & offer details below
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold outline-none focus:border-orange-500"
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
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
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
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Description / Offer Terms
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief details about your shop or discount deal..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Free Listing Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
