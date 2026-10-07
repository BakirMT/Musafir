import { ChecklistItem, ExpenseItem, Trip } from '../types';

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Islamic Items
  { id: 'chk-1', category: 'Islamic Items', text: 'Compact travel prayer mat (waterproof)', completed: true },
  { id: 'chk-2', category: 'Islamic Items', text: 'Pocket Qur\'an or digital bookmarked app', completed: true },
  { id: 'chk-3', category: 'Islamic Items', text: 'Travel bidet / portable spray bottle (shattaf)', completed: true },
  { id: 'chk-4', category: 'Islamic Items', text: 'Miswak / halal personal hygiene kit', completed: false },
  { id: 'chk-5', category: 'Islamic Items', text: 'Dua booklet / saved travel supplications', completed: true },

  // Documents
  { id: 'chk-6', category: 'Documents', text: 'Passport with at least 6 months validity', completed: true },
  { id: 'chk-7', category: 'Documents', text: 'Turkey e-Visa or visa exemption papers', completed: true },
  { id: 'chk-8', category: 'Documents', text: 'Flight e-tickets & hotel booking confirmations', completed: true },
  { id: 'chk-9', category: 'Documents', text: 'Travel medical insurance certificate', completed: false },

  // Clothing
  { id: 'chk-10', category: 'Clothing', text: 'Modest breathable attire for historic mosques', completed: true },
  { id: 'chk-11', category: 'Clothing', text: 'Slip-on comfortable shoes (easy removal at mosques)', completed: true },
  { id: 'chk-12', category: 'Clothing', text: 'Light evening jacket / windbreaker for Bosphorus', completed: false },
  { id: 'chk-13', category: 'Clothing', text: 'Extra clean socks (for carpeted prayer halls)', completed: true },

  // Electronics
  { id: 'chk-14', category: 'Electronics', text: 'High-capacity power bank (20,000 mAh)', completed: true },
  { id: 'chk-15', category: 'Electronics', text: 'Universal travel plug adapter (EU Type C/F)', completed: true },
  { id: 'chk-16', category: 'Electronics', text: 'Offline maps & Musafir app downloaded', completed: true },

  // Money
  { id: 'chk-17', category: 'Money', text: 'Istanbulkart transport card & Turkish Lira (TRY)', completed: true },
  { id: 'chk-18', category: 'Money', text: 'Zero forex fee international debit/credit cards', completed: false },

  // Health
  { id: 'chk-19', category: 'Health', text: 'Personal prescription medications & basic first-aid', completed: true },
  { id: 'chk-20', category: 'Health', text: 'Hydration electrolyte tablets & lip balm', completed: false },
];

