import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import { dataService } from '@/lib/data/service';
import { Bell, Calendar, Download, AlertCircle, FileText, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Notice Board & Official Circulars | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Official school notices, circulars, examination routines, and holiday schedules from the administration of Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/notice-board',
  },
};

interface Props {
  searchParams: {
    page?: string;
    cat?: string;
  };
}

export default async function NoticeBoardPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const currentCategory = searchParams.cat || 'All';
  const pageSize = 10;

  const result = await dataService.getNotices(currentPage, pageSize, currentCategory);
  const notices = result.data;

  const categories = [
    'All',
    'Admissions',
    'Examinations',
    'General',
    'Sports',
    'Cultural',
    'Holidays',
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Notice Board' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Administrative Communications
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Notice Board & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Official announcements, examination schedules, fee notices, and holiday declarations.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
            Category:
          </span>
          {categories.map(cat => {
            const isSelected = currentCategory === cat;
            const href = cat === 'All' ? '/notice-board' : `/notice-board?cat=${encodeURIComponent(cat)}`;
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

        {/* Notices Organized List */}
        {notices.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium text-sm">
              No notices published in this category.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map(notice => (
              <div
                key={notice.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  notice.is_important
                    ? 'bg-amber-50/60 border-amber-200 shadow-sm'
                    : 'bg-white border-gray-200 hover:border-school-gold-400 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 font-bold ${
                      notice.is_important
                        ? 'bg-amber-500 text-school-navy-950'
                        : 'bg-school-navy-50 text-school-navy-800 border border-school-navy-100'
                    }`}
                  >
                    <span className="text-[10px] uppercase">
                      {new Date(notice.notice_date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-sm font-black font-serif">
                      {new Date(notice.notice_date).getDate()}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700 uppercase tracking-wider">
                        {notice.category}
                      </span>
                      {notice.circular_number && (
                        <span className="text-xs text-gray-400 font-mono">
                          Ref: {notice.circular_number}
                        </span>
                      )}
                      {notice.is_important && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                          <AlertCircle className="w-3 h-3" /> Important
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-school-navy-950">
                      {notice.title}
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                  <Link
                    href={notice.file_url || '/downloads'}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-school-gold-400" />
                    <span>Download PDF</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Numbered Pagination */}
        <Pagination
          currentPage={result.page}
          totalPages={result.totalPages}
          totalRecords={result.total}
          pageSize={result.pageSize}
          itemName="notices"
        />
      </section>
    </div>
  );
}

