// Geodesic calculations for Qibla direction and distance to the Holy Kaaba in Makkah

export const KAABA_COORDINATES = {
  lat: 21.422487,
  lng: 39.826206,
};

/**
 * Calculates the forward azimuth / bearing in degrees (0 - 360) from current location to the Kaaba
 */
export function calculateQiblaDirection(currentLat: number, currentLng: number): number {
  const phi1 = (currentLat * Math.PI) / 180;
  const phi2 = (KAABA_COORDINATES.lat * Math.PI) / 180;
  const deltaLambda = ((KAABA_COORDINATES.lng - currentLng) * Math.PI) / 180;

  const y = Math.sin(deltaLambda);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  qibla = (qibla + 360) % 360;

  return Math.round(qibla * 10) / 10;
}

/**
 * Calculates Great-circle distance using Haversine formula in kilometers
 */
export function calculateDistanceToKaaba(currentLat: number, currentLng: number): number {
  const R = 6371; // Earth's mean radius in km
  const dLat = ((KAABA_COORDINATES.lat - currentLat) * Math.PI) / 180;
  const dLng = ((KAABA_COORDINATES.lng - currentLng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((currentLat * Math.PI) / 180) *
      Math.cos((KAABA_COORDINATES.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
}

/**
 * Returns human-readable cardinal direction (e.g. N, NNE, NW, WNW)
 */
export function getCompassCardinalDirection(degrees: number): string {
  const directions = [
    { label: 'N (North)', min: 348.75, max: 360 },
    { label: 'N (North)', min: 0, max: 11.25 },
    { label: 'NNE (North-Northeast)', min: 11.25, max: 33.75 },
    { label: 'NE (Northeast)', min: 33.75, max: 56.25 },
    { label: 'ENE (East-Northeast)', min: 56.25, max: 78.75 },
    { label: 'E (East)', min: 78.75, max: 101.25 },
    { label: 'ESE (East-Southeast)', min: 101.25, max: 123.75 },
    { label: 'SE (Southeast)', min: 123.75, max: 146.25 },
    { label: 'SSE (South-Southeast)', min: 146.25, max: 168.75 },
    { label: 'S (South)', min: 168.75, max: 191.25 },
    { label: 'SSW (South-Southwest)', min: 191.25, max: 213.75 },
    { label: 'SW (Southwest)', min: 213.75, max: 236.25 },
    { label: 'WSW (West-Southwest)', min: 236.25, max: 258.75 },
    { label: 'W (West)', min: 258.75, max: 281.25 },
    { label: 'WNW (West-Northwest)', min: 281.25, max: 303.75 },
    { label: 'NW (Northwest)', min: 303.75, max: 326.25 },
    { label: 'NNW (North-Northwest)', min: 326.25, max: 348.75 },
  ];

  const normalized = ((degrees % 360) + 360) % 360;
  for (const dir of directions) {
    if (normalized >= dir.min && normalized < dir.max) {
      return dir.label;
    }
  }
  return 'N';
}

/**
 * Calculates whether user needs to turn left or right and by how many degrees
 */
export function getTurnGuidance(
  deviceHeading: number,
  qiblaBearing: number,
  tolerance = 4
): { status: 'aligned' | 'turn_right' | 'turn_left'; degrees: number; message: string } {
  // Angle difference (-180 to +180)
  let diff = (qiblaBearing - deviceHeading) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  const absDiff = Math.abs(Math.round(diff));

  if (absDiff <= tolerance) {
    return {
      status: 'aligned',
      degrees: 0,
      message: 'PERFECTLY ALIGNED • FACING KAABA',
    };
  }

  if (diff > 0) {
    return {
      status: 'turn_right',
      degrees: absDiff,
      message: `TURN RIGHT ${absDiff}°`,
    };
  } else {
    return {
      status: 'turn_left',
      degrees: absDiff,
      message: `TURN LEFT ${absDiff}°`,
    };
  }
}
