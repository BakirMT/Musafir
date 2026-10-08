import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import { TranslationKey } from '../services/translations';
import {
  LayoutDashboard,
  Compass,
  Clock,
  Landmark,
  UtensilsCrossed,
  Map,
  BookOpen,
  Bot,
  Bookmark,
  User,
  ShieldAlert,
  MoonStar,
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  translationKey: TranslationKey;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
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

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setEmergencyModalOpen,
    t,
  } = useApp();

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white dark:bg-[#0D1C18] border-r border-gray-200 dark:border-gray-800 min-h-[calc(100vh-4rem)] p-3 select-none">
      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#C9A45C]' : 'text-gray-500 dark:text-gray-400'
                }`}
              />
              <span className="truncate">{t(item.translationKey)}</span>
            </button>
          );
        })}
      </nav>

      {/* Emergency SOS Button */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="w-full px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <span>{t('sos')}</span>
        </button>
      </div>
    </aside>
  );
};
