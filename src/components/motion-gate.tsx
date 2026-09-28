"use client";
import React, { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Renders decorative, motion-heavy children (3D keyboard, particles, elastic
 * cursor) only for users who haven't asked their OS to reduce motion.
 */
export default function MotionGate({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced === null) return null;
  return <>{reduced ? fallback : children}</>;
}
