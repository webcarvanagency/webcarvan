import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Icon } from "@/lib/icons";

export default function ServiceCard({ service }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/60">
      <span className="flex size-14 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
        <Icon name={service.icon} className="size-7" aria-hidden="true" />
      </span>
      <h3 className="mt-6 text-xl font-bold text-navy-900">
        <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.excerpt}</p>
      {service.features?.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      <span className="mt-auto flex justify-end pt-6" aria-hidden="true">
        <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
          <ArrowRight className="size-4" />
        </span>
      </span>
    </article>
  );
}
