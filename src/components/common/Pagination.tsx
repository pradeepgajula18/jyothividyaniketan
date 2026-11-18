'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  itemName?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  itemName = 'records',
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalRecords === 0 || totalPages <= 1) {
    if (totalRecords > 0) {
      return (
        <div className="py-6 text-center text-sm text-gray-500 font-medium">
          Showing all {totalRecords} {itemName}
        </div>
      );
    }
    return null;
  }

  // Calculate current range
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  // Helper to create page link preserving existing search params (e.g. category, search, grade)
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (pageNumber === 1) {
      params.delete('page');
    } else {
      params.set('page', pageNumber.toString());
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  // Generate page numbers array (with ellipsis if large)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 mt-8">
      {/* Range Display */}
      <div className="text-sm text-gray-600 font-medium">
        Showing <span className="font-semibold text-school-navy-950">{startRecord}</span>–
        <span className="font-semibold text-school-navy-950">{endRecord}</span> of{' '}
        <span className="font-semibold text-school-navy-950">{totalRecords}</span> {itemName}
      </div>

      {/* Numbered Controls */}
      <nav aria-label="Pagination" className="flex items-center gap-1 sm:gap-2">
        {/* Previous Button */}
        {currentPage <= 1 ? (
          <span
            aria-disabled="true"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-gray-300 bg-gray-50 border border-gray-200 cursor-not-allowed select-none"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </span>
        ) : (
          <Link
            href={createPageUrl(currentPage - 1)}
            aria-label="Previous page"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-school-navy-800 bg-white border border-gray-300 hover:bg-school-navy-50 hover:border-school-navy-300 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        )}

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 py-1 text-gray-400 select-none">
                  …
                </span>
              );
            }
            const pageNum = Number(p);
            const isCurrent = pageNum === currentPage;

            return isCurrent ? (
              <span
                key={pageNum}
                aria-current="page"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-bold rounded-lg bg-school-navy-800 text-white shadow-md shadow-school-navy-900/20 select-none"
              >
                {pageNum}
              </span>
            ) : (
              <Link
                key={pageNum}
                href={createPageUrl(pageNum)}
                aria-label={`Page ${pageNum}`}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-school-navy-50 hover:border-school-navy-300 transition-colors shadow-sm"
              >
                {pageNum}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        {currentPage >= totalPages ? (
          <span
            aria-disabled="true"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-gray-300 bg-gray-50 border border-gray-200 cursor-not-allowed select-none"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        ) : (
          <Link
            href={createPageUrl(currentPage + 1)}
            aria-label="Next page"
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg text-school-navy-800 bg-white border border-gray-300 hover:bg-school-navy-50 hover:border-school-navy-300 transition-colors shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </nav>
    </div>
  );
}

