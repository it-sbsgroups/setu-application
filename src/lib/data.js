
// Centralized data - easy to learn, easy to edit
export const P = {
  drill:"1504328345606-18bbc8c9d7d1", grinder:"1572981779307-38b8cabb2407",
  tool3:"1586864387967-d02ef85d93e8", tool4:"1530124566582-a618bc2615dc",
  tool5:"1558618047-3c8c76ca7d13", tool6:"1581092918056-0c4c3acd3789",
  safety:"1581092160562-40aa08e78837", gloves:"1598300042247-d088f8ab3a91",
  helmet:"1620121692029-d088224ddc74", weld:"1558618666-fcd25c85cd64",
  mask:"1584515933487-779824d29309", shoe:"1542291026-7eec264c27ff",
  elec:"1565849904461-04a58ad377e0", light:"1524484485831-a92ffc0de03f"
};
export const thumb = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=75`;
export const wide = (id) => `https://images.unsplash.com/photo-${id}?w=1200&h=400&fit=crop&auto=format&q=75`;
let _pid = 0;
const pr = (name, price, orig, rating, reviews, img, badge) => ({ id: ++_pid, name, price, orig, rating, reviews, img, badge });
export const CATEGORIES = [
  {name:"Power Tools", icon:"\u26a1", subs:["Drills & Drivers","Angle Grinders","Circular Saws","Jigsaws","Sanders","Impact Wrenches","Rotary Hammers","Heat Guns"]},
  {name:"Hand Tools", icon:"\U0001f527", subs:["Spanners & Wrenches","Pliers","Hammers","Screwdrivers","Cutting Tools","Measuring Tools","Files & Rasps","Chisels"]},
  {name:"Safety & PPE", icon:"\U0001f9ba", subs:["Helmets & Headgear","Safety Gloves","Safety Shoes","Eye Protection","Ear Protection","Respiratory","High-Vis Clothing","Fall Protection"]},
  {name:"Electrical", icon:"\U0001f4a1", subs:["Wires & Cables","Switchgear","MCBs & MCCBs","Lighting","Motors","Transformers","Plugs & Sockets","Cable Management"]},
  {name:"Plumbing", icon:"\U0001f6b0", subs:["Pipes & Fittings","Valves","Water Pumps","Tanks","Taps & Faucets","Water Meters","Sealants","Thread Tape"]},
  {name:"Fasteners", icon:"\U0001f529", subs:["Bolts & Nuts","Screws","Anchors","Rivets","Washers","Nails","Studs","Threaded Rods"]},
  {name:"Abrasives", icon:"\U0001faa8", subs:["Grinding Wheels","Flap Discs","Sandpaper","Wire Brushes","Cutting Discs","Polishing Pads","Buffing Wheels","Diamond Blades"]},
  {name:"Welding", icon:"\U0001f525", subs:["Welding Machines","Welding Electrodes","MIG Wire","TIG Rods","Gas Regulators","Welding Helmets","Gloves","Clamps"]},
  {name:"Material Handling", icon:"\U0001f4e6", subs:["Trolleys & Carts","Pallets","Forklifts","Hoists & Cranes","Conveyors","Strapping","Packaging","Storage"]},
  {name:"IT & Office", icon:"\U0001f4bb", subs:["Computers","Printers","Networking","Cables & Accessories","Stationery","Furniture","Cleaning Supplies","Security Systems"]}
];
export const HERO_SLIDES = [
  {badge:"MEGA SALE", title:"Power Tools Mega Sale", sub:"Up to 40% off on top brands - Bosch, DeWalt, Makita", cta:"Shop Now", bg:"linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)", img:P.drill},
  {badge:"NEW STOCK", title:"Safety First, Always", sub:"Complete PPE solutions - helmets, gloves, safety shoes & more", cta:"Explore PPE", bg:"linear-gradient(135deg,#065F46 0%,#059669 100%)", img:P.safety},
  {badge:"HOT DEAL", title:"Electrical Solutions", sub:"Wires, switchgear, MCBs from Havells, Legrand & more", cta:"Buy Now", bg:"linear-gradient(135deg,#7C2D12 0%,#C2410C 100%)", img:P.elec},
  {badge:"LAUNCH", title:"New Arrivals: Welding Range", sub:"Professional welding machines starting at 4,999", cta:"View All", bg:"linear-gradient(135deg,#3730A3 0%,#4F46E5 100%)", img:P.weld}
];
const POWER = [ pr("Bosch GSB 750 Drill Machine 750W",3299,4999,4.5,2341,P.drill,"Best Seller"), pr("DeWalt DWE4120 Angle Grinder 4in",4799,6500,4.6,1876,P.grinder,"34% off"), pr("Makita HP1631K Rotary Hammer 710W",5999,8200,4.4,987,P.tool3), pr("Hitachi C7MFA Circular Saw 7.25in",7499,9999,4.3,654,P.tool4,"New"), pr("Stanley FME640 Random Orbit Sander",2199,3100,4.2,432,P.tool5), pr("Milwaukee M18 Impact Wrench 18V",12999,16500,4.7,1234,P.tool6,"Premium") ];
const SAFETY = [ pr("3M Peltor Earmuff H540A Hearing Protection",1299,1800,4.6,3421,P.safety,"Top Rated"), pr("Honeywell MillMax Safety Gloves Cut5",499,750,4.4,5678,P.gloves,"Pack of 12"), pr("JSP EVO3 Safety Helmet with Ratchet",799,1200,4.5,2109,P.helmet), pr("Karam PN 501 Full Body Harness",3499,5000,4.3,876,P.weld,"IS:3521"), pr("3M 1860 N95 Respirator Mask (Pack of 20)",1899,2500,4.7,8765,P.mask,"Best Seller"), pr("Mallcom GFSTR Steel Toe Safety Shoes",1799,2499,4.2,1543,P.shoe) ];
const ELECTRICAL = [ pr("Havells 2.5 sq mm FR PVC Wire 90m",1799,2200,4.5,4321,P.elec,"ISI Mark"), pr("Legrand 32A Double Pole MCB",349,499,4.6,2876,P.weld), pr("Philips 24W LED Panel Light Cool White",599,899,4.3,5432,P.light,"5yr Warranty"), pr("Schneider Acti9 4P 63A RCCB",2199,3100,4.5,987,P.tool5), pr("ABB 5.5kW 3-Phase Motor IE3",18999,24000,4.4,345,P.tool6,"IE3 Rated"), pr("Finolex 1.5 sq mm FRLS Cable 180m",2999,3800,4.6,2109,P.grinder,"Best Value") ];
const HAND = [ pr("Stanley 20oz Fiberglass Claw Hammer",549,799,4.5,6789,P.grinder,"Best Seller"), pr("Taparia 1081 Combination Plier Set of 3",899,1299,4.4,3456,P.tool4), pr("Gedore 19 Piece Spanner Set",3499,4999,4.6,1234,P.drill,"Premium"), pr("Stanley 25mm STS Tape Measure 5m",299,499,4.3,8765,P.tool3), pr("Bahco Adjustable Wrench 10in Chrome Vanadium",1299,1800,4.5,2345,P.tool5,"Pro Grade"), pr("Bosch Screwdriver Bit Set 20 Piece",699,999,4.2,4321,P.safety) ];
const PLUMBING = [ pr("Astral CPVC Pipe 25mm 3m Length",349,499,4.4,2345,P.weld), pr("Kirloskar Star-1 0.5HP Monoblock Pump",4299,5999,4.6,3456,P.drill,"Best Seller"), pr("Brass Ball Valve 1in Full Bore (Pack of 5)",1499,2100,4.3,987,P.grinder), pr("Jaquar Florentine Single Lever Basin Mixer",3999,5500,4.5,1234,P.elec,"Premium"), pr("Supreme UPVC Pipe 110mm 6m",1099,1499,4.2,765,P.tool3), pr("Fernox TF1 Omega Filter 22mm",2799,3800,4.4,543,P.tool4,"New") ];
const FASTENERS = [ pr("Hex Bolt M12x50 Grade 8.8 (Pack of 50)",449,650,4.5,3456,P.tool6), pr("Fischer S10 Wall Plug 100 Piece Box",299,450,4.6,7654,P.tool5,"Best Seller"), pr("Stainless Steel Self-Tapping Screws 5x35mm (200pc)",599,850,4.3,2345,P.drill), pr("Hilti HIT-RE 500 V3 Epoxy Anchor 500ml",3299,4500,4.7,876,P.safety,"Pro Choice"), pr("Pop Rivet Assorted Kit 200 Piece",349,499,4.2,1234,P.grinder), pr("DIN934 Hex Nut M10 Grade 8 (100 Piece)",199,299,4.4,4321,P.elec,"Bulk Deal") ];
const ABRASIVES = [ pr("Norton 115mm Grinding Wheel A60 (Pack of 10)",699,999,4.5,2345,P.weld), pr("3M Cubitron II Flap Disc 115mm 60G (10pc)",1499,2200,4.7,1876,P.drill,"Premium"), pr("Bosch Expert Cutting Disc 125mm (25pc)",899,1299,4.4,3456,P.tool4,"Best Seller"), pr("Mirka Abranet 225mm Sanding Disc P80 (50pc)",2199,3000,4.3,987,P.tool3), pr("Wire Cup Brush 100mm Knotted Steel",249,399,4.2,2109,P.tool5), pr("Tyrolit Diamond Blade 230mm Turbo",3499,4800,4.6,654,P.grinder,"Pro") ];
const WELDING = [ pr("Lincoln Electric Invertec 170S MIG Welder",24999,32000,4.7,456,P.weld,"Pro Grade"), pr("ESAB OK 46.00 Electrode 3.15mm (5kg)",899,1200,4.5,3456,P.tool6,"Best Seller"), pr("Victor Oxygen Regulator SR450D",3299,4500,4.4,876,P.elec), pr("3M Speedglas 9100X Auto-Darkening Helmet",18999,25000,4.8,234,P.grinder,"Top Rated"), pr("Hobart Handler 140 MIG Welder 115V",19999,27000,4.6,321,P.drill), pr("Lincoln SuperGlaze MIG Wire 0.8mm 15kg",3499,4800,4.5,543,P.tool4,"Value Pack") ];
const MATERIAL = [ pr("Mild Steel Platform Trolley 500kg Capacity",8999,12000,4.4,345,P.tool3), pr("Yale 1 Ton Electric Chain Hoist 3m Lift",18999,25000,4.6,234,P.tool5,"Heavy Duty"), pr("PP Strapping Roll 12mmx0.5mm 2000m",1299,1800,4.3,1234,P.safety,"Best Seller"), pr("Bubble Wrap Roll 1mx50m",899,1299,4.2,2345,P.elec), pr("Steel Shelving Rack 5 Tier 200kg/shelf",7499,9999,4.5,876,P.drill,"Popular"), pr("Hand Pallet Truck 2500kg Jack",5999,8000,4.4,543,P.grinder) ];
const IT = [ pr("HP LaserJet Pro M404dn Mono Printer",19999,26000,4.5,2345,P.weld,"Best Seller"), pr("TP-Link TL-SG1016D 16-Port Gigabit Switch",3499,4999,4.6,1876,P.tool6), pr("Logitech MX Keys Business Keyboard",7999,10500,4.7,3456,P.tool3,"Top Rated"), pr("Zebra ZD421 Thermal Label Printer",14999,19500,4.4,987,P.tool5), pr("APC UPS BX1100C-IN 1100VA",5999,7999,4.5,4321,P.grinder,"Must Have"), pr("D-Link DAP-2682 WiFi 6 Access Point",8999,11500,4.3,765,P.tool4) ];
export const TRENDING = [ pr("Bosch GSB 10.8-2-LI Cordless Drill",5499,7200,4.6,8765,P.drill,"Trending"), pr("3M 7500 Half Facepiece Respirator",2299,3200,4.7,5432,P.mask,"Hot"), pr("Havells L60 32A MCB (Pack of 6)",1099,1599,4.5,4321,P.elec,"Trending"), pr("Stanley 92-849 69-Piece Socket Set",3999,5500,4.6,3456,P.tool4,"Hot"), pr("JSP EVO3 Safety Helmet Blue",649,999,4.4,6789,P.helmet,"Trending"), pr("Finolex FRLS 1.5 sq mm Wire 90m",2299,3200,4.5,7654,P.grinder,"Hot") ];
export const LATEST = [ pr("Makita DHP486Z 18V Brushless Combi Drill",14999,19000,4.8,123,P.tool5,"New"), pr("Milwaukee M18 FUEL Circular Saw",22999,29000,4.7,87,P.safety,"Launch"), pr("Hilti X-BT 3 Gas Nailer",45999,58000,4.9,45,P.tool6,"New"), pr("Fluke 289 True-RMS Multimeter",29999,38000,4.8,67,P.tool3,"New"), pr("Atlas Copco GA15+ Air Compressor",149999,185000,4.9,23,P.tool4,"Launch"), pr("Leica DISTO D810 Touch Laser Measurer",34999,44000,4.7,34,P.grinder,"New") ];
export const SECTIONS = [
  {name:"Power Tools", title:"Power Tools - Top Picks", subtitle:"Professional-grade drills, grinders, saws & more from Bosch, DeWalt, Makita", bg:"linear-gradient(135deg,#1B2B4B 0%,#374151 100%)", img:P.drill, tagline:"Power Up Your Workshop", features:["18V & 36V Cordless","Brushless Motors","5-Year Warranty","Same-Day Dispatch"], products:POWER},
  {name:"Safety & PPE", title:"Safety & PPE - Full Protection", subtitle:"Helmets, gloves, shoes, respirators & more from 3M, Honeywell, JSP", bg:"linear-gradient(135deg,#064E3B 0%,#065F46 100%)", img:P.safety, tagline:"Safety Is Non-Negotiable", features:["IS/EN Certified","Industry Compliant","Bulk Discounts","ISO 9001 Brands"], products:SAFETY},
  {name:"Electrical", title:"Electrical - Wires, Switchgear & Lighting", subtitle:"From switchboards to industrial motors - complete electrical solutions", bg:"linear-gradient(135deg,#78350F 0%,#92400E 100%)", img:P.elec, tagline:"Wire Up Smarter", features:["ISI Mark Assured","Havells & Legrand","BIS Certified","5-Year Guarantee"], products:ELECTRICAL},
  {name:"Hand Tools", title:"Hand Tools - Professional Grade", subtitle:"Spanners, pliers, hammers and measuring tools built to last", bg:"linear-gradient(135deg,#1E3A5F 0%,#1D4ED8 100%)", img:P.grinder, tagline:"Every Job Done Right", features:["Chrome Vanadium","Lifetime Warranty","Ergonomic Design","VDE Insulated"], products:HAND},
  {name:"Plumbing", title:"Plumbing - Pipes, Pumps & Fittings", subtitle:"CPVC, UPVC, GI pipes and premium fixtures", bg:"linear-gradient(135deg,#312E81 0%,#4338CA 100%)", img:P.weld, tagline:"Flow Without Interruption", features:["ISI Certified Pipes","Kirloskar Pumps","10-Year Warranty","Leak-Proof Fittings"], products:PLUMBING},
  {name:"Fasteners", title:"Fasteners - Bolts, Nuts & Anchors", subtitle:"Hex bolts, anchors, rivets and all standard fasteners in bulk packs", bg:"linear-gradient(135deg,#701A75 0%,#9333EA 100%)", img:P.tool6, tagline:"Hold It All Together", features:["Grade 8.8 & 10.9","Stainless Steel","DIN Standards","Bulk Pricing"], products:FASTENERS},
  {name:"Abrasives", title:"Abrasives - Grind, Cut & Polish", subtitle:"Grinding wheels, flap discs, cutting discs from Norton, 3M and Tyrolit", bg:"linear-gradient(135deg,#7F1D1D 0%,#B91C1C 100%)", img:P.tool4, tagline:"Precision at Every Surface", features:["EN 12413 Certified","3M & Norton","Rapid Stock","All Grit Sizes"], products:ABRASIVES},
  {name:"Welding", title:"Welding - Machines, Rods & Accessories", subtitle:"Complete welding solutions from Lincoln Electric, ESAB, and Hobart", bg:"linear-gradient(135deg,#292524 0%,#44403C 100%)", img:P.tool5, tagline:"Weld with Confidence", features:["MIG / TIG / MMA","Lincoln & ESAB","ISO Certified","Expert Support"], products:WELDING},
  {name:"Material Handling", title:"Material Handling - Move Smarter", subtitle:"Trolleys, hoists, pallets, conveyors and storage solutions", bg:"linear-gradient(135deg,#164E63 0%,#0E7490 100%)", img:P.tool3, tagline:"Optimise Your Logistics", features:["500kg-10T Capacity","CE Marked Hoists","Custom Racking","Next-Day Delivery"], products:MATERIAL},
  {name:"IT & Office", title:"IT & Office - Tech for the Workplace", subtitle:"Printers, networking, computers and office essentials", bg:"linear-gradient(135deg,#1E293B 0%,#334155 100%)", img:P.weld, tagline:"Equip Your Office & Factory", features:["HP & Lenovo","Business Grade","AMC Available","GST Invoice"], products:IT}
];
export const ALL_PRODUCTS = SECTIONS.flatMap(s => s.products.map(p => ({...p, cat: s.name})));
export const TICKER_ITEMS = ["Free delivery on orders above 999","Same-day dispatch for orders before 2 PM","Get 5% cashback with IndustrialPay","Over 10 lakh industrial products","B2B bulk pricing - call 1800-XXX-XXXX","Trusted by 50,000+ businesses across India"];
export const TRUST_BADGES = [
  { icon: "🚚", title: "Free Delivery", sub: "Orders above 999" },
  { icon: "⚡", title: "Same Day Dispatch", sub: "Before 2 PM" },
  { icon: "🛡️", title: "Genuine Products", sub: "100% Authentic" },
  { icon: "↩️", title: "Easy Returns", sub: "7-Day Policy" },
];
export const MID_BANNERS = [
  { title: "Bulk Discounts", sub: "Save up to 20% on bulk orders", bg:"linear-gradient(135deg,#FF6B35,#E85A20)" },
  { title: "GST Invoice", sub: "Instant GST billing for businesses", bg:"linear-gradient(135deg,#1B2B4B,#2A4070)" },
  { title: "Expert Support", sub: "Talk to our industrial experts", bg:"linear-gradient(135deg,#065F46,#059669)" },
];
export const BRANDS = ["Bosch","DeWalt","Makita","3M","Havells","Legrand","Stanley","Honeywell","Schneider","ABB"];
export const FOOTER_COLS = [
  { title:"Power Tools", links:["Drills","Grinders","Saws","Sanders","Hammers","Wrenches","Heat Guns","Compressors"] },
  { title:"Safety & PPE", links:["Helmets","Gloves","Shoes","Eye Wear","Ear Protection","Masks","Suits","Harness"] },
  { title:"Electrical", links:["Wires","MCBs","Switches","Lights","Motors","Transformers","Plugs","Cables"] },
  { title:"Hand Tools", links:["Spanners","Pliers","Hammers","Screwdrivers","Tapes","Chisels","Files","Cutters"] },
  { title:"Plumbing", links:["Pipes","Valves","Pumps","Tanks","Taps","Meters","Sealants","Fittings"] },
  { title:"Fasteners", links:["Bolts","Nuts","Screws","Anchors","Rivets","Washers","Studs","Nails"] },
  { title:"Abrasives", links:["Wheels","Discs","Sandpaper","Brushes","Blades","Pads","Belts","Stones"] },
  { title:"Welding", links:["Machines","Electrodes","Wire","Rods","Helmets","Gloves","Regulators","Clamps"] },
  { title:"Material Handling", links:["Trolleys","Pallets","Hoists","Conveyors","Strapping","Storage","Forklifts","Cranes"] },
  { title:"Company", links:["About Us","Contact","Careers","Blog","Press","Bulk Enquiry","Become Seller","Store Locator"] },
];
