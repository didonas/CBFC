'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { QRDemoTicket } from '@/components/ui/QRDemoTicket';
import {
  CheckCircle,
  ShieldAlert,
  ArrowRight,
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
        <h1 className="font-display font-black text-3xl text-charcoal">Booking Record Not Found</h1>
        <p className="text-mutedGrey text-sm">We could not locate this demo booking reference.</p>
        <Link
          href="/tickets"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-xs font-bold uppercase"
        >
          <span>Browse Tickets</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Success Banner */}
      <div className="bg-white border border-lightBorder p-8 sm:p-10 text-center space-y-3 shadow-card">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-display font-bold uppercase tracking-widest text-emerald-600 block">
          SIMULATED TRANSACTION SUCCESSFUL
        </span>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
          DEMO BOOKING CONFIRMED!
        </h1>

        <p className="text-sm text-charcoal/80 max-w-md mx-auto">
          Your reservation is recorded. Booking Reference:{' '}
          <span className="font-mono font-bold text-primary">{booking.bookingReference}</span>
        </p>

        {/* Prominent Demo Notice */}
        <div className="mt-4 p-3.5 bg-offWhite rounded border border-primary/30 inline-flex items-center gap-2 text-xs text-charcoal max-w-lg">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
          <span className="text-left leading-relaxed">
            <strong className="text-primary font-bold">DEMO NOTICE:</strong> No real payment was processed. These passes are for digital evaluation and cannot be used for genuine stadium entry.
          </span>
        </div>
      </div>

      {/* Admin QR Scanner Testing Banner */}
      <div className="bg-white border border-lightBorder p-5 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <QrCode className="w-6 h-6 text-primary shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-charcoal block">TEST QR SCANNER IN ADMIN PORTAL</span>
            <span className="text-mutedGrey">
              Open the Turnstile Scanner to verify ticket {booking.tickets[0]?.ticketNumber}.
            </span>
          </div>
        </div>

        <Link
          href={`/admin/bookings?scan=${booking.tickets[0]?.ticketNumber}`}
          className="px-4 py-2 rounded bg-offWhite hover:bg-zinc-100 border border-lightBorder text-xs font-bold uppercase tracking-wider text-charcoal transition shrink-0"
        >
          Open Admin Scanner →
        </Link>
      </div>

      {/* Render Individual Digital QR Passes */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-black text-2xl text-charcoal uppercase tracking-wider flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            <span>Digital Passes ({booking.tickets.length})</span>
          </h2>

          <Link
            href="/account/tickets"
            className="text-xs text-primary hover:underline font-bold uppercase tracking-wider"
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
      <div className="pt-6 border-t border-lightBorder flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href="/tickets"
          className="text-xs font-bold uppercase tracking-wider text-mutedGrey hover:text-primary"
        >
          ← Browse Other Sample Fixtures
        </Link>

        <Link
          href="/shop"
          className="px-6 py-3 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm"
        >
          <span>Visit Official Merchandise Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
