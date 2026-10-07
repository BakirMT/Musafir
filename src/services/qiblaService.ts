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
