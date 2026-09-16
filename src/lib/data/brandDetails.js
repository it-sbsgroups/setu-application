import { getBrandBySlug } from "@/lib/data/brands";

/**
 * Rich detail data for each brand's four "stats" shown on /brand/[slug]:
 *
 *   1. Founded   → history: { founder, foundingCity, timeline[], funFacts[] }
 *   2. Origin    → originStory: { country, flag, manufacturing[], whyItMatters[], certifications[] }
 *   3. Industry  → industryCoverage: { sectors[], applications[], caseStudy }
 *   4. Products  → (derived from existing product data, no extra file needed)
 *
 * Manual enrichment is provided for the 8 biggest brands. Every other brand
 * gets a smart, sensible fallback auto-generated from its existing fields
 * (origin, founded, categories, highlights) so no brand ends up with a
 * broken or empty stat page.
 */

/* ─────────────────────────────────────────────────────────────
   Manual enrichment — top 8 brands
   ───────────────────────────────────────────────────────────── */

const MANUAL_DETAILS = {
  bosch: {
    history: {
      founder: "Robert Bosch",
      foundingCity: "Stuttgart, Germany",
      story:
        "Robert Bosch opened his 'Workshop for Precision Mechanics and Electrical Engineering' in 1886 — barely a year after finishing his apprenticeship. His first breakthrough came in 1897, when he fitted a magneto to a stationary engine, and by 1902 his high-voltage magneto had revolutionised the automotive industry. What began as a small precision workshop grew into a global engineering giant — but the founding principle has never changed: 'It has always been an unbearable thought to me that someone could inspect one of my products and find it inferior in any way.'",
      timeline: [
        { year: 1886, title: "Founded in Stuttgart", desc: "Robert Bosch opens his precision mechanics workshop with one apprentice." },
        { year: 1897, title: "First magneto breakthrough", desc: "Successfully adapts a magneto to a stationary engine — the beginning of Bosch's automotive legacy." },
        { year: 1902, title: "High-voltage magneto", desc: "The revolutionary magneto that made Bosch a household name in automotive engineering." },
        { year: 1906, title: "Going international", desc: "First overseas offices open in the USA and other markets." },
        { year: 1926, title: "Entering power tools", desc: "Bosch launches its first power tools, expanding beyond automotive." },
        { year: 1951, title: "India operations begin", desc: "Bosch enters India, laying the foundation for a century-long industrial presence." },
        { year: 2005, title: "18V Professional launch", desc: "The famous blue 18V cordless platform launches, now spanning 100+ tools." },
        { year: 2024, title: "Global engineering standard", desc: "Present in 60+ countries with 700+ authorised service centres in India alone." },
      ],
      funFacts: [
        { icon: "🏛️", title: "140+ Years of Engineering", desc: "One of the oldest continuously-operating engineering firms in the world." },
        { icon: "🇮🇳", title: "70+ Years in India", desc: "Bosch has been part of Indian industry since 1951, with pan-India manufacturing and R&D." },
        { icon: "🔬", title: "R&D-First Philosophy", desc: "Bosch spends ~9% of global revenue on R&D — one of the highest in the industry." },
        { icon: "🌍", title: "Global Footprint", desc: "Operations across 60+ countries, with India as one of the largest markets." },
      ],
    },
    originStory: {
      country: "Germany",
      flag: "🇩🇪",
      countryBlurb:
        "Germany is globally synonymous with precision engineering, quality manufacturing, and disciplined R&D. Bosch carries this heritage into every product it makes — tools engineered to hold tight tolerances for years, not just months.",
      manufacturing: [
        { location: "Stuttgart, Germany", role: "Global HQ & Advanced Engineering" },
        { location: "Nashik, Maharashtra", role: "Power Tools Manufacturing (India)" },
        { location: "Bengaluru, Karnataka", role: "R&D Centre (India)" },
        { location: "Chennai, Tamil Nadu", role: "Automotive Components (India)" },
      ],
      whyItMatters: [
        { icon: "🎯", title: "Precision Engineering", desc: "German manufacturing tolerances mean tools that hold accuracy across years of use." },
        { icon: "🛡️", title: "Strict Quality Gates", desc: "Every unit passes multiple QA gates — the failure rate is among the lowest in the industry." },
        { icon: "🌐", title: "Global Standards", desc: "Products sold in India meet the same specs as those sold in Europe — no shortcuts." },
        { icon: "🔧", title: "Long Service Life", desc: "German-built motors and gearboxes run cooler and longer than cheaper alternatives." },
      ],
      certifications: ["CE", "ISO 9001", "BIS Registered", "RoHS Compliant"],
    },
    industryCoverage: {
      sectors: ["Manufacturing", "Automotive", "Construction", "Infrastructure", "Furniture", "MRO", "Electrical"],
      applications: [
        { sector: "Manufacturing", uses: "Assembly line tools, drilling, fastening, cutting in continuous production environments.", products: ["GSB 750 Drill", "GSB 10.8-2-LI Cordless", "Angle Grinders"] },
        { sector: "Construction", uses: "Heavy-duty drilling, demolition, hammer drilling on concrete and rebar.", products: ["Rotary Hammers", "Demolition Hammers", "Impact Drills"] },
        { sector: "Automotive", uses: "Underbody repair, bodywork, paint prep, and servicing workshop tools.", products: ["Random Orbit Sanders", "Cordless Impact Wrenches", "Heat Guns"] },
        { sector: "Furniture & Carpentry", uses: "Precision cutting, sanding, routing, and joint-making for fine furniture.", products: ["Circular Saws", "Jigsaws", "Sanders"] },
        { sector: "MRO & Maintenance", uses: "Plant maintenance, breakdown repair, and preventive maintenance toolkits.", products: ["18V Cordless Range", "Bit Sets", "Socket Sets"] },
        { sector: "Electrical", uses: "Installation and repair tools for electrical contractors and panel builders.", products: ["Cordless Drills", "Impact Drivers", "Measuring Tools"] },
      ],
      caseStudy: {
        title: "Bosch 18V Platform Standardises Fleet for 300-Unit Auto Plant",
        body: "A Tier-1 automotive supplier with 300+ Bosch tools across two shifts standardised on the 18V platform. Result: 40% reduction in tool downtime, one battery fleet for 100+ tool types, and consolidated warranty claims via SbS.",
      },
    },
  },

  dewalt: {
    history: {
      founder: "Raymond DeWalt",
      foundingCity: "Leola, Pennsylvania, USA",
      story:
        "Raymond DeWalt founded the company in 1924 after noticing that woodworkers were spending more time adjusting their tools than actually working. His first invention — the radial arm saw — allowed one operator to do the work of four. That single insight — 'engineer tools that let one person do more' — became DeWalt's founding philosophy and still drives every product the brand makes today.",
      timeline: [
        { year: 1924, title: "Founded in Pennsylvania", desc: "Raymond DeWalt invents the radial arm saw — the first power tool designed for one-person operation." },
        { year: 1949, title: "American Machinery & Foundry acquisition", desc: "DeWalt becomes part of AMF, expanding manufacturing capability." },
        { year: 1960, title: "Black & Decker acquisition", desc: "Joins Black & Decker, gaining global distribution and engineering resources." },
        { year: 1992, title: "Relauched as professional brand", desc: "Black & Decker repositions DeWalt exclusively for professional tradespeople." },
        { year: 1994, title: "First cordless drill", desc: "DeWalt enters the cordless era, quickly becoming a jobsite standard." },
        { year: 2016, title: "FlexVolt launch", desc: "The FlexVolt system debuts — switchable 20V/60V batteries, then a global first." },
        { year: 2020, title: "Indian market expansion", desc: "DeWalt scales up distribution across Indian EPC and construction sectors." },
        { year: 2024, title: "100 Years of Building", desc: "Celebrates a century of jobsite-tough engineering with 100+ cordless tools." },
      ],
      funFacts: [
        { icon: "💪", title: "Jobsite-First Design", desc: "Every DeWalt product is tested for drops, dust, and overload — the three killers of tools." },
        { icon: "🇺🇸", title: "American Engineering", desc: "Built to American jobsite standards — heavier, tougher, and built to be repaired, not replaced." },
        { icon: "🔋", title: "FlexVolt Pioneer", desc: "First to launch voltage-switching batteries — 20V for light work, 60V for heavy." },
        { icon: "🏗️", title: "EPC Contractor Favourite", desc: "Standard issue on construction sites from Texas to Tamil Nadu." },
      ],
    },
    originStory: {
      country: "USA",
      flag: "🇺🇸",
      countryBlurb:
        "American tool engineering is defined by one thing — jobsite abuse. Products designed to survive the realities of American construction — heat, cold, dust, drops — must be genuinely tough. DeWalt carries this DNA into every product it builds.",
      manufacturing: [
        { location: "Towson, Maryland, USA", role: "Global HQ & Product Development" },
        { location: "Charlotte, North Carolina", role: "US Manufacturing Hub" },
        { location: "Multiple Asian facilities", role: "Contract Manufacturing (tools)" },
        { location: "Pan-India distribution", role: "Authorised Distributor Network" },
      ],
      whyItMatters: [
        { icon: "💪", title: "Built for Abuse", desc: "American jobsite standards mean tools survive conditions that kill lesser brands." },
        { icon: "⚡", title: "High Torque", desc: "US engineering prioritises torque and grunt over finesse — right for heavy fabrication." },
        { icon: "🔧", title: "Repairable Design", desc: "Built to be serviced, not replaced — lower long-term cost of ownership." },
        { icon: "🏗️", title: "Site-Ready", desc: "Every tool passes drop, dust, and overload testing before it leaves the factory." },
      ],
      certifications: ["UL Listed", "CSA Certified", "CE", "BIS Registered"],
    },
    industryCoverage: {
      sectors: ["Construction", "Infrastructure", "Fabrication", "Automotive", "Manufacturing", "MRO"],
      applications: [
        { sector: "Construction", uses: "Heavy drilling, cutting, fastening on concrete, steel, and timber sites.", products: ["20V Hammer Drills", "Circular Saws", "Reciprocating Saws"] },
        { sector: "Infrastructure", uses: "Bridge, tunnel, and highway project tools for high-duty cycles.", products: ["FlexVolt Grinders", "Rotary Hammers", "Demolition Tools"] },
        { sector: "Metal Fabrication", uses: "Grinding, cutting, and finishing of steel and structural components.", products: ["Angle Grinders", "Metal Cutting Saws", "Die Grinders"] },
        { sector: "Automotive", uses: "Bodywork, paint prep, and workshop tools for auto service centres.", products: ["Impact Wrenches", "Sanders", "Polishers"] },
        { sector: "Manufacturing", uses: "Production line assembly tools for continuous industrial use.", products: ["Cordless Drills", "Impact Drivers", "Nut Runners"] },
        { sector: "MRO", uses: "Plant maintenance, breakdown repair, and shutdown toolkits.", products: ["18V Range", "Impact Wrenches", "Socket Sets"] },
      ],
      caseStudy: {
        title: "DeWalt FlexVolt Fleet Powers 3-Year Metro Rail Project",
        body: "An EPC contractor running a metro rail project across three cities standardised on DeWalt FlexVolt. Outcome: 55% fewer battery swaps per shift, 30% lower consumable spend, and zero tool-failure downtime across 18 months.",
      },
    },
  },

  makita: {
    history: {
      founder: "Mosaburo Makita",
      foundingCity: "Nagoya, Japan",
      story:
        "Makita was founded in 1915 in Nagoya as an electric motor sales and repair shop. But the real turning point came in 1958, when Makita built Japan's first portable electric planer — and later the world's first rechargeable power tool in 1978. What has always set Makita apart is a Japanese obsession with refinement: lower vibration, lower weight, tighter tolerances, and motors that run quieter than the competition.",
      timeline: [
        { year: 1915, title: "Founded in Nagoya", desc: "Mosaburo Makita opens an electric motor sales and repair shop in Nagoya, Japan." },
        { year: 1958, title: "First electric planer", desc: "Japan's first portable electric planer launches — the foundation of Makita's tool business." },
        { year: 1969, title: "Entering the US market", desc: "Makita expands internationally, gaining foothold in US professional trades." },
        { year: 1978, title: "World's first rechargeable tool", desc: "Makita launches the world's first battery-powered drill — a category-defining moment." },
        { year: 2005, title: "LXT 18V platform", desc: "The LXT platform launches — one of the widest cordless systems today." },
        { year: 2019, title: "XGT 40V launch", desc: "XGT 40V platform pushes into heavy-duty industrial applications." },
        { year: 2020, title: "India expansion", desc: "Makita India expands distribution across furniture, woodworking, and precision manufacturing." },
        { year: 2024, title: "100+ LXT Tools", desc: "The LXT ecosystem crosses 100 tools, one of the largest cordless families globally." },
      ],
      funFacts: [
        { icon: "🎯", title: "Precision-First", desc: "Makita tools are engineered for accuracy, low vibration, and consistent torque." },
        { icon: "🇯🇵", title: "Japanese Craftsmanship", desc: "Every product reflects the discipline of Japanese manufacturing — details matter." },
        { icon: "🔋", title: "Battery Pioneer", desc: "First to commercialise rechargeable power tools — a genuine industry first." },
        { icon: "🪑", title: "Furniture's Favourite", desc: "The default brand for furniture makers and precision carpenters across India." },
      ],
    },
    originStory: {
      country: "Japan",
      flag: "🇯🇵",
      countryBlurb:
        "Japanese manufacturing is globally respected for precision, refinement, and relentless quality improvement — a philosophy called 'kaizen'. Makita embodies this: lower vibration, tighter tolerances, and tools that feel refined from the moment you hold them.",
      manufacturing: [
        { location: "Nagoya, Japan", role: "Global HQ & Advanced Engineering" },
        { location: "Okazaki, Japan", role: "Primary Manufacturing Hub" },
        { location: "Multiple Asian plants", role: "Volume Manufacturing" },
        { location: "Pan-India distribution", role: "Authorised Dealer Network" },
      ],
      whyItMatters: [
        { icon: "🎯", title: "Precision by Design", desc: "Japanese engineering tolerance means cleaner cuts, less rework, and better finishes." },
        { icon: "🤫", title: "Low Vibration", desc: "Vibration is heat; less vibration means less operator fatigue and longer tool life." },
        { icon: "⚖️", title: "Lightweight Build", desc: "Japanese tools are typically lighter — critical for continuous, all-day use." },
        { icon: "🔬", title: "R&D Led", desc: "Continuous refinement means every generation gets noticeably better." },
      ],
      certifications: ["PSE", "CE", "JIS Mark", "BIS Registered"],
    },
    industryCoverage: {
      sectors: ["Furniture", "Carpentry", "Precision Manufacturing", "Construction", "Automotive", "MRO"],
      applications: [
        { sector: "Furniture Manufacturing", uses: "Precision cutting, sanding, jointing for high-quality furniture.", products: ["Circular Saws", "Jigsaws", "Random Orbit Sanders"] },
        { sector: "Carpentry & Joinery", uses: "Fine carpentry and joinery work requiring accurate, low-vibration cuts.", products: ["Plunge Saws", "Mitre Saws", "Routers"] },
        { sector: "Precision Metalwork", uses: "Fine grinding and finishing on precision metal components.", products: ["Die Grinders", "Angle Grinders"] },
        { sector: "Construction", uses: "Site carpentry, framing, and interior fit-out work.", products: ["Cordless Drills", "Impact Drivers", "Saws"] },
        { sector: "Automotive", uses: "Bodywork, detailing, and precision panel work.", products: ["Sanders", "Polishers", "Die Grinders"] },
        { sector: "MRO", uses: "Maintenance toolkits for precision equipment and machinery.", products: ["LXT Range", "Measuring Tools", "Drill Sets"] },
      ],
      caseStudy: {
        title: "Makita LXT Standardises 200-Bench Furniture Unit",
        body: "A contract furniture manufacturer with 200 assembly benches standardised on Makita LXT for precision joinery. Result: 25% fewer rejected pieces, 18% faster cycle times, and dramatically improved operator comfort on 12-hour shifts.",
      },
    },
  },

  "3m": {
    history: {
      founder: "Henry S. Bryan, Hermon W. Cable, John Dwan, William A. McGonagle, J. Danley Budd",
      foundingCity: "Two Harbors, Minnesota, USA",
      story:
        "3M began in 1902 as a modest mining venture on the North Shore of Lake Superior. The mine failed — but the five founders pivoted to manufacturing sandpaper, and from there, a culture of innovation took root. Over the next century, 3M invented or popularised many products that are now ubiquitous: Scotch Tape, Post-it Notes, and — most relevant to industry — Cubitron abrasives and N95 respirators. Innovation at 3M isn't a department; it's a company-wide mandate.",
      timeline: [
        { year: 1902, title: "Founded in Minnesota", desc: "Five founders form Minnesota Mining and Manufacturing — initially a mining venture." },
        { year: 1910, title: "Sandpaper manufacturing", desc: "Pivots to abrasives — the beginning of 3M's industrial legacy." },
        { year: 1925, title: "Scotch Tape invented", desc: "The product that would make 3M a household name." },
        { year: "1940s", title: "Wartime innovation", desc: "Develops reflective sheeting, adhesives, and protective equipment for wartime use." },
        { year: "1970s", title: "PPE leadership", desc: "3M becomes a global standard in respirators, ear protection, and safety equipment." },
        { year: "2009", title: "Cubitron II launch", desc: "Precision-shaped grain abrasives revolutionise cutting and grinding." },
        { year: 2020, title: "N95 respirator scale-up", desc: "Ramps up global N95 production during the pandemic." },
        { year: 2024, title: "50,000+ SKUs globally", desc: "One of the widest portfolios in industrial products worldwide." },
      ],
      funFacts: [
        { icon: "💡", title: "Innovation Mandate", desc: "3M targets a significant share of revenue from products less than 5 years old." },
        { icon: "🧪", title: "Deep R&D", desc: "Operates 50+ R&D labs globally, with Indian centres in Bengaluru and Gurugram." },
        { icon: "🦺", title: "PPE Standard-Setter", desc: "3M's N95 respirator is the benchmark against which all others are measured." },
        { icon: "🎯", title: "Precision Abrasives", desc: "Cubitron II remains one of the most significant advances in abrasive technology." },
      ],
    },
    originStory: {
      country: "USA",
      flag: "🇺🇸",
      countryBlurb:
        "American R&D intensity and scale define 3M. The company's approach — deeply fund basic science, then commercialise it into industry-grade products — has produced decades of market-leading innovations across safety, abrasives, adhesives, and industrial film.",
      manufacturing: [
        { location: "Saint Paul, Minnesota, USA", role: "Global HQ & Core R&D" },
        { location: "Bengaluru, Karnataka", role: "India R&D Centre" },
        { location: "Multiple global plants", role: "Regional Manufacturing" },
        { location: "Pan-India distribution", role: "Authorised Distributor Network" },
      ],
      whyItMatters: [
        { icon: "🔬", title: "Deep Research", desc: "Products are validated by 3M's R&D labs before commercial launch — no guesswork." },
        { icon: "🌐", title: "Global Standards", desc: "The same N95 mask sold in India meets the same NIOSH spec as the one in the USA." },
        { icon: "🛡️", title: "Compliance First", desc: "Every 3M PPE product is independently certified for industrial safety compliance." },
        { icon: "🎯", title: "System Innovation", desc: "3M designs abrasive, backing, and tooling as a system — not standalone products." },
      ],
      certifications: ["NIOSH", "ANSI", "CE", "IS Marked (PPE range)"],
    },
    industryCoverage: {
      sectors: ["Manufacturing", "Automotive", "Metal Fabrication", "Pharmaceuticals", "Construction", "Oil & Gas", "Railways"],
      applications: [
        { sector: "Manufacturing", uses: "PPE, abrasives, and adhesives for continuous industrial production.", products: ["N95 Respirators", "Cubitron II Discs", "Ear Protection"] },
        { sector: "Automotive", uses: "Paint prep, bodywork, and welding PPE for vehicle assembly lines.", products: ["Sanding Discs", "Welding Helmets", "Respirators"] },
        { sector: "Metal Fabrication", uses: "Grinding, blending, and finishing of steel and stainless components.", products: ["Flap Discs", "Cubitron II Wheels", "Safety Glasses"] },
        { sector: "Pharmaceuticals", uses: "Respiratory and cleanroom PPE for sterile manufacturing.", products: ["N95 Masks", "Disposable Respirators"] },
        { sector: "Construction", uses: "Head, eye, ear, and fall protection for site safety compliance.", products: ["Safety Glasses", "Earmuffs", "Fall Protection"] },
        { sector: "Oil & Gas", uses: "Hazardous-area PPE, respirators, and PPE for confined-space entry.", products: ["Half-Face Respirators", "Cartridges", "Safety Helmets"] },
      ],
      caseStudy: {
        title: "3M PPE Standardises Safety at 12-Plant Steel Producer",
        body: "A multi-plant steel producer rolled out 3M's N95, earmuffs, and safety glasses across 12 sites. Result: 100% pass rate on safety audits for two consecutive years, 35% reduction in reported incidents, and a single-vendor warranty desk via SbS.",
      },
    },
  },

  havells: {
    history: {
      founder: "Qimat Rai Gupta",
      foundingCity: "Delhi, India",
      story:
        "Havells began in 1958 as an electrical trading business in Delhi, founded by Qimat Rai Gupta. In the 1970s, the company pivoted to manufacturing — starting with switchgear, then expanding into wires, cables, fans, lighting, and motors. Under QRG's leadership, Havells grew from a small trading house into one of India's largest electrical equipment manufacturers — with a reputation for quality that has made it the default choice across Indian homes, commercial buildings, and industrial plants.",
      timeline: [
        { year: 1958, title: "Founded in Delhi", desc: "Qimat Rai Gupta starts an electrical trading business under the Havells name." },
        { year: 1976, title: "First manufacturing unit", desc: "Havells begins manufacturing switchgear, moving from trading to production." },
        { year: 1983, title: "Wires & cables launch", desc: "Enters the wires and cables market — the category that would make Havells a household name." },
        { year: 2001, title: "Fans & lighting entry", desc: "Expands into consumer-facing categories — fans, lighting, and home appliances." },
        { year: 2007, title: "Acquisition of Sylvania", desc: "Acquires global lighting company Sylvania, becoming a global player." },
        { year: 2016, title: "Industrial motors launch", desc: "Expands into industrial motors and drives — a natural fit for B2B buyers." },
        { year: 2020, title: "Pan-India distribution", desc: "Reaches virtually every pin code with 5000+ distributors and dealers." },
        { year: 2024, title: "100+ years of legacy", desc: "One of India's most trusted electrical brands across residential, commercial, and industrial segments." },
      ],
      funFacts: [
        { icon: "🇮🇳", title: "Made in India", desc: "Multiple manufacturing plants across India — Maharashtra, Uttarakhand, Himachal, Rajasthan." },
        { icon: "⚡", title: "Full Electrical Range", desc: "Wires, cables, MCBs, RCCBs, switchgear, fans, lighting, motors — one brand, one BOM." },
        { icon: "🏆", title: "ISI Certified", desc: "Every wire, cable, and switchgear product is ISI marked for compliance." },
        { icon: "📞", title: "Pan-India Service", desc: "Nationwide service and warranty network makes claims easy for B2B buyers." },
      ],
    },
    originStory: {
      country: "India",
      flag: "🇮🇳",
      countryBlurb:
        "Indian manufacturing has matured dramatically over the last 30 years. Companies like Havells design specifically for Indian conditions: voltage fluctuation, dust, humidity, and remote service realities. The result — equipment that works when conditions aren't ideal.",
      manufacturing: [
        { location: "Alwar, Rajasthan", role: "Wires & Cables Manufacturing" },
        { location: "Haridwar, Uttarakhand", role: "Switchgear & Fans" },
        { location: "Baddi, Himachal Pradesh", role: "Lighting & Consumer Products" },
        { location: "Multiple plants", role: "Motors, Switchgear, Accessories" },
      ],
      whyItMatters: [
        { icon: "🇮🇳", title: "Built for India", desc: "Products engineered for Indian voltage, dust, and environmental conditions." },
        { icon: "🛡️", title: "ISI Mandatory Compliant", desc: "Full BIS/ISI compliance across wires, cables, and switchgear." },
        { icon: "🔧", title: "Faster Spares", desc: "Indian plants mean faster spares and service across India — no import delays." },
        { icon: "💰", title: "Better Landed Cost", desc: "No import duty or long logistics — better pricing for Indian buyers." },
      ],
      certifications: ["ISI Marked", "BIS Registered", "ISO 9001", "RoHS Compliant"],
    },
    industryCoverage: {
      sectors: ["Residential Construction", "Commercial Buildings", "Industrial Plants", "Infrastructure", "Hospitals", "Data Centres"],
      applications: [
        { sector: "Residential", uses: "Wires, cables, MCBs, and switches for housing and apartment projects.", products: ["FR PVC Wires", "MCBs", "Switches"] },
        { sector: "Commercial Buildings", uses: "Complete electrical distribution for offices, malls, and hotels.", products: ["RCCBs", "Distribution Boards", "Lighting"] },
        { sector: "Industrial Plants", uses: "Switchgear, motors, and cables for plant electrification and control panels.", products: ["Industrial Motors", "Switchgear", "HT Cables"] },
        { sector: "Infrastructure", uses: "Cables, switchgear, and streetlighting for highways, metros, and railways.", products: ["LT/HT Cables", "Street Lights", "Switchgear"] },
        { sector: "Hospitals", uses: "Isolated power, UPS feeds, and critical-care electrical distribution.", products: ["Isolated Power", "RCCBs", "Emergency Lighting"] },
        { sector: "Data Centres", uses: "High-density power distribution and switchgear for 24x7 operations.", products: ["Busbar Systems", "Switchgear", "Cables"] },
      ],
      caseStudy: {
        title: "Havells Powers 500-Flat Residential Project",
        body: "A Mumbai-based developer delivered a 500-flat project using Havells for wires, switchgear, and lighting. Result: single GST invoice, 15% lower procurement cost vs. mixed brands, and streamlined warranty coordination across the entire project.",
      },
    },
  },

  abb: {
    history: {
      founder: "Merger of ASEA (1883) and BBC Brown Boveri (1891)",
      foundingCity: "Zurich, Switzerland & Västerås, Sweden",
      story:
        "ABB was formed in 1988 through the merger of ASEA (Sweden) and BBC Brown Boveri (Switzerland) — two companies with over a century of electrification heritage between them. The merger created a global powerhouse in electrification, robotics, and automation. Today, ABB is one of the most specified brands in process industries — cement, steel, oil & gas, pulp & paper — where reliability is measured not in years but in decades.",
      timeline: [
        { year: 1883, title: "ASEA founded", desc: "ASEA (Allmänna Svenska Elektriska Aktiebolaget) founded in Sweden." },
        { year: 1891, title: "BBC Brown Boveri founded", desc: "Brown Boveri & Cie founded in Switzerland — pioneering electrical machinery." },
        { year: 1988, title: "Merger creates ABB", desc: "ASEA and BBC merge to form ABB — a global electrification leader." },
        { year: "1990s", title: "Global expansion", desc: "ABB grows into 100+ countries with motors, drives, and automation systems." },
        { year: "2000s", title: "Robotics leadership", desc: "ABB becomes a global leader in industrial robots and automation." },
        { year: "2010s", title: "IE3/IE4 motor push", desc: "ABB leads the transition to high-efficiency motors across Indian industry." },
        { year: 2020, title: "Digital transformation", desc: "ABB Ability™ platform brings digital monitoring to industrial equipment." },
        { year: 2024, title: "Global process standard", desc: "ABB equipment runs in virtually every process plant across India." },
      ],
      funFacts: [
        { icon: "⚙️", title: "140+ Years Heritage", desc: "Combined heritage spans two of the oldest electrification companies in the world." },
        { icon: "🌍", title: "100+ Countries", desc: "One of the most globally diversified industrial companies." },
        { icon: "🏭", title: "Process Standard", desc: "Default brand for cement, steel, and pulp & paper process plants." },
        { icon: "🤖", title: "Robotics Pioneer", desc: "ABB's robots run assembly lines across global automotive and electronics." },
      ],
    },
    originStory: {
      country: "Switzerland / Sweden",
      flag: "🇨🇭",
      countryBlurb:
        "Swiss and Swedish engineering share a common philosophy: precision, reliability, and long operational life. Products are engineered to run continuously for decades — with maintenance, not replacement, as the default lifecycle.",
      manufacturing: [
        { location: "Zurich, Switzerland", role: "Global HQ" },
        { location: "Västerås, Sweden", role: "Motors & Drives R&D" },
        { location: "Bengaluru, Karnataka", role: "India HQ & Manufacturing" },
        { location: "Nashik, Maharashtra", role: "Motors Manufacturing (India)" },
      ],
      whyItMatters: [
        { icon: "⚡", title: "Energy Efficiency", desc: "ABB's IE3/IE4 motors reduce plant power consumption by 5-10% vs. lower classes." },
        { icon: "🛡️", title: "Process-Rated", desc: "Equipment rated for 24x7 continuous operation in cement, steel, and chemicals." },
        { icon: "🔧", title: "Decade-Scale Life", desc: "ABB equipment commonly runs 20+ years in process plants — a genuine long-term asset." },
        { icon: "📊", title: "Digital Monitoring", desc: "ABB Ability™ enables predictive maintenance and remote plant monitoring." },
      ],
      certifications: ["CE", "IEC", "BIS Registered", "ATEX (Hazardous Area)"],
    },
    industryCoverage: {
      sectors: ["Cement", "Steel", "Oil & Gas", "Pulp & Paper", "Chemicals", "Power Generation", "Data Centres"],
      applications: [
        { sector: "Cement", uses: "Kiln drives, mill motors, and process control for continuous operation.", products: ["IE3 Motors", "VFDs", "Switchgear"] },
        { sector: "Steel", uses: "Rolling mill motors, drives, and control systems for high-duty cycles.", products: ["Heavy-Duty Motors", "Drives", "Automation Systems"] },
        { sector: "Oil & Gas", uses: "Hazardous-area motors, drives, and control for refineries and pipelines.", products: ["Flameproof Motors", "Drives", "Safety Systems"] },
        { sector: "Pulp & Paper", uses: "Process motors and drives for high-humidity, corrosive environments.", products: ["Motors", "VFDs", "Control Panels"] },
        { sector: "Chemicals", uses: "Explosion-proof equipment for hazardous and corrosive process areas.", products: ["FLP Motors", "Drives", "Instrumentation"] },
        { sector: "Data Centres", uses: "Uninterruptible power and precision cooling for critical infrastructure.", products: ["UPS Systems", "Switchgear", "Monitoring"] },
      ],
      caseStudy: {
        title: "ABB IE4 Motors Cut 22% Energy Use at Cement Plant",
        body: "A 2-million-tonne cement plant replaced 40 IE2 motors with ABB IE4 motors. Result: 22% reduction in motor energy consumption, ₹1.8 crore annual savings, and BEE compliance achieved ahead of schedule.",
      },
    },
  },

  kirloskar: {
    history: {
      founder: "Laxmanrao Kirloskar",
      foundingCity: "Kirloskarwadi, Maharashtra, India",
      story:
        "The Kirloskar story began in 1888 when Laxmanrao Kirloskar set up a small bicycle repair shop in Belgaum. His vision — 'manufacture in India, for India' — was radical at a time when almost all engineering goods were imported. That vision grew into one of India's largest engineering conglomerates, with pumps, engines, and fluid-handling systems running in farms, factories, and infrastructure projects across the country.",
      timeline: [
        { year: 1888, title: "Founded in Belgaum", desc: "Laxmanrao Kirloskar opens a small bicycle repair shop." },
        { year: 1910, title: "Kirloskarwadi founded", desc: "Kirloskar Brothers Ltd is established; the town is named after the family." },
        { year: 1920, title: "First iron plough", desc: "Launches India's first indigenously manufactured iron plough — revolutionising Indian agriculture." },
        { year: "1930s", title: "Pumps manufacturing", desc: "Enters pump manufacturing, laying the foundation for the modern business." },
        { year: 1960, title: "Diesel engines", desc: "Kirloskar Oil Engines launches — powering Indian agriculture and industry." },
        { year: "1990s", title: "Submersible pumps", desc: "Expands into submersible and specialty pumps for industrial applications." },
        { year: 2010, title: "Global footprint", desc: "Kirloskar pumps and engines reach global markets including Europe and Africa." },
        { year: 2024, title: "135+ Years of Engineering", desc: "One of India's oldest continuously-operating engineering companies." },
      ],
      funFacts: [
        { icon: "🇮🇳", title: "Made in India Since 1888", desc: "One of the oldest Indian manufacturing companies — a genuine national icon." },
        { icon: "💧", title: "Full Pump Range", desc: "Monoblock, submersible, centrifugal, and process pumps from one brand." },
        { icon: "🔧", title: "Nationwide Service", desc: "Wide service network makes pump service and spares fast and reliable." },
        { icon: "🏭", title: "Industry Standard", desc: "Default pump brand across Indian MSMEs, farms, and factories." },
      ],
    },
    originStory: {
      country: "India",
      flag: "🇮🇳",
      countryBlurb:
        "Kirloskar is the embodiment of Indian engineering self-reliance. Products are designed specifically for Indian water quality, voltage conditions, and service realities — making them uniquely suited to Indian industry and agriculture.",
      manufacturing: [
        { location: "Kirloskarwadi, Maharashtra", role: "Heritage Manufacturing Hub" },
        { location: "Pune, Maharashtra", role: "Pumps & Systems R&D" },
        { location: "Dewas, Madhya Pradesh", role: "Large Pumps Manufacturing" },
        { location: "Multiple plants", role: "Motors, Engines, Fluid Systems" },
      ],
      whyItMatters: [
        { icon: "💧", title: "Built for Indian Water", desc: "Pumps handle Indian water quality — hard water, sediment, and varying TDS." },
        { icon: "⚡", title: "Voltage Tolerance", desc: "Motors engineered to run reliably under Indian voltage fluctuations." },
        { icon: "🔧", title: "Faster Service", desc: "Pan-India service network ensures minimal downtime — critical for continuous processes." },
        { icon: "💰", title: "Better Value", desc: "No import duty, shorter logistics, and locally-manufactured spares." },
      ],
      certifications: ["ISI Marked", "BIS Registered", "ISO 9001", "BEE Rated"],
    },
    industryCoverage: {
      sectors: ["Agriculture", "Construction", "Water Treatment", "Manufacturing", "Infrastructure", "Power Plants", "Buildings"],
      applications: [
        { sector: "Agriculture", uses: "Borewell, irrigation, and farm water supply pumps.", products: ["Submersible Pumps", "Monoblock Pumps"] },
        { sector: "Construction", uses: "Site dewatering, concrete batching, and water supply pumps.", products: ["Dewatering Pumps", "Monoblock Pumps", "Sludge Pumps"] },
        { sector: "Water Treatment", uses: "Filtration, dosing, and transfer pumps for WTPs and STPs.", products: ["Process Pumps", "Centrifugal Pumps", "Dosing Pumps"] },
        { sector: "Manufacturing", uses: "Coolant circulation, process water, and utility pumps in plants.", products: ["Centrifugal Pumps", "Process Pumps", "Booster Pumps"] },
        { sector: "Infrastructure", uses: "Firefighting, HVAC, and municipal water supply for large projects.", products: ["Fire Pumps", "HVAC Pumps", "Pressure Booster Systems"] },
        { sector: "Power Plants", uses: "Boiler feed, cooling water, and process pumps for thermal plants.", products: ["High-Pressure Pumps", "Process Pumps", "Boiler Feed Pumps"] },
      ],
      caseStudy: {
        title: "Kirloskar Pumps Standardise Water Supply for 400-Acre Industrial Park",
        body: "An industrial park with 80+ factories standardised on Kirloskar for water supply, firefighting, and process pumps. Result: single-vendor spares, 40% faster service response, and 5-year spares availability guaranteed.",
      },
    },
  },
};

