import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export async function generateMetadata() {
  const settings = await getSettings();
  const { general, seo } = settings;
  const siteUrl = getSiteUrl(settings);
  const images = seo.ogImage ? [{ url: seo.ogImage, width: 1200, height: 630, alt: general.siteName }] : [];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.title || general.siteName, template: `%s | ${general.siteName}` },
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.split(",").map((keyword) => keyword.trim()) : [],
    applicationName: general.siteName,
    alternates: { canonical: "/" },
    icons: general.favicon ? { icon: general.favicon, apple: general.favicon } : undefined,
    openGraph: {
      type: "website",
      siteName: general.siteName,
      title: seo.title,
      description: seo.description,
      url: siteUrl,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      site: seo.twitterHandle || undefined,
      images: images.map((image) => image.url),
    },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  themeColor: "#1a4ff5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className="bg-white font-sans text-slate-600 antialiased">{children}</body>
    </html>
  );
}
