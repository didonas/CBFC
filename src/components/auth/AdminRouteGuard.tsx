'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { ShieldAlert, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser, isHydrated, loginAsAdmin } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isHydrated) return;

    if (currentUser?.role === 'super_admin') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      // Supporter mode is active or user is not an admin — redirect immediately
      const timeout = setTimeout(() => {
        router.replace('/');
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [currentUser, isHydrated, pathname, router]);

  // While checking hydration
  if (!isHydrated || isAuthorized === null) {
    return (
      <div className="min-h-screen bg-brandBlack flex flex-col items-center justify-center p-6 text-center text-zinc-300">
        <div className="max-w-md w-full p-8 rounded-2xl bg-darkSurface border border-zinc-800 shadow-2xl flex flex-col items-center">
          <ClubCrest size={64} priority />
          <div className="mt-4 flex items-center gap-2 text-brandGold">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-display font-black text-sm uppercase tracking-widest">
              Verifying Admin Credentials...
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            Checking Churchill Brothers FC administrative access rights.
          </p>
        </div>
      </div>
    );
  }

  // If not authorized (Supporter role)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-brandBlack flex flex-col items-center justify-center p-6 text-center text-zinc-100">
        <div className="max-w-md w-full p-8 rounded-2xl bg-cardDark border border-primary/40 shadow-2xl flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-deepRed to-brandGold" />
          
          <ClubCrest size={64} priority />

          <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary text-primary text-xs font-display font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Admin Area Restricted</span>
          </div>

          <h2 className="mt-3 font-display font-black text-2xl text-white uppercase tracking-tight">
            Supporter Mode Active
          </h2>

          <p className="mt-2 text-xs text-zinc-300 leading-relaxed">
            Administrative pages require an Administrator role. You are currently browsing as{' '}
            <strong className="text-brandGold">{currentUser?.fullName || 'Demo Supporter'}</strong>.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Redirecting to public club platform...</span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 w-full">
            <Link
              href="/"
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <button
              onClick={() => {
                loginAsAdmin();
                setIsAuthorized(true);
              }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-deepRed text-white text-xs font-display font-bold uppercase tracking-wider transition shadow-club"
            >
              Switch to Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authorized Admin
  return <>{children}</>;
};
