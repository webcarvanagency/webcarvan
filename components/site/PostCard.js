import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-100/60">
      <div className="relative aspect-[16/9] overflow-hidden bg-brand-50">
        {post.image ? (
          <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-brand-50 to-brand-100" aria-hidden="true">
            <Newspaper className="size-10 text-brand-300" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {post.date && (
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="size-3.5" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        )}
        <h3 className="mt-3 text-lg leading-snug font-bold text-navy-900">
          <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-600">
          Read Article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
