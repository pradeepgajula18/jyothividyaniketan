import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: "Principal's Message | Jyothi Vidya Niketan Koilakuntla",
  description:
    'Read the official message from the Principal of Jyothi Vidya Niketan E.M. High School outlining our vision for student empowerment, academic discipline, and ethical growth.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/about-us/principals-message',
  },
};

export default function PrincipalsMessagePage() {
  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'About Us', href: '/about-us' },
          { label: "Principal's Message" },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Institutional Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Message from the Principal
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Guiding young minds toward academic distinction and lifelong integrity.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Principal Profile Card */}
          <div className="md:col-span-4 bg-slate-50 border border-gray-200 rounded-3xl p-6 text-center space-y-4 shadow-sm">
            <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600"
                alt="Principal Mrs. S. V. Lakshmi"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-school-navy-950">
                Mrs. S. V. Lakshmi
              </h2>
              <p className="text-xs font-semibold text-school-gold-600">
                Principal, M.Sc., M.Ed., M.Phil.
              </p>
              <p className="text-xs text-gray-500 mt-1">18+ Years in Educational Leadership</p>
            </div>
            <div className="pt-3 border-t border-gray-200 text-xs text-gray-600 italic">
              “Education is not the learning of facts, but the training of the mind to think.”
            </div>
          </div>

          {/* Letter Body */}
          <div className="md:col-span-8 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div className="text-school-gold-500">
              <Quote className="w-10 h-10 rotate-180" />
            </div>

            <p className="font-serif text-lg font-bold text-school-navy-950 leading-snug">
              Dear Parents, Students, and Well-Wishers of the Jyothi Vidya Niketan Family,
            </p>

            <p>
              It gives me immense pleasure to welcome you to Jyothi Vidya Niketan E.M. High School. Since our founding in 2018 under the visionary patronship of Sarabha Reddy Educational Society, our mission has been straightforward yet profound: to create a fertile ground where every student is inspired to learn with joy, develop critical intellect, and act with unyielding ethical character.
            </p>

            <p>
              In today's fast-evolving world, true education requires more than memorizing curricula. We focus intensely on conceptual clarity in foundational sciences and mathematics, fluent multilingual expression, technological fluency in coding, and physical vigor through athletics and yoga.
            </p>

            <p>
              Our CBSE affiliation (No: 130603) affirms our adherence to the highest national academic standards. Every classroom at Jyothi Vidya Niketan is a sanctuary of encouragement, where questions are celebrated and every child receives individualized attention from our committed educators.
            </p>

            <p>
              I invite you to visit our beautiful Koilakuntla campus, observe our dynamic classrooms, and partner with us in shaping a bright, confident future for your children.
            </p>

            <div className="pt-6 border-t border-gray-200">
              <p className="font-serif font-bold text-school-navy-950">Warm regards,</p>
              <p className="font-bold text-sm text-school-gold-700">Mrs. S. V. Lakshmi</p>
              <p className="text-xs text-gray-500">Principal, Jyothi Vidya Niketan E.M. High School</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

