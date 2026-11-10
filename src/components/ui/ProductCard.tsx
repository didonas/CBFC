'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const totalStock = product.variants.reduce((acc, v) => acc + v.demoStockQuantity, 0);
  const isOutOfStock = totalStock <= 0;

  return (
    <div className="group bg-white border border-stone hover:border-burgundy/60 transition-all duration-200 rounded-sm shadow-editorial overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image Area */}
        <Link href={`/shop/${product.slug}`} className="block relative aspect-[4/5] bg-ivory-subtle overflow-hidden">
          <Image
            src={product.featuredImageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />

          {/* Promotional / Kit Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-burgundy text-white font-sans font-bold text-[10px] uppercase tracking-wider shadow-editorial">
              {product.badge}
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1 rounded-sm bg-white border border-stone text-ink font-sans font-bold text-xs uppercase tracking-wider">
                Out of Demo Stock
              </span>
            </div>
          )}
        </Link>

        {/* Content Area */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-sans font-bold uppercase tracking-wider text-burgundy text-[10px]">
              {product.categoryName}
            </span>
            <span className="text-[10px] text-muted">
              {totalStock > 0 ? `${totalStock} in stock` : 'Restocking soon'}
            </span>
          </div>

          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display font-bold text-sm text-ink group-hover:text-burgundy transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Available Sizes preview */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.variants.map((v) => (
                <span
                  key={v.id}
                  className={`text-[9px] font-sans font-semibold px-1.5 py-0.5 rounded-sm border ${
                    v.demoStockQuantity > 0
                      ? 'border-stone bg-ivory text-ink'
                      : 'border-stone-light bg-stone-subtle text-muted line-through'
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
        <div className="pt-2.5 border-t border-stone-subtle flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-stats font-black text-lg text-ink">
              ₹{product.priceInr.toLocaleString('en-IN')}
            </span>
            {product.compareAtPriceInr && (
              <span className="text-xs text-muted line-through">
                ₹{product.compareAtPriceInr.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-burgundy hover:bg-burgundy-hover text-white text-[11px] font-sans font-semibold uppercase tracking-wider transition shadow-editorial"
          >
            <span>View Kit</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
