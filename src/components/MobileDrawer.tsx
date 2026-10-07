import React, { useEffect } from 'react';
import { useApp, ActiveTab, GLOBAL_CITIES } from '../context/AppContext';
import { TranslationKey } from '../services/translations';
import {
  Compass,
  LayoutDashboard,
  Clock,
  Landmark,
  UtensilsCrossed,
  Hotel,
  Map,
  CheckSquare,
  BookOpen,
  MoonStar,
  Bot,
  Coins,
  Bookmark,
  User,
  ShieldAlert,
  Presentation,
  X,
  MapPin,
  Navigation,
  Sun,
  Moon,
  Globe,
  Wifi,
  WifiOff,
  ChevronRight,
  Check,
} from 'lucide-react';

interface DrawerNavItem {
  id: ActiveTab;
  translationKey: TranslationKey;
  sublabelKey: TranslationKey;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  category: 'core' | 'travel' | 'islamic' | 'tools';
}

const DRAWER_ITEMS: DrawerNavItem[] = [
  { id: 'dashboard', translationKey: 'dashboard', sublabelKey: 'dashboardSub', icon: LayoutDashboard, category: 'core' },
  { id: 'qibla', translationKey: 'qibla', sublabelKey: 'qiblaSub', icon: Compass, badge: 'Live', category: 'islamic' },
  { id: 'prayer', translationKey: 'prayer', sublabelKey: 'prayerSub', icon: Clock, category: 'islamic' },
  { id: 'mosques', translationKey: 'mosques', sublabelKey: 'mosquesSub', icon: Landmark, category: 'islamic' },
  { id: 'halal-food', translationKey: 'halalFood', sublabelKey: 'halalFoodSub', icon: UtensilsCrossed, category: 'travel' },
  { id: 'hotels', translationKey: 'hotels', sublabelKey: 'hotelsSub', icon: Hotel, category: 'travel' },
  { id: 'trips', translationKey: 'trips', sublabelKey: 'tripsSub', icon: Map, badge: 'AI', category: 'travel' },
  { id: 'checklist', translationKey: 'checklist', sublabelKey: 'checklistSub', icon: CheckSquare, category: 'travel' },
  { id: 'islamic-guide', translationKey: 'islamicGuide', sublabelKey: 'islamicGuideSub', icon: BookOpen, category: 'islamic' },
  { id: 'hajj-umrah', translationKey: 'hajjUmrah', sublabelKey: 'hajjUmrahSub', icon: MoonStar, badge: 'Special', category: 'islamic' },
  { id: 'assistant', translationKey: 'assistant', sublabelKey: 'assistantSub', icon: Bot, badge: 'Smart', category: 'tools' },
  { id: 'expenses', translationKey: 'expenses', sublabelKey: 'expensesSub', icon: Coins, category: 'tools' },
  { id: 'saved', translationKey: 'saved', sublabelKey: 'savedSub', icon: Bookmark, category: 'tools' },
  { id: 'profile', translationKey: 'profile', sublabelKey: 'profileSub', icon: User, category: 'tools' },
];

