'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { Trophy, ChevronRight, Award } from 'lucide-react';

interface StandingRow {
  position: number;
  teamName: string;
  crestUrl?: string;
  isChurchill?: boolean;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

const STANDINGS_DATA: StandingRow[] = [
  {
    position: 1,
    teamName: 'Churchill Brothers FC',
    isChurchill: true,
    played: 17,
    won: 11,
    drawn: 5,
    lost: 1,
    goalDifference: +18,
    points: 38,
    form: ['W', 'W', 'D', 'W', 'W'],
  },
  {
    position: 2,
    teamName: 'Sreenidi Deccan FC',
    crestUrl: '/images/opponents/sreenidi-deccan.svg',
    played: 17,
    won: 10,
    drawn: 4,
    lost: 3,
    goalDifference: +14,
    points: 34,
    form: ['W', 'D', 'W', 'L', 'W'],
  },
  {
    position: 3,
    teamName: 'Dempo SC',
    crestUrl: '/images/opponents/dempo-sc.svg',
    played: 17,
    won: 9,
    drawn: 5,
    lost: 3,
    goalDifference: +11,
    points: 32,
    form: ['W', 'W', 'D', 'W', 'L'],
  },
  {
    position: 4,
    teamName: 'Gokulam Kerala FC',
    crestUrl: '/images/opponents/gokulam-kerala.svg',
    played: 17,
    won: 9,
    drawn: 4,
    lost: 4,
    goalDifference: +9,
    points: 31,
    form: ['D', 'W', 'W', 'L', 'W'],
  },
  {
    position: 5,
    teamName: 'Real Kashmir FC',
    crestUrl: '/images/opponents/real-kashmir.svg',
    played: 17,
    won: 8,
    drawn: 5,
    lost: 4,
    goalDifference: +6,
    points: 29,
    form: ['W', 'L', 'D', 'W', 'D'],
  },
  {
    position: 6,
    teamName: 'Inter Kashi',
    crestUrl: '/images/opponents/inter-kashi.svg',
    played: 17,
    won: 7,
    drawn: 6,
    lost: 4,
    goalDifference: +4,
    points: 27,
    form: ['D', 'W', 'L', 'D', 'W'],
  },
];

export const LeagueStandings: React.FC = () => {
  return (
    <div className="bg-white border border-stone rounded-sm shadow-editorial overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-stone flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-burgundy/10 text-burgundy flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-ink uppercase tracking-tight">
              I-League 2026–27 Standings
            </h3>
            <span className="text-xs text-muted font-sans font-medium">
              Championship Phase • Matchday 17 of 22
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-ink font-sans font-medium px-2.5 py-1 rounded-sm bg-ivory border border-stone">
            <Award className="w-3.5 h-3.5 text-brandGold" />
            1st Place: AFC Champions League 2
          </span>
          <Link
            href="/matches"
            className="text-xs font-sans font-bold uppercase tracking-wider text-burgundy hover:underline inline-flex items-center gap-1 transition"
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
            <tr className="border-b border-stone text-muted uppercase font-sans text-[10px] tracking-wider bg-ivory">
              <th className="py-2.5 px-4 w-12 text-center">Pos</th>
              <th className="py-2.5 px-4">Club</th>
              <th className="py-2.5 px-2 text-center">PL</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">W</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">D</th>
              <th className="py-2.5 px-2 text-center hidden sm:table-cell">L</th>
              <th className="py-2.5 px-2 text-center hidden md:table-cell">GD</th>
              <th className="py-2.5 px-3 text-center font-bold text-ink">PTS</th>
              <th className="py-2.5 px-4 text-center hidden lg:table-cell">Form</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-subtle font-sans">
            {STANDINGS_DATA.map((row) => (
              <tr
                key={row.position}
                className={`transition-colors ${
                  row.isChurchill
                    ? 'bg-burgundy/5 border-l-2 border-l-burgundy font-semibold'
                    : 'hover:bg-ivory-subtle'
                }`}
              >
                {/* Position */}
                <td className="py-3 px-4 text-center">
                  <span
                    className={`font-stats font-bold text-sm ${
                      row.isChurchill ? 'text-burgundy' : 'text-muted'
                    }`}
                  >
                    {row.position}
                  </span>
                </td>

                {/* Club Name & Crest */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    {row.isChurchill ? (
                      <ClubCrest size={22} />
                    ) : row.crestUrl ? (
                      <div className="relative w-5 h-5 shrink-0">
                        <Image
                          src={row.crestUrl}
                          alt={row.teamName}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-stone" />
                    )}
                    <span
                      className={`font-sans text-xs sm:text-sm ${
                        row.isChurchill ? 'font-bold text-ink' : 'font-medium text-ink/80'
                      }`}
                    >
                      {row.teamName}
                    </span>
                    {row.isChurchill && (
                      <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-sm bg-burgundy text-[8px] font-sans font-bold uppercase tracking-wider text-white">
                        THE RED MACHINES
                      </span>
                    )}
                  </div>
                </td>

                {/* Match Stats */}
                <td className="py-3 px-2 text-center text-muted font-stats text-sm">
                  {row.played}
                </td>
                <td className="py-3 px-2 text-center text-muted font-stats text-sm hidden sm:table-cell">
                  {row.won}
                </td>
                <td className="py-3 px-2 text-center text-muted font-stats text-sm hidden sm:table-cell">
                  {row.drawn}
                </td>
                <td className="py-3 px-2 text-center text-muted font-stats text-sm hidden sm:table-cell">
                  {row.lost}
                </td>
                <td className="py-3 px-2 text-center text-muted font-stats text-sm hidden md:table-cell">
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>

                {/* Points */}
                <td className="py-3 px-3 text-center">
                  <span
                    className={`font-stats font-black text-base ${
                      row.isChurchill ? 'text-burgundy text-lg' : 'text-ink'
                    }`}
                  >
                    {row.points}
                  </span>
                </td>

                {/* Form Pills */}
                <td className="py-3 px-4 text-center hidden lg:table-cell">
                  <div className="flex items-center justify-center gap-1 font-stats text-xs font-bold">
                    {row.form.map((res, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 rounded-sm flex items-center justify-center text-[9px] text-white ${
                          res === 'W'
                            ? 'bg-emerald-600'
                            : res === 'D'
                            ? 'bg-amber-600'
                            : 'bg-stone-dark'
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
      <div className="p-3 bg-ivory border-t border-stone flex flex-wrap items-center justify-between text-[11px] text-muted gap-2 font-sans">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Position 1: Qualifies for AFC Champions League 2 Preliminary Round</span>
        </div>
        <span className="text-[10px]">Updated after Matchday 17</span>
      </div>
    </div>
  );
};
