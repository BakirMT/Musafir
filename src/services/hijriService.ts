// Islamic Hijri Calendar Service with Regional Moonsighting & Astronomical Calculations
// Supports Umm al-Qura (Makkah), Hilal Sighting (Kerala & India), Diyanet (Turkey),
// North America (FCNA/ISNA), and Egyptian Survey Authority standards, with manual ±2 day adjustment.

export type HijriCalculationMethodId =
  | 'umm_al_qura'
  | 'hilal_india_kerala'
  | 'diyanet'
  | 'north_america'
  | 'egypt_survey';

export interface HijriMethodInfo {
  id: HijriCalculationMethodId;
  name: string;
  nameMl: string;
  nameAr: string;
  region: string;
  flag: string;
  defaultOffset: number; // e.g. 0 for Umm al-Qura, -1 for India/Kerala
  description: string;
  authority: string;
}

export const HIJRI_METHODS: HijriMethodInfo[] = [
  {
    id: 'umm_al_qura',
    name: 'Umm al-Qura (Makkah)',
    nameMl: 'ഉമ്മുൽ ഖുറാ (മക്ക & ഗൾഫ്)',
    nameAr: 'تقويم أم القرى (مكة المكرمة)',
    region: 'Saudi Arabia & Gulf',
    flag: '🇸🇦',
    defaultOffset: 0,
    description: 'Astronomical calculation based on calculated moonset after sunset in Makkah al-Mukarramah.',
    authority: 'King Abdulaziz City for Science & Technology (KACST)',
  },
  {
    id: 'hilal_india_kerala',
    name: 'Hilal Sighting (Kerala & India)',
    nameMl: 'ഹിലാൽ ദർശനം (കേരളം & ഇന്ത്യ)',
    nameAr: 'رؤية الهلال (كيرلا والهند)',
    region: 'Kerala, India & South Asia',
    flag: '🌴',
    defaultOffset: -1,
    description: 'Traditional naked-eye crescent moon sighting (Ru’yat al-Hilal) declared by local Qazis and sighting committees across Kerala and South Asia.',
    authority: 'Kerala Hilal Committee & All India Moon Sighting Committees',
  },
  {
    id: 'diyanet',
    name: 'Diyanet İşleri (Turkey)',
    nameMl: 'ദിയാനത്ത് (തുർക്കി & യൂറോപ്പ്)',
    nameAr: 'رئاسة الشؤون الدينية (تركيا)',
    region: 'Turkey, Europe & Balkans',
    flag: '🇹🇷',
    defaultOffset: 0,
    description: 'Calculated sighting criteria from Turkey’s Directorate of Religious Affairs, followed in European communities.',
    authority: 'Presidency of Religious Affairs (Diyanet)',
  },
  {
    id: 'north_america',
    name: 'FCNA / ISNA (North America)',
    nameMl: 'എഫ്.സി.എൻ.എ (വടക്കേ അമേരിക്ക)',
    nameAr: 'مجلس فقه أمريكا الشمالية (FCNA)',
    region: 'USA, Canada & Americas',
    flag: '🇺🇸',
    defaultOffset: 0,
    description: 'Fiqh Council of North America standard based on global astronomical moon sightability criteria.',
    authority: 'Fiqh Council of North America (FCNA)',
  },
  {
    id: 'egypt_survey',
    name: 'Egyptian General Survey',
    nameMl: 'ഈജിപ്ഷ്യൻ സർവേ അതോറിറ്റി',
    nameAr: 'الهيئة المصرية العامة للمساحة',
    region: 'Egypt, North Africa & Levant',
    flag: '🇪🇬',
    defaultOffset: 0,
    description: 'Egyptian Survey Authority standard requiring crescent moonset at least 5 minutes after sunset.',
    authority: 'Egyptian General Authority of Survey / Dar al-Ifta',
  },
];

export interface IslamicMonthInfo {
  index: number; // 1-12
  nameEn: string;
  nameAr: string;
  nameMl: string;
  meaning: string;
  isSacred: boolean; // Muharram(1), Rajab(7), Dhul Qi'dah(11), Dhul Hijjah(12)
}

