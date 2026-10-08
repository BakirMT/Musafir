import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Compass,
  Clock,
  Landmark,
  UtensilsCrossed,
  Map,
  Bot,
  ShieldAlert,
  WifiOff,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface Step {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tabKey: any;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
  {
    stepNumber: 1,
    title: 'Personalized Muslim Travel Dashboard',
    subtitle: 'Where Travel Meets Faith',
    description:
      'A bespoke, clutter-free dashboard displaying the immediate next prayer countdown, live Qibla bearing, current travel destination coordinates, and upcoming itinerary.',
    highlights: [
      'Real-time prayer countdown with visual progress bar',
      'Dynamic destination selector with instant GPS support',
      'Travel weather widget with prayer walking safety recommendations',
    ],
    tabKey: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    stepNumber: 2,
    title: 'Precise Qibla Compass Finder',
    subtitle: 'Mathematical Spherical Geodesics',
    description:
      'Calculates the exact forward geodesic bearing and Haversine distance to the Kaaba in Makkah (21.4225° N, 39.8262° E) with real device orientation sensor support and Map Qibla fallback.',
    highlights: [
      'Device orientation API integration (gyroscope & magnetometer)',
      'Sensor calibration prompt for mobile browsers',
      'Distance to Holy Kaaba in kilometers',
    ],
    tabKey: 'qibla',
    icon: Compass,
  },
  {
    stepNumber: 3,
    title: 'Accurate Astronomical Prayer Times',
    subtitle: 'Global Solar Calculation Engine',
    description:
      'Computes accurate Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha times anywhere on Earth. Supports major calculation authorities and Shafi/Hanafi Asr shadow factors.',
    highlights: [
      '6 global calculation methods (Diyanet, MWL, ISNA, Egypt, Makkah, Karachi)',
      'Madhhab shadow selection (1x vs 2x shadow for Asr)',
      'Astronomical Hijri calendar conversion',
    ],
    tabKey: 'prayer',
    icon: Clock,
  },
  {
    stepNumber: 4,
    title: 'Nearby Mosques & Community Facilities',
    subtitle: 'Worship with Complete Ease',
    description:
      'Locate authentic local mosques with deep facility transparency: women’s prayer areas, ablution (wudu) fountains, wheelchair accessibility, and Friday Jumu’ah khutbah times.',
    highlights: [
      'Verified tags for women’s prayer halls & ablution spaces',
      'Friday Jumu’ah khutbah language & schedule info',
      'Instant in-app interactive map pin & navigation routing',
    ],
    tabKey: 'mosques',
    icon: Landmark,
  },
  {
    stepNumber: 5,
    title: 'Halal Food Discovery & Verification',
    subtitle: 'Transparent Halal Standards',
    description:
      'Discover halal restaurants, cafes, and markets. Every entry is categorized with transparent verification levels: Verified Halal, Community Reported, or Unverified.',
    highlights: [
      'Clear verification tiers to prevent misleading claims',
      'Strict alcohol-free environment filtering',
      'Authentic Ottoman & local cuisine recommendations',
    ],
    tabKey: 'halal-food',
    icon: UtensilsCrossed,
  },
  {
    stepNumber: 6,
    title: 'Prayer-Synchronized Trip Planner',
    subtitle: 'AI Muslim Travel Itineraries',
    description:
      'Plan multi-day journeys where daily sightseeing, museum tours, and meals are harmoniously structured around the 5 daily prayers rather than rushing between activities.',
    highlights: [
      'Intelligent scheduling around Fajr, Dhuhr, Asr, Maghrib & Isha',
      'AI Itinerary generator powered by Gemini 3.8 Flash',
      'Integrated packing checklist with Islamic essentials',
    ],
    tabKey: 'trips',
    icon: Map,
  },
  {
    stepNumber: 7,
    title: 'Musafir AI Travel Companion',
    subtitle: 'Grounded, Respectful AI Assistance',
    description:
      'Ask complex Muslim travel questions, from traveller prayer rules (Qasr/Jama\') to wudu on flights and halal dining. Religious answers cite classical sources with proper scholarly disclaimers.',
    highlights: [
      'Powered by modern @google/genai SDK on server-side',
      'Authentic Hadith citations (Bukhari, Muslim) for traveller Salah',
      'Scholarly disclaimer preserving traditional Islamic authority',
    ],
    tabKey: 'assistant',
    icon: Bot,
  },
  {
    stepNumber: 8,
    title: 'Emergency Assistance (SOS Mode)',
    subtitle: 'Safety Wherever You Land',
    description:
      'Country-specific emergency dispatch directory. One-tap dialing for Police, Ambulance, Fire, Tourist Police, and local English/Arabic-speaking hospitals with GPS broadcast.',
    highlights: [
      'Automatic country directory (India / Kerala 112, Saudi Arabia, UAE, etc.)',
      'One-tap GPS coordinates copy & emergency share link',
      'Consular and multilingual hospital contacts',
    ],
    tabKey: 'dashboard',
    icon: ShieldAlert,
  },
  {
    stepNumber: 9,
    title: 'Offline Travel Mode & PWA Caching',
    subtitle: 'Peace of Mind Without Roaming Data',
    description:
      'One-click download saves full trip itineraries, offline prayer schedules, emergency hotlines, and travel duas into local device storage. Built with Service Worker PWA standards.',
    highlights: [
      'Zero-connectivity offline readiness with localStorage & cache',
      'PWA installation support for iOS & Android home screens',
      'Visual offline banner assuring travellers in low-reception zones',
    ],
    tabKey: 'dashboard',
    icon: WifiOff,
  },
];

