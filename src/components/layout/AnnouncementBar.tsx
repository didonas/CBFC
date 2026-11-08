'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { ChevronRight, Megaphone } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { siteSettings } = useApp();

  if (!siteSettings.isAnnouncementActive) return null;

  return (
    <div className="bg-deepRed text-white py-1.5 px-4 text-xs font-medium tracking-wide">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-center text-center gap-2">
        <span className="hidden sm:inline-flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider text-brandGold">
          <Megaphone className="w-3 h-3" />
          Update
        </span>
        <p className="truncate">
          {siteSettings.announcementText}
        </p>
        {siteSettings.announcementLinkUrl && (
          <Link
            href={siteSettings.announcementLinkUrl}
            className="inline-flex items-center gap-0.5 underline font-bold hover:text-brandGold transition shrink-0 ml-1"
          >
            {siteSettings.announcementLinkText || 'Learn More'}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
};
