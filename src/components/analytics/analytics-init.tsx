"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

/** Loads Google Analytics after the page has hydrated. */
export default function AnalyticsInit() {
  useEffect(() => {
    void initAnalytics();
  }, []);
  return null;
}
