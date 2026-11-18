'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
  const fullItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  // Schema.org BreadcrumbList JSON-LD
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.jyothividyaniketan.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="bg-school-navy-50/70 border-b border-school-navy-100 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-600">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <Link
                    href="/"
                    className="flex items-center gap-1 font-medium text-school-navy-800 hover:text-school-gold-600 transition-colors"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </Link>
                ) : isLast ? (
                  <span className="font-semibold text-school-navy-950 truncate max-w-[200px] sm:max-w-md" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href || '#'}
                    className="font-medium text-school-navy-700 hover:text-school-gold-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </nav>
    </>
  );
}

