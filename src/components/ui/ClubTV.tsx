'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Sparkles, ChevronRight } from 'lucide-react';

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
    title: 'MATCH HIGHLIGHTS: Churchill Brothers 3-1 Salgaocar FC | Lekay Double & Gutiérrez Curler',
    category: 'Match Highlights',
    duration: '04:15',
    thumbnailUrl: '/images/media/gallery-derby-celebration.jpg',
    views: '18.4K',
    date: '3 Nov 2026',
  },
  {
    id: 'vid-2',
    title: 'EXCLUSIVE: Sebastián Gutiérrez on the Prestige of Wearing the No. 10 Shirt in Goa',
    category: 'Interview',
    duration: '08:30',
    thumbnailUrl: '/images/players/sebastian-gutierrez.jpg',
    views: '12.1K',
    date: '5 Nov 2026',
  },
  {
    id: 'vid-3',
    title: 'INSIDE MARGAO: First-Team Training Drills Ahead of the Dempo SC Showdown',
    category: 'Behind The Scenes',
    duration: '05:45',
    thumbnailUrl: '/images/media/gallery-training-session.jpg',
    views: '9.6K',
    date: '7 Nov 2026',
  },
  {
    id: 'vid-4',
    title: 'HERITAGE VAULT: The Night Churchill Brothers Sealed Their Second National Title',
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
    <div className="bg-[#182236] border border-white/10 rounded-2xl overflow-hidden shadow-card p-7 sm:p-10 lg:p-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-primary tracking-widest uppercase mb-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            RED MACHINES TV • OFFICIAL VIDEO PORTAL
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            MATCH HIGHLIGHTS & ACCESS
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Exclusive dressing-room access, gaffer press conferences, match highlights, and archival documentaries.
          </p>
        </div>

        <Link
          href="/media"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
        >
          <span>All Video Features</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Grid: Featured Player + Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Featured Video Player Box (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black group">
            <Image
              src={activeVideo.thumbnailUrl}
              alt={activeVideo.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary hover:bg-deepRed text-white flex items-center justify-center shadow-club transition-transform hover:scale-110 active:scale-95 group/btn"
                title="Play Video Feature"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" />
              </button>
            </div>

            {/* Category & Duration Tags */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                {activeVideo.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-brandGold" />
                {activeVideo.duration}
              </span>
            </div>

            {/* Video Meta at Bottom */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase leading-snug drop-shadow-md">
                {activeVideo.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-xs text-zinc-300">
                <span>{activeVideo.views} views</span>
                <span>•</span>
                <span>{activeVideo.date}</span>
                <span>•</span>
                <span className="text-primary font-bold">Red Machines TV Exclusive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-zinc-400 block mb-2">
            Up Next on Red Machines TV:
          </span>

          {VIDEOS.map((vid) => {
            const isSelected = vid.id === activeVideo.id;
            return (
              <button
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  setIsPlaying(false);
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 group ${
                  isSelected
                    ? 'bg-[#1C2436] border-primary shadow-club'
                    : 'bg-[#121826]/70 border-white/10 hover:border-white/30 hover:bg-[#1C273E]'
                }`}
              >
                {/* Thumbnail */}
                <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-black border border-white/10">
                  <Image
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-primary/90 text-white flex items-center justify-center">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[9px] font-mono font-bold text-white">
                    {vid.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                    {vid.category}
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-primary transition line-clamp-2 leading-tight mt-0.5">
                    {vid.title}
                  </h4>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-400">
                    <span>{vid.views} views</span>
                    <span>•</span>
                    <span>{vid.date}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
