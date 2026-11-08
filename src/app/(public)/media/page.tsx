'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_MEDIA_GALLERY } from '@/lib/demo-data';
import { Image as ImageIcon, X, Maximize2, Calendar } from 'lucide-react';
import { MediaAsset } from '@/types';
import { StaggerContainer, StaggerItem, ScrollReveal } from '@/components/ui/ScrollReveal';

export default function MediaGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<MediaAsset | null>(null);

  const categories = ['All', 'Matchday', 'Training', 'Kit Launch', 'Club Heritage'];

  const filteredMedia = INITIAL_MEDIA_GALLERY.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <ScrollReveal className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-display font-bold uppercase tracking-widest text-brandGold">
          <ImageIcon className="w-3.5 h-3.5" />
          OFFICIAL PHOTOGRAPHY ARCHIVE
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
          MEDIA GALLERY
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl">
          Visual chronicles of matchday passion, training sessions, kit unveilings, and historic triumphs of Churchill Brothers FC Goa.
        </p>
      </ScrollReveal>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-darkSurface p-4 rounded-2xl border border-zinc-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-club'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <StaggerItem key={item.id}>
            <div
              onClick={() => setLightboxImage(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cardDark border border-zinc-800 hover:border-primary/60 hover:-translate-y-1 hover:shadow-2xl transition-all cursor-pointer shadow-card"
            >
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-black/60 text-white backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-brandGold block">
                    {item.category} • {item.date}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-white transition z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full space-y-4"
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <Image
                  src={lightboxImage.mediaUrl}
                  alt={lightboxImage.title}
                  fill
                  sizes="90vw"
                  priority
                  className="object-contain"
                />
              </div>

              <div className="bg-darkSurface p-4 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-display font-bold text-base text-white uppercase">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-zinc-400 mt-0.5">{lightboxImage.caption}</p>
                </div>
                <span className="text-brandGold font-mono font-bold shrink-0 ml-4">
                  {lightboxImage.date}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
