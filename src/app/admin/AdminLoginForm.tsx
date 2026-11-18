'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, KeyRound, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminLoginForm() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter your administrator PIN');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.refresh();
      } else {
        setError(data.error || 'Invalid administrator security PIN');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyClick = (val: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + val);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-navy-950 via-school-navy-900 to-school-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-school-gold-200/50">
        {/* Header */}
        <div className="bg-school-navy-950 p-8 text-center text-white space-y-3 relative">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-1 flex items-center justify-center shadow-lg">
            <Image
              src="/images/logo.png"
              alt="Jyothi Vidya Niketan Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif">Jyothi Vidya Niketan</h1>
            <p className="text-xs text-school-gold-400 font-semibold mt-0.5">
              Administrator CMS • CBSE Affiliation No: 130603
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-base font-bold text-school-navy-950">Security Access Required</h2>
            <p className="text-xs text-gray-500">
              Enter the 6-digit administrator PIN to manage school records and website content.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Masked PIN Display */}
          <div className="flex justify-center gap-2.5">
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <div
                key={idx}
                className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                  idx < pin.length
                    ? 'border-school-navy-800 bg-school-navy-50 text-school-navy-900 shadow-sm'
                    : 'border-gray-200 bg-gray-50 text-gray-300'
                }`}
              >
                {idx < pin.length ? '●' : ''}
              </div>
            ))}
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                type="button"
                key={num}
                onClick={() => handleKeyClick(num)}
                className="h-12 rounded-xl bg-gray-100 hover:bg-school-navy-100 active:bg-school-navy-200 text-gray-800 font-bold text-lg transition-colors select-none"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="h-12 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider transition-colors select-none"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('0')}
              className="h-12 rounded-xl bg-gray-100 hover:bg-school-navy-100 active:bg-school-navy-200 text-gray-800 font-bold text-lg transition-colors select-none"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="h-12 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider transition-colors select-none"
            >
              Del
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || pin.length === 0}
            className="w-full py-3.5 px-6 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 active:scale-[0.99] text-white font-bold text-sm shadow-xl shadow-school-navy-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-school-gold-400" />
                <span>Verify & Enter Dashboard</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-school-navy-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

