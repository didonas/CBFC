'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  AlertCircle,
  ShieldAlert,
  User,
  LogOut,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, loginAsAdmin, loginAsFan, logout, resetAllDemoData } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAdmin = currentUser?.role === 'super_admin';

  const handleSwitchToFan = () => {
    loginAsFan();
    if (pathname.startsWith('/admin')) {
      router.replace('/');
    }
  };

  const handleSwitchToAdmin = () => {
    loginAsAdmin();
    if (!pathname.startsWith('/admin')) {
      router.push('/admin');
    }
  };

  const handleToggleRole = () => {
    if (isAdmin) {
      handleSwitchToFan();
    } else {
      handleSwitchToAdmin();
    }
  };

  return (
    <div className="bg-charcoal border-b border-zinc-800 text-xs text-zinc-300 relative z-50">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Demo badge & notice */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary text-white font-display font-bold uppercase tracking-wider text-[11px] shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5" />
            DEMO MODE ENABLED
          </span>
          <span className="hidden sm:inline text-zinc-400">
            Simulated club platform. No real payments, banking details or entry permissions.
          </span>
        </div>

        {/* Right: Quick Role Switcher & Controls */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-zinc-800 px-2 py-1 rounded border border-zinc-700">
              <User className="w-3.5 h-3.5 text-brandGold" />
              <span className="text-white font-medium truncate max-w-[120px] sm:max-w-[150px]">
                {currentUser.fullName}
              </span>
              <span
                className={`text-[10px] uppercase px-1.5 py-0.5 rounded font-display font-bold tracking-wider ${
                  isAdmin
                    ? 'bg-primary text-white'
                    : 'bg-brandGold text-brandBlack'
                }`}
              >
                {isAdmin ? 'ADMIN' : 'SUPPORTER'}
              </span>
              {isAdmin && !pathname.startsWith('/admin') ? (
                <Link
                  href="/admin"
                  className="ml-1 text-primary hover:text-white font-semibold transition flex items-center gap-0.5"
                >
                  <span>Admin</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ) : null}
            </div>
          ) : (
            <span className="text-zinc-400 italic">Browsing as Guest</span>
          )}

          {/* Master "Switch Role" Action Button */}
          <button
            onClick={handleToggleRole}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-display font-bold text-[11px] uppercase tracking-wider transition shadow-sm ${
              isAdmin
                ? 'bg-brandGold hover:bg-yellow-400 text-brandBlack'
                : 'bg-primary hover:bg-deepRed text-white'
            }`}
            title={isAdmin ? 'Switch to Supporter Mode (exits /admin)' : 'Switch to Admin Mode (navigates to /admin)'}
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isAdmin ? 'Switch to Supporter' : 'Switch to Admin'}</span>
          </button>

          {/* Quick Direct Role Buttons */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
            <button
              onClick={handleSwitchToAdmin}
              className={`px-2 py-0.5 rounded transition text-[10px] font-bold uppercase tracking-wider ${
                isAdmin
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Switch directly to Super Admin"
            >
              Admin
            </button>
            <button
              onClick={handleSwitchToFan}
              className={`px-2 py-0.5 rounded transition text-[10px] font-bold uppercase tracking-wider ${
                !isAdmin
                  ? 'bg-brandGold text-brandBlack shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Switch directly to Supporter"
            >
              Supporter
            </button>
          </div>

          {currentUser && (
            <button
              onClick={logout}
              className="p-1 rounded bg-zinc-800 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 transition"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition"
            title="Toggle demo explanation"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Explanation Drawer */}
      {isExpanded && (
        <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-3 text-zinc-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-primary" />
                Zero Financial Transactions
              </p>
              <p className="text-zinc-400">
                All merchandise checkout and ticket bookings are fully simulated. No payment gateway, credit card fields, or real money is used.
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-brandGold" />
                Simulated Tickets & QR Check-in
              </p>
              <p className="text-zinc-400">
                Tickets generate real scannable QR payloads with booking references. In the Admin Dashboard, use the simulated Gate Scanner to test check-in!
              </p>
            </div>
            <div className="space-y-1 flex flex-col justify-between">
              <div>
                <p className="font-semibold text-white">Reset Demo Environment</p>
                <p className="text-zinc-400">Restore default demo inventory, fixtures, and orders.</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Reset all demo orders, bookings, and inventory to initial state?')) {
                    resetAllDemoData();
                  }
                }}
                className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/80 border border-red-800 text-red-200 hover:bg-red-900 transition text-[11px] font-semibold w-fit"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Sample Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