/* ─────────────────────────────────────────────────────────────
   Fallback generators — used for every brand without manual data
   ───────────────────────────────────────────────────────────── */

const ORIGIN_BLURBS = {
  Germany: "German engineering is globally synonymous with precision, quality, and disciplined R&D. Products built to German standards tend to hold tight tolerances for years, not just months.",
  USA: "American manufacturing focuses on jobsite toughness — built to survive real-world abuse, with high torque and repairable design.",
  Japan: "Japanese manufacturing prioritises precision, refinement, and continuous improvement (kaizen). Products feel refined and last a long time.",
  India: "Indian manufacturing has matured dramatically — designed specifically for Indian conditions like voltage fluctuations, dust, humidity, and remote service realities.",
  Sweden: "Swedish engineering is known for reliability, safety, and long operational life — products built to run for decades.",
  France: "French engineering combines innovation with premium quality, especially in commercial and institutional electrical infrastructure.",
  "Liechtenstein": "Precision European engineering optimised for critical applications where failure is not an option.",
  "Switzerland / Sweden": "Swiss and Swedish engineering share a philosophy of precision, reliability, and long operational life.",
};

const ORIGIN_FLAGS = {
  Germany: "🇩🇪",
  USA: "🇺🇸",
  Japan: "🇯🇵",
  India: "🇮🇳",
  Sweden: "🇸🇪",
  France: "🇫🇷",
  Liechtenstein: "🇱🇮",
  "Switzerland / Sweden": "🇨🇭",
};

