'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import Link from 'next/link';
import { Ticket, ArrowRight } from 'lucide-react';

export default function TicketsCheckoutRedirectPage() {
  const { matches } = useApp();
  const nextMatch = matches.find((m) => m.isTicketsAvailable && m.status === 'scheduled') || matches[0];

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-primary/20 text-brandGold border border-primary/40 flex items-center justify-center mx-auto">
        <Ticket className="w-8 h-8" />
      </div>
      <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
        Match Ticket Checkout
      </h1>
      <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
        Select an available fixture to configure stand categories, seat quantities, and complete your simulated match booking.
      </p>

      {nextMatch && (
        <div className="pt-2">
          <Link
            href={`/tickets/${nextMatch.id}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club"
          >
            <span>Proceed to {nextMatch.opponentName} Demo Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
