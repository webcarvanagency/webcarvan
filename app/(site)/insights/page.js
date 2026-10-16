import PageHero from "@/components/site/PageHero";
import PostCard from "@/components/site/PostCard";
import CtaSection from "@/components/site/CtaSection";
import { getPosts, getSettings } from "@/lib/data";

export async function generateMetadata() {
  const { sections } = await getSettings();
  return {
    title: "Insights",
    description: sections.insightsText,
    alternates: { canonical: "/insights" },
  };
}

export default async function InsightsPage() {
  const [settings, posts] = await Promise.all([getSettings(), getPosts()]);
  const { sections } = settings;

  return (
    <>
      <PageHero label={sections.insightsLabel} title={sections.insightsTitle} text={sections.insightsText} breadcrumbs={[{ label: "Insights" }]} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">New articles are coming soon.</p>
          )}
        </div>
      </section>
      <CtaSection cta={settings.cta} contact={settings.contact} />
    </>
  );
}
