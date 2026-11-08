'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-lightBorder pb-6">
        <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
          LEGAL & DATA COMPLIANCE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight mt-1">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-mutedGrey mt-2">Last Updated: November 2026</p>
      </div>

      <div className="p-4 rounded bg-offWhite border border-lightBorder flex items-start gap-3 text-xs text-charcoal">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>
          <strong className="text-charcoal">DEMONSTRATION PLATFORM NOTICE: </strong>
          This application does not collect real payment card numbers, UPI PINs, or banking credentials. Any names and email addresses provided during demonstration bookings or orders are stored strictly within local browser state or demo database schemas.
        </p>
      </div>

      <div className="bg-white border border-lightBorder shadow-card p-6 sm:p-10 space-y-6 text-sm text-charcoal leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">1. Information We Collect</h2>
          <p className="text-mutedGrey">
            When utilizing the Churchill Brothers FC demonstration platform, you may optionally submit a name, simulated email address, and sample postal address to test the ticket reservation and merchandise purchasing flows.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">2. Use of Information</h2>
          <p className="text-mutedGrey">
            Information submitted is utilized exclusively to generate dynamic QR codes, render digital demonstration matchday passes, display simulated order confirmations, and populate the customer and administrator dashboard views.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">3. Third-Party Disclosures & Real Payments</h2>
          <p className="text-mutedGrey">
            We do not sell, rent, or share user information with third-party advertising networks. We deliberately do not integrate Razorpay, Stripe, PayPal, or any banking APIs into this demonstration environment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">4. Data Retention & Erasure</h2>
          <p className="text-mutedGrey">
            Demonstration session data stored in your browser's LocalStorage may be purged at any time via your browser settings or by utilizing the reset demo database controls in the club administration dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
