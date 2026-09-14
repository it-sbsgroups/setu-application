// Unsplash photo ids used across the catalog. Kept short so the
// product data below stays readable.
export const PHOTO = {
  drill: "1504328345606-18bbc8c9d7d1",
  grinder: "1572981779307-38b8cabb2407",
  tool3: "1586864387967-d02ef85d93e8",
  tool4: "1530124566582-a618bc2615dc",
  tool5: "1558618047-3c8c76ca7d13",
  tool6: "1581092918056-0c4c3acd3789",
  safety: "1581092160562-40aa08e78837",
  gloves: "1598300042247-d088f8ab3a91",
  helmet: "1620121692029-d088224ddc74",
  weld: "1558618666-fcd25c85cd64",
  mask: "1584515933487-779824d29309",
  shoe: "1542291026-7eec264c27ff",
  elec: "1565849904461-04a58ad377e0",
  light: "1524484485831-a92ffc0de03f",
};

/** Small square-ish thumbnail, used for product cards / cart / search. */
export function thumb(id, size = 300) {
  return `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&auto=format`;
}

/** Wide banner crop, used for hero/section/banner imagery. */
export function wide(id, w = 1200, h = 400) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

/** Formats a number as Indian rupees, e.g. 3299 -> "₹3,299". */
export function formatMoney(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

/** Formats the "price – original price" range shown on product cards. */
export function formatPriceRange(product) {
  return `${formatMoney(product.price)} – ${formatMoney(product.orig)}`;
}
