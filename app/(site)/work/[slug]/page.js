import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import RichText from "@/components/site/RichText";
import ButtonLink from "@/components/site/ButtonLink";
import ProjectCard, { ProjectImage } from "@/components/site/ProjectCard";
import CtaSection from "@/components/site/CtaSection";
import { getBySlug, getProjects, getSettings } from "@/lib/data";
import { buildKeywords, pageKeywords } from "@/lib/seo";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getBySlug("projects", slug);
  if (!project) return {};
  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.excerpt,
    alternates: { canonical: `/work/${project.slug}` },
    keywords: buildKeywords(project.seoKeywords, project.title, project.category, project.tags, pageKeywords.work),
    openGraph: { title: project.title, description: project.excerpt, images: project.image ? [project.image] : [] },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, projects, settings] = await Promise.all([getBySlug("projects", slug), getProjects(), getSettings()]);
  if (!project) notFound();

  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const details = [
    { label: "Client", value: project.client },
    { label: "Category", value: project.category },
    { label: "Technologies", value: project.tags?.join(", ") },
  ].filter((item) => item.value);

  return (
    <>
      <PageHero
        label={project.category || "Case Study"}
        title={project.title}
        text={project.excerpt}
        breadcrumbs={[{ label: "Our Work", href: "/work" }, { label: project.title }]}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-200/60">
            <ProjectImage project={project} sizes="(min-width: 1280px) 1216px, 100vw" priority />
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-navy-900">Project Overview</h2>
              <RichText text={project.description} />
            </div>
            <aside className="h-fit rounded-2xl border border-slate-200 p-8">
              <dl className="space-y-5">
                {details.map((item) => (
                  <div key={item.label}>
                    <dt className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{item.label}</dt>
                    <dd className="mt-1 font-medium text-navy-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} className="mt-8 w-full">
                  Visit Live Website
                  <ExternalLink className="size-4" aria-hidden="true" />
                </ButtonLink>
              )}
            </aside>
          </div>

          {project.gallery?.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={image} alt={`${project.title} screenshot ${index + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-brand-50/60 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">More Projects</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
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
