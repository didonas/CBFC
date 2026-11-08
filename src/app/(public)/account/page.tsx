'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  User,
  ShoppingBag,
  Ticket,
  Shield,
  LogOut,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';

export default function AccountOverviewPage() {
  const { currentUser, loginAsFan, loginAsAdmin, loginWithEmail, logout, orders, bookings } = useApp();

  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary/20 text-brandGold border border-primary/40 flex items-center justify-center mx-auto">
            <User className="w-7 h-7" />
          </div>
          <h1 className="font-display font-black text-3xl text-white uppercase tracking-tight">
            SIGN IN TO SUPPORTER PORTAL
          </h1>
          <p className="text-xs text-zinc-400">
            Access your demonstration matchday tickets, merchandise orders, and supporter profile.
          </p>
        </div>

        {/* Quick Demo Logins */}
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-5 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block text-center">
            Instant One-Click Demo Sign-in
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={loginAsFan}
              className="py-2.5 rounded-xl bg-brandGold hover:bg-brandGold-hover text-brandBlack font-display font-bold text-xs uppercase tracking-wider transition"
            >
              Demo Supporter
            </button>
            <button
              onClick={loginAsAdmin}
              className="py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Custom Sign-in Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (emailInput.trim()) {
              loginWithEmail(emailInput, nameInput || 'Club Supporter');
            }
          }}
          className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 space-y-4 text-xs"
        >
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Or Sign in with Custom Details
          </span>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Your Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Antonio D'Souza"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="fan@churchillbrothers.com"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club"
          >
            ENTER DEMO ACCOUNT
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-darkSurface via-zinc-900 to-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-950 border-2 border-brandGold/40 flex items-center justify-center text-brandGold shrink-0">
            <User className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                {currentUser.fullName}
              </h1>
              <span className="px-2 py-0.5 rounded bg-brandGold/20 border border-brandGold/40 text-brandGold text-[10px] font-bold uppercase tracking-wider">
                {currentUser.role === 'super_admin' ? 'SUPER ADMIN' : 'CLUB SUPPORTER'}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">{currentUser.email}</p>
            {currentUser.phone && (
              <p className="text-xs text-zinc-500">{currentUser.phone}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'super_admin' && (
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white text-xs font-display font-bold uppercase tracking-wider transition shadow-club"
            >
              Admin Portal →
            </Link>
          )}

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Match Tickets Box */}
        <Link
          href="/account/tickets"
          className="bg-darkSurface border border-zinc-800 hover:border-primary/50 transition rounded-2xl p-6 shadow-card hover:shadow-cardHover flex flex-col justify-between group space-y-4"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition">
              <Ticket className="w-6 h-6" />
            </div>
            <h2 className="font-display font-black text-xl text-white uppercase">
              My Demo Tickets ({bookings.length})
            </h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              View confirmed matchday bookings, access personalized scannable QR passes, and print/download tickets.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-brandGold font-bold">
            <span>View All Tickets</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Merchandise Orders Box */}
        <Link
          href="/account/orders"
          className="bg-darkSurface border border-zinc-800 hover:border-brandGold/50 transition rounded-2xl p-6 shadow-card hover:shadow-cardHover flex flex-col justify-between group space-y-4"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brandGold mb-4 group-hover:scale-105 transition">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="font-display font-black text-xl text-white uppercase">
              Demo Orders ({orders.length})
            </h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Track simulated merchandise purchases, view item receipts, and inspect shipping timeline stages.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-brandGold font-bold">
            <span>View Order History</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Profile Settings Box */}
        <Link
          href="/account/profile"
          className="bg-darkSurface border border-zinc-800 hover:border-zinc-700 transition rounded-2xl p-6 shadow-card hover:shadow-cardHover flex flex-col justify-between group space-y-4"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 mb-4 group-hover:scale-105 transition">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-display font-black text-xl text-white uppercase">
              Profile & Details
            </h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Manage your display name, contact information, default Goa address, and account preferences.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-brandGold font-bold">
            <span>Edit Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
