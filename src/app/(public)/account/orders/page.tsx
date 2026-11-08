'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import {
  ArrowLeft,
  ShoppingBag,
  PackageCheck,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export default function AccountOrdersPage() {
  const { orders } = useApp();

  return (
    <div className="space-y-10 py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
          PURCHASE HISTORY
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-1">
          MY DEMO ORDERS ({orders.length})
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold text-xl text-white uppercase">
            No simulated orders yet
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Browse our official jerseys and merchandise in the club megastore to place a demo order.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-primary text-white font-display font-bold text-xs uppercase tracking-wider"
          >
            Visit Megastore
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Order Reference
                  </span>
                  <span className="font-mono font-bold text-sm text-white">
                    {order.orderReference}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Placed On
                  </span>
                  <span className="text-zinc-300">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Simulated Status
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-900 border border-brandGold/40 text-brandGold font-bold text-[11px]">
                    {order.simulatedStatus}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                    Total
                  </span>
                  <span className="font-display font-black text-base text-primary">
                    ₹{order.totalInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                      <Image src={item.imageUrl} alt={item.productName} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white truncate">{item.productName}</h4>
                      <span className="text-zinc-400">Qty: {item.quantity} • Size: {item.size}</span>
                    </div>
                    <span className="font-display font-bold text-zinc-300">
                      ₹{item.totalPriceInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Link to order receipt */}
              <div className="pt-3 border-t border-zinc-800 flex justify-end">
                <Link
                  href={`/order-confirmation/${order.id}`}
                  className="inline-flex items-center gap-1 text-xs text-brandGold font-semibold hover:underline"
                >
                  <span>View Full Simulated Receipt & Tracking</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
