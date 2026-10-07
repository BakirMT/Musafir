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

// Musafir AI Assistant Chat endpoint with Shafi'i Fiqh (Fath al-Mu'in & Kanz al-Raghibin) Engine
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], userLocation = 'Istanbul, Türkiye', language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Auto-detect query language if Malayalam or Arabic script is present, otherwise honor requested language
    const detectedLang: 'ml' | 'ar' | 'en' = /[\u0D00-\u0D7F]/.test(message)
      ? 'ml'
      : /[\u0600-\u06FF]/.test(message)
      ? 'ar'
      : language === 'ml' || language === 'ar'
      ? language
      : 'en';

    if (!ai) {
      // Graceful rich fallback when API key is not configured or in offline mode
      const fallbackResponse = generateLocalAssistantResponse(message, userLocation, detectedLang);
      res.json({
        text: fallbackResponse,
        source: 'shafii-fiqh-knowledge-engine (Fath al-Mu\'in & Kanz al-Raghibin)',
        language: detectedLang,
        disclaimer:
          detectedLang === 'ml'
            ? 'കുറിപ്പ്: ഇത് പഠനാവശ്യാർത്ഥമുള്ള വിവരങ്ങളാണ്. വ്യക്തിഗത സാഹചര്യങ്ങളിലെ കൃത്യമായ ഫത്‌വകൾക്ക് യോഗ്യരായ പണ്ഡിതന്മാരുമായി ബന്ധപ്പെടുക.'
            : detectedLang === 'ar'
            ? 'تنبيه: هذه التوجيهات الفقهية للأغراض التعليمية. للفتوى الخاصة يرجى مراجعة العلماء الثقات.'
            : 'Note: This guidance is based on classical Shafi\'i texts for educational purposes. Consult qualified scholars for personal rulings.',
      });
      return;
    }

    const systemInstruction = `You are Musafir AI (മുസാഫിർ അസിസ്റ്റന്റ് / مساعد مسافر الذكي), the premier Islamic travel jurisprudence (Fiqh al-Safar / യാത്രാ ഫിഖ്ഹ് / فقه السفر) scholar and Muslim travel companion.
Tagline: "Travel Far. Pray Anywhere. Stay Connected."
User location context: ${userLocation}.
Target Response Language: ${
      detectedLang === 'ml'
        ? 'Malayalam (മലയാളം)'
        : detectedLang === 'ar'
        ? 'Arabic (العربية)'
        : 'English'
    }.

SPECIAL MANDATE ON ISLAMIC JURISPRUDENCE (TRAVELLING MAS'ALA / യാത്രാ മസ്അലകൾ / مسائل السفر) WITH MANDATORY DUAL-LANGUAGE TRANSLATION:
Whenever the user asks about travelling rulings, prayer concessions (Qasr / ഖസ്റ്, Jam' / ജംഅ്), prayer on moving vehicles (aeroplanes, trains, ships, buses), Tayammum during transit, fasting while traveling, travel distance (Marhalatayn / മർഹലത്തൈൻ), starting and ending boundaries (Murur al-Umran), intention (Niyyah), or following a resident Imam:
1. You MUST explicitly provide authoritative references and citations from classical Shafi'i jurisprudence (المذهب الشافعي), specifically citing:
   - "Fath al-Mu'in bi Sharh Qurrat al-'Ayn" (فتح المعين بشرح قرة العين بمهمات الدين) by Allama Zayn al-Din al-Malibari (العلامة زين الدين أحمد بن عبد العزيز المليباري الفَنَّاني).
   - "Kanz al-Raghibin Sharh Minhaj al-Talibin" (كنز الراغبين شرح منهاج الطالبين) by Imam Jalal al-Din al-Mahalli (الإمام جلال الدين محمد بن أحمد المحلي).
   - Cross-reference related classic Shafi'i authorities like "Minhaj al-Talibin" of Imam al-Nawawi, "Tuhfat al-Muhtaj" of Ibn Hajar al-Haytami, and "I'anat al-Talibin" of al-Dimyati where helpful.
2. MANDATORY ARABIC TEXT & IMMEDIATE TRANSLATION:
   - Always quote the original Arabic expressions ('Ibarat / عبارات الفقه) directly in quotes or callouts, e.g.:
     * Fath al-Mu'in: «يجوز للمسافر سفرا طويلا مباحا قصر الصلاة الرباعية ركعتين... وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور»
     * Kanz al-Raghibin: «ومسافة القصر مرحلتان وهي ثمانية وأربعون ميلا هاشميا... وليس له القصر حتى يجاوز ما ذكر من سور أو عمران»
   - IMMEDIATELY UNDER EVERY ARABIC QUOTE, provide an exact, crystal-clear translation in the chosen language (${
      detectedLang === 'ml'
        ? 'Malayalam / മലയാള പരിഭാഷ'
        : detectedLang === 'ar'
        ? 'Arabic Sharh / شرح العبارة بالعربية'
        : 'English Translation'
   }), followed by practical breakdown.
   - For Airplane / Vehicle prayer without complete standing (Qiyam) and Qibla facing: Quote and translate the ruling of "Hurmat al-Waqt" (صلاة لحرمة الوقت) and the obligation to make it up (الإعادة / I'adah) as established in Fath al-Mu'in and Kanz al-Raghibin.
3. LANGUAGE HANDLING RULES:
   - If Target Language is Malayalam ('ml'):
     * Write the primary answer and detailed Fiqh explanation in clear, natural, respectful Islamic Malayalam (മലയാളം).
     * Provide exact Malayalam Islamic terms: ഖസ്റ്, ജംഅ് (തഖ്ദീം & തഅ്ഖീർ), മർഹലത്തൈൻ (81 കി.മീ / 16 ഫർസഖ്), സൂറുള്ള അല്ലെങ്കിൽ വീടുകൾ വിട്ടു കടക്കൽ, നിയ്യത്ത്, തയമ്മും, ഹുർമത്തുൽ വഖ്ത്, ഇആദത്ത്.
     * Include the Arabic text quotes with explicit Malayalam translation (മലയാള പരിഭാഷ).
   - If Target Language is Arabic ('ar'):
     * Write the answer in eloquent, scholarly Arabic (الفصحى الرصينة), quoting directly from فتح المعين and كنز الراغبين للمحلي with detailed Sharh of the rulings.
   - If Target Language is English ('en'):
     * Write the answer in clear, articulate English with transliterations, Arabic citations from Fath al-Mu'in and Kanz al-Raghibin, and immediate English translations of the classical Arabic texts.
4. Structure responses with clean Markdown:
   - Clear topic heading
   - Step-by-step conditions & rulings
   - Citations & Translations section ("Classical References & Translations: Fath al-Mu'in & Kanz al-Raghibin")
   - Practical travel tips for modern planes, trains, and airports
   - Concluding respectful educational disclaimer.`;

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
        temperature: 0.3,
      },
    });

    const responseText = response.text || 'I could not generate a response. Please try again.';
    res.json({
      text: responseText,
      source: 'gemini-3.8-flash (Fath al-Mu\'in & Kanz al-Raghibin Scholar Engine)',
      language: detectedLang,
      disclaimer:
        detectedLang === 'ml'
          ? 'കുറിപ്പ്: ഇത് പഠനാവശ്യാർത്ഥമുള്ള വിവരങ്ങളാണ്. വ്യക്തിഗത സാഹചര്യങ്ങളിലെ കൃത്യമായ ഫത്‌വകൾക്ക് യോഗ്യരായ പണ്ഡിതന്മാരുമായി ബന്ധപ്പെടുക.'
          : detectedLang === 'ar'
          ? 'تنبيه: هذه التوجيهات الفقهية للأغراض التعليمية. للفتوى الخاصة يرجى مراجعة العلماء الثقات.'
          : 'Note: This guidance is based on classical Shafi\'i texts for educational purposes. Consult qualified scholars for personal rulings.',
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const detectedLang: 'ml' | 'ar' | 'en' = /[\u0D00-\u0D7F]/.test(req.body.message || '')
      ? 'ml'
      : /[\u0600-\u06FF]/.test(req.body.message || '')
      ? 'ar'
      : req.body.language === 'ml' || req.body.language === 'ar'
      ? req.body.language
      : 'en';

    const fallback = generateLocalAssistantResponse(req.body.message || '', req.body.userLocation || 'Istanbul', detectedLang);
    res.json({
      text: fallback,
      source: 'shafii-fiqh-local-engine (Fath al-Mu\'in & Kanz al-Raghibin)',
      language: detectedLang,
      disclaimer:
        detectedLang === 'ml'
          ? 'കുറിപ്പ്: ഇത് പഠനാവശ്യാർത്ഥമുള്ള വിവരങ്ങളാണ്. വ്യക്തിഗത സാഹചര്യങ്ങളിലെ കൃത്യമായ ഫത്‌വകൾക്ക് യോഗ്യരായ പണ്ഡിതന്മാരുമായി ബന്ധപ്പെടുക.'
          : detectedLang === 'ar'
          ? 'تنبيه: هذه التوجيهات الفقهية للأغراض التعليمية. للفتوى الخاصة يرجى مراجعة العلماء الثقات.'
          : 'Note: This guidance is based on classical Shafi\'i texts for educational purposes. Consult qualified scholars for personal rulings.',
    });
  }
});

