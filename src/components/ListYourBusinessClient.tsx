"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  UserPlus,
  ClipboardList,
  MapPin,
  CheckCircle2,
  MessageCircle,
  X,
  Send,
  Store,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function ListYourBusinessClient() {
  const [activeStep, setActiveStep] = useState(0);
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
      title: "Register Your Service",
      description: "Complete your profile and register your business in minutes.",
      icon: UserPlus,
    },
    {
      stepLabel: "Step 2",
      title: "List Your Shop & Deals",
      description: "Add your shop details, photos, and exclusive discount offers for local buyers.",
      icon: ClipboardList,
    },
    {
      stepLabel: "Step 3",
      title: "Reach Members Nearby",
      description: "Get discovered directly within your district by thousands of neighborhood shoppers.",
      icon: MapPin,
    },
  ];

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

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

  const currentStepData = steps[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Top Warm Pastel Gradient Banner (Matches Reference UI) */}
        <div className="bg-gradient-to-r from-amber-200/70 via-orange-100/90 to-pink-200/70 border border-orange-200/50 p-6 sm:p-10 rounded-3xl text-center shadow-xs mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Service Providers & Vendors
          </h1>
          <p className="text-xs sm:text-base font-semibold text-slate-700 max-w-2xl mx-auto leading-relaxed">
            District-wise local vendors with lowest price guaranteed. Promote your shop, service, restaurant, or business to nearby buyers with zero listing fees.
          </p>
        </div>

        {/* 3-Step Interactive Steps Card (Matches Reference UI) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md text-center max-w-2xl mx-auto mb-8 relative overflow-hidden">
          {/* Top Left / Right Touch Nav Arrows */}
          <button
            type="button"
            onClick={handlePrevStep}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNextStep}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Red Circular Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FF5A5F] rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#FF5A5F]/25 transition-transform duration-300 transform hover:scale-105">
            <StepIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          {/* Step Counter Label */}
          <span className="text-[#FF5A5F] font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-2 block">
            {currentStepData.stepLabel}
          </span>

          {/* Step Title */}
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            {currentStepData.title}
          </h2>

          {/* Step Description */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            {currentStepData.description}
          </p>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mb-7">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeStep === idx
                    ? "w-7 h-2.5 bg-[#FF5A5F]"
                    : "w-2.5 h-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
                title={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bright Coral Call-To-Action Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-10 py-3.5 rounded-2xl bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-extrabold text-base shadow-lg shadow-[#FF5A5F]/30 transition-all duration-200 cursor-pointer transform hover:scale-[1.02]"
          >
            Register Now
          </button>
        </div>

        {/* Feature Pill Badges Row (Matches Reference UI) */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-2 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500 text-emerald-700 bg-emerald-50/70 font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Best Price Guaranteed</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500 text-blue-700 bg-blue-50/70 font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-xs">
            <MessageCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>Direct Customer Contact</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500 text-amber-700 bg-amber-50/70 font-extrabold text-xs sm:text-sm whitespace-nowrap shadow-xs">
            <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>District-Wide Reach</span>
          </div>
        </div>
      </main>

      {/* Registration Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
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
                  <div className="w-10 h-10 rounded-2xl bg-[#FF5A5F]/10 text-[#FF5A5F] flex items-center justify-center">
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F]"
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
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold outline-none focus:border-[#FF5A5F]"
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
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-bold outline-none focus:border-[#FF5A5F]"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-[#FF5A5F]"
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
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-[#FF5A5F]"
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
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs font-medium outline-none focus:border-[#FF5A5F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#FF5A5F] hover:bg-[#E0484D] text-white font-extrabold text-sm shadow-md shadow-[#FF5A5F]/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
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
