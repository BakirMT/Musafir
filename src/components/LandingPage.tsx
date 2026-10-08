import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Clock,
  Landmark,
  UtensilsCrossed,
  Map,
  ShieldAlert,
  WifiOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Presentation,
  Globe2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setPresentationModeOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F5EF] dark:bg-[#071310] text-[#17211E] dark:text-[#F4F1E8] transition-colors overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Islamic Geometric Pattern Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[350px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-[#0F5C4D]/10 via-[#C9A45C]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F5C4D]/10 dark:bg-[#C9A45C]/15 border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] shadow-sm">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>KERALA MUSLIM TRAVEL & PRAYER COMPANION</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0F5C4D] dark:text-[#E8DCC2] leading-[1.15]">
            MUSAFIR KERALA
            <span className="block text-2xl sm:text-3xl font-extrabold text-[#C9A45C] mt-2 font-sans">
              മുസാഫിർ കേരളം • Travel Far. Pray Anywhere.
            </span>
          </h1>

          {/* Tagline & Subtitle */}
          <p className="text-lg sm:text-xl font-medium text-[#6B756F] dark:text-[#9AA9A2] max-w-2xl mx-auto leading-relaxed">
            “Accurate Kerala Prayer Times, Historic Mosques, Malabar Halal Cuisine & Qibla Direction.”
          </p>

          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            From Cheraman Juma Masjid in Kodungallur to the historic wooden Mishkal Palli in Kuttichira Kozhikode and Ponnani, explore God’s Own Country with confidence.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#0F5C4D] hover:bg-[#083C34] text-white font-bold text-sm shadow-xl shadow-[#0F5C4D]/30 flex items-center justify-center gap-2 group transition-all active:scale-95"
            >
              <span>Start Exploring Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setPresentationModeOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-[#0D1C18] hover:bg-[#F7F5EF] text-[#0F5C4D] dark:text-[#E8DCC2] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Presentation className="w-4 h-4 text-[#C9A45C]" />
              <span>Hackathon Presentation Mode</span>
            </button>
          </div>

          {/* Quick Features Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B756F] dark:text-[#9AA9A2] font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sensor Qibla Compass
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Halal Dining
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Offline Trip Caching
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI Travel Itinerary
            </span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#0F5C4D]/10 dark:border-[#C9A45C]/15">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#C9A45C]">
            BUILT FOR THE MODERN MUSLIM TRAVELLER
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 mt-2">
            A Single Digital Companion for Faith & Exploration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Qibla & Prayers */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0F5C4D]/10 flex items-center justify-center text-[#0F5C4D] dark:text-[#C9A45C]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Qibla Anywhere & Solar Times
            </h3>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
              Real device orientation sensors compute the exact angle to the Holy Kaaba with geodesic precision. Accurate global prayer times supporting Diyanet, MWL, and ISNA calculation methods.
            </p>
          </div>

          {/* Card 2: Halal & Mosques */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-[#C9A45C]">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Verified Halal & Mosques
            </h3>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
              Locate nearby mosques with women's prayer facilities, clean wudu areas, and Jumu'ah schedules. Discover transparently verified Halal eateries with alcohol-free filtering.
            </p>
          </div>

          {/* Card 3: AI Itinerary & Offline */}
          <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-[#C9A45C]">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Prayer-Synced Trip Planner
            </h3>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
              Musafir AI generates balanced day-by-day itineraries tailored to your budget that seamlessly integrate around the 5 daily prayers. Download trips for 100% offline access.
            </p>
          </div>
        </div>
      </section>

      {/* Islamic Values & Scholar Disclaimer Section */}
      <section className="py-12 bg-white dark:bg-[#0D1C18] border-t border-[#0F5C4D]/10 dark:border-[#C9A45C]/15">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Committed to Religious Authenticity
          </h3>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed max-w-2xl mx-auto">
            All Islamic Travel Duas and traveller Salah rulings (Qasr and Jama') are directly sourced from authentic traditions (Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud). Musafir serves as an educational travel tool and does not substitute for qualified Islamic scholars.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-[#6B756F] dark:text-[#9AA9A2] space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Compass className="w-4 h-4 text-[#C9A45C]" />
          <span className="font-extrabold text-[#0F5C4D] dark:text-[#E8DCC2]">MUSAFIR</span>
          <span>•</span>
          <span>Travel Far. Pray Anywhere.</span>
        </div>
        <p>© 2026 Musafir. Built for global Muslim explorers.</p>
      </footer>
    </div>
  );
};
