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
    <header className="bg-darkSurface border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-display font-black text-2xl text-white uppercase tracking-wide">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/80 border border-red-800 text-red-200 text-xs font-bold font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          SIMULATION ACTIVE
        </span>

        <button
          onClick={() => {
            if (confirm('Reset demo state to seed data?')) resetAllDemoData();
          }}
          className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
          title="Reset Demo Data"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-zinc-700 text-xs text-zinc-300">
          <User className="w-4 h-4 text-brandGold" />
          <span className="font-semibold">{currentUser?.fullName || 'Administrator'}</span>
        </div>
      </div>
    </header>
  );
};
