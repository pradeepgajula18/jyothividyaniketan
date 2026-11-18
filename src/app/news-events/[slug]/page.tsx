import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { dataService } from '@/lib/data/service';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Tag } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventsResult = await dataService.getEvents(1, 100);
  const event = eventsResult.data.find(e => e.slug === params.slug);
  if (!event) {
    return { title: 'Event Not Found' };
  }
  return {
    title: `${event.title} | Jyothi Vidya Niketan Events`,
    description: event.description || `Event details for ${event.title} at Jyothi Vidya Niketan E.M. High School Koilakuntla.`,
    alternates: {
      canonical: `https://www.jyothividyaniketan.com/news-events/${event.slug}`,
    },
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.image_url || 'https://www.jyothividyaniketan.com/images/logo.png'],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const eventsResult = await dataService.getEvents(1, 100);
  const event = eventsResult.data.find(e => e.slug === params.slug);
  if (!event) {
    notFound();
  }

  // Schema.org Event JSON-LD
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.event_date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.venue || 'Jyothi Vidya Niketan Campus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Survey No: 872/2 & 872/3, Jammalamadugu Road',
        addressLocality: 'Koilakuntla',
        addressRegion: 'Andhra Pradesh',
        postalCode: '518134',
        addressCountry: 'IN',
      },
    },
    image: [event.image_url],
    description: event.description,
    organizer: {
      '@type': 'Organization',
      name: 'Jyothi Vidya Niketan E.M. High School',
      url: 'https://www.jyothividyaniketan.com/',
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Breadcrumbs
        items={[
          { label: 'News & Events', href: '/news-events' },
          { label: event.title },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/news-events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-school-navy-300 hover:text-school-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All News & Events</span>
          </Link>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-gold-500 text-school-navy-950">
              {event.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-school-navy-200">
              <Calendar className="w-3.5 h-3.5 text-school-gold-400" />
              {event.event_date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight">
            {event.title}
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
        {event.image_url && (
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 max-h-[460px]">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Event Key Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-50 border border-gray-200 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-gray-400 uppercase">Event Date</span>
            <p className="font-bold text-school-navy-950 text-sm flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-school-gold-600" />
              {event.event_date}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-gray-400 uppercase">Timings</span>
            <p className="font-bold text-school-navy-950 text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-school-gold-600" />
              {event.start_time || '09:00 AM onwards'}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-gray-400 uppercase">Venue</span>
            <p className="font-bold text-school-navy-950 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-school-gold-600" />
              {event.venue || 'School Campus Ground'}
            </p>
          </div>
        </div>

        {/* Event Description */}
        <div className="prose max-w-none text-gray-700 leading-relaxed text-sm sm:text-base space-y-4">
          <p>{event.description}</p>
        </div>

        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <Link
            href="/news-events"
            className="inline-flex items-center gap-2 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to News & Events</span>
          </Link>
          <Link
            href="/contact-us"
            className="text-xs font-semibold text-gray-500 hover:text-school-navy-800"
          >
            Have questions about this event? Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}

