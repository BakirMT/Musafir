import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  KAABA_COORDINATES,
  getTurnGuidance,
  getCompassCardinalDirection,
  calculateTiltCompensatedHeading,
} from '../services/qiblaService';
import { KaabaLogo } from '../components/KaabaLogo';
import {
  Compass,
  MapPin,
  Navigation,
  RotateCw,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

const QUICK_CITIES = [
  { name: 'Kozhikode', city: 'Kozhikode (Calicut)', country: 'India', lat: 11.2588, lng: 75.7804, qibla: 291 },
  { name: 'Mannarkkad', city: 'Mannarkkad (Palakkad)', country: 'India', lat: 10.9888, lng: 76.4608, qibla: 291 },
  { name: 'Malappuram', city: 'Malappuram', country: 'India', lat: 11.051, lng: 76.0711, qibla: 291 },
  { name: 'Ponnani', city: 'Ponnani', country: 'India', lat: 10.7672, lng: 75.925, qibla: 291 },
  { name: 'Kochi', city: 'Kochi (Ernakulam)', country: 'India', lat: 9.9312, lng: 76.2673, qibla: 291 },
  { name: 'Kannur', city: 'Kannur', country: 'India', lat: 11.8745, lng: 75.3704, qibla: 291 },
  { name: 'Wayanad', city: 'Wayanad (Kalpetta)', country: 'India', lat: 11.6055, lng: 76.0825, qibla: 291 },
  { name: 'Trivandrum', city: 'Thiruvananthapuram', country: 'India', lat: 8.5241, lng: 76.9366, qibla: 292 },
  { name: 'Makkah', city: 'Makkah', country: 'Saudi Arabia', lat: 21.3891, lng: 39.8579, qibla: 0 },
];

export const QiblaView: React.FC = () => {
  const {
    currentLocation,
    setCurrentLocation,
    qiblaDirection,
    distanceToKaaba,
    requestRealLocation,
    locationLoading,
  } = useApp();

  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [manualHeading, setManualHeading] = useState<number>(0);
  const [sensorAvailable, setSensorAvailable] = useState<boolean>(false);
  const [needsIosPermission, setNeedsIosPermission] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [gpsSuccessToast, setGpsSuccessToast] = useState<boolean>(false);

  // Auto request location on initial mount if not yet GPS-locked
  useEffect(() => {
    if (!currentLocation.isLiveGps) {
      requestRealLocation().catch(() => {});
    }
  }, []);

  // Listen to device orientation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (
      typeof (DeviceOrientationEvent as any) !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      setNeedsIosPermission(true);
    }

    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading: number | null = null;

      // 1. iOS Safari webkitCompassHeading
      if (typeof (e as any).webkitCompassHeading !== 'undefined') {
        const h = (e as any).webkitCompassHeading;
        if (typeof h === 'number' && !isNaN(h)) {
          heading = Math.round(h * 10) / 10;
        }
      }
      // 2. Android Chrome with tilt compensation
      else if (e.alpha !== null && e.beta !== null && e.gamma !== null) {
        heading = calculateTiltCompensatedHeading(e.alpha, e.beta, e.gamma);
      } else if (e.alpha !== null) {
        heading = (360 - e.alpha) % 360;
      }

      if (heading !== null && !isNaN(heading)) {
        setDeviceHeading(heading);
        setSensorAvailable(true);
      }
    };

    // Prefer deviceorientationabsolute if supported (Android Chrome)
    const hasAbsolute = typeof window !== 'undefined' && 'ondeviceorientationabsolute' in (window as any);
    if (hasAbsolute) {
      (window as any).addEventListener('deviceorientationabsolute', handleOrientation);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (hasAbsolute) {
        (window as any).removeEventListener('deviceorientationabsolute', handleOrientation);
      } else {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, [permissionGranted]);

  // Request sensor permission on iOS 13+
  const handleRequestIosPermission = async () => {
    if (
      typeof (DeviceOrientationEvent as any) !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          setNeedsIosPermission(false);
          setSensorAvailable(true);
        }
      } catch (err) {
        console.warn('iOS orientation permission error:', err);
      }
    }
  };

  // Live effective heading (from hardware sensor or manual test slider)
  const effectiveHeading = deviceHeading !== null ? deviceHeading : manualHeading;
  const kaabaRelativeAngle = (qiblaDirection - effectiveHeading + 360) % 360;

  // Real-time turn guidance (turn right / turn left / aligned)
  const turnGuidance = getTurnGuidance(effectiveHeading, qiblaDirection, 4);
  const isAligned = turnGuidance.status === 'aligned';

  const handleUseGps = async () => {
    const ok = await requestRealLocation();
    if (ok) {
      setGpsSuccessToast(true);
      setTimeout(() => setGpsSuccessToast(false), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-4 sm:pb-6 animate-in fade-in duration-200">
      {/* 1. Header with Location & GPS Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#0F5C4D] dark:text-[#C9A45C]" />
            <span>Qibla Finder</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Compass direction to the Holy Kaaba in Makkah
          </p>
        </div>

        <button
          onClick={handleUseGps}
          disabled={locationLoading}
          className="px-3.5 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Navigation className={`w-3.5 h-3.5 ${locationLoading ? 'animate-spin' : ''}`} />
          <span>{locationLoading ? 'Locating...' : 'Use My GPS'}</span>
        </button>
      </div>

      {gpsSuccessToast && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Current location updated! Qibla bearing is {qiblaDirection}°.</span>
        </div>
      )}

      {/* 2. Quick Location Selector Pills */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Current: <strong className="text-gray-900 dark:text-gray-100">{currentLocation.city}</strong></span>
          <span className="text-[11px]">Tap city to switch:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {QUICK_CITIES.map((city) => {
            const isSelected = currentLocation.city === city.city;
            return (
              <button
                key={city.city}
                onClick={() => {
                  setCurrentLocation({
                    city: city.city,
                    country: city.country,
                    lat: city.lat,
                    lng: city.lng,
                    isLiveGps: false,
                    accuracy: 50,
                    timestamp: Date.now(),
                  });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-[#0F5C4D] text-white border-[#0F5C4D] shadow-xs'
                    : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D]'
                }`}
              >
                <span>{city.name}</span>
                <span className="opacity-70 ml-1 text-[10px]">({city.qibla}°)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* iOS Sensor Permission Alert */}
      {needsIosPermission && !sensorAvailable && (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center justify-between gap-3 text-xs">
          <span className="text-amber-900 dark:text-amber-200 font-medium">
            iPhone compass sensor requires one-time permission.
          </span>
          <button
            onClick={handleRequestIosPermission}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs shrink-0"
          >
            Enable Sensor
          </button>
        </div>
      )}

      {/* 3. Central Compass Card */}
      <div
        className={`p-6 rounded-3xl border text-center transition-all shadow-sm relative overflow-hidden flex flex-col items-center justify-center ${
          isAligned
            ? 'bg-emerald-500/10 border-emerald-500/50 dark:bg-emerald-950/20 shadow-emerald-500/10'
            : 'bg-white dark:bg-[#0D1C18] border-gray-200 dark:border-gray-800'
        }`}
      >
        {/* Alignment status banner */}
        <div className="mb-4">
          {isAligned ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
              <Check className="w-3.5 h-3.5" />
              <span>Facing Qibla (Kaaba)</span>
            </div>
          ) : turnGuidance.status === 'turn_right' ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold">
              <span>Turn {turnGuidance.degrees}° to your right</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0F5C4D] dark:text-[#C9A45C]" />
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-bold">
              <ArrowLeft className="w-3.5 h-3.5 text-[#0F5C4D] dark:text-[#C9A45C]" />
              <span>Turn {turnGuidance.degrees}° to your left</span>
            </div>
          )}
        </div>

        {/* Circular Compass Dial */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 select-none flex items-center justify-center">
          {/* Compass outer dial ring (rotates counter to heading) */}
          <div
            className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-black/20 flex items-center justify-center transition-transform duration-100 ease-out"
            style={{ transform: `rotate(${-effectiveHeading}deg)` }}
          >
            {/* Cardinals */}
            <span className="absolute top-2 text-xs font-black text-red-600">N</span>
            <span className="absolute right-3 text-xs font-bold text-gray-400">E</span>
            <span className="absolute bottom-2 text-xs font-bold text-gray-400">S</span>
            <span className="absolute left-3 text-xs font-bold text-gray-400">W</span>

            {/* Dial marks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <div
                key={deg}
                className="absolute w-0.5 h-2 bg-gray-300 dark:bg-gray-600 top-1"
                style={{
                  transformOrigin: '50% 124px',
                  transform: `rotate(${deg}deg)`,
                }}
              />
            ))}
          </div>

          {/* Golden Kaaba Needle (rotates to kaabaRelativeAngle) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-transform duration-100 ease-out"
            style={{ transform: `rotate(${kaabaRelativeAngle}deg)` }}
          >
            {/* Needle Pointing to Kaaba */}
            <div className="flex flex-col items-center -mt-24">
              <div className="w-9 h-9 rounded-full bg-[#C9A45C] text-[#071310] flex items-center justify-center shadow-md p-1.5 border-2 border-white dark:border-[#0D1C18]">
                <KaabaLogo className="w-full h-full" />
              </div>
              <div className="w-1 h-14 bg-gradient-to-b from-[#C9A45C] to-transparent rounded-full mt-0.5" />
            </div>
          </div>

          {/* Center Readout Bubble */}
          <div className="z-10 w-24 h-24 rounded-full bg-white dark:bg-[#0D1C18] border-2 border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
            <span className="text-xl font-black font-mono text-gray-900 dark:text-gray-100">
              {qiblaDirection}°
            </span>
            <span className="text-[10px] font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
              {getCompassCardinalDirection(qiblaDirection).split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Readout metrics below compass */}
        <div className="mt-4 grid grid-cols-2 gap-3 w-full max-w-sm text-left">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <div className="text-[10px] text-gray-500 uppercase font-bold">Phone Heading</div>
            <div className="text-sm font-extrabold text-gray-900 dark:text-gray-100 font-mono">
              {Math.round(effectiveHeading)}° • {getCompassCardinalDirection(effectiveHeading).split(' ')[0]}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
            <div className="text-[10px] text-gray-500 uppercase font-bold">To Kaaba</div>
            <div className="text-sm font-extrabold text-[#0F5C4D] dark:text-[#C9A45C] font-mono">
              {distanceToKaaba.toLocaleString()} km
            </div>
          </div>
        </div>

        {/* Gentle Sensor Hint or Simulator Slider */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800/60 w-full max-w-sm">
          {!sensorAvailable ? (
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Simulate phone rotation:</span>
                <span className="font-mono font-bold">{manualHeading}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={manualHeading}
                onChange={(e) => setManualHeading(Number(e.target.value))}
                className="w-full accent-[#0F5C4D]"
              />
              <p className="text-[10px] text-gray-400 text-center">
                (On mobile devices with compass sensors, the dial rotates automatically)
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-gray-400">
              Hold phone flat horizontally for the most accurate direction reading.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
