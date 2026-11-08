'use client';

import React from 'react';
import Link from 'next/link';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { CLUB_INFO } from '@/lib/demo-data';
import { ShieldAlert, Instagram, Mail, Phone, MapPin, Trophy, ArrowUpRight } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-brandBlack border-t border-zinc-800 text-zinc-400">
      {/* Red Machines Accent Line */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-brandGold to-deepRed" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Club Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ClubCrest size={52} />
              <div>
                <h3 className="font-display font-extrabold text-2xl text-white tracking-wider uppercase">
                  CHURCHILL BROTHERS FC
                </h3>
                <p className="text-xs font-display font-bold text-brandGold tracking-widest uppercase">
                  THE RED MACHINES • ESTD 1988
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              Two-time I-League Champions, three-time Durand Cup Winners, and pride of Goan football. Built on history, driven by passion, and dedicated to the supporters of South Goa and Indian football.
            </p>

            <div className="space-y-2 text-xs text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{CLUB_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brandGold shrink-0" />
                <span>{CLUB_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-300 shrink-0" />
                <span>{CLUB_INFO.email}</span>
              </div>
            </div>

            {/* Social Link */}
            <div className="pt-2">
              <a
                href="https://instagram.com/churchillbrothersfcgoa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-white hover:text-primary hover:border-primary transition"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>@churchillbrothersfcgoa</span>
                <span className="text-[10px] text-zinc-500 font-bold px-1.5 py-0.5 rounded bg-zinc-800">105K Followers</span>
              </a>
            </div>
          </div>

          {/* Col 3: Club Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">
              Club & Squad
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/club" className="hover:text-primary transition">Club History</Link>
              </li>
              <li>
                <Link href="/club#timeline" className="hover:text-primary transition">Historic Milestones</Link>
              </li>
              <li>
                <Link href="/club#honours" className="hover:text-primary transition">Trophy Cabinet</Link>
              </li>
              <li>
                <Link href="/club#stadium" className="hover:text-primary transition">Fatorda Stadium</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-primary transition">First-Team Squad</Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-primary transition">Fixtures & Results</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Matchday & Commercial */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">
              Matchday & Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tickets" className="hover:text-primary transition">Match Tickets (Demo)</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition">Official Jerseys</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition">Training Apparel</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition">Fan Accessories</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary transition">Latest News</Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-primary transition">Matchday Photos</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Administration & Support */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-white mb-4">
              Portal & Policies
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/admin" className="text-brandGold hover:underline font-semibold flex items-center gap-1">
                  <span>Admin Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-primary transition">My Account</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition">FAQ & Stadium Guide</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">Contact Club</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-primary transition">Refund Policy</Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-primary transition">Shipping Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Demonstration Notice Box */}
        <div className="mt-12 p-4 rounded-xl bg-zinc-900/90 border border-primary/30 text-xs text-zinc-300 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-primary shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              CRITICAL DEMONSTRATION NOTICE — STRICTLY NON-TRANSACTIONAL
            </span>
            <p className="text-zinc-400 leading-relaxed">
              This digital application is an interactive showcase and demonstration platform built for Churchill Brothers FC Goa. There are no actual monetary transactions, banking integrations, or physical ticket dispatches. All QR tickets and merchandise orders are simulated and not valid for real stadium admission.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 1988–2026 Churchill Brothers FC Goa. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built on History. Driven by Passion.</span>
            <span>•</span>
            <span className="text-brandGold font-display font-bold">THE RED MACHINES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
