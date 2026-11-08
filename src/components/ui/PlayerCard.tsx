'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Player } from '@/types';
import { ArrowUpRight } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <Link
      href={`/team/${player.slug}`}
      className="group relative bg-cardDark border border-zinc-800 hover:border-primary/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col"
    >
      {/* Top Banner: Shirt Number & Position */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
        <span className="font-display font-black text-2xl sm:text-3xl text-white/90 drop-shadow-md">
          #{player.shirtNumber}
        </span>
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-700">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brandGold">
            {player.position}
          </span>
          <span className="text-zinc-500 text-[10px]">•</span>
          <span className="text-[10px] text-zinc-300 uppercase font-mono font-bold">
            {player.nationalityCode}
          </span>
        </div>
      </div>

      {/* Portrait Area */}
      <div className="relative aspect-[3/4] w-full bg-zinc-950 overflow-hidden">
        <Image
          src={player.portraitUrl}
          alt={player.fullName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cardDark via-cardDark/20 to-transparent" />
      </div>

      {/* Information Area */}
      <div className="p-4 flex-1 flex flex-col justify-between -mt-6 relative z-10">
        <div>
          <h3 className="font-display font-black text-lg text-white uppercase tracking-wide group-hover:text-primary transition line-clamp-1">
            {player.fullName}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            {player.bio}
          </p>
        </div>

        {/* Stats Pill & CTA */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
          {player.stats ? (
            <div className="flex items-center gap-3 text-zinc-300">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">Apps</span>
                <span className="font-display font-bold text-sm text-white">
                  {player.stats.appearances}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] uppercase block">
                  {player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                </span>
                <span className="font-display font-bold text-sm text-primary">
                  {player.position === 'Goalkeeper'
                    ? player.stats.cleanSheets ?? 0
                    : player.stats.goals}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-[11px] text-zinc-500">First-Team Squad</span>
          )}

          <div className="w-7 h-7 rounded-full bg-zinc-800 group-hover:bg-primary group-hover:text-white text-zinc-400 flex items-center justify-center transition">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
