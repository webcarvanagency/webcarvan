import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import ButtonLink from "./ButtonLink";

export default function CtaSection({ cta, contact }) {
  const whatsapp = whatsappLink(contact.whatsapp, contact.whatsappMessage);

  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-r from-navy-900 via-brand-900 to-brand-700 px-6 py-14 sm:px-12 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[18px_18px] opacity-60"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-20 -bottom-32 size-96 rounded-full bg-brand-500/40 blur-3xl" aria-hidden="true" />

        <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            {cta.label && <p className="text-xs font-bold tracking-[0.16em] text-brand-300 uppercase">{cta.label}</p>}
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{cta.title}</h2>
            <p className="mt-4 leading-relaxed text-brand-100">{cta.text}</p>
          </div>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={cta.buttonLink || "/contact"} variant="white">
                {cta.buttonLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              {whatsapp && (
                <ButtonLink href={whatsapp} variant="ghost">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Chat on WhatsApp
                </ButtonLink>
              )}
            </div>
            {cta.note && <p className="font-script text-2xl text-brand-200">{cta.note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