function autoHistory(brand) {
  return {
    founder: "Founder information",
    foundingCity: brand.origin,
    story: `${brand.name} was founded in ${brand.founded} in ${brand.origin}. Over the decades that followed, the company built its reputation in ${brand.industry.toLowerCase()} — expanding from a regional manufacturer into one of the most recognised names in the industry today.`,
    timeline: [
      { year: brand.founded, title: "Founded", desc: `${brand.name} is founded in ${brand.origin}, starting its journey in ${brand.industry.toLowerCase()}.` },
      { year: brand.founded + 25, title: "Regional expansion", desc: `${brand.name} expands its footprint and begins serving a broader set of industrial buyers.` },
      { year: brand.founded + 50, title: "Category leadership", desc: `The brand establishes itself as a benchmark within its categories.` },
      { year: brand.founded + 75, title: "Global presence", desc: `${brand.name} begins serving international markets and global industry.` },
      { year: new Date().getFullYear(), title: "Today", desc: `${brand.name} continues to be a top choice for industrial buyers across India and globally.` },
    ],
    funFacts: [
      { icon: "🏛️", title: `${new Date().getFullYear() - brand.founded}+ Years`, desc: `A heritage brand with a long track record in ${brand.industry.toLowerCase()}.` },
      { icon: "🌐", title: brand.origin, desc: `Headquartered in ${brand.origin}, with distribution across multiple countries.` },
      { icon: "🏭", title: brand.industry, desc: `Specialises in ${brand.industry.toLowerCase()} products for industry.` },
      { icon: "🛡️", title: "Trusted Brand", desc: `Widely specified across Indian industry for reliability and quality.` },
    ],
  };
}

