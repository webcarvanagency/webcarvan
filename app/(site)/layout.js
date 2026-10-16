import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import JsonLd from "@/components/site/JsonLd";
import { getServices, getSettings } from "@/lib/data";
import { getSiteUrl } from "@/lib/utils";

export const revalidate = 60;

export default async function SiteLayout({ children }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const { general, contact, social, seo } = settings;
  const siteUrl = getSiteUrl(settings);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: general.siteName,
    url: siteUrl,
    description: seo.description,
    logo: general.logo || undefined,
    email: contact.email || undefined,
    telephone: contact.phone || undefined,
    address: contact.address ? { "@type": "PostalAddress", streetAddress: contact.address } : undefined,
    sameAs: Object.values(social).filter(Boolean),
  };

  return (
    <>
      <JsonLd data={organization} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-700 focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header general={general} hero={settings.hero} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
    </>
  );
}
