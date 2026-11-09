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
    <div className="group bg-[#182236] border border-white/10 hover:border-primary/50 hover:-translate-y-1 shadow-card hover:shadow-cardHover transition-all duration-200 rounded-2xl overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image Area */}
        <Link href={`/shop/${product.slug}`} className="block relative aspect-[4/5] bg-[#121826] overflow-hidden">
          <Image
            src={product.featuredImageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Promotional / Kit Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary text-white font-display font-bold text-[10px] uppercase tracking-wider shadow-club">
              {product.badge}
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1 rounded bg-[#182236] border border-white/10 text-white font-display font-bold text-xs uppercase tracking-wider">
                Out of Demo Stock
              </span>
            </div>
          )}
        </Link>

        {/* Content Area */}
        <div className="p-5">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold uppercase tracking-wider text-primary text-[11px]">
              {product.categoryName}
            </span>
            <span className="text-[11px] text-zinc-400">
              {totalStock > 0 ? `${totalStock} in stock` : 'Restocking soon'}
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
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    v.demoStockQuantity > 0
                      ? 'border-white/10 bg-[#0D0F15] text-zinc-200'
                      : 'border-white/5 bg-black/40 text-zinc-600 line-through'
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
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-xl text-white">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary hover:bg-deepRed text-white text-xs font-display font-bold uppercase tracking-wider transition shadow-sm"
          >
            <span>View Kit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
