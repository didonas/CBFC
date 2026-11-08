'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Product } from '@/types';
import { ShoppingBag, Plus, Edit2, Trash2, X, Search, CheckCircle } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, saveProduct, deleteProduct } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('jerseys');
  const [categoryName, setCategoryName] = useState('Official Jerseys');
  const [priceInr, setPriceInr] = useState<number>(1699);
  const [compareAtPriceInr, setCompareAtPriceInr] = useState<number>(1999);
  const [description, setDescription] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('/images/products/home-jersey-2026-27.jpg');
  const [badge, setBadge] = useState('Matchday Edition');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCategoryId('jerseys');
    setCategoryName('Official Jerseys');
    setPriceInr(1699);
    setCompareAtPriceInr(1999);
    setDescription('High performance official club apparel.');
    setFeaturedImageUrl('/images/products/home-jersey-2026-27.jpg');
    setBadge('New Release');
    setIsActive(true);
    setIsFeatured(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategoryId(p.categoryId);
    setCategoryName(p.categoryName);
    setPriceInr(p.priceInr);
    setCompareAtPriceInr(p.compareAtPriceInr || 0);
    setDescription(p.description);
    setFeaturedImageUrl(p.featuredImageUrl);
    setBadge(p.badge || '');
    setIsActive(p.isActive);
    setIsFeatured(Boolean(p.isFeatured));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = editingProduct?.slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const productToSave: Product = {
      id: editingProduct?.id || `prod-${Date.now()}`,
      slug,
      name,
      categoryId,
      categoryName,
      priceInr: Number(priceInr),
      compareAtPriceInr: compareAtPriceInr ? Number(compareAtPriceInr) : undefined,
      description,
      featuredImageUrl,
      galleryImages: editingProduct?.galleryImages || [featuredImageUrl],
      isActive,
      isFeatured,
      badge: badge.trim() || undefined,
      variants: editingProduct?.variants || [
        { id: `v-${Date.now()}-s`, productId: `prod-${Date.now()}`, sku: `CBFC-NEW-S`, size: 'S', demoStockQuantity: 25 },
        { id: `v-${Date.now()}-m`, productId: `prod-${Date.now()}`, sku: `CBFC-NEW-M`, size: 'M', demoStockQuantity: 40 },
        { id: `v-${Date.now()}-l`, productId: `prod-${Date.now()}`, sku: `CBFC-NEW-L`, size: 'L', demoStockQuantity: 30 },
        { id: `v-${Date.now()}-xl`, productId: `prod-${Date.now()}`, sku: `CBFC-NEW-XL`, size: 'XL', demoStockQuantity: 15 },
      ],
    };

    saveProduct(productToSave);
    setIsModalOpen(false);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Merchandise Catalog Management"
        subtitle="Create, edit, and categorize official kits, apparel and fan merchandise."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          <button
            onClick={openAddModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Product</span>
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl overflow-hidden shadow-card">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Sizes & Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850 text-zinc-300">
                {filtered.map((prod) => {
                  const totalStock = prod.variants.reduce((acc, v) => acc + v.demoStockQuantity, 0);
                  return (
                    <tr key={prod.id} className="hover:bg-zinc-800/40 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                          <Image src={prod.featuredImageUrl} alt={prod.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-white block">{prod.name}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">/{prod.slug}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-brandGold">
                        {prod.categoryName}
                      </td>
                      <td className="py-3 px-4 font-display font-bold text-white text-base">
                        ₹{prod.priceInr.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-zinc-300 font-bold block">
                          {totalStock} in demo stock
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {prod.variants.map((v) => v.size).join(', ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${prod.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-500'}`}>
                          {prod.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {prod.isFeatured ? (
                          <span className="text-brandGold font-bold">★ Featured</span>
                        ) : (
                          <span className="text-zinc-600">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(prod)}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete product ${prod.name}?`)) deleteProduct(prod.id);
                          }}
                          className="p-1.5 rounded bg-zinc-800 hover:bg-red-900/60 text-red-300 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkSurface border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-black text-xl text-white uppercase">
                {editingProduct ? 'Edit Product' : 'Create Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      const catMap: Record<string, string> = {
                        jerseys: 'Official Jerseys',
                        training: 'Training Kits',
                        accessories: 'Fan Accessories',
                        'fan-merchandise': 'Fan Merchandise',
                      };
                      setCategoryName(catMap[e.target.value] || 'Merchandise');
                    }}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  >
                    <option value="jerseys">Official Jerseys</option>
                    <option value="training">Training Kits</option>
                    <option value="accessories">Fan Accessories</option>
                    <option value="fan-merchandise">Fan Merchandise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Promotional Badge</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                    placeholder="e.g. Official Match Kit"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={priceInr}
                    onChange={(e) => setPriceInr(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Compare At Price (₹)</label>
                  <input
                    type="number"
                    value={compareAtPriceInr}
                    onChange={(e) => setCompareAtPriceInr(Number(e.target.value))}
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
                <label className="block text-zinc-400 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Product Active in Megastore</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-brandGold font-semibold">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Feature on Homepage</span>
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
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
