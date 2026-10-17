import PageHero from "@/components/site/PageHero";
import AboutSection from "@/components/site/AboutSection";
import RichText from "@/components/site/RichText";
import StatsBar from "@/components/site/StatsBar";
import ProcessSection from "@/components/site/ProcessSection";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import CtaSection from "@/components/site/CtaSection";
import WhyChooseSection from "@/components/site/WhyChooseSection";
import { getSettings, getTestimonials } from "@/lib/data";
import { buildKeywords, pageKeywords } from "@/lib/seo";

export async function generateMetadata() {
  const { about, seo } = await getSettings();
  return {
    title: "About Us",
    description: about.description,
    alternates: { canonical: "/about" },
    keywords: buildKeywords(seo.keywords, pageKeywords.about),
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

      <WhyChooseSection sections={sections} items={about.values} />

      <ProcessSection sections={sections} steps={settings.process} />
      <TestimonialsSection sections={sections} testimonials={testimonials} />
      <CtaSection cta={settings.cta} contact={settings.contact} />
    </>
  );
}
