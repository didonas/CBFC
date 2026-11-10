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
      className="group relative bg-white border border-stone hover:border-burgundy/60 transition-all duration-200 rounded-sm shadow-editorial overflow-hidden flex flex-col"
    >
      {/* Top Banner: Shirt Number & Position Tag */}
      <div className="p-4 pb-2 flex items-center justify-between z-10 bg-white border-b border-stone-subtle">
        <span className="font-stats font-black text-2xl text-ink group-hover:text-burgundy transition-colors">
          #{player.shirtNumber}
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-muted">
          <span className="text-burgundy font-bold">
            {player.position}
          </span>
          <span className="text-stone-dark">•</span>
          <span className="font-mono text-ink">
            {player.nationalityCode}
          </span>
        </div>
      </div>

      {/* Portrait Area */}
      <div className="relative aspect-[3/4] w-full bg-stone-subtle overflow-hidden">
        <Image
          src={player.portraitUrl}
          alt={player.fullName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>

      {/* Information Area */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white relative z-10">
        <div>
          <h3 className="font-display font-bold text-base text-ink uppercase tracking-tight group-hover:text-burgundy transition line-clamp-1">
            {player.fullName}
          </h3>
          <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed font-sans">
            {player.bio}
          </p>
        </div>

        {/* Stats Strip & CTA */}
        <div className="mt-3 pt-2.5 border-t border-stone-light flex items-center justify-between text-xs">
          {player.stats ? (
            <div className="flex items-center gap-4 text-ink font-sans">
              <div>
                <span className="text-[9px] uppercase font-bold text-muted block">Apps</span>
                <span className="font-stats font-black text-sm text-ink">
                  {player.stats.appearances}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-muted block">
                  {player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                </span>
                <span className="font-stats font-black text-sm text-burgundy">
                  {player.position === 'Goalkeeper'
                    ? player.stats.cleanSheets ?? 0
                    : player.stats.goals}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-[11px] text-muted font-medium">First-Team Squad</span>
          )}

          <div className="w-6 h-6 rounded-sm bg-stone-light text-ink group-hover:bg-burgundy group-hover:text-white flex items-center justify-center transition">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
};
