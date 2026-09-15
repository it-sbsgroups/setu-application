import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Press & Media",
  description: `Latest news, press releases and media resources from ${SITE_NAME}.`,
  alternates: { canonical: "/press" },
  openGraph: { type: "website", url: `${SITE_URL}/press` },
};

/* ─── Inline data (move to lib/data/company.js later if you want) ─── */

const PRESS_RELEASES = [
  {
    date: "2026-08-12",
    tag: "Product",
    title: "SbS launches end-to-end encrypted vendor portal",
    excerpt:
      "The new portal gives sellers real-time order tracking, payout visibility, and a native negotiation console.",
  },
  {
    date: "2026-06-03",
    tag: "Funding",
    title: `Series B round to scale ${SITE_NAME} logistics network`,
    excerpt:
      "Fresh capital will expand regional warehouses from 20 to 45 cities over the next 18 months.",
  },
  {
    date: "2026-04-18",
    tag: "Expansion",
    title: "10 lakh SKUs milestone achieved",
    excerpt:
      "Catalogue now spans every major industrial category, from power tools to material handling.",
  },
  {
    date: "2026-02-01",
    tag: "Sustainability",
    title: "Carbon-neutral warehouses by 2028 pledge",
    excerpt:
      "Company commits to 100% renewable-powered warehousing within three years.",
  },
  {
    date: "2025-11-20",
    tag: "Award",
    title: "Best B2B Marketplace — Industrial Category",
    excerpt:
      "Recognised at the India Business Excellence Awards 2025 for reliability and vendor trust.",
  },
];

const PRESS_COVERAGE = [
  {
    outlet: "The Economic Times",
    title: "How B2B marketplaces are reshaping Indian MSME procurement",
  },
  {
    outlet: "YourStory",
    title: "From 10 SKUs to 10 lakh: the SbS growth story",
  },
  {
    outlet: "Inc42",
    title: "Why vendor accountability is the next frontier in B2B commerce",
  },
  {
    outlet: "Business Standard",
    title: "Same-day dispatch is becoming table stakes for industrial e-commerce",
  },
];

/* ─── Helpers ─── */

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* ─── Page ─── */

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)",
        }}
      >
        <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:py-14 lg:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-1 text-xs text-gray-400"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-300">Press &amp; Media</span>
          </nav>

          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-400">
            PRESS &amp; MEDIA
          </p>
          <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            Newsroom
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
            Announcements, coverage, and resources for journalists and partners
            covering Indian B2B commerce.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        {/* Press releases */}
        <section>
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">
            Latest Press Releases
          </h2>
          <div className="space-y-4">
            {PRESS_RELEASES.map((p) => (
              <article
                key={p.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-primary/30 sm:p-6"
              >
                <div className="mb-2 flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 font-bold uppercase tracking-wider text-primary">
                    {p.tag}
                  </span>
                  <time dateTime={p.date} className="text-gray-400">
                    {formatDate(p.date)}
                  </time>
                </div>
                <h3 className="font-display text-lg font-bold text-gray-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {p.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Media kit */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
                Media Kit
              </p>
              <h2 className="font-display mb-3 text-2xl font-black text-gray-900">
                Brand assets &amp; fact sheet
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                Logos, high-resolution imagery, founder bios, and a one-page
                company fact sheet — everything you need to write about SbS.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:press@sbsindustrial.in?subject=Media Kit Request"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
                >
                  Request Media Kit
                </a>
                <a
                  href="mailto:press@sbsindustrial.in"
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Contact Press Team
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Press Contact
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                Corporate Communications
              </p>
              <p className="mt-1 text-sm text-gray-500">
                📧 press@sbsindustrial.in
              </p>
              <p className="mt-1 text-sm text-gray-500">
                📞 +91 1800-XXX-XXXX
              </p>
              <p className="mt-3 text-[11px] text-gray-400">
                We respond to press enquiries within 1 business day.
              </p>
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section>
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">
            In the News
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRESS_COVERAGE.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {c.outlet}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  “{c.title}”
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}