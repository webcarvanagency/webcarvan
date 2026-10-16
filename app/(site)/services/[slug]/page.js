import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import RichText from "@/components/site/RichText";
import ButtonLink from "@/components/site/ButtonLink";
import ServiceCard from "@/components/site/ServiceCard";
import CtaSection from "@/components/site/CtaSection";
import { Icon } from "@/lib/icons";
import { getBySlug, getServices, getSettings } from "@/lib/data";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getBySlug("services", slug);
  if (!service) return {};
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.excerpt,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.title, description: service.excerpt, images: service.image ? [service.image] : [] },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const [service, services, settings] = await Promise.all([getBySlug("services", slug), getServices(), getSettings()]);
  if (!service) notFound();

  const others = services.filter((item) => item.id !== service.id).slice(0, 3);

  return (
    <>
      <PageHero
        label="Service"
        title={service.title}
        text={service.excerpt}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            {service.image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                <Image src={service.image} alt={service.title} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
              </div>
            )}
            <RichText text={service.description} />
          </div>
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-8 lg:sticky lg:top-28">
            <span className="flex size-14 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Icon name={service.icon} className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-lg font-bold text-navy-900">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {(service.features || []).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-8 w-full">
              Get a Free Quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Other Services</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <ServiceCard key={item.id} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="pt-24">
        <CtaSection cta={settings.cta} contact={settings.contact} />
      </div>
    </>
  );
}
