import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlaceCategory } from '../types';
import {
  Bookmark,
  Landmark,
  UtensilsCrossed,
  Hotel,
  Compass,
  Star,
  MapPin,
  Trash2,
  Navigation,
  ArrowRight,
} from 'lucide-react';

export const SavedView: React.FC = () => {
  const { places, savedPlaceIds, toggleSavePlace, setActiveTab } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | PlaceCategory>('all');

  const savedPlaces = places.filter((p) => savedPlaceIds.includes(p.id));

  const filteredPlaces =
    selectedFilter === 'all'
      ? savedPlaces
      : savedPlaces.filter((p) => p.category === selectedFilter);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
          <Bookmark className="w-4 h-4" />
          <span>My Travel Collection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Saved Places & Bookmarks
        </h1>
        <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
          Quickly access your favorite mosques, halal restaurants, and hotels
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            selectedFilter === 'all'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          All ({savedPlaces.length})
        </button>
        <button
          onClick={() => setSelectedFilter('mosque')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            selectedFilter === 'mosque'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          Mosques
        </button>
        <button
          onClick={() => setSelectedFilter('restaurant')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            selectedFilter === 'restaurant'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          Halal Food
        </button>
        <button
          onClick={() => setSelectedFilter('hotel')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
            selectedFilter === 'hotel'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
          }`}
        >
          Hotels
        </button>
      </div>

      {/* List or Empty State (Requirement 41) */}
      {filteredPlaces.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-center space-y-3">
          <Bookmark className="w-12 h-12 text-[#C9A45C] opacity-40 mx-auto" />
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
            No saved places yet
          </h3>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] max-w-sm mx-auto">
            Bookmark mosques, restaurants, or hotels from the explore pages to access them quickly here offline.
          </p>
          <button
            onClick={() => setActiveTab('mosques')}
            className="px-5 py-2.5 rounded-2xl bg-[#0F5C4D] text-white text-xs font-bold shadow-md shadow-[#0F5C4D]/25"
          >
            Explore Nearby Places
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="p-4 rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-gray-100 dark:border-gray-800"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#C9A45C] uppercase">
                    <span>{place.category}</span>
                    <span>•</span>
                    <span>{place.distance}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-gray-100 line-clamp-1">
                    {place.name}
                  </h4>
                  <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] truncate max-w-xs">
                    {place.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://maps.google.com/?q=${place.lat},${place.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0F5C4D] text-white hover:bg-[#083C34] transition-colors"
                  title="Navigate"
                >
                  <Navigation className="w-4 h-4" />
                </a>

                <button
                  onClick={() => toggleSavePlace(place.id)}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
