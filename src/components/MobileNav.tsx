import React from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Clock,
  Landmark,
  Map,
  ShieldAlert,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, setEmergencyModalOpen } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'qibla', label: 'Qibla', icon: Compass },
    { id: 'prayer', label: 'Prayer', icon: Clock },
    { id: 'mosques', label: 'Explore', icon: Landmark },
    { id: 'trips', label: 'Trips', icon: Map },
  ];

  return (
    <>
      {/* Floating Emergency SOS Action on Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setEmergencyModalOpen(true)}
          className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/40 flex items-center justify-center border-2 border-white dark:border-[#0D1C18] active:scale-90 transition-transform"
          title="Emergency Help"
        >
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </button>
      </div>

      {/* Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0D1C18]/95 backdrop-blur-lg border-t border-[#0F5C4D]/10 dark:border-[#C9A45C]/15 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeTab === item.id ||
            (item.id === 'mosques' && (activeTab === 'halal-food' || activeTab === 'hotels')) ||
            (item.id === 'trips' && (activeTab === 'checklist' || activeTab === 'assistant'));

          const isQibla = item.id === 'qibla';

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#0F5C4D] dark:text-[#C9A45C] font-extrabold'
                  : 'text-[#6B756F] dark:text-[#9AA9A2] font-medium'
              } ${isQibla && isActive ? 'scale-105' : ''}`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform ${isQibla && isActive ? 'text-[#C9A45C]' : ''}`} />
                {isQibla && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A45C]" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C4D] dark:bg-[#C9A45C] mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};
