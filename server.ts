import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// Initialize Gemini SDK with server-side API Key
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    appName: 'MUSAFIR',
    version: '1.0.0',
    hasGemini: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// Musafir AI Assistant Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], userLocation = 'Istanbul, Türkiye' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!ai) {
      // Graceful rich fallback when API key is not configured or in offline mode
      const fallbackResponse = generateLocalAssistantResponse(message, userLocation);
      res.json({
        text: fallbackResponse,
        source: 'local-knowledge-engine',
        disclaimer: 'AI-generated information may require verification from qualified Islamic scholars.',
      });
      return;
    }

    const systemInstruction = `You are Musafir AI, a knowledgeable, gentle, respectful, and highly practical travel companion for Muslim travellers worldwide.
Tagline: "Travel Far. Pray Anywhere. Stay Connected."
User location context: ${userLocation}.

Your duties:
1. Provide accurate, practical Muslim travel advice (halal food, prayer times & facilities, travel etiquette, packing, airports, visas, local customs).
2. For religious queries (Qasr/Jama' traveller prayers, wudu on flights, Tayammum, Miqat, Umrah/Hajj steps, halal dining standards):
   - Always state authentic references (Qur'an, Bukhari, Muslim, Abu Dawood) where applicable.
   - Mention differences among major Madhhabs (Hanafi, Shafi'i, Maliki, Hanbali) if relevant.
   - Explicitly include this reminder when discussing rulings: "Note: This is educational guidance. For definitive rulings, consult a qualified Islamic scholar."
   - NEVER fabricate Qur'an verses or Hadith.
3. Be concise, well-structured with bullet points or step-by-step numbered lists, warm in tone (start with Assalamu Alaikum when greeting), and travel-savvy.
4. If currency or distances are mentioned, give clear helpful approximations.`;

    const contents = [
      ...history.map((h: { role: string; text: string }) => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.text }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText = response.text || 'I could not generate a response. Please try again.';
    res.json({
      text: responseText,
      source: 'gemini-3.8-flash',
      disclaimer: 'AI-generated information may require verification from qualified Islamic scholars.',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    // Provide a helpful fallback rather than failing completely
    const fallback = generateLocalAssistantResponse(req.body.message || '', req.body.userLocation || 'Istanbul');
    res.json({
      text: fallback,
      source: 'local-knowledge-fallback',
      disclaimer: 'AI-generated information may require verification from qualified Islamic scholars.',
    });
  }
});

