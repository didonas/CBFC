'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-lightBorder pb-6">
        <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
          COMMERCIAL SIMULATION
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight mt-1">
          REFUND & CANCELLATION POLICY
        </h1>
        <p className="text-xs text-mutedGrey mt-2">Last Updated: November 2026</p>
      </div>

      <div className="p-4 rounded bg-offWhite border border-lightBorder flex items-start gap-3 text-xs text-charcoal">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>
          <strong className="text-charcoal">DEMO POLICY NOTICE:</strong> Since no real financial funds or payment methods are charged on this demonstration platform, monetary refunds do not exist.
        </p>
      </div>

      <div className="bg-white border border-lightBorder shadow-card p-6 sm:p-10 space-y-6 text-sm text-charcoal leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">1. Ticket Booking Cancellations (Demo)</h2>
          <p className="text-mutedGrey">
            Users and administrators can simulate cancelling demo match bookings directly within their account or the admin dashboard. When a simulated booking is cancelled, ticket inventory is automatically replenished to the available match capacity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">2. Merchandise Order Cancellation (Demo)</h2>
          <p className="text-mutedGrey">
            Demonstration orders can be marked as &ldquo;Demo Cancelled&rdquo; within the administrative interface (/admin/orders) to test state-machine workflows.
          </p>
        </section>
      </div>
    </div>
  );
}
