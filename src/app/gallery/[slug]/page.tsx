import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { dataService } from '@/lib/data/service';
import AlbumPhotoViewer from './AlbumPhotoViewer';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await dataService.getAlbumBySlug(params.slug);
  if (!album) {
    return { title: 'Album Not Found' };
  }
  return {
    title: `${album.title} | Jyothi Vidya Niketan Gallery`,
    description: album.description || `Browse photos from ${album.title} at Jyothi Vidya Niketan E.M. High School Koilakuntla.`,
    alternates: {
      canonical: `https://www.jyothividyaniketan.com/gallery/${album.slug}`,
    },
    openGraph: {
      title: `${album.title} | Jyothi Vidya Niketan Gallery`,
      description: album.description,
      images: [album.cover_image_url],
    },
  };
}

export default async function AlbumDetailPage({ params, searchParams }: Props) {
  const album = await dataService.getAlbumBySlug(params.slug);
  if (!album) {
    notFound();
  }

  const currentPage = Number(searchParams.page) || 1;

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Photo Gallery', href: '/gallery' },
          { label: album.title },
        ]}
      />

      {/* Album Header */}
      <section className="bg-school-navy-950 text-white py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-school-navy-300 hover:text-school-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Albums</span>
          </Link>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-gold-500 text-school-navy-950">
              {album.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-school-navy-200">
              <Calendar className="w-3.5 h-3.5 text-school-gold-400" />
              {album.event_date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight">
            {album.title}
          </h1>

          {album.description && (
            <p className="text-sm text-school-navy-200 max-w-3xl leading-relaxed">
              {album.description}
            </p>
          )}
        </div>
      </section>

      {/* Interactive Photo Viewer Component with Lightbox & Pagination */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <AlbumPhotoViewer
          album={album}
          currentPage={currentPage}
          pageSize={12}
        />
      </section>
    </div>
  );
}

