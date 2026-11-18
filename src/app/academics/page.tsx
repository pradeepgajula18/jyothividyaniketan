import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { BookOpen, GraduationCap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Programs | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Explore comprehensive CBSE academic programs from Pre-Primary to Secondary School (Classes I to X) at Jyothi Vidya Niketan in Koilakuntla, Andhra Pradesh.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics',
  },
};

export default function AcademicsPage() {
  const stages = [
    {
      title: 'Pre-Primary School',
      grades: 'Nursery, LKG, UKG (Ages 3 to 6)',
      href: '/academics/pre-primary',
      desc: 'Play-way, experiential learning focusing on sensory development, phonics, number sense, and joyful discovery in an affectionate environment.',
      features: ['Phonics & Language Immersion', 'Gross & Fine Motor Skill Toys', 'Storytelling & Puppet Theater', 'Activity-Based Numeracy'],
    },
    {
      title: 'Primary School',
      grades: 'Classes I to V (Ages 6 to 11)',
      href: '/academics/primary-school',
      desc: 'Building foundational mastery in reading, linguistic fluency, mathematical operations, environmental science, and creative arts.',
      features: ['Bilingual Reading Fluency', 'Foundational Mathematics Lab', 'Environmental Science Explorations', 'Art & Performing Arts'],
    },
    {
      title: 'Middle School',
      grades: 'Classes VI to VIII (Ages 11 to 14)',
      href: '/academics/middle-school',
      desc: 'Transition into specialized subjects: Physics, Chemistry, Biology, Social Sciences, Computer Coding, and analytical debate.',
      features: ['Composite Science Labs', 'Coding & Computer Applications', 'Inter-House Debates & Quizzes', 'Physical Education & Athletics'],
    },
    {
      title: 'Secondary School',
      grades: 'Classes IX & X (CBSE Board AISSE)',
      href: '/academics/secondary-school',
      desc: 'Rigorous preparation for CBSE All India Secondary School Examination with dedicated mock test series, mentoring, and academic remediation.',
      features: ['100% CBSE AISSE Curriculum', 'Pre-Board Mock Series', 'Doubt-Clearing Study Clinics', 'Career Exploration Guidance'],
    },
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Academics' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Curriculum & Pedagogy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Academic Excellence at Every Stage
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            CBSE Affiliation No: 130603 • Empowering students with critical intellect and creative confidence.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
            CBSE Framework Aligned with NEP 2020
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            At Jyothi Vidya Niketan E.M. High School, our academic programs are meticulously organized according to the Central Board of Secondary Education guidelines. We integrate experiential pedagogy, continuous formative assessments, and character education to ensure our students excel academically while developing practical life skills.
          </p>
        </div>

        {/* 4 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-navy-900 text-school-gold-400">
                    Stage 0{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">{stage.grades}</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-school-navy-950">{stage.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{stage.desc}</p>

                <div className="space-y-2 pt-2">
                  {stage.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <Link
                  href={stage.href}
                  className="inline-flex items-center gap-2 text-xs font-bold text-school-navy-800 hover:text-school-gold-600 group"
                >
                  <span>Explore curriculum details</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links to Calendar & Examinations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Link
            href="/academics/calendar"
            className="p-6 rounded-2xl bg-school-navy-900 text-white flex items-center justify-between hover:bg-school-navy-800 transition-colors shadow-lg"
          >
            <div>
              <p className="text-xs font-bold text-school-gold-400 uppercase tracking-wider">Yearly Planner</p>
              <h4 className="text-lg font-serif font-bold">Academic Calendar 2025-26</h4>
              <p className="text-xs text-school-navy-200 mt-1">Review term dates, assessment cycles, and holidays.</p>
            </div>
            <ArrowRight className="w-6 h-6 text-school-gold-400 shrink-0" />
          </Link>

          <Link
            href="/academics/examinations"
            className="p-6 rounded-2xl bg-school-navy-900 text-white flex items-center justify-between hover:bg-school-navy-800 transition-colors shadow-lg"
          >
            <div>
              <p className="text-xs font-bold text-school-gold-400 uppercase tracking-wider">Assessment Schedule</p>
              <h4 className="text-lg font-serif font-bold">Examinations & Timetables</h4>
              <p className="text-xs text-school-navy-200 mt-1">Periodic test routines, FA-4, SA-2, and Class X Board dates.</p>
            </div>
            <ArrowRight className="w-6 h-6 text-school-gold-400 shrink-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}

