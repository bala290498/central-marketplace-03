import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        <div className="flex flex-wrap justify-center items-center gap-4 font-semibold text-slate-600">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Deals
          </Link>
          <span>·</span>
          <Link href="/how-it-works" className="hover:text-orange-600 transition-colors">
            How it works
          </Link>
          <span>·</span>
          <Link href="/list-your-business" className="hover:text-orange-600 transition-colors">
            Post
          </Link>
          <span>·</span>
          <Link href="/we-are-hiring" className="hover:text-orange-600 transition-colors">
            We&apos;re hiring
          </Link>
        </div>
        <p>© Central Marketplace · Local deals around you</p>
      </div>
    </footer>
  );
}
