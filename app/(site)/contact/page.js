import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/site/ContactForm";
import SocialLinks from "@/components/site/SocialLinks";
import { getServices, getSettings } from "@/lib/data";
import { buildKeywords, pageKeywords } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export async function generateMetadata() {
  const { contact, seo } = await getSettings();
  return {
    title: "Contact Us",
    description: contact.text,
    alternates: { canonical: "/contact" },
    keywords: buildKeywords(seo.keywords, pageKeywords.contact),
  };
}

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  const { contact, social } = settings;
  const whatsapp = whatsappLink(contact.whatsapp, contact.whatsappMessage);

  const details = [
    contact.email && { Icon: Mail, label: "Email Us", value: contact.email, href: `mailto:${contact.email}` },
    contact.phone && { Icon: Phone, label: "Call Us", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    whatsapp && { Icon: MessageCircle, label: "WhatsApp", value: contact.whatsapp, href: whatsapp },
    contact.address && { Icon: MapPin, label: "Location", value: contact.address },
    contact.hours && { Icon: Clock, label: "Working Hours", value: contact.hours },
  ].filter(Boolean);

  return (
    <>
      <PageHero label="Contact" title={contact.title} text={contact.text} breadcrumbs={[{ label: "Contact" }]} />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="min-w-0 rounded-3xl bg-navy-900 p-6 text-slate-300 sm:p-10 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <p className="mt-3 text-sm leading-relaxed">Reach out through any channel below. We are happy to help.</p>
            <ul className="mt-10 space-y-7">
              {details.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block font-medium break-words text-white hover:text-brand-300"
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium break-words text-white">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <SocialLinks social={social} className="mt-10" />
          </div>

          <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:col-span-3">
            <h2 className="text-2xl font-bold text-navy-900">Send Us a Message</h2>
            <p className="mt-2 mb-8 text-sm text-slate-600">Fill in the form and our team will get back to you shortly.</p>
            <ContactForm services={services} />
          </div>
        </div>

        {contact.mapEmbedUrl && (
          <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
            <iframe
              src={contact.mapEmbedUrl}
              title={`${settings.general.siteName} location`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-96 w-full rounded-3xl border-0"
            />
          </div>
        )}
      </section>
    </>
  );
}
