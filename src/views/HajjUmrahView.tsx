import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HAJJ_UMRAH_SHUROOT,
  HAJJ_ARKAAN,
  UMRAH_ARKAAN,
  HAJJ_WAJIBAT,
  MUHARRAMAT_LIST,
  FiqhRuleItem,
  MuharramatItem,
  DuaItem,
  RitualStep,
} from '../data/hajjUmrahData';
import { UMRAH_FULL_STEPS, HAJJ_FULL_DAYS } from '../data/hajjRitualsData';
import { HAJJ_UMRAH_DUAS } from '../data/hajjDuaData';
import {
  MoonStar,
  CheckCircle2,
  RotateCw,
  Sparkles,
  BookOpen,
  MapPin,
  ChevronRight,
  Info,
  Volume2,
  Copy,
  Check,
  Search,
  Scale,
  ShieldAlert,
  Calendar,
  Layers,
  Heart,
  HelpCircle,
  Footprints,
  Compass,
  AlertTriangle,
  Play,
  Pause,
  Award,
} from 'lucide-react';

type MainSectionTab = 'umrah' | 'hajj' | 'fiqh' | 'duas' | 'counters';
type FiqhSubTab = 'sharth' | 'farz' | 'wajib' | 'muharramat';
type DuaFilterCategory = 'all' | 'talbiyah' | 'tawaf' | 'sai' | 'arafah' | 'jamarat' | 'madinah';

