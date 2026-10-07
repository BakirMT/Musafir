import React from 'react';
import { useApp } from '../context/AppContext';
import { WeatherWidget } from '../components/WeatherWidget';
import { InteractiveMap } from '../components/InteractiveMap';
import { KaabaLogo } from '../components/KaabaLogo';
import {
  Compass,
  Clock,
  Landmark,
  UtensilsCrossed,
  ShieldAlert,
  Map,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  Navigation,
  Bookmark,
  Check,
  Sparkles,
  WifiOff,
  Crosshair,
  Bot,
  BookOpen,
  Plane,
  Download,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userName,
    currentLocation,
    prayerTimes,
    qiblaDirection,
    distanceToKaaba,
    requestRealLocation,
    locationLoading,
    setActiveTab,
    setEmergencyModalOpen,
    activeTrip,
    places,
    toggleSavePlace,
    isPlaceSaved,
    offlineModeActive,
    setOfflineRoamingModalOpen,
    downloadedPacks,
    language,
    t,
  } = useApp();

  // Highlight next prayer progress percentage: 0 to 100
  const progressPercent = Math.min(
    100,
    Math.max(10, 100 - (prayerTimes.remainingMinutes / 180) * 100)
  );

  // Intelligent place filtering matching Kerala, India, or specific cities
  const locCityLower = currentLocation.city.toLowerCase();
  const isKerala =
    locCityLower.includes('kerala') ||
    locCityLower.includes('kochi') ||
    locCityLower.includes('calicut') ||
    locCityLower.includes('kozhikode') ||
    locCityLower.includes('malappuram') ||
    locCityLower.includes('ponnani') ||
    locCityLower.includes('wayanad') ||
    locCityLower.includes('kannur') ||
    locCityLower.includes('kasaragod') ||
    locCityLower.includes('alleppey') ||
    locCityLower.includes('alappuzha') ||
    locCityLower.includes('thiruvananthapuram') ||
    locCityLower.includes('munnar');

  const cityFilteredMosques = places.filter((p) => {
    if (p.category !== 'mosque') return false;
    const pCityLower = p.city?.toLowerCase() || '';
    if (pCityLower.includes(locCityLower.split(' ')[0])) return true;
    if (isKerala && (pCityLower.includes('kerala') || pCityLower.includes('kozhikode') || pCityLower.includes('kochi'))) return true;
    return p.country === currentLocation.country;
  });

  const nearbyMosques = (
    cityFilteredMosques.length > 0
      ? cityFilteredMosques
      : places.filter((p) => p.category === 'mosque')
  ).slice(0, 2);

  const cityFilteredFood = places.filter((p) => {
    if (p.category !== 'restaurant') return false;
    const pCityLower = p.city?.toLowerCase() || '';
    if (pCityLower.includes(locCityLower.split(' ')[0])) return true;
    if (isKerala && (pCityLower.includes('kerala') || pCityLower.includes('kozhikode') || pCityLower.includes('kochi') || pCityLower.includes('malabar'))) return true;
    return p.country === currentLocation.country;
  });

  const nearbyFood = (
    cityFilteredFood.length > 0
      ? cityFilteredFood
      : places.filter((p) => p.category === 'restaurant')
  ).slice(0, 2);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Offline Mode Banner if active */}
      {offlineModeActive && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600" />
            <span className="font-bold">
              OFFLINE MODE ACTIVE: All cached prayers, itinerary, and emergency contacts are ready.
            </span>
          </div>
          <span className="text-[10px] font-semibold bg-amber-500/20 px-2 py-0.5 rounded-full">
            No Data Required
          </span>
        </div>
      )}

      {/* Header Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F5C4D] dark:text-[#C9A45C]">
            <span>Assalamu Alaikum,</span>
            <span className="font-extrabold">{userName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17211E] dark:text-[#F4F1E8] tracking-tight">
            Where are you travelling today?
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#6B756F] dark:text-[#9AA9A2] font-semibold bg-white dark:bg-[#0D1C18] px-3.5 py-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm w-fit">
          <MapPin className="w-4 h-4 text-[#C9A45C]" />
          <span>
            📍 {currentLocation.city}, {currentLocation.country}
          </span>
        </div>
      </div>

      {/* Dual Hero Cards: Next Prayer & Qibla Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
        {/* Card 1: Next Prayer Hero */}
        <div className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 bg-gradient-to-br from-[#0F5C4D] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/25 relative overflow-hidden flex flex-col justify-between">
          {/* Subtle Arabesque Background Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-44 bg-islamic-pattern opacity-15 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-[#E8DCC2] tracking-wider uppercase mb-1.5 sm:mb-3">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A45C]" /> {t('nextPrayer').toUpperCase()}
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/15 text-[9px] sm:text-[10px] font-semibold">
                {prayerTimes.hijriDate}
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-0.5 sm:mt-1">
              <div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  {(t(prayerTimes.nextPrayer.toLowerCase() as any) as string) || prayerTimes.nextPrayer}
                </h2>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C9A45C] mt-0.5 sm:mt-1 font-mono">
                  {prayerTimes.nextPrayerTime}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] sm:text-xs font-semibold text-white/90">
                  {prayerTimes.remainingFormatted}
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/70 mt-0.5">
                  Method: {prayerTimes.methodName.split(' ')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-white/15">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-white/80 mb-1 sm:mb-1.5 font-medium">
              <span>{t('timeRemaining')}</span>
              <span>{prayerTimes.remainingMinutes}m</span>
            </div>
            <div className="w-full h-1.5 sm:h-2 rounded-full bg-black/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C9A45C] to-emerald-300 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 sm:mt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('prayer')}
                className="text-[11px] sm:text-xs font-bold text-[#C9A45C] hover:text-white flex items-center gap-1 transition-colors py-0.5"
              >
                <span>{t('prayer')}</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Qibla Finder Hero */}
        <div
          onClick={() => setActiveTab('qibla')}
          className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-[#0F5C4D]/40 dark:hover:border-[#C9A45C]/50 transition-all group"
          title="Click to open full-screen Qibla Finder"
        >
          <div>
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-[#6B756F] dark:text-[#9AA9A2] tracking-wider uppercase mb-1.5 sm:mb-3">
              <span className="flex items-center gap-1.5 text-[#0F5C4D] dark:text-[#C9A45C]">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t('qibla').toUpperCase()}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#0F5C4D] dark:text-[#C9A45C]">
                Kaaba: Makkah
              </span>
            </div>

            <div className="flex items-center justify-between mt-1 sm:mt-2 gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 font-mono leading-tight">
                  {qiblaDirection}°
                </div>
                <p className="text-[10px] sm:text-xs text-[#6B756F] dark:text-[#9AA9A2] mt-0.5 sm:mt-1 font-medium leading-snug">
                  Bearing from {currentLocation.city} • <strong className="text-gray-800 dark:text-gray-200">{distanceToKaaba.toLocaleString()} km</strong> to Makkah
                </p>
              </div>

              {/* Ka'ba Logo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('qibla');
                }}
                className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border-2 border-[#C9A45C]/30 hover:border-[#C9A45C] bg-[#F7F5EF] dark:bg-[#071310] flex items-center justify-center relative group-hover:scale-105 transition-transform shadow-inner cursor-pointer shrink-0"
                title="Holy Kaaba • Open Qibla Compass"
                aria-label="Holy Kaaba - Open Qibla Compass"
              >
                <KaabaLogo className="w-8 h-8 sm:w-14 sm:h-14" />
              </button>
            </div>
          </div>

          <div className="mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] group-hover:underline flex items-center gap-1 py-0.5">
              <span>Open Qibla Direction</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#6B756F] dark:text-[#9AA9A2] font-semibold">
              Live Sensor
            </span>
          </div>
        </div>
      </div>

      {/* Musafir AI Traveling Mas'ala Assistant Banner */}
      <div
        onClick={() => setActiveTab('assistant')}
        className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-[#0F5C4D]/10 via-[#0F5C4D]/5 to-[#C9A45C]/15 border border-[#0F5C4D]/25 dark:border-[#C9A45C]/35 shadow-sm hover:border-[#0F5C4D]/50 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F5C4D] text-[#C9A45C] flex items-center justify-center shrink-0 shadow-md shadow-[#0F5C4D]/20 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A45C]/20 text-[#0F5C4D] dark:text-[#C9A45C] border border-[#C9A45C]/35">
                MUSAFIR AI SCHOLAR
              </span>
              <span className="text-[10px] sm:text-xs text-[#6B756F] dark:text-[#9AA9A2] font-semibold">
                Shafi'i Fiqh Engine • Fath al-Mu'in & Kanz al-Raghibin
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
              Travelling Mas'ala Assistant (English • മലയാളം • العربية)
            </h4>
            <p className="text-[11px] sm:text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              Instant rulings for Qasr, Jam', praying in planes & trains, stay duration (4 days), and travel fasting.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('assistant');
          }}
          className="px-4 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all self-end sm:self-auto shrink-0"
        >
          <span>Ask Mas'ala</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Actions (Requirement 8) */}
      <div>
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#6B756F] dark:text-[#9AA9A2] mb-3">
          Quick Travel Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          <button
            onClick={() => setActiveTab('qibla')}
            className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5C4D] dark:text-[#C9A45C] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Find Qibla</div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Direction to Kaaba</div>
          </button>

          <button
            onClick={() => setActiveTab('prayer')}
            className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-[#C9A45C] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Prayer Times</div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Daily 6 solar times</div>
          </button>

          <button
            onClick={() => setActiveTab('mosques')}
            className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-[#C9A45C] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Nearby Mosque</div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Jumu'ah & Wudu</div>
          </button>

          <button
            onClick={() => setActiveTab('halal-food')}
            className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-[#C9A45C] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Halal Food</div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Verified dining</div>
          </button>

          <button
            onClick={() => setActiveTab('trips')}
            className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-[#C9A45C] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Map className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Trip Planner</div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Prayer-synced tour</div>
          </button>

          <button
            onClick={() => setOfflineRoamingModalOpen(true)}
            className={`p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all text-left group ${
              offlineModeActive
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-900 dark:text-amber-100'
                : 'bg-white dark:bg-[#0D1C18] border-gray-200 dark:border-gray-800 hover:border-amber-500'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform ${
                offlineModeActive
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-[#C9A45C]'
              }`}
            >
              {offlineModeActive ? <WifiOff className="w-5 h-5" /> : <Plane className="w-5 h-5" />}
            </div>
            <div className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center justify-between">
              <span>Offline Mode</span>
              {offlineModeActive && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
              {offlineModeActive ? 'Zero-data active' : 'Packs & Roaming'}
            </div>
          </button>

          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 hover:border-red-500 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-red-700 dark:text-red-400">Emergency</div>
            <div className="text-[10px] text-red-600/80">SOS & Police</div>
          </button>
        </div>
      </div>

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Upcoming Trip Snippet (Requirement 33) */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#0F5C4D]/10 dark:bg-[#17836E]/20 text-[#0F5C4D] dark:text-[#C9A45C] flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
                ACTIVE TRIP
              </span>
              <span className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                {activeTrip.startDate} — {activeTrip.endDate}
              </span>
            </div>
            <h4 className="text-base font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
              {activeTrip.title}
            </h4>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              {activeTrip.days.length} Days Planned • Prayer synchronized schedule
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('trips')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0F5C4D] to-[#C9A45C] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F2D785]" />
            <span>AI Itinerary Planner</span>
          </button>
          <button
            onClick={() => setActiveTab('trips')}
            className="px-3 py-2.5 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold flex items-center gap-1 shadow-sm hover:bg-gray-50 transition-all"
          >
            <span>View Days</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Near You Section (Requirement 9) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
              Near You in {currentLocation.city}
            </h3>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              Recommended mosques and verified Halal spots within walking distance
            </p>
          </div>

          <button
            onClick={() => setActiveTab('mosques')}
            className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyMosques.map((place) => (
            <div
              key={place.id}
              className="rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-36 relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                    <Landmark className="w-3 h-3 text-[#C9A45C]" />
                    Mosque
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-emerald-600/90 text-white text-[10px] font-bold">
                    {place.distance}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {place.name}
                  </h4>
                  <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] line-clamp-1">
                    {place.address}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-300 font-semibold pt-1">
                    <span className="text-emerald-600 font-bold">✓ Women's Area</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">✓ Wudu</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-[#071310] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => toggleSavePlace(place.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#0F5C4D]"
                >
                  {isPlaceSaved(place.id) ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://maps.google.com/?q=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#0F5C4D] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          ))}

          {nearbyFood.map((place) => (
            <div
              key={place.id}
              className="rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-36 relative overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg bg-amber-600/90 text-white text-[10px] font-bold flex items-center gap-1">
                    <UtensilsCrossed className="w-3 h-3" />
                    Halal Food
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-lg bg-emerald-600/90 text-white text-[10px] font-bold">
                    {place.distance}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {place.name}
                  </h4>
                  <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] line-clamp-1">
                    {place.cuisine}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-300 font-semibold pt-1">
                    <span className="text-emerald-600 font-bold">✓ 100% Halal Meat</span>
                    {place.alcoholFree && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 font-bold">✓ Alcohol-Free</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 dark:bg-[#071310] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => toggleSavePlace(place.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-[#0F5C4D]"
                >
                  {isPlaceSaved(place.id) ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`https://maps.google.com/?q=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Map Section (Requirement 10) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
            Interactive Travel Map
          </h3>
          <span className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Filter pins by Mosques, Halal Food, or Hotels
          </span>
        </div>
        <InteractiveMap />
      </div>
    </div>
  );
};
