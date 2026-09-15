import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import ContactForm from "@/components/pages/ContactForm";
import { CONTACT_DEPARTMENTS, CONTACT_HOURS } from "@/lib/data/company";

export const metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE_NAME}. Phone, email, and department contacts for sales, support, and press.`,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", url: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT US"
        title="We're here to help"
        subtitle="Reach out to our teams for sales, support, vendor onboarding, or anything else."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="space-y-4">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-display mb-3 text-base font-bold text-gray-900">
                Business Hours
              </h3>
              <ul className="space-y-2 text-sm">
                {CONTACT_HOURS.map((h) => (
                  <li
                    key={h.days}
                    className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0"
                  >
                    <span className="text-gray-500">{h.days}</span>
                    <span className="font-semibold text-gray-800">
                      {h.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-orange-50 px-3 py-2 text-[11px] text-orange-800">
                📞 All calls are attended by our tele-caller team during the
                hours above. For urgent order issues, mention your ORN.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-display mb-3 text-base font-bold text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-primary hover:underline">
                    → Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-policy"
                    className="text-primary hover:underline"
                  >
                    → Return & Replacement Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bulk-orders"
                    className="text-primary hover:underline"
                  >
                    → Bulk Orders
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Departments */}
        <section className="mt-12">
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">
            Department Directory
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_DEPARTMENTS.map((d) => (
              <div
                key={d.name}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display text-sm font-bold text-gray-900">
                  {d.name}
                </h3>
                <a
                  href={`mailto:${d.email}`}
                  className="mt-2 block text-xs font-medium text-primary hover:underline"
                >
                  📧 {d.email}
                </a>
                <p className="mt-1 text-xs text-gray-500">📞 {d.phone}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}