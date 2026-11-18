'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BulletinItem } from '@/types';
import {
  Bell,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Trophy,
  GraduationCap,
  Calendar,
  Sparkles,
  Megaphone
} from 'lucide-react';

interface Props {
  text?: string;
  bulletinItems?: BulletinItem[];
  enabled: boolean;
}

export default function AnnouncementTicker({ text, bulletinItems, enabled }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Default items if bulletinItems is not provided
  const items: BulletinItem[] =
    bulletinItems && bulletinItems.length > 0
      ? bulletinItems
      : [
          {
            id: 'default-1',
            category: 'VICTORY',
            title: '🏆 District U-14 Athletics Championship: 1st Place Gold Medal Victory!',
            link: '/achievements',
            is_urgent: true,
          },
          {
            id: 'default-2',
            category: 'EXAM',
            title: '📝 CBSE Class X Annual Board Examination begins February 20, 2026.',
            link: '/academics/examinations',
            is_urgent: true,
          },
          {
            id: 'default-3',
            category: 'ADMISSION',
            title: text || '📢 Admissions Open for Academic Year 2025–26 (Nursery to Class X) – Apply Online.',
            link: '/admissions/enquiry',
            is_urgent: false,
          },
          {
            id: 'default-4',
            category: 'EVENT',
            title: '🔬 Pratibha Science & Arts Fair 2026 scheduled on March 05 in Main Auditorium.',
            link: '/news-events',
            is_urgent: false,
          },
        ];

  // Auto-rotate every 4.5 seconds unless paused on hover
  useEffect(() => {
    if (!enabled || items.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [enabled, items.length, isPaused]);

  if (!enabled || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'VICTORY':
        return {
          bg: 'bg-amber-400 text-school-navy-950 font-black',
          icon: Trophy,
          label: 'VICTORY',
        };
      case 'EXAM':
        return {
          bg: 'bg-purple-500 text-white font-bold',
          icon: GraduationCap,
          label: 'BOARD EXAM',
        };
      case 'ADMISSION':
        return {
          bg: 'bg-emerald-500 text-white font-bold',
          icon: Sparkles,
          label: 'ADMISSIONS',
        };
      case 'EVENT':
        return {
          bg: 'bg-blue-500 text-white font-bold',
          icon: Calendar,
          label: 'CAMPUS EVENT',
        };
      case 'HOLIDAY':
        return {
          bg: 'bg-rose-500 text-white font-bold',
          icon: Calendar,
          label: 'HOLIDAY',
        };
      default:
        return {
          bg: 'bg-school-gold-500 text-school-navy-950 font-bold',
          icon: Megaphone,
          label: 'CIRCULAR',
        };
    }
  };

  const style = getCategoryStyles(currentItem.category);
  const Icon = style.icon;

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  return (
    <div
      role="region"
      aria-label="News Bulletin & Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-school-navy-950 text-white border-b border-school-navy-800 text-xs py-2 px-3 sm:px-4 relative z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Section Header Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-school-navy-800 text-school-gold-400 border border-school-gold-500/30">
            <Bell className="w-3 h-3 text-school-gold-400 animate-pulse" />
            <span className="hidden xs:inline">News Bulletin</span>
          </span>
          <span className="text-school-navy-700 hidden sm:inline">|</span>
        </div>

        {/* Center: Active Rotating Bulletin Card */}
        <div className="flex-1 flex items-center gap-2 min-w-0 overflow-hidden">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0 shadow-sm transition-all ${style.bg}`}
          >
            <Icon className="w-3 h-3 shrink-0" />
            <span className="truncate">{style.label}</span>
          </span>

          <div className="truncate flex-1">
            {currentItem.link ? (
              <Link
                href={currentItem.link}
                className="font-medium text-school-navy-100 hover:text-white hover:underline transition-colors truncate block"
              >
                {currentItem.title}
              </Link>
            ) : (
              <span className="font-medium text-school-navy-100 truncate block">
                {currentItem.title}
              </span>
            )}
          </div>
        </div>

        {/* Right: Next / Prev Controls & Action Link */}
        <div className="flex items-center gap-2 shrink-0">
          {currentItem.link && (
            <Link
              href={currentItem.link}
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-school-gold-400 hover:text-school-gold-300 hover:underline transition-colors mr-2"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}

          {/* Ticker Navigator */}
          <div className="flex items-center gap-1 bg-school-navy-900/80 rounded-lg p-0.5 border border-school-navy-800">
            <button
              onClick={handlePrev}
              aria-label="Previous announcement"
              className="p-1 rounded hover:bg-school-navy-800 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-mono text-gray-400 px-1 select-none">
              {currentIndex + 1}/{items.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next announcement"
              className="p-1 rounded hover:bg-school-navy-800 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
