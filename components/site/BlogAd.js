"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { isInsightsPath } from "@/lib/adsense";

function AdUnit({ client, slot, nonce }) {
  const element = useRef(null);
  const requested = useRef(false);
  const requestAd = useCallback(() => {
    if (requested.current || !element.current || element.current.dataset.adsbygoogleStatus) return;
    requested.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      requested.current = false;
      // Ad blockers and an unavailable network must not break the article.
    }
  }, []);

  useEffect(() => {
    if (window.adsbygoogle?.loaded) requestAd();
  }, [requestAd]);

  return <aside aria-label="Advertisement" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
    <p className="mb-3 text-center text-xs uppercase tracking-widest text-slate-400">Advertisement</p>
    <ins ref={element} className="adsbygoogle" style={{ display: "block", minHeight: 100 }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    <Script id="webcarvan-blog-ads" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" nonce={nonce} strategy="afterInteractive" onReady={requestAd} />
  </aside>;
}

export default function BlogAd({ configuration, nonce }) {
  const pathname = usePathname();
  if (!configuration.enabled || !isInsightsPath(pathname)) return null;
  return <AdUnit key={pathname} client={configuration.client} slot={configuration.slot} nonce={nonce} />;
}
