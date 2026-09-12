export const formatINR = (n) => "₹" + n.toLocaleString("en-IN");
export const formatRange = (p) => `${formatINR(p.price)} – ${formatINR(p.orig)}`;
export const discountPercent = (p) => Math.round((1 - p.price / p.orig) * 100);
