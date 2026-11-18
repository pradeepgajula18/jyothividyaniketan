import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { dataService } from '@/lib/data/service';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Send
} from 'lucide-react';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Jyothi Vidya Niketan E.M. High School Koilakuntla',
  description:
    'Contact Jyothi Vidya Niketan E.M. High School on Jammalamadugu Road, Koilakuntla, Andhra Pradesh (518134). Phone: +91 7997999863 / 64. Email: jyothividyaniketan@gmail.com.',
  alternates: {
    canonical: 'https://www.jyothividyaniketan.com/contact-us',
  },
};

export default async function ContactUsPage() {
  const settings = await dataService.getSiteSettings();

  return (
    <div className="bg-white">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <section className="bg-school-navy-950 text-white py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-school-gold-400">
            Reach Out to Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Contact & Campus Location
          </h1>
          <p className="text-xs sm:text-sm text-school-navy-200">
            We welcome visits from parents, educational authorities, and prospective students.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Address */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-school-navy-800 text-school-gold-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Campus Address</h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {settings.address}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-school-navy-800 hover:text-school-gold-600 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Helplines */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-school-navy-800 text-school-gold-400 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Telephone Helpline</h3>
              <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                <p>
                  <strong>Primary:</strong> <a href={`tel:${settings.primary_phone}`} className="hover:underline">{settings.primary_phone}</a>
                </p>
                <p>
                  <strong>Secondary:</strong> <a href={`tel:${settings.secondary_phone}`} className="hover:underline">{settings.secondary_phone}</a>
                </p>
                <p className="text-gray-500 text-xs pt-1">Mon–Sat: 8:30 AM to 5:00 PM</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 3: Email & Online */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-school-navy-800 text-school-gold-400 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-school-navy-950">Email Inquiries</h3>
              <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                <p>
                  <a href={`mailto:${settings.primary_email}`} className="hover:underline">{settings.primary_email}</a>
                </p>
                <p>
                  <a href={`mailto:${settings.secondary_email}`} className="hover:underline">{settings.secondary_email}</a>
                </p>
                <p className="text-gray-500 text-xs pt-1">Official CBSE Communication Portal</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <span className="text-xs font-semibold text-school-gold-700">
                CBSE School Code: 57218
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form & Google Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-school-gold-600">
                Send Us a Message
              </span>
              <h2 className="text-2xl font-bold font-serif text-school-navy-950">
                Get in Touch with Administration
              </h2>
            </div>
            <ContactForm />
          </div>

          {/* Map Preview & Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-slate-100 h-80 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.60635467362!2d78.307993!3d15.226388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5a201c10d32f7%3A0x6b772c9a92440317!2sKoilkuntla%2C%20Andhra%20Pradesh%20518134!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jyothi Vidya Niketan Location on Google Maps"
                className="w-full h-full"
              />
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-3 text-xs sm:text-sm text-gray-700">
              <h3 className="font-bold text-school-navy-950 font-serif">Campus Visiting Guidelines</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Parents are encouraged to schedule an appointment with our admissions coordinator or Principal prior to visiting. Please carry a valid identity proof at the reception desk for campus security clearance.
              </p>
              <div className="pt-2">
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-school-gold-400" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

