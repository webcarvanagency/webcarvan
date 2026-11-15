import { headers } from "next/headers";
import Link from "next/link";
import BlogAd from "@/components/site/BlogAd";
import { blogAdConfiguration } from "@/lib/adsense";
import { getSettings } from "@/lib/data";

export default async function InsightsLayout({ children }) {
  const [requestHeaders, settings] = await Promise.all([headers(), getSettings()]);
  return <>
    <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 text-center text-xs leading-relaxed text-slate-500">
      Practical guides by the Web Caravan Editorial Team. <Link href="/editorial-policy" className="font-medium text-brand-700 underline underline-offset-2">Sources, corrections &amp; editorial policy</Link>
    </div>
    {children}
    <BlogAd configuration={blogAdConfiguration(settings)} nonce={requestHeaders.get("x-nonce") || undefined} />
  </>;
}
