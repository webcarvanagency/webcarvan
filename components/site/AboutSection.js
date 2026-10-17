import Image from "next/image";
import { ArrowRight, CornerLeftDown, Users } from "lucide-react";
import { Icon } from "@/lib/icons";
import ButtonLink from "./ButtonLink";

export default function AboutSection({ about, showButton = true, headingLevel = "h2" }) {
  const Heading = headingLevel;

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-linear-to-br from-brand-400 to-brand-700 opacity-90" aria-hidden="true" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-brand-50 shadow-2xl shadow-brand-200/50">
            {about.image ? (
              <Image src={about.image} alt={about.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-4 bg-linear-to-br from-white to-brand-100" aria-hidden="true">
                <span className="flex size-24 items-center justify-center rounded-full bg-white shadow-lg">
                  <Users className="size-11 text-brand-600" />
                </span>
              </div>
            )}
          </div>
          {about.note && (
            <p className="absolute -top-10 left-0 hidden items-start gap-1 font-script text-2xl text-brand-600 sm:flex">
              <CornerLeftDown className="mt-4 size-6" aria-hidden="true" />
              {about.note}
            </p>
          )}
        </div>

        <div>
          {about.label && <p className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{about.label}</p>}
          <Heading className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{about.title}</Heading>
          <p className="mt-5 text-base leading-relaxed text-slate-600">{about.description}</p>

          {about.highlights?.length > 0 && (
            <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-600">
                    <Icon name={item.icon} className="size-5" aria-hidden="true" />
                  </span>
                  <p className="flex flex-col">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <span className="order-first font-bold text-navy-900">{item.value}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}

          {about.skills?.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Our skills">
              {about.skills.map((skill) => (
                <li key={skill} className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700">
                  {skill}
                </li>
              ))}
            </ul>
          )}

          {showButton && (
            <ButtonLink href="/about" className="mt-10">
              {about.buttonLabel || "Our Story"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
