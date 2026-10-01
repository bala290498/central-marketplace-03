"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldAlert, AlertOctagon, CheckCircle2 } from "lucide-react";

export default function ReportPage() {
  const [reason, setReason] = useState<string>("Fake or fraudulent listing");
  const [listingId, setListingId] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const reasons = [
    "Fake or fraudulent listing",
    "Inappropriate content",
    "Wrong category",
    "Spam or repeated listing",
    "Already sold / not available",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Page Title Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Report an Issue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            Help us maintain a safe and trusted local marketplace for everyone.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-extrabold text-slate-900 text-xl">Report Submitted</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for notifying us. Our safety team will review this report and take appropriate action immediately.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Safety Card Banner */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-red-900 text-xs sm:text-sm">
                    Help Us Keep Central Marketplace Safe
                  </h3>
                  <p className="text-[11px] sm:text-xs text-red-700 mt-0.5 leading-relaxed">
                    Report inappropriate, fake, or misleading listings so our team can review and take action.
                  </p>
                </div>
              </div>

              {/* Select Reason */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2.5">
                  Select Reason <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all ${
                        reason === r
                          ? "border-blue-600 bg-blue-50/60 text-blue-900 shadow-2xs"
                          : "border-slate-200/90 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={r}
                        checked={reason === r}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-4 h-4 text-blue-600 accent-blue-600"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Listing ID or Title */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Listing ID or Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={listingId}
                  onChange={(e) => setListingId(e.target.value)}
                  placeholder="e.g. list-001 or 3BHK House for Rent"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
                />
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-1.5">
                  Additional Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Please provide more information..."
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none shadow-2xs"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/25 transition-all"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
