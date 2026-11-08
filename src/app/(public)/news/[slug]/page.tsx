'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { NewsCard } from '@/components/ui/NewsCard';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { news } = useApp();

  const post = news.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4 bg-offWhite text-charcoal">
        <h1 className="font-display font-black text-3xl text-charcoal">Article Not Found</h1>
        <p className="text-mutedGrey text-sm">We could not locate this club news article.</p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News</span>
        </Link>
      </div>
    );
  }

  const d = new Date(post.publishedAt);
  const formattedDate = d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const otherArticles = news.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Return button */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mutedGrey hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Newsroom</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Article Header */}
        <div className="space-y-4">
          <span className="px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider inline-block">
            {post.category}
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-mutedGrey pt-2 border-b border-lightBorder pb-4 font-medium">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary" />
              <span className="text-charcoal font-semibold">{post.authorName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mutedGrey" />
              <span>{post.readTimeMinutes} min read</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EAE8E2] border border-lightBorder shadow-card">
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white border border-lightBorder p-6 sm:p-10 space-y-6 text-charcoal leading-relaxed font-sans text-base shadow-card">
          <p className="font-semibold text-lg text-charcoal leading-relaxed border-l-4 border-primary pl-4">
            {post.excerpt}
          </p>

          <div className="space-y-4 whitespace-pre-line text-sm sm:text-base leading-relaxed text-charcoal/80">
            {post.content}
          </div>
        </div>
      </div>

      {/* Related News */}
      {otherArticles.length > 0 && (
        <div className="pt-10 border-t border-lightBorder space-y-6 max-w-4xl mx-auto">
          <h2 className="font-display font-black text-2xl text-charcoal uppercase tracking-wider">
            More Stories From The Red Machines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherArticles.map((p) => (
              <NewsCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
