'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { LeagueStandings } from '@/components/ui/LeagueStandings';
import { ClubTV } from '@/components/ui/ClubTV';
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
  Tv,
  Play,
  Flame,
  Award,
  Sparkles,
  Users,
  Compass,
} from 'lucide-react';

interface HeroSlide {
  id: string;
  category: string;
  headline: string;
  subdeck: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'derby',
    category: 'MATCHDAY 18 PREVIEW • THE GOAN DERBY',
    headline: 'RED MACHINES PRIMED FOR HIGH-STAKES DERBY CLASH UNDER FATORDA LIGHTS',
    subdeck:
      'Mateus Costa’s table-toppers host state rivals Dempo SC in Margao this Saturday, looking to extend their 6-match unbeaten run and consolidate their push for a historic 3rd national I-League star.',
    image: '/images/stadium/fatorda-east-stand.jpg',
    primaryCtaText: 'Reserve Match Tickets (Demo)',
    primaryCtaLink: '/tickets',
    secondaryCtaText: 'Match Preview & Squad',
    secondaryCtaLink: '/matches/churchill-brothers-vs-dempo-sc-goan-derby',
  },
  {
    id: 'kit',
    category: 'OFFICIAL MATCHWEAR • 2026/27 LAUNCH',
    headline: 'WEAR THE PASSION: 2026/27 HOME, AWAY & THIRD KITS UNVEILED BY NIVIA',
    subdeck:
      'Engineered with lightweight moisture-wicking jacquard, featuring the iconic cursive "Churchill" sponsor script, embroidered two-star shield crest, and South Goa topography contour lines.',
    image: '/images/products/home-jersey-2026-27.jpg',
    primaryCtaText: 'Shop Official Kits (Demo)',
    primaryCtaLink: '/shop',
    secondaryCtaText: 'Home Kit Details',
    secondaryCtaLink: '/shop/home-jersey-2026-27',
  },
  {
    id: 'stadium',
    category: 'THE RED FORTRESS • MARGAO, GOA',
    headline: '19,000 VOICES: DEFENDING THE HISTORIC CATHEDRAL OF GOAN FOOTBALL',
    subdeck:
      'From 2009 and 2013 national championship trophy lifts to electric AFC Cup nights, explore Jawaharlal Nehru Stadium (Fatorda) — the heartbeat of Churchill Brothers FC since 1989.',
    image: '/images/stadium/fatorda-real-matchday.jpg',
    primaryCtaText: 'Fatorda Stadium Guide',
    primaryCtaLink: '/club#stadium',
    secondaryCtaText: 'Matchday Seating Plan',
    secondaryCtaLink: '/tickets',
  },
];

