import { PHOTO as P, thumb } from "@/lib/format";

let _id = 0;
/**
 * Small factory so each product literal below stays a single readable line.
 * `cat` is only needed for standalone entries (TRENDING/LATEST) that aren't
 * already grouped into one of the category arrays further down.
 */
function product(name, price, orig, rating, reviews, img, badge, cat) {
  return { id: ++_id, name, price, orig, rating, reviews, img, badge: badge || null, cat: cat || null };
}

export const HERO_SLIDES = [
  { badge: "MEGA SALE", title: "Power Tools Mega Sale", sub: "Up to 40% off on top brands — Bosch, DeWalt, Makita", cta: "Shop Now", bg: "linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)", base: "#1B2B4B", img: thumb(P.drill) },
  { badge: "NEW STOCK", title: "Safety First, Always", sub: "Complete PPE solutions — helmets, gloves, safety shoes & more", cta: "Explore PPE", bg: "linear-gradient(135deg,#065F46 0%,#059669 100%)", base: "#065F46", img: thumb(P.safety) },
  { badge: "HOT DEAL", title: "Electrical Solutions", sub: "Wires, switchgear, MCBs from Havells, Legrand & more", cta: "Buy Now", bg: "linear-gradient(135deg,#7C2D12 0%,#C2410C 100%)", base: "#7C2D12", img: thumb(P.elec) },
  { badge: "LAUNCH", title: "New Arrivals: Welding Range", sub: "Professional welding machines starting at ₹4,999", cta: "View All", bg: "linear-gradient(135deg,#3730A3 0%,#4F46E5 100%)", base: "#3730A3", img: thumb(P.weld) },
];

