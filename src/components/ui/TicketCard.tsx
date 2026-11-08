'use client';

import React from 'react';
import Link from 'next/link';
import { TicketCategory } from '@/types';
import { Ticket, Users } from 'lucide-react';

interface TicketCardProps {
  category: TicketCategory;
  matchId: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({ category, matchId }) => {
  const isSoldOut = category.demoAvailable <= 0;

  return (
    <div className="bg-white border border-lightBorder hover:border-primary shadow-card hover:shadow-cardHover transition-all duration-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-black text-xl text-charcoal">
              {category.name}
            </h3>
            <span className="text-xs text-primary font-bold uppercase tracking-wider block mt-0.5">
              {category.gateEntry}
            </span>
          </div>
          <div className="text-right">
            <span className="font-display font-black text-2xl text-charcoal">
              ₹{category.priceInr}
            </span>
            <span className="text-[10px] text-mutedGrey uppercase block font-semibold">
              Per Demo Seat
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-charcoal/70 leading-relaxed">
          {category.description}
        </p>

        {/* Demo Capacity indicator */}
        <div className="mt-4 pt-3 border-t border-lightBorder flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-mutedGrey">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>
              {category.demoAvailable} of {category.demoCapacity} seats available (Demo)
            </span>
          </div>

          <div className="w-20 bg-zinc-200 rounded-full h-1.5 overflow-hidden">
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

      <div className="mt-5 pt-3 border-t border-lightBorder">
        {isSoldOut ? (
          <button
            disabled
            className="w-full py-2.5 rounded bg-zinc-100 text-mutedGrey font-display font-bold text-xs uppercase tracking-wider cursor-not-allowed"
          >
            Sold Out (Demo)
          </button>
        ) : (
          <Link
            href={`/tickets/${matchId}?category=${category.id}`}
            className="w-full py-2.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Ticket className="w-4 h-4" />
            <span>Select & Book Seats</span>
          </Link>
        )}
      </div>
    </div>
  );
};
