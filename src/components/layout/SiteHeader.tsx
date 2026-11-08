'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { useApp } from '@/lib/store';
import {
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Ticket,
  Shield,
  Trophy,
  History,
  MapPin,
  Flame,
} from 'lucide-react';

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, currentUser } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubDropdownOpen, setClubDropdownOpen] = useState(false);
  const [matchesDropdownOpen, setMatchesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all duration-300 ${
        isScrolled
          ? 'bg-brandBlack/95 backdrop-blur-md shadow-2xl border-b border-zinc-800'
          : 'bg-brandBlack/85 backdrop-blur-sm border-b border-zinc-800/50'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity / Crest */}
          <Link
            href="/"
            className="flex items-center gap-3 group shrink-0 mr-6 lg:mr-10 xl:mr-14"
          >
            <ClubCrest size={44} priority />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-wider uppercase text-white group-hover:text-primary transition duration-200">
                CHURCHILL BROTHERS
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-[0.2em] font-display font-bold uppercase text-brandGold">
                  THE RED MACHINES
                </span>
                <span className="text-zinc-600 text-[10px]">•</span>
                <span className="text-[10px] tracking-wider uppercase text-zinc-400">
                  ESTD 1988
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            <Link
              href="/"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/') && pathname === '/'
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white hover:bg-zinc-850'
              }`}
            >
              <span>Home</span>
              {isActive('/') && pathname === '/' && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Club Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setClubDropdownOpen(true)}
              onMouseLeave={() => setClubDropdownOpen(false)}
            >
              <button
                className={`relative flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                  isActive('/club')
                    ? 'text-primary font-bold'
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                <span>Club</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    clubDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                {isActive('/club') && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {clubDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 w-64 bg-darkSurface border border-zinc-800 rounded-lg shadow-2xl py-2 z-50"
                  >
                    <Link
                      href="/club"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <Shield className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-semibold">Club Identity</div>
                        <div className="text-xs text-zinc-400">History, values & Goan heritage</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#timeline"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <History className="w-4 h-4 text-brandGold" />
                      <div>
                        <div className="font-semibold">Historical Timeline</div>
                        <div className="text-xs text-zinc-400">Milestones from 1988 to today</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#honours"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <Trophy className="w-4 h-4 text-brandGold" />
                      <div>
                        <div className="font-semibold">Trophy Cabinet</div>
                        <div className="text-xs text-zinc-400">I-League, Durand Cup & Shields</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#stadium"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <div className="font-semibold">Fatorda Fortress</div>
                        <div className="text-xs text-zinc-400">Home ground & stadiums</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#rivalries"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <Flame className="w-4 h-4 text-deepRed" />
                      <div>
                        <div className="font-semibold">The Goan Derby</div>
                        <div className="text-xs text-zinc-400">Historic state rivalries</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/team"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/team')
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>Squad</span>
              {isActive('/team') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Matches Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMatchesDropdownOpen(true)}
              onMouseLeave={() => setMatchesDropdownOpen(false)}
            >
              <button
                className={`relative flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                  isActive('/matches')
                    ? 'text-primary font-bold'
                    : 'text-zinc-200 hover:text-white'
                }`}
              >
                <span>Matches</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    matchesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                {isActive('/matches') && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {matchesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-0 w-56 bg-darkSurface border border-zinc-800 rounded-lg shadow-2xl py-2 z-50"
                  >
                    <Link
                      href="/matches"
                      className="block px-4 py-2 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setMatchesDropdownOpen(false)}
                    >
                      Fixtures & Results
                    </Link>
                    <Link
                      href="/matches?tab=upcoming"
                      className="block px-4 py-2 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setMatchesDropdownOpen(false)}
                    >
                      Upcoming Fixtures
                    </Link>
                    <Link
                      href="/matches?tab=results"
                      className="block px-4 py-2 text-sm text-zinc-200 hover:text-white hover:bg-zinc-800 transition"
                      onClick={() => setMatchesDropdownOpen(false)}
                    >
                      Match Reports & Results
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/tickets"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/tickets')
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>Tickets</span>
              {isActive('/tickets') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            <Link
              href="/shop"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/shop')
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>Shop</span>
              {isActive('/shop') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            <Link
              href="/news"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/news')
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>News</span>
              {isActive('/news') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            <Link
              href="/media"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/media')
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>Media</span>
              {isActive('/media') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            <Link
              href="/partners"
              className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-wide uppercase transition rounded ${
                isActive('/partners')
                  ? 'text-primary font-bold'
                  : 'text-zinc-200 hover:text-white'
              }`}
            >
              <span>Partners</span>
              {isActive('/partners') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 ml-4 lg:ml-6">
            {/* Quick Ticket CTA */}
            <Link
              href="/tickets"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-primary hover:bg-deepRed active:scale-95 text-white text-xs font-display font-bold uppercase tracking-wider transition shadow-club"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Tickets</span>
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-zinc-300 hover:text-white transition rounded-full hover:bg-zinc-800"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-white text-[11px] font-bold rounded-full shadow-club"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Customer Account */}
            <Link
              href="/account"
              className={`p-2 transition rounded-full hover:bg-zinc-800 ${
                isActive('/account') ? 'text-primary' : 'text-zinc-300 hover:text-white'
              }`}
              title={currentUser ? `Account: ${currentUser.fullName}` : 'Sign In'}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Admin Quick Link (Only when admin role active) */}
            {currentUser?.role === 'super_admin' && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-white transition text-xs font-display font-bold uppercase tracking-wider"
                title="Go to Admin Dashboard"
              >
                Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-1 overflow-hidden"
          >
            <Link
              href="/"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/club"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Club & History
            </Link>
            <Link
              href="/team"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              First Team Squad
            </Link>
            <Link
              href="/matches"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fixtures & Results
            </Link>
            <Link
              href="/tickets"
              className="block py-2.5 text-base font-semibold text-primary hover:text-white font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Match Tickets
            </Link>
            <Link
              href="/shop"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Official Club Shop
            </Link>
            <Link
              href="/news"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              News & Press
            </Link>
            <Link
              href="/media"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Photo & Video Media
            </Link>
            <Link
              href="/partners"
              className="block py-2.5 text-base font-semibold text-zinc-200 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partners & Sponsors
            </Link>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 text-brandGold" />
                <span>{currentUser ? currentUser.fullName : 'Account'}</span>
              </Link>

              {currentUser?.role === 'super_admin' && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-xs font-semibold text-white hover:bg-deepRed shadow-club"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Dashboard →
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