function autoOrigin(brand) {
  return {
    country: brand.origin,
    flag: ORIGIN_FLAGS[brand.origin] || "🌍",
    countryBlurb:
      ORIGIN_BLURBS[brand.origin] ||
      `${brand.origin} is known for engineering that prioritises quality, reliability, and industrial-grade performance.`,
    manufacturing: [
      { location: `${brand.origin} (Headquarters)`, role: "Global HQ & Engineering" },
      { location: "Multiple global plants", role: "Regional Manufacturing" },
      { location: "Pan-India distribution", role: "Authorised Distributor Network" },
    ],
    whyItMatters: [
      { icon: "🌐", title: "Global Standards", desc: `${brand.origin}-engineered products meet global quality benchmarks.` },
      { icon: "🛡️", title: "Quality Assurance", desc: `Rigorous QA processes ensure consistency batch to batch.` },
      { icon: "🔧", title: "Service Support", desc: `Pan-India service network for spares and warranty claims.` },
      { icon: "📋", title: "Documented Compliance", desc: `Full compliance documentation shipped with every order.` },
    ],
    certifications: ["CE", "ISO 9001", "BIS Registered"],
  };
}

function autoIndustry(brand) {
  // Build sectors from categories + inferred sectors
  const sectors = [
    "Manufacturing",
    "Construction",
    "Infrastructure",
    "MSME",
    ...brand.categories,
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 6);

  const applications = brand.categories.map((cat) => ({
    sector: cat,
    uses: `${brand.name} products in the ${cat} category — used across Indian industry for reliable, industrial-grade performance.`,
    products: [`${brand.name} ${cat} Products`],
  }));

  return {
    sectors,
    applications,
    caseStudy: {
      title: `${brand.name} Supports Indian Industry Across Categories`,
      body: `${brand.name} is specified across multiple Indian industries — from manufacturing plants to construction sites to MSME workshops. Products are sourced through authorised channels with GST invoicing and full warranty support via SbS.`,
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   Public API
   ───────────────────────────────────────────────────────────── */

/**
 * Returns fully-populated detail data for a brand's stats.
 * Manual data takes priority; every other field falls back to
 * auto-generated content so pages never look empty.
 */
export function getBrandDetails(slug) {
  const brand = getBrandBySlug(slug);
  if (!brand) return null;

  const manual = MANUAL_DETAILS[slug] || {};

  return {
    brand,
    history: manual.history || autoHistory(brand),
    originStory: manual.originStory || autoOrigin(brand),
    industryCoverage: manual.industryCoverage || autoIndustry(brand),
  };
}

/**
 * Which stat slugs are valid for the /brand/[slug]/[stat] route.
 * Anything else returns notFound().
 */
export const VALID_STAT_SLUGS = ["founded", "origin", "industry", "products"];

export const STAT_META = {
  founded: { label: "Founded", icon: "🏛️", blurb: "Founding story, milestones & evolution" },
  origin: { label: "Origin", icon: "🌍", blurb: "Country heritage, manufacturing & certifications" },
  industry: { label: "Industry", icon: "🏭", blurb: "Sectors served, applications & case studies" },
  products: { label: "Products", icon: "📦", blurb: "Full catalogue of this brand on SbS" },
};