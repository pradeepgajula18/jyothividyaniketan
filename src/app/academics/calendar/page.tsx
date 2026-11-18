import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Calendar, Download, Tag, ArrowRight } from 'lucide-react';
import { dataService } from '@/lib/data/service';

export const metadata: Metadata = {
  title: 'Academic Calendar 2025-26 | Jyothi Vidya Niketan Koilakuntla',
  description:
    'View the official annual academic calendar, holiday list, term schedules, and event dates for Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics/calendar',
  },
};

export default async function AcademicCalendarPage() {
  const events = await dataService.getAcademicCalendars();

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Exam':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Holiday':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Celebration':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Term':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Academics', href: '/academics' },
          { label: 'Academic Calendar' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Yearly Schedule
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Academic Calendar 2025–2026
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Terms, examination windows, major celebrations, and official holidays.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-50 border border-gray-200">
          <div>
            <h2 className="font-serif font-bold text-lg text-school-navy-950">
              Download Annual Academic Planner
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Includes complete day-by-day activity calendar and gazetted holidays.
            </p>
          </div>
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-bold transition-all shadow-md"
          >
            <Download className="w-4 h-4 text-school-gold-400" />
            <span>Download Calendar PDF</span>
          </Link>
        </div>

        {/* Timeline / Table of Events */}
        <div className="space-y-4">
          {events.map(ev => (
            <div
              key={ev.id}
              className="p-5 rounded-2xl border border-gray-200 hover:border-school-gold-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-school-navy-50 text-school-navy-800 flex flex-col items-center justify-center shrink-0 border border-school-navy-100">
                  <span className="text-[10px] font-bold uppercase text-school-gold-600">
                    {new Date(ev.event_date).toLocaleString('default', { month: 'short' })}
                  </span>
                  <span className="text-sm font-black font-serif">
                    {new Date(ev.event_date).getDate()}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-school-navy-950 text-base">{ev.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getBadgeColor(
                        ev.event_type
                      )}`}
                    >
                      {ev.event_type}
                    </span>
                  </div>
                  {ev.description && (
                    <p className="text-xs text-gray-600">{ev.description}</p>
                  )}
                </div>
              </div>

              {ev.end_date && (
                <div className="text-xs text-gray-500 font-medium shrink-0 sm:text-right">
                  Until: {ev.end_date}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

