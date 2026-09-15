"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/data/footer";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { useUI } from "@/context/UIContext";

const CATEGORY_NAMES = new Set(CATEGORIES.map((c) => c.name));

const QUICK_LINK_HREFS = {
  Home: "/",
  "New Arrivals": "/new-arrivals",
  "Today's Deals": "/deals",
};

// Only links with real destinations get hrefs — everything else renders as
// inert text so we don't ship dead buttons.
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

export default function Footer() {
  const { openTrack } = useUI();

  /** Resolves a footer label to a real destination where one exists; otherwise the link renders as inert text. */
  function hrefFor(columnTitle, label) {
    if (columnTitle === "Categories" && CATEGORY_NAMES.has(label))
      return `/category/${slugifyCategory(label)}`;
    if (columnTitle === "Quick Links" && QUICK_LINK_HREFS[label])
      return QUICK_LINK_HREFS[label];
    if (columnTitle === "Company" && COMPANY_HREFS[label])
      return COMPANY_HREFS[label];
    if (columnTitle === "Support" && SUPPORT_HREFS[label])
      return SUPPORT_HREFS[label];
    return null;
  }

  return (
    <footer className="mt-8 bg-navy">
      <div className="mx-auto max-w-screen-2xl px-4 pb-6 pt-12">
        <div className="mb-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="foot-col-title">{col.title}</h5>
              <ul>
                {col.links.map((link) => {
                  const href = hrefFor(col.title, link);
                  if (col.title === "Support" && link === "Track Your Order") {
                    return (
                      <li key={link}>
                        <button type="button" onClick={openTrack} className="foot-link">
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
                      <span className="foot-link cursor-default hover:text-gray-400">{link}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
            <div className="flex shrink-0 items-center gap-2">
              <Logo size={34} />
              <div className="text-xs leading-tight" style={{ color: "#FF6B35" }}>
                Industrial
                <br />
                &amp; B2B
              </div>
            </div>

            <div className="hidden h-14 w-px bg-white/15 lg:block" />

            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <p className="max-w-2xl text-xs leading-relaxed text-gray-400">
                India&apos;s leading B2B marketplace for industrial, engineering, and safety products — 10 lakh+ SKUs,
                50,000+ verified brands, and same-day dispatch for businesses across the country.
              </p>

              <div className="flex shrink-0 items-center gap-2 sm:ml-auto" aria-label="Follow SbS on social media">
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

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-center text-xs text-gray-500 md:text-left">
            © {new Date().getFullYear()} Setu India Pvt. Ltd. All rights reserved. CIN: U74999DL2014PTC274263
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-gray-500">We accept:</span>
            <span className="rounded bg-white/5 px-2 py-1 text-xs text-gray-400">💳 Visa</span>
            <span className="rounded bg-white/5 px-2 py-1 text-xs text-gray-400">🏦 Net Banking</span>
            <span className="rounded bg-white/5 px-2 py-1 text-xs text-gray-400">📲 UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}