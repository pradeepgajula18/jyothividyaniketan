'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Send,
  MessageCircle,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function AdmissionEnquiryPage() {
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    grade_applying: 'Nursery',
    academic_year: '2025-2026',
    date_of_birth: '',
    gender: 'Male',
    city: 'Koilakuntla',
    address: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const grades = [
    'Nursery',
    'LKG',
    'UKG',
    'Class I',
    'Class II',
    'Class III',
    'Class IV',
    'Class V',
    'Class VI',
    'Class VII',
    'Class VIII',
    'Class IX',
    'Class X',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admissions/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Failed to submit enquiry. Please verify the information entered.');
      }
    } catch (err) {
      setError('Connection error. Please try again or call the school office directly.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappPrefill = `Hello Jyothi Vidya Niketan! I have submitted an online admission enquiry for my child ${formData.student_name || ''} applying for ${formData.grade_applying}. Please guide me on next steps.`;

  return (
    <div className="bg-white">
      <Breadcrumbs
        items={[
          { label: 'Admissions', href: '/admissions' },
          { label: 'Online Admission Enquiry' },
        ]}
      />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Admissions 2025–26
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Online Admission Enquiry
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            Submit your child’s details to begin the registration process for Jyothi Vidya Niketan E.M. High School.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        {success ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950">
                Admission Enquiry Received Successfully!
              </h2>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.parent_name}</strong>. We have saved your enquiry for <strong>{formData.student_name}</strong> ({formData.grade_applying}, AY 2025-26).
              </p>
              <p className="text-xs text-emerald-700">
                Our admissions counselor will contact you at <strong>{formData.phone}</strong> within 24 hours.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/917997999863?text=${encodeURIComponent(whatsappPrefill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    student_name: '',
                    parent_name: '',
                    phone: '',
                    email: '',
                    grade_applying: 'Nursery',
                    academic_year: '2025-2026',
                    date_of_birth: '',
                    gender: 'Male',
                    city: 'Koilakuntla',
                    address: '',
                    message: '',
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="mb-8 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-school-navy-950">
                Student & Parent Information
              </h2>
              <p className="text-xs text-gray-500">
                Fields marked with <span className="text-red-500 font-bold">*</span> are required.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Student Name & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="student_name"
                    required
                    value={formData.student_name}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Grade Applying For <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="grade_applying"
                    value={formData.grade_applying}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  >
                    {grades.map(g => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Parent Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Parent / Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parent_name"
                    required
                    value={formData.parent_name}
                    onChange={handleChange}
                    placeholder="Father / Mother / Guardian full name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Contact Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Email & Academic Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    name="academic_year"
                    value={formData.academic_year}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-700 text-sm font-semibold select-none cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Row 4: Date of Birth & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Student Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 5: City / Location */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Town / Village / Location
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Koilakuntla, Banaganapalle, Sanjamala, Allagadda"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                />
              </div>

              {/* Row 6: Additional Message / Specific Request */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Additional Queries / Transport Requirements
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us if you require school bus transport, hostel information, or have specific questions."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-school-navy-800 transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 active:scale-[0.99] text-white font-bold text-base shadow-xl shadow-school-navy-900/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-school-gold-400" />
                      <span>Submit Admission Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

