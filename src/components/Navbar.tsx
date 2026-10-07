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
  Menu,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    t,
    currentLocation,
    setCurrentLocation,
    requestRealLocation,
    locationLoading,
    setEmergencyModalOpen,
    setSearchModalOpen,
    setPresentationModeOpen,
    offlineModeActive,
    setOfflineModeActive,
    qiblaDirection,
    setMobileMenuOpen,
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [cityTab, setCityTab] = useState<'kerala' | 'india' | 'global'>('kerala');
  const [searchQuery, setSearchQuery] = useState('');

  const keralaCities = GLOBAL_CITIES.filter((c) =>
    c.city.includes('Kerala') || c.city.includes('Calicut') || c.city.includes('Alleppey') || c.city.includes('Thiruvananthapuram')
  );
  const otherIndiaCities = GLOBAL_CITIES.filter(
    (c) => c.country === 'India' && !keralaCities.some((kc) => kc.city === c.city)
  );
  const globalCities = GLOBAL_CITIES.filter((c) => c.country !== 'India');

  const filteredCities = (
    cityTab === 'kerala' ? keralaCities : cityTab === 'india' ? otherIndiaCities : globalCities
  ).filter(
    (c) =>
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-hidden bg-white/95 dark:bg-[#0D1C18]/95 backdrop-blur-md border-b border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-3 w-full">
        {/* Left: Mobile Menu Button + Brand Logo & Name */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Menu button in mobile size */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 rounded-xl text-gray-700 dark:text-[#E8DCC2] hover:bg-[#0F5C4D]/10 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center shrink-0"
            title="Open Navigation Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 text-[#0F5C4D] dark:text-[#C9A45C]" />
          </button>

          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center shadow-md shadow-[#0F5C4D]/20 text-white relative overflow-hidden group-hover:scale-105 transition-transform shrink-0">
              {/* Islamic Crescent & Compass Route motif */}
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A45C]" />
              <div className="absolute inset-0 rounded-xl border border-[#C9A45C]/30 pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm sm:text-lg tracking-wider text-[#0F5C4D] dark:text-[#E8DCC2]">
                  MUSAFIR
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1 py-0.5 rounded bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30 hidden sm:inline-block">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] hidden md:block -mt-0.5 font-medium">
                Travel Far. Pray Anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Destination Selector */}
        <div className="flex items-center justify-center min-w-0 flex-1 px-1 sm:px-2">
          {/* Location Selector */}
          <div className="relative max-w-full">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-[#F7F5EF] dark:bg-[#071310] hover:bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#E8DCC2] border border-[#0F5C4D]/15 transition-all shadow-xs max-w-full"
            >
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C9A45C] shrink-0" />
              <span className="truncate max-w-[65px] xs:max-w-[95px] sm:max-w-[140px] md:max-w-[190px]">
                {currentLocation.city}
              </span>
              <SlidersHorizontal className="w-3 h-3 text-[#6B756F] shrink-0 hidden xs:inline-block" />
            </button>

            {cityDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setCityDropdownOpen(false)}
                />
                <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-80 max-w-sm rounded-2xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
                      Select Destination
                    </span>
                    <button
                      onClick={async () => {
                        await requestRealLocation();
                        setCityDropdownOpen(false);
                      }}
                      disabled={locationLoading}
                      className="text-[11px] font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline flex items-center gap-1"
                    >
                      <Navigation className={`w-3 h-3 ${locationLoading ? 'animate-spin' : ''}`} />
                      {locationLoading ? 'Locating...' : 'Use My GPS'}
                    </button>
                  </div>

                  {/* Search & Tabs */}
                  <div className="px-3 py-2 space-y-2 border-b border-gray-100 dark:border-gray-800">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search city in Kerala, India..."
                      className="w-full px-2.5 py-1 text-xs rounded-lg bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                    />

                    <div className="flex items-center gap-1 text-[10px] font-bold">
                      <button
                        onClick={() => setCityTab('kerala')}
                        className={`flex-1 py-1 rounded-md text-center transition-all ${
                          cityTab === 'kerala'
                            ? 'bg-[#0F5C4D] text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        🌴 Kerala ({keralaCities.length})
                      </button>
                      <button
                        onClick={() => setCityTab('india')}
                        className={`flex-1 py-1 rounded-md text-center transition-all ${
                          cityTab === 'india'
                            ? 'bg-[#0F5C4D] text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        🇮🇳 India ({otherIndiaCities.length})
                      </button>
                      <button
                        onClick={() => setCityTab('global')}
                        className={`flex-1 py-1 rounded-md text-center transition-all ${
                          cityTab === 'global'
                            ? 'bg-[#0F5C4D] text-white shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        🌍 World
                      </button>
                    </div>
                  </div>

                  <div className="max-h-56 overflow-y-auto py-1">
                    {filteredCities.map((city) => (
                      <button
                        key={city.city}
                        onClick={() => {
                          setCurrentLocation(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center justify-between hover:bg-[#F7F5EF] dark:hover:bg-[#071310] transition-colors ${
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
                    {filteredCities.length === 0 && (
                      <div className="px-3.5 py-3 text-center text-xs text-[#6B756F]">
                        No matching places found.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Qibla Finder Option in Navbar (Desktop) */}
          <button
            onClick={() => setActiveTab('qibla')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 ml-2 rounded-full text-xs font-bold transition-all border shadow-sm ${
              activeTab === 'qibla'
                ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-md shadow-[#0F5C4D]/20'
                : 'bg-[#C9A45C]/15 hover:bg-[#C9A45C]/25 text-[#0F5C4D] dark:text-[#E8DCC2] border-[#C9A45C]/35'
            }`}
            title="Open Qibla Finder directly"
          >
            <Compass className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Qibla</span>
            <span className="font-mono text-[11px] font-black text-[#C9A45C]">
              {qiblaDirection}°
            </span>
          </button>
        </div>

        {/* Right: Global Action Bar */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            title="Search mosques, halal food, duas..."
            className="p-1.5 sm:p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/5 transition-colors shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Presentation Mode CTA */}
          <button
            onClick={() => setPresentationModeOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C9A45C]/15 text-[#C9A45C] hover:bg-[#C9A45C]/25 border border-[#C9A45C]/40 transition-all shadow-sm shrink-0"
            title="Interactive Presentation Walkthrough for Judges"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Tour</span>
          </button>

          {/* Offline Mode Indicator (only shown when offline mode is active) */}
          {offlineModeActive && (
            <button
              onClick={() => setOfflineModeActive(false)}
              title="Offline Roaming Mode Active • Click to switch to Online"
              className="p-1.5 sm:p-2 rounded-xl text-xs font-semibold items-center gap-1 transition-all shrink-0 bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex animate-in fade-in"
            >
              <WifiOff className="w-4 h-4 text-amber-500" />
              <span className="text-[10px] sm:text-[11px] font-bold">Offline</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCityDropdownOpen(false);
              }}
              className="p-1.5 sm:p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/10 transition-colors text-xs font-bold flex items-center gap-1 border border-transparent hover:border-[#0F5C4D]/20 shrink-0"
              title="Change Language (English / മലയാളം / العربية)"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                {language === 'en' ? 'EN' : language === 'ml' ? 'മല' : 'عربي'}
              </span>
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#6B756F] dark:text-[#9AA9A2] border-b border-gray-100 dark:border-gray-800">
                    {t('selectLanguage')}
                  </div>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      language === 'en'
                        ? 'font-extrabold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10 dark:bg-white/5'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="text-[#0F5C4D] dark:text-[#C9A45C] font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ml');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      language === 'ml'
                        ? 'font-extrabold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10 dark:bg-white/5'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span>മലയാളം (Malayalam)</span>
                    {language === 'ml' && <span className="text-[#0F5C4D] dark:text-[#C9A45C] font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ar');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between font-arabic transition-colors ${
                      language === 'ar'
                        ? 'font-extrabold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10 dark:bg-white/5'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span className="text-sm">العربية (Arabic)</span>
                    {language === 'ar' && <span className="text-[#0F5C4D] dark:text-[#C9A45C] font-bold">✓</span>}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Dark / White Theme Toggle (Accessible on mobile & desktop) */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to White / Light Theme' : 'Switch to Dark Theme'}
            aria-label={darkMode ? 'Switch to White Theme' : 'Switch to Dark Theme'}
            className="p-1.5 sm:p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center shrink-0 border border-transparent hover:border-[#0F5C4D]/20"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#C9A45C]" />
            ) : (
              <Moon className="w-4 h-4 text-[#0F5C4D]" />
            )}
          </button>

          {/* Emergency Button */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center justify-center gap-1 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30 active:scale-95 transition-all shrink-0"
            title="Emergency Police, Ambulance, Hospitals & Location"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
