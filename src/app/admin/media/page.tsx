'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INITIAL_MEDIA_GALLERY } from '@/lib/demo-data';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MediaAsset } from '@/types';
import { Image as ImageIcon, Plus, Trash2, X } from 'lucide-react';

export default function AdminMediaPage() {
  const [gallery, setGallery] = useState<MediaAsset[]>(INITIAL_MEDIA_GALLERY);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Matchday' | 'Training' | 'Kit Launch' | 'Club Heritage' | 'Events'>('Matchday');
  const [mediaUrl, setMediaUrl] = useState('/images/kits/home_jersey_promo.png');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('November 2026');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMedia: MediaAsset = {
      id: `media-${Date.now()}`,
      title,
      category,
      mediaUrl,
      caption,
      date,
    };

    setGallery((prev) => [newMedia, ...prev]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this photo asset?')) {
      setGallery((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Photo & Media Archive CMS"
        subtitle="Upload and categorize matchday photography, training snapshots and historical club archives."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">
            Cataloged Assets: <strong className="text-white">{gallery.length} photographs</strong>
          </span>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo Asset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="bg-darkSurface border border-zinc-800 rounded-2xl overflow-hidden shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-zinc-950">
                  <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 text-brandGold text-[10px] font-bold uppercase backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-display font-bold text-base text-white uppercase">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-mono block">{item.date}</span>
                  {item.caption && (
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 flex justify-end">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-300 transition text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkSurface border border-zinc-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-black text-xl text-white uppercase">
                Add Photography Asset
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. Fatorda Stadium Evening Match"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Matchday">Matchday</option>
                    <option value="Training">Training</option>
                    <option value="Kit Launch">Kit Launch</option>
                    <option value="Club Heritage">Club Heritage</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Image URL Path</label>
                <input
                  type="text"
                  required
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Caption</label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
