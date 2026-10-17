import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const columns = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5" };

export default function ProcessSection({ sections, steps = [] }) {
  if (!steps.length) return null;

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={sections.processLabel} title={sections.processTitle} text={sections.processText} />
        <ol className={`mt-14 grid gap-10 sm:grid-cols-2 ${columns[steps.length] || "lg:grid-cols-4"}`}>
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-8 ring-brand-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < steps.length - 1 && (
                  <span className="hidden flex-1 items-center lg:flex" aria-hidden="true">
                    <span className="h-px flex-1 border-t-2 border-dashed border-brand-200" />
                    <ArrowRight className="size-4 text-brand-400" />
                  </span>
                )}
              </div>
              <h3 className="mt-6 text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