export const MobileDrawer: React.FC = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeTab,
    setActiveTab,
    currentLocation,
    requestRealLocation,
    locationLoading,
    qiblaDirection,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    offlineModeActive,
    setOfflineModeActive,
    setOfflineRoamingModalOpen,
    downloadedPacks,
    setEmergencyModalOpen,
    setPresentationModeOpen,
    t,
  } = useApp();

  // Handle escape key and lock body scroll when drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
      {/* Dark backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Menu Panel */}
      <div
        className="fixed inset-y-0 left-0 w-[85vw] max-w-xs sm:max-w-sm bg-[#F7F5EF] dark:bg-[#0D1C18] text-[#17211E] dark:text-[#F4F1E8] shadow-2xl flex flex-col border-r border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 z-50 overflow-hidden animate-in slide-in-from-left duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Header with App Brand and Close Button */}
        <div className="p-4 border-b border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 flex items-center justify-between bg-white dark:bg-[#071310] shrink-0">
          <div
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center shadow-md shadow-[#0F5C4D]/25 text-white relative overflow-hidden">
              <Compass className="w-5 h-5 text-[#C9A45C]" />
              <div className="absolute inset-0 rounded-xl border border-[#C9A45C]/30 pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-[#0F5C4D] dark:text-[#E8DCC2]">
                  MUSAFIR
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] font-medium -mt-0.5">
                Travel Far. Pray Anywhere.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#0F5C4D]/10 dark:hover:bg-white/10 active:scale-90 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Location & GPS Info Card */}
        <div className="p-3 mx-3 mt-3 rounded-2xl bg-white dark:bg-[#071310] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm shrink-0">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] font-semibold uppercase tracking-wider">
                  Current Destination
                </div>
                <div className="font-bold text-gray-900 dark:text-gray-100 truncate text-xs">
                  {currentLocation.city}, {currentLocation.country}
                </div>
              </div>
            </div>

            <button
              onClick={requestRealLocation}
              disabled={locationLoading}
              className="px-2.5 py-1.5 rounded-xl bg-[#0F5C4D]/10 dark:bg-[#C9A45C]/15 text-[#0F5C4D] dark:text-[#C9A45C] text-[11px] font-bold hover:bg-[#0F5C4D]/20 flex items-center gap-1 shrink-0 transition-colors"
            >
              <Navigation className={`w-3 h-3 ${locationLoading ? 'animate-spin' : ''}`} />
              <span>{locationLoading ? 'Locating...' : 'GPS'}</span>
            </button>
          </div>

          {/* Quick Qibla info */}
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px]">
            <span className="text-[#6B756F] dark:text-[#9AA9A2]">Kaaba Direction:</span>
            <button
              onClick={() => handleNavigate('qibla')}
              className="font-bold text-[#0F5C4D] dark:text-[#C9A45C] flex items-center gap-1 hover:underline"
            >
              <Compass className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{qiblaDirection}° (Qibla Compass)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Section: Daily Faith & Islamic Tools */}
          <div>
            <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-2 mb-1.5">
              {t('dailyFaith')}
            </div>
            <div className="space-y-1">
              {DRAWER_ITEMS.filter((i) => i.category === 'core' || i.category === 'islamic').map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 dark:bg-[#17836E]'
                        : 'text-gray-800 dark:text-[#E8DCC2] hover:bg-white dark:hover:bg-[#071310]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-white/20 text-[#C9A45C]'
                            : 'bg-[#0F5C4D]/10 dark:bg-[#C9A45C]/15 text-[#0F5C4D] dark:text-[#C9A45C]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="leading-tight">{t(item.translationKey)}</div>
                        <div
                          className={`text-[10px] font-normal leading-tight mt-0.5 ${
                            isActive ? 'text-emerald-100' : 'text-[#6B756F] dark:text-[#9AA9A2]'
                          }`}
                        >
                          {t(item.sublabelKey)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                            isActive
                              ? 'bg-[#C9A45C] text-[#071310]'
                              : 'bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-white' : 'text-gray-400 dark:text-gray-600'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Travel & Planning */}
          <div>
            <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-2 mb-1.5">
              {t('travelAndPlaces')}
            </div>
            <div className="space-y-1">
              {DRAWER_ITEMS.filter((i) => i.category === 'travel').map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 dark:bg-[#17836E]'
                        : 'text-gray-800 dark:text-[#E8DCC2] hover:bg-white dark:hover:bg-[#071310]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-white/20 text-[#C9A45C]'
                            : 'bg-[#0F5C4D]/10 dark:bg-[#C9A45C]/15 text-[#0F5C4D] dark:text-[#C9A45C]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="leading-tight">{t(item.translationKey)}</div>
                        <div
                          className={`text-[10px] font-normal leading-tight mt-0.5 ${
                            isActive ? 'text-emerald-100' : 'text-[#6B756F] dark:text-[#9AA9A2]'
                          }`}
                        >
                          {t(item.sublabelKey)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                            isActive
                              ? 'bg-[#C9A45C] text-[#071310]'
                              : 'bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-white' : 'text-gray-400 dark:text-gray-600'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Companion Tools */}
          <div>
            <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-2 mb-1.5">
              {t('companionTools')}
            </div>
            <div className="space-y-1">
              {DRAWER_ITEMS.filter((i) => i.category === 'tools').map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 dark:bg-[#17836E]'
                        : 'text-gray-800 dark:text-[#E8DCC2] hover:bg-white dark:hover:bg-[#071310]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-white/20 text-[#C9A45C]'
                            : 'bg-[#0F5C4D]/10 dark:bg-[#C9A45C]/15 text-[#0F5C4D] dark:text-[#C9A45C]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="leading-tight">{t(item.translationKey)}</div>
                        <div
                          className={`text-[10px] font-normal leading-tight mt-0.5 ${
                            isActive ? 'text-emerald-100' : 'text-[#6B756F] dark:text-[#9AA9A2]'
                          }`}
                        >
                          {t(item.sublabelKey)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                            isActive
                              ? 'bg-[#C9A45C] text-[#071310]'
                              : 'bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-white' : 'text-gray-400 dark:text-gray-600'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Settings Section: Theme & Language */}
          <div className="pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2.5">
            <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-2">
              {t('preferences')}
            </div>

            {/* Dark Mode vs White/Light Theme (Side-by-side clear choice) */}
            <div className="p-1 rounded-2xl bg-gray-200/60 dark:bg-black/30 border border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-1">
              <button
                onClick={() => setDarkMode(false)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  !darkMode
                    ? 'bg-white text-[#0F5C4D] shadow-md shadow-black/5 ring-1 ring-black/5'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Sun className={`w-4 h-4 ${!darkMode ? 'text-amber-500' : ''}`} />
                <span>{t('whiteTheme')}</span>
              </button>

              <button
                onClick={() => setDarkMode(true)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  darkMode
                    ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Moon className={`w-4 h-4 ${darkMode ? 'text-[#C9A45C]' : ''}`} />
                <span>{t('darkTheme')}</span>
              </button>
            </div>

            {/* Language Switcher Buttons with full names */}
            <div className="p-2.5 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs px-0.5">
                <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200 font-bold">
                  <Globe className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                  <span>{t('language')}</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-[#0F5C4D] dark:text-[#C9A45C]">
                  {language === 'en' ? 'English' : language === 'ml' ? 'മലയാളം' : 'العربية'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all text-center border ${
                    language === 'en'
                      ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ml')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all text-center border ${
                    language === 'ml'
                      ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                  }`}
                >
                  മലയാളം
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`py-2 px-1 rounded-xl text-xs font-bold font-arabic transition-all text-center border ${
                    language === 'ar'
                      ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Offline Mode Toggle & Roaming Hub */}
            <div className="p-2.5 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setOfflineModeActive(!offlineModeActive)}
                  className="flex items-center gap-2.5 text-left flex-1"
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      offlineModeActive
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {offlineModeActive ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-gray-100">
                      {offlineModeActive ? t('offlineMode') : t('onlineMode')}
                    </div>
                    <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
                      {offlineModeActive ? 'Zero data used • Local storage' : 'Live network active'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOfflineModeActive(!offlineModeActive)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                    offlineModeActive
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {offlineModeActive ? 'ACTIVE' : 'OFF'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOfflineRoamingModalOpen(true);
                }}
                className="w-full py-1.5 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] font-bold flex items-center justify-between border border-amber-500/30 transition-all"
              >
                <span>📦 Manage Offline City Packs ({Object.values(downloadedPacks).filter(Boolean).length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tour / Presentation CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setPresentationModeOpen(true);
              }}
              className="w-full px-3 py-2 rounded-2xl bg-[#C9A45C]/15 text-[#0F5C4D] dark:text-[#E8DCC2] border border-[#C9A45C]/35 text-xs font-bold flex items-center justify-between hover:bg-[#C9A45C]/25 transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Presentation className="w-4 h-4 text-[#C9A45C]" />
                <span>Feature Tour Walkthrough</span>
              </div>
              <span className="text-[9px] bg-[#C9A45C] text-[#071310] px-1.5 py-0.5 rounded font-black">
                TOUR
              </span>
            </button>
          </div>
        </div>

        {/* Footer with Emergency Action */}
        <div className="p-3 border-t border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 bg-white dark:bg-[#071310] shrink-0">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setEmergencyModalOpen(true);
            }}
            className="w-full py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 active:scale-95 transition-all"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Emergency Assistance (SOS)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
