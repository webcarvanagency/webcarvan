import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, UserRound } from "lucide-react";
import RichText from "@/components/site/RichText";
import PostCard from "@/components/site/PostCard";
import JsonLd from "@/components/site/JsonLd";
import CtaSection from "@/components/site/CtaSection";
import { getBySlug, getPosts, getSettings } from "@/lib/data";
import { formatDate, getSiteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBySlug("posts", slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: post.author ? [post.author] : [],
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, posts, settings] = await Promise.all([getBySlug("posts", slug), getPosts(), getSettings()]);
  if (!post) notFound();

  const more = posts.filter((item) => item.id !== post.id).slice(0, 3);
  const siteUrl = getSiteUrl(settings);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.image || undefined,
          datePublished: post.date,
          author: { "@type": "Organization", name: post.author || settings.general.siteName },
          publisher: { "@type": "Organization", name: settings.general.siteName },
          mainEntityOfPage: `${siteUrl}/insights/${post.slug}`,
        }}
      />
      <article>
        <header className="bg-linear-to-b from-brand-50 to-white">
          <div className="mx-auto max-w-3xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800">
              <ArrowLeft className="size-4" aria-hidden="true" />
              All Insights
            </Link>
            <h1 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight text-navy-900 sm:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
              {post.author && (
                <span className="flex items-center gap-2">
                  <UserRound className="size-4" aria-hidden="true" />
                  {post.author}
                </span>
              )}
              {post.date && (
                <span className="flex items-center gap-2">
                  <Calendar className="size-4" aria-hidden="true" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
              )}
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
          {post.image && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
              <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          )}
          <p className="mb-8 text-lg leading-relaxed font-medium text-navy-900">{post.excerpt}</p>
          <RichText text={post.content} />
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-navy-900">Keep Reading</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {more.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="pt-24">
        <CtaSection cta={settings.cta} contact={settings.contact} />
      </div>
    </>
  );
}
