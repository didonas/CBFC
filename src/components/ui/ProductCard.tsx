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
    <div className="group bg-white border border-lightBorder hover:border-primary hover:-translate-y-1 shadow-card hover:shadow-cardHover transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image Area */}
        <Link href={`/shop/${product.slug}`} className="block relative aspect-square bg-[#F3F2EE] overflow-hidden">
          <Image
            src={product.featuredImageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Promotional / Kit Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-primary text-white font-display font-bold text-[10px] uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3 py-1 rounded bg-charcoal text-white font-display font-bold text-xs uppercase tracking-wider">
                Out of Demo Stock
              </span>
            </div>
          )}
        </Link>

        {/* Content Area */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold uppercase tracking-wider text-primary text-[11px]">
              {product.categoryName}
            </span>
            <span className="text-[11px] text-mutedGrey">
              {totalStock > 0 ? `${totalStock} in stock` : 'Restocking soon'}
            </span>
          </div>

          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-display font-bold text-base text-charcoal group-hover:text-primary transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Available Sizes preview */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.variants.map((v) => (
                <span
                  key={v.id}
                  className={`text-[10px] font-semibold px-1.5 py-0.5 border ${
                    v.demoStockQuantity > 0
                      ? 'border-lightBorder bg-offWhite text-charcoal'
                      : 'border-lightBorder bg-zinc-100 text-zinc-400 line-through'
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
        <div className="pt-3 border-t border-lightBorder flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-xl text-charcoal">
              ₹{product.priceInr.toLocaleString('en-IN')}
            </span>
            {product.compareAtPriceInr && (
              <span className="text-xs text-mutedGrey line-through">
                ₹{product.compareAtPriceInr.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary hover:bg-deepRed text-white text-xs font-display font-bold uppercase tracking-wider transition shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
