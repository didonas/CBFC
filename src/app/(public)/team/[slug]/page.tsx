'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { NewsCard } from '@/components/ui/NewsCard';
import { ArrowLeft } from 'lucide-react';

export default function PlayerProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { players, news } = useApp();

  const player = players.find((p) => p.slug === slug);

  if (!player) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-charcoal">Player Not Found</h1>
        <p className="text-mutedGrey text-sm">The requested player profile does not exist.</p>
        <Link
          href="/team"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Squad</span>
        </Link>
      </div>
    );
  }

  const relatedNews = news.slice(0, 2);

  return (
    <div className="space-y-12 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Return to Squad */}
      <div>
        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mutedGrey hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to First Team Squad</span>
        </Link>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Large Portrait */}
        <div className="lg:col-span-5 bg-white border border-lightBorder overflow-hidden shadow-card relative">
          <div className="relative aspect-[3/4] w-full bg-[#EAE8E2]">
            <Image
              src={player.portraitUrl}
              alt={player.fullName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
          </div>

          <div className="absolute top-4 left-4 font-display font-black text-4xl sm:text-5xl text-charcoal drop-shadow-sm">
            #{player.shirtNumber}
          </div>

          <div className="p-6 relative z-10 space-y-1.5 bg-white">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-primary block">
              CHURCHILL BROTHERS FC GOA
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
              {player.fullName}
            </h1>
          </div>
        </div>

        {/* Right: Info, Bio & Season Statistics */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 border border-lightBorder shadow-card text-xs">
            <div>
              <span className="text-mutedGrey uppercase font-bold text-[10px] block">Position</span>
              <span className="font-display font-black text-lg text-primary block mt-0.5">
                {player.position}
              </span>
            </div>
            <div>
              <span className="text-mutedGrey uppercase font-bold text-[10px] block">Nationality</span>
              <span className="font-display font-bold text-base text-charcoal block mt-0.5">
                {player.nationality} ({player.nationalityCode})
              </span>
            </div>
            <div>
              <span className="text-mutedGrey uppercase font-bold text-[10px] block">Height</span>
              <span className="font-display font-bold text-base text-charcoal block mt-0.5">
                {player.heightCm ? `${player.heightCm} cm` : '180 cm'}
              </span>
            </div>
            <div>
              <span className="text-mutedGrey uppercase font-bold text-[10px] block">Season</span>
              <span className="font-display font-bold text-base text-primary block mt-0.5">
                2026/27
              </span>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-3 bg-white p-6 border border-lightBorder shadow-card">
            <h2 className="font-display font-bold text-lg text-charcoal uppercase tracking-wider">
              Player Biography
            </h2>
            <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
              {player.bio}
            </p>
            <p className="text-xs text-mutedGrey leading-relaxed pt-3 border-t border-lightBorder">
              A key component of head coach Mateus Costa’s tactical setup, contributing with dedicated defensive work-rate, pressing endurance, and matchday discipline for The Red Machines.
            </p>
          </div>

          {/* Season Statistics */}
          {player.stats && (
            <div className="space-y-4 bg-white p-6 border border-lightBorder shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-lightBorder">
                <h2 className="font-display font-black text-xl text-charcoal uppercase tracking-wider">
                  2026/27 Season Statistics
                </h2>
                <span className="text-xs font-mono text-primary font-bold">
                  {player.stats.season}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-offWhite p-4 border border-lightBorder text-center">
                  <span className="text-[10px] uppercase font-bold text-mutedGrey block">
                    Appearances
                  </span>
                  <span className="font-display font-black text-3xl text-charcoal mt-1 block">
                    {player.stats.appearances}
                  </span>
                </div>

                <div className="bg-offWhite p-4 border border-lightBorder text-center">
                  <span className="text-[10px] uppercase font-bold text-mutedGrey block">
                    {player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                  </span>
                  <span className="font-display font-black text-3xl text-primary mt-1 block">
                    {player.position === 'Goalkeeper'
                      ? player.stats.cleanSheets ?? 0
                      : player.stats.goals}
                  </span>
                </div>

                <div className="bg-offWhite p-4 border border-lightBorder text-center">
                  <span className="text-[10px] uppercase font-bold text-mutedGrey block">
                    Assists
                  </span>
                  <span className="font-display font-black text-3xl text-charcoal mt-1 block">
                    {player.stats.assists}
                  </span>
                </div>

                <div className="bg-offWhite p-4 border border-lightBorder text-center">
                  <span className="text-[10px] uppercase font-bold text-mutedGrey block">
                    Minutes Played
                  </span>
                  <span className="font-display font-black text-3xl text-charcoal mt-1 block">
                    {player.stats.minutesPlayed}
                  </span>
                </div>
              </div>

              {/* Cards Metric */}
              <div className="flex items-center gap-4 bg-offWhite p-3 border border-lightBorder text-xs text-charcoal">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-4 bg-yellow-400 border border-yellow-500 rounded-xs" />
                  <span>Yellow Cards: <strong className="text-charcoal font-bold">{player.stats.yellowCards}</strong></span>
                </div>
                <span className="text-zinc-300">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-4 bg-red-600 rounded-xs" />
                  <span>Red Cards: <strong className="text-charcoal font-bold">{player.stats.redCards}</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="pt-10 border-t border-lightBorder space-y-6">
          <h2 className="font-display font-black text-2xl text-charcoal uppercase tracking-wider">
            Related Club News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNews.map((post) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
