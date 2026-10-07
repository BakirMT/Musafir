import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Clock,
  Landmark,
  Map,
  ShieldAlert,
  Menu,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setEmergencyModalOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    t,
  } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'qibla', label: t('qibla'), icon: Compass },
    { id: 'prayer', label: t('prayer'), icon: Clock },
    { id: 'mosques', label: t('explore'), icon: Landmark },
    { id: 'trips', label: t('trips'), icon: Map },
  ];

  return (
    <>
      {/* Floating Emergency SOS Action on Mobile */}
      <div className="md:hidden fixed bottom-18 sm:bottom-20 right-3.5 sm:right-4 z-40">
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/40 flex items-center justify-center border-2 border-white dark:border-[#0D1C18] active:scale-90 transition-transform"
          title="Emergency SOS Help"
          aria-label="Emergency SOS Help"
        >
          <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
        </button>
      </div>

      {/* Optimized Bottom Bar with Efficient Spacing for Smaller Screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D1C18]/95 backdrop-blur-lg border-t border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 px-1 py-1 sm:py-1.5 flex items-center justify-between shadow-lg w-full max-w-full overflow-x-hidden select-none safe-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            !mobileMenuOpen &&
            (activeTab === item.id ||
              (item.id === 'mosques' && (activeTab === 'halal-food' || activeTab === 'hotels')) ||
              (item.id === 'trips' && (activeTab === 'checklist' || activeTab === 'assistant')));

          const isQibla = item.id === 'qibla';

          return (
            <button
              key={item.id}
              onClick={() => {
                if (mobileMenuOpen) setMobileMenuOpen(false);
                setActiveTab(item.id);
              }}
              className={`flex-1 min-w-0 max-w-full flex flex-col items-center justify-center py-1 px-0.5 sm:px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#0F5C4D] dark:text-[#C9A45C] font-extrabold'
                  : 'text-[#6B756F] dark:text-[#9AA9A2] font-medium hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'scale-110 text-[#0F5C4D] dark:text-[#C9A45C]' : ''} transition-transform ${isQibla && isActive ? 'text-[#C9A45C]' : ''}`} />
                {isQibla && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5 truncate max-w-full text-center leading-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#C9A45C] mt-0.5" />
              )}
            </button>
          );
        })}

        {/* Dedicated Menu Button on Mobile Bottom Bar */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex-1 min-w-0 max-w-full flex flex-col items-center justify-center py-1 px-0.5 sm:px-1 rounded-xl transition-all relative ${
            mobileMenuOpen
              ? 'text-[#0F5C4D] dark:text-[#C9A45C] font-extrabold'
              : 'text-[#6B756F] dark:text-[#9AA9A2] font-medium hover:text-gray-900 dark:hover:text-gray-100'
          }`}
          aria-label="Open Navigation Menu"
        >
          <div className="relative flex items-center justify-center">
            <Menu className={`w-4 h-4 sm:w-5 sm:h-5 ${mobileMenuOpen ? 'scale-110 text-[#C9A45C]' : ''} transition-transform`} />
          </div>
          <span className="text-[9px] sm:text-[10px] tracking-tight mt-0.5 truncate max-w-full text-center leading-tight">
            {t('menu')}
          </span>
          {mobileMenuOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#C9A45C] mt-0.5" />
          )}
        </button>
      </nav>
    </>
  );
};
