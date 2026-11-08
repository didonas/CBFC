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
      className="group relative bg-white border border-lightBorder hover:border-primary hover:-translate-y-1 shadow-card hover:shadow-cardHover transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Top Banner: Shirt Number & Position Tag */}
      <div className="p-3.5 pb-0 flex items-center justify-between z-10 bg-white">
        <span className="font-display font-black text-2xl text-charcoal group-hover:text-primary transition-colors">
          #{player.shirtNumber}
        </span>
        <div className="flex items-center gap-1.5 bg-offWhite px-2 py-0.5 border border-lightBorder text-[10px] font-bold uppercase tracking-wider">
          <span className="text-primary font-bold">
            {player.position}
          </span>
          <span className="text-zinc-300">•</span>
          <span className="text-charcoal font-mono">
            {player.nationalityCode}
          </span>
        </div>
      </div>

      {/* Portrait Area */}
      <div className="relative aspect-[3/4] w-full bg-[#EAE8E2] overflow-hidden">
        <Image
          src={player.portraitUrl}
          alt={player.fullName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
        />

        {/* Subtle Bottom Light Blend */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </div>

      {/* Information Area */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white relative z-10">
        <div>
          <h3 className="font-display font-black text-lg text-charcoal uppercase tracking-wide group-hover:text-primary transition line-clamp-1">
            {player.fullName}
          </h3>
          <p className="text-xs text-mutedGrey mt-1 line-clamp-2 leading-relaxed">
            {player.bio}
          </p>
        </div>

        {/* Stats Strip & CTA */}
        <div className="mt-3.5 pt-3 border-t border-lightBorder flex items-center justify-between text-xs">
          {player.stats ? (
            <div className="flex items-center gap-4 text-charcoal">
              <div>
                <span className="text-[10px] uppercase font-bold text-mutedGrey block">Apps</span>
                <span className="font-display font-black text-sm text-charcoal">
                  {player.stats.appearances}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-mutedGrey block">
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
            <span className="text-[11px] text-mutedGrey font-medium">First-Team Squad</span>
          )}

          <div className="w-7 h-7 rounded-full bg-offWhite border border-lightBorder group-hover:bg-primary group-hover:border-primary group-hover:text-white text-charcoal flex items-center justify-center transition">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
