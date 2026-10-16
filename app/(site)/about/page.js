import PageHero from "@/components/site/PageHero";
import AboutSection from "@/components/site/AboutSection";
import RichText from "@/components/site/RichText";
import StatsBar from "@/components/site/StatsBar";
import ProcessSection from "@/components/site/ProcessSection";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import CtaSection from "@/components/site/CtaSection";
import { Icon } from "@/lib/icons";
import { getSettings, getTestimonials } from "@/lib/data";

export async function generateMetadata() {
  const { about } = await getSettings();
  return {
    title: "About Us",
    description: about.description,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const [settings, testimonials] = await Promise.all([getSettings(), getTestimonials()]);
  const { about, sections } = settings;

  return (
    <>
      <PageHero label={about.label} title={about.title} text={about.description} breadcrumbs={[{ label: "About Us" }]} />
      <AboutSection about={{ ...about, label: "", title: "Who We Are" }} showButton={false} />

      {about.story && (
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-navy-900">Our Story</h2>
            <RichText text={about.story} />
          </div>
        </section>
      )}

      <div className="pb-24">
        <StatsBar stats={settings.stats} />
      </div>

      {about.values?.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy-900">What We Believe In</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {about.values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-slate-200 p-7">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon name={value.icon} className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-bold text-navy-900">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProcessSection sections={sections} steps={settings.process} />
      <TestimonialsSection sections={sections} testimonials={testimonials} />
      <CtaSection cta={settings.cta} contact={settings.contact} />
    </>
  );
}
