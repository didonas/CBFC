'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-zinc-800 pb-6">
        <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
          LEGAL & DATA COMPLIANCE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mt-1">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-zinc-400 mt-2">Last Updated: November 2026</p>
      </div>

      <div className="p-4 rounded-2xl bg-zinc-900 border border-primary/40 flex items-start gap-3 text-xs text-zinc-300">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">DEMONSTRATION PLATFORM NOTICE: </strong>
          This application does not collect real payment card numbers, UPI PINs, or banking credentials. Any names and email addresses provided during demonstration bookings or orders are stored strictly within local browser state or demo database schemas.
        </p>
      </div>

      <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white uppercase">1. Information We Collect</h2>
          <p>
            When utilizing the Churchill Brothers FC demonstration platform, you may optionally submit a name, simulated email address, and sample postal address to test the ticket reservation and merchandise purchasing flows.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white uppercase">2. Use of Information</h2>
          <p>
            Information submitted is utilized exclusively to generate dynamic QR codes, render digital demonstration matchday passes, display simulated order confirmations, and populate the customer and administrator dashboard views.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white uppercase">3. Third-Party Disclosures & Real Payments</h2>
          <p>
            We do not sell, rent, or share user information with third-party advertising networks. We deliberately do not integrate Razorpay, Stripe, PayPal, or any banking APIs into this demonstration environment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-white uppercase">4. Cookies & Local Storage</h2>
          <p>
            We utilize browser LocalStorage solely to maintain your simulated shopping cart items, demo bookings, and selected authentication state across page navigations.
          </p>
        </section>
      </div>
    </div>
  );
}
