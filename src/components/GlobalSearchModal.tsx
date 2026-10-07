import React, { useState, useMemo } from 'react';
import { useApp, GLOBAL_CITIES } from '../context/AppContext';
import { ISLAMIC_TRAVEL_DUAS } from '../services/duasData';
import {
  Search,
  X,
  Landmark,
  UtensilsCrossed,
  Hotel,
  BookOpen,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen, places, setActiveTab, setCurrentLocation } =
    useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { places: [], duas: [], cities: [] };
    const q = query.toLowerCase();

    const matchedPlaces = places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.cuisine && p.cuisine.toLowerCase().includes(q)) ||
        p.address.toLowerCase().includes(q)
    );

    const matchedDuas = ISLAMIC_TRAVEL_DUAS.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.english.toLowerCase().includes(q) ||
        d.transliteration.toLowerCase().includes(q)
    );

    const matchedCities = GLOBAL_CITIES.filter(
      (c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    );

    return {
      places: matchedPlaces,
      duas: matchedDuas,
      cities: matchedCities,
    };
  }, [query, places]);

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-xl w-full border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0F5C4D] dark:text-[#C9A45C] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mosques, halal dishes, travel duas, cities..."
            autoFocus
            className="flex-1 bg-transparent text-sm font-semibold text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {!query.trim() ? (
            <div className="text-center py-8 text-[#6B756F] dark:text-[#9AA9A2]">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#C9A45C]" />
              <p className="text-xs font-semibold">Type anything to explore Musafir</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['Blue Mosque', 'Halal Kebab', 'Travel Dua', 'Makkah', 'Qasr Salah'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-[#F7F5EF] dark:bg-[#071310] hover:bg-[#0F5C4D]/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.places.length === 0 &&
            searchResults.duas.length === 0 &&
            searchResults.cities.length === 0 ? (
            <div className="text-center py-8 text-[#6B756F] dark:text-[#9AA9A2]">
              <p className="text-xs font-medium">No results found for "{query}".</p>
              <p className="text-[11px] mt-1">Try searching for a mosque name, dish, or prayer guide.</p>
            </div>
          ) : (
            <>
              {/* Matched Cities */}
              {searchResults.cities.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider mb-2">
                    Destinations
                  </h4>
                  <div className="space-y-1">
                    {searchResults.cities.map((city) => (
                      <button
                        key={city.city}
                        onClick={() => {
                          setCurrentLocation(city);
                          setActiveTab('dashboard');
                          setSearchModalOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F7F5EF] dark:hover:bg-[#071310] flex items-center justify-between text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C9A45C]" />
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            {city.city}, {city.country}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#0F5C4D] dark:text-[#C9A45C] font-semibold flex items-center gap-1">
                          Switch to City <ArrowRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Places */}
              {searchResults.places.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider mb-2">
                    Places & Dining
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.places.map((place) => (
                      <div
                        key={place.id}
                        onClick={() => {
                          if (place.category === 'mosque') setActiveTab('mosques');
                          else if (place.category === 'restaurant') setActiveTab('halal-food');
                          else setActiveTab('hotels');
                          setSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#F7F5EF] dark:hover:bg-[#071310] cursor-pointer flex items-center justify-between text-xs transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                      >
                        <div className="flex items-center gap-2.5">
                          {place.category === 'mosque' ? (
                            <Landmark className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                          ) : place.category === 'restaurant' ? (
                            <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                          ) : (
                            <Hotel className="w-4 h-4 text-blue-600" />
                          )}
                          <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                              {place.name}
                            </div>
                            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
                              {place.distance} • ⭐ {place.rating} • {place.address}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Duas */}
              {searchResults.duas.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase tracking-wider mb-2">
                    Islamic Duas & Content
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.duas.map((dua) => (
                      <div
                        key={dua.id}
                        onClick={() => {
                          setActiveTab('islamic-guide');
                          setSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl hover:bg-[#F7F5EF] dark:hover:bg-[#071310] cursor-pointer flex items-center justify-between text-xs transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                          <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                              {dua.title}
                            </div>
                            <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2] line-clamp-1">
                              {dua.english}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
