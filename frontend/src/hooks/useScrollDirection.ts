
import { useState, useEffect } from "react";

/**
 * Hook to track scroll direction
 * @param threshold - distance to scroll before direction changes
 * @returns boolean - true if scrolling up (or at top), false if scrolling down
 */
export function useScrollDirection(threshold = 10) {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) < threshold) return;

      if (currentScrollY <= 50) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling Down
        setIsScrollingUp(false);
      } else {
        // Scrolling Up
        setIsScrollingUp(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, threshold]);

  return isScrollingUp;
}
