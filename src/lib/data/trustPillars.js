/**
 * Trust pillars — the deep-dive "why" behind every brand highlight.
 *
 * Every highlight shown on a brand page (e.g. Bosch's "German Engineering"
 * or DeWalt's "FlexVolt System") maps to one of these pillars. Clicking the
 * highlight on a brand page lands the user here — a full explanation of what
 * the pillar means, how SbS delivers it, and why it matters for industry.
 */

export const TRUST_PILLARS = [
  /* ─── 1. Global Engineering ─────────────────────────────── */
  {
    slug: "global-engineering",
    title: "Global Engineering Standards",
    icon: "🌍",
    shortDesc:
      "Precision-built products engineered to global specifications and tested for continuous industrial duty cycles.",
    category: "Product Quality",
    description: [
      "Global engineering standards mean every product is designed, tested, and manufactured to specifications that hold up across markets — not just the one it's sold in. Whether it's German tooling, Japanese precision, or American jobsite engineering, these standards translate directly into longer service life, consistent performance, and fewer breakdowns on the floor.",
      "For Indian industry, this matters because the cost of a failed tool isn't the tool — it's the shift it stopped, the deadline it missed, and the rework it caused. Products built to global standards fail less often, and when they do, the failure is predictable and covered.",
    ],
    delivers: [
      { icon: "🔬", title: "Source Verified", desc: "Every unit is sourced from authorised distributors — never grey market imports." },
      { icon: "📋", title: "Full Documentation", desc: "Duty cycle ratings, certifications, and spec sheets included with every order." },
      { icon: "🛡️", title: "Warranty Backed", desc: "Manufacturer warranty on all products with documented claim support." },
      { icon: "🔧", title: "Service Coordination", desc: "Our team handles all service and warranty claims on your behalf." },
    ],
    matters: [
      { icon: "⏱️", title: "Reduced Downtime", desc: "Global-standard tools fail less often, keeping your production line running." },
      { icon: "💰", title: "Lower Total Cost", desc: "Higher upfront price, but significantly lower per-hour operating cost." },
      { icon: "📊", title: "Predictable Maintenance", desc: "Documented duty cycles let you schedule maintenance instead of reacting." },
    ],
    faqs: [
      { q: "How do I know a product meets global standards?", a: "Every product on SbS carries its certification (CE, ANSI, ISO, IS) and manufacturer spec sheet. Just check the Specifications tab on any product page." },
      { q: "What if a global-standard product fails?", a: "Same process as any other product — raise a replacement request, and our team coordinates the warranty claim with the manufacturer directly." },
      { q: "Is the extra cost worth it?", a: "For continuous industrial use, yes. A tool that costs 30% more but lasts 3x longer is a fraction of the per-hour cost." },
    ],
    relatedCategories: ["Power Tools", "Hand Tools", "Electrical"],
  },

  /* ─── 2. Nationwide Service ─────────────────────────────── */
  {
    slug: "nationwide-service",
    title: "Nationwide Service Network",
    icon: "🔧",
    shortDesc:
      "Authorised service centres across India for spares, repairs, and warranty claims — coordinated by our support team.",
    category: "After-Sales Support",
    description: [
      "A tool is only as good as the service behind it. A nationwide service network means spares availability, authorised repairs, and warranty claims that don't depend on whether your plant is in Mumbai or a remote MIDC in Jharkhand. Global brands maintain 500–700+ authorised centres across India; premium brands have dedicated field service teams.",
      "What sets SbS apart is that you never have to interact with the manufacturer yourself. Raise a service request on your order page, and our tele-caller team coordinates the entire claim — pickup, diagnosis, repair, and return delivery — end to end.",
    ],
    delivers: [
      { icon: "📍", title: "Pan-India Coverage", desc: "Service available across 19,000+ pin codes via authorised centres." },
      { icon: "🎯", title: "Single Point Contact", desc: "You raise one request — we handle the manufacturer coordination." },
      { icon: "🚚", title: "Pickup & Return", desc: "Doorstep pickup for service, with return delivery after repair." },
      { icon: "📞", title: "10 AM–6 PM Support", desc: "Live support on all working days to track every open claim." },
    ],
    matters: [
      { icon: "🏭", title: "Zero Downtime", desc: "Fast spares availability means tools get back on the floor quickly." },
      { icon: "📉", title: "Cost Control", desc: "Authorised service preserves warranty — third-party repairs void it." },
      { icon: "📋", title: "Audit Trail", desc: "Every service ticket is documented for your maintenance records." },
    ],
    faqs: [
      { q: "How do I raise a service request?", a: "Go to your Account → Orders → select the order → Contact Support. Our team picks it up from there." },
      { q: "Who pays for shipping during service?", a: "For warranty claims, shipping is covered by the manufacturer/brand service model. For out-of-warranty, our team shares a transparent quote upfront." },
      { q: "How long does a typical service take?", a: "Most warranty repairs are completed within 5–10 working days. Complex cases (motor rewinds, gearbox overhauls) may take longer, and our team keeps you updated." },
    ],
    relatedCategories: ["Power Tools", "Electrical", "Welding"],
  },

  /* ─── 3. Manufacturer Warranty ──────────────────────────── */
  {
    slug: "manufacturer-warranty",
    title: "Manufacturer Warranty",
    icon: "🛡️",
    shortDesc:
      "Documented warranty on every product — from 1-year power tool coverage to lifetime hand-tool guarantees.",
    category: "After-Sales Support",
    description: [
      "Manufacturer warranty is your legal protection against defects — and it's the difference between a $50 tool that breaks and a $500 tool that gets repaired free. Warranty periods vary by product: 1–5 years for power tools, 1–2 years for switchgear and welding machines, and lifetime for most hand tools and Stanley/Milwaukee/DeWalt ranges.",
      "SbS doesn't just sell the warranty — we make it actionable. Every order ships with the manufacturer warranty card, invoice reference, and serial number documentation. When something fails, we coordinate the claim, provide the paperwork, and follow up until the replacement or repair is complete.",
    ],
    delivers: [
      { icon: "📋", title: "Warranty Documentation", desc: "Every order ships with the manufacturer warranty card and invoice." },
      { icon: "🔍", title: "Serial Registered", desc: "Product serial numbers recorded on your invoice for warranty lookup." },
      { icon: "🎯", title: "Claim Coordination", desc: "Our team files the claim with the manufacturer on your behalf." },
      { icon: "📞", title: "Status Tracking", desc: "Live updates on every open warranty claim via your account panel." },
    ],
    matters: [
      { icon: "💰", title: "Protects Your Spend", desc: "Defective units are repaired or replaced at no cost during warranty." },
      { icon: "📋", title: "Audit-Ready", desc: "Warranty documentation supports plant and government audits." },
      { icon: "🔒", title: "Preserves Resale Value", desc: "Documented warranty history supports asset valuation and disposal." },
    ],
    faqs: [
      { q: "What's the standard warranty period?", a: "1-year for most power tools, 1–2 years for switchgear and welding machines, 2–5 years for premium cordless ranges, and lifetime for most hand tools. Check the product page for exact details." },
      { q: "What voids a warranty?", a: "Unauthorised repairs, misuse (over-voltage, water ingress, physical damage), and missing documentation. Our team will advise before you lose coverage." },
      { q: "How do I file a warranty claim?", a: "Raise a ticket from Account → Orders → Contact Support with the issue described. Our team handles the rest." },
    ],
    relatedCategories: ["Power Tools", "Hand Tools", "Electrical"],
  },

  /* ─── 4. Cordless Platforms ─────────────────────────────── */
  {
    slug: "cordless-platforms",
    title: "Cordless Battery Platforms",
    icon: "🔋",
    shortDesc:
      "One battery, one charger, 100+ tools — mixed-tool workshops save time, money, and hassle.",
    category: "Technology",
    description: [
      "Modern cordless platforms let you run drills, grinders, saws, lighting, and specialty tools from a single battery family. Bosch's 18V, DeWalt's FlexVolt (20V/60V switchable), Makita's LXT & XGT (18V/40V), and Milwaukee's M18/M12 have all crossed 100+ compatible tools — turning a workshop into a plug-free environment.",
      "For industrial users, the platform matters more than any single tool. Once you invest in a platform, every new tool you buy is just the bare unit — you reuse existing batteries and chargers. Fleet management also becomes simpler: one set of spares, one charging protocol, one training standard.",
    ],
    delivers: [
      { icon: "🔋", title: "Genuine Batteries", desc: "OEM batteries and chargers sourced from authorised distributors only." },
      { icon: "⚡", title: "Bulk Battery Pricing", desc: "Tier-based pricing on batteries, chargers, and starter kits at 3, 5, 10+ units." },
      { icon: "🔧", title: "Platform Consultation", desc: "Our team helps you standardise on the right platform for your fleet." },
      { icon: "🛡️", title: "Battery Warranty", desc: "Manufacturer warranty on every battery, with replacement coordination." },
    ],
    matters: [
      { icon: "💰", title: "Lower Total Cost", desc: "Buy bare tools instead of full kits — save 30–50% per tool added." },
      { icon: "🏭", title: "Fleet Standardisation", desc: "Fewer battery types = simpler logistics, less downtime, less confusion." },
      { icon: "🌱", title: "Reduced Waste", desc: "Reusable batteries mean fewer consumables and less electronic waste." },
    ],
    faqs: [
      { q: "Which cordless platform should I standardise on?", a: "Depends on your work: Bosch for mixed workshops, DeWalt for construction and heavy fabrication, Makita for precision and woodworking, Milwaukee for electrical and plumbing trades. Our team can advise based on your tool mix." },
      { q: "Can I use third-party batteries?", a: "We strongly advise against it. Third-party batteries void manufacturer warranty and often fail to deliver rated current — risking tool damage." },
      { q: "Do you sell bare tools without batteries?", a: "Yes. Most cordless tools on SbS are available as bare units at a lower price — perfect if you already own batteries on the platform." },
    ],
    relatedCategories: ["Power Tools"],
  },

  /* ─── 5. Heavy-Duty ─────────────────────────────────────── */
  {
    slug: "heavy-duty",
    title: "Heavy-Duty Industrial Grade",
    icon: "💪",
    shortDesc:
      "Rated for continuous industrial use — jobsite abuse, high duty cycles, and demanding environments.",
    category: "Product Quality",
    description: [
      "Heavy-duty isn't a marketing term — it's a measurable specification. It means continuous duty cycle ratings, impact-resistant housings, sealed motors that survive dust and moisture, and mechanical designs validated against job-site abuse: drops, overloads, contamination, and temperature extremes.",
      "For EPC contractors, fabrication shops, and plant MRO teams, heavy-duty tools are the difference between completing a shift and calling a halt. They cost more upfront but deliver lower per-hour operating cost, fewer interruptions, and longer service life.",
    ],
    delivers: [
      { icon: "💪", title: "Industrial-Rated Products", desc: "Every heavy-duty product is duty-cycle rated for continuous use." },
      { icon: "🏭", title: "Built for Industry", desc: "Popular across EPC, fabrication, MRO, and process industries." },
      { icon: "🛡️", title: "Longer Warranties", desc: "Heavy-duty ranges typically carry 3–5 year manufacturer warranties." },
      { icon: "📋", title: "Documented Specs", desc: "Duty cycle, IP rating, and thermal ratings documented for audits." },
    ],
    matters: [
      { icon: "🏗️", title: "Handles Real Workloads", desc: "Rated for continuous use — not intermittent DIY cycles." },
      { icon: "⏱️", title: "Reduced Downtime", desc: "Fewer thermal trips, fewer motor failures, fewer mid-shift stoppages." },
      { icon: "💰", title: "Lower Cost Per Hour", desc: "Higher upfront, but a fraction of the operating cost over 3–5 years." },
    ],
    faqs: [
      { q: "How do I know if a tool is genuinely heavy-duty?", a: "Look for continuous duty cycle rating, brushless motor, IP rating (dust/moisture protection), and manufacturer's stated industrial use. All are documented on every product page." },
      { q: "Is heavy-duty overkill for my workshop?", a: "Not if you use the tool for more than 2 hours daily. Below that, a mid-range tool works fine. Our team can advise based on your usage." },
      { q: "Do heavy-duty tools need special maintenance?", a: "No, but they benefit from scheduled maintenance — motor brushes, gearbox oil, and bearings. Our service team coordinates this via authorised centres." },
    ],
    relatedCategories: ["Power Tools", "Welding", "Safety & PPE"],
  },

  /* ─── 6. Brushless Motors ───────────────────────────────── */
  {
    slug: "brushless-motors",
    title: "Brushless Motor Technology",
    icon: "⚙️",
    shortDesc:
      "Longer runtime, less heat, fewer breakdowns — brushless motors are the new standard for industrial power tools.",
    category: "Technology",
    description: [
      "Brushless motors replace carbon brushes with electronic commutation — eliminating the single biggest wear item in a power tool. The result: 30–50% longer runtime per battery charge, cooler operation, quieter running, and dramatically fewer mechanical failures.",
      "For workshops using tools continuously, brushless motors pay for themselves within a year. They also enable variable speed control, electronic torque limiting, and built-in motor protection — features that protect both the tool and the workpiece.",
    ],
    delivers: [
      { icon: "⚙️", title: "Brushless Range", desc: "FUEL, BITURBO, and other brushless ranges from premium brands." },
      { icon: "📋", title: "Spec Documented", desc: "Motor type clearly listed on every product page." },
      { icon: "🛡️", title: "Extended Warranty", desc: "Brushless tools typically carry longer warranties than brushed equivalents." },
      { icon: "🔧", title: "Service Support", desc: "Brushless motor issues are covered under manufacturer warranty — no repair cost." },
    ],
    matters: [
      { icon: "🔋", title: "50% More Runtime", desc: "Same battery, 30–50% more work per charge — fewer charging breaks." },
      { icon: "🌡️", title: "Cooler Operation", desc: "No brush friction means less heat, longer bearing life, and safer use." },
      { icon: "💰", title: "Fewer Repairs", desc: "No carbon brush replacements — a recurring cost eliminated." },
    ],
    faqs: [
      { q: "Is brushless worth the premium?", a: "Yes, for continuous professional use. The upfront premium (20–40%) pays back within 6–12 months via longer runtime and fewer repairs." },
      { q: "Can brushless motors be repaired?", a: "Yes — electronics and bearings are serviceable. Motor failures within warranty are fully covered." },
      { q: "Do brushless tools need special batteries?", a: "No. They run on the same platform batteries as brushed versions — the electronics just run them more efficiently." },
    ],
    relatedCategories: ["Power Tools"],
  },

  /* ─── 7. Precision Tools ────────────────────────────────── */
  {
    slug: "precision-tools",
    title: "Precision & Accuracy",
    icon: "🎯",
    shortDesc:
      "Low-vibration, compact tools built for precision work — furniture, woodworking, and fine fabrication.",
    category: "Product Quality",
    description: [
      "Precision work demands tools that reduce vibration, deliver consistent torque, and cut cleanly every time. Japanese manufacturers pioneered this space — low-vibration motors, balanced spindles, and tight tolerances that produce smooth results even in continuous shift work.",
      "For furniture units, carpentry workshops, and precision fabrication, this translates into less rework, cleaner finishes, better operator comfort, and long-term reduced hand fatigue for workers. When quality of cut matters more than raw power, precision tools are the right choice.",
    ],
    delivers: [
      { icon: "🎯", title: "Low-Vibration Range", desc: "Tools engineered to minimise vibration during extended use." },
      { icon: "📏", title: "Precision Measuring", desc: "Tape measures, levels, and layout tools accurate for critical work." },
      { icon: "⚙️", title: "Balanced Design", desc: "Ergonomic builds that reduce operator fatigue across shifts." },
      { icon: "📋", title: "Documented Tolerance", desc: "Precision specs listed on every product page." },
    ],
    matters: [
      { icon: "✨", title: "Cleaner Finishes", desc: "Lower vibration means smoother cuts and less post-processing." },
      { icon: "🧑‍🔧", title: "Operator Comfort", desc: "Less hand fatigue means better productivity across full shifts." },
      { icon: "📉", title: "Less Rework", desc: "Accurate cuts reduce material waste and rework costs." },
    ],
    faqs: [
      { q: "Are precision tools only for woodworking?", a: "No. They're used across furniture, cabinetry, sign-making, precision metalwork, and any application where accuracy matters more than raw power." },
      { q: "How do I choose between precision and heavy-duty?", a: "Precision for repeatable accuracy and clean finishes; heavy-duty for continuous abuse and high material removal. Many workshops use both." },
      { q: "Do precision tools need special handling?", a: "Standard care — protect from drops, store clean, use the correct accessory. Their design reduces failure modes naturally." },
    ],
    relatedCategories: ["Power Tools", "Hand Tools"],
  },

  /* ─── 8. Legacy Trust ───────────────────────────────────── */
  {
    slug: "legacy-trust",
    title: "Legacy of Trust",
    icon: "🏛️",
    shortDesc:
      "Brands with 100+ years of engineering heritage — trusted across generations of Indian industry.",
    category: "Brand Heritage",
    description: [
      "Some brands have been on Indian toolboxes for over a century. When a brand crosses 100 years, it's not because of marketing — it's because generation after generation of tradesmen, engineers, and plant managers have kept choosing it. Heritage matters because it means tested designs, refined manufacturing, and a reputation that the brand cannot afford to damage.",
      "For B2B buyers, brand heritage reduces risk. You're not experimenting with a new entrant — you're buying something that millions of professionals have already validated across decades of real-world use.",
    ],
    delivers: [
      { icon: "🏛️", title: "Century+ Brands", desc: "Access to brands with 100+ years of engineering history." },
      { icon: "📋", title: "Documented Heritage", desc: "Every brand page details founding year and industry legacy." },
      { icon: "🌐", title: "Global Standards", desc: "Heritage brands maintain global quality benchmarks across markets." },
      { icon: "🛡️", title: "Proven Support", desc: "Mature service networks that have supported industry for decades." },
    ],
    matters: [
      { icon: "🔒", title: "Lower Risk", desc: "You're buying proven designs — not untested new entrants." },
      { icon: "📊", title: "Predictable Quality", desc: "Heritage brands deliver consistent quality batch after batch." },
      { icon: "🎯", title: "Reference Base", desc: "Millions of users and decades of field data to reference before you buy." },
    ],
    faqs: [
      { q: "Does a heritage brand cost more?", a: "Sometimes, but not always. Many 100+ year brands (like Stanley, Bosch, Havells) are priced competitively — heritage adds trust, not always a premium." },
      { q: "Is heritage relevant for MSMEs?", a: "Especially for MSMEs. When a small workshop buys a tool, it needs to last. Heritage brands minimise the risk of a bad purchase." },
      { q: "Do you stock heritage brands at scale?", a: "Yes. Our top brands (Bosch, Stanley, Havells, Kirloskar) are stocked across categories in bulk quantities." },
    ],
    relatedCategories: ["Hand Tools", "Power Tools", "Electrical", "Plumbing"],
  },

  /* ─── 9. Full BOM Coverage ──────────────────────────────── */
  {
    slug: "full-bom",
    title: "Complete BOM Coverage",
    icon: "📦",
    shortDesc:
      "Source your entire project requirement from a single brand — fewer POs, fewer suppliers, faster procurement.",
    category: "Procurement Efficiency",
    description: [
      "BOM (Bill of Materials) coverage means you can source every item on your project list from a single brand or a single platform — instead of splitting orders across multiple vendors, coordinating multiple invoices, and managing multiple warranty periods.",
      "For MSMEs and contractors, this saves administrative hours that no one pays for but everyone feels. For plants, it simplifies vendor management and standardises spare parts. When one brand covers 80% of your tool crib, you simplify everything downstream.",
    ],
    delivers: [
      { icon: "📦", title: "Multi-Category Brands", desc: "Brands spanning tools, safety, electrical, and consumables." },
      { icon: "🧾", title: "Single GST Invoice", desc: "One invoice per order — simpler accounting and audit." },
      { icon: "🔧", title: "One Warranty Desk", desc: "Single point of contact for all warranty and service claims." },
      { icon: "💰", title: "Consolidated Discounts", desc: "Bulk pricing calculated across the entire order, not per item." },
    ],
    matters: [
      { icon: "📉", title: "Less Admin Work", desc: "One PO, one invoice, one warranty contact — instead of many." },
      { icon: "🎯", title: "Standardised Spares", desc: "Fewer SKUs to stock — faster spares lookup and reordering." },
      { icon: "💰", title: "Better Bulk Pricing", desc: "Combined order value crosses tiers faster, unlocking better rates." },
    ],
    faqs: [
      { q: "Can I mix categories in one order?", a: "Yes. Add items from multiple categories to your enquiry list and request a combined quotation — you get one PO, one invoice, one delivery." },
      { q: "Does combining items reduce delivery time?", a: "Often yes. Consolidated orders ship together, reducing the number of deliveries and the coordination overhead." },
      { q: "Is there a bulk discount for BOM orders?", a: "Yes. Tier-based pricing applies to the total order value, not per line item — so larger consolidated orders unlock better rates." },
    ],
    relatedCategories: ["Power Tools", "Safety & PPE", "Electrical"],
  },

  /* ─── 10. PPE Leadership ────────────────────────────────── */
  {
    slug: "ppe-leadership",
    title: "Certified PPE Leadership",
    icon: "🦺",
    shortDesc:
      "Head, eye, ear, hand, foot, and respiratory protection — certified to Indian and international safety standards.",
    category: "Safety",
    description: [
      "PPE leadership means a brand offers the widest, deepest, and most certified range of personal protective equipment — from N95 respirators and welding helmets to cut-resistant gloves, safety footwear, and fall protection. These products are engineered for high-risk environments where failure means injury.",
      "In Indian industry — steel, cement, oil & gas, chemicals, construction — PPE compliance is audited and non-negotiable. Certified PPE means your safety team can verify conformance instantly, your plant passes audits, and your workers are genuinely protected.",
    ],
    delivers: [
      { icon: "🦺", title: "Wide Range", desc: "Head-to-toe protection from premium brands like 3M, Honeywell, JSP." },
      { icon: "📋", title: "Certified Compliance", desc: "IS, EN, ANSI, and NIOSH certification documented on every product." },
      { icon: "📦", title: "Bulk Pack Sizes", desc: "Bulk packs and plant-sized quantities available at tier pricing." },
      { icon: "📞", title: "PPE Advisory", desc: "Our team helps match PPE to specific risk categories." },
    ],
    matters: [
      { icon: "🛡️", title: "Worker Safety", desc: "Certified PPE genuinely protects — non-certified often doesn't." },
      { icon: "📋", title: "Audit Compliance", desc: "Plant and government audits require documented certified PPE." },
      { icon: "⚖️", title: "Legal Protection", desc: "Properly certified PPE protects the employer in liability cases." },
    ],
    faqs: [
      { q: "How do I choose the right PPE for my plant?", a: "Map hazards first (impact, chemical, electrical, respiratory) then match protection level. Our team can help — share your hazard profile via bulk enquiry." },
      { q: "Are cheaper PPE options safe?", a: "Only if certified. Non-certified PPE often fails basic impact and penetration tests — the cost savings are an illusion." },
      { q: "Do you offer bulk PPE for plant-wide deployment?", a: "Yes. PPE is one of our highest-volume categories, with tier pricing at 25+, 100+, and 500+ units." },
    ],
    relatedCategories: ["Safety & PPE", "Welding"],
  },

  /* ─── 11. Abrasive Technology ───────────────────────────── */
  {
    slug: "abrasive-technology",
    title: "Advanced Abrasive Technology",
    icon: "🪨",
    shortDesc:
      "Precision-shaped abrasives that cut faster, run cooler, and last significantly longer than conventional alternatives.",
    category: "Technology",
    description: [
      "Abrasive technology has advanced dramatically in the last decade. Modern abrasives use precision-shaped ceramic or ceramic-coated grain — rather than crushed abrasive — which means every particle cuts like a sharp edge instead of a dull corner. The result: faster stock removal, cooler cutting, and 3–5x longer life than conventional wheels.",
      "For high-volume fabrication shops, abrasives are one of the highest recurring costs. Switching to advanced abrasives can cut abrasive spend by 30–50% and reduce operator changeovers, resulting in lower per-cut cost and more consistent finishes.",
    ],
    delivers: [
      { icon: "🪨", title: "Premium Abrasive Brands", desc: "Norton, 3M Cubitron II, Tyrolit, and Mirka on one platform." },
      { icon: "📦", title: "Bulk Pack Sizes", desc: "Bulk 10/25/50-packs with tier pricing across grits and sizes." },
      { icon: "📋", title: "Cut-Rate Documented", desc: "Per-cut economics documented to help you compare options." },
      { icon: "🔧", title: "Application Advisory", desc: "Our team helps match abrasive to material (steel, SS, aluminium)." },
    ],
    matters: [
      { icon: "💰", title: "Lower Per-Cut Cost", desc: "Longer life means fewer changeovers and lower abrasive spend." },
      { icon: "❄️", title: "Cooler Cutting", desc: "Sharp grain cuts cooler — less heat-affected zone on the workpiece." },
      { icon: "⏱️", title: "Faster Throughput", desc: "Faster cut rate means more parts per shift, per operator." },
    ],
    faqs: [
      { q: "Are advanced abrasives worth the price premium?", a: "For high-volume fabrication, yes. Cubitron II and similar abrasives typically deliver 30–50% lower per-cut cost even at a higher unit price." },
      { q: "How do I choose the right abrasive for stainless steel?", a: "Stainless requires abrasives free of iron, sulphur, and chlorine to avoid contamination. Look for 'INOX' rated wheels — our team can guide you." },
      { q: "Do abrasives ship safely?", a: "Yes. All abrasives ship in original manufacturer packaging with adequate cushioning — checked for visible damage before dispatch." },
    ],
    relatedCategories: ["Abrasives", "Welding"],
  },

  /* ─── 12. Certified Compliance ─────────────────────────── */
  {
    slug: "certified-compliance",
    title: "Certified & Compliant",
    icon: "📋",
    shortDesc:
      "ISI, BIS, CE, ANSI, and IS-marked products — audit-ready for plants, government tenders, and export projects.",
    category: "Compliance",
    description: [
      "Certifications aren't paperwork — they're proof that a product has been independently tested against defined safety and performance standards. In Indian industry, three certifications dominate: ISI (BIS Bureau of Indian Standards), CE (European conformity), and ANSI/IS for specific applications (safety, PPE, welding).",
      "For B2B buyers, certifications matter in three scenarios: plant audits, government tenders, and export projects. A product without certification documentation can disqualify an entire tender or fail an audit. SbS ensures every product carries its certification, and every order ships with the necessary documents.",
    ],
    delivers: [
      { icon: "📋", title: "Certification Verified", desc: "ISI, BIS, CE, ANSI, IS compliance documented on every product." },
      { icon: "📄", title: "Documentation Included", desc: "Test certificates and compliance sheets shipped with orders." },
      { icon: "🏭", title: "Audit-Ready Packaging", desc: "All documentation bundled for plant and government audits." },
      { icon: "🌐", title: "Export-Safe", desc: "CE and international certification for export-order compliance." },
    ],
    matters: [
      { icon: "📋", title: "Passes Plant Audits", desc: "Documented certification clears all standard safety and quality audits." },
      { icon: "🏛️", title: "Government Tender Ready", desc: "ISI/BIS marked products qualify for GeM and tender procurement." },
      { icon: "⚖️", title: "Legal Protection", desc: "Certified products reduce liability in incident cases." },
    ],
    faqs: [
      { q: "Which certifications matter for Indian plants?", a: "ISI (mandatory for many electrical, safety, and construction products), BIS registration, and IS marking for specific categories. Check the product page — we list all certifications." },
      { q: "Do you supply certificates with orders?", a: "Yes. Every order includes manufacturer certification copies. For bulk orders, we can provide additional compliance paperwork on request." },
      { q: "Are CE-marked products valid in India?", a: "CE is not mandatory in India but is widely accepted as a quality benchmark. For critical applications, ISI is the stricter Indian standard." },
    ],
    relatedCategories: ["Electrical", "Safety & PPE", "Hand Tools"],
  },

  /* ─── 13. Made in India ────────────────────────────────── */
  {
    slug: "made-in-india",
    title: "Made in India",
    icon: "🇮🇳",
    shortDesc:
      "Indian-manufactured brands with nationwide service networks — engineered for Indian industry conditions.",
    category: "Brand Heritage",
    description: [
      "Made-in-India brands aren't a compromise — they're engineered specifically for Indian conditions: voltage fluctuations, dust, humidity, and remote site logistics. Indian manufacturers like Havells, Kirloskar, and Astral have refined their products over decades to match how Indian industry actually operates.",
      "Beyond performance, Indian manufacturing offers practical advantages: shorter lead times, faster spares availability, pan-India service networks, and better pricing for local production. For procurement teams, this means less friction and lower total cost of ownership.",
    ],
    delivers: [
      { icon: "🇮🇳", title: "Indian Manufacturing", desc: "Product sourced from Indian plants with documented quality processes." },
      { icon: "🔧", title: "Faster Spares", desc: "Spare parts available from Indian warehouses — not imported." },
      { icon: "💰", title: "Better Pricing", desc: "Local manufacturing means lower logistics and duty overheads." },
      { icon: "🌱", title: "Lower Carbon", desc: "Shorter supply chains and lower transport emissions." },
    ],
    matters: [
      { icon: "⚡", title: "Built for India", desc: "Engineered for Indian voltage, dust, and environmental conditions." },
      { icon: "🔧", title: "Service Nearby", desc: "Faster spares and service from nationwide Indian networks." },
      { icon: "💰", title: "Lower Cost", desc: "Avoids import duties and long logistics — better landed cost." },
    ],
    faqs: [
      { q: "Is Indian manufacturing quality as good as imported?", a: "For leading Indian brands (Havells, Kirloskar, Astral), yes — and often better suited to Indian conditions. They've been engineered for Indian voltage, dust, and site realities." },
      { q: "Do you stock both Indian and imported brands?", a: "Yes. We stock both. For each application, our team can advise which type of brand is better suited." },
      { q: "What's the warranty on Indian brands?", a: "Comparable to international brands — 1–5 years depending on category. Kirloskar, Havells, and Astral all offer comprehensive warranty and nationwide service." },
    ],
    relatedCategories: ["Electrical", "Plumbing", "Hand Tools"],
  },

  /* ─── 14. Process Industry ─────────────────────────────── */
  {
    slug: "process-industry",
    title: "Process & Critical Infrastructure",
    icon: "🏭",
    shortDesc:
      "Specified for cement, steel, oil & gas, data centres, hospitals, and mission-critical infrastructure.",
    category: "Application",
    description: [
      "Process industries — cement, steel, chemicals, oil & gas, power, and pulp & paper — have zero tolerance for downtime. Products specified for these industries are engineered for continuous operation, hazardous environments, and remote locations where service calls are costly.",
      "Similarly, critical infrastructure like data centres, hospitals, and airports demands uninterrupted power and precision control. Brands like ABB, Schneider, and Legrand have built their reputation on these applications — where failure isn't an option.",
    ],
    delivers: [
      { icon: "🏭", title: "Process-Rated Products", desc: "Motors, drives, switchgear, and control systems built for continuous duty." },
      { icon: "⚡", title: "Hazardous-Area Variants", desc: "Flameproof and explosion-proof options for petrochemical applications." },
      { icon: "🏢", title: "Critical Infrastructure", desc: "Products specified in data centres, hospitals, and airports." },
      { icon: "📋", title: "Application Documentation", desc: "Full datasheets and application guides for engineering teams." },
    ],
    matters: [
      { icon: "⏱️", title: "Zero Downtime", desc: "Rated for continuous operation — no unplanned outages." },
      { icon: "🛡️", title: "Safety Critical", desc: "Compliant with hazardous-area and explosion-proof requirements." },
      { icon: "📊", title: "Predictable O&M", desc: "Documented maintenance intervals for planned shutdowns." },
    ],
    faqs: [
      { q: "Do you supply for hazardous-area applications?", a: "Yes. We source flameproof (FLP) and explosion-proof variants of motors, switchgear, and control systems for petrochemical and hazardous-area environments." },
      { q: "Do you support tender specifications?", a: "Yes. Share your tender specification sheet and our team will map it to products that match the exact technical requirements." },
      { q: "Can you deliver to remote project sites?", a: "Yes. We deliver across 19,000+ pin codes — including remote MIDC, SEZ, and project sites with dedicated freight partners." },
    ],
    relatedCategories: ["Electrical", "Material Handling"],
  },

  /* ─── 15. Modular Architecture ─────────────────────────── */
  {
    slug: "modular-architecture",
    title: "Modular & Future-Proof",
    icon: "🧩",
    shortDesc:
      "Modular systems that scale cleanly — add capacity or functionality without replacing the entire setup.",
    category: "Technology",
    description: [
      "Modular architecture means a system is built from standard, interchangeable components — so you can expand capacity, add functionality, or replace individual parts without touching the rest. In electrical distribution (like Schneider Acti9 or Legrand), this means adding breakers without replacing the distribution board. In automation, it means scaling control systems as production grows.",
      "For B2B buyers, modularity means lower lifecycle cost and less disruption. A plant can phase its upgrades, add capacity incrementally, and keep existing infrastructure intact — a massive saving compared to rip-and-replace upgrades.",
    ],
    delivers: [
      { icon: "🧩", title: "Modular Ranges", desc: "Standardised components that interoperate across the product family." },
      { icon: "📈", title: "Scalable Design", desc: "Systems that expand without replacing the base infrastructure." },
      { icon: "🔧", title: "Easy Retrofit", desc: "Upgrades and expansions without shutdowns or rewiring." },
      { icon: "📋", title: "Documentation", desc: "Full installation and expansion guides included." },
    ],
    matters: [
      { icon: "💰", title: "Lower Lifecycle Cost", desc: "Add capacity without ripping out existing infrastructure." },
      { icon: "⏱️", title: "Zero-Downtime Expansion", desc: "Add components live — no plant shutdown required." },
      { icon: "🔮", title: "Future-Proof", desc: "Systems engineered to support future capacity and standards." },
    ],
    faqs: [
      { q: "What's the advantage of modular switchgear?", a: "You can add MCBs, RCCBs, or metering later without replacing the distribution board — saving cost and downtime during plant expansion." },
      { q: "Is modular more expensive upfront?", a: "Slightly, for the base unit. But overall lifecycle cost is lower because you avoid full replacements during upgrades." },
      { q: "Can I mix products from the same family?", a: "Yes. Acti9 (Schneider), Legrand modular range, and ABB modular switchgear all share standard accessories and interfaces within each family." },
    ],
    relatedCategories: ["Electrical"],
  },

  /* ─── 16. Welding Specialist ───────────────────────────── */
  {
    slug: "welding-specialist",
    title: "Welding & Cutting Specialists",
    icon: "🔥",
    shortDesc:
      "Dedicated welding brands with century-deep expertise — machines, electrodes, wires, and TIG/MIG consumables.",
    category: "Application",
    description: [
      "Some brands do one thing and do it exceptionally well. Welding specialists like ESAB (since 1904) and Lincoln Electric (since 1895) have spent over a century focused entirely on welding and cutting — machines, electrodes, MIG wire, TIG rods, gas regulators, and automation.",
      "For fabrication shops and structural steel fabricators, this focus translates into arc stability, consistent consumable quality, and predictable weld results. Consumables from welding specialists deliver repeatable chemical and mechanical properties batch after batch — critical for structural and pressure-vessel work.",
    ],
    delivers: [
      { icon: "🔥", title: "Full Welding Range", desc: "MMA, MIG, TIG machines plus every consumable in the workflow." },
      { icon: "📦", title: "Bulk Consumables", desc: "Electrodes, wires, and rods in 5kg/15kg packs and larger bulk drums." },
      { icon: "📋", title: "Certified Consumables", desc: "AWS, IS, and mill-certified consumables with documentation." },
      { icon: "🎯", title: "Application Advisory", desc: "Our team helps match consumables to base material and joint type." },
    ],
    matters: [
      { icon: "⚙️", title: "Consistent Weld Quality", desc: "Specialist consumables deliver repeatable mechanical properties." },
      { icon: "🏗️", title: "Structural-Safe", desc: "Certified consumables meet structural and pressure-vessel standards." },
      { icon: "💰", title: "Predictable Costs", desc: "Consumables cost the same per metre of weld — no surprises." },
    ],
    faqs: [
      { q: "Which welding rod is best for structural steel?", a: "For general structural welding, ESAB's OK 46.00 or Lincoln's equivalent E6013 electrode works well. For critical structures, use E7018 low-hydrogen electrodes — our team can advise." },
      { q: "MIG vs TIG vs MMA — which should I choose?", a: "MMA for outdoor/site work and general repair; MIG for high-throughput fabrication on steel; TIG for precision on stainless and aluminium. Most shops use all three." },
      { q: "Do you sell welding machines with consumables bundled?", a: "Yes. Raise a bulk enquiry with your requirement and our team will quote a bundled package — machine, consumables, and PPE." },
    ],
    relatedCategories: ["Welding", "Safety & PPE"],
  },

  /* ─── 17. Inverter Technology ──────────────────────────── */
  {
    slug: "inverter-technology",
    title: "Inverter Technology",
    icon: "⚡",
    shortDesc:
      "High-efficiency inverter machines with stable arcs, low power draw, and excellent duty cycles.",
    category: "Technology",
    description: [
      "Inverter welding machines convert incoming AC power to high-frequency DC before stepping it down — dramatically reducing transformer size, weight, and power consumption. The result: lighter machines, higher efficiency (up to 30% less power draw), and significantly better arc stability across the full current range.",
      "For continuous production welding, inverter machines are the modern standard. They handle a wider input voltage range (helpful in plants with fluctuating supply), run cooler, and offer precise current control — improving both weld quality and operator comfort.",
    ],
    delivers: [
      { icon: "⚡", title: "Inverter Machines", desc: "Inverter MIG, TIG, and MMA machines from Lincoln, ESAB, and others." },
      { icon: "📋", title: "Duty Cycle Documented", desc: "Full duty cycle and thermal ratings on every machine page." },
      { icon: "📞", title: "Application Support", desc: "Our team helps match machine capacity to your welding workload." },
      { icon: "🛡️", title: "Manufacturer Warranty", desc: "1–2 year manufacturer warranty on all inverter machines." },
    ],
    matters: [
      { icon: "💰", title: "30% Less Power", desc: "Inverter efficiency reduces electricity consumption per weld." },
      { icon: "⚙️", title: "Stable Arc", desc: "Consistent arc across the current range — cleaner, stronger welds." },
      { icon: "💪", title: "Portable", desc: "Lighter machines mean easier movement across sites and jobs." },
    ],
    faqs: [
      { q: "Is inverter technology reliable for production welding?", a: "Yes — inverter machines dominate modern production welding. They run cooler, consume less power, and offer superior arc control compared to transformer machines." },
      { q: "Do inverter welders work on generator power?", a: "Most do, but check the manufacturer's input voltage tolerance. Inverter machines are typically more tolerant than transformer types." },
      { q: "How do I choose between inverter and transformer machines?", a: "For new purchases, always inverter — unless you're welding at very high currents continuously (500A+). For everything else, inverter wins on efficiency, portability, and arc quality." },
    ],
    relatedCategories: ["Welding"],
  },

  /* ─── 18. Structural Fastening ─────────────────────────── */
  {
    slug: "structural-fastening",
    title: "Structural Fastening Systems",
    icon: "🏗️",
    shortDesc:
      "Engineered anchors and fasteners specified for critical structural connections and retrofitting applications.",
    category: "Application",
    description: [
      "Structural fastening is the science of holding things together when failure isn't an option — base plates, connections, retrofits, and critical infrastructure. Structural-grade anchors (Hilti, Fischer) are engineered as complete systems: chemical or mechanical anchors, drilling tools, installation procedures, and load-rating certificates.",
      "For infrastructure and industrial construction, structural fastening systems are specified by structural engineers rather than chosen informally. SbS supplies the full system — anchors, tooling, and documentation — with certified load ratings documented for design validation.",
    ],
    delivers: [
      { icon: "🏗️", title: "Structural Range", desc: "Chemical anchors (HIT-RE), mechanical anchors, and powder-actuated systems." },
      { icon: "📋", title: "Load-Rated", desc: "Certified load ratings documented for structural design validation." },
      { icon: "🔧", title: "System Approach", desc: "Anchors, drilling tools, and installation kits supplied as a system." },
      { icon: "🎯", title: "Application Advisory", desc: "Our team helps match anchor type to base material and load case." },
    ],
    matters: [
      { icon: "🛡️", title: "Safety Critical", desc: "Engineered anchors hold in critical structural and seismic applications." },
      { icon: "📋", title: "Design Validated", desc: "Documented load ratings support structural engineer sign-off." },
      { icon: "🏗️", title: "Retrofit Ready", desc: "Ideal for strengthening existing structures without demolition." },
    ],
    faqs: [
      { q: "When should I use chemical anchors vs mechanical anchors?", a: "Chemical (epoxy) anchors are stronger for cracked concrete, close-to-edge, and dynamic loads. Mechanical anchors are faster to install and better for clean concrete. Our team can advise per application." },
      { q: "Do I need special tools for structural anchors?", a: "For chemical anchors, you need a proper hammer drill (correct hole size) and cleaning brushes. For Hilti, the installation procedure is validated as a system — follow it exactly for the certified load rating." },
      { q: "Do you supply for large structural projects?", a: "Yes. Share your BOQ or anchor schedule, and our team will quote with project-level pricing and staged delivery to site." },
    ],
    relatedCategories: ["Fasteners", "Power Tools"],
  },

  /* ─── 19. Energy Efficiency ───────────────────────────── */
  {
    slug: "energy-efficiency",
    title: "Energy-Efficient Motors & Drives",
    icon: "🌱",
    shortDesc:
      "IE3 and IE4 rated motors and variable frequency drives that cut plant electricity bills and carbon footprint.",
    category: "Technology",
    description: [
      "Motors consume a significant share of industrial electricity — often 60–70% in process plants. The difference between an IE2 motor and an IE4 motor can be 5–8 percentage points of efficiency, which directly translates into crores in annual savings for a large plant.",
      "Modern IE3 and IE4 motors, combined with variable frequency drives (VFDs), deliver another 20–40% energy saving by matching motor speed to actual load. For plants under BEE (Bureau of Energy Efficiency) compliance, this directly supports energy-audit targets.",
    ],
    delivers: [
      { icon: "⚡", title: "IE3 & IE4 Motors", desc: "High-efficiency motors across power ranges, from ABB and others." },
      { icon: "🎛️", title: "VFDs & Drives", desc: "Variable frequency drives from 0.75kW to multi-MW for process control." },
      { icon: "📋", title: "Energy Documentation", desc: "Efficiency curves and energy-savings estimates with each motor." },
      { icon: "🏭", title: "Application Engineering", desc: "Our team helps size motors and drives for your specific load profile." },
    ],
    matters: [
      { icon: "💰", title: "Lower Power Bills", desc: "IE3/IE4 motors cut electricity consumption significantly vs. IE1/IE2." },
      { icon: "🌱", title: "Carbon Reduction", desc: "Energy efficiency directly reduces plant carbon footprint." },
      { icon: "📊", title: "BEE Compliance", desc: "Meets BEE energy-audit targets and PAT scheme requirements." },
    ],
    faqs: [
      { q: "How much can IE3/IE4 motors save?", a: "Typically 3–8% higher efficiency than IE2 motors. Over a motor's 15-year life, this often exceeds the motor's purchase price multiple times." },
      { q: "Do I need a VFD with an IE4 motor?", a: "Not necessarily — but a VFD dramatically amplifies savings in variable-load applications (pumps, fans, compressors) by matching speed to demand." },
      { q: "Are IE3 motors mandatory in India?", a: "Yes, for many industrial applications. BIS mandates IE3 minimum efficiency for certain motor sizes and applications. Our team can confirm for your case." },
    ],
    relatedCategories: ["Electrical"],
  },

  /* ─── 20. Pump Range ───────────────────────────────────── */
  {
    slug: "pump-range",
    title: "Complete Pump Range",
    icon: "💧",
    shortDesc:
      "Monoblock, submersible, centrifugal, and process pumps — for water supply, treatment, and industrial fluid handling.",
    category: "Application",
    description: [
      "Pumps are the unsung workhorses of Indian industry — moving water, chemicals, slurries, and coolants across every manufacturing process. A complete range covers monoblock (compact, easy installation), submersible (for borewells and sumps), centrifugal (high-flow), and process pumps (chemical-resistant, high-pressure).",
      "Brands like Kirloskar have been manufacturing pumps in India for over 135 years — the design details reflect Indian conditions: dust, hard water, voltage fluctuations, and remote maintenance. For Indian plants, this means pumps that stay reliable across years of continuous duty.",
    ],
    delivers: [
      { icon: "💧", title: "Wide Pump Range", desc: "Monoblock, submersible, centrifugal, and process pumps from Kirloskar." },
      { icon: "🔧", title: "Application Sizing", desc: "Our team helps size pumps for your head, flow, and fluid type." },
      { icon: "🛡️", title: "Manufacturer Warranty", desc: "Full manufacturer warranty with documented service support." },
      { icon: "📞", title: "Service Coordination", desc: "Nationwide service network, coordinated by our support team." },
    ],
    matters: [
      { icon: "🏭", title: "Continuous Duty", desc: "Rated for 24×7 operation in plants and industrial facilities." },
      { icon: "🔧", title: "Easy Service", desc: "Wide Indian service network ensures fast spares and repairs." },
      { icon: "💰", title: "Energy Efficient", desc: "Modern pumps deliver better efficiency for lower operating cost." },
    ],
    faqs: [
      { q: "Which pump is best for a factory water supply?", a: "For most factory applications, a Kirloskar monoblock pump (0.5HP to 10HP) is ideal. For high-head or borewell supply, submersible pumps are recommended." },
      { q: "Do you supply pumps for water treatment plants?", a: "Yes. Centrifugal and process pumps for filtration, dosing, and chemical transfer are available with application sizing support." },
      { q: "What about pump service and spares?", a: "Kirloskar and other leading pump brands have nationwide service networks. Our team coordinates warranty and out-of-warranty service on your behalf." },
    ],
    relatedCategories: ["Plumbing", "Electrical"],
  },
];

