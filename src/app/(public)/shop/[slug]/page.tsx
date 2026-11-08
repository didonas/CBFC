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
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Info,
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
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-white">Product Not Found</h1>
        <p className="text-zinc-400 text-sm">This merchandise item does not exist in our catalog.</p>
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
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
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
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cardDark border border-zinc-800 shadow-2xl">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow">
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
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 bg-cardDark ${
                    currentImage === img
                      ? 'border-primary ring-2 ring-primary/40'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <Image src={img} alt={`${product.name} preview ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details, Sizes, Add to Cart */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-brandGold block">
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
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                In Stock (Demo)
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3 pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                Select Size: <strong className="text-brandGold">{activeSize}</strong>
              </span>

              <button
                type="button"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-brandGold hover:underline inline-flex items-center gap-1 font-semibold"
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
                    className={`py-3 rounded-xl font-display font-bold text-sm uppercase transition flex flex-col items-center justify-center border ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-club'
                        : isOut
                        ? 'border-zinc-800 bg-zinc-950 text-zinc-600 line-through cursor-not-allowed'
                        : 'border-zinc-700 bg-darkSurface text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800'
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
              <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-950 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 transition font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 font-display font-black text-base text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(activeVariant?.demoStockQuantity || 10, quantity + 1))}
                  className="px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 transition font-bold"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-zinc-400">
                {activeVariant ? `(${activeVariant.demoStockQuantity} demo items remaining)` : ''}
              </span>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/80 border-emerald-800 text-emerald-200'
                  : 'bg-red-950/80 border-red-800 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                )}
                <span>{feedback.message}</span>
              </div>
              {feedback.type === 'success' && (
                <Link
                  href="/cart"
                  className="underline font-bold text-white hover:text-emerald-300 shrink-0"
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
              className="w-full py-4 rounded-xl bg-primary hover:bg-deepRed disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-display font-black text-sm uppercase tracking-widest transition shadow-club flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isOutOfStock ? 'OUT OF DEMO STOCK' : 'ADD TO BAG'}</span>
            </button>
          </div>

          {/* Simulated Policies Badges */}
          <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 gap-3 text-xs text-zinc-400">
            <div className="flex items-center gap-2 bg-darkSurface p-3 rounded-xl border border-zinc-800/80">
              <Truck className="w-4 h-4 text-brandGold shrink-0" />
              <span>Free Demo Shipping over ₹1,500</span>
            </div>
            <div className="flex items-center gap-2 bg-darkSurface p-3 rounded-xl border border-zinc-800/80">
              <RotateCcw className="w-4 h-4 text-primary shrink-0" />
              <span>14-Day Simulated Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal Drawer */}
      {showSizeGuide && (
        <div className="bg-darkSurface border border-zinc-700 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white uppercase">
              Churchill Brothers FC Size Guide (Inches / CM)
            </h3>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-brandGold font-bold">
                  <th className="py-2 pr-4">Size</th>
                  <th className="py-2 pr-4">Chest (Inches)</th>
                  <th className="py-2 pr-4">Length (Inches)</th>
                  <th className="py-2">Fit Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
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
        <div className="pt-12 border-t border-zinc-800 space-y-6">
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
