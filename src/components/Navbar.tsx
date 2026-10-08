import React, { useState } from 'react';
import { useApp, GLOBAL_CITIES } from '../context/AppContext';
import {
  Compass,
  MapPin,
  Moon,
  Sun,
  ShieldAlert,
  Search,
  Navigation,
  Globe,
  ChevronDown,
  Menu,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
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
    setMobileMenuOpen,
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Clean list of filtered cities
  const filteredCities = GLOBAL_CITIES.filter((c) =>
    `${c.city} ${c.country}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 dark:bg-[#0D1C18]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 w-full max-w-full min-w-0">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2 shrink min-w-0">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-1.5 sm:gap-2 select-none group text-left min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center shadow-sm text-white shrink-0 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A45C]" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-wider text-[#0F5C4D] dark:text-[#E8DCC2] truncate block">
                <span className="sm:hidden">MUSAFIR</span>
                <span className="hidden sm:inline">MUSAFIR KERALA</span>
              </span>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:block -mt-0.5 truncate">
                Kerala Muslim Travel & Prayer Guide
              </p>
            </div>
          </button>
        </div>

        {/* Center: Location Selector */}
        <div className="relative shrink min-w-0 max-w-[130px] xs:max-w-[160px] sm:max-w-[240px]">
          <button
            onClick={() => {
              setCityDropdownOpen(!cityDropdownOpen);
              setLangDropdownOpen(false);
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-700 w-full min-w-0"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0F5C4D] dark:text-[#C9A45C] shrink-0" />
            <span className="truncate">{currentLocation.city.split('(')[0].trim()}</span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>

          {cityDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setCityDropdownOpen(false)}
              />
              <div className="fixed left-3 right-3 sm:absolute sm:left-0 sm:right-auto sm:w-80 top-14 sm:top-auto sm:mt-2 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xl py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 pb-2 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    Choose Location
                  </span>
                  <button
                    onClick={async () => {
                      await requestRealLocation();
                      setCityDropdownOpen(false);
                    }}
                    disabled={locationLoading}
                    className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline flex items-center gap-1"
                  >
                    <Navigation className={`w-3 h-3 ${locationLoading ? 'animate-spin' : ''}`} />
                    <span>{locationLoading ? 'Locating...' : 'Use My GPS'}</span>
                  </button>
                </div>

                <div className="p-2.5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search city..."
                    autoFocus
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  />
                </div>

                <div className="max-h-56 overflow-y-auto px-1">
                  {filteredCities.slice(0, 20).map((city) => (
                    <button
                      key={`${city.city}-${city.country}`}
                      onClick={() => {
                        setCurrentLocation(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        currentLocation.city === city.city
                          ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10 dark:bg-white/5'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>
                        {city.city}, <span className="text-gray-400">{city.country}</span>
                      </span>
                      {currentLocation.city === city.city && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#C9A45C]" />
                      )}
                    </button>
                  ))}
                  {filteredCities.length === 0 && (
                    <div className="p-4 text-center text-xs text-gray-500">
                      No matching cities found.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right: Clean, focused controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            title="Search"
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCityDropdownOpen(false);
              }}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold flex items-center gap-1"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
              <span className="text-xs uppercase font-bold">
                {language === 'en' ? 'EN' : language === 'ml' ? 'മല' : 'عربي'}
              </span>
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-xl py-1.5 z-50">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      language === 'en'
                        ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <span className="font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ml');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                      language === 'ml'
                        ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>മലയാളം</span>
                    {language === 'ml' && <span className="font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('ar');
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between font-arabic transition-colors ${
                      language === 'ar'
                        ? 'font-bold text-[#0F5C4D] dark:text-[#C9A45C] bg-[#0F5C4D]/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>العربية</span>
                    {language === 'ar' && <span className="font-bold">✓</span>}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
            className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#C9A45C]" />
            ) : (
              <Moon className="w-4 h-4 text-[#0F5C4D]" />
            )}
          </button>

          {/* SOS button (prominent in mobile drawer and footer, hidden in narrow header) */}
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="hidden sm:flex px-2.5 py-1.5 rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 items-center gap-1 transition-colors"
            title="Emergency SOS Contacts"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
