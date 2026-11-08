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
import { NewsCard } from '@/components/ui/NewsCard';
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
  Flame,
  Star,
  ExternalLink,
} from 'lucide-react';

export default function HomePage() {
  const { matches, players, products, news } = useApp();

  // Scroll parallax for hero background
  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.05]);

  // Find next upcoming match
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled');
  const nextMatch = upcomingMatches[0] || matches[0];

  // Recent completed matches
  const recentResults = matches.filter((m) => m.status === 'completed').slice(0, 3);

  // Featured squad players
  const featuredPlayers = players.filter((p) => p.isFeatured).slice(0, 4);

  // Featured products
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  // Latest news articles
  const latestNews = news.slice(0, 3);

  // Countdown timer calculation for next match
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
    <div className="space-y-16 lg:space-y-24">
      {/* =====================================================================
          6.3 HERO SECTION (Cinematic, crisp 2K/4K athletic editorial)
          ===================================================================== */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-brandBlack">
        {/* Parallax Background Atmosphere Image */}
        <motion.div
          style={{ y: heroParallaxY, scale: heroScale }}
          className="absolute inset-0 z-0 origin-center"
        >
          <Image
            src="/images/hero/hero-matchday-floodlights.jpg"
            alt="Churchill Brothers FC Matchday Stadium Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65"
          />
          {/* Multi-layered Vignette & Dark Gradients for typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-brandBlack via-brandBlack/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brandBlack/80 via-transparent to-brandBlack/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-brandBlack/80" />
        </motion.div>

        {/* Hero Content Box with Staggered Entrance Animations */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
          {/* Brand Crest & Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex flex-col items-center justify-center mb-6"
          >
            <ClubCrest size={84} priority />
            <div className="mt-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-brandGold/50 text-[11px] font-display font-bold uppercase tracking-[0.25em] text-brandGold shadow-lg">
                CHURCHILL BROTHERS FC
              </span>
              <span className="text-zinc-600">•</span>
              <span className="px-3 py-1 rounded-full bg-primary/30 border border-primary text-[11px] font-display font-bold uppercase tracking-[0.25em] text-white shadow-sm">
                THE RED MACHINES
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-none drop-shadow-lg"
          >
            BUILT ON HISTORY.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-brandGold">
              DRIVEN BY PASSION.
            </span>
          </motion.h1>

          {/* Supporting Sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="mt-6 text-base sm:text-xl text-zinc-200 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow"
          >
            One club. One identity. A legacy that continues across Goan and Indian football.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/club"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-deepRed active:scale-95 text-white font-display font-black text-sm uppercase tracking-widest transition duration-200 shadow-club flex items-center justify-center gap-2"
            >
              <span>EXPLORE THE CLUB</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/tickets"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 active:scale-95 text-white border border-zinc-700 hover:border-brandGold font-display font-bold text-sm uppercase tracking-widest transition duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Ticket className="w-4 h-4 text-brandGold" />
              <span>BUY TICKETS (DEMO)</span>
            </Link>
          </motion.div>

          {/* Quick Trophy Accent Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-300 font-display font-semibold uppercase tracking-wider"
          >
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Star className="w-3.5 h-3.5 text-brandGold fill-brandGold" />
              2x I-League Champions
            </span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Trophy className="w-3.5 h-3.5 text-brandGold" />
              3x Durand Cup Winners
            </span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Shield className="w-3.5 h-3.5 text-primary" />
              8x Goa Pro League Champions
            </span>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          6.4 NEXT MATCH & COUNTDOWN BANNER
          ===================================================================== */}
      {nextMatch && (
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cardDark via-darkSurface to-cardDark border border-zinc-800 rounded-2xl p-6 lg:p-8 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-zinc-800 gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-primary text-white text-[11px] font-display font-bold uppercase tracking-wider">
                  NEXT MATCHDAY
                </span>
                <span className="text-xs font-semibold text-brandGold uppercase tracking-wider">
                  {nextMatch.competition} • Matchday {nextMatch.matchday || '12'}
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                {nextMatch.venueName}
              </span>
            </div>

            {/* Match Teams & Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-6">
              {/* Left Column: Matchup */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-6">
                  {/* Home Team */}
                  <div className="flex items-center gap-3">
                    <ClubCrest size={52} />
                    <div>
                      <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                        CHURCHILL BROTHERS
                      </h2>
                      <span className="text-[11px] text-brandGold font-bold uppercase">
                        HOME
                      </span>
                    </div>
                  </div>

                  <div className="font-display font-black text-2xl text-primary">
                    VS
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={nextMatch.opponentCrestUrl}
                        alt={nextMatch.opponentName}
                        fill
                        className="object-contain"
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

                {/* Date & Stadium */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brandGold" />
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
                    <Clock className="w-4 h-4 text-brandGold" />
                    <span>
                      {new Date(nextMatch.matchDate).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      IST
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{nextMatch.venueName}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Countdown Clock & Tickets CTA */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-zinc-800 lg:pl-8 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Kickoff Countdown
                </span>

                <div className="grid grid-cols-4 gap-2 text-center w-full max-w-xs">
                  <div className="bg-brandBlack p-2.5 rounded-lg border border-zinc-800">
                    <span className="font-display font-black text-2xl text-white block">
                      {timeLeft.days}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-zinc-500">Days</span>
                  </div>
                  <div className="bg-brandBlack p-2.5 rounded-lg border border-zinc-800">
                    <span className="font-display font-black text-2xl text-white block">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-zinc-500">Hours</span>
                  </div>
                  <div className="bg-brandBlack p-2.5 rounded-lg border border-zinc-800">
                    <span className="font-display font-black text-2xl text-white block">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-zinc-500">Mins</span>
                  </div>
                  <div className="bg-brandBlack p-2.5 rounded-lg border border-zinc-800">
                    <span className="font-display font-black text-2xl text-primary block">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-zinc-500">Secs</span>
                  </div>
                </div>

                <Link
                  href={`/tickets/${nextMatch.id}`}
                  className="w-full max-w-xs py-3 rounded-xl bg-primary hover:bg-deepRed active:scale-95 text-white font-display font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-club"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Reserve Demo Tickets</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* =====================================================================
          6.5 LATEST RESULTS & FIXTURES OVERVIEW
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandGold hover:text-white transition"
            >
              <span>View All Fixtures & Season Calendar</span>
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
          6.6 LATEST NEWS & EDITORIAL GRID
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
                INSIDE THE RED MACHINES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                LATEST CLUB NEWS
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandGold hover:text-white transition"
            >
              <span>Browse Newsroom</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((post) => (
            <StaggerItem key={post.id}>
              <NewsCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* =====================================================================
          6.7 FEATURED FIRST-TEAM PLAYERS
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                THE SQUAD
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                FEATURED FIRST TEAM
              </h2>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandGold hover:text-white transition"
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
          6.8 CLUB HERITAGE & TROPHY CABINET (Light/Editorial contrast section)
          ===================================================================== */}
      <section className="bg-offWhite text-brandBlack py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Heritage Text */}
            <ScrollReveal className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-100 border border-primary/30 text-primary text-xs font-display font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-primary" />
                ESTABLISHED 1988 • VARCA & MARGAO, GOA
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl text-brandBlack uppercase tracking-tight leading-tight">
                THE STARS WE EARNED.{' '}
                <span className="text-primary">THE LEGACY WE DEFEND.</span>
              </h2>

              <p className="text-base text-zinc-700 leading-relaxed font-sans">
                Founded in 1988 by patron Churchill Alemao, Churchill Brothers Football Club Goa emerged from the coastal soil of South Goa to become one of the most dominant forces in Indian sporting history.
              </p>

              <p className="text-base text-zinc-700 leading-relaxed font-sans">
                With two national premier I-League championship stars, three Durand Cups, two IFA Shields, and eight Goa Professional League titles, The Red Machines represent the fearless attacking spirit and football obsession of the Goan people.
              </p>

              <div className="pt-2">
                <Link
                  href="/club"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brandBlack hover:bg-primary active:scale-95 text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-lg"
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
                    className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-primary">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <span className="font-display font-black text-3xl text-brandBlack">
                        x{honour.count}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-brandBlack uppercase">
                      {honour.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">
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
          6.9 MERCHANDISE SHOWCASE
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-primary tracking-widest uppercase">
                OFFICIAL STORE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                WEAR THE RED MACHINES
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandGold hover:text-white transition"
            >
              <span>Visit Full Club Store</span>
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
          6.10 MATCHDAY GALLERY (Atmospheric snapshots)
          ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
                PHOTOGRAPHY
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                MATCHDAY MOMENTS
              </h2>
            </div>
            <Link
              href="/media"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brandGold hover:text-white transition"
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
                className="group relative aspect-square rounded-xl overflow-hidden bg-darkSurface border border-zinc-800 hover:border-primary/60 transition block"
              >
                <Image
                  src={media.mediaUrl}
                  alt={media.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex items-end">
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
          6.11 SPONSORS & OFFICIAL PARTNERS
          ===================================================================== */}
      <section className="border-t border-zinc-800 py-12">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-display font-bold uppercase tracking-[0.2em] text-zinc-400">
            OFFICIAL CLUB PARTNERS & SPONSORS
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {SPONSORS.map((sponsor) => (
              <div
                key={sponsor.id}
                className="relative h-16 bg-cardDark/60 border border-zinc-800/80 rounded-xl p-3 flex items-center justify-center hover:border-zinc-700 hover:-translate-y-0.5 transition"
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
