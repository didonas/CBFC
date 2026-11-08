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
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
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
          <div className="bg-white border border-lightBorder shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-lightBorder pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-lg text-charcoal uppercase">
                  Recent Ticket Bookings
                </h2>
              </div>
              <Link
                href="/admin/bookings"
                className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
              >
                <span>View All & Scan QR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <div className="py-8 text-center text-xs text-mutedGrey">
                No demo ticket bookings recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between p-3 bg-offWhite border border-lightBorder text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-charcoal block">
                        {b.bookingReference}
                      </span>
                      <span className="text-mutedGrey">
                        {b.customerName} • {b.quantity} seat(s) ({b.ticketCategoryName})
                      </span>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          b.bookingStatus === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                      <span className="text-mutedGrey text-[11px] block mt-1">
                        ₹{b.totalAmountInr}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Demo Orders */}
          <div className="bg-white border border-lightBorder shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-lightBorder pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-lg text-charcoal uppercase">
                  Recent Merchandise Orders
                </h2>
              </div>
              <Link
                href="/admin/orders"
                className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
              >
                <span>Manage Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-mutedGrey">
                No simulated merchandise orders placed yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((o) => (
                  <div
                    key={o.id}
                    className="flex items-center justify-between p-3 bg-offWhite border border-lightBorder text-xs"
                  >
                    <div>
                      <span className="font-mono font-bold text-charcoal block">
                        {o.orderReference}
                      </span>
                      <span className="text-mutedGrey">
                        {o.customerName} • {o.items.length} item(s)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-offWhite border border-lightBorder text-charcoal">
                        {o.simulatedStatus}
                      </span>
                      <span className="font-display font-bold text-primary text-xs block mt-1">
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
        <div className="bg-white border border-lightBorder shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-lightBorder pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="font-display font-bold text-lg text-charcoal uppercase">
                Demo Inventory Alerts ({lowStockVariants.length})
              </h2>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              <span>Full Inventory Control</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {lowStockVariants.length === 0 ? (
            <p className="text-xs text-emerald-700 py-3">
              All product variants maintain sufficient demo stock quantities.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {lowStockVariants.slice(0, 6).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-offWhite border border-amber-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <h3 className="font-bold text-charcoal truncate max-w-[180px]">{item.product}</h3>
                    <span className="text-mutedGrey text-[11px]">Size: {item.size}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-700 block">
                      {item.stock} left
                    </span>
                    <Link
                      href="/admin/inventory"
                      className="text-[10px] text-primary hover:underline font-bold"
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
