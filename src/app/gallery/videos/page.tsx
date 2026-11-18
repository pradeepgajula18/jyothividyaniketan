import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { defaultVideos } from '@/lib/data/default-data';
import { Video, Image as ImageIcon, Play, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Gallery | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Watch event videos, Annual Day performances, and sports highlights from Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/gallery/videos',
  },
};

export default function VideoGalleryPage() {
  const videos = defaultVideos;

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Gallery', href: '/gallery' },
          { label: 'Video Highlights' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Video Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            School Video Gallery
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Watch highlights of cultural functions, athletic competitions, and campus tours.
          </p>
          <div className="pt-2">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-school-gold-400 hover:text-white transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Switch to Photo Albums</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(vid => (
            <div
              key={vid.id}
              className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-black overflow-hidden">
                  <iframe
                    src={vid.video_url}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-school-gold-600 bg-school-gold-50 px-2.5 py-0.5 rounded-full border border-school-gold-200">
                    {vid.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-school-navy-950 leading-snug pt-1">
                    {vid.title}
                  </h3>
                  {vid.description && (
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {vid.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

