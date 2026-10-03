import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 pt-10 pb-8 border-t border-slate-200 bg-white text-slate-600 text-xs sm:text-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Category-Wise Link Columns */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12">
          {/* Category 1: Navigation */}
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-3.5 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              <li>
                <Link href="/" className="hover:text-orange-600 transition-colors inline-block">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/spotlight" className="hover:text-orange-600 transition-colors inline-block">
                  Spotlight Deals
                </Link>
              </li>
              <li>
                <Link href="/list" className="hover:text-orange-600 transition-colors inline-block">
                  Browse All Listings
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-600 transition-colors inline-block">
                  List for Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Category 2: Company & Support */}
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base mb-3.5 tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              Company &amp; Help
            </h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              <li>
                <Link href="/about-us" className="hover:text-orange-600 transition-colors inline-block">
                  Why Central Marketplace
                </Link>
              </li>
              <li>
                <Link href="/we-are-hiring" className="hover:text-orange-600 transition-colors inline-block">
                  We&apos;re Hiring
                </Link>
              </li>
              <li>
                <Link href="/report-an-issue" className="hover:text-orange-600 transition-colors inline-block">
                  Report an Issue
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-600 transition-colors inline-block">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800">Central Marketplace</span>
            <span>·</span>
            <span>Nearby Listing Platform</span>
          </div>
          <p>© {new Date().getFullYear()} Central Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
