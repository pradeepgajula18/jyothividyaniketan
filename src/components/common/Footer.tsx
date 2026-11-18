'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Heart,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle
} from 'lucide-react';
import { SiteSettings } from '@/types';
import AdminPinModal from './AdminPinModal';

interface Props {
  settings: SiteSettings;
}

export default function Footer({ settings }: Props) {
  const [pinModalOpen, setPinModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-school-navy-950 text-white pt-16 pb-8 border-t-4 border-school-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-school-navy-800">
            {/* Column 1: School Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-lg">
                  <Image
                    src="/images/logo.png"
                    alt="Jyothi Vidya Niketan Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg leading-tight text-white">
                    Jyothi Vidya Niketan
                  </h3>
                  <p className="text-xs font-semibold text-school-gold-400">
                    E.M. High School • CBSE
                  </p>
                </div>
              </div>

              <p className="text-xs text-school-navy-200 leading-relaxed">
                Affiliated to the Central Board of Secondary Education (CBSE No: 130603). Managed by Sarabha Reddy Educational Society. Committed to academic distinction, value education, and comprehensive student growth.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-school-navy-900 border border-school-navy-800 text-xs text-school-gold-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-school-gold-400" />
                <span>CBSE Affiliation No: 130603</span>
              </div>

              {/* Social Media Channels */}
              <div className="pt-2 flex items-center gap-2.5">
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-school-navy-900 border border-school-navy-800 flex items-center justify-center text-gray-300 hover:text-school-navy-950 hover:bg-school-gold-500 transition-all"
                    title="Facebook"
                    aria-label="Official Facebook Page"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-school-navy-900 border border-school-navy-800 flex items-center justify-center text-gray-300 hover:text-school-navy-950 hover:bg-school-gold-500 transition-all"
                    title="Instagram"
                    aria-label="Official Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-school-navy-900 border border-school-navy-800 flex items-center justify-center text-gray-300 hover:text-school-navy-950 hover:bg-school-gold-500 transition-all"
                    title="YouTube"
                    aria-label="Official YouTube Channel"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-school-navy-900 border border-school-navy-800 flex items-center justify-center text-gray-300 hover:text-school-navy-950 hover:bg-school-gold-500 transition-all"
                    title="LinkedIn"
                    aria-label="Official LinkedIn Page"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {settings.whatsapp_number && (
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-school-navy-900 border border-school-navy-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-emerald-600 transition-all"
                    title="WhatsApp"
                    aria-label="Connect on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-school-gold-400 mb-4 pb-2 border-b border-school-navy-800">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs text-school-navy-200">
                <li>
                  <Link href="/about-us" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> About Our School
                  </Link>
                </li>
                <li>
                  <Link href="/academics" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> CBSE Academic Programs
                  </Link>
                </li>
                <li>
                  <Link href="/admissions" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Admission Process & Criteria
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/enquiry" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Online Admission Enquiry
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Photo & Video Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/faculty" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Faculty & Staff Directory
                  </Link>
                </li>
                <li>
                  <Link href="/mandatory-public-disclosure" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Mandatory Public Disclosure
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Academic Stages */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-school-gold-400 mb-4 pb-2 border-b border-school-navy-800">
                Academic Stages
              </h4>
              <ul className="space-y-2 text-xs text-school-navy-200">
                <li>
                  <Link href="/academics/pre-primary" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Pre-Primary (Nursery, LKG, UKG)
                  </Link>
                </li>
                <li>
                  <Link href="/academics/primary-school" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Primary Wing (Classes I - V)
                  </Link>
                </li>
                <li>
                  <Link href="/academics/middle-school" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Middle School (Classes VI - VIII)
                  </Link>
                </li>
                <li>
                  <Link href="/academics/secondary-school" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Secondary School (Classes IX - X)
                  </Link>
                </li>
                <li>
                  <Link href="/academics/calendar" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Academic Calendar 2025-26
                  </Link>
                </li>
                <li>
                  <Link href="/academics/examinations" className="hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-school-gold-500" /> Examination Updates
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Location */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-school-gold-400 mb-4 pb-2 border-b border-school-navy-800">
                Campus Location
              </h4>
              <div className="space-y-3 text-xs text-school-navy-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-school-gold-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Survey No: 872/2 & 872/3, Jammalamadugu Road, Koilakuntla, Nandyal District, Andhra Pradesh - 518134
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-school-gold-400 shrink-0" />
                  <a href={`tel:${settings.primary_phone}`} className="hover:text-white">
                    {settings.primary_phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-school-gold-400 shrink-0" />
                  <a href={`mailto:${settings.primary_email}`} className="hover:text-white truncate">
                    {settings.primary_email}
                  </a>
                </div>
                <div className="pt-2">
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-school-gold-500/10 border border-school-gold-500/30 text-school-gold-400 hover:text-white hover:bg-school-gold-500/20 text-xs font-semibold transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Crafted by SSD Creative Studio */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-school-navy-300">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span>© {new Date().getFullYear()} Jyothi Vidya Niketan E.M. High School, Koilakuntla. All Rights Reserved.</span>
              <span className="hidden sm:inline-block text-school-gold-500">•</span>
              <a
                href="https://ssdcreativestudio.linklee.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-school-gold-400 hover:text-white font-semibold hover:underline transition-colors"
              >
                Crafted by SSD Creative Studio
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/mandatory-public-disclosure" className="hover:text-white">
                CBSE Mandatory Disclosure
              </Link>
              <span>•</span>
              <Link href="/contact-us" className="hover:text-white">
                Privacy & Campus Terms
              </Link>
              <span>•</span>
              {/* Secret Book Emoji PIN Authentication Trigger */}
              <button
                onClick={() => setPinModalOpen(true)}
                className="opacity-70 hover:opacity-100 hover:scale-125 transition-all p-1 text-base cursor-pointer select-none"
                title="Management Portal"
                aria-label="Staff and Admin Login"
              >
                📖
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin PIN Authentication Modal */}
      <AdminPinModal isOpen={pinModalOpen} onClose={() => setPinModalOpen(false)} />
    </>
  );
}
