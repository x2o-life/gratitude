"use client";

import type { Analytics } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase/client";

/**
 * Google Analytics 4 via Firebase (measurement ID from
 * NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID). Only runs on the live site, so local
 * development and preview builds on localhost don't pollute the data.
 */
let analytics: Promise<Analytics | null> | null = null;

function isTrackingEnabled() {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production") return false;
  if (!process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

/** Starts GA once; it sends the first page_view automatically. */
export function initAnalytics() {
  if (!isTrackingEnabled()) return Promise.resolve(null);
  analytics ??= getFirebaseAnalytics().catch(() => null);
  return analytics;
}

type EventParams = Record<string, string | number | boolean | undefined>;

/** Sends a GA4 event. Never throws: analytics must not break the page. */
export function track(event: string, params?: EventParams) {
  initAnalytics()
    .then(async (instance) => {
      if (!instance) return;
      const { logEvent } = await import("firebase/analytics");
      logEvent(instance, event, params);
    })
    .catch(() => {});
}
