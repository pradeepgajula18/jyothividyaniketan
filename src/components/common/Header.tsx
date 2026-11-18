'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Award,
  Calendar,
  FileText,
  ShieldCheck,
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle
} from 'lucide-react';
import { SiteSettings } from '@/types';

interface Props {
  settings: SiteSettings;
}

export default function Header({ settings }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      href: '/about-us',
      children: [
        { label: 'About School', href: '/about-us' },
        { label: "Principal's Message", href: '/about-us/principals-message' },
        { label: 'Vision & Mission', href: '/about-us/vision-mission' },
        { label: 'Faculty & Educators', href: '/faculty' },
        { label: 'Campus & Facilities', href: '/campus-facilities' },
      ],
    },
    {
      label: 'Academics',
      href: '/academics',
      children: [
        { label: 'Academic Overview', href: '/academics' },
        { label: 'Pre-Primary (Nursery, LKG, UKG)', href: '/academics/pre-primary' },
        { label: 'Primary School (Classes I - V)', href: '/academics/primary-school' },
        { label: 'Middle School (Classes VI - VIII)', href: '/academics/middle-school' },
        { label: 'Secondary School (Classes IX - X)', href: '/academics/secondary-school' },
        { label: 'Academic Calendar', href: '/academics/calendar' },
        { label: 'Examinations', href: '/academics/examinations' },
      ],
    },
    {
      label: 'Admissions',
      href: '/admissions',
      children: [
        { label: 'Admission Process', href: '/admissions' },
        { label: 'Online Admission Enquiry', href: '/admissions/enquiry' },
        { label: 'Downloads & Forms', href: '/downloads' },
        { label: 'Frequently Asked Questions', href: '/faq' },
      ],
    },
    {
      label: 'Gallery',
      href: '/gallery',
      children: [
        { label: 'Photo Albums', href: '/gallery' },
        { label: 'Video Highlights', href: '/gallery/videos' },
      ],
    },
    {
      label: 'Student Life',
      href: '/student-life',
      children: [
        { label: 'Co-Curriculars & Activities', href: '/student-life' },
        { label: 'Student Achievements', href: '/achievements' },
        { label: 'Campus & Facilities', href: '/campus-facilities' },
        { label: 'Faculty Directory', href: '/faculty' },
      ],
    },
    { label: 'News & Events', href: '/news-events' },
    { label: 'Notice Board', href: '/notice-board' },
    { label: 'Mandatory Disclosure', href: '/mandatory-public-disclosure' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <>
      <header className="w-full relative z-40">
        {/* Top Institutional Contact & Social Bar */}
        <div className="bg-school-navy-950 text-school-navy-100 text-xs py-2 px-4 border-b border-school-navy-800/80">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
            <div className="flex items-center flex-wrap gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-school-gold-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                CBSE Affiliation No: <strong className="text-white">{settings.affiliation_number}</strong>
              </span>
              <span className="hidden sm:inline-block text-gray-500">|</span>
              <span className="hidden md:flex items-center gap-1 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-school-gold-400" />
                Koilakuntla, Nandyal District, AP
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${settings.primary_phone}`}
                className="flex items-center gap-1.5 hover:text-school-gold-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-school-gold-400" />
                <span>{settings.primary_phone}</span>
              </a>
              <span className="hidden sm:inline-block text-gray-500">|</span>
              <a
                href={`mailto:${settings.primary_email}`}
                className="hidden sm:flex items-center gap-1.5 hover:text-school-gold-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-school-gold-400" />
                <span>{settings.primary_email}</span>
              </a>

              {/* Dynamic Social Media Profiles */}
              <div className="flex items-center gap-2.5 border-l border-school-navy-800/80 pl-3">
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-school-gold-400 transition-colors"
                    title="Facebook"
                    aria-label="Official Facebook Page"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-school-gold-400 transition-colors"
                    title="Instagram"
                    aria-label="Official Instagram Profile"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-school-gold-400 transition-colors"
                    title="YouTube"
                    aria-label="Official YouTube Channel"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                )}
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-school-gold-400 transition-colors"
                    title="LinkedIn"
                    aria-label="Official LinkedIn Page"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {settings.whatsapp_number && (
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-emerald-400 transition-colors"
                    title="WhatsApp"
                    aria-label="Connect on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Brand & Header Banner */}
        <div className="bg-white border-b border-gray-100 py-3 sm:py-4 px-4 sm:px-6 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo & School Title */}
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden flex items-center justify-center p-0.5 bg-white drop-shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/logo.png"
                  alt="Jyothi Vidya Niketan Logo"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-bold tracking-widest text-school-gold-600 uppercase block">
                  Estd 2018 • Sarabha Reddy Educational Society
                </span>
                <h1 className="text-lg sm:text-2xl font-extrabold font-serif text-school-navy-950 tracking-tight leading-tight group-hover:text-school-navy-800 transition-colors">
                  Jyothi Vidya Niketan
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-school-navy-700 tracking-wide flex items-center gap-2">
                  <span>E.M. High School</span>
                  <span className="text-school-gold-600 font-bold">•</span>
                  <span className="text-school-red-600">A CBSE School</span>
                </p>
              </div>
            </Link>

            {/* Quick Admissions CTA on Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/admissions/enquiry"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-school-navy-800 to-school-navy-900 hover:from-school-navy-900 hover:to-black text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-school-gold-400" />
                <span>Admissions 2025-26</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-school-navy-900 hover:bg-school-navy-50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* 
        STICKY MAIN NAVIGATION BAR:
        Restored to original clean single-line menu, sticks while scrolling.
      */}
      <nav
        aria-label="Main Navigation"
        className="sticky top-0 z-50 w-full bg-school-navy-900 text-white shadow-xl border-b-2 border-school-gold-500/40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Desktop Navigation Links - Clean Single Line */}
          <ul className="hidden lg:flex items-center flex-wrap gap-1 text-[13px] font-semibold tracking-wide py-0.5">
            {navLinks.map(link => {
              const hasChildren = link.children && link.children.length > 0;
              const isActive = pathname === link.href || (link.children && link.children.some(c => pathname === c.href));

              if (!hasChildren) {
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`block py-3.5 px-3 transition-colors border-b-2 whitespace-nowrap ${
                        isActive
                          ? 'border-school-gold-400 text-school-gold-400 bg-white/5 font-bold'
                          : 'border-transparent text-gray-200 hover:text-white hover:border-school-gold-400 hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 py-3.5 px-3 transition-colors border-b-2 whitespace-nowrap ${
                      isActive
                        ? 'border-school-gold-400 text-school-gold-400 bg-white/5 font-bold'
                        : 'border-transparent text-gray-200 hover:text-white hover:border-school-gold-400 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu */}
                  <ul className="absolute left-0 top-full w-64 bg-white text-gray-800 rounded-b-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    {link.children?.map(child => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2 text-xs font-semibold hover:bg-school-navy-50 hover:text-school-navy-900 transition-colors ${
                            pathname === child.href ? 'text-school-navy-900 bg-school-navy-50/80 font-bold' : 'text-gray-700'
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          {/* Right Action: CBSE 130603 badge & Mobile toggle */}
          <div className="flex items-center gap-2 py-2">
            <Link
              href="/mandatory-public-disclosure"
              className="text-[11px] font-bold text-school-gold-400 hover:text-school-gold-300 uppercase tracking-widest py-1.5 px-3 rounded-lg bg-school-gold-500/10 border border-school-gold-500/30 transition-colors whitespace-nowrap"
            >
              CBSE 130603
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="absolute right-0 top-0 bottom-0 w-5/6 max-w-sm bg-school-navy-950 text-white p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-school-navy-800">
                <div className="flex items-center gap-2">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                  <span className="font-bold font-serif text-sm">Jyothi Vidya Niketan</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <ul className="mt-4 space-y-1">
                {navLinks.map(link => {
                  const hasChildren = link.children && link.children.length > 0;
                  const isCurrentOpen = activeDropdown === link.label;

                  return (
                    <li key={link.label} className="border-b border-school-navy-900/60 pb-1">
                      {hasChildren ? (
                        <div>
                          <button
                            onClick={() => setActiveDropdown(isCurrentOpen ? null : link.label)}
                            className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-200 hover:text-school-gold-400"
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isCurrentOpen ? 'rotate-180 text-school-gold-400' : ''
                              }`}
                            />
                          </button>
                          {isCurrentOpen && (
                            <ul className="pl-4 space-y-1 pb-2">
                              {link.children?.map(c => (
                                <li key={c.label}>
                                  <Link
                                    href={c.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-1.5 text-xs text-school-navy-200 hover:text-white"
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm font-semibold text-gray-200 hover:text-school-gold-400"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-6 border-t border-school-navy-800 space-y-3">
              <Link
                href="/admissions/enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block py-3 text-center rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-sm tracking-wide shadow-md"
              >
                Apply for Admissions 2025-26
              </Link>
              <div className="text-center text-xs text-gray-400">
                Call: {settings.primary_phone}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