const POWER = [
  product("Bosch GSB 750 Drill Machine 750W", 3299, 4999, 4.5, 2341, P.drill, "Best Seller"),
  product('DeWalt DWE4120 Angle Grinder 4"', 4799, 6500, 4.6, 1876, P.grinder, "34% off"),
  product("Makita HP1631K Rotary Hammer 710W", 5999, 8200, 4.4, 987, P.tool3),
  product('Hitachi C7MFA Circular Saw 7¼"', 7499, 9999, 4.3, 654, P.tool4, "New"),
  product("Stanley FME640 Random Orbit Sander", 2199, 3100, 4.2, 432, P.tool5),
  product("Milwaukee M18 Impact Wrench 18V", 12999, 16500, 4.7, 1234, P.tool6, "Premium"),
];
const SAFETY = [
  product("3M Peltor Earmuff H540A Hearing Protection", 1299, 1800, 4.6, 3421, P.safety, "Top Rated"),
  product("Honeywell MillMax Safety Gloves Cut5", 499, 750, 4.4, 5678, P.gloves, "Pack of 12"),
  product("JSP EVO3 Safety Helmet with Ratchet", 799, 1200, 4.5, 2109, P.helmet),
  product("Karam PN 501 Full Body Harness", 3499, 5000, 4.3, 876, P.weld, "IS:3521"),
  product("3M 1860 N95 Respirator Mask (Pack of 20)", 1899, 2500, 4.7, 8765, P.mask, "Best Seller"),
  product("Mallcom GFSTR Steel Toe Safety Shoes", 1799, 2499, 4.2, 1543, P.shoe),
];
const ELECTRICAL = [
  product("Havells 2.5 sq mm FR PVC Wire 90m", 1799, 2200, 4.5, 4321, P.elec, "ISI Mark"),
  product("Legrand 32A Double Pole MCB", 349, 499, 4.6, 2876, P.weld),
  product("Philips 24W LED Panel Light Cool White", 599, 899, 4.3, 5432, P.light, "5yr Warranty"),
  product("Schneider Acti9 4P 63A RCCB", 2199, 3100, 4.5, 987, P.tool5),
  product("ABB 5.5kW 3-Phase Motor IE3", 18999, 24000, 4.4, 345, P.tool6, "IE3 Rated"),
  product("Finolex 1.5 sq mm FRLS Cable 180m", 2999, 3800, 4.6, 2109, P.grinder, "Best Value"),
];
const HAND = [
  product("Stanley 20oz Fiberglass Claw Hammer", 549, 799, 4.5, 6789, P.grinder, "Best Seller"),
  product("Taparia 1081 Combination Plier Set of 3", 899, 1299, 4.4, 3456, P.tool4),
  product("Gedore 19 Piece Spanner Set", 3499, 4999, 4.6, 1234, P.drill, "Premium"),
  product("Stanley 25mm STS Tape Measure 5m", 299, 499, 4.3, 8765, P.tool3),
  product('Bahco Adjustable Wrench 10" Chrome Vanadium', 1299, 1800, 4.5, 2345, P.tool5, "Pro Grade"),
  product("Bosch Screwdriver Bit Set 20 Piece", 699, 999, 4.2, 4321, P.safety),
];
const PLUMBING = [
  product("Astral CPVC Pipe 25mm 3m Length", 349, 499, 4.4, 2345, P.weld),
  product("Kirloskar Star-1 0.5HP Monoblock Pump", 4299, 5999, 4.6, 3456, P.drill, "Best Seller"),
  product('Brass Ball Valve 1" Full Bore (Pack of 5)', 1499, 2100, 4.3, 987, P.grinder),
  product("Jaquar Florentine Single Lever Basin Mixer", 3999, 5500, 4.5, 1234, P.elec, "Premium"),
  product("Supreme UPVC Pipe 110mm 6m", 1099, 1499, 4.2, 765, P.tool3),
  product("Fernox TF1 Omega Filter 22mm", 2799, 3800, 4.4, 543, P.tool4, "New"),
];
const FASTENERS = [
  product("Hex Bolt M12x50 Grade 8.8 (Pack of 50)", 449, 650, 4.5, 3456, P.tool6),
  product("Fischer S10 Wall Plug 100 Piece Box", 299, 450, 4.6, 7654, P.tool5, "Best Seller"),
  product("Stainless Steel Self-Tapping Screws 5×35mm (200pc)", 599, 850, 4.3, 2345, P.drill),
  product("Hilti HIT-RE 500 V3 Epoxy Anchor 500ml", 3299, 4500, 4.7, 876, P.safety, "Pro Choice"),
  product("Pop Rivet Assorted Kit 200 Piece", 349, 499, 4.2, 1234, P.grinder),
  product("DIN934 Hex Nut M10 Grade 8 (100 Piece)", 199, 299, 4.4, 4321, P.elec, "Bulk Deal"),
];
const ABRASIVES = [
  product("Norton 115mm Grinding Wheel A60 (Pack of 10)", 699, 999, 4.5, 2345, P.weld),
  product("3M Cubitron II Flap Disc 115mm 60G (10pc)", 1499, 2200, 4.7, 1876, P.drill, "Premium"),
  product("Bosch Expert Cutting Disc 125mm (25pc)", 899, 1299, 4.4, 3456, P.tool4, "Best Seller"),
  product("Mirka Abranet 225mm Sanding Disc P80 (50pc)", 2199, 3000, 4.3, 987, P.tool3),
  product("Wire Cup Brush 100mm Knotted Steel", 249, 399, 4.2, 2109, P.tool5),
  product("Tyrolit Diamond Blade 230mm Turbo", 3499, 4800, 4.6, 654, P.grinder, "Pro"),
];
const WELDING = [
  product("Lincoln Electric Invertec 170S MIG Welder", 24999, 32000, 4.7, 456, P.weld, "Pro Grade"),
  product("ESAB OK 46.00 Electrode 3.15mm (5kg)", 899, 1200, 4.5, 3456, P.tool6, "Best Seller"),
  product("Victor Oxygen Regulator SR450D", 3299, 4500, 4.4, 876, P.elec),
  product("3M Speedglas 9100X Auto-Darkening Helmet", 18999, 25000, 4.8, 234, P.grinder, "Top Rated"),
  product("Hobart Handler 140 MIG Welder 115V", 19999, 27000, 4.6, 321, P.drill),
  product("Lincoln SuperGlaze MIG Wire 0.8mm 15kg", 3499, 4800, 4.5, 543, P.tool4, "Value Pack"),
];
const MATERIAL = [
  product("Mild Steel Platform Trolley 500kg Capacity", 8999, 12000, 4.4, 345, P.tool3),
  product("Yale 1 Ton Electric Chain Hoist 3m Lift", 18999, 25000, 4.6, 234, P.tool5, "Heavy Duty"),
  product("PP Strapping Roll 12mm×0.5mm 2000m", 1299, 1800, 4.3, 1234, P.safety, "Best Seller"),
  product("Bubble Wrap Roll 1m×50m", 899, 1299, 4.2, 2345, P.elec),
  product("Steel Shelving Rack 5 Tier 200kg/shelf", 7499, 9999, 4.5, 876, P.drill, "Popular"),
  product("Hand Pallet Truck 2500kg Jack", 5999, 8000, 4.4, 543, P.grinder),
];
const IT = [
  product("HP LaserJet Pro M404dn Mono Printer", 19999, 26000, 4.5, 2345, P.weld, "Best Seller"),
  product("TP-Link TL-SG1016D 16-Port Gigabit Switch", 3499, 4999, 4.6, 1876, P.tool6),
  product("Logitech MX Keys Business Keyboard", 7999, 10500, 4.7, 3456, P.tool3, "Top Rated"),
  product("Zebra ZD421 Thermal Label Printer", 14999, 19500, 4.4, 987, P.tool5),
  product("APC UPS BX1100C-IN 1100VA", 5999, 7999, 4.5, 4321, P.grinder, "Must Have"),
  product("D-Link DAP-2682 WiFi 6 Access Point", 8999, 11500, 4.3, 765, P.tool4),
];

