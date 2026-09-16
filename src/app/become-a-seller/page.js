import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";

export const metadata = {
  title: "Become a Seller",
  description: `List your products on ${SITE_NAME} — India's B2B marketplace for industrial supplies.`,
  alternates: { canonical: "/become-a-seller" },
  openGraph: { type: "website", url: `${SITE_URL}/become-a-seller` },
};

const BENEFITS = [
  { icon: "🇮🇳", title: "Pan-India Reach", desc: "Sell to 50,000+ businesses across 19,000+ pin codes." },
  { icon: "💰", title: "Low Commission", desc: "Flat 4–8% commission, no listing fees, transparent payouts." },
  { icon: "📦", title: "Logistics Support", desc: "Optional pickup, warehousing and last-mile integration." },
  { icon: "📊", title: "Seller Dashboard", desc: "Real-time orders, inventory, and payout visibility." },
  { icon: "🛡️", title: "Fair Dispute Desk", desc: "Neutral resolution when buyer-seller disputes arise." },
  { icon: "📞", title: "Dedicated Onboarding", desc: "Assistance with cataloguing, GST and compliance." },
];

const STEPS = [
  { n: "01", title: "Apply online", desc: "Fill the seller application with your GSTIN and business details." },
  { n: "02", title: "KYC verification", desc: "Our onboarding team verifies your details within 3 working days." },
  { n: "03", title: "Catalogue upload", desc: "Upload products with pricing, specs and images — or use our bulk CSV tool." },
  { n: "04", title: "Start selling", desc: "Go live and start receiving orders across India." },
];

export default function BecomeSellerPage() {
  return (
    <>
      <PageHero
        eyebrow="PARTNERS"
        title="Sell on SbS Industrial & B2B"
        subtitle="Reach India's largest base of B2B industrial buyers — manufacturers, contractors, MSMEs, and government suppliers."
        breadcrumbs={[{ label: "Become a Seller" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              Why Sell With Us
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              Built for serious sellers
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                  {b.icon}
                </div>
                <h3 className="font-display mb-1 text-sm font-bold text-gray-900">{b.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              The Journey
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              From application to first order in 4 steps
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="font-display text-2xl font-black text-primary">{s.n}</p>
                <h3 className="font-display mt-2 text-sm font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-8 text-center sm:p-12">
          <h2 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">
            Ready to grow with SbS?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-300">
            Send us your details — our onboarding team will reach out within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:sellers@sbsindustrial.in?subject=Seller Application"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
            >
              Apply Now
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Talk to Our Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}