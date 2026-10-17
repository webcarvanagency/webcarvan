import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import { footerLinks } from "./navigation";

export default function Footer({ settings, services = [] }) {
  const { general, contact, social } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo general={general} dark />
          {general.footerText && <p className="mt-5 text-sm leading-relaxed">{general.footerText}</p>}
          <SocialLinks social={social} className="mt-6" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Services</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={`/services/${service.slug}`} className="transition-colors hover:text-white">
                  {service.shortTitle || service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Get in Touch</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {contact.email}
                </a>
              </li>
            )}
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" aria-hidden="true" />
                <address className="not-italic">{contact.address}</address>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {year} {general.copyright}
          </p>
          {general.madeIn && (
            <p className="flex items-center gap-1.5">
              Designed with <Heart className="size-3.5 fill-red-500 text-red-500" aria-label="love" /> in {general.madeIn}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
