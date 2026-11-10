'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { LeagueStandings } from '@/components/ui/LeagueStandings';
import { ClubTV } from '@/components/ui/ClubTV';
import { useApp } from '@/lib/store';
import { CLUB_HONOURS, SPONSORS } from '@/lib/demo-data';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ChevronRight,
  Trophy,
  Shield,
  ArrowRight,
  Star,
  ShoppingBag,
  Tv,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { matches, players, products, news } = useApp();

  // Next upcoming fixture
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled');
  const nextMatch = upcomingMatches[0] || matches[0];

  // Recent completed match
  const recentCompleted = matches.filter((m) => m.status === 'completed')[0];

  // Featured squad players
  const featuredPlayers = players.filter((p) => p.isFeatured).slice(0, 4);

  // Real jerseys for e-commerce showcase
  const realJerseys = products.filter((p) => p.categoryId === 'jerseys').slice(0, 3);

  // Editorial News Layout
  const featuredArticle = news[0];
  const trendingArticles = news.slice(1, 4);

  // Match countdown timer
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!nextMatch) return;
    const target = new Date(nextMatch.matchDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextMatch]);

  return (
    <div className="bg-ivory text-ink space-y-16 lg:space-y-24 pb-24">
      {/* =====================================================================
          1. ASYMMETRICAL EDITORIAL HERO (Contemporary Football Editorial)
          ===================================================================== */}
      <section className="relative border-b border-stone bg-white">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            
            {/* LEFT COLUMN (7 Cols): Authentic Matchday Stadium Visual */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden border border-stone bg-ivory shadow-editorial group">
                <Image
                  src="/images/stadium/fatorda-east-stand.jpg"
                  alt="Fatorda Stadium floodlights — Home of Churchill Brothers FC"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                
                {/* Photo Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                  <div>
                    <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-burgundy-light bg-ink/75 px-2 py-0.5 rounded-sm inline-block mb-1">
                      The Red Fortress • Fatorda, Margao
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                      Jawaharlal Nehru Stadium on Matchday
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-stone-light/90 bg-ink/70 px-2 py-0.5 rounded-sm shrink-0">
                    Capacity: 19,000 All-Seater
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN (5 Cols): Restrained Editorial Story Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 order-1 lg:order-2 space-y-6"
            >
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-ivory border border-stone text-xs font-sans font-semibold tracking-wider uppercase text-burgundy">
                <span className="w-2 h-2 rounded-full bg-burgundy" />
                <span>The Red Machines • Estd 1988</span>
              </div>

              {/* Master Sentence Case Headline */}
              <div className="space-y-3">
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-ink tracking-tight leading-[1.06]">
                  A Club. A City. <br />
                  <span className="text-burgundy">A Legacy.</span>
                </h1>
                <p className="text-base sm:text-lg text-muted font-sans font-normal leading-relaxed">
                  South Goa&apos;s premier football institution. Twice champions of India, fearless under the Fatorda floodlights, and bound together by generations of Goan passion.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/tickets"
                  className="px-6 py-3.5 rounded-sm bg-burgundy hover:bg-burgundy-hover active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider transition shadow-editorial flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Match Tickets</span>
                </Link>

                <Link
                  href="/shop"
                  className="px-6 py-3.5 rounded-sm bg-white hover:bg-ivory text-ink border border-stone hover:border-ink font-sans font-semibold text-xs uppercase tracking-wider transition flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-burgundy" />
                  <span>2026/27 Official Kits</span>
                </Link>
              </div>

              {/* Two Stars Strip */}
              <div className="pt-6 border-t border-stone flex flex-wrap items-center gap-6 text-xs text-muted font-sans">
                <div className="flex items-center gap-1.5 text-ink font-semibold">
                  <Star className="w-4 h-4 text-brandGold fill-brandGold" />
                  <span>2x I-League Champions</span>
                </div>
                <span className="text-stone-dark">•</span>
                <div className="flex items-center gap-1.5 text-ink font-semibold">
                  <Trophy className="w-4 h-4 text-brandGold" />
                  <span>3x Durand Cup</span>
                </div>
                <span className="text-stone-dark">•</span>
                <div className="flex items-center gap-1.5 text-ink font-semibold">
                  <Shield className="w-4 h-4 text-burgundy" />
                  <span>8x Goa League</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          2. HORIZONTAL MATCHDAY BROADSIDE STRIP (Broader, clean, no glowing boxes)
          ===================================================================== */}
      {nextMatch && (
        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-white border border-stone rounded-sm p-6 sm:p-7 shadow-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Col 1 (4 Cols): Match Details */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-sm bg-burgundy text-white font-sans font-bold text-[10px] uppercase tracking-wider">
                    Next Fixture
                  </span>
                  <span className="font-sans font-semibold text-ink uppercase tracking-wider text-xs">
                    {nextMatch.competition} • Round 18
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <ClubCrest size={28} />
                    <span className="font-display font-bold text-base text-ink uppercase">
                      Churchill Brothers
                    </span>
                  </div>
                  <span className="font-stats font-bold text-lg text-muted">VS</span>
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7">
                      <Image
                        src={nextMatch.opponentCrestUrl}
                        alt={nextMatch.opponentName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-display font-bold text-base text-ink uppercase">
                      {nextMatch.opponentName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted font-sans pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-burgundy" />
                    Saturday, 21 Nov 2026
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-muted" />
                    19:00 IST
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-muted" />
                    Fatorda Stadium, Margao
                  </span>
                </div>
              </div>

              {/* Col 2 (4 Cols): Countdown Timer in Barlow Condensed */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center border-y lg:border-y-0 lg:border-x border-stone py-4 lg:py-0 px-4">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted block mb-1">
                  Kickoff Countdown
                </span>
                <div className="flex items-baseline gap-3 text-center">
                  <div>
                    <span className="font-stats font-bold text-3xl sm:text-4xl text-ink">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-sans font-medium uppercase text-muted block -mt-1">
                      Days
                    </span>
                  </div>
                  <span className="font-stats font-bold text-2xl text-stone-dark">:</span>
                  <div>
                    <span className="font-stats font-bold text-3xl sm:text-4xl text-ink">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-sans font-medium uppercase text-muted block -mt-1">
                      Hours
                    </span>
                  </div>
                  <span className="font-stats font-bold text-2xl text-stone-dark">:</span>
                  <div>
                    <span className="font-stats font-bold text-3xl sm:text-4xl text-ink">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-sans font-medium uppercase text-muted block -mt-1">
                      Mins
                    </span>
                  </div>
                  <span className="font-stats font-bold text-2xl text-stone-dark">:</span>
                  <div>
                    <span className="font-stats font-bold text-3xl sm:text-4xl text-burgundy">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-sans font-medium uppercase text-burgundy block -mt-1">
                      Secs
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-muted font-sans mt-2 flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-burgundy" />
                  Live on Star Sports Select 2 & JioCinema
                </span>
              </div>

              {/* Col 3 (4 Cols): Actions */}
              <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3">
                <Link
                  href={`/tickets/${nextMatch.id}`}
                  className="px-6 py-3 rounded-sm bg-burgundy hover:bg-burgundy-hover active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider transition shadow-editorial flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Demo Tickets</span>
                </Link>

                <Link
                  href="/matches"
                  className="px-4 py-3 rounded-sm bg-ivory hover:bg-stone-light text-ink border border-stone font-sans font-semibold text-xs uppercase tracking-wider transition"
                >
                  <span>Head to Head</span>
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. DYNAMIC LEAGUE CONTEXT: LATEST RESULT & LEAGUE BROADSHEET
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Latest Result Card (5 Cols) */}
          {recentCompleted && (
            <div className="lg:col-span-5 bg-white border border-stone rounded-sm p-6 sm:p-7 shadow-editorial flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone text-xs">
                  <span className="px-2.5 py-0.5 rounded-sm bg-ivory border border-stone text-ink font-sans font-bold text-[10px] uppercase tracking-wider">
                    Latest Result
                  </span>
                  <span className="text-muted font-medium font-sans">
                    {new Date(recentCompleted.matchDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Score Summary */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <ClubCrest size={40} />
                    <div>
                      <h4 className="font-display font-bold text-base text-ink uppercase">
                        Churchill Brothers
                      </h4>
                      <span className="text-xs text-muted font-sans">Home • Fatorda Fortress</span>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-sm bg-ivory border border-stone text-center">
                    <span className="font-stats font-bold text-3xl text-ink block">
                      {recentCompleted.homeScore ?? 3} - {recentCompleted.awayScore ?? 1}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-emerald-700 block -mt-1 font-sans">
                      Full Time
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <h4 className="font-display font-bold text-base text-ink uppercase">
                        {recentCompleted.opponentName}
                      </h4>
                      <span className="text-xs text-muted font-sans">Away</span>
                    </div>
                    <div className="relative w-10 h-10 shrink-0">
                      <Image
                        src={recentCompleted.opponentCrestUrl}
                        alt={recentCompleted.opponentName}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Goalscorers Broadside Strip */}
                <div className="mt-3 p-3 rounded-sm bg-ivory border border-stone text-xs text-ink font-sans">
                  <div className="flex items-center justify-between">
                    <span>⚽ Lekay 18&apos;, 39&apos; | Gutiérrez 82&apos;</span>
                    <span className="text-muted font-mono text-[11px]">Att: 8,420</span>
                  </div>
                </div>

                {/* Form Record */}
                <div className="mt-4 pt-4 border-t border-stone flex items-center justify-between text-xs">
                  <span className="font-sans font-bold uppercase tracking-wider text-muted">
                    Red Machines Form:
                  </span>
                  <div className="flex items-center gap-1.5 font-stats font-bold text-xs text-white">
                    <span className="w-5 h-5 rounded-sm bg-emerald-700 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded-sm bg-emerald-700 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded-sm bg-amber-600 flex items-center justify-center">D</span>
                    <span className="w-5 h-5 rounded-sm bg-emerald-700 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded-sm bg-emerald-700 flex items-center justify-center">W</span>
                    <span className="text-muted text-xs ml-1 font-sans font-normal">(6 Unbeaten)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone">
                <Link
                  href={`/matches/${recentCompleted.slug}`}
                  className="w-full py-2.5 rounded-sm bg-ivory hover:bg-stone-light text-ink font-sans font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 border border-stone"
                >
                  <span>Read Match Report & Press Quotes</span>
                  <ArrowRight className="w-3.5 h-3.5 text-burgundy" />
                </Link>
              </div>
            </div>
          )}

          {/* League Standings Broadsheet (7 Cols) */}
          <div className="lg:col-span-7">
            <LeagueStandings />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. OFFICIAL 2026/27 MATCHWEAR COLLECTION (Editorial Jersey Showcase)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white border border-stone rounded-sm p-6 sm:p-8 lg:p-10 shadow-editorial space-y-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 border-b border-stone gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-sans font-bold text-burgundy tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Official Matchwear • Technical Partner Nivia
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight">
                2026/27 Official Kit Collection
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1 max-w-xl font-sans">
                Engineered with high-performance moisture-wicking jacquard. Featuring the classic cursive &ldquo;Churchill&rdquo; sponsor script, silicone two-star crest, and South Goa topography.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition shrink-0"
            >
              <span>Explore All Merchandise</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Real Jerseys Feature */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {realJerseys.map((jersey) => (
              <div
                key={jersey.id}
                className="bg-ivory border border-stone rounded-sm overflow-hidden shadow-editorial transition-all duration-200 flex flex-col justify-between group hover:border-burgundy"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full bg-white overflow-hidden border-b border-stone">
                    <Image
                      src={jersey.featuredImageUrl}
                      alt={jersey.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    {jersey.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-sm bg-burgundy text-white font-sans font-bold text-[10px] uppercase tracking-wider shadow-editorial">
                        {jersey.badge}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-sm bg-white/95 border border-stone text-[10px] font-stats font-bold text-ink">
                      2 STARS
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-sans font-semibold text-burgundy uppercase tracking-wider block mb-1">
                      {jersey.categoryName}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink group-hover:text-burgundy transition line-clamp-1">
                      {jersey.name}
                    </h3>
                    <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed font-sans">
                      {jersey.description}
                    </p>

                    {/* Size Selector Strip */}
                    <div className="flex items-center gap-1.5 mt-4">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <span
                          key={sz}
                          className="px-2 py-0.5 rounded-sm bg-white border border-stone text-[11px] font-stats font-bold text-ink"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-4 border-t border-stone flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted uppercase block font-medium font-sans">
                        Demo Price
                      </span>
                      <span className="font-stats font-bold text-2xl text-ink">
                        ₹{jersey.priceInr.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      href={`/shop/${jersey.slug}`}
                      className="px-4 py-2 rounded-sm bg-burgundy hover:bg-burgundy-hover text-white font-sans font-semibold text-xs uppercase tracking-wider transition shadow-editorial flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order (Demo)</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Real Team Kit Photo Gallery */}
          <div className="pt-6 border-t border-stone">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block mb-3">
              Official Matchday Wardrobe:
            </span>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-stone bg-ivory">
                <Image
                  src="/images/kits/real_jersey_hanger.jpg"
                  alt="Official Home Jersey on matchday hanger"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-stone bg-ivory">
                <Image
                  src="/images/kits/real_players_kit.jpg"
                  alt="First-team squad in official Churchill red kit"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-300"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-stone bg-ivory">
                <Image
                  src="/images/kits/real_player_wearing_red.jpg"
                  alt="Player wearing official Churchill Brothers jersey"
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          5. THE RED FORTRESS — FATORDA STADIUM SPREAD (Architectural Editorial)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white border border-stone rounded-sm overflow-hidden shadow-editorial p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Real Stadium Visual Grid */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden border border-stone group">
                <Image
                  src="/images/stadium/fatorda-east-stand.jpg"
                  alt="Jawaharlal Nehru Stadium (Fatorda Stadium) Margao, Goa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-sm bg-burgundy text-white font-sans font-bold text-[10px] uppercase tracking-wider shadow-editorial">
                    The Red Fortress
                  </span>
                  <span className="px-2.5 py-1 rounded-sm bg-ink/80 backdrop-blur-sm text-white font-sans font-semibold text-[10px] uppercase tracking-wider">
                    Margao, Goa
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Jawaharlal Nehru Stadium (Fatorda)
                  </h3>
                  <p className="text-xs text-stone-light/90 mt-1 line-clamp-2 font-sans">
                    Home of Churchill Brothers FC since 1989. Two national championship triumphs and historic AFC Cup nights.
                  </p>
                </div>
              </div>

              {/* 3 Real Photos Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-stone">
                  <Image
                    src="/images/stadium/fatorda-real-matchday.jpg"
                    alt="Night match floodlights atmosphere"
                    fill
                    className="object-cover hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-ink/40 flex items-end p-2">
                    <span className="text-[10px] font-sans font-semibold text-white uppercase line-clamp-1">
                      Night Floodlights
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-stone">
                  <Image
                    src="/images/stadium/fatorda-aerial-view.jpg"
                    alt="Aerial view over Margao"
                    fill
                    className="object-cover hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-ink/40 flex items-end p-2">
                    <span className="text-[10px] font-sans font-semibold text-white uppercase line-clamp-1">
                      Aerial Margao
                    </span>
                  </div>
                </div>
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-stone">
                  <Image
                    src="/images/stadium/fatorda-pitch-view.jpg"
                    alt="Natural grass FIFA standard pitch"
                    fill
                    className="object-cover hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-ink/40 flex items-end p-2">
                    <span className="text-[10px] font-sans font-semibold text-white uppercase line-clamp-1">
                      Natural Grass
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Metrics & Story */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-ivory border border-stone text-burgundy text-xs font-sans font-semibold uppercase tracking-wider mb-2">
                  <MapPin className="w-3.5 h-3.5 text-burgundy" />
                  Sacred Ground of Goan Football
                </div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-tight">
                  The Soul of South Goa. <br />
                  <span className="text-burgundy">Fatorda Stadium.</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-2 font-sans leading-relaxed">
                  Inaugurated in 1989 and upgraded to FIFA and AFC standards, Fatorda Stadium in Margao has roared for every championship chapter of The Red Machines.
                </p>
              </div>

              {/* 4 Metrics in Broadsheet Layout */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-ivory p-4 rounded-sm border border-stone">
                  <span className="font-stats font-bold text-3xl text-ink block">19,000</span>
                  <span className="text-[11px] font-sans font-semibold uppercase text-muted">All-Seater Capacity</span>
                </div>
                <div className="bg-ivory p-4 rounded-sm border border-stone">
                  <span className="font-stats font-bold text-3xl text-burgundy block">105m × 68m</span>
                  <span className="text-[11px] font-sans font-semibold uppercase text-muted">Natural Grass Pitch</span>
                </div>
                <div className="bg-ivory p-4 rounded-sm border border-stone">
                  <span className="font-stats font-bold text-3xl text-ink block">Margao</span>
                  <span className="text-[11px] font-sans font-semibold uppercase text-muted">South Goa Location</span>
                </div>
                <div className="bg-ivory p-4 rounded-sm border border-stone">
                  <span className="font-stats font-bold text-3xl text-ink block">1989</span>
                  <span className="text-[11px] font-sans font-semibold uppercase text-muted">Fortress Established</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/tickets"
                  className="px-6 py-3 rounded-sm bg-burgundy hover:bg-burgundy-hover active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider transition shadow-editorial flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Matchday Tickets</span>
                </Link>

                <Link
                  href="/club#stadium"
                  className="px-5 py-3 rounded-sm bg-white hover:bg-ivory text-ink border border-stone font-sans font-semibold text-xs uppercase tracking-wider transition flex items-center gap-2"
                >
                  <span>Stadium Seating Plan</span>
                  <ChevronRight className="w-4 h-4 text-burgundy" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          6. RED MACHINES TV (Match Highlights & Tactical Access)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ClubTV />
      </section>

      {/* =====================================================================
          7. EDITORIAL NEWSROOM (Clean Broadsheet Magazine Grid)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-stone gap-4">
          <div>
            <span className="text-xs font-sans font-bold text-burgundy tracking-wider uppercase">
              Editorial Desk
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight">
              Latest Club News & Dispatches
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition"
          >
            <span>Visit Full Newsroom</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lead Story (7 Cols) */}
          {featuredArticle && (
            <div className="lg:col-span-7 bg-white border border-stone rounded-sm overflow-hidden shadow-editorial group flex flex-col justify-between">
              <div>
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="block relative aspect-[16/10] w-full bg-ivory overflow-hidden border-b border-stone"
                >
                  <Image
                    src={featuredArticle.featuredImageUrl}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-sm bg-burgundy text-white font-sans font-bold text-[10px] uppercase tracking-wider shadow-editorial">
                    {featuredArticle.category}
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs font-mono text-stone-light">
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </Link>

                <div className="p-6 space-y-2.5">
                  <Link href={`/news/${featuredArticle.slug}`}>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-ink group-hover:text-burgundy transition leading-tight">
                      {featuredArticle.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone flex items-center justify-between">
                <span className="text-xs text-muted font-sans font-medium">
                  {featuredArticle.readTimeMinutes} min read
                </span>
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Trending Secondary Column (5 Cols): Clean Broadsheet Divider List */}
          <div className="lg:col-span-5 bg-white border border-stone rounded-sm p-6 shadow-editorial space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-muted block pb-2 border-b border-stone">
              Trending Headlines
            </span>

            <div className="divide-y divide-stone">
              {trendingArticles.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="block py-4 first:pt-2 last:pb-2 group transition"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-stats font-bold text-2xl text-burgundy shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-sans font-bold text-burgundy uppercase tracking-wider block mb-1">
                        {post.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-ink group-hover:text-burgundy transition line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted font-sans">
                        <span>{post.readTimeMinutes} min read</span>
                        <span>•</span>
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          8. FIRST-TEAM SQUAD WALL
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-stone gap-4">
          <div>
            <span className="text-xs font-sans font-bold text-burgundy tracking-wider uppercase">
              Senior Squad • 2026/27
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight">
              First Team Stars
            </h2>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-hover transition"
          >
            <span>View Full 26-Player Squad</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          9. CLUB HERITAGE & THE TWO STARS (Monograph Broadside)
          ===================================================================== */}
      <section className="bg-white border-y border-stone py-16 lg:py-20">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Heritage Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-ivory border border-stone text-burgundy text-xs font-sans font-semibold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-burgundy" />
                Established 1988 • Varca & Margao, Goa
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl xl:text-5xl text-ink tracking-tight leading-tight">
                The Stars We Earned. <br />
                <span className="text-burgundy">The Legacy We Defend.</span>
              </h2>

              <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
                Founded in 1988 by patron Churchill Alemao, Churchill Brothers Football Club Goa emerged from the coastal soil of South Goa to become one of the most decorated dynasties in Indian sporting history.
              </p>

              <p className="text-sm sm:text-base text-muted leading-relaxed font-sans">
                With two national premier I-League championship stars (2008-09 and 2012-13), three Durand Cups, two IFA Shields, and eight Goa Professional League titles, The Red Machines represent the fearless attacking spirit and football obsession of the Goan people.
              </p>

              <div className="pt-2">
                <Link
                  href="/club"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-burgundy hover:bg-burgundy-hover active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider transition shadow-editorial"
                >
                  <span>Explore Club History & Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Trophies Grid in Broadsheet Cards */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {CLUB_HONOURS.slice(0, 4).map((honour, idx) => (
                <div
                  key={idx}
                  className="bg-ivory p-6 rounded-sm border border-stone shadow-editorial hover:border-burgundy transition group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-sm bg-white border border-stone flex items-center justify-center text-burgundy">
                      <Trophy className="w-5 h-5 text-brandGold" />
                    </div>
                    <span className="font-stats font-bold text-3xl text-ink">
                      x{honour.count}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-ink">
                    {honour.title}
                  </h3>
                  <p className="text-xs text-muted mt-1 font-mono">
                    {honour.years.join(', ')}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          10. OFFICIAL PARTNERS & TECHNICAL SPONSORS (Clean Ribbon)
          ===================================================================== */}
      <section className="pt-8 pb-4">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-muted">
            Official Club Partners & Technical Sponsors
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative h-16 bg-white border border-stone rounded-sm p-3 flex items-center justify-center hover:border-burgundy transition shadow-sm"
                title={`${sponsor.name} (${sponsor.tier})`}
              >
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  fill
                  className="object-contain p-2 filter grayscale hover:grayscale-0 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
