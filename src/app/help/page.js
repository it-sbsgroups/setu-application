import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import HelpSearch from "@/components/pages/HelpSearch";
import { HELP_CATEGORIES } from "@/lib/data/help";

export const metadata = {
  title: "Help Center",
  description: `Find answers to your questions about orders, delivery, replacements, and more on ${SITE_NAME}.`,
  alternates: { canonical: "/help" },
  openGraph: { type: "website", url: `${SITE_URL}/help` },
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="HELP CENTER"
        title="How can we help you today?"
        subtitle="Search our knowledge base or browse common topics below."
        breadcrumbs={[{ label: "Help Center" }]}
      />

      <div className="mx-auto max-w-screen-2xl px-4 pb-12">
        <HelpSearch />

        <section className="mt-12">
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">
            Browse by Topic
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {HELP_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                id={`help-${cat.id}`}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-xl">
                    {cat.icon}
                  </span>
                  <h3 className="font-display text-base font-bold text-gray-900">
                    {cat.title}
                  </h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {cat.faqs.map((faq) => (
                    <li key={faq.q}>
                      <details className="group py-3">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-gray-700 [&::-webkit-details-marker]:hidden">
                          {faq.q}
                          <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-2 text-xs leading-relaxed text-gray-500">
                          {faq.a}
                        </p>
                      </details>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-gradient-to-br from-navy to-navylight p-8 text-center sm:p-12">
          <h2 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">
            Still need help?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-300">
            Our team is available 10 AM – 6 PM on all working days.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
            >
              Contact Support
            </Link>
            <Link
              href="/return-policy"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Return Policy
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}