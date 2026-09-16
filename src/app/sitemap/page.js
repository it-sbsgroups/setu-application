import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { BRANDS } from "@/lib/data/brands";
import { TRUST_PILLARS } from "@/lib/data/trustPillars";

export const metadata = {
  title: "Sitemap",
  description: `Every page on ${SITE_NAME}, in one place.`,
  alternates: { canonical: "/sitemap" },
  openGraph: { type: "website", url: `${SITE_URL}/sitemap` },
};

const GROUPS = [
  {
    heading: "Shop",
    links: [
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Today's Deals", href: "/deals" },
      { label: "Bulk Orders", href: "/bulk-orders" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { label: "Why Buy from SbS", href: "/trust" },
      ...TRUST_PILLARS.map((p) => ({ label: p.title, href: `/trust/${p.slug}` })),
    ],
  },
  {
    heading: "Support & Legal",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Return Policy", href: "/return-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Grievance Officer", href: "/grievance" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="SITEMAP"
        title="Every page, in one place"
        subtitle="A complete index of our catalogue, brand pages, trust pillars, and policy pages."
        breadcrumbs={[{ label: "Sitemap" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-8 px-4 py-12">
        {GROUPS.map((group) => (
          <section
            key={group.heading}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 className="font-display mb-4 text-lg font-black text-gray-900 sm:text-xl">
              {group.heading}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-600 hover:text-primary"
                  >
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display mb-4 text-lg font-black text-gray-900 sm:text-xl">
            Categories
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <li key={c.name}>
                <Link
                  href={`/category/${slugifyCategory(c.name)}`}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  → {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display mb-4 text-lg font-black text-gray-900 sm:text-xl">
            Brands
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {BRANDS.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/brand/${b.slug}`}
                  className="text-sm text-gray-600 hover:text-primary"
                >
                  → {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}