'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Player, PlayerPosition } from '@/types';
import { Users, Plus, Edit2, Trash2, CheckCircle, Search, X } from 'lucide-react';

export default function AdminPlayersPage() {
  const { players, savePlayer, deletePlayer } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [shirtNumber, setShirtNumber] = useState<number>(10);
  const [position, setPosition] = useState<PlayerPosition>('Midfielder');
  const [nationality, setNationality] = useState('India');
  const [nationalityCode, setNationalityCode] = useState('IND');
  const [bio, setBio] = useState('');
  const [portraitUrl, setPortraitUrl] = useState('/images/players/sebastian-gutierrez.jpg');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const openAddModal = () => {
    setEditingPlayer(null);
    setFullName('');
    setShirtNumber(players.length + 1);
    setPosition('Midfielder');
    setNationality('India');
    setNationalityCode('IND');
    setBio('Talented Red Machines first-team squad player.');
    setPortraitUrl('/images/players/sebastian-gutierrez.jpg');
    setIsActive(true);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Player) => {
    setEditingPlayer(p);
    setFullName(p.fullName);
    setShirtNumber(p.shirtNumber);
    setPosition(p.position);
    setNationality(p.nationality);
    setNationalityCode(p.nationalityCode);
    setBio(p.bio);
    setPortraitUrl(p.portraitUrl);
    setIsActive(p.isActive);
    setIsFeatured(Boolean(p.isFeatured));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const slug = editingPlayer?.slug || fullName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const playerToSave: Player = {
      id: editingPlayer?.id || `p-${Date.now()}`,
      slug,
      fullName,
      shirtNumber: Number(shirtNumber),
      position,
      nationality,
      nationalityCode,
      bio,
      portraitUrl,
      isActive,
      isFeatured,
      stats: editingPlayer?.stats || {
        season: '2026-27',
        appearances: 0,
        goals: 0,
        assists: 0,
        yellowCards: 0,
        redCards: 0,
        minutesPlayed: 0,
      },
    };

    savePlayer(playerToSave);
    setIsModalOpen(false);
  };

  const filtered = players.filter((p) =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.shirtNumber.toString().includes(searchQuery) ||
    p.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Squad & Player Management"
        subtitle="Manage first-team registrations, shirt numbers, portraits and player biographies."
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-lightBorder shadow-card">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-mutedGrey absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-offWhite border border-lightBorder rounded pl-9 pr-4 py-2 text-xs text-charcoal focus:outline-none focus:border-primary transition"
            />
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Player</span>
          </button>
        </div>

        {/* Players Data Table */}
        <div className="bg-white border border-lightBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-lightBorder bg-offWhite text-mutedGrey font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">No.</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Nationality</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lightBorder text-charcoal">
                {filtered.map((player) => (
                  <tr key={player.id} className="hover:bg-offWhite/60 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden bg-offWhite border border-lightBorder shrink-0">
                        <Image src={player.portraitUrl} alt={player.fullName} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-charcoal block">{player.fullName}</span>
                        <span className="text-[10px] text-mutedGrey font-mono">/{player.slug}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-display font-bold text-charcoal text-base">
                      #{player.shirtNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-primary">
                      {player.position}
                    </td>
                    <td className="py-3 px-4 text-mutedGrey">
                      {player.nationality} ({player.nationalityCode})
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${player.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-offWhite text-mutedGrey'}`}>
                        {player.isActive ? 'Active' : 'Archived'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {player.isFeatured ? (
                        <span className="text-primary font-bold">★ Featured</span>
                      ) : (
                        <span className="text-mutedGrey">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(player)}
                        className="p-1.5 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal transition"
                        title="Edit player"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete player ${player.fullName}?`)) deletePlayer(player.id);
                        }}
                        className="p-1.5 rounded bg-offWhite hover:bg-red-50 border border-lightBorder text-red-600 transition"
                        title="Delete player"
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-lightBorder shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-lightBorder pb-3">
              <h3 className="font-display font-black text-xl text-charcoal uppercase">
                {editingPlayer ? 'Edit Player' : 'Register New Player'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-mutedGrey hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-charcoal font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Shirt Number *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={99}
                    value={shirtNumber}
                    onChange={(e) => setShirtNumber(Number(e.target.value))}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Position *</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as PlayerPosition)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  >
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Nationality</label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-charcoal font-semibold mb-1">Code (e.g. IND)</label>
                  <input
                    type="text"
                    maxLength={3}
                    value={nationalityCode}
                    onChange={(e) => setNationalityCode(e.target.value.toUpperCase())}
                    className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Portrait Image Path</label>
                <input
                  type="text"
                  value={portraitUrl}
                  onChange={(e) => setPortraitUrl(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-charcoal">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Active Registration</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-primary font-semibold">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Feature on Homepage</span>
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
                  Save Player
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
