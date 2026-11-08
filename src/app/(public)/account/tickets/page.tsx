'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { QRDemoTicket } from '@/components/ui/QRDemoTicket';
import {
  ArrowLeft,
  Ticket,
  ShieldAlert,
  Calendar,
  MapPin,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function AccountTicketsPage() {
  const { bookings, cancelDemoBooking } = useApp();

  return (
    <div className="space-y-10 py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Account Overview</span>
        </Link>
      </div>

      <div className="border-b border-zinc-800 pb-6">
        <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
          DIGITAL MATCH PASSES
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
          MY DEMO TICKETS ({bookings.length})
        </h1>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-xl text-white uppercase">
            No match tickets booked
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            You have not reserved any matchday tickets yet. Select an upcoming fixture to test our simulated booking and QR generation.
          </p>
          <Link
            href="/tickets"
            className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-primary text-white font-display font-bold text-xs uppercase tracking-wider"
          >
            Browse Available Matches
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Booking Reference
                  </span>
                  <span className="font-mono font-bold text-base text-brandGold">
                    {booking.bookingReference}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Stand Category
                  </span>
                  <span className="font-bold text-white text-sm">
                    {booking.ticketCategoryName} ({booking.quantity} seats)
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Status
                  </span>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                      booking.bookingStatus === 'confirmed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-red-950 text-red-400 border border-red-800'
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                {booking.bookingStatus === 'confirmed' && (
                  <button
                    onClick={() => {
                      if (confirm('Cancel this demo booking? Seats will be returned to inventory.')) {
                        cancelDemoBooking(booking.id);
                      }
                    }}
                    className="text-xs text-red-400 hover:underline font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>

              {/* Render Individual Passes */}
              <div className="space-y-4">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
