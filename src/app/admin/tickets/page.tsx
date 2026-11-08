'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { TicketCategory } from '@/types';
import { Ticket, Plus, Edit2, Trash2, X, Users, DollarSign } from 'lucide-react';

export default function AdminTicketsPage() {
  const { ticketCategories, matches, saveTicketCategory } = useApp();
  const [editingCat, setEditingCat] = useState<TicketCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [matchId, setMatchId] = useState(matches[0]?.id || '');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceInr, setPriceInr] = useState<number>(150);
  const [demoCapacity, setDemoCapacity] = useState<number>(500);
  const [demoAvailable, setDemoAvailable] = useState<number>(500);
  const [gateEntry, setGateEntry] = useState('Gate 3-4');

  const openAddModal = () => {
    setEditingCat(null);
    setMatchId(matches[0]?.id || '');
    setName('General Stand (North Tier)');
    setDescription('Open supporter stand behind the goal.');
    setPriceInr(150);
    setDemoCapacity(400);
    setDemoAvailable(400);
    setGateEntry('Gates 3 & 4');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: TicketCategory) => {
    setEditingCat(cat);
    setMatchId(cat.matchId);
    setName(cat.name);
    setDescription(cat.description);
    setPriceInr(cat.priceInr);
    setDemoCapacity(cat.demoCapacity);
    setDemoAvailable(cat.demoAvailable);
    setGateEntry(cat.gateEntry);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const catToSave: TicketCategory = {
      id: editingCat?.id || `tc-${Date.now()}`,
      matchId,
      name,
      description,
      priceInr: Number(priceInr),
      demoCapacity: Number(demoCapacity),
      demoAvailable: Number(demoAvailable),
      gateEntry,
    };

    saveTicketCategory(catToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Ticket Categories & Gate Capacity"
        subtitle="Manage matchday ticket tiers, demo seat allocations, sample prices and gate entrances."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">
            Active Stand Categories: <strong className="text-white">{ticketCategories.length} categories</strong>
          </span>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Stand Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ticketCategories.map((cat) => {
            const match = matches.find((m) => m.id === cat.matchId);
            return (
              <div
                key={cat.id}
                className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-[10px] uppercase font-bold text-brandGold block truncate max-w-[180px]">
                      {match ? `vs ${match.opponentName}` : 'Match Fixture'}
                    </span>
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-display font-black text-xl text-white uppercase mt-3">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                    {cat.gateEntry}
                  </span>

                  <p className="mt-3 text-xs text-zinc-400 line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-zinc-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Sample Price:</span>
                      <span className="font-display font-black text-base text-white">
                        ₹{cat.priceInr}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Demo Availability:</span>
                      <span className="font-bold text-emerald-400">
                        {cat.demoAvailable} / {cat.demoCapacity} seats
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkSurface border border-zinc-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-black text-xl text-white uppercase">
                {editingCat ? 'Edit Ticket Category' : 'Create Stand Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Associated Match Fixture *</label>
                <select
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                >
                  {matches.map((m) => (
                    <option key={m.id} value={m.id}>
                      CBFC vs {m.opponentName} ({m.competition})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Category / Stand Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. VIP Hospitality (West Stand)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={priceInr}
                    onChange={(e) => setPriceInr(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Gate Entry Info</label>
                  <input
                    type="text"
                    value={gateEntry}
                    onChange={(e) => setGateEntry(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                    placeholder="Gates 1 & 2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Demo Total Capacity</label>
                  <input
                    type="number"
                    min={1}
                    value={demoCapacity}
                    onChange={(e) => setDemoCapacity(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Demo Available Seats</label>
                  <input
                    type="number"
                    min={0}
                    value={demoAvailable}
                    onChange={(e) => setDemoAvailable(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
