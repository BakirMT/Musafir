import { CalculationMethod, CalculationMethodId, Madhhab, PrayerName, PrayerTimesData } from '../types';

export const CALCULATION_METHODS: Record<CalculationMethodId, CalculationMethod> = {
  MWL: {
    id: 'MWL',
    name: 'Muslim World League (MWL)',
    description: 'Fajr 18°, Isha 17°. Europe, Far East, parts of US.',
    fajrAngle: 18,
    ishaAngle: 17,
  },
  ISNA: {
    id: 'ISNA',
    name: 'ISNA (Islamic Society of North America)',
    description: 'Fajr 15°, Isha 15°. North America.',
    fajrAngle: 15,
    ishaAngle: 15,
  },
  Egypt: {
    id: 'Egypt',
    name: 'Egyptian General Authority',
    description: 'Fajr 19.5°, Isha 17.5°. Africa, Arab Peninsula.',
    fajrAngle: 19.5,
    ishaAngle: 17.5,
  },
  Makkah: {
    id: 'Makkah',
    name: 'Umm al-Qura University, Makkah',
    description: 'Fajr 18.5°, Isha 90 min after Maghrib. Arabian Peninsula.',
    fajrAngle: 18.5,
    ishaAngle: 17.5, // approximate angle or fixed 90 min interval
  },
  Karachi: {
    id: 'Karachi',
    name: 'University of Islamic Sciences, Karachi',
    description: 'Fajr 18°, Isha 18°. Pakistan, India, Bangladesh, Afghanistan.',
    fajrAngle: 18,
    ishaAngle: 18,
  },
  Diyanet: {
    id: 'Diyanet',
    name: 'Diyanet İşleri Başkanlığı, Türkiye',
    description: 'Fajr 18°, Isha 17°. Türkiye, Balkans, Central Asia.',
    fajrAngle: 18,
    ishaAngle: 17,
  },
};

