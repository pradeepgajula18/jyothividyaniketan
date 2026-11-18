'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Trophy, Sparkles, ArrowRight, Share2, Award, Calendar } from 'lucide-react';

interface Props {
  enabled: boolean;
  title: string;
  message: string;
  link?: string;
  imageUrl?: string;
  badge?: string;
  ctaText?: string;
}

export default function AnnouncementPopup({
  enabled,
  title,
  message,
  link = '/achievements',
  imageUrl,
  badge = 'SPORTS CHAMPIONSHIP VICTORY 2026',
  ctaText = 'View Victory Details & Photos',
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const dismissed = sessionStorage.getItem('jvn_victory_popup_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [enabled]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('jvn_victory_popup_dismissed', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-school-gold-400 animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Close Button Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-school-gold-400 transition-all shadow-md"
          aria-label="Close Victory Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Victory Image Banner (if image provided) */}
        {imageUrl ? (
          <div className="relative h-56 sm:h-64 bg-school-navy-950 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-school-navy-950 via-school-navy-950/30 to-transparent" />

            {/* Floating Golden Victory Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-school-gold-500 text-school-navy-950 shadow-lg border border-school-gold-300 animate-pulse">
                <Trophy className="w-4 h-4 fill-school-navy-950" />
                <span>{badge}</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <p className="text-[11px] font-bold tracking-widest text-school-gold-400 uppercase">
                Jyothi Vidya Niketan Proud Moment
              </p>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-white leading-tight drop-shadow-md">
                {title}
              </h2>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-school-navy-950 to-school-navy-900 text-white p-6 space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-school-gold-500 text-school-navy-950">
              <Trophy className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </span>
            <h2 className="text-xl font-bold font-serif leading-tight">{title}</h2>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-4 text-gray-700 text-xs sm:text-sm leading-relaxed">
          <p>{message}</p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 sm:py-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            Dismiss
          </button>
          {link && (
            <Link
              href={link}
              onClick={handleClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 text-xs font-bold shadow-lg shadow-school-gold-500/20 hover:shadow-xl transition-all"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
