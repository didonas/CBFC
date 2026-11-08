'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  Tag,
  CheckCircle,
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartSubtotal } = useApp();
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string>('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'REDMACHINES10') {
      setAppliedCoupon('REDMACHINES10');
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try REDMACHINES10 for 10% off.');
    }
  };

  const discountAmount = appliedCoupon === 'REDMACHINES10' ? Math.round(cartSubtotal * 0.1) : 0;
  const shippingCost = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 99;
  const grandTotal = cartSubtotal - discountAmount + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          You haven&apos;t added any Churchill Brothers FC jerseys or fan merchandise to your bag yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club"
        >
          <span>Explore The Club Megastore</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
            SHOPPING BAG
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            YOUR CART ({cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-zinc-400 hover:text-red-400 font-semibold self-start sm:self-auto"
        >
          Clear All Items
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.variantId}
              className="bg-darkSurface border border-zinc-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <Link
                    href={`/shop/${item.productSlug}`}
                    className="font-display font-bold text-base text-white hover:text-primary transition line-clamp-1"
                  >
                    {item.productName}
                  </Link>
                  <span className="text-xs text-brandGold font-semibold block">
                    Size: {item.size}
                  </span>
                  <span className="font-display font-bold text-sm text-zinc-300 block">
                    ₹{item.priceInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950 overflow-hidden">
                  <button
                    onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                    className="px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 transition font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-display font-bold text-sm text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                    className="px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 transition font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <span className="font-display font-black text-base text-white block">
                    ₹{(item.priceInr * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition"
                  title="Remove from cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Return to shop */}
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary & Checkout */}
        <div className="lg:col-span-4 bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-2xl">
          <h2 className="font-display font-black text-xl text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Summary
          </h2>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
              Simulated Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. REDMACHINES10"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary transition"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold shrink-0 transition"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Coupon {appliedCoupon} applied (10% off)!
              </p>
            )}
          </form>

          {/* Price Breakdown */}
          <div className="space-y-3 text-xs pt-3 border-t border-zinc-800">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal:</span>
              <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount (10%):</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-400">
              <span>Simulated Shipping:</span>
              <span>
                {shippingCost === 0 ? (
                  <strong className="text-emerald-400">FREE</strong>
                ) : (
                  `₹${shippingCost}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white uppercase">Simulated Total:</span>
              <span className="font-display font-black text-2xl text-primary">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
            <span className="font-bold text-white uppercase text-[10px] block">
              DEMO STORE NOTICE
            </span>
            <p>
              No payment card required. The next screen will record a simulated order reference.
            </p>
          </div>

          {/* Checkout CTA */}
          <Link
            href={`/checkout${appliedCoupon ? `?coupon=${appliedCoupon}` : ''}`}
            className="w-full py-4 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-black text-sm uppercase tracking-widest transition shadow-club flex items-center justify-center gap-2"
          >
            <span>PROCEED TO DEMO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
