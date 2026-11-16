import Link from "next/link";
import PageHero from "@/components/site/PageHero";

export const metadata = {
  title: "Privacy Policy",
  description: "How Web Caravan handles enquiries, website analytics and cookies.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <>
    <PageHero label="Your privacy" title="Privacy Policy" text="How information is handled when you browse Web Caravan or contact us." breadcrumbs={[{ label: "Privacy Policy" }]} />
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-base leading-relaxed sm:px-6">
      <p className="text-sm text-slate-500">Last updated: November 16, 2026</p>
      <p>Web Caravan operates webcarvan.com. This policy describes information handled through this website.
        For privacy questions, correction requests or deletion requests, contact <a className="text-brand-700 underline" href="mailto:webcarvanagency@gmail.com">webcarvanagency@gmail.com</a>. Our public business location is Islamabad, Pakistan.</p>
      <h2 className="text-2xl font-bold text-navy-900">Information you provide</h2>
      <p>Our enquiry form asks for your name, email address, project message and, optionally,
        phone number and service of interest. We use this information to respond, discuss a requested
        service and manage that conversation. Please do not send passwords, payment-card details or other
        sensitive records in the form.
      </p>
      <h2 className="text-2xl font-bold text-navy-900">Website operation and service providers</h2>
      <p>We use trusted third-party service providers to host and operate this website, store website
        content and enquiries, and deliver images and other files. These providers process information
        needed to deliver their services, which can include technical request information such as
        browser information and logs. Providers may process data outside your country. Ordinary readers
        do not need to create an account to use this website.
      </p>
      <h2 className="text-2xl font-bold text-navy-900">Analytics and cookies</h2>
      <p>We use analytics and performance tools to understand website usage and how well the site
        performs. These tools can use cookies and similar identifiers. Measurements can include
        pages visited, device or browser information and interactions such as choosing a contact link.
        A contact-link click does not tell us the contents of a later call or conversation. We do not
        intend to send the text of enquiries, names, email addresses or phone numbers to analytics tools.
      </p>
      <p>You can restrict or delete cookies in your browser. Some browser settings or extensions can prevent
        analytics from loading.</p>
      <h2 className="text-2xl font-bold text-navy-900">External links and WhatsApp</h2>
      <p>Choosing a WhatsApp, telephone, email or external resource link opens another service or
        application. Information you send there is also subject to that provider’s policies. We do
        not receive a WhatsApp conversation simply because you click our link. Embedded maps, when
        present, are provided by third parties and can process technical information when loaded.
      </p>
      <h2 className="text-2xl font-bold text-navy-900">Access, retention and your requests</h2>
      <p>Enquiries are intended for authorized website administrators, not public browsing. We retain
        information while needed to respond, provide requested services, maintain necessary business
        records or meet applicable obligations. No single retention period applies to every type of record. We do not sell the contact details submitted through our form.</p>
      <p>You may ask us what enquiry information we hold, request a correction or request deletion by
        emailing the address above. We may need enough information to verify the request and may need
        to retain records for legitimate business or legal reasons. Rights and available remedies depend
        on the law that applies to your circumstances. No online system can guarantee absolute security.
      </p>
      <h2 className="text-2xl font-bold text-navy-900">Updates and contact</h2>
      <p>We update this page when the website’s practices change and show the revision date above. This
        site is intended for people researching business services and related guidance, and is not directed
        at children. For questions about this policy, use our{" "}
        <Link className="text-brand-700 underline" href="/contact">
          contact page
        </Link>{" "}
        or email webcarvanagency@gmail.com.
      </p>
    </article>
  </>;
}