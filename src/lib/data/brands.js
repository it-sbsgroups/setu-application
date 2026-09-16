import { ALL_PRODUCTS } from "@/lib/data/products";

/**
 * Brand directory. Powers:
 *   • /brands            → listing page
 *   • /brand/[slug]      → brand detail page
 *   • Homepage BrandStrip
 *   • "Top Brands" tab in Popular Searches
 *   • Footer "Popular Brands" column
 *
 * `keywords` is what we match against product names (ALL_PRODUCTS) to
 * build the "products by brand" grid — keep them lowercase and short.
 */

export const BRANDS = [
  {
    slug: "bosch",
    name: "Bosch",
    displayName: "BOSCH",
    tagline: "Invented for life",
    origin: "Germany",
    founded: 1886,
    industry: "Power Tools & Automotive",
    accent: "#005F9E",
    keywords: ["bosch"],
    categories: ["Power Tools", "Hand Tools", "Electrical"],
    description: [
      "Bosch is a global benchmark in power tools — measured by both revenue and market share across most operating segments. Founded in Stuttgart in 1886, the company's blue professional range is a familiar sight on Indian factory floors, construction sites, and workshops, known for reliability, torque delivery, and long service life.",
      "Bosch's Indian operations span manufacturing, R&D, and a nationwide service network, making spares, consumables, and authorised warranty claims straightforward for B2B buyers. From the ubiquitous GSB drill range to heavy-duty rotary hammers and cordless 18V professional systems, every tool is built to handle continuous industrial duty.",
    ],
    highlights: [
      { icon: "⚙️", title: "German Engineering", desc: "Precision-built tools tested for continuous industrial duty cycles." },
      { icon: "🔧", title: "Nationwide Service", desc: "700+ authorised service centres across India for spares and repairs." },
      { icon: "🛡️", title: "1-Year Warranty", desc: "Manufacturer warranty with documented claim support via our team." },
      { icon: "⚡", title: "18V System", desc: "One battery, one charger, 100+ tools — perfect for mixed-tool workshops." },
    ],
    faqs: [
      { q: "Is Bosch sold on SbS genuine?", a: "Yes. Every Bosch tool we ship is sourced from authorised distributors and comes with full GST invoicing and manufacturer warranty documentation." },
      { q: "Does Bosch offer industrial bulk pricing?", a: "Yes. Tier-based pricing applies at 3, 5, 10, and 25+ units. For larger project BOQs, raise a bulk enquiry for a custom quote." },
      { q: "What about warranty claims?", a: "Our tele-caller team coordinates every warranty claim with Bosch's authorised service network — you never have to chase the manufacturer yourself." },
    ],
  },
  {
    slug: "dewalt",
    name: "DeWalt",
    displayName: "DeWALT",
    tagline: "Guaranteed tough",
    origin: "USA",
    founded: 1924,
    industry: "Power Tools & Accessories",
    accent: "#FEB800",
    keywords: ["dewalt"],
    categories: ["Power Tools", "Hand Tools"],
    description: [
      "DeWalt is the American professional's brand of choice — built for jobsite abuse, not shelf displays. Founded in 1924 in Pennsylvania, DeWalt tools are engineered for high-torque, high-duty-cycle applications where failure is not an option: structural steel, heavy fabrication, MRO, and construction.",
      "DeWalt's yellow-and-black range covers corded and cordless drills, grinders, saws, and accessories, with a strong emphasis on brushless motor technology and job-site durability. In India, DeWalt is a top pick for EPC contractors, infrastructure projects, and manufacturing plants.",
    ],
    highlights: [
      { icon: "💪", title: "Jobs-Site Tough", desc: "Designed for continuous heavy-duty use on construction and fabrication sites." },
      { icon: "🔋", title: "FlexVolt System", desc: "Switch between 20V and 60V on the same battery platform." },
      { icon: "⚙️", title: "Brushless Motors", desc: "Longer runtime, less heat, fewer breakdowns on demanding jobs." },
      { icon: "🛡️", title: "3-Year Warranty", desc: "Extended manufacturer warranty on professional power tools." },
    ],
    faqs: [
      { q: "What makes DeWalt different from Bosch?", a: "DeWalt is optimised for jobsite abuse and high torque — popular with EPC contractors and heavy fabrication. Bosch is broader across workshops, service, and mixed-tool environments." },
      { q: "Does DeWalt have an authorised service network in India?", a: "Yes. DeWalt has a growing authorised service network — and we coordinate every claim on your behalf." },
      { q: "Can I get FlexVolt batteries in bulk?", a: "Yes. Tier-based bulk pricing applies to DeWalt batteries, chargers, and tools alike." },
    ],
  },
  {
    slug: "makita",
    name: "Makita",
    displayName: "Makita",
    tagline: "Rule the outdoors",
    origin: "Japan",
    founded: 1915,
    industry: "Power Tools & Outdoor Equipment",
    accent: "#00734C",
    keywords: ["makita"],
    categories: ["Power Tools", "Hand Tools"],
    description: [
      "Makita is a Japanese power-tool manufacturer with over a century of engineering heritage — founded in 1915 in Nagoya. The brand is known for compact, high-efficiency tools that combine precision with Japanese build quality, making them a favourite across furniture manufacturing, automotive workshops, and precision woodworking.",
      "Makita's LXT 18V platform is one of the widest in the industry, spanning drills, grinders, saws, and specialty tools. The XGT 40V range pushes into heavy-duty industrial applications. For workshops that value low vibration, low weight, and consistent power delivery, Makita is a strong pick.",
    ],
    highlights: [
      { icon: "🎯", title: "Japanese Precision", desc: "Compact, low-vibration tools built for precision work and long shift use." },
      { icon: "🔋", title: "LXT & XGT Platforms", desc: "18V and 40V cordless systems covering light-duty to heavy-duty tasks." },
      { icon: "🤫", title: "Low Noise & Vibration", desc: "Ideal for indoor fabrication, furniture units, and precision workshops." },
      { icon: "🛡️", title: "1-Year Warranty", desc: "Manufacturer warranty with documented claim support." },
    ],
    faqs: [
      { q: "Is Makita good for furniture manufacturing?", a: "Yes. Makita is a top choice for furniture, woodworking, and precision carpentry — low vibration, accurate cutting, and compact form factor." },
      { q: "Do you stock Makita batteries in bulk?", a: "Yes. Batteries, chargers, and bare tools are all available with bulk pricing at 3, 5, 10, and 25+ units." },
      { q: "Makita vs Bosch for a workshop?", a: "Makita for precision work and lower vibration; Bosch for broader tool availability and nationwide service. Many workshops use both." },
    ],
  },
  {
    slug: "stanley",
    name: "Stanley",
    displayName: "STANLEY",
    tagline: "Tools you trust",
    origin: "USA",
    founded: 1843,
    industry: "Hand Tools & Storage",
    accent: "#FDB913",
    keywords: ["stanley"],
    categories: ["Hand Tools", "Fasteners"],
    description: [
      "Stanley is one of the world's oldest and most recognised hand-tool brands — founded in 1843 in New Britain, Connecticut. The brand's black-and-yellow range spans measuring tools, striking tools, cutting tools, pliers, socket sets, and site storage, and is a staple in every toolbox and tool crib across Indian industry.",
      "Stanley is also known for its professional-grade socket sets, tape measures, and site boxes — the everyday essentials that quietly keep projects running. For MSMEs, contractors, and maintenance teams, Stanley offers the right balance of quality and affordability.",
    ],
    highlights: [
      { icon: "🔨", title: "180+ Years of Trust", desc: "One of the oldest tool brands in the world, trusted across every trade." },
      { icon: "📏", title: "Precision Measuring", desc: "Tape measures, levels, and layout tools accurate enough for site work." },
      { icon: "🧰", title: "Complete Tool Kits", desc: "Socket sets, bit sets, and hand tool kits for workshops and service teams." },
      { icon: "🛡️", title: "Lifetime Warranty", desc: "Lifetime warranty against manufacturing defects on most hand tools." },
    ],
    faqs: [
      { q: "Is Stanley good for professional use?", a: "Yes. Stanley's black-and-yellow professional range is designed for daily industrial and construction use — not just DIY." },
      { q: "Do you have Stanley tool kits in bulk?", a: "Yes. Multi-piece socket sets, hand tool kits, and site storage are available with bulk pricing." },
      { q: "Does Stanley offer warranty on hand tools?", a: "Most Stanley hand tools carry a lifetime warranty against manufacturing defects. Warranty claims are coordinated by our support team." },
    ],
  },
  {
    slug: "3m",
    name: "3M",
    displayName: "3M",
    tagline: "Science. Applied to life.",
    origin: "USA",
    founded: 1902,
    industry: "Safety, Abrasives & Industrial Tapes",
    accent: "#FF0000",
    keywords: ["3m"],
    categories: ["Safety & PPE", "Abrasives", "Welding"],
    description: [
      "3M is a diversified American manufacturing giant — founded in 1902 in Minnesota — whose products span safety PPE, abrasives, adhesives, tapes, and industrial films. In Indian industry, 3M is best known for its respirators, ear protection, abrasive systems (Cubitron II, Trizact), and welding helmets.",
      "3M's safety and abrasive ranges are used across automotive, metal fabrication, pharmaceuticals, and heavy industry — wherever standards are strict and failure is not acceptable. Every product is backed by 3M's R&D depth and global quality certifications.",
    ],
    highlights: [
      { icon: "😷", title: "PPE Leadership", desc: "N95 respirators, earmuffs, and welding helmets with global certifications." },
      { icon: "🪨", title: "Cubitron II Abrasives", desc: "Patented precision-shaped grain for faster, cooler cutting and grinding." },
      { icon: "🛡️", title: "Certified Compliance", desc: "NIOSH, CE, ANSI, and IS certifications across the safety range." },
      { icon: "🧪", title: "R&D Backed", desc: "Products validated by 3M's global industrial R&D labs." },
    ],
    faqs: [
      { q: "Is 3M PPE certified for Indian industry?", a: "Yes. 3M PPE sold on SbS is NIOSH/CE/IS certified and used across Indian industry for compliance-critical applications." },
      { q: "Do you offer 3M respirators in bulk?", a: "Yes. N95 masks, half-face respirators, and cartridges are available in bulk packs with tier-based pricing." },
      { q: "Are 3M abrasives worth the premium?", a: "Yes. Cubitron II lasts significantly longer and cuts faster than conventional abrasives — lowers your per-cut cost on high-volume jobs." },
    ],
  },
  {
    slug: "havells",
    name: "Havells",
    displayName: "Havells",
    tagline: "Lighting up lives",
    origin: "India",
    founded: 1958,
    industry: "Electrical & Wiring",
    accent: "#E1251B",
    keywords: ["havells"],
    categories: ["Electrical"],
    description: [
      "Havells is one of India's largest electrical equipment manufacturers — founded in 1958. The company's range spans wires and cables, switchgear, MCBs, RCCBs, motors, fans, and lighting. Havells is a staple in Indian residential, commercial, and industrial electrical projects, with a distribution network that reaches virtually every pin code.",
      "For B2B buyers, Havells offers ISI-marked products, documented warranty support, and category coverage that lets you source an entire electrical BOM from a single brand. The company's commitment to quality and after-sales service makes it the default pick for contractors and plant maintenance teams.",
    ],
    highlights: [
      { icon: "⚡", title: "ISI Marked", desc: "All wires, cables, and switchgear are ISI certified for safety compliance." },
      { icon: "🏭", title: "Made in India", desc: "Manufactured across multiple plants in India with pan-India service." },
      { icon: "🛡️", title: "Long Warranties", desc: "Up to 5-year warranty on wires, switchgear, and select categories." },
      { icon: "📦", title: "Full BOM Coverage", desc: "Cables, MCBs, RCCBs, lighting, fans — source your entire electrical package." },
    ],
    faqs: [
      { q: "Is Havells ISI marked?", a: "Yes. Havells wires, cables, MCBs, and RCCBs are ISI marked as per Indian safety standards." },
      { q: "Do you offer project quantities of Havells wires?", a: "Yes. Wire bundles and full drums of Havells wires are available with project pricing — raise a bulk enquiry." },
      { q: "What warranty does Havells offer?", a: "Havells wires typically carry 2–5 year warranties, and switchgear carries 1–2 years. All claims coordinated by our team." },
    ],
  },
  {
    slug: "honeywell",
    name: "Honeywell",
    displayName: "Honeywell",
    tagline: "The future is what we make it",
    origin: "USA",
    founded: 1906,
    industry: "Safety & Industrial Automation",
    accent: "#E4002B",
    keywords: ["honeywell"],
    categories: ["Safety & PPE"],
    description: [
      "Honeywell is a Fortune 100 industrial conglomerate — founded in 1906 — with a legacy in safety products, building technologies, and industrial automation. In India, Honeywell is best known for its safety footwear, cut-resistant gloves, and head/ear protection, widely used across steel, oil & gas, and heavy manufacturing.",
      "Honeywell's safety range is engineered for high-risk environments: cut-resistant liners, chemical-resistant coatings, anti-slip soles, and industrial-grade protection. Every product is compliant with IS, EN, and ANSI standards, making them audit-ready for plant safety teams.",
    ],
    highlights: [
      { icon: "🥾", title: "Safety Footwear", desc: "Steel toe, anti-slip, and electrical-resistant options for every plant." },
      { icon: "🧤", title: "Cut-Resistant Gloves", desc: "ANSI Cut Level 3–5 gloves for metalworking, glass, and sheet handling." },
      { icon: "🛡️", title: "IS/EN/ANSI Certified", desc: "Fully compliant with Indian and international safety standards." },
      { icon: "🏭", title: "Heavy-Industry Ready", desc: "Widely specified across steel, cement, oil & gas, and infrastructure." },
    ],
    faqs: [
      { q: "Does Honeywell supply safety PPE in bulk?", a: "Yes. Honeywell PPE is commonly procured in bulk by plants — pricing tiers apply at 10+ units and project quantities." },
      { q: "Are Honeywell gloves suitable for sheet metal handling?", a: "Yes. Honeywell offers cut-resistant gloves up to ANSI Level 5, ideal for sheet metal, glass, and sharp-edge handling." },
      { q: "Can I get safety footwear in mixed sizes?", a: "Yes. Bulk orders can be split across sizes — mention the size break-up in your bulk enquiry." },
    ],
  },
  {
    slug: "legrand",
    name: "Legrand",
    displayName: "Legrand",
    tagline: "Together, let's build a sustainable future",
    origin: "France",
    founded: 1865,
    industry: "Electrical & Digital Infrastructure",
    accent: "#00843D",
    keywords: ["legrand"],
    categories: ["Electrical"],
    description: [
      "Legrand is a French specialist in electrical and digital building infrastructures — founded in 1865. The brand is synonymous with premium switchgear, wiring devices, MCBs, RCCBs, distribution boards, and structured cabling, and is widely specified in commercial offices, hospitals, hotels, and data centres.",
      "For B2B buyers, Legrand offers modular, future-proof solutions that are aesthetically clean and technically robust — from premium switches to complete electrical distribution systems. All products are BIS/CE compliant and backed by pan-India service.",
    ],
    highlights: [
      { icon: "🏢", title: "Commercial & Institutional", desc: "Standard in offices, hotels, hospitals, and data centres." },
      { icon: "🔒", title: "BIS/CE Certified", desc: "Full compliance with Indian and European safety norms." },
      { icon: "🧩", title: "Modular Architecture", desc: "Switchgear and devices that scale cleanly across large projects." },
      { icon: "🛡️", title: "2-Year Warranty", desc: "Manufacturer warranty on switchgear, MCBs, and RCCBs." },
    ],
    faqs: [
      { q: "Is Legrand suitable for industrial plants?", a: "Yes. Legrand switchgear and MCBs are widely used in industrial control panels and distribution boards." },
      { q: "Do you offer Legrand MCBs in bulk?", a: "Yes. All MCB ratings, poles, and breaking capacities are available with project pricing." },
      { q: "Legrand vs Havells for switchgear?", a: "Legrand for premium commercial and institutional projects; Havells for broad industrial and residential coverage. Both are ISI/BIS compliant." },
    ],
  },
  {
    slug: "esab",
    name: "ESAB",
    displayName: "ESAB",
    tagline: "Shaping the world of welding",
    origin: "Sweden",
    founded: 1904,
    industry: "Welding & Cutting",
    accent: "#E30613",
    keywords: ["esab"],
    categories: ["Welding"],
    description: [
      "ESAB is a global leader in welding and cutting equipment — founded in 1904 in Sweden. The brand's range spans welding machines, electrodes, MIG wire, TIG rods, gas regulators, and automated cutting systems, and is specified across shipbuilding, structural fabrication, oil & gas, and heavy engineering.",
      "ESAB is particularly known for its consumables — electrodes and wires that consistently deliver clean arcs and low spatter. For high-volume fabrication shops, ESAB's consumable range offers predictable costs and repeatable weld quality.",
    ],
    highlights: [
      { icon: "🔥", title: "Welding Specialist", desc: "120+ years focused solely on welding and cutting technology." },
      { icon: "📦", title: "Consumables Leader", desc: "Electrodes, MIG wire, TIG rods — consistent quality across every batch." },
      { icon: "🏗️", title: "Heavy-Industry Ready", desc: "Specified across structural, shipbuilding, and oil & gas fabrication." },
      { icon: "🛡️", title: "1–2 Year Warranty", desc: "Manufacturer warranty on welding machines and power sources." },
    ],
    faqs: [
      { q: "Is ESAB welding rod good for structural welding?", a: "Yes. ESAB's OK range of electrodes (like OK 46.00) is used extensively for structural steel fabrication." },
      { q: "Do you stock ESAB electrodes in bulk?", a: "Yes. Electrodes and MIG wire are available in 5kg, 15kg, and project-sized packs with bulk pricing." },
      { q: "Does ESAB offer welding machines too?", a: "Yes. ESAB manufactures a full range of MMA, MIG, and TIG welding machines — from 200A portable units to heavy industrial power sources." },
    ],
  },
  {
    slug: "lincoln",
    name: "Lincoln Electric",
    displayName: "Lincoln",
    tagline: "The welding experts",
    origin: "USA",
    founded: 1895,
    industry: "Welding Equipment & Consumables",
    accent: "#DA291C",
    keywords: ["lincoln"],
    categories: ["Welding"],
    description: [
      "Lincoln Electric is an American welding specialist — founded in 1895 in Cleveland, Ohio — and one of the world's largest manufacturers of welding equipment and consumables. The brand's Invertec and Power MIG ranges are benchmarks for inverter-based welding machines, while its MIG wire and electrodes are specified in the most demanding fabrication environments.",
      "Lincoln's inverter technology delivers stable arcs, low power consumption, and excellent duty cycles — critical for continuous production welding. In India, Lincoln is favoured by fabrication shops, structural steel fabricators, and heavy engineering plants.",
    ],
    highlights: [
      { icon: "⚡", title: "Inverter Technology", desc: "High-efficiency inverter machines with excellent duty cycles." },
      { icon: "🔥", title: "Stable Arc Performance", desc: "Consistent arc across the rated current range, ideal for production welding." },
      { icon: "🛡️", title: "Built for Production", desc: "Heavy-duty rated for continuous industrial production welding." },
      { icon: "🌐", title: "Global Standard", desc: "Lincoln machines and consumables specified worldwide." },
    ],
    faqs: [
      { q: "Lincoln vs ESAB — which welder should I choose?", a: "Both are premium. Lincoln's inverter machines offer excellent duty cycle and arc stability; ESAB is stronger in the consumables range. Many fabricators use Lincoln machines with ESAB consumables." },
      { q: "Do Lincoln welders work on Indian power supply?", a: "Yes. Lincoln's Indian models are rated for 220V–240V single-phase and 380V–415V three-phase supply." },
      { q: "Can I get Lincoln MIG wire in bulk?", a: "Yes. Lincoln MIG wire is available in 15kg spools and larger drums with project pricing." },
    ],
  },
  {
    slug: "hilti",
    name: "Hilti",
    displayName: "Hilti",
    tagline: "Making construction better",
    origin: "Liechtenstein",
    founded: 1941,
    industry: "Construction & Fastening",
    accent: "#D6001C",
    keywords: ["hilti"],
    categories: ["Fasteners", "Power Tools"],
    description: [
      "Hilti is a Liechtenstein-based specialist in professional construction tools, fastening systems, and measuring equipment — founded in 1941. The brand is known for premium anchors, drills, gas nailers, and demolition tools used in infrastructure, tunnelling, structural strengthening, and industrial construction.",
      "Hilti's epoxy anchors, mechanical anchors, and powder-actuated fastening systems are routinely specified for critical structural applications where failure is not an option. The brand's tool range is built for extreme duty cycles and comes with Hilti's premium service model.",
    ],
    highlights: [
      { icon: "🏗️", title: "Structural Fastening", desc: "Anchors and fasteners specified for critical structural applications." },
      { icon: "🧪", title: "Engineered Systems", desc: "Chemistries, tooling, and installation procedures validated as a system." },
      { icon: "🔧", title: "Premium Service", desc: "Hilti's service model ensures minimal tool downtime on site." },
      { icon: "🛡️", title: "Extended Warranty", desc: "Manufacturer warranty plus Hilti's premium service guarantee." },
    ],
    faqs: [
      { q: "Are Hilti anchors suitable for structural retrofitting?", a: "Yes. Hilti epoxy (HIT-RE) and mechanical anchors are widely used for structural strengthening, base plates, and critical connections." },
      { q: "Do Hilti tools come with service support?", a: "Yes. Hilti's service network and our support team coordinate tool service and warranty claims." },
      { q: "Is Hilti worth the premium over local brands?", a: "For critical structural work and continuous heavy-duty applications — yes. Hilti's system approach and reliability reduce site rework and delays." },
    ],
  },
  {
    slug: "milwaukee",
    name: "Milwaukee",
    displayName: "Milwaukee",
    tagline: "Nothing but heavy-duty",
    origin: "USA",
    founded: 1924,
    industry: "Cordless Power Tools",
    accent: "#DB0011",
    keywords: ["milwaukee"],
    categories: ["Power Tools"],
    description: [
      "Milwaukee Tool is an American manufacturer of heavy-duty cordless power tools — founded in 1924 and now a flagship brand of Techtronic Industries. Milwaukee's M18 and M12 FUEL ranges are industry benchmarks for cordless performance, with brushless motors and advanced electronics that rival corded tools in many applications.",
      "Milwaukee is favoured by trades that push tools to their limits — electricians, plumbers, HVAC technicians, and industrial maintenance teams. The M18 platform covers 200+ tools and is one of the widest cordless systems in the world.",
    ],
    highlights: [
      { icon: "🔋", title: "M18 & M12 Platforms", desc: "Over 200 cordless tools on shared battery platforms." },
      { icon: "⚙️", title: "FUEL Brushless", desc: "Milwaukee's FUEL range delivers corded-tool performance on battery." },
      { icon: "💪", title: "Heavy-Duty Rated", desc: "Built for continuous use in electrical, plumbing, and industrial MRO." },
      { icon: "🛡️", title: "5-Year Warranty", desc: "Extended manufacturer warranty on cordless tool bodies." },
    ],
    faqs: [
      { q: "Is Milwaukee available in India?", a: "Yes. Milwaukee's M18 and M12 ranges are available with authorised distributors and we source directly from them." },
      { q: "Milwaukee vs DeWalt — which is better?", a: "Both are premium. Milwaukee is stronger in electrical and plumbing trades; DeWalt is stronger in construction and heavy fabrication. Many contractors use both." },
      { q: "Do Milwaukee batteries come with warranty?", a: "Yes. Milwaukee batteries carry a 3-year manufacturer warranty on top of the tool body warranty." },
    ],
  },
  {
    slug: "abb",
    name: "ABB",
    displayName: "ABB",
    tagline: "Let's write the future",
    origin: "Switzerland / Sweden",
    founded: 1988,
    industry: "Electrification & Automation",
    accent: "#FF000F",
    keywords: ["abb"],
    categories: ["Electrical", "Material Handling"],
    description: [
      "ABB is a Swiss-Swedish multinational — formed in 1988 by the merger of ASEA and BBC Brown Boveri — and a global leader in electrification, robotics, and industrial automation. In India, ABB is specified for motors, drives, switchgear, transformers, and industrial automation systems across virtually every process industry.",
      "ABB's IE3 and IE4 motors, variable frequency drives, and switchgear are staples in cement, steel, pulp & paper, and process plants. The brand's commitment to energy efficiency directly translates into lower plant operating costs — a critical consideration for industrial buyers.",
    ],
    highlights: [
      { icon: "⚡", title: "IE3/IE4 Motors", desc: "Energy-efficient motors that reduce plant power bills and carbon footprint." },
      { icon: "🤖", title: "Automation Ready", desc: "Drives, PLCs, and control systems for process industries." },
      { icon: "🏭", title: "Process Industry Standard", desc: "Specified across cement, steel, pulp & paper, and petrochemical plants." },
      { icon: "🛡️", title: "2-Year Warranty", desc: "Manufacturer warranty on motors and switchgear." },
    ],
    faqs: [
      { q: "Does ABB offer energy-efficient motors for plants?", a: "Yes. ABB's IE3 and IE4 motors are designed for high energy efficiency — reducing plant power consumption and meeting BEE compliance." },
      { q: "Can I get ABB drives and VFDs?", a: "Yes. ABB variable frequency drives from 0.75kW to multi-MW are available with project pricing." },
      { q: "Is ABB suitable for hazardous environments?", a: "Yes. ABB offers flameproof and explosion-proof variants for petrochemical and hazardous-area applications." },
    ],
  },
  {
    slug: "schneider",
    name: "Schneider Electric",
    displayName: "Schneider",
    tagline: "Life is on",
    origin: "France",
    founded: 1836,
    industry: "Energy Management & Automation",
    accent: "#3DCD58",
    keywords: ["schneider"],
    categories: ["Electrical"],
    description: [
      "Schneider Electric is a French multinational — founded in 1836 — specialising in energy management and industrial automation. The brand's Acti9 range of MCBs, RCCBs, distribution boards, and switchgear is a global benchmark for reliability, and Schneider is specified across data centres, hospitals, and process industries.",
      "For B2B buyers, Schneider offers one of the most modular and future-proof electrical distribution systems — clean integration across LV switchboards, metering, and building management. All products are BIS/CE compliant with pan-India service.",
    ],
    highlights: [
      { icon: "⚡", title: "Acti9 Range", desc: "MCBs, RCCBs, and distribution boards with clean modular architecture." },
      { icon: "🏢", title: "Critical Infrastructure", desc: "Standard in data centres, hospitals, airports, and process industries." },
      { icon: "🔒", title: "BIS/CE Certified", desc: "Full Indian and European safety compliance across the range." },
      { icon: "🛡️", title: "2-Year Warranty", desc: "Manufacturer warranty on switchgear and protection devices." },
    ],
    faqs: [
      { q: "Is Schneider suitable for industrial panels?", a: "Yes. Schneider Acti9 and TeSys ranges are widely used in industrial control panels and distribution boards." },
      { q: "Do you stock Schneider RCCBs in bulk?", a: "Yes. All poles, ratings, and sensitivities are available with project pricing." },
      { q: "Schneider vs ABB for switchgear?", a: "Both are premium. Schneider is stronger in LV distribution and buildings; ABB is stronger in drives and heavy automation. Many plants use both." },
    ],
  },
  {
    slug: "kirloskar",
    name: "Kirloskar",
    displayName: "Kirloskar",
    tagline: "Engineering a better tomorrow",
    origin: "India",
    founded: 1888,
    industry: "Pumps, Engines & Fluid Handling",
    accent: "#003C71",
    keywords: ["kirloskar"],
    categories: ["Plumbing", "Electrical"],
    description: [
      "Kirloskar is one of India's oldest and most trusted engineering brands — founded in 1888 in Kirloskarwadi, Maharashtra. The company's pumps, engines, and fluid-handling systems are staple equipment across Indian agriculture, industry, and infrastructure. Kirloskar's monoblock and submersible pumps are particularly widespread in construction, water treatment, and manufacturing plants.",
      "For B2B buyers, Kirloskar offers a wide range of pumps — centrifugal, submersible, monoblock, and process — with a nationwide service network that ensures minimal downtime. The brand's reliability and after-sales support make it the default choice for Indian industry and MSMEs alike.",
    ],
    highlights: [
      { icon: "💧", title: "Full Pump Range", desc: "Monoblock, submersible, centrifugal, and process pumps for every application." },
      { icon: "🇮🇳", title: "Indian Heritage", desc: "135+ years of engineering, manufacturing, and service in India." },
      { icon: "🔧", title: "Nationwide Service", desc: "Wide service network ensures minimal pump downtime." },
      { icon: "🛡️", title: "1-Year Warranty", desc: "Manufacturer warranty on pumps and motors." },
    ],
    faqs: [
      { q: "Which Kirloskar pump is best for a small factory?", a: "A Kirloskar monoblock pump (0.5HP to 5HP) is ideal for small factories, workshops, and building water supply. For borewells, submersible pumps are recommended." },
      { q: "Do you stock Kirloskar pumps in bulk?", a: "Yes. Bulk pump orders for multi-location projects or contractors are supported with project pricing." },
      { q: "What about Kirloskar pump service?", a: "Kirloskar has a nationwide service network. Our support team coordinates warranty and out-of-warranty service on your behalf." },
    ],
  },
];

/* ─── Lookups ──────────────────────────────────────────────── */

export function getBrandBySlug(slug) {
  return BRANDS.find((b) => b.slug === slug);
}

export function getBrandByName(name) {
  const lower = String(name || "").toLowerCase();
  return BRANDS.find(
    (b) => b.name.toLowerCase() === lower || b.displayName.toLowerCase() === lower
  );
}

/**
 * Returns every product whose name contains one of the brand's keywords.
 * Case-insensitive substring match — reliable enough for the current
 * catalogue, and doesn't require a dedicated brand field on each product.
 */
export function getProductsByBrand(brand) {
  if (!brand) return [];
  return ALL_PRODUCTS.filter((p) =>
    brand.keywords.some((k) => p.name.toLowerCase().includes(k))
  );
}

export function slugifyBrand(name) {
  return String(name)
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}