'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { LeagueStandings } from '@/components/ui/LeagueStandings';
import { ClubTV } from '@/components/ui/ClubTV';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
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

  // Next upcoming match
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
    <div className="space-y-20 lg:space-y-28 bg-[#121826] text-slate-100 pb-28">
      {/* =====================================================================
          1. CINEMATIC EDITORIAL HERO & MATCH CENTER (FC Barcelona / Real Madrid Style)
          ===================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#101625] via-[#141E30] to-[#121826] border-b border-white/10">
        {/* Real Fatorda Stadium Floodlit Backdrop with High-Fidelity Stadium Atmosphere */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/stadium/fatorda-east-stand.jpg"
            alt="Fatorda Stadium — Home of Churchill Brothers FC"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          {/* Balanced slate gradient overlays — no pitch black cave */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#121826] via-[#121826]/90 to-[#121826]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121826] via-transparent to-[#121826]/70" />
          {/* Subtle stadium light beams */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content with Generous Breathing Room */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            
            {/* LEFT COLUMN (7 Cols): Lead Editorial Feature */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Official Identity & Matchday Tag */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-white text-xs font-display font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>I-LEAGUE 2026-27 • ROUND 18</span>
                <span className="text-slate-500">•</span>
                <span className="text-brandGold">THE GOAN DERBY</span>
              </div>

              {/* Master Headline with Comfortable Line-Height */}
              <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl uppercase text-white tracking-tight leading-[1.08] drop-shadow-md">
                THE GOAN DERBY:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-primary to-red-400">
                  RED MACHINES
                </span>{' '}
                HOST DEMPO SC AT FATORDA
              </h1>

              {/* Editorial Subdeck with Relaxed Spacing */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Table-topping Churchill Brothers welcome arch-rivals Dempo SC to Margao in a high-stakes clash under the Fatorda floodlights. Mateus Costa&apos;s unbeaten side aim to extend their lead in pursuit of a historic third national I-League crown.
              </p>

              {/* Spacious Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/tickets"
                  className="px-8 py-4 rounded-xl bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-widest transition shadow-club flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-200"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Match Tickets (Demo)</span>
                </Link>

                <Link
                  href="/shop"
                  className="px-7 py-4 rounded-xl bg-[#1C273E] hover:bg-[#253350] text-white border border-white/10 font-display font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-200"
                >
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span>Official 2026/27 Kits</span>
                </Link>

                <Link
                  href="/team"
                  className="px-6 py-4 rounded-xl bg-[#1C273E]/50 hover:bg-[#253350] text-slate-300 hover:text-white border border-white/10 font-display font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
                >
                  <span>First Team Squad</span>
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Link>
              </div>

              {/* Club Honours Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-300 font-display font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-brandGold fill-brandGold" />
                  <span>2x I-League Champions</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-brandGold" />
                  <span>3x Durand Cup</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>8x Goa Pro League</span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fatorda Fortress</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN (5 Cols): Broadcast-Grade Live Match Center Card */}
            {nextMatch && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-5 bg-[#182236] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle card accent gradient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-primary text-white font-display font-bold text-[11px] uppercase tracking-wider shadow-club">
                        NEXT FIXTURE
                      </span>
                      <span className="font-bold text-white uppercase tracking-wider text-xs">
                        {nextMatch.competition}
                      </span>
                    </div>
                    <span className="text-slate-300 font-medium flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {nextMatch.venueName}
                    </span>
                  </div>

                  {/* Matchup row with generous spacing */}
                  <div className="grid grid-cols-5 items-center gap-3 my-3 text-center">
                    <div className="col-span-2 flex flex-col items-center">
                      <ClubCrest size={54} />
                      <span className="mt-2 font-display font-black text-base text-white uppercase line-clamp-1">
                        Churchill Brothers
                      </span>
                      <span className="text-[10px] text-primary font-bold uppercase mt-0.5">
                        HOME • 1st (38 pts)
                      </span>
                    </div>

                    <div className="col-span-1 flex flex-col items-center">
                      <span className="font-display font-black text-xl text-slate-400">VS</span>
                      <span className="text-[11px] font-mono text-slate-300 mt-0.5 uppercase font-semibold">19:00 IST</span>
                    </div>

                    <div className="col-span-2 flex flex-col items-center">
                      <div className="relative w-13 h-13 bg-white/5 rounded-full p-1 border border-white/10">
                        <Image
                          src={nextMatch.opponentCrestUrl}
                          alt={nextMatch.opponentName}
                          width={48}
                          height={48}
                          className="object-contain p-1"
                        />
                      </div>
                      <span className="mt-2 font-display font-black text-base text-white uppercase line-clamp-1">
                        {nextMatch.opponentName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
                        AWAY • 3rd (32 pts)
                      </span>
                    </div>
                  </div>

                  {/* Countdown & Broadcast Strip */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5">
                      <Tv className="w-4 h-4 text-brandGold" />
                      <span className="text-[11px] text-slate-300 font-medium">
                        Live on Star Sports Select 2 & JioCinema
                      </span>
                    </div>

                    {/* 4 countdown boxes */}
                    <div className="flex items-center gap-1.5 text-center">
                      <div className="bg-[#1C273E] px-2.5 py-1 rounded-md border border-white/10 min-w-[42px]">
                        <span className="font-display font-black text-sm text-white block">{timeLeft.days}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Days</span>
                      </div>
                      <div className="bg-[#1C273E] px-2.5 py-1 rounded-md border border-white/10 min-w-[42px]">
                        <span className="font-display font-black text-sm text-white block">{timeLeft.hours}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Hrs</span>
                      </div>
                      <div className="bg-[#1C273E] px-2.5 py-1 rounded-md border border-white/10 min-w-[42px]">
                        <span className="font-display font-black text-sm text-white block">{timeLeft.minutes}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Min</span>
                      </div>
                      <div className="bg-[#1C273E] px-2.5 py-1 rounded-md border border-white/10 min-w-[42px]">
                        <span className="font-display font-black text-sm text-primary block">{timeLeft.seconds}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Sec</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                  <Link
                    href={`/tickets/${nextMatch.id}`}
                    className="flex-1 py-3 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-club"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Reserve Tickets (Demo)</span>
                  </Link>

                  <Link
                    href="/matches"
                    className="px-4 py-3 rounded-lg bg-[#1C273E] hover:bg-[#253350] text-slate-200 border border-white/10 font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center"
                  >
                    <span>H2H</span>
                  </Link>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DYNAMIC LEAGUE CONTEXT: RECENT RESULT & I-LEAGUE TABLE
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Recent Result (5 Cols) */}
          {recentCompleted && (
            <div className="lg:col-span-5 bg-[#182236] border border-white/10 rounded-2xl p-7 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs">
                  <span className="px-3 py-1 rounded bg-[#1C273E] border border-white/10 text-slate-200 font-display font-bold text-[10px] uppercase tracking-wider">
                    LATEST RESULT
                  </span>
                  <span className="text-slate-300 font-medium">
                    {new Date(recentCompleted.matchDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Score Summary */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <ClubCrest size={44} />
                    <div>
                      <h4 className="font-display font-black text-base text-white uppercase">
                        Churchill Brothers
                      </h4>
                      <span className="text-xs text-slate-400">Home • Fatorda</span>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-lg bg-[#1C273E] border border-white/10 text-center">
                    <span className="font-display font-black text-2xl text-white">
                      {recentCompleted.homeScore ?? 3} - {recentCompleted.awayScore ?? 1}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-emerald-400 block mt-0.5">FULL TIME</span>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <h4 className="font-display font-black text-base text-white uppercase">
                        {recentCompleted.opponentName}
                      </h4>
                      <span className="text-xs text-slate-400">Away</span>
                    </div>
                    <div className="relative w-11 h-11 shrink-0">
                      <Image
                        src={recentCompleted.opponentCrestUrl}
                        alt={recentCompleted.opponentName}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Goalscorers */}
                <div className="mt-4 p-3.5 rounded-lg bg-[#121826] border border-white/10 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span>⚽ Lekay 18&apos;, 39&apos; | Gutiérrez 82&apos;</span>
                    <span className="text-slate-400 font-mono">Attendance: 8,420</span>
                  </div>
                </div>

                {/* Form strip */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-display font-bold uppercase tracking-wider text-slate-400">
                    Red Machines Form:
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-white">
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded bg-amber-600 flex items-center justify-center">D</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="text-slate-400 text-xs ml-1 font-sans">(6 Unbeaten)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <Link
                  href={`/matches/${recentCompleted.slug}`}
                  className="w-full py-3 rounded-lg bg-[#1C273E] hover:bg-[#253350] text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/10"
                >
                  <span>Read Match Report & Quotes</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </Link>
              </div>
            </div>
          )}

          {/* League Standings (7 Cols) */}
          <div className="lg:col-span-7">
            <LeagueStandings />
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. OFFICIAL 2026/27 KITS (Real Jerseys Showcase)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-[#182236] border border-white/10 rounded-2xl p-7 sm:p-10 lg:p-12 shadow-card space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-primary tracking-widest uppercase mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL APPAREL & MERCHANDISE
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
                2026/27 OFFICIAL KIT COLLECTION
              </h2>
              <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                Engineered by technical partner Nivia. Authentic matchday shirts featuring cursive &ldquo;Churchill&rdquo; sponsor script, silicone two-star crest, and Goa contour lines.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
            >
              <span>Explore All Merchandise</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Real Jerseys Feature */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {realJerseys.map((jersey) => (
              <div
                key={jersey.id}
                className="bg-[#121826] border border-white/10 hover:border-primary/60 rounded-xl overflow-hidden shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full bg-[#182236] overflow-hidden">
                    <Image
                      src={jersey.featuredImageUrl}
                      alt={jersey.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {jersey.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                        {jersey.badge}
                      </span>
                    )}
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[#182236]/90 backdrop-blur-md border border-white/20 text-[10px] font-mono text-brandGold font-bold">
                      2 STARS
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                      {jersey.categoryName}
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase group-hover:text-primary transition line-clamp-1">
                      {jersey.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {jersey.description}
                    </p>

                    {/* Size Selector Strip */}
                    <div className="flex items-center gap-2 mt-4">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <span key={sz} className="px-2.5 py-1 rounded bg-[#1C273E] border border-white/10 text-xs font-bold text-slate-200">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-medium">Demo Price</span>
                      <span className="font-display font-black text-2xl text-white">
                        ₹{jersey.priceInr.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      href={`/shop/${jersey.slug}`}
                      className="px-5 py-2.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order (Demo)</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Real Team Kit Photo Gallery from PDF */}
          <div className="pt-6 border-t border-white/10">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-400 block mb-4">
              Official Matchday Wardrobe:
            </span>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/images/kits/real_jersey_hanger.jpg"
                  alt="Official Home Jersey on matchday hanger"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/images/kits/real_players_kit.jpg"
                  alt="First-team squad in official Churchill red kit"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/images/kits/real_player_wearing_red.jpg"
                  alt="Player wearing official Churchill Brothers jersey"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. THE RED FORTRESS — FATORDA STADIUM (Real Stadium Showcase)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-[#182236] border border-white/10 rounded-2xl overflow-hidden shadow-card p-7 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Real Stadium Visual */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 group">
                <Image
                  src="/images/stadium/fatorda-east-stand.jpg"
                  alt="Jawaharlal Nehru Stadium (Fatorda Stadium) Margao, Goa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                    THE RED FORTRESS
                  </span>
                  <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 text-white font-display font-bold text-xs uppercase tracking-wider">
                    MARGAO, GOA
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                    JAWAHARLAL NEHRU STADIUM (FATORDA)
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Home of Churchill Brothers FC since 1989. Two national championship triumphs and historic AFC Cup fixtures.
                  </p>
                </div>
              </div>

              {/* 3 Real Photos Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src="/images/stadium/fatorda-real-matchday.jpg"
                    alt="Night match floodlights atmosphere"
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="text-[10px] font-bold text-white uppercase line-clamp-1">Night Floodlights</span>
                  </div>
                </div>
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src="/images/stadium/fatorda-aerial-view.jpg"
                    alt="Aerial view over Margao"
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="text-[10px] font-bold text-white uppercase line-clamp-1">Aerial Margao</span>
                  </div>
                </div>
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                  <Image
                    src="/images/stadium/fatorda-pitch-view.jpg"
                    alt="Natural grass FIFA standard pitch"
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                    <span className="text-[10px] font-bold text-white uppercase line-clamp-1">Natural Grass</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stadium Metrics & Story */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C273E] border border-white/10 text-primary text-xs font-display font-bold uppercase tracking-wider mb-3">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  SACRED GROUND OF GOAN FOOTBALL
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                  THE SOUL OF SOUTH GOA.{' '}
                  <span className="text-primary">FATORDA STADIUM.</span>
                </h2>
                <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                  Inaugurated in 1989 and upgraded to FIFA and AFC standards, Fatorda Stadium in Margao has roared for every championship chapter of The Red Machines.
                </p>
              </div>

              {/* 4 Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1C273E] p-4 rounded-xl border border-white/10">
                  <span className="font-display font-black text-2xl text-white block">19,000</span>
                  <span className="text-xs font-bold uppercase text-slate-400">All-Seater Capacity</span>
                </div>
                <div className="bg-[#1C273E] p-4 rounded-xl border border-white/10">
                  <span className="font-display font-black text-2xl text-brandGold block">105m × 68m</span>
                  <span className="text-xs font-bold uppercase text-slate-400">Natural Grass Pitch</span>
                </div>
                <div className="bg-[#1C273E] p-4 rounded-xl border border-white/10">
                  <span className="font-display font-black text-2xl text-primary block">Margao</span>
                  <span className="text-xs font-bold uppercase text-slate-400">South Goa Location</span>
                </div>
                <div className="bg-[#1C273E] p-4 rounded-xl border border-white/10">
                  <span className="font-display font-black text-2xl text-white block">1989</span>
                  <span className="text-xs font-bold uppercase text-slate-400">Fortress Established</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/tickets"
                  className="px-6 py-3.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Matchday Tickets</span>
                </Link>

                <Link
                  href="/club#stadium"
                  className="px-5 py-3.5 rounded-lg bg-[#1C273E] hover:bg-[#253350] text-slate-200 border border-white/10 font-display font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                >
                  <span>Stadium Seating Plan</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. RED MACHINES TV (Video Highlights & Access)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ClubTV />
      </section>

      {/* =====================================================================
          7. EDITORIAL NEWSROOM (Clean Magazine Grid)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
              EDITORIAL DESK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              LATEST CLUB NEWS & PRESS
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
          >
            <span>Visit Full Newsroom</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lead Story (7 Cols) */}
          {featuredArticle && (
            <div className="lg:col-span-7 bg-[#182236] border border-white/10 rounded-2xl overflow-hidden shadow-card group flex flex-col justify-between">
              <div>
                <Link href={`/news/${featuredArticle.slug}`} className="block relative aspect-[16/10] w-full bg-[#121826] overflow-hidden">
                  <Image
                    src={featuredArticle.featuredImageUrl}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                    {featuredArticle.category}
                  </span>
                  <span className="absolute bottom-4 left-4 text-xs font-mono text-slate-300">
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </Link>

                <div className="p-7 space-y-3">
                  <Link href={`/news/${featuredArticle.slug}`}>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-primary transition leading-tight">
                      {featuredArticle.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-7 pt-0 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">{featuredArticle.readTimeMinutes} min read</span>
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Trending Secondary Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Trending Headlines:
            </span>

            {trendingArticles.map((post, idx) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="block p-5 rounded-xl bg-[#182236] border border-white/10 hover:border-primary/60 transition group shadow-card"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display font-black text-2xl text-primary/70 shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                      {post.category}
                    </span>
                    <h4 className="font-display font-bold text-base text-white group-hover:text-primary transition line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
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
      </section>

      {/* =====================================================================
          8. FIRST-TEAM SQUAD WALL
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-8 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
              SENIOR SQUAD • 2026/27
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              FIRST TEAM STARS
            </h2>
          </div>
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
          >
            <span>View Full 26-Player Squad</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlayers.map((player) => (
            <StaggerItem key={player.id}>
              <PlayerCard player={player} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* =====================================================================
          9. CLUB HERITAGE & THE TWO STARS
          ===================================================================== */}
      <section className="bg-[#182236] border-y border-white/10 py-20 lg:py-24">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Heritage Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C273E] border border-white/10 text-primary text-xs font-display font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-primary" />
                ESTABLISHED 1988 • VARCA & MARGAO, GOA
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                THE STARS WE EARNED.{' '}
                <span className="text-primary">THE LEGACY WE DEFEND.</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed font-sans">
                Founded in 1988 by patron Churchill Alemao, Churchill Brothers Football Club Goa emerged from the coastal soil of South Goa to become one of the most decorated dynasties in Indian sporting history.
              </p>

              <p className="text-base text-slate-300 leading-relaxed font-sans">
                With two national premier I-League championship stars (2008-09 and 2012-13), three Durand Cups, two IFA Shields, and eight Goa Professional League titles, The Red Machines represent the fearless attacking spirit and football obsession of the Goan people.
              </p>

              <div className="pt-2">
                <Link
                  href="/club"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club"
                >
                  <span>Explore Club History & Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Trophies Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-5">
              {CLUB_HONOURS.slice(0, 4).map((honour, idx) => (
                <div
                  key={idx}
                  className="bg-[#1C273E] p-7 rounded-xl border border-white/10 shadow-card hover:border-primary/50 transition group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-full bg-[#182236] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Trophy className="w-5 h-5 text-brandGold" />
                    </div>
                    <span className="font-display font-black text-3xl text-white">
                      x{honour.count}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white uppercase">
                    {honour.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 font-mono">
                    {honour.years.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. OFFICIAL PARTNERS & SPONSORS
          ===================================================================== */}
      <section className="border-t border-white/10 pt-16">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-8">
          <span className="text-xs font-display font-bold uppercase tracking-[0.25em] text-slate-400">
            OFFICIAL CLUB PARTNERS & TECHNICAL SPONSORS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative h-18 bg-[#182236] border border-white/10 rounded-xl p-4 flex items-center justify-center hover:border-primary/50 transition shadow-card"
                title={`${sponsor.name} (${sponsor.tier})`}
              >
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  fill
                  className="object-contain p-2.5"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
