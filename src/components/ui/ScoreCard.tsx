'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Match } from '@/types';
import { ClubCrest } from './ClubCrest';
import { Calendar, ChevronRight, FileText } from 'lucide-react';

interface ScoreCardProps {
  match: Match;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ match }) => {
  const matchDate = new Date(match.matchDate);
  const formattedDate = matchDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-darkSurface border border-zinc-800 hover:border-zinc-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-xl p-5 shadow-card flex flex-col justify-between">
      <div>
        {/* Top: Competition & Date */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-xs">
          <span className="font-display font-bold uppercase tracking-wider text-brandGold">
            {match.competition}
          </span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Score Board */}
        <div className="grid grid-cols-7 items-center gap-2 py-3">
          {/* Home Side */}
          <div className="col-span-3 flex items-center justify-end gap-2.5 text-right">
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
              {match.isHomeMatch ? 'Churchill Bros' : match.opponentName}
            </span>
            {match.isHomeMatch ? (
              <ClubCrest size={34} />
            ) : (
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src={match.opponentCrestUrl}
                  alt={match.opponentName}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Score Box */}
          <div className="col-span-1 flex flex-col items-center">
            <div className="px-3 py-1 bg-zinc-950 border border-zinc-700 rounded text-center">
              <span className="font-display font-black text-lg sm:text-xl text-white tracking-wider">
                {match.homeScore ?? 0} - {match.awayScore ?? 0}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-bold uppercase mt-1">FT</span>
          </div>

          {/* Away Side */}
          <div className="col-span-3 flex items-center justify-start gap-2.5 text-left">
            {!match.isHomeMatch ? (
              <ClubCrest size={34} />
            ) : (
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src={match.opponentCrestUrl}
                  alt={match.opponentName}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
              {!match.isHomeMatch ? 'Churchill Bros' : match.opponentName}
            </span>
          </div>
        </div>

        {/* Goal Scorers Snippet */}
        {match.goalscorers && match.goalscorers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 space-y-1">
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 justify-center">
              {match.goalscorers.map((g, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <span>⚽</span>
                  <span className="text-zinc-300 font-medium">{g.playerName}</span>
                  <span className="text-zinc-500 font-mono text-[10px]">{g.minute}&apos;</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
        <span className="text-zinc-500 truncate text-[11px]">{match.venueName}</span>
        <Link
          href={`/matches/${match.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:text-white transition shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Match Report</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
