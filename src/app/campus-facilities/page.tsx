import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Building, Monitor, Microscope, BookOpen, Trophy, ShieldCheck, Bus, Droplets, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Campus & Infrastructure | Jyothi Vidya Niketan Koilakuntla',
  description:
    'Explore verified modern facilities at Jyothi Vidya Niketan: Smart classrooms, composite science labs, computer lab, library, sports grounds, and GPS bus transport in Koilakuntla.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/campus-facilities',
  },
};

export default function CampusFacilitiesPage() {
  const facilities = [
    {
      title: 'Digital Smart Classrooms',
      icon: Monitor,
      desc: '24 spacious, well-ventilated classrooms with 500+ sq ft floor space each, equipped with digital audiovisual display monitors and ergonomic furnishings.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800',
    },
    {
      title: 'Composite Science Laboratory',
      icon: Microscope,
      desc: 'State-of-the-art laboratory compliant with CBSE secondary guidelines, equipped for Physics optics, Chemistry reagents, and Biology specimen study.',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800',
    },
    {
      title: 'Modern Computer Science Center',
      icon: Monitor,
      desc: 'High-speed broadband network with modern desktop systems for student practicals in scratch coding, Python basics, and ICT digital literacy.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
    },
    {
      title: 'Extensive Library & Reading Lounge',
      icon: BookOpen,
      desc: 'Stocked with over 2,500 curriculum titles, reference encyclopedias, children fiction, educational periodicals, and daily newspapers.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800',
    },
    {
      title: 'Outdoor Sports Ground & Courts',
      icon: Trophy,
      desc: 'Expansive campus grounds dedicated for cricket pitch, volleyball court, badminton, 100m sprinting tracks, and morning yoga assemblies.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800',
    },
    {
      title: 'Safe GPS-Enabled Bus Fleet',
      icon: Bus,
      desc: 'Fleet of well-maintained school buses with trained drivers, dedicated attendants, speed limiters, and first-aid kits covering Koilakuntla and neighboring villages.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800',
    },
    {
      title: 'Reverse Osmosis (RO) Drinking Water',
      icon: Droplets,
      desc: 'Commercial-grade RO water purification plant tested periodically by public health authorities to supply safe mineral water across all floors.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800',
    },
    {
      title: 'Campus CCTV Surveillance & Security',
      icon: ShieldCheck,
      desc: '48 high-definition CCTV security cameras operating 24/7 across entry gates, corridors, and grounds with security staff maintaining strict visitor records.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800',
    },
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Campus & Facilities' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            World-Class Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Campus & Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            An 8+ acre safe, eco-friendly environment built to empower every learner.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        {/* Metric summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-50 border border-gray-200 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-school-navy-950">8,093 m²</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">Total Campus Area</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-school-navy-950">24 Rooms</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">Smart Classrooms</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-school-navy-950">48 Units</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">CCTV Surveillance</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-black font-serif text-school-navy-950">100 Mbps</p>
            <p className="text-xs text-gray-500 font-bold uppercase mt-1">Fiber Internet</p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-school-gold-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-school-gold-600">
                      <Icon className="w-5 h-5" />
                      <h3 className="font-serif font-bold text-base text-school-navy-950 leading-tight">
                        {fac.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed pt-1">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

