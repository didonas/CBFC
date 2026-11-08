'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { MatchCard } from '@/components/ui/MatchCard';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { PlayerCard } from '@/components/ui/PlayerCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { useApp } from '@/lib/store';
import { CLUB_INFO, CLUB_HONOURS, SPONSORS, INITIAL_MEDIA_GALLERY } from '@/lib/demo-data';
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
  Flame,
} from 'lucide-react';

export default function HomePage() {
  const { matches, players, products, news } = useApp();

  // Subtle hero parallax
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 500], [0, 50]);

  // Next upcoming match
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled');
  const nextMatch = upcomingMatches[0] || matches[0];

  // Recent completed matches
  const recentResults = matches.filter((m) => m.status === 'completed').slice(0, 3);

  // Featured squad players
  const featuredPlayers = players.filter((p) => p.isFeatured).slice(0, 4);

  // Featured products
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

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
    <div className="space-y-16 lg:space-y-24 bg-offWhite text-charcoal pb-16">
      {/* =====================================================================
          1. EDITORIAL HERO (Authentic, natural photography, bold condensed type)
          ===================================================================== */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden bg-charcoal">
        {/* Authentic Background Match Photography */}
        <motion.div
          style={{ y: heroParallaxY }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src="/images/hero/hero-matchday-floodlights.jpg"
            alt="Churchill Brothers FC Matchday at Fatorda Stadium"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-70"
          />
          {/* Subtle natural dark overlay for high text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-charcoal/70" />
        </motion.div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16">
          {/* Official Crest & Tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex flex-col items-center justify-center mb-5"
          >
            <ClubCrest size={76} priority />
            <div className="mt-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-black/40 backdrop-blur-xs border border-white/20 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white">
                CHURCHILL BROTHERS FC GOA
              </span>
              <span className="text-white/40">•</span>
              <span className="px-2.5 py-1 rounded bg-primary text-[11px] font-display font-bold uppercase tracking-[0.2em] text-white">
                THE RED MACHINES
              </span>
            </div>
          </motion.div>

          {/* User Requested Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none drop-shadow-sm"
          >
            BUILT ON HISTORY.{' '}
            <span className="text-primary">
              DRIVEN BY PASSION.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="mt-5 text-base sm:text-lg text-zinc-200 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Two-time I-League Champions and pride of South Goa. Welcome to the official digital platform of Churchill Brothers Football Club.
          </motion.p>

          {/* Two Clear CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Link
              href="/tickets"
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Match Tickets (Demo)</span>
            </Link>

            <Link
              href="/team"
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-white hover:bg-zinc-100 text-charcoal font-display font-bold text-xs uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore The Squad</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </motion.div>

          {/* Restrained Honours Ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-display font-semibold uppercase tracking-wider"
          >
            <span className="flex items-center gap-1.5 text-white">
              <Star className="w-3.5 h-3.5 text-brandGold fill-brandGold" />
              2x I-League Champions
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <Trophy className="w-3.5 h-3.5 text-brandGold" />
              3x Durand Cup Winners
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-white">
              <Shield className="w-3.5 h-3.5 text-primary" />
              8x Goa Pro League Champions
            </span>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          2. CLEAN MATCHDAY FEATURE & COUNTDOWN
          ===================================================================== */}
      {nextMatch && (
        <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 -mt-10 lg:-mt-14 relative z-20">
          <div className="bg-white border border-lightBorder shadow-card p-6 lg:p-8">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-lightBorder gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-primary text-white text-[11px] font-display font-bold uppercase tracking-wider">
                  NEXT MATCHDAY
                </span>
                <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  {nextMatch.competition} • Matchday {nextMatch.matchday || '18'}
                </span>
              </div>
              <span className="text-xs text-mutedGrey font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {nextMatch.venueName}
              </span>
            </div>

            {/* Match Teams & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
              {/* Matchup Details */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6">
                  {/* Home Team */}
                  <div className="flex items-center gap-3.5">
                    <ClubCrest size={56} />
                    <div>
                      <h2 className="font-display font-black text-xl sm:text-2xl text-charcoal uppercase">
                        CHURCHILL BROTHERS
                      </h2>
                      <span className="text-[11px] text-primary font-bold uppercase">
                        HOME
                      </span>
                    </div>
                  </div>

                  <div className="font-display font-black text-2xl text-mutedGrey sm:pt-3">
                    VS
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14">
                      <Image
                        src={nextMatch.opponentCrestUrl}
                        alt={nextMatch.opponentName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-xl sm:text-2xl text-charcoal uppercase">
                        {nextMatch.opponentName}
                      </h2>
                      <span className="text-[11px] text-mutedGrey font-bold uppercase">
                        AWAY
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Date, Time, Venue */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal font-medium pt-2">
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
                  <div className="flex items-center gap-1.5 text-mutedGrey">
                    <span>{nextMatch.venueName}</span>
                  </div>
                </div>
              </div>

              {/* Countdown & CTA */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-lightBorder lg:pl-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-mutedGrey">
                  Kickoff Countdown
                </span>

                <div className="grid grid-cols-4 gap-2 text-center w-full max-w-xs">
                  <div className="bg-offWhite p-2.5 border border-lightBorder">
                    <span className="font-display font-black text-2xl text-charcoal block">
                      {timeLeft.days}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-mutedGrey">Days</span>
                  </div>
                  <div className="bg-offWhite p-2.5 border border-lightBorder">
                    <span className="font-display font-black text-2xl text-charcoal block">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-mutedGrey">Hours</span>
                  </div>
                  <div className="bg-offWhite p-2.5 border border-lightBorder">
                    <span className="font-display font-black text-2xl text-charcoal block">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-mutedGrey">Mins</span>
                  </div>
                  <div className="bg-offWhite p-2.5 border border-lightBorder">
                    <span className="font-display font-black text-2xl text-primary block">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-mutedGrey">Secs</span>
                  </div>
                </div>

                <Link
                  href={`/tickets/${nextMatch.id}`}
                  className="w-full max-w-xs py-3 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Demo Tickets</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          3. RECENT RESULTS & SEASON FORM
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-lightBorder gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                MATCH CENTER
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
                LATEST RESULTS & FORM
              </h2>
            </div>
            <Link
              href="/matches"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-deepRed transition"
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
          4. USER-REQUESTED EDITORIAL NEWS SECTION
             (1 Large Featured + 2 Supporting + 1 Structured News List)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-lightBorder gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                INSIDE THE RED MACHINES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
                LATEST CLUB NEWS & PRESS
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-deepRed transition"
            >
              <span>Browse Full Newsroom</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* A. Large Featured Article (6 Cols) */}
          {featuredArticle && (
            <div className="lg:col-span-6 bg-white border border-lightBorder p-6 shadow-card hover:border-primary transition group flex flex-col justify-between">
              <div>
                <Link href={`/news/${featuredArticle.slug}`} className="block relative aspect-[16/10] w-full bg-[#EAE8E2] overflow-hidden mb-5">
                  <Image
                    src={featuredArticle.featuredImageUrl}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-primary text-white font-display font-bold text-xs uppercase tracking-wider shadow-sm">
                    {featuredArticle.category}
                  </span>
                </Link>

                <div className="flex items-center gap-3 text-xs text-mutedGrey mb-2 font-medium">
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
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-charcoal group-hover:text-primary transition leading-tight mb-3">
                    {featuredArticle.title}
                  </h3>
                </Link>

                <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-lightBorder">
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-deepRed transition"
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
                className="bg-white border border-lightBorder p-4 shadow-card hover:border-primary transition group"
              >
                <Link href={`/news/${post.slug}`} className="block relative aspect-[16/10] w-full bg-[#EAE8E2] overflow-hidden mb-3">
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

                <div className="flex items-center gap-2 text-[11px] text-mutedGrey mb-1 font-medium">
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
                  <h4 className="font-display font-bold text-base text-charcoal group-hover:text-primary transition line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                </Link>

                <p className="text-xs text-charcoal/70 mt-1.5 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>

          {/* C. Structured News List (3 Cols) */}
          <div className="lg:col-span-3 bg-white border border-lightBorder p-5 shadow-card">
            <div className="pb-3 mb-4 border-b border-lightBorder flex items-center justify-between">
              <span className="font-display font-black text-sm uppercase tracking-wider text-charcoal">
                CLUB BULLETINS
              </span>
              <span className="text-[10px] font-bold uppercase text-primary">
                FEED
              </span>
            </div>

            <div className="divide-y divide-lightBorder">
              {newsList.map((post) => (
                <div key={post.id} className="py-3.5 first:pt-0 last:pb-0 group">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                    {post.category}
                  </span>
                  <Link href={`/news/${post.slug}`}>
                    <h5 className="font-display font-bold text-sm text-charcoal group-hover:text-primary transition line-clamp-2 leading-snug">
                      {post.title}
                    </h5>
                  </Link>
                  <div className="mt-1 text-[11px] text-mutedGrey">
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-lightBorder text-center">
              <Link
                href="/news"
                className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-primary inline-flex items-center gap-1"
              >
                <span>View All Media Releases</span>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. FEATURED FIRST-TEAM PLAYERS
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-lightBorder gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                FIRST TEAM
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
                FEATURED SQUAD
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-deepRed transition"
            >
              <span>View Full 2026/27 Squad</span>
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
          6. CLUB HERITAGE & TROPHY CABINET (Editorial Storytelling)
          ===================================================================== */}
      <section className="bg-white border-y border-lightBorder py-16 lg:py-20">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Heritage Story */}
            <ScrollReveal className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-primary text-xs font-display font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-primary" />
                ESTABLISHED 1988 • VARCA & MARGAO, GOA
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-charcoal uppercase tracking-tight leading-tight">
                THE STARS WE EARNED.{' '}
                <span className="text-primary">THE LEGACY WE DEFEND.</span>
              </h2>

              <p className="text-base text-charcoal/80 leading-relaxed font-sans">
                Founded in 1988 by patron Churchill Alemao, Churchill Brothers Football Club Goa emerged from the coastal soil of South Goa to become one of the most dominant forces in Indian sporting history.
              </p>

              <p className="text-base text-charcoal/80 leading-relaxed font-sans">
                With two national premier I-League championship stars, three Durand Cups, two IFA Shields, and eight Goa Professional League titles, The Red Machines represent the fearless attacking spirit and football obsession of the Goan people.
              </p>

              <div className="pt-2">
                <Link
                  href="/club"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm"
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
                    className="bg-offWhite p-6 border border-lightBorder shadow-card hover:border-primary transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-lightBorder flex items-center justify-center text-primary">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <span className="font-display font-black text-3xl text-charcoal">
                        x{honour.count}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-charcoal uppercase">
                      {honour.title}
                    </h3>
                    <p className="text-xs text-mutedGrey mt-1 font-mono">
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
          7. OFFICIAL MERCHANDISE (Clean E-Commerce Store feel)
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-lightBorder gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                OFFICIAL STORE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
                WEAR THE RED MACHINES
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-deepRed transition"
            >
              <span>Visit Official Club Store</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* =====================================================================
          8. MATCHDAY MOMENTS PHOTOGRAPHY
          ===================================================================== */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-lightBorder gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                PHOTOGRAPHY
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-charcoal uppercase tracking-tight">
                MATCHDAY MOMENTS
              </h2>
            </div>
            <Link
              href="/media"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-deepRed transition"
            >
              <span>View Full Photo Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INITIAL_MEDIA_GALLERY.map((media) => (
            <StaggerItem key={media.id}>
              <Link
                href="/media"
                className="group relative aspect-square overflow-hidden bg-[#EAE8E2] border border-lightBorder hover:border-primary transition block"
              >
                <Image
                  src={media.mediaUrl}
                  alt={media.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex items-end">
                  <span className="text-[11px] font-bold text-white line-clamp-1">
                    {media.title}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* =====================================================================
          9. OFFICIAL PARTNERS (Restrained strip with generous whitespace)
          ===================================================================== */}
      <section className="border-t border-lightBorder pt-12">
        <ScrollReveal className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-mutedGrey">
            OFFICIAL CLUB PARTNERS & SPONSORS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative h-16 bg-white border border-lightBorder p-3 flex items-center justify-center hover:border-primary transition"
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
