import PageHero from "@/components/site/PageHero";
import ServiceCard from "@/components/site/ServiceCard";
import ProcessSection from "@/components/site/ProcessSection";
import CtaSection from "@/components/site/CtaSection";
import { getServices, getSettings } from "@/lib/data";

export async function generateMetadata() {
  const { sections } = await getSettings();
  return {
    title: "Services",
    description: sections.servicesText,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const { sections } = settings;

  return (
    <>
      <PageHero
        label={sections.servicesLabel}
        title={sections.servicesTitle}
        text={sections.servicesText}
        breadcrumbs={[{ label: "Services" }]}
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
      <ProcessSection sections={sections} steps={settings.process} />
      <div className="pt-24">
        <CtaSection cta={settings.cta} contact={settings.contact} />
      </div>
    </>
  );
}
