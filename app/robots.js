import { getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";

export default async function robots() {
  const siteUrl = getSiteUrl(await getSettings());
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
