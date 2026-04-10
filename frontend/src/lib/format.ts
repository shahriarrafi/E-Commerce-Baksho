
/**
 * Format price in BDT (Tk)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace("BDT", "Tk");
}

/**
 * Format relative time (e.g. for "Order in next 3 hours")
 */
export function getShippingCountdown() {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(18, 0, 0, 0); // Shipments cutoff at 6 PM
  
  if (now > endOfDay) {
    return "Tomorrow";
  }
  
  const diff = endOfDay.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}
