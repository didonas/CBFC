'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import {
  Ticket,
  QrCode,
  CheckCircle,
  AlertCircle,
  Trash2,
  Search,
  Scan,
  User,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

function BookingsContent() {
  const searchParams = useSearchParams();
  const initialScanParam = searchParams.get('scan') || '';

  const { bookings, cancelDemoBooking, scanTicket } = useApp();

  const [scanQuery, setScanQuery] = useState(initialScanParam);
  const [scanMessage, setScanMessage] = useState<{
    success: boolean;
    text: string;
    holder?: string;
    seat?: string;
  } | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Auto-scan if query param present
  useEffect(() => {
    if (initialScanParam) {
      handleScan(initialScanParam);
    }
  }, [initialScanParam]);

  const handleScan = (queryToScan: string) => {
    if (!queryToScan.trim()) return;
    const res = scanTicket(queryToScan);
    setScanMessage({
      success: res.success,
      text: res.message,
      holder: res.booking?.customerName,
      seat: res.ticket?.seatIdentifier,
    });
  };

  const filteredBookings = bookings.filter((b) =>
    b.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.bookingReference.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.customerEmail.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Demo Bookings & Turnstile QR Scanner"
        subtitle="Review ticket reservations, validate QR codes, simulate stadium admission and manage capacities."
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Interactive QR Scanner Simulation Card */}
        <div className="bg-gradient-to-r from-darkSurface via-zinc-900 to-darkSurface border-2 border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Scan className="w-6 h-6 text-brandGold" />
            <h2 className="font-display font-black text-xl text-white uppercase tracking-wider">
              Gate Turnstile QR Scanner Simulator
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Enter or paste any ticket number (e.g. CBFC-TKT-XXXXXX-01) or QR code payload to simulate real-time stadium turnstile scanning.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan(scanQuery);
            }}
            className="flex flex-col sm:flex-row gap-3 pt-2"
          >
            <div className="relative flex-1">
              <QrCode className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Scan / Enter Ticket Number (e.g. CBFC-TKT-XXXXXX-01)..."
                value={scanQuery}
                onChange={(e) => setScanQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary font-mono transition"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club shrink-0 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Validate Pass</span>
            </button>
          </form>

          {/* Scanner Feedback Box */}
          {scanMessage && (
            <div
              className={`p-4 rounded-xl border text-xs flex items-start gap-3 mt-4 animate-in fade-in duration-200 ${
                scanMessage.success
                  ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                  : 'bg-red-950/80 border-red-700 text-red-200'
              }`}
            >
              {scanMessage.success ? (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold text-sm block">
                  {scanMessage.success ? '✓ ENTRY PERMITTED (DEMO)' : '✕ ACCESS DENIED'}
                </span>
                <p className="leading-relaxed">{scanMessage.text}</p>
                {scanMessage.holder && (
                  <p className="text-[11px] font-mono text-zinc-300">
                    Holder: <strong className="text-white">{scanMessage.holder}</strong> • Seat: <strong className="text-white">{scanMessage.seat}</strong>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bookings Table Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-darkSurface p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bookings by name, ref, email..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition"
            />
          </div>

          <span className="text-xs text-zinc-400">
            Total Bookings: <strong className="text-white">{bookings.length}</strong>
          </span>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-12 text-center text-zinc-400">
            <Ticket className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
            <p className="text-sm font-semibold text-white">No demo bookings match criteria</p>
            <p className="text-xs mt-1">Book sample tickets from the public website to test.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Booking Reference
                    </span>
                    <span className="font-mono font-bold text-sm text-brandGold">
                      {b.bookingReference}
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Customer
                    </span>
                    <span className="font-bold text-white text-sm">
                      {b.customerName}
                    </span>
                    <span className="text-zinc-400 text-[11px] block">{b.customerEmail}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Match Fixture
                    </span>
                    <span className="font-bold text-white text-xs block">
                      {b.matchTitle}
                    </span>
                    <span className="text-zinc-400 text-[11px] block">{b.ticketCategoryName}</span>
                  </div>

                  <div>
                    <span className="text-zinc-500 uppercase text-[10px] font-bold block">
                      Status
                    </span>
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        b.bookingStatus === 'confirmed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-red-950 text-red-400 border border-red-800'
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </div>

                  {b.bookingStatus === 'confirmed' && (
                    <button
                      onClick={() => {
                        if (confirm(`Cancel booking ${b.bookingReference}? Capacity will be returned.`)) {
                          cancelDemoBooking(b.id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-950/80 text-red-300 border border-red-900/40 text-xs font-semibold transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>

                {/* Individual Tickets Sub-list */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase text-zinc-400 block tracking-wider">
                    Individual Passes ({b.tickets.length}):
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {b.tickets.map((t) => (
                      <div
                        key={t.id}
                        className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white">
                              {t.ticketNumber}
                            </span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                                t.ticketStatus === 'checked_in'
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : 'bg-zinc-800 text-brandGold'
                              }`}
                            >
                              {t.ticketStatus === 'checked_in' ? 'CHECKED IN' : 'VALID'}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 block mt-0.5">
                            {t.seatIdentifier}
                          </span>
                        </div>

                        {t.ticketStatus !== 'checked_in' && b.bookingStatus === 'confirmed' && (
                          <button
                            onClick={() => {
                              setScanQuery(t.ticketNumber);
                              handleScan(t.ticketNumber);
                            }}
                            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-primary text-white text-[11px] font-semibold shrink-0 transition"
                          >
                            Simulate Scan
                          </button>
                        )}
                      </div>
                    ))}
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

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-400">Loading bookings & scanner...</div>}>
      <BookingsContent />
    </Suspense>
  );
}
