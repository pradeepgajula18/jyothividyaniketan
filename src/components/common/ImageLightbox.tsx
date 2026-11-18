'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryImage } from '@/types';

interface Props {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];
  if (!currentImg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Bar with Counter & Close */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-wider text-school-gold-400">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImg.caption && (
            <span className="hidden md:inline text-sm text-gray-300 border-l border-gray-700 pl-3">
              {currentImg.caption}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
        <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
          <img
            src={currentImg.image_url}
            alt={currentImg.alt_text || currentImg.caption || 'School gallery image'}
            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl transition-all select-none"
          />
        </div>
      </div>

      {/* Prev / Next Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-school-gold-400 transition-all border border-white/10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-school-gold-400 transition-all border border-white/10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Caption bottom bar on mobile */}
      {currentImg.caption && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-center text-sm text-gray-200">
          {currentImg.caption}
        </div>
      )}
    </div>
  );
}

