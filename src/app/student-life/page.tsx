import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Sparkles, Trophy, Music, Palette, Compass, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Life & Co-Curriculars | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Experience vibrant student life at Jyothi Vidya Niketan: Arts, athletics, science clubs, music, yoga, and cultural festivals in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/student-life',
  },
};

export default function StudentLifePage() {
  const activities = [
    {
      title: 'Sports & Athletics',
      icon: Trophy,
      desc: 'Cricket coaching, volleyball tournaments, badminton, 100m sprint tracks, and morning physical conditioning under trained physical educators.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800',
    },
    {
      title: 'Visual & Performing Arts',
      icon: Palette,
      desc: 'Classical Kuchipudi and folk dance, vocal music, sketching, clay modeling, and annual theatrical drama presentations.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800',
    },
    {
      title: 'STEM & Robotics Club',
      icon: Compass,
      desc: 'Hands-on project development for district science exhibitions, solar model construction, and coding workshops.',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800',
    },
    {
      title: 'Yoga, Meditation & Wellness',
      icon: Heart,
      desc: 'Daily assembly breathing exercises (pranayama), guided asanas, and mindfulness techniques to boost concentration.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800',
    },
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Student Life' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Beyond the Classroom
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Student Life & Activities
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Nurturing athletic stamina, artistic creativity, leadership poise, and community spirit.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-slate-50 border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-school-gold-600">
                    <Icon className="w-5 h-5" />
                    <h3 className="font-serif font-bold text-xl text-school-navy-950">{act.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to Achievements */}
        <div className="p-8 rounded-3xl bg-school-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-school-gold-400 tracking-wider">
              Student Accomplishments
            </span>
            <h3 className="text-xl font-serif font-bold">
              Explore Our Student Achievements & Awards
            </h3>
            <p className="text-xs text-school-navy-200">
              Board examination toppers, science competition victories, and athletic medals.
            </p>
          </div>
          <Link
            href="/achievements"
            className="shrink-0 px-6 py-3 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            View Achievements
          </Link>
        </div>
      </section>
    </div>
  );
}

