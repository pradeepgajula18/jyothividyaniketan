'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, X, KeyRound, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPinModal({ isOpen, onClose }: Props) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      setError('Please enter the administrator PIN');
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
        onClose();
        router.push('/admin');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Modal Top */}
        <div className="bg-gradient-to-br from-school-navy-950 via-school-navy-900 to-school-navy-800 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close PIN modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-school-gold-500/20 border border-school-gold-400/40 flex items-center justify-center text-school-gold-400 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-serif tracking-tight">Staff & Administrator Access</h3>
          <p className="text-xs text-school-navy-200 mt-1">
            Protected school management portal
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Masked PIN Display */}
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4, 5].map(idx => (
              <div
                key={idx}
                className={`w-9 h-11 rounded-lg border-2 flex items-center justify-center text-lg font-bold transition-all ${
                  idx < pin.length
                    ? 'border-school-navy-800 bg-school-navy-50 text-school-navy-900'
                    : 'border-gray-200 bg-gray-50 text-gray-300'
                }`}
              >
                {idx < pin.length ? '●' : ''}
              </div>
            ))}
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 mb-5 max-w-[240px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                type="button"
                key={num}
                onClick={() => handleKeyClick(num)}
                className="h-11 rounded-xl bg-gray-100 hover:bg-school-navy-100 active:bg-school-navy-200 text-gray-800 font-semibold text-lg transition-colors flex items-center justify-center select-none"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider transition-colors select-none"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeyClick('0')}
              className="h-11 rounded-xl bg-gray-100 hover:bg-school-navy-100 active:bg-school-navy-200 text-gray-800 font-semibold text-lg transition-colors select-none"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wider transition-colors select-none"
            >
              Del
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || pin.length === 0}
            className="w-full py-3 px-4 rounded-xl bg-school-navy-800 hover:bg-school-navy-900 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-school-navy-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
        </form>
      </div>
    </div>
  );
}

