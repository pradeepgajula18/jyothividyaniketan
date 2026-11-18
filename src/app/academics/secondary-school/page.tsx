import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Secondary School (Classes IX - X) | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Rigorous CBSE Class 9 and 10 board preparation with mentorship, mock examinations, and career guidance at Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics/secondary-school',
  },
};

export default function SecondarySchoolPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Academics', href: '/academics' },
          { label: 'Secondary School (IX - X)' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            CBSE Board Preparation
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Secondary School: Classes IX & X
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Academic distinction and board exam success with CBSE Affiliation 130603.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
              Board Excellence with Personalized Mentorship
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Classes IX and X represent the culmination of secondary schooling. At Jyothi Vidya Niketan, we take immense pride in our track record of 100% CBSE Board pass percentages, with outstanding top scores in Mathematics, Science, and Social Science.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Thorough coverage of NCERT curriculum supplemented with exemplar problems</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Multiple rounds of Pre-Board mock examinations strictly adhering to CBSE marking schemes</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Supervised afternoon study clinics and personalized doubt clearance</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Career guidance, stress-management workshops, and mindfulness sessions</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800"
              alt="Secondary students in study session"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-school-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-widest text-school-gold-400">
              Class X Board Aspirants
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              Limited Seats Available for Secondary Admissions 2025-26
            </h3>
            <p className="text-xs text-school-navy-200">
              Admission granted based on previous academic credentials and diagnostic interaction.
            </p>
          </div>
          <Link
            href="/admissions/enquiry"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Apply for Class IX / X
          </Link>
        </div>
      </section>
    </div>
  );
}

