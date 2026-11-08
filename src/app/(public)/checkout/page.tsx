'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import confetti from 'canvas-confetti';
import {
  ShieldAlert,
  ArrowLeft,
  CheckCircle,
  ShoppingBag,
  Truck,
  AlertCircle,
  Lock,
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponParam = searchParams.get('coupon') || undefined;

  const { cart, cartSubtotal, placeDemoOrder, currentUser } = useApp();

  const [customerName, setCustomerName] = useState<string>(currentUser?.fullName || 'Antonio D’Souza');
  const [customerEmail, setCustomerEmail] = useState<string>(currentUser?.email || 'fan@churchillbrothers.com');
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser?.phone || '+91 98221 54321');
  const [shippingAddressLine1, setShippingAddressLine1] = useState<string>('Flat 302, Sea View Apartments, Colva Beach Road');
  const [shippingAddressLine2, setShippingAddressLine2] = useState<string>('Near Church Ground');
  const [shippingCity, setShippingCity] = useState<string>('Margao');
  const [shippingState, setShippingState] = useState<string>('Goa');
  const [shippingPostalCode, setShippingPostalCode] = useState<string>('403708');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const discountAmount = couponParam === 'REDMACHINES10' ? Math.round(cartSubtotal * 0.1) : 0;
  const shippingCost = cartSubtotal > 1500 ? 0 : 99;
  const grandTotal = cartSubtotal - discountAmount + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-white">Your Cart is Empty</h1>
        <p className="text-zinc-400 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !customerEmail.trim() || !shippingAddressLine1.trim()) {
      setErrorMessage('Please fill in all required customer details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = placeDemoOrder({
        customerName,
        customerEmail,
        customerPhone,
        shippingAddressLine1,
        shippingAddressLine2,
        shippingCity,
        shippingState,
        shippingPostalCode,
        couponCode: couponParam,
      });

      if (result.success && result.orderId) {
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch {}

        router.push(`/order-confirmation/${result.orderId}`);
      } else {
        setErrorMessage(result.error || 'Failed to place demo order.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during demo checkout.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return button */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Cart</span>
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-zinc-800 pb-6">
        <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
          CHECKOUT SIMULATION
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
          COMPLETE YOUR DEMO ORDER
        </h1>
      </div>

      {/* Mandatory Demo Store Banner */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-primary/50 flex items-start gap-3.5 text-xs text-zinc-300">
        <ShieldAlert className="w-6 h-6 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            DEMO STORE — THIS IS A SIMULATED PURCHASE
          </h4>
          <p className="text-zinc-400 leading-relaxed">
            No payment will be taken and no physical product will be dispatched. This simulated checkout updates demo inventory records and adds the order to your demonstration customer account.
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Customer & Delivery Information */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-5 h-5 text-brandGold" />
              <span>1. Customer & Shipping Details (Demo)</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                  placeholder="e.g. Antonio D'Souza"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                    placeholder="fan@churchillbrothers.com"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                    placeholder="+91 98221 54321"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  Shipping Address (Demo) *
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddressLine1}
                  onChange={(e) => setShippingAddressLine1(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                  placeholder="House/Apartment number, street name"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">
                  Landmark / Line 2
                </label>
                <input
                  type="text"
                  value={shippingAddressLine2}
                  onChange={(e) => setShippingAddressLine2(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
                  placeholder="Apartment suite, landmark"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingPostalCode}
                    onChange={(e) => setShippingPostalCode(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Simulation Card */}
          <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-3">
            <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>2. Payment Method</span>
            </h2>

            <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-900/50 flex items-center justify-between text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">DEMO SIMULATION (NO PAYMENT REQUIRED)</span>
                  <span className="text-zinc-500 text-[11px]">Instant simulated confirmation</span>
                </div>
              </div>
              <span className="font-mono text-emerald-400 font-bold">₹0.00 DUE</span>
            </div>
          </div>
        </div>

        {/* Right: Order Review & Place Order */}
        <div className="lg:col-span-5 bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 shadow-2xl">
          <h2 className="font-display font-black text-xl text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Order Items ({cart.length})
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.variantId} className="flex items-center gap-3 text-xs">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                  <Image src={item.imageUrl} alt={item.productName} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate">{item.productName}</h4>
                  <span className="text-zinc-400">Qty: {item.quantity} • Size: {item.size}</span>
                </div>
                <span className="font-display font-bold text-zinc-200">
                  ₹{(item.priceInr * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 text-xs pt-4 border-t border-zinc-800">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal:</span>
              <span className="font-bold text-white">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon Discount:</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-zinc-400">
              <span>Simulated Shipping:</span>
              <span>{shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${shippingCost}`}</span>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white uppercase">Grand Total (Simulated):</span>
              <span className="font-display font-black text-2xl text-primary">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-primary hover:bg-deepRed disabled:bg-zinc-800 text-white font-display font-black text-sm uppercase tracking-widest transition shadow-club flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>PROCESSING SIMULATED ORDER...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>PLACE DEMO ORDER</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-zinc-500 text-center leading-relaxed">
            By clicking Place Demo Order, a simulated order is saved in the database. No financial charges apply.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto py-20 px-4 text-center text-zinc-400">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
