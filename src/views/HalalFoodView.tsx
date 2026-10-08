import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HalalVerificationLevel } from '../types';
import {
  UtensilsCrossed,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  MapPin,
  Star,
  Navigation,
  Bookmark,
  Check,
  PlusCircle,
  Flag,
  Coffee,
  ShoppingBag,
  Store,
} from 'lucide-react';

export const HalalFoodView: React.FC = () => {
  const { places, currentLocation, isPlaceSaved, toggleSavePlace, setAddPlaceModalOpen } =
    useApp();

  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [alcoholFreeOnly, setAlcoholFreeOnly] = useState(false);
  const [reportedModalOpen, setReportedModalOpen] = useState(false);
  const [reportedRestaurantName, setReportedRestaurantName] = useState('');

  const foodPlaces = places.filter((p) => p.category === 'restaurant');

  const filteredPlaces = foodPlaces.filter((p) => {
    if (regionFilter !== 'all') {
      const match = (p.city || '').toLowerCase().includes(regionFilter.toLowerCase()) ||
                    (p.address || '').toLowerCase().includes(regionFilter.toLowerCase());
      if (!match) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = (p.name || '').toLowerCase().includes(q) ||
                    (p.city || '').toLowerCase().includes(q) ||
                    (p.cuisine || '').toLowerCase().includes(q) ||
                    (p.address || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    if (alcoholFreeOnly && !p.alcoholFree) return false;
    if (activeCategoryFilter !== 'all') {
      if (!p.cuisine?.toLowerCase().includes(activeCategoryFilter.toLowerCase())) return false;
    }
    return true;
  });

  const handleReport = (name: string) => {
    setReportedRestaurantName(name);
    setReportedModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Pure & Permissible Dining</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Halal Food Finder
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Discover certified and community-verified Halal cuisine in {currentLocation.city}
          </p>
        </div>

        <button
          onClick={() => setAddPlaceModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all w-fit"
        >
          <PlusCircle className="w-4 h-4 text-[#C9A45C]" />
          <span>Add Halal Spot</span>
        </button>
      </div>

      {/* Mandatory Scholarly / Integrity Disclaimer Banner (Requirement 14) */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Important Halal Verification Notice: </strong>
          Information is compiled from official halal certifiers, restaurant owners, and travellers.
          Suppliers and cooking oil methods may vary. We recommend verifying halal slaughter certification
          and alcohol-free preparation directly with venue management prior to ordering.
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants, dishes (e.g. Paragon, Biryani, Pathiri, Beef, Kayees)..."
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
          />
        </div>

        {/* Kerala Districts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-gray-500 mr-1">Districts:</span>
          {[
            { id: 'all', label: 'All Kerala' },
            { id: 'Kozhikode', label: 'Kozhikode' },
            { id: 'Malappuram', label: 'Malappuram / Tirur' },
            { id: 'Kochi', label: 'Kochi / Mattancherry' },
            { id: 'Mannarkkad', label: 'Mannarkkad / Palakkad' },
            { id: 'Thalassery', label: 'Thalassery / Kannur' },
            { id: 'Wayanad', label: 'Wayanad' },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setRegionFilter(chip.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                regionFilter === chip.id
                  ? 'bg-[#0F5C4D] text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Cuisine Types */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-gray-100 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-500 mr-1">Cuisine:</span>
          {[
            { id: 'all', label: 'All Dishes' },
            { id: 'biryani', label: 'Malabar Dum Biryani' },
            { id: 'pathiri', label: 'Breakfast / Pathiri / Appam' },
            { id: 'seafood', label: 'Fresh Seafood / Fish Curry' },
            { id: 'halwa', label: 'Kozhikode Halwa & Snacks' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeCategoryFilter === cat.id
                  ? 'bg-[#C9A45C] text-[#071310] font-bold shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={() => setAlcoholFreeOnly(!alcoholFreeOnly)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              alcoholFreeOnly
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
            }`}
          >
            100% Alcohol-Free
          </button>

          {(regionFilter !== 'all' || activeCategoryFilter !== 'all' || alcoholFreeOnly || searchQuery) && (
            <button
              onClick={() => {
                setRegionFilter('all');
                setActiveCategoryFilter('all');
                setAlcoholFreeOnly(false);
                setSearchQuery('');
              }}
              className="text-xs text-red-600 dark:text-red-400 font-bold ml-auto hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Halal Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPlaces.map((restaurant) => {
          const isVerified = restaurant.halalStatus === 'verified';
          const isCommunity = restaurant.halalStatus === 'community';

          return (
            <div
              key={restaurant.id}
              className="rounded-3xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Verification Tier Badge */}
                  <div className="absolute top-3 left-3">
                    {isVerified ? (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Halal
                      </span>
                    ) : isCommunity ? (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-600/95 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Community Reported
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-gray-600/95 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-md">
                        Unverified
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                    {restaurant.distance} • {restaurant.priceRange}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-base font-extrabold line-clamp-1">{restaurant.name}</h3>
                    <p className="text-xs text-white/80">{restaurant.cuisine}</p>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300 font-semibold">
                      <Star className="w-3.5 h-3.5 text-[#C9A45C] fill-[#C9A45C]" />
                      <span className="font-bold">{restaurant.rating}</span>
                      <span className="text-[#6B756F] dark:text-[#9AA9A2]">
                        ({restaurant.reviewsCount.toLocaleString()} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold">
                      {restaurant.alcoholFree ? (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          ✓ Alcohol-Free
                        </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">
                          Alcohol on premises
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#6B756F] dark:text-[#9AA9A2] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C9A45C] shrink-0" />
                    <span className="truncate">{restaurant.address}</span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(restaurant.facilities || []).map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-[10px] text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-gray-50 dark:bg-[#071310] border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSavePlace(restaurant.id)}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                      isPlaceSaved(restaurant.id)
                        ? 'bg-[#0F5C4D]/10 border-[#0F5C4D] text-[#0F5C4D] dark:text-[#C9A45C]'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {isPlaceSaved(restaurant.id) ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleReport(restaurant.name)}
                    title="Report incorrect halal info"
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={`https://maps.google.com/?q=${restaurant.lat},${restaurant.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-600/25 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate & Dine</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Modal Feedback */}
      {reportedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-sm w-full p-6 text-center space-y-3 border border-gray-200 dark:border-gray-800 shadow-2xl">
            <Flag className="w-10 h-10 text-amber-500 mx-auto" />
            <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Reported: {reportedRestaurantName}
            </h4>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              Thank you for keeping our Muslim community safe. Our verification team will cross-examine
              the halal certification status for this venue.
            </p>
            <button
              onClick={() => setReportedModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-bold shadow-md shadow-[#0F5C4D]/25"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
