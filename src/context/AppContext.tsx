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
  // Kerala, India
  { city: 'Kochi (Kerala)', country: 'India', lat: 9.9312, lng: 76.2673 },
  { city: 'Kozhikode (Calicut)', country: 'India', lat: 11.2588, lng: 75.7804 },
  { city: 'Malappuram (Kerala)', country: 'India', lat: 11.051, lng: 76.0711 },
  { city: 'Ponnani (Kerala)', country: 'India', lat: 10.7672, lng: 75.925 },
  { city: 'Wayanad (Kerala)', country: 'India', lat: 11.6103, lng: 76.0827 },
  { city: 'Kannur (Kerala)', country: 'India', lat: 11.8745, lng: 75.3704 },
  { city: 'Kasaragod (Kerala)', country: 'India', lat: 12.5102, lng: 74.9852 },
  { city: 'Thiruvananthapuram', country: 'India', lat: 8.5241, lng: 76.9366 },
  { city: 'Alappuzha (Alleppey)', country: 'India', lat: 9.4981, lng: 76.3388 },
  { city: 'Munnar (Kerala)', country: 'India', lat: 10.0889, lng: 77.0595 },
  { city: 'Palakkad (Kerala)', country: 'India', lat: 10.7867, lng: 76.6548 },
  { city: 'Thrissur (Kodungallur)', country: 'India', lat: 10.5276, lng: 76.2144 },

  // India - Other Major Metros & Historic Hubs
  { city: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.209 },
  { city: 'Hyderabad', country: 'India', lat: 17.385, lng: 78.4867 },
  { city: 'Mumbai', country: 'India', lat: 19.076, lng: 72.8777 },
  { city: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946 },
  { city: 'Srinagar (Kashmir)', country: 'India', lat: 34.0837, lng: 74.7973 },
  { city: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707 },
  { city: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639 },
  { city: 'Lucknow', country: 'India', lat: 26.8467, lng: 80.9462 },

  // Global Destinations & Pilgrimage Hubs
  { city: 'Istanbul', country: 'Türkiye', lat: 41.0082, lng: 28.9784 },
  { city: 'Makkah', country: 'Saudi Arabia', lat: 21.3891, lng: 39.8579 },
  { city: 'Madinah', country: 'Saudi Arabia', lat: 24.5247, lng: 39.5692 },
  { city: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708 },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lng: 101.6869 },
  { city: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { city: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522 },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { city: 'New York', country: 'United States', lat: 40.7128, lng: -74.006 },
];

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
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
  downloadTripOffline: () => void;

  // User Profile
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('musafir_theme') === 'dark';
  });
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('musafir_lang') as Language) || 'en';
  });

  const [currentLocation, setCurrentLocation] = useState<LocationInfo>(() => {
    const saved = localStorage.getItem('musafir_loc');
    return saved ? JSON.parse(saved) : GLOBAL_CITIES[0];
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [calculationMethod, setCalculationMethod] = useState<CalculationMethodId>('Diyanet');
  const [madhhab, setMadhhab] = useState<Madhhab>('Hanafi');
  const [use24Hour, setUse24Hour] = useState(false);

  const [places, setPlaces] = useState<Place[]>(INITIAL_PLACES);
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('musafir_saved_places');
    return saved ? JSON.parse(saved) : ['mosque-1', 'food-1', 'hotel-1'];
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('musafir_trips');
    return saved ? JSON.parse(saved) : [DEMO_TRIP, KERALA_TRIP];
  });
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('musafir_checklist');
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
  });

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
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
            placeName: 'Karaköy Güllüoğlu Baklava',
            category: 'restaurant',
            address: 'Kemankeş Karamustafa Paşa, Rıhtım Cd. No:3/4, Karaköy',
            notes: 'Pure butter authentic baklava. 100% Halal certified, alcohol-free.',
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
  const [offlineModeActive, setOfflineModeActive] = useState(() => {
    return localStorage.getItem('musafir_offline') === 'true';
  });

  const [userName, setUserName] = useState('Bakir');
  const userEmail = 'bakirmannarkkad170@gmail.com';

  // Apply dark mode & RTL
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('musafir_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('musafir_theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('musafir_lang', language);
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

  const prayerTimes = calculatePrayerTimes(
    now,
    currentLocation.lat,
    currentLocation.lng,
    calculationMethod,
    madhhab,
    use24Hour
  );

  const qiblaDirection = calculateQiblaDirection(currentLocation.lat, currentLocation.lng);
  const distanceToKaaba = calculateDistanceToKaaba(currentLocation.lat, currentLocation.lng);

  // Geolocation request
  const requestRealLocation = async (): Promise<boolean> => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLocationLoading(false);
      return false;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          let cityName = `GPS (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`;
          let countryName = 'Current Location';

          try {
            // Quick reverse geocoding via OpenStreetMap Nominatim with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);
            if (res.ok) {
              const data = await res.json();
              const addr = data.address || {};
              const rawCity =
                addr.city ||
                addr.town ||
                addr.village ||
                addr.suburb ||
                addr.county ||
                addr.state_district ||
                addr.state ||
                cityName;

              const state = addr.state || '';
              if (state === 'Kerala' && !rawCity.toLowerCase().includes('kerala')) {
                cityName = `${rawCity} (Kerala)`;
              } else {
                cityName = rawCity;
              }
              countryName = addr.country || countryName;
            }
          } catch {
            // Keep default coordinate label
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
        (err) => {
          let errorMsg = 'Unable to acquire GPS signal.';
          if (err.code === 1) {
            errorMsg = 'Location permission was denied. Please allow location access in your browser settings or choose a city below.';
          } else if (err.code === 2) {
            errorMsg = 'GPS position unavailable. Please check device location sensors or select your city.';
          } else if (err.code === 3) {
            errorMsg = 'GPS request timed out. Please check your connection or choose a preset city.';
          }
          setLocationError(errorMsg);
          setLocationLoading(false);
          resolve(false);
        },
        { timeout: 12000, enableHighAccuracy: true, maximumAge: 0 }
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
    setTrips((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
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
        offlineModeActive,
        setOfflineModeActive,
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