// Smart Muslim Travel Itinerary generator
app.post('/api/generate-itinerary', async (req: Request, res: Response) => {
  try {
    const { destination, days = 3, budget, travelStyle = 'Balanced', interests = ['History', 'Food'], prayerPreference = 'Pray in historic mosques' } = req.body;

    if (!destination) {
      res.status(400).json({ error: 'Destination is required' });
      return;
    }

    if (!ai) {
      res.json({
        plan: generateLocalItinerary(destination, Number(days) || 3, interests),
        source: 'local-template-engine',
      });
      return;
    }

    const prompt = `Create a detailed ${days}-day Muslim-friendly travel itinerary for ${destination}.
Budget: ${budget || 'Moderate'}
Travel Style: ${travelStyle}
Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
Prayer Preference: ${prayerPreference}

Requirements:
- Plan day by day (Day 1, Day 2, etc.)
- Intelligently schedule around the 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) without rushing
- Include specific verified or well-known local mosques to pray in (e.g., Jumu'ah or historic prayer spots)
- Suggest authentic Halal restaurants or food markets nearby
- Include practical travel tips (wudu facilities, comfortable walking shoes, modesty advice at sacred places)
- Format as JSON with:
  {
    "tripTitle": "${days}-Day Muslim Travel Guide to ${destination}",
    "summary": "overview paragraph",
    "days": [
      {
        "day": 1,
        "title": "Theme of Day 1",
        "morning": { "activity": "...", "prayer": "Fajr at ...", "halalFood": "..." },
        "afternoon": { "activity": "...", "prayer": "Dhuhr & Asr at ...", "halalFood": "..." },
        "evening": { "activity": "...", "prayer": "Maghrib & Isha at ...", "halalFood": "..." },
        "tips": "Day 1 tips"
      }
    ]
  }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      res.json({ plan: parsed, source: 'gemini-3.8-flash' });
    } catch {
      res.json({
        plan: generateLocalItinerary(destination, Number(days) || 3, interests),
        source: 'local-template-fallback',
      });
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.json({
      plan: generateLocalItinerary(req.body.destination || 'Istanbul', 3, ['History', 'Food']),
      source: 'local-template-fallback',
    });
  }
});

// Helper for offline / fallback assistant responses
function generateLocalAssistantResponse(query: string, location: string): string {
  const q = query.toLowerCase();

  if (q.includes('qasr') || q.includes('jama') || q.includes('combine') || q.includes('shorten') || q.includes('traveller')) {
    return `### Traveller's Salah (Qasr & Jama') Guidelines
**Assalamu Alaikum!** Here are the established Islamic rulings regarding prayer while on a journey:

1. **Shortening (Qasr):**
   - 4-rak'ah obligatory prayers (Dhuhr, Asr, and Isha) are shortened to **2 rak'ahs**.
   - Fajr (2 rak'ahs) and Maghrib (3 rak'ahs) are **never shortened**.
   - Sunnah prayers: The Prophet (ﷺ) typically prayed the Sunnah of Fajr and the Witr prayer even while travelling.

2. **Combining (Jama'):**
   - Permissible to combine Dhuhr with Asr, and Maghrib with Isha (either early at the time of the first, *Jama' Taqdim*, or delayed until the second, *Jama' Ta'khir*).
   - fajr is not combined with any other prayer.

3. **Travel Distance & Duration:**
   - Classical scholars generally define travel distance as approximately 48 miles (~77–81 km) away from one's city boundaries.
   - If you intend to stay in a destination for less than 4 days (according to majority Jumhur) or less than 15 days (Hanafi school), you retain traveller status.

*Reference: Sahih al-Bukhari (1081), Sahih Muslim (686).*
*(Note: This is educational guidance. For personal rulings, consult a qualified Islamic scholar).*`;
  }

  if (q.includes('pack') || q.includes('umrah') || q.includes('hajj')) {
    return `### Essential Packing List for Umrah & Hajj
**Assalamu Alaikum!** May Allah accept your blessed journey. Here are the core essentials:

- **Ihram Garments:** 2 sets of unstitched white towels (men); loose modest abayas/hijabs (women)
- **Ihram Belt & Money Pouch:** With secure zippered pockets
- **Comfortable Walking Footwear:** Unstitched sandals showing ankle & toes (for men in Ihram)
- **Unscented Toiletries:** Unscented soap, deodorant, sunscreen, and petroleum jelly (to prevent chafing)
- **Pocket Qur'an & Dua Booklet:** Plus digital Musafir app
- **Travel Prayer Mat:** Compact and pocket-sized
- **Tawaf Counter / Beads:** To keep track of the 7 circuits
- **Medical Essentials:** Pain relievers, throat lozenges, band-aids, prescribed medications
- **Universal Travel Adapter & High-Capacity Power Bank**`;
  }

  if (q.includes('mosque') || q.includes('masjid')) {
    return `### Nearby Mosques in ${location}
Here are top recommended prayer spots in ${location}:
1. **Sultanahmet Mosque (Blue Mosque)** - Historic grandeur, ample wudu, dedicated quiet prayer area for worshippers.
2. **Hagia Sophia Grand Mosque (Ayasofya-i Kebir)** - Open for all 5 daily prayers, active congregation.
3. **Süleymaniye Mosque** - Peaceful courtyards, stunning Bosphorus views, spacious women's prayer section.
4. **Fatih Mosque** - Traditional heart of the city with large community and vibrant local halal bazaar.

*Tip:* Check the **Nearby Mosques** tab in Musafir for real-time walking distances, Qibla compass, and Jumu'ah khutbah times!`;
  }

  if (q.includes('halal') || q.includes('food') || q.includes('eat') || q.includes('restaurant')) {
    return `### Halal Dining Guide in ${location}
- In Turkey, the vast majority of local meat is halal slaughtered. Look for TSE Halal certification or 'Helal' badges.
- **Top Dishes to Try:** Ottoman Kebabs, Lahmacun, Pide, Lentil soup (Mercimek), and authentic Turkish Tea with Pistachio Baklava.
- **Verification Tip:** Always confirm whether alcohol is served on premises if you prefer dry, strictly alcohol-free environments.
- Use Musafir's **Halal Food Finder** to filter restaurants by Halal Verification level, cuisine, and family facilities.`;
  }

  return `### Musafir Travel Advice for ${location}
**Assalamu Alaikum!** 
Traveling as a Muslim is a beautiful journey filled with opportunities for reflection and barakah.

- **Prayer Times:** Keep an eye on local prayer times and locate nearest mosques in advance.
- **Qibla:** Use our built-in Qibla Finder compass with device sensor calibration.
- **Cleanliness:** Carry a small pocket bottle for wudu water when public facilities lack bidets.
- **Travel Dua:** Recite *"Subhanal-ladzi sakh-khara lana hadza wa ma kunna lahu muqrinin, wa inna ila Rabbina lamun-qalibun"* when starting your transport.

Feel free to ask about traveller Salah rules, local mosques, packing checklists, or itinerary suggestions!`;
}

function generateLocalItinerary(destination: string, days: number, interests: string[]) {
  const tripDays = [];
  for (let i = 1; i <= Math.min(days, 7); i++) {
    tripDays.push({
      day: i,
      title: `Day ${i}: Exploring ${destination}'s Heritage & Faith`,
      morning: {
        activity: `Morning stroll around ${destination} historic quarter and cultural landmarks.`,
        prayer: `Fajr at central mosque, followed by morning Adhkar.`,
        halalFood: `Traditional local breakfast at verified Halal cafe.`,
      },
      afternoon: {
        activity: `Visit historic heritage sites, architectural monuments, and artisan markets.`,
        prayer: `Dhuhr & Asr prayers in congregation at the main historic mosque.`,
        halalFood: `Famous local cuisine lunch at verified family restaurant.`,
      },
      evening: {
        activity: `Sunset views along scenic promenade, souvenir shopping and evening tea.`,
        prayer: `Maghrib & Isha combined/prayed on time, followed by peaceful courtyard reflection.`,
        halalFood: `Signature dinner with traditional dishes and halal sweets.`,
      },
      tips: `Carry a refillable water bottle, compact prayer mat, and keep modest dress for mosque entries.`,
    });
  }

  return {
    tripTitle: `${days}-Day Muslim Travel Experience in ${destination}`,
    summary: `A carefully balanced travel itinerary for ${destination} combining top sights with seamless prayer times and halal dining.`,
    days: tripDays,
  };
}

// Start dev or production server
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Musafir Server listening on port ${PORT} (prod=${isProd})`);
  });
}

startServer();