/* ─── Lookups ───────────────────────────────────────────── */

export function getPillarBySlug(slug) {
  return TRUST_PILLARS.find((p) => p.slug === slug);
}

/**
 * Maps a brand highlight title → pillar slug. Every highlight shown on a
 * brand page resolves through this table, so the brand page can render
 * each highlight as a link to the right pillar detail page.
 */
export const HIGHLIGHT_TITLE_TO_SLUG = {
  // Bosch
  "German Engineering": "global-engineering",
  "Nationwide Service": "nationwide-service",
  "1-Year Warranty": "manufacturer-warranty",
  "18V System": "cordless-platforms",

  // DeWalt
  "Jobs-Site Tough": "heavy-duty",
  "FlexVolt System": "cordless-platforms",
  "Brushless Motors": "brushless-motors",
  "3-Year Warranty": "manufacturer-warranty",

  // Makita
  "Japanese Precision": "global-engineering",
  "LXT & XGT Platforms": "cordless-platforms",
  "Low Noise & Vibration": "precision-tools",

  // Stanley
  "180+ Years of Trust": "legacy-trust",
  "Precision Measuring": "precision-tools",
  "Complete Tool Kits": "full-bom",
  "Lifetime Warranty": "manufacturer-warranty",

  // 3M
  "PPE Leadership": "ppe-leadership",
  "Cubitron II Abrasives": "abrasive-technology",
  "Certified Compliance": "certified-compliance",
  "R&D Backed": "global-engineering",

  // Havells
  "ISI Marked": "certified-compliance",
  "Made in India": "made-in-india",
  "Long Warranties": "manufacturer-warranty",
  "Full BOM Coverage": "full-bom",

  // Honeywell
  "Safety Footwear": "ppe-leadership",
  "Cut-Resistant Gloves": "ppe-leadership",
  "IS/EN/ANSI Certified": "certified-compliance",
  "Heavy-Industry Ready": "heavy-duty",

  // Legrand
  "Commercial & Institutional": "process-industry",
  "BIS/CE Certified": "certified-compliance",
  "Modular Architecture": "modular-architecture",
  "2-Year Warranty": "manufacturer-warranty",

  // ESAB
  "Welding Specialist": "welding-specialist",
  "Consumables Leader": "welding-specialist",
  "1–2 Year Warranty": "manufacturer-warranty",

  // Lincoln
  "Inverter Technology": "inverter-technology",
  "Stable Arc Performance": "inverter-technology",
  "Built for Production": "heavy-duty",
  "Global Standard": "global-engineering",

  // Hilti
  "Structural Fastening": "structural-fastening",
  "Engineered Systems": "global-engineering",
  "Premium Service": "nationwide-service",
  "Extended Warranty": "manufacturer-warranty",

  // Milwaukee
  "M18 & M12 Platforms": "cordless-platforms",
  "FUEL Brushless": "brushless-motors",
  "Heavy-Duty Rated": "heavy-duty",
  "5-Year Warranty": "manufacturer-warranty",

  // ABB
  "IE3/IE4 Motors": "energy-efficiency",
  "Automation Ready": "modular-architecture",
  "Process Industry Standard": "process-industry",

  // Schneider
  "Acti9 Range": "modular-architecture",
  "Critical Infrastructure": "process-industry",

  // Kirloskar
  "Full Pump Range": "pump-range",
  "Indian Heritage": "made-in-india",
};

/** Returns the pillar slug for a given highlight title, or null if unmapped. */
export function getPillarSlugForHighlight(title) {
  return HIGHLIGHT_TITLE_TO_SLUG[title] || null;
}