import { CATEGORY_PRODUCTS, SECTIONS } from "@/lib/data/products";
import { thumb } from "@/lib/format";

// Recognised brand tokens we scan product names for. Falls back to the
// product's first word when nothing matches (keeps every product usable
// even though we don't hand-tag a brand field on each one).
const KNOWN_BRANDS = [
  "Bosch", "DeWalt", "Makita", "Hitachi", "Stanley", "Milwaukee", "Taparia", "Gedore", "Bahco",
  "3M", "Honeywell", "JSP", "Karam", "Mallcom", "Havells", "Legrand", "Philips", "Schneider", "ABB",
  "Finolex", "Astral", "Kirloskar", "Jaquar", "Supreme", "Fernox", "Fischer", "Hilti", "Norton",
  "Tyrolit", "Mirka", "Lincoln Electric", "Lincoln", "ESAB", "Victor", "Hobart", "Yale", "HP",
  "TP-Link", "Logitech", "Zebra", "APC", "D-Link",
];

export function extractBrand(name) {
  const found = KNOWN_BRANDS.find((brand) => name.includes(brand));
  return found || name.split(" ")[0];
}

/** Pulls a short model/spec token like "18V" or "1/2 inch" out of the name, for the spec table. */
function findInName(name, pattern, fallback) {
  const match = name.match(pattern);
  return match ? match[0] : fallback;
}

const CATEGORY_FEATURES = {
  "Power Tools": [
    "Brushless motor for longer runtime and reduced maintenance",
    "Ergonomic, low-vibration grip for extended use",
    "Variable speed trigger for precise control",
    "Compatible with standard accessory attachments",
  ],
  "Safety & PPE": [
    "Meets Indian and international safety certification standards",
    "Breathable, comfortable fit for full-shift wear",
    "Reinforced construction for extended durability",
    "Suitable for industrial, construction and lab environments",
  ],
  Electrical: [
    "ISI-marked for guaranteed quality and safety compliance",
    "Fire-retardant, low-smoke insulation where applicable",
    "Rated for continuous industrial and commercial use",
    "Backed by manufacturer warranty and after-sales support",
  ],
  "Hand Tools": [
    "Forged from chrome vanadium steel for high strength",
    "Corrosion-resistant finish for long service life",
    "Ergonomic handle reduces hand fatigue on long jobs",
    "Precision-machined for accurate, secure fit",
  ],
  Plumbing: [
    "Leak-proof joints rated for high working pressure",
    "UV and corrosion resistant for indoor/outdoor use",
    "ISI-certified material for potable water safety",
    "Easy to install with standard fittings",
  ],
  Fasteners: [
    "High-tensile strength for structural applications",
    "Consistent thread quality to DIN/IS standards",
    "Corrosion-resistant coating options available",
    "Supplied in bulk packs for project use",
  ],
  Abrasives: [
    "Engineered for consistent stock removal and finish",
    "Rated for high RPM industrial use",
    "Reduced vibration for operator comfort",
    "Long service life reduces per-cut cost",
  ],
  Welding: [
    "Stable arc performance across the rated current range",
    "Thermal overload protection built in",
    "Suitable for site and workshop use",
    "Compatible with standard consumables",
  ],
  "Material Handling": [
    "Heavy-duty construction rated for daily warehouse use",
    "Smooth-rolling wheels/mechanism for easy movement",
    "Space-efficient design for tight aisles",
    "Low-maintenance build with long service life",
  ],
  "IT & Office": [
    "Reliable performance for daily business use",
    "Easy setup with standard connectivity options",
    "Energy-efficient operation",
    "Backed by manufacturer warranty and service support",
  ],
};

