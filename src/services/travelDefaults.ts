import { ChecklistItem, ExpenseItem, Trip } from '../types';

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Islamic Items
  { id: 'chk-1', category: 'Islamic Items', text: 'Compact travel prayer mat (waterproof)', completed: true },
  { id: 'chk-2', category: 'Islamic Items', text: 'Pocket Qur\'an or bookmarked mobile app', completed: true },
  { id: 'chk-3', category: 'Islamic Items', text: 'Travel bidet / portable spray bottle (shattaf)', completed: true },
  { id: 'chk-4', category: 'Islamic Items', text: 'Miswak & halal personal hygiene kit', completed: false },
  { id: 'chk-5', category: 'Islamic Items', text: 'Dua booklet / saved travel supplications', completed: true },

  // Kerala Travel Documents & Identity
  { id: 'chk-6', category: 'Documents', text: 'Aadhaar / Passport & Govt ID copies', completed: true },
  { id: 'chk-7', category: 'Documents', text: 'Train / Flight tickets (Kochi / Calicut / Kannur)', completed: true },
  { id: 'chk-8', category: 'Documents', text: 'Hotel / Resort & Houseboat booking vouchers', completed: true },
  { id: 'chk-9', category: 'Documents', text: 'Driving license & vehicle papers (if renting cab/car)', completed: false },

  // Clothing & Weather
  { id: 'chk-10', category: 'Clothing', text: 'Modest breathable cotton clothes for tropical Kerala weather', completed: true },
  { id: 'chk-11', category: 'Clothing', text: 'Slip-on sandals / easy footwear for Kerala mosques', completed: true },
  { id: 'chk-12', category: 'Clothing', text: 'Sturdy compact umbrella (for Kerala rains & sun)', completed: true },
  { id: 'chk-13', category: 'Clothing', text: 'Light shawl / prayer cap (thoppi / hijab)', completed: true },

  // Electronics & Mobile
  { id: 'chk-14', category: 'Electronics', text: 'Power bank (20,000 mAh) for day trips', completed: true },
  { id: 'chk-15', category: 'Electronics', text: 'Mobile charger & car charging adapter', completed: true },
  { id: 'chk-16', category: 'Electronics', text: 'Musafir Kerala app & offline maps saved', completed: true },

  // Money & Payments
  { id: 'chk-17', category: 'Money', text: 'UPI Apps active (Google Pay / PhonePe / Paytm)', completed: true },
  { id: 'chk-18', category: 'Money', text: 'Emergency Indian Rupee cash (₹2,000 in smaller notes)', completed: false },

  // Health & Refreshment
  { id: 'chk-19', category: 'Health', text: 'Personal prescription medicines & first-aid', completed: true },
  { id: 'chk-20', category: 'Health', text: 'Mosquito repellent cream (Odomos) & hydration salts', completed: false },
];

export const KERALA_TRIP: Trip = {
  id: 'trip-kerala-5d',
  title: 'Kerala Malabar Heritage & Faith Trail',
  destination: 'Kochi, Kodungallur, Ponnani & Kozhikode, Kerala',
  startDate: '2026-11-05',
  endDate: '2026-11-10',
  budgetTotal: 25000,
  currency: 'INR',
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
      title: 'Ponnani: The Little Mecca of Malabar & Fath al-Mu\'in',
      activities: [
        {
          id: 'kerala-3-1',
          timeSlot: 'morning',
          activity: 'Scenic journey to Ponnani, the centuries-old Islamic scholarship capital of Malabar.',
          prayerNote: 'Fajr at hotel before departure',
          halalFoodSpot: 'Idiyappam & Egg Roast in Guruvayur / Ponnani border',
        },
        {
          id: 'kerala-3-2',
          timeSlot: 'afternoon',
          activity: 'Pray at Ponnani Valiya Juma Masjid (built in 1519 CE by Sheikh Zaynuddin Makhdum I). View the historic scholar teaching lamp (Vilakkilirikkal).',
          prayerNote: 'Dhuhr & Asr at Ponnani Valiya Juma Masjid',
          halalFoodSpot: 'Ponnani beach fresh seafood & Ghee Rice',
        },
        {
          id: 'kerala-3-3',
          timeSlot: 'evening',
          activity: 'Visit historic Biyyam Kayal backwater park; watch sunset over Ponnani fishing harbour.',
          prayerNote: 'Maghrib at Biyyam Kayal waterside masjid',
          halalFoodSpot: 'Malabar evening snacks (Unnakaya, Chattipathiri & Sulaimani)',
        },
      ],
    },
    {
      dayNumber: 4,
      title: 'Kozhikode: The Capital of Malabar Hospitality & Cuisine',
      activities: [
        {
          id: 'kerala-4-1',
          timeSlot: 'morning',
          activity: 'Arrive in Kozhikode (Calicut); visit Kuttichira heritage quarter and Mishkal Mosque (14th-century 4-tiered wooden mosque).',
          prayerNote: 'Duha prayer in Mishkal Palli',
          halalFoodSpot: 'Breakfast at Sagar Restaurant: Pathiri & Fish Curry',
        },
        {
          id: 'kerala-4-2',
          timeSlot: 'afternoon',
          activity: 'Visit Muchundi Mosque with ancient Zamorin King stone decree; walk around Kuttichira ancient pond.',
          prayerNote: 'Dhuhr & Asr combined at Muchundi Mosque',
          halalFoodSpot: 'Paragon Restaurant (World-famous Kozhikode Chicken & Mutton Biryani)',
        },
        {
          id: 'kerala-4-3',
          timeSlot: 'evening',
          activity: 'Kozhikode Beach sunset walk; enjoy pickled fruits (Uppilittathu) and ice orathi.',
          prayerNote: 'Maghrib at Kozhikode Beach Juma Masjid',
          halalFoodSpot: 'Zain\'s Hotel for authentic home-style snacks & Rahmath Beef Biryani',
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

// Set DEMO_TRIP to KERALA_TRIP
export const DEMO_TRIP: Trip = KERALA_TRIP;

export const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'exp-1', tripId: 'trip-kerala-5d', title: 'The Raviz Kadavu Resort (2 nights)', category: 'Hotel', amount: 8500, currency: 'INR', date: '2026-11-05' },
  { id: 'exp-2', tripId: 'trip-kerala-5d', title: 'Airport Taxi (Kochi to Fort Kochi)', category: 'Transport', amount: 1200, currency: 'INR', date: '2026-11-05' },
  { id: 'exp-3', tripId: 'trip-kerala-5d', title: 'Dinner at Paragon Restaurant (Biryani & Fish)', category: 'Food', amount: 950, currency: 'INR', date: '2026-11-05' },
  { id: 'exp-4', tripId: 'trip-kerala-5d', title: 'Cheraman Mosque & Muziris Heritage Tour', category: 'Tickets', amount: 400, currency: 'INR', date: '2026-11-06' },
  { id: 'exp-5', tripId: 'trip-kerala-5d', title: 'Kozhikode Halwa & Malabar Spices', category: 'Shopping', amount: 1800, currency: 'INR', date: '2026-11-07' },
  { id: 'exp-6', tripId: 'trip-kerala-5d', title: 'Lunch at Rahmath Restaurant (Beef Biryani)', category: 'Food', amount: 650, currency: 'INR', date: '2026-11-08' },
];
