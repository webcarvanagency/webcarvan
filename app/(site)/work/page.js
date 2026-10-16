import PageHero from "@/components/site/PageHero";
import ProjectCard from "@/components/site/ProjectCard";
import CtaSection from "@/components/site/CtaSection";
import { getProjects, getSettings } from "@/lib/data";

export async function generateMetadata() {
  const { sections } = await getSettings();
  return {
    title: "Our Work",
    description: sections.projectsText,
    alternates: { canonical: "/work" },
  };
}

export default async function WorkPage() {
  const [settings, projects] = await Promise.all([getSettings(), getProjects()]);
  const { sections } = settings;

  return (
    <>
      <PageHero label={sections.projectsLabel} title={sections.projectsTitle} text={sections.projectsText} breadcrumbs={[{ label: "Our Work" }]} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">New projects are coming soon.</p>
          )}
        </div>
      </section>
      <CtaSection cta={settings.cta} contact={settings.contact} />
    </>
  );
}
