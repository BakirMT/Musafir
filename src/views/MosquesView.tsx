import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Landmark,
  MapPin,
  Star,
  Navigation,
  Bookmark,
  Check,
  Filter,
  PlusCircle,
  Accessibility,
  HeartHandshake,
  Sparkles,
} from 'lucide-react';

export const MosquesView: React.FC = () => {
  const { places, currentLocation, isPlaceSaved, toggleSavePlace, setAddPlaceModalOpen } =
    useApp();

  const [filterWomensOnly, setFilterWomensOnly] = useState(false);
  const [filterWheelchairOnly, setFilterWheelchairOnly] = useState(false);
  const [filterJumuaOnly, setFilterJumuaOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const mosques = places.filter((p) => p.category === 'mosque');

  const filteredMosques = mosques.filter((m) => {
    if (filterWomensOnly && !m.hasWomensArea) return false;
    if (filterWheelchairOnly && !m.hasWheelchairAccess) return false;
    if (filterJumuaOnly && !m.jumuaTime) return false;
    if (m.rating < minRating) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <Landmark className="w-4 h-4" />
            <span>Sacred Houses of Allah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Mosques Near You
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Historic and local community masjids in {currentLocation.city} with full facility transparency
          </p>
        </div>

        <button
          onClick={() => setAddPlaceModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all w-fit"
        >
          <PlusCircle className="w-4 h-4 text-[#C9A45C]" />
          <span>Suggest a Mosque</span>
        </button>
      </div>

      {/* Filter Chips Bar (Requirement 13) */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#6B756F] dark:text-[#9AA9A2] mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </span>

        <button
          onClick={() => setFilterWomensOnly(!filterWomensOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterWomensOnly
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Women's Prayer Area
        </button>

        <button
          onClick={() => setFilterWheelchairOnly(!filterWheelchairOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterWheelchairOnly
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Wheelchair Accessible
        </button>

        <button
          onClick={() => setFilterJumuaOnly(!filterJumuaOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterJumuaOnly
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          Jumu'ah Service
        </button>

        <button
          onClick={() => setMinRating(minRating === 4.8 ? 0 : 4.8)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            minRating > 0
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          ⭐ 4.8+ Rating
        </button>

        {(filterWomensOnly || filterWheelchairOnly || filterJumuaOnly || minRating > 0) && (
          <button
            onClick={() => {
              setFilterWomensOnly(false);
              setFilterWheelchairOnly(false);
              setFilterJumuaOnly(false);
              setMinRating(0);
            }}
            className="text-xs text-red-600 dark:text-red-400 font-bold ml-auto hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Mosque Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMosques.map((mosque) => (
          <div
            key={mosque.id}
            className="rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-48 relative overflow-hidden">
                <img
                  src={mosque.image}
                  alt={mosque.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#C9A45C] fill-[#C9A45C]" />
                  <span>{mosque.rating}</span>
                  <span className="text-white/60 font-normal">
                    ({mosque.reviewsCount.toLocaleString()})
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-[#0F5C4D] text-white text-xs font-extrabold shadow-md">
                  {mosque.distance}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-extrabold line-clamp-1">{mosque.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                    <span className="truncate">{mosque.address}</span>
                  </div>
                </div>
              </div>

              {/* Facilities and Details */}
              <div className="p-5 space-y-3">
                {mosque.jumuaTime && (
                  <div className="p-2.5 rounded-xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/10 text-xs flex items-center justify-between">
                    <span className="font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                      Jumu'ah Khutbah:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {mosque.jumuaTime}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mosque.hasWomensArea && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 text-[10px] font-bold">
                      ✓ Women's Section
                    </span>
                  )}
                  {mosque.hasWuduArea && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 text-[10px] font-bold">
                      ✓ Wudu Fountains
                    </span>
                  )}
                  {mosque.hasWheelchairAccess && (
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 text-[10px] font-bold">
                      ✓ Wheelchair Ramp
                    </span>
                  )}
                  {mosque.facilities.map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="p-4 bg-gray-50 dark:bg-[#071310] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleSavePlace(mosque.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  isPlaceSaved(mosque.id)
                    ? 'bg-[#0F5C4D]/10 border-[#0F5C4D] text-[#0F5C4D] dark:text-[#C9A45C]'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                {isPlaceSaved(mosque.id) ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span>{isPlaceSaved(mosque.id) ? 'Saved' : 'Save'}</span>
              </button>

              <a
                href={`https://maps.google.com/?q=${mosque.lat},${mosque.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate (Directions)</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