export const PresentationMode: React.FC = () => {
  const { presentationModeOpen, setPresentationModeOpen, setActiveTab, setEmergencyModalOpen, downloadTripOffline } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!presentationModeOpen) return null;

  const currentStep = STEPS[currentStepIndex];
  const Icon = currentStep.icon;

  const handleGoToTab = () => {
    setActiveTab(currentStep.tabKey);
    if (currentStep.stepNumber === 8) {
      setEmergencyModalOpen(true);
    }
    if (currentStep.stepNumber === 9) {
      downloadTripOffline();
    }
    setPresentationModeOpen(false);
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-2xl w-full border-2 border-[#C9A45C] shadow-2xl overflow-hidden flex flex-col">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#0F5C4D] via-[#083C34] to-[#0F5C4D] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C9A45C]/20 border border-[#C9A45C] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C9A45C]">
                  Hackathon Presentation Mode
                </span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  Step {currentStep.stepNumber} of {STEPS.length}
                </span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight">
                {currentStep.title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setPresentationModeOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F5C4D]/10 dark:bg-[#17836E]/20 flex items-center justify-center shrink-0 border border-[#0F5C4D]/20">
              <Icon className="w-6 h-6 text-[#0F5C4D] dark:text-[#C9A45C]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C9A45C] uppercase tracking-wider">
                {currentStep.subtitle}
              </span>
              <p className="text-sm text-gray-700 dark:text-gray-200 mt-1 leading-relaxed">
                {currentStep.description}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-[#F7F5EF] dark:bg-[#071310] rounded-2xl p-4 border border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 space-y-2">
            <div className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider">
              Technical & Architectural Highlights
            </div>
            {currentStep.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Step Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {STEPS.map((step, idx) => (
              <button
                key={step.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                title={step.title}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-[#0F5C4D] dark:bg-[#C9A45C]'
                    : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-gray-50 dark:bg-[#071310] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed text-gray-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <button
            onClick={handleGoToTab}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#C9A45C] hover:bg-[#b8954e] text-[#071310] shadow-md shadow-[#C9A45C]/30 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>Jump Directly to Feature</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === STEPS.length - 1}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
              currentStepIndex === STEPS.length - 1
                ? 'opacity-40 cursor-not-allowed text-gray-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
