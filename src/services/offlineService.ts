import { OfflineCityPack, Place } from '../types';
import { INITIAL_PLACES } from './placesData';
import { ISLAMIC_TRAVEL_DUAS } from './duasData';

export const PRESET_OFFLINE_PACKS: OfflineCityPack[] = [
  {
    id: 'pack-malabar',
    cityName: 'Kozhikode & Malappuram (Malabar)',
    country: 'Kerala, India',
    sizeMB: 5.4,
    mosquesCount: 22,
    halalSpotsCount: 28,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
  {
    id: 'pack-central-kerala',
    cityName: 'Kochi & Kodungallur (Cheraman)',
    country: 'Kerala, India',
    sizeMB: 4.8,
    mosquesCount: 18,
    halalSpotsCount: 24,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
  {
    id: 'pack-wayanad-palakkad',
    cityName: 'Mannarkkad & Wayanad Hills',
    country: 'Kerala, India',
    sizeMB: 4.5,
    mosquesCount: 15,
    halalSpotsCount: 18,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
  {
    id: 'pack-makkah-madinah',
    cityName: 'Makkah & Madinah',
    country: 'Saudi Arabia',
    sizeMB: 6.4,
    mosquesCount: 18,
    halalSpotsCount: 25,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
  {
    id: 'pack-dubai',
    cityName: 'Dubai & Abu Dhabi',
    country: 'UAE',
    sizeMB: 5.0,
    mosquesCount: 12,
    halalSpotsCount: 24,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
  {
    id: 'pack-kuala-lumpur',
    cityName: 'Kuala Lumpur',
    country: 'Malaysia',
    sizeMB: 4.6,
    mosquesCount: 11,
    halalSpotsCount: 19,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
  {
    id: 'pack-london-paris',
    cityName: 'London & Paris',
    country: 'UK & France',
    sizeMB: 5.8,
    mosquesCount: 15,
    halalSpotsCount: 28,
    prayerCalculationsDays: 365,
    hasDuas: true,
    hasScholarGuide: true,
    hasOfflineMapTiles: true,
  },
];

// Helper to check estimated total offline storage usage
export function getOfflineStorageSummary(downloadedPacks: Record<string, boolean>): {
  usedMB: number;
  totalQuotaMB: number;
  packsCount: number;
} {
  let usedMB = 1.8; // base app shell, solar math engine, and offline duas

  Object.entries(downloadedPacks).forEach(([packId, isDownloaded]) => {
    if (isDownloaded) {
      const pack = PRESET_OFFLINE_PACKS.find((p) => p.id === packId);
      if (pack) {
        usedMB += pack.sizeMB;
      } else {
        usedMB += 3.5;
      }
    }
  });

  return {
    usedMB: Math.round(usedMB * 10) / 10,
    totalQuotaMB: 50,
    packsCount: Object.values(downloadedPacks).filter(Boolean).length,
  };
}

// Bundle and cache data locally for offline roaming
export function bundleCityForOffline(cityName: string, places: Place[]): boolean {
  try {
    const cityPlaces = places.filter(
      (p) =>
        p.city?.toLowerCase().includes(cityName.toLowerCase()) ||
        p.address?.toLowerCase().includes(cityName.toLowerCase()) ||
        cityName.toLowerCase().includes(p.city?.toLowerCase() || '')
    );

    const offlineBundle = {
      cityName,
      places: cityPlaces.length > 0 ? cityPlaces : INITIAL_PLACES.slice(0, 10),
      duas: ISLAMIC_TRAVEL_DUAS,
      downloadedAt: new Date().toISOString(),
      version: '1.0.0',
    };

    localStorage.setItem(`musafir_offline_pack_${cityName}`, JSON.stringify(offlineBundle));
    return true;
  } catch (err) {
    console.error('Failed to bundle city for offline storage:', err);
    return false;
  }
}
