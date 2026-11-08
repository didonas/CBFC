'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { CLUB_INFO, CLUB_HONOURS, TIMELINE_MILESTONES, VENUES } from '@/lib/demo-data';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import {
  Trophy,
  Shield,
  Star,
  MapPin,
  Calendar,
  Flame,
  Instagram,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function ClubPage() {
  return (
    <div className="space-y-16 lg:space-y-24 py-10">
      {/* =====================================================================
          1. CLUB HERO / IDENTITY HEADER
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-darkSurface via-zinc-900 to-brandBlack border border-zinc-800 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle Watermark Crest in Background */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none w-96 h-96">
            <ClubCrest size={380} />
          </div>

          <div className="max-w-3xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-display font-bold uppercase tracking-widest text-brandGold">
              <Star className="w-3.5 h-3.5 fill-brandGold" />
              THE RED MACHINES • ESTABLISHED 1988
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
              CHURCHILL BROTHERS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-brandGold">
                FOOTBALL CLUB GOA
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
              Founded in 1988 in Varca, South Goa, Churchill Brothers Football Club stands as an indomitable institution in Indian sports. Revered nationwide as &ldquo;The Red Machines&rdquo;, the club is defined by attacking flair, passionate supporter loyalty, and two national I-League championship stars.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-display font-bold uppercase tracking-wider">
              <span className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">
                Founder: Churchill Alemao
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">
                Home Ground: Fatorda Stadium
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">
                Location: Margao, South Goa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TROPHY CABINET & HONOURS
          ===================================================================== */}
      <section id="honours" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
            HALL OF GLORY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            THE TROPHY CABINET
          </h2>
          <p className="text-sm text-zinc-400">
            A testament to nearly four decades of grit, determination, and football championships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLUB_HONOURS.map((honour, idx) => (
            <div
              key={idx}
              className="bg-darkSurface border border-zinc-800 hover:border-brandGold/50 transition-all rounded-2xl p-6 shadow-card hover:shadow-cardHover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-brandGold">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="font-display font-black text-4xl text-white">
                    x{honour.count}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                  {honour.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  {honour.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block tracking-wider">
                  Winning Campaigns
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {honour.years.map((yr, yIdx) => (
                    <span
                      key={yIdx}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px] font-semibold"
                    >
                      {yr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          3. HISTORICAL TIMELINE
          ===================================================================== */}
      <section id="timeline" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
            HERITAGE & CHRONOLOGY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CLUB MILESTONES
          </h2>
          <p className="text-sm text-zinc-400">
            From our founding as Varca Sports Club to the premier division of Indian football.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/40 ml-4 sm:ml-32 space-y-12">
          {TIMELINE_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10">
              {/* Year badge on left for desktop */}
              <div className="sm:absolute sm:-left-32 sm:w-24 sm:text-right font-display font-black text-2xl text-brandGold mb-1 sm:mb-0">
                {item.year}
              </div>

              {/* Pin Indicator */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-brandBlack shadow-club" />

              <div className="bg-darkSurface border border-zinc-800 rounded-2xl p-6 shadow-card hover:border-zinc-700 transition">
                <span className="px-2.5 py-0.5 rounded bg-primary/20 text-brandGold font-display font-bold text-xs uppercase tracking-wider">
                  {item.tag}
                </span>

                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase mt-2">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {item.imageUrl && (
                  <div className="mt-4 relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 650px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. STADIUMS & HOME FORTS
          ===================================================================== */}
      <section id="stadium" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
            OUR FORTRESSES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            HOME STADIUMS
          </h2>
          <p className="text-sm text-zinc-400">
            Venues etched into the lore and legacy of Churchill Brothers FC Goa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VENUES.map((venue) => (
            <div
              key={venue.id}
              className="bg-darkSurface border border-zinc-800 rounded-2xl overflow-hidden shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-zinc-950 overflow-hidden">
                  <Image
                    src={venue.imageUrl}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {venue.isHomeGround && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary text-white font-display font-bold text-[11px] uppercase tracking-wider shadow">
                      Primary Fortress
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-white">
                    {venue.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{venue.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-300">Capacity:</span>
                      <span>{venue.capacity.toLocaleString('en-IN')} spectators</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-300">Surface:</span>
                      <span>{venue.surface}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/tickets"
                  className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-primary text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                >
                  <span>Check Demo Fixtures at Venue</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. THE GOAN DERBY & RIVALRIES
          ===================================================================== */}
      <section id="rivalries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-950/40 via-darkSurface to-red-950/40 border border-primary/30 rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary text-white text-xs font-display font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              THE GOAN DERBY & TRADITIONAL RIVALS
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              BATTLES FOR GOAN SUPREMACY
            </h2>

            <p className="text-base text-zinc-300 leading-relaxed font-sans">
              Goan football is propelled by historic rivalries that transcend generations. Chief among them is the legendary <strong className="text-white">Goan Derby</strong> against Dempo SC. Matches between Churchill Brothers and Dempo at Fatorda Stadium represent the clash between North and South Goa, captivating hundreds of thousands of Goan supporters worldwide.
            </p>

            <p className="text-base text-zinc-300 leading-relaxed font-sans">
              The club also shares fierce state rivalries with Sporting Clube de Goa and Salgaocar FC, with whom The Red Machines have battled across I-League title deciders, Federation Cup finals, and the Goa Professional League.
            </p>

            <div className="pt-2">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club"
              >
                <span>View Derby Fixtures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