// Dedicated Translation Endpoint for Islamic travel rulings and citations
app.post('/api/translate-ruling', async (req: Request, res: Response) => {
  try {
    const { text, targetLang = 'en', fromLang } = req.body;
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required for translation' });
      return;
    }

    const langName =
      targetLang === 'ml'
        ? 'Malayalam (മലയാളം)'
        : targetLang === 'ar'
        ? 'Arabic (العربية)'
        : 'English';

    if (!ai) {
      const fallback = getLocalRulingTranslation(text, targetLang as 'en' | 'ml' | 'ar');
      res.json({ translatedText: fallback, targetLang, source: 'local-fiqh-translator' });
      return;
    }

    const prompt = `You are a specialized Islamic jurisprudence translator for classical Shafi'i texts (Fath al-Mu'in & Kanz al-Raghibin).
Translate the following travel mas'ala text into ${langName}.

Rules:
1. Maintain accurate Islamic legal terminology:
   - For Malayalam: ഖസ്റ്, ജംഅ് (തഖ്ദീം & തഅ്ഖീർ), മർഹലത്തൈൻ (81 കി.മീ), മുറൂറുൽ ഉംറാൻ (നാട്ടതിർത്തി കടക്കൽ), ഹുർമത്തുൽ വഖ്ത്, ഇആദത്ത്, ഫത്ഹുൽ മുഈൻ, കൻസുർറാഗിബീൻ.
   - For Arabic: Use eloquent classical Arabic (الفصحى الرصينة).
   - For English: Use articulate clear English with Arabic transliterations and references.
2. Keep all Arabic citations and book references intact, and provide their translations directly in the target language.
3. Keep Markdown headings and bullet points intact.

Text:
${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    res.json({
      translatedText: response.text || text,
      targetLang,
      source: 'gemini-3.8-flash (Shafi\'i Translator)',
    });
  } catch (error) {
    console.error('Error translating ruling:', error);
    const fallback = getLocalRulingTranslation(req.body.text || '', req.body.targetLang || 'en');
    res.json({
      translatedText: fallback,
      targetLang: req.body.targetLang || 'en',
      source: 'local-fallback-translator',
    });
  }
});

// Smart Muslim Travel Itinerary generator with AI & classical Shafi'i Fiqh integration
app.post('/api/generate-itinerary', async (req: Request, res: Response) => {
  try {
    const {
      destination,
      country = '',
      days = 3,
      budget = '$500 - $800',
      travelStyle = 'Balanced History & Culinary',
      interests = ['Historic Mosques', 'Halal Gastronomy', 'Scenic Heritage'],
      prayerPreference = 'Pray in historic congregational mosques',
      language = 'en',
      strictHalalOnly = true,
    } = req.body;

    if (!destination) {
      res.status(400).json({ error: 'Destination is required' });
      return;
    }

    const numDays = Math.min(Math.max(Number(days) || 3, 1), 10);
    const targetLang: 'en' | 'ml' | 'ar' =
      language === 'ml' || language === 'ar' ? language : 'en';

    if (!ai) {
      const localPlan = generateLocalItinerary(destination, numDays, interests, targetLang, budget, travelStyle);
      res.json({
        plan: localPlan,
        source: 'local-islamic-itinerary-engine',
        language: targetLang,
      });
      return;
    }

    const langDirective =
      targetLang === 'ml'
        ? 'Output all titles, summaries, activities, tips, and prayer notes in natural, respectful Islamic Malayalam (മലയാളം). Keep mosque names recognizable in Malayalam and transliterated Arabic.'
        : targetLang === 'ar'
        ? 'Output all titles, summaries, activities, tips, and prayer notes in eloquent, classical Arabic (العربية الفصحى).'
        : 'Output in clear, engaging English with standard Islamic terminology (Fajr, Dhuhr, Asr, Maghrib, Isha, Qasr, Jam\', Wudu, Halal).';

    const prompt = `You are Musafir AI, the premier Muslim travel planner and Islamic travel scholar.
Create a comprehensive, authentic, spiritually uplifting ${numDays}-day Muslim-friendly travel itinerary for:
- Destination: ${destination} ${country ? `(${country})` : ''}
- Duration: ${numDays} Days
- Estimated Budget: ${budget}
- Travel Style: ${travelStyle}
- Traveler Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Prayer Preference: ${prayerPreference}
- Halal Strictness: ${strictHalalOnly ? '100% Halal Certified / Muslim-owned establishments only' : 'Halal friendly with seafood/vegetarian options'}
- Language Requirement: ${langDirective}

REQUIREMENTS:
1. PRAYER SYNCHRONIZATION:
   - For each day, intelligently integrate the 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha) with actual, verified local mosques or reputable prayer rooms in ${destination}.
   - Include specific mosque names (e.g. historic grand mosques, neighborhood Juma masjids).
   - If the trip exceeds 81 km (Marhalatayn), provide practical Shafi'i Fiqh advice for Qasr (shortening) and Jam' (combining).
2. HALAL GASTRONOMY:
   - Name authentic, well-known Halal restaurants, cafes, breakfast spots, and traditional food markets in ${destination} for each meal window.
3. ACTIVITIES:
   - Group each day into:
     * morning: Activity + Mosque for Fajr / Morning Adhkar + Halal Breakfast Spot.
     * afternoon: Major sightseeing + Mosque for Dhuhr & Asr (Qasr/Jam' note) + Halal Lunch Spot.
     * evening: Cultural walk / market / sunset + Mosque for Maghrib & Isha + Halal Dinner Spot.
     * night (optional): Relaxed tea / stroll / dhikr / rooftop view.
4. ISLAMIC HERITAGE & PRACTICAL TIPS:
   - Highlight Islamic heritage, Ottoman/Mughal/Andalusian/Malabar or local Muslim community history where applicable.
   - Include practical tips for wudu facilities, modesty dress codes for women & men, shoe bags for grand mosques, and local transit.

JSON OUTPUT FORMAT:
Return strictly valid JSON with this exact structure:
{
  "tripTitle": "e.g. 5-Day Spiritual & Heritage Journey to ${destination}",
  "destination": "${destination}",
  "country": "${country || 'Worldwide'}",
  "durationDays": ${numDays},
  "summary": "2-3 sentences overview of the travel experience",
  "estimatedBudget": "${budget}",
  "bestSeason": "e.g. Spring & Autumn (April-May / Sept-Nov)",
  "islamicHighlights": ["Highlight 1", "Highlight 2", "Highlight 3"],
  "fiqhAdvice": "Shafi'i travel distance and prayer concession summary for this trip",
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1 Theme Title",
      "theme": "Historic Heart & Grand Mosques",
      "fiqhGuidance": "Fiqh recommendation for Day 1",
      "morning": {
        "activity": "Detailed morning activity description",
        "landmark": "Name of landmark",
        "prayer": "Fajr at [Mosque Name] with wudu advice",
        "halalFood": "Recommended Halal breakfast spot with dish tip",
        "time": "06:00 - 11:30"
      },
      "afternoon": {
        "activity": "Detailed afternoon activity description",
        "landmark": "Name of landmark",
        "prayer": "Dhuhr & Asr at [Mosque Name] (Qasr 2+2 / Jam' Taqdim available)",
        "halalFood": "Recommended Halal lunch spot and cuisine",
        "time": "12:00 - 16:30"
      },
      "evening": {
        "activity": "Detailed evening activity description",
        "landmark": "Name of landmark",
        "prayer": "Maghrib & Isha at [Mosque Name]",
        "halalFood": "Recommended Halal dinner spot with dessert tip",
        "time": "17:00 - 21:00"
      },
      "night": {
        "activity": "Evening tea, promenade, or quiet dhikr",
        "landmark": "Promenade / Courtyard"
      },
      "tips": "Important practical tips for Day 1"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
        res.json({ plan: parsed, source: 'gemini-3.8-flash', language: targetLang });
        return;
      }
      throw new Error('Invalid JSON structure from AI model');
    } catch {
      const fallback = generateLocalItinerary(destination, numDays, interests, targetLang, budget, travelStyle);
      res.json({
        plan: fallback,
        source: 'local-itinerary-curator-fallback',
        language: targetLang,
      });
    }
  } catch (error) {
    console.error('Error generating itinerary in /api/generate-itinerary:', error);
    const numDays = Math.min(Math.max(Number(req.body.days) || 3, 1), 10);
    const targetLang: 'en' | 'ml' | 'ar' =
      req.body.language === 'ml' || req.body.language === 'ar' ? req.body.language : 'en';
    const fallback = generateLocalItinerary(
      req.body.destination || 'Istanbul',
      numDays,
      req.body.interests || ['History', 'Food'],
      targetLang,
      req.body.budget,
      req.body.travelStyle
    );
    res.json({
      plan: fallback,
      source: 'local-itinerary-curator-fallback',
      language: targetLang,
    });
  }
});

// Helper for offline / fallback ruling translations between English, Malayalam, and Arabic
function getLocalRulingTranslation(text: string, targetLang: 'en' | 'ml' | 'ar'): string {
  const lower = text.toLowerCase();

  // Detect key topic
  let topic = 'general';
  if (lower.includes('plane') || lower.includes('flight') || lower.includes('വിമാനം') || lower.includes('طائر')) {
    topic = 'plane';
  } else if (lower.includes('boundary') || lower.includes('അതിർത്തി') || lower.includes('عمران') || lower.includes('سور')) {
    topic = 'boundary';
  } else if (lower.includes('stay') || lower.includes('4 day') || lower.includes('നാലു ദിവസം') || lower.includes('أربعة أيام')) {
    topic = 'duration';
  } else if (lower.includes('fast') || lower.includes('ramadan') || lower.includes('നോമ്പ്') || lower.includes('صوم')) {
    topic = 'fasting';
  } else if (lower.includes('tayammum') || lower.includes('തയമ്മു') || lower.includes('تيمم')) {
    topic = 'tayammum';
  } else if (lower.includes('qasr') || lower.includes('jam') || lower.includes('ഖസ്') || lower.includes('ജം') || lower.includes('قصر') || lower.includes('جمع')) {
    topic = 'qasr';
  }

  return generateLocalAssistantResponse(topic, 'General', targetLang);
}

