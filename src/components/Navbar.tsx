import React, { useState } from 'react';
import { useApp, GLOBAL_CITIES, ActiveTab } from '../context/AppContext';
import {
  Compass,
  MapPin,
  Moon,
  Sun,
  ShieldAlert,
  Search,
  Wifi,
  WifiOff,
  Navigation,
  Globe,
  SlidersHorizontal,
  Sparkles,
  Presentation,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    currentLocation,
    setCurrentLocation,
    requestRealLocation,
    locationLoading,
    setEmergencyModalOpen,
    setSearchModalOpen,
    setPresentationModeOpen,
    offlineModeActive,
    setOfflineModeActive,
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0D1C18]/95 backdrop-blur-md border-b border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center shadow-md shadow-[#0F5C4D]/20 text-white relative overflow-hidden group-hover:scale-105 transition-transform">
            {/* Islamic Crescent & Compass Route motif */}
            <Compass className="w-5 h-5 text-[#C9A45C]" />
            <div className="absolute inset-0 rounded-xl border border-[#C9A45C]/30 pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-wider text-[#0F5C4D] dark:text-[#E8DCC2]">
                MUSAFIR
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] hidden sm:block -mt-0.5 font-medium">
              Travel Far. Pray Anywhere.
            </p>
          </div>
        </div>

        {/* Location Selector */}
        <div className="relative">
          <button
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F7F5EF] dark:bg-[#071310] hover:bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#E8DCC2] border border-[#0F5C4D]/15 transition-all shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span className="truncate max-w-[120px] sm:max-w-[180px]">
              {currentLocation.city}, {currentLocation.country}
            </span>
            <SlidersHorizontal className="w-3 h-3 text-[#6B756F]" />
          </button>

          {cityDropdownOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-64 rounded-2xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
                  Select Travel Destination
                </span>
                <button
                  onClick={async () => {
                    await requestRealLocation();
                    setCityDropdownOpen(false);
                  }}
                  disabled={locationLoading}
                  className="text-[11px] font-semibold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  {locationLoading ? 'Locating...' : 'Use GPS'}
                </button>
              </div>
              <div className="max-h-56 overflow-y-auto py-1">
                {GLOBAL_CITIES.map((city) => (
                  <button
                    key={city.city}
                    onClick={() => {
                      setCurrentLocation(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#F7F5EF] dark:hover:bg-[#071310] transition-colors ${
                      currentLocation.city === city.city
                        ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/5'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <span>
                      {city.city},{' '}
                      <span className="text-[#6B756F] dark:text-[#9AA9A2]">{city.country}</span>
                    </span>
                    {currentLocation.city === city.city && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#C9A45C]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Global Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            title="Search mosques, halal food, duas..."
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/5 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Presentation Mode CTA */}
          <button
            onClick={() => setPresentationModeOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C9A45C]/15 text-[#C9A45C] hover:bg-[#C9A45C]/25 border border-[#C9A45C]/40 transition-all shadow-sm"
            title="Interactive Presentation Walkthrough for Judges"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Tour</span>
          </button>

          {/* Offline Mode Toggle */}
          <button
            onClick={() => setOfflineModeActive(!offlineModeActive)}
            title={offlineModeActive ? 'Offline Travel Mode Active' : 'Online Mode'}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
              offlineModeActive
                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/5'
            }`}
          >
            {offlineModeActive ? (
              <WifiOff className="w-4 h-4 text-amber-500" />
            ) : (
              <Wifi className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/5 transition-colors text-xs font-bold flex items-center gap-1"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
              <span className="uppercase text-[11px] font-bold">{language}</span>
            </button>
            <div className="absolute right-0 mt-1 hidden group-hover:block w-32 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xl py-1 z-50">
              <button
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-3 py-1.5 text-xs ${
                  language === 'en' ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C]' : ''
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`w-full text-left px-3 py-1.5 text-xs ${
                  language === 'ml' ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C]' : ''
                }`}
              >
                മലയാളം (Malayalam)
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`w-full text-left px-3 py-1.5 text-xs font-arabic ${
                  language === 'ar' ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C]' : ''
                }`}
              >
                العربية (Arabic)
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Light / Dark Mode"
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/5 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#C9A45C]" /> : <Moon className="w-4 h-4 text-[#0F5C4D]" />}
          </button>

          {/* Emergency Button (Highly visible red/gold highlight) */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 active:scale-95 transition-all"
            title="Emergency Police, Ambulance, Hospitals & Location"
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
