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
  Clock,
  MapPin,
  CheckCircle,
  Users,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function TicketsListingPage() {
  const { matches, ticketCategories } = useApp();

  const ticketMatches = matches.filter((m) => m.isTicketsAvailable && m.status === 'scheduled');

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="border-b border-zinc-800 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-display font-bold uppercase tracking-widest text-brandGold">
          <Ticket className="w-3.5 h-3.5" />
          DEMONSTRATION TICKETING MODULE
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          MATCHDAY TICKETS (DEMO)
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Experience the interactive ticketing flow for Churchill Brothers FC Goa. Select your match, reserve stand categories, and generate real scannable digital passes with zero payment required.
        </p>

        {/* Mandatory Demo Notice */}
        <div className="p-4 rounded-xl bg-zinc-900 border border-primary/40 flex items-start sm:items-center gap-3 text-xs text-zinc-300">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-white uppercase font-bold">DEMO TICKETING ONLY: </strong>
            No payment gateways or card details collected. Passes generated are for digital simulation and not valid for actual stadium entry.
          </p>
        </div>
      </div>

      {/* Available Matches Grid */}
      <div className="space-y-8">
        <h2 className="font-display font-black text-2xl text-white uppercase tracking-wider">
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
                className="bg-darkSurface border border-zinc-800 hover:border-primary/50 transition-all rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-800">
                    <span className="font-display font-bold uppercase tracking-wider text-brandGold">
                      {match.competition}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold text-[11px]">
                      {totalAvailable} Demo Seats Available
                    </span>
                  </div>

                  {/* Matchup */}
                  <div className="flex items-center justify-between gap-4 py-2">
                    <div className="flex items-center gap-3">
                      <ClubCrest size={44} />
                      <div>
                        <span className="font-display font-black text-xl text-white uppercase block">
                          Churchill Bros
                        </span>
                        <span className="text-[10px] text-brandGold font-bold uppercase">
                          The Red Machines
                        </span>
                      </div>
                    </div>

                    <span className="font-display font-extrabold text-xl text-primary">
                      VS
                    </span>

                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <span className="font-display font-black text-xl text-white uppercase block">
                          {match.opponentName}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase">
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
                  <div className="space-y-1.5 text-xs text-zinc-300 bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brandGold" />
                      <span>{formattedDate} • {formattedTime} IST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{match.venueName}</span>
                    </div>
                  </div>

                  {/* Categories Snapshot */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-zinc-400 tracking-wider block">
                      Sample Pricing Tiers:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800 text-center"
                        >
                          <span className="text-[10px] text-zinc-400 block truncate">
                            {cat.name.split(' ')[0]}
                          </span>
                          <span className="font-display font-bold text-sm text-white block mt-0.5">
                            ₹{cat.priceInr}
                          </span>
                          <span className="text-[9px] text-emerald-400 font-semibold block">
                            {cat.demoAvailable} left
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking CTA */}
                <div className="pt-4 border-t border-zinc-800">
                  <Link
                    href={`/tickets/${match.id}`}
                    className="w-full py-3 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-club"
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
      <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider flex items-center gap-2">
          <Info className="w-5 h-5 text-brandGold" />
          <span>Fatorda Matchday Ticketing Protocol</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-400">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">1. Instant QR Generation</h4>
            <p className="leading-relaxed">
              Every confirmed demo booking produces a unique alphanumeric ticket identifier with an encoded verifiable QR code.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">2. Admin Scanner Simulation</h4>
            <p className="leading-relaxed">
              In the admin portal (/admin/bookings), match operators can test-scan QR payloads to simulate physical turnstile validation.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm">3. No Real Payments</h4>
            <p className="leading-relaxed">
              There is zero financial cost. All transactions update simulated database quotas in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
