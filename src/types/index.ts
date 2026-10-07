export type Language = 'en' | 'ml' | 'ar';

export interface LocationInfo {
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone?: string;
  accuracy?: number;
  isLiveGps?: boolean;
  timestamp?: number;
}

export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

export interface PrayerTimesData {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  nextPrayer: PrayerName;
  nextPrayerTime: string;
  remainingMinutes: number;
  remainingFormatted: string;
  hijriDate: string;
  gregorianDate: string;
  methodName: string;
}

export type Madhhab = 'Shafi' | 'Hanafi';
export type CalculationMethodId = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'Diyanet';

export interface CalculationMethod {
  id: CalculationMethodId;
  name: string;
  description: string;
  fajrAngle: number;
  ishaAngle: number;
}

export type PlaceCategory = 'mosque' | 'restaurant' | 'hotel' | 'prayer_room' | 'hospital' | 'halal_store';

export type HalalVerificationLevel = 'verified' | 'community' | 'unverified';

export interface Place {
  id: string;
  name: string;
  city?: string;
  country?: string;
  category: PlaceCategory;
  cuisine?: string;
  rating: number;
  reviewsCount: number;
  distance: string; // e.g. "450 m" or "1.2 km"
  address: string;
  lat: number;
  lng: number;
  image: string;
  openNow: boolean;
  openingHours?: string;
  halalStatus?: HalalVerificationLevel;
  facilities: string[];
  hasWomensArea?: boolean;
  hasWuduArea?: boolean;
  hasWheelchairAccess?: boolean;
  jumuaTime?: string;
  priceRange?: '€' | '€€' | '€€€' | '€€€€' | '$' | '$$' | '$$$';
  phone?: string;
  qiblaAvailable?: boolean;
  alcoholFree?: boolean;
}

export interface ChecklistItem {
  id: string;
  category: 'Documents' | 'Clothing' | 'Electronics' | 'Health' | 'Money' | 'Islamic Items';
  text: string;
  completed: boolean;
}

export interface DuaItem {
  id: string;
  category: 'Before Journey' | 'Boarding Transport' | 'Entering a City' | 'Returning Home' | 'Traveller Salah' | 'General Travel';
  title: string;
  arabic: string;
  transliteration: string;
  english: string;
  malayalam: string;
  reference: string;
  context?: string;
}

export interface TripActivity {
  id: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  activity: string;
  prayerNote: string;
  halalFoodSpot?: string;
  locationName?: string;
}

export interface TripDay {
  dayNumber: number;
  title: string;
  activities: TripActivity[];
  notes?: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetTotal: number;
  currency: string;
  days: TripDay[];
  notes: string;
  downloadedOffline: boolean;
}

export interface ExpenseItem {
  id: string;
  tripId: string;
  title: string;
  category: 'Food' | 'Transport' | 'Hotel' | 'Shopping' | 'Tickets' | 'Other';
  amount: number;
  currency: string;
  date: string;
}

export interface EmergencyContacts {
  country: string;
  police: string;
  ambulance: string;
  fire: string;
  touristAssistance: string;
  nearestHospital: string;
  embassyPhone: string;
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  disclaimer?: string;
}

export interface CommunityContribution {
  id: string;
  placeName: string;
  category: PlaceCategory;
  address: string;
  notes: string;
  halalVerification?: HalalVerificationLevel;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}
