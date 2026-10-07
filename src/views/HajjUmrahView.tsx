import React, { useState } from 'react';
import {
  MoonStar,
  CheckCircle2,
  RotateCw,
  Sparkles,
  BookOpen,
  MapPin,
  ChevronRight,
  Info,
} from 'lucide-react';

interface StepDetail {
  step: number;
  title: string;
  arabicTitle: string;
  summary: string;
  location: string;
  duas: { label: string; arabic: string; transliteration: string; meaning: string }[];
  rules: string[];
}

const UMRAH_STEPS: StepDetail[] = [
  {
    step: 1,
    title: 'Ihram & Miqat',
    arabicTitle: 'الإحرام والميقات',
    summary:
      'Enter the sacred state of consecration (Ihram) before crossing the designated Miqat boundary, state your intention, and recite Talbiyah.',
    location: 'Miqat (Dhul Hulaifah, Al-Juhfah, Qarn al-Manazil, Yalamlam, Dhat Irq)',
    duas: [
      {
        label: 'Intention for Umrah',
        arabic: 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً',
        transliteration: 'Labbayka Allahumma \'Umrah.',
        meaning: 'Here I am, O Allah, for Umrah.',
      },
      {
        label: 'The Talbiyah Supplication',
        arabic:
          'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ ، لَا شَرِيكَ لَكَ',
        transliteration:
          'Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk, innal-hamda wan-ni\'mata laka wal-mulk, la shareeka lak.',
        meaning:
          'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace, and dominion are Yours. You have no partner.',
      },
    ],
    rules: [
      'Men wear 2 unstitched white sheets; no stitched garments, hats, or covered ankles.',
      'Women wear ordinary modest clothing with hands and face uncovered (no niqab or gloves).',
      'No scented soaps, perfumes, cutting nails/hair, or marital relations in Ihram.',
    ],
  },
  {
    step: 2,
    title: 'Tawaf (7 Circuits around Kaaba)',
    arabicTitle: 'الطواف حول الكعبة',
    summary:
      'Perform 7 counter-clockwise circuits starting and ending at the Black Stone (Hajar al-Aswad) with the Kaaba on your left side in purity (wudu).',
    location: 'Al-Masjid al-Haram, Mataf',
    duas: [
      {
        label: 'Starting each circuit at Black Stone',
        arabic: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',
        transliteration: 'Bismillahi wallahu Akbar.',
        meaning: 'In the name of Allah, and Allah is the Greatest.',
      },
      {
        label: 'Dua between Yemeni Corner & Black Stone',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration:
          'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar.',
        meaning:
          'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
      },
    ],
    rules: [
      'Ritual wudu is mandatory during Tawaf according to the majority of scholars.',
      'Men uncover right shoulder (Idtiba\') during the 7 circuits of Umrah Tawaf.',
      'Men walk with brisk short strides (Raml) during first 3 circuits if crowding permits.',
      'Pray 2 rak\'ahs behind Maqam Ibrahim (or anywhere in the Haram) upon completion.',
    ],
  },
  {
    step: 3,
    title: "Sa'i (7 Laps Between Safa & Marwah)",
    arabicTitle: 'السعي بين الصفا والمروة',
    summary:
      'Walk 7 intervals beginning at Mount Safa and culminating at Mount Marwah in remembrance of Hajar (RA).',
    location: "Al-Mas'a Gallery (Safa to Marwah)",
    duas: [
      {
        label: 'Recitation when ascending Safa and Marwah',
        arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ',
        transliteration: 'Innas-Safa wal-Marwata min sha\'a\'irillah.',
        meaning: 'Indeed, as-Safa and al-Marwah are among the symbols of Allah (Qur\'an 2:158).',
      },
      {
        label: 'Supplication facing the Kaaba',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration:
          'La ilaha illallahu wahdahu la shareeka lah, lahul-mulku wa lahul-hamdu wa Huwa \'ala kulli shay\'in Qadeer.',
        meaning:
          'There is no deity but Allah alone with no partner. His is the sovereignty and praise, and He has power over all things.',
      },
    ],
    rules: [
      'Circuit 1: Safa to Marwah. Circuit 2: Marwah to Safa. Finishes on Circuit 7 at Marwah.',
      'Men jog lightly between the green fluorescent markers.',
      'Ritual purity is recommended (mustahabb), but Sa\'i remains valid without wudu if necessary.',
    ],
  },
  {
    step: 4,
    title: 'Halq / Taqsir (Exit from Ihram)',
    arabicTitle: 'الحلق أو التقصير',
    summary:
      'Conclude your Umrah by shaving or trimming the hair, releasing all Ihram restrictions.',
    location: 'Official Barbershops outside Al-Masjid al-Haram',
    duas: [
      {
        label: 'Gratitude upon completing Umrah',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ',
        transliteration: 'Alhamdulillahil-ladhee bi-ni\'matihi tatimmus-salihat.',
        meaning: 'Praise be to Allah by Whose grace good deeds are completed.',
      },
    ],
    rules: [
      'Men: Shaving the entire head (Halq) is three times more rewarded than trimming (Taqsir).',
      'Women: Trim an equal fingertip length (approx 1-2 cm) from the ends of all hair.',
      'Upon hair cutting, you exit the state of Ihram and all normal permissibilities return.',
    ],
  },
];

