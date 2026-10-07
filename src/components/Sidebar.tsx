import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Clock,
  Landmark,
  UtensilsCrossed,
  Hotel,
  Map,
  CheckSquare,
  BookOpen,
  Sparkles,
  Bot,
  Coins,
  Bookmark,
  User,
  ShieldAlert,
  MoonStar,
  Presentation,
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  category?: 'core' | 'travel' | 'islamic' | 'tools';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard, category: 'core' },
  { id: 'qibla', label: 'Qibla Finder', icon: Compass, category: 'islamic' },
  { id: 'prayer', label: 'Prayer Times', icon: Clock, category: 'islamic' },
  { id: 'mosques', label: 'Nearby Mosques', icon: Landmark, category: 'islamic' },
  { id: 'halal-food', label: 'Halal Food', icon: UtensilsCrossed, category: 'travel' },
  { id: 'hotels', label: 'Muslim Hotels', icon: Hotel, category: 'travel' },
  { id: 'trips', label: 'Trip Planner', icon: Map, badge: 'AI', category: 'travel' },
  { id: 'checklist', label: 'Packing Checklist', icon: CheckSquare, category: 'travel' },
  { id: 'islamic-guide', label: 'Travel Duas & Salah', icon: BookOpen, category: 'islamic' },
  { id: 'hajj-umrah', label: 'Hajj & Umrah', icon: MoonStar, badge: 'Special', category: 'islamic' },
  { id: 'assistant', label: 'Musafir AI', icon: Bot, badge: 'Smart', category: 'tools' },
  { id: 'expenses', label: 'Currency & Budget', icon: Coins, category: 'tools' },
  { id: 'saved', label: 'Saved Places', icon: Bookmark, category: 'tools' },
  { id: 'profile', label: 'Profile & Settings', icon: User, category: 'tools' },
];

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setEmergencyModalOpen,
    setPresentationModeOpen,
    offlineModeActive,
  } = useApp();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-[#0D1C18] border-r border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 min-h-[calc(100vh-4rem)] p-4 select-none">
      {/* Offline Status Badge if enabled */}
      {offlineModeActive && (
        <div className="mb-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold flex items-center gap-2 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Offline Mode Active</span>
        </div>
      )}

      {/* Presentation Mode Quick Button */}
      <button
        onClick={() => setPresentationModeOpen(true)}
        className="mb-4 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#0F5C4D]/10 to-[#C9A45C]/15 hover:from-[#0F5C4D]/15 hover:to-[#C9A45C]/25 text-[#0F5C4D] dark:text-[#E8DCC2] border border-[#C9A45C]/30 text-xs font-bold flex items-center justify-between transition-all group shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Presentation className="w-4 h-4 text-[#C9A45C]" />
          <span>Presentation Mode</span>
        </div>
        <span className="text-[10px] bg-[#C9A45C] text-[#071310] px-1.5 py-0.5 rounded font-black">
          TOUR
        </span>
      </button>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-3 mb-1">
          Daily Faith & Qibla
        </div>
        {NAV_ITEMS.filter((i) => i.category === 'core' || i.category === 'islamic').map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 dark:bg-[#17836E]'
                  : 'text-[#17211E] dark:text-[#E8DCC2] hover:bg-[#F7F5EF] dark:hover:bg-[#071310] text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#C9A45C]' : 'text-[#0F5C4D] dark:text-[#C9A45C]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-[#C9A45C] text-[#071310]'
                      : 'bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-3 pt-3 mb-1">
          Travel & Planning
        </div>
        {NAV_ITEMS.filter((i) => i.category === 'travel').map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 dark:bg-[#17836E]'
                  : 'text-[#17211E] dark:text-[#E8DCC2] hover:bg-[#F7F5EF] dark:hover:bg-[#071310] text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#C9A45C]' : 'text-[#0F5C4D] dark:text-[#C9A45C]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-[#C9A45C] text-[#071310]'
                      : 'bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider px-3 pt-3 mb-1">
          Companion Tools
        </div>
        {NAV_ITEMS.filter((i) => i.category === 'tools').map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 dark:bg-[#17836E]'
                  : 'text-[#17211E] dark:text-[#E8DCC2] hover:bg-[#F7F5EF] dark:hover:bg-[#071310] text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#C9A45C]' : 'text-[#0F5C4D] dark:text-[#C9A45C]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-[#C9A45C] text-[#071310]'
                      : 'bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Floating Emergency SOS Box */}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="w-full px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 active:scale-98 transition-all"
        >
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>Emergency Assistance</span>
        </button>
      </div>
    </aside>
  );
};
