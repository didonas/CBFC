'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/demo-data';
import { HelpCircle, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-lightBorder pb-8 space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 text-xs font-display font-bold uppercase tracking-widest text-primary">
          <HelpCircle className="w-3.5 h-3.5" />
          HELP & SUPPORTER INFORMATION
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-charcoal uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-sm text-mutedGrey max-w-2xl">
          Everything you need to know about the Churchill Brothers FC demonstration platform, simulated match ticketing, and official club store.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-lightBorder shadow-card overflow-hidden transition"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-charcoal hover:text-primary transition"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-mutedGrey shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-sm text-mutedGrey leading-relaxed font-sans border-t border-lightBorder mt-2 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Demo Clarification */}
      <div className="p-6 rounded bg-offWhite border border-lightBorder flex items-start gap-4 text-xs text-charcoal">
        <ShieldAlert className="w-6 h-6 text-primary shrink-0" />
        <div className="space-y-1">
          <h4 className="font-bold text-charcoal uppercase">HAVE MORE QUESTIONS?</h4>
          <p className="text-mutedGrey leading-relaxed">
            Feel free to explore the Club Administration Dashboard (/admin) to test inventory management, match creation, and ticket check-in simulation with the built-in demo credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
