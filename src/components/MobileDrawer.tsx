import React, { useEffect } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { TranslationKey } from '../services/translations';
import {
  Compass,
  LayoutDashboard,
  Clock,
  Landmark,
  UtensilsCrossed,
  Map,
  BookOpen,
  MoonStar,
  Bot,
  Bookmark,
  User,
  ShieldAlert,
  X,
  Sun,
  Moon,
  ChevronRight,
} from 'lucide-react';

interface DrawerNavItem {
  id: ActiveTab;
  translationKey: TranslationKey;
  icon: React.ComponentType<{ className?: string }>;
}

const DRAWER_ITEMS: DrawerNavItem[] = [
  { id: 'dashboard', translationKey: 'dashboard', icon: LayoutDashboard },
  { id: 'qibla', translationKey: 'qibla', icon: Compass },
  { id: 'prayer', translationKey: 'prayer', icon: Clock },
  { id: 'mosques', translationKey: 'mosques', icon: Landmark },
  { id: 'halal-food', translationKey: 'halalFood', icon: UtensilsCrossed },
  { id: 'trips', translationKey: 'trips', icon: Map },
  { id: 'islamic-guide', translationKey: 'islamicGuide', icon: BookOpen },
  { id: 'hajj-umrah', translationKey: 'hajjUmrah', icon: MoonStar },
  { id: 'assistant', translationKey: 'assistant', icon: Bot },
  { id: 'saved', translationKey: 'saved', icon: Bookmark },
  { id: 'profile', translationKey: 'profile', icon: User },
];

export const MobileDrawer: React.FC = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    activeTab,
    setActiveTab,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    setEmergencyModalOpen,
    t,
  } = useApp();

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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 w-[80vw] max-w-xs bg-white dark:bg-[#0D1C18] text-gray-900 dark:text-gray-100 shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-left duration-200 border-r border-gray-200 dark:border-gray-800"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center text-white">
              <Compass className="w-4 h-4 text-[#C9A45C]" />
            </div>
            <span className="font-extrabold text-base tracking-wider text-[#0F5C4D] dark:text-[#E8DCC2]">
              MUSAFIR KERALA
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {DRAWER_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#0F5C4D] text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C9A45C]' : 'text-gray-500'}`} />
                  <span>{t(item.translationKey)}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            );
          })}

          {/* Preferences */}
          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-gray-500 font-medium">Theme</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-800 font-semibold flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-[#0F5C4D]" />}
                <span>{darkMode ? 'Dark' : 'Light'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-xs text-gray-500 font-medium">Language</span>
              <div className="flex gap-1">
                {(['en', 'ml', 'ar'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-0.5 text-xs rounded-md font-bold ${
                      language === lang
                        ? 'bg-[#0F5C4D] text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Emergency */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800 shrink-0">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setEmergencyModalOpen(true);
            }}
            className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>{t('sos')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
