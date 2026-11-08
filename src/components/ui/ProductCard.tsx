'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const totalStock = product.variants.reduce((acc, v) => acc + v.demoStockQuantity, 0);
  const isOutOfStock = totalStock <= 0;

  return (
    <div className="group bg-darkSurface border border-zinc-800 hover:border-primary/60 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden flex flex-col justify-between">
      <div>
        {/* Image Area */}
        <Link href={`/shop/${product.slug}`} className="block relative aspect-square bg-zinc-950 overflow-hidden">
          <Image
            src={product.featuredImageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary text-white font-display font-bold text-[11px] uppercase tracking-wider shadow">
              {product.badge}
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
              <span className="px-3 py-1 rounded bg-red-900/90 text-white font-display font-bold text-xs uppercase tracking-wider border border-red-500">
                Out of Demo Stock
              </span>
            </div>
          )}
        </Link>

        {/* Content Area */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-brandGold">
              {product.categoryName}
            </span>
            <span className="text-[11px] text-zinc-500">
              {totalStock > 0 ? `${totalStock} in demo stock` : 'Restocking soon'}
            </span>
          </div>

          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display font-bold text-base text-white group-hover:text-primary transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Available Sizes preview */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.variants.map((v) => (
                <span
                  key={v.id}
                  className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    v.demoStockQuantity > 0
                      ? 'border-zinc-700 bg-zinc-900 text-zinc-300'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-600 line-through'
                  }`}
                >
                  {v.size}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="p-4 pt-0">
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-lg text-white">
              ₹{product.priceInr.toLocaleString('en-IN')}
            </span>
            {product.compareAtPriceInr && (
              <span className="text-xs text-zinc-500 line-through">
                ₹{product.compareAtPriceInr.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-primary text-white text-xs font-semibold transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select Size</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
