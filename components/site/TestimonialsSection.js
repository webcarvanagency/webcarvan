import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection({ sections, testimonials = [] }) {
  if (!testimonials.length) return null;

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={sections.testimonialsLabel} title={sections.testimonialsTitle} text={sections.testimonialsText} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
