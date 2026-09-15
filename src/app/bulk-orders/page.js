import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import BulkOrderForm from "@/components/pages/BulkOrderForm";

export const metadata = {
  title: "Bulk Orders",
  description: `Get volume-based B2B pricing, dedicated account managers, and priority dispatch on bulk orders at ${SITE_NAME}.`,
  alternates: { canonical: "/bulk-orders" },
  openGraph: { type: "website", url: `${SITE_URL}/bulk-orders` },
};

const BENEFITS = [
  { icon: "💰", title: "Tier-Based Pricing", desc: "Automatic volume discounts at 3, 5, 10, and 25+ units — plus custom quotes beyond that." },
  { icon: "📄", title: "30-Day Credit Terms", desc: "Verified businesses can order now, pay in 30 days with GST-compliant invoicing." },
  { icon: "🚚", title: "Priority Dispatch", desc: "Bulk orders are picked, packed, and dispatched ahead of standard shipments." },
  { icon: "🧑‍💼", title: "Dedicated Account Manager", desc: "A single point of contact for quotations, negotiations, and after-sales." },
  { icon: "📊", title: "Custom Reporting", desc: "Monthly spend analytics, category breakdowns, and consolidated GST invoices." },
  { icon: "🛡️", title: "Replacement Guarantee", desc: "Wrong or damaged items in bulk shipments are replaced free, with vendor penalties." },
];

const STEPS = [
  { n: "01", title: "Submit your enquiry", desc: "Share products, quantities, and delivery locations." },
  { n: "02", title: "Receive a tailored quote", desc: "Our team sends a formal quotation within 24 hours." },
  { n: "03", title: "Negotiate & confirm", desc: "Discuss pricing with your account manager — confirm via OTP or PO." },
  { n: "04", title: "Dispatch & deliver", desc: "Priority dispatch with tracking and dedicated support through delivery." },
];

export default function BulkOrdersPage() {
  return (
    <>
      <PageHero
        eyebrow="BULK ORDERS"
        title="Volume Procurement, Done Right"
        subtitle="From 100 units to 100,000 — get tailored pricing, credit terms, and priority delivery for your business."
        breadcrumbs={[{ label: "Bulk Orders" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        {/* Benefits */}
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              Why Buy Bulk
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              Built for serious buyers
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                  {b.icon}
                </div>
                <h3 className="font-display mb-1 text-sm font-bold text-gray-900">
                  {b.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              The Journey
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              From enquiry to delivery in 4 steps
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-black text-primary">
                  {s.n}
                </p>
                <h3 className="font-display mt-2 text-sm font-bold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-3xl">
          <BulkOrderForm />
        </section>
      </div>
    </>
  );
}