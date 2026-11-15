"use client";

import { useEffect } from "react";

// CSP belongs to a document. Crossing into/out of Insights needs a fresh document,
// otherwise client navigation would keep the previous page's script policy.
export default function BlogNavigationBoundary() {
  useEffect(() => {
    function navigate(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const isBlog = (path) => path === "/insights" || path.startsWith("/insights/");
      if (isBlog(destination.pathname) === isBlog(window.location.pathname)) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(destination.href);
    }
    document.addEventListener("click", navigate, true);
    return () => document.removeEventListener("click", navigate, true);
  }, []);
  return null;
}
