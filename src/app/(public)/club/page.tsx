'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { CLUB_INFO, CLUB_HONOURS, TIMELINE_MILESTONES, VENUES } from '@/lib/demo-data';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import {
  Trophy,
  Shield,
  Star,
  MapPin,
  Calendar,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default function ClubPage() {
  return (
    <div className="space-y-16 lg:space-y-24 py-10 bg-offWhite text-charcoal">
      {/* =====================================================================
          1. CLUB HERO / IDENTITY HEADER
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white border border-lightBorder p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-card">
          {/* Subtle Watermark Crest */}
          <div className="absolute -right-12 -bottom-12 opacity-[0.03] pointer-events-none w-96 h-96">
            <ClubCrest size={380} />
          </div>

          <div className="max-w-3xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-xs font-display font-bold uppercase tracking-widest text-primary">
              <Star className="w-3.5 h-3.5 fill-primary" />
              THE RED MACHINES • ESTABLISHED 1988
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight leading-none">
              CHURCHILL BROTHERS <br />
              <span className="text-primary">
                FOOTBALL CLUB GOA
              </span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
              Founded in 1988 in Varca, South Goa, Churchill Brothers Football Club stands as an indomitable institution in Indian sports. Revered nationwide as &ldquo;The Red Machines&rdquo;, the club is defined by attacking flair, passionate supporter loyalty, and two national I-League championship stars.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs font-display font-bold uppercase tracking-wider">
              <span className="px-3 py-1.5 bg-offWhite border border-lightBorder text-charcoal">
                Founder: Churchill Alemao
              </span>
              <span className="px-3 py-1.5 bg-offWhite border border-lightBorder text-charcoal">
                Home Ground: Fatorda Stadium
              </span>
              <span className="px-3 py-1.5 bg-offWhite border border-lightBorder text-charcoal">
                Location: Margao, South Goa
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TROPHY CABINET & HONOURS
          ===================================================================== */}
      <section id="honours" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
            HALL OF GLORY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight">
            THE TROPHY CABINET
          </h2>
          <p className="text-sm text-mutedGrey">
            A testament to nearly four decades of grit, determination, and national championships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLUB_HONOURS.map((honour, idx) => (
            <div
              key={idx}
              className="bg-white border border-lightBorder hover:border-primary transition-all p-6 shadow-card hover:shadow-cardHover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-lightBorder">
                  <div className="w-12 h-12 bg-offWhite border border-lightBorder flex items-center justify-center text-primary">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="font-display font-black text-4xl text-charcoal">
                    x{honour.count}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-charcoal uppercase tracking-wide">
                  {honour.title}
                </h3>

                <p className="mt-2 text-xs text-charcoal/70 leading-relaxed">
                  {honour.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-lightBorder">
                <span className="text-[10px] uppercase font-bold text-mutedGrey block tracking-wider">
                  Winning Campaigns
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {honour.years.map((yr, yIdx) => (
                    <span
                      key={yIdx}
                      className="px-2 py-0.5 bg-offWhite border border-lightBorder text-charcoal font-mono text-[11px] font-bold"
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
          <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight">
            CLUB MILESTONES
          </h2>
          <p className="text-sm text-mutedGrey">
            From our founding as Varca Sports Club to the premier division of Indian football.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/40 ml-4 sm:ml-32 space-y-12">
          {TIMELINE_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10">
              {/* Year badge on left for desktop */}
              <div className="sm:absolute sm:-left-32 sm:w-24 sm:text-right font-display font-black text-2xl text-primary mb-1 sm:mb-0">
                {item.year}
              </div>

              {/* Pin Indicator */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />

              <div className="bg-white border border-lightBorder p-6 shadow-card hover:border-primary transition">
                <span className="px-2.5 py-0.5 rounded bg-offWhite border border-lightBorder text-primary font-display font-bold text-xs uppercase tracking-wider">
                  {item.tag}
                </span>

                <h3 className="font-display font-black text-xl sm:text-2xl text-charcoal uppercase mt-2">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                  {item.description}
                </p>

                {item.imageUrl && (
                  <div className="mt-4 relative aspect-[16/9] w-full overflow-hidden bg-[#EAE8E2] border border-lightBorder">
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
      <section id="stadium" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
            OUR FORTRESSES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight">
            HOME STADIUMS
          </h2>
          <p className="text-sm text-mutedGrey">
            Venues etched into the lore and legacy of Churchill Brothers FC Goa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VENUES.map((venue) => (
            <div
              key={venue.id}
              className="bg-white border border-lightBorder shadow-card hover:border-primary transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#EAE8E2] overflow-hidden">
                  <Image
                    src={venue.imageUrl}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {venue.isHomeGround && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-primary text-white font-display font-bold text-[11px] uppercase tracking-wider shadow-sm">
                      Primary Fortress
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-display font-black text-xl text-charcoal">
                    {venue.name}
                  </h3>
                  <div className="mt-2.5 space-y-1 text-xs text-mutedGrey">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-charcoal font-medium">{venue.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-charcoal">Capacity:</span>
                      <span>{venue.capacity.toLocaleString('en-IN')} spectators</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-charcoal">Surface:</span>
                      <span>{venue.surface}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-charcoal/70 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/tickets"
                  className="w-full py-2.5 rounded bg-offWhite hover:bg-primary hover:text-white border border-lightBorder text-charcoal font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
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
      <section id="rivalries" className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white border border-lightBorder p-8 sm:p-12 shadow-card">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-primary text-xs font-display font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              THE GOAN DERBY & TRADITIONAL RIVALS
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-charcoal uppercase tracking-tight">
              BATTLES FOR GOAN SUPREMACY
            </h2>

            <p className="text-base text-charcoal/80 leading-relaxed font-sans">
              Goan football is propelled by historic rivalries that transcend generations. Chief among them is the legendary <strong className="text-charcoal">Goan Derby</strong> against Dempo SC. Matches between Churchill Brothers and Dempo at Fatorda Stadium represent the clash between North and South Goa, captivating hundreds of thousands of Goan supporters worldwide.
            </p>

            <p className="text-base text-charcoal/80 leading-relaxed font-sans">
              The club also shares fierce state rivalries with Sporting Clube de Goa and Salgaocar FC, with whom The Red Machines have battled across I-League title deciders, Federation Cup finals, and the Goa Professional League.
            </p>

            <div className="pt-2">
              <Link
                href="/matches"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm"
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
