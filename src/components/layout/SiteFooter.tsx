'use client';

import React from 'react';
import Link from 'next/link';
import { ClubCrest } from '@/components/ui/ClubCrest';
import { CLUB_INFO } from '@/lib/demo-data';
import { ShieldAlert, Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#181818] border-t border-[#2C2C2C] text-[#9A958E]">
      {/* Subtle Burgundy Accent Line */}
      <div className="h-[2px] bg-burgundy" />

      {/* Main Footer Content */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Club Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ClubCrest size={50} />
              <div>
                <h3 className="font-display font-extrabold text-xl text-[#F4F3EF] tracking-tight uppercase">
                  CHURCHILL BROTHERS FC
                </h3>
                <p className="text-[11px] font-sans font-bold text-burgundy tracking-widest uppercase">
                  THE RED MACHINES • ESTD 1988
                </p>
              </div>
            </div>

            <p className="text-xs text-[#9A958E] leading-relaxed max-w-md font-sans">
              Two-time national I-League Champions, three-time Durand Cup Winners, and pride of Goan football. Built on history, driven by passion, and dedicated to the supporters of South Goa and Indian football.
            </p>

            <div className="space-y-1.5 text-xs text-[#9A958E] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-burgundy shrink-0" />
                <span>{CLUB_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brandGold shrink-0" />
                <span>{CLUB_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DAD8D2] shrink-0" />
                <span>{CLUB_INFO.email}</span>
              </div>
            </div>

            {/* Social Link */}
            <div className="pt-2">
              <a
                href="https://instagram.com/churchillbrothersfcgoa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#222222] border border-[#333333] text-xs font-sans font-medium text-[#F4F3EF] hover:text-burgundy hover:border-burgundy transition"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@churchillbrothersfcgoa</span>
                <span className="text-[10px] text-[#77736D] font-mono px-1 py-0.2 rounded bg-[#181818]">105K</span>
              </a>
            </div>
          </div>

          {/* Col 3: Club Navigation */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-[#F4F3EF] mb-4">
              Club & Squad
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/club" className="hover:text-white transition">Club History & Origins</Link>
              </li>
              <li>
                <Link href="/club#timeline" className="hover:text-white transition">Historic Timeline</Link>
              </li>
              <li>
                <Link href="/club#honours" className="hover:text-white transition">Trophy Cabinet</Link>
              </li>
              <li>
                <Link href="/club#stadium" className="hover:text-white transition">Fatorda Stadium</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition">First-Team Squad</Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-white transition">Fixtures & Results</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Matchday & Commercial */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-[#F4F3EF] mb-4">
              Matchday & Megastore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/tickets" className="hover:text-white transition">Match Tickets (Demo)</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">Official 2026/27 Kits</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">Training Collection</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition">Supporter Scarf & Ball</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">Editorial Newsroom</Link>
              </li>
              <li>
                <Link href="/media" className="hover:text-white transition">Matchday Media</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Administration & Support */}
          <div>
            <h4 className="font-display font-bold text-xs tracking-wider uppercase text-[#F4F3EF] mb-4">
              Portal & Policies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/admin" className="text-brandGold hover:underline font-semibold flex items-center gap-1">
                  <span>Admin Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition">My Supporter Account</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">FAQ & Stadium Guide</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact Club</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Demonstration Notice Box */}
        <div className="mt-12 p-4 rounded-sm bg-[#1E1E1E] border border-[#333333] text-xs text-[#9A958E] flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-burgundy shrink-0" />
          <div className="space-y-0.5">
            <span className="font-sans font-bold text-[#F4F3EF] uppercase tracking-wider text-[11px]">
              CRITICAL DEMONSTRATION NOTICE — STRICTLY NON-TRANSACTIONAL
            </span>
            <p className="text-[#88837D] leading-relaxed text-[11px]">
              This digital application is an interactive showcase and demonstration platform built for Churchill Brothers FC Goa. There are no actual monetary transactions, banking integrations, or physical ticket dispatches. All QR tickets and merchandise orders are simulated and not valid for real stadium admission.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#2C2C2C] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#77736D] gap-4">
          <p>© 1988–2026 Churchill Brothers FC Goa. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>A Club. A City. A Legacy.</span>
            <span>•</span>
            <span className="text-[#F4F3EF] font-sans font-bold">THE RED MACHINES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
