'use client';

import React from 'react';
import { ShieldAlert, Truck } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="space-y-8 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="border-b border-lightBorder pb-6">
        <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
          COMMERCIAL SIMULATION
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight mt-1">
          SHIPPING & DISPATCH POLICY
        </h1>
        <p className="text-xs text-mutedGrey mt-2">Last Updated: November 2026</p>
      </div>

      <div className="p-4 rounded bg-offWhite border border-lightBorder flex items-start gap-3 text-xs text-charcoal">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>
          <strong className="text-charcoal">DEMO SHIPPING NOTICE: </strong>
          No physical logistics or delivery services are involved. All orders placed on this platform are simulations. No parcel will be dispatched to the provided shipping address.
        </p>
      </div>

      <div className="bg-white border border-lightBorder shadow-card p-6 sm:p-10 space-y-6 text-sm text-charcoal leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">1. Simulated Delivery Timelines</h2>
          <p className="text-mutedGrey">
            In production applications for Churchill Brothers FC, standard domestic dispatch across Goa takes 2-3 business days, while nationwide delivery across India requires 4-6 business days via express courier.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-lg text-charcoal uppercase">2. Simulated Tracking Updates</h2>
          <p className="text-mutedGrey">
            In this demonstration prototype, administrators can manually progress order states through:
            Demo Placed &rarr; Demo Processing &rarr; Demo Shipped &rarr; Demo Delivered.
          </p>
        </section>
      </div>
    </div>
  );
}
