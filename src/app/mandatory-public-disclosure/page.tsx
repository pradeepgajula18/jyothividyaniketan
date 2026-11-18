import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { dataService } from '@/lib/data/service';
import { ShieldCheck, FileText, Download, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CBSE Mandatory Public Disclosure | Jyothi Vidya Niketan (Affiliation 130603)',
  description:
    'Official CBSE Mandatory Public Disclosure document repository as per CBSE circulars for Jyothi Vidya Niketan E.M. High School Koilakuntla, Andhra Pradesh.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/mandatory-public-disclosure',
  },
};

export default async function MandatoryPublicDisclosurePage() {
  const documents = await dataService.getDisclosureDocuments();

  // Group by category
  const categories = [
    'A: GENERAL INFORMATION',
    'B: DOCUMENTS AND INFORMATION',
    'C: RESULT AND ACADEMICS',
    'D: STAFF (TEACHING)',
    'E: SCHOOL INFRASTRUCTURE',
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Mandatory Public Disclosure' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-school-gold-500/20 text-school-gold-300 border border-school-gold-400/40 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-school-gold-400" />
            <span>CBSE Affiliation No: 130603</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Mandatory Public Disclosure
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Published in accordance with CBSE Circular No. 03/2021 and Appendix IX statutory guidelines.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-14">
        {/* Compliance Header Note */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 flex items-start gap-4">
          <Info className="w-6 h-6 text-school-navy-800 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-gray-700">
            <h2 className="font-bold text-base text-school-navy-950">
              Statutory Transparency & Verification
            </h2>
            <p>
              Jyothi Vidya Niketan E.M. High School is run by the Sarabha Reddy Educational Society and affiliated to the Central Board of Secondary Education (CBSE), New Delhi. Below is the verified repository of all statutory affiliation documents, safety certificates, academic calendars, fee charts, and infrastructure metrics.
            </p>
          </div>
        </div>

        {/* Categories Sections */}
        <div className="space-y-10">
          {categories.map((cat, idx) => {
            const catDocs = documents.filter(d => d.category.trim() === cat.trim());

            return (
              <div key={idx} className="rounded-3xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                <div className="bg-school-navy-900 text-white px-6 py-4 flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base sm:text-lg tracking-wide text-school-gold-400">
                    {cat}
                  </h3>
                  <span className="text-xs text-school-navy-200 font-mono">
                    {catDocs.length} Records
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {catDocs.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-500 italic">
                      No documents cataloged in this category.
                    </div>
                  ) : (
                    catDocs.map((doc, docIdx) => (
                      <div
                        key={doc.id || docIdx}
                        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-school-navy-50 text-school-navy-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {docIdx + 1}
                          </span>
                          <div>
                            <h4 className="font-semibold text-sm text-school-navy-950">
                              {doc.document_title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Status: <span className="text-emerald-700 font-semibold">Verified & Current</span> • Updated: {doc.last_updated}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-3 self-end sm:self-center">
                          {doc.document_url && doc.document_url !== '#' && !doc.document_url.startsWith('#') ? (
                            <a
                              href={doc.document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-semibold shadow-sm transition-all"
                            >
                              <Download className="w-3.5 h-3.5 text-school-gold-400" />
                              <span>View / Download</span>
                            </a>
                          ) : (
                            <span className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{doc.file_size || 'Official Info'}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

