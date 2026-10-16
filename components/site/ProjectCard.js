import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";

export function ProjectImage({ project, sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw", priority = false }) {
  if (project.image) {
    return <Image src={project.image} alt={project.title} fill sizes={sizes} priority={priority} className="object-cover" />;
  }

  return (
    <div className="flex size-full flex-col bg-linear-to-br from-navy-900 via-brand-900 to-brand-700 p-5" aria-hidden="true">
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-white/30" />
        <span className="size-1.5 rounded-full bg-white/30" />
        <span className="size-1.5 rounded-full bg-white/30" />
      </div>
      <div className="m-auto flex flex-col items-center gap-3 text-center">
        <LayoutTemplate className="size-8 text-brand-200" />
        <span className="text-sm font-semibold text-white/90">{project.category || project.title}</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-100/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <ProjectImage project={project} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-navy-900">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        {project.tags?.length > 0 && <p className="mt-1.5 text-xs text-slate-500">{project.tags.join(" • ")}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-600">
          View Project
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
