import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";

export const metadata = {
  title: "Replacement & Return Policy",
  description: `Our replacement-only policy — how wrong, damaged, or defective items are handled at ${SITE_NAME}.`,
  alternates: { canonical: "/return-policy" },
  openGraph: { type: "website", url: `${SITE_URL}/return-policy` },
};

const COVERED = [
  "Wrong item delivered (different SKU, size, or model)",
  "Damaged in transit (with photos at delivery)",
  "Defective on arrival (DOA) — fails within 48 hours of delivery",
  "Missing accessories or parts listed in the product description",
];

const NOT_COVERED = [
  "Change of mind after order confirmation",
  "Custom-configured or made-to-order items",
  "Items damaged after successful delivery & acceptance",
  "Normal wear and tear from usage",
];

const PROCESS = [
  { step: "01", title: "Raise a request", desc: "From your order page or by calling our helpline within 48 hours of delivery." },
  { step: "02", title: "Share proof", desc: "Upload unboxing photos or video showing the issue — takes under a minute." },
  { step: "03", title: "Verification", desc: "Our team verifies with the vendor within 24 hours during working days." },
  { step: "04", title: "Free replacement", desc: "Replacement dispatched within 2–4 business days at no cost to you." },
];

export default function ReturnPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="POLICY"
        title="Replacement-Only Policy"
        subtitle="We don't believe in the hassle of returns. If something is wrong, we replace it — free of cost — and take instant action against the vendor responsible."
        breadcrumbs={[{ label: "Return Policy" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        {/* Intro */}
        <section className="rounded-2xl border border-orange-100 bg-orange-50/60 p-6 sm:p-8">
          <h2 className="font-display mb-3 text-xl font-black text-gray-900">
            Our promise in one line
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            We operate on a <strong>replacement-only model</strong>. There is no
            return shipment, no refund paperwork, no waiting weeks for a
            resolution. If you receive a wrong, damaged, or defective item, we
            verify it quickly, replace it free of cost, and penalise the vendor
            under our seller agreement.
          </p>
        </section>

        {/* Covered / Not covered */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
            <h3 className="font-display mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-sm">
                ✓
              </span>
              What&apos;s covered
            </h3>
            <ul className="space-y-3">
              {COVERED.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-gray-600"
                >
                  <span className="mt-1 shrink-0 text-green-600">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
            <h3 className="font-display mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-sm">
                ✕
              </span>
              What&apos;s not covered
            </h3>
            <ul className="space-y-3">
              {NOT_COVERED.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-relaxed text-gray-600"
                >
                  <span className="mt-1 shrink-0 text-red-500">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Process */}
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              The Process
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              How a replacement works
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div
                key={p.step}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-black text-primary">
                  {p.step}
                </p>
                <h3 className="font-display mt-2 text-sm font-bold text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vendor accountability */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-8 text-center sm:p-12">
          <h2 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">
            Vendor accountability
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-gray-300">
            Vendors found delivering wrong, damaged, or substandard items face
            immediate penalties under our seller agreement — including listing
            suspension, financial clawback, and permanent removal for repeated
            offences. You never have to fight for a resolution.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
            >
              Raise a Request
            </Link>
            <Link
              href="/help"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Visit Help Center
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}