// Astronomical helper functions
function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// Format fractional hours into "HH:MM AM/PM" or "HH:MM"
export function formatTime(hours: number, use24Hour: boolean = false): string {
  if (isNaN(hours)) return '--:--';
  let h = Math.floor(hours);
  let m = Math.floor((hours - h) * 60);

  if (m === 60) {
    h += 1;
    m = 0;
  }
  h = (h + 24) % 24;

  if (use24Hour) {
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

export function calculatePrayerTimes(
  date: Date,
  lat: number,
  lng: number,
  methodId: CalculationMethodId = 'Diyanet',
  madhhab: Madhhab = 'Hanafi',
  use24Hour: boolean = false
): PrayerTimesData {
  const method = CALCULATION_METHODS[methodId] || CALCULATION_METHODS.Diyanet;

  // Day of year
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Approximate solar declination and equation of time
  const B = toRad((360 / 365) * (dayOfYear - 81));
  const EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B); // in minutes
  const declination = toDeg(Math.asin(Math.sin(toRad(23.45)) * Math.sin(B)));

  // Timezone offset in hours
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;

  // Solar noon in local time
  const solarNoon = 12 + (timezoneOffsetHours * 15 - lng) / 15 - EoT / 60;

  // Dhuhr (solar noon + small safety buffer of 2 minutes)
  const dhuhrHours = solarNoon + 2 / 60;

  // Helper to compute hour angle for a specific altitude
  const getHourAngle = (altitude: number): number => {
    const latRad = toRad(lat);
    const decRad = toRad(declination);
    const altRad = toRad(altitude);

    const cosH =
      (Math.sin(altRad) - Math.sin(latRad) * Math.sin(decRad)) /
      (Math.cos(latRad) * Math.cos(decRad));

    if (cosH > 1) return 0; // Sun never rises
    if (cosH < -1) return 180; // Sun never sets
    return toDeg(Math.acos(cosH));
  };

  // Sunrise and Sunset (approx -0.833° altitude for atmospheric refraction)
  const sunAngle = -0.833;
  const HSunrise = getHourAngle(sunAngle) / 15;
  const sunriseHours = solarNoon - HSunrise;
  const sunsetHours = solarNoon + HSunrise;

  // Fajr
  const HFajr = getHourAngle(-method.fajrAngle) / 15;
  const fajrHours = solarNoon - HFajr;

  // Maghrib (sunset + 2 mins)
  const maghribHours = sunsetHours + 2 / 60;

  // Isha
  const HIsha = getHourAngle(-method.ishaAngle) / 15;
  const ishaHours = solarNoon + HIsha;

  // Asr
  // Shadow factor: Shafi = 1, Hanafi = 2
  const shadowMultiplier = madhhab === 'Hanafi' ? 2 : 1;
  const asrAlt = toDeg(
    Math.atan(1 / (shadowMultiplier + Math.tan(toRad(Math.abs(lat - declination)))))
  );
  const HAsr = getHourAngle(asrAlt) / 15;
  const asrHours = solarNoon + HAsr;

  const fajrFormatted = formatTime(fajrHours, use24Hour);
  const sunriseFormatted = formatTime(sunriseHours, use24Hour);
  const dhuhrFormatted = formatTime(dhuhrHours, use24Hour);
  const asrFormatted = formatTime(asrHours, use24Hour);
  const maghribFormatted = formatTime(maghribHours, use24Hour);
  const ishaFormatted = formatTime(ishaHours, use24Hour);

  // Determine Next Prayer and Remaining Time
  const nowHours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

  const schedule: { name: PrayerName; hours: number; formatted: string }[] = [
    { name: 'Fajr', hours: fajrHours, formatted: fajrFormatted },
    { name: 'Sunrise', hours: sunriseHours, formatted: sunriseFormatted },
    { name: 'Dhuhr', hours: dhuhrHours, formatted: dhuhrFormatted },
    { name: 'Asr', hours: asrHours, formatted: asrFormatted },
    { name: 'Maghrib', hours: maghribHours, formatted: maghribFormatted },
    { name: 'Isha', hours: ishaHours, formatted: ishaFormatted },
  ];

  let nextPrayerItem = schedule.find((item) => item.hours > nowHours);
  let remainingMinutes = 0;

  if (nextPrayerItem) {
    remainingMinutes = Math.max(1, Math.round((nextPrayerItem.hours - nowHours) * 60));
  } else {
    // Next prayer is tomorrow's Fajr
    nextPrayerItem = schedule[0];
    remainingMinutes = Math.max(1, Math.round((24 - nowHours + fajrHours) * 60));
  }

  const hoursLeft = Math.floor(remainingMinutes / 60);
  const minsLeft = remainingMinutes % 60;
  const remainingFormatted =
    hoursLeft > 0
      ? `${hoursLeft} hr ${minsLeft} min remaining`
      : `${minsLeft} minutes remaining`;

  // Calculate approximate Hijri Date
  const hijriDate = calculateHijriDate(date);
  const gregorianDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    Fajr: fajrFormatted,
    Sunrise: sunriseFormatted,
    Dhuhr: dhuhrFormatted,
    Asr: asrFormatted,
    Maghrib: maghribFormatted,
    Isha: ishaFormatted,
    nextPrayer: nextPrayerItem.name,
    nextPrayerTime: nextPrayerItem.formatted,
    remainingMinutes,
    remainingFormatted,
    hijriDate,
    gregorianDate,
    methodName: method.name,
  };
}

// Algorithmic Hijri Date estimation
export function calculateHijriDate(date: Date): string {
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  let jd =
    Math.floor((1461 * (y + 4800 + Math.floor((m - 13) / 12))) / 4) +
    Math.floor((367 * (m - 1 - 12 * Math.floor((m - 13) / 12))) / 12) -
    Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 13) / 12)) / 100)) / 4) +
    d -
    32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l_calc = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l_calc) / 5316) * Math.floor((50 * l_calc) / 17719) +
    Math.floor(l_calc / 5670) * Math.floor((43 * l_calc) / 15238);
  const l_calc2 =
    l_calc -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const m_islamic = Math.floor((24 * l_calc2) / 709);
  const d_islamic = l_calc2 - Math.floor((709 * m_islamic) / 24);
  const y_islamic = 30 * n + j - 30;

  const islamicMonths = [
    'Muharram',
    'Safar',
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    'Jumada al-Awwal',
    'Jumada al-Thani',
    'Rajab',
    "Sha'ban",
    'Ramadan',
    'Shawwal',
    "Dhu al-Qi'dah",
    'Dhu al-Hijjah',
  ];

  const monthName = islamicMonths[m_islamic - 1] || "Rabi' al-Thani";
  return `${d_islamic} ${monthName} ${y_islamic} AH`;
}
