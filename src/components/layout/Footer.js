"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/data/footer";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { BRANDS as BRAND_LIST } from "@/lib/data/brands";
import { useUI } from "@/context/UIContext";

const CATEGORY_NAMES = new Set(CATEGORIES.map((c) => c.name));
const BRAND_NAME_TO_SLUG = Object.fromEntries(
  BRAND_LIST.flatMap((b) => [
    [b.name, b.slug],
    [b.displayName, b.slug],
  ])
);

const QUICK_LINK_HREFS = {
  Home: "/",
  "New Arrivals": "/new-arrivals",
  "Today's Deals": "/deals",
};

const COMPANY_HREFS = {
  "About Us": "/about",
  Careers: "/careers",
  "Press & Media": "/press",
  Sustainability: "/sustainability",
};

const SUPPORT_HREFS = {
  "Help Center": "/help",
  "Return Policy": "/return-policy",
  "Bulk Orders": "/bulk-orders",
  "Contact Us": "/contact",
};

const SOLUTIONS_HREFS = {
  "Bulk Orders": "/bulk-orders",
};

const PARTNERS_HREFS = {
  "Become a Seller": "/become-a-seller",
};

const LEGAL_HREFS = {
  "Privacy Policy": "/privacy-policy",
  "Terms of Use": "/terms-of-use",
  "Cookie Policy": "/cookie-policy",
  Sitemap: "/sitemap",
  "Grievance Officer": "/grievance",
  "Report Infringement": "/grievance",
};

export default function Footer() {
  const { openTrack } = useUI();

  /** Resolves a footer label to a real destination where one exists; otherwise the link renders as inert text. */
  function hrefFor(columnTitle, label) {
    if (columnTitle === "Categories" && CATEGORY_NAMES.has(label))
      return `/category/${slugifyCategory(label)}`;
    if (columnTitle === "Popular Brands" && BRAND_NAME_TO_SLUG[label])
      return `/brand/${BRAND_NAME_TO_SLUG[label]}`;
    if (columnTitle === "Quick Links" && QUICK_LINK_HREFS[label])
      return QUICK_LINK_HREFS[label];
    if (columnTitle === "Company" && COMPANY_HREFS[label])
      return COMPANY_HREFS[label];
    if (columnTitle === "Support" && SUPPORT_HREFS[label])
      return SUPPORT_HREFS[label];
    if (columnTitle === "Solutions" && SOLUTIONS_HREFS[label])
      return SOLUTIONS_HREFS[label];
    if (columnTitle === "Partners" && PARTNERS_HREFS[label])
      return PARTNERS_HREFS[label];
    if (columnTitle === "Legal" && LEGAL_HREFS[label])
      return LEGAL_HREFS[label];
    return null;
  }

  return (
    <footer className="mt-8 bg-navy">
      <div className="mx-auto max-w-screen-2xl px-4 pb-6 pt-10 sm:pt-12">
        <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:mb-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 md:grid-cols-5 lg:grid-cols-10">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="foot-col-title">{col.title}</h5>
              <ul>
                {col.links.map((link) => {
                  const href = hrefFor(col.title, link);

                  if (col.title === "Support" && link === "Track Your Order") {
                    return (
                      <li key={link}>
                        <button
                          type="button"
                          onClick={openTrack}
                          className="foot-link"
                        >
                          {link}
                        </button>
                      </li>
                    );
                  }

                  if (href) {
                    return (
                      <li key={link}>
                        <Link href={href} className="foot-link">
                          {link}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={link}>
                      <span className="foot-link cursor-default hover:text-gray-400">
                        {link}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
            <div className="flex shrink-0 items-center gap-2">
              <Logo size={34} />
              <div
                className="text-xs leading-tight"
                style={{ color: "#FF6B35" }}
              >
                Industrial
                <br />
                &amp; B2B
              </div>
            </div>

            <div className="hidden h-14 w-px bg-white/15 lg:block" />

            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <p className="max-w-2xl text-center text-xs leading-relaxed text-gray-400 sm:text-left">
                India&apos;s leading B2B marketplace for industrial,
                engineering, and safety products — 10 lakh+ SKUs, 50,000+
                verified brands, and same-day dispatch for businesses across
                the country.
              </p>

              <div
                className="flex shrink-0 items-center gap-2 sm:ml-auto"
                aria-label="Follow SbS on social media"
              >
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`soc-btn ${social.cls}`}
                    title={social.name}
                    aria-label={social.name}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 md:flex-row md:justify-between">
          <p className="text-center text-[11px] text-gray-500 md:text-left md:text-xs">
            © {new Date().getFullYear()} Setu India Pvt. Ltd. All rights reserved.
            <br className="md:hidden" />
            <span className="md:ml-1">CIN: U74999DL2014PTC274263</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-[11px] text-gray-500 sm:text-xs">
              We accept:
            </span>
            <span className="rounded bg-white/5 px-2 py-1 text-[11px] text-gray-400 sm:text-xs">
              💳 Visa
            </span>
            <span className="rounded bg-white/5 px-2 py-1 text-[11px] text-gray-400 sm:text-xs">
              🏦 Net Banking
            </span>
            <span className="rounded bg-white/5 px-2 py-1 text-[11px] text-gray-400 sm:text-xs">
              📲 UPI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}