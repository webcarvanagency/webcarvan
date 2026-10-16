import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({ label, title, text, breadcrumbs = [] }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 to-white">
      <div className="pointer-events-none absolute -top-32 -right-32 size-[30rem] rounded-full bg-brand-300/25 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
            <li>
              <Link href="/" className="hover:text-brand-600">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy-900" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {label && <p className="mt-8 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{label}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{text}</p>}
      </div>
    </section>
  );
}
