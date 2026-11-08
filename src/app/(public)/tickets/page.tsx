'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { ClubCrest } from '@/components/ui/ClubCrest';
import {
  Ticket,
  ShieldAlert,
  Calendar,
  MapPin,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function TicketsListingPage() {
  const { matches, ticketCategories } = useApp();

  const ticketMatches = matches.filter((m) => m.isTicketsAvailable && m.status === 'scheduled');

  return (
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Header Banner */}
      <div className="bg-white border border-lightBorder p-8 sm:p-10 shadow-card space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-xs font-display font-bold uppercase tracking-widest text-primary">
          <Ticket className="w-3.5 h-3.5" />
          DEMONSTRATION TICKETING MODULE
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight leading-none">
          MATCHDAY TICKETS (DEMO)
        </h1>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl leading-relaxed">
          Experience the interactive ticketing flow for Churchill Brothers FC Goa. Select your match, reserve stand categories, and generate real scannable digital passes with zero payment required.
        </p>

        {/* Mandatory Demo Notice */}
        <div className="p-4 rounded bg-offWhite border border-primary/30 flex items-start sm:items-center gap-3 text-xs text-charcoal">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-primary uppercase font-bold">DEMO TICKETING ONLY: </strong>
            No payment gateways or banking credentials collected. All passes generated are for digital simulation only.
          </p>
        </div>
      </div>

      {/* Available Matches Grid */}
      <div className="space-y-6">
        <h2 className="font-display font-black text-2xl text-charcoal uppercase tracking-wider">
          Available Fixtures for Booking
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ticketMatches.map((match) => {
            const categories = ticketCategories.filter((c) => c.matchId === match.id);
            const totalAvailable = categories.reduce((sum, c) => sum + c.demoAvailable, 0);

            const d = new Date(match.matchDate);
            const formattedDate = d.toLocaleDateString('en-IN', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
            const formattedTime = d.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={match.id}
                className="bg-white border border-lightBorder hover:border-primary transition-all p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-lightBorder">
                    <span className="font-display font-bold uppercase tracking-wider text-primary">
                      {match.competition}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-offWhite border border-lightBorder text-charcoal font-semibold text-[11px]">
                      {totalAvailable} Demo Seats Available
                    </span>
                  </div>

                  {/* Matchup */}
                  <div className="flex items-center justify-between gap-4 py-2">
                    <div className="flex items-center gap-3">
                      <ClubCrest size={44} />
                      <div>
                        <span className="font-display font-black text-xl text-charcoal uppercase block">
                          Churchill Bros
                        </span>
                        <span className="text-[10px] text-primary font-bold uppercase">
                          The Red Machines
                        </span>
                      </div>
                    </div>

                    <span className="font-display font-black text-xl text-primary">
                      VS
                    </span>

                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <span className="font-display font-black text-xl text-charcoal uppercase block">
                          {match.opponentName}
                        </span>
                        <span className="text-[10px] text-mutedGrey font-bold uppercase">
                          Opponent
                        </span>
                      </div>
                      <div className="relative w-11 h-11 shrink-0">
                        <Image
                          src={match.opponentCrestUrl}
                          alt={match.opponentName}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Venue */}
                  <div className="space-y-1.5 text-xs text-charcoal bg-offWhite p-3.5 border border-lightBorder">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formattedDate} • {formattedTime} IST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{match.venueName}</span>
                    </div>
                  </div>

                  {/* Categories Snapshot */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-mutedGrey tracking-wider block">
                      Sample Pricing Tiers:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="bg-offWhite p-2.5 border border-lightBorder text-center"
                        >
                          <span className="text-[10px] text-mutedGrey block truncate font-medium">
                            {cat.name.split(' ')[0]}
                          </span>
                          <span className="font-display font-black text-base text-charcoal block mt-0.5">
                            ₹{cat.priceInr}
                          </span>
                          <span className="text-[9px] text-primary font-bold block">
                            {cat.demoAvailable} left
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking CTA */}
                <div className="pt-4 border-t border-lightBorder">
                  <Link
                    href={`/tickets/${match.id}`}
                    className="w-full py-3 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Select Stand & Book Seats</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stadium Seating & Policy Guide */}
      <div className="bg-white border border-lightBorder p-6 sm:p-10 shadow-card space-y-6">
        <h3 className="font-display font-bold text-xl text-charcoal uppercase tracking-wider flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <span>Fatorda Matchday Ticketing Protocol</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-charcoal/70">
          <div className="space-y-1">
            <h4 className="font-bold text-charcoal text-sm">1. Instant QR Generation</h4>
            <p className="leading-relaxed">
              Every confirmed demo booking produces a unique alphanumeric ticket identifier with an encoded verifiable QR code.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-charcoal text-sm">2. Admin Scanner Simulation</h4>
            <p className="leading-relaxed">
              In the admin portal (/admin/bookings), match operators can test-scan QR payloads to simulate physical turnstile validation.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-charcoal text-sm">3. Zero Real Payments</h4>
            <p className="leading-relaxed">
              There is zero financial cost. All transactions update simulated database quotas in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
