'use client';

import React, { useState } from 'react';
import { GalleryAlbum, GalleryImage } from '@/types';
import Pagination from '@/components/common/Pagination';
import ImageLightbox from '@/components/common/ImageLightbox';
import { Maximize2, Image as ImageIcon } from 'lucide-react';

interface Props {
  album: GalleryAlbum;
  currentPage: number;
  pageSize: number;
}

export default function AlbumPhotoViewer({ album, currentPage, pageSize }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // If album has no sub-images, fallback to cover image
  const allImages: GalleryImage[] =
    album.images && album.images.length > 0
      ? album.images
      : [
          {
            id: 'cover',
            album_id: album.id || 'cover',
            image_url: album.cover_image_url,
            caption: album.title,
            alt_text: album.title,
            sort_order: 1,
          },
        ];

  const totalPhotos = allImages.length;
  const totalPages = Math.ceil(totalPhotos / pageSize) || 1;
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedImages = allImages.slice(startIdx, startIdx + pageSize);

  const handleOpenLightbox = (indexInPaginated: number) => {
    setLightboxIndex(startIdx + indexInPaginated);
    setLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    setLightboxIndex(prev => (prev + 1) % allImages.length);
  };

  const handlePrevPhoto = () => {
    setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="space-y-8">
      {/* Top Count Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-school-navy-950">
          <ImageIcon className="w-4 h-4 text-school-gold-600" />
          <span>Total Photos: {totalPhotos}</span>
        </div>
        <p className="text-xs text-gray-500">
          Click any photograph to view in fullscreen lightbox
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedImages.map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => handleOpenLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-school-gold-400 aspect-[4/3]"
          >
            <img
              src={img.image_url}
              alt={img.alt_text || img.caption || `${album.title} photo`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-school-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-school-gold-400">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
            {/* Caption bar */}
            {img.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs truncate">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Numbered Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalPhotos}
        pageSize={pageSize}
        itemName="photos"
      />

      {/* Lightbox Modal */}
      <ImageLightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
}

