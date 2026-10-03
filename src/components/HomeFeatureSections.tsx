"use client";

import React from "react";
import Link from "next/link";
import {
  PlusCircle,
  HelpCircle,
  Briefcase,
  Star,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Users,
  Award,
  AlertTriangle,
  MessageSquare,
  Building2,
  FileText,
} from "lucide-react";

export function HomeFeatureSections() {
  return (
    <div className="space-y-8 mt-8">
      {/* SECTION 1: Free Posting in 3 Simple Steps */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <PlusCircle className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Free Posting in 3 Simple Steps
            </h2>
          </div>
          <Link
            href="/register"
            className="text-xs sm:text-sm font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 hover:underline flex-shrink-0 transition-colors"
          >
            <span>List for Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 select-none">
          {/* Step 1 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-orange-50 text-orange-600 font-black text-xs flex items-center justify-center border border-orange-200/60">
                  01
                </span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                1. Enter Post Details
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fill out your business name, title, description, and contact info in under 1 minute.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-200/60">
                  02
                </span>
                <MessageSquare className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                2. Instant WhatsApp Review
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your post details are pre-formatted and sent directly to our onboarding team on WhatsApp.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 font-black text-xs flex items-center justify-center border border-blue-200/60">
                  03
                </span>
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                3. Published Live
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Once verified, your listing goes live to hundreds of local customers nearby instantly!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Why Central Marketplace? */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Why Central Marketplace?
            </h2>
          </div>
          <Link
            href="/about-us"
            className="text-xs sm:text-sm font-extrabold text-purple-600 hover:text-purple-700 flex items-center gap-1 hover:underline flex-shrink-0 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 select-none">
          {/* Feature 1 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                100% Free &amp; Direct
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Zero commissions, zero listing fees. Direct connection between customers &amp; merchants.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Verified Local Deals
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Handpicked, authentic offers from genuine retail shops &amp; dining spots in your neighborhood.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Instant Contact &amp; Maps
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                One-tap phone calls, WhatsApp chat, and turn-by-turn navigation directly to the storefront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: We Are Hiring */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Briefcase className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              We Are Hiring!
            </h2>
          </div>
          <Link
            href="/we-are-hiring"
            className="text-xs sm:text-sm font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline flex-shrink-0 transition-colors"
          >
            <span>View Openings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 select-none">
          {/* Role 1 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Full-Time
                </span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Field Sales Executive
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Onboard local merchants, introduce digital listing tools, and grow retail partnerships.
              </p>
            </div>
          </div>

          {/* Role 2 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Part-Time
                </span>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Campus Ambassador
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Promote Central Marketplace among students &amp; local outlets with flexible hours.
              </p>
            </div>
          </div>

          {/* Role 3 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  Leadership
                </span>
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                City Growth Lead
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lead market expansion, merchant strategy, and user acquisition across new regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Must Try in 3 Simple Steps */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Must Try in 3 Simple Steps
            </h2>
          </div>
          <Link
            href="/must-try"
            className="text-xs sm:text-sm font-extrabold text-amber-600 hover:text-amber-700 flex items-center gap-1 hover:underline flex-shrink-0 transition-colors"
          >
            <span>Explore Must Try</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 select-none">
          {/* Step 1 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 font-black text-xs flex items-center justify-center border border-amber-200/60">
                  01
                </span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                1. Select Listing Title
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Search or pick any active offer, deal, or store listing in your neighborhood.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 font-black text-xs flex items-center justify-center border border-amber-200/60">
                  02
                </span>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                2. Rate &amp; Verify
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Confirm &quot;Is that true?&quot; and give star ratings based on your experience.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 font-black text-xs flex items-center justify-center border border-amber-200/60">
                  03
                </span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                3. Community Recommended
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your rating helps feature top-quality picks with a prominent MUST TRY badge!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Report an Issue in 3 Simple Steps */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Report an Issue in 3 Simple Steps
            </h2>
          </div>
          <Link
            href="/report-an-issue"
            className="text-xs sm:text-sm font-extrabold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline flex-shrink-0 transition-colors"
          >
            <span>Report an Issue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 select-none">
          {/* Step 1 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-red-50 text-red-600 font-black text-xs flex items-center justify-center border border-red-200/60">
                  01
                </span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                1. Select Target Listing
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose or search the listing title that contains inaccurate or outdated details.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-red-50 text-red-600 font-black text-xs flex items-center justify-center border border-red-200/60">
                  02
                </span>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                2. Choose Reason &amp; Details
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Select reason (fake offer, expired, wrong location, spam) and add brief notes.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="min-w-[240px] sm:min-w-[260px] max-w-[280px] flex-1 bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-xl bg-red-50 text-red-600 font-black text-xs flex items-center justify-center border border-red-200/60">
                  03
                </span>
                <ShieldAlert className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                3. Fast Safety Action
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Report is sent to our safety desk to immediately update or unlist broken entries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
