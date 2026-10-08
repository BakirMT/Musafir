import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HIJRI_METHODS,
  HijriCalculationMethodId,
  getHijriMonthGrid,
  ANNUAL_ISLAMIC_EVENTS,
} from '../services/hijriService';
import {
  Calendar as CalendarIcon,
  Moon,
  Sun,
  Globe2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Clock,
  Check,
  Star,
  CheckCircle2,
  Sliders,
  CalendarDays,
  X,
} from 'lucide-react';

interface HijriCalendarProps {
  className?: string;
  compact?: boolean;
}

export const HijriCalendar: React.FC<HijriCalendarProps> = ({
  className = '',
  compact = false,
}) => {
  const {
    hijriMethod,
    setHijriMethod,
    hijriDayAdjustment,
    setHijriDayAdjustment,
    hijriDateDetails,
    language,
    t,
  } = useApp();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [monthModalOpen, setMonthModalOpen] = useState(false);

  const activeMethod =
    HIJRI_METHODS.find((m) => m.id === hijriMethod) || HIJRI_METHODS[0];

  // Month grid for current Islamic month
  const monthDays = getHijriMonthGrid(
    hijriDateDetails.year,
    hijriDateDetails.month,
    hijriMethod,
    hijriDayAdjustment
  );

  const dayAdjustmentOptions = [-2, -1, 0, 1, 2];

  // Format month name based on user language
  const displayMonthName =
    language === 'ar'
      ? hijriDateDetails.monthNameAr
      : language === 'ml'
      ? hijriDateDetails.monthNameMl
      : hijriDateDetails.monthNameEn;

  const displayWeekday =
    language === 'ar'
      ? hijriDateDetails.dayOfWeekAr
      : language === 'ml'
      ? hijriDateDetails.dayOfWeekMl
      : hijriDateDetails.dayOfWeekEn;

  return (
    <div
      className={`rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all w-full max-w-full min-w-0 ${className}`}
    >
      {/* 1. Header Bar: Identity & Quick Actions */}
      <div className="p-2.5 sm:p-3.5 bg-gray-50/70 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <Moon className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C] shrink-0" />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
            {language === 'ar' ? 'التقويم الهجري' : language === 'ml' ? 'ഹിജ്‌റ കലണ്ടർ' : 'Islamic Calendar'}
          </span>
          <span className="text-[10px] text-gray-500 hidden sm:inline truncate">
            • {activeMethod.flag} {activeMethod.name.split('(')[0].trim()}
            {hijriDayAdjustment !== 0 && ` (${hijriDayAdjustment > 0 ? `+${hijriDayAdjustment}` : hijriDayAdjustment}d)`}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setMonthModalOpen(true)}
            className="px-2 sm:px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
          >
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3 text-[#0F5C4D] dark:text-[#C9A45C]" />
              <span>Month</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
              settingsOpen
                ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              <span>Regions</span>
            </span>
          </button>
        </div>
      </div>

      {/* 2. Main Dual Date Display Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
          {/* Islamic Hijri Date Card */}
          <div className="rounded-xl bg-[#0F5C4D] text-white p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] text-emerald-200 font-semibold mb-1">
                <span>Islamic Hijri</span>
                <span>{displayWeekday}</span>
              </div>

              <div className="text-2xl font-extrabold tracking-tight">
                {hijriDateDetails.day} {displayMonthName} {hijriDateDetails.year} AH
              </div>

              <div className="text-base font-arabic font-bold text-[#F2D785] mt-0.5">
                {hijriDateDetails.formattedAr}
              </div>
            </div>

            {hijriDateDetails.todayEvent ? (
              <div className="mt-3 pt-2 border-t border-white/20 text-xs text-amber-200 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{hijriDateDetails.todayEvent.titleEn}</span>
              </div>
            ) : (
              <div className="mt-3 pt-2 border-t border-white/20 text-[11px] text-emerald-200/80">
                Moonsighting calculation: {activeMethod.name.split('(')[0].trim()}
              </div>
            )}
          </div>

          {/* Gregorian Solar Calendar Card */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 font-semibold mb-1">
                <span>Gregorian Calendar</span>
                <span>Civil Standard</span>
              </div>

              <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>

              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-0.5">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-500">
              Synchronized solar day
            </div>
          </div>
        </div>

        {/* 3. Regional Calculation Switcher & Day Adjuster Drawer (Expandable) */}
        {settingsOpen && (
          <div className="mt-4 p-3.5 sm:p-5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/25 space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-2.5">
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                  <span>Select Regional Islamic Calculation Method</span>
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                  Match the moonsighting declaration of your country or regional committee
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="text-[11px] text-gray-500 hover:text-gray-700 font-bold self-end sm:self-auto"
              >
                Done
              </button>
            </div>

            {/* Regional Method Pills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {HIJRI_METHODS.map((method) => {
                const isSelected = hijriMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setHijriMethod(method.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm ring-2 ring-[#0F5C4D]/30'
                        : 'bg-white dark:bg-[#0D1C18] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold">
                        <span className="text-sm">{method.flag}</span>
                        <span>{method.name}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                      )}
                    </div>
                    <div
                      className={`text-[10px] mt-1 leading-snug line-clamp-2 ${
                        isSelected ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {method.description}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Manual Day Adjustment Pill Row (Crucial for local committee differences) */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Manual Moonsighting Day Offset:</span>
                </span>
                <p className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
                  Fine-tune by ±1 or ±2 days if your local mosque declared a different crescent sighting
                </p>
              </div>

              <div className="flex items-center gap-1 bg-white dark:bg-[#0D1C18] p-1 rounded-xl border border-gray-200 dark:border-gray-800 self-start sm:self-auto">
                {dayAdjustmentOptions.map((adj) => {
                  const isSelected = hijriDayAdjustment === adj;
                  const label = adj === 0 ? '0 (Exact)' : adj > 0 ? `+${adj}d` : `${adj}d`;
                  return (
                    <button
                      key={adj}
                      type="button"
                      onClick={() => setHijriDayAdjustment(adj)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        isSelected
                          ? 'bg-[#0F5C4D] text-white shadow-xs'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Complete Monthly Islamic Calendar Modal */}
      {monthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-xl w-full border border-[#0F5C4D]/25 dark:border-[#C9A45C]/35 shadow-2xl p-4 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {displayMonthName} {hijriDateDetails.year} AH
                  </span>
                  <span className="font-arabic font-bold text-sm text-[#C9A45C]">
                    ({hijriDateDetails.monthNameAr})
                  </span>
                </div>
                <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                  {activeMethod.name} • {hijriDayAdjustment !== 0 ? `Adjustment: ${hijriDayAdjustment}d` : 'Standard Sighting'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMonthModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Fasting & Sacred Badges explanation */}
            <div className="flex items-center gap-2 flex-wrap text-[10px] text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1 bg-amber-500/15 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold">
                <span>🌕 13, 14, 15</span>
                <span>White Days (Sunnah Fast)</span>
              </span>
              <span className="flex items-center gap-1 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                <span>🕌 Fri</span>
                <span>Jumu'ah Prayer</span>
              </span>
            </div>

            {/* Days Grid: 7 Column Table */}
            <div className="space-y-1">
              {/* Weekday Header */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-gray-500 uppercase tracking-wider py-1 border-b border-gray-200 dark:border-gray-800">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span className="text-[#0F5C4D] dark:text-[#C9A45C]">Fri</span>
                <span>Sat</span>
              </div>

              {/* Day cells grid */}
              <div className="grid grid-cols-7 gap-1 pt-1">
                {/* Pad leading days of the week */}
                {monthDays.length > 0 &&
                  Array.from({ length: monthDays[0].dayOfWeekIndex }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="min-h-[44px] rounded-xl bg-gray-50/50 dark:bg-black/10 border border-transparent"
                    />
                  ))}

                {monthDays.map((cell) => {
                  return (
                    <div
                      key={`h-${cell.hijriDay}`}
                      className={`min-h-[48px] p-1 rounded-xl border flex flex-col justify-between transition-all text-center relative ${
                        cell.isToday
                          ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm font-bold ring-2 ring-[#C9A45C]/50'
                          : cell.isWhiteDay
                          ? 'bg-amber-500/10 dark:bg-amber-950/30 border-amber-400/40 text-amber-950 dark:text-amber-100'
                          : cell.isFriday
                          ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-400/30 text-gray-800 dark:text-gray-200'
                          : 'bg-white dark:bg-[#071310] border-gray-100 dark:border-gray-850 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[9px] px-0.5">
                        <span className={`font-black text-xs ${cell.isToday ? 'text-white' : cell.isWhiteDay ? 'text-amber-600 dark:text-amber-400' : ''}`}>
                          {cell.hijriDay}
                        </span>
                        {cell.isWhiteDay && (
                          <span title="White Day Sunnah Fast" className="text-[8px]">
                            🌕
                          </span>
                        )}
                        {cell.event && (
                          <Star className="w-2.5 h-2.5 text-[#C9A45C] shrink-0" />
                        )}
                      </div>

                      <div className={`text-[8px] font-mono leading-none ${cell.isToday ? 'text-white/80' : 'text-gray-400 dark:text-gray-500'}`}>
                        {cell.gregorianDay} {cell.gregorianMonthName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Significant Events for This Month */}
            <div className="p-3 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="text-[11px] font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Islamic Milestones in {displayMonthName}:</span>
              </span>
              <p className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
                {hijriDateDetails.isSacredMonth
                  ? `${displayMonthName} is one of the four Sacred Months (Al-Ashhur Al-Hurum) in which good deeds are multiplied in reward.`
                  : `Voluntary fasting is strongly recommended on the White Days (13th, 14th, and 15th of ${displayMonthName}) when the moon is full.`}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setMonthModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold shadow-md shadow-[#0F5C4D]/25"
            >
              Close Calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
