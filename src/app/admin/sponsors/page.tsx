'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SPONSORS } from '@/lib/demo-data';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Sponsor } from '@/types';
import { Award, Plus, Trash2, Edit2, X, ExternalLink } from 'lucide-react';

export default function AdminSponsorsPage() {
  const [sponsorsList, setSponsorsList] = useState<Sponsor[]>(SPONSORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);

  const [name, setName] = useState('');
  const [tier, setTier] = useState<'Principal' | 'Kit Manufacturer' | 'Official Partner' | 'Associate Partner'>('Official Partner');
  const [logoUrl, setLogoUrl] = useState('/images/sponsors/nivia.svg');
  const [websiteUrl, setWebsiteUrl] = useState('https://churchillbrothers.com');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingSponsor(null);
    setName('');
    setTier('Official Partner');
    setLogoUrl('/images/sponsors/nivia.svg');
    setWebsiteUrl('https://churchillbrothers.com');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (sp: Sponsor) => {
    setEditingSponsor(sp);
    setName(sp.name);
    setTier(sp.tier);
    setLogoUrl(sp.logoUrl);
    setWebsiteUrl(sp.websiteUrl);
    setDescription(sp.description);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingSponsor) {
      setSponsorsList((prev) =>
        prev.map((s) => (s.id === editingSponsor.id ? { ...s, name, tier, logoUrl, websiteUrl, description } : s))
      );
    } else {
      const newSponsor: Sponsor = {
        id: `sp-${Date.now()}`,
        name,
        tier,
        logoUrl,
        websiteUrl,
        description,
      };
      setSponsorsList((prev) => [...prev, newSponsor]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove sponsor?')) {
      setSponsorsList((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Commercial Partners & Sponsors"
        subtitle="Manage principal club sponsors, technical equipment suppliers and associate brands."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-white p-4 border border-lightBorder shadow-card">
          <span className="text-xs text-mutedGrey font-semibold">
            Active Partners: <strong className="text-charcoal">{sponsorsList.length} partners</strong>
          </span>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsList.map((sp) => (
            <div
              key={sp.id}
              className="bg-white border border-lightBorder shadow-card p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-lightBorder">
                  <span className="text-[10px] uppercase font-bold text-primary px-2 py-0.5 rounded bg-offWhite border border-lightBorder">
                    {sp.tier}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(sp)}
                      className="p-1.5 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sp.id)}
                      className="p-1.5 rounded bg-offWhite hover:bg-red-50 border border-lightBorder text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full h-16 bg-offWhite rounded p-2 border border-lightBorder mt-3">
                  <Image src={sp.logoUrl} alt={sp.name} fill className="object-contain p-2" />
                </div>

                <h3 className="font-display font-black text-xl text-charcoal uppercase mt-4">
                  {sp.name}
                </h3>
                <p className="mt-2 text-xs text-mutedGrey leading-relaxed">
                  {sp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-lightBorder">
                <a
                  href={sp.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-lightBorder shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-lightBorder pb-3">
              <h3 className="font-display font-black text-xl text-charcoal uppercase">
                {editingSponsor ? 'Edit Partner' : 'Add Partner'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-mutedGrey hover:text-charcoal">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-charcoal font-semibold mb-1">Company / Partner Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Partnership Tier</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                >
                  <option value="Principal">Principal Partner</option>
                  <option value="Kit Manufacturer">Kit Manufacturer</option>
                  <option value="Official Partner">Official Partner</option>
                  <option value="Associate Partner">Associate Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Logo URL</label>
                <input
                  type="text"
                  required
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2 text-charcoal focus:outline-none focus:border-primary"
                />
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
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
