import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Calendar,
  Building,
  GraduationCap,
  MessageCircle,
  Phone,
  FileText,
  MapPin,
  ExternalLink,
  ChevronRight,
  Star,
  Trophy,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { dataService } from '@/lib/data/service';
import ScrollReveal from '@/components/common/ScrollReveal';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const settings = await dataService.getSiteSettings();
  const announcements = await dataService.getAnnouncements();
  const albumsResult = await dataService.getAlbums(1, 3);
  const featuredAlbums = albumsResult.data;
  const testimonials = await dataService.getSiteSettings().then(() => [
    {
      name: 'M. Venkata Subbaiah',
      role: 'Parent of Class X Student',
      quote: 'Jyothi Vidya Niketan has provided our son with top-quality CBSE education right here in Koilakuntla. The teachers give individual attention and the discipline is exemplary.',
      rating: 5,
    },
    {
      name: 'S. Lakshmi Prasanna',
      role: 'Parent of Class VI Student',
      quote: 'The smart classrooms and focus on spoken English have given our daughter tremendous confidence. The sports facilities and library are outstanding.',
      rating: 5,
    },
    {
      name: 'K. Surendra Reddy',
      role: 'Parent of Class III Student',
      quote: 'We are extremely pleased with the pre-primary and primary teaching methodology. The children learn through activities without feeling overburdened.',
      rating: 5,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION (NORMAL FAST RENDERING - NO DELAY ANIMATIONS; WITH DYNAMIC BACKGROUND VIDEO) */}
      <section className="relative bg-gradient-to-br from-school-navy-950 via-school-navy-900 to-school-navy-800 text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
        {/* Background Video Player or Patterned Overlay */}
        {settings.hero_video_url ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-35"
              poster={settings.hero_background_image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1920'}
            >
              <source src={settings.hero_video_url} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-school-navy-950 via-school-navy-950/85 to-school-navy-900/90" />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - Normal Instant Rendering */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-school-gold-500/20 border border-school-gold-400/40 text-school-gold-300 text-xs sm:text-sm font-semibold tracking-wide shadow-inner">
                <ShieldCheck className="w-4 h-4 text-school-gold-400" />
                <span>CBSE Affiliated No: 130603 • Estd 2018</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight sm:leading-tight">
                {settings.hero_headline}
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-school-navy-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {settings.hero_subheadline}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/admissions/enquiry"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-school-gold-500/20 hover:shadow-2xl transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5 text-school-navy-950" />
                  <span>Apply for Admission 2025-26</span>
                </Link>
                <Link
                  href="/about-us"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all"
                >
                  <span>Explore School</span>
                  <ArrowRight className="w-4 h-4 text-school-gold-400" />
                </Link>
              </div>

              {/* Social Media Connect Chips in Hero Section */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-semibold text-school-gold-400 flex items-center gap-1 mr-1">
                  Connect with Us:
                </span>
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>Instagram</span>
                  </a>
                )}
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-blue-600 text-white text-xs font-medium border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-400" />
                    <span>Facebook</span>
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-600 text-white text-xs font-medium border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-400" />
                    <span>YouTube</span>
                  </a>
                )}
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-blue-700 text-white text-xs font-medium border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {settings.whatsapp_enabled && settings.whatsapp_number && (
                  <a
                    href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsapp_default_message || 'Hello! I would like to enquire about admissions at Jyothi Vidya Niketan E.M. High School.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-bold border border-[#25D366]/40 backdrop-blur-sm transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              {/* Quick Features Checklist */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-school-navy-200 border-t border-school-navy-800/80">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-school-gold-400 shrink-0" />
                  <span>Smart Classrooms</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-school-gold-400 shrink-0" />
                  <span>Composite STEM Labs</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckCircle className="w-4 h-4 text-school-gold-400 shrink-0" />
                  <span>Sports & Athletics</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Banner - Modern Sleek School Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative glow frame */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-school-gold-500/50 via-school-navy-700 to-school-gold-600/40 rounded-3xl blur-xl opacity-40" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-school-navy-900 border border-school-gold-500/40 p-2">
                  <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                    <img
                      src={settings.hero_background_image || "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200"}
                      alt="Jyothi Vidya Niketan Campus Life and Learning"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-school-navy-950/95 via-school-navy-950/40 to-transparent" />
                    
                    {/* Top status chip */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-school-navy-950/80 backdrop-blur-md border border-school-gold-500/40 text-school-gold-400 text-[11px] font-bold tracking-wide shadow-md">
                      Admissions Open {settings.current_academic_year} • Nursery to Class X
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                      <span className="text-xs uppercase font-bold tracking-widest text-school-gold-400">
                        Campus & Student Life
                      </span>
                      <h2 className="text-lg font-bold font-serif text-white">
                        A Nurturing Community in Koilakuntla
                      </h2>
                      <p className="text-xs text-school-navy-200">
                        Managed by Sarabha Reddy Educational Society (CBSE No: 130603)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR - Fully Dynamic & Editable from Admin Dashboard */}
      <section className="bg-school-gold-500 text-school-navy-950 py-8 px-4 sm:px-6 shadow-md relative z-20">
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-school-gold-600">
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
                {settings.stat_1_value || '100%'}
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 text-school-navy-900">
                {settings.stat_1_label || 'CBSE Class X Pass Rate'}
              </p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
                {settings.stat_2_value || '30+'}
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 text-school-navy-900">
                {settings.stat_2_label || 'Certified Educators'}
              </p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
                {settings.stat_3_value || '15:1'}
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 text-school-navy-900">
                {settings.stat_3_label || 'Student-Teacher Ratio'}
              </p>
            </div>
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
                {settings.stat_4_value || '8+ Acres'}
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mt-1 text-school-navy-900">
                {settings.stat_4_label || 'Lush Campus & Grounds'}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. ABOUT SCHOOL OVERVIEW */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Mosaic with Scroll Reveal */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <ScrollReveal animation="slide-right" delay={100} className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800"
                  alt="School Campus Building"
                  className="rounded-2xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800"
                  alt="Science Laboratory"
                  className="rounded-2xl shadow-md object-cover h-64 w-full hover:scale-105 transition-transform duration-300"
                />
              </ScrollReveal>
              <ScrollReveal animation="slide-right" delay={250} className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800"
                  alt="Annual Day celebrations"
                  className="rounded-2xl shadow-md object-cover h-64 w-full hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800"
                  alt="Sports grounds"
                  className="rounded-2xl shadow-md object-cover h-48 w-full hover:scale-105 transition-transform duration-300"
                />
              </ScrollReveal>
            </div>

            {/* Content with Scroll Reveal */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal animation="slide-left" delay={150}>
                <div className="inline-block text-xs uppercase font-extrabold tracking-widest text-school-gold-600 bg-school-gold-50 px-3 py-1 rounded-full border border-school-gold-200">
                  Foundational Philosophy
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif text-school-navy-950 leading-tight mt-3">
                  Dedicated to Educational Excellence and Moral Integrity in Koilakuntla
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-4">
                  Founded in 2018 under the auspices of <strong>Sarabha Reddy Educational Society</strong>, Jyothi Vidya Niketan E.M. High School stands as a benchmark of progressive CBSE education in Koilakuntla, Nandyal District.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2">
                  We believe that education must transcend textbooks. Our child-centric environment is specifically structured to stimulate natural curiosity, cultivate critical reasoning, nurture athletic and cultural talents, and instill enduring ethical values.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-school-navy-50 flex items-center justify-center text-school-navy-800">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-school-navy-950 text-sm">CBSE Curriculum</h3>
                    <p className="text-xs text-gray-600">
                      Affiliation No. 130603 compliant with the National Education Policy guidelines.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-school-navy-50 flex items-center justify-center text-school-navy-800">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-school-navy-950 text-sm">Passionate Educators</h3>
                    <p className="text-xs text-gray-600">
                      Experienced mentors fostering individual attention and academic mentorship.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/about-us"
                    className="inline-flex items-center gap-2 text-school-navy-800 hover:text-school-gold-600 font-bold text-sm group"
                  >
                    <span>Learn more about our vision, management and leadership</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC PROGRAMS (STAGES) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-600">
                Curricular Stages
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-school-navy-950">
                Progressive Learning from Pre-Primary to Secondary School
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Tailored developmental stages ensuring age-appropriate foundational learning, experiential inquiry, and board exam mastery.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage 1: Pre-Primary */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-school-gold-400 transition-all duration-300 flex flex-col justify-between bg-white group h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    01
                  </div>
                  <h3 className="text-lg font-bold font-serif text-school-navy-950 group-hover:text-school-navy-800 transition-colors">
                    Pre-Primary
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    Nursery • LKG • UKG
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Experiential, play-way foundational learning focusing on sensory development, phonics, number concepts, and joyful creative expression.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <Link
                    href="/academics/pre-primary"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
                  >
                    <span>Explore Pre-Primary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Stage 2: Primary School */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-school-gold-400 transition-all duration-300 flex flex-col justify-between bg-white group h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-school-navy-800 flex items-center justify-center font-bold">
                    02
                  </div>
                  <h3 className="text-lg font-bold font-serif text-school-navy-950 group-hover:text-school-navy-800 transition-colors">
                    Primary School
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    Classes I to V
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Building strong fundamentals in mathematics, languages (English & regional), environmental science, creative arts, and physical education.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <Link
                    href="/academics/primary-school"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
                  >
                    <span>Explore Primary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Stage 3: Middle School */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-school-gold-400 transition-all duration-300 flex flex-col justify-between bg-white group h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                    03
                  </div>
                  <h3 className="text-lg font-bold font-serif text-school-navy-950 group-hover:text-school-navy-800 transition-colors">
                    Middle School
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    Classes VI to VIII
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Transition into subject-specific inquiry, composite laboratory experiments, coding fundamentals, debate, and inter-house competitions.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <Link
                    href="/academics/middle-school"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
                  >
                    <span>Explore Middle School</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Stage 4: Secondary School */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-school-gold-400 transition-all duration-300 flex flex-col justify-between bg-white group h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                    04
                  </div>
                  <h3 className="text-lg font-bold font-serif text-school-navy-950 group-hover:text-school-navy-800 transition-colors">
                    Secondary School
                  </h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    Classes IX & X (CBSE Board)
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Rigorous preparation for CBSE All India Secondary School Examination (AISSE) with mock test series, remediation, and career counseling.
                  </p>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6">
                  <Link
                    href="/academics/secondary-school"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600"
                  >
                    <span>Explore Secondary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. CAMPUS FACILITIES SHOWCASE */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-school-navy-950 text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
                  Infrastructure & Resources
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif leading-tight">
                  Modern Learning Spaces Designed for Safety & Discovery
                </h2>
              </div>
              <Link
                href="/campus-facilities"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-school-navy-900 border border-school-navy-800 hover:border-school-gold-400 text-school-gold-400 text-xs font-bold transition-all"
              >
                <span>View All Verified Facilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="rounded-2xl overflow-hidden bg-school-navy-900 border border-school-navy-800 group hover:border-school-gold-500/40 transition-colors h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800"
                    alt="Science Laboratory"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold font-serif text-lg text-white">Composite Science Laboratory</h3>
                  <p className="text-xs text-school-navy-200 leading-relaxed">
                    Fully equipped with modern Physics, Chemistry, and Biology apparatus meeting CBSE secondary standards for experiential experimentation.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200}>
              <div className="rounded-2xl overflow-hidden bg-school-navy-900 border border-school-navy-800 group hover:border-school-gold-500/40 transition-colors h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800"
                    alt="Smart Classrooms"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold font-serif text-lg text-white">Interactive Smart Classrooms</h3>
                  <p className="text-xs text-school-navy-200 leading-relaxed">
                    Equipped with digital projection displays, audiovisual instructional multimedia, and ergonomic child-friendly furnishings.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="rounded-2xl overflow-hidden bg-school-navy-900 border border-school-navy-800 group hover:border-school-gold-500/40 transition-colors h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800"
                    alt="Athletics and Sports"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-bold font-serif text-lg text-white">Sports & Athletics Grounds</h3>
                  <p className="text-xs text-school-navy-200 leading-relaxed">
                    Expansive outdoor courts for cricket, volleyball, track events, and guided daily yoga sessions directed by physical educators.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 6. FEATURED GALLERY ALBUMS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-600">
                  Photo Gallery
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif text-school-navy-950">
                  Moments of Pride, Joy & School Celebrations
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-bold shadow-md transition-colors"
              >
                <span>Explore All Photo Albums</span>
                <ArrowRight className="w-4 h-4 text-school-gold-400" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAlbums.map((album, idx) => (
              <ScrollReveal key={album.id} animation="fade-up" delay={idx * 120}>
                <Link
                  href={`/gallery/${album.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-school-gold-400 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={album.cover_image_url}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-school-navy-900/90 text-school-gold-400 backdrop-blur-sm">
                          {album.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {album.event_date}
                      </span>
                      <h3 className="font-serif font-bold text-base text-school-navy-950 group-hover:text-school-navy-800 transition-colors line-clamp-1">
                        {album.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {album.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between text-xs font-semibold text-school-navy-800 border-t border-gray-100 mt-2">
                    <span>View Photos</span>
                    <ChevronRight className="w-4 h-4 text-school-gold-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-600">
                Parent Testimonials
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-school-navy-950">
                Trusted by Families Across Koilakuntla & Nandyal
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Reflections from parents whose children thrive in our academic and moral environment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 120}>
                <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4 h-full">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-school-gold-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-school-gold-500" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                      “{t.quote}”
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-bold text-school-navy-950 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ADMISSIONS CALL TO ACTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-800 text-white relative overflow-hidden">
        <ScrollReveal animation="scale-up" duration={700}>
          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-school-gold-500/20 text-school-gold-300 text-xs font-bold uppercase tracking-wider border border-school-gold-400/30">
              Admissions Open 2025-26
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif leading-tight">
              Give Your Child the Foundation to Excel
            </h2>
            <p className="text-sm sm:text-base text-school-navy-100 max-w-2xl mx-auto leading-relaxed">
              Applications are accepted for Nursery through Class X. Connect with our admissions desk to schedule a personalized campus tour and consultation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/admissions/enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-school-gold-500 hover:bg-school-gold-600 text-school-navy-950 font-bold text-base shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5" />
                <span>Submit Admission Enquiry</span>
              </Link>
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  settings.whatsapp_default_message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 text-xs text-school-navy-300">
              Helpline: <strong className="text-white">{settings.primary_phone}</strong> • Email:{' '}
              <strong className="text-white">{settings.primary_email}</strong>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
