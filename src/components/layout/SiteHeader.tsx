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
      setIsScrolled(window.scrollY > 15);
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
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-editorial border-b border-stone'
          : 'bg-ivory border-b border-stone'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity / Official Crest */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group shrink-0 mr-8 lg:mr-12 xl:mr-16"
          >
            <ClubCrest size={46} priority />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight uppercase text-ink group-hover:text-burgundy transition-colors duration-150">
                CHURCHILL BROTHERS
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-burgundy">
                  THE RED MACHINES
                </span>
                <span className="text-stone-dark text-[10px]">•</span>
                <span className="text-[10px] tracking-wider uppercase font-medium text-muted">
                  ESTD 1988
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/') && pathname === '/'
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>Home</span>
              {isActive('/') && pathname === '/' && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
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
                className={`relative flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                  isActive('/matches')
                    ? 'text-burgundy font-bold'
                    : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
                }`}
              >
                <span>Matches</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-muted ${
                    matchesDropdownOpen ? 'rotate-180 text-burgundy' : ''
                  }`}
                />
                {isActive('/matches') && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {matchesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-60 bg-white border border-stone shadow-dropdown py-1 z-50 rounded-sm"
                  >
                    <Link
                      href="/matches"
                      className="block px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition font-medium"
                      onClick={() => setMatchesDropdownOpen(false)}
                    >
                      All Fixtures & Results
                    </Link>
                    <Link
                      href="/matches?tab=upcoming"
                      className="block px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition font-medium"
                      onClick={() => setMatchesDropdownOpen(false)}
                    >
                      Upcoming Fixtures
                    </Link>
                    <Link
                      href="/matches?tab=results"
                      className="block px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition font-medium"
                      onClick={() => setMatchesDropdownOpen(false)}
                    >
                      Match Reports & Results
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/team"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/team')
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>Squad</span>
              {isActive('/team') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>

            <Link
              href="/tickets"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/tickets')
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>Tickets</span>
              {isActive('/tickets') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>

            <Link
              href="/shop"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/shop')
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>Shop</span>
              {isActive('/shop') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
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
                className={`relative flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                  isActive('/club')
                    ? 'text-burgundy font-bold'
                    : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
                }`}
              >
                <span>Club</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 text-muted ${
                    clubDropdownOpen ? 'rotate-180 text-burgundy' : ''
                  }`}
                />
                {isActive('/club') && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>

              <AnimatePresence>
                {clubDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white border border-stone shadow-dropdown py-1 z-50 rounded-sm"
                  >
                    <Link
                      href="/club"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <Shield className="w-4 h-4 text-burgundy shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">Club Identity</div>
                        <div className="text-[11px] text-muted">History, values & Goan heritage</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#timeline"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <History className="w-4 h-4 text-brandGold shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">Historical Timeline</div>
                        <div className="text-[11px] text-muted">Milestones from 1988 to today</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#honours"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <Trophy className="w-4 h-4 text-brandGold shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">Trophy Cabinet</div>
                        <div className="text-[11px] text-muted">I-League, Durand Cup & Shields</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#stadium"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <MapPin className="w-4 h-4 text-burgundy shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">Fatorda Fortress</div>
                        <div className="text-[11px] text-muted">Home ground & stadiums</div>
                      </div>
                    </Link>
                    <Link
                      href="/club#rivalries"
                      className="flex items-center gap-3 px-4 py-2.5 text-xs text-ink/80 hover:text-ink hover:bg-ivory transition"
                      onClick={() => setClubDropdownOpen(false)}
                    >
                      <Flame className="w-4 h-4 text-burgundy shrink-0" />
                      <div>
                        <div className="font-semibold text-ink">The Goan Derby</div>
                        <div className="text-[11px] text-muted">Historic state rivalries</div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/news"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/news')
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>News</span>
              {isActive('/news') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>

            <Link
              href="/media"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/media')
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>Media</span>
              {isActive('/media') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>

            <Link
              href="/partners"
              className={`relative px-3 py-2 text-xs xl:text-sm font-sans font-medium tracking-normal transition ${
                isActive('/partners')
                  ? 'text-burgundy font-bold'
                  : 'text-ink/80 hover:text-ink hover:bg-stone-light/50'
              }`}
            >
              <span>Partners</span>
              {isActive('/partners') && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-burgundy"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 ml-4 lg:ml-6">
            {/* Quick Ticket CTA */}
            <Link
              href="/tickets"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-burgundy hover:bg-burgundy-hover active:scale-95 text-white text-xs font-sans font-semibold uppercase tracking-wider transition shadow-editorial rounded-sm"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Tickets</span>
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-ink/70 hover:text-ink transition hover:bg-stone-light/60 rounded-sm"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-burgundy text-white text-[11px] font-bold rounded-full shadow-editorial"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Customer Account */}
            <Link
              href="/account"
              className={`p-2 transition hover:bg-stone-light/60 rounded-sm ${
                isActive('/account') ? 'text-burgundy' : 'text-ink/70 hover:text-ink'
              }`}
              title={currentUser ? `Account: ${currentUser.fullName}` : 'Sign In'}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Admin Quick Link (Only when admin role active) */}
            {currentUser?.role === 'super_admin' && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-burgundy/10 border border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-white transition text-xs font-sans font-bold uppercase tracking-wider"
                title="Go to Admin Dashboard"
              >
                Admin
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink/80 hover:text-ink hover:bg-stone-light/60 focus:outline-none transition rounded-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-b border-stone px-4 pt-3 pb-6 space-y-1 shadow-editorial overflow-hidden"
          >
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/club"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Club & History
            </Link>
            <Link
              href="/team"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              First Team Squad
            </Link>
            <Link
              href="/matches"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fixtures & Results
            </Link>
            <Link
              href="/tickets"
              className="block px-3 py-2 text-sm font-sans font-bold text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Match Tickets
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Official Club Shop
            </Link>
            <Link
              href="/news"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              News & Press
            </Link>
            <Link
              href="/media"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Photo & Video Media
            </Link>
            <Link
              href="/partners"
              className="block px-3 py-2 text-sm font-sans font-medium text-ink hover:text-burgundy hover:bg-ivory rounded-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partners & Sponsors
            </Link>

            <div className="pt-3 mt-2 border-t border-stone flex items-center justify-between">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 text-burgundy" />
                <span>{currentUser ? currentUser.fullName : 'Account'}</span>
              </Link>

              {currentUser?.role === 'super_admin' && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-burgundy text-xs font-semibold text-white hover:bg-burgundy-hover"
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
