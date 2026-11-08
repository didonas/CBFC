'use client';

import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';
import { DemoTicket } from '@/types';
import { ClubCrest } from './ClubCrest';
import { ShieldAlert, Download, Printer, CheckCircle, Calendar, MapPin, User, Hash } from 'lucide-react';

interface QRDemoTicketProps {
  ticket: DemoTicket;
  matchTitle: string;
  matchDate: string;
  venueName: string;
  customerName: string;
  ticketCategoryName: string;
  bookingReference: string;
}

export const QRDemoTicket: React.FC<QRDemoTicketProps> = ({
  ticket,
  matchTitle,
  matchDate,
  venueName,
  customerName,
  ticketCategoryName,
  bookingReference,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    QRCode.toDataURL(ticket.qrCodeData, {
      width: 220,
      margin: 1,
      color: {
        dark: '#111111',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error', err));
  }, [ticket.qrCodeData]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `CBFC_Demo_Ticket_${ticket.ticketNumber}.png`;
    link.click();
  };

  const d = new Date(matchDate);
  const formattedDate = d.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isCheckedIn = ticket.ticketStatus === 'checked_in';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-cardDark border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl max-w-2xl mx-auto my-4 text-white print:border-black print:text-black"
    >
      {/* Top Demo Warning Ribbon */}
      <div className="bg-primary px-4 py-2 flex items-center justify-between text-xs font-display font-black tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
          <span>DEMONSTRATION TICKET • NOT VALID FOR REAL STADIUM ADMISSION</span>
        </div>
        <span className="bg-black/30 px-2 py-0.5 rounded text-[10px]">DEMO MODE</span>
      </div>

      <div ref={ticketRef} className="p-6 md:p-8 space-y-6">
        {/* Ticket Header: Crest & Club Branding */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-700/60 gap-4">
          <div className="flex items-center gap-4">
            <ClubCrest size={52} />
            <div>
              <h2 className="font-display font-black text-2xl uppercase tracking-wider text-white">
                CHURCHILL BROTHERS FC
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
                  THE RED MACHINES
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-xs font-mono text-zinc-400">ESTD 1988</span>
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[10px] uppercase font-bold text-zinc-400 block tracking-wider">
              Booking Reference
            </span>
            <span className="font-mono font-bold text-base text-brandGold">
              {bookingReference}
            </span>
          </div>
        </div>

        {/* Match Details */}
        <div className="space-y-2">
          <span className="inline-block px-2.5 py-0.5 rounded bg-zinc-800 text-brandGold font-display font-bold text-xs uppercase tracking-wider">
            Official Fixture
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wide text-white">
            {matchTitle}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>{formattedDate} • {formattedTime} IST</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brandGold shrink-0" />
              <span>{venueName}</span>
            </div>
          </div>
        </div>

        {/* Perforated Divider Simulation */}
        <div className="relative py-2">
          <div className="border-t-2 border-dashed border-zinc-700 w-full" />
          <div className="absolute -left-10 -top-2 w-6 h-6 bg-brandBlack rounded-full" />
          <div className="absolute -right-10 -top-2 w-6 h-6 bg-brandBlack rounded-full" />
        </div>

        {/* Ticket Holder, Seat & QR Code Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Seat & Holder Details */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                  Ticket Holder
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span className="font-bold text-sm text-white truncate">{customerName}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                  Category
                </span>
                <span className="font-display font-bold text-sm text-brandGold block mt-0.5">
                  {ticketCategoryName}
                </span>
              </div>
            </div>

            <div className="bg-zinc-900/90 p-3.5 rounded-xl border border-zinc-700/80">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block mb-1">
                Allocated Seating & Gate Entry
              </span>
              <p className="font-mono text-sm font-bold text-white">
                {ticket.seatIdentifier}
              </p>
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                <span>Ticket ID: <span className="font-mono text-zinc-200">{ticket.ticketNumber}</span></span>
                {isCheckedIn ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    CHECKED IN
                  </span>
                ) : (
                  <span className="text-brandGold font-semibold">VALID (DEMO)</span>
                )}
              </div>
            </div>
          </div>

          {/* QR Code Canvas */}
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-inner border-2 border-zinc-300">
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={`QR code for ticket ${ticket.ticketNumber}`}
                className="w-36 h-36 object-contain"
              />
            ) : (
              <div className="w-36 h-36 bg-zinc-200 animate-pulse rounded" />
            )}
            <span className="font-mono font-bold text-[10px] text-zinc-800 mt-1 uppercase">
              SCAN AT TURNSTILE
            </span>
          </div>
        </div>

        {/* Security & Verification Watermark Notice */}
        <div className="pt-4 border-t border-zinc-800 text-center space-y-1">
          <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
            SIMULATED BARCODE TOKEN: {ticket.ticketNumber}
          </p>
          <p className="text-[10px] text-zinc-500 italic">
            This digital pass is generated strictly for demonstration purposes as part of the Churchill Brothers FC digital platform.
          </p>
        </div>
      </div>

      {/* Action Footer (Print / Download buttons) */}
      <div className="bg-zinc-900 px-6 py-3.5 border-t border-zinc-800 flex items-center justify-between gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition"
        >
          <Printer className="w-4 h-4 text-brandGold" />
          <span>Print Pass</span>
        </button>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary hover:bg-deepRed text-white text-xs font-display font-bold uppercase tracking-wider transition shadow-club"
        >
          <Download className="w-4 h-4" />
          <span>Save QR Ticket</span>
        </button>
      </div>
    </motion.div>
  );
};
