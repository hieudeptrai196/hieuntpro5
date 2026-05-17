"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// domAnimation includes layout animations (layoutId) and is ~100KB lighter than domMax
export function FramerProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
