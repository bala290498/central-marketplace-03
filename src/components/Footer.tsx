import Link from "next/link";

export function Footer() {
  return (
    <footer className="hidden md:block mt-12 py-8 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center items-center gap-4 font-semibold text-slate-600">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <span>·</span>
          <Link href="/about-us" className="hover:text-orange-600 transition-colors">
            Why Central Marketplace
          </Link>
          <span>·</span>
          <Link href="/register" className="hover:text-orange-600 transition-colors">
            Free Posting
          </Link>
          <span>·</span>
          <Link href="/we-are-hiring" className="hover:text-orange-600 transition-colors">
            We&apos;re hiring
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-orange-600 transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>
        <p>© Central Marketplace · Nearby Listing Platform</p>
      </div>
    </footer>
  );
}
