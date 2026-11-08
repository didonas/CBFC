'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Match, MatchStatus } from '@/types';
import { Calendar, Plus, Edit2, Trash2, X, CheckCircle, Clock } from 'lucide-react';

export default function AdminMatchesPage() {
  const { matches, saveMatch, deleteMatch } = useApp();
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [opponentName, setOpponentName] = useState('');
  const [opponentCrestUrl, setOpponentCrestUrl] = useState('/images/opponents/dempo-sc.svg');
  const [competition, setCompetition] = useState('I-League 2026-27');
  const [venueName, setVenueName] = useState('Fatorda Stadium, Margao');
  const [matchDate, setMatchDate] = useState('2026-11-25T19:00');
  const [isHomeMatch, setIsHomeMatch] = useState(true);
  const [status, setStatus] = useState<MatchStatus>('scheduled');
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [isTicketsAvailable, setIsTicketsAvailable] = useState(true);
  const [matchReport, setMatchReport] = useState('');

  const openAddModal = () => {
    setEditingMatch(null);
    setOpponentName('Dempo SC');
    setOpponentCrestUrl('/images/opponents/dempo-sc.svg');
    setCompetition('I-League 2026-27');
    setVenueName('Fatorda Stadium, Margao');
    setMatchDate('2026-12-15T19:00');
    setIsHomeMatch(true);
    setStatus('scheduled');
    setHomeScore(0);
    setAwayScore(0);
    setIsTicketsAvailable(true);
    setMatchReport('');
    setIsModalOpen(true);
  };

  const openEditModal = (m: Match) => {
    setEditingMatch(m);
    setOpponentName(m.opponentName);
    setOpponentCrestUrl(m.opponentCrestUrl);
    setCompetition(m.competition);
    setVenueName(m.venueName);
    setMatchDate(m.matchDate.substring(0, 16));
    setIsHomeMatch(m.isHomeMatch);
    setStatus(m.status);
    setHomeScore(m.homeScore ?? 0);
    setAwayScore(m.awayScore ?? 0);
    setIsTicketsAvailable(m.isTicketsAvailable);
    setMatchReport(m.matchReport || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opponentName.trim()) return;

    const slug = editingMatch?.slug || `cbfc-vs-${opponentName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const matchToSave: Match = {
      id: editingMatch?.id || `m-${Date.now()}`,
      slug,
      competition,
      season: '2026-27',
      matchday: editingMatch?.matchday || 22,
      opponentName,
      opponentCrestUrl,
      isHomeMatch,
      venueName,
      matchDate: new Date(matchDate).toISOString(),
      status,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore),
      isTicketsAvailable,
      matchReport,
      goalscorers: editingMatch?.goalscorers || [],
    };

    saveMatch(matchToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Match Schedule & Results Management"
        subtitle="Schedule upcoming fixtures, manage scorelines, update match reports and gate ticketing."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">
            Scheduled Matches: <strong className="text-white">{matches.length} fixtures</strong>
          </span>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Fixture</span>
          </button>
        </div>

        {/* Matches Table */}
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Fixture</th>
                  <th className="py-3 px-4">Competition</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Status / Score</th>
                  <th className="py-3 px-4">Tickets</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {matches.map((m) => (
                  <tr key={m.id} className="hover:bg-zinc-800/40 transition">
                    <td className="py-3 px-4">
                      <span className="font-bold text-white block">
                        Churchill Bros vs {m.opponentName}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {m.isHomeMatch ? 'Home Match' : 'Away Match'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-brandGold">
                      {m.competition}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(m.matchDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })} • {new Date(m.matchDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 truncate max-w-[150px]">
                      {m.venueName}
                    </td>
                    <td className="py-3 px-4">
                      {m.status === 'completed' ? (
                        <span className="font-display font-bold text-white text-sm">
                          {m.homeScore} - {m.awayScore} (FT)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold uppercase text-[10px]">
                          {m.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {m.isTicketsAvailable ? (
                        <span className="text-emerald-400 font-bold">Live Demo</span>
                      ) : (
                        <span className="text-zinc-500">Disabled</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(m)}
                        className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete fixture vs ${m.opponentName}?`)) deleteMatch(m.id);
                        }}
                        className="p-1.5 rounded bg-zinc-800 hover:bg-red-900/60 text-red-300 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Match Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkSurface border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-black text-xl text-white uppercase">
                {editingMatch ? 'Edit Match & Result' : 'Schedule Fixture'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Opponent Club *</label>
                  <input
                    type="text"
                    required
                    value={opponentName}
                    onChange={(e) => setOpponentName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Competition *</label>
                  <input
                    type="text"
                    required
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Match Date & Kickoff *</label>
                  <input
                    type="datetime-local"
                    required
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MatchStatus)}
                    className="w-full bg-darkSurface border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-xs"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="postponed">Postponed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Home Score</label>
                  <input
                    type="number"
                    min={0}
                    value={homeScore}
                    onChange={(e) => setHomeScore(Number(e.target.value))}
                    className="w-full bg-darkSurface border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Away Score</label>
                  <input
                    type="number"
                    min={0}
                    value={awayScore}
                    onChange={(e) => setAwayScore(Number(e.target.value))}
                    className="w-full bg-darkSurface border border-zinc-700 rounded-lg px-2 py-1.5 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Match Report</label>
                <textarea
                  rows={3}
                  value={matchReport}
                  onChange={(e) => setMatchReport(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  placeholder="Summary of goals, highlights, and team performance..."
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isHomeMatch}
                    onChange={(e) => setIsHomeMatch(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Is Home Match (Fatorda)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-brandGold font-semibold">
                  <input
                    type="checkbox"
                    checked={isTicketsAvailable}
                    onChange={(e) => setIsTicketsAvailable(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Enable Demo Tickets</span>
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold uppercase tracking-wider"
                >
                  Save Fixture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
