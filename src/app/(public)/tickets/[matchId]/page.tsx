'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ClubCrest } from '@/components/ui/ClubCrest';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ShieldAlert,
  CheckCircle,
  Users,
  AlertCircle,
} from 'lucide-react';

function MatchTicketBookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const matchId = params?.matchId as string;
  const initialCategoryParam = searchParams.get('category');

  const { matches, ticketCategories, createDemoBooking, currentUser } = useApp();

  const match = matches.find((m) => m.id === matchId);
  const categories = ticketCategories.filter((c) => c.matchId === matchId);

  // Form states
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategoryParam || (categories[0]?.id ?? '')
  );
  const [quantity, setQuantity] = useState<number>(2);
  const [customerName, setCustomerName] = useState<string>(currentUser?.fullName || 'Antonio D’Souza');
  const [customerEmail, setCustomerEmail] = useState<string>(currentUser?.email || 'fan@churchillbrothers.com');
  const [customerPhone, setCustomerPhone] = useState<string>(currentUser?.phone || '+91 98221 54321');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!match) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-charcoal">Match Not Found</h1>
        <p className="text-mutedGrey text-sm">The requested match is not available for booking.</p>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tickets</span>
        </Link>
      </div>
    );
  }

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const unitPrice = selectedCategory?.priceInr || 0;
  const totalAmount = unitPrice * quantity;
  const availableStock = selectedCategory?.demoAvailable || 0;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedCategory) {
      setErrorMessage('Please select a ticket category.');
      return;
    }

    if (quantity < 1 || quantity > 10) {
      setErrorMessage('Ticket quantity must be between 1 and 10.');
      return;
    }

    if (quantity > availableStock) {
      setErrorMessage(`Only ${availableStock} seats remaining in demo inventory for this category.`);
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      setErrorMessage('Please enter ticket holder name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = createDemoBooking({
        matchId: match.id,
        ticketCategoryId: selectedCategory.id,
        quantity,
        customerName,
        customerEmail,
        customerPhone,
      });

      if (result.success && result.bookingId) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}

        router.push(`/tickets/confirmation/${result.bookingId}`);
      } else {
        setErrorMessage(result.error || 'Failed to create booking.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during demo booking.');
      setIsSubmitting(false);
    }
  };

  const d = new Date(match.matchDate);
  const formattedDate = d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Return button */}
      <div>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mutedGrey hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to All Fixtures</span>
        </Link>
      </div>

      {/* Match Summary Banner */}
      <div className="bg-white border border-lightBorder p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-primary">
            {match.competition}
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-charcoal uppercase">
            Churchill Brothers FC vs {match.opponentName}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-charcoal font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {formattedDate} • {formattedTime} IST
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {match.venueName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <ClubCrest size={48} />
          <span className="font-display font-black text-xl text-primary">VS</span>
          <div className="relative w-12 h-12">
            <Image
              src={match.opponentCrestUrl}
              alt={match.opponentName}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mandatory Demo Warning Alert */}
      <div className="p-4 rounded bg-white border border-primary/30 flex items-start gap-3.5 text-xs text-charcoal shadow-card">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="font-bold text-primary uppercase tracking-wider text-[11px]">
            DEMO BOOKING — NO PAYMENT REQUIRED
          </h4>
          <p className="text-charcoal/70 leading-relaxed">
            This checkout simulates the entire booking lifecycle. No credit card, UPI or bank details are needed. All tickets generated contain unique QR codes and references stored in your browser session for testing.
          </p>
        </div>
      </div>

      {/* Booking Form Layout */}
      <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Stand Selection & Customer details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Category Selector */}
          <div className="bg-white border border-lightBorder p-6 shadow-card space-y-4">
            <h3 className="font-display font-black text-lg text-charcoal uppercase tracking-wider flex items-center gap-2">
              <Ticket className="w-5 h-5 text-primary" />
              <span>Step 1: Choose Stand / Ticket Category</span>
            </h3>

            <div className="space-y-3">
              {categories.map((cat) => {
                const isSelected = cat.id === selectedCategoryId;
                const isSoldOut = cat.demoAvailable <= 0;

                return (
                  <label
                    key={cat.id}
                    className={`block p-4 border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-offWhite shadow-xs'
                        : 'border-lightBorder bg-white hover:border-zinc-400'
                    } ${isSoldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="ticketCategory"
                          value={cat.id}
                          checked={isSelected}
                          disabled={isSoldOut}
                          onChange={() => setSelectedCategoryId(cat.id)}
                          className="accent-primary w-4 h-4"
                        />
                        <div>
                          <h4 className="font-display font-black text-lg text-charcoal">
                            {cat.name}
                          </h4>
                          <span className="text-xs text-primary font-bold uppercase tracking-wider block">
                            {cat.gateEntry}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-black text-xl text-charcoal">
                          ₹{cat.priceInr}
                        </span>
                        <span className="text-[10px] text-mutedGrey uppercase block font-semibold">
                          Per Demo Seat
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-charcoal/70 pl-7 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="mt-2 text-[11px] font-bold text-primary pl-7">
                      {cat.demoAvailable > 0
                        ? `${cat.demoAvailable} demo seats remaining`
                        : 'Sold out in demo inventory'}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 2: Quantity Selector */}
          <div className="bg-white border border-lightBorder p-6 shadow-card space-y-4">
            <h3 className="font-display font-black text-lg text-charcoal uppercase tracking-wider flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Step 2: Number of Seats</span>
            </h3>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-lightBorder bg-offWhite overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-charcoal hover:bg-zinc-200 active:scale-95 transition font-bold"
                >
                  -
                </button>
                <span className="px-5 py-2 font-display font-black text-lg text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(10, Math.min(availableStock, quantity + 1)))}
                  className="px-4 py-2.5 text-charcoal hover:bg-zinc-200 active:scale-95 transition font-bold"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-mutedGrey font-medium">
                (Max 10 demo tickets per simulated booking)
              </span>
            </div>
          </div>

          {/* Step 3: Customer Details */}
          <div className="bg-white border border-lightBorder p-6 shadow-card space-y-4">
            <h3 className="font-display font-black text-lg text-charcoal uppercase tracking-wider">
              Step 3: Demonstration Ticket Holder Details
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-charcoal font-bold mb-1">
                  Primary Ticket Holder Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition font-medium"
                  placeholder="e.g. Antonio D'Souza"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-charcoal font-bold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition font-medium"
                    placeholder="e.g. fan@churchillbrothers.com"
                  />
                </div>
                <div>
                  <label className="block text-charcoal font-bold mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-offWhite border border-lightBorder px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary transition font-medium"
                    placeholder="e.g. +91 98221 54321"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Card & Confirm */}
        <div className="lg:col-span-5 bg-white border border-lightBorder p-6 sm:p-8 space-y-6 sticky top-28 shadow-card">
          <h3 className="font-display font-black text-xl text-charcoal uppercase tracking-wider border-b border-lightBorder pb-3">
            Simulated Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-mutedGrey">
              <span>Fixture:</span>
              <span className="font-bold text-charcoal text-right max-w-[200px] truncate">
                CBFC vs {match.opponentName}
              </span>
            </div>
            <div className="flex justify-between text-mutedGrey">
              <span>Stand Category:</span>
              <span className="font-bold text-primary">{selectedCategory?.name}</span>
            </div>
            <div className="flex justify-between text-mutedGrey">
              <span>Quantity:</span>
              <span className="font-bold text-charcoal">{quantity} seat(s)</span>
            </div>
            <div className="flex justify-between text-mutedGrey">
              <span>Demo Price:</span>
              <span className="font-mono text-charcoal">₹{unitPrice} x {quantity}</span>
            </div>

            <div className="pt-3 border-t border-lightBorder flex justify-between items-baseline">
              <span className="text-sm font-bold text-charcoal uppercase">Demo Total:</span>
              <span className="font-display font-black text-2xl text-primary">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-mutedGrey italic block">
              * Simulated value. Zero charges will be made.
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting || availableStock <= 0}
            className="w-full py-4 rounded bg-primary hover:bg-deepRed disabled:bg-zinc-200 disabled:text-zinc-500 text-white font-display font-black text-sm uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>GENERATING DEMO PASSES...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>CONFIRM DEMO BOOKING</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-mutedGrey text-center leading-relaxed">
            By confirming, simulated ticket records and QR code tokens will be created in your account. No banking credentials requested.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function MatchTicketBookingPage() {
  return (
    <Suspense fallback={<div className="max-w-5xl mx-auto py-20 px-4 text-center text-mutedGrey">Loading booking form...</div>}>
      <MatchTicketBookingContent />
    </Suspense>
  );
}
