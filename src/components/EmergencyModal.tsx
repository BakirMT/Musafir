import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_DIRECTORY } from '../services/emergencyData';
import {
  X,
  PhoneCall,
  ShieldAlert,
  Flame,
  Ambulance,
  Hospital,
  Building2,
  Copy,
  Check,
  Share2,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { emergencyModalOpen, setEmergencyModalOpen, currentLocation } = useApp();

  const [selectedCountry, setSelectedCountry] = useState(
    currentLocation.country === 'India'
      ? 'India'
      : EMERGENCY_DIRECTORY[currentLocation.country]
      ? currentLocation.country
      : 'India'
  );

  const [copied, setCopied] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  if (!emergencyModalOpen) return null;

  const contacts = EMERGENCY_DIRECTORY[selectedCountry] || EMERGENCY_DIRECTORY['India'];

  const coordinatesString = `${currentLocation.lat.toFixed(5)}° N, ${currentLocation.lng.toFixed(5)}° E`;

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(
      `Emergency Location: ${currentLocation.city}, ${currentLocation.country}. Coordinates: ${coordinatesString}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLocation = async () => {
    const text = `I need assistance. My current location is ${currentLocation.city}, ${currentLocation.country}. Coordinates: ${coordinatesString} (https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Emergency Location (Musafir)',
          text,
          url: `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`,
        });
      } catch {
        // Fallback to clipboard
        handleCopyCoordinates();
      }
    } else {
      handleCopyCoordinates();
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-lg w-full border border-red-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
              <ShieldAlert className="w-6 h-6 animate-pulse text-white" />
            </div>
            <div>
              <h2 className="text-base font-extrabold tracking-wide uppercase">
                Emergency Assistance (SOS)
              </h2>
              <p className="text-xs text-white/80">Immediate help & location broadcast</p>
            </div>
          </div>
          <button
            onClick={() => setEmergencyModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {/* Location Coordinates Card */}
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
                <MapPin className="w-4 h-4" />
                <span>Current Coordinates</span>
              </div>
              <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                {currentLocation.city}, {currentLocation.country}
              </span>
            </div>
            <div className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
              {coordinatesString}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleCopyCoordinates}
                className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-[#071310] border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Coordinates</span>
                  </>
                )}
              </button>
              <button
                onClick={handleShareLocation}
                className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share My Location</span>
              </button>
            </div>
            {sharedToast && (
              <p className="text-[11px] text-emerald-600 mt-1.5 text-center font-medium">
                Emergency link copied to clipboard!
              </p>
            )}
          </div>

          {/* Country Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Emergency Dispatch Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#071310] border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {Object.keys(EMERGENCY_DIRECTORY).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Emergency Call Action Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Police */}
            <a
              href={`tel:${contacts.police.replace(/\D/g, '')}`}
              className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 hover:border-blue-400 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-300">Police</span>
                <PhoneCall className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-blue-700 dark:text-blue-400">
                {contacts.police}
              </div>
              <span className="text-[10px] text-blue-600/80 mt-1">Tap to call</span>
            </a>

            {/* Ambulance */}
            <a
              href={`tel:${contacts.ambulance.replace(/\D/g, '')}`}
              className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 hover:border-emerald-400 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  Ambulance
                </span>
                <Ambulance className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                {contacts.ambulance}
              </div>
              <span className="text-[10px] text-emerald-600/80 mt-1">Medical dispatch</span>
            </a>

            {/* Fire */}
            <a
              href={`tel:${contacts.fire.replace(/\D/g, '')}`}
              className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 hover:border-orange-400 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-orange-900 dark:text-orange-300">Fire</span>
                <Flame className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-xl font-black text-orange-700 dark:text-orange-400">
                {contacts.fire}
              </div>
              <span className="text-[10px] text-orange-600/80 mt-1">Fire service</span>
            </a>

            {/* Tourist Assistance */}
            <a
              href={`tel:${contacts.touristAssistance.replace(/\D/g, '')}`}
              className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 hover:border-purple-400 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-300">
                  Tourist Police
                </span>
                <PhoneCall className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-sm font-black text-purple-700 dark:text-purple-400 truncate">
                {contacts.touristAssistance}
              </div>
              <span className="text-[10px] text-purple-600/80 mt-1">Multi-lingual info</span>
            </a>
          </div>

          {/* Nearest Hospital & Embassy info */}
          <div className="space-y-2 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 flex items-start gap-2.5">
              <Hospital className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-gray-900 dark:text-gray-100">
                  Emergency Medical Facility
                </div>
                <div className="text-[#6B756F] dark:text-[#9AA9A2]">{contacts.nearestHospital}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-gray-900 dark:text-gray-100">
                  Consular & Embassy Contact
                </div>
                <div className="text-[#6B756F] dark:text-[#9AA9A2]">{contacts.embassyPhone}</div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] italic text-center">
            {contacts.notes}
          </p>
        </div>
      </div>
    </div>
  );
};
