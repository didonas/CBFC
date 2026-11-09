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
      className="group relative bg-[#182236] border border-white/10 hover:border-primary/50 hover:-translate-y-1 shadow-card hover:shadow-cardHover transition-all duration-200 rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Top Banner: Shirt Number & Position Tag */}
      <div className="p-4 pb-2.5 flex items-center justify-between z-10 bg-[#182236]">
        <span className="font-display font-black text-2xl text-white group-hover:text-primary transition-colors">
          #{player.shirtNumber}
        </span>
        <div className="flex items-center gap-1.5 bg-[#121826] px-2.5 py-0.5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider">
          <span className="text-primary font-bold">
            {player.position}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-mono">
            {player.nationalityCode}
          </span>
        </div>
      </div>

      {/* Portrait Area */}
      <div className="relative aspect-[3/4] w-full bg-[#121826] overflow-hidden">
        <Image
          src={player.portraitUrl}
          alt={player.fullName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
        />

        {/* Subtle Bottom Shadow Blend */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#182236] via-[#182236]/40 to-transparent" />
      </div>

      {/* Information Area */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#182236] relative z-10">
        <div>
          <h3 className="font-display font-black text-lg text-white uppercase tracking-wide group-hover:text-primary transition line-clamp-1">
            {player.fullName}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {player.bio}
          </p>
        </div>

        {/* Stats Strip & CTA */}
        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          {player.stats ? (
            <div className="flex items-center gap-4 text-white">
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Apps</span>
                <span className="font-display font-black text-sm text-white">
                  {player.stats.appearances}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  {player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                </span>
                <span className="font-display font-black text-sm text-primary">
                  {player.position === 'Goalkeeper'
                    ? player.stats.cleanSheets ?? 0
                    : player.stats.goals}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-[11px] text-zinc-400 font-medium">First-Team Squad</span>
          )}

          <div className="w-7 h-7 rounded-full bg-[#0D0F15] border border-white/10 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-zinc-300 flex items-center justify-center transition">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