export const ISLAMIC_MONTHS: IslamicMonthInfo[] = [
  { index: 1, nameEn: 'Muharram', nameAr: 'المحرم', nameMl: 'മുഹറം', meaning: 'The Sacred Month', isSacred: true },
  { index: 2, nameEn: 'Safar', nameAr: 'صفر', nameMl: 'സഫർ', meaning: 'The Month of Departure', isSacred: false },
  { index: 3, nameEn: "Rabi' al-Awwal", nameAr: 'ربيع الأول', nameMl: 'റബീഉൽ അവ്വൽ', meaning: 'The First Spring (Birth of the Prophet ﷺ)', isSacred: false },
  { index: 4, nameEn: "Rabi' al-Thani", nameAr: 'ربيع الثاني', nameMl: 'റബീഉൽ ആഖിർ', meaning: 'The Second Spring', isSacred: false },
  { index: 5, nameEn: 'Jumada al-Awwal', nameAr: 'جمادى الأولى', nameMl: 'ജമാദുൽ അവ്വൽ', meaning: 'The First Freeze', isSacred: false },
  { index: 6, nameEn: 'Jumada al-Thani', nameAr: 'جمادى الثانية', nameMl: 'ജമാദുൽ ആഖിർ', meaning: 'The Second Freeze', isSacred: false },
  { index: 7, nameEn: 'Rajab', nameAr: 'رجب', nameMl: 'റജബ്', meaning: 'The Honored Sacred Month', isSacred: true },
  { index: 8, nameEn: "Sha'ban", nameAr: 'شعبان', nameMl: 'ശഅ്ബാൻ', meaning: 'The Month of Separation & Preparation', isSacred: false },
  { index: 9, nameEn: 'Ramadan', nameAr: 'رمضان', nameMl: 'റമളാൻ', meaning: 'The Blessed Month of Fasting & Quran', isSacred: false },
  { index: 10, nameEn: 'Shawwal', nameAr: 'شوال', nameMl: 'ശവ്വാൽ', meaning: 'The Month of Eid al-Fitr', isSacred: false },
  { index: 11, nameEn: "Dhu al-Qi'dah", nameAr: 'ذو القعدة', nameMl: 'ദുൽഖഅ്ദ', meaning: 'The Sacred Month of Rest & Truce', isSacred: true },
  { index: 12, nameEn: 'Dhu al-Hijjah', nameAr: 'ذو الحجة', nameMl: 'ദുൽഹിജ്ജ', meaning: 'The Sacred Month of Hajj & Eid al-Adha', isSacred: true },
];

export interface IslamicEvent {
  month: number;
  day: number;
  titleEn: string;
  titleMl: string;
  titleAr: string;
  significance: string;
  isFastingRecommended?: boolean;
}

