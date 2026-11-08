'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Match } from '@/types';
import { ClubCrest } from './ClubCrest';
import { Calendar, Clock, MapPin, Ticket, ChevronRight } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const matchDate = new Date(match.matchDate);
  const formattedDate = matchDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = matchDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white border border-lightBorder hover:border-primary hover:-translate-y-1 shadow-card hover:shadow-cardHover transition-all duration-200 p-5 flex flex-col justify-between group">
      <div>
        {/* Top: Competition & Badge */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-lightBorder text-xs">
          <span className="font-display font-bold uppercase tracking-wider text-primary">
            {match.competition}
          </span>
          <span className="px-2 py-0.5 rounded bg-offWhite border border-lightBorder text-charcoal font-bold text-[10px] uppercase">
            {match.isHomeMatch ? 'HOME' : 'AWAY'}
          </span>
        </div>

        {/* Teams Matchup Row */}
        <div className="grid grid-cols-5 items-center gap-2 my-2 text-center">
          {/* Home Team */}
          <div className="col-span-2 flex flex-col items-center">
            {match.isHomeMatch ? (
              <ClubCrest size={48} />
            ) : (
              <div className="relative w-12 h-12">
                <Image
                  src={match.opponentCrestUrl}
                  alt={match.opponentName}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="mt-2 text-xs font-bold text-charcoal uppercase tracking-tight line-clamp-1">
              {match.isHomeMatch ? 'Churchill Brothers' : match.opponentName}
            </span>
          </div>

          {/* VS Divider */}
          <div className="col-span-1 flex flex-col items-center">
            <span className="font-display font-black text-xl text-primary tracking-wider">
              VS
            </span>
            <span className="text-[10px] text-mutedGrey uppercase font-bold">
              {match.status === 'scheduled' ? 'FIXTURE' : match.status}
            </span>
          </div>

          {/* Away Team */}
          <div className="col-span-2 flex flex-col items-center">
            {!match.isHomeMatch ? (
              <ClubCrest size={48} />
            ) : (
              <div className="relative w-12 h-12">
                <Image
                  src={match.opponentCrestUrl}
                  alt={match.opponentName}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="mt-2 text-xs font-bold text-charcoal uppercase tracking-tight line-clamp-1">
              {!match.isHomeMatch ? 'Churchill Brothers' : match.opponentName}
            </span>
          </div>
        </div>

        {/* Date, Time & Venue */}
        <div className="mt-5 pt-3 border-t border-lightBorder space-y-1.5 text-xs text-mutedGrey">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-charcoal font-medium">{formattedDate}</span>
            <span className="text-zinc-300">•</span>
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-charcoal font-medium">{formattedTime} IST</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-mutedGrey shrink-0" />
            <span className="truncate">{match.venueName}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-lightBorder flex items-center justify-between gap-2">
        <Link
          href={`/matches/${match.slug}`}
          className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-primary flex items-center gap-1 transition"
        >
          <span>Match Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-primary" />
        </Link>

        {match.isTicketsAvailable ? (
          <Link
            href={`/tickets/${match.id}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <Ticket className="w-3 h-3" />
            <span>Book Tickets</span>
          </Link>
        ) : (
          <span className="text-[11px] text-mutedGrey font-medium">Ticket info pending</span>
        )}
      </div>
    </div>
  );
};
