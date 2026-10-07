import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRESET_OFFLINE_PACKS, getOfflineStorageSummary } from '../services/offlineService';
import {
  WifiOff,
  Wifi,
  Download,
  CheckCircle2,
  Trash2,
  HardDrive,
  ShieldCheck,
  Compass,
  Clock,
  Landmark,
  BookOpen,
  X,
  Sparkles,
  Plane,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const OfflineRoamingModal: React.FC = () => {
  const {
    offlineRoamingModalOpen,
    setOfflineRoamingModalOpen,
    offlineModeActive,
    setOfflineModeActive,
    downloadedPacks,
    downloadCityPack,
    deleteCityPack,
    t,
    language,
  } = useApp();

  const [downloadingPackId, setDownloadingPackId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);

  if (!offlineRoamingModalOpen) return null;

  const storage = getOfflineStorageSummary(downloadedPacks);
  const percentage = Math.min(100, Math.round((storage.usedMB / storage.totalQuotaMB) * 100));

  const handleDownload = async (packId: string, cityName: string) => {
    setDownloadingPackId(packId);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(async () => {
      clearInterval(interval);
      setDownloadProgress(100);
      await downloadCityPack(packId, cityName);
      setTimeout(() => {
        setDownloadingPackId(null);
        setDownloadProgress(0);
      }, 400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/25 dark:border-[#C9A45C]/35 rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between shrink-0 bg-gradient-to-r from-[#0F5C4D]/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center text-white shadow-md shadow-[#0F5C4D]/25 shrink-0">
              <Plane className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-gray-100">
                  {language === 'ml'
                    ? 'ഓഫ്‌ലൈൻ റോമിംഗ് മോഡ്'
                    : language === 'ar'
                    ? 'وضع التجوال بلا إنترنت'
                    : 'Offline Roaming Mode'}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
                  Zero Data
                </span>
              </div>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                {language === 'ml'
                  ? 'ഇൻ്റർനെറ്റില്ലാതെ യാത്ര ചെയ്യുമ്പോൾ പ്രാർത്ഥനകളും ഖിബ്‌ലയും മസ്അലകളും ലഭ്യമാക്കുക'
                  : language === 'ar'
                  ? 'استخدم بوصلة القبلة، مواقيت الصلاة، وفقه السفر بدون اتصال بالإنترنت'
                  : 'Travel without international roaming charges or in airplane mode'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOfflineRoamingModalOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 pr-2 sm:pr-4">
          {/* Main Master Toggle Card */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              offlineModeActive
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-950 dark:text-amber-100 shadow-sm'
                : 'bg-gray-50 dark:bg-[#071310] border-gray-200 dark:border-gray-800'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    offlineModeActive
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {offlineModeActive ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span>
                      {offlineModeActive
                        ? language === 'ml'
                          ? 'റോമിംഗ് മോഡ് സജീവം (ഓഫ്‌ലൈൻ)'
                          : language === 'ar'
                          ? 'وضع التجوال نشط (بلا إنترنت)'
                          : 'Offline Roaming Active'
                        : language === 'ml'
                        ? 'ഓൺലൈൻ മോഡ്'
                        : language === 'ar'
                        ? 'الوضع متصل بالإنترنت'
                        : 'Standard Online Mode'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                    {offlineModeActive
                      ? language === 'ml'
                        ? 'ഡാറ്റാ കണക്ഷനില്ലാതെ എല്ലാ ഫീച്ചറുകളും സുരക്ഷിതമായി പ്രവർത്തിക്കുന്നു'
                        : language === 'ar'
                        ? 'يعمل التطبيق بالكامل من الذاكرة المحلية والبوصلة بدون استهلاك للبيانات'
                        : 'Simulating zero-data mode: App uses pre-cached packs & device sensors'
                      : language === 'ml'
                      ? 'ഇന്റർനെറ്റ് ലഭ്യമാകുമ്പോൾ തത്സമയ അപ്‌ഡേറ്റുകൾ നേടുന്നു'
                      : language === 'ar'
                      ? 'يستخدم الاتصال بالإنترنت للبحث وتحديث البيانات'
                      : 'Connected to live network for live AI, cloud sync, and map updates'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => setOfflineModeActive(!offlineModeActive)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors shrink-0 cursor-pointer ${
                  offlineModeActive ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                role="switch"
                aria-checked={offlineModeActive}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                    offlineModeActive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Offline Capabilities Overview Grid */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6B756F] dark:text-[#9AA9A2] mb-2.5">
              {language === 'ml'
                ? 'ഓഫ്‌ലൈനിൽ ലഭ്യമാകുന്ന സൗകര്യങ്ങൾ'
                : language === 'ar'
                ? 'المميزات المتوفرة بدون إنترنت'
                : '100% Offline Muslim Travel Capabilities'}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                  <Compass className="w-4 h-4" />
                  <span>Qibla Sensor</span>
                </div>
                <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                  Hardware magnetometer + Solar Shadow math
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                  <Clock className="w-4 h-4" />
                  <span>Prayer Math</span>
                </div>
                <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                  Accurate solar angles without GPS tower ping
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                  <BookOpen className="w-4 h-4" />
                  <span>Shafi'i Fiqh</span>
                </div>
                <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                  Full Fath al-Mu'in & Kanz al-Raghibin database
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                  <Landmark className="w-4 h-4" />
                  <span>Saved Spots</span>
                </div>
                <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                  Cached mosques, halal dining & offline duas
                </p>
              </div>
            </div>
          </div>

          {/* Storage Meter */}
          <div className="p-3.5 rounded-2xl bg-[#0F5C4D]/5 dark:bg-[#0F5C4D]/10 border border-[#0F5C4D]/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-gray-800 dark:text-gray-200">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                <span>Offline Storage Quota</span>
              </span>
              <span className="text-[#0F5C4D] dark:text-[#C9A45C]">
                {storage.usedMB} MB / {storage.totalQuotaMB} MB ({storage.packsCount} City Bundles)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0F5C4D] to-[#C9A45C] transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* City Packs Download List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6B756F] dark:text-[#9AA9A2]">
                {language === 'ml'
                  ? 'ഡൗൺലോഡ് ചെയ്യാവുന്ന സിറ്റി പാക്കുകൾ'
                  : language === 'ar'
                  ? 'حزم المدن القابلة للتحميل أوفلاين'
                  : 'Downloadable Offline City Packs'}
              </h4>
              <span className="text-[11px] font-semibold text-[#0F5C4D] dark:text-[#C9A45C]">
                Instant offline caching
              </span>
            </div>

            <div className="space-y-2.5">
              {PRESET_OFFLINE_PACKS.map((pack) => {
                const isDownloaded = Boolean(downloadedPacks[pack.id]);
                const isDownloading = downloadingPackId === pack.id;

                return (
                  <div
                    key={pack.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#071310] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs hover:border-[#0F5C4D]/30 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900 dark:text-gray-100">
                          {pack.cityName}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          {pack.country}
                        </span>
                        {isDownloaded && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Downloaded</span>
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                        {pack.mosquesCount} Verified Mosques • {pack.halalSpotsCount} Halal Eateries • 365
                        Days Solar Angles • {pack.sizeMB} MB
                      </p>

                      {isDownloading && (
                        <div className="w-48 h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden mt-2">
                          <div
                            className="h-full bg-[#0F5C4D] transition-all duration-200"
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {isDownloaded ? (
                        <button
                          type="button"
                          onClick={() => deleteCityPack(pack.id, pack.cityName)}
                          className="px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-bold flex items-center gap-1 transition-all"
                          title="Delete pack to free storage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDownload(pack.id, pack.cityName)}
                          disabled={isDownloading}
                          className="px-3.5 py-1.5 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all disabled:opacity-50"
                        >
                          {isDownloading ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>{downloadProgress}%</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
                              <span>Download ({pack.sizeMB} MB)</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#071310] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            <ShieldCheck className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
            <span>Encrypted local storage • No background telemetry</span>
          </div>

          <button
            onClick={() => setOfflineRoamingModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold hover:bg-[#083C34] transition-all shadow-md shadow-[#0F5C4D]/25"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};
