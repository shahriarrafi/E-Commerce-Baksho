
/**
 * Utility for combining Tailwind classes
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Standardized Haptic Feedback for Mobile
 */
export function triggerHaptic(intensity: number = 10) {
  if (typeof window !== "undefined" && typeof window.navigator.vibrate === "function") {
    window.navigator.vibrate(intensity);
  }
}

/**
 * Delay helper for simulating loading states
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
