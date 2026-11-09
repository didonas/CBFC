'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products, addToCart } = useApp();

  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4 bg-[#121826] text-white">
        <h1 className="font-display font-black text-3xl text-white">Product Not Found</h1>
        <p className="text-slate-400 text-sm">This merchandise item does not exist in our catalog.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Megastore</span>
        </Link>
      </div>
    );
  }

  const currentImage = selectedImage || product.featuredImageUrl;
  const gallery = product.galleryImages?.length ? product.galleryImages : [product.featuredImageUrl];

  // Auto-select first in-stock size if not set
  const inStockVariants = product.variants.filter((v) => v.demoStockQuantity > 0);
  const activeSize = selectedSize || inStockVariants[0]?.size || product.variants[0]?.size || 'M';
  const activeVariant = product.variants.find((v) => v.size === activeSize);
  const isOutOfStock = !activeVariant || activeVariant.demoStockQuantity <= 0;

  const handleAddToCart = () => {
    setFeedback(null);
    if (!activeSize) {
      setFeedback({ type: 'error', message: 'Please select a size.' });
      return;
    }
    const res = addToCart(product, activeSize, quantity);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#121826] text-slate-100">
      {/* Back button */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Merchandise Megastore</span>
        </Link>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Display */}
          <div className="relative aspect-square w-full bg-[#182236] border border-white/10 rounded-2xl shadow-card overflow-hidden">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 bg-[#182236] ${
                    currentImage === img
                      ? 'border-primary ring-2 ring-primary/40'
                      : 'border-white/10 hover:border-slate-400'
                  }`}
                >
                  <Image src={img} alt={`${product.name} preview ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details, Sizes, Add to Cart */}
        <div className="lg:col-span-5 bg-[#182236] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-primary block">
              {product.categoryName}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-snug">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-display font-black text-3xl text-white">
                ₹{product.priceInr.toLocaleString('en-IN')}
              </span>
              {product.compareAtPriceInr && (
                <span className="text-base text-zinc-500 line-through">
                  ₹{product.compareAtPriceInr.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                In Stock (Demo)
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                Select Size: <strong className="text-primary">{activeSize}</strong>
              </span>

              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-primary hover:underline inline-flex items-center gap-1 font-bold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.variants.map((v) => {
                const isSelected = v.size === activeSize;
                const isOut = v.demoStockQuantity <= 0;

                return (
                  <button
                    key={v.id}
                    disabled={isOut}
                    onClick={() => {
                      setSelectedSize(v.size);
                      setFeedback(null);
                    }}
                    className={`py-3 rounded-lg font-display font-black text-sm uppercase transition flex flex-col items-center justify-center border ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-club'
                        : isOut
                        ? 'border-white/5 bg-[#121826] text-slate-600 line-through cursor-not-allowed'
                        : 'border-white/10 bg-[#1C273E] text-slate-200 hover:border-white/30'
                    }`}
                  >
                    <span>{v.size}</span>
                    <span className="text-[9px] font-mono mt-0.5 opacity-80">
                      {isOut ? '0 left' : `${v.demoStockQuantity} left`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-white/10 bg-[#1C273E] rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white hover:bg-[#252E44] transition font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 font-display font-black text-base text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(activeVariant?.demoStockQuantity || 10, quantity + 1))}
                  className="px-4 py-2 text-white hover:bg-[#252E44] transition font-bold"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-zinc-400 font-medium">
                {activeVariant ? `(${activeVariant.demoStockQuantity} demo items remaining)` : ''}
              </span>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/70 border-emerald-700 text-emerald-200'
                  : 'bg-red-950/70 border-red-700 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
              {feedback.type === 'success' && (
                <Link
                  href="/cart"
                  className="underline font-bold text-primary hover:text-red-400 shrink-0"
                >
                  View Cart →
                </Link>
              )}
            </div>
          )}

          {/* Add to Cart CTA */}
          <div className="pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="w-full py-4 rounded-lg bg-primary hover:bg-deepRed disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-display font-black text-sm uppercase tracking-widest transition shadow-club flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isOutOfStock ? 'OUT OF DEMO STOCK' : 'ADD TO BAG'}</span>
            </button>
          </div>

          {/* Simulated Policies Badges */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-zinc-300">
            <div className="flex items-center gap-2 bg-[#1C2436] p-3 rounded-lg border border-white/10">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>Free Demo Shipping over ₹1,500</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1C2436] p-3 rounded-lg border border-white/10">
              <RotateCcw className="w-4 h-4 text-primary shrink-0" />
              <span>14-Day Simulated Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal Drawer */}
      {showSizeGuide && (
        <div className="bg-[#141926] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-lg text-white uppercase">
              Churchill Brothers FC Size Guide (Inches / CM)
            </h3>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="text-xs font-bold text-zinc-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-primary font-bold">
                  <th className="py-2.5 pr-4">Size</th>
                  <th className="py-2.5 pr-4">Chest (Inches)</th>
                  <th className="py-2.5 pr-4">Length (Inches)</th>
                  <th className="py-2.5">Fit Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-zinc-300">
                <tr>
                  <td className="py-2 font-bold text-white">S</td>
                  <td className="py-2">38&quot; (96 cm)</td>
                  <td className="py-2">27&quot; (68 cm)</td>
                  <td className="py-2">Athletic Slim</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-white">M</td>
                  <td className="py-2">40&quot; (101 cm)</td>
                  <td className="py-2">28&quot; (71 cm)</td>
                  <td className="py-2">Standard Match</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-white">L</td>
                  <td className="py-2">42&quot; (106 cm)</td>
                  <td className="py-2">29&quot; (73 cm)</td>
                  <td className="py-2">Regular Fit</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-white">XL</td>
                  <td className="py-2">44&quot; (111 cm)</td>
                  <td className="py-2">30&quot; (76 cm)</td>
                  <td className="py-2">Relaxed Fit</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-white">XXL</td>
                  <td className="py-2">46&quot; (116 cm)</td>
                  <td className="py-2">31&quot; (78 cm)</td>
                  <td className="py-2">Comfort Fit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Related Merchandise */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-white/10 space-y-6">
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
