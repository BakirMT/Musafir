import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Place, PlaceCategory } from '../types';
import {
  Landmark,
  UtensilsCrossed,
  Hotel,
  Hospital,
  Compass,
  MapPin,
  Star,
  ExternalLink,
  Bookmark,
  Check,
  Navigation,
  Layers,
} from 'lucide-react';

export const InteractiveMap: React.FC<{ initialCategory?: PlaceCategory | 'all' }> = ({
  initialCategory = 'all',
}) => {
  const { places, currentLocation, isPlaceSaved, toggleSavePlace } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'all'>(initialCategory);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(places[0] || null);

  // Filter places to match current destination or display all
  const locClean = currentLocation.city.toLowerCase();
  const isKerala =
    locClean.includes('kerala') ||
    locClean.includes('kochi') ||
    locClean.includes('calicut') ||
    locClean.includes('kozhikode') ||
    locClean.includes('malappuram') ||
    locClean.includes('ponnani') ||
    locClean.includes('wayanad') ||
    locClean.includes('kannur') ||
    locClean.includes('kasaragod') ||
    locClean.includes('alleppey') ||
    locClean.includes('alappuzha') ||
    locClean.includes('thiruvananthapuram') ||
    locClean.includes('munnar');

  const destinationPlaces = places.filter((p) => {
    const pCity = p.city?.toLowerCase() || '';
    if (pCity.includes(locClean.split(' ')[0])) return true;
    if (isKerala && (pCity.includes('kerala') || pCity.includes('kozhikode') || pCity.includes('kochi'))) return true;
    return p.country === currentLocation.country;
  });
  const activePool = destinationPlaces.length > 0 ? destinationPlaces : places;

  const filteredPlaces =
    selectedCategory === 'all'
      ? activePool
      : activePool.filter((p) => p.category === selectedCategory);

  // Position markers geographically around the active location
  const getMarkerPosition = (lat: number, lng: number, index: number) => {
    const dLat = lat - currentLocation.lat;
    const dLng = lng - currentLocation.lng;
    if (Math.abs(dLat) < 0.8 && Math.abs(dLng) < 0.8) {
      const topPct = 50 - (dLat / 0.35) * 38;
      const leftPct = 50 + (dLng / 0.35) * 38;
      return {
        top: `${Math.min(84, Math.max(16, topPct))}%`,
        left: `${Math.min(84, Math.max(16, leftPct))}%`,
      };
    }
    const angle = (index * (360 / Math.max(1, filteredPlaces.length)) * Math.PI) / 180;
    const radius = 28 + (index % 3) * 8;
    const top = 50 + radius * Math.sin(angle);
    const left = 50 + radius * Math.cos(angle);
    return { top: `${Math.min(84, Math.max(16, top))}%`, left: `${Math.min(84, Math.max(16, left))}%` };
  };

  return (
    <div className="rounded-3xl border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 bg-white dark:bg-[#0D1C18] shadow-sm overflow-hidden flex flex-col h-[520px] relative">
      {/* Map Filter Bar */}
      <div className="p-3 bg-white/90 dark:bg-[#0D1C18]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          All Locations ({places.length})
        </button>
        <button
          onClick={() => setSelectedCategory('mosque')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'mosque'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          Mosques
        </button>
        <button
          onClick={() => setSelectedCategory('restaurant')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'restaurant'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          Halal Food
        </button>
        <button
          onClick={() => setSelectedCategory('hotel')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'hotel'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          <Hotel className="w-3.5 h-3.5" />
          Muslim Hotels
        </button>
        <button
          onClick={() => setSelectedCategory('prayer_room')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'prayer_room'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Prayer Rooms
        </button>
        <button
          onClick={() => setSelectedCategory('hospital')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedCategory === 'hospital'
              ? 'bg-[#0F5C4D] text-white shadow-sm'
              : 'bg-gray-100 dark:bg-[#071310] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
          }`}
        >
          <Hospital className="w-3.5 h-3.5" />
          Hospitals
        </button>
      </div>

      {/* Styled Vector Map Canvas */}
      <div className="flex-1 relative bg-[#e5e3df] dark:bg-[#091512] overflow-hidden select-none">
        {/* Subtle Waterbody / Bosphorus SVG simulation */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35 dark:opacity-20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 120 0 Q 220 200 340 260 T 500 520 L 600 520 L 600 0 Z"
            fill="#a5bfd5"
          />
          <path
            d="M 0 320 Q 180 340 340 260"
            stroke="#a5bfd5"
            strokeWidth="38"
            fill="none"
          />
        </svg>

        {/* Subtle Geometric Grid */}
        <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

        {/* Current Location Blue Pulse Pin */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-emerald-400 opacity-75" />
            <div className="relative w-4 h-4 rounded-full bg-[#0F5C4D] border-2 border-white dark:border-[#C9A45C] shadow-lg flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
            </div>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-white/90 dark:bg-black/90 text-[10px] font-extrabold text-[#0F5C4D] dark:text-[#E8DCC2] shadow-sm whitespace-nowrap">
            You ({currentLocation.city})
          </span>
        </div>

        {/* Interactive Place Markers */}
        {filteredPlaces.map((place, index) => {
          const isSelected = selectedPlace?.id === place.id;
          const pos = getMarkerPosition(place.lat, place.lng, index);

          return (
            <button
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-30 transition-transform ${
                isSelected ? 'scale-125 z-40' : 'hover:scale-110'
              }`}
              style={pos}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-all ${
                  place.category === 'mosque'
                    ? 'bg-[#0F5C4D] border-white text-white'
                    : place.category === 'restaurant'
                    ? 'bg-amber-600 border-white text-white'
                    : place.category === 'hotel'
                    ? 'bg-blue-600 border-white text-white'
                    : place.category === 'hospital'
                    ? 'bg-red-600 border-white text-white'
                    : 'bg-teal-600 border-white text-white'
                } ${isSelected ? 'ring-4 ring-[#C9A45C]' : ''}`}
              >
                {place.category === 'mosque' && <Landmark className="w-4 h-4" />}
                {place.category === 'restaurant' && <UtensilsCrossed className="w-4 h-4" />}
                {place.category === 'hotel' && <Hotel className="w-4 h-4" />}
                {place.category === 'hospital' && <Hospital className="w-4 h-4" />}
                {place.category === 'prayer_room' && <Compass className="w-4 h-4" />}
              </div>
            </button>
          );
        })}

        {/* Map Legend Overlay */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#0D1C18]/90 backdrop-blur-md rounded-xl p-2 border border-gray-200 dark:border-gray-800 text-[10px] space-y-1 shadow-md hidden sm:block">
          <div className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F5C4D]" /> Mosque
          </div>
          <div className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Halal Food
          </div>
          <div className="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Muslim Hotel
          </div>
        </div>
      </div>

      {/* Selected Location Bottom Card Popup */}
      {selectedPlace && (
        <div className="p-4 bg-white dark:bg-[#0D1C18] border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center gap-3">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-gray-200 dark:border-gray-800"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
                  {selectedPlace.category}
                </span>
                <span className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">•</span>
                <span className="text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                  {selectedPlace.distance} away
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                {selectedPlace.name}
              </h4>
              <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] truncate max-w-sm">
                {selectedPlace.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => toggleSavePlace(selectedPlace.id)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                isPlaceSaved(selectedPlace.id)
                  ? 'bg-[#0F5C4D]/10 border-[#0F5C4D] text-[#0F5C4D] dark:text-[#C9A45C]'
                  : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100'
              }`}
            >
              {isPlaceSaved(selectedPlace.id) ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isPlaceSaved(selectedPlace.id) ? 'Saved' : 'Save'}
              </span>
            </button>

            <a
              href={`https://maps.google.com/?q=${selectedPlace.lat},${selectedPlace.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0F5C4D] hover:bg-[#083C34] text-white flex items-center justify-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