export const HajjUmrahView: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [tawafCircuitCount, setTawafCircuitCount] = useState<number>(0);

  const toggleStep = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const currentStep = UMRAH_STEPS.find((s) => s.step === activeStepTab) || UMRAH_STEPS[0];
  const progressPercent = Math.round((completedSteps.length / UMRAH_STEPS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <MoonStar className="w-4 h-4" />
            <span>Spiritual Pilgrimage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Hajj & Umrah Mode
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Step-by-step rituals, authentic Talbiyah supplications, and interactive Tawaf counter
          </p>
        </div>
      </div>

      {/* Progress Bar Header Card (Requirement 21) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F5C4D] via-[#0b483c] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/25 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#E8DCC2] uppercase tracking-wider">
            UMRAH PILGRIMAGE PROGRESS
          </span>
          <span className="text-sm font-extrabold text-[#C9A45C] font-mono">
            {completedSteps.length} of 4 Steps Complete ({progressPercent}%)
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-black/25 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C9A45C] to-emerald-300 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 4 Step Tracker Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {UMRAH_STEPS.map((s) => {
            const isDone = completedSteps.includes(s.step);
            const isCurrent = activeStepTab === s.step;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStepTab(s.step)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  isCurrent
                    ? 'bg-white/20 border-[#C9A45C] ring-2 ring-[#C9A45C]'
                    : isDone
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-black/15 border-transparent text-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-[#C9A45C]">
                    Step {s.step}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
                </div>
                <div className="text-xs font-bold truncate text-white">{s.title.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Tawaf Circuit Counter (Special Feature) */}
      {activeStepTab === 2 && (
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-md text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <RotateCw className="w-4 h-4" />
            <span>Interactive Tawaf Circuit Counter</span>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            <button
              onClick={() => setTawafCircuitCount(Math.max(0, tawafCircuitCount - 1))}
              disabled={tawafCircuitCount === 0}
              className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 font-extrabold text-xl disabled:opacity-30"
            >
              -
            </button>

            <div className="text-center">
              <div className="text-5xl font-black text-[#0F5C4D] dark:text-[#C9A45C] font-mono">
                {tawafCircuitCount} / 7
              </div>
              <span className="text-xs text-[#6B756F] dark:text-[#9AA9A2] font-semibold mt-1 block">
                Circuits around the Holy Kaaba completed
              </span>
            </div>

            <button
              onClick={() => setTawafCircuitCount(Math.min(7, tawafCircuitCount + 1))}
              disabled={tawafCircuitCount === 7}
              className="w-12 h-12 rounded-2xl bg-[#0F5C4D] text-white font-extrabold text-xl disabled:opacity-30 shadow-md shadow-[#0F5C4D]/25"
            >
              +
            </button>
          </div>

          {tawafCircuitCount === 7 && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              ✓ All 7 Tawaf circuits completed! Proceed to pray 2 rak'ahs behind Maqam Ibrahim and drink Zamzam.
            </div>
          )}
        </div>
      )}

      {/* Step Ritual Details */}
      <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C9A45C] uppercase tracking-wider">
                STEP {currentStep.step} OF 4
              </span>
              <span className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">•</span>
              <span className="text-xs font-bold text-gray-500 font-arabic text-sm">
                {currentStep.arabicTitle}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {currentStep.title}
            </h2>
          </div>

          <button
            onClick={() => toggleStep(currentStep.step)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              completedSteps.includes(currentStep.step)
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {completedSteps.includes(currentStep.step)
                ? 'Marked Completed'
                : 'Mark Step Completed'}
            </span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
          {currentStep.summary}
        </p>

        {/* Location Info */}
        <div className="p-3 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-xs flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0" />
          <span className="text-gray-800 dark:text-gray-200">
            <strong>Location: </strong> {currentStep.location}
          </span>
        </div>

        {/* Duas for this Step */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-extrabold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
            Important Step Duas
          </h3>
          {currentStep.duas.map((dua, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2"
            >
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100">{dua.label}</div>
              <div
                dir="rtl"
                className="p-3 rounded-xl bg-[#F7F5EF] dark:bg-[#0D1C18] text-right font-arabic font-bold text-lg text-[#0F5C4D] dark:text-[#E8DCC2]"
              >
                {dua.arabic}
              </div>
              <div className="text-xs italic text-gray-600 dark:text-gray-400">
                "{dua.transliteration}"
              </div>
              <div className="text-xs text-gray-800 dark:text-gray-200">{dua.meaning}</div>
            </div>
          ))}
        </div>

        {/* Essential Rules */}
        <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-extrabold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
            Key Guidelines & Prohibitions
          </h3>
          <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
            {currentStep.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C] shrink-0 mt-1.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
