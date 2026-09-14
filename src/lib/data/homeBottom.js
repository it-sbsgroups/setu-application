import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { BRANDS } from "@/lib/data/footer";

/**
 * Content for the bottom-of-homepage SEO + trust block (About, Popular
 * Searches, Key Values). Pure data, no JSX — imported by both server and
 * client components so Next.js can tree-shake per entry point.
 */

export const ABOUT = {
  eyebrow: "ABOUT SBS INDUSTRIAL & B2B",
  heading: "India's Trusted B2B Marketplace for Industrial, Safety & Engineering Supplies",
  intro:
    "SbS Industrial & B2B is India's fastest-growing B2B marketplace for industrial, engineering, and safety supplies — connecting 50,000+ verified brands with businesses, contractors, factories, and MSMEs across 19,000+ pin codes.",
  more: [
    "From power tools and safety PPE to electrical, plumbing, fasteners, welding, and material handling — our catalogue spans 10 lakh+ SKUs across 10 core categories, all backed by GST invoicing, same-day dispatch, and doorstep delivery.",
    "We work directly with authorised distributors and OEMs to guarantee 100% genuine products, transparent bulk pricing, and credit terms built for business. Whether you're outfitting a single site or restocking a multi-location operation, our dedicated B2B team handles everything from quote to delivery.",
    "Trusted by construction companies, manufacturing plants, government contractors, and MSMEs nationwide, SbS is engineered to make industrial procurement faster, cheaper, and more reliable.",
  ],
  stats: [
    { value: "10 Lakh+", label: "Products Listed" },
    { value: "50,000+", label: "Verified Brands" },
    { value: "19,000+", label: "Pin Codes Served" },
    { value: "50 Lakh+", label: "Orders Delivered" },
  ],
};

export const KEY_VALUES = [
  {
    icon: "🛡️",
    title: "100% Genuine Products",
    desc: "Sourced directly from authorised distributors and OEMs, with full GST invoicing on every order.",
  },
  {
    icon: "💰",
    title: "Bulk B2B Pricing",
    desc: "Tier-based pricing, credit terms, and a dedicated account manager for business buyers.",
  },
  {
    icon: "🚚",
    title: "Vendor-Driven Delivery",
    desc: "Free delivery is offered only when the vendor supports it — otherwise delivery charges are borne by the buyer.",
  },
  {
    icon: "🔄",
    title: "Replacement-Only Policy",
    desc: "We don't accept returns. Wrong or damaged items are replaced free of cost, with instant action against responsible vendors.",
  },
  {
    icon: "📞",
    title: "Pre & Post-Warranty Support",
    desc: "Our tele-caller team assists at every step — before and after warranty. Available 10 AM to 6 PM on working days.",
  },
  {
    icon: "🔒",
    title: "End-to-End Encrypted",
    desc: "Your data is never shared with any third party or personal. Used only internally to improve our platform and deliver specialised features to you.",
  },
];

/**
 * Popular Searches — 4 tabbed groups, Moglix-style. Because we render every
 * panel in the DOM (inactive ones with the `hidden` attribute), search engines
 * still index all ~60 links even though users see one tab at a time.
 */
export const POPULAR_SEARCHES = [
  {
    id: "categories",
    label: "Popular Categories",
    links: CATEGORIES.map((c) => ({
      label: c.name,
      href: `/category/${slugifyCategory(c.name)}`,
    })),
  },
  {
    id: "subcategories",
    label: "Trending Sub-Categories",
    links: [
      { label: "Cordless Drills", href: "/category/power-tools" },
      { label: "Angle Grinders", href: "/category/power-tools" },
      { label: "Rotary Hammers", href: "/category/power-tools" },
      { label: "Safety Helmets", href: "/category/safety-ppe" },
      { label: "N95 Respirators", href: "/category/safety-ppe" },
      { label: "Cut-Resistant Gloves", href: "/category/safety-ppe" },
      { label: "FR PVC Wires", href: "/category/electrical" },
      { label: "MCBs & RCCBs", href: "/category/electrical" },
      { label: "LED Panel Lights", href: "/category/electrical" },
      { label: "CPVC Pipes", href: "/category/plumbing" },
      { label: "Monoblock Pumps", href: "/category/plumbing" },
      { label: "Hex Bolts & Nuts", href: "/category/fasteners" },
      { label: "Flap Discs", href: "/category/abrasives" },
      { label: "MIG Welders", href: "/category/welding" },
      { label: "Platform Trolleys", href: "/category/material-handling" },
      { label: "Business Printers", href: "/category/it-office" },
    ],
  },
  {
    id: "brands",
    label: "Top Brands",
    links: BRANDS.map((b) => ({ label: b, href: "/categories" })),
  },
  {
    id: "cities",
    label: "Shop by City",
    links: [
      "Mumbai",
      "Delhi NCR",
      "Bengaluru",
      "Pune",
      "Chennai",
      "Hyderabad",
      "Ahmedabad",
      "Kolkata",
      "Surat",
      "Jaipur",
      "Coimbatore",
      "Indore",
      "Ludhiana",
      "Vadodara",
      "Nagpur",
      "Kanpur",
    ].map((city) => ({
      label: `Industrial Supplies in ${city}`,
      href: "/categories",
    })),
  },
];