export const TRENDING = [
  product("Bosch GSB 10.8-2-LI Cordless Drill", 5499, 7200, 4.6, 8765, P.drill, "🔥 Trending", "Power Tools"),
  product("3M 7500 Half Facepiece Respirator", 2299, 3200, 4.7, 5432, P.mask, "🔥 Hot", "Safety & PPE"),
  product("Havells L60 32A MCB (Pack of 6)", 1099, 1599, 4.5, 4321, P.elec, "🔥 Trending", "Electrical"),
  product("Stanley 92-849 69-Piece Socket Set", 3999, 5500, 4.6, 3456, P.tool4, "🔥 Hot", "Hand Tools"),
  product("JSP EVO3 Safety Helmet Blue", 649, 999, 4.4, 6789, P.helmet, "🔥 Trending", "Safety & PPE"),
  product("Finolex FRLS 1.5 sq mm Wire 90m", 2299, 3200, 4.5, 7654, P.grinder, "🔥 Hot", "Electrical"),
];

export const LATEST = [
  product("Makita DHP486Z 18V Brushless Combi Drill", 14999, 19000, 4.8, 123, P.tool5, "🆕 New", "Power Tools"),
  product("Milwaukee M18 FUEL Circular Saw", 22999, 29000, 4.7, 87, P.safety, "🆕 Launch", "Power Tools"),
  product("Hilti X-BT 3 Gas Nailer", 45999, 58000, 4.9, 45, P.tool6, "🆕 New", "Power Tools"),
  product("Fluke 289 True-RMS Multimeter", 29999, 38000, 4.8, 67, P.tool3, "🆕 New", "Electrical"),
  product("Atlas Copco GA15+ Air Compressor", 149999, 185000, 4.9, 23, P.tool4, "🆕 Launch", "Material Handling"),
  product("Leica DISTO D810 Touch Laser Measurer", 34999, 44000, 4.7, 34, P.grinder, "🆕 New", "Hand Tools"),
];

/** Per-category product lists, keyed by the category name used in nav/mega-menu. */
export const CATEGORY_PRODUCTS = {
  "Power Tools": POWER,
  "Safety & PPE": SAFETY,
  Electrical: ELECTRICAL,
  "Hand Tools": HAND,
  Plumbing: PLUMBING,
  Fasteners: FASTENERS,
  Abrasives: ABRASIVES,
  Welding: WELDING,
  "Material Handling": MATERIAL,
  "IT & Office": IT,
};

