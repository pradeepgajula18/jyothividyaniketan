import Link from 'next/link';
import { Home, ArrowLeft, Search, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-gray-50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-school-navy-50 flex items-center justify-center text-school-navy-800 font-serif font-black text-3xl">
          404
        </div>
        <div>
          <h2 className="text-2xl font-bold font-serif text-school-navy-950">Page Not Found</h2>
          <p className="text-sm text-gray-600 mt-2">
            The page you are looking for may have been moved or is currently unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 text-white font-semibold text-sm shadow-md transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/contact-us"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Help</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

