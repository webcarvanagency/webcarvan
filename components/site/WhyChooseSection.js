import { Icon } from "@/lib/icons";
import SectionHeading from "./SectionHeading";

export default function WhyChooseSection({ sections, items = [] }) {
  if (!items.length) return null;

  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={sections.whyLabel} title={sections.whyTitle} text={sections.whyText} align="center" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/60"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
