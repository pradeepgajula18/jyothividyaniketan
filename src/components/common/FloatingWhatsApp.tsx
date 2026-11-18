'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Props {
  phoneNumber?: string;
  defaultMessage?: string;
  enabled?: boolean;
}

export default function FloatingWhatsApp({
  phoneNumber = '+917997999863',
  defaultMessage = 'Hello! I would like to enquire about admissions at Jyothi Vidya Niketan E.M. High School.',
  enabled = true,
}: Props) {
  if (!enabled || !phoneNumber) return null;

  // Clean phone number for WhatsApp url
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <aside aria-label="WhatsApp Contact Help" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-105"
        aria-label="Chat with school admissions on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline font-semibold text-sm tracking-wide">
          Enquire on WhatsApp
        </span>
      </a>
    </aside>
  );
}

