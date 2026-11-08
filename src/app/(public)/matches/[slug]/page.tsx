'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { NewsCard } from '@/components/ui/NewsCard';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  BarChart2,
  FileText,
} from 'lucide-react';

export default function MatchDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { matches, news } = useApp();

  const match = matches.find((m) => m.slug === slug);

  if (!match) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-charcoal">Match Not Found</h1>
        <p className="text-mutedGrey text-sm">The requested match fixture does not exist.</p>
        <Link
          href="/matches"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches</span>
        </Link>
      </div>
    );
  }

  const d = new Date(match.matchDate);
  const formattedDate = d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isCompleted = match.status === 'completed';
  const relatedNews = news.slice(0, 2);

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Return button */}
      <div>
        <Link
          href="/matches"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mutedGrey hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Fixtures & Results</span>
        </Link>
      </div>

      {/* Match Center Scoreboard Banner */}
      <div className="bg-white border border-lightBorder p-6 sm:p-10 lg:p-12 shadow-card space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-lightBorder pb-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold uppercase tracking-wider text-primary">
              {match.competition}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="text-mutedGrey font-medium">Matchday {match.matchday || 18}</span>
          </div>

          <span className="px-3 py-1 rounded bg-offWhite border border-lightBorder text-charcoal font-bold uppercase tracking-wider text-[11px]">
            {isCompleted ? 'FULL TIME RESULT' : 'SCHEDULED FIXTURE'}
          </span>
        </div>

        {/* Teams & Score Row */}
        <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-6 text-center">
          {/* Home Side */}
          <div className="md:col-span-3 flex flex-col md:flex-row items-center justify-end gap-4">
            <div className="order-2 md:order-1 text-center md:text-right">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal uppercase">
                {match.isHomeMatch ? 'Churchill Brothers' : match.opponentName}
              </h2>
              <span className="text-xs text-primary font-bold uppercase tracking-wider">
                {match.isHomeMatch ? 'The Red Machines (Home)' : 'Away'}
              </span>
            </div>
            <div className="order-1 md:order-2 shrink-0">
              {match.isHomeMatch ? (
                <ClubCrest size={64} />
              ) : (
                <div className="relative w-16 h-16">
                  <Image
                    src={match.opponentCrestUrl}
                    alt={match.opponentName}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Middle Score / VS */}
          <div className="md:col-span-1 flex flex-col items-center justify-center">
            {isCompleted ? (
              <div className="bg-offWhite px-6 py-2.5 border border-lightBorder">
                <span className="font-display font-black text-3xl sm:text-4xl text-charcoal tracking-widest">
                  {match.homeScore} - {match.awayScore}
                </span>
              </div>
            ) : (
              <div className="font-display font-black text-3xl text-primary">
                VS
              </div>
            )}
          </div>

          {/* Away Side */}
          <div className="md:col-span-3 flex flex-col md:flex-row items-center justify-start gap-4">
            <div className="shrink-0">
              {!match.isHomeMatch ? (
                <ClubCrest size={64} />
              ) : (
                <div className="relative w-16 h-16">
                  <Image
                    src={match.opponentCrestUrl}
                    alt={match.opponentName}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal uppercase">
                {!match.isHomeMatch ? 'Churchill Brothers' : match.opponentName}
              </h2>
              <span className="text-xs text-mutedGrey font-bold uppercase tracking-wider">
                {!match.isHomeMatch ? 'The Red Machines (Away)' : 'Opponent'}
              </span>
            </div>
          </div>
        </div>

        {/* Date, Venue & Referee info */}
        <div className="pt-6 border-t border-lightBorder flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{formattedTime} IST</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{match.venueName}</span>
          </div>
          {match.referee && (
            <div className="flex items-center gap-2 text-mutedGrey">
              <span>Referee: <strong className="text-charcoal">{match.referee}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Booking Box (If Upcoming and Tickets available) */}
      {!isCompleted && match.isTicketsAvailable && (
        <div className="bg-white border-2 border-primary/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary text-white text-[11px] font-display font-bold uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              DEMONSTRATION TICKETS AVAILABLE
            </span>
            <h3 className="font-display font-black text-2xl text-charcoal uppercase">
              BE THERE FOR THE RED MACHINES
            </h3>
            <p className="text-xs text-mutedGrey">
              Interactive demonstration ticket booking with scannable QR ticket generation.
            </p>
          </div>

          <Link
            href={`/tickets/${match.id}`}
            className="px-8 py-3.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm shrink-0 flex items-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Demo Tickets</span>
          </Link>
        </div>
      )}

      {/* Goalscorers & Match Report (If completed) */}
      {isCompleted && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Goalscorers & Match Stats */}
          <div className="lg:col-span-5 space-y-6">
            {/* Goalscorers */}
            <div className="bg-white p-6 border border-lightBorder shadow-card space-y-4">
              <h3 className="font-display font-bold text-lg text-charcoal uppercase tracking-wider flex items-center gap-2">
                <span>⚽</span>
                <span>Match Goalscorers</span>
              </h3>
              {match.goalscorers && match.goalscorers.length > 0 ? (
                <div className="space-y-2.5 divide-y divide-lightBorder">
                  {match.goalscorers.map((g, idx) => (
                    <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-primary font-bold text-sm">{g.minute}&apos;</span>
                        <span className="font-bold text-charcoal">{g.playerName}</span>
                      </div>
                      <span className="text-mutedGrey text-[11px] font-medium">
                        {g.isHomeTeam ? 'Home' : 'Away'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-mutedGrey italic">No goalscorer data recorded.</p>
              )}
            </div>

            {/* Match Statistics Simulation */}
            <div className="bg-white p-6 border border-lightBorder shadow-card space-y-4">
              <h3 className="font-display font-bold text-lg text-charcoal uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-primary" />
                <span>Match Statistics</span>
              </h3>
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between text-charcoal font-semibold mb-1">
                    <span>56%</span>
                    <span className="text-mutedGrey font-normal">Ball Possession</span>
                    <span>44%</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full w-[56%]" />
                    <div className="bg-zinc-400 h-full w-[44%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-charcoal font-semibold mb-1">
                    <span>8 (14)</span>
                    <span className="text-mutedGrey font-normal">Shots on Target (Total)</span>
                    <span>4 (9)</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full w-[60%]" />
                    <div className="bg-zinc-400 h-full w-[40%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-charcoal font-semibold mb-1">
                    <span>7</span>
                    <span className="text-mutedGrey font-normal">Corner Kicks</span>
                    <span>3</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full w-[70%]" />
                    <div className="bg-zinc-400 h-full w-[30%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Match Report */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-lightBorder shadow-card space-y-4">
            <h3 className="font-display font-bold text-xl text-charcoal uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Official Match Report</span>
            </h3>
            <div className="text-sm text-charcoal/80 leading-relaxed font-sans space-y-3">
              <p>{match.matchReport}</p>
              <p>
                Head coach Mateus Costa expressed satisfaction with the team’s positional composure and swift transition play in front of the home supporters at Fatorda Stadium.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Related News */}
      {relatedNews.length > 0 && (
        <div className="pt-10 border-t border-lightBorder space-y-6">
          <h2 className="font-display font-black text-2xl text-charcoal uppercase tracking-wider">
            Related News & Analysis
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
