import { TRUST_PILLARS } from "@/lib/data/trustPillars";

/**
 * Deep-dive detail data for every card on a trust pillar page.
 *
 * Every pillar has two card groups:
 *   • delivers[] → "How SbS delivers it" cards
 *   • matters[]  → "Why it matters" cards
 *
 * Each card gets its own detail page at:
 *   /trust/<pillar-slug>/<card-slug>
 *
 * We hand-write rich content for ~15 high-priority cards. Everything else
 * gets a smart auto-generated detail page built from the pillar's existing
 * context — so no card ever leads to a broken or empty page.
 */

/* ─────────────────────────────────────────────────────────────
   Manual enrichment — top 15 cards (most-viewed, most-important)
   ───────────────────────────────────────────────────────────── */

const MANUAL_CARDS = {
  /* ── Manufacturer Warranty pillar ─────────────────────── */
  "warranty-documentation": {
    type: "deliver",
    pillarSlug: "manufacturer-warranty",
    longDescription: [
      "When you buy a power tool, welding machine, or electrical component, the warranty card is only valuable if you can produce it when you need it. Most failures in Indian industry happen 6–18 months after purchase — long after the original invoice has disappeared into someone's email archive or a filing cabinet no one can find.",
      "SbS closes this gap. Every order ships with the manufacturer warranty card, the original GST invoice, and the product serial number pre-registered with the manufacturer. When something fails, you don't hunt for paperwork — you raise a ticket, and we already have everything on file, digitally stored and instantly retrievable.",
    ],
    howItWorks: [
      { step: "01", title: "Order confirmed", desc: "Your order is processed with all documentation requirements logged against the product SKU." },
      { step: "02", title: "Warranty card bundled", desc: "The manufacturer warranty card is included with the shipment — physical and digital copies." },
      { step: "03", title: "Serial number registered", desc: "Product serial number is recorded on your invoice for instant warranty lookup later." },
      { step: "04", title: "Digital archive created", desc: "A digital copy of all documents is stored in your SbS account for 7 years." },
    ],
    benefits: [
      { icon: "📁", title: "Never Lose Paperwork", desc: "Digital copies stored in your SbS account — accessible anytime, from anywhere." },
      { icon: "⏱️", title: "Faster Claims", desc: "All documentation pre-verified — claims filed in minutes, not days." },
      { icon: "📋", title: "Audit-Ready", desc: "Documented warranty trail supports plant and government compliance audits." },
      { icon: "🛡️", title: "Full Coverage", desc: "Same documentation standard on every product, every order, every brand." },
    ],
    faqs: [
      { q: "Do I get a physical warranty card?", a: "Yes, for products where the manufacturer issues one. We bundle it with the shipment." },
      { q: "How long are documents stored?", a: "Digital copies are stored in your account for 7 years — longer than most warranty periods." },
      { q: "What if I lose my documents?", a: "You can download them anytime from your account under Orders → Documents tab." },
      { q: "Does this work for B2B invoicing?", a: "Yes — GST invoices with serial numbers are stored and downloadable for audit purposes." },
    ],
  },

  "serial-registered": {
    type: "deliver",
    pillarSlug: "manufacturer-warranty",
    longDescription: [
      "Product serial numbers are the single most important identifier when filing a warranty claim. Without a registered serial number, most manufacturers will reject the claim outright — leaving you to pay for repairs out of pocket on a tool that should still be covered.",
      "SbS registers the serial number of every serialised product against your account at the time of dispatch. That means the manufacturer has a paper trail tying that exact unit to your purchase — no ambiguity, no arguments, no lost claims.",
    ],
    howItWorks: [
      { step: "01", title: "Unit picked & scanned", desc: "Warehouse scans the serial number of your unit before packing." },
      { step: "02", title: "Serial recorded on invoice", desc: "Serial number is printed on your GST invoice as a permanent record." },
      { step: "03", title: "Registered with manufacturer", desc: "For eligible products, we pre-register the serial with the manufacturer's warranty system." },
      { step: "04", title: "Stored in your account", desc: "Look up any serial number via your account under Orders → Items." },
    ],
    benefits: [
      { icon: "🔍", title: "Faster Verification", desc: "Manufacturers verify serials instantly — no back-and-forth." },
      { icon: "🛡️", title: "Rejection-Proof", desc: "A registered serial can't be disputed as 'not our product'." },
      { icon: "📊", title: "Asset Tracking", desc: "Serial numbers double as asset tags for your plant's tool register." },
      { icon: "🔄", title: "Easy Theft Tracking", desc: "Lost or stolen tools can be flagged via serial number." },
    ],
    faqs: [
      { q: "Which products have serial numbers?", a: "Most power tools, welding machines, electrical equipment, and high-value items. Consumables like electrodes, PPE, and fasteners typically don't." },
      { q: "Where do I find my serial number?", a: "On the product itself (usually a label on the housing), on the box, and on your SbS invoice." },
      { q: "Does serial registration cost extra?", a: "No. It's included as part of standard SbS service." },
      { q: "Can I register serials for a fleet purchase?", a: "Yes — bulk orders come with a consolidated serial number sheet for your asset register." },
    ],
  },

  "claim-coordination": {
    type: "deliver",
    pillarSlug: "manufacturer-warranty",
    longDescription: [
      "Filing a warranty claim sounds simple until you actually try it. You call the manufacturer's helpline, get bounced between departments, fill out a form, wait for an engineer to visit, and then wait weeks for a resolution — all while your production line is down.",
      "SbS removes that friction entirely. When you raise a warranty claim through your account, our tele-caller team takes ownership. We file the claim with the manufacturer, coordinate the engineer visit, follow up on the status, and keep you updated — all through a single ticket, with all communication logged.",
    ],
    howItWorks: [
      { step: "01", title: "You raise a ticket", desc: "From Account → Orders → Contact Support. Describe the issue, attach photos if helpful." },
      { step: "02", title: "We verify & classify", desc: "Our team confirms the warranty coverage, reviews the documentation, and classifies the claim." },
      { step: "03", title: "Filed with manufacturer", desc: "We file the claim with the manufacturer's authorised service network on your behalf." },
      { step: "04", title: "End-to-end follow-through", desc: "We track the claim until repair or replacement is complete — and share updates in your ticket." },
    ],
    benefits: [
      { icon: "🎯", title: "One Point of Contact", desc: "You never talk to the manufacturer directly — we handle everything." },
      { icon: "⏱️", title: "Faster Resolution", desc: "Our existing relationships with service centres shorten claim times." },
      { icon: "📋", title: "Full Audit Trail", desc: "Every claim, communication, and resolution documented in your ticket." },
      { icon: "📞", title: "Live Updates", desc: "10 AM – 6 PM support keeps you informed at every stage." },
    ],
    faqs: [
      { q: "How do I raise a warranty claim?", a: "Go to Account → Orders → Contact Support. Our team picks it up from there." },
      { q: "How long does a claim take?", a: "Most warranty repairs complete within 5–10 working days. Complex cases take longer, and we update you at every stage." },
      { q: "Who pays for shipping during warranty?", a: "For warranty claims, shipping is covered by the manufacturer/brand service model." },
      { q: "What if the claim is rejected?", a: "We tell you honestly and share the manufacturer's reason. If you disagree, we raise an escalation on your behalf." },
    ],
  },

  "status-tracking": {
    type: "deliver",
    pillarSlug: "manufacturer-warranty",
    longDescription: [
      "The biggest source of frustration during a warranty claim isn't the wait — it's the silence. You don't know if the manufacturer has received the tool, if the engineer has diagnosed it, or if the replacement part has arrived. That silence makes it impossible to plan your maintenance or schedule downtime.",
      "SbS closes the visibility gap with live status tracking on every claim. Your ticket updates automatically as the claim moves through the manufacturer's pipeline — received, diagnosed, part awaited, repaired, dispatched, returned. No more chasing. No more guessing.",
    ],
    howItWorks: [
      { step: "01", title: "Ticket created", desc: "Your claim appears under Account → Support with a unique ticket number." },
      { step: "02", title: "Status updated automatically", desc: "Every status change at the manufacturer's end updates your ticket in real time." },
      { step: "03", title: "Email + in-app notifications", desc: "You receive alerts on every milestone — no need to check manually." },
      { step: "04", title: "Full history preserved", desc: "Timeline of all updates visible anytime for audit or planning." },
    ],
    benefits: [
      { icon: "👁️", title: "Real-Time Visibility", desc: "See exactly where your claim stands, at any moment." },
      { icon: "📅", title: "Better Planning", desc: "Plan your downtime around expected claim completion dates." },
      { icon: "📧", title: "Zero Follow-ups", desc: "You don't need to call anyone — updates come to you." },
      { icon: "📊", title: "Data-Driven", desc: "Historical claim data helps you evaluate brand reliability." },
    ],
    faqs: [
      { q: "Where do I see my claim status?", a: "Under Account → Support → your ticket. Status updates appear automatically." },
      { q: "Do I get notified of updates?", a: "Yes — email and in-app notifications on every status change." },
      { q: "Can I download the claim history?", a: "Yes. Every ticket can be exported as PDF for your maintenance records." },
      { q: "What if I don't see updates for a long time?", a: "Raise a follow-up on the ticket. Our team will chase the manufacturer and reply within 24 hours." },
    ],
  },

  /* ── Nationwide Service pillar ────────────────────────── */
  "pan-india-coverage": {
    type: "deliver",
    pillarSlug: "nationwide-service",
    longDescription: [
      "A service network is only as good as its physical reach. For an Indian plant in a Tier-2 city or a remote MIDC, having 600+ service centres in metros doesn't help if the nearest one is 400 km away. Coverage is measured in pin codes, not press releases.",
      "SbS partners with brands whose service networks genuinely reach across India — 19,000+ pin codes for delivery, with authorised service centres in every major industrial cluster: Pune, Chennai, Ahmedabad, Coimbatore, Ludhiana, Indore, and hundreds of others. If you're in India, you're covered.",
    ],
    howItWorks: [
      { step: "01", title: "Location verified", desc: "When you place an order, we map the nearest authorised service centre to your pin code." },
      { step: "02", title: "Service SLA quoted", desc: "You get an expected service timeline based on your specific location." },
      { step: "03", title: "Nearest centre assigned", desc: "Warranty and non-warranty service is routed to the closest authorised centre." },
      { step: "04", title: "Pickup & return handled", desc: "Doorstep pickup and return delivery, coordinated by our team." },
    ],
    benefits: [
      { icon: "🇮🇳", title: "True Pan-India", desc: "Coverage across 19,000+ pin codes — including Tier-2 and Tier-3 cities." },
      { icon: "🎯", title: "Closest Centre", desc: "Service routed to the nearest authorised centre for fastest turnaround." },
      { icon: "🚚", title: "Doorstep Service", desc: "Pickup and return arranged — no need to ship the tool yourself." },
      { icon: "📍", title: "Industrial Cluster Focus", desc: "Strong presence across MIDC, SEZ, and major industrial estates." },
    ],
    faqs: [
      { q: "Do you service Tier-3 cities?", a: "Yes — through authorised service centres. In rare cases we coordinate with the nearest city and arrange logistics." },
      { q: "How do I find my nearest service centre?", a: "Raise a ticket and we'll route you. Or contact support with your pin code." },
      { q: "Do all brands have the same coverage?", a: "Coverage varies. Premium brands (Bosch, DeWalt) have wider networks than emerging brands. We tell you honestly upfront." },
      { q: "What if the nearest centre is far?", a: "We arrange courier pickup — you don't have to travel." },
    ],
  },

  "single-point-contact": {
    type: "deliver",
    pillarSlug: "nationwide-service",
    longDescription: [
      "The most frustrating part of B2B service is being bounced between the seller, the distributor, and the manufacturer. Each one points at the other. Nobody owns the problem. Nothing gets solved until you escalate to someone senior.",
      "SbS eliminates that by owning the entire service relationship. You raise one ticket, and our team handles the manufacturer coordination, distributor logistics, and service centre scheduling behind the scenes. To you, it's one contact, one ticket, one resolution.",
    ],
    howItWorks: [
      { step: "01", title: "One ticket covers all", desc: "You raise a single ticket. We manage everything behind it." },
      { step: "02", title: "We own the coordination", desc: "Manufacturer, distributor, service centre — we chase them, not you." },
      { step: "03", title: "Consolidated updates", desc: "All communication funnels back into your one ticket." },
      { step: "04", title: "Single resolution point", desc: "When it's resolved, we confirm — no ambiguity about who closed it." },
    ],
    benefits: [
      { icon: "🎯", title: "One Contact", desc: "No more bouncing between seller, distributor, and manufacturer." },
      { icon: "⏱️", title: "Faster Resolution", desc: "Our team knows the right people to call — cuts days off the process." },
      { icon: "📋", title: "Accountability", desc: "We own the outcome end-to-end. If it fails, we failed." },
      { icon: "📞", title: "Always Reachable", desc: "10 AM – 6 PM on all working days, on every ticket." },
    ],
    faqs: [
      { q: "Do I need to call the manufacturer myself?", a: "Never. We handle all manufacturer communication." },
      { q: "What if a distributor is involved?", a: "We coordinate with them directly. You don't need to know who they are." },
      { q: "Can I escalate if needed?", a: "Yes — every ticket has an escalation path to a senior support lead." },
      { q: "Does this work outside working hours?", a: "Tickets can be raised 24×7. Live support operates 10 AM – 6 PM on working days." },
    ],
  },

  /* ── Certified Compliance pillar ──────────────────────── */
  "certification-verified": {
    type: "deliver",
    pillarSlug: "certified-compliance",
    longDescription: [
      "Certifications are only valuable if they're genuine. The Indian market has a real problem with counterfeit certificates and misrepresented product markings — tools labeled CE that were never tested, wires marked ISI that were never inspected.",
      "SbS verifies every certification claim before a product goes live. We check the manufacturer's declaration, validate the certificate number against the issuing body's registry where possible, and refuse to list products where certification cannot be traced back to an authoritative source.",
    ],
    howItWorks: [
      { step: "01", title: "Manufacturer declaration", desc: "Supplier provides certification documentation with each product SKU." },
      { step: "02", title: "Registry verification", desc: "We cross-check certificate numbers against BIS, CE, or ISO registries where possible." },
      { step: "03", title: "Physical marking check", desc: "For sampled shipments, we verify physical markings match the certificate." },
      { step: "04", title: "Ongoing audits", desc: "Periodic re-verification ensures ongoing compliance with current standards." },
    ],
    benefits: [
      { icon: "✅", title: "Genuine Certificates", desc: "Every certification verified — never a copied or fake document." },
      { icon: "📋", title: "Tender-Ready", desc: "Documentation that passes government tender scrutiny." },
      { icon: "🛡️", title: "Legal Protection", desc: "Genuine compliance protects you in incident and liability cases." },
      { icon: "📊", title: "Audit Trail", desc: "Full documentation trail supporting plant audits." },
    ],
    faqs: [
      { q: "How do I verify a product's certification?", a: "Check the product page — we list all certifications and, where possible, the certificate number." },
      { q: "What if a product has a fake certificate?", a: "We remove it immediately and refund or replace any affected orders. We also blacklist the supplier." },
      { q: "Do you verify CE marks?", a: "Yes — we validate the CE mark against manufacturer documentation and issuing body records." },
      { q: "Which certifications do you accept?", a: "ISI/BIS (India), CE (Europe), ANSI/UL (USA), ISO (global), plus category-specific certifications like NIOSH for PPE, ATEX for hazardous-area equipment." },
    ],
  },

  "documentation-included": {
    type: "deliver",
    pillarSlug: "certified-compliance",
    longDescription: [
      "Certification is one thing. Producing the documentation on demand — for a plant audit, a government tender, or an export customs check — is another. Many buyers discover too late that the compliance paperwork never arrived with the shipment.",
      "SbS bundles full compliance documentation with every order. Test certificates, material certificates, declaration of conformity, and any category-specific documentation — physically included in the shipment and digitally archived in your account.",
    ],
    howItWorks: [
      { step: "01", title: "Documentation compiled", desc: "Our team compiles all relevant certificates for your order before dispatch." },
      { step: "02", title: "Physically bundled", desc: "Documents packed inside the shipment — usually in a document pouch." },
      { step: "03", title: "Digitally archived", desc: "Same documents uploaded to your account for instant retrieval." },
      { step: "04", title: "Available for audit", desc: "Download any document anytime for plant or government audit." },
    ],
    benefits: [
      { icon: "📋", title: "Complete Package", desc: "Every certificate and compliance document in one bundle." },
      { icon: "📁", title: "Digitally Stored", desc: "7-year archive in your account for audit-ready retrieval." },
      { icon: "🏭", title: "Audit-Ready", desc: "Meets requirements for plant, government, and export audits." },
      { icon: "🔍", title: "Searchable", desc: "Find any certificate for any past order in seconds." },
    ],
    faqs: [
      { q: "What documentation is included?", a: "Test certificates, material certificates, declaration of conformity, and category-specific docs where applicable." },
      { q: "Is documentation always included?", a: "Yes, for all products where certification exists. For items without certification, we note this upfront." },
      { q: "Can I request additional documentation?", a: "Yes — raise a ticket and we'll source additional documents from the manufacturer if available." },
      { q: "Do you provide documentation for export?", a: "Yes. For export orders, we can arrange additional documentation — mention it in your bulk enquiry." },
    ],
  },

  /* ── Cordless Platforms pillar ────────────────────────── */
  "genuine-batteries": {
    type: "deliver",
    pillarSlug: "cordless-platforms",
    longDescription: [
      "Cordless tools are only as good as their batteries. Counterfeit or refurbished batteries look identical to genuine ones but deliver less capacity, fail faster, and — worst case — damage the tool's motor and electronics. In industrial use, that means unexpected downtime and void warranties.",
      "SbS sources every battery, charger, and starter kit from authorised distributors. No grey imports. No refurbished units sold as new. Full manufacturer warranty, complete with serial registration and claim support through our team.",
    ],
    howItWorks: [
      { step: "01", title: "Authorised sourcing", desc: "Batteries sourced only from brand-authorised distributors in India." },
      { step: "02", title: "Serial verification", desc: "Battery serial numbers verified against manufacturer records." },
      { step: "03", title: "Warranty registered", desc: "Battery warranty registered at time of dispatch for claim tracking." },
      { step: "04", title: "Full documentation", desc: "Invoice, warranty card, and serial number documented on every order." },
    ],
    benefits: [
      { icon: "🔋", title: "Full Capacity", desc: "Genuine batteries deliver rated capacity — no fake cell numbers." },
      { icon: "🛡️", title: "Warranty Intact", desc: "Manufacturer warranty on tool stays valid with genuine batteries." },
      { icon: "💰", title: "Best Value Per Cycle", desc: "Genuine batteries last far longer per rupee than fakes." },
      { icon: "🔧", title: "Tool Protection", desc: "Genuine battery electronics protect the tool from voltage and thermal issues." },
    ],
    faqs: [
      { q: "How do I know a battery is genuine?", a: "Serial number on the battery can be verified against the manufacturer. We record serials on your invoice." },
      { q: "Are refurbished batteries ever sold?", a: "No. Every battery we ship is new and factory-sealed." },
      { q: "Do you stock bulk battery packs?", a: "Yes — bulk battery orders with tier pricing available at 3, 5, 10+ units." },
      { q: "What about charger compatibility?", a: "Chargers match the platform — we confirm compatibility before every order." },
    ],
  },

  "bulk-battery-pricing": {
    type: "deliver",
    pillarSlug: "cordless-platforms",
    longDescription: [
      "Batteries are the highest-recurring cost in a cordless tool fleet. A single 18V 4Ah battery from a premium brand costs as much as a mid-range tool — and they're the consumable most likely to need replacement every 2–3 years in continuous industrial use.",
      "SbS offers tier-based bulk battery pricing that brings down your per-battery cost significantly. Order 3, 5, 10, or 25+ units and the price drops at each tier. For plant-wide fleets, we can arrange custom project pricing for 50+ batteries.",
    ],
    howItWorks: [
      { step: "01", title: "Quantity-based tiers", desc: "Automatic pricing at 3, 5, 10, and 25+ unit quantities." },
      { step: "02", title: "Project quotes", desc: "For 50+ batteries, raise a bulk enquiry for custom pricing." },
      { step: "03", title: "Charger bundling", desc: "Bundle batteries with chargers and starter kits for further savings." },
      { step: "04", title: "Consolidated invoicing", desc: "Single GST invoice for your entire battery order." },
    ],
    benefits: [
      { icon: "💰", title: "Lower Unit Price", desc: "Tier discounts reduce per-battery cost by 10–25% at 10+ units." },
      { icon: "📦", title: "Fleet Consolidation", desc: "Buy your entire fleet's batteries in one order — one invoice, one warranty desk." },
      { icon: "🔧", title: "Bundle Savings", desc: "Combine batteries with chargers for extra savings." },
      { icon: "🎯", title: "Custom Projects", desc: "50+ batteries get bespoke project-level pricing." },
    ],
    faqs: [
      { q: "What are the tier thresholds?", a: "3, 5, 10, and 25+ units. Each tier has a progressively better per-unit price." },
      { q: "Can I get a custom quote for 100+ batteries?", a: "Yes — raise a bulk enquiry and we'll prepare a project-level quote within 24 hours." },
      { q: "Do batteries mix with other items in bulk pricing?", a: "Bulk pricing is calculated on the entire order value, not per category." },
      { q: "Is there a lower cap on bulk orders?", a: "No cap. Order as few as 3 or as many as 300." },
    ],
  },

  /* ── Heavy-Duty pillar ────────────────────────────────── */
  "industrial-rated-products": {
    type: "deliver",
    pillarSlug: "heavy-duty",
    longDescription: [
      "Heavy-duty isn't a marketing term — it's a measurable specification. A truly industrial-rated tool carries a defined duty cycle, thermal rating, IP rating, and mechanical design validated against abuse: drops, overloads, dust, moisture, and temperature extremes.",
      "Every product in our heavy-duty range comes with these specifications documented on the product page. You can compare tools not just on price but on duty cycle percentage, max continuous runtime, and thermal protection — the numbers that actually predict real-world performance.",
    ],
    howItWorks: [
      { step: "01", title: "Duty cycle published", desc: "Continuous duty cycle percentage shown on every industrial-rated product." },
      { step: "02", title: "Thermal rating documented", desc: "Max temperature tolerance and thermal protection details included." },
      { step: "03", title: "IP rating declared", desc: "Dust and moisture protection ratings clearly stated." },
      { step: "04", title: "Mechanical validation", desc: "Drop test and overload test results available for premium range." },
    ],
    benefits: [
      { icon: "📋", title: "Spec Transparency", desc: "You compare on real specs, not marketing claims." },
      { icon: "⏱️", title: "Predictable Performance", desc: "Know what your tool will do before you buy it." },
      { icon: "💪", title: "Built for Abuse", desc: "Rated for jobsite conditions — dust, drops, and overload." },
      { icon: "📊", title: "Maintenance Planning", desc: "Documented duty cycles let you schedule preventive maintenance." },
    ],
    faqs: [
      { q: "How do I know if a tool is truly heavy-duty?", a: "Look for continuous duty cycle (not intermittent), brushless motor, IP rating (dust/moisture), and manufacturer's industrial-use statement." },
      { q: "Is heavier always better?", a: "Not necessarily. Weight matters for operator fatigue. Look at the duty cycle and thermal rating — not just weight." },
      { q: "Do heavy-duty tools cost more?", a: "Yes, typically 30–80% more than consumer versions — but they last 3–5x longer in industrial use." },
      { q: "Do you offer duty cycle comparisons?", a: "Yes — our team can prepare a side-by-side spec comparison for your shortlist." },
    ],
  },

  /* ── Made in India pillar ─────────────────────────────── */
  "indian-manufacturing": {
    type: "deliver",
    pillarSlug: "made-in-india",
    longDescription: [
      "Made in India doesn't mean a compromise anymore. Leading Indian manufacturers — Havells, Kirloskar, Astral — design and build products specifically for Indian conditions: voltage fluctuations, hard water, dust, humidity, and remote service realities. The result is equipment that works when conditions aren't ideal.",
      "SbS sources from these Indian manufacturers with full quality documentation. Every order is GST-invoiced, with spares available from Indian warehouses and service through nationwide networks — a level of support that imported products often can't match.",
    ],
    howItWorks: [
      { step: "01", title: "Indian plant sourcing", desc: "Products sourced directly from manufacturer's Indian facilities." },
      { step: "02", title: "Quality verified", desc: "Documentation of BIS/ISI compliance and manufacturing standards." },
      { step: "03", title: "GST invoiced", desc: "Full GST invoice with manufacturer's GSTIN documented." },
      { step: "04", title: "Indian service network", desc: "Warranty and service coordinated through Indian networks — no import delays." },
    ],
    benefits: [
      { icon: "🇮🇳", title: "Made for India", desc: "Engineered for Indian voltage, dust, and environmental conditions." },
      { icon: "💰", title: "Better Landed Cost", desc: "No import duty or long logistics — lower effective cost." },
      { icon: "🔧", title: "Faster Spares", desc: "Spare parts available from Indian warehouses — no waiting for imports." },
      { icon: "🌱", title: "Lower Carbon", desc: "Shorter supply chains and lower transport emissions." },
    ],
    faqs: [
      { q: "Is Indian manufacturing quality as good as imported?", a: "For leading Indian brands, yes — often better suited to Indian conditions. The quality gap has closed dramatically over the last decade." },
      { q: "How do I verify 'Made in India'?", a: "Check the manufacturer's declaration on the packaging and the country of origin on the invoice." },
      { q: "Do Indian brands offer the same warranty?", a: "Yes — 1–5 years depending on category, comparable to international brands." },
      { q: "Do you stock both Indian and imported?", a: "Yes. We stock both and can advise which is better for your specific application." },
    ],
  },

  /* ── Energy Efficiency pillar ─────────────────────────── */
  "ie3-ie4-motors": {
    type: "deliver",
    pillarSlug: "energy-efficiency",
    longDescription: [
      "Motors consume 60–70% of industrial electricity in India. The efficiency gap between a low-efficiency motor (IE1) and a premium-efficiency motor (IE4) can be 8–10 percentage points — which, on a 75 kW motor running 8,000 hours per year, translates into lakhs of rupees in annual savings.",
      "SbS stocks IE3 and IE4 motors across power ranges, from fractional kW to multi-hundred kW. Every motor comes with an efficiency curve, BEE rating, and application engineering support. For plants under PAT/BEE compliance, this is a direct path to meeting targets.",
    ],
    howItWorks: [
      { step: "01", title: "Efficiency class documented", desc: "Every motor is labelled IE3 or IE4 with full efficiency curve." },
      { step: "02", title: "Application sizing support", desc: "Our team helps size the right motor for your load profile." },
      { step: "03", title: "BEE/BIS compliant", desc: "Full documentation for BEE energy audits and PAT scheme." },
      { step: "04", title: "Energy savings estimate", desc: "Estimated annual savings shared with each quote." },
    ],
    benefits: [
      { icon: "💰", title: "Lower Power Bills", desc: "IE3/IE4 motors cut electricity consumption by 3–10% vs. IE1/IE2." },
      { icon: "🌱", title: "Carbon Reduction", desc: "Energy efficiency directly reduces plant carbon footprint." },
      { icon: "📊", title: "BEE Compliance", desc: "Meets BEE energy-audit targets and PAT scheme requirements." },
      { icon: "🔧", title: "Full Support", desc: "Application engineering and sizing support from our team." },
    ],
    faqs: [
      { q: "How much can IE4 motors save?", a: "Typically 5–10% higher efficiency than IE2 motors. Over 15 years, savings often exceed the motor's purchase price multiple times." },
      { q: "Are IE3 motors mandatory in India?", a: "Yes, for many applications. BIS mandates IE3 minimum efficiency for certain motor sizes and uses." },
      { q: "Do I need a VFD with an IE4 motor?", a: "Not required — but a VFD amplifies savings in variable-load applications like pumps and fans." },
      { q: "Can you size a motor for my application?", a: "Yes — share your load profile via bulk enquiry and our team will recommend the right motor." },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────────── */

export function slugifyCard(title) {
  return String(title)
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Auto-generates a rich detail object for a card that has no manual entry. */
function generateCardDetail(pillar, card, type) {
  const slug = slugifyCard(card.title);
  const typeLabel = type === "deliver" ? "How we deliver it" : "Why it matters";

  return {
    slug,
    type,
    pillarSlug: pillar.slug,
    pillarTitle: pillar.title,
    pillarCategory: pillar.category,
    icon: card.icon,
    title: card.title,
    shortDesc: card.desc,
    longDescription: [
      card.desc,
      `"${card.title}" is one of the pillars that makes ${pillar.title.toLowerCase()} a genuine differentiator on SbS. It's part of the ${typeLabel.toLowerCase()} framework that supports every order we ship — for every customer, on every category, without exception.`,
      `If this isn't reflected in your actual experience, we consider that a failure on our side. Raise a ticket and we'll make it right.`,
    ],
    howItWorks: [
      { step: "01", title: "Raise a request", desc: "Contact our team via your account, a bulk enquiry, or a support ticket." },
      { step: "02", title: "Verification", desc: "Our team verifies the requirement against your account and order history." },
      { step: "03", title: "Execution", desc: "The deliverable is executed within defined service level agreements." },
      { step: "04", title: "Confirmation", desc: "You receive written confirmation and ongoing tracking in your account." },
    ],
    benefits: [
      { icon: "🎯", title: "Consistent Standard", desc: "Same quality of delivery on every order, every time." },
      { icon: "⏱️", title: "Defined Turnaround", desc: "Clear SLAs with live status tracking in your account." },
      { icon: "📞", title: "Live Support", desc: "Backed by 10 AM – 6 PM support on all working days." },
      { icon: "📋", title: "Full Documentation", desc: "Every action documented and retrievable for audit." },
    ],
    faqs: [
      { q: `What exactly is "${card.title}"?`, a: card.desc },
      { q: "How do I request this on my order?", a: "Raise a ticket from your account panel or contact support directly — we'll take it from there." },
      { q: "Is there any extra cost?", a: "No. This is included as part of standard SbS service — no surcharge." },
      { q: "What if I have a problem with this?", a: "Raise a ticket. Our team will investigate and respond within 24 hours." },
    ],
    relatedBrands: [],
    relatedCategories: pillar.relatedCategories || [],
  };
}

/**
 * Returns the full detail object for a sub-card.
 * Tries manual data first, then falls back to auto-generated content.
 */
export function getCardDetail(pillarSlug, cardSlug) {
  // 1. Check manual data
  if (MANUAL_CARDS[cardSlug] && MANUAL_CARDS[cardSlug].pillarSlug === pillarSlug) {
    const manual = MANUAL_CARDS[cardSlug];
    const pillar = TRUST_PILLARS.find((p) => p.slug === pillarSlug);
    return {
      ...manual,
      slug: cardSlug,
      pillarTitle: pillar?.title,
      pillarCategory: pillar?.category,
      relatedCategories: pillar?.relatedCategories || [],
      relatedBrands: manual.relatedBrands || [],
    };
  }

  // 2. Find pillar + card
  const pillar = TRUST_PILLARS.find((p) => p.slug === pillarSlug);
  if (!pillar) return null;

  // 3. Search in delivers
  const deliver = pillar.delivers?.find((d) => slugifyCard(d.title) === cardSlug);
  if (deliver) return generateCardDetail(pillar, deliver, "deliver");

  // 4. Search in matters
  const matter = pillar.matters?.find((m) => slugifyCard(m.title) === cardSlug);
  if (matter) return generateCardDetail(pillar, matter, "matter");

  return null;
}

/**
 * Returns every card (delivers + matters) for a pillar, with slugs attached.
 * Used by the trust pillar page to render clickable cards.
 */
export function getCardsForPillar(pillarSlug) {
  const pillar = TRUST_PILLARS.find((p) => p.slug === pillarSlug);
  if (!pillar) return { delivers: [], matters: [] };

  return {
    delivers: (pillar.delivers || []).map((d) => ({
      ...d,
      slug: slugifyCard(d.title),
      type: "deliver",
    })),
    matters: (pillar.matters || []).map((m) => ({
      ...m,
      slug: slugifyCard(m.title),
      type: "matter",
    })),
  };
}

/**
 * All card slugs across all pillars — used by generateStaticParams
 * for the /trust/[slug]/[card] route.
 */
export function getAllCardParams() {
  const params = [];
  for (const pillar of TRUST_PILLARS) {
    for (const d of pillar.delivers || []) {
      params.push({ slug: pillar.slug, card: slugifyCard(d.title) });
    }
    for (const m of pillar.matters || []) {
      params.push({ slug: pillar.slug, card: slugifyCard(m.title) });
    }
  }
  return params;
}