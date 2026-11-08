'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ShieldAlert, User, ExternalLink, RotateCcw } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const { currentUser, resetAllDemoData } = useApp();

  return (
    <header className="bg-white border-b border-lightBorder px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-display font-black text-2xl text-charcoal uppercase tracking-wide">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-mutedGrey mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          SIMULATION ACTIVE
        </span>

        <button
          onClick={() => {
            if (confirm('Reset demo state to seed data?')) resetAllDemoData();
          }}
          className="p-2 rounded bg-offWhite hover:bg-zinc-200 border border-lightBorder text-charcoal transition"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-lightBorder text-xs text-charcoal">
          <User className="w-4 h-4 text-primary" />
          <span className="font-semibold">{currentUser?.fullName || 'Administrator'}</span>
        </div>
      </div>
    </header>
  );
};
