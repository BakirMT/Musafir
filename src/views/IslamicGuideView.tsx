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
  Volume2,
  Search,
  CheckCircle2,
  Compass,
  Plane,
  Clock,
  ArrowRight,
  Info,
} from 'lucide-react';

export const IslamicGuideView: React.FC = () => {
  const { setActiveTab: setAppTab, language } = useApp();
  const [activeTab, setActiveTab] = useState<'duas' | 'salah'>('duas');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);
  const [speakingDuaId, setSpeakingDuaId] = useState<string | null>(null);
  const [activeSalahSection, setActiveSalahSection] = useState<'qasr' | 'jama' | 'sunnah-safar' | 'plane-rules' | 'duration'>('sunnah-safar');

  const [favoriteDuaIds, setFavoriteDuaIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('musafir_fav_duas');
    return saved ? JSON.parse(saved) : ['dua-1', 'dua-2'];
  });

  const categories = [
    'All',
    'Before Journey',
    'Boarding Transport',
    'En Route',
    'Entering a City',
    'Farewell & Family',
    'Returning Home',
  ];

  const filteredDuas = ISLAMIC_TRAVEL_DUAS.filter((d) => {
    const matchesCat = activeCategory === 'All' || d.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      d.title.toLowerCase().includes(query) ||
      d.transliteration.toLowerCase().includes(query) ||
      d.english.toLowerCase().includes(query) ||
      d.malayalam.toLowerCase().includes(query) ||
      d.reference.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const handleCopy = (dua: DuaItem) => {
    const text = `${dua.title}\n\nArabic:\n${dua.arabic}\n\nTransliteration:\n"${dua.transliteration}"\n\nEnglish:\n${dua.english}\n\nMalayalam:\n${dua.malayalam}\n\nReference: ${dua.reference} via Musafir Pro`;
    navigator.clipboard.writeText(text);
    setCopiedDuaId(dua.id);
    setTimeout(() => setCopiedDuaId(null), 2000);
  };

  const handleSpeakArabic = (dua: DuaItem) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingDuaId === dua.id) {
      window.speechSynthesis.cancel();
      setSpeakingDuaId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(dua.arabic);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85;
    utterance.onend = () => setSpeakingDuaId(null);
    utterance.onerror = () => setSpeakingDuaId(null);
    setSpeakingDuaId(dua.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async (dua: DuaItem) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n"${dua.english}"\n\nReference: ${dua.reference} via Musafir Pro`;
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
    <div className="max-w-5xl mx-auto space-y-6 pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C9A45C]">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'ml' ? 'യാത്രാ ദിക്റുകൾ & നമസ്കാര മാർഗ്ഗരേഖ' : 'Sacred Journey Supplications & Salah'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 mt-1">
            {language === 'ml' ? 'യാത്രാ ദുആകളും നമസ്കാര നിയമങ്ങളും' : 'Travel Duas & Salah Guide'}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B756F] dark:text-[#9AA9A2] mt-0.5">
            {language === 'ml'
              ? 'സ്വഹീഹായ ഹദീസുകളിൽ നിന്നുള്ള യാത്രാ പ്രാർത്ഥനകളും ശാഫിഈ ഫിഖ്ഹ് പ്രകാരമുള്ള ഖസ്വ്‌ർ, ജംഅ്, യാത്രാ സുന്നത്ത് നമസ്കാര വിധികൾ.'
              : 'Authentic prophetic supplications and comprehensive Shafi\'i Fiqh rulings for traveler prayers (Qasr, Jama\', and Salat al-Safar).'}
          </p>
        </div>

        {/* Section Switcher Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('duas')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'duas'
                ? 'bg-[#0F5C4D] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ml' ? 'യാത്രാ ദുആകൾ' : 'Travel Duas (الأدعية)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('salah')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'salah'
                ? 'bg-[#0F5C4D] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'ml' ? 'യാത്രാ നമസ്കാരം (ഖസ്വ്‌ർ & ജംഅ്)' : 'Traveller Salah (Qasr & Jama\')'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: TRAVEL DUAS                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'duas' ? (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Search and Category Filter Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ml'
                    ? 'യാത്രാ ദുആകൾ, മലയാളം അർത്ഥം അല്ലെങ്കിൽ അറബിക് തിരയുക...'
                    : 'Search travel duas, English meaning, transliteration, or occasions...'
                }
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-[#0F5C4D] text-white shadow-sm font-black'
                      : 'bg-[#F7F5EF] dark:bg-[#071310] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dua Cards List */}
          <div className="space-y-4">
            {filteredDuas.map((dua) => (
              <div
                key={dua.id}
                className="rounded-3xl p-5 sm:p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4 relative overflow-hidden hover:border-[#0F5C4D]/40 transition-all"
              >
                {/* Card Header */}
                <div className="flex items-start sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] border border-[#0F5C4D]/20">
                      {dua.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-gray-100">
                      {dua.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleSpeakArabic(dua)}
                      title="Listen Arabic Pronunciation"
                      className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-colors"
                    >
                      <Volume2 className={`w-4 h-4 ${speakingDuaId === dua.id ? 'text-emerald-500 animate-pulse' : ''}`} />
                    </button>
                    <button
                      onClick={() => toggleFavorite(dua.id)}
                      title="Favorite Dua"
                      className="p-2 rounded-xl text-gray-400 hover:text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-colors"
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
                      className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopy(dua)}
                      title="Copy Dua"
                      className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-[#0F5C4D] hover:bg-[#0F5C4D]/10 transition-colors"
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
                  className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-right leading-[2.2] text-xl sm:text-2xl font-arabic font-bold text-[#0F5C4D] dark:text-[#E8DCC2] shadow-inner"
                >
                  {dua.arabic}
                </div>

                {/* Transliteration */}
                <div>
                  <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
                    Transliteration (ഉച്ചാരണം)
                  </span>
                  <p className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 font-serif mt-0.5 leading-relaxed">
                    "{dua.transliteration}"
                  </p>
                </div>

                {/* English Translation */}
                <div>
                  <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
                    English Meaning
                  </span>
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed mt-0.5">
                    {dua.english}
                  </p>
                </div>

                {/* Malayalam Translation (മലയാളം അർത്ഥം) */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] font-bold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                    മലയാളം അർത്ഥം (Malayalam Translation)
                  </span>
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed mt-0.5 font-medium">
                    {dua.malayalam}
                  </p>
                </div>

                {/* Authentic Reference Footer */}
                <div className="pt-2 text-[11px] text-[#6B756F] dark:text-[#9AA9A2] flex flex-col sm:flex-row sm:items-center justify-between border-t border-gray-100 dark:border-gray-800 gap-1">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    📜 Reference: {dua.reference}
                  </span>
                  {dua.context && <span className="italic text-gray-500">{dua.context}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* SECTION 2: TRAVELLER SALAH GUIDE & SUNNAHS (QASR, JAMA', SUNNAH SAFAR)   */
        /* ========================================================================= */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sub Navigation Bar for Salah Rulings */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <button
              onClick={() => setActiveSalahSection('sunnah-safar')}
              className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-black text-center transition-all ${
                activeSalahSection === 'sunnah-safar'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              🕌 {language === 'ml' ? 'യാത്രാ സുന്നത്ത് നമസ്കാരം' : 'Salat al-Safar (Sunnah)'}
            </button>

            <button
              onClick={() => setActiveSalahSection('qasr')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-black text-center transition-all ${
                activeSalahSection === 'qasr'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              ✂️ {language === 'ml' ? 'ഖസ്വ്‌ർ (ചുരുക്കൽ)' : 'Qasr (Shortening)'}
            </button>

            <button
              onClick={() => setActiveSalahSection('jama')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-black text-center transition-all ${
                activeSalahSection === 'jama'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              ⏱️ {language === 'ml' ? 'ജംഅ് (ചേർക്കൽ)' : 'Jama\' (Combining)'}
            </button>

            <button
              onClick={() => setActiveSalahSection('plane-rules')}
              className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-black text-center transition-all ${
                activeSalahSection === 'plane-rules'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              ✈️ {language === 'ml' ? 'വിമാനത്തിലും ട്രെയിനിലും' : 'Flight & Transit Salah'}
            </button>

            <button
              onClick={() => setActiveSalahSection('duration')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-black text-center transition-all ${
                activeSalahSection === 'duration'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              📅 {language === 'ml' ? 'ദൂരവും കാലാവധിയും' : 'Duration (4-Day Rule)'}
            </button>
          </div>

          {/* 1. SALAT AL-SAFAR (Sunnah Travel Prayer) */}
          {activeSalahSection === 'sunnah-safar' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F5C4D] text-[#C9A45C] flex items-center justify-center font-black">
                    سفر
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                      {language === 'ml' ? 'യാത്രയുടെ സുന്നത്ത് നമസ്കാരം (സ്വലാത്തുസ്സഫർ)' : 'Salat al-Safar: Sunnah Prayers of Journey'}
                    </h3>
                    <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                      Sunnah Mu\'akkadah according to the Shafi\'i school before leaving home & upon returning
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Before Leaving Home */}
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2.5">
                    <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                      1. Before Departing From Home (വീട്ടിൽ നിന്ന് ഇറങ്ങുമ്പോൾ)
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {language === 'ml'
                        ? 'യാത്ര പുറപ്പെടുന്നതിന് തൊട്ടുമുമ്പ് വീട്ടിൽ വെച്ച് 2 റക്അത്ത് സുന്നത്ത് നമസ്കരിക്കൽ വലിയ സുന്നത്താണ്. ഒന്നാം റക്അത്തിൽ സൂറത്തുൽ കാഫിറൂനും രണ്ടാം റക്അത്തിൽ സൂറത്തുൽ ഇഖ്‌ലാസും ഓതുക.'
                        : 'Pray 2 Rak\'ahs Sunnah at home prior to departure. Recite Surah al-Kafirun in the 1st Rak\'ah and Surah al-Ikhlas in the 2nd Rak\'ah after Surah al-Fatihah.'}
                    </p>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] text-xs font-mono space-y-1">
                      <div className="font-bold text-[#0F5C4D] dark:text-[#C9A45C]">Niyyah (നിയ്യത്ത്):</div>
                      <div dir="rtl" className="font-arabic font-bold text-sm text-gray-900 dark:text-gray-100">
                        أُصَلِّي سُنَّةَ السَّفَرِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى
                      </div>
                      <div className="italic text-[11px] text-gray-600 dark:text-gray-400">
                        "Ussalli Sunnatas-Safari Rak'atayni Lillahi Ta'ala"
                      </div>
                    </div>
                  </div>

                  {/* Upon Returning Home */}
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2.5">
                    <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                      2. Upon Returning to Hometown (യാത്ര കഴിഞ്ഞ് തിരിച്ചെത്തുമ്പോൾ)
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {language === 'ml'
                        ? 'യാത്ര കഴിഞ്ഞ് നാട്ടിൽ തിരിച്ചെത്തുമ്പോൾ വീട്ടിൽ കയറുന്നതിന് മുമ്പ് അടുത്തുള്ള പള്ളിയിൽ കയറി 2 റക്അത്ത് നമസ്കരിക്കൽ തിരുനബി ﷺ യുടെ സ്ഥിരമായ സുന്നത്താണ്.'
                        : 'When returning from a journey, the Prophet (ﷺ) would not enter his home until he first entered the local masjid and prayed 2 Rak\'ahs of gratitude.'}
                    </p>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] text-xs font-mono space-y-1">
                      <div className="font-bold text-[#0F5C4D] dark:text-[#C9A45C]">Hadith Reference:</div>
                      <div className="text-[11px] text-gray-700 dark:text-gray-300">
                        Sahih al-Bukhari (3088), Sahih Muslim (715) via Ka'b ibn Malik (RA).
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. QASR (Shortening) */}
          {activeSalahSection === 'qasr' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F5C4D] text-[#C9A45C] flex items-center justify-center font-black">
                    قصر
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                      {language === 'ml' ? 'നമസ്കാരം ചുരുക്കൽ (ഖസ്വ്‌ർ)' : 'Qasr: Shortening 4-Rak\'ah Prayers to 2'}
                    </h3>
                    <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                      Dhuhr, Asr, and Isha are shortened to 2 Rak\'ahs during long legitimate travel
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div className="font-bold text-sm">
                    {language === 'ml' ? 'ഖസ്വ്‌റാക്കാനുള്ള 7 ശർത്വുകൾ (ഷാഫിഈ ഫിഖ്ഹ്):' : '7 Essential Conditions for Qasr (Shafi\'i Fiqh):'}
                  </div>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>
                      <strong>Distance:</strong> Travel distance must be at least 2 Marhalahs (approx. <strong>81 km / 50 miles</strong>).
                    </li>
                    <li>
                      <strong>Legitimate Purpose:</strong> The journey must not be for a sinful objective (Safar Mubah / Ta\'ah).
                    </li>
                    <li>
                      <strong>Crossing City Limits:</strong> Qasr starts ONLY after crossing your hometown city boundary (Binyan).
                    </li>
                    <li>
                      <strong>Niyyah at Takbeer:</strong> Intention to shorten must be made concurrently with Takbeerat al-Ihram.
                    </li>
                    <li>
                      <strong>Not Following a Resident Imam:</strong> A traveler cannot shorten behind an Imam praying 4 Rak\'ahs (Muqeem).
                    </li>
                    <li>
                      <strong>No 4-Rak\'ah Prayers:</strong> Fajr (2) and Maghrib (3) are never shortened under any circumstance.
                    </li>
                    <li>
                      <strong>Continuous Travel:</strong> The traveler state must continue throughout the prayer.
                    </li>
                  </ul>
                </div>

                {/* Niyyah Box */}
                <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/15 space-y-2">
                  <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase">
                    Qasr Intention Formula (ഖസ്വ്‌റിന്റെ നിയ്യത്ത്):
                  </div>
                  <div dir="rtl" className="font-arabic font-bold text-base text-gray-900 dark:text-gray-100">
                    أُصَلِّي فَرْضَ الظُّهْرِ رَكْعَتَيْنِ قَصْرًا لِلَّهِ تَعَالَى
                  </div>
                  <div className="text-xs italic text-gray-600 dark:text-gray-400">
                    "Ussalli Fardaz-Zuhri Rak'atayni Qasran Lillahi Ta'ala"
                  </div>
                  <div className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                    (ളുഹ്‌റ് ഫർള് 2 റക്അത്ത് ഖസ്വ്‌റായി അല്ലാഹു തആലാക്ക് വേണ്ടി ഞാൻ നമസ്കരിക്കുന്നു).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. JAMA' (Combining) */}
          {activeSalahSection === 'jama' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F5C4D] text-[#C9A45C] flex items-center justify-center font-black">
                    جمع
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                      {language === 'ml' ? 'നമസ്കാരങ്ങൾ ചേർക്കൽ (ജംഅ് തഖ്ദീം & ജംഅ് തഅ്ഖീർ)' : 'Jama\': Combining Prayers (Taqdim & Ta\'kheer)'}
                    </h3>
                    <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                      Dhuhr with Asr, and Maghrib with Isha can be combined either in the 1st or 2nd prayer time
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jama' Taqdim */}
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2.5">
                    <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                      1. Jama' Taqdim (മുന്തിച്ചു ചേർക്കൽ - In 1st Time)
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      Praying Asr early in Dhuhr time, or Isha early in Maghrib time.
                    </p>
                    <ul className="text-xs space-y-1 text-gray-800 dark:text-gray-200 list-disc list-inside">
                      <li><strong>Order:</strong> Must start with 1st prayer (Dhuhr/Maghrib).</li>
                      <li><strong>Niyyah:</strong> State intention of combining before finishing 1st prayer.</li>
                      <li><strong>Muwalat:</strong> Pray 2nd prayer immediately without long interruption.</li>
                      <li><strong>Travel Continuity:</strong> Must remain on journey when initiating 2nd prayer.</li>
                    </ul>
                  </div>

                  {/* Jama' Ta'kheer */}
                  <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2.5">
                    <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                      2. Jama' Ta'kheer (പിന്തിച്ചു ചേർക്കൽ - In 2nd Time)
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      Delaying Dhuhr to pray at Asr time, or delaying Maghrib to pray at Isha time.
                    </p>
                    <ul className="text-xs space-y-1 text-gray-800 dark:text-gray-200 list-disc list-inside">
                      <li><strong>Niyyatut-Ta'kheer:</strong> Form intention in the heart during 1st prayer time before it ends.</li>
                      <li><strong>Flexible Order:</strong> In Shafi'i Fiqh, you may start with either prayer, but starting with 1st is Sunnah.</li>
                      <li><strong>Travel Continuity:</strong> Must remain on journey until starting the prayers.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. PLANE & TRANSIT RULES */}
          {activeSalahSection === 'plane-rules' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F5C4D] text-[#C9A45C] flex items-center justify-center font-black">
                    طائرة
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                      {language === 'ml' ? 'വിമാനത്തിലും ട്രെയിനിലും ഉള്ള നമസ്കാരം' : 'Salah on Airplanes, Trains & Transit'}
                    </h3>
                    <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                      Shafi'i juristic rulings on Qibla, standing posture, and Hurmat al-Waqt
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                  <div className="p-3.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                    <strong className="text-gray-900 dark:text-gray-100 block text-xs">
                      1. Standing (Qiyam) & Facing Qiblah:
                    </strong>
                    If space allows standing facing the Qiblah (e.g. near galley or prayer nook in airline), it is obligatory for Farz prayers. Use the Musafir live compass to verify bearing.
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                    <strong className="text-gray-900 dark:text-gray-100 block text-xs">
                      2. Hurmat al-Waqt (Li Hurmatil Waqt - വഖ്തിന്റെ ആദരവിനായുള്ള നമസ്കാരം):
                    </strong>
                    {language === 'ml'
                      ? 'വിമാനത്തിൽ വെച്ച് നിൽക്കാനോ ഖിബ്‌ലയിലേക്ക് തിരിയാനോ സാധിക്കാതെ വരികയും, ലാൻഡ് ചെയ്യുന്നതിന് മുമ്പ് വഖ്ത് തീർന്നുപോവുകയും ചെയ്യുമെങ്കിൽ ഇരുന്നുകൊണ്ട് വഖ്തിന്റെ ആദരവിനായി നമസ്കരിക്കണം (ലി ഹുർമതിൽ വഖ്ത്). തുടർന്ന് ലാൻഡ് ചെയ്ത ശേഷം ഈ നമസ്കാരം ഖളാഅ് വീട്ടി മടക്കി നമസ്കരിക്കൽ (ഇആദത്ത്) നിർബന്ധമാണ്.'
                      : 'If unable to stand or accurately face the Qiblah in a seated airplane seat, and the prayer time will expire before landing, pray in your seat for the Sanctity of the Time (Li Hurmatil Waqt). According to the Shafi\'i school, this prayer is repeated (I\'adah) upon reaching land.'}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                    <strong className="text-gray-900 dark:text-gray-100 block text-xs">
                      3. Wudu & Tayammum on Flight:
                    </strong>
                    Perform minimal Wudu using a small mist spray bottle (100ml) in the aircraft washroom without wasting water or splashing floor.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. DURATION & DISTANCE (4-DAY RULE) */}
          {activeSalahSection === 'duration' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F5C4D] text-[#C9A45C] flex items-center justify-center font-black">
                    مدة
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                      {language === 'ml' ? 'യാത്രാ ഇളവുകളുടെ കാലാവധി (4 ദിവസത്തെ നിയമം)' : 'Duration of Travel Concessions: The 4-Day Rule'}
                    </h3>
                    <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                      Shafi'i, Maliki & Hanbali classical consensus on stay duration
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 space-y-1.5">
                    <strong className="text-emerald-900 dark:text-emerald-200 block text-sm">
                      Rule A: Intending to Stay Less Than 4 Full Days (4 ദിവസത്തിൽ താഴെ)
                    </strong>
                    {language === 'ml'
                      ? 'പ്രവേശിച്ച ദിവസവും മടങ്ങുന്ന ദിവസവും കൂട്ടാതെ 4 ദിവസത്തിൽ താഴെ ഒരു സ്ഥലത്ത് താമസിക്കാൻ ഉദ്ദേശിച്ചാൽ, അവിടെ തങ്ങുന്ന മുഴുവൻ ദിവസങ്ങളിലും ഖസ്വ്‌റും ജംഉം ആക്കാവുന്നതാണ്.'
                      : 'Excluding the entry day and exit day, if your intended stay is less than 4 complete days (i.e. up to 3 full intervening days), you maintain full traveler status and may shorten and combine prayers throughout.'}
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 space-y-1.5">
                    <strong className="text-amber-900 dark:text-amber-200 block text-sm">
                      Rule B: Intending to Stay 4 Full Days or More (4 ദിവസമോ അതിൽ കൂടുതലോ)
                    </strong>
                    {language === 'ml'
                      ? 'യാത്രാ ലക്ഷ്യസ്ഥാനത്ത് 4 പൂർണ്ണ ദിവസങ്ങളോ അതിലധികമോ താമസിക്കാൻ തുടക്കത്തിലേ ഉദ്ദേശിച്ചാൽ, ആ നാട്ടിൽ പ്രവേശിക്കുന്ന നിമിഷം മുതൽ യാത്രാ ഇളവുകൾ അവസാനിക്കുകയും മുഴുവൻ നമസ്കാരങ്ങളും പൂർണ്ണമായി (4 റക്അത്ത്) നമസ്കരിക്കുകയും വേണം.'
                      : 'If you intend from the outset to stay 4 complete days or more (excluding travel days), your traveler concessions cease immediately upon crossing into the destination city limits. You must pray 4 Rak\'ahs.'}
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-800 space-y-1.5">
                    <strong className="text-blue-900 dark:text-blue-200 block text-sm">
                      Rule C: Uncertain Departure Date (18-Day Rule / അനിശ്ചിതത്വം)
                    </strong>
                    {language === 'ml'
                      ? 'യാത്ര എപ്പോൾ അവസാനിക്കുമെന്ന് ഉറപ്പില്ലാതെ (ഉദാഹരണത്തിന് ജോലി പൂർത്തിയായാൽ ഉടൻ മടങ്ങാം എന്ന നിലയിൽ) തുടരുന്ന വ്യക്തിക്ക് 18 ദിവസങ്ങൾ വരെ ഖസ്വ്‌റാക്കാവുന്നതാണ്.'
                      : 'If you are detained or waiting for a matter that could finish any day (e.g. visa, business deal, hospital discharge), you may continue shortening for up to 18 full days.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ask Musafir AI Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0F5C4D]/10 via-[#0F5C4D]/5 to-[#C9A45C]/15 border border-[#0F5C4D]/25 dark:border-[#C9A45C]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A45C]/20 text-[#0F5C4D] dark:text-[#C9A45C] border border-[#C9A45C]/35">
                  MUSAFIR AI SCHOLAR
                </span>
                <span className="text-xs text-[#6B756F] dark:text-[#9AA9A2] font-semibold">
                  Shafi'i Fiqh Engine
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-gray-100">
                Need customized rulings for your specific flight or train journey?
              </h4>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                Instant rulings verified with <em>Fath al-Mu'in</em> and <em>Tuhfat al-Muhtaj</em> in English, Malayalam (മലയാളം), and Arabic (العربية).
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAppTab('assistant')}
              className="px-4 py-2.5 rounded-2xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold shrink-0 shadow-md shadow-[#0F5C4D]/25 transition-all flex items-center gap-1.5"
            >
              <span>Ask Mas'ala Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
