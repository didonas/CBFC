'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ClubCrest } from '@/components/ui/ClubCrest';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  Ticket,
  QrCode,
  ShoppingBag,
  Boxes,
  PackageCheck,
  Newspaper,
  Image,
  Award,
  ShieldCheck,
  Settings,
  ArrowLeft,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Squad & Players', href: '/admin/players', icon: Users },
  { label: 'Coaching Staff', href: '/admin/staff', icon: UserCheck },
  { label: 'Matches & Fixtures', href: '/admin/matches', icon: Calendar },
  { label: 'Ticket Categories', href: '/admin/tickets', icon: Ticket },
  { label: 'Bookings & QR Check-in', href: '/admin/bookings', icon: QrCode },
  { label: 'Merchandise Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Inventory Control', href: '/admin/inventory', icon: Boxes },
  { label: 'Demo Orders', href: '/admin/orders', icon: PackageCheck },
  { label: 'News & CMS', href: '/admin/news', icon: Newspaper },
  { label: 'Media Gallery', href: '/admin/media', icon: Image },
  { label: 'Sponsors & Partners', href: '/admin/sponsors', icon: Award },
  { label: 'Supporters & Users', href: '/admin/customers', icon: ShieldCheck },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { loginAsFan } = useApp();

  const handleSwitchToSupporter = () => {
    loginAsFan();
    router.replace('/');
  };

  const isCurrent = (href: string) => {
    if (href === '/admin' && pathname === '/admin') return true;
    if (href !== '/admin' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className="w-64 bg-white border-r border-lightBorder flex flex-col shrink-0 min-h-screen">
      {/* Admin Brand Header */}
      <div className="p-5 border-b border-lightBorder flex items-center gap-3">
        <ClubCrest size={38} />
        <div>
          <span className="font-display font-black text-sm text-charcoal uppercase tracking-wider block">
            CBFC ADMIN
          </span>
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest block">
            CLUB MANAGEMENT
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isCurrent(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded text-xs font-semibold transition ${
                active
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'text-charcoal hover:bg-offWhite hover:text-primary'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Return to Public Site & Switch to Supporter */}
      <div className="p-4 border-t border-lightBorder space-y-2">
        <button
          onClick={handleSwitchToSupporter}
          className="w-full flex items-center justify-between px-3 py-2 rounded bg-offWhite hover:bg-zinc-200 text-xs text-charcoal font-semibold transition border border-lightBorder"
          title="Switch role to supporter and exit administration"
        >
          <span className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-primary" />
            <span>Switch to Supporter</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-mutedGrey">Exit</span>
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded bg-white hover:bg-offWhite border border-lightBorder text-xs text-mutedGrey hover:text-charcoal font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4 text-mutedGrey" />
          <span>Exit to Public Website</span>
        </Link>
      </div>
    </aside>
  );
};
