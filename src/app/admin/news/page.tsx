'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Post } from '@/types';
import { Newspaper, Plus, Edit2, Trash2, X, CheckCircle, Clock } from 'lucide-react';

export default function AdminNewsPage() {
  const { news, saveNewsPost, deleteNewsPost } = useApp();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Match Report' | 'Club News' | 'Press Release' | 'Interview' | 'Academy'>('Club News');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('/images/kits/home_jersey_promo.png');
  const [authorName, setAuthorName] = useState('CBFC Media Team');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const openAddModal = () => {
    setEditingPost(null);
    setTitle('');
    setCategory('Club News');
    setExcerpt('');
    setContent('');
    setFeaturedImageUrl('/images/kits/home_jersey_promo.png');
    setAuthorName('CBFC Media Team');
    setIsPublished(true);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Post) => {
    setEditingPost(p);
    setTitle(p.title);
    setCategory(p.category);
    setExcerpt(p.excerpt);
    setContent(p.content);
    setFeaturedImageUrl(p.featuredImageUrl);
    setAuthorName(p.authorName);
    setIsPublished(p.isPublished);
    setIsFeatured(Boolean(p.isFeatured));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = editingPost?.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const postToSave: Post = {
      id: editingPost?.id || `post-${Date.now()}`,
      slug,
      title,
      category,
      excerpt,
      content,
      featuredImageUrl,
      authorName,
      isPublished,
      isFeatured,
      publishedAt: editingPost?.publishedAt || new Date().toISOString(),
      readTimeMinutes: Math.max(2, Math.round(content.length / 500)),
    };

    saveNewsPost(postToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="News & Editorial CMS"
        subtitle="Publish match reports, club statements, interviews, and academy bulletins."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">
            Total Articles: <strong className="text-white">{news.length} stories</strong>
          </span>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </button>
        </div>

        {/* News Table */}
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Story Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-800/40 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="relative w-12 h-8 rounded overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                        <Image src={item.featuredImageUrl} alt={item.title} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-white max-w-sm truncate">{item.title}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-brandGold">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      {item.authorName}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.isPublished ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-500'}`}>
                        {item.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete article "${item.title}"?`)) deleteNewsPost(item.id);
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

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkSurface border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-black text-xl text-white uppercase">
                {editingPost ? 'Edit Article' : 'Compose News Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Headline Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
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
                    <option value="Match Report">Match Report</option>
                    <option value="Club News">Club News</option>
                    <option value="Interview">Interview</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Academy">Academy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Summary / Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Article Content</label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-brandGold font-semibold">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Featured Headline</span>
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
                  Save Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
