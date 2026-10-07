import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { KAABA_COORDINATES } from '../services/qiblaService';
import {
  Compass,
  MapPin,
  RotateCw,
  Sliders,
  Map,
  ShieldCheck,
  Navigation2,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const QiblaView: React.FC = () => {
  const { currentLocation, qiblaDirection, distanceToKaaba, requestRealLocation, locationLoading } =
    useApp();

  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [sensorAvailable, setSensorAvailable] = useState<boolean>(false);
  const [calibrating, setCalibrating] = useState<boolean>(false);
  const [mapFallbackView, setMapFallbackView] = useState<boolean>(false);
  const [manualOffset, setManualOffset] = useState<number>(0);

  // Device orientation listener with iOS and Android standards
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // iOS webkitCompassHeading (0 = Magnetic North, clockwise)
      if ((e as any).webkitCompassHeading !== undefined) {
        setDeviceHeading((e as any).webkitCompassHeading);
        setSensorAvailable(true);
      } else if (e.alpha !== null) {
        // Standard Android/W3C alpha (0 = North, counter-clockwise or absolute)
        const heading = (360 - e.alpha) % 360;
        setDeviceHeading(heading);
        setSensorAvailable(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Calculate rotation angle
  // If sensor is active: dial rotates by -heading, and Kaaba marker points at (qiblaDirection - heading)
  const effectiveCompassHeading = (deviceHeading !== null ? deviceHeading : 0) + manualOffset;
  const kaabaRelativeAngle = (qiblaDirection - effectiveCompassHeading + 360) % 360;

  // Is phone pointed accurately at Kaaba? (within +/- 5 degrees)
  const isFacingKaaba = Math.abs(kaabaRelativeAngle) <= 6 || Math.abs(kaabaRelativeAngle - 360) <= 6;

  const handleCalibrate = async () => {
    setCalibrating(true);
    // Request device orientation permissions on iOS 13+
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
        console.warn('Orientation permission denied:', err);
      }
    }
    setTimeout(() => {
      setCalibrating(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <Compass className="w-4 h-4" />
            <span>Sacred Direction</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Qibla Finder
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Spherical geodesic orientation toward the Holy Kaaba in Makkah al-Mukarramah
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapFallbackView(!mapFallbackView)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              mapFallbackView
                ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D]'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{mapFallbackView ? 'Compass Mode' : 'Use Map Qibla'}</span>
          </button>

          <button
            onClick={handleCalibrate}
            disabled={calibrating}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#C9A45C] hover:bg-[#b8954e] text-[#071310] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <RotateCw className={`w-3.5 h-3.5 ${calibrating ? 'animate-spin' : ''}`} />
            <span>{calibrating ? 'Calibrating...' : 'Calibrate'}</span>
          </button>
        </div>
      </div>

      {/* Main Coordinate & Angle Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm text-center">
        <div>
          <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
            Current Location
          </span>
          <div className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-100 mt-0.5 truncate px-1">
            {currentLocation.city}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
            Coordinates
          </span>
          <div className="text-xs sm:text-sm font-mono font-bold text-gray-900 dark:text-gray-100 mt-0.5">
            {currentLocation.lat.toFixed(2)}°, {currentLocation.lng.toFixed(2)}°
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
            Qibla Bearing
          </span>
          <div className="text-base sm:text-lg font-black text-[#0F5C4D] dark:text-[#C9A45C] mt-0.5 font-mono">
            {qiblaDirection}°
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider">
            Distance to Kaaba
          </span>
          <div className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
            {distanceToKaaba.toLocaleString()} km
          </div>
        </div>
      </div>

      {!mapFallbackView ? (
        /* Large Elegant Compass Experience */
        <div className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-md flex flex-col items-center justify-center relative overflow-hidden min-h-[460px]">
          {/* Subtle Arabesque Motif in Background */}
          <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

          {/* Facing Kaaba Feedback Banner */}
          <div
            className={`mb-6 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
              isFacingKaaba
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-gray-100 dark:bg-[#071310] text-[#6B756F] dark:text-[#9AA9A2]'
            }`}
          >
            {isFacingKaaba ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>You are facing the Qibla (Kaaba)!</span>
              </>
            ) : (
              <>
                <Compass className="w-4 h-4 text-[#C9A45C]" />
                <span>Rotate your phone until the gold Kaaba aligns at top</span>
              </>
            )}
          </div>

          {/* Large Compass Body */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-8 border-[#0F5C4D]/15 dark:border-[#C9A45C]/25 flex items-center justify-center shadow-2xl bg-gradient-to-b from-[#F7F5EF] to-white dark:from-[#071310] dark:to-[#0D1C18]">
            {/* Outer Compass Degrees Ring */}
            <div
              className="absolute inset-2 rounded-full border border-dashed border-[#0F5C4D]/25 dark:border-[#C9A45C]/30 transition-transform duration-300"
              style={{
                transform: `rotate(${-effectiveCompassHeading}deg)`,
              }}
            >
              {/* Cardinal Markers */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-black text-red-600">
                N
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-black text-gray-500">
                S
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">
                E
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-black text-gray-500">
                W
              </span>
            </div>

            {/* Inner Sacred Gold Ring */}
            <div className="absolute inset-10 rounded-full border-2 border-[#C9A45C]/40 pointer-events-none" />

            {/* Kaaba Direction Needle & Icon */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `rotate(${kaabaRelativeAngle}deg)`,
              }}
            >
              {/* Pointer Arrow */}
              <div className="absolute top-4 flex flex-col items-center">
                {/* Kaaba Minimal Iconic Box */}
                <div className="w-8 h-8 rounded-lg bg-black border-2 border-[#C9A45C] shadow-lg flex items-center justify-center relative group">
                  <span className="w-3 h-0.5 bg-[#C9A45C] absolute top-1" />
                  <span className="text-[8px] font-black text-[#C9A45C]">كعبة</span>
                </div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#C9A45C] mt-1" />
              </div>

              {/* Center Pivot Point */}
              <div className="w-6 h-6 rounded-full bg-[#0F5C4D] border-4 border-white dark:border-[#C9A45C] shadow-lg z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              </div>
            </div>

            {/* Angle in Center Display */}
            <div className="absolute bottom-16 text-center select-none pointer-events-none">
              <div className="text-xl font-black font-mono text-gray-800 dark:text-gray-200">
                {qiblaDirection}°
              </div>
              <div className="text-[10px] uppercase font-bold text-[#6B756F] dark:text-[#9AA9A2]">
                Qibla
              </div>
            </div>
          </div>

          {/* Sensor Info Bar / Manual Adjust */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            <div className="flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#C9A45C]" />
              <span>
                {sensorAvailable
                  ? 'Device compass sensor active (live orientation)'
                  : 'Desktop mode: Compass pointing north. Tap calibrate or use map Qibla.'}
              </span>
            </div>

            {/* Manual Heading Offset Slider for non-sensor environments */}
            {!sensorAvailable && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold">Rotate compass:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={manualOffset}
                  onChange={(e) => setManualOffset(Number(e.target.value))}
                  className="w-28 accent-[#0F5C4D]"
                />
                <span className="text-[10px] font-mono">{manualOffset}°</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Map Qibla Fallback View */
        <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Map className="w-4 h-4 text-[#C9A45C]" />
              <span>Great-Circle Geodesic Line to Makkah</span>
            </h3>
            <span className="text-xs font-mono font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
              Bearing: {qiblaDirection}° Southeast
            </span>
          </div>

          <div className="h-80 rounded-2xl bg-[#091512] relative overflow-hidden border border-gray-200 dark:border-gray-800 flex items-center justify-center p-6">
            <svg className="w-full h-full" viewBox="0 0 400 240">
              {/* Background Map Grid */}
              <defs>
                <pattern id="qiblaGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(201,164,92,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="240" fill="url(#qiblaGrid)" />

              {/* Great Circle Flight Path / Geodesic Ray */}
              <line
                x1="80"
                y1="70"
                x2="320"
                y2="180"
                stroke="#C9A45C"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-pulse"
              />

              {/* User Location Node */}
              <g transform="translate(80, 70)">
                <circle r="10" fill="#0F5C4D" stroke="#ffffff" strokeWidth="2" />
                <circle r="4" fill="#C9A45C" />
                <text x="-25" y="-14" fill="#ffffff" fontSize="10" fontWeight="bold">
                  {currentLocation.city}
                </text>
              </g>

              {/* Kaaba Node */}
              <g transform="translate(320, 180)">
                <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#000000" stroke="#C9A45C" strokeWidth="2" />
                <text x="-18" y="24" fill="#C9A45C" fontSize="10" fontWeight="bold">
                  Holy Kaaba (Makkah)
                </text>
              </g>

              {/* Distance Label along line */}
              <text x="180" y="115" fill="#E8DCC2" fontSize="11" fontWeight="bold">
                {distanceToKaaba.toLocaleString()} km ({qiblaDirection}°)
              </text>
            </svg>
          </div>

          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] leading-relaxed">
            The geodesic line represents the true shortest path on Earth's curved spherical surface connecting {currentLocation.city} to the Holy Kaaba in Makkah (Latitude 21.4225° N, Longitude 39.8262° E).
          </p>
        </div>
      )}
    </div>
  );
};
