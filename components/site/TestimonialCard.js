import Image from "next/image";
import { Quote, Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  const rating = Number(testimonial.rating) || 5;
  const initials = (testimonial.name || "")
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7">
      <div className="flex items-center justify-between">
        <Quote className="size-8 text-brand-200" aria-hidden="true" />
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`size-3.5 ${index < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
        {testimonial.avatar ? (
          <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="size-12 rounded-full object-cover" />
        ) : (
          <span className="flex size-12 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700" aria-hidden="true">
            {initials}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-navy-900">{testimonial.name}</p>
          <p className="truncate text-xs text-slate-500">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}