export const ANNUAL_ISLAMIC_EVENTS: IslamicEvent[] = [
  { month: 1, day: 1, titleEn: 'Hijri New Year', titleMl: 'ഹിജ്‌റ പുതുവർഷം', titleAr: 'رأس السنة الهجرية', significance: 'Beginning of the Islamic Calendar Year' },
  { month: 1, day: 9, titleEn: 'Tasu’a (9th Muharram)', titleMl: 'താസൂആഅ് (മുഹറം 9)', titleAr: 'تاسوعاء', significance: 'Sunnah fasting day before Ashura', isFastingRecommended: true },
  { month: 1, day: 10, titleEn: 'Day of Ashura (10th Muharram)', titleMl: 'ആശൂറാഅ് ദിനം (മുഹറം 10)', titleAr: 'يوم عاشوراء', significance: 'Deliverance of Prophet Musa (AS), high reward Sunnah fast', isFastingRecommended: true },
  { month: 3, day: 12, titleEn: 'Mawlid an-Nabi (Milad un-Nabi)', titleMl: 'നബിദിനം (മീലാദുന്നബി)', titleAr: 'المولد النبوي الشريف', significance: 'Birth of Prophet Muhammad ﷺ' },
  { month: 7, day: 27, titleEn: 'Al-Isra’ wal-Mi’raj', titleMl: 'ഇസ്‌റാഅ് മിഅ്റാജ് ദിനം', titleAr: 'الإسراء والمعراج', significance: 'The Miraculous Night Journey & Ascension' },
  { month: 8, day: 15, titleEn: 'Mid-Sha’ban (Nisf Sha’ban)', titleMl: 'ബറാഅത്ത് രാവ് (നിസ്ഫു ശഅ്ബാൻ)', titleAr: 'ليلة النصف من شعبان', significance: 'Night of forgiveness and voluntary fast', isFastingRecommended: true },
  { month: 9, day: 1, titleEn: 'First Day of Ramadan', titleMl: 'വിശുദ്ധ റമളാൻ ആരംഭം', titleAr: 'أول أيام شهر رمضان المبارك', significance: 'Start of the blessed month of obligatory fasting' },
  { month: 9, day: 17, titleEn: 'Battle of Badr Anniversary', titleMl: 'ബദ്ർ ദിനം (റമളാൻ 17)', titleAr: 'ذكرى غزوة بدر الكبرى', significance: 'Historic turning point for the Muslim Ummah' },
  { month: 9, day: 27, titleEn: 'Laylat al-Qadr (Night of Power)', titleMl: 'ലൈലത്തുൽ ഖദ്ർ (നിരീക്ഷണം)', titleAr: 'ليلة القدر المباركة', significance: 'Night better than a thousand months' },
  { month: 10, day: 1, titleEn: 'Eid al-Fitr (1st Shawwal)', titleMl: 'ചെറിയ പെരുന്നാൾ (ഈദുൽ ഫിത്വർ)', titleAr: 'عيد الفطر المبارك', significance: 'Celebration of completion of Ramadan fasting' },
  { month: 12, day: 1, titleEn: 'First 10 Days of Dhul Hijjah Begin', titleMl: 'ദുൽഹിജ്ജ ആദ്യ പത്ത് ദിനങ്ങൾ', titleAr: 'أوائل ذي الحجة', significance: 'The most virtuous days of the year for good deeds' },
  { month: 12, day: 8, titleEn: 'Yawm at-Tarwiyah (Hajj Begins)', titleMl: 'തർവിയാ ദിനം (ഹജ്ജ് ആരംഭം)', titleAr: 'يوم التروية', significance: 'Pilgrims depart for Mina' },
  { month: 12, day: 9, titleEn: 'Day of Arafah', titleMl: 'അറഫാ ദിനം', titleAr: 'يوم عرفة', significance: 'Pinnacle of Hajj; expiates sins of previous & coming year', isFastingRecommended: true },
  { month: 12, day: 10, titleEn: 'Eid al-Adha (Feast of Sacrifice)', titleMl: 'ബലിപെരുന്നാൾ (ഈദുൽ അദ്ഹാ)', titleAr: 'عيد الأضحى المبارك', significance: 'Major Islamic festival commemorating Prophet Ibrahim (AS)' },
  { month: 12, day: 11, titleEn: 'Ayyam at-Tashreeq (11-13 Dhul Hijjah)', titleMl: 'അയ്യാമുത്തശ്‌രീഖ്', titleAr: 'أيام التشريق', significance: 'Days of eating, drinking, and dhikr' },
];

export interface HijriDateDetails {
  day: number;
  month: number;
  year: number;
  monthNameEn: string;
  monthNameAr: string;
  monthNameMl: string;
  formatted: string;
  formattedAr: string;
  formattedMl: string;
  dayOfWeekEn: string;
  dayOfWeekMl: string;
  dayOfWeekAr: string;
  gregorianFormatted: string;
  isWhiteDay: boolean; // 13, 14, 15
  isSacredMonth: boolean; // 1, 7, 11, 12
  isFriday: boolean; // Jumu'ah
  methodId: HijriCalculationMethodId;
  methodName: string;
  dayAdjustment: number;
  totalOffsetDays: number;
  todayEvent: IslamicEvent | null;
  upcomingEvent: { event: IslamicEvent; daysUntil: number } | null;
  lunarPhase: {
    phaseName: string;
    phaseEmoji: string;
    percentage: number;
  };
}

