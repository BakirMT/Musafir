import React, { useState, useEffect, useRef } from 'react';
import { useApp, GLOBAL_CITIES } from '../context/AppContext';
import {
  KAABA_COORDINATES,
  getCompassCardinalDirection,
  getTurnGuidance,
} from '../services/qiblaService';
import {
  Compass,
  MapPin,
  RotateCw,
  Map,
  CheckCircle2,
  Navigation,
  Crosshair,
  Volume2,
  VolumeX,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Sun,
  ArrowRight,
  ArrowLeft,
  Radio,
  Sliders,
  Share2,
  Search,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const QiblaView: React.FC = () => {
  const {
    currentLocation,
    setCurrentLocation,
    qiblaDirection,
    distanceToKaaba,
    requestRealLocation,
    locationLoading,
    locationError,
  } = useApp();

  // Mode Selection: 'compass' | 'map' | 'sun'
  const [activeMode, setActiveMode] = useState<'compass' | 'map' | 'sun'>('compass');

  // Device orientation state
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [sensorAvailable, setSensorAvailable] = useState<boolean>(false);
  const [calibrating, setCalibrating] = useState<boolean>(false);
  const [calibrationModalOpen, setCalibrationModalOpen] = useState<boolean>(false);
  const [manualOffset, setManualOffset] = useState<number>(0);

  // Audio & UI states
  const [soundFeedback, setSoundFeedback] = useState<boolean>(true);
  const [locationSuccessToast, setLocationSuccessToast] = useState<boolean>(false);
  const [copiedCoordsToast, setCopiedCoordsToast] = useState<boolean>(false);

  // Quick City Switcher options
  const [citySelectorOpen, setCitySelectorOpen] = useState<boolean>(false);
  const [activeCityTab, setActiveCityTab] = useState<'kerala' | 'india' | 'global'>('kerala');
  const [citySearchFilter, setCitySearchFilter] = useState<string>('');

  // Continuous GPS tracking
  const [continuousTracking, setContinuousTracking] = useState<boolean>(false);
  const [liveAccuracy, setLiveAccuracy] = useState<number | null>(currentLocation.accuracy || null);

  const prevAlignedRef = useRef<boolean>(false);
  const watchIdRef = useRef<number | null>(null);

  // Device orientation sensor listener (iOS & Android)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if ((e as any).webkitCompassHeading !== undefined) {
        // iOS Safari (0 = Magnetic North, clockwise)
        setDeviceHeading((e as any).webkitCompassHeading);
        setSensorAvailable(true);
      } else if (e.alpha !== null) {
        // Standard Android/W3C (0 = North, counter-clockwise)
        const heading = (360 - e.alpha) % 360;
        setDeviceHeading(heading);
        setSensorAvailable(true);
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Continuous GPS watch position when requested
  useEffect(() => {
    if (continuousTracking && typeof navigator !== 'undefined' && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setLiveAccuracy(Math.round(pos.coords.accuracy || 10));
          setCurrentLocation({
            city: currentLocation.city,
            country: currentLocation.country,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy || 10),
            isLiveGps: true,
            timestamp: Date.now(),
          });
        },
        (err) => {
          console.warn('WatchPosition error:', err);
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
      );
    } else {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [continuousTracking, currentLocation.city, currentLocation.country, setCurrentLocation]);

  // Compute rotation angles
  const effectiveCompassHeading = (deviceHeading !== null ? deviceHeading : 0) + manualOffset;
  const kaabaRelativeAngle = (qiblaDirection - effectiveCompassHeading + 360) % 360;

  // Real-time turn guidance (turn right / turn left / aligned)
  const turnGuidance = getTurnGuidance(effectiveCompassHeading, qiblaDirection, 4);
  const isFacingKaaba = turnGuidance.status === 'aligned';

  // Haptic & Audio feedback when aligning
  useEffect(() => {
    if (isFacingKaaba && !prevAlignedRef.current) {
      // Haptic vibration
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([40, 60, 40]);
      }
      // Gentle audio chime if sound is enabled
      if (soundFeedback) {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.3); // E5
          gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.6);
        } catch {
          // audio context not allowed without interaction
        }
      }
    }
    prevAlignedRef.current = isFacingKaaba;
  }, [isFacingKaaba, soundFeedback]);

  // Handle GPS location request
  const handleGetLiveLocation = async () => {
    const success = await requestRealLocation();
    if (success) {
      setLocationSuccessToast(true);
      setTimeout(() => setLocationSuccessToast(false), 3500);
    }
  };

  // Calibration request for iOS 13+
  const handleCalibrate = async () => {
    setCalibrating(true);
    if (
      typeof (DeviceOrientationEvent as any) !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setSensorAvailable(true);
        }
      } catch (err) {
        console.warn('Orientation permission error:', err);
      }
    }
    setTimeout(() => {
      setCalibrating(false);
    }, 1500);
  };

  // Copy coordinates & Qibla info
  const handleCopyCoordinates = () => {
    const text = `🕋 Musafir Qibla Direction\n📍 Location: ${currentLocation.city}, ${currentLocation.country}\n🌐 Coordinates: ${currentLocation.lat.toFixed(5)}° N, ${currentLocation.lng.toFixed(5)}° E\n🧭 Qibla Bearing: ${qiblaDirection}° (${getCompassCardinalDirection(qiblaDirection)})\n📏 Distance to Kaaba: ${distanceToKaaba.toLocaleString()} km`;
    navigator.clipboard?.writeText(text);
    setCopiedCoordsToast(true);
    setTimeout(() => setCopiedCoordsToast(false), 3000);
  };

  const isLiveGps =
    currentLocation.isLiveGps ||
    currentLocation.city.includes('GPS') ||
    currentLocation.city.includes('My GPS');

  // Categorized city lists
  const keralaCities = GLOBAL_CITIES.filter(
    (c) =>
      c.city.includes('Kerala') ||
      c.city.includes('Calicut') ||
      c.city.includes('Alleppey') ||
      c.city.includes('Thiruvananthapuram')
  );
  const otherIndiaCities = GLOBAL_CITIES.filter(
    (c) => c.country === 'India' && !keralaCities.some((kc) => kc.city === c.city)
  );
  const globalCities = GLOBAL_CITIES.filter((c) => c.country !== 'India');

  const currentTabCities =
    activeCityTab === 'kerala'
      ? keralaCities
      : activeCityTab === 'india'
      ? otherIndiaCities
      : globalCities;

  const filteredCities = currentTabCities.filter(
    (c) =>
      c.city.toLowerCase().includes(citySearchFilter.toLowerCase()) ||
      c.country.toLowerCase().includes(citySearchFilter.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-14 animate-in fade-in duration-200">
      {/* ============================================================ */}
      {/* 1. TOP HEADER & UNIFIED VIEW ARRANGEMENT OPTIONS              */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <Compass className="w-4 h-4" />
            <span>Sacred Direction</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Qibla Finder
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Spherical geodesic azimuth toward the Holy Kaaba in Makkah al-Mukarramah
          </p>
        </div>

        {/* View Mode Segmented Switcher & Tools */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Segmented Mode Control */}
          <div className="p-1 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center">
            <button
              onClick={() => setActiveMode('compass')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'compass'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Compass</span>
            </button>

            <button
              onClick={() => setActiveMode('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'map'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Map Ray</span>
            </button>

            <button
              onClick={() => setActiveMode('sun')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'sun'
                  ? 'bg-[#0F5C4D] text-white shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Sun & Shadow</span>
            </button>
          </div>

          {/* Quick Action Tools */}
          <button
            onClick={() => setSoundFeedback(!soundFeedback)}
            title={soundFeedback ? 'Alignment Chime Enabled' : 'Alignment Chime Muted'}
            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
              soundFeedback
                ? 'bg-white dark:bg-[#0D1C18] border-gray-200 dark:border-gray-800 text-[#0F5C4D] dark:text-[#C9A45C]'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-200 text-gray-400'
            }`}
          >
            {soundFeedback ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setCalibrationModalOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#C9A45C] hover:bg-[#b8954e] text-[#071310] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            title="Calibrate compass sensor"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calibrate</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CURRENT LOCATION & LIVE GPS CONTROL BAR (HERO ARRANGEMENT) */}
      {/* ============================================================ */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#0F5C4D] via-[#0b483c] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/25 relative overflow-hidden">
        {/* Subtle Decorative Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-islamic-pattern opacity-15 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          {/* Left: Location & Bearing Identity */}
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#C9A45C]/20 border border-[#C9A45C]/40 flex items-center justify-center shrink-0 shadow-inner">
              <Crosshair className={`w-7 h-7 text-[#C9A45C] ${continuousTracking ? 'animate-spin' : 'animate-pulse'}`} />
            </div>

            <div className="space-y-1">
              {/* Status Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wide ${
                  isLiveGps
                    ? 'bg-emerald-400 text-emerald-950 ring-2 ring-emerald-400/40'
                    : 'bg-[#C9A45C] text-[#071310]'
                }`}>
                  {isLiveGps ? 'LIVE GPS ACTIVE' : 'SELECTED LOCATION'}
                </span>

                <span className="text-xs font-mono text-[#E8DCC2]">
                  {currentLocation.lat.toFixed(4)}° N, {currentLocation.lng.toFixed(4)}° E
                </span>

                {liveAccuracy && (
                  <span className="text-[10px] text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full font-mono">
                    Accuracy: ±{liveAccuracy}m
                  </span>
                )}
              </div>

              {/* City Title */}
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {currentLocation.city}, {currentLocation.country}
              </h2>

              {/* Azimuth & Kaaba Distance */}
              <div className="flex items-center gap-3 text-xs text-white/90 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Qibla:</span>
                  <strong className="text-[#C9A45C] font-mono text-base font-extrabold">
                    {qiblaDirection}°
                  </strong>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-[11px] font-bold">
                    {getCompassCardinalDirection(qiblaDirection)}
                  </span>
                </span>

                <span>•</span>

                <span>
                  Distance: <strong className="text-white font-mono">{distanceToKaaba.toLocaleString()} km</strong> to Kaaba
                </span>
              </div>
            </div>
          </div>

          {/* Right: Arranged Action Buttons for Current Location */}
          <div className="flex flex-wrap items-center gap-2.5 sm:self-start lg:self-center">
            {/* 1. Detect My Real Location (Primary) */}
            <button
              onClick={handleGetLiveLocation}
              disabled={locationLoading}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-white text-[#0F5C4D] hover:bg-[#F7F5EF] text-xs font-black shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              <Navigation className={`w-4 h-4 text-[#0F5C4D] ${locationLoading ? 'animate-spin' : ''}`} />
              <span>{locationLoading ? 'Acquiring GPS...' : 'Auto-Detect My GPS'}</span>
            </button>

            {/* 2. Continuous Tracking Toggle */}
            <button
              onClick={() => setContinuousTracking(!continuousTracking)}
              title="Continuously track your position as you walk or travel"
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                continuousTracking
                  ? 'bg-emerald-500/30 border-emerald-300 text-white shadow-sm ring-2 ring-emerald-400/40'
                  : 'bg-black/25 border-white/20 text-white hover:bg-black/40'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${continuousTracking ? 'animate-pulse text-emerald-300' : ''}`} />
              <span>{continuousTracking ? 'Live Watch: ON' : 'Live Watch'}</span>
            </button>

            {/* 3. Open Destination Switcher */}
            <button
              onClick={() => setCitySelectorOpen(!citySelectorOpen)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                citySelectorOpen
                  ? 'bg-[#C9A45C] text-[#071310] border-[#C9A45C]'
                  : 'bg-black/25 border-white/20 text-white hover:bg-black/40'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{citySelectorOpen ? 'Close Places' : 'Kerala / Cities'}</span>
            </button>

            {/* 4. Copy Details */}
            <button
              onClick={handleCopyCoordinates}
              title="Copy GPS coordinates, Qibla heading, and distance"
              className="p-2.5 rounded-2xl bg-black/25 hover:bg-black/40 border border-white/20 text-white flex items-center justify-center transition-all"
            >
              {copiedCoordsToast ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Feedback Toasts */}
        {locationSuccessToast && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/30 border border-emerald-400/50 text-xs font-semibold text-emerald-100 flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Device GPS coordinates locked! Accurate Qibla bearing calculated at {qiblaDirection}° ({getCompassCardinalDirection(qiblaDirection)}).</span>
          </div>
        )}

        {copiedCoordsToast && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-500/30 border border-emerald-400/50 text-xs font-semibold text-emerald-100 flex items-center gap-2 animate-in fade-in duration-150">
            <Check className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>Qibla direction and coordinates copied to clipboard!</span>
          </div>
        )}

        {locationError && (
          <div className="mt-4 p-3 rounded-2xl bg-red-500/25 border border-red-400/50 text-xs font-semibold text-red-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. QUICK DESTINATIONS ACCORDION / DRAWER (KERALA, INDIA, GLOBAL) */}
      {/* ============================================================ */}
      {citySelectorOpen && (
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-md space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A45C]" />
                <span>Select Travel Destination</span>
              </h3>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                Instant spherical Qibla recalculated for any location
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#F7F5EF] dark:bg-[#071310] p-1 rounded-2xl border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setActiveCityTab('kerala')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCityTab === 'kerala'
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#0F5C4D]'
                }`}
              >
                🌴 Kerala Places ({keralaCities.length})
              </button>
              <button
                onClick={() => setActiveCityTab('india')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCityTab === 'india'
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#0F5C4D]'
                }`}
              >
                🇮🇳 Major India ({otherIndiaCities.length})
              </button>
              <button
                onClick={() => setActiveCityTab('global')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCityTab === 'global'
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-[#0F5C4D]'
                }`}
              >
                🌍 Global ({globalCities.length})
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={citySearchFilter}
              onChange={(e) => setCitySearchFilter(e.target.value)}
              placeholder="Search destination (e.g. Kozhikode, Kochi, Malappuram, Delhi)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
            />
          </div>

          {/* City Chips Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 max-h-60 overflow-y-auto">
            {filteredCities.map((city) => {
              const isSelected = currentLocation.city === city.city;
              return (
                <button
                  key={city.city}
                  onClick={() => {
                    setCurrentLocation(city);
                    setCitySelectorOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-sm'
                      : 'bg-[#F7F5EF] dark:bg-[#071310] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D]'
                  }`}
                >
                  <span className="truncate">{city.city}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#C9A45C] shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. MAIN INTERACTIVE EXPERIENCE BASED ON SELECTED MODE         */}
      {/* ============================================================ */}

      {activeMode === 'compass' && (
        /* LIVE COMPASS DIAL VIEW */
        <div className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-md flex flex-col items-center justify-center relative overflow-hidden min-h-[520px]">
          {/* Subtle Arabesque Motif in Background */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none" />

          {/* DYNAMIC TURN GUIDANCE BANNER */}
          <div
            className={`mb-6 px-6 py-3 rounded-full text-xs sm:text-sm font-black tracking-wide uppercase flex items-center gap-2.5 transition-all duration-300 shadow-md ${
              turnGuidance.status === 'aligned'
                ? 'bg-emerald-600 text-white shadow-emerald-500/40 scale-105 ring-4 ring-emerald-400/40 animate-pulse'
                : turnGuidance.status === 'turn_right'
                ? 'bg-amber-500 text-white shadow-amber-500/20'
                : 'bg-teal-700 text-white shadow-teal-700/20'
            }`}
          >
            {turnGuidance.status === 'aligned' ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                <span>PERFECTLY ALIGNED • FACING HOLY KAABA</span>
              </>
            ) : turnGuidance.status === 'turn_right' ? (
              <>
                <span>TURN RIGHT BY {turnGuidance.degrees}°</span>
                <ArrowRight className="w-4 h-4 text-white animate-pulse" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4 text-white animate-pulse" />
                <span>TURN LEFT BY {turnGuidance.degrees}°</span>
              </>
            )}
          </div>

          {/* LARGE COMPASS DIAL */}
          <div
            className={`relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-8 transition-colors duration-500 flex items-center justify-center shadow-2xl bg-gradient-to-b from-[#F7F5EF] to-white dark:from-[#071310] dark:to-[#0D1C18] ${
              isFacingKaaba
                ? 'border-emerald-500 ring-8 ring-emerald-500/25'
                : 'border-[#0F5C4D]/15 dark:border-[#C9A45C]/25'
            }`}
          >
            {/* Compass Degrees & Cardinal Ring (Rotates opposite to device heading) */}
            <div
              className="absolute inset-2 rounded-full border border-dashed border-[#0F5C4D]/25 dark:border-[#C9A45C]/30 transition-transform duration-300"
              style={{
                transform: `rotate(${-effectiveCompassHeading}deg)`,
              }}
            >
              {/* Cardinal Markers */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-black text-red-600">
                N
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-black text-gray-500">
                S
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-black text-gray-500">
                E
              </span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-black text-gray-500">
                W
              </span>

              {/* Degrees Tick lines */}
              <span className="absolute top-1/4 right-3 text-[9px] font-mono text-gray-400">45° NE</span>
              <span className="absolute bottom-1/4 right-3 text-[9px] font-mono text-gray-400">135° SE</span>
              <span className="absolute bottom-1/4 left-3 text-[9px] font-mono text-gray-400">225° SW</span>
              <span className="absolute top-1/4 left-3 text-[9px] font-mono text-gray-400">315° NW</span>
            </div>

            {/* Inner Sacred Gold Ring */}
            <div className="absolute inset-10 rounded-full border-2 border-[#C9A45C]/40 pointer-events-none" />

            {/* Current Device Top Indicator Needle (Phone Forward Heading) */}
            <div className="absolute top-1 w-2.5 h-3 bg-red-600 rounded-b-md shadow-sm pointer-events-none z-20" />

            {/* KAABA POINTER NEEDLE */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `rotate(${kaabaRelativeAngle}deg)`,
              }}
            >
              {/* Top pointer head */}
              <div className="absolute top-3 flex flex-col items-center">
                {/* Kaaba Minimal Box with Gold Kiswah Band */}
                <div
                  className={`w-11 h-11 rounded-xl bg-black border-2 shadow-2xl flex items-center justify-center relative transition-all duration-300 ${
                    isFacingKaaba
                      ? 'border-emerald-400 scale-110 shadow-emerald-500/50'
                      : 'border-[#C9A45C]'
                  }`}
                >
                  <span className="w-6 h-0.5 bg-[#C9A45C] absolute top-2" />
                  <span className="text-[10px] font-black text-[#C9A45C] font-arabic">كعبة</span>
                </div>
                <div
                  className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] mt-1 ${
                    isFacingKaaba ? 'border-t-emerald-500' : 'border-t-[#C9A45C]'
                  }`}
                />
              </div>

              {/* Center Pivot Axis */}
              <div
                className={`w-8 h-8 rounded-full border-4 shadow-lg z-10 flex items-center justify-center transition-colors ${
                  isFacingKaaba
                    ? 'bg-emerald-600 border-white'
                    : 'bg-[#0F5C4D] border-white dark:border-[#C9A45C]'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#C9A45C]" />
              </div>

              {/* Bottom Counterweight needle */}
              <div className="absolute bottom-6 w-1 h-10 bg-gray-400/40 rounded-full" />
            </div>

            {/* Center Qibla Degrees Readout */}
            <div className="absolute bottom-14 text-center select-none pointer-events-none">
              <div className="text-2xl sm:text-3xl font-black font-mono text-gray-900 dark:text-gray-100">
                {qiblaDirection}°
              </div>
              <div className="text-[10px] uppercase font-bold text-[#6B756F] dark:text-[#9AA9A2] tracking-wider">
                {getCompassCardinalDirection(qiblaDirection)}
              </div>
            </div>
          </div>

          {/* SENSOR STATUS & MANUAL CALIBRATION BAR */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  sensorAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>
                {sensorAvailable
                  ? 'Hardware magnetometer active • Real-time orientation'
                  : 'Desktop / Sensor Inactive: Heading simulated to North. Use slider below.'}
              </span>
            </div>

            {/* Manual Heading Slider for Desktop or browsers without hardware magnetometer */}
            {!sensorAvailable && (
              <div className="flex items-center gap-2 bg-[#F7F5EF] dark:bg-[#071310] px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
                <Sliders className="w-3.5 h-3.5 text-[#0F5C4D]" />
                <span className="text-[10px] font-bold">Simulate Heading:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={manualOffset}
                  onChange={(e) => setManualOffset(Number(e.target.value))}
                  className="w-24 accent-[#0F5C4D]"
                />
                <span className="text-[10px] font-mono font-bold">{manualOffset}°</span>
                <button
                  onClick={() => setManualOffset(0)}
                  className="text-[9px] text-[#0F5C4D] hover:underline font-bold"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeMode === 'map' && (
        /* MAP QIBLA FLIGHT RAY VIEW */
        <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Map className="w-4 h-4 text-[#C9A45C]" />
                <span>Geodesic Flight Ray from {currentLocation.city} to Holy Kaaba</span>
              </h3>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                Spherical great-circle azimuth: {qiblaDirection}° ({getCompassCardinalDirection(qiblaDirection)}) • Distance: {distanceToKaaba.toLocaleString()} km
              </p>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${currentLocation.lat},${currentLocation.lng}&destination=${KAABA_COORDINATES.lat},${KAABA_COORDINATES.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold flex items-center gap-1.5 w-fit"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive SVG Geodesic Flight Diagram */}
          <div className="h-80 rounded-2xl bg-[#091512] relative overflow-hidden border border-gray-200 dark:border-gray-800 flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 400 240">
              <defs>
                <pattern id="qiblaGridUnified" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(201,164,92,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="240" fill="url(#qiblaGridUnified)" />

              {/* Connecting Geodesic Vector */}
              <line
                x1="80"
                y1="80"
                x2="320"
                y2="170"
                stroke="#C9A45C"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* Current Location Point */}
              <g transform="translate(80, 80)">
                <circle r="12" fill="#0F5C4D" stroke="#ffffff" strokeWidth="2.5" />
                <circle r="4" fill="#C9A45C" />
                <text x="-35" y="-18" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {currentLocation.city}
                </text>
                <text x="-40" y="24" fill="#9AA9A2" fontSize="9">
                  {currentLocation.lat.toFixed(2)}°, {currentLocation.lng.toFixed(2)}°
                </text>
              </g>

              {/* Kaaba Point in Makkah */}
              <g transform="translate(320, 170)">
                <rect x="-12" y="-12" width="24" height="24" rx="4" fill="#000000" stroke="#C9A45C" strokeWidth="2.5" />
                <line x1="-8" y1="-4" x2="8" y2="-4" stroke="#C9A45C" strokeWidth="1.5" />
                <text x="-25" y="28" fill="#C9A45C" fontSize="11" fontWeight="bold">
                  Holy Kaaba, Makkah
                </text>
                <text x="-20" y="40" fill="#9AA9A2" fontSize="9">
                  21.42° N, 39.83° E
                </text>
              </g>

              {/* Distance Tag on ray */}
              <text x="175" y="115" fill="#E8DCC2" fontSize="11" fontWeight="bold">
                {distanceToKaaba.toLocaleString()} km ({qiblaDirection}°)
              </text>
            </svg>
          </div>

          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            Calculated via forward azimuth spherical trigonometry:
            <code className="text-[#0F5C4D] dark:text-[#C9A45C] font-mono ml-1">
              atan2(sin(Δλ), cos(φ₁)·tan(φ₂) - sin(φ₁)·cos(Δλ))
            </code>.
          </p>
        </div>
      )}

      {activeMode === 'sun' && (
        /* SUN & SHADOW RASD AL-QIBLA GUIDE */
        <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>The Classical Sun & Shadow Method (Rasd al-Qibla)</span>
            </h3>
            <span className="text-[11px] font-bold text-[#C9A45C] bg-[#C9A45C]/15 px-2.5 py-1 rounded-full border border-[#C9A45C]/30">
              Zero-Magnetic Method
            </span>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
            Historically, Muslim navigators across the Arabian Sea and the Malabar coast in Kerala verified the Qibla using solar shadows without relying on magnetic compasses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>1. Universal Kaaba Solar Zenith (Twice Yearly)</span>
              </div>
              <p className="text-xs leading-relaxed">
                Twice every year (around <strong>May 27–28 at 12:18 PM Makkah Time</strong> and <strong>July 15–16 at 12:27 PM Makkah Time</strong>), the sun stands precisely overhead the Kaaba at its zenith.
              </p>
              <p className="text-[11px] font-medium opacity-90">
                Any vertical rod cast in sunlight anywhere in the world will cast a shadow whose exact opposite line points directly toward the Qibla!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                <Compass className="w-4 h-4" />
                <span>2. Daily Local Noon Solar Transit</span>
              </div>
              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
                At local solar noon (Dhuhr entrance), shadows point directly Due North in the Northern hemisphere.
              </p>
              <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                In Kerala and India, turning directly West from North and shifting ~22° northward gives an exact visual check.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. HELPFUL TRAVEL ADVICE CARDS FOR CURRENT LOCATION           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
            <Compass className="w-4 h-4" />
            <span>Kerala & South India Qibla Heading</span>
          </div>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            From Kerala (Kochi, Kozhikode, Malappuram, Wayanad), the Qibla is consistently <strong>West-Northwest (292°–294°)</strong>. From North India (Delhi), it lies towards <strong>280° (West)</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 space-y-1.5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
            <ShieldCheck className="w-4 h-4" />
            <span>Preventing Magnetic Interference</span>
          </div>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            Inside reinforced concrete buildings or near metallic train tracks, wave your device in a figure-8 motion (∞) for 5 seconds to recalibrate the magnetometer.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. SENSOR CALIBRATION MODAL                                  */}
      {/* ============================================================ */}
      {calibrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-[#C9A45C]" />
                <span>Compass Calibration Guide</span>
              </h3>
              <button
                onClick={() => setCalibrationModalOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-700 font-bold"
              >
                Close
              </button>
            </div>

            <div className="text-xs text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                Mobile compass sensors (magnetometer & gyroscope) can be affected by metal objects,
                laptop speakers, or magnetic phone cases.
              </p>

              {/* Figure 8 motion diagram */}
              <div className="p-4 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-center space-y-2">
                <div className="w-16 h-10 border-4 border-dashed border-[#0F5C4D] dark:border-[#C9A45C] rounded-full mx-auto transform -rotate-12 animate-pulse" />
                <span className="text-[11px] font-bold text-[#0F5C4D] dark:text-[#C9A45C] block">
                  Wave your device in a smooth Figure-8 motion (∞)
                </span>
              </div>

              <ul className="list-disc pl-4 space-y-1 text-[11px] text-[#6B756F] dark:text-[#9AA9A2]">
                <li>Hold your phone flat and level with the ground.</li>
                <li>Stay away from large metallic structures or strong electrical magnets.</li>
                <li>Tap calibrate to grant orientation permission if requested by your browser.</li>
              </ul>
            </div>

            <button
              onClick={() => {
                handleCalibrate();
                setCalibrationModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold shadow-md shadow-[#0F5C4D]/25"
            >
              Start Calibration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
