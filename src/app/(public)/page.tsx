'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { useApp } from '@/lib/store';
import { CLUB_HONOURS, SPONSORS, INITIAL_MEDIA_GALLERY } from '@/lib/demo-data';
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
  Users,
  Compass,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { matches, players, products, news } = useApp();

  // Subtle hero parallax
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 500], [0, 40]);

  // Next upcoming match
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled');
  const nextMatch = upcomingMatches[0] || matches[0];

  // Recent completed matches
  const recentResults = matches.filter((m) => m.status === 'completed').slice(0, 3);

  // Featured squad players
  const featuredPlayers = players.filter((p) => p.isFeatured).slice(0, 4);

  // Featured products (prioritize real jerseys)
  const jerseyProducts = products.filter((p) => p.categoryId === 'jerseys');
  const otherProducts = products.filter((p) => p.categoryId !== 'jerseys');
  const featuredProducts = [...jerseyProducts, ...otherProducts].slice(0, 4);

  // Editorial News Layout: 1 Lead + 2 Secondary + Rest for Structured List
  const featuredArticle = news[0];
  const secondaryArticles = news.slice(1, 3);
  const newsList = news.slice(3, 7);

  // Countdown timer for next match
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
    <div className="space-y-16 lg:space-y-24 bg-[#0B0E17] text-zinc-100 pb-20">
      {/* =====================================================================
          1. CINEMATIC STADIUM MATCHDAY HERO (Atmospheric & Authentic)
          ===================================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between pt-10 pb-16 overflow-hidden bg-[#0B0E17]">
        {/* Real Fatorda Stadium Background Photography */}
        <motion.div
          style={{ y: heroParallaxY }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src="/images/stadium/fatorda-east-stand.jpg"
            alt="Fatorda Stadium — Home of Churchill Brothers FC"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45 scale-105"
          />
          {/* Subtle multi-layer athletic vignette for depth & contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-[#0B0E17]/80 to-[#0B0E17]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E17]/90 via-transparent to-[#0B0E17]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 lg:pt-10">
          {/* Crest & Identity Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-col items-center justify-center mb-6"
          >
            <div className="relative">
              <ClubCrest size={80} priority />
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl -z-10" />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded bg-[#141926]/90 backdrop-blur-md border border-white/15 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white">
                CHURCHILL BROTHERS FC GOA
              </span>
              <span className="text-primary font-bold">•</span>
              <span className="px-3 py-1 rounded bg-primary text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white shadow-club">
                THE RED MACHINES
              </span>
              <span className="text-zinc-500 font-bold">•</span>
              <span className="px-2.5 py-1 rounded bg-[#141926]/80 border border-white/10 text-[11px] font-display font-bold uppercase tracking-wider text-brandGold">
                ESTD 1988
              </span>
            </div>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-[0.95] drop-shadow-md"
          >
            BUILT ON HISTORY.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-primary">
              DEFENDING THE FORTRESS.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Two-time national I-League Champions and pride of South Goa. Welcome to the official digital platform of Churchill Brothers Football Club.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              href="/tickets"
              className="px-7 py-3.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-widest transition shadow-club flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-200"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Match Tickets (Demo)</span>
            </Link>

            <Link
              href="/shop"
              className="px-7 py-3.5 rounded-lg bg-[#141926] hover:bg-[#1C2436] text-white border border-white/15 font-display font-bold text-xs uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 duration-200"
            >
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span>Official 2026/27 Kits</span>
            </Link>

            <Link
              href="/team"
              className="px-6 py-3.5 rounded-lg bg-[#141926]/70 hover:bg-[#1C2436] text-zinc-300 hover:text-white border border-white/10 font-display font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2"
            >
              <span>First Team Squad</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </motion.div>

          {/* Honours Ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-zinc-300 font-display font-semibold uppercase tracking-wider"
          >
            <span className="flex items-center gap-2 text-white">
              <Star className="w-4 h-4 text-brandGold fill-brandGold" />
              2x I-League Champions
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-2 text-white">
              <Trophy className="w-4 h-4 text-brandGold" />
              3x Durand Cup Winners
            </span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-2 text-white">
              <Shield className="w-4 h-4 text-primary" />
              8x Goa Pro League Champions
            </span>
          </motion.div>
        </div>

        {/* =====================================================================
            2. INTEGRATED NEXT MATCHDAY BANNER (FC Barcelona Style)
            ===================================================================== */}
        {nextMatch && (
          <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="bg-[#141926]/95 border border-white/15 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-2xl hover:border-primary/50 transition-all duration-300">
              {/* Header info */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded bg-primary text-white text-[11px] font-display font-bold uppercase tracking-wider shadow-club">
                    NEXT MATCHDAY
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {nextMatch.competition} • Matchday {nextMatch.matchday || '18'}
                  </span>
                </div>
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {nextMatch.venueName}
                </span>
              </div>

              {/* Match Teams & Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-5">
                {/* Matchup Details */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6">
                    {/* Home Team */}
                    <div className="flex items-center gap-3.5">
                      <ClubCrest size={52} />
                      <div>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                          CHURCHILL BROTHERS
                        </h2>
                        <span className="text-[11px] text-primary font-bold uppercase">
                          HOME • THE RED MACHINES
                        </span>
                      </div>
                    </div>

                    <div className="font-display font-black text-2xl text-zinc-500 sm:pt-3">
                      VS
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 bg-white/5 rounded-full p-1 border border-white/10">
                        <Image
                          src={nextMatch.opponentCrestUrl}
                          alt={nextMatch.opponentName}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                          {nextMatch.opponentName}
                        </h2>
                        <span className="text-[11px] text-zinc-400 font-bold uppercase">
                          AWAY
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Date, Time, Venue */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 font-medium pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {new Date(nextMatch.matchDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {new Date(nextMatch.matchDate).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        IST
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <span>{nextMatch.venueName}</span>
                    </div>
                  </div>
                </div>

                {/* Countdown & CTA */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-6 space-y-3.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Kickoff Countdown
                  </span>

                  <div className="grid grid-cols-4 gap-2 text-center w-full max-w-xs">
                    <div className="bg-[#1C2436] p-2.5 rounded-lg border border-white/10">
                      <span className="font-display font-black text-2xl text-white block">
                        {timeLeft.days}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-zinc-400">Days</span>
                    </div>
                    <div className="bg-[#1C2436] p-2.5 rounded-lg border border-white/10">
                      <span className="font-display font-black text-2xl text-white block">
                        {timeLeft.hours}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-zinc-400">Hours</span>
                    </div>
                    <div className="bg-[#1C2436] p-2.5 rounded-lg border border-white/10">
                      <span className="font-display font-black text-2xl text-white block">
                        {timeLeft.minutes}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-zinc-400">Mins</span>
                    </div>
                    <div className="bg-[#1C2436] p-2.5 rounded-lg border border-white/10">
                      <span className="font-display font-black text-2xl text-primary block">
                        {timeLeft.seconds}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-zinc-400">Secs</span>
                    </div>
                  </div>

                  <Link
                    href={`/tickets/${nextMatch.id}`}
                    className="w-full max-w-xs py-3 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-club"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Reserve Demo Tickets</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          3. THE RED FORTRESS — REAL FATORDA STADIUM SHOWCASE (Requested)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="bg-[#141926] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Stadium Real Photography Feature */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 group">
                  <Image
                    src="/images/stadium/fatorda-east-stand.jpg"
                    alt="Fatorda Stadium East Stand — Jawaharlal Nehru Stadium Margao"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                      THE FORTRESS
                    </span>
                    <span className="px-3 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-white font-display font-bold text-xs uppercase tracking-wider">
                      MARGAO, GOA
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                      JAWAHARLAL NEHRU STADIUM (FATORDA)
                    </h3>
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                      The cathedral of Goan football and spiritual home of Churchill Brothers FC since 1989.
                    </p>
                  </div>
                </div>

                {/* Supporting Real Photos Thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src="/images/stadium/fatorda-real-matchday.jpg"
                      alt="Matchday under the floodlights at Fatorda"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                      <span className="text-[10px] font-bold text-white uppercase line-clamp-1">Night Floodlights</span>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src="/images/stadium/fatorda-aerial-view.jpg"
                      alt="Aerial view of Fatorda Stadium Margao"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                      <span className="text-[10px] font-bold text-white uppercase line-clamp-1">Aerial Margao</span>
                    </div>
                  </div>
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src="/images/stadium/fatorda-pitch-view.jpg"
                      alt="Pristine natural grass matchday pitch"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                      <span className="text-[10px] font-bold text-white uppercase line-clamp-1">Natural Grass</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stadium Details & Story */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C2436] border border-white/10 text-primary text-xs font-display font-bold uppercase tracking-wider mb-3">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    SACRED GROUND OF GOAN FOOTBALL
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                    WHERE LEGENDS CONQUER.{' '}
                    <span className="text-primary">THE RED FORTRESS.</span>
                  </h2>
                  <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                    Inaugurated in 1989 and renovated to world-class standards, Fatorda Stadium has borne witness to Churchill Brothers&apos; greatest triumphs — including two national I-League championships and memorable AFC Cup nights.
                  </p>
                </div>

                {/* 4 Stadium Metrics */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="bg-[#1C2436] p-4 rounded-xl border border-white/10">
                    <span className="font-display font-black text-2xl text-white block">19,000</span>
                    <span className="text-[11px] font-bold uppercase text-zinc-400">All-Seater Capacity</span>
                  </div>
                  <div className="bg-[#1C2436] p-4 rounded-xl border border-white/10">
                    <span className="font-display font-black text-2xl text-brandGold block">105m × 68m</span>
                    <span className="text-[11px] font-bold uppercase text-zinc-400">Natural Grass Pitch</span>
                  </div>
                  <div className="bg-[#1C2436] p-4 rounded-xl border border-white/10">
                    <span className="font-display font-black text-2xl text-primary block">Margao</span>
                    <span className="text-[11px] font-bold uppercase text-zinc-400">South Goa Location</span>
                  </div>
                  <div className="bg-[#1C2436] p-4 rounded-xl border border-white/10">
                    <span className="font-display font-black text-2xl text-white block">1989</span>
                    <span className="text-[11px] font-bold uppercase text-zinc-400">Fortress Established</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/tickets"
                    className="px-6 py-3 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Reserve Matchday Tickets</span>
                  </Link>

                  <Link
                    href="/club#stadium"
                    className="px-5 py-3 rounded-lg bg-[#1C2436] hover:bg-[#252E44] text-zinc-200 border border-white/10 font-display font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                  >
                    <span>Stadium Guide & Seating</span>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* =====================================================================
          4. OFFICIAL 2026/27 KITS (REAL JERSEYS NOT FAKE - Requested)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-primary tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL APPAREL & MERCHANDISE
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                OFFICIAL 2026/27 KIT REVEAL
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Engineered by official technical partner Nivia. Authentic matchday jerseys featuring cursive &ldquo;Churchill&rdquo; sponsor script, embroidered two-star shield crest, and Goa contour map lines.
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
        </ScrollReveal>

        {/* 3 Real Jerseys Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* A. 2026/27 Official Home Jersey */}
          <ScrollReveal direction="up" className="group bg-[#141926] border border-white/10 hover:border-primary/60 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/5] w-full bg-[#0B0E17] overflow-hidden">
                <Image
                  src="/images/products/home-jersey-2026-27.jpg"
                  alt="Churchill Brothers FC Official Home Jersey 2026/27 — Scarlet Red"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                  OFFICIAL HOME KIT
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-brandGold font-bold">
                  2 STARS EMBROIDERED
                </span>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                  Scarlet Red & Gold
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase group-hover:text-primary transition leading-snug">
                  Official Home Jersey 2026/27
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  The iconic Red Machines match jersey. Features cursive white &ldquo;Churchill&rdquo; chest sponsor, Nivia technical fabric with Goa contour lines, and gold championship sleeve piping.
                </p>

                {/* Size Preview */}
                <div className="flex items-center gap-1.5 mt-4">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <span key={sz} className="px-2.5 py-1 rounded bg-[#1C2436] border border-white/10 text-[10px] font-bold text-zinc-300">
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block font-medium">Demo Price</span>
                  <span className="font-display font-black text-2xl text-white">₹1,699</span>
                </div>
                <Link
                  href="/shop/home-jersey-2026-27"
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Demo Kit</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* B. 2026/27 Official Away Jersey */}
          <ScrollReveal direction="up" delay={0.1} className="group bg-[#141926] border border-white/10 hover:border-primary/60 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/5] w-full bg-[#0B0E17] overflow-hidden">
                <Image
                  src="/images/products/away-jersey-2026-27.jpg"
                  alt="Churchill Brothers FC Official Away Jersey 2026/27 — Pearl White & Silver"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-zinc-200 text-[#0B0E17] font-display font-bold text-xs uppercase tracking-wider shadow-sm">
                  OFFICIAL AWAY KIT
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 font-bold">
                  PEARL WHITE & RED
                </span>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  Pearl White & Scarlet
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase group-hover:text-primary transition leading-snug">
                  Official Away Jersey 2026/27
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Athletic pearl white jersey adorned with scarlet cursive &ldquo;Churchill&rdquo; script, two-star shield crest, and red/gold ribbed athletic collar for away fixtures across India.
                </p>

                {/* Size Preview */}
                <div className="flex items-center gap-1.5 mt-4">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <span key={sz} className="px-2.5 py-1 rounded bg-[#1C2436] border border-white/10 text-[10px] font-bold text-zinc-300">
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block font-medium">Demo Price</span>
                  <span className="font-display font-black text-2xl text-white">₹1,699</span>
                </div>
                <Link
                  href="/shop/away-jersey-2026-27"
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Demo Kit</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* C. 2026/27 Official Third Jersey */}
          <ScrollReveal direction="up" delay={0.2} className="group bg-[#141926] border border-white/10 hover:border-primary/60 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/5] w-full bg-[#0B0E17] overflow-hidden">
                <Image
                  src="/images/products/third-jersey-2026-27.jpg"
                  alt="Churchill Brothers FC Third Jersey 2026/27 — Black & Gold Edition"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded bg-brandGold text-black font-display font-bold text-xs uppercase tracking-wider shadow-sm">
                  LIMITED EDITION THIRD
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-brandGold font-bold">
                  BLACK & GOLD
                </span>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-bold text-brandGold uppercase tracking-wider block mb-1">
                  Midnight Black & Gold
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase group-hover:text-primary transition leading-snug">
                  Third Jersey — Black & Gold Edition
                </h3>
                <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                  Stealth matte black collector&apos;s cut featuring metallic championship gold cursive lettering, geometric scarlet cuts, and two gold stars celebrating 38 years of excellence.
                </p>

                {/* Size Preview */}
                <div className="flex items-center gap-1.5 mt-4">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <span key={sz} className="px-2.5 py-1 rounded bg-[#1C2436] border border-white/10 text-[10px] font-bold text-zinc-300">
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block font-medium">Demo Price</span>
                  <span className="font-display font-black text-2xl text-brandGold">₹1,899</span>
                </div>
                <Link
                  href="/shop/third-jersey-2026-27"
                  className="px-5 py-2.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Demo Kit</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          5. RECENT RESULTS & SEASON FORM
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                MATCH CENTER
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                LATEST RESULTS & FORM
              </h2>
            </div>
            <Link
              href="/matches"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
            >
              <span>View All Fixtures & Results</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentResults.map((match) => (
            <StaggerItem key={match.id}>
              <ScoreCard match={match} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* =====================================================================
          6. EDITORIAL NEWS & PRESS ROOM
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                INSIDE THE RED MACHINES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                LATEST CLUB NEWS & PRESS
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
            >
              <span>Browse Full Newsroom</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* A. Large Featured Article (6 Cols) */}
          {featuredArticle && (
            <div className="lg:col-span-6 bg-[#141926] border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-primary/50 transition group flex flex-col justify-between">
              <div>
                <Link href={`/news/${featuredArticle.slug}`} className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-[#0B0E17]">
                  <Image
                    src={featuredArticle.featuredImageUrl}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                    {featuredArticle.category}
                  </span>
                </Link>

                <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readTimeMinutes} min read</span>
                </div>

                <Link href={`/news/${featuredArticle.slug}`}>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-primary transition leading-tight mb-3">
                    {featuredArticle.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10">
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-red-400 transition"
                >
                  <span>Read Full Feature Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* B. Two Smaller Supporting Articles (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            {secondaryArticles.map((post) => (
              <div
                key={post.id}
                className="bg-[#141926] border border-white/10 rounded-xl p-4 shadow-xl hover:border-primary/50 transition group"
              >
                <Link href={`/news/${post.slug}`} className="block relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-3 bg-[#0B0E17]">
                  <Image
                    src={post.featuredImageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-primary text-white font-display font-bold text-[10px] uppercase tracking-wider">
                    {post.category}
                  </span>
                </Link>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-1 font-medium">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                  <span>•</span>
                  <span>{post.readTimeMinutes} min read</span>
                </div>

                <Link href={`/news/${post.slug}`}>
                  <h4 className="font-display font-bold text-base text-white group-hover:text-primary transition line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                </Link>

                <p className="text-xs text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>

          {/* C. Structured News List (3 Cols) */}
          <div className="lg:col-span-3 bg-[#141926] border border-white/10 rounded-xl p-5 shadow-xl">
            <div className="pb-3 mb-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-display font-black text-sm uppercase tracking-wider text-white">
                CLUB BULLETINS
              </span>
              <span className="text-[10px] font-bold uppercase text-primary">
                FEED
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {newsList.map((post) => (
                <div key={post.id} className="py-3.5 first:pt-0 last:pb-0 group">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                    {post.category}
                  </span>
                  <Link href={`/news/${post.slug}`}>
                    <h5 className="font-display font-bold text-sm text-white group-hover:text-primary transition line-clamp-2 leading-snug">
                      {post.title}
                    </h5>
                  </Link>
                  <div className="mt-1 text-[11px] text-zinc-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-center">
              <Link
                href="/news"
                className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-primary inline-flex items-center gap-1"
              >
                <span>View All Media Releases</span>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. FEATURED FIRST-TEAM PLAYERS
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                FIRST TEAM
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                FEATURED SQUAD • 2026/27
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
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlayers.map((player) => (
            <StaggerItem key={player.id}>
              <PlayerCard player={player} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* =====================================================================
          8. CLUB HERITAGE & TROPHY CABINET (The Two Stars)
          ===================================================================== */}
      <section className="bg-[#141926] border-y border-white/10 py-16 lg:py-20">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Heritage Story */}
            <ScrollReveal className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C2436] border border-white/10 text-primary text-xs font-display font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-primary" />
                ESTABLISHED 1988 • VARCA & MARGAO, GOA
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                THE STARS WE EARNED.{' '}
                <span className="text-primary">THE LEGACY WE DEFEND.</span>
              </h2>

              <p className="text-base text-zinc-300 leading-relaxed font-sans">
                Founded in 1988 in Varca, South Goa, Churchill Brothers Football Club emerged to become one of the most decorated sporting dynasties in Indian football.
              </p>

              <p className="text-base text-zinc-300 leading-relaxed font-sans">
                With two national premier I-League championship stars, three Durand Cups, two IFA Shields, and eight Goa Professional League titles, The Red Machines represent the fearless attacking spirit and football obsession of the Goan people.
              </p>

              <div className="pt-2">
                <Link
                  href="/club"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club"
                >
                  <span>Explore Club History & Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Trophy Showcase Grid */}
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {CLUB_HONOURS.slice(0, 4).map((honour, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1C2436] p-6 rounded-xl border border-white/10 shadow-xl hover:border-primary/50 transition group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#141926] border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Trophy className="w-5 h-5 text-brandGold" />
                      </div>
                      <span className="font-display font-black text-3xl text-white">
                        x{honour.count}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white uppercase">
                      {honour.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-mono">
                      {honour.years.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. OFFICIAL CLUB PARTNERS & SPONSORS
          ===================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <ScrollReveal className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-zinc-400">
            OFFICIAL CLUB PARTNERS & SPONSORS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative h-16 bg-[#141926] border border-white/10 rounded-xl p-3 flex items-center justify-center hover:border-primary/50 transition"
                title={`${sponsor.name} (${sponsor.tier})`}
              >
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
