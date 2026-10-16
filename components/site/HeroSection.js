import Image from "next/image";
import { ArrowRight, CirclePlay, CornerRightUp } from "lucide-react";
import ButtonLink from "./ButtonLink";
import HeroMockup from "./HeroMockup";

export default function HeroSection({ hero, siteName }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50/70 via-white to-white">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-brand-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-60 -left-40 size-96 rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 pt-14 pb-24 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-20 lg:pb-28">
        <div>
          {hero.badge && (
            <p className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-700">
              {hero.badge}
            </p>
          )}
          <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-[3.5rem]">
            {hero.title}{" "}
            <span className="bg-linear-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">{hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{hero.description}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            {hero.primaryLabel && (
              <ButtonLink href={hero.primaryLink}>
                {hero.primaryLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
            )}
            {hero.secondaryLabel && (
              <ButtonLink href={hero.secondaryLink} variant="outline">
                {hero.secondaryLabel}
                <CirclePlay className="size-4" aria-hidden="true" />
              </ButtonLink>
            )}
          </div>

          {hero.techStack?.length > 0 && (
            <ul className="mt-10 flex flex-wrap items-center gap-2.5" aria-label="Technologies we use">
              {hero.techStack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative">
          {hero.image ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={hero.image}
                alt={`${siteName} - ${hero.highlight}`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          ) : (
            <HeroMockup siteName={siteName} />
          )}
          {hero.note && (
            <p className="absolute -bottom-14 right-4 hidden items-end gap-1 font-script text-2xl text-brand-600 sm:flex lg:-bottom-16">
              {hero.note}
              <CornerRightUp className="mb-3 size-6" aria-hidden="true" />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
