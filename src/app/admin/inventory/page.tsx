'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Boxes, AlertTriangle, CheckCircle, Search, Save } from 'lucide-react';

export default function AdminInventoryPage() {
  const { products, updateProductStock } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Flattened variant inventory
  const allVariants: {
    productId: string;
    productName: string;
    productImage: string;
    variantId: string;
    sku: string;
    size: string;
    stock: number;
  }[] = [];

  products.forEach((p) => {
    p.variants.forEach((v) => {
      allVariants.push({
        productId: p.id,
        productName: p.name,
        productImage: p.featuredImageUrl,
        variantId: v.id,
        sku: v.sku,
        size: v.size,
        stock: v.demoStockQuantity,
      });
    });
  });

  const filtered = allVariants.filter(
    (v) =>
      v.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.size.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockChange = (variantId: string, newStock: number) => {
    updateProductStock(variantId, newStock);
    setFeedback(`Updated stock quantity.`);
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Demo Stock & Inventory Control"
        subtitle="Manage stock counts per product variant and replenish demonstration quantities."
      />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-lightBorder shadow-card">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-mutedGrey absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by SKU, product name, size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-offWhite border border-lightBorder rounded pl-9 pr-4 py-2 text-xs text-charcoal focus:outline-none focus:border-primary transition"
            />
          </div>

          {feedback && (
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              {feedback}
            </span>
          )}
        </div>

        {/* Inventory Table */}
        <div className="bg-white border border-lightBorder shadow-card overflow-hidden">
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-lightBorder bg-offWhite text-mutedGrey font-display uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Item & Product</th>
                  <th className="py-3 px-4">SKU</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Demo Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Restock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lightBorder text-charcoal">
                {filtered.map((item) => {
                  const isLow = item.stock < 15;
                  const isOut = item.stock <= 0;
                  return (
                    <tr key={item.variantId} className="hover:bg-offWhite/60 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-offWhite border border-lightBorder shrink-0">
                          <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                        </div>
                        <span className="font-bold text-charcoal max-w-xs truncate">{item.productName}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-mutedGrey">
                        {item.sku}
                      </td>
                      <td className="py-3 px-4 font-bold text-primary text-sm">
                        {item.size}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={0}
                            value={item.stock}
                            onChange={(e) => handleStockChange(item.variantId, Number(e.target.value))}
                            className="w-18 bg-offWhite border border-lightBorder rounded px-2.5 py-1 text-charcoal font-mono font-bold text-xs focus:outline-none focus:border-primary"
                          />
                          <span className="text-mutedGrey text-[10px]">units</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {isOut ? (
                          <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold uppercase">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase flex items-center gap-1 w-fit">
                            <AlertTriangle className="w-3 h-3" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase">
                            Optimal
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleStockChange(item.variantId, item.stock + 25)}
                          className="px-2.5 py-1 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal text-[11px] font-semibold transition"
                        >
                          +25 units
                        </button>
                        <button
                          onClick={() => handleStockChange(item.variantId, item.stock + 50)}
                          className="px-2.5 py-1 rounded bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 text-[11px] font-semibold transition"
                        >
                          +50 units
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
    </div>
  );
}
