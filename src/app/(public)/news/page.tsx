'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { NewsCard } from '@/components/ui/NewsCard';
import { Newspaper, Search } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

export default function NewsPage() {
  const { news } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Match Report', 'Club News', 'Interview'];

  const filteredNews = news.filter((post) => {
    if (!post.isPublished) return false;
    const matchesCat =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Header */}
      <div className="bg-white border border-lightBorder p-8 sm:p-10 shadow-card space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-xs font-display font-bold uppercase tracking-widest text-primary">
          <Newspaper className="w-3.5 h-3.5" />
          OFFICIAL EDITORIAL & MEDIA DESK
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight leading-none">
          CLUB NEWS & PRESS RELEASES
        </h1>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl leading-relaxed">
          Get official match previews, post-match analysis, gaffer interviews, and announcements direct from Churchill Brothers FC Goa.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-lightBorder shadow-card">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-offWhite text-charcoal hover:bg-zinc-100 border border-lightBorder'
              }`}
            >
              {cat === 'All' ? 'All Stories' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-mutedGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-offWhite border border-lightBorder pl-9 pr-4 py-2 text-xs text-charcoal placeholder-mutedGrey focus:outline-none focus:border-primary transition font-medium"
          />
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((post) => (
            <StaggerItem key={post.id}>
              <NewsCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="bg-white border border-lightBorder p-12 text-center text-mutedGrey shadow-card">
          <p className="text-base font-bold text-charcoal">No articles found</p>
          <p className="text-xs mt-1">Try resetting your filter or search keywords.</p>
        </div>
      )}
    </div>
  );
}
