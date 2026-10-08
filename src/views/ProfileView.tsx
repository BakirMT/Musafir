import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CALCULATION_METHODS } from '../services/prayerService';
import { CalculationMethodId, Madhhab, Language } from '../types';
import {
  User,
  Settings,
  Shield,
  Moon,
  Sun,
  Globe,
  Bell,
  MapPin,
  Trash2,
  Download,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    userName,
    setUserName,
    userEmail,
    darkMode,
    setDarkMode,
    language,
    setLanguage,
    calculationMethod,
    setCalculationMethod,
    madhhab,
    setMadhhab,
    selectedCurrency,
    setSelectedCurrency,
    savedPlaceIds,
    trips,
    setActiveTab,
    offlineModeActive,
    setOfflineModeActive,
    t,
  } = useApp();

  const [editName, setEditName] = useState(false);
  const [nameVal, setNameVal] = useState(userName);
  const [clearedToast, setClearedToast] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameVal.trim()) {
      setUserName(nameVal.trim());
      setEditName(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear your saved travel bookmarks and expenses?')) {
      localStorage.removeItem('musafir_saved_places');
      localStorage.removeItem('musafir_expenses');
      setClearedToast(true);
      setTimeout(() => {
        setClearedToast(false);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header Profile Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F5C4D] via-[#0b483c] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/25 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C9A45C] to-[#E8DCC2] text-[#071310] flex items-center justify-center font-black text-2xl shadow-lg border-4 border-white/20 shrink-0">
          {userName.charAt(0)}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              {editName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameVal}
                    onChange={(e) => setNameVal(e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-white/20 text-white font-bold text-lg"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#C9A45C] text-black font-bold text-xs rounded-lg"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <h2 className="text-xl sm:text-2xl font-black">{userName}</h2>
              )}
              <p className="text-xs text-white/80">{userEmail}</p>
            </div>

            <button
              onClick={() => setEditName(!editName)}
              className="text-xs text-[#C9A45C] font-bold hover:underline"
            >
              {editName ? 'Cancel' : 'Edit Profile Name'}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3 text-xs text-white/90">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              ✈️ {trips.length} Active Trips
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              🔖 {savedPlaceIds.length} Saved Places
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              🕌 Madhhab: {madhhab}
            </span>
          </div>
        </div>
      </div>

      {clearedToast && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-400">
          Travel data reset. Refreshing...
        </div>
      )}

      {/* Preferences Section */}
      <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#C9A45C]" />
          <span>Prayer & Travel Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Calculation Method */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              Prayer Calculation Authority
            </label>
            <select
              value={calculationMethod}
              onChange={(e) => setCalculationMethod(e.target.value as CalculationMethodId)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
            >
              {Object.values(CALCULATION_METHODS).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Madhhab */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              Asr Madhhab (Shadow Length)
            </label>
            <select
              value={madhhab}
              onChange={(e) => setMadhhab(e.target.value as Madhhab)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
            >
              <option value="Hanafi">Hanafi School (2x shadow)</option>
              <option value="Shafi">Shafi'i / Maliki / Hanbali (1x shadow)</option>
            </select>
          </div>

          {/* Preferred Currency */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              Default Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
            >
              <option value="USD">USD ($)</option>
              <option value="TRY">TRY (₺)</option>
              <option value="EUR">EUR (€)</option>
              <option value="INR">INR (₹)</option>
              <option value="AED">AED (AED)</option>
              <option value="SAR">SAR (SAR)</option>
            </select>
          </div>

          {/* Interface Language */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              {t('language')} & Script
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                  language === 'en'
                    ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                    : 'bg-gray-50 dark:bg-[#071310] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ml')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                  language === 'ml'
                    ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                    : 'bg-gray-50 dark:bg-[#071310] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                മലയാളം
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`py-2 px-2 rounded-xl text-xs font-bold font-arabic transition-all border ${
                  language === 'ar'
                    ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                    : 'bg-gray-50 dark:bg-[#071310] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                العربية
              </button>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold text-xs"
            >
              <option value="en">English (Default)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
              <option value="ar">العربية (Arabic - RTL)</option>
            </select>
          </div>
        </div>
      </div>

      {/* App Appearance & Offline Mode */}
      <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Moon className="w-4 h-4 text-[#C9A45C]" />
          <span>{t('theme')} & Data Mode</span>
        </h3>

        {/* Visual Theme Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => setDarkMode(false)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
              !darkMode
                ? 'bg-amber-500/10 border-[#0F5C4D] ring-2 ring-[#0F5C4D]/20 shadow-sm'
                : 'bg-gray-50 dark:bg-[#071310] border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${!darkMode ? 'bg-[#0F5C4D] text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-600'}`}>
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <span>{t('whiteTheme')}</span>
                {!darkMode && <span className="text-[10px] font-black uppercase text-[#0F5C4D] bg-[#0F5C4D]/15 px-1.5 py-0.5 rounded">Active</span>}
              </div>
              <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] mt-0.5">
                Crisp light surfaces with emerald & gold accents. Perfect for bright sunlight.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDarkMode(true)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
              darkMode
                ? 'bg-[#0F5C4D]/15 border-[#C9A45C] ring-2 ring-[#C9A45C]/30 shadow-sm'
                : 'bg-gray-50 dark:bg-[#071310] border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${darkMode ? 'bg-[#0F5C4D] text-[#C9A45C]' : 'bg-gray-200 dark:bg-gray-800 text-gray-600'}`}>
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <span>{t('darkTheme')}</span>
                {darkMode && <span className="text-[10px] font-black uppercase text-[#C9A45C] bg-[#C9A45C]/20 px-1.5 py-0.5 rounded">Active</span>}
              </div>
              <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] mt-0.5">
                Deep charcoal and nighttime palette. Gentle on eyes and saves battery.
              </p>
            </div>
          </button>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">Dark / White Theme Switch</div>
              <div className="text-[#6B756F] dark:text-[#9AA9A2]">
                {darkMode ? 'Currently using Dark Theme' : 'Currently using White Theme'}
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                darkMode ? 'bg-[#0F5C4D]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                Offline Roaming Mode
              </div>
              <div className="text-[#6B756F] dark:text-[#9AA9A2]">
                Disable remote network requests and rely on local storage
              </div>
            </div>
            <button
              onClick={() => setOfflineModeActive(!offlineModeActive)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                offlineModeActive ? 'bg-amber-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  offlineModeActive ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Data Clearing (Requirement 30) */}
      <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Privacy & Travel Data Control</span>
          </h4>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] mt-0.5">
            Musafir does not store your location logs on external servers. You can reset or delete local travel data anytime.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('privacy')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={handleClearData}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 hover:bg-red-100 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Stored Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
