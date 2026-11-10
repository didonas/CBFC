'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import {
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { currentUser, loginAsAdmin, loginAsFan, resetAllDemoData } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAdmin = currentUser?.role === 'super_admin';

  const handleToggleRole = () => {
    if (isAdmin) {
      loginAsFan();
      if (pathname.startsWith('/admin')) {
        router.replace('/');
      }
    } else {
      loginAsAdmin();
      if (!pathname.startsWith('/admin')) {
        router.push('/admin');
      }
    }
  };

  return (
    <div className="bg-[#181818] border-b border-[#2C2C2C] text-[11px] text-[#A09D95] relative z-50">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-7 sm:h-8 flex items-center justify-between gap-4">
        {/* Left: Discrete simulation note */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
          <span className="text-[#EAE8E2] font-medium tracking-wide">Club Demonstration Platform</span>
          <span className="hidden sm:inline text-[#555]">•</span>
          <span className="hidden sm:inline text-[#8E8B83]">Simulated non-monetary transactions only</span>
        </div>

        {/* Right: Clean, minimal role indicator & switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[#77736D] hidden md:inline">Viewing as:</span>
            <span className="font-semibold text-[#EAE8E2]">
              {isAdmin ? 'Administrator' : 'Supporter'}
            </span>
          </div>

          <button
            onClick={handleToggleRole}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border border-[#3A3A3A] hover:border-burgundy text-[10px] font-sans font-bold uppercase tracking-wider text-[#EAE8E2] hover:text-white transition"
          >
            <RefreshCw className="w-2.5 h-2.5 text-burgundy" />
            <span>{isAdmin ? 'Switch to Fan' : 'Switch to Admin'}</span>
          </button>

          {isAdmin && !pathname.startsWith('/admin') && (
            <Link
              href="/admin"
              className="text-[10px] font-bold uppercase tracking-wider text-burgundy hover:text-white transition inline-flex items-center gap-0.5"
            >
              <span>Portal</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#77736D] hover:text-[#EAE8E2] transition ml-1"
            title="Toggle simulation details"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expandable Explanation Drawer */}
      {isExpanded && (
        <div className="bg-[#141414] border-t border-[#2C2C2C] px-4 sm:px-8 py-3 text-[#A09D95]">
          <div className="w-full max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Zero real financial transactions. All ticket bookings, QR codes, and merchandise orders are simulated in-app.
              </span>
            </div>

            <button
              onClick={() => {
                if (confirm('Reset all demo orders, bookings, and inventory to initial state?')) {
                  resetAllDemoData();
                }
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900 transition text-[11px] font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
