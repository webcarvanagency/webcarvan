import PageHero from "@/components/site/PageHero";
import ProjectCard from "@/components/site/ProjectCard";
import CtaSection from "@/components/site/CtaSection";
import { getProjects, getSettings } from "@/lib/data";
import { buildKeywords, pageKeywords } from "@/lib/seo";

export async function generateMetadata() {
  const { sections, seo } = await getSettings();
  return {
    title: "Our Work",
    description: sections.projectsText,
    alternates: { canonical: "/work" },
    keywords: buildKeywords(seo.keywords, pageKeywords.work),
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
          {sections.projectCategories?.length > 0 && (
            <ul className="mb-12 flex flex-wrap gap-2.5" aria-label="What we build">
              {sections.projectCategories.map((category) => (
                <li
                  key={category}
                  className="flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700"
                >
                  <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {category}
                </li>
              ))}
            </ul>
          )}
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
