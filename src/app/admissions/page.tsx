import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Sparkles, CheckCircle2, FileText, Phone, MessageCircle, ArrowRight, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions 2025-26 | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Apply for admission at Jyothi Vidya Niketan E.M. High School (Nursery to Class X). CBSE Affiliation No: 130603. View eligibility, fee structure, and steps in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/admissions',
  },
};

export default function AdmissionsPage() {
  const steps = [
    {
      step: '01',
      title: 'Online Enquiry / Registration',
      desc: 'Fill out our simple online admission form or visit our campus admissions desk on Jammalamadugu Road.',
    },
    {
      step: '02',
      title: 'Campus Tour & Child Interaction',
      desc: 'Meet our academic counselors, tour our smart classrooms and labs, and engage in an informal student assessment.',
    },
    {
      step: '03',
      title: 'Document Verification',
      desc: 'Submit required paperwork including birth certificate, Aadhaar copies, previous report card, and transfer certificate.',
    },
    {
      step: '04',
      title: 'Admission Confirmation',
      desc: 'Complete fee formalities to reserve your child’s seat for the upcoming 2025–26 academic session.',
    },
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Admissions' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Enrollment 2025–2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Admissions Process & Criteria
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Nursery through Class X • CBSE Affiliated (130603) • Koilakuntla, Andhra Pradesh.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admissions/enquiry"
              className="px-6 py-3 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Apply Online Now
            </Link>
            <Link
              href="/downloads"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-school-gold-400" />
              <span>Download Application Form</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
        {/* Step-by-Step Procedure */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-600">
              Four Easy Steps
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-school-navy-950">
              Admission Procedure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:border-school-gold-400 transition-all space-y-3"
              >
                <span className="text-3xl font-black font-serif text-school-gold-500">
                  {s.step}
                </span>
                <h3 className="font-serif font-bold text-base text-school-navy-950">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility & Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Eligibility */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-school-navy-950">
              Age Eligibility Criteria (as of 31st March)
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
              <li className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-semibold text-school-navy-900">Nursery</span>
                <span className="text-school-gold-700 font-bold">3+ Years</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-semibold text-school-navy-900">LKG (Junior KG)</span>
                <span className="text-school-gold-700 font-bold">4+ Years</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-semibold text-school-navy-900">UKG (Senior KG)</span>
                <span className="text-school-gold-700 font-bold">5+ Years</span>
              </li>
              <li className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-semibold text-school-navy-900">Class I</span>
                <span className="text-school-gold-700 font-bold">6+ Years</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold text-school-navy-900">Classes II to X</span>
                <span className="text-gray-500">Based on previous grade promotion & TC</span>
              </li>
            </ul>
          </div>

          {/* Mandatory Documents Checklist */}
          <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-school-navy-950">
              Required Documents for Verification
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-school-gold-500 shrink-0 mt-0.5" />
                <span>Original Birth Certificate of Student (issued by Municipal / Gram Panchayat)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-school-gold-500 shrink-0 mt-0.5" />
                <span>Original Transfer Certificate (TC) countersigned from previous recognized school</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-school-gold-500 shrink-0 mt-0.5" />
                <span>Previous academic year report card / marks sheet</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-school-gold-500 shrink-0 mt-0.5" />
                <span>Photocopy of Student Aadhaar Card and Parents’ Aadhaar Cards</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-school-gold-500 shrink-0 mt-0.5" />
                <span>4 recent passport size color photographs of the student</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp & Phone Helpline Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-school-navy-950 to-school-navy-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-bold text-school-gold-400 tracking-wider">
              Admissions Help Desk
            </span>
            <h3 className="text-2xl font-serif font-bold">Have Questions About Admissions?</h3>
            <p className="text-xs text-school-navy-200 max-w-xl">
              Our admission officers are ready to assist you regarding fee structure, bus routes, and documentation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+917997999863"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-school-gold-400" />
              <span>Call +91 7997999863</span>
            </a>
            <a
              href="https://wa.me/917997999863?text=Hello%20Jyothi%20Vidya%20Niketan!%20I%20would%20like%20to%20enquire%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admission Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

