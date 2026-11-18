import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { dataService } from '@/lib/data/service';
import FaqAccordion from './FaqAccordion';
import { MessageCircle, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Frequently asked questions regarding CBSE affiliation, admission procedure, school timings, transport, and curriculum at Jyothi Vidya Niketan in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/faq',
  },
};

export default async function FAQPage() {
  const faqs = await dataService.getFAQs();

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Help & Guidance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Clear answers to common questions about admissions, academics, and campus life.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
        <FaqAccordion items={faqs} />

        {/* Still Have Questions Banner */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-gray-200 text-center space-y-4">
          <h3 className="text-xl font-serif font-bold text-school-navy-950">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
            Our admissions office is happy to assist you with any specific queries regarding fee schedules, transport coverage, or documentation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white font-bold text-xs shadow-md transition-all"
            >
              Contact School Office
            </Link>
            <a
              href="https://wa.me/917997999863?text=Hello%20Jyothi%20Vidya%20Niketan!%20I%20have%20a%20question%20regarding%20the%20school."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

