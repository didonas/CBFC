'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { MatchCard } from '@/components/ui/MatchCard';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { Calendar, Filter } from 'lucide-react';
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
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Page Header */}
      <div className="bg-white border border-lightBorder p-8 sm:p-10 shadow-card">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-xs font-display font-bold uppercase tracking-widest text-primary mb-3">
          <Calendar className="w-3.5 h-3.5" />
          CALENDAR & MATCH REPORTS • 2026/27 CAMPAIGN
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight leading-none">
          FIXTURES & RESULTS
        </h1>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl mt-3 leading-relaxed">
          Follow Churchill Brothers FC across national and state campaigns. All kickoff times displayed in Indian Standard Time (IST / Asia/Kolkata).
        </p>
      </div>

      {/* Control Tabs & Competition Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-lightBorder shadow-card">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition ${
              activeTab === 'upcoming'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-offWhite text-charcoal hover:bg-zinc-100 border border-lightBorder'
            }`}
          >
            Upcoming Fixtures ({upcomingMatches.length})
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider transition ${
              activeTab === 'results'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-offWhite text-charcoal hover:bg-zinc-100 border border-lightBorder'
            }`}
          >
            Match Results ({completedMatches.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-primary" />
          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className="bg-offWhite border border-lightBorder px-4 py-2 text-xs text-charcoal focus:outline-none focus:border-primary transition font-medium"
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
            <div className="bg-white border border-lightBorder p-12 text-center text-mutedGrey shadow-card">
              <p className="text-base font-bold text-charcoal">No scheduled fixtures</p>
              <p className="text-xs mt-1">Check back soon for updated league matchday releases.</p>
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
            <div className="bg-white border border-lightBorder p-12 text-center text-mutedGrey shadow-card">
              <p className="text-base font-bold text-charcoal">No completed matches found</p>
              <p className="text-xs mt-1">Select &ldquo;All&rdquo; or check upcoming fixtures.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-mutedGrey">Loading match calendar...</div>}>
      <MatchesContent />
    </Suspense>
  );
}
