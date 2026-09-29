"use client";

import React, { useState } from "react";
import { ShieldAlert, X, CheckCircle2, AlertOctagon } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reason, setReason] = useState<string>("Fake or fraudulent listing");
  const [listingId, setListingId] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

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
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h2 className="font-extrabold text-slate-900 text-base">Report an Issue</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Report Submitted</h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Thank you for helping keep Central Marketplace safe and accurate. Our team will review this listing.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Safety Card Banner */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                  <AlertOctagon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-red-900 text-xs sm:text-sm">
                    Help Us Keep Central Marketplace Safe
                  </h4>
                  <p className="text-[11px] sm:text-xs text-red-700 mt-0.5 leading-relaxed">
                    Report inappropriate, fake or misleading listings so we can take immediate action.
                  </p>
                </div>
              </div>

              {/* Select Reason */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Select Reason <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                        reason === r
                          ? "border-blue-600 bg-blue-50/60 text-blue-900"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
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

              {/* Listing ID / Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Listing ID or Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={listingId}
                  onChange={(e) => setListingId(e.target.value)}
                  placeholder="e.g. list-001 or 3BHK House for Rent"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Additional Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Please provide more information..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/25 transition-all"
              >
                Submit Report
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
