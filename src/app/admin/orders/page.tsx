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
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Simulated Merchandise Orders"
        subtitle="Review orders, progress simulated shipping statuses, and inspect line item quantities."
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-lightBorder shadow-card">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-mutedGrey absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ref, customer, email..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-offWhite border border-lightBorder rounded pl-9 pr-4 py-2 text-xs text-charcoal focus:outline-none focus:border-primary transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-mutedGrey font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-offWhite border border-lightBorder rounded px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-primary"
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
          <div className="bg-white border border-lightBorder shadow-card p-12 text-center text-mutedGrey">
            <PackageCheck className="w-8 h-8 mx-auto text-mutedGrey mb-2" />
            <p className="text-sm font-semibold text-charcoal">No simulated orders found</p>
            <p className="text-xs mt-1">Place a demonstration order on the public store to test.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filtered.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-lightBorder shadow-card p-6 space-y-4"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-lightBorder text-xs">
                  <div>
                    <span className="text-mutedGrey uppercase text-[10px] font-bold block">
                      Order Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-primary">
                      {order.orderReference}
                    </span>
                  </div>

                  <div>
                    <span className="text-mutedGrey uppercase text-[10px] font-bold block">
                      Customer
                    </span>
                    <span className="font-bold text-charcoal text-sm">
                      {order.customerName}
                    </span>
                    <span className="text-mutedGrey text-[11px] block">{order.customerEmail}</span>
                  </div>

                  <div>
                    <span className="text-mutedGrey uppercase text-[10px] font-bold block">
                      Total
                    </span>
                    <span className="font-display font-black text-base text-primary">
                      ₹{order.totalInr.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-mutedGrey uppercase text-[10px] font-bold">
                      Simulated Status:
                    </span>
                    <select
                      value={order.simulatedStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as SimulatedOrderStatus)}
                      className="bg-offWhite border border-lightBorder text-charcoal font-bold rounded px-2.5 py-1 text-xs focus:outline-none focus:border-primary"
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
                    <span className="text-[10px] text-mutedGrey uppercase font-bold tracking-wider block">
                      Purchased Items ({order.items.length})
                    </span>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-offWhite p-2.5 border border-lightBorder">
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-white border border-lightBorder shrink-0">
                          <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-charcoal truncate">{item.productName}</h4>
                          <span className="text-mutedGrey text-[11px]">Size: {item.size} • Qty: {item.quantity}</span>
                        </div>
                        <span className="font-mono text-charcoal font-bold">
                          ₹{item.totalPriceInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-offWhite p-3.5 border border-lightBorder space-y-1">
                    <span className="text-[10px] text-mutedGrey uppercase font-bold tracking-wider block mb-1">
                      Destination Address
                    </span>
                    <p className="font-bold text-charcoal">{order.customerName}</p>
                    <p className="text-charcoal">{order.shippingAddressLine1}</p>
                    {order.shippingAddressLine2 && <p className="text-mutedGrey">{order.shippingAddressLine2}</p>}
                    <p className="text-charcoal">{order.shippingCity}, {order.shippingState} {order.shippingPostalCode}</p>
                    <p className="text-mutedGrey pt-1">Phone: {order.customerPhone}</p>
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
