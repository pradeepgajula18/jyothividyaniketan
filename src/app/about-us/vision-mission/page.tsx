import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Compass, Target, ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vision & Mission | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Explore the educational vision, institutional mission, and core values of Jyothi Vidya Niketan E.M. High School in Koilakuntla (CBSE Affiliation 130603).',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/about-us/vision-mission',
  },
};

export default function VisionMissionPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'About Us', href: '/about-us' },
          { label: 'Vision & Mission' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Our Guiding Philosophy
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Vision, Mission & Core Values
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Guiding our steps since 2018 under Sarabha Reddy Educational Society.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-3xl bg-school-navy-50 border border-school-navy-100 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-school-navy-800 text-school-gold-400 flex items-center justify-center">
              <Compass className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-school-navy-950">Our Vision</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              To be an exemplary center of holistic school education in Andhra Pradesh that inspires every student to realize their fullest intellectual, emotional, and social potential, emerging as visionary global citizens endowed with integrity, empathy, and scientific temperament.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/60 border border-amber-100 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-school-gold-500 text-school-navy-950 flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-school-navy-950">Our Mission</h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              To provide an inclusive, safe, and technologically enriched learning environment following the CBSE curriculum; to cultivate academic excellence through experiential methods; and to foster environmental stewardship, disciplined athletic spirit, and cultural pride.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-600">
              Institutional DNA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
              The Five Pillars of Jyothi Vidya Niketan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-gold-600 uppercase">Pillar 1</span>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Academic Rigor</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Emphasis on deep conceptual understanding rather than superficial rote memorization.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-gold-600 uppercase">Pillar 2</span>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Ethical Character</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Nurturing honesty, empathy, respect for diverse viewpoints, and civic responsibility.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-gold-600 uppercase">Pillar 3</span>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Innovation & STEM</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Encouraging hands-on scientific experimentation, digital computing, and creative inquiry.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-gold-600 uppercase">Pillar 4</span>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Physical Well-Being</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Daily sports, athletic tournaments, and yoga to build physical endurance and sportsmanship.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-3">
              <span className="text-xs font-bold text-school-gold-600 uppercase">Pillar 5</span>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Cultural Heritage</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Preserving Indian arts, classical music, Indian languages, and patriotic devotion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

