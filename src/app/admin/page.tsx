'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminStatsCard } from '@/components/admin/AdminStatsCard';
import {
  Ticket,
  ShoppingBag,
  Users,
  Calendar,
  AlertTriangle,
  TrendingUp,
  PackageCheck,
  QrCode,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { bookings, orders, products, matches, players, ticketCategories } = useApp();

  // Metrics
  const totalBookingsCount = bookings.length;
  const totalTicketsIssued = bookings.reduce((sum, b) => sum + b.quantity, 0);
  const totalOrdersCount = orders.length;
  const totalSalesInr = orders.reduce((sum, o) => sum + o.totalInr, 0);

  const totalDemoTicketsAvailable = ticketCategories.reduce((sum, c) => sum + c.demoAvailable, 0);

  // Low stock variants (< 15 items)
  const lowStockVariants: { product: string; size: string; stock: number; variantId: string }[] = [];
  products.forEach((p) => {
    p.variants.forEach((v) => {
      if (v.demoStockQuantity < 15) {
        lowStockVariants.push({
          product: p.name,
          size: v.size,
          stock: v.demoStockQuantity,
          variantId: v.id,
        });
      }
    });
  });

  const recentBookings = bookings.slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Club Administration Overview"
        subtitle="Real-time monitoring of simulated ticketing, e-commerce orders, inventory and club operations."
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatsCard
            title="Demo Ticket Bookings"
            value={totalBookingsCount}
            subtitle={`${totalTicketsIssued} individual passes issued`}
            icon={Ticket}
            badge="Simulated"
            badgeColor="primary"
          />

          <AdminStatsCard
            title="Available Demo Seats"
            value={totalDemoTicketsAvailable}
            subtitle="Across upcoming matches"
            icon={QrCode}
            badge="Live Quota"
            badgeColor="emerald"
          />

          <AdminStatsCard
            title="Demo Merchandise Orders"
            value={totalOrdersCount}
            subtitle="Total simulated customer orders"
            icon={PackageCheck}
            badge="Demo Store"
            badgeColor="gold"
          />

          <AdminStatsCard
            title="Simulated Sales Value"
            value={`₹${totalSalesInr.toLocaleString('en-IN')}`}
            subtitle="Simulated gross merchandise volume"
            icon={TrendingUp}
            badge="Non-monetary"
            badgeColor="amber"
          />
        </div>

        {/* Middle Two-Column Grid: Recent Bookings & Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-lg text-white uppercase">
                  Recent Ticket Bookings
                </h2>
              </div>
              <Link
                href="/admin/bookings"
                className="text-xs text-brandGold hover:underline font-semibold flex items-center gap-1"
              >
                <span>View All & Scan QR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-500">
                No demo ticket bookings recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-white block">
                        {b.bookingReference}
                      </span>
                      <span className="text-zinc-400">
                        {b.customerName} • {b.quantity} seat(s) ({b.ticketCategoryName})
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          b.bookingStatus === 'confirmed'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                      <span className="text-zinc-400 text-[11px] block mt-1">
                        ₹{b.totalAmountInr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Demo Orders */}
          <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brandGold" />
                <h2 className="font-display font-bold text-lg text-white uppercase">
                  Recent Merchandise Orders
                </h2>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs text-brandGold hover:underline font-semibold flex items-center gap-1"
              >
                <span>Manage Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-500">
                No simulated merchandise orders placed yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-850 text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-white block">
                        {o.orderReference}
                      </span>
                      <span className="text-zinc-400">
                        {o.customerName} • {o.items.length} item(s)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-brandGold/40 text-brandGold">
                        {o.simulatedStatus}
                      </span>
                      <span className="font-display font-bold text-white text-xs block mt-1">
                        ₹{o.totalInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Alerts & Quick Restock */}
        <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="font-display font-bold text-lg text-white uppercase">
                Demo Inventory Alerts ({lowStockVariants.length})
              </h2>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs text-brandGold hover:underline font-semibold flex items-center gap-1"
            >
              <span>Full Inventory Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {lowStockVariants.length === 0 ? (
            <p className="text-xs text-emerald-400 py-3">
              All product variants maintain sufficient demo stock quantities.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {lowStockVariants.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-950 rounded-xl border border-amber-900/40 flex items-center justify-between text-xs"
                >
                  <div>
                    <h3 className="font-bold text-white truncate max-w-[180px]">{item.product}</h3>
                    <span className="text-zinc-400 text-[11px]">Size: {item.size}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-400 block">
                      {item.stock} left
                    </span>
                    <Link
                      href="/admin/inventory"
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      Restock →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
