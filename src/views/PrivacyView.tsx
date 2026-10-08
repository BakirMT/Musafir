import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, MapPin, EyeOff, Database, ArrowLeft } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('profile')}
          className="p-2 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <ShieldCheck className="w-4 h-4" />
            <span>Ethical Data Principles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Privacy & Data Ethics
          </h1>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
            1. Purpose-Bound Location Access
          </h3>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            Your GPS coordinates are used exclusively on your local device to calculate solar prayer angles and the geodesic heading toward the Holy Kaaba. We never track or build behavioral movement profiles.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
            2. No Forced Authentication
          </h3>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            A traveller in transit should never be blocked from finding the Qibla or prayer times by login screens or intrusive account registration. Core worship utilities are 100% accessible immediately.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/30 text-teal-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
            3. Local Storage Sovereignity
          </h3>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            Your itineraries, packing checklists, bookmarked places, and expenses live directly in your browser's encrypted LocalStorage / IndexedDB. You can export or erase this information with a single tap.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
            4. Zero Ad-Tracking Telemetry
          </h3>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            Musafir does not sell user travel plans or sell ad real estate to third-party ad networks. We believe Muslim travel companions should foster tranquility and trust.
          </p>
        </div>
      </div>
    </div>
  );
};
