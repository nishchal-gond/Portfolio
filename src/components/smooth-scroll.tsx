"use client";

import React from "react";
import { ReactLenis } from "@/lib/lenis";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        duration: 2,
        // Native (non-smoothed) wheel scrolling for people who prefer reduced motion.
        smoothWheel: reduced !== true,
        prevent: (node) => {
          if (isInsideModal) return true;
          const modalOpen = node.classList.contains("modall");
          return modalOpen;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
