import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff } from 'lucide-react';

export const OfflineRoamingBanner: React.FC = () => {
  const {
    offlineModeActive,
    setOfflineModeActive,
  } = useApp();

  if (!offlineModeActive) return null;

  return (
    <div className="w-full bg-amber-600 text-white px-4 py-1.5 text-xs font-semibold flex items-center justify-between gap-3 shrink-0 z-30">
      <div className="flex items-center gap-2">
        <WifiOff className="w-3.5 h-3.5" />
        <span>Offline Mode Active • Cached prayers and compass working without internet</span>
      </div>

      <button
        type="button"
        onClick={() => setOfflineModeActive(false)}
        className="px-2 py-0.5 rounded bg-white text-amber-900 text-xs font-bold hover:bg-amber-50 transition-colors"
      >
        Go Online
      </button>
    </div>
  );
};
