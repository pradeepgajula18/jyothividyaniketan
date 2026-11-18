import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import ScrollReveal from '@/components/common/ScrollReveal';
import { dataService } from '@/lib/data/service';
import { Calendar, Image as ImageIcon, ChevronRight, Video } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Photo Gallery | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Browse photo albums of Annual Day, Sports Day, Science Fair, Independence Day, and classroom activities at Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/gallery',
  },
};

interface Props {
  searchParams: {
    page?: string;
    cat?: string;
  };
}

export default async function GalleryPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const currentCategory = searchParams.cat || 'All';
  const pageSize = 6;

  const result = await dataService.getAlbums(currentPage, pageSize, currentCategory);
  const albums = result.data;

  const categories = [
    'All',
    'Annual Day',
    'Sports Day',
    'Independence Day',
    'Republic Day',
    'Cultural Activities',
    'Classroom Activities',
    'School Celebrations',
    'Educational Trips',
    'Competitions',
    'Campus and Infrastructure',
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Photo Gallery' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            School Media Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Capturing celebrations, learning milestones, and joyous memories across campus.
          </p>
          <div className="pt-2">
            <Link
              href="/gallery/videos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-school-gold-300 text-xs font-semibold border border-white/20 transition-colors"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Switch to Video Gallery</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
            Category:
          </span>
          {categories.map(cat => {
            const isSelected = currentCategory === cat;
            const href = cat === 'All' ? '/gallery' : `/gallery?cat=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-school-navy-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Album Cards Grid */}
        {albums.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium text-sm">
              No albums found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <ScrollReveal key={album.id} animation="fade-up" delay={index * 80}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden bg-gray-100">
                      <img
                        src={album.cover_image_url}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-navy-950/90 text-school-gold-400 backdrop-blur-sm border border-school-gold-400/30">
                          {album.category}
                        </span>
                      </div>
                      {album.photo_count !== undefined && album.photo_count > 0 && (
                        <div className="absolute bottom-3 right-3">
                          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/70 text-white flex items-center gap-1.5 backdrop-blur-sm">
                            <ImageIcon className="w-3.5 h-3.5 text-school-gold-400" />
                            {album.photo_count} Photos
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-2">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{album.event_date}</span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-school-navy-950 group-hover:text-school-navy-800 transition-colors leading-snug line-clamp-1">
                        {album.title}
                      </h3>

                      {album.description && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {album.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-school-navy-800 group-hover:text-school-gold-700">
                    <span>Open Album</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Numbered Pagination */}
        <Pagination
          currentPage={result.page}
          totalPages={result.totalPages}
          totalRecords={result.total}
          pageSize={result.pageSize}
          itemName="albums"
        />
      </section>
    </div>
  );
}

