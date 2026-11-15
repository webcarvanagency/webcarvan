import Link from "next/link";
import PageHero from "@/components/site/PageHero";

export const metadata = {
  title: "Privacy Policy",
  description: "How Web Caravan handles enquiries, website analytics, cookies and advertising information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <>
    <PageHero label="Your privacy" title="Privacy Policy" text="How information is handled when you browse Web Caravan or contact us." breadcrumbs={[{ label: "Privacy Policy" }]} />
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 text-base leading-relaxed sm:px-6">
      <p className="text-sm text-slate-500">Last updated: November 15, 2026</p>
      <p>Web Caravan operates webcarvan.com. This policy describes information handled through this website. For privacy questions, correction requests or deletion requests, contact <a className="text-brand-700 underline" href="mailto:webcarvanagency@gmail.com">webcarvanagency@gmail.com</a>. Our public business location is Islamabad, Pakistan.</p>
      <h2 className="text-2xl font-bold text-navy-900">Information you provide</h2>
      <p>Our enquiry form asks for your name, email address, project message and, optionally, phone number and service of interest. We use this information to respond, discuss a requested service and manage that conversation. Please do not send passwords, payment-card details or other sensitive records in the form. The form also records submission time and whether a message has been read.</p>
      <h2 className="text-2xl font-bold text-navy-900">Website operation and service providers</h2>
      <p>The website uses Vercel for hosting, Firebase for stored website content, contact enquiries and administrator authentication, and Cloudinary for website images. These providers process information needed to deliver their services, which can include technical request information such as IP address, browser information and logs. Providers may process data outside your country. Administrator sign-in uses Firebase authentication; ordinary readers do not need to create an account.</p>
      <h2 className="text-2xl font-bold text-navy-900">Analytics and cookies</h2>
      <p>We use Google Analytics, Vercel Web Analytics and Vercel Speed Insights to understand website usage and performance. Google Analytics can use cookies and identifiers. Measurements can include pages visited, device or browser information and interactions such as choosing a contact link. A contact-link click does not tell us the contents of a later call or conversation. Our analytics implementation should not send the text of enquiries, names, email addresses or phone numbers as event parameters.</p>
      <p>You can restrict or delete cookies in your browser. Some browser settings or extensions can prevent analytics or advertising from loading. Google’s <a className="text-brand-700 underline" href="https://tools.google.com/dlpage/gaoptout">Analytics opt-out browser add-on</a> offers another control for supported browsers. Learn how Google uses information from partner sites at <a className="text-brand-700 underline" href="https://policies.google.com/technologies/partner-sites">Google Privacy &amp; Terms</a>.</p>
      <h2 className="text-2xl font-bold text-navy-900">Advertising on Insights pages</h2>
      <p>Web Caravan has applied to Google AdSense. Advertising may be enabled on the Insights listing and article pages after approval and completion of the advertising setup. An application or an ads.txt file does not mean ads are already being served. Our business, contact and privacy pages are not intended as advertising placements.</p>
      <p>When advertising is enabled, Google and other third-party advertising vendors may use cookies or similar technologies to serve and measure ads based on visits to this and other websites. Google’s advertising cookies can enable Google and its partners to serve personalized ads. You can manage Google ad personalization through <a className="text-brand-700 underline" href="https://myadcenter.google.com/">My Ad Center</a> and learn about participating vendors’ controls at <a className="text-brand-700 underline" href="https://www.aboutads.info/choices/">YourAdChoices</a>. These controls do not necessarily remove all advertising.</p>
      <p>Before enabling advertising for visitors in the EEA, UK or Switzerland, we require a Google-certified consent-management setup. When available, its privacy or consent controls let visitors review their choices. Ads remain off until Google approval and the advertising and consent setup are complete. Browser controls and consent choices can affect which ads or measurements are available.</p>
      <h2 className="text-2xl font-bold text-navy-900">External links and WhatsApp</h2>
      <p>Choosing a WhatsApp, telephone, email or external resource link opens another service or application. Information you send there is also subject to that provider’s policies. We do not receive a WhatsApp conversation simply because you click our link. Embedded maps, when present, are provided by Google and can process technical information when loaded.</p>
      <h2 className="text-2xl font-bold text-navy-900">Access, retention and your requests</h2>
      <p>Enquiries are intended for authorized website administrators, not public browsing. We retain information while needed to respond, provide requested services, maintain necessary business records or meet applicable obligations. No single retention period applies to every type of record. We do not sell the contact details submitted through our form.</p>
      <p>You may ask us what enquiry information we hold, request a correction or request deletion by emailing the address above. We may need enough information to verify the request and may need to retain records for legitimate business or legal reasons. Rights and available remedies depend on the law that applies to your circumstances. No online system can guarantee absolute security.</p>
      <h2 className="text-2xl font-bold text-navy-900">Updates and contact</h2>
      <p>We update this page when the website’s practices change and show the revision date above. This site is intended for people researching business services and related guidance, and is not directed at children. For questions about this policy, use our <Link className="text-brand-700 underline" href="/contact">contact page</Link> or email webcarvanagency@gmail.com.</p>
    </article>
  </>;
}
