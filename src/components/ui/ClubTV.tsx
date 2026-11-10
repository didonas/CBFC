'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, ChevronRight, Eye } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  views: string;
  date: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Match Highlights: Churchill Brothers 3-1 Salgaocar FC | Lekay Double & Gutiérrez Curler',
    category: 'Match Highlights',
    duration: '04:15',
    thumbnailUrl: '/images/media/gallery-derby-celebration.jpg',
    views: '18.4K',
    date: '3 Nov 2026',
  },
  {
    id: 'vid-2',
    title: 'Exclusive: Sebastián Gutiérrez on the Prestige of Wearing the No. 10 Shirt in Goa',
    category: 'Interview',
    duration: '08:30',
    thumbnailUrl: '/images/players/sebastian-gutierrez.jpg',
    views: '12.1K',
    date: '5 Nov 2026',
  },
  {
    id: 'vid-3',
    title: 'Inside Margao: First-Team Training Drills Ahead of the Dempo SC Showdown',
    category: 'Behind The Scenes',
    duration: '05:45',
    thumbnailUrl: '/images/media/gallery-training-session.jpg',
    views: '9.6K',
    date: '7 Nov 2026',
  },
  {
    id: 'vid-4',
    title: 'Heritage Vault: The Night Churchill Brothers Sealed Their Second National Title',
    category: 'Club Heritage',
    duration: '11:20',
    thumbnailUrl: '/images/media/gallery-champions-silverware.jpg',
    views: '24.8K',
    date: 'Historical Archive',
  },
];

export const ClubTV: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <div className="bg-white border border-stone rounded-sm p-6 sm:p-8 lg:p-10 shadow-editorial">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 mb-8 border-b border-stone gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-burgundy tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
            Red Machines TV • Official Video Portal
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight">
            Match Highlights & Dressing Room Access
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-1 font-sans">
            Exclusive tactical breakdowns, manager press briefings, match highlights, and historical documentaries.
          </p>
        </div>

        <Link
          href="/media"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition shrink-0"
        >
          <span>All Video Features</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Grid: Featured Player + Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Featured Video Player Box (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-stone bg-ink group">
            <Image
              src={activeVideo.thumbnailUrl}
              alt={activeVideo.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-burgundy/90 hover:bg-burgundy text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-editorial group-hover:bg-burgundy"
                aria-label={`Play ${activeVideo.title}`}
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
              </button>
            </div>

            {/* Video Meta Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-burgundy text-white font-sans font-bold text-[10px] uppercase tracking-wider rounded-sm shadow-editorial">
                {activeVideo.category}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="flex items-center gap-1.5 font-mono text-[11px] bg-ink/80 px-2 py-0.5 rounded-sm">
                <Clock className="w-3.5 h-3.5 text-stone" />
                {activeVideo.duration}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] bg-ink/80 px-2 py-0.5 rounded-sm">
                <Eye className="w-3.5 h-3.5 text-stone" />
                {activeVideo.views} views
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink leading-snug">
              {activeVideo.title}
            </h3>
            <p className="text-xs text-muted mt-1 font-sans">
              Broadcast date: {activeVideo.date} • Churchill Brothers TV Media Production
            </p>
          </div>
        </div>

        {/* Video Playlist (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block mb-1">
            Featured Broadcasts:
          </span>

          <div className="space-y-2">
            {VIDEOS.map((vid) => {
              const isSelected = vid.id === activeVideo.id;
              return (
                <button
                  type="button"
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className={`w-full text-left p-3 rounded-sm border transition-all duration-150 flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-ivory border-burgundy shadow-sm'
                      : 'bg-white hover:bg-ivory border-stone'
                  }`}
                >
                  <div className="relative w-24 h-16 rounded-sm overflow-hidden shrink-0 border border-stone bg-ink">
                    <Image
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-burgundy/80 flex items-center justify-center">
                        <Play className="w-3 h-3 fill-white translate-x-0.5 text-white" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1 bg-ink/90 text-[9px] font-mono text-white rounded-none">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-sans font-bold uppercase text-burgundy tracking-wider block">
                      {vid.category}
                    </span>
                    <h4
                      className={`text-xs font-sans font-semibold line-clamp-2 mt-0.5 leading-snug ${
                        isSelected ? 'text-burgundy' : 'text-ink'
                      }`}
                    >
                      {vid.title}
                    </h4>
                    <span className="text-[10px] text-muted mt-1 block font-mono">
                      {vid.date} • {vid.views}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
