import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ScrollReveal from '@/components/common/ScrollReveal';
import { ShieldCheck, Award, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Jyothi Vidya Niketan E.M. High School Koilakuntla',
  description:
    'Learn about Jyothi Vidya Niketan E.M. High School, established in 2018 in Koilakuntla under Sarabha Reddy Educational Society with CBSE curriculum (Affiliation No: 130603).',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/about-us',
  },
};

export default function AboutUsPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <section className="bg-school-navy-950 text-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            About Jyothi Vidya Niketan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
            Nurturing Young Minds with Knowledge, Integrity & Purpose
          </h1>
          <p className="text-sm sm:text-base text-school-navy-200 max-w-2xl mx-auto">
            Affiliated to the Central Board of Secondary Education (CBSE Affiliation 130603), Koilakuntla, Andhra Pradesh.
          </p>
        </div>
      </section>

      {/* Main Story & History */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal animation="fade-up">
              <span className="text-xs uppercase font-bold text-school-gold-600 tracking-wider">
                Our Journey Since 2018
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-school-navy-950 leading-tight mt-2">
                Founded on the Principles of Accessible, High-Quality Education
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <strong>Jyothi Vidya Niketan E.M. High School</strong> was established in 2018 under the vision of the <strong>Sarabha Reddy Educational Society</strong>. Recognizing the crucial need for progressive, English medium CBSE schooling in Koilakuntla and the surrounding rural communities of Kurnool and Nandyal districts, our founders set out to build an institution that blends academic rigor with moral grounding.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                Over the years, the school has developed into a premier educational center equipped with modern digital infrastructure, composite science laboratories, extensive library resources, and dedicated sports grounds.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-school-gold-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-700">
                    <strong>CBSE Affiliation No: 130603</strong> — strictly following board guidelines and NEP progressive learning directives.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-school-gold-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-700">
                    <strong>Holistic Personality Growth</strong> — balancing academic excellence with yoga, arts, athletic sports, and public speaking.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-school-gold-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-700">
                    <strong>Safe & Disciplined Campus</strong> — 24/7 CCTV surveillance, boundary walls, and dedicated student transport.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 relative">
            <ScrollReveal animation="zoom-in" delay={150}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200"
                  alt="Jyothi Vidya Niketan School Building"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-navy-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-bold text-school-gold-400 uppercase tracking-widest">Koilakuntla Campus</p>
                  <h3 className="text-lg font-serif font-bold">Survey No: 872/2 & 872/3, Jammalamadugu Road</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Leadership & Links Section */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 h-full">
              <h3 className="font-serif font-bold text-xl text-school-navy-950">Principal's Message</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Read how Mrs. S. V. Lakshmi guides the academic community toward compassionate leadership and board distinction.
              </p>
              <Link
                href="/about-us/principals-message"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
              >
                <span>Read message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={100}>
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 h-full">
              <h3 className="font-serif font-bold text-xl text-school-navy-950">Vision & Mission</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Discover the institutional roadmap, pedagogical pillars, and values driving Jyothi Vidya Niketan forward.
              </p>
              <Link
                href="/about-us/vision-mission"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
              >
                <span>Explore philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 h-full">
              <h3 className="font-serif font-bold text-xl text-school-navy-950">Campus Facilities</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tour our smart digital classrooms, composite science labs, computer lab, sports ground, and library.
              </p>
              <Link
                href="/campus-facilities"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
              >
                <span>View facilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

