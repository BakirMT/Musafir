import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Clock,
  Landmark,
  Menu,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    t,
  } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'qibla', label: t('qibla'), icon: Compass },
    { id: 'prayer', label: t('prayer'), icon: Clock },
    { id: 'mosques', label: t('explore'), icon: Landmark },
  ];

  return (
    <nav
      style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D1C18]/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-2 py-1.5 flex items-center justify-around shadow-lg select-none"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = !mobileMenuOpen && activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              if (mobileMenuOpen) setMobileMenuOpen(false);
              setActiveTab(item.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-[#0F5C4D] dark:text-[#C9A45C] font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}

      {/* Menu / More */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
          mobileMenuOpen
            ? 'text-[#0F5C4D] dark:text-[#C9A45C] font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        aria-label="More Menu"
      >
        <Menu className={`w-5 h-5 ${mobileMenuOpen ? 'scale-110' : ''} transition-transform`} />
        <span className="text-[10px] mt-0.5">{t('menu')}</span>
      </button>
    </nav>
  );
};
