import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { dataService } from '@/lib/data/service';
import { Download, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Downloads & Application Forms | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Download admission application forms, academic calendar, school prospectus, CBSE curriculum guides, and code of conduct for Jyothi Vidya Niketan in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/downloads',
  },
};

export default async function DownloadsPage() {
  const downloads = await dataService.getDownloads();

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Downloads' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Document Repository
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Downloads & Resources
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Official admission forms, academic syllabi, holiday calendars, and school guidelines.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {downloads.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-50 border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-navy-900 text-school-gold-400">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-gray-500 font-semibold">{item.file_size}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-school-navy-950 leading-snug">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6 flex items-center justify-between">
                <a
                  href={item.file_url}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-bold shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-school-gold-400" />
                  <span>Download Document</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

