import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Middle School (Classes VI - VIII) | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Middle school curriculum designed to build conceptual depth, analytical thinking, and laboratory sciences at Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics/middle-school',
  },
};

export default function MiddleSchoolPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Academics', href: '/academics' },
          { label: 'Middle School (VI - VIII)' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Conceptual Rigor
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Middle School: Classes VI to VIII
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Fostering critical thinking, laboratory inquiry, and communicative poise.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
              Expanding Intellectual Horizons
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Middle school represents a transformative period where young adolescents begin connecting classroom concepts with real-world phenomena. We introduce specialized subject teachers for Physics, Chemistry, Biology, History, Civics, Geography, and Computer Science.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Hands-on experiments in our composite science laboratories</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Computer applications, coding basics, and digital ethics</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Inter-house debates, elocution, quiz leagues, and science fairs</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Continuous Formative Assessments (FA-1 to FA-4) with detailed diagnostic feedback</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800"
              alt="Middle school students performing experiments"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-school-navy-950">
              Join Our Middle School (Classes VI to VIII)
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Experienced mentors ready to guide your child’s academic growth.
            </p>
          </div>
          <Link
            href="/admissions/enquiry"
            className="shrink-0 px-6 py-3 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Apply for Middle School
          </Link>
        </div>
      </section>
    </div>
  );
}

