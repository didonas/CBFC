'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { PlayerPosition } from '@/types';
import { Search, Filter, Users, UserCheck } from 'lucide-react';
import { STAFF_MEMBERS } from '@/lib/demo-data';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

export default function TeamPage() {
  const { players } = useApp();
  const [selectedPosition, setSelectedPosition] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const positions: ('All' | PlayerPosition)[] = [
    'All',
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Forward',
  ];

  const filteredPlayers = players.filter((player) => {
    if (!player.isActive) return false;
    const matchesPos =
      selectedPosition === 'All' || player.position === selectedPosition;
    const matchesSearch =
      player.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.shirtNumber.toString().includes(searchQuery) ||
      player.nationality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPos && matchesSearch;
  });

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-display font-bold uppercase tracking-widest text-brandGold">
          <Users className="w-3.5 h-3.5" />
          FIRST-TEAM SQUAD • 2026/27 CAMPAIGN
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          THE RED MACHINES SQUAD
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Meet the players representing Churchill Brothers FC Goa. A blend of Goan local heroes, national prospects, and international firepower.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-darkSurface p-4 rounded-2xl border border-zinc-800">
        {/* Position Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition ${
                selectedPosition === pos
                  ? 'bg-primary text-white shadow-club'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
              }`}
            >
              {pos === 'All' ? 'All Squad' : `${pos}s`}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, number, nation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition"
          />
        </div>
      </div>

      {/* Players Grid */}
      {filteredPlayers.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <StaggerItem key={player.id}>
              <PlayerCard player={player} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
          <p className="text-base font-semibold text-white">No players found</p>
          <p className="text-xs mt-1">Try adjusting your position filter or search keywords.</p>
        </div>
      )}

      {/* Coaching & Technical Staff Section */}
      <div className="pt-12 border-t border-zinc-800 space-y-8">
        <div>
          <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
            TECHNICAL LEADERSHIP
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            COACHING & MANAGEMENT STAFF
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {STAFF_MEMBERS.map((staff) => (
            <div
              key={staff.id}
              className="bg-darkSurface border border-zinc-800 rounded-2xl p-5 shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-brandGold mb-3">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  {staff.fullName}
                </h3>
                <span className="text-xs font-bold text-primary block mt-0.5">
                  {staff.role}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mt-0.5">
                  {staff.category} • {staff.nationality}
                </span>
                <p className="mt-3 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {staff.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
