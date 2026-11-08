'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { NewsCard } from '@/components/ui/NewsCard';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { news } = useApp();

  const post = news.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-white">Article Not Found</h1>
        <p className="text-zinc-400 text-sm">We could not locate this club news article.</p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold uppercase"
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
    <article className="space-y-10 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return button */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Newsroom</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider inline-block">
          {post.category}
        </span>

        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-brandGold" />
            <span>{post.authorName}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brandGold" />
            <span>{formattedDate}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brandGold" />
            <span>{post.readTimeMinutes} min read</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-cardDark border border-zinc-800 shadow-2xl">
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
      <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6 text-zinc-300 leading-relaxed font-sans text-base">
        <p className="font-semibold text-lg text-white leading-relaxed border-l-4 border-primary pl-4">
          {post.excerpt}
        </p>

        <div className="space-y-4 whitespace-pre-line text-sm sm:text-base leading-relaxed">
          {post.content}
        </div>
      </div>

      {/* Related News */}
      {otherArticles.length > 0 && (
        <div className="pt-12 border-t border-zinc-800 space-y-6">
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
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
