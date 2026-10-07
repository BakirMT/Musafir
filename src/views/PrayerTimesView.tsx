import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CALCULATION_METHODS } from '../services/prayerService';
import { CalculationMethodId, Madhhab, PrayerName } from '../types';
import {
  Clock,
  Calendar,
  Volume2,
  VolumeX,
  Bell,
  Sliders,
  Settings2,
  Sun,
  Sunset,
  Sunrise,
  Moon,
  Sparkles,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

export const PrayerTimesView: React.FC = () => {
  const {
    prayerTimes,
    currentLocation,
    calculationMethod,
    setCalculationMethod,
    madhhab,
    setMadhhab,
    use24Hour,
    setUse24Hour,
    t,
  } = useApp();

  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [playingAdhan, setPlayingAdhan] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const prayerSchedule: {
    name: PrayerName;
    time: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
  }[] = [
    { name: 'Fajr', time: prayerTimes.Fajr, icon: Sunrise, desc: 'Dawn prayer before sunrise' },
    { name: 'Sunrise', time: prayerTimes.Sunrise, icon: Sun, desc: 'End of Fajr prayer window' },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr, icon: Sun, desc: 'Noon prayer after sun passes zenith' },
    { name: 'Asr', time: prayerTimes.Asr, icon: Sun, desc: `Late afternoon (${madhhab} shadow factor)` },
    { name: 'Maghrib', time: prayerTimes.Maghrib, icon: Sunset, desc: 'Sunset prayer' },
    { name: 'Isha', time: prayerTimes.Isha, icon: Moon, desc: 'Night prayer after dusk twilight' },
  ];

  // Adhan sound generator via Web Audio API synth
  const handlePlayAdhanPreview = () => {
    if (playingAdhan) {
      setPlayingAdhan(false);
      return;
    }

    setPlayingAdhan(true);
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      // Harmonic pleasant Adhan tonal bell (A4 -> E5)
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(523.25, audioCtx.currentTime + 1.8);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.5);

      setTimeout(() => {
        setPlayingAdhan(false);
      }, 3500);
    } catch {
      setPlayingAdhan(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <Clock className="w-4 h-4" />
            <span>Daily Solat Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Prayer Times
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            {prayerTimes.gregorianDate} • {prayerTimes.hijriDate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Adhan Preview */}
          <button
            onClick={handlePlayAdhanPreview}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              playingAdhan
                ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
            }`}
          >
            {playingAdhan ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#C9A45C]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
            <span>{playingAdhan ? 'Adhan Chime Playing' : 'Adhan Sound'}</span>
          </button>

          {/* Toggle Calculation Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0F5C4D] hover:bg-[#083C34] text-white flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all"
          >
            <Settings2 className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Calculation Settings</span>
          </button>
        </div>
      </div>

      {/* Active Next Prayer Hero */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-[#0F5C4D] via-[#0b483c] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div>
          <span className="text-xs font-bold text-[#E8DCC2] uppercase tracking-wider">
            {t('nextPrayer').toUpperCase()}
          </span>
          <div className="flex items-baseline gap-3 mt-1">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {(t(prayerTimes.nextPrayer.toLowerCase() as any) as string) || prayerTimes.nextPrayer}
            </h2>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#C9A45C] font-mono">
              {prayerTimes.nextPrayerTime}
            </span>
          </div>
          <p className="text-xs text-white/80 mt-1">
            {prayerTimes.remainingFormatted} in {currentLocation.city}
          </p>
        </div>

        <div className="text-right flex flex-col items-start sm:items-end">
          <div className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm">
            {prayerTimes.hijriDate}
          </div>
          <div className="text-[11px] text-white/70 mt-1.5">
            {CALCULATION_METHODS[calculationMethod].name.split('(')[0]}
          </div>
        </div>
      </div>

      {/* Calculation Settings Drawer (if expanded) */}
      {showSettings && (
        <div className="rounded-3xl p-5 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-lg space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C9A45C]" />
              <span>Calculation & Madhhab Parameters</span>
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-xs text-[#0F5C4D] dark:text-[#C9A45C] font-bold hover:underline"
            >
              Done
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Method */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Calculation Authority
              </label>
              <select
                value={calculationMethod}
                onChange={(e) => setCalculationMethod(e.target.value as CalculationMethodId)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-semibold"
              >
                {Object.values(CALCULATION_METHODS).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Madhhab for Asr */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Asr Juristic Madhhab
              </label>
              <select
                value={madhhab}
                onChange={(e) => setMadhhab(e.target.value as Madhhab)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-semibold"
              >
                <option value="Hanafi">Hanafi (Shadow ratio 2x)</option>
                <option value="Shafi">Shafi'i / Maliki / Hanbali (1x)</option>
              </select>
            </div>

            {/* Time Format */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Time Format
              </label>
              <button
                onClick={() => setUse24Hour(!use24Hour)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-semibold text-left flex items-center justify-between"
              >
                <span>{use24Hour ? '24-Hour (16:42)' : '12-Hour (04:42 PM)'}</span>
                <span className="text-[10px] text-[#0F5C4D] dark:text-[#C9A45C] font-bold">
                  Toggle
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete 6-Prayer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {prayerSchedule.map((item) => {
          const Icon = item.icon;
          const isNext = item.name === prayerTimes.nextPrayer;

          return (
            <div
              key={item.name}
              className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                isNext
                  ? 'bg-[#0F5C4D]/10 dark:bg-[#17836E]/20 border-[#0F5C4D] dark:border-[#C9A45C] shadow-md ring-1 ring-[#0F5C4D]'
                  : 'bg-white dark:bg-[#0D1C18] border-gray-200 dark:border-gray-800 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isNext
                        ? 'bg-[#0F5C4D] text-white dark:bg-[#C9A45C] dark:text-[#071310]'
                        : 'bg-gray-100 dark:bg-[#071310] text-[#0F5C4D] dark:text-[#C9A45C]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                      {(t(item.name.toLowerCase() as any) as string) || item.name}
                    </h3>
                    <span className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
                      {item.desc}
                    </span>
                  </div>
                </div>

                {isNext && (
                  <span className="px-2 py-0.5 rounded-full bg-[#0F5C4D] text-white text-[9px] font-black uppercase tracking-wider">
                    {t('nextPrayer').toUpperCase()}
                  </span>
                )}
              </div>

              <div className="text-2xl font-black text-gray-900 dark:text-gray-100 font-mono mt-2">
                {item.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification and Jumu'ah Notice */}
      <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Bell className="w-4 h-4 text-[#C9A45C] shrink-0" />
          <span className="text-[#17211E] dark:text-[#E8DCC2]">
            <strong>Friday Reminder: </strong>Jumu'ah khutbah in Istanbul typically commences at
            13:00. Arrive early for Sunnah tahiyyatul masjid.
          </span>
        </div>

        <button
          onClick={() => setNotificationEnabled(!notificationEnabled)}
          className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:underline whitespace-nowrap"
        >
          {notificationEnabled ? 'Notifications On' : 'Enable Adhan Alerts'}
        </button>
      </div>
    </div>
  );
};