export interface HijriDayCell {
  hijriDay: number;
  hijriMonth: number;
  hijriYear: number;
  gregorianDate: Date;
  gregorianDay: number;
  gregorianMonthName: string;
  dayOfWeekIndex: number; // 0 = Sun, 5 = Fri, 6 = Sat
  isToday: boolean;
  isWhiteDay: boolean; // 13, 14, 15
  isFriday: boolean;
  event: IslamicEvent | null;
}

/**
 * Calculates raw Hijri { day, month, year } from Date and offset in days
 */
export function calculateRawHijri(date: Date, offsetDays = 0): { day: number; month: number; year: number } {
  // Apply offset in milliseconds to keep clean calendar date
  const adjustedTime = date.getTime() + offsetDays * 86400000;
  const d = new Date(adjustedTime);
  const day = d.getDate();
  const m = d.getMonth();
  const y = d.getFullYear();

  const jd =
    Math.floor((1461 * (y + 4800 + Math.floor((m - 13) / 12))) / 4) +
    Math.floor((367 * (m - 1 - 12 * Math.floor((m - 13) / 12))) / 12) -
    Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 13) / 12)) / 100)) / 4) +
    day -
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

  return {
    day: d_islamic,
    month: m_islamic,
    year: y_islamic,
  };
}

/**
 * Approximate lunar phase calculation based on Hijri day (1-30)
 */
export function getLunarPhase(day: number): { phaseName: string; phaseEmoji: string; percentage: number } {
  if (day === 1) return { phaseName: 'New Crescent (Hilal)', phaseEmoji: '🌒', percentage: 4 };
  if (day >= 2 && day <= 6) return { phaseName: 'Waxing Crescent', phaseEmoji: '🌒', percentage: Math.round((day / 15) * 50) };
  if (day >= 7 && day <= 9) return { phaseName: 'First Quarter Moon', phaseEmoji: '🌓', percentage: 50 };
  if (day >= 10 && day <= 12) return { phaseName: 'Waxing Gibbous', phaseEmoji: '🌔', percentage: Math.round(50 + ((day - 9) / 6) * 45) };
  if (day >= 13 && day <= 15) return { phaseName: 'Full Moon (Badr / White Days)', phaseEmoji: '🌕', percentage: 100 };
  if (day >= 16 && day <= 19) return { phaseName: 'Waning Gibbous', phaseEmoji: '🌖', percentage: Math.round(95 - ((day - 15) / 5) * 40) };
  if (day >= 20 && day <= 23) return { phaseName: 'Last Quarter Moon', phaseEmoji: '🌗', percentage: 50 };
  if (day >= 24 && day <= 28) return { phaseName: 'Waning Crescent', phaseEmoji: '🌘', percentage: Math.round(45 - ((day - 23) / 6) * 35) };
  return { phaseName: 'Disappearing Moon (Mahaq)', phaseEmoji: '🌑', percentage: 5 };
}

/**
 * Returns complete Hijri details for a date with chosen method and manual adjustment
 */
