import { getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";

// The admin panel is not listed here on purpose: naming its secret path in a
// public file would reveal it. Its pages carry a noindex tag instead.
export default async function robots() {
  const siteUrl = getSiteUrl(await getSettings());
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
