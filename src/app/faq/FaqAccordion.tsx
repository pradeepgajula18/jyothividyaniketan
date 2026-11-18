'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/types';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface Props {
  items: FAQItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))];

  const filtered = selectedCat === 'All' ? items : items.filter(i => i.category === selectedCat);

  return (
    <div className="space-y-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-gray-100">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 mr-2">
          Category:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
              selectedCat === cat
                ? 'bg-school-navy-800 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion Items */}
      <div className="space-y-4">
        {filtered.map(faq => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-school-gold-400 bg-school-navy-50/40 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id || null)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-school-gold-600 shrink-0 mt-0.5" />
                  <span className="font-serif font-bold text-base sm:text-lg text-school-navy-950">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-school-navy-900' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100/80 pt-4">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