export const DEMO_TRIP: Trip = {
  id: 'trip-istanbul-5d',
  title: 'Istanbul Heritage & Faith Journey',
  destination: 'Istanbul, Türkiye',
  startDate: '2026-10-12',
  endDate: '2026-10-17',
  budgetTotal: 1800,
  currency: 'USD',
  downloadedOffline: true,
  notes: 'Stay at Sultanahmet near historic mosques. Combine Dhuhr & Asr when on Bosphorus cruise.',
  days: [
    {
      dayNumber: 1,
      title: 'Arrival & The Heart of Sultanahmet',
      activities: [
        {
          id: 'act-1-1',
          timeSlot: 'morning',
          activity: 'Arrive at Istanbul Airport (IST), airport prayer room, transfer to Sultanahmet hotel.',
          prayerNote: 'Fajr on arrival at Airport Terminal Mosque',
          halalFoodSpot: 'Simit Sarayı at arrival lounge',
        },
        {
          id: 'act-1-2',
          timeSlot: 'afternoon',
          activity: 'Visit Hagia Sophia Grand Mosque (Ayasofya-i Kebir) & Hippodrome Square.',
          prayerNote: 'Dhuhr & Asr prayed inside Hagia Sophia',
          halalFoodSpot: 'Tarihi Sultanahmet Köftecisi (100% Halal lamb/beef)',
        },
        {
          id: 'act-1-3',
          timeSlot: 'evening',
          activity: 'Explore Sultanahmet Park fountains; sunset reflection at Blue Mosque.',
          prayerNote: 'Maghrib & Isha at Sultanahmet (Blue Mosque)',
          halalFoodSpot: 'Hafiz Mustafa 1864 for tea and kunafa',
        },
      ],
    },
    {
      dayNumber: 2,
      title: 'Ottoman Grandeur & Grand Bazaar',
      activities: [
        {
          id: 'act-2-1',
          timeSlot: 'morning',
          activity: 'Tour Topkapı Palace & the Sacred Relics Pavilion (Holy Mantle of the Prophet ﷺ).',
          prayerNote: 'Fajr at hotel with Qibla compass',
          halalFoodSpot: 'Matbah Ottoman Palace Cuisine',
        },
        {
          id: 'act-2-2',
          timeSlot: 'afternoon',
          activity: 'Walk through Grand Bazaar (Kapalıçarşı) and Sahaflar Book Bazaar.',
          prayerNote: 'Dhuhr at Grand Bazaar Historic Prayer Hall (Kapalıçarşı Mescidi)',
          halalFoodSpot: 'Şehzade Cağ Kebap (Wood-fired lamb)',
        },
        {
          id: 'act-2-3',
          timeSlot: 'evening',
          activity: 'Bosphorus sunset stroll around Sirkeci and Eminönü Pier.',
          prayerNote: 'Maghrib at Yeni Camii (New Mosque, Eminönü)',
          halalFoodSpot: 'Halal grilled fish sandwich near Galata Bridge',
        },
      ],
    },
    {
      dayNumber: 3,
      title: 'Süleymaniye Splendor & Golden Horn',
      activities: [
        {
          id: 'act-3-1',
          timeSlot: 'morning',
          activity: 'Climb up to Mimar Sinan’s masterpiece: Süleymaniye Mosque and gardens.',
          prayerNote: 'Morning reflection in courtyard',
          halalFoodSpot: 'Traditional kuru fasulye (white beans) near mosque gates',
        },
        {
          id: 'act-3-2',
          timeSlot: 'afternoon',
          activity: 'Explore the Spice Bazaar (Mısır Çarşısı) and Rustem Pasha Mosque with exquisite Iznik tiles.',
          prayerNote: 'Dhuhr & Asr at Rustem Pasha Mosque',
          halalFoodSpot: 'Pandeli Restaurant (Eminönü)',
        },
        {
          id: 'act-3-3',
          timeSlot: 'evening',
          activity: 'Take ferry across the Bosphorus to Üsküdar Asian side.',
          prayerNote: 'Maghrib overlooking Maiden’s Tower (Kız Kulesi)',
          halalFoodSpot: 'Çiya Sofrası in Kadıköy',
        },
      ],
    },
    {
      dayNumber: 4,
      title: 'Spiritual Eyüp Sultan & Pierre Loti',
      activities: [
        {
          id: 'act-4-1',
          timeSlot: 'morning',
          activity: 'Visit sacred Eyüp Sultan Mosque (burial site of Abu Ayyub al-Ansari RA).',
          prayerNote: 'Fajr & Morning Adhkar at Eyüp Sultan courtyard',
          halalFoodSpot: 'Eyüp historic bakery & Turkish tea',
        },
        {
          id: 'act-4-2',
          timeSlot: 'afternoon',
          activity: 'Cable car to Pierre Loti Hill overlooking Golden Horn panoramic vista.',
          prayerNote: 'Dhuhr at Zal Mahmud Pasha Mosque',
          halalFoodSpot: 'Panoramic cafe lunch (Alcohol-free)',
        },
        {
          id: 'act-4-3',
          timeSlot: 'evening',
          activity: 'Taksim & Istiklal Street cultural walk; visit Taksim Grand Mosque.',
          prayerNote: 'Maghrib & Isha at Taksim Mosque',
          halalFoodSpot: 'Halal Turkish delight & Maraş dondurma',
        },
      ],
    },
    {
      dayNumber: 5,
      title: 'Ortaköy Waterfront & Departure Farewell',
      activities: [
        {
          id: 'act-5-1',
          timeSlot: 'morning',
          activity: 'Morning visit to Bosphorus shores at Ortaköy Mosque for iconic photos.',
          prayerNote: 'Duha prayer in Ortaköy Mosque',
          halalFoodSpot: 'Famous Ortaköy baked kumpir (Halal verified)',
        },
        {
          id: 'act-5-2',
          timeSlot: 'afternoon',
          activity: 'Last-minute souvenir shopping; pack luggage & check out.',
          prayerNote: 'Dhuhr & Asr traveller prayers combined',
          halalFoodSpot: 'Light farewell Turkish lunch',
        },
        {
          id: 'act-5-3',
          timeSlot: 'evening',
          activity: 'Transfer to Istanbul Airport. Recite travel return supplication.',
          prayerNote: 'Maghrib at IST Airport Mosque before departure',
          halalFoodSpot: 'Airport halal cafe',
        },
      ],
    },
  ],
};

