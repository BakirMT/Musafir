import React from 'react';
import { useApp } from '../context/AppContext';
import { CloudSun, Droplets, Wind, Sunrise, Sunset, AlertCircle } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { currentLocation, prayerTimes } = useApp();

  // City-tailored realistic weather presets
  const getWeatherForCity = (city: string) => {
    switch (city) {
      case 'Istanbul':
        return {
          temp: 19,
          condition: 'Partly Sunny & Mild',
          humidity: 64,
          wind: '14 km/h NNE',
          alert: 'Ideal weather for walking between Sultanahmet mosques. Light breeze near the Bosphorus shoreline.',
          high: 22,
          low: 14,
        };
      case 'Makkah':
        return {
          temp: 36,
          condition: 'Sunny & Hot',
          humidity: 28,
          wind: '9 km/h E',
          alert: 'High midday heat. Recommended to perform Tawaf after Isha or early morning Fajr; stay well hydrated.',
          high: 40,
          low: 29,
        };
      case 'Madinah':
        return {
          temp: 32,
          condition: 'Clear Skies',
          humidity: 22,
          wind: '11 km/h NE',
          alert: 'Pleasant evening courtyard conditions at Al-Masjid an-Nabawi. Shaded umbrellas open during daytime.',
          high: 35,
          low: 24,
        };
      case 'London':
        return {
          temp: 14,
          condition: 'Light Showers',
          humidity: 78,
          wind: '18 km/h W',
          alert: 'Carry a compact umbrella for walking to Regent’s Park Mosque.',
          high: 16,
          low: 10,
        };
      default:
        return {
          temp: 24,
          condition: 'Pleasant & Clear',
          humidity: 55,
          wind: '12 km/h',
          alert: 'Favorable conditions for local exploration and congregation prayers.',
          high: 26,
          low: 18,
        };
    }
  };

  const weather = getWeatherForCity(currentLocation.city);

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-[#C9A45C]" />
            <h3 className="text-sm font-bold text-[#17211E] dark:text-[#E8DCC2]">
              Travel Weather & Forecast
            </h3>
          </div>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            {currentLocation.city}, {currentLocation.country}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-[#0F5C4D] dark:text-[#E8DCC2]">
            {weather.temp}°C
          </span>
          <span className="text-xs font-semibold text-[#6B756F] dark:text-[#9AA9A2]">
            {weather.condition}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2 border-y border-gray-100 dark:border-gray-800 text-xs">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-sky-500" />
          <div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Humidity</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">{weather.humidity}%</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-teal-600" />
          <div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Wind</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">{weather.wind}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4 text-amber-500" />
          <div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Sunrise</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">{prayerTimes.Sunrise}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sunset className="w-4 h-4 text-orange-500" />
          <div>
            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">Sunset (Maghrib)</div>
            <div className="font-bold text-gray-800 dark:text-gray-200">{prayerTimes.Maghrib}</div>
          </div>
        </div>
      </div>

      {/* Travel Safety Guidance */}
      <div className="mt-3 flex items-start gap-2 p-2.5 rounded-xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-xs">
        <AlertCircle className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
        <span className="text-[#17211E] dark:text-[#E8DCC2] leading-relaxed">
          <strong className="font-semibold text-[#0F5C4D] dark:text-[#C9A45C]">Travel Tip: </strong>
          {weather.alert}
        </span>
      </div>
    </div>
  );
};
