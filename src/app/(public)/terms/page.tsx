'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-lightBorder pb-6">
        <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
          LEGAL & DEMONSTRATION AGREEMENT
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight mt-1">
          TERMS OF SERVICE
        </h1>
        <p className="text-xs text-mutedGrey mt-2">Last Updated: November 2026</p>
      </div>

      <div className="p-4 rounded bg-offWhite border border-lightBorder flex items-start gap-3 text-xs text-charcoal">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>
          <strong className="text-charcoal">CRITICAL NOTICE:</strong> All ticket passes and merchandise receipts generated on this website are strictly for demonstration purposes. They carry zero monetary value and do NOT confer admission to Fatorda Stadium or any other real-world football match.
        </p>
      </div>

      <div className="bg-white border border-lightBorder shadow-card p-6 sm:p-10 space-y-6 text-sm text-charcoal leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">1. Demonstration Scope</h2>
          <p className="text-mutedGrey">
            By accessing and interacting with the Churchill Brothers FC digital platform, you acknowledge that all financial workflows, order numbers, QR tickets, and check-in simulations are non-commercial prototypes created to demonstrate full-stack architecture.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">2. Intellectual Property & Club Crest</h2>
          <p className="text-mutedGrey">
            All club trademarks, including the official Churchill Brothers FC Goa crest, &ldquo;The Red Machines&rdquo; nickname, and historical honours remain the property of Churchill Brothers Football Club Goa.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">3. Disclaimer of Physical Fulfilment</h2>
          <p className="text-mutedGrey">
            No real delivery carriers (India Post, Blue Dart, FedEx, etc.) are integrated. No apparel or physical parcels will be dispatched.
          </p>
        </section>
      </div>
    </div>
  );
}