export default function HomePage() {
  const { matches, players, products, news } = useApp();

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Auto rotate hero slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[activeSlideIndex];

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
    <div className="space-y-14 lg:space-y-20 bg-[#0B0E17] text-zinc-100 pb-20">
      {/* =====================================================================
          1. EDITORIAL HERO LEAD CAROUSEL (Real Madrid / FC Barcelona Style)
          ===================================================================== */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex flex-col justify-between overflow-hidden bg-[#07090E]">
        {/* Background Image with Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.headline}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-40"
              />
            </motion.div>
          </AnimatePresence>

          {/* Broadcast-grade multi-layer dark gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-[#0B0E17]/70 to-[#0B0E17]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E17]/95 via-[#0B0E17]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Lead Story Content Container */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-12 lg:pt-16 pb-8">
          <div className="max-w-4xl space-y-5">
            {/* Category / Broadcast Tag */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-club">
                {activeSlide.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Club Dispatch
              </span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase tracking-tight leading-[0.95] drop-shadow-md">
              {activeSlide.headline}
            </h1>

            {/* Subtitle / Deck */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 max-w-3xl leading-relaxed font-sans">
              {activeSlide.subdeck}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={activeSlide.primaryCtaLink}
                className="px-7 py-3.5 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-widest transition shadow-club flex items-center gap-2 hover:-translate-y-0.5 duration-200"
              >
                <Ticket className="w-4 h-4" />
                <span>{activeSlide.primaryCtaText}</span>
              </Link>

              <Link
                href={activeSlide.secondaryCtaLink}
                className="px-6 py-3.5 rounded-lg bg-[#141926]/90 hover:bg-[#1C2436] text-white border border-white/15 font-display font-bold text-xs uppercase tracking-widest transition shadow-sm flex items-center gap-2 hover:-translate-y-0.5 duration-200"
              >
                <span>{activeSlide.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Slide Switcher Strip */}
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-4">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/10 pt-4">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`text-left p-2.5 sm:p-3 rounded-lg border transition-all ${
                    isCurrent
                      ? 'bg-[#141926] border-primary/80 shadow-club'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-[#141926]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isCurrent ? 'text-primary font-bold' : 'text-zinc-500'}>
                      0{idx + 1}
                    </span>
                    {isCurrent && (
                      <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">ACTIVE</span>
                    )}
                  </div>
                  <span className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1 uppercase">
                    {slide.category.split('•')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DUAL MATCHDAY HUB (Next Fixture vs Recent Result)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card A: Next Fixture Countdown (7 Cols) */}
          {nextMatch && (
            <div className="lg:col-span-7 bg-[#141926] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-primary text-white font-display font-bold text-[10px] uppercase tracking-wider shadow-club">
                      UPCOMING MATCH
                    </span>
                    <span className="font-bold text-white uppercase tracking-wider">
                      {nextMatch.competition} • MD {nextMatch.matchday || '18'}
                    </span>
                  </div>
                  <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {nextMatch.venueName}
                  </span>
                </div>

                {/* Matchup row */}
                <div className="grid grid-cols-5 items-center gap-3 my-3 text-center">
                  <div className="col-span-2 flex flex-col items-center">
                    <ClubCrest size={52} />
                    <span className="mt-2 font-display font-black text-sm sm:text-base text-white uppercase line-clamp-1">
                      Churchill Brothers
                    </span>
                    <span className="text-[10px] text-primary font-bold uppercase">
                      HOME • 1st In Table
                    </span>
                  </div>

                  <div className="col-span-1 flex flex-col items-center">
                    <span className="font-display font-black text-2xl text-zinc-500">VS</span>
                    <span className="text-[10px] font-mono text-zinc-400 mt-1 uppercase">19:00 IST</span>
                  </div>

                  <div className="col-span-2 flex flex-col items-center">
                    <div className="relative w-12 h-12 bg-white/5 rounded-full p-1 border border-white/10">
                      <Image
                        src={nextMatch.opponentCrestUrl}
                        alt={nextMatch.opponentName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="mt-2 font-display font-black text-sm sm:text-base text-white uppercase line-clamp-1">
                      {nextMatch.opponentName}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">
                      AWAY • 3rd In Table
                    </span>
                  </div>
                </div>

                {/* Countdown & Broadcast Strip */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-brandGold" />
                    <span className="text-xs text-zinc-300 font-medium">
                      Live on Star Sports Select 2 & JioCinema
                    </span>
                  </div>

                  {/* 4 small countdown boxes */}
                  <div className="flex items-center gap-1.5 text-center">
                    <div className="bg-[#1C2436] px-2 py-1 rounded border border-white/10 min-w-[42px]">
                      <span className="font-display font-black text-sm text-white block">{timeLeft.days}</span>
                      <span className="text-[8px] font-bold text-zinc-400 uppercase">Days</span>
                    </div>
                    <div className="bg-[#1C2436] px-2 py-1 rounded border border-white/10 min-w-[42px]">
                      <span className="font-display font-black text-sm text-white block">{timeLeft.hours}</span>
                      <span className="text-[8px] font-bold text-zinc-400 uppercase">Hrs</span>
                    </div>
                    <div className="bg-[#1C2436] px-2 py-1 rounded border border-white/10 min-w-[42px]">
                      <span className="font-display font-black text-sm text-white block">{timeLeft.minutes}</span>
                      <span className="text-[8px] font-bold text-zinc-400 uppercase">Min</span>
                    </div>
                    <div className="bg-[#1C2436] px-2 py-1 rounded border border-white/10 min-w-[42px]">
                      <span className="font-display font-black text-sm text-primary block">{timeLeft.seconds}</span>
                      <span className="text-[8px] font-bold text-zinc-400 uppercase">Sec</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <Link
                  href={`/tickets/${nextMatch.id}`}
                  className="flex-1 py-3 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-club"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Match Tickets (Demo)</span>
                </Link>

                <Link
                  href="/matches"
                  className="px-4 py-3 rounded-lg bg-[#1C2436] hover:bg-[#252E44] text-zinc-300 hover:text-white border border-white/10 font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1"
                >
                  <span>Head to Head</span>
                </Link>
              </div>
            </div>
          )}

          {/* Card B: Recent Result & Form (5 Cols) */}
          {recentCompleted && (
            <div className="lg:col-span-5 bg-[#141926] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-[#1C2436] border border-white/10 text-zinc-300 font-display font-bold text-[10px] uppercase tracking-wider">
                    LATEST RESULT
                  </span>
                  <span className="text-zinc-400 font-medium">
                    {new Date(recentCompleted.matchDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Score Summary */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <ClubCrest size={40} />
                    <div>
                      <h4 className="font-display font-black text-base text-white uppercase">
                        Churchill Brothers
                      </h4>
                      <span className="text-[11px] text-zinc-400">Home • Fatorda</span>
                    </div>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-lg bg-[#1C2436] border border-white/10 text-center">
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
                      <span className="text-[11px] text-zinc-400">Away</span>
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

                {/* Goalscorers */}
                <div className="mt-3.5 p-3 rounded-lg bg-[#0B0E17]/60 border border-white/5 text-xs text-zinc-300 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium">
                    <span>⚽ Lekay 18&apos;, 39&apos; | Gutiérrez 82&apos;</span>
                    <span className="text-zinc-500 font-mono">Attendance: 8,420</span>
                  </div>
                </div>

                {/* Form strip */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-display font-bold uppercase tracking-wider text-zinc-400">
                    Red Machines Form:
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-white">
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded bg-amber-600 flex items-center justify-center">D</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center">W</span>
                    <span className="text-zinc-400 text-[11px] ml-1">(Unbeaten)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <Link
                  href={`/matches/${recentCompleted.slug}`}
                  className="w-full py-3 rounded-lg bg-[#1C2436] hover:bg-[#252E44] text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/10"
                >
                  <span>Read Full Match Report & Quotes</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          3. LIVE I-LEAGUE TABLE & STANDINGS (Real Madrid / FC Barcelona Style)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <LeagueStandings />
      </section>

      {/* =====================================================================
          4. RED MACHINES TV (Barça One / RM Play / MUTV Video Hub)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ClubTV />
      </section>

      {/* =====================================================================
          5. ASYMMETRICAL EDITORIAL NEWSROOM (The Athletic / Real Sports Publishing)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-white/10 gap-4">
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
            <div className="lg:col-span-7 bg-[#141926] border border-white/10 rounded-2xl overflow-hidden shadow-2xl group flex flex-col justify-between">
              <div>
                <Link href={`/news/${featuredArticle.slug}`} className="block relative aspect-[16/10] w-full bg-[#07090E] overflow-hidden">
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
                  <span className="absolute bottom-4 left-4 text-xs font-mono text-zinc-300">
                    {new Date(featuredArticle.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </Link>

                <div className="p-6 sm:p-7 space-y-3">
                  <Link href={`/news/${featuredArticle.slug}`}>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-primary transition leading-tight">
                      {featuredArticle.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-zinc-300 leading-relaxed font-sans line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-400">{featuredArticle.readTimeMinutes} min read</span>
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
            <span className="text-xs font-display font-bold uppercase tracking-wider text-zinc-400 block mb-2">
              Trending Headlines:
            </span>

            {trendingArticles.map((post, idx) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="block p-4 sm:p-5 rounded-xl bg-[#141926] border border-white/10 hover:border-primary/60 transition group shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display font-black text-2xl text-primary/70 shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {post.category}
                    </span>
                    <h4 className="font-display font-bold text-base text-white group-hover:text-primary transition line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-zinc-400">
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
          6. OFFICIAL 2026/27 MEGASTORE (Real Kit Launch Spotlight)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-[#141926] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-display font-bold text-primary tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                OFFICIAL APPAREL & MERCHANDISE
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                2026/27 OFFICIAL KIT COLLECTION
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                Engineered by technical partner Nivia. Official matchday shirts featuring cursive &ldquo;Churchill&rdquo; sponsor script, silicone two-star crest, and Goa contour lines.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {realJerseys.map((jersey) => (
              <div
                key={jersey.id}
                className="bg-[#0B0E17] border border-white/10 hover:border-primary/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/5] w-full bg-[#07090E] overflow-hidden">
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
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-brandGold font-bold">
                      2 STARS
                    </span>
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {jersey.categoryName}
                    </span>
                    <h3 className="font-display font-black text-lg text-white uppercase group-hover:text-primary transition line-clamp-1">
                      {jersey.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {jersey.description}
                    </p>

                    {/* Size Selector Strip */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                        <span key={sz} className="px-2 py-0.5 rounded bg-[#141926] border border-white/10 text-[10px] font-bold text-zinc-300">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block font-medium">Demo Price</span>
                      <span className="font-display font-black text-xl text-white">
                        ₹{jersey.priceInr.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link
                      href={`/shop/${jersey.slug}`}
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-club flex items-center gap-1.5"
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
          <div className="pt-4 border-t border-white/10">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              Official Matchday Wardrobe:
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="/images/kits/real_jersey_hanger.jpg"
                  alt="Official Home Jersey on matchday hanger"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10">
                <Image
                  src="/images/kits/real_players_kit.jpg"
                  alt="First-team squad in official Churchill red kit"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10">
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
          7. THE RED FORTRESS — FATORDA STADIUM IMMERSION
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-[#141926] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                    Home of Churchill Brothers FC since 1989. Two national championship triumphs and AFC Cup fixtures.
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C2436] border border-white/10 text-primary text-xs font-display font-bold uppercase tracking-wider mb-3">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  SACRED GROUND OF GOAN FOOTBALL
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                  THE SOUL OF SOUTH GOA.{' '}
                  <span className="text-primary">FATORDA STADIUM.</span>
                </h2>
                <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                  Inaugurated in 1989 and upgraded to FIFA and AFC standards, Fatorda Stadium in Margao has roared for every championship chapter of The Red Machines.
                </p>
              </div>

              {/* 4 Metrics */}
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
                  <span>Stadium Seating Plan</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FIRST-TEAM SQUAD WALL
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 mb-6 border-b border-white/10 gap-4">
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

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <section className="bg-[#141926] border-y border-white/10 py-16 lg:py-20">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Heritage Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1C2436] border border-white/10 text-primary text-xs font-display font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-primary" />
                ESTABLISHED 1988 • VARCA & MARGAO, GOA
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                THE STARS WE EARNED.{' '}
                <span className="text-primary">THE LEGACY WE DEFEND.</span>
              </h2>

              <p className="text-base text-zinc-300 leading-relaxed font-sans">
                Founded in 1988 by patron Churchill Alemao, Churchill Brothers Football Club Goa emerged from the coastal soil of South Goa to become one of the most decorated dynasties in Indian sporting history.
              </p>

              <p className="text-base text-zinc-300 leading-relaxed font-sans">
                With two national premier I-League championship stars (2008-09 and 2012-13), three Durand Cups, two IFA Shields, and eight Goa Professional League titles, The Red Machines represent the fearless attacking spirit and football obsession of the Goan people.
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
            </div>

            {/* Trophies Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
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
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. OFFICIAL PARTNERS & SPONSORS
          ===================================================================== */}
      <section className="border-t border-white/10 pt-12">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-zinc-400">
            OFFICIAL CLUB PARTNERS & TECHNICAL SPONSORS
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
        </div>
      </section>
    </div>
  );
}
