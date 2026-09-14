import { TRANSIT_HUBS, LAST_MILE_HUBS } from "@/lib/data/location";

/** Generates a random 6-digit demo OTP. Replace with a real SMS/email provider in production. */
export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function isValidMobile(digits) {
  return /^\d{10}$/.test(digits);
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isValidOrn(value) {
  return /^ORN[A-Z0-9]{6,}$/.test(value);
}

/** Masks a mobile/email/google contact for "OTP sent to ..." style messages. */
export function maskContact(method, value) {
  if (method === "mobile") return "+91 ••••••" + value.slice(-4);
  if (method === "google") return "Google ••••••8891";
  const [user = "", domain = "mail.com"] = value.split("@");
  return (user ? user.slice(0, 2) + "••••" : "••••") + "@" + domain;
}

const formatShortDate = (date) =>
  date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

/** Builds a plausible fake shipment timeline for the order-tracking demo. */
export function buildTrackingInfo(orn) {
  const hub = TRANSIT_HUBS[Math.floor(Math.random() * TRANSIT_HUBS.length)];
  const lastMile = LAST_MILE_HUBS[Math.floor(Math.random() * LAST_MILE_HUBS.length)];
  const items = 1 + Math.floor(Math.random() * 4);
  const progress = 45 + Math.floor(Math.random() * 40);
  const now = new Date();
  const eta = new Date(now.getTime() + (2 + Math.floor(Math.random() * 3)) * 86400000);

  return {
    orn,
    current: hub,
    scanTime: now.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
    eta: formatShortDate(eta),
    items,
    progress,
    address: "Plot 42, MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400093",
    steps: [
      { title: "Order confirmed", meta: formatShortDate(new Date(now.getTime() - 4 * 86400000)) + ", 10:24 AM", done: true },
      { title: "Packed at Bhiwandi warehouse", meta: formatShortDate(new Date(now.getTime() - 3 * 86400000)) + ", 04:15 PM", done: true },
      { title: "Dispatched from origin hub", meta: formatShortDate(new Date(now.getTime() - 2 * 86400000)) + ", 08:40 AM", done: true },
      { title: "In transit — " + hub, meta: "Last scan " + now.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }), done: true },
      { title: "Arriving at " + lastMile, meta: "Expected " + formatShortDate(new Date(now.getTime() + 86400000)), done: false },
      { title: "Out for delivery", meta: "Expected " + formatShortDate(eta), done: false },
      { title: "Delivered", meta: "Expected by " + formatShortDate(eta) + ", 7:00 PM", done: false },
    ],
  };
}
