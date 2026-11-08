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
        <h1 className="font-display font-black text-3xl text-charcoal">Product Not Found</h1>
        <p className="text-mutedGrey text-sm">This merchandise item does not exist in our catalog.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold uppercase"
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
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Back button */}
      <div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mutedGrey hover:text-primary transition"
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
          <div className="relative aspect-square w-full bg-[#F3F2EE] border border-lightBorder shadow-card overflow-hidden">
            <Image
              src={currentImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-sm">
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
                  className={`relative w-20 h-20 overflow-hidden border-2 transition shrink-0 bg-[#F3F2EE] ${
                    currentImage === img
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-lightBorder hover:border-zinc-400'
                  }`}
                >
                  <Image src={img} alt={`${product.name} preview ${idx}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details, Sizes, Add to Cart */}
        <div className="lg:col-span-5 bg-white border border-lightBorder p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-primary block">
              {product.categoryName}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight leading-snug">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-display font-black text-3xl text-charcoal">
                ₹{product.priceInr.toLocaleString('en-IN')}
              </span>
              {product.compareAtPriceInr && (
                <span className="text-base text-mutedGrey line-through">
                  ₹{product.compareAtPriceInr.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                In Stock (Demo)
              </span>
            </div>
          </div>

          <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-3 pt-4 border-t border-lightBorder">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-charcoal uppercase tracking-wider">
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
                    className={`py-3 font-display font-black text-sm uppercase transition flex flex-col items-center justify-center border ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : isOut
                        ? 'border-lightBorder bg-zinc-100 text-zinc-400 line-through cursor-not-allowed'
                        : 'border-lightBorder bg-offWhite text-charcoal hover:bg-zinc-100'
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
            <span className="text-xs font-bold text-charcoal uppercase tracking-wider block">
              Quantity
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-lightBorder bg-offWhite overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-charcoal hover:bg-zinc-200 transition font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 font-display font-black text-base text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(activeVariant?.demoStockQuantity || 10, quantity + 1))}
                  className="px-4 py-2 text-charcoal hover:bg-zinc-200 transition font-bold"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-mutedGrey font-medium">
                {activeVariant ? `(${activeVariant.demoStockQuantity} demo items remaining)` : ''}
              </span>
            </div>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-3 border text-xs flex items-center justify-between gap-2 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                )}
                <span className="font-medium">{feedback.message}</span>
              </div>
              {feedback.type === 'success' && (
                <Link
                  href="/cart"
                  className="underline font-bold text-primary hover:text-deepRed shrink-0"
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
              className="w-full py-4 rounded bg-primary hover:bg-deepRed disabled:bg-zinc-200 disabled:text-zinc-500 text-white font-display font-black text-sm uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isOutOfStock ? 'OUT OF DEMO STOCK' : 'ADD TO BAG'}</span>
            </button>
          </div>

          {/* Simulated Policies Badges */}
          <div className="pt-4 border-t border-lightBorder grid grid-cols-2 gap-3 text-xs text-charcoal">
            <div className="flex items-center gap-2 bg-offWhite p-3 border border-lightBorder">
              <Truck className="w-4 h-4 text-primary shrink-0" />
              <span>Free Demo Shipping over ₹1,500</span>
            </div>
            <div className="flex items-center gap-2 bg-offWhite p-3 border border-lightBorder">
              <RotateCcw className="w-4 h-4 text-primary shrink-0" />
              <span>14-Day Simulated Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal Drawer */}
      {showSizeGuide && (
        <div className="bg-white border border-lightBorder p-6 sm:p-8 space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-lg text-charcoal uppercase">
              Churchill Brothers FC Size Guide (Inches / CM)
            </h3>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="text-xs font-bold text-mutedGrey hover:text-charcoal"
            >
              ✕ Close
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-lightBorder text-primary font-bold">
                  <th className="py-2.5 pr-4">Size</th>
                  <th className="py-2.5 pr-4">Chest (Inches)</th>
                  <th className="py-2.5 pr-4">Length (Inches)</th>
                  <th className="py-2.5">Fit Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lightBorder text-charcoal">
                <tr>
                  <td className="py-2 font-bold">S</td>
                  <td className="py-2">38&quot; (96 cm)</td>
                  <td className="py-2">27&quot; (68 cm)</td>
                  <td className="py-2">Athletic Slim</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">M</td>
                  <td className="py-2">40&quot; (101 cm)</td>
                  <td className="py-2">28&quot; (71 cm)</td>
                  <td className="py-2">Standard Match</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">L</td>
                  <td className="py-2">42&quot; (106 cm)</td>
                  <td className="py-2">29&quot; (73 cm)</td>
                  <td className="py-2">Regular Fit</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">XL</td>
                  <td className="py-2">44&quot; (111 cm)</td>
                  <td className="py-2">30&quot; (76 cm)</td>
                  <td className="py-2">Relaxed Fit</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">XXL</td>
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
        <div className="pt-10 border-t border-lightBorder space-y-6">
          <h2 className="font-display font-black text-2xl text-charcoal uppercase tracking-wider">
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