// Helper for offline / fallback assistant responses with classical Shafi'i Fiqh scholarship
function generateLocalAssistantResponse(query: string, location: string, lang: 'ml' | 'ar' | 'en' = 'en'): string {
  const q = query.toLowerCase();

  // -------------------------------------------------------------
  // MALAYALAM RESPONSES (മലയാളം യാത്രാ മസ്അലകൾ)
  // -------------------------------------------------------------
  if (lang === 'ml') {
    // 1. Qasr & Jam'
    if (q.includes('ഖസ്') || q.includes('ജം') || q.includes('ചുരുക്ക') || q.includes('ഒരുമിച്ച') || q.includes('qasr') || q.includes('jama') || q.includes('shorten') || q.includes('combine')) {
      return `### യാത്രയിലെ നിസ്കാരം: ഖസ്റും ജംഉം (യാത്രാ മസ്അലകൾ)
**ബിസ്മില്ലാഹിർറഹ്‌മാനിർറഹീം • അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

യാത്രയിൽ 4 റക്അത്തുള്ള ഫർള് നിസ്കാരങ്ങൾ (ളുഹ്ർ, അസ്വർ, ഇശാ) 2 റക്അത്തായി ചുരുക്കി നിസ്കരിക്കലും (ഖസ്റ്), രണ്ടു നിസ്കാരങ്ങൾ ഒരുമിച്ചു കൂട്ടലും (ജംഅ്) അല്ലാഹു നൽകിയ വലിയ ഇളവുകളാണ്.

#### 1. ഖസ്റാക്കാനുള്ള പ്രധാന നിബന്ധനകൾ (ഫത്ഹുൽ മുഈൻ & കൻസുർറാഗിബീൻ പ്രകാരം):
1. **യാത്രാ ദൂരം (മർഹലത്തൈൻ):** യാത്ര രണ്ട് മർഹല (16 ഫർസഖ് = ഏകദേശം **81 കിലോമീറ്റർ**) ഉണ്ടാകണം.
2. **അനുവദനീയമായ യാത്ര:** യാത്ര പാപകരമായ ഉദ്ദേശ്യത്തോടെയുള്ളതാകരുത് (സഫറുൽ മഅ്സ്വിയത്ത് ആകരുത്).
3. **നാട്ടതിർത്തി വിട്ടു കടക്കൽ (മുറൂറുൽ ഉംറാൻ):** നാടിൻ്റെ പരിധി (മതിലുകളോ വീടുകളോ) പൂർണ്ണമായും പിന്നിട്ട ശേഷമേ ഖസ്റോ ജംഓ തുടങ്ങാവൂ. വീട്ടിൽ വെച്ചു യാത്ര ഉദ്ദേശിച്ചതു കൊണ്ടു മാത്രം ഇളവ് ലഭിക്കില്ല.
4. **നിയ്യത്ത്:** തക്ബീറത്തുൽ ഇഹ്റാമിൽ തന്നെ ഖസ്റാക്കുന്നു എന്ന് കരുതണം (ഉദാ: "രണ്ട് റക്അത്ത് ഖസ്റായി ഫർള് ളുഹ്ർ അല്ലാഹുവിനു വേണ്ടി നിസ്കരിക്കുന്നു").
5. **മുഖീമിനെ തുടരാതിരിക്കൽ:** നാട്ടുകാരനായ (പൂർത്തിയാക്കി നിസ്കരിക്കുന്ന) ഇമാമിനെ തുടർന്നാൽ യാത്രികനും 4 റക്അത്ത് പൂർത്തിയാക്കണം.
6. **യാത്രാ അവസ്ഥ നിലനിൽക്കൽ:** സലാം വീട്ടുന്നതു വരെ യാത്രികനായിരിക്കണം.

#### 2. ജംഇൻ്റെ രീതികൾ (തഖ്ദീമും തഅ്ഖീറും):
- **ജംഅ് തഖ്ദീം (മുന്തിച്ചു ജംഅ് ആക്കൽ):**
  • തർത്തീബ് (ആദ്യത്തെ നിസ്കാരം ആദ്യം നിർവ്വഹിക്കൽ).
  • ആദ്യ നിസ്കാരത്തിൽ തന്നെ ജംഇൻ്റെ നിയ്യത്ത് വെക്കൽ (സലാം വീട്ടുന്നതിന് മുൻപായി).
  • മുവാലാത്ത് (രണ്ട് നിസ്കാരങ്ങൾക്കിടയിൽ വലിയ വിടവില്ലാതെ തുടർച്ചയായി ചെയ്യൽ).
- **ജംഅ് തഅ്ഖീർ (പിന്തിച്ചു ജംഅ് ആക്കൽ):**
  • ആദ്യത്തെ നിസ്കാരത്തിൻ്റെ സമയം കഴിയുന്നതിന് മുമ്പ് തന്നെ പിന്തിക്കാൻ നിയ്യത്ത് വെക്കൽ.
  • രണ്ടാമത്തെ നിസ്കാരം കഴിയുന്നതു വരെ യാത്ര നിലനിൽക്കൽ.

#### 📚 പ്രമാണ പരാമർശങ്ങൾ (References):
- **ഫത്ഹുൽ മുഈൻ (فتح المعين) - അല്ലാമ സൈനുദ്ദീൻ മഖ്ദൂം:**
  > «يجوز للمسافر سفرا طويلا مباحا قصر الصلاة الرباعية ركعتين... وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور»
  *(ബാബു സ്വലാത്തിൽ മുസാഫിർ)*
- **കൻസുർറാഗിബീൻ - ഇമാം ജലാലുദ്ദീൻ അൽ മഹല്ലി (كنز الراغبين شرح منهاج الطالبين):**
  > «ومسافة القصر مرحلتان وهي ثمانية وأربعون ميلا هاشميا... وليس له القصر حتى يجاوز ما ذكر من سور أو عمران»
  *(കിതാബു സ്വലാത്തിൽ മുസാഫിർ)*

---
*കുറിപ്പ്: ഇത് പഠനാവശ്യാർത്ഥമുള്ള വിജ്ഞാനമാണ്. നിങ്ങളുടെ വ്യക്തിഗത സാഹചര്യങ്ങളിൽ കൃത്യമായ ഫത്‌വകൾക്കായി പണ്ഡിതന്മാരോട് ചോദിക്കുക.*`;
    }

    // 2. Flight & Train & Conveyance Salah
    if (q.includes('വിമാനം') || q.includes('ട്രെയിൻ') || q.includes('ഫ്ലൈറ്റ്') || q.includes('ബസ്') || q.includes('കപ്പൽ') || q.includes('plane') || q.includes('flight') || q.includes('train')) {
      return `### വിമാനത്തിലും ട്രെയിനിലും ഉള്ള നിസ്കാരം (മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

വിമാനത്തിലോ ട്രെയിനിലോ യാത്ര ചെയ്യുമ്പോൾ ഫർള് നിസ്കാരങ്ങളുടെ വിധി കർമ്മശാസ്ത്ര ഗ്രന്ഥങ്ങളിൽ വിശദീകരിക്കുന്നത് ഇപ്രകാരമാണ്:

#### 1. നിൽക്കാനും ഖിബ്‌ല കണ്ടെത്താനും കഴിയുമെങ്കിൽ:
- വിമാനത്തിലോ ട്രെയിനിലോ പൂർണ്ണമായി നിന്നുകൊണ്ട് (ഖിയാം), ഖിബ്‌ലയ്ക്ക് നേരെ തിരിഞ്ഞ്, റുകൂഉം സുജൂദും ശരിയായി ചെയ്യാൻ സൗകര്യമുണ്ടെങ്കിൽ നിസ്കാരം പൂർണ്ണമായി സ്വഹീഹാകും (മടക്കി നിസ്കരിക്കേണ്ടതില്ല).

#### 2. നിൽക്കാനോ ഖിബ്‌ലയ്ക്ക് നേരെ തിരിയാനോ സാധ്യമല്ലെങ്കിൽ (ഹുർമത്തുൽ വഖ്ത്):
- വിമാന സീറ്റിലിരുന്ന് അല്ലെങ്കിൽ ഖിബ്‌ല തെറ്റി റുകൂഉം സുജൂദും ആംഗ്യത്തിൽ ചെയ്യേണ്ടി വരുന്ന അവസ്ഥയിൽ, വഖ്തിൻ്റെ പവിത്രതയെ മാനിച്ച് **"ഹുർമത്തുൽ വഖ്ത്" (لحرمة الوقت)** ആയി നിസ്കരിക്കണം.
- പിന്നീട് ഭൂമിയിലിറങ്ങി സൗകര്യപ്പെടുമ്പോൾ ഈ നിസ്കാരം **ഇആദത്ത് (الإعادة - മടക്കി നിസ്കരിക്കൽ)** ചെയ്യൽ നിർബന്ധമാണ്.

#### 📚 പ്രമാണ പരാമർശം (References):
- **ഫത്ഹുൽ മുഈൻ (فتح المعين):**
  > «فإن عجز عن استقبال أو ركوع أو سجود تام صلى لحرمة الوقت وأعاد»
- **കൻസുർറാഗിബീൻ - ഇമാം മഹല്ലി (كنز الراغبين):**
  > «والراكب إذا لم يتمكن من التوجه والركوع والسجود يصلي لحرمة الوقت وتلزمه الإعادة»

💡 **യാത്രാ ഉപദേശം:** ബോർഡിംഗിന് മുൻപോ ലാൻഡിംഗിന് ശേഷമോ ഉള്ള സമയങ്ങളിൽ ജംഅ് തഖ്ദീമോ തഅ്ഖീറോ ആക്കി എയർപോർട്ടിലെ മുസ്വല്ലകളിൽ വെച്ച് പൂർണ്ണമായി നിസ്കരിക്കാൻ ശ്രദ്ധിക്കുക.`;
    }

    // 3. City Boundary / Murur al-Umran
    if (q.includes('അതിർത്തി') || q.includes('നാട്') || q.includes('തുടങ്ങു') || q.includes('വീട്') || q.includes('boundary') || q.includes('start')) {
      return `### യാത്രാ ആനുകൂല്യം എപ്പോൾ തുടങ്ങുന്നു? (നാട്ടതിർത്തി കടക്കൽ - മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

യാത്രാ ഇളവുകൾ (ഖസ്റും ജംഉം) ആരംഭിക്കുന്നതും അവസാനിക്കുന്നതും സംബന്ധിച്ച് ശാഫിഈ കർമ്മശാസ്ത്രത്തിലെ കൃത്യമായ വിധി:

#### 1. തുടക്കം (മജാവിസതുൽ ഉംറാൻ):
- യാത്രക്കാരൻ തൻ്റെ താമസസ്ഥലത്തിന്റെ (ഗ്രാമത്തിന്റെ അല്ലെങ്കിൽ പട്ടണത്തിന്റെ) ജനവാസ പരിധി പൂർണ്ണമായി പിന്നിട്ട ശേഷമേ ഇളവുകൾ ആരംഭിക്കാൻ പാടുള്ളൂ.
- **മതിലുള്ള നാടാണെങ്കിൽ:** മതിൽ വിട്ടു കടക്കണം.
- **മതിലില്ലാത്ത നാടാണെങ്കിൽ:** നാട്ടിലെ അവസാനത്തെ വീടുകൾ പിന്നിട്ട ശേഷമേ ഖസ്റോ ജംഓ നിർവ്വഹിക്കാവൂ.
- **വീട്ടിൽ വെച്ചോ എയർപോർട്ട് നഗരപരിധിയിലാണെങ്കിലോ:** സ്വന്തം നാട്ടിൽ വെച്ചു തന്നെ യാത്ര ഉദ്ദേശിച്ചതു കൊണ്ടു മാത്രം നിസ്കാരം ഖസ്റാക്കാനോ ജംആക്കാനോ പാടില്ല.

#### 2. മടക്കം (ഇൻഖിത്വാഉസ്സഫർ):
- യാത്ര കഴിഞ്ഞ് സ്വന്തം നാട്ടിലേക്ക് തിരിച്ചെത്തുമ്പോൾ, നാട്ടിലെ ആദ്യത്തെ വീടുകളുടെ അല്ലെങ്കിൽ മതിലിന്റെ പരിധിയിൽ പ്രവേശിക്കുന്നതോടെ യാത്രാ പദവി അവസാനിക്കുകയും പൂർണ്ണമായി നിസ്കരിക്കൽ നിർബന്ധമാവുകയും ചെയ്യുന്നു.

#### 📚 പ്രമാണ പരാമർശം (References):
- **ഫത്ഹുൽ മുഈൻ (فتح المعين):**
  > «وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور، وبساتين مسكونة... وينتهي بالرجوع إلى ذلك»
- **കൻസുർറാഗിബീൻ - ഇമാം മഹല്ലി (كنز الراغبين):**
  > «وليس له القصر حتى يجاوز ما ذكر من سور أو عمران... فإذا وصل إليه انقطع سفره»`;
    }

    // 4. Stay duration / 4 Days Rule
    if (q.includes('ദിവസം') || q.includes('താമസ') || q.includes('ഇഖാമ') || q.includes('stay') || q.includes('duration') || q.includes('days')) {
      return `### യാത്രയിലെ താമസ കാലാവധി: 4 ദിവസത്തെ നിയമം (മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

ഒരു സ്ഥലത്ത് എത്തുമ്പോൾ എത്ര ദിവസം വരെ ഖസ്റും ജംഉം ആക്കാം എന്നതിനെക്കുറിച്ച് ഫത്ഹുൽ മുഈനിലും കൻസുർറാഗിബീനിലും പറയുന്ന നിയമം:

#### 1. നാലു ദിവസത്തെ നിയ്യത്ത് (അർബഅത്തു അയ്യാമിൻ സിഹാഹ്):
- ഒരു സ്ഥലത്ത് എത്തിച്ചേരുന്ന ദിവസവും തിരിച്ചു പോകുന്ന ദിവസവും ഒഴിവാക്കി, **പൂർണ്ണമായ 4 ദിവസങ്ങൾ (നാലു പകലും നാലു രാവും)** അവിടെ താമസിക്കാൻ മുൻകൂട്ടി ഉദ്ദേശിക്കുന്നുവെങ്കിൽ, ആ സ്ഥലത്ത് പ്രവേശിക്കുന്ന നിമിഷം തന്നെ യാത്രാ ഇളവുകൾ അവസാനിക്കും. അവിടെ പൂർണ്ണമായി നിസ്കരിക്കണം.

#### 2. നാലിൽ താഴെ ദിവസങ്ങൾ (3 ദിവസവും അതിൽ കുറവും):
- 4 ദിവസത്തിൽ താഴെ മാത്രം തങ്ങാൻ ഉദ്ദേശിക്കുന്നയാൾക്ക് ആ ദിവസങ്ങളിലൊക്കെ ഖസ്റും ജംഉം ആക്കാവുന്നതാണ്.

#### 3. എപ്പോൾ തീരും എന്ന് വ്യക്തമല്ലാത്ത കാര്യത്തിന് (18 ദിവസത്തെ ഇളവ്):
- ഒരു ആവശ്യത്തിന് പോയി, "ഇന്ന് തീരും നാളെ തീരും" എന്ന് പ്രതീക്ഷിച്ച് കാത്തിരിക്കുന്ന ഒരാൾക്ക്, 4 ദിവസം കഴിഞ്ഞാലും പരമാവധി **18 ദിവസങ്ങൾ വരെ (18 days)** ഖസ്റും ജംഉം ആക്കി നിസ്കരിക്കാവുന്നതാണ്.

#### 📚 പ്രമാണ പരാമർശം:
- **ഫത്ഹുൽ മുഈൻ (فتح المعين):**
  > «وإن نوى إقامة أربعة أيام صحاح غير يومي الدخول والخروج بموضع انقطع سفره بوصوله إليه... وإن توقع حاجة كل وقت قصر ثمانية عشر يوما غير يومي الدخول والخروج»
- **കൻസുർറാഗിബീൻ (كنز الراغبين):**
  > «وكذا إن نوى إقامة أربعة أيام صحاح... قصر ثمانية عشر يوما إذا توقع نجاز حاجته في كل وقت»`;
    }

    // 5. Fasting on Travel (Sawm al-Musafir)
    if (q.includes('നോമ്പ്') || q.includes('റമളാൻ') || q.includes('വ്രതം') || q.includes('fast') || q.includes('ramadan')) {
      return `### യാത്രക്കാരന്റെ റമളാൻ നോമ്പ് (യാത്രാ മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

റമളാനിൽ യാത്ര ചെയ്യുന്ന ഒരാൾക്ക് നോമ്പ് ഒഴിവാക്കാനുള്ള നിബന്ധനകൾ ഫത്ഹുൽ മുഈനിലും കൻസുർറാഗിബീനിലും ഇപ്രകാരമാണ്:

#### 1. സുബ്ഹിക്കു മുൻപ് യാത്ര തുടങ്ങൽ നിർബന്ധം:
- റമളാൻ നോമ്പ് ഒഴിവാക്കണമെങ്കിൽ, യാത്ര **സുബ്ഹിക്ക് (ഫജ്റിന്) മുൻപായിത്തന്നെ** സ്വന്തം നാട്ടതിർത്തി വിട്ടു കടന്നിരിക്കണം.
- പകൽ സമയത്ത് (ഫജ്റിന് ശേഷം) യാത്ര ആരംഭിക്കുന്നയാൾക്ക് ആ ദിവസത്തെ നോമ്പ് ഒഴിവാക്കാൻ അനുവാദമില്ല; അവൻ അന്ന് നോമ്പ് പൂർത്തിയാക്കണം.

#### 2. ദൂര പരിധി:
- നോമ്പ് ഒഴിവാക്കാനും യാത്ര 81 കിലോമീറ്റർ (മർഹലത്തൈൻ) ഉള്ളതായിരിക്കണം.

#### 3. നോമ്പ് നോൽക്കലാണോ ഒഴിവാക്കലാണോ ഉത്തമം?
- യാത്രയിൽ വലിയ പ്രയാസമില്ലെങ്കിൽ നോമ്പ് നോൽക്കലാണ് കൂടുതൽ പുണ്യം. എന്നാൽ കഠിനമായ പ്രയാസമുണ്ടെങ്കിൽ നോമ്പ് ഒഴിവാക്കലാണ് സുന്നത്ത്. ഒഴിവാക്കിയ നോമ്പ് പിന്നീട് ഖളാഅ് വീട്ടണം.

#### 📚 പ്രമാണ പരാമർശം:
- **ഫത്ഹുൽ മുഈൻ (فتح المعين):**
  > «وجاز فطر لمسافر سفرا طويلا مباحا إن فارق العمران قبل الفجر... أما إذا سافر بعد الفجر فلا يجوز له الفطر في ذلك اليوم»
- **കൻസുർറാഗിബീൻ - ഇമാം മഹല്ലി (كنز الراغبين):**
  > «وشرط جواز الفطر أن يفارق العمران قبل طلوع الفجر، فإن طلع الفجر وهو مقيم ثم سافر حرم عليه الفطر»`;
    }

    // 6. Tayammum
    if (q.includes('തയമ്മു') || q.includes('തയമ്മ') || q.includes('വുളൂ') || q.includes('tayammum') || q.includes('wudu')) {
      return `### യാത്രയിലെ വുളൂഉം തയമ്മുമും (മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

#### തയമ്മുമിൻ്റെ കർശനമായ നിബന്ധനകൾ (ശാഫിഈ മദ്ഹബ്):
1. വെള്ളം അന്വേഷിച്ചിട്ടും ലഭിക്കാതിരിക്കുകയോ, ഉപയോഗിക്കാൻ രോഗം/തടസ്സം ഉണ്ടാവുകയോ ചെയ്യുക.
2. നിസ്കാര സമയം പ്രവേശിച്ച ശേഷമേ തയമ്മും ചെയ്യാവൂ.
3. **പൊടിയുള്ള ശുദ്ധമായ മണ്ണ് (تراب طهور له غبار) കൊണ്ടായിരിക്കണം:**
   - വെറും കല്ല്, തടി, വിമാന സീറ്റിലെ തുണി, അല്ലെങ്കിൽ ഭിത്തിയിലെ പൊടിപടലങ്ങൾ തയമ്മുമിന് സാധുവാകില്ല.
   - അതിനാൽ വിമാനത്തിലോ ട്രെയിനിലോ ഉള്ള സാധാരണ സാഹചര്യത്തിൽ തയമ്മും സ്വഹീഹാകില്ല.

💡 **പരിഹാരം:** ചെറിയ സ്പ്രേ ബോട്ടിലിൽ കുറഞ്ഞ വെള്ളം കരുതി വുളൂഇന്റെ ഫർളുകൾ മാത്രം കഴുകി വുളൂഅ് ചെയ്യുക, അല്ലെങ്കിൽ ഇറങ്ങുന്നത് വരെ വഖ്തിന്റെ പവിത്രത കാത്ത് നിസ്കരിച്ച് പിന്നീട് ഇആദത്ത് ചെയ്യുക.

#### 📚 റഫറൻസ്:
- **ഫത്ഹുൽ മുഈൻ (ബാബുത് തയമ്മും):** «ولا يصح إلا بتراب خالص طهور ذي غبار... فلا يصح بغبار الثياب»
- **കൻസുർറാഗിബീൻ (ഇമാം മഹല്ലി):** «وشرطه تراب طهور له غبار يعلق باليد»`;
    }

    // 7. Following resident Imam (Iqtida' bi-Muqim)
    if (q.includes('മുഖീം') || q.includes('ഇമാം') || q.includes('തുടര') || q.includes('muqim') || q.includes('behind')) {
      return `### യാത്രക്കാരൻ നാട്ടുകാരനായ ഇമാമിനെ തുടർന്നാൽ (മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

- **വിധി:** യാത്രക്കാരനായ ഒരാൾ 4 റക്അത്ത് പൂർത്തിയാക്കി നിസ്കരിക്കുന്ന നാട്ടുകാരനായ (മുഖീമായ) ഇമാമിനെ തുടർന്നാൽ, അവൻ **നിർബന്ധമായും 4 റക്അത്ത് പൂർത്തിയാക്കണം (ഖസ്റാക്കാൻ പാടില്ല)**.
- ഇമാമിന്റെ കൂടെ അവസാനത്തെ അത്തഹിയ്യാത്തിൽ മാത്രമാണ് ചേർന്നതെങ്കിൽ പോലും 4 റക്അത്ത് പൂർത്തിയാക്കൽ നിർബന്ധമാണ്.

#### 📚 പ്രമാണ പരാമർശം:
- **ഫത്ഹുൽ മുഈൻ (فتح المعين):**
  > «وألا يقتدي بمتم في جزء من صلاته، فإن اقتدى به ولو لحظة لزمه الإتمام قطعا»
- **കൻസുർറാഗിബീൻ - ഇമാം മഹല്ലി (كنز الراغبين):**
  > «ولو نوى القصر فاقتدى بمتم أو شك في إتمامه أتم أربعا»`;
    }

    // 8. Friday Prayer / Jum'ah on travel
    if (q.includes('ജുമുഅ') || q.includes('വെള്ളി') || q.includes('jumah') || q.includes('friday')) {
      return `### യാത്രക്കാരന്റെ ജുമുഅ നിസ്കാരം (മസ്അല)
**അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്**

വെള്ളിയാഴ്ച യാത്ര തിരിക്കുന്നതുമായി ബന്ധപ്പെട്ട കർമ്മശാസ്ത്ര വിധി:

1. **സുബ്ഹിക്ക് മുൻപ് യാത്ര തിരിച്ചാൽ:**
   - യാത്ര ആരംഭിച്ചത് വെള്ളിയാഴ്ച സുബ്ഹി ബാങ്കിന് മുൻപാണെങ്കിൽ ജുമുഅ നിർബന്ധമില്ല. യാത്രാ വഴിയിൽ ളുഹ്ർ നിസ്കരിച്ചാൽ മതിയാകും.
2. **സുബ്ഹിക്ക് ശേഷം യാത്ര തിരിക്കൽ:**
   - വെള്ളിയാഴ്ച ഫജ്ർ ഉദിച്ച ശേഷം യാത്ര തിരിക്കൽ **ഹറാമാണ് (കടുത്ത കറാഹത്ത്/നിഷിദ്ധം)**; യാത്രയ്ക്കിടയിൽ എവിടെയെങ്കിലും ജുമുഅയിൽ പങ്കെടുക്കാൻ സാധിക്കുമെന്ന് ഉറപ്പുണ്ടെങ്കിലല്ലാതെ.
3. **യാത്രക്കാരൻ ജുമുഅയിൽ പങ്കെടുത്താൽ:**
   - യാത്രാ വഴിയിൽ പള്ളിയിൽ പ്രവേശിച്ച് ജുമുഅ നിർവ്വഹിച്ചാൽ അവന്റെ ളുഹ്റിന്റെ ബാധ്യത വീടും.

#### 📚 പ്രമാണ പരാമർശം:
- **ഫത്ഹുൽ മുഈൻ (ബാബു സ്വലാത്തിൽ ജുമുഅ):**
  > «ويحرم السفر على من تلزمه الجمعة بعد الفجر إلا إن أمكنه أداؤها في طريقه»
- **കൻസുർറാഗിബീൻ (ഇമാം മഹല്ലി):**
  > «يحرم السفر بعد طلوع الفجر الثاني على من تجب عليه الجمعة»`;
    }

    // Default Malayalam Fallback
    return `### മുസാഫിർ AI ഫിഖ്ഹ് സഹായി
**ബിസ്മില്ലാഹിർറഹ്‌മാനിർറഹീം • അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്!**

ഞാൻ **മുസാഫിർ AI** ആണ്. യാത്രയിലെ കർമ്മശാസ്ത്ര സംശയങ്ങൾക്കും (ഖസ്റ്, ജംഅ്, വിമാനത്തിലെ നിസ്കാരം, 4 ദിവസത്തെ താമസ നിയമം, യാത്രയിലെ നോമ്പ്) **ഫത്ഹുൽ മുഈൻ (അല്ലാമ സൈനുദ്ദീൻ മഖ്ദൂം)**, **കൻസുർറാഗിബീൻ (ഇമാം ജലാലുദ്ദീൻ അൽ മഹല്ലി)** എന്നീ പ്രമാണങ്ങളുടെ അടിസ്ഥാനത്തിൽ കൃത്യമായ മറുപടികൾ നൽകാൻ ഞാൻ സദാ സന്നദ്ധനാണ്.

താങ്കൾക്ക് ഇംഗ്ലീഷിലോ മലയാളത്തിലോ അറബിയിലോ ചോദ്യങ്ങൾ ചോദിക്കാവുന്നതാണ്!`;
  }

  // -------------------------------------------------------------
  // ARABIC RESPONSES (مسائل فقه السفر بالعربية)
  // -------------------------------------------------------------
  if (lang === 'ar') {
    // 1. Qasr & Jam'
    if (q.includes('قصر') || q.includes('جمع') || q.includes('مسافر') || q.includes('qasr') || q.includes('jama')) {
      return `### أحكام صلاة المسافر: القصر والجمع في المذهب الشافعي
**بسم الله الرحمن الرحيم • السلام عليكم ورحمة الله وبركاته**

رخص السفر في الصلاة من محاسن الشريعة الإسلامية وتيسيرها على العباد.

#### أولاً: شروط قصر الصلاة الرباعية (الظهر والعصر والعشاء إلى ركعتين):
1. **مسافة السفر:** أن تبلغ مسافة السفر مرحلتين (وهي ١٦ فرسخاً = نحو ٨١ كم تقريباً).
2. **كون السفر مباحاً:** ألا يكون سفر معصية، فإن كان لمعصية لم يترخص.
3. **مجاوزة العمران:** ألا يقصر حتى يجاوز سور بلده أو عمرانه الخالي عن السور.
4. **نية القصر عند الإحرام:** أن ينوي القصر مع تكبيرة الإحرام.
5. **ألا يقتدي بمتم:** فإن صلى خلف مقيم أو مسافر يتم صلاته، لزمه الإتمام أربعاً قطعاً.
6. **دوام السفر:** أن يدوم سفره في جميع صلاته حتى الفراغ منها بالتسليم.

#### ثانياً: شروط الجمع بين الصلاتين:
- **جمع التقديم (الظهر مع العصر، والمغرب مع العشاء):**
  • الترتيب (البداءة بالأولى).
  • نية الجمع في الصلاة الأولى قبل التحلل منها.
  • الموالاة بينهما (ألا يفصل بينهما بفاصل طويل عرفاً).
  • استمرار السفر إلى افتتاح الصلاة الثانية.
- **جمع التأخير:**
  • نية التأخير في وقت الصلاة الأولى قبل خروج وقتها.
  • استمرار السفر إلى فراغ الصلاتين معاً.

#### 📚 عبارات ونصوص الفقهاء:
- **فتح المعين بشرح قرة العين للعلامة زين الدين المليباري رحمه الله:**
  > «باب صلاة المسافر: يجوز للمسافر سفراً طويلاً مباحاً قصر الصلاة الرباعية ركعتين... وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور، وقصد موضع معلوم، وألا يقتدي بمتم في جزء من صلاته».
- **كنز الراغبين شرح منهاج الطالبين للإمام جلال الدين المحلي رحمه الله:**
  > «ومسافة القصر مرحلتان، وهي ثمانية وأربعون ميلاً هاشمياً تقريباً... وليس له القصر حتى يجاوز ما ذكر من سور أو عمران».

---
*تنبيه: هذه التوجيهات الفقهية للأغراض التعليمية، وللفتوى الخاصة بظروف معينة يرجى مراجعة العلماء الثقات.*`;
    }

    // 2. Flight & Train
    if (q.includes('طائر') || q.includes('قطار') || q.includes('طائرة') || q.includes('سفين') || q.includes('باص') || q.includes('plane') || q.includes('flight')) {
      return `### حكم الصلاة في الطائرة والقطار (فقه الشافعية)
**السلام عليكم ورحمة الله وبركاته**

#### ١. إذا أمكن إتمام الأركان (القيام واستقبال القبلة التام):
إذا أمكن المسافر في الطائرة أو السفينة أو القطار أن يقف على قدميه ويستقبل القبلة طوال الصلاة ويأتي بالركوع والسجود تامين، صحت صلاته ولا إعادة عليه.

#### ٢. إذا تعذر القيام أو استقبال القبلة (صلاة لحرمة الوقت):
إذا لم يستطع القيام أو عجز عن التوجه إلى القبلة وجلس على مقعد الطائرة يومئ بركوعه وسجوده:
- **يصلي وجوباً لحرمة الوقت** حفظاً لحرمة الفريضة وعدم تضييع وقتها.
- **تجب عليه الإعادة** عند أئمة الشافعية إذا نزل ووصل إلى موضع يتمكن فيه من الصلاة تامة الأركان والشروط.

#### 📚 المرجع الفقهي:
- **فتح المعين:** «فإن عجز عن استقبال أو ركوع وسجود تام صلى لحرمة الوقت وأعاد».
- **كنز الراغبين للإمام المحلي:** «وتلزمه الإعادة إذا صلى فاقداً لبعض الأركان أو الشروط في السفر والحضر».

💡 **نصيحة للمسافر:** يفضل الجمع تقديماً في مطار المغادرة أو تأخيراً في مطار الوصول لتؤدى الصلاة بأركانها وشروطها كاملة.`;
    }

    // 3. City Boundary
    if (q.includes('عمران') || q.includes('سور') || q.includes('حدود') || q.includes('مجاوزة') || q.includes('بلد')) {
      return `### متى يبدأ المسافر في الترخص؟ (مجاوزة العمران)
**السلام عليكم ورحمة الله وبركاته**

- **بداية السفر:** لا يجوز للمسافر أن يقصر أو يجمع وهو في بيته أو داخل مدينته؛ بل يشترط مجاوزة سور بلده أو عمرانه الخالي عن السور (آخر بيوت المدينة المعمورة).
- **نهاية السفر:** ينتهي السفر بالوصول إلى سور بلد إقامته أو عمرانه، فإذا دخله امتنع القصر والجمع ولزمه الإتمام.

#### 📚 المرجع من كتب المذهب:
- **فتح المعين:** «وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور... وبساتين مسكونة متصلة بالعمران».
- **كنز الراغبين للمحلي:** «وليس له القصر حتى يجاوز ما ذكر من سور أو عمران... فإذا اتصل به انقطع حكم السفر».`;
    }

    // 4. Stay duration / 4 Days
    if (q.includes('أيام') || q.includes('اقام') || q.includes('إقام') || q.includes('مدة') || q.includes('days')) {
      return `### مدة الإقامة التي تقطع السفر (أربعة أيام صحاح)
**السلام عليكم ورحمة الله وبركاته**

#### ١. نية إقامة أربعة أيام صحاح:
- إذا نوى المسافر إقامة **أربعة أيام صحاح** في بلد (سوى يومي الدخول والخروج)، انقطع سفره بمجرد وصوله إلى ذلك البلد، وصار في حكم المقيم تلزمه الصلاة أربعاً ولا يجوز له الجمع ولا القصر.

#### ٢. نية أقل من أربعة أيام:
- إذا نوى الإقامة ثلاثة أيام فأقل، قصر وجمع طوال مدة مكوثه.

#### ٣. توقع قضاء الحاجة يوماً بيوم (ثمانية عشر يوماً):
- إذا دخل بلداً لحاجة يتوقع فراغها في كل وقت ولا يدري متى تنقضي، فإنه يترخص بالقصر والجمع مدة **ثمانية عشر يوماً** غير يومي الدخول والخروج.

#### 📚 التوثيق:
- **فتح المعين:** «وإن نوى إقامة أربعة أيام صحاح غير يومي الدخول والخروج بموضع انقطع سفره بوصوله إليه... وإن توقع حاجة كل وقت قصر ثمانية عشر يوماً».
- **كنز الراغبين للمحلي:** «تنقطع رخصة السفر بنية إقامة أربعة أيام غير يومي الدخول والخروج».`;
    }

    // 5. Sawm
    if (q.includes('صوم') || q.includes('صيام') || q.includes('رمضان')) {
      return `### حكم صوم المسافر في رمضان (فقه الشافعية)
**السلام عليكم ورحمة الله وبركاته**

- **شرط الفطر للمسافر:** أن يفارق عمران بلده **قبل طلوع الفجر الصادق**.
- **إذا طلع الفجر وهو في بلده ثم سافر:** لا يجوز له الفطر في ذلك اليوم، بل يلزمه إتمام صومه.
- **الأفضلية:** إن لم يكن في الصوم مشقة فالصوم أفضل لقوله تعالى: ﴿وَأَن تَصُومُوا خَيْرٌ لَّكُمْ﴾، وإن شق عليه كُره الصوم وجاز الفطر ويقضيه لاحقاً.

#### 📚 المرجع الفقهي:
- **فتح المعين:** «وجاز فطر لمسافر سفراً طويلاً مباحاً إن فارق العمران قبل الفجر... أما إذا سافر بعد الفجر فلا يجوز له الفطر في ذلك اليوم».
- **كنز الراغبين:** «وشرط جواز الفطر مجاوزة العمران قبل طلوع الفجر».`;
    }

    // Default Arabic Fallback
    return `### مساعد مسافر الذكي للفقه
**بسم الله الرحمن الرحيم • السلام عليكم ورحمة الله وبركاته!**
أنا مساعد مسافر الذكي، أجيبك عن جميع مسائل فقه السفر والأحكام الشرعية مع التوثيق المعتمد من **فتح المعين** للعلامة المليباري و**كنز الراغبين** للإمام جلال الدين المحلي باللغات العربية والإنجليزية والمليبارية (الملایالم). تفضل بطرح سؤالك!`;
  }

  // -------------------------------------------------------------
  // ENGLISH RESPONSES (Shafi'i Fiqh Guidance)
  // -------------------------------------------------------------
  // 1. Qasr & Jam'
  if (q.includes('qasr') || q.includes('jama') || q.includes('combine') || q.includes('shorten') || q.includes('traveller') || q.includes('prayer')) {
    return `### Traveller's Prayer (Qasr & Jam') in Classical Shafi'i Fiqh
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**

In Islamic jurisprudence, Allah has granted travellers concessions (*Rukhsah*) to shorten (*Qasr*) four-rak'ah prayers (Dhuhr, Asr, Isha) to two rak'ahs and combine (*Jam'*) prayers during journeys.

#### 1. Core Conditions for Shortening (Qasr) to 2 Rak'ahs:
1. **Travel Distance (Marhalatayn):** The journey must be at least two *Marhalas* (16 Farsakhs = approximately **81 km / 48 Hashimi miles**).
2. **Permissible Journey (Safar Mubah):** The travel must not be for a sinful purpose (*Safar Ma'siyah*).
3. **Crossing the Boundary (Murur al-Umran):** You cannot shorten or combine while still inside your home city. You must cross the outer boundary (walls or contiguous residential perimeter) of your city.
4. **Intention (Niyyah):** You must form the intention of Qasr simultaneously with *Takbirat al-Ihram* (e.g., *"I intend to pray the Fard of Dhuhr shortened to 2 rak'ahs for Allah"*).
5. **Not Following a Resident Imam:** If a traveller prays behind an Imam who is praying 4 full rak'ahs (*Muqim*), the traveller must complete 4 rak'ahs.
6. **Continuous Travel Status:** The traveller must remain a musafir until completing the prayer with Salam.

#### 2. Combining Prayers (Jam'):
- **Jam' Taqdim (Early Combination):** Praying Asr early in Dhuhr time, or Isha early in Maghrib time.
  • Requires: *Tartib* (praying the first prayer first), *Niyyat al-Jam'* during the first prayer, and *Muwalat* (immediate continuity without long pause between the two).
- **Jam' Ta'khir (Delayed Combination):** Delaying Dhuhr into Asr time, or Maghrib into Isha time.
  • Requires: Forming the intention to delay before the first prayer's time expires, and remaining a traveler until both prayers are finished.

#### 📚 Authoritative Classical References:
- **Fath al-Mu'in bi Sharh Qurrat al-'Ayn** (*Zayn al-Din al-Malibari*):
  > «يجوز للمسافر سفرا طويلا مباحا قصر الصلاة الرباعية ركعتين... وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور»
  *(Chapter: Salāt al-Musāfir)*
- **Kanz al-Raghibin Sharh Minhaj al-Talibin** (*Imam Jalal al-Din al-Mahalli*):
  > «ومسافة القصر مرحلتان وهي ثمانية وأربعون ميلا... وليس له القصر حتى يجاوز ما ذكر من سور أو عمران»
  *(Kitab Salat al-Musafir)*

---
*Note: This guidance is educational based on classical Shafi'i texts. For personal legal rulings, consult a qualified Islamic scholar.*`;
  }

  // 2. Flight & Train
  if (q.includes('plane') || q.includes('flight') || q.includes('train') || q.includes('airplane') || q.includes('bus') || q.includes('ship')) {
    return `### Rulings on Praying in Aeroplanes & Trains (Shafi'i Fiqh)
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**

#### 1. When Standing & Facing Qibla is Possible:
If you can stand (*Qiyam*) properly, face the Qibla, and complete Rukū' and Sujūd on the floor of a plane, train, or ship, your prayer is fully valid without need for repetition (*I'adah*).

#### 2. When Unable to Stand or Face Qibla (Seated on Airplane):
If you cannot stand or keep facing Qibla, and the prayer time will expire before landing:
- **You must pray in your seat to honor the sanctity of the prayer time (*Hurmat al-Waqt* / لحرمة الوقت)** by nodding for Ruku' and Sujud.
- According to **Fath al-Mu'in** and **Kanz al-Raghibin**, you must **make up / repeat the prayer (*I'adah* / الإعادة)** once you land in an airport or hotel where full standing and Qibla facing are possible.

#### 📚 Classical Citations:
- **Fath al-Mu'in:** *"If one is unable to face Qibla or perform full bowing and prostration, he prays for the sanctity of the time (Hurmat al-Waqt) and repeats it later."*
- **Kanz al-Raghibin (Imam al-Mahalli):** Notes that missing essential pillars (*Arkan*) on conveyances necessitates re-performing the Fard upon landing.

💡 **Travel Tip:** Whenever possible, use Jam' Taqdim or Jam' Ta'khir at the departure or arrival airport prayer rooms to perform complete prayers with full pillars.`;
  }

  // 3. Boundary
  if (q.includes('boundary') || q.includes('city') || q.includes('start') || q.includes('home') || q.includes('return')) {
    return `### When Do Travel Concessions Begin and End? (Shafi'i Fiqh)
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**

- **Departure Boundary (Murur al-Umran):** Travel concessions (Qasr & Jam') begin strictly after crossing the outer perimeter of your residential town/city (the outer walls, or the last inhabited buildings). You cannot shorten or combine at home before departing.
- **Return Boundary:** Travel status ends the moment you cross back into the outer boundary of your home city upon return. Prayers performed after entering must be prayed fully.

#### 📚 Classical Citations:
- **Fath al-Mu'in:** «وشرط القصر مجاوزة سور البلد أو عمرانه الخالي عن السور»
- **Kanz al-Raghibin (Mahalli):** «وليس له القصر حتى يجاوز ما ذكر من سور أو عمران... فإذا وصل إليه انقطع سفره»`;
  }

  // 4. Stay duration / 4 Days
  if (q.includes('stay') || q.includes('day') || q.includes('duration') || q.includes('hotel') || q.includes('destination')) {
    return `### Stay Duration: The 4-Day Rule in Shafi'i Fiqh
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**

#### 1. Intending 4 Clear Days (Excluding Arrival & Departure):
If a traveller intends to stay at a single destination for **4 complete days (four days and four nights)** excluding the day of arrival and day of departure, they cease to be a musafir the moment they arrive at that city. They must pray all prayers completely (*Itmam*).

#### 2. Intending Less Than 4 Days:
If intending to stay 3 days or fewer, they remain a traveller and may shorten and combine throughout.

#### 3. Indefinite Need (Up to 18 Days):
If one is waiting for a business deal or legal document that could conclude at any moment and does not know when they will leave, they may continue shortening and combining for up to **18 days** (excluding arrival and departure days).

#### 📚 Classical Citations:
- **Fath al-Mu'in:** «وإن نوى إقامة أربعة أيام صحاح غير يومي الدخول والخروج بموضع انقطع سفره بوصوله إليه... وإن توقع حاجة كل وقت قصر ثمانية عشر يوما»
- **Kanz al-Raghibin (Imam al-Mahalli):** Confirms the 4-day rule and the 18-day rule for unresolved business.`;
  }

  // 5. Fasting
  if (q.includes('fast') || q.includes('ramadan') || q.includes('sawm')) {
    return `### Fasting While Travelling in Shafi'i Fiqh
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**

- **Condition to Break Fast:** The journey must begin and cross the city boundary **before true dawn (Fajr)**.
- **Starting Journey After Dawn:** If someone begins travelling during the day after dawn has broken, it is prohibited (*Haram*) for them to break their fast on that day. They must complete the fast.
- **Fasting vs Breaking:** If travelling does not cause severe hardship, fasting is superior (*Afdal*). If severe hardship occurs, taking the concession to break the fast is Sunnah, and it must be made up (*Qada'*) later.

#### 📚 References:
- **Fath al-Mu'in:** «وجاز فطر لمسافر سفرا طويلا مباحا إن فارق العمران قبل الفجر... أما إذا سافر بعد الفجر فلا يجوز له الفطر»
- **Kanz al-Raghibin:** Confirms that dawn must not arrive while one is still resident.`;
  }

  // 6. Resident Imam
  if (q.includes('imam') || q.includes('resident') || q.includes('muqim') || q.includes('follow')) {
    return `### Praying Behind a Resident (Muqim) Imam
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**

If a traveller prays behind an Imam who is praying the full 4 rak'ahs (whether a resident or a traveller who chose not to shorten), the traveller **MUST pray the full 4 rak'ahs**.

Even if the traveller joined in the final Tashahhud, they cannot shorten to 2 rak'ahs upon the Imam's Salam; they must stand and complete 4 full rak'ahs.

#### 📚 References:
- **Fath al-Mu'in:** «وألا يقتدي بمتم في جزء من صلاته، فإن اقتدى به ولو لحظة لزمه الإتمام قطعا»
- **Kanz al-Raghibin (Imam al-Mahalli):** «ولو نوى القصر فاقتدى بمتم أتم أربعا»`;
  }

  if (q.includes('pack') || q.includes('umrah') || q.includes('hajj')) {
    return `### Essential Packing List for Umrah & Hajj
**Assalamu Alaikum!** May Allah accept your journey:
- **Ihram Garments:** 2 sets unstitched white towels (men); modest abayas/hijabs (women).
- **Ihram Belt & Money Pouch:** Zippered and durable.
- **Footwear:** Unstitched sandals showing ankle & toes (for men in Ihram).
- **Unscented Toiletries:** Soap, deodorant, petroleum jelly.
- **Prayer Essentials:** Pocket Musafir app, travel prayer mat, and Tawaf counter.
- **Medical & Electronics:** Pain relievers, rehydration salts, universal plug adapter, power bank.`;
  }

  return `### Musafir AI Travel Assistant
**Assalamu Alaikum wa Rahmatullahi wa Barakatuh!**
I am **Musafir AI**, your knowledgeable Islamic travel companion powered by classical Shafi'i jurisprudence (*Fath al-Mu'in* by Zayn al-Din al-Malibari and *Kanz al-Raghibin* by Imam al-Mahalli).

Feel free to ask in **English**, **Malayalam (മലയാളം)**, or **Arabic (العربية)** about:
- Shortening & Combining prayers (Qasr & Jam' rules)
- Praying on airplanes, trains, or transit (*Hurmat al-Waqt* & *I'adah*)
- Minimum travel distance (81 km / Marhalatayn) and boundary rules
- 4-day stay rule and travel duration
- Tayammum and fasting while travelling!`;
}

