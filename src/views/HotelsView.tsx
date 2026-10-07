import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Hotel,
  Compass,
  Star,
  MapPin,
  Check,
  Bookmark,
  Navigation,
  ShieldCheck,
  Coffee,
  Sparkles,
} from 'lucide-react';

export const HotelsView: React.FC = () => {
  const { places, currentLocation, isPlaceSaved, toggleSavePlace } = useApp();

  const [alcoholFreeOnly, setAlcoholFreeOnly] = useState(false);
  const [qiblaMarkedOnly, setQiblaMarkedOnly] = useState(false);

  const hotels = places.filter((p) => p.category === 'hotel');

  const filteredHotels = hotels.filter((h) => {
    if (alcoholFreeOnly && !h.alcoholFree) return false;
    if (qiblaMarkedOnly && !h.qiblaAvailable) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <Hotel className="w-4 h-4" />
            <span>Muslim-Friendly Stays</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Muslim-Friendly Hotels
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Hotels offering in-room Qibla direction, prayer mats, halal dining, and nearby mosques in {currentLocation.city}
          </p>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-wrap items-center gap-2">
        <button
          onClick={() => setAlcoholFreeOnly(!alcoholFreeOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            alcoholFreeOnly
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          100% Alcohol-Free Hotel
        </button>

        <button
          onClick={() => setQiblaMarkedOnly(!qiblaMarkedOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            qiblaMarkedOnly
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          In-Room Qibla Marker & Prayer Mat
        </button>

        {(alcoholFreeOnly || qiblaMarkedOnly) && (
          <button
            onClick={() => {
              setAlcoholFreeOnly(false);
              setQiblaMarkedOnly(false);
            }}
            className="text-xs text-red-600 dark:text-red-400 font-bold ml-auto hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-52 relative overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#C9A45C] fill-[#C9A45C]" />
                  <span>{hotel.rating}</span>
                  <span className="text-white/60 font-normal">
                    ({hotel.reviewsCount.toLocaleString()})
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-extrabold shadow-md">
                  {hotel.distance} • {hotel.priceRange}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-extrabold line-clamp-1">{hotel.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                    <span className="truncate">{hotel.address}</span>
                  </div>
                </div>
              </div>

              {/* Islamic Amenities */}
              <div className="p-5 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {hotel.alcoholFree && (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 text-xs font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Strictly Alcohol-Free
                    </span>
                  )}
                  {hotel.qiblaAvailable && (
                    <span className="px-2.5 py-1 rounded-lg bg-[#F7F5EF] dark:bg-[#071310] text-[#0F5C4D] dark:text-[#C9A45C] border border-[#0F5C4D]/20 text-xs font-bold flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5" />
                      Qibla & Prayer Mat Provided
                    </span>
                  )}
                </div>

                <div className="space-y-1 pt-1">
                  {hotel.facilities.map((fac, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-gray-50 dark:bg-[#071310] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleSavePlace(hotel.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  isPlaceSaved(hotel.id)
                    ? 'bg-[#0F5C4D]/10 border-[#0F5C4D] text-[#0F5C4D] dark:text-[#C9A45C]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                {isPlaceSaved(hotel.id) ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span>{isPlaceSaved(hotel.id) ? 'Saved' : 'Save'}</span>
              </button>

              <a
                href={`https://maps.google.com/?q=${hotel.lat},${hotel.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
