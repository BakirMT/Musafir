import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ISLAMIC_TRAVEL_DUAS } from '../services/duasData';
import { DuaItem } from '../types';
import {
  BookOpen,
  Copy,
  Check,
  Share2,
  Bookmark,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const IslamicGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'duas' | 'salah'>('duas');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);
  const [favoriteDuaIds, setFavoriteDuaIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('musafir_fav_duas');
    return saved ? JSON.parse(saved) : ['dua-1'];
  });

  const categories = [
    'All',
    'Boarding Transport',
    'Before Journey',
    'Entering a City',
    'Returning Home',
  ];

  const filteredDuas =
    activeCategory === 'All'
      ? ISLAMIC_TRAVEL_DUAS
      : ISLAMIC_TRAVEL_DUAS.filter((d) => d.category === activeCategory);

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.title}\n\nArabic: ${dua.arabic}\n\nTransliteration: ${dua.transliteration}\n\nEnglish: ${dua.english}\n\nMalayalam: ${dua.malayalam}\n\nReference: ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedDuaId(dua.id);
    setTimeout(() => setCopiedDuaId(null), 2000);
  };

  const handleShare = async (dua: DuaItem) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n"${dua.english}"\n\nReference: ${dua.reference} via Musafir`;
    if (navigator.share) {
      try {
        await navigator.share({ title: dua.title, text });
      } catch {
        handleCopy(dua);
      }
    } else {
      handleCopy(dua);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavoriteDuaIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id];
      localStorage.setItem('musafir_fav_duas', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <BookOpen className="w-4 h-4" />
            <span>Sacred Journey Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Travel Duas & Salah Guide
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Authentic supplications and juristic rules for prayers on journeys
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('duas')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'duas'
                ? 'bg-[#0F5C4D] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Travel Duas (الأدعية)
          </button>
          <button
            onClick={() => setActiveTab('salah')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'salah'
                ? 'bg-[#0F5C4D] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Traveller Salah (Qasr & Jama')
          </button>
        </div>
      </div>

      {activeTab === 'duas' ? (
        /* DUAS SECTION */
        <div className="space-y-5">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dua Cards List */}
          <div className="space-y-4">
            {filteredDuas.map((dua) => (
              <div
                key={dua.id}
                className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4 relative overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C]">
                      {dua.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                      {dua.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFavorite(dua.id)}
                      title="Favorite Dua"
                      className="p-2 rounded-xl text-gray-400 hover:text-[#0F5C4D] transition-colors"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          favoriteDuaIds.includes(dua.id) ? 'fill-[#C9A45C] text-[#C9A45C]' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => handleShare(dua)}
                      title="Share Dua"
                      className="p-2 rounded-xl text-gray-400 hover:text-[#0F5C4D] transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(dua)}
                      title="Copy Dua"
                      className="p-2 rounded-xl text-gray-400 hover:text-[#0F5C4D] transition-colors"
                    >
                      {copiedDuaId === dua.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Script Display with RTL and Noto Naskh font */}
                <div
                  dir="rtl"
                  className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-right leading-[2.2] text-xl sm:text-2xl font-arabic font-bold text-[#0F5C4D] dark:text-[#E8DCC2]"
                >
                  {dua.arabic}
                </div>

                {/* Transliteration */}
                <div>
                  <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
                    Transliteration
                  </span>
                  <p className="text-xs italic text-gray-700 dark:text-gray-300 font-medium mt-0.5 leading-relaxed">
                    "{dua.transliteration}"
                  </p>
                </div>

                {/* English Translation */}
                <div>
                  <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
                    English Meaning
                  </span>
                  <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed mt-0.5">
                    {dua.english}
                  </p>
                </div>

                {/* Malayalam Translation (മലയാളം അർത്ഥം) */}
                <div className="pt-1 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-bold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                    മലയാളം അർത്ഥം (Malayalam Translation)
                  </span>
                  <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed mt-0.5 font-medium">
                    {dua.malayalam}
                  </p>
                </div>

                {/* Authentic Reference Footer */}
                <div className="pt-2 text-[11px] text-[#6B756F] dark:text-[#9AA9A2] flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    📜 Reference: {dua.reference}
                  </span>
                  {dua.context && <span className="italic hidden sm:inline">{dua.context}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TRAVELLER SALAH GUIDE (Requirement 20) */
        <div className="space-y-5">
          {/* Mandatory Scholarly Warning Notice */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold text-sm block mb-1">
                Juristic Educational Notice
              </strong>
              This content is provided strictly for educational purposes and should not replace
              consultation with a qualified Islamic scholar or local religious authority for your
              specific journey circumstance.
            </div>
          </div>

          {/* Guide Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Qasr (Shortening Prayers) */}
            <div className="rounded-3xl p-5 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] flex items-center justify-center font-black">
                قصر
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                1. Shortening (Qasr)
              </h3>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
                While on a legitimate journey beyond the city perimeter, the 4-rak'ah obligatory prayers
                are shortened to **2 rak'ahs**:
              </p>
              <ul className="text-xs space-y-1 text-gray-800 dark:text-gray-200 list-disc pl-4">
                <li>
                  <strong>Dhuhr:</strong> Shortened from 4 to 2 rak'ahs
                </li>
                <li>
                  <strong>Asr:</strong> Shortened from 4 to 2 rak'ahs
                </li>
                <li>
                  <strong>Isha:</strong> Shortened from 4 to 2 rak'ahs
                </li>
                <li>
                  <strong>Fajr (2) & Maghrib (3):</strong> Never shortened under any circumstance
                </li>
              </ul>
              <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                Source: Sahih al-Bukhari (1081), Sahih Muslim (686)
              </div>
            </div>

            {/* Jama' (Combining Prayers) */}
            <div className="rounded-3xl p-5 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-[#C9A45C] flex items-center justify-center font-black">
                جمع
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                2. Combining (Jama')
              </h3>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
                Permissible to combine two prayers due to travel hardship:
              </p>
              <ul className="text-xs space-y-1 text-gray-800 dark:text-gray-200 list-disc pl-4">
                <li>
                  <strong>Dhuhr with Asr:</strong> Either in the time of Dhuhr (Taqdim) or delayed to Asr (Ta'khir).
                </li>
                <li>
                  <strong>Maghrib with Isha:</strong> In the time of Maghrib (Taqdim) or delayed to Isha (Ta'khir).
                </li>
                <li>
                  <strong>Fajr:</strong> Standalone, cannot be combined with any other prayer.
                </li>
                <li>
                  <em>Note:</em> The Hanafi school generally restricts combining in time to Arafah and Muzdalifah during Hajj, permitting apparent combining (Jama' Suri) during other travels.
                </li>
              </ul>
              <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                Source: Sahih Muslim (704)
              </div>
            </div>

            {/* Travel Distance & Stay Duration */}
            <div className="rounded-3xl p-5 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                3. Qualifying Distance & Duration
              </h3>
              <div className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Distance:</strong> Classical consensus approximates the minimum travel distance
                  as 4 Marhalahs, roughly <strong>48 miles (~77 to 81 kilometers)</strong> beyond your hometown city boundary.
                </p>
                <p>
                  <strong>Intended Stay Duration:</strong>
                </p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>
                    <strong>Majority (Shafi'i, Maliki, Hanbali):</strong> If you intend to stay less than <strong>4 full days</strong> (excluding entry & exit days), you pray as a traveller.
                  </li>
                  <li>
                    <strong>Hanafi school:</strong> If you intend to stay less than <strong>15 days</strong>, you retain traveller status.
                  </li>
                </ul>
              </div>
            </div>

            {/* Sunnah Prayers & Flight Etiquette */}
            <div className="rounded-3xl p-5 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                4. Sunnah Prayers & In-Flight Wudu
              </h3>
              <div className="text-xs text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Sunnah Salah:</strong> While traveling, the Prophet (ﷺ) omitted regular rawatib sunnahs to relieve hardship, with two cherished exceptions: the <strong>2 Sunnah of Fajr</strong> and the <strong>Witr prayer</strong>.
                </p>
                <p>
                  <strong>Praying on Airplanes:</strong> If standing and facing Qibla is possible, do so. If not, pray in your seat facing available direction. For wudu, carry a small spray bottle or seek clean water sparingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
