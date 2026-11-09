'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  post: Post;
}

export const NewsCard: React.FC<NewsCardProps> = ({ post }) => {
  const pubDate = new Date(post.publishedAt);
  const formattedDate = pubDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="group bg-[#182236] border border-white/10 hover:border-primary/50 hover:-translate-y-1 shadow-card hover:shadow-cardHover transition-all duration-200 rounded-2xl overflow-hidden flex flex-col justify-between">
      <div>
        {/* Featured Image */}
        <Link href={`/news/${post.slug}`} className="block relative aspect-[16/9] w-full bg-[#121826] overflow-hidden">
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-primary text-white font-display font-bold text-[10px] uppercase tracking-wider shadow-sm">
            {post.category}
          </span>
        </Link>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2.5 text-xs text-slate-400 mb-2.5 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {formattedDate}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              {post.readTimeMinutes} min read
            </span>
          </div>

          <Link href={`/news/${post.slug}`}>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-primary transition line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-zinc-300 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer Link */}
      <div className="px-5 pb-5 pt-0">
        <Link
          href={`/news/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary group-hover:text-deepRed transition"
        >
          <span>Read Full Story</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
