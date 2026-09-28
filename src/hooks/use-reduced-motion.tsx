"use client";
import { useEffect, useState } from "react";

/**
 * Returns `null` until mounted (so callers can avoid a flash of heavy effects),
 * then whether the user asked the OS to reduce motion.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
