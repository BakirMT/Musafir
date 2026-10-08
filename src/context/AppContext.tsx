import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CalculationMethodId,
  ChecklistItem,
  CommunityContribution,
  ExpenseItem,
  Language,
  LocationInfo,
  Madhhab,
  Place,
  PrayerTimesData,
  Trip,
} from '../types';
import { calculatePrayerTimes } from '../services/prayerService';
import { calculateDistanceToKaaba, calculateQiblaDirection } from '../services/qiblaService';
import { INITIAL_PLACES } from '../services/placesData';
import { DEFAULT_CHECKLIST, DEMO_TRIP, KERALA_TRIP, INITIAL_EXPENSES } from '../services/travelDefaults';
import { TranslationKey, getTranslation } from '../services/translations';
import { bundleCityForOffline } from '../services/offlineService';
import {
  HijriCalculationMethodId,
  HijriDateDetails,
  getDetailedHijriDate,
} from '../services/hijriService';

export type ActiveTab =
  | 'landing'
  | 'dashboard'
  | 'qibla'
  | 'prayer'
  | 'mosques'
  | 'halal-food'
  | 'hotels'
  | 'trips'
  | 'checklist'
  | 'islamic-guide'
  | 'hajj-umrah'
  | 'assistant'
  | 'expenses'
  | 'saved'
  | 'profile'
  | 'privacy';

