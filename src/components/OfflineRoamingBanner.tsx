import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, Plane, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';

export const OfflineRoamingBanner: React.FC = () => {
  const {
    offlineModeActive,
    setOfflineModeActive,
    setOfflineRoamingModalOpen,
    currentLocation,
    language,
  } = useApp();

  if (!offlineModeActive) return null;

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white px-3.5 py-2 text-xs font-bold shadow-md flex items-center justify-between gap-3 shrink-0 z-30 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center shrink-0">
          <Plane className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="truncate">
          {language === 'ml'
            ? `✈️ ഓഫ്‌ലൈൻ റോമിംഗ് മോഡ് സജീവം (${currentLocation.city}) • ഡാറ്റ ആവശ്യമില്ല • സോളാർ പ്രാർത്ഥനാ ഗണിതവും ഖിബ്‌ലയും ഫത്ഹുൽ മുഈൻ മസ്അലകളും ഓഫ്‌ലൈൻ ലഭ്യമാണ്`
            : language === 'ar'
            ? `✈️ وضع التجوال بلا إنترنت نشط في ${currentLocation.city} • تعمل بوصلة القبلة، مواقيت الصلاة وفقه السفر بدون بيانات`
            : `✈️ Offline Roaming Mode Active (${currentLocation.city}) • Zero mobile data used • Solar prayer math, Qibla compass & Fath al-Mu'in engine fully active`}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setOfflineRoamingModalOpen(true)}
          className="px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/30 text-white text-[11px] font-extrabold flex items-center gap-1 transition-colors"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span className="hidden xs:inline">
            {language === 'ml' ? 'പാക്കുകൾ' : language === 'ar' ? 'الحزم' : 'Offline Packs'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOfflineModeActive(false)}
          className="px-2.5 py-1 rounded-lg bg-white text-amber-900 hover:bg-amber-50 text-[11px] font-extrabold transition-colors shadow-xs"
        >
          {language === 'ml' ? 'ഓൺലൈനാക്കുക' : language === 'ar' ? 'اتصال' : 'Go Online'}
        </button>
      </div>
    </div>
  );
};
