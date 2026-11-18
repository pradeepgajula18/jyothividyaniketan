import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import { dataService } from '@/lib/data/service';
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News & Events | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Stay updated with campus activities, celebrations, sports meets, and upcoming events at Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/news-events',
  },
};

interface Props {
  searchParams: {
    page?: string;
    cat?: string;
  };
}

export default async function NewsEventsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const currentCategory = searchParams.cat || 'All';
  const pageSize = 6;

  const result = await dataService.getEvents(currentPage, pageSize, currentCategory);
  const events = result.data;
  const featuredEvent = events.find(e => e.is_featured) || events[0];

  const categories = [
    'All',
    'Celebration',
    'Sports',
    'Academic',
    'Meeting',
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'News & Events' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Campus Happenings
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            News & Events
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Upcoming schedules, celebrations, sports tournaments, and milestone achievements.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        {/* Featured Event Banner (if on page 1) */}
        {currentPage === 1 && featuredEvent && (
          <div className="rounded-3xl overflow-hidden bg-slate-50 border border-gray-200 shadow-lg grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-64 lg:h-auto min-h-[300px]">
              <img
                src={featuredEvent.image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200'}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-gold-500 text-school-navy-950 shadow-md">
                  Featured Event
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-semibold text-school-navy-800">
                    <Calendar className="w-3.5 h-3.5 text-school-gold-600" />
                    {featuredEvent.event_date}
                  </span>
                  <span>•</span>
                  <span>{featuredEvent.category}</span>
                </div>
                <h2 className="font-serif font-bold text-2xl text-school-navy-950 leading-tight">
                  {featuredEvent.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {featuredEvent.description}
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-gray-500 border-t border-gray-200">
                  {featuredEvent.start_time && (
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-school-gold-600" />
                      <span>{featuredEvent.start_time} - {featuredEvent.end_time || 'Conclusion'}</span>
                    </p>
                  )}
                  {featuredEvent.venue && (
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-school-gold-600" />
                      <span>{featuredEvent.venue}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Link
                  href={`/news-events/${featuredEvent.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4 text-school-gold-400" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
            Filter:
          </span>
          {categories.map(cat => {
            const isSelected = currentCategory === cat;
            const href = cat === 'All' ? '/news-events' : `/news-events?cat=${encodeURIComponent(cat)}`;
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

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(ev => (
            <div
              key={ev.id}
              className="rounded-3xl overflow-hidden bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={ev.image_url || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800'}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-school-navy-950/90 text-school-gold-400 backdrop-blur-sm border border-school-gold-400/30">
                      {ev.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.event_date}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-school-navy-950 leading-snug group-hover:text-school-navy-800 transition-colors line-clamp-2">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between">
                <Link
                  href={`/news-events/${ev.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {ev.venue && (
                  <span className="text-[11px] text-gray-400 truncate max-w-[150px]">
                    {ev.venue}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Numbered Pagination */}
        <Pagination
          currentPage={result.page}
          totalPages={result.totalPages}
          totalRecords={result.total}
          pageSize={result.pageSize}
          itemName="events"
        />
      </section>
    </div>
  );
}

