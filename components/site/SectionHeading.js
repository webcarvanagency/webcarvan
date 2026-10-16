import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ label, title, text, align = "left", action, as: Tag = "h2" }) {
  const centered = align === "center";

  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end ${centered ? "md:justify-center" : "md:justify-between"}`}>
      <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {label && <p className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{label}</p>}
        <Tag className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">{title}</Tag>
        {text && <p className="mt-4 text-base leading-relaxed text-slate-600">{text}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-800"
        >
          {action.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
