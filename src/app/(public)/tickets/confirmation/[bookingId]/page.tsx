'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { QRDemoTicket } from '@/components/ui/QRDemoTicket';
import {
  CheckCircle,
  ShieldAlert,
  Calendar,
  MapPin,
  ArrowRight,
  User,
  QrCode,
  Ticket,
} from 'lucide-react';

export default function TicketConfirmationPage() {
  const params = useParams();
  const bookingId = params?.bookingId as string;
  const { bookings } = useApp();

  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-white">Booking Record Not Found</h1>
        <p className="text-zinc-400 text-sm">We could not locate this demo booking reference.</p>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold uppercase"
        >
          <span>Browse Tickets</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-darkSurface to-emerald-950/40 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-display font-bold uppercase tracking-widest text-emerald-400 block">
          SIMULATED TRANSACTION SUCCESSFUL
        </span>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
          DEMO BOOKING CONFIRMED!
        </h1>

        <p className="text-sm text-zinc-300 max-w-md mx-auto">
          Your reservation is recorded. Booking Reference:{' '}
          <span className="font-mono font-bold text-brandGold">{booking.bookingReference}</span>
        </p>

        {/* Prominent Demo Notice */}
        <div className="mt-4 p-3.5 bg-black/40 rounded-xl border border-primary/40 inline-flex items-center gap-2 text-xs text-zinc-300 max-w-lg">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
          <span className="text-left leading-relaxed">
            <strong className="text-white">DEMO NOTICE:</strong> No real payment was processed. These passes are for digital evaluation and cannot be used for genuine stadium entry.
          </span>
        </div>
      </div>

      {/* Admin QR Scanner Testing Banner */}
      <div className="bg-zinc-900 border border-brandGold/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <QrCode className="w-6 h-6 text-brandGold shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-white block">TEST QR SCANNER IN ADMIN PORTAL</span>
            <span className="text-zinc-400">
              Open the Turnstile Scanner to verify ticket {booking.tickets[0]?.ticketNumber}.
            </span>
          </div>
        </div>

        <Link
          href={`/admin/bookings?scan=${booking.tickets[0]?.ticketNumber}`}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition shrink-0"
        >
          Open Admin Scanner →
        </Link>
      </div>

      {/* Render Individual Digital QR Passes */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            <span>Digital Passes ({booking.tickets.length})</span>
          </h2>

          <Link
            href="/account/tickets"
            className="text-xs text-brandGold hover:underline font-semibold"
          >
            View in My Account →
          </Link>
        </div>

        {booking.tickets.map((tkt) => (
          <QRDemoTicket
            key={tkt.id}
            ticket={tkt}
            matchTitle={booking.matchTitle}
            matchDate={booking.matchDate}
            venueName={booking.venueName}
            customerName={booking.customerName}
            ticketCategoryName={booking.ticketCategoryName}
            bookingReference={booking.bookingReference}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/tickets"
          className="text-xs font-semibold text-zinc-400 hover:text-white"
        >
          ← Browse Other Sample Fixtures
        </Link>

        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
        >
          <span>Visit Official Merchandise Store</span>
          <ArrowRight className="w-4 h-4 text-brandGold" />
        </Link>
      </div>
    </div>
  );
}
