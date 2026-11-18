import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { FileText, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { dataService } from '@/lib/data/service';

export const metadata: Metadata = {
  title: 'Examination Updates & Schedules | Jyothi Vidya Niketan Koilakuntla',
  description:
    'CBSE Board examinations, Formative Assessments (FA-1 to FA-4), and Summative Assessment schedules for Jyothi Vidya Niketan E.M. High School in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/academics/examinations',
  },
};

export default async function ExaminationsPage() {
  const exams = await dataService.getExaminationUpdates();

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Academics', href: '/academics' },
          { label: 'Examinations' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Assessment System
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Examination Updates & Timetables
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Continuous Comprehensive Evaluation (CCE) and CBSE Class X Board Examination schedules.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        {/* Important Alert Notice */}
        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h2 className="font-bold text-base text-amber-950">
              CBSE Class X Board Examination Guidelines
            </h2>
            <p>
              Admit cards must be signed by parents and brought to the examination hall on all exam days. Entry into the examination center is strictly permitted up to 9:45 AM. School uniform is mandatory.
            </p>
          </div>
        </div>

        {/* Exam Cards */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-school-navy-950">
            Scheduled Assessments (Academic Year 2025–26)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map(exam => (
              <div
                key={exam.id}
                className="p-6 rounded-2xl bg-slate-50 border border-gray-200 shadow-sm hover:border-school-gold-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-school-navy-800 text-school-gold-400">
                      {exam.exam_type}
                    </span>
                    <span className="text-xs font-bold text-gray-500">{exam.class_grade}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-school-navy-950">
                    {exam.title}
                  </h3>

                  <div className="text-xs text-gray-600 space-y-1 pt-1">
                    <p>
                      <strong>Dates:</strong> {exam.start_date} {exam.end_date ? `to ${exam.end_date}` : ''}
                    </p>
                    {exam.syllabus_notes && (
                      <p className="text-gray-500 italic">{exam.syllabus_notes}</p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 mt-6 flex items-center justify-between">
                  <Link
                    href="/downloads"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Timetable PDF</span>
                  </Link>
                  <span className="text-[11px] text-gray-400">{exam.academic_year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