/** The banner + product-grid block rendered for every category further down the homepage. */
export const SECTIONS = [
  { name: "Power Tools", title: "⚡ Power Tools — Top Picks", subtitle: "Professional-grade drills, grinders, saws & more from Bosch, DeWalt, Makita", bg: "linear-gradient(135deg,#1B2B4B 0%,#374151 100%)", img: P.drill, tagline: "Power Up Your Workshop", features: ["18V & 36V Cordless", "Brushless Motors", "5-Year Warranty", "Same-Day Dispatch"], products: POWER },
  { name: "Safety & PPE", title: "🦺 Safety & PPE — Full Protection", subtitle: "Helmets, gloves, shoes, respirators & more from 3M, Honeywell, JSP", bg: "linear-gradient(135deg,#064E3B 0%,#065F46 100%)", img: P.safety, tagline: "Safety Is Non-Negotiable", features: ["IS/EN Certified", "Industry Compliant", "Bulk Discounts", "ISO 9001 Brands"], products: SAFETY },
  { name: "Electrical", title: "💡 Electrical — Wires, Switchgear & Lighting", subtitle: "From switchboards to industrial motors — complete electrical solutions", bg: "linear-gradient(135deg,#78350F 0%,#92400E 100%)", img: P.elec, tagline: "Wire Up Smarter", features: ["ISI Mark Assured", "Havells & Legrand", "BIS Certified", "5-Year Guarantee"], products: ELECTRICAL },
  { name: "Hand Tools", title: "🔧 Hand Tools — Professional Grade", subtitle: "Spanners, pliers, hammers and measuring tools built to last", bg: "linear-gradient(135deg,#1E3A5F 0%,#1D4ED8 100%)", img: P.grinder, tagline: "Every Job Done Right", features: ["Chrome Vanadium", "Lifetime Warranty", "Ergonomic Design", "VDE Insulated"], products: HAND },
  { name: "Plumbing", title: "🚰 Plumbing — Pipes, Pumps & Fittings", subtitle: "CPVC, UPVC, GI pipes and premium fixtures for residential & industrial use", bg: "linear-gradient(135deg,#312E81 0%,#4338CA 100%)", img: P.weld, tagline: "Flow Without Interruption", features: ["ISI Certified Pipes", "Kirloskar Pumps", "10-Year Warranty", "Leak-Proof Fittings"], products: PLUMBING },
  { name: "Fasteners", title: "🔩 Fasteners — Bolts, Nuts & Anchors", subtitle: "Hex bolts, anchors, rivets and all standard fasteners in bulk packs", bg: "linear-gradient(135deg,#701A75 0%,#9333EA 100%)", img: P.tool6, tagline: "Hold It All Together", features: ["Grade 8.8 & 10.9", "Stainless Steel", "DIN Standards", "Bulk Pricing"], products: FASTENERS },
  { name: "Abrasives", title: "🪨 Abrasives — Grind, Cut & Polish", subtitle: "Grinding wheels, flap discs, cutting discs from Norton, 3M and Tyrolit", bg: "linear-gradient(135deg,#7F1D1D 0%,#B91C1C 100%)", img: P.tool4, tagline: "Precision at Every Surface", features: ["EN 12413 Certified", "3M & Norton", "Rapid Stock", "All Grit Sizes"], products: ABRASIVES },
  { name: "Welding", title: "🔥 Welding — Machines, Rods & Accessories", subtitle: "Complete welding solutions from Lincoln Electric, ESAB, and Hobart", bg: "linear-gradient(135deg,#292524 0%,#44403C 100%)", img: P.tool5, tagline: "Weld with Confidence", features: ["MIG / TIG / MMA", "Lincoln & ESAB", "ISO Certified", "Expert Support"], products: WELDING },
  { name: "Material Handling", title: "📦 Material Handling — Move Smarter", subtitle: "Trolleys, hoists, pallets, conveyors and storage solutions for warehouses", bg: "linear-gradient(135deg,#164E63 0%,#0E7490 100%)", img: P.tool3, tagline: "Optimise Your Logistics", features: ["500kg–10T Capacity", "CE Marked Hoists", "Custom Racking", "Next-Day Delivery"], products: MATERIAL },
  { name: "IT & Office", title: "💻 IT & Office — Tech for the Workplace", subtitle: "Printers, networking, computers and office essentials for businesses", bg: "linear-gradient(135deg,#1E293B 0%,#334155 100%)", img: P.weld, tagline: "Equip Your Office & Factory", features: ["HP & Lenovo", "Business Grade", "AMC Available", "GST Invoice"], products: IT },
];

/** Flat list of every product, each tagged with its category, plus an id lookup map. */
export const ALL_PRODUCTS = [
  ...Object.entries(CATEGORY_PRODUCTS).flatMap(([cat, list]) => list.map((p) => ({ ...p, cat }))),
  ...TRENDING,
  ...LATEST,
];
export const PRODUCTS_BY_ID = Object.fromEntries(ALL_PRODUCTS.map((p) => [p.id, p]));
