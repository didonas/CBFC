'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { NewsCard } from '@/components/ui/NewsCard';
import { ArrowLeft, Shield, Award, Calendar, Ruler, Globe, Clock } from 'lucide-react';

export default function PlayerProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { players, news } = useApp();

  const player = players.find((p) => p.slug === slug);

  if (!player) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-white">Player Not Found</h1>
        <p className="text-zinc-400 text-sm">The requested player profile does not exist.</p>
        <Link
          href="/team"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Squad</span>
        </Link>
      </div>
    );
  }

  const relatedNews = news.slice(0, 2);

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return to Squad */}
      <div>
        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to First Team Squad</span>
        </Link>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Large Portrait */}
        <div className="lg:col-span-5 bg-cardDark border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="relative aspect-[3/4] w-full bg-zinc-950">
            <Image
              src={player.portraitUrl}
              alt={player.fullName}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cardDark via-transparent to-transparent" />
          </div>

          <div className="absolute top-4 left-4 font-display font-black text-4xl sm:text-5xl text-white drop-shadow-lg">
            #{player.shirtNumber}
          </div>

          <div className="p-6 -mt-10 relative z-10 space-y-2">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-brandGold block">
              CHURCHILL BROTHERS FC GOA
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              {player.fullName}
            </h1>
          </div>
        </div>

        {/* Right: Info, Bio & Season Statistics */}
        <div className="lg:col-span-7 space-y-8">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-darkSurface p-4 rounded-2xl border border-zinc-800 text-xs">
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] block">Position</span>
              <span className="font-display font-bold text-base text-brandGold block mt-0.5">
                {player.position}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] block">Nationality</span>
              <span className="font-display font-bold text-base text-white block mt-0.5">
                {player.nationality} ({player.nationalityCode})
              </span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] block">Height</span>
              <span className="font-display font-bold text-base text-white block mt-0.5">
                {player.heightCm ? `${player.heightCm} cm` : '180 cm'}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase font-bold text-[10px] block">Season</span>
              <span className="font-display font-bold text-base text-primary block mt-0.5">
                2026/27
              </span>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-3 bg-darkSurface p-6 rounded-2xl border border-zinc-800">
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider">
              Player Biography
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">
              {player.bio}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800">
              A key component of head coach Mateus Costa’s tactical setup, contributing with dedicated defensive work-rate, pressing endurance, and matchday discipline for The Red Machines.
            </p>
          </div>

          {/* Season Statistics */}
          {player.stats && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">
                  2026/27 Season Statistics
                </h2>
                <span className="text-xs font-mono text-brandGold font-bold">
                  {player.stats.season}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-darkSurface p-4 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Appearances
                  </span>
                  <span className="font-display font-black text-3xl text-white mt-1 block">
                    {player.stats.appearances}
                  </span>
                </div>

                <div className="bg-darkSurface p-4 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    {player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                  </span>
                  <span className="font-display font-black text-3xl text-primary mt-1 block">
                    {player.position === 'Goalkeeper'
                      ? player.stats.cleanSheets ?? 0
                      : player.stats.goals}
                  </span>
                </div>

                <div className="bg-darkSurface p-4 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Assists
                  </span>
                  <span className="font-display font-black text-3xl text-brandGold mt-1 block">
                    {player.stats.assists}
                  </span>
                </div>

                <div className="bg-darkSurface p-4 rounded-xl border border-zinc-800 text-center">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    Minutes Played
                  </span>
                  <span className="font-display font-black text-3xl text-white mt-1 block">
                    {player.stats.minutesPlayed}
                  </span>
                </div>
              </div>

              {/* Cards Metric */}
              <div className="flex items-center gap-4 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-4 bg-yellow-400 rounded-xs" />
                  <span>Yellow Cards: <strong className="text-white">{player.stats.yellowCards}</strong></span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-4 bg-red-600 rounded-xs" />
                  <span>Red Cards: <strong className="text-white">{player.stats.redCards}</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="pt-12 border-t border-zinc-800 space-y-6">
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
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