export const HajjUmrahView: React.FC = () => {
  const { language } = useApp();

  // Active Main Tab
  const [mainTab, setMainTab] = useState<MainSectionTab>('umrah');

  // Interactive Umrah Progress
  const [completedUmrahSteps, setCompletedUmrahSteps] = useState<number[]>([1]);
  const [activeUmrahStepId, setActiveUmrahStepId] = useState<number>(1);

  // Interactive Hajj Progress
  const [completedHajjSteps, setCompletedHajjSteps] = useState<number[]>([101]);
  const [activeHajjStepId, setActiveHajjStepId] = useState<number>(101);

  // Fiqh Sub Tab
  const [fiqhSubTab, setFiqhSubTab] = useState<FiqhSubTab>('farz');

  // Dua Filter & Search
  const [duaCategory, setDuaCategory] = useState<DuaFilterCategory>('all');
  const [duaSearchQuery, setDuaSearchQuery] = useState<string>('');
  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);

  // Counters State
  const [tawafCount, setTawafCount] = useState<number>(0);
  const [saiCount, setSaiCount] = useState<number>(0);
  const [jamaratCount, setJamaratCount] = useState<number>(0);
  const [talbiyahCount, setTalbiyahCount] = useState<number>(0);

  // Audio Speech Synthesis for Arabic pronunciation
  const [speakingDuaId, setSpeakingDuaId] = useState<string | null>(null);

  const toggleUmrahStep = (id: number) => {
    setCompletedUmrahSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleHajjStep = (id: number) => {
    setCompletedHajjSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const copyToClipboard = (dua: DuaItem) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n${
      language === 'ml' ? dua.translationMl : dua.translationEn
    }\n\n(Musafir Pro Hajj & Umrah Guide)`;
    navigator.clipboard.writeText(text);
    setCopiedDuaId(dua.id);
    setTimeout(() => setCopiedDuaId(null), 2000);
  };

  const speakArabic = (dua: DuaItem) => {
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

  const activeUmrahStep =
    UMRAH_FULL_STEPS.find((s) => s.id === activeUmrahStepId) || UMRAH_FULL_STEPS[0];
  const activeHajjStep =
    HAJJ_FULL_DAYS.find((s) => s.id === activeHajjStepId) || HAJJ_FULL_DAYS[0];

  const umrahProgress = Math.round(
    (completedUmrahSteps.length / UMRAH_FULL_STEPS.length) * 100
  );
  const hajjProgress = Math.round((completedHajjSteps.length / HAJJ_FULL_DAYS.length) * 100);

  const filteredDuas = HAJJ_UMRAH_DUAS.filter((d) => {
    const matchesCat = duaCategory === 'all' || d.category === duaCategory;
    const query = duaSearchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      d.title.toLowerCase().includes(query) ||
      (d.titleMl && d.titleMl.toLowerCase().includes(query)) ||
      d.transliteration.toLowerCase().includes(query) ||
      d.translationEn.toLowerCase().includes(query) ||
      (d.translationMl && d.translationMl.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <div className="rounded-3xl p-5 sm:p-7 bg-gradient-to-br from-[#0F5C4D] via-[#0b483c] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/25 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-72 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#C9A45C] mb-1">
              <MoonStar className="w-4 h-4" />
              <span>
                {language === 'ml'
                  ? 'ഹജ്ജ് & ഉംറ സമഗ്ര കർമ്മശാസ്ത്ര ഗൈഡ്'
                  : language === 'ar'
                  ? 'دليل الحج والعمرة الفقهي الشامل'
                  : 'Shafi\'i Fiqh Pilgrimage Companion'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {language === 'ml'
                ? 'ഹജ്ജ് & ഉംറ മോഡ് (പൂർണ്ണ വിവരങ്ങൾ)'
                : language === 'ar'
                ? 'بوابة الحج والعمرة والأذكار والصلوات'
                : 'Hajj & Umrah Master Guide'}
            </h1>
            <p className="text-xs sm:text-sm text-[#E8DCC2] mt-1 max-w-2xl font-medium leading-relaxed">
              {language === 'ml'
                ? 'ശർത്വുകൾ, ഫർളുകൾ (റുക്‌നുകൾ), വാജിബാത്തുകൾ, ഇഹ്‌റാമിലെ നിഷിദ്ധങ്ങൾ (മുഹറമാത്ത് & ദമ്മ്), ഘട്ടം ഘട്ടമായുള്ള കർമ്മങ്ങൾ, തൽബിയ്യത്ത്, ദിക്റുകൾ & സ്വലാത്തുകൾ.'
                : 'Complete classical Shafi\'i rules (Fath al-Mu\'in & Tuhfah), step-by-step rituals from start to finish, authentic Talbiyah, Tawaf & Sa\'i supplications, and interactive counters.'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xs p-2 rounded-2xl border border-white/15 shrink-0 self-start md:self-auto">
            <Scale className="w-5 h-5 text-[#C9A45C]" />
            <div className="text-left">
              <div className="text-[10px] font-bold text-[#E8DCC2] uppercase">Jurisprudence</div>
              <div className="text-xs font-black text-white">Shafi\'i Madhhab (ഷാഫിഈ)</div>
            </div>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-4 border-t border-white/15">
          <button
            onClick={() => setMainTab('umrah')}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mainTab === 'umrah'
                ? 'bg-[#C9A45C] text-[#083C34] shadow-md font-black scale-[1.02]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <MoonStar className="w-4 h-4 shrink-0" />
            <span>{language === 'ml' ? 'ഉംറ ഗൈഡ്' : 'Umrah Guide'}</span>
          </button>

          <button
            onClick={() => setMainTab('hajj')}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mainTab === 'hajj'
                ? 'bg-[#C9A45C] text-[#083C34] shadow-md font-black scale-[1.02]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{language === 'ml' ? 'ഹജ്ജ് 6 ദിനങ്ങൾ' : 'Hajj 6 Days'}</span>
          </button>

          <button
            onClick={() => setMainTab('fiqh')}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mainTab === 'fiqh'
                ? 'bg-[#C9A45C] text-[#083C34] shadow-md font-black scale-[1.02]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Scale className="w-4 h-4 shrink-0" />
            <span>{language === 'ml' ? 'ഫർള്, വാജിബ്, ദമ്മ്' : 'Fiqh Rules & Damm'}</span>
          </button>

          <button
            onClick={() => setMainTab('duas')}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mainTab === 'duas'
                ? 'bg-[#C9A45C] text-[#083C34] shadow-md font-black scale-[1.02]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>{language === 'ml' ? 'ദിക്ർ & സ്വലാത്തുകൾ' : 'Duas & Swalath'}</span>
          </button>

          <button
            onClick={() => setMainTab('counters')}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1 ${
              mainTab === 'counters'
                ? 'bg-[#C9A45C] text-[#083C34] shadow-md font-black scale-[1.02]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <RotateCw className="w-4 h-4 shrink-0" />
            <span>{language === 'ml' ? 'കൗണ്ടറുകൾ' : 'Tawaf/Sa\'i Counter'}</span>
          </button>
        </div>
      </div>

      {/* ===================== 1. UMRAH GUIDE ===================== */}
      {mainTab === 'umrah' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Progress Tracker Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                  {language === 'ml' ? 'ഉംറ കർമ്മങ്ങളുടെ പുരോഗതി' : 'UMRAH RITUAL PROGRESS'}
                </span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
                  {completedUmrahSteps.length} of {UMRAH_FULL_STEPS.length} Steps Completed ({umrahProgress}%)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono font-black text-sm">
                {umrahProgress}%
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0F5C4D] to-[#C9A45C] rounded-full transition-all duration-500"
                style={{ width: `${umrahProgress}%` }}
              />
            </div>

            {/* Step Switcher Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {UMRAH_FULL_STEPS.map((s) => {
                const isDone = completedUmrahSteps.includes(s.id);
                const isCurrent = activeUmrahStepId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveUmrahStepId(s.id)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isCurrent
                        ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-md shadow-[#0F5C4D]/25 ring-2 ring-[#C9A45C]'
                        : isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-gray-900 dark:text-gray-100'
                        : 'bg-white dark:bg-[#071310] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase ${isCurrent ? 'text-[#C9A45C]' : 'text-[#6B756F]'}`}>
                        Step {s.id}
                      </span>
                      {isDone && <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#C9A45C]' : 'text-emerald-500'}`} />}
                    </div>
                    <div className="text-xs font-bold truncate">
                      {language === 'ml' ? s.titleMl.split(' ')[1] || s.titleMl : s.titleEn.split('(')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-[#C9A45C] uppercase tracking-wider">
                    STEP {activeUmrahStep.id} OF 4
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C]">
                    {activeUmrahStep.category.toUpperCase()} (ഫർള്)
                  </span>
                  <span className="text-xs font-bold text-gray-500 font-arabic">
                    {activeUmrahStep.titleAr}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">
                  {language === 'ml' ? activeUmrahStep.titleMl : activeUmrahStep.titleEn}
                </h2>
              </div>

              <button
                onClick={() => toggleUmrahStep(activeUmrahStep.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
                  completedUmrahSteps.includes(activeUmrahStep.id)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-gray-100 dark:bg-[#071310] hover:bg-gray-200 text-gray-800 dark:text-gray-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedUmrahSteps.includes(activeUmrahStep.id)
                    ? (language === 'ml' ? 'പൂർത്തിയായി ✓' : 'Completed ✓')
                    : (language === 'ml' ? 'പൂർത്തിയായി അടയാളപ്പെടുത്തുക' : 'Mark Step Done')}
                </span>
              </button>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {language === 'ml' ? activeUmrahStep.summaryMl : activeUmrahStep.summaryEn}
            </p>

            {/* Location */}
            <div className="p-3.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-xs flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <span>
                <strong>{language === 'ml' ? 'സ്ഥലം / പരിധി:' : 'Location:'} </strong>
                {activeUmrahStep.location}
              </span>
            </div>

            {/* Action Checklist */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
                <Footprints className="w-4 h-4" />
                <span>{language === 'ml' ? 'ചെയ്യേണ്ട കർമ്മങ്ങൾ (ക്രമപ്രകാരം):' : 'Step-by-Step Actions:'}</span>
              </h3>
              <div className="space-y-2">
                {(language === 'ml' ? activeUmrahStep.actionsMl : activeUmrahStep.actionsEn).map(
                  (action, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
                        {action}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Step Duas */}
            {activeUmrahStep.duas.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{language === 'ml' ? 'ഈ ഘട്ടത്തിൽ ചൊല്ലേണ്ട പ്രാർത്ഥനകൾ (ദുആകൾ):' : 'Recommended Step Duas:'}</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {activeUmrahStep.duas.map((dua) => (
                    <div
                      key={dua.id}
                      className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-black text-gray-900 dark:text-gray-100">
                          {language === 'ml' && dua.titleMl ? dua.titleMl : dua.title}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speakArabic(dua)}
                            className="p-1.5 rounded-lg bg-white dark:bg-[#0D1C18] text-[#0F5C4D] dark:text-[#C9A45C] hover:bg-[#0F5C4D]/10 transition-colors"
                            title="Listen Arabic pronunciation"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${speakingDuaId === dua.id ? 'text-emerald-500 animate-pulse' : ''}`} />
                          </button>
                          <button
                            onClick={() => copyToClipboard(dua)}
                            className="p-1.5 rounded-lg bg-white dark:bg-[#0D1C18] text-[#0F5C4D] dark:text-[#C9A45C] hover:bg-[#0F5C4D]/10 transition-colors"
                            title="Copy Dua"
                          >
                            {copiedDuaId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div
                        dir="rtl"
                        className="p-3.5 rounded-xl bg-white dark:bg-[#0D1C18] text-right font-arabic font-bold text-lg sm:text-xl text-[#0F5C4D] dark:text-[#E8DCC2] leading-loose shadow-inner"
                      >
                        {dua.arabic}
                      </div>

                      <div className="text-xs italic text-gray-600 dark:text-gray-400 font-serif">
                        "{dua.transliteration}"
                      </div>

                      <div className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                        <strong>{language === 'ml' ? 'അർത്ഥം:' : 'Meaning:'} </strong>
                        {language === 'ml' ? dua.translationMl : dua.translationEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            {activeUmrahStep.commonMistakes.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/60 space-y-2">
                <div className="text-xs font-black text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>{language === 'ml' ? 'ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ & അബദ്ധങ്ങൾ:' : 'Important Cautions & Common Mistakes:'}</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-200 list-disc list-inside">
                  {activeUmrahStep.commonMistakes.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== 2. HAJJ 6 DAYS GUIDE ===================== */}
      {mainTab === 'hajj' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Hajj Day Selector Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
                  {language === 'ml' ? 'ഹജ്ജ് കർമ്മങ്ങളുടെ പൂർണ്ണ ക്രമം' : 'HAJJ DAY-BY-DAY PILGRIMAGE WORKFLOW'}
                </span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
                  {completedHajjSteps.length} of {HAJJ_FULL_DAYS.length} Stages Marked Completed ({hajjProgress}%)
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-mono font-black text-sm">
                {hajjProgress}%
              </span>
            </div>

            <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0F5C4D] via-amber-500 to-[#C9A45C] rounded-full transition-all duration-500"
                style={{ width: `${hajjProgress}%` }}
              />
            </div>

            {/* Horizontal Day Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 pt-2">
              {HAJJ_FULL_DAYS.map((h, idx) => {
                const isDone = completedHajjSteps.includes(h.id);
                const isCurrent = activeHajjStepId === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setActiveHajjStepId(h.id)}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      isCurrent
                        ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-md shadow-[#0F5C4D]/20 ring-2 ring-[#C9A45C]'
                        : isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-gray-900 dark:text-gray-100'
                        : 'bg-white dark:bg-[#071310] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-[9px] font-black uppercase ${isCurrent ? 'text-[#C9A45C]' : 'text-[#6B756F]'}`}>
                        {idx === 6 ? 'Wada\'' : idx === 7 ? 'Madinah' : `Day ${idx + 1}`}
                      </span>
                      {isDone && <CheckCircle2 className={`w-3 h-3 ${isCurrent ? 'text-[#C9A45C]' : 'text-emerald-500'}`} />}
                    </div>
                    <div className="text-[11px] font-bold truncate">
                      {h.hijriDate ? h.hijriDate.split(' ')[0] : 'Stage'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Hajj Day Detail */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-[#C9A45C] uppercase tracking-wider">
                    {activeHajjStep.dayNameEn}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    activeHajjStep.category === 'fard'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                      : activeHajjStep.category === 'wajib'
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                      : 'bg-blue-500/15 text-blue-700 dark:text-blue-400'
                  }`}>
                    {activeHajjStep.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-gray-500 font-arabic">
                    {activeHajjStep.titleAr}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-100 mt-1">
                  {language === 'ml' ? activeHajjStep.titleMl : activeHajjStep.titleEn}
                </h2>
              </div>

              <button
                onClick={() => toggleHajjStep(activeHajjStep.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all shrink-0 ${
                  completedHajjSteps.includes(activeHajjStep.id)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-gray-100 dark:bg-[#071310] hover:bg-gray-200 text-gray-800 dark:text-gray-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {completedHajjSteps.includes(activeHajjStep.id)
                    ? (language === 'ml' ? 'പൂർത്തിയായി ✓' : 'Stage Done ✓')
                    : (language === 'ml' ? 'പൂർത്തിയായി അടയാളപ്പെടുത്തുക' : 'Mark Stage Done')}
                </span>
              </button>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {language === 'ml' ? activeHajjStep.summaryMl : activeHajjStep.summaryEn}
            </p>

            {/* Location */}
            <div className="p-3.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-xs flex items-center gap-2 text-gray-800 dark:text-gray-200">
              <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
              <span>
                <strong>{language === 'ml' ? 'സ്ഥലം / സഞ്ചാരം:' : 'Location & Movement:'} </strong>
                {activeHajjStep.location}
              </span>
            </div>

            {/* Step-by-Step Detailed Actions */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
                <Footprints className="w-4 h-4" />
                <span>{language === 'ml' ? 'ഈ ദിവസത്തെ പൂർണ്ണ കർമ്മങ്ങൾ:' : 'Key Ritual Steps & Actions:'}</span>
              </h3>
              <div className="space-y-2">
                {(language === 'ml' ? activeHajjStep.actionsMl : activeHajjStep.actionsEn).map(
                  (act, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                        {act}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Duas */}
            {activeHajjStep.duas.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{language === 'ml' ? 'ഈ ദിവസത്തെ സവിശേഷ പ്രാർത്ഥനകൾ & ദിക്റുകൾ:' : 'Primary Supplications for this Stage:'}</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {activeHajjStep.duas.map((dua) => (
                    <div
                      key={dua.id}
                      className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-black text-gray-900 dark:text-gray-100">
                          {language === 'ml' && dua.titleMl ? dua.titleMl : dua.title}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speakArabic(dua)}
                            className="p-1.5 rounded-lg bg-white dark:bg-[#0D1C18] text-[#0F5C4D] dark:text-[#C9A45C] hover:bg-[#0F5C4D]/10 transition-colors"
                            title="Listen Arabic pronunciation"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${speakingDuaId === dua.id ? 'text-emerald-500 animate-pulse' : ''}`} />
                          </button>
                          <button
                            onClick={() => copyToClipboard(dua)}
                            className="p-1.5 rounded-lg bg-white dark:bg-[#0D1C18] text-[#0F5C4D] dark:text-[#C9A45C] hover:bg-[#0F5C4D]/10 transition-colors"
                            title="Copy Dua"
                          >
                            {copiedDuaId === dua.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div
                        dir="rtl"
                        className="p-3.5 rounded-xl bg-white dark:bg-[#0D1C18] text-right font-arabic font-bold text-lg sm:text-xl text-[#0F5C4D] dark:text-[#E8DCC2] leading-loose shadow-inner"
                      >
                        {dua.arabic}
                      </div>

                      <div className="text-xs italic text-gray-600 dark:text-gray-400 font-serif">
                        "{dua.transliteration}"
                      </div>

                      <div className="text-xs text-gray-800 dark:text-gray-200 font-medium">
                        <strong>{language === 'ml' ? 'അർത്ഥം:' : 'Meaning:'} </strong>
                        {language === 'ml' ? dua.translationMl : dua.translationEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== 3. FIQH RULES (SHARTH, FARZ, WAJIB, MUHARRAMAT) ===================== */}
      {mainTab === 'fiqh' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Sub Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-x-auto">
            <button
              onClick={() => setFiqhSubTab('farz')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black text-center transition-all ${
                fiqhSubTab === 'farz'
                  ? 'bg-[#0F5C4D] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              ⭐ {language === 'ml' ? 'ഫർളുകൾ (റുക്‌നുകൾ)' : 'Farz / Arkaan (Pillars)'}
            </button>

            <button
              onClick={() => setFiqhSubTab('wajib')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black text-center transition-all ${
                fiqhSubTab === 'wajib'
                  ? 'bg-[#0F5C4D] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              📜 {language === 'ml' ? 'വാജിബാത്തുകൾ' : 'Wajibat (Duties)'}
            </button>

            <button
              onClick={() => setFiqhSubTab('sharth')}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-black text-center transition-all ${
                fiqhSubTab === 'sharth'
                  ? 'bg-[#0F5C4D] text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              ⚖️ {language === 'ml' ? 'ശർത്വുകൾ (നിബന്ധനകൾ)' : 'Shuroot (Prerequisites)'}
            </button>

            <button
              onClick={() => setFiqhSubTab('muharramat')}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-black text-center transition-all ${
                fiqhSubTab === 'muharramat'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20'
              }`}
            >
              🚫 {language === 'ml' ? 'നിഷിദ്ധങ്ങൾ & ദമ്മ്' : 'Muharramat & Damm'}
            </button>
          </div>

          {/* FARZ / ARKAAN */}
          {fiqhSubTab === 'farz' && (
            <div className="space-y-6">
              {/* Core explanation box */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>{language === 'ml' ? 'ഫർളും വാജിബും തമ്മിലുള്ള വ്യത്യാസം:' : 'Definition of Rukn / Farz in Shafi\'i Fiqh:'} </strong>
                {language === 'ml'
                  ? 'റുക്ൻ (ഫർള്) എന്നാൽ അത് ഒഴിവായാൽ ഹജ്ജ് തന്നെ സാധുവാകില്ല. ദമ്മ് (ബലി) നൽകിയാലും പരിഹരിക്കപ്പെടില്ല; ആ കർമ്മം സ്വയം ചെയ്തേ തീരൂ. എന്നാൽ വാജിബ് വിട്ടുപോയാൽ ഹജ്ജ് സാധുവാകും, പക്ഷേ ദമ്മ് നിർബന്ധമാകും.'
                  : 'A Rukn (Farz) is an essential pillar that CANNOT be compensated by slaughtering an animal (Damm). If any Rukn is missed, the pilgrimage remains incomplete until physically performed.'}
              </div>

              {/* Hajj 6 Farz */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A45C]" />
                  <span>{language === 'ml' ? 'ഹജ്ജിന്റെ 6 ഫർളുകൾ (റുക്‌നുകൾ):' : 'The 6 Pillars (Arkaan) of Hajj:'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {HAJJ_ARKAAN.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C]">
                          {language === 'ml' ? item.titleMl : item.titleEn}
                        </div>
                        <span className="text-xs font-bold font-arabic text-gray-400">
                          {item.titleAr}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                        {language === 'ml' ? item.descriptionMl : item.descriptionEn}
                      </p>
                      <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] font-semibold border-t border-gray-100 dark:border-gray-800/80 pt-1.5 flex items-center justify-between">
                        <span>Ref: {item.reference}</span>
                        <span className="text-emerald-600 font-bold">Rukn / ഫർള്</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Umrah 5 Farz */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
                  <MoonStar className="w-4 h-4 text-[#C9A45C]" />
                  <span>{language === 'ml' ? 'ഉംറയുടെ 5 ഫർളുകൾ (റുക്‌നുകൾ):' : 'The 5 Pillars (Arkaan) of Umrah:'}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {UMRAH_ARKAAN.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-black text-[#0F5C4D] dark:text-[#C9A45C]">
                          {language === 'ml' ? item.titleMl : item.titleEn}
                        </div>
                        <span className="text-xs font-bold font-arabic text-gray-400">
                          {item.titleAr}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                        {language === 'ml' ? item.descriptionMl : item.descriptionEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WAJIBAT */}
          {fiqhSubTab === 'wajib' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                <strong>{language === 'ml' ? 'വാജിബാത്തുകളുടെ നിയമം:' : 'Shafi\'i Rule on Wajibat:'} </strong>
                {language === 'ml'
                  ? 'വാജിബ് ഒഴിവായാൽ ഹജ്ജ് ബാത്വിലാവില്ലെങ്കിലും കുറ്റക്കാരനാവുകയും നിർബന്ധമായും ദമ്മ് (ബലി) നൽകി പരിഹരിക്കുകയും വേണം.'
                  : 'Leaving a Wajib act does not invalidate the Hajj, but it is sinful without a valid excuse and requires an obligatory sacrificial expiation (Damm).'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {HAJJ_WAJIBAT.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-black text-amber-700 dark:text-amber-400">
                        {language === 'ml' ? item.titleMl : item.titleEn}
                      </div>
                      <span className="text-xs font-bold font-arabic text-gray-400">
                        {item.titleAr}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {language === 'ml' ? item.descriptionMl : item.descriptionEn}
                    </p>
                    <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] font-semibold border-t border-gray-100 dark:border-gray-800/80 pt-1.5 flex items-center justify-between">
                      <span>Ref: {item.reference}</span>
                      <span className="text-amber-600 font-bold">Wajib / വാജിബ്</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SHARTH (Prerequisites) */}
          {fiqhSubTab === 'sharth' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200">
                <strong>{language === 'ml' ? 'ഹജ്ജിന്റെ ശർത്വുകൾ (നിബന്ധനകൾ):' : 'Prerequisites for Hajj Obligation (Wujoob):'} </strong>
                {language === 'ml'
                  ? 'ഹജ്ജും ഉംറയും ഒരു വ്യക്തിക്ക് ഫർളാകാൻ 5 ശർത്വുകൾ ഒത്തിണങ്ങണം.'
                  : 'Five essential prerequisites must be fulfilled for Hajj and Umrah to become an obligatory duty upon an individual.'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {HAJJ_UMRAH_SHUROOT.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-black text-blue-700 dark:text-blue-400">
                        {language === 'ml' ? item.titleMl : item.titleEn}
                      </div>
                      <span className="text-xs font-bold font-arabic text-gray-400">
                        {item.titleAr}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {language === 'ml' ? item.descriptionMl : item.descriptionEn}
                    </p>
                    <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] font-semibold border-t border-gray-100 dark:border-gray-800/80 pt-1.5 flex items-center justify-between">
                      <span>Ref: {item.reference}</span>
                      <span className="text-blue-600 font-bold">Sharth / ശർത്ത്</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MUHARRAMAT (Prohibitions & Damm) */}
          {fiqhSubTab === 'muharramat' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 text-xs text-red-900 dark:text-red-200">
                <strong>{language === 'ml' ? 'ഇഹ്‌റാമിലെ 10 നിഷിദ്ധ കാര്യങ്ങളും ദമ്മും:' : '10 Prohibitions of Ihram & Shafi\'i Damm Categories:'} </strong>
                {language === 'ml'
                  ? 'ഇഹ്‌റാം ചെയ്ത വ്യക്തി താഴെ പറയുന്ന കാര്യങ്ങൾ ചെയ്യൽ ഹറാമാണ്. ചെയ്താൽ അതത് ഇനങ്ങളിലുള്ള ദമ്മ് (ബലി/പ്രായശ്ചിത്തം) ബാധകമാകും.'
                  : 'Entering Ihram places these 10 actions under strict prohibition. Violating them incurs specific categories of Shafi\'i sacrificial expiations (Damm).'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {MUHARRAMAT_LIST.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-black text-red-700 dark:text-red-400">
                          {language === 'ml' ? m.titleMl : m.titleEn}
                        </div>
                        <div className="text-[10px] font-bold text-gray-500 font-arabic mt-0.5">
                          {m.titleAr}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 shrink-0">
                        Prohibited
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-1">
                      <div className="text-[11px] font-black text-amber-900 dark:text-amber-300">
                        {language === 'ml' ? m.penaltyNameMl : m.penaltyNameEn}
                      </div>
                      <p className="text-[11px] text-amber-950 dark:text-amber-200 leading-snug">
                        {language === 'ml' ? m.penaltyDescriptionMl : m.penaltyDescriptionEn}
                      </p>
                    </div>

                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                      {m.rules.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== 4. ALL DUAS & SWALATH ===================== */}
      {mainTab === 'duas' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Filter & Search Bar */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={duaSearchQuery}
                onChange={(e) => setDuaSearchQuery(e.target.value)}
                placeholder={language === 'ml' ? 'തൽബിയ്യത്ത്, ത്വവാഫ്, സഈ, അറഫാ ദുആകൾ തിരയുക...' : 'Search Talbiyah, Tawaf, Sa\'i, Arafah, Jamarat duas & Swalath...'}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
              {[
                { id: 'all', label: language === 'ml' ? 'എല്ലാം' : 'All Duas' },
                { id: 'talbiyah', label: language === 'ml' ? 'തൽബിയ്യത്ത്' : 'Talbiyah' },
                { id: 'tawaf', label: language === 'ml' ? 'ത്വവാഫ്' : 'Tawaf Duas' },
                { id: 'sai', label: language === 'ml' ? 'സഈ' : 'Sa\'i Duas' },
                { id: 'arafah', label: language === 'ml' ? 'അറഫാ' : 'Arafah' },
                { id: 'jamarat', label: language === 'ml' ? 'ജംറകൾ' : 'Jamarat' },
                { id: 'madinah', label: language === 'ml' ? 'മദീനാ & സ്വലാത്ത്' : 'Madinah & Swalath' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setDuaCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    duaCategory === cat.id
                      ? 'bg-[#0F5C4D] text-white shadow-sm font-black'
                      : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duas List */}
          <div className="space-y-4">
            {filteredDuas.map((dua) => (
              <div
                key={dua.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-3 hover:border-[#0F5C4D]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
                      {dua.category.toUpperCase()}
                    </span>
                    <h3 className="text-base font-black text-gray-900 dark:text-gray-100 mt-1">
                      {language === 'ml' && dua.titleMl ? dua.titleMl : dua.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => speakArabic(dua)}
                      className="px-3 py-1.5 rounded-xl bg-[#0F5C4D]/10 hover:bg-[#0F5C4D]/20 text-[#0F5C4D] dark:text-[#C9A45C] text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Audio Pronunciation"
                    >
                      <Volume2 className={`w-4 h-4 ${speakingDuaId === dua.id ? 'text-emerald-500 animate-pulse' : ''}`} />
                      <span>{speakingDuaId === dua.id ? 'Playing...' : 'Audio'}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(dua)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-[#071310] hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Copy full text"
                    >
                      {copiedDuaId === dua.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedDuaId === dua.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Arabic Card */}
                <div
                  dir="rtl"
                  className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] text-right font-arabic font-bold text-xl sm:text-2xl text-[#0F5C4D] dark:text-[#E8DCC2] leading-loose shadow-inner border border-[#0F5C4D]/10"
                >
                  {dua.arabic}
                </div>

                {/* Transliteration */}
                <div className="text-xs sm:text-sm italic text-gray-700 dark:text-gray-300 font-serif bg-gray-50 dark:bg-gray-900/40 p-3 rounded-xl">
                  "{dua.transliteration}"
                </div>

                {/* Translations */}
                <div className="space-y-1 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium">
                  {language === 'ml' ? (
                    <div>
                      <strong className="text-[#0F5C4D] dark:text-[#C9A45C]">മലയാള അർത്ഥം: </strong>
                      {dua.translationMl}
                    </div>
                  ) : (
                    <div>
                      <strong className="text-[#0F5C4D] dark:text-[#C9A45C]">English Translation: </strong>
                      {dua.translationEn}
                    </div>
                  )}
                </div>

                {/* Occasion & Virtue */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-[#6B756F] dark:text-[#9AA9A2] space-y-1">
                  <div>
                    <strong>{language === 'ml' ? 'സമയം / സന്ദർഭം:' : 'When to Recite:'} </strong>
                    {dua.occasion}
                  </div>
                  {dua.virtue && (
                    <div className="text-[#0F5C4D] dark:text-[#C9A45C]">
                      <strong>{language === 'ml' ? 'പ്രതിഫല മഹത്വം:' : 'Virtue & Hadith:'} </strong>
                      {dua.virtue}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== 5. INTERACTIVE COUNTERS ===================== */}
      {mainTab === 'counters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {/* 1. Tawaf Circuit Counter */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-md space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F5C4D] dark:text-[#C9A45C]">
              <RotateCw className="w-4 h-4" />
              <span>{language === 'ml' ? 'ത്വവാഫ് കൗണ്ടർ (7 ചുറ്റുകൾ)' : 'Tawaf Circuit Counter (7 Rounds)'}</span>
            </div>

            <div className="text-6xl font-black text-[#0F5C4D] dark:text-[#C9A45C] font-mono py-2">
              {tawafCount} <span className="text-2xl text-gray-400">/ 7</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {tawafCount === 0
                ? 'Start at the Black Stone (Hajar al-Aswad) with Wudu and Kaaba on your left.'
                : tawafCount === 7
                ? '✓ All 7 Tawaf circuits completed! Pray 2 rak\'ahs behind Maqam Ibrahim and drink Zamzam.'
                : `Circuit ${tawafCount} completed. Recite "Rabbana atina fid-dunya..." near Yemeni corner.`}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setTawafCount(Math.max(0, tawafCount - 1))}
                disabled={tawafCount === 0}
                className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 font-black text-xl disabled:opacity-30"
              >
                -
              </button>
              <button
                onClick={() => setTawafCount(Math.min(7, tawafCount + 1))}
                disabled={tawafCount === 7}
                className="px-6 h-12 rounded-2xl bg-[#0F5C4D] text-white font-black text-sm flex items-center gap-2 shadow-md shadow-[#0F5C4D]/25 disabled:opacity-30"
              >
                <span>+ Complete Lap</span>
              </button>
              <button
                onClick={() => setTawafCount(0)}
                className="px-3 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-500 text-xs font-bold"
              >
                Reset
              </button>
            </div>
          </div>

          {/* 2. Sa'i Lap Counter */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-md space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F5C4D] dark:text-[#C9A45C]">
              <Footprints className="w-4 h-4" />
              <span>{language === 'ml' ? 'സഈ കൗണ്ടർ (7 നടത്തം)' : 'Sa\'i Lap Counter (7 Laps)'}</span>
            </div>

            <div className="text-6xl font-black text-[#0F5C4D] dark:text-[#C9A45C] font-mono py-2">
              {saiCount} <span className="text-2xl text-gray-400">/ 7</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {saiCount === 0
                ? 'Begin Lap 1 ascending Mount Safa facing Kaaba.'
                : saiCount === 7
                ? '✓ Sa\'i completed on Mount Marwah! Proceed to Halq / Taqsir.'
                : saiCount % 2 === 1
                ? `Lap ${saiCount} finished at Marwah. Turn around to walk to Safa.`
                : `Lap ${saiCount} finished at Safa. Turn around to walk to Marwah.`}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setSaiCount(Math.max(0, saiCount - 1))}
                disabled={saiCount === 0}
                className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 font-black text-xl disabled:opacity-30"
              >
                -
              </button>
              <button
                onClick={() => setSaiCount(Math.min(7, saiCount + 1))}
                disabled={saiCount === 7}
                className="px-6 h-12 rounded-2xl bg-[#0F5C4D] text-white font-black text-sm flex items-center gap-2 shadow-md shadow-[#0F5C4D]/25 disabled:opacity-30"
              >
                <span>+ Next Lap</span>
              </button>
              <button
                onClick={() => setSaiCount(0)}
                className="px-3 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-500 text-xs font-bold"
              >
                Reset
              </button>
            </div>
          </div>

          {/* 3. Jamarat Pebble Counter */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-md space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Award className="w-4 h-4" />
              <span>{language === 'ml' ? 'ജംറത്ത് കല്ലേറ് കൗണ്ടർ (7 കല്ലുകൾ)' : 'Jamarat Stoning Counter (7 Pebbles)'}</span>
            </div>

            <div className="text-6xl font-black text-amber-600 dark:text-amber-400 font-mono py-2">
              {jamaratCount} <span className="text-2xl text-gray-400">/ 7</span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Chant <strong>"Bismillahi Allahu Akbar"</strong> with every single pebble cast into the basin.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setJamaratCount(Math.max(0, jamaratCount - 1))}
                disabled={jamaratCount === 0}
                className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 font-black text-xl disabled:opacity-30"
              >
                -
              </button>
              <button
                onClick={() => setJamaratCount(Math.min(7, jamaratCount + 1))}
                disabled={jamaratCount === 7}
                className="px-6 h-12 rounded-2xl bg-amber-600 text-white font-black text-sm flex items-center gap-2 shadow-md shadow-amber-600/25 disabled:opacity-30"
              >
                <span>+ Pebble Thrown</span>
              </button>
              <button
                onClick={() => setJamaratCount(0)}
                className="px-3 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-500 text-xs font-bold"
              >
                Reset
              </button>
            </div>
          </div>

          {/* 4. Digital Talbiyah Counter */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-md space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F5C4D] dark:text-[#C9A45C]">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ml' ? 'ഡിജിറ്റൽ തൽബിയ്യത്ത് കൗണ്ടർ' : 'Digital Talbiyah Chant Bead'}</span>
            </div>

            <div className="text-6xl font-black text-[#0F5C4D] dark:text-[#C9A45C] font-mono py-2">
              {talbiyahCount}
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              "Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk..."
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setTalbiyahCount(Math.max(0, talbiyahCount - 1))}
                disabled={talbiyahCount === 0}
                className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 font-black text-xl disabled:opacity-30"
              >
                -
              </button>
              <button
                onClick={() => setTalbiyahCount(talbiyahCount + 1)}
                className="px-6 h-12 rounded-2xl bg-gradient-to-r from-[#0F5C4D] to-[#C9A45C] text-white font-black text-sm flex items-center gap-2 shadow-md shadow-[#0F5C4D]/25"
              >
                <span>+ Count Talbiyah</span>
              </button>
              <button
                onClick={() => setTalbiyahCount(0)}
                className="px-3 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-500 text-xs font-bold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
