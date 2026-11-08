'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import {
  CheckCircle,
  Package,
  ShieldAlert,
  ArrowRight,
  Clock,
  Truck,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders } = useApp();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center space-y-4">
        <h1 className="font-display font-black text-3xl text-white">Order Not Found</h1>
        <p className="text-zinc-400 text-sm">We could not find this simulated order reference.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const steps = [
    'Demo Placed',
    'Demo Processing',
    'Demo Shipped',
    'Demo Delivered',
  ];

  const currentStepIndex = steps.indexOf(order.simulatedStatus);

  return (
    <div className="space-y-10 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-darkSurface to-emerald-950/40 border border-emerald-500/50 rounded-3xl p-6 sm:p-10 text-center space-y-3 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-display font-bold uppercase tracking-widest text-emerald-400 block">
          SIMULATED PURCHASE COMPLETE
        </span>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
          THANK YOU FOR YOUR ORDER!
        </h1>

        <p className="text-sm text-zinc-300 max-w-md mx-auto">
          Your demonstration order has been created. Reference:{' '}
          <span className="font-mono font-bold text-brandGold">{order.orderReference}</span>
        </p>

        {/* Demo Warning */}
        <div className="mt-4 p-3.5 bg-black/40 rounded-xl border border-primary/40 inline-flex items-center gap-2 text-xs text-zinc-300 max-w-lg">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
          <span className="text-left leading-relaxed">
            <strong className="text-white">DEMO STORE NOTICE:</strong> This is a simulated transaction. No physical shipment will take place and no funds were debited.
          </span>
        </div>
      </div>

      {/* Simulated Order Status Tracker */}
      <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
              Simulated Tracking Status
            </span>
            <span className="font-display font-black text-xl text-brandGold">
              {order.simulatedStatus}
            </span>
          </div>

          <Link
            href={`/admin/orders?ref=${order.orderReference}`}
            className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span>Update Status in Admin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {steps.map((st, idx) => {
            const isPassed = currentStepIndex >= idx;
            return (
              <div key={st} className="space-y-2">
                <div
                  className={`h-2 rounded-full ${
                    isPassed ? 'bg-primary' : 'bg-zinc-800'
                  }`}
                />
                <span
                  className={`block text-[11px] font-bold ${
                    isPassed ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {st}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details & Line Items */}
      <div className="bg-darkSurface border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h2 className="font-display font-bold text-lg text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
          Order Summary & Delivery Information
        </h2>

        {/* Items */}
        <div className="space-y-4 divide-y divide-zinc-800">
          {order.items.map((item, idx) => (
            <div key={idx} className="pt-4 first:pt-0 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                  <Image src={item.imageUrl} alt={item.productName} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{item.productName}</h3>
                  <span className="text-zinc-400">Size: {item.size} • Qty: {item.quantity}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display font-bold text-base text-white">
                  ₹{item.totalPriceInr.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals & Delivery Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-800 text-xs">
          <div className="space-y-1 text-zinc-300">
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
              Simulated Shipping Destination
            </span>
            <p className="font-bold text-white">{order.customerName}</p>
            <p>{order.shippingAddressLine1}</p>
            {order.shippingAddressLine2 && <p>{order.shippingAddressLine2}</p>}
            <p>{order.shippingCity}, {order.shippingState} {order.shippingPostalCode}</p>
            <p className="text-zinc-400">Phone: {order.customerPhone}</p>
          </div>

          <div className="space-y-2 text-right">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal:</span>
              <span className="font-bold text-white">₹{order.subtotalInr.toLocaleString('en-IN')}</span>
            </div>
            {order.discountInr > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount:</span>
                <span>-₹{order.discountInr.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Shipping:</span>
              <span>{order.shippingInr === 0 ? 'FREE' : `₹${order.shippingInr}`}</span>
            </div>
            <div className="pt-2 border-t border-zinc-800 flex justify-between font-display font-black text-xl text-primary">
              <span>Simulated Total:</span>
              <span>₹{order.totalInr.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <Link
          href="/shop"
          className="text-xs font-semibold text-zinc-400 hover:text-white"
        >
          ← Continue Browsing Megastore
        </Link>

        <Link
          href="/account/orders"
          className="px-6 py-3 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
        >
          <span>View All Orders in Account</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
