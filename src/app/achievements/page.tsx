import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import ScrollReveal from '@/components/common/ScrollReveal';
import { dataService } from '@/lib/data/service';
import { Award, Trophy, Star, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Achievements & Awards | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Academic milestones, CBSE board results, sports tournament trophies, and inter-school competition awards won by students of Jyothi Vidya Niketan in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/achievements',
  },
};

interface Props {
  searchParams: {
    page?: string;
    cat?: string;
  };
}

export default async function AchievementsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const currentCategory = searchParams.cat || 'All';
  const pageSize = 6;

  const result = await dataService.getAchievements(currentPage, pageSize, currentCategory);
  const achievements = result.data;

  const categories = [
    'All',
    'Academic',
    'Sports',
    'Competition',
    'Cultural',
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Achievements' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Student Accolades
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Achievements & Awards
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Celebrating excellence across CBSE academics, athletic competitions, and creative pursuits.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
            Category:
          </span>
          {categories.map(cat => {
            const isSelected = currentCategory === cat;
            const href = cat === 'All' ? '/achievements' : `/achievements?cat=${encodeURIComponent(cat)}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-school-navy-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat} Achievements
              </Link>
            );
          })}
        </div>

        {/* Achievement Cards Grid */}
        {achievements.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium text-sm">
              No achievement records found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <ScrollReveal key={item.id} animation="fade-up" delay={index * 100}>
                <div
                  className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-school-navy-950/90 text-school-gold-400 backdrop-blur-sm border border-school-gold-400/30">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{item.grade_or_class || 'All Classes'}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.academic_year}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-lg text-school-navy-950 leading-snug group-hover:text-school-navy-800 transition-colors">
                        {item.title}
                      </h3>

                      {item.student_name && (
                        <p className="text-xs font-semibold text-school-gold-700">
                          Awarded to: {item.student_name}
                        </p>
                      )}

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Numbered Pagination */}
        <Pagination
          currentPage={result.page}
          totalPages={result.totalPages}
          totalRecords={result.total}
          pageSize={result.pageSize}
          itemName="achievements"
        />
      </section>
    </div>
  );
}

