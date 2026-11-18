import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Pagination from '@/components/common/Pagination';
import { dataService } from '@/lib/data/service';
import { GraduationCap, Award, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Faculty & Educators | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Meet our dedicated, experienced, and certified educators at Jyothi Vidya Niketan E.M. High School in Koilakuntla, Andhra Pradesh (CBSE Affiliation 130603).',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/faculty',
  },
};

interface Props {
  searchParams: {
    page?: string;
    dept?: string;
  };
}

export default async function FacultyPage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const currentDept = searchParams.dept || 'All';
  const pageSize = 8;

  const result = await dataService.getFaculty(currentPage, pageSize, currentDept);
  const facultyMembers = result.data;

  const departments = [
    'All',
    'Leadership',
    'Secondary School',
    'Middle School',
    'Primary School',
    'Pre-Primary',
    'Special Activity',
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Faculty & Educators' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Teaching Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Our Certified Faculty
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Qualified, passionate educators committed to student discovery and character building.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Department Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
            Department:
          </span>
          {departments.map(dept => {
            const isSelected = currentDept === dept;
            const href = dept === 'All' ? '/faculty' : `/faculty?dept=${encodeURIComponent(dept)}`;
            return (
              <Link
                key={dept}
                href={href}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-school-navy-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept}
              </Link>
            );
          })}
        </div>

        {/* Faculty Cards Grid */}
        {facultyMembers.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-gray-200">
            <p className="text-gray-500 font-medium text-sm">
              No faculty records found in this department.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyMembers.map(member => (
              <div
                key={member.id}
                className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={member.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400'}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-school-navy-950/90 text-school-gold-400 backdrop-blur-sm border border-school-gold-400/30">
                        {member.department}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-lg text-school-navy-950 group-hover:text-school-navy-800 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-school-gold-700">
                      {member.designation}
                    </p>
                    <div className="pt-2 text-xs text-gray-600 space-y-1 border-t border-gray-100">
                      <p className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{member.qualification}</span>
                      </p>
                      {member.subjects && (
                        <p className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{member.subjects}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-gray-100 text-[11px] font-medium text-gray-500">
                  {member.experience_years}+ Years Teaching Experience
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Numbered Pagination */}
        <Pagination
          currentPage={result.page}
          totalPages={result.totalPages}
          totalRecords={result.total}
          pageSize={result.pageSize}
          itemName="faculty members"
        />
      </section>
    </div>
  );
}

