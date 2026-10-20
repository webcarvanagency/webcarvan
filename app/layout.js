import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";
import { buildKeywords, pageKeywords } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });

export async function generateMetadata() {
  const settings = await getSettings();
  const { general, seo } = settings;
  const siteUrl = getSiteUrl(settings);
  const title = seo.title || general.siteName;
  const socialImage = seo.ogImage || "/brand/webcarvan-og.webp";
  const images = [{ url: socialImage, width: 1200, height: 630, alt: `${general.siteName} — digital solutions` }];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${general.siteName}` },
    description: seo.description,
    keywords: buildKeywords(seo.keywords, pageKeywords.home),
    applicationName: general.siteName,
    alternates: { canonical: "/" },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
    openGraph: {
      type: "website",
      siteName: general.siteName,
      title,
      description: seo.description,
      url: siteUrl,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4RMRY0QZVF" />
        <script
          id="google-tag"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4RMRY0QZVF');
            `,
          }}
        />
      </head>
      <body className="bg-white font-sans text-slate-600 antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
