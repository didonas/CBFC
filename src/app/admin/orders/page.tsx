'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SimulatedOrderStatus } from '@/types';
import { PackageCheck, Search, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useApp();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses: ('All' | SimulatedOrderStatus)[] = [
    'All',
    'Demo Placed',
    'Demo Processing',
    'Demo Shipped',
    'Demo Delivered',
    'Demo Cancelled',
  ];

  const filtered = orders.filter((o) => {
    const matchesStatus = selectedStatus === 'All' || o.simulatedStatus === selectedStatus;
    const matchesSearch =
      o.orderReference.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Simulated Merchandise Orders"
        subtitle="Review orders, progress simulated shipping statuses, and inspect line item quantities."
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ref, customer, email..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-zinc-400 font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
            <PackageCheck className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
            <p className="text-sm font-semibold text-white">No simulated orders found</p>
            <p className="text-xs mt-1">Place a demonstration order on the public store to test.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card space-y-4"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-brandGold">
                      {order.orderReference}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Customer
                    </span>
                    <span className="font-bold text-white text-sm">
                      {order.customerName}
                    </span>
                    <span className="text-zinc-400 text-[11px] block">{order.customerEmail}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Total
                    </span>
                    <span className="font-display font-black text-base text-primary">
                      ₹{order.totalInr.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 uppercase text-[10px] font-bold">
                      Simulated Status:
                    </span>
                    <select
                      value={order.simulatedStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as SimulatedOrderStatus)}
                      className="bg-zinc-950 border border-brandGold/40 text-brandGold font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                    >
                      <option value="Demo Placed">Demo Placed</option>
                      <option value="Demo Processing">Demo Processing</option>
                      <option value="Demo Shipped">Demo Shipped</option>
                      <option value="Demo Delivered">Demo Delivered</option>
                      <option value="Demo Cancelled">Demo Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Line Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                      Purchased Items ({order.items.length})
                    </span>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                          <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white truncate">{item.productName}</h4>
                          <span className="text-zinc-400 text-[11px]">Size: {item.size} • Qty: {item.quantity}</span>
                        </div>
                        <span className="font-mono text-zinc-300 font-bold">
                          ₹{item.totalPriceInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-850 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block mb-1">
                      Destination Address
                    </span>
                    <p className="font-bold text-white">{order.customerName}</p>
                    <p className="text-zinc-300">{order.shippingAddressLine1}</p>
                    {order.shippingAddressLine2 && <p className="text-zinc-400">{order.shippingAddressLine2}</p>}
                    <p className="text-zinc-300">{order.shippingCity}, {order.shippingState} {order.shippingPostalCode}</p>
                    <p className="text-zinc-400 pt-1">Phone: {order.customerPhone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
