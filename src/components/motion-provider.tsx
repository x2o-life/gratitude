"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Follow the visitor's Reduce motion setting for every animation. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
