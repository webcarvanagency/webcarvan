import HeroSection from "@/components/site/HeroSection";
import StatsBar from "@/components/site/StatsBar";
import SectionHeading from "@/components/site/SectionHeading";
import ServiceCard from "@/components/site/ServiceCard";
import ProjectCard from "@/components/site/ProjectCard";
import AboutSection from "@/components/site/AboutSection";
import ProcessSection from "@/components/site/ProcessSection";
import TestimonialsSection from "@/components/site/TestimonialsSection";
import PostCard from "@/components/site/PostCard";
import CtaSection from "@/components/site/CtaSection";
import { getFeaturedProjects, getPosts, getServices, getSettings, getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const [settings, services, projects, testimonials, posts] = await Promise.all([
    getSettings(),
    getServices(),
    getFeaturedProjects(4),
    getTestimonials(),
    getPosts(),
  ]);
  const { sections } = settings;

  return (
    <>
      <HeroSection hero={settings.hero} siteName={settings.general.siteName} />
      <StatsBar stats={settings.stats} />

      {services.length > 0 && (
        <section className="py-24" aria-labelledby="services-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label={sections.servicesLabel}
              title={sections.servicesTitle}
              text={sections.servicesText}
              align="center"
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="bg-brand-50/60 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label={sections.projectsLabel}
              title={sections.projectsTitle}
              text={sections.projectsText}
              action={{ href: "/work", label: "View All Projects" }}
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <AboutSection about={settings.about} />
      <ProcessSection sections={sections} steps={settings.process} />
      <TestimonialsSection sections={sections} testimonials={testimonials.slice(0, 3)} />

      {posts.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label={sections.insightsLabel}
              title={sections.insightsTitle}
              text={sections.insightsText}
              action={{ href: "/insights", label: "Read All Insights" }}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection cta={settings.cta} contact={settings.contact} />
    </>
  );
}
