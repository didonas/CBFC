'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { MatchCard } from '@/components/ui/MatchCard';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { Calendar, Filter, Clock } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

function MatchesContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'results' ? 'results' : 'upcoming';
  const { matches } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>(initialTab);
  const [selectedCompetition, setSelectedCompetition] = useState<string>('All');

  const competitions = ['All', 'I-League 2026-27', 'Goa Professional League'];

  const upcomingMatches = matches.filter(
    (m) =>
      m.status === 'scheduled' &&
      (selectedCompetition === 'All' || m.competition === selectedCompetition)
  );

  const completedMatches = matches.filter(
    (m) =>
      m.status === 'completed' &&
      (selectedCompetition === 'All' || m.competition === selectedCompetition)
  );

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-display font-bold uppercase tracking-widest text-brandGold">
          <Calendar className="w-3.5 h-3.5" />
          CALENDAR & MATCH REPORTS • 2026/27 CAMPAIGN
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          FIXTURES & RESULTS
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Follow Churchill Brothers FC across national and state campaigns. All kickoff times displayed in Indian Standard Time (IST / Asia/Kolkata).
        </p>
      </div>

      {/* Control Tabs & Competition Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-darkSurface p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition ${
              activeTab === 'upcoming'
                ? 'bg-primary text-white shadow-club'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Upcoming Fixtures ({upcomingMatches.length})
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition ${
              activeTab === 'results'
                ? 'bg-primary text-white shadow-club'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            Match Results ({completedMatches.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-400" />
          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className="bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary transition"
          >
            {competitions.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'upcoming' ? (
        <div>
          {upcomingMatches.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
                <StaggerItem key={match.id}>
                  <MatchCard match={match} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
              <p className="text-base font-semibold text-white">No upcoming fixtures scheduled</p>
              <p className="text-xs mt-1">Check back soon for new fixture announcements.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {completedMatches.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMatches.map((match) => (
                <StaggerItem key={match.id}>
                  <ScoreCard match={match} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
              <p className="text-base font-semibold text-white">No completed match results found</p>
              <p className="text-xs mt-1">Try selecting a different competition filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto py-20 px-4 text-center text-zinc-400">Loading match fixtures...</div>}>
      <MatchesContent />
    </Suspense>
  );
}
