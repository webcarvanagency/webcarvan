import Link from "next/link";
import PageHero from "@/components/site/PageHero";

export const metadata = {
  title: "Editorial Policy",
  description: "The purpose, sources, authorship and correction process for Web Caravan’s Insights guides.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return <>
    <PageHero label="About our guides" title="Editorial Policy" text="Practical guidance for people planning and maintaining business websites." breadcrumbs={[{ label: "Editorial Policy" }]} />
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-16 leading-relaxed sm:px-6">
      <p>Web Caravan publishes Insights about websites, online stores and digital measurement. Our guides are educational and also relate to services we offer. They are intended to help readers understand a task or a tradeoff before deciding whether they need professional support.</p>
      <h2 className="text-2xl font-bold text-navy-900">Authorship and sources</h2>
      <p>Guides attributed to the Web Caravan Editorial Team are maintained by Web Caravan. The November 2026 guide update was prepared with AI assistance and links to primary documentation where readers may need to verify product behavior. AI assistance is not evidence of firsthand client results. Illustrative scenarios are not presented as completed client projects, and provider documentation remains the reference for provider-specific instructions.</p>
      <h2 className="text-2xl font-bold text-navy-900">Scope and limitations</h2>
      <p>Guides do not promise search rankings, revenue, advertising approval or complete legal, tax, security or accessibility compliance. Product features and interfaces change. Check current official documentation before making a consequential configuration change. We do not use a target word count as a substitute for answering the reader’s question.</p>
      <h2 className="text-2xl font-bold text-navy-900">Corrections and updates</h2>
      <p>To report an inaccurate statement or broken link, email <a className="text-brand-700 underline" href="mailto:webcarvanagency@gmail.com">webcarvanagency@gmail.com</a> with the article URL and the relevant passage. Substantive revisions should be reflected in the article’s updated date. Sources and examples should be reviewed when the relevant product or guidance changes.</p>
      <h2 className="text-2xl font-bold text-navy-900">Advertising and commercial relationships</h2>
      <p>Web Caravan has applied to AdSense for advertising on Insights pages. Advertising is intended to be labeled separately from article content and does not represent our endorsement of an advertiser. These guides may link to our own services when relevant. Links to official documentation are provided as references.</p>
      <p>Read our <Link href="/privacy-policy" className="text-brand-700 underline">Privacy Policy</Link> for data and advertising disclosures, or return to <Link href="/insights" className="text-brand-700 underline">Insights</Link>.</p>
    </article>
  </>;
}