export const KERALA_TRIP: Trip = {
  id: 'trip-kerala-5d',
  title: 'Kerala Malabar Heritage & Faith Trail',
  destination: 'Kochi & Kozhikode, Kerala, India',
  startDate: '2026-11-05',
  endDate: '2026-11-10',
  budgetTotal: 1200,
  currency: 'USD',
  downloadedOffline: true,
  notes: 'Explore Cheraman Juma Masjid (India\'s oldest mosque, 629 CE), historic Kuttichira wooden mosque, world-famous Malabar Biryani, and serene backwaters.',
  days: [
    {
      dayNumber: 1,
      title: 'Arrival in Kochi & Historic Fort Kochi',
      activities: [
        {
          id: 'kerala-1-1',
          timeSlot: 'morning',
          activity: 'Arrive at Cochin International Airport (CIAL); pray Fajr in Terminal Prayer Lounge; transfer to Fort Kochi.',
          prayerNote: 'Fajr at CIAL Airport Mosque',
          halalFoodSpot: 'Traditional Appam & Veg Stew at airport cafe',
        },
        {
          id: 'kerala-1-2',
          timeSlot: 'afternoon',
          activity: 'Walk through historic Mattancherry spice bazaar and Dutch Palace.',
          prayerNote: 'Dhuhr & Asr at Mattancherry Historic Juma Masjid',
          halalFoodSpot: 'Kayees Rahmathulla Cafe (Famous Mattancherry Mutton Biryani)',
        },
        {
          id: 'kerala-1-3',
          timeSlot: 'evening',
          activity: 'Sunset view of Chinese Fishing Nets at Fort Kochi beach; evening Sulaimani tea.',
          prayerNote: 'Maghrib & Isha at Calvathy Juma Masjid',
          halalFoodSpot: 'Fresh Halal grilled Malabar catch on waterfront',
        },
      ],
    },
    {
      dayNumber: 2,
      title: 'Pilgrimage to Cheraman Juma Masjid (629 CE)',
      activities: [
        {
          id: 'kerala-2-1',
          timeSlot: 'morning',
          activity: 'Scenic coastal drive north to Kodungallur, the ancient port of Muziris.',
          prayerNote: 'Morning Adhkar on peaceful coastal highway',
          halalFoodSpot: 'Dhe Puttu in Edappally for classic steamed Malabar breakfast',
        },
        {
          id: 'kerala-2-2',
          timeSlot: 'afternoon',
          activity: 'Visit Cheraman Juma Masjid (India\'s first mosque built in 629 CE during the Prophet\'s ﷺ era); visit Islamic heritage museum & ancient oil lamp.',
          prayerNote: 'Dhuhr & Asr prayers inside Cheraman Juma Masjid',
          halalFoodSpot: 'Traditional Kerala Halal Sadya / chicken curry in Kodungallur',
        },
        {
          id: 'kerala-2-3',
          timeSlot: 'evening',
          activity: 'Return along the coastal backwaters; serene boat cruise.',
          prayerNote: 'Maghrib overlooking Vembanad backwater estuary',
          halalFoodSpot: 'Malabar Porotta & Halal Beef Roast cafe',
        },
      ],
    },
    {
      dayNumber: 3,
      title: 'Journey to Kozhikode (Calicut) & Kuttichira Heritage',
      activities: [
        {
          id: 'kerala-3-1',
          timeSlot: 'morning',
          activity: 'Scenic Vande Bharat express train from Kochi to Kozhikode (Calicut) through verdant palm groves.',
          prayerNote: 'Duha traveller prayer while underway',
          halalFoodSpot: 'Kerala railway pantry snacks & Sulaimani tea',
        },
        {
          id: 'kerala-3-2',
          timeSlot: 'afternoon',
          activity: 'Explore Kuttichira: visit the 14th-century wooden marvel Mishkal Mosque and Muchundi Mosque.',
          prayerNote: 'Dhuhr & Asr at Mishkal Mosque courtyard pond',
          halalFoodSpot: 'World-famous Kozhikode Dum Biryani at Paragon Restaurant',
        },
        {
          id: 'kerala-3-3',
          timeSlot: 'evening',
          activity: 'Walk along Kozhikode Beach promenade; taste authentic Kozhikodan Halwa & salted mangoes.',
          prayerNote: 'Maghrib at Beach Road Juma Masjid',
          halalFoodSpot: 'Zains Malabar Traditional Cuisine (Chatti Pathiri & Unnakaya)',
        },
      ],
    },
    {
      dayNumber: 4,
      title: 'Wayanad Mountain Mists & Spiritual Solitude',
      activities: [
        {
          id: 'kerala-4-1',
          timeSlot: 'morning',
          activity: 'Climb the Thamarassery Churam mountain pass into lush Wayanad highlands.',
          prayerNote: 'Fajr in misty mountain masjid',
          halalFoodSpot: 'Wayanad mountain tea estate breakfast',
        },
        {
          id: 'kerala-4-2',
          timeSlot: 'afternoon',
          activity: 'Explore Banasura Sagar dam and serene bamboo forests; reflection on natural creation.',
          prayerNote: 'Dhuhr & Asr combined traveller prayers at hilltop mosque',
          halalFoodSpot: 'Wayanad traditional Halal bamboo biryani',
        },
        {
          id: 'kerala-4-3',
          timeSlot: 'evening',
          activity: 'Sunset over Western Ghats; return to riverside retreat.',
          prayerNote: 'Maghrib & Isha at The Raviz Kadavu prayer pavilion',
          halalFoodSpot: 'Riverside Malabar barbecue dinner',
        },
      ],
    },
    {
      dayNumber: 5,
      title: 'SM Street Malabar Bazaars & Departure Farewell',
      activities: [
        {
          id: 'kerala-5-1',
          timeSlot: 'morning',
          activity: 'Shopping at historic Sweet Meat Street (Mittai Theruvu) for Kozhikodan halwa and banana chips.',
          prayerNote: 'Morning Tahiyyatul Masjid at SM Street Mosque',
          halalFoodSpot: 'Historic Bombay Hotel for tea and snacks',
        },
        {
          id: 'kerala-5-2',
          timeSlot: 'afternoon',
          activity: 'Farewell stroll along Beypore ancient dhow (Uru) shipbuilding port.',
          prayerNote: 'Dhuhr & Asr at Beypore Juma Masjid',
          halalFoodSpot: 'Light farewell Malabar lunch',
        },
        {
          id: 'kerala-5-3',
          timeSlot: 'evening',
          activity: 'Transfer to Calicut International Airport (CCJ). Recite travel return supplication.',
          prayerNote: 'Maghrib at CCJ Airport Mosque',
          halalFoodSpot: 'Airport lounge cafe',
        },
      ],
    },
  ],
};

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'exp-1', tripId: 'trip-istanbul-5d', title: 'Hotel AJWA Sultanahmet (3 nights)', category: 'Hotel', amount: 480, currency: 'USD', date: '2026-10-12' },
  { id: 'exp-2', tripId: 'trip-istanbul-5d', title: 'Airport Shuttle & Istanbulkart reload', category: 'Transport', amount: 35, currency: 'USD', date: '2026-10-12' },
  { id: 'exp-3', tripId: 'trip-istanbul-5d', title: 'Dinner at Tarihi Sultanahmet Köftecisi', category: 'Food', amount: 28, currency: 'USD', date: '2026-10-12' },
  { id: 'exp-4', tripId: 'trip-istanbul-5d', title: 'Topkapı Palace & Sacred Relics tickets', category: 'Tickets', amount: 45, currency: 'USD', date: '2026-10-13' },
  { id: 'exp-5', tripId: 'trip-istanbul-5d', title: 'Baklava & Turkish Delight gifts', category: 'Shopping', amount: 62, currency: 'USD', date: '2026-10-13' },
  { id: 'exp-6', tripId: 'trip-istanbul-5d', title: 'Lunch at Şehzade Cağ Kebap', category: 'Food', amount: 32, currency: 'USD', date: '2026-10-14' },
];