function buildSpecs(product, brand) {
  const name = product.name;
  const base = [{ label: "Brand", value: brand }];

  switch (product.cat) {
    case "Power Tools":
      return [
        ...base,
        { label: "Power Source", value: /cordless/i.test(name) ? "Cordless" : "Corded" },
        { label: "Voltage", value: findInName(name, /\d+(\.\d+)?V/i, "220V–240V") },
        { label: "No Load Speed", value: findInName(name, /\d{3,5}\s?rpm/i, "0–2800 rpm") },
        { label: "Chuck/Collet Size", value: findInName(name, /\d+(\.\d+)?["]|\d+\/\d+["]/, "13mm") },
        { label: "Warranty", value: "1 Year Manufacturer Warranty" },
      ];
    case "Safety & PPE":
      return [
        ...base,
        { label: "Material", value: "Industrial-grade composite / textile" },
        { label: "Certification", value: "IS / ANSI compliant" },
        { label: "Size", value: "Free / Universal" },
        { label: "Pack Of", value: findInName(name, /Pack of \d+/i, "1") },
        { label: "Warranty", value: "6 Months" },
      ];
    case "Electrical":
      return [
        ...base,
        { label: "Rated Voltage", value: findInName(name, /\d+(\.\d+)?\s?(sq mm|A|kW)/i, "230V") },
        { label: "Certification", value: /ISI/i.test(name) ? "ISI Marked" : "BIS Compliant" },
        { label: "Material", value: "PVC / Copper / Steel as applicable" },
        { label: "Application", value: "Residential & Industrial" },
        { label: "Warranty", value: "1–5 Years (see listing)" },
      ];
    case "Hand Tools":
      return [
        ...base,
        { label: "Material", value: "Chrome Vanadium Steel" },
        { label: "Finish", value: "Mirror / Matte Chrome" },
        { label: "Size", value: findInName(name, /\d+(\.\d+)?["]|\d+mm/i, "Standard") },
        { label: "Warranty", value: "Lifetime against manufacturing defects" },
      ];
    case "Plumbing":
      return [
        ...base,
        { label: "Material", value: /cpvc/i.test(name) ? "CPVC" : /upvc/i.test(name) ? "UPVC" : /brass/i.test(name) ? "Brass" : "Engineering Plastic / Metal" },
        { label: "Size", value: findInName(name, /\d+mm|\d+["]/i, "Standard") },
        { label: "Pressure Rating", value: "Up to 10 kgf/cm²" },
        { label: "Certification", value: "ISI Certified" },
        { label: "Warranty", value: "1 Year" },
      ];
    case "Fasteners":
      return [
        ...base,
        { label: "Material", value: /stainless/i.test(name) ? "Stainless Steel" : "Carbon Steel" },
        { label: "Grade", value: findInName(name, /Grade\s?[\d.]+/i, "Grade 8.8") },
        { label: "Size", value: findInName(name, /M\d+(x\d+)?/i, "Standard") },
        { label: "Pack Quantity", value: findInName(name, /Pack of \d+|\(\d+\s?p(ie)?c(e)?s?\)/i, "1") },
      ];
    case "Abrasives":
      return [
        ...base,
        { label: "Diameter", value: findInName(name, /\d+mm/i, "115mm") },
        { label: "Grit", value: findInName(name, /[A-Z]?\d{2,3}G?/, "60 Grit") },
        { label: "Max RPM", value: "Up to 13,300 RPM" },
        { label: "Pack Quantity", value: findInName(name, /\(\d+\s?p(ie)?c(e)?s?\)/i, "1") },
      ];
    case "Welding":
      return [
        ...base,
        { label: "Type", value: /mig/i.test(name) ? "MIG" : /tig/i.test(name) ? "TIG" : "Arc / MMA" },
        { label: "Input Voltage", value: findInName(name, /\d+V/i, "220V–415V") },
        { label: "Duty Cycle", value: "60% at rated output" },
        { label: "Warranty", value: "1–2 Years" },
      ];
    case "Material Handling":
      return [
        ...base,
        { label: "Capacity", value: findInName(name, /\d+\s?(kg|ton|Ton)/i, "500 kg") },
        { label: "Material", value: "Mild Steel / Engineering Plastic" },
        { label: "Application", value: "Warehouse & Industrial" },
        { label: "Warranty", value: "1 Year" },
      ];
    case "IT & Office":
      return [
        ...base,
        { label: "Connectivity", value: /wifi|wireless/i.test(name) ? "Wireless" : "Wired / USB" },
        { label: "Power Input", value: "AC 100–240V" },
        { label: "Warranty", value: "1–3 Years" },
      ];
    default:
      return base;
  }
}

function buildDescription(product, brand) {
  const section = SECTIONS.find((s) => s.name === product.cat);
  const tagline = section?.tagline || product.cat;
  return [
    `The ${product.name} from ${brand} is built for professionals and businesses who need dependable performance without compromise. Backed by ${brand}'s manufacturing standards, it fits seamlessly into daily industrial, commercial, or workshop use.`,
    `Part of our ${product.cat} range — "${tagline}" — this product is sourced from verified sellers and comes with GST invoicing, full manufacturer warranty, and access to SbS's bulk B2B pricing for larger orders. We operate on a replacement-only model: wrong or damaged items are replaced free of cost, with instant action taken against responsible vendors. Our tele-caller team provides pre- and post-warranty support at every step, available 10 AM to 6 PM on working days.`,
    `Whether you're outfitting a single site or restocking across multiple locations, our team can help with bulk quotes, credit terms, and dedicated account support for this product.`,
  ];
}

// Small deterministic PRNG (mulberry32) so reviews/gallery stay identical
// between server render and client hydration — no Math.random() here.
function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const REVIEWER_NAMES = ["Amit Sharma", "Priya Nair", "Rajesh Kumar", "Sunita Rao", "Vikram Singh", "Anjali Gupta", "Manoj Patel", "Deepak Verma", "Kavita Joshi", "Suresh Iyer"];
const REVIEW_TEMPLATES = [
  { title: "Great value for money", body: "Works exactly as described. Build quality feels solid for the price, and delivery was faster than expected." },
  { title: "Good product, would recommend", body: "Been using this for a few weeks on-site. No issues so far, does the job well." },
  { title: "As expected, genuine product", body: "Matched the listing exactly. Packaging was secure and invoice was provided for GST claim." },
  { title: "Solid performance", body: "Performs well under regular daily use. Slightly heavier than I expected but that's not a dealbreaker." },
  { title: "Decent for the price range", body: "Does what it's supposed to. Not premium-grade but perfectly fine for regular use." },
  { title: "Reliable purchase", body: "Second time ordering from this category on SbS. Consistent quality and quick support when I had a question." },
];
const REVIEW_AGE_LABELS = ["2 weeks ago", "1 month ago", "6 weeks ago", "2 months ago", "3 months ago"];

function buildReviews(product) {
  const rand = seededRandom(product.id * 97);
  const count = 3 + Math.floor(rand() * 2); // 3–4 reviews
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const template = REVIEW_TEMPLATES[Math.floor(rand() * REVIEW_TEMPLATES.length)];
    const rating = Math.max(3, Math.min(5, Math.round(product.rating + (rand() - 0.5))));
    reviews.push({
      id: `${product.id}-${i}`,
      name: REVIEWER_NAMES[Math.floor(rand() * REVIEWER_NAMES.length)],
      rating,
      age: REVIEW_AGE_LABELS[Math.floor(rand() * REVIEW_AGE_LABELS.length)],
      title: template.title,
      body: template.body,
      verified: true,
      helpful: 1 + Math.floor(rand() * 40),
    });
  }
  return reviews;
}

function buildRatingBreakdown(product, reviewCount) {
  // Skews toward 5/4 stars in proportion to the product's overall rating —
  // a plausible distribution rather than a real per-review tally.
  const weights = [0.02, 0.03, 0.07, 0.28, 0.6].map((w, i) => (i >= 3 ? w * (product.rating / 5) * 1.3 : w));
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => Math.round((w / total) * 100)).reverse(); // [5-star%, 4-star%, ...]
}

/** Builds a small photo gallery by pairing the product's own image with a few others from the same category. */
function buildGallery(product) {
  const siblings = (CATEGORY_PRODUCTS[product.cat] || []).filter((p) => p.id !== product.id);
  const rand = seededRandom(product.id);
  const picks = [];
  const pool = [...siblings];
  while (picks.length < 3 && pool.length) {
    const idx = Math.floor(rand() * pool.length);
    picks.push(pool.splice(idx, 1)[0]);
  }
  return [thumb(product.img, 600), ...picks.map((p) => thumb(p.img, 600))];
}

/** The single entry point pages should use — bundles everything the PDP needs for one product. */
export function getProductDetail(product) {
  const brand = extractBrand(product.name);
  const reviews = buildReviews(product);
  return {
    ...product,
    brand,
    features: CATEGORY_FEATURES[product.cat] || [],
    specs: buildSpecs(product, brand),
    description: buildDescription(product, brand),
    gallery: buildGallery(product),
    reviews,
    ratingBreakdown: buildRatingBreakdown(product, reviews.length),
  };
}

/** Similar products = other items in the same category, excluding the current one. */
export function getSimilarProducts(product, limit = 6) {
  return (CATEGORY_PRODUCTS[product.cat] || []).filter((p) => p.id !== product.id).slice(0, limit);
}
