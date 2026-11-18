import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Primary School (Classes I - V) | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Primary school education focusing on literacy, numeracy, scientific inquiry, and creative arts at Jyothi Vidya Niketan E.M. High School in Koilakuntla (CBSE Affiliation 130603).',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics/primary-school',
  },
};

export default function PrimarySchoolPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Academics', href: '/academics' },
          { label: 'Primary School (I - V)' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Foundational Learning
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Primary School: Classes I to V
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Fostering foundational literacy, mathematical reasoning, and joyful inquiry.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
              Cultivating Strong Foundational Roots
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Classes I to V mark a critical transitional stage where children advance from observational play to systematic inquiry. Following the CBSE curriculum, our primary education pedagogy emphasizes conceptual clarity in English, Mathematics, and Environmental Science (EVS).
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Bilingual fluency with strong English communicative emphasis</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Hands-on arithmetic with concrete math lab manipulatives</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Environmental studies connecting students to nature and community</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Weekly dedicated slots for arts, crafts, music, and yoga</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
              alt="Primary school students in classroom"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-school-navy-950">
              Admissions Open for Classes I through V
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Transfer Certificate (TC) and previous school report card required.
            </p>
          </div>
          <Link
            href="/admissions/enquiry"
            className="shrink-0 px-6 py-3 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Submit Enquiry
          </Link>
        </div>
      </section>
    </div>
  );
}

