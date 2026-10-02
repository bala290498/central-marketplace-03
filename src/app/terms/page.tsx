import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Central Marketplace",
  description:
    "Terms & Conditions for Central Marketplace. Read our platform disclaimer: we are strictly a listing directory platform and hold no responsibility, guarantees, or involvement in transactions.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header Title Section */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Scale className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto mt-3 leading-relaxed">
            Last updated: October 2026. Please read these terms carefully before using our website or contacting listed providers.
          </p>
        </div>

        {/* Core Disclaimer Callout */}
        <div className="bg-amber-50 border-2 border-amber-200/80 rounded-2xl p-5 sm:p-6 mb-12 shadow-xs space-y-3 text-left">
          {/* Row 1: Icon + Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-amber-950">
              CRITICAL NOTICE: WE ARE ONLY A LISTING PLATFORM
            </h3>
          </div>
          {/* Row 2: Left-aligned Description */}
          <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium text-left">
            Central Marketplace is <strong>strictly a listing platform and information directory</strong>. We do <strong>NOT</strong> take care of, are <strong>NOT</strong> involved in, and offer <strong>NO GUARANTEES</strong> for any payments, transactions, quality of work, service delivery, or agreements made between users and listed third-party vendors.
          </p>
        </div>

        {/* Direct Page Content - Direct Layout (No Box Container) */}
        <div className="space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                1
              </span>
              <span>We Are Strictly a Listing Directory Platform</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              Central Marketplace operates solely as an open information directory and contact listing platform. We publish names, contact numbers, service descriptions, and locations of property owners, vendors, home service providers, local shops, and independent professionals.
            </p>
            <p className="text-slate-600 sm:pl-11">
              We are <strong>NOT</strong> a broker, real estate agency, marketplace seller, payment processor, employer, contractor, courier, insurer, or partner of any listed business, provider, or user.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                2
              </span>
              <span>Zero Involvement &amp; Non-Responsibility</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              Central Marketplace is <strong>NOT involved in any interactions, negotiations, bookings, or monetary exchanges</strong> between users and listed vendors. Specifically:
            </p>
            <ul className="sm:pl-11 space-y-2 list-disc list-inside text-slate-600">
              <li>
                <strong>No Payment Handling:</strong> We do not collect, process, hold, escrow, or refund any money, rents, advance deposits, service fees, or payments exchanged between parties.
              </li>
              <li>
                <strong>Not Taking Care of Services:</strong> We do not supervise, direct, control, schedule, monitor, or take care of the work, deliveries, food hygiene, or property conditions provided by listed third parties.
              </li>
              <li>
                <strong>No Dispute Resolution:</strong> We are under no obligation to intervene in disputes, financial losses, non-deliveries, or legal conflicts between users and service providers.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                3
              </span>
              <span>No Guarantees or Warranties</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              All information shared on our website or official communication channels is provided strictly on an <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without guarantees or warranties of any kind.
            </p>
            <ul className="sm:pl-11 space-y-2 list-disc list-inside text-slate-600">
              <li>
                <strong>No Authenticity Guarantee:</strong> We do not verify, screen, endorse, or conduct background checks on listed providers, their credentials, licenses, or legal standing.
              </li>
              <li>
                <strong>No Quality or Safety Guarantee:</strong> We offer zero warranties regarding the safety, quality, skill level, durability, legality, accuracy, or fitness for purpose of any property, service, food item, or product listed.
              </li>
              <li>
                <strong>No Fraud Protection:</strong> We are not responsible or liable for scams, fake documents, misrepresentation, fraudulent payment requests, or dishonest behavior by any listed vendor or user.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                4
              </span>
              <span>User Duty &amp; Mandatory Due Diligence</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              By using Central Marketplace, you acknowledge and agree that any contact, deal, property visit, payment, or agreement you make is conducted <strong>entirely at your own sole risk</strong>.
            </p>
            <div className="sm:pl-11 space-y-2 text-slate-600">
              <p className="font-semibold text-slate-800">Users must always:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Independently inspect properties, products, and scope of work in person before paying money or signing agreements.</li>
                <li>Verify identity cards, legal ownership, business licenses, and official credentials of service providers.</li>
                <li>Never transfer money, advance deposits, or UPI payments to unverified individuals based solely on a listing.</li>
                <li>Keep direct receipts and written agreements directly with the service provider.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                5
              </span>
              <span>Terms for Listed Businesses &amp; Providers</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              If you submit a business, property, or service listing to Central Marketplace:
            </p>
            <ul className="sm:pl-11 space-y-2 list-disc list-inside text-slate-600">
              <li>You confirm that all information, photos, pricing, and contact details provided are accurate and truthful.</li>
              <li>You confirm you possess all required statutory approvals, permits, and licenses to offer your advertised service or goods.</li>
              <li>Central Marketplace reserves the right to edit, suspend, or permanently remove any listing at any time without prior notice or refund.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                6
              </span>
              <span>Limitation of Liability</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              To the maximum extent permitted by law, Central Marketplace, its operators, founders, and affiliates shall <strong>NOT be liable for any direct, indirect, incidental, consequential, or punitive damages</strong>, including monetary loss, property damage, personal injury, stolen funds, or loss of business arising from:
            </p>
            <ul className="sm:pl-11 space-y-2 list-disc list-inside text-slate-600">
              <li>Your reliance on any contact details or listing published on the platform.</li>
              <li>Any transaction, deal, payment, or service agreement made with a listed provider.</li>
              <li>Any error, omission, delay, or interruption in platform availability.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="border-b border-slate-200 pb-8 space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                7
              </span>
              <span>Indemnification</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              You agree to indemnify, defend, and hold harmless Central Marketplace from any claims, damages, losses, liabilities, costs, or legal fees resulting from your use of any listing, your dealings with listed vendors, or your violation of these Terms &amp; Conditions.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                8
              </span>
              <span>Governing Law &amp; Jurisdiction</span>
            </h2>
            <p className="text-slate-600 sm:pl-11">
              These Terms &amp; Conditions are governed by the laws of India. Courts located in Chennai, Tamil Nadu shall have exclusive jurisdiction over any legal disputes arising in connection with this platform.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