export function getDetailedHijriDate(
  date: Date = new Date(),
  methodId: HijriCalculationMethodId = 'umm_al_qura',
  dayAdjustment = 0
): HijriDateDetails {
  const method = HIJRI_METHODS.find((m) => m.id === methodId) || HIJRI_METHODS[0];
  const totalOffsetDays = method.defaultOffset + dayAdjustment;

  const raw = calculateRawHijri(date, totalOffsetDays);
  const monthInfo = ISLAMIC_MONTHS[raw.month - 1] || ISLAMIC_MONTHS[3];

  const weekdayEn = date.toLocaleDateString('en-US', { weekday: 'long' });
  const weekdayMl = [
    'ഞായർ',
    'തിങ്കൾ',
    'ചൊവ്വ',
    'ബുധൻ',
    'വ്യാഴം',
    'വെള്ളി (ജുമുഅ)',
    'ശനി',
  ][date.getDay()];

  const weekdayAr = [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ][date.getDay()];

  const gregorianFormatted = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const isWhiteDay = raw.day === 13 || raw.day === 14 || raw.day === 15;
  const isFriday = date.getDay() === 5;

  // Check today's event
  const todayEvent = ANNUAL_ISLAMIC_EVENTS.find(
    (e) => e.month === raw.month && e.day === raw.day
  ) || null;

  // Find next upcoming Islamic event
  let upcomingEvent: { event: IslamicEvent; daysUntil: number } | null = null;
  let minDays = Infinity;
  for (const ev of ANNUAL_ISLAMIC_EVENTS) {
    if (ev.month === raw.month && ev.day > raw.day) {
      const diff = ev.day - raw.day;
      if (diff < minDays) {
        minDays = diff;
        upcomingEvent = { event: ev, daysUntil: diff };
      }
    } else if (ev.month === (raw.month % 12) + 1) {
      const diff = 29 - raw.day + ev.day;
      if (diff < minDays) {
        minDays = diff;
        upcomingEvent = { event: ev, daysUntil: diff };
      }
    }
  }

  const lunar = getLunarPhase(raw.day);

  // Arabic numeral formatter
  const toArNumber = (n: number) => {
    return n.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  };

  return {
    day: raw.day,
    month: raw.month,
    year: raw.year,
    monthNameEn: monthInfo.nameEn,
    monthNameAr: monthInfo.nameAr,
    monthNameMl: monthInfo.nameMl,
    formatted: `${raw.day} ${monthInfo.nameEn} ${raw.year} AH`,
    formattedAr: `${toArNumber(raw.day)} ${monthInfo.nameAr} ${toArNumber(raw.year)} هـ`,
    formattedMl: `${raw.year} ${monthInfo.nameMl} ${raw.day}`,
    dayOfWeekEn: weekdayEn,
    dayOfWeekMl: weekdayMl,
    dayOfWeekAr: weekdayAr,
    gregorianFormatted,
    isWhiteDay,
    isSacredMonth: monthInfo.isSacred,
    isFriday,
    methodId: method.id,
    methodName: method.name,
    dayAdjustment,
    totalOffsetDays,
    todayEvent,
    upcomingEvent,
    lunarPhase: lunar,
  };
}

/**
 * Builds the full grid of days for the current Islamic month
 */
export function getHijriMonthGrid(
  year: number,
  month: number,
  methodId: HijriCalculationMethodId = 'umm_al_qura',
  dayAdjustment = 0
): HijriDayCell[] {
  const method = HIJRI_METHODS.find((m) => m.id === methodId) || HIJRI_METHODS[0];
  const totalOffsetDays = method.defaultOffset + dayAdjustment;

  // Use current date as reference
  const now = new Date();
  const curH = calculateRawHijri(now, totalOffsetDays);

  // Approximate day 1
  const approxDay1Time = now.getTime() - (curH.day - 1) * 86400000;
  let day1 = new Date(approxDay1Time);
  day1.setHours(12, 0, 0, 0);

  // Align to exact day 1 of target month
  let safety = 0;
  while (calculateRawHijri(day1, totalOffsetDays).day !== 1 && safety < 35) {
    safety++;
    if (calculateRawHijri(day1, totalOffsetDays).day > 1) {
      day1 = new Date(day1.getTime() - 86400000);
    } else {
      day1 = new Date(day1.getTime() + 86400000);
    }
  }

  const cells: HijriDayCell[] = [];
  let curDate = new Date(day1);
  let dSafety = 0;

  while (dSafety < 31) {
    dSafety++;
    const h = calculateRawHijri(curDate, totalOffsetDays);
    if (h.month !== month) break;

    const isToday =
      curDate.getFullYear() === now.getFullYear() &&
      curDate.getMonth() === now.getMonth() &&
      curDate.getDate() === now.getDate();

    const ev = ANNUAL_ISLAMIC_EVENTS.find(
      (e) => e.month === h.month && e.day === h.day
    ) || null;

    cells.push({
      hijriDay: h.day,
      hijriMonth: h.month,
      hijriYear: h.year,
      gregorianDate: new Date(curDate),
      gregorianDay: curDate.getDate(),
      gregorianMonthName: curDate.toLocaleDateString('en-US', { month: 'short' }),
      dayOfWeekIndex: curDate.getDay(),
      isToday,
      isWhiteDay: h.day === 13 || h.day === 14 || h.day === 15,
      isFriday: curDate.getDay() === 5,
      event: ev,
    });

    curDate = new Date(curDate.getTime() + 86400000);
  }

  return cells;
}