export const GLOBAL_CITIES: LocationInfo[] = [
  // Kerala Districts & Cultural Hubs
  { city: 'Kozhikode (Calicut)', country: 'India', lat: 11.2588, lng: 75.7804 },
  { city: 'Mannarkkad (Palakkad)', country: 'India', lat: 10.9888, lng: 76.4608 },
  { city: 'Malappuram', country: 'India', lat: 11.051, lng: 76.0711 },
  { city: 'Ponnani', country: 'India', lat: 10.7672, lng: 75.925 },
  { city: 'Kochi (Ernakulam)', country: 'India', lat: 9.9312, lng: 76.2673 },
  { city: 'Kodungallur (Thrissur)', country: 'India', lat: 10.2155, lng: 76.2003 },
  { city: 'Kannur', country: 'India', lat: 11.8745, lng: 75.3704 },
  { city: 'Thalassery', country: 'India', lat: 11.7511, lng: 75.4925 },
  { city: 'Wayanad (Kalpetta)', country: 'India', lat: 11.6055, lng: 76.0825 },
  { city: 'Palakkad', country: 'India', lat: 10.7867, lng: 76.6548 },
  { city: 'Kasaragod', country: 'India', lat: 12.5102, lng: 74.9852 },
  { city: 'Thrissur', country: 'India', lat: 10.5276, lng: 76.2144 },
  { city: 'Alappuzha (Alleppey)', country: 'India', lat: 9.4981, lng: 76.3388 },
  { city: 'Thiruvananthapuram', country: 'India', lat: 8.5241, lng: 76.9366 },
  { city: 'Kollam', country: 'India', lat: 8.8932, lng: 76.6141 },
  { city: 'Kottayam', country: 'India', lat: 9.5916, lng: 76.5222 },
  { city: 'Munnar', country: 'India', lat: 10.0889, lng: 77.0595 },
  { city: 'Perinthalmanna', country: 'India', lat: 10.976, lng: 76.2254 },
  { city: 'Tirur', country: 'India', lat: 10.9146, lng: 75.9224 },
  { city: 'Vatakara', country: 'India', lat: 11.6083, lng: 75.5917 },

  // Holy Pilgrimage & Global Sister Hubs
  { city: 'Makkah', country: 'Saudi Arabia', lat: 21.3891, lng: 39.8579 },
  { city: 'Madinah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692 },
  { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708 },
];

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  currentLocation: LocationInfo;
  setCurrentLocation: (loc: LocationInfo) => void;
  requestRealLocation: () => Promise<boolean>;
  locationLoading: boolean;
  locationError: string | null;

  // Prayer & Qibla
  prayerTimes: PrayerTimesData;
  calculationMethod: CalculationMethodId;
  setCalculationMethod: (method: CalculationMethodId) => void;
  madhhab: Madhhab;
  setMadhhab: (madhhab: Madhhab) => void;
  use24Hour: boolean;
  setUse24Hour: (use: boolean) => void;
  qiblaDirection: number;
  distanceToKaaba: number;

  // Hijri Calendar Regional Calculations
  hijriMethod: HijriCalculationMethodId;
  setHijriMethod: (method: HijriCalculationMethodId) => void;
  hijriDayAdjustment: number;
  setHijriDayAdjustment: (adj: number) => void;
  hijriDateDetails: HijriDateDetails;

  // Places & Saved
  places: Place[];
  savedPlaceIds: string[];
  toggleSavePlace: (id: string) => void;
  isPlaceSaved: (id: string) => boolean;

  // Trips & Checklist
  trips: Trip[];
  activeTrip: Trip;
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  updateTrip: (updated: Trip) => void;
  checklist: ChecklistItem[];
  setChecklist: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  toggleChecklistItem: (id: string) => void;
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => void;
  deleteChecklistItem: (id: string) => void;

  // Expenses & Currency
  selectedCurrency: string;
  setSelectedCurrency: (curr: string) => void;
  expenses: ExpenseItem[];
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  deleteExpense: (id: string) => void;

  // Community Submissions
  communitySubmissions: CommunityContribution[];
  addCommunitySubmission: (submission: Omit<CommunityContribution, 'id' | 'status' | 'submittedAt'>) => void;

  // Modals & State
  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  addPlaceModalOpen: boolean;
  setAddPlaceModalOpen: (open: boolean) => void;
  presentationModeOpen: boolean;
  setPresentationModeOpen: (open: boolean) => void;
  offlineModeActive: boolean;
  setOfflineModeActive: (active: boolean) => void;
  offlineRoamingModalOpen: boolean;
  setOfflineRoamingModalOpen: (open: boolean) => void;
  downloadedPacks: Record<string, boolean>;
  downloadCityPack: (packId: string, cityName: string) => Promise<boolean>;
  deleteCityPack: (packId: string, cityName: string) => void;
  downloadTripOffline: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // User Profile
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('musafir_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('musafir_lang') as Language;
    return saved === 'ar' || saved === 'ml' || saved === 'en' ? saved : 'en';
  });

  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };

  const [currentLocation, setCurrentLocation] = useState<LocationInfo>(() => {
    const saved = localStorage.getItem('musafir_loc');
    return saved ? JSON.parse(saved) : GLOBAL_CITIES[0];
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [calculationMethod, setCalculationMethod] = useState<CalculationMethodId>('Karachi');
  const [madhhab, setMadhhab] = useState<Madhhab>('Shafi');
  const [use24Hour, setUse24Hour] = useState(false);

  // Hijri Calendar Regional Calculation Method & Adjustment (Default: Kerala Moonsighting)
  const [hijriMethod, setHijriMethod] = useState<HijriCalculationMethodId>(() => {
    const saved = localStorage.getItem('musafir_hijri_method') as HijriCalculationMethodId;
    return saved || 'kerala_hilal';
  });
  const [hijriDayAdjustment, setHijriDayAdjustment] = useState<number>(() => {
    const saved = localStorage.getItem('musafir_hijri_adj');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('musafir_hijri_method', hijriMethod);
  }, [hijriMethod]);

  useEffect(() => {
    localStorage.setItem('musafir_hijri_adj', hijriDayAdjustment.toString());
  }, [hijriDayAdjustment]);

  const [places, setPlaces] = useState<Place[]>(INITIAL_PLACES);
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('musafir_saved_places');
    return saved ? JSON.parse(saved) : ['mosque-kerala-1', 'food-kerala-1', 'hotel-kerala-1'];
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('musafir_trips');
    return saved ? JSON.parse(saved) : [KERALA_TRIP];
  });
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('musafir_checklist');
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
  });

  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('musafir_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [communitySubmissions, setCommunitySubmissions] = useState<CommunityContribution[]>(() => {
    const saved = localStorage.getItem('musafir_community');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'comm-1',
            placeName: 'Zain\'s Beach Hotel & Tea Room',
            category: 'restaurant',
            address: 'Convent Cross Rd, Beach, Kozhikode, Kerala',
            notes: 'Authentic Malabar Muslim home-style evening snacks, Chattipathiri & Unnakaya.',
            halalVerification: 'verified',
            status: 'verified',
            submittedAt: '2026-10-06T14:20:00Z',
          },
        ];
  });

  // Modals
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [addPlaceModalOpen, setAddPlaceModalOpen] = useState(false);
  const [presentationModeOpen, setPresentationModeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [offlineModeActive, setOfflineModeActive] = useState(() => {
    return localStorage.getItem('musafir_offline') === 'true';
  });
  const [offlineRoamingModalOpen, setOfflineRoamingModalOpen] = useState(false);
  const [downloadedPacks, setDownloadedPacks] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('musafir_downloaded_packs');
    return saved ? JSON.parse(saved) : { 'pack-malabar': true, 'pack-central-kerala': true };
  });

  const downloadCityPack = async (packId: string, cityName: string): Promise<boolean> => {
    bundleCityForOffline(cityName, places);
    setDownloadedPacks((prev) => {
      const updated = { ...prev, [packId]: true };
      localStorage.setItem('musafir_downloaded_packs', JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const deleteCityPack = (packId: string, cityName: string) => {
    localStorage.removeItem(`musafir_offline_pack_${cityName}`);
    setDownloadedPacks((prev) => {
      const updated = { ...prev };
      delete updated[packId];
      localStorage.setItem('musafir_downloaded_packs', JSON.stringify(updated));
      return updated;
    });
  };

  // Listen to network status changes
  useEffect(() => {
    const handleOffline = () => {
      setOfflineModeActive(true);
      localStorage.setItem('musafir_offline', 'true');
    };
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [userName, setUserName] = useState('Bakir');
  const userEmail = 'bakirmannarkkad170@gmail.com';

  // Apply dark mode & RTL
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('musafir_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('musafir_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('musafir_lang', language);
    document.documentElement.setAttribute('lang', language);
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem('musafir_loc', JSON.stringify(currentLocation));
  }, [currentLocation]);

  useEffect(() => {
    localStorage.setItem('musafir_saved_places', JSON.stringify(savedPlaceIds));
  }, [savedPlaceIds]);

  useEffect(() => {
    localStorage.setItem('musafir_checklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('musafir_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('musafir_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('musafir_community', JSON.stringify(communitySubmissions));
  }, [communitySubmissions]);

  // Dynamic Prayer Times & Qibla calculations
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000); // refresh every 30s
    return () => clearInterval(timer);
  }, []);

  const hijriDateDetails = getDetailedHijriDate(now, hijriMethod, hijriDayAdjustment);

  const rawPrayerTimes = calculatePrayerTimes(
    now,
    currentLocation.lat,
    currentLocation.lng,
    calculationMethod,
    madhhab,
    use24Hour
  );

  const prayerTimes: PrayerTimesData = {
    ...rawPrayerTimes,
    hijriDate: hijriDateDetails.formatted,
  };

  const qiblaDirection = calculateQiblaDirection(currentLocation.lat, currentLocation.lng);
  const distanceToKaaba = calculateDistanceToKaaba(currentLocation.lat, currentLocation.lng);

  // Geolocation request with reverse geocode & IP fallback
  const requestRealLocation = async (): Promise<boolean> => {
    setLocationLoading(true);
    setLocationError(null);

    const tryIpFallback = async (reason: string): Promise<boolean> => {
      try {
        const ipRes = await fetch('/api/ip-location');
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData.lat && ipData.lng) {
            const newLoc: LocationInfo = {
              city: ipData.city || 'Mannarkkad (Palakkad)',
              country: ipData.country || 'India',
              lat: ipData.lat,
              lng: ipData.lng,
              accuracy: 1000,
              isLiveGps: true,
              timestamp: Date.now(),
            };
            setCurrentLocation(newLoc);
            setLocationLoading(false);
            return true;
          }
        }
      } catch {
        // IP fallback error
      }
      setLocationError(reason);
      setLocationLoading(false);
      return false;
    };

    if (!navigator.geolocation) {
      return await tryIpFallback('Geolocation is not supported by your browser.');
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          let cityName = `GPS (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`;
          let countryName = 'Current Location';

          try {
            // First try server-side reverse geocode proxy
            const res = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}`);
            if (res.ok) {
              const data = await res.json();
              if (data.city) {
                cityName = data.city;
                countryName = data.country || countryName;
              }
            } else {
              // Fallback to client-side Nominatim with timeout
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 2500);
              const nomRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
                { signal: controller.signal }
              );
              clearTimeout(timeoutId);
              if (nomRes.ok) {
                const nomData = await nomRes.json();
                const addr = nomData.address || {};
                const county = addr.county || '';
                const stateDistrict = addr.state_district || '';
                const rawCity =
                  addr.city ||
                  addr.town ||
                  (county.toLowerCase().includes('mannarkad') ? 'Mannarkkad' : '') ||
                  addr.village ||
                  county ||
                  stateDistrict ||
                  cityName;
                cityName = rawCity;
                countryName = addr.country || countryName;
              }
            }
          } catch {
            // Keep default coordinate label or match closest
          }

          // If city name is still raw GPS coords, find closest known city for friendly display
          if (cityName.startsWith('GPS (')) {
            let closest = GLOBAL_CITIES[0];
            let minDist = Infinity;
            for (const c of GLOBAL_CITIES) {
              const dLat = c.lat - lat;
              const dLng = c.lng - lng;
              const dist = dLat * dLat + dLng * dLng;
              if (dist < minDist) {
                minDist = dist;
                closest = c;
              }
            }
            if (minDist < 0.25) {
              cityName = `${closest.city} (Live GPS)`;
              countryName = closest.country;
            }
          }

          const newLoc: LocationInfo = {
            city: cityName,
            country: countryName,
            lat,
            lng,
            accuracy: Math.round(pos.coords.accuracy || 10),
            isLiveGps: true,
            timestamp: Date.now(),
          };
          setCurrentLocation(newLoc);
          setLocationLoading(false);
          resolve(true);
        },
        async (err) => {
          let errorMsg = 'Unable to acquire GPS signal.';
          if (err.code === 1) {
            errorMsg = 'Location permission was denied. Switched to approximate network location.';
          } else if (err.code === 2) {
            errorMsg = 'GPS position unavailable. Using approximate location.';
          } else if (err.code === 3) {
            errorMsg = 'GPS request timed out. Using approximate location.';
          }
          const success = await tryIpFallback(errorMsg);
          resolve(success);
        },
        { timeout: 7000, enableHighAccuracy: true, maximumAge: 10000 }
      );
    });
  };

  const toggleSavePlace = (id: string) => {
    setSavedPlaceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isPlaceSaved = (id: string) => savedPlaceIds.includes(id);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const addChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const newItem: ChecklistItem = {
      ...item,
      id: `chk-${Date.now()}`,
    };
    setChecklist((prev) => [newItem, ...prev]);
  };

  const deleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((i) => i.id !== id));
  };

  const updateTrip = (updated: Trip) => {
    setTrips((prev) => {
      const exists = prev.some((t) => t.id === updated.id);
      if (exists) {
        return prev.map((t) => (t.id === updated.id ? updated : t));
      }
      return [updated, ...prev];
    });
  };

  const addExpense = (expense: Omit<ExpenseItem, 'id'>) => {
    const newExp: ExpenseItem = {
      ...expense,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExp, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addCommunitySubmission = (
    submission: Omit<CommunityContribution, 'id' | 'status' | 'submittedAt'>
  ) => {
    const newSub: CommunityContribution = {
      ...submission,
      id: `comm-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setCommunitySubmissions((prev) => [newSub, ...prev]);
  };

  const downloadTripOffline = () => {
    setOfflineModeActive(true);
    localStorage.setItem('musafir_offline', 'true');
    // Save snapshot of all active trip items, places, prayers, and duas
    localStorage.setItem(
      'musafir_offline_package',
      JSON.stringify({
        trip: trips[0],
        places,
        prayerTimes,
        savedPlaceIds,
        downloadedAt: new Date().toISOString(),
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        t,
        currentLocation,
        setCurrentLocation,
        requestRealLocation,
        locationLoading,
        locationError,

        prayerTimes,
        calculationMethod,
        setCalculationMethod,
        madhhab,
        setMadhhab,
        use24Hour,
        setUse24Hour,
        qiblaDirection,
        distanceToKaaba,

        hijriMethod,
        setHijriMethod,
        hijriDayAdjustment,
        setHijriDayAdjustment,
        hijriDateDetails,

        places,
        savedPlaceIds,
        toggleSavePlace,
        isPlaceSaved,

        trips,
        activeTrip:
          trips.find(
            (t) =>
              t.destination.toLowerCase().includes(currentLocation.city.toLowerCase().split(' ')[0]) ||
              t.destination.toLowerCase().includes(currentLocation.country.toLowerCase())
          ) ||
          trips[0] ||
          DEMO_TRIP,
        setTrips,
        updateTrip,
        checklist,
        setChecklist,
        toggleChecklistItem,
        addChecklistItem,
        deleteChecklistItem,

        selectedCurrency,
        setSelectedCurrency,
        expenses,
        addExpense,
        deleteExpense,

        communitySubmissions,
        addCommunitySubmission,

        emergencyModalOpen,
        setEmergencyModalOpen,
        searchModalOpen,
        setSearchModalOpen,
        addPlaceModalOpen,
        setAddPlaceModalOpen,
        presentationModeOpen,
        setPresentationModeOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        offlineModeActive,
        setOfflineModeActive,
        offlineRoamingModalOpen,
        setOfflineRoamingModalOpen,
        downloadedPacks,
        downloadCityPack,
        deleteCityPack,
        downloadTripOffline,

        userName,
        setUserName,
        userEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
