"use client";

export function trackAnalyticsEvent(eventName, parameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, parameters);
}
