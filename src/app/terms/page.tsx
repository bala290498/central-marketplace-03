import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, ArrowLeft, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Central Marketplace",
  description:
    "Terms & Conditions for Central Marketplace and the Chennai Desk. Read our user duties, liability limitations, and platform guidelines.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Central Marketplace</span>
          </Link>
        </div>

        {/* Header Title Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Last updated: 10 September 2026. Applies to the Chennai Desk of Central Marketplace (the &ldquo;Desk&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the website, WhatsApp desk, or any listing we share, you agree to these terms.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-8 text-slate-700 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                1
              </span>
              <span>What we are</span>
            </h2>
            <p className="pl-9 text-slate-600">
              Central Marketplace is a listing and introduction desk. We may share names, areas, and contact details of property owners, home-food providers, local sellers, wholesalers, home-service players, and professionals. You contact them directly.
            </p>
            <p className="pl-9 text-slate-600">
              We are not a broker of record, marketplace seller, payment company, courier, insurer, employer, or guarantor of any person we list.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                2
              </span>
              <span>What we are not responsible for</span>
            </h2>
            <p className="pl-9 text-slate-600">
              We do not take part in, and we accept no responsibility or liability for:
            </p>
            <ul className="pl-9 space-y-2 list-disc list-inside text-slate-600">
              <li>Money, deposits, advances, rents, fees, cash, UPI, bank transfer, or any other payment between you and another party.</li>
              <li>Scams, impersonation, fake listings, fake documents, or dishonest dealing by any listed person or any customer.</li>
              <li>Damage to property, injury, loss, theft, or any other harm arising from a visit, stay, meal, service, or deal.</li>
              <li>Delivery time, delay, non-delivery, or partial delivery of food, goods, or services.</li>
              <li>Quantity, weight, portion, stock, or availability.</li>
              <li>Quality, fitness, hygiene, skill, licence, safety, or result of any property, food, product, or service.</li>
              <li>Whether a room, flat, plot, or PG is vacant, legal, or as described.</li>
              <li>Whether a professional is qualified, registered, or permitted to practise.</li>
            </ul>
            <p className="pl-9 text-slate-600 pt-1">
              No listing, message, or recommendation from the Desk is a promise that a service will work, that a person is genuine, or that a deal will complete.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                3
              </span>
              <span>No warranties</span>
            </h2>
            <p className="pl-9 text-slate-600">
              Listings and contacts are shared &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. We do not warrant that information is complete, current, or accurate. We may add, change, or remove a listing at any time without notice.
            </p>
            <p className="pl-9 text-slate-600">
              Any view we share is only a connection aid. It is not advice, not a certificate, and not a guarantee.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                4
              </span>
              <span>Your duty</span>
            </h2>
            <ul className="pl-9 space-y-2 list-disc list-inside text-slate-600">
              <li>Check the person, place, documents, price, and work yourself before you pay or visit.</li>
              <li>Do not send money to an unknown party on the strength of a listing alone.</li>
              <li>Keep your own records of what you agree with the other party.</li>
              <li>Use contacts only for the request you made. Do not spam listed people.</li>
              <li>Tell the Desk in a private chat if a listing looks fake or harmful.</li>
            </ul>
            <p className="pl-9 text-slate-600 pt-1">
              Any contract, visit, payment, delivery, or work is solely between you and the other party. We are not a party to that arrangement.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                5
              </span>
              <span>Providers</span>
            </h2>
            <p className="pl-9 text-slate-600">
              If you ask to be listed, you confirm that your details are true and that you have the right to offer what you describe. We may refuse or remove a listing without giving a reason. Removal after a complaint does not make us responsible for what already happened.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                6
              </span>
              <span>WhatsApp and data</span>
            </h2>
            <p className="pl-9 text-slate-600">
              The site may open a private WhatsApp chat with the office. WhatsApp&rsquo;s own terms apply to that chat. We may keep area, name, number, category, and message text so we can reply and run the list. Do not send us data you do not want stored.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                7
              </span>
              <span>Limitation of liability</span>
            </h2>
            <p className="pl-9 text-slate-600">
              To the fullest extent allowed by law, Central Marketplace and the Chennai Desk are not liable for any direct, indirect, special, or consequential loss, including loss of money, property, time, data, or reputation, arising from use of the site, a listing, a contact, or a deal you make with someone else.
            </p>
            <p className="pl-9 text-slate-600">
              If a court still finds us liable, that liability is limited to the amount you paid us for a paid promotion in the thirty days before the claim &mdash; or zero if you paid us nothing.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                8
              </span>
              <span>Indemnity</span>
            </h2>
            <p className="pl-9 text-slate-600">
              You will indemnify and hold us harmless against claims, costs, and losses arising from your use of a listing, your messages, your payments, or your breach of these terms.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                9
              </span>
              <span>Changes</span>
            </h2>
            <p className="pl-9 text-slate-600">
              We may update these terms by posting a new version on this page. Continued use after that date means you accept the new terms.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 text-xs font-black flex items-center justify-center flex-shrink-0">
                10
              </span>
              <span>Law</span>
            </h2>
            <p className="pl-9 text-slate-600">
              These terms are governed by the laws of India. Courts in Chennai have exclusive jurisdiction, without affecting any non-waivable consumer right you may have.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
