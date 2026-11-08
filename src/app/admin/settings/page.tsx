'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Settings, Save, CheckCircle, RotateCcw, Megaphone, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const { siteSettings, updateSiteSettings, resetAllDemoData } = useApp();

  const [announcementText, setAnnouncementText] = useState(siteSettings.announcementText);
  const [announcementLinkText, setAnnouncementLinkText] = useState(siteSettings.announcementLinkText);
  const [announcementLinkUrl, setAnnouncementLinkUrl] = useState(siteSettings.announcementLinkUrl);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(siteSettings.isAnnouncementActive);
  const [activeSeason, setActiveSeason] = useState(siteSettings.activeSeason);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      announcementText,
      announcementLinkText,
      announcementLinkUrl,
      isAnnouncementActive,
      activeSeason,
    });
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-offWhite text-charcoal">
      <AdminHeader
        title="Global Platform Settings"
        subtitle="Configure the top announcement banner, current football season and demo platform controls."
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-4xl">
        {/* Announcement Bar Form */}
        <form
          onSubmit={handleSave}
          className="bg-white border border-lightBorder shadow-card p-6 sm:p-8 space-y-6 text-xs"
        >
          <div className="flex items-center gap-2 border-b border-lightBorder pb-3">
            <Megaphone className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-charcoal uppercase tracking-wider">
              Announcement Bar Configuration
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-charcoal font-semibold mb-1">
                Announcement Message Text *
              </label>
              <input
                type="text"
                required
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-charcoal font-semibold mb-1">
                  Call to Action Link Text
                </label>
                <input
                  type="text"
                  value={announcementLinkText}
                  onChange={(e) => setAnnouncementLinkText(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary"
                  placeholder="e.g. Reserve Demo Tickets"
                />
              </div>

              <div>
                <label className="block text-charcoal font-semibold mb-1">
                  Target URL
                </label>
                <input
                  type="text"
                  value={announcementLinkUrl}
                  onChange={(e) => setAnnouncementLinkUrl(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary font-mono text-[11px]"
                  placeholder="/tickets/m-101"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-charcoal font-semibold mb-1">
                  Active Competition Season
                </label>
                <input
                  type="text"
                  value={activeSeason}
                  onChange={(e) => setActiveSeason(e.target.value)}
                  className="w-full bg-offWhite border border-lightBorder rounded px-4 py-2.5 text-charcoal focus:outline-none focus:border-primary"
                  placeholder="2026/27"
                />
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer text-charcoal font-semibold">
                  <input
                    type="checkbox"
                    checked={isAnnouncementActive}
                    onChange={(e) => setIsAnnouncementActive(e.target.checked)}
                    className="accent-primary w-4 h-4"
                  />
                  <span>Display Top Announcement Ticker</span>
                </label>
              </div>
            </div>
          </div>

          {savedFeedback && (
            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Platform settings updated successfully! Changes reflected across the website.</span>
            </div>
          )}

          <div className="pt-4 border-t border-lightBorder flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded bg-primary hover:bg-deepRed text-white font-display font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>SAVE CONFIGURATION</span>
            </button>
          </div>
        </form>

        {/* Reset System Data Section */}
        <div className="bg-white border border-lightBorder shadow-card p-6 sm:p-8 space-y-4 text-xs">
          <div className="flex items-center gap-2 text-primary">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h2 className="font-display font-bold text-lg text-charcoal uppercase">
              Demonstration Environment Reset
            </h2>
          </div>
          <p className="text-mutedGrey leading-relaxed">
            Reset all demo transactions, simulated bookings, orders, and custom-added players back to initial official club seed defaults.
          </p>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all demo state to fresh default seed data?')) {
                resetAllDemoData();
                alert('Demo state restored to official club seed defaults.');
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-display font-bold text-xs uppercase tracking-wider transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET ALL DEMO DATA TO FACTORY SEED</span>
          </button>
        </div>
      </div>
    </div>
  );
}
