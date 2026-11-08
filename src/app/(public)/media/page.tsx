'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_MEDIA_GALLERY } from '@/lib/demo-data';
import { Image as ImageIcon, X, Maximize2 } from 'lucide-react';
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
    <div className="space-y-10 py-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 bg-offWhite text-charcoal">
      {/* Header */}
      <ScrollReveal className="bg-white border border-lightBorder p-8 sm:p-10 shadow-card space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-offWhite border border-lightBorder text-xs font-display font-bold uppercase tracking-widest text-primary">
          <ImageIcon className="w-3.5 h-3.5" />
          OFFICIAL PHOTOGRAPHY ARCHIVE
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-charcoal uppercase tracking-tight leading-none">
          MEDIA GALLERY
        </h1>
        <p className="text-sm sm:text-base text-charcoal/70 max-w-2xl leading-relaxed">
          Visual chronicles of matchday passion, training sessions, kit unveilings, and historic triumphs of Churchill Brothers FC Goa.
        </p>
      </ScrollReveal>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-4 border border-lightBorder shadow-card">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-sm'
                : 'bg-offWhite text-charcoal hover:bg-zinc-100 border border-lightBorder'
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
              className="group relative aspect-[4/3] overflow-hidden bg-[#EAE8E2] border border-lightBorder hover:border-primary transition-all cursor-pointer shadow-card"
            >
              <Image
                src={item.mediaUrl}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 text-white backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-white/80 block">
                    {item.category} • {item.date}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white uppercase mt-0.5">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-white/90 mt-1 line-clamp-2">
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white border border-lightBorder overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={lightboxImage.mediaUrl}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-1">
                <span className="text-xs font-bold text-primary uppercase">
                  {lightboxImage.category} • {lightboxImage.date}
                </span>
                <h3 className="font-display font-black text-2xl text-charcoal uppercase">
                  {lightboxImage.title}
                </h3>
                {lightboxImage.caption && (
                  <p className="text-sm text-charcoal/80 leading-relaxed pt-1">
                    {lightboxImage.caption}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
