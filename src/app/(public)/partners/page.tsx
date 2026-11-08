'use client';

import React from 'react';
import Image from 'next/image';
import { SPONSORS } from '@/lib/demo-data';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function PartnersPage() {
  const principal = SPONSORS.filter((s) => s.tier === 'Principal' || s.tier === 'Kit Manufacturer');
  const official = SPONSORS.filter((s) => s.tier === 'Official Partner' || s.tier === 'Associate Partner');

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-display font-bold uppercase tracking-widest text-brandGold">
          <Award className="w-3.5 h-3.5" />
          COMMERCIAL & TECHNICAL PARTNERSHIPS
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          OFFICIAL CLUB PARTNERS
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Churchill Brothers FC Goa proudly partners with industry leaders who share our commitment to athletic excellence and Goan football heritage.
        </p>
      </div>

      {/* Principal & Technical Partners */}
      <div className="space-y-6">
        <h2 className="font-display font-bold text-xl text-brandGold uppercase tracking-wider">
          Principal & Technical Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principal.map((sp) => (
            <div
              key={sp.id}
              className="bg-darkSurface border border-zinc-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6 shadow-card hover:border-zinc-700 transition"
            >
              <div className="relative w-36 h-20 bg-zinc-950 rounded-xl p-3 border border-zinc-800 shrink-0">
                <Image src={sp.logoUrl} alt={sp.name} fill sizes="144px" className="object-contain p-2" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-primary block">
                  {sp.tier}
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  {sp.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {sp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official & Associate Partners */}
      <div className="space-y-6 pt-6">
        <h2 className="font-display font-bold text-xl text-white uppercase tracking-wider">
          Official & Associate Partners
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {official.map((sp) => (
            <div
              key={sp.id}
              className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-card hover:border-zinc-700 transition space-y-4"
            >
              <div className="relative w-full h-16 bg-zinc-950 rounded-lg p-2 border border-zinc-800">
                <Image src={sp.logoUrl} alt={sp.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-contain p-2" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brandGold block">
                  {sp.tier}
                </span>
                <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">
                  {sp.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {sp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
