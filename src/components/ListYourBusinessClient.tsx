"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  CheckCircle2,
  Send,
  Store,
  Tag,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  FileText,
} from "lucide-react";

export function ListYourBusinessClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState("");

  // Form State matching list.json fields
  const [formData, setFormData] = useState({
    business: "",
    title: "",
    description: "",
    phone: "",
    whatsapp: "",
    badge: "",
    validity: "Valid All Days",
    location: "Vickramasingapuram",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const textLines = [
      `*New Post Submission - Central Marketplace*`,
      formData.business ? `• *Post Name:* ${formData.business}` : null,
      formData.title ? `• *Post Title:* ${formData.title}` : null,
      formData.description ? `• *Post Description:* ${formData.description}` : null,
      formData.phone ? `• *Phone:* ${formData.phone}` : null,
      formData.whatsapp ? `• *WhatsApp:* ${formData.whatsapp}` : null,
      formData.badge ? `• *Badge:* ${formData.badge}` : null,
      formData.validity ? `• *Validity:* ${formData.validity}` : null,
      formData.location ? `• *Location:* ${formData.location}` : null,
    ].filter(Boolean).join("\n");

    const phoneNum = "919677691237";
    const url = `https://wa.me/${phoneNum}?text=${encodeURIComponent(textLines)}`;
    setSubmittedWhatsappUrl(url);
    window.open(url, "_blank");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedWhatsappUrl("");
    setFormData({
      business: "",
      title: "",
      description: "",
      phone: "",
      whatsapp: "",
      badge: "",
      validity: "Valid All Days",
      location: "Vickramasingapuram",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Direct Page Form Content (No Container Card) */}
        {isSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Post Prepared for WhatsApp!
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              We&apos;ve formatted your post details. If WhatsApp didn&apos;t open automatically, click the button below to send your details directly to 9677691237.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {submittedWhatsappUrl && (
                <a
                  href={submittedWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold transition-colors shadow-md shadow-emerald-600/25 inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp (+91 96776 91237)</span>
                </a>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-colors cursor-pointer"
              >
                Submit Another Post
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Header */}
            <div className="pb-4 border-b border-slate-200">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Post Details
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out the information below to publish your post on Central Marketplace.
              </p>
            </div>

            {/* Row 1: Post Name & Post Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Store className="w-4 h-4 text-orange-500" />
                  <span>Post Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.business}
                  onChange={(e) =>
                    setFormData({ ...formData, business: e.target.value })
                  }
                  placeholder="E.g. Royal Feast Fine Dining"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span>Post Title *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="E.g. 20% Off Lunch Thali Meals"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: Post Description (Optional) */}
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Post Description</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter additional details, offer terms, working hours, or shop notes..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-medium outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
              />
            </div>

            {/* Row 3: Phone, WhatsApp, Badge, Validity, Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>Phone *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+91 94431 00000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  <span>WhatsApp</span>
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  placeholder="+91 94431 00000 (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span>Badge</span>
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({ ...formData, badge: e.target.value })
                  }
                  placeholder="E.g. 20% OFF, BOGO DEAL (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>Validity</span>
                </label>
                <select
                  value={formData.validity}
                  onChange={(e) =>
                    setFormData({ ...formData, validity: e.target.value })
                  }
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm font-bold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
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
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>Location / Area</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="E.g. Vickramasingapuram (optional)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-md shadow-orange-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Post</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
