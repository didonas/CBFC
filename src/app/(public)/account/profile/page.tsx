'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ArrowLeft, User, CheckCircle, Save } from 'lucide-react';

export default function AccountProfilePage() {
  const { currentUser, updateProfile } = useApp();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, email, phone });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-10 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>Back to Account Overview</span>
        </Link>
      </div>

      <div className="border-b border-zinc-800 pb-6">
        <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
          SUPPORTER SETTINGS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
          PROFILE MANAGEMENT
        </h1>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6 text-xs shadow-2xl"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-zinc-400 font-semibold mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary transition"
              />
            </div>
          </div>
        </div>

        {savedMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROFILE CHANGES</span>
          </button>
        </div>
      </form>
    </div>
  );
}
