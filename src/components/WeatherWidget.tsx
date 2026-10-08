import React from 'react';
import { useApp } from '../context/AppContext';
import { CloudSun, Droplets, Wind, Sunrise, Sunset, AlertCircle } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { currentLocation, prayerTimes } = useApp();

  // City-tailored realistic weather presets for Kerala and pilgrimage hubs
  const getWeatherForCity = (city: string) => {
    const cLower = city.toLowerCase();

    if (cLower.includes('kozhikode') || cLower.includes('calicut')) {
      return {
        temp: 29,
        condition: 'Warm & Malabar Coast Breeze',
        humidity: 74,
        wind: '11 km/h SW',
        alert: 'Serene coastal atmosphere in Kuttichira. Ideal for evening prayer at historic Mishkal Mosque and beachside Malabar dining.',
        high: 32,
        low: 24,
      };
    }
    if (cLower.includes('mannarkkad') || cLower.includes('palakkad')) {
      return {
        temp: 30,
        condition: 'Sunny with Western Ghats Breeze',
        humidity: 68,
        wind: '9 km/h ENE',
        alert: 'Warm sunny weather near Silent Valley foothills. Clean mountain air and pleasant prayer conditions.',
        high: 33,
        low: 23,
      };
    }
    if (cLower.includes('malappuram') || cLower.includes('ponnani') || cLower.includes('tirur')) {
      return {
        temp: 29,
        condition: 'Tropical Coastal Breeze',
        humidity: 76,
        wind: '12 km/h W',
        alert: 'Pleasant evening atmosphere in historic Ponnani port and Biyyam Kayal waterside.',
        high: 32,
        low: 24,
      };
    }
    if (cLower.includes('kochi') || cLower.includes('kodungallur') || cLower.includes('ernakulam')) {
      return {
        temp: 30,
        condition: 'Tropical Coastal Breeze',
        humidity: 78,
        wind: '13 km/h WSW',
        alert: 'Pleasant sea breeze along Fort Kochi and Muziris. Ideal for visiting Cheraman Juma Masjid (629 CE).',
        high: 32,
        low: 25,
      };
    }
    if (cLower.includes('wayanad') || cLower.includes('munnar')) {
      return {
        temp: 22,
        condition: 'Cool Mist & Hill Station Breeze',
        humidity: 82,
        wind: '8 km/h NE',
        alert: 'Refreshing mountain climate. Comfortable cool weather for rainforest travel and peaceful prayer.',
        high: 25,
        low: 17,
      };
    }
    if (cLower.includes('kannur') || cLower.includes('thalassery') || cLower.includes('kasaragod')) {
      return {
        temp: 29,
        condition: 'Tropical Coastal Sunshine',
        humidity: 75,
        wind: '12 km/h SW',
        alert: 'Warm North Malabar coastal breeze. Great for visiting Madayi Palli and Thalassery waterfront.',
        high: 32,
        low: 24,
      };
    }
    if (cLower.includes('makkah')) {
      return {
        temp: 36,
        condition: 'Sunny & Warm',
        humidity: 28,
        wind: '9 km/h E',
        alert: 'Stay hydrated during daytime; pleasant conditions for courtyard prayers after Isha.',
        high: 40,
        low: 29,
      };
    }

    return {
      temp: 28,
      condition: 'Tropical Warm & Pleasant',
      humidity: 72,
      wind: '10 km/h W',
      alert: 'Favorable tropical Kerala weather for local travel and congregational prayers.',
      high: 31,
      low: 24,
    };
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
