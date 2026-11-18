import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Sparkles, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pre-Primary School (Nursery, LKG, UKG) | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Child-centric early childhood education at Jyothi Vidya Niketan. Experiential, joyful learning for Nursery, LKG, and UKG in Koilakuntla, Andhra Pradesh.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics/pre-primary',
  },
};

export default function PrePrimaryPage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Academics', href: '/academics' },
          { label: 'Pre-Primary School' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Early Childhood Education
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Pre-Primary: Nursery, LKG & UKG
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            A gentle, loving, and joyful introduction to formal school life.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
              The Wonder Years of Learning
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              At Jyothi Vidya Niketan, our Pre-Primary wing creates a welcoming, vibrant environment where children feel secure and cherished. We utilize Montessori and play-way methodologies to foster natural curiosity, communicative fluency, and fine motor skills.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Phonics-based reading and vocabulary enrichment</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Sensory motor play, sand pit, and manipulative blocks</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Rhymes, puppet theater, and creative dramatization</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-school-gold-600 shrink-0" />
                <span>Attentive female care attendants ensuring hygiene and safety</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"
              alt="Kindergarten students engaging in play-way activities"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-school-navy-50 border border-school-navy-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-school-navy-950">
              Admissions Open for Nursery, LKG & UKG (2025-26)
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Minimum age eligibility: 3 years completed by 31st March for Nursery.
            </p>
          </div>
          <Link
            href="/admissions/enquiry"
            className="shrink-0 px-6 py-3 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            Enquire for Admission
          </Link>
        </div>
      </section>
    </div>
  );
}

