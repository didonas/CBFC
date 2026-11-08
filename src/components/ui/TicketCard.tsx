'use client';

import React from 'react';
import Link from 'next/link';
import { TicketCategory } from '@/types';
import { Ticket, Users, CheckCircle, ShieldAlert } from 'lucide-react';

interface TicketCardProps {
  category: TicketCategory;
  matchId: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({ category, matchId }) => {
  const isSoldOut = category.demoAvailable <= 0;

  return (
    <div className="bg-darkSurface border border-zinc-800 hover:border-zinc-700 transition rounded-xl p-5 flex flex-col justify-between shadow-card">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-lg text-white">
              {category.name}
            </h3>
            <span className="text-xs text-brandGold font-semibold">
              {category.gateEntry}
            </span>
          </div>
          <div className="text-right">
            <span className="font-display font-black text-xl text-white">
              ₹{category.priceInr}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase block font-semibold">
              Per Demo Seat
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
          {category.description}
        </p>

        {/* Demo Capacity indicator */}
        <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>
              {category.demoAvailable} of {category.demoCapacity} seats available (Demo)
            </span>
          </div>

          <div className="w-20 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full ${
                category.demoAvailable < 50 ? 'bg-amber-500' : 'bg-primary'
              }`}
              style={{
                width: `${Math.round((category.demoAvailable / category.demoCapacity) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-zinc-800">
        {isSoldOut ? (
          <button
            disabled
            className="w-full py-2.5 rounded bg-zinc-800 text-zinc-500 font-display font-bold text-xs uppercase tracking-wider cursor-not-allowed"
          >
            Sold Out (Demo)
          </button>
        ) : (
          <Link
            href={`/tickets/${matchId}?category=${category.id}`}
            className="w-full py-2.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-club"
          >
            <Ticket className="w-4 h-4" />
            <span>Select & Book Seats</span>
          </Link>
        )}
      </div>
    </div>
  );
};
