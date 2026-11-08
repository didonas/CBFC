'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ui/ProductCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { ShoppingBag, ShieldAlert, Filter, Search } from 'lucide-react';

export default function ShopPage() {
  const { products } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', name: 'All Collections' },
    { id: 'jerseys', name: 'Official Jerseys' },
    { id: 'training', name: 'Training Kits' },
    { id: 'accessories', name: 'Fan Accessories' },
    { id: 'fan-merchandise', name: 'Fan Merchandise' },
  ];

  // Filtering
  const filteredProducts = products
    .filter((p) => {
      if (!p.isActive) return false;
      const matchesCat =
        selectedCategory === 'All' || p.categoryId === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.priceInr - b.priceInr;
      if (sortBy === 'price-high') return b.priceInr - a.priceInr;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Header */}
      <div className="bg-white border border-lightBorder p-8 sm:p-10 shadow-card space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-xs font-display font-bold uppercase tracking-widest text-primary">
          <ShoppingBag className="w-3.5 h-3.5" />
          OFFICIAL CLUB MERCHANDISE • 2026/27 RANGE
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight leading-none">
          THE RED MACHINES MEGASTORE
        </h1>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl leading-relaxed">
          Engineered by Nivia with performance jacquard fabrics and authentic club crests. Browse official jerseys, training apparel, and supporter accessories.
        </p>

        {/* Mandatory Demo Banner */}
        <div className="p-4 rounded bg-offWhite border border-primary/30 flex items-start sm:items-center gap-3 text-xs text-charcoal">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-primary uppercase font-bold">DEMO E-COMMERCE SIMULATION: </strong>
            All checkouts and product orders are simulated within the application. No payment is collected and no physical parcels will be dispatched.
          </p>
        </div>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-4 border border-lightBorder shadow-card">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-offWhite text-charcoal hover:bg-zinc-100 border border-lightBorder'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort Dropdowns */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-mutedGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-offWhite border border-lightBorder pl-9 pr-4 py-2 text-xs text-charcoal placeholder-mutedGrey focus:outline-none focus:border-primary transition font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-primary shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-offWhite border border-lightBorder px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-primary transition font-medium"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="bg-white border border-lightBorder p-12 text-center text-mutedGrey shadow-card">
          <p className="text-base font-bold text-charcoal">No products found</p>
          <p className="text-xs mt-1">Try selecting another collection or clearing search terms.</p>
        </div>
      )}
    </div>
  );
}
