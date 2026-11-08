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
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Match Schedule & Results Management"
        subtitle="Schedule upcoming fixtures, manage scorelines, update match reports and gate ticketing."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-white p-4 border border-lightBorder shadow-card">
          <span className="text-xs text-mutedGrey font-semibold">
            Scheduled Matches: <strong className="text-charcoal">{matches.length} fixtures</strong>
          </span>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Fixture</span>
          </button>
        </div>

        {/* Matches Table */}
        <div className="bg-white border border-lightBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-lightBorder bg-offWhite text-mutedGrey font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Fixture</th>
                  <th className="py-3 px-4">Competition</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Status / Score</th>
                  <th className="py-3 px-4">Tickets</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lightBorder text-charcoal">
                {matches.map((m) => (
                  <tr key={m.id} className="hover:bg-offWhite/60 transition">
                    <td className="py-3 px-4">
                      <span className="font-bold text-charcoal block">
                        Churchill Bros vs {m.opponentName}
                      </span>
                      <span className="text-[10px] text-mutedGrey font-mono">
                        {m.isHomeMatch ? 'Home Match' : 'Away Match'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-primary">
                      {m.competition}
                    </td>
                    <td className="py-3 px-4 text-mutedGrey">
                      {new Date(m.matchDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })} • {new Date(m.matchDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 truncate max-w-[150px] text-mutedGrey">
                      {m.venueName}
                    </td>
                    <td className="py-3 px-4">
                      {m.status === 'completed' ? (
                        <span className="font-display font-bold text-charcoal text-sm">
                          {m.homeScore} - {m.awayScore} (FT)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-offWhite border border-lightBorder text-charcoal font-bold uppercase text-[10px]">
                          {m.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {m.isTicketsAvailable ? (
                        <span className="text-emerald-700 font-bold">Live Demo</span>
                      ) : (
                        <span className="text-mutedGrey">Disabled</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(m)}
                        className="p-1.5 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete fixture vs ${m.opponentName}?`)) deleteMatch(m.id);
                        }}
                        className="p-1.5 rounded bg-offWhite hover:bg-red-50 border border-lightBorder text-red-600 transition"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-lightBorder shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lightBorder pb-3">
              <h3 className="font-display font-black text-xl text-charcoal uppercase">
                {editingMatch ? 'Edit Match & Result' : 'Schedule Fixture'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-mutedGrey hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Opponent Club *</label>
                  <input
                    type="text"
                    required
                    value={opponentName}
                    onChange={(e) => setOpponentName(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Competition *</label>
                  <input
                    type="text"
                    required
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Match Date & Kickoff *</label>
                  <input
                    type="datetime-local"
                    required
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Venue Name *</label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-offWhite p-4 border border-lightBorder">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MatchStatus)}
                    className="w-full bg-white border border-lightBorder rounded px-2 py-1.5 text-charcoal text-xs"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="postponed">Postponed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-1">Home Score</label>
                  <input
                    type="number"
                    min={0}
                    value={homeScore}
                    onChange={(e) => setHomeScore(Number(e.target.value))}
                    className="w-full bg-white border border-lightBorder rounded px-2 py-1.5 text-charcoal text-xs"
                  />
                </div>

                <div>
                  <label className="block text-charcoal font-semibold mb-1">Away Score</label>
                  <input
                    type="number"
                    min={0}
                    value={awayScore}
                    onChange={(e) => setAwayScore(Number(e.target.value))}
                    className="w-full bg-white border border-lightBorder rounded px-2 py-1.5 text-charcoal text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Match Report</label>
                <textarea
                  rows={3}
                  value={matchReport}
                  onChange={(e) => setMatchReport(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  placeholder="Summary of goals, highlights, and team performance..."
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-charcoal">
                  <input
                    type="checkbox"
                    checked={isHomeMatch}
                    onChange={(e) => setIsHomeMatch(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Is Home Match (Fatorda)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-primary font-semibold">
                  <input
                    type="checkbox"
                    checked={isTicketsAvailable}
                    onChange={(e) => setIsTicketsAvailable(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Enable Demo Tickets</span>
                </label>
              </div>

              <div className="pt-4 border-t border-lightBorder flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-primary hover:bg-deepRed text-white font-display font-bold uppercase tracking-wider"
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
