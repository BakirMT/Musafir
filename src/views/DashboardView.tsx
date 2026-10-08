import React from 'react';
import { useApp } from '../context/AppContext';
import { KaabaLogo } from '../components/KaabaLogo';
import { HijriCalendar } from '../components/HijriCalendar';
import {
  Compass,
  Clock,
  Landmark,
  UtensilsCrossed,
  ArrowRight,
  MapPin,
  Navigation,
  Bookmark,
  Check,
  Sunrise,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    userName,
    currentLocation,
    prayerTimes,
    qiblaDirection,
    distanceToKaaba,
    setActiveTab,
    places,
    toggleSavePlace,
    isPlaceSaved,
    t,
  } = useApp();

  // Progress bar calculation
  const progressPercent = Math.min(
    100,
    Math.max(10, 100 - (prayerTimes.remainingMinutes / 180) * 100)
  );

  // Filter nearby places matching selected Kerala city or fallback
  const locCityLower = (currentLocation.city || '').toLowerCase().split(' ')[0];
  const cityMosques = places.filter((p) => p.category === 'mosque' && (p.city || '').toLowerCase().includes(locCityLower));
  const nearbyMosques = (cityMosques.length > 0 ? cityMosques : places.filter((p) => p.category === 'mosque')).slice(0, 2);

  const cityFood = places.filter((p) => p.category === 'restaurant' && (p.city || '').toLowerCase().includes(locCityLower));
  const nearbyFood = (cityFood.length > 0 ? cityFood : places.filter((p) => p.category === 'restaurant')).slice(0, 2);

  // 5 daily prayers list for quick preview
  const todayPrayers = [
    { name: 'Fajr', time: prayerTimes.Fajr, icon: Sunrise },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr, icon: Sun },
    { name: 'Asr', time: prayerTimes.Asr, icon: Sun },
    { name: 'Maghrib', time: prayerTimes.Maghrib, icon: Sunset },
    { name: 'Isha', time: prayerTimes.Isha, icon: Moon },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* 1. Header Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3 sm:pb-4 min-w-0">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#0F5C4D] dark:text-[#C9A45C] truncate">
            Assalamu Alaikum, {userName} • കേരള മുസാഫിർ
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight break-words">
            Kerala Muslim Travel & Prayer Guide
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 font-semibold bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full w-fit max-w-full shrink-0">
          <MapPin className="w-3.5 h-3.5 text-[#0F5C4D] dark:text-[#C9A45C] shrink-0" />
          <span className="truncate">{currentLocation.city}, {currentLocation.country}</span>
        </div>
      </div>

      {/* 2. Islamic Hijri & Gregorian Calendar */}
      <HijriCalendar />

      {/* 3. Primary Cards: Next Prayer & Qibla Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 min-w-0">
        {/* Next Prayer Card */}
        <div className="rounded-2xl p-4 sm:p-5 bg-[#0F5C4D] text-white shadow-md flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-100/90 tracking-wide uppercase mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C9A45C]" />
                <span>Next Prayer</span>
              </span>
              <span className="text-[11px] font-normal text-emerald-200 truncate">
                {prayerTimes.remainingFormatted}
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight truncate">
                  {prayerTimes.nextPrayer}
                </h2>
                <div className="text-xl sm:text-2xl font-bold text-[#C9A45C] font-mono mt-0.5">
                  {prayerTimes.nextPrayerTime}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-5 pt-3 border-t border-white/20">
            <div className="w-full h-1.5 rounded-full bg-black/20 overflow-hidden mb-3">
              <div
                className="h-full bg-[#C9A45C] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <button
              onClick={() => setActiveTab('prayer')}
              className="text-xs font-bold text-white hover:text-[#C9A45C] flex items-center gap-1 transition-colors"
            >
              <span>View All Prayer Times</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Qibla Direction Card */}
        <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase mb-2">
              <span className="flex items-center gap-1.5 text-[#0F5C4D] dark:text-[#C9A45C]">
                <Compass className="w-4 h-4" />
                <span>Qibla Direction</span>
              </span>
              <span className="text-[11px] text-gray-500">Makkah</span>
            </div>

            <div className="flex items-center justify-between mt-1 min-w-0">
              <div className="min-w-0">
                <div className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 font-mono">
                  {qiblaDirection}°
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                  {distanceToKaaba.toLocaleString()} km from {currentLocation.city}
                </p>
              </div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-2 border border-gray-100 dark:border-gray-700 shrink-0">
                <KaabaLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-5 pt-3 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setActiveTab('qibla')}
              className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline flex items-center gap-1 transition-colors"
            >
              <span>Open Qibla Compass</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Today's 5 Prayers at a Glance */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm min-w-0 overflow-hidden">
        <div className="flex items-center justify-between mb-2.5 sm:mb-3">
          <h3 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
            Today's Prayer Schedule
          </h3>
          <button
            onClick={() => setActiveTab('prayer')}
            className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline"
          >
            Settings
          </button>
        </div>

        <div className="grid grid-cols-5 gap-1 sm:gap-2 min-w-0">
          {todayPrayers.map((prayer) => {
            const isNext = prayerTimes.nextPrayer === prayer.name;
            return (
              <div
                key={prayer.name}
                className={`p-1.5 sm:p-2.5 rounded-xl text-center transition-all min-w-0 overflow-hidden ${
                  isNext
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'bg-gray-50 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200'
                }`}
              >
                <div className="text-[10px] sm:text-[11px] font-bold truncate">{prayer.name}</div>
                <div className={`text-[10px] sm:text-xs font-extrabold font-mono mt-0.5 sm:mt-1 truncate ${isNext ? 'text-[#C9A45C]' : ''}`}>
                  {prayer.time}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Four Simple Quick Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('qibla')}
          className="p-3.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] text-left transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#0F5C4D] dark:text-[#C9A45C] flex items-center justify-center mb-2">
            <Compass className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Qibla Compass</div>
          <div className="text-[10px] text-gray-500">Direction to Kaaba</div>
        </button>

        <button
          onClick={() => setActiveTab('prayer')}
          className="p-3.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] text-left transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-[#0F5C4D] dark:text-[#C9A45C] flex items-center justify-center mb-2">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Prayer Times</div>
          <div className="text-[10px] text-gray-500">Solat calculation</div>
        </button>

        <button
          onClick={() => setActiveTab('mosques')}
          className="p-3.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] text-left transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-[#C9A45C] flex items-center justify-center mb-2">
            <Landmark className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Nearby Mosques</div>
          <div className="text-[10px] text-gray-500">Places to pray</div>
        </button>

        <button
          onClick={() => setActiveTab('halal-food')}
          className="p-3.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] text-left transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-[#C9A45C] flex items-center justify-center mb-2">
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-gray-900 dark:text-gray-100">Halal Food</div>
          <div className="text-[10px] text-gray-500">Verified restaurants</div>
        </button>
      </div>

      {/* 6. Places Near You Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Nearby in {currentLocation.city}
            </h3>
            <p className="text-xs text-gray-500">
              Verified mosques and Halal restaurants nearby
            </p>
          </div>
          <button
            onClick={() => setActiveTab('mosques')}
            className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Mosques */}
          {nearbyMosques.map((place) => (
            <div
              key={place.id}
              className="rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="h-32 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                  Mosque
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                  {place.distance}
                </span>
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                  {place.name}
                </h4>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {place.address}
                </p>
              </div>

              <div className="p-2.5 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => toggleSavePlace(place.id)}
                  className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
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
                  className="px-2.5 py-1 rounded-lg bg-[#0F5C4D] text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          ))}

          {/* Halal Food */}
          {nearbyFood.map((place) => (
            <div
              key={place.id}
              className="rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="h-32 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-600 text-white text-[10px] font-bold">
                  Halal Food
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                  {place.distance}
                </span>
              </div>

              <div className="p-3">
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                  {place.name}
                </h4>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {place.cuisine}
                </p>
              </div>

              <div className="p-2.5 bg-gray-50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => toggleSavePlace(place.id)}
                  className="p-1 rounded text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
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
                  className="px-2.5 py-1 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
