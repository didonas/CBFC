'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ClubCrest } from './ClubCrest';
import { Trophy, ChevronRight, Award } from 'lucide-react';

interface StandingRow {
  position: number;
  teamName: string;
  isChurchill: boolean;
  crestUrl?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

const STANDINGS_DATA: StandingRow[] = [
  {
    position: 1,
    teamName: 'Churchill Brothers FC Goa',
    isChurchill: true,
    played: 17,
    won: 11,
    drawn: 4,
    lost: 2,
    goalsFor: 34,
    goalsAgainst: 16,
    goalDifference: 18,
    points: 37,
    form: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    position: 2,
    teamName: 'Gokulam Kerala FC',
    isChurchill: false,
    crestUrl: '/images/opponents/gokulam-kerala.svg',
    played: 17,
    won: 10,
    drawn: 5,
    lost: 2,
    goalsFor: 31,
    goalsAgainst: 16,
    goalDifference: 15,
    points: 35,
    form: ['W', 'D', 'W', 'W', 'D'],
  },
  {
    position: 3,
    teamName: 'Dempo SC',
    isChurchill: false,
    crestUrl: '/images/opponents/dempo-sc.svg',
    played: 17,
    won: 10,
    drawn: 3,
    lost: 4,
    goalsFor: 29,
    goalsAgainst: 17,
    goalDifference: 12,
    points: 33,
    form: ['D', 'W', 'W', 'L', 'W'],
  },
  {
    position: 4,
    teamName: 'Sreenidi Deccan FC',
    isChurchill: false,
    crestUrl: '/images/opponents/sreenidi-deccan.svg',
    played: 17,
    won: 9,
    drawn: 4,
    lost: 4,
    goalsFor: 28,
    goalsAgainst: 19,
    goalDifference: 9,
    points: 31,
    form: ['W', 'L', 'W', 'D', 'W'],
  },
  {
    position: 5,
    teamName: 'Real Kashmir FC',
    isChurchill: false,
    crestUrl: '/images/opponents/real-kashmir.svg',
    played: 17,
    won: 8,
    drawn: 5,
    lost: 4,
    goalsFor: 23,
    goalsAgainst: 16,
    goalDifference: 7,
    points: 29,
    form: ['L', 'W', 'D', 'W', 'D'],
  },
  {
    position: 6,
    teamName: 'Sporting Clube de Goa',
    isChurchill: false,
    crestUrl: '/images/opponents/sporting-clube-de-goa.svg',
    played: 17,
    won: 7,
    drawn: 5,
    lost: 5,
    goalsFor: 22,
    goalsAgainst: 20,
    goalDifference: 2,
    points: 26,
    form: ['D', 'L', 'W', 'W', 'L'],
  },
];

export const LeagueStandings: React.FC = () => {
  return (
    <div className="bg-[#182236] border border-white/10 rounded-2xl overflow-hidden shadow-card">
      {/* Header */}
      <div className="p-6 sm:p-7 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
            <Trophy className="w-5 h-5 text-brandGold" />
          </div>
          <div>
            <h3 className="font-display font-black text-xl text-white uppercase tracking-wider">
              I-LEAGUE 2026-27 STANDINGS
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              Championship Phase • Matchday 17 of 22
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-brandGold font-display font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-[#1C273E] border border-white/10">
            <Award className="w-3.5 h-3.5 text-brandGold" />
            1st Place: AFC Continental Spot
          </span>
          <Link
            href="/matches"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 inline-flex items-center gap-1 transition"
          >
            <span>Full Table</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 uppercase font-mono text-[10px] tracking-wider bg-[#121826]/70">
              <th className="py-3 px-4 w-12 text-center">Pos</th>
              <th className="py-3 px-4">Club</th>
              <th className="py-3 px-2 text-center">PL</th>
              <th className="py-3 px-2 text-center hidden sm:table-cell">W</th>
              <th className="py-3 px-2 text-center hidden sm:table-cell">D</th>
              <th className="py-3 px-2 text-center hidden sm:table-cell">L</th>
              <th className="py-3 px-2 text-center hidden md:table-cell">GD</th>
              <th className="py-3 px-3 text-center font-bold text-white">PTS</th>
              <th className="py-3 px-4 text-center hidden lg:table-cell">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {STANDINGS_DATA.map((row) => (
              <tr
                key={row.position}
                className={`transition-colors ${
                  row.isChurchill
                    ? 'bg-primary/10 border-l-4 border-l-primary hover:bg-primary/15'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Position */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-display font-black text-xs ${
                      row.isChurchill
                        ? 'bg-primary text-white shadow-club'
                        : row.position <= 2
                        ? 'bg-brandGold/20 text-brandGold font-bold'
                        : 'text-zinc-400'
                    }`}
                  >
                    {row.position}
                  </span>
                </td>

                {/* Club Name & Crest */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    {row.isChurchill ? (
                      <ClubCrest size={28} />
                    ) : row.crestUrl ? (
                      <div className="relative w-6 h-6 shrink-0">
                        <Image
                          src={row.crestUrl}
                          alt={row.teamName}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-zinc-800" />
                    )}
                    <span
                      className={`font-display font-bold text-sm tracking-wide uppercase ${
                        row.isChurchill ? 'text-white' : 'text-zinc-200'
                      }`}
                    >
                      {row.teamName}
                    </span>
                    {row.isChurchill && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-primary text-[9px] font-display font-bold uppercase tracking-wider text-white">
                        THE RED MACHINES
                      </span>
                    )}
                  </div>
                </td>

                {/* Match Stats */}
                <td className="py-3.5 px-2 text-center text-zinc-300 font-mono">
                  {row.played}
                </td>
                <td className="py-3.5 px-2 text-center text-zinc-300 font-mono hidden sm:table-cell">
                  {row.won}
                </td>
                <td className="py-3.5 px-2 text-center text-zinc-300 font-mono hidden sm:table-cell">
                  {row.drawn}
                </td>
                <td className="py-3.5 px-2 text-center text-zinc-300 font-mono hidden sm:table-cell">
                  {row.lost}
                </td>
                <td className="py-3.5 px-2 text-center text-zinc-300 font-mono hidden md:table-cell">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>

                {/* Points */}
                <td className="py-3.5 px-3 text-center">
                  <span
                    className={`font-display font-black text-base ${
                      row.isChurchill ? 'text-white text-lg font-black' : 'text-zinc-100'
                    }`}
                  >
                    {row.points}
                  </span>
                </td>

                {/* Form Pills */}
                <td className="py-3.5 px-4 text-center hidden lg:table-cell">
                  <div className="flex items-center justify-center gap-1">
                    {row.form.map((res, i) => (
                      <span
                        key={i}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold font-mono text-white ${
                          res === 'W'
                            ? 'bg-emerald-600'
                            : res === 'D'
                            ? 'bg-amber-600'
                            : 'bg-red-600'
                        }`}
                        title={res === 'W' ? 'Won' : res === 'D' ? 'Drawn' : 'Lost'}
                      >
                        {res}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Notes */}
      <div className="p-3.5 bg-[#121826]/70 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Position 1: Qualifies for AFC Champions League 2 Preliminary Round</span>
        </div>
        <span className="font-mono text-zinc-500">Live points table updated after Matchday 17</span>
      </div>
    </div>
  );
};
