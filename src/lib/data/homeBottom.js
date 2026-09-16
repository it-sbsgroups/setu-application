import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { BRANDS as BRAND_LIST } from "@/lib/data/brands";

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

/**
 * "Why Industries Choose Us" — six pillars targeted at manufacturing plants,
 * EPC contractors, MSMEs, infra projects, and government buyers. Each pillar
 * mirrors a real procurement pain point these buyers face today.
 */
export const KEY_VALUES = [
  {
    icon: "🏭",
    title: "Built for Industrial Scale",
    desc: "10 lakh+ industrial-grade SKUs across power tools, electrical, welding, fasteners and material handling — from single-unit workshops to multi-plant manufacturers.",
  },
  {
    icon: "📋",
    title: "Project & Bulk Procurement",
    desc: "Tier-based bulk pricing at 3, 5, 10 and 25+ units, plus custom quotations for project BOQs, annual rate contracts, and multi-location dispatch.",
  },
  {
    icon: "🛡️",
    title: "Compliance You Can Audit",
    desc: "Every order ships with GST invoice, ISI/BIS/CE certification, and full warranty documentation — ready for your plant audits and government tenders.",
  },
  {
    icon: "🔄",
    title: "Vendor Accountability",
    desc: "Wrong, damaged, or substandard items are replaced free of cost. Vendors at fault face instant action under our seller agreement — no downtime, no disputes.",
  },
  {
    icon: "🚚",
    title: "Plant-Gate Logistics",
    desc: "Same-day dispatch on orders before 2 PM, with freight partners who deliver to your MIDC unit, SEZ, industrial estate, or remote project site — across 19,000+ pin codes.",
  },
  {
    icon: "📞",
    title: "Dedicated Procurement Support",
    desc: "A single point of contact for RFQs, negotiations, warranty claims, and AMC coordination — available 10 AM to 6 PM on all working days.",
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
    links: BRAND_LIST.map((b) => ({
      label: b.name,
      href: `/brand/${b.slug}`,
    })),
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