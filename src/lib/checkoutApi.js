/**
 * Mock checkout API. Swap `placeOrder` with a real fetch() call when the
 * backend is ready — the signature (input → Promise<Order>) is designed to
 * match a REST endpoint 1:1 so the swap is a one-line change.
 */

function generateOrn() {
  const digits = Math.floor(10000000 + Math.random() * 90000000);
  return `ORN${digits}`;
}

const DELIVERY_DAYS_BY_PAYMENT = {
  upi: 2,
  card: 2,
  netbanking: 3,
  "credit-terms": 4,
  cod: 5,
};

export function placeOrder({ lines, subtotal, address, payment }) {
  return new Promise((resolve) => {
    // Simulate network + payment gateway round-trip.
    setTimeout(() => {
      const etaDays = DELIVERY_DAYS_BY_PAYMENT[payment?.method] ?? 3;
      resolve({
        orn: generateOrn(),
        placedAt: new Date().toISOString(),
        eta: new Date(Date.now() + etaDays * 86400000).toISOString(),
        itemCount: lines.reduce((sum, l) => sum + l.qty, 0),
        total: subtotal,
        address,
        payment,
      });
    }, 1200);
  });
}