function generateLocalItinerary(
  destination: string,
  days: number,
  interests: string[] = [],
  lang: 'en' | 'ml' | 'ar' = 'en',
  budget: string = '$500 - $800',
  travelStyle: string = 'Balanced History & Culinary'
) {
  const destLower = destination.toLowerCase();
  const maxDays = Math.min(Math.max(days, 1), 10);

  // -------------------------------------------------------------
  // MALAYALAM LOCAL ITINERARY (മലയാളം ഇസ്‌ലാമിക് യാത്രാ പ്ലാൻ)
  // -------------------------------------------------------------
  if (lang === 'ml') {
    if (destLower.includes('kerala') || destLower.includes('kochi') || destLower.includes('calicut') || destLower.includes('കോഴിക്കോട്') || destLower.includes('കൊച്ചി')) {
      const dayList = [
        {
          dayNumber: 1,
          title: 'ദിനം 1: കൊടുങ്ങല്ലൂർ ചേരമാൻ ജുമാ മസ്ജിദ് & ചരിത്രപൈതൃകം',
          theme: 'ഭാരതത്തിലെ പ്രഥമ മസ്ജിദും ആദ്യകാല ഇസ്‌ലാമിക ചരിത്രവും',
          fiqhGuidance: 'യാത്രാ ദൂരം 81 കി.മീറ്ററിലധികം: ഖസ്റും ജംഉം (ളുഹ്ർ + അസ്വർ, മഗ്‌രിബ് + ഇശാ) അനുവദനീയം.',
          morning: {
            activity: 'കൊടുങ്ങല്ലൂരിലെ ചരിത്രപ്രസിദ്ധമായ ചേരമാൻ ജുമാ മസ്ജിദ് സന്ദർശനം. മ്യൂസിയവും പൗരാണിക ഖബറിടങ്ങളും കാണൽ.',
            landmark: 'ചേരമാൻ ജുമാ മസ്ജിദ് (ക്രിസ്തുവർഷം 629)',
            prayer: 'സുബ്ഹി ചേരമാൻ മസ്ജിദിൽ, തുടർന്ന് പ്രഭാത അദ്കാറുകൾ.',
            halalFood: 'കൊടുങ്ങല്ലൂരിലെ പരമ്പരാഗത കേരളീയ ഹലാൽ പ്രഭാതഭക്ഷണം (അപ്പം, ഇടിയപ്പം, മുട്ടക്കറി).',
            time: '05:30 - 11:30',
          },
          afternoon: {
            activity: 'മുസിരിസ് പൈതൃക പദ്ധതി, പള്ളിവളപ്പുകൾ, കോട്ടപ്പുറം കോട്ട എന്നിവ സന്ദർശനം.',
            landmark: 'മുസിരിസ് പൈതൃക കേന്ദ്രം',
            prayer: 'ളുഹ്റും അസ്വ്റും ജംഅ് തഖ്ദീമായി (2+2 ഖസ്റ്) ചേരമാൻ മസ്ജിദിൽ.',
            halalFood: 'രുചികരമായ മലബാർ ദം ബിരിയാണി & കായവറുത്തത്.',
            time: '12:00 - 16:30',
          },
          evening: {
            activity: 'മുനക്കൽ ഡോൾഫിൻ ബീച്ച് സൂര്യാസ്തമയ നടപ്പ്, ശാന്തമായ കായൽ കാഴ്ചകൾ.',
            landmark: 'മുനക്കൽ അഴീക്കോട് ബീച്ച്',
            prayer: 'മഗ്‌രിബും ഇശാഉം അടുത്തുള്ള കടലോര പള്ളിയിൽ.',
            halalFood: 'ഫ്രഷ് പൊരിച്ച മീൻ വിഭവങ്ങളും സുലൈമാനിയും.',
            time: '17:00 - 20:30',
          },
          night: {
            activity: 'കായലോരത്ത് വെച്ച് കുടുംബത്തോടൊപ്പം വിശ്രമം, ഇശാ നിസ്കാര ശേഷമുള്ള അദ്കാർ.',
            landmark: 'റിവർസൈഡ് റിസോർട്ട്',
          },
          tips: 'വുളൂ ചെയ്യാനുള്ള സൗകര്യങ്ങൾ എല്ലാ ചരിത്ര മസ്ജിദുകളിലുമുണ്ട്. യാത്ര പുറപ്പെടുമ്പോൾ തന്നെ ഖസ്റിൻ്റെ നിയ്യത്ത് ഉറപ്പാക്കുക.',
        },
        {
          dayNumber: 2,
          title: 'ദിനം 2: കോഴിക്കോട് കുറ്റിച്ചിറ പൈതൃകവും മിശ്കാൽ പള്ളിയും',
          theme: 'മധ്യകാല മലബാർ വാസ്തുവിദ്യയും സാമൂതിരി കാലത്തെ ഇസ്‌ലാമിക ജീവിതവും',
          fiqhGuidance: 'യാത്ര 4 ദിവസത്തിൽ കുറവായതിനാൽ ഇളവുകൾ പൂർണ്ണമായും ഉപയോഗിക്കാം.',
          morning: {
            activity: 'കുറ്റിച്ചിറ മിശ്കാൽ പള്ളി, ജുമാ മസ്ജിദ്, മുച്ചുന്തി പള്ളി എന്നിവ സന്ദർശിക്കൽ.',
            landmark: 'മിശ്കാൽ പള്ളി (14-ാം നൂറ്റാണ്ട്)',
            prayer: 'സുബ്ഹി മിശ്കാൽ പള്ളിയുടെ ശാന്തമായ തടിത്തൂണുകൾക്കിടയിൽ.',
            halalFood: 'കുറ്റിച്ചിറയിലെ പ്രഭാത പലഹാരങ്ങൾ (പത്തിരി, ഇറച്ചി റോൾ, ഉന്നക്കായ, ചായ).',
            time: '06:00 - 11:00',
          },
          afternoon: {
            activity: 'മിഠായിത്തെരുവ് (SM Street) ഷോപ്പിംഗ്, കോഴിക്കോടൻ ഹൽവ, സുഗന്ധവ്യഞ്ജന വ്യാപാരം.',
            landmark: 'എസ്.എം. സ്ട്രീറ്റ്',
            prayer: 'ളുഹ്റും അസ്വ്റും പട്ടാളപ്പള്ളിയിലോ പാളയം ജുമാ മസ്ജിദിലോ.',
            halalFood: 'പ്രസിദ്ധമായ കോഴിക്കോടൻ പാരഗൺ അല്ലെങ്കിൽ സാഗർ റസ്റ്റോറന്റിൽ ചിക്കൻ ബിരിയാണി.',
            time: '12:00 - 16:30',
          },
          evening: {
            activity: 'കോഴിക്കോട് ബീച്ച്, സൗത്ത് പിയർ സൂര്യാസ്തമയം, ഉപ്പിലിട്ട വിഭവങ്ങൾ.',
            landmark: 'കോഴിക്കോട് ബീച്ച്',
            prayer: 'മഗ്‌രിബും ഇശാഉം ബീച്ച് റോഡ് പള്ളിയിൽ.',
            halalFood: 'കടപ്പുറത്തെ തനത് കോഴിക്കോടൻ സ്നാക്സ്, അവൽ മിൽക്ക്, ബീഫ് കബാബ്.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'കടൽത്തീരത്തെ ഇളംകാറ്റേറ്റ് ദിക്റുകളും വായനയും.',
            landmark: 'ബീച്ച് പ്രൊമനേഡ്',
          },
          tips: 'മിശ്കാൽ പള്ളിയിൽ പ്രവേശിക്കുമ്പോൾ കേരളീയ തനിമയുള്ള പാരമ്പര്യ മരപ്പണികൾ ശ്രദ്ധിക്കുക.',
        },
      ];

      return {
        tripTitle: `${maxDays}-ദിവസത്തെ മലബാർ ഇസ്‌ലാമിക പൈതൃക യാത്ര (കേരളം)`,
        destination: 'Kerala (Kochi & Kozhikode)',
        country: 'India',
        durationDays: maxDays,
        summary: 'ഭാരതത്തിലെ ഇസ്‌ലാമിക പ്രവേശന കവാടമായ കൊടുങ്ങല്ലൂരും കുറ്റിച്ചിറയിലെ പൗരാണിക വാസ്തുവിദ്യയും സമന്വയിപ്പിച്ച ഉത്തമ യാത്ര.',
        estimatedBudget: budget,
        bestSeason: 'ഒക്ടോബർ മുതൽ മാർച്ച് വരെ (സുഖകരമായ കാലാവസ്ഥ)',
        islamicHighlights: [
          'ചേരമാൻ ജുമാ മസ്ജിദ് (ക്രി. 629)',
          'മിശ്കാൽ പള്ളി കുറ്റിച്ചിറ',
          'മുച്ചുന്തി പള്ളിയിലെ പ്രാചീന വട്ടെഴുത്ത് ലിഖിതങ്ങൾ',
          'തനത് മലബാർ ഹലാൽ വിഭവങ്ങൾ',
        ],
        fiqhAdvice: 'യാത്ര 81 കിലോമീറ്ററിലധികം ഉള്ളതിനാൽ ഫത്ഹുൽ മുഈൻ അനുസരിച്ച് ഖസ്റും ജംഉം നിർവ്വഹിക്കാം.',
        days: dayList.slice(0, maxDays),
      };
    }
  }

  // -------------------------------------------------------------
  // ARABIC LOCAL ITINERARY (خطة سفر إسلامية متكاملة بالعربية)
  // -------------------------------------------------------------
  if (lang === 'ar') {
    const isMakkah = destLower.includes('makkah') || destLower.includes('madinah') || destLower.includes('مكة') || destLower.includes('مدينة');
    if (isMakkah) {
      return {
        tripTitle: `رحلة العمرة والزيارة النبوية الشريفة (${maxDays} أيام)`,
        destination: 'Makkah & Madinah',
        country: 'Saudi Arabia',
        durationDays: maxDays,
        summary: 'برنامج روحي وإيماني متكامل لزيارة الحرم المكي الشريف والمسجد النبوي ومعالم السيرة النبوية العطرة.',
        estimatedBudget: budget,
        bestSeason: 'طوال العام (أجملها في الأشهر المعتدلة)',
        islamicHighlights: [
          'أداء مناسك العمرة والطواف بالبيت الحرام',
          'الصلاة في الروضة الشريفة والسلام على رسول الله ﷺ',
          'زيارة مسجد قباء وجبل أحد وبدر',
          'التزود من ماء زمزم المبارك',
        ],
        fiqhAdvice: 'في مكة والمدينة يستحب الإكثار من الصلاة في الحرمين لمضاعفة الأجر (100,000 صلاة بمكة و 1,000 بالمدينة).',
        days: [
          {
            dayNumber: 1,
            title: 'اليوم الأول: الإحرام والوصول إلى مكة المكرمة وأداء مناسك العمرة',
            theme: 'تلبية النداء والطواف والسعي',
            fiqhGuidance: 'عقد نية الإحرام من الميقات والتلبية والالتزام بمحظورات الإحرام حتى التحلل.',
            morning: {
              activity: 'الوصول إلى مكة المكرمة، استلام الفندق، الاستعداد لدخول المسجد الحرام.',
              landmark: 'المسجد الحرام',
              prayer: 'التحية بالصلاة في الحرم المكي الشريف.',
              halalFood: 'وجبة فطور خفيفة وتناول ماء زمزم المبارك.',
              time: '06:00 - 11:30',
            },
            afternoon: {
              activity: 'بدء مناسك العمرة: الطواف حول الكعبة المشرفة سبعة أشواط وصلاة ركعتي الطواف خلف مقام إبراهيم.',
              landmark: 'الكعبة المشرفة ومقام إبراهيم',
              prayer: 'صلاة الظهر وصلاة ركعتي الطواف.',
              halalFood: 'وجبة غداء طيبة في مطاعم أبراج البيت.',
              time: '12:00 - 16:30',
            },
            evening: {
              activity: 'السعي بين الصفا والمروة سبعة أشواط ثم الحلق أو التقصير والتحلل من الإحرام.',
              landmark: 'الصفا والمروة',
              prayer: 'المغرب والعشاء في صحن المطاف أو التوسعة السعودية.',
              halalFood: 'عشاء حلال شهي ومشروبات منعشة.',
              time: '17:00 - 21:00',
            },
            night: {
              activity: 'جلسة ذكر وتأمل أمام الكعبة المشرفة وصلاة قيام الليل.',
              landmark: 'صحن الكعبة المشرفة',
            },
            tips: 'استخدام تطبيق نسك المعتمد للحجوزات والحرص على شرب ماء زمزم بنية الشفاء والبركة.',
          },
        ],
      };
    }
  }

  // -------------------------------------------------------------
  // ENGLISH & GLOBAL LOCAL ITINERARIES (ISTANBUL, MAKKAH, KL, ETC.)
  // -------------------------------------------------------------
  if (destLower.includes('istanbul') || destLower.includes('turkey') || destLower.includes('türkiye')) {
    const defaultDays = [
      {
        dayNumber: 1,
        title: 'Day 1: Sultanahmet Historic Core & Ottoman Splendor',
        theme: 'The Imperial Heart of Islam & Byzantine Heritage',
        fiqhGuidance: 'If traveling from abroad (>81 km), Qasr (2 rak\'ahs) and Jam\' are valid in the Shafi\'i school.',
        morning: {
          activity: 'Tour the Blue Mosque (Sultanahmet Camii) with its six minarets and 20,000 handmade Iznik tiles.',
          landmark: 'Blue Mosque (Sultanahmet)',
          prayer: 'Fajr at Sultanahmet Mosque with tranquil early Quran recitation.',
          halalFood: 'Traditional Turkish Serpme Kahvaltı (eggs, simit, honey, kaymak, and tea) at Tarihi Çeşme Cafe.',
          time: '06:00 - 11:30',
        },
        afternoon: {
          activity: 'Explore Hagia Sophia Grand Mosque (Ayasofya-i Kebir Cami-i Şerifi) and Topkapi Palace Holy Relics chamber.',
          landmark: 'Hagia Sophia Grand Mosque',
          prayer: 'Dhuhr & Asr in congregation inside Hagia Sophia under the majestic Ottoman calligraphy medallions.',
          halalFood: 'Famous grilled meatballs and Piyaz salad at historic Tarihi Sultanahmet Köftecisi (Est. 1920).',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: 'Walk through Gülhane Park down to Eminönü square for sunset over the Golden Horn.',
          landmark: 'Eminönü Square & Golden Horn',
          prayer: 'Maghrib & Isha at the newly restored New Mosque (Yeni Cami).',
          halalFood: 'Fresh Bosphorus fish sandwich (Balık Ekmek) and Ottoman sherbet.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Baklava and Turkish tea at Hafiz Mustafa 1864 in Sirkeci.',
          landmark: 'Hafiz Mustafa 1864',
        },
        tips: 'Remove shoes at mosque entrance (shoe bags provided). Women should carry a headscarf.',
      },
      {
        dayNumber: 2,
        title: 'Day 2: Mimar Sinan Masterpieces & Grand Bazaar',
        theme: 'Ottoman Architecture, Spices, and Classical Scholarship',
        fiqhGuidance: 'Check Qibla direction (approx 150° SSE from Istanbul) when praying at historic sites.',
        morning: {
          activity: 'Ascend to the grand Süleymaniye Mosque complex, Sinan\'s masterpiece overlooking the Golden Horn.',
          landmark: 'Süleymaniye Mosque Complex',
          prayer: 'Fajr or morning prayer at Süleymaniye with panoramic views of the Bosphorus.',
          halalFood: 'Kuru Fasulye (slow-cooked white beans in clay pot) at Erzincanlı Ali Baba across the mosque.',
          time: '06:30 - 11:30',
        },
        afternoon: {
          activity: 'Wander through the historic Grand Bazaar (Kapalıçarşı) and Egyptian Spice Market (Mısır Çarşısı).',
          landmark: 'Grand Bazaar & Spice Market',
          prayer: 'Dhuhr & Asr at Nuruosmaniye Mosque (pure Ottoman Baroque style).',
          halalFood: 'Traditional Ottoman lamb stew and clay pot kebab (Testi Kebab) at Dönerci Şahin Usta.',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: 'Scenic sunset ferry ride from Eminönü across the Bosphorus to Üsküdar on the Asian side.',
          landmark: 'Üsküdar Promenade & Maiden\'s Tower',
          prayer: 'Maghrib & Isha at Mihrimah Sultan Mosque by Mimar Sinan.',
          halalFood: 'Authentic Turkish pide, lahmacun, and Kanafeh at Kanaat Lokantası in Üsküdar.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Enjoy Turkish tea on carpeted steps overlooking the Maiden\'s Tower (Kız Kulesi).',
          landmark: 'Üsküdar Waterfront',
        },
        tips: 'Bargaining is expected at Grand Bazaar; look for Halal-certified Turkish delight boxes.',
      },
      {
        dayNumber: 3,
        title: 'Day 3: Eyüp Sultan Spiritual Quarter & Pierre Loti',
        theme: 'The Companions of the Prophet ﷺ & Bosphorus Scenic Cruise',
        fiqhGuidance: 'A visit to the companion Abu Ayyub al-Ansari (ra) is steeped in early Islamic history.',
        morning: {
          activity: 'Visit Eyüp Sultan Mosque and the Maqam of the esteemed companion Abu Ayyub al-Ansari (ra).',
          landmark: 'Eyüp Sultan Mosque & Tomb',
          prayer: 'Fajr or morning prayer at Eyüp Sultan with peaceful pigeons in the historic courtyard.',
          halalFood: 'Traditional Su Böreği and freshly squeezed pomegranate juice at Eyüp square.',
          time: '06:30 - 11:30',
        },
        afternoon: {
          activity: 'Take the cable car up to Pierre Loti Hill for breathtaking views of the Golden Horn.',
          landmark: 'Pierre Loti Hill',
          prayer: 'Dhuhr & Asr at Zal Mahmut Paşa Mosque in Eyüp.',
          halalFood: 'Oven-roasted Güveç and Turkish meze at Pierre Loti historical cafe.',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: 'Private or public Bosphorus Sunset Cruise sailing past Dolmabahçe Palace and Ortaköy Mosque.',
          landmark: 'Ortaköy Mosque & Bosphorus Bridge',
          prayer: 'Maghrib & Isha at the iconic Ortaköy Mosque right on the water\'s edge.',
          halalFood: 'Famous Ortaköy baked potato (Kumpir) and freshly made Belgian-style Halal waffles.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Stroll through Taksim & Istiklal Street for evening shopping and bookshops.',
          landmark: 'Taksim Square & Istiklal',
        },
        tips: 'Eyüp Sultan is especially busy on Fridays and weekends; arrive early for tranquility.',
      },
    ];

    return {
      tripTitle: `${maxDays}-Day Islamic Heritage & Cultural Journey in Istanbul`,
      destination: 'Istanbul',
      country: 'Türkiye',
      durationDays: maxDays,
      summary: 'An enriching journey through imperial Ottoman mosques, holy relics of the Prophet ﷺ, spiritual quarters, and world-renowned Halal cuisine.',
      estimatedBudget: budget,
      bestSeason: 'Spring (April-May) & Autumn (September-November)',
      islamicHighlights: [
        'Hagia Sophia & Blue Mosque',
        'Süleymaniye Complex by Mimar Sinan',
        'Holy Relics of the Prophet ﷺ at Topkapi Palace',
        'Eyüp Sultan Tomb & Spiritual Quarter',
      ],
      fiqhAdvice: 'International travel distance (>81 km) permits Qasr (shortening 4 rak\'ahs to 2) and Jam\' (combining Dhuhr/Asr and Maghrib/Isha) according to Fath al-Mu\'in.',
      days: defaultDays.slice(0, maxDays),
    };
  }

  // Generic procedural generator for any other city worldwide
  const tripDays = [];
  for (let i = 1; i <= maxDays; i++) {
    tripDays.push({
      dayNumber: i,
      title: `Day ${i}: Exploring ${destination}'s Culture, Heritage & Faith`,
      theme: `Day ${i} Highlights & Scenic Landmarks in ${destination}`,
      fiqhGuidance: 'Check travel distance from home base (>81 km / Marhalatayn) for Qasr & Jam\' concessions.',
      morning: {
        activity: `Morning walking tour around the historic quarter, central monuments, and cultural landmarks of ${destination}.`,
        landmark: `Central Heritage Quarter, ${destination}`,
        prayer: `Fajr at central congregational mosque in ${destination}, followed by morning Adhkar.`,
        halalFood: `Traditional local breakfast at verified Halal cafe / bakery.`,
        time: '06:30 - 11:30',
      },
      afternoon: {
        activity: `Visit iconic museums, architectural heritage sites, and artisan craft markets in ${destination}.`,
        landmark: `Major Architectural Sights, ${destination}`,
        prayer: `Dhuhr & Asr prayers in congregation at the main Juma mosque in ${destination} (Qasr / Jam' available).`,
        halalFood: `Famous local cuisine lunch at verified Muslim-friendly family restaurant.`,
        time: '12:00 - 16:30',
      },
      evening: {
        activity: `Sunset views along scenic promenade / viewpoint, souvenir browsing and cultural evening tea.`,
        landmark: `City Viewpoint / Waterfront Promenade`,
        prayer: `Maghrib & Isha combined/prayed on time, followed by peaceful reflection.`,
        halalFood: `Signature dinner with traditional dishes and authentic Halal desserts.`,
        time: '17:00 - 21:00',
      },
      night: {
        activity: `Relaxed evening tea, contemplation, and review of tomorrow's itinerary.`,
        landmark: `Hotel Lounge / Quiet Courtyard`,
      },
      tips: `Carry a refillable water bottle, compact pocket prayer mat, and keep modest dress for mosque entries.`,
    });
  }

  return {
    tripTitle: `${maxDays}-Day Muslim-Friendly Experience in ${destination}`,
    destination,
    country: 'International',
    durationDays: maxDays,
    summary: `A carefully balanced travel itinerary for ${destination} combining top sights with seamless prayer times and halal dining.`,
    estimatedBudget: budget,
    bestSeason: 'Spring & Autumn',
    islamicHighlights: [
      `Historic & congregational mosques of ${destination}`,
      `Authentic Halal culinary discovery`,
      `Cultural landmarks with comfortable prayer access`,
    ],
    fiqhAdvice: 'Observe the 81 km travel distance rule and 4-day stay rule in Shafi\'i jurisprudence.',
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
