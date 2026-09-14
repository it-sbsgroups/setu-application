// Top-level nav / mega-menu taxonomy. Each entry drives both the
// category pills in the nav bar and the mega-menu dropdown columns.
export const CATEGORIES = [
  { name: "Power Tools", icon: "⚡", subs: ["Drills & Drivers", "Angle Grinders", "Circular Saws", "Jigsaws", "Sanders", "Impact Wrenches", "Rotary Hammers", "Heat Guns"] },
  { name: "Hand Tools", icon: "🔧", subs: ["Spanners & Wrenches", "Pliers", "Hammers", "Screwdrivers", "Cutting Tools", "Measuring Tools", "Files & Rasps", "Chisels"] },
  { name: "Safety & PPE", icon: "🦺", subs: ["Helmets & Headgear", "Safety Gloves", "Safety Shoes", "Eye Protection", "Ear Protection", "Respiratory", "High-Vis Clothing", "Fall Protection"] },
  { name: "Electrical", icon: "💡", subs: ["Wires & Cables", "Switchgear", "MCBs & MCCBs", "Lighting", "Motors", "Transformers", "Plugs & Sockets", "Cable Management"] },
  { name: "Plumbing", icon: "🚰", subs: ["Pipes & Fittings", "Valves", "Water Pumps", "Tanks", "Taps & Faucets", "Water Meters", "Sealants", "Thread Tape"] },
  { name: "Fasteners", icon: "🔩", subs: ["Bolts & Nuts", "Screws", "Anchors", "Rivets", "Washers", "Nails", "Studs", "Threaded Rods"] },
  { name: "Abrasives", icon: "🪨", subs: ["Grinding Wheels", "Flap Discs", "Sandpaper", "Wire Brushes", "Cutting Discs", "Polishing Pads", "Buffing Wheels", "Diamond Blades"] },
  { name: "Welding", icon: "🔥", subs: ["Welding Machines", "Welding Electrodes", "MIG Wire", "TIG Rods", "Gas Regulators", "Welding Helmets", "Gloves", "Clamps"] },
  { name: "Material Handling", icon: "📦", subs: ["Trolleys & Carts", "Pallets", "Forklifts", "Hoists & Cranes", "Conveyors", "Strapping", "Packaging", "Storage"] },
  { name: "IT & Office", icon: "💻", subs: ["Computers", "Printers", "Networking", "Cables & Accessories", "Stationery", "Furniture", "Cleaning Supplies", "Security Systems"] },
];

/** "Safety & PPE" -> "safety-ppe" — used for /category/[slug] routes everywhere. */
export function slugifyCategory(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SLUG_TO_CATEGORY = Object.fromEntries(CATEGORIES.map((c) => [slugifyCategory(c.name), c.name]));

/** "safety-ppe" -> "Safety & PPE" (or undefined if the slug doesn't match a known category). */
export function categoryFromSlug(slug) {
  return SLUG_TO_CATEGORY[slug];
}
