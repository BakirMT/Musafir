export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  fiqhGuidance: string;
  morning: {
    activity: string;
    landmark: string;
    prayer: string;
    halalFood: string;
    time: string;
  };
  afternoon: {
    activity: string;
    landmark: string;
    prayer: string;
    halalFood: string;
    time: string;
  };
  evening: {
    activity: string;
    landmark: string;
    prayer: string;
    halalFood: string;
    time: string;
  };
  night: {
    activity: string;
    landmark: string;
  };
  tips: string;
}

export interface GeneratedItineraryPlan {
  tripTitle: string;
  destination: string;
  country: string;
  durationDays: number;
  summary: string;
  estimatedBudget: string;
  bestSeason: string;
  islamicHighlights: string[];
  fiqhAdvice: string;
  days: ItineraryDay[];
}

export function generateLocalItinerary(
  destination: string,
  days: number,
  interests: string[] = [],
  lang: 'en' | 'ml' | 'ar' = 'en',
  budget: string = '$500 - $800',
  travelStyle: string = 'Balanced History & Culinary'
): GeneratedItineraryPlan {
  const destLower = destination.toLowerCase();
  const maxDays = Math.min(Math.max(days, 1), 10);

  // ==============================================================
  // 1. MAKKAH & MADINAH / UMRAH (مكة المكرمة & المدينة المنورة)
  // ==============================================================
  const isMakkahMadinah =
    destLower.includes('makkah') ||
    destLower.includes('mecca') ||
    destLower.includes('madinah') ||
    destLower.includes('medina') ||
    destLower.includes('umrah') ||
    destLower.includes('hajj') ||
    destLower.includes('മക്ക') ||
    destLower.includes('മദീന') ||
    destLower.includes('مكة') ||
    destLower.includes('مدينة');

  if (isMakkahMadinah) {
    if (lang === 'ml') {
      const mlDays: ItineraryDay[] = [
        {
          dayNumber: 1,
          title: 'ദിനം 1: മക്കയിലേക്ക് ആഗമനം, ഇഹ്റാം & വിശുദ്ധ ഉംറ നിർവ്വഹണം',
          theme: 'തൽബിയ്യത്ത്, കഅ്ബ ത്വവാഫ്, സംസം, സഫാ-മർവ്വ സഅ്യ്',
          fiqhGuidance: 'മീഖാത്തുകളിൽ നിന്ന് ഇഹ്റാം കെട്ടി തൽബിയ്യത്ത് ചൊല്ലുക. തഹല്ലുൽ ചെയ്യുന്നത് വരെ ഇഹ്റാമിന്റെ നിഷിദ്ധങ്ങൾ (മുഹറമാത്) കർശനമായി പാലിക്കുക.',
          morning: {
            activity: 'മക്കയിലേക്ക് ആഗമനം, ഹോട്ടൽ ചെക്കിൻ, കുളിച്ച് ശുദ്ധിവരുത്തി മസ്ജിദുൽ ഹറാമിലേക്ക് പ്രവേശിക്കൽ. ബാബുസ്സലാം വഴി കഅ്ബാലയം കണ്ട് പ്രാർത്ഥന.',
            landmark: 'മസ്ജിദുൽ ഹറാം & വിശുദ്ധ കഅ്ബ',
            prayer: 'മസ്ജിദുൽ ഹറാമിൽ പ്രവേശന നമസ്കാരം (ത്വവാഫാണ് ഹറമിലെ പ്രഥമ തഹിയ്യത്ത്).',
            halalFood: 'ഹറം പരിസരത്തെ ലളിതമായ പ്രഭാതഭക്ഷണവും സംസം ജലപാനവും.',
            time: '06:00 - 11:30',
          },
          afternoon: {
            activity: 'ഉംറയുടെ ത്വവാഫ്: ഹജറുൽ അസ്‌വദ് മുതൽ ആരംഭിച്ച് 7 തവണ കഅ്ബ പ്രദക്ഷിണം. മഖാമു ഇബ്രാഹീമിന് പിന്നിൽ 2 റക്അത്ത് നമസ്കാരം. സംസം വയറുനിറയെ കുടിക്കൽ.',
            landmark: 'ത്വവാഫ് മുറ്റം (മത്വാഫ്) & മഖാമു ഇബ്രാഹീം',
            prayer: 'ളുഹ്ർ നിസ്കാരം മസ്ജിദുൽ ഹറാമിലെ ജമാഅത്തോടൊപ്പം (1 ലക്ഷം പ്രതിഫലം).',
            halalFood: 'അബ്‌റാജുൽ ബൈത്ത് (ക്ലോക്ക് ടവർ) ഫുഡ് കോർട്ടിൽ പരമ്പരാഗത അറബിക് കബ്സ അല്ലെങ്കിൽ ബുഖാരി.',
            time: '12:00 - 16:30',
          },
          evening: {
            activity: 'സഫാ-മർവ്വ സഅ്യ് (7 തവണ നടക്കൽ, സഫയിൽ വെച്ച് തക്ബീറും ദുആയും). തുടർന്ന് മുടി കളയുകയോ വെട്ടുകയോ (ഹൽഖ് / തഖ്സീർ) ചെയ്ത് ഇഹ്റാമിൽ നിന്ന് തഹല്ലുൽ ആകൽ.',
            landmark: 'മസ്അ (സഫാ & മർവ്വ)',
            prayer: 'മഗ്‌രിബും ഇശാഉം മസ്ജിദുൽ ഹറാം മുറ്റത്ത് കഅ്ബയ്ക്ക് മുന്നിൽ.',
            halalFood: 'അൽ തസാജ് ഗ്രിൽഡ് ചിക്കൻ & ഫ്രഷ് മാതള ജ്യൂസ്.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'കഅ്ബയെ നോക്കിക്കണ്ടുകൊണ്ടുള്ള ശാന്തമായ ദിക്റുകൾ, ഇസ്തിഗ്ഫാർ, രാത്രിയിലെ തഹജ്ജുദ് നിസ്കാരം.',
            landmark: 'മസ്ജിദുൽ ഹറാം മത്വാഫ്',
          },
          tips: 'നുസുക് (Nusuk) ആപ്പ് പരിശോധിക്കുക. സംസം വെള്ളം കുടിക്കുമ്പോൾ രോഗശമനത്തിനും പാപമോചനത്തിനുമുള്ള പ്രത്യേക ദുആ ചൊല്ലുക.',
        },
        {
          dayNumber: 2,
          title: 'ദിനം 2: മക്കയിലെ ചരിത്ര പുണ്യ സിയാറത്തുകൾ',
          theme: 'ഹിറാ ഗുഹ, സൗർ ഗുഹ, മിന, മുസ്ദലിഫ, അറഫാത്',
          fiqhGuidance: 'വിശുദ്ധ ഹറം പരിധിയിൽ വെച്ചുള്ള നിസ്കാരങ്ങൾക്ക് ഒരു ലക്ഷം പ്രതിഫലമുണ്ട്. നഫിൽ ത്വവാഫുകൾ വർദ്ധിപ്പിക്കുക.',
          morning: {
            activity: 'ജബലുന്നുൂർ (ഹിറാ ഗുഹ - ആദ്യ ദിവ്യസന്ദേശം ഇറങ്ങിയ സ്ഥലം) സന്ദർശനം. താഴെ നിന്നുള്ള വീക്ഷണം അല്ലെങ്കിൽ വെളുപ്പിനെ കയറ്റം.',
            landmark: 'ജബലുന്നുൂർ (ഹിറാ കൾച്ചറൽ ഡിസ്ട്രിക്റ്റ്)',
            prayer: 'സുബ്ഹി മസ്ജിദുൽ ഹറാമിൽ, തുടർന്ന് പ്രഭാത അദ്കാറുകൾ.',
            halalFood: 'പരമ്പരാഗത ശക്‌ശൂക, ഫൂൽ മുദമ്മസ്, തമീസ് റൊട്ടി എന്നിവ.',
            time: '05:30 - 11:00',
          },
          afternoon: {
            activity: 'ഹജ്ജിന്റെ പ്രധാന സ്ഥാനങ്ങളായ മിന കൂടാര നഗരം, ജമറാത്ത്, മുസ്ദലിഫ, അറഫാത് ജബലുറഹ്മ (കാരുണ്യ മല) സിയാറത്ത്.',
            landmark: 'അറഫാത് ജബലുറഹ്മ & മിന',
            prayer: 'ളുഹ്റും അസ്വ്റും അറഫാത്തിലെ നമിറ മസ്ജിദ് പരിസരത്തോ മസ്ജിദുൽ ഹറാമിലോ.',
            halalFood: 'അസീസിയയിലെ റസ്റ്റോറന്റിൽ നിന്ന് രുചികരമായ മന്തി ബിരിയാണി.',
            time: '11:30 - 16:30',
          },
          evening: {
            activity: 'ഹിജ്റ വേളയിൽ നബി ﷺ യും അബൂബക്കർ സിദ്ദീഖ് (റ) വും അഭയം തേടിയ ജബലു സൗർ സന്ദർശനം. മക്ക മ്യൂസിയം കാഴ്ചകൾ.',
            landmark: 'ജബലു സൗർ & ഹിക്മ മ്യൂസിയം',
            prayer: 'മഗ്‌രിബും ഇശാഉം മസ്ജിദുൽ ഹറാമിൽ.',
            halalFood: 'അജ്‌യാദിലെ മിഡിൽ ഈസ്റ്റേൺ ഷവർമ്മ & മിന്റ് ലെമണേഡ്.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'ക്ലോക്ക് ടവർ മ്യൂസിയം അല്ലെങ്കിൽ ഹറം മുറ്റത്ത് ഇരുന്ന് വിശുദ്ധ ഖുർആൻ പാരായണം.',
            landmark: 'റോയൽ ക്ലോക്ക് ടവർ',
          },
          tips: 'പകൽ സമയത്ത് കടുത്ത വെയിൽ ഒഴിവാക്കാൻ കുട കരുതുക. ധാരാളം ശുദ്ധജലവും സംസമും കുടിക്കുക.',
        },
        {
          dayNumber: 3,
          title: 'ദിനം 3: ഹറമൈൻ ട്രെയിൻ യാത്ര & മദീന മുനവ്വറയിലെ പ്രവാചക സന്നിധി',
          theme: 'വിടവാങ്ങൽ ത്വവാഫ്, മദീനയിലേക്കുള്ള യാത്ര, മസ്ജിദുന്നബവി & റൗളാ ശരീഫ്',
          fiqhGuidance: 'മക്കയിൽ നിന്ന് മദീനയിലേക്ക് 450 കി.മീ ദൂരമുള്ളതിനാൽ യാത്രയിൽ ഖസ്റും ജംഉം നിർവ്വഹിക്കാം.',
          morning: {
            activity: 'മക്കയോട് വിടപറയൽ, മക്ക ഹറമൈൻ സ്റ്റേഷനിൽ നിന്ന് അതിവേഗ ബുള്ളറ്റ് ട്രെയിനിൽ മദീനയിലേക്ക് (2 മണിക്കൂർ 20 മിനുട്ട്).',
            landmark: 'ഹറമൈൻ ഹൈസ്പീഡ് ട്രെയിൻ',
            prayer: 'സുബ്ഹി മസ്ജിദുൽ ഹറാമിൽ അവസാന വട്ട വിടവാങ്ങൽ പ്രാർത്ഥനയോടെ.',
            halalFood: 'ട്രെയിനിലെ കഫേയിൽ പ്രഭാതഭക്ഷണവും അറബിക് ഖഹ്‌വയും.',
            time: '06:00 - 11:00',
          },
          afternoon: {
            activity: 'മദീന മുനവ്വറയിൽ എത്തിച്ചേരൽ. ഹോട്ടൽ ചെക്കിൻ കഴിഞ്ഞ് അത്യധികം ആദരവോടെയും ശാന്തതയോടെയും മസ്ജിദുന്നബവിയിലേക്ക് പ്രവേശിക്കൽ.',
            landmark: 'മസ്ജിദുന്നബവി (പ്രവാചക മസ്ജിദ്)',
            prayer: 'ളുഹ്റും അസ്വ്റും മസ്ജിദുന്നബവിയിലെ കുടകൾക്ക് താഴെ (1000 ഇരട്ടി പ്രതിഫലം).',
            halalFood: 'മദീനയിലെ പരമ്പരാഗത അൽ-റൊമാൻസിയ റസ്റ്റോറന്റിൽ മന്തി അല്ലെങ്കിൽ മദ്ഗൂത്ത്.',
            time: '11:30 - 16:30',
          },
          evening: {
            activity: 'റൗളാ ശരീഫ് (സ്വർഗ്ഗത്തോപ്പുകളിൽ പെട്ട പുണ്യസ്ഥലം) സന്ദർശനം. തിരുനബി ﷺ ക്കും സിദ്ദീഖ് (റ), ഉമർ (റ) തങ്ങൾക്കും ഭക്തിസാന്ദ്രമായ സലാം സമർപ്പിക്കൽ.',
            landmark: 'റൗളത്തു മിൻ രിയാദിൽ ജന്ന & സലാം വാതിൽ (ബാബുസ്സലാം)',
            prayer: 'മഗ്‌രിബും ഇശാഉം മസ്ജിദുന്നബവിയിലെ പച്ചക്കുബ്ബയ്ക്ക് താഴെ.',
            halalFood: 'സുൽത്താന സ്ട്രീറ്റിലെ അറേബ്യൻ ഗ്രില്ലുകളും ഐസ്ക്രീമും.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'മസ്ജിദുന്നബവിയുടെ മാർബിൾ മുറ്റത്ത് പ്രവാചക സ്വലാത്തുകൾ ചൊല്ലി ശാന്തമായ ധ്യാനം.',
            landmark: 'മസ്ജിദുന്നബവി കോർട്ട്‌യാർഡ്',
          },
          tips: 'റൗളാ ശരീഫിൽ പ്രവേശിക്കാൻ നുസുക് ആപ്പ് വഴി മുൻകൂട്ടി പെർമിറ്റ് എടുക്കുക.',
        },
        {
          dayNumber: 4,
          title: 'ദിനം 4: മദീനയിലെ ചരിത്ര സിയാറത്തുകൾ & ഉഹ്ദ് ശുഹദാക്കൾ',
          theme: 'മസ്ജിദു ഖുബാഅ്, ഉഹ്ദ് യുദ്ധക്കളം, ജന്നത്തുൽ ബഖീഅ്',
          fiqhGuidance: 'വുളൂഅ് ചെയ്ത് മസ്ജിദു ഖുബാഇൽ വന്ന് 2 റക്അത്ത് നിസ്കരിച്ചാൽ ഒരു ഉംറയുടെ പ്രതിഫലമുണ്ട് (ഹദീസ്).',
          morning: {
            activity: 'ഇസ്‌ലാമിലെ പ്രഥമ മസ്ജിദായ മസ്ജിദു ഖുബാഅ് സന്ദർശനം. പ്രവാചക നടപ്പാത (ഖുബാഅ് അവന്യൂ) വഴി നടക്കൽ.',
            landmark: 'മസ്ജിദു ഖുബാഅ്',
            prayer: 'സുബ്ഹി മസ്ജിദുന്നബവിയിലും, ഖുബാഅ് പള്ളിയിൽ 2 റക്അത്ത് സുന്നത്ത് നമസ്കാരവും.',
            halalFood: 'ഖുബാഅ് വാക്കിംഗ് സ്ട്രീറ്റിലെ റൊട്ടി, തേൻ, ചീസ് പലഹാരങ്ങൾ.',
            time: '06:00 - 11:00',
          },
          afternoon: {
            activity: 'ഉഹ്ദ് പർവ്വത സന്ദർശനം, അമ്പെയ്ത്തുകാരുടെ കുന്ന് (ജബലു റുമാത്), ഹംസ (റ) അടക്കമുള്ള 70 ഉഹ്ദ് ശുഹദാക്കളുടെ ഖബറിട സിയാറത്ത്.',
            landmark: 'ഉഹ്ദ് മല & ശുഹദാക്കളുടെ ഖബർസ്ഥാൻ',
            prayer: 'ളുഹ്റും അസ്വ്റും ഉഹ്ദ് ശുഹദാക്കളുടെ മസ്ജിദിൽ.',
            halalFood: 'മദീനയിലെ ഷെഫ് ഖലീൽ ഗ്രിൽസ് & തന്തൂർ വിഭവങ്ങൾ.',
            time: '11:30 - 16:30',
          },
          evening: {
            activity: 'ജന്നത്തുൽ ബഖീഅ് സിയാറത്ത് (അസ്വർ അല്ലെങ്കിൽ ഫജ്ർ ശേഷം തുറക്കപ്പെടുന്നു). ഉമ്മഹാതുൽ മുഅ്മിനീൻ, അഹ്‌ലുബൈത്ത്, സ്വഹാബികൾ എന്നിവർക്ക് സലാം.',
            landmark: 'ജന്നത്തുൽ ബഖീഅ്',
            prayer: 'മഗ്‌രിബും ഇശാഉം മസ്ജിദുന്നബവിയിൽ.',
            halalFood: 'തനത് മദീനിയൻ ഈത്തപ്പഴ വിഭവങ്ങളും അറബിക് ചായയും.',
            time: '16:30 - 21:00',
          },
          night: {
            activity: 'മദീന സെൻട്രൽ ഈത്തപ്പഴ ചന്തയിൽ (സൂഖുത്തു മൂർ) പോയി അജ്വ, സഫാവി, മബ്‌റൂം ഈത്തപ്പഴങ്ങൾ വാങ്ങൽ.',
            landmark: 'സൂഖുത്തു മൂർ (ഡേറ്റ്സ് മാർക്കറ്റ്)',
          },
          tips: 'അജ്വ ഈത്തപ്പഴം വാങ്ങുമ്പോൾ ഗുണനിലവാരം ഉറപ്പുവരുത്തുക.',
        },
        {
          dayNumber: 5,
          title: 'ദിനം 5: മസ്ജിദുൽ ഖിബ്‌ലതൈൻ, ഖന്തഖ് & വിടവാങ്ങൽ പ്രാർത്ഥനകൾ',
          theme: 'രണ്ട് ഖിബ്‌ലകളുടെ പള്ളി, സപ്ത മസ്ജിദുകൾ & അവസാന വട്ട സലാം',
          fiqhGuidance: 'യാത്ര തിരിക്കുമ്പോൾ നബി ﷺ ക്ക് ഏറ്റവും ഭക്തിനിർഭരമായി വിടവാങ്ങൽ സലാം പറയുക.',
          morning: {
            activity: 'നിസ്കാരത്തിൽ ഖിബ്‌ല ബൈത്തുൽ മുഖദ്ദസിൽ നിന്ന് കഅ്ബയിലേക്ക് മാറിയ മസ്ജിദുൽ ഖിബ്‌ലതൈൻ സന്ദർശനം. ഖന്തഖ് യുദ്ധഭൂമിയിലെ മസ്ജിദുകൾ.',
            landmark: 'മസ്ജിദുൽ ഖിബ്‌ലതൈൻ & സബ്അ മസാജിദ്',
            prayer: 'സുബ്ഹി മസ്ജിദുന്നബവിയിൽ, ഖിബ്‌ലതൈനിൽ തഹിയ്യത്ത്.',
            halalFood: 'മദീനയിലെ പരമ്പരാഗത പ്രഭാത കഫേയിൽ പലഹാരങ്ങൾ.',
            time: '06:00 - 11:30',
          },
          afternoon: {
            activity: 'തിരുനബി ﷺ യുടെ ജലസമൃദ്ധമായ കിണറുകളായ ബിഅ്റു ഗുർസ്, ബിഅ്റു ഉസ്മാൻ എന്നിവ കാണൽ. ഖുർആൻ എക്സിബിഷൻ സന്ദർശനം.',
            landmark: 'ബിഅ്റു ഗുർസ് & ഹോളി ഖുർആൻ എക്സിബിഷൻ',
            prayer: 'ളുഹ്റും അസ്വ്റും മസ്ജിദുന്നബവിയിൽ.',
            halalFood: 'ഫാമിലി ഹലാൽ റസ്റ്റോറന്റിൽ ഫ്രഷ് മീൻ കബാബും ചോറും.',
            time: '12:00 - 16:30',
          },
          evening: {
            activity: 'മസ്ജിദുന്നബവിയിൽ വെച്ച് തിരുദൂതർക്ക് വിടവാങ്ങൽ സലാം. പ്രാർത്ഥനകളും കണ്ണീരോടെയുള്ള അപേക്ഷകളും.',
            landmark: 'മസ്ജിദുന്നബവി സലാം ഗേറ്റ്',
            prayer: 'മഗ്‌രിബും ഇശാഉം മസ്ജിദുന്നബവിയിൽ ജമാഅത്തായി.',
            halalFood: 'ലളിതമായ അത്താഴവും സംസം വെള്ളവും.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'മദീന എയർപോർട്ടിലേക്ക് യാത്ര തിരിക്കൽ. യാത്രാ ദുആ ചൊല്ലി നാട്ടിലേക്ക് മടക്കം.',
            landmark: 'പ്രിൻസ് മുഹമ്മദ് ബിൻ അബ്ദുൽ അസീസ് എയർപോർട്ട് (മദീന)',
          },
          tips: 'മദീന എയർപോർട്ടിൽ വിമാനത്തിൽ കയറുന്നതിന് മുമ്പ് തന്നെ ബോർഡിംഗ് പാസ്സ് സഹിതം യാത്രാ ഒരുക്കങ്ങൾ പൂർത്തിയാക്കുക.',
        },
      ];

      return {
        tripTitle: `${maxDays}-ദിവസത്തെ സമഗ്ര ഉംറ & മദീന സിയാറത്ത് പുണ്യയാത്ര`,
        destination: 'Makkah & Madinah',
        country: 'Saudi Arabia',
        durationDays: maxDays,
        summary: 'മക്കയിലെ വിശുദ്ധ കഅ്ബാലയത്തിൽ ഉംറ നിർവ്വഹണവും മദീന മുനവ്വറയിലെ പ്രവാചക സന്നിധിയിലുള്ള ഭക്തിസാന്ദ്രമായ സിയാറത്തും സമന്വയിപ്പിച്ച ഉത്തമ ആത്മീയ യാത്ര.',
        estimatedBudget: budget,
        bestSeason: 'വർഷം മുഴുവനും (ശീതകാല മാസങ്ങളിൽ ഏറ്റവും സുഖകരം)',
        islamicHighlights: [
          'മസ്ജിദുൽ ഹറാമിൽ ഉംറ & കഅ്ബ ത്വവാഫ് (1 ലക്ഷം പ്രതിഫലം)',
          'മസ്ജിദുന്നബവി, റൗളാ ശരീഫ് & പ്രവാചക സലാം',
          'മസ്ജിദു ഖുബാഅ് സന്ദർശനം (ഉംറയുടെ പ്രതിഫലം)',
          'ജബലുന്നുൂർ, സൗർ, ഉഹ്ദ് ശുഹദാക്കൾ, ജന്നത്തുൽ ബഖീഅ്',
          'ഹറമൈൻ അതിവേഗ ട്രെയിൻ യാത്ര',
        ],
        fiqhAdvice: 'ഹറമൈൻ പരിധിയിൽ വെച്ചുള്ള നിസ്കാരങ്ങൾക്ക് അളവറ്റ പ്രതിഫലമുണ്ട്. മക്ക-മദീന ദൂരം 450 കി.മീ ഉള്ളതിനാൽ ട്രെയിൻ യാത്രയിൽ ഖസ്റും ജംഉം അനുവദനീയം.',
        days: mlDays.slice(0, maxDays),
      };
    }

    if (lang === 'ar') {
      const arDays: ItineraryDay[] = [
        {
          dayNumber: 1,
          title: 'اليوم الأول: الإحرام والوصول إلى مكة المكرمة وأداء مناسك العمرة المباركة',
          theme: 'التلبية، طواف القدوم والعمرة، ركعتا الطواف، ماء زمزم والسعي بين الصفا والمروة',
          fiqhGuidance: 'الإحرام من الميقات والتلبية وتجنب محظورات الإحرام حتى التحلل بالحلق أو التقصير.',
          morning: {
            activity: 'الوصول إلى مكة المكرمة، استلام الفندق، الاغتسال والتجهز لدخول المسجد الحرام من باب السلام بالدعاء المأثور.',
            landmark: 'المسجد الحرام والكعبة المشرفة',
            prayer: 'الصلاة في المسجد الحرام (مضاعفة بمائة ألف صلاة).',
            halalFood: 'فطور خفيف وتناول ماء زمزم المبارك بنية البركة.',
            time: '06:00 - 11:30',
          },
          afternoon: {
            activity: 'مناسك العمرة: الطواف سبعة أشواط، وصلاة ركعتين خلف مقام إبراهيم، والشرب من زمزم، ثم السعي بين الصفا والمروة سبعة أشواط والتحلل.',
            landmark: 'صحن المطاف والمسعى ومقام إبراهيم',
            prayer: 'صلاة الظهر جماعة بالمسجد الحرام وركعتا الطواف.',
            halalFood: 'غداء طيب من مطاعم أبراج البيت (مندي أو كبسة سعودية أصيلة).',
            time: '12:00 - 16:30',
          },
          evening: {
            activity: 'جلسة ذكر وتأمل في رحاب الكعبة المشرفة وتلاوة القرآن الكريم وصلاة المغرب والعشاء.',
            landmark: 'صحن الكعبة المشرفة',
            prayer: 'المغرب والعشاء في صحن المطاف أو التوسعة السعودية الثالثة.',
            halalFood: 'عشاء حلال ومشروبات منعشة بجوار الحرم الشريف.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'قيام الليل وصلاة التهجد والطواف المستحب في هدوء الليل.',
            landmark: 'أروقة المسجد الحرام',
          },
          tips: 'حجز تصريح العمرة عبر تطبيق نسك المعتمد والحرص على كثرة الطواف والدعاء.',
        },
        {
          dayNumber: 2,
          title: 'اليوم الثاني: زيارة المعالم التاريخية بمكة المكرمة والمشاعر المقدسة',
          theme: 'جبل النور وغار حراء، المشاعر (منى، مزدلفة، عرفات) وجبل ثور',
          fiqhGuidance: 'يستحب الإكثار من الصلاة والطواف، والاعتبار بأماكن الوحي ونزول القرآن الكريم.',
          morning: {
            activity: 'زيارة جبل النور وحي حراء الثقافي (حيث نزل أول الوحي "اقرأ باسم ربك").',
            landmark: 'جبل النور وحي حراء الثقافي',
            prayer: 'الفجر في الحرم المكي الشريف وأذكار الصباح.',
            halalFood: 'فطور حجازي تقليدي (فول، شكشوكة، وتميس).',
            time: '05:30 - 11:00',
          },
          afternoon: {
            activity: 'جولة بالمشاعر المقدسة: خيام منى، الجمرات، مزدلفة، وجبل الرحمة بعرفات ومسجد نمرة.',
            landmark: 'جبل الرحمة بعرفات ومسجد نمرة',
            prayer: 'الظهر والعصر جماعة في رحاب الحرم المكي الشريف.',
            halalFood: 'مأكولات حجازية شهية في العزيزية.',
            time: '11:30 - 16:30',
          },
          evening: {
            activity: 'زيارة جبل ثور (غار ثور حيث هاجر النبي ﷺ مع أبي بكر الصديق رضي الله عنه).',
            landmark: 'جبل ثور',
            prayer: 'المغرب والعشاء بالمسجد الحرام.',
            halalFood: 'عشاء حلال ومشاوي في شارع أجياد.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'متحف برج الساعة وتأمل عظمة المسجد الحرام من الأعلى.',
            landmark: 'متحف برج الساعة',
          },
          tips: 'استخدام المظلة لتجنب أشعة الشمس المباشرة وحمل الماء باستمرار.',
        },
        {
          dayNumber: 3,
          title: 'اليوم الثالث: طواف الوداع والانتقال بقطار الحرمين إلى المدينة المنورة',
          theme: 'قطار الحرمين السريع، المسجد النبوي الشريف والسلام على رسول الله ﷺ',
          fiqhGuidance: 'مسافة السفر من مكة إلى المدينة 450 كم وتجيز قصر الصلاة وجمعها وفق المذهب الشافعي.',
          morning: {
            activity: 'طواف الوداع بالمسجد الحرام، ثم التوجه لمحطة قطار الحرمين السريع بمكة والانطلاق إلى المدينة المنورة (ساعتان و20 دقيقة).',
            landmark: 'محطة قطار الحرمين السريع بمكة المكرمة',
            prayer: 'الفجر في المسجد الحرام مع طواف الوداع.',
            halalFood: 'فطور سريع وقهوة سعودية على متن قطار الحرمين.',
            time: '06:00 - 11:00',
          },
          afternoon: {
            activity: 'الوصول إلى المدينة المنورة، استلام الفندق، ثم التوجه بكل سكينة وأدب إلى المسجد النبوي الشريف للصلاة في الروضة الشريفة.',
            landmark: 'المسجد النبوي الشريف والروضة الشريفة',
            prayer: 'الظهر والعصر في المسجد النبوي (الصلاة فيه بألف صلاة).',
            halalFood: 'غداء من مطاعم الرومانسية الشهيرة بالمدينة المنورة.',
            time: '11:30 - 16:30',
          },
          evening: {
            activity: 'السلام على رسول الله ﷺ وعلى صاحبيه أبي بكر وعمر رضي الله عنهما عند المواجهة الشريفة.',
            landmark: 'المواجهة الشريفة وباب السلام',
            prayer: 'المغرب والعشاء تحت مظلات المسجد النبوي الشريف.',
            halalFood: 'عشاء طيب بحي سلطانة.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'الجلوس في صحن المسجد النبوي، الصلاة على النبي ﷺ وقراءة القرآن.',
            landmark: 'ساحات الحرم النبوي',
          },
          tips: 'حجز تصريح الصلاة في الروضة الشريفة مسبقاً عبر تطبيق نسك.',
        },
        {
          dayNumber: 4,
          title: 'اليوم الرابع: زيارة مسجد قباء وجبل أحد وبقيع الغرقد',
          theme: 'مسجد قباء (عمرة تامة)، شهداء أحد، بقيع الغرقد وسوق التمور',
          fiqhGuidance: 'من تطهر في بيته ثم أتى مسجد قباء فصلى فيه ركعتين كان له كأجر عمرة (حديث صحيح).',
          morning: {
            activity: 'زيارة مسجد قباء (أول مسجد أسس في الإسلام) عبر الممشى النبوي (طريق قباء).',
            landmark: 'مسجد قباء والممشى النبوي',
            prayer: 'الفجر بالمسجد النبوي وركعتان في مسجد قباء بأجر عمرة.',
            halalFood: 'إفطار صباحي بمقاهي جادة قباء.',
            time: '06:00 - 11:00',
          },
          afternoon: {
            activity: 'زيارة جبل أحد وجبل الرماة ومقبرة شهداء أحد والسلام على سيد الشهداء حمزة بن عبد المطلب رضي الله عنه.',
            landmark: 'جبل أحد ومقبرة الشهداء',
            prayer: 'الظهر والعصر بمسجد سيد الشهداء بأحد.',
            halalFood: 'مأكولات مشوية ومندي بالمدينة.',
            time: '11:30 - 16:30',
          },
          evening: {
            activity: 'زيارة مقبرة بقيع الغرقد والسلام على أمهات المؤمنين وآل البيت والصحابة الكرام.',
            landmark: 'بقيع الغرقد',
            prayer: 'المغرب والعشاء بالمسجد النبوي.',
            halalFood: 'عشاء خفيف وتمور المدينة المباركة.',
            time: '16:30 - 21:00',
          },
          night: {
            activity: 'جولة في سوق التمور المركزي لشراء تمر العجوة والصقعي والصفاوي.',
            landmark: 'سوق التمور المركزي بالمدينة',
          },
          tips: 'الحرص على شراء تمر العجوة الموصى به في الحديث النبوي الشريف.',
        },
        {
          dayNumber: 5,
          title: 'اليوم الخامس: مسجد القبلتين ومساجد الخندق والسلام الوداعي',
          theme: 'مسجد القبلتين، مساجد الفتح والخندق، توديع النبي ﷺ والعودة',
          fiqhGuidance: 'يستحب عند مغادرة المدينة السلام على النبي ﷺ بنية الوداع وسؤال الله القبول وتكرار الزيارة.',
          morning: {
            activity: 'زيارة مسجد القبلتين ومساجد الخندق (مساجد الفتح والسبعة) وبئر غرس النبوي.',
            landmark: 'مسجد القبلتين ومساجد الخندق',
            prayer: 'الفجر بالمسجد النبوي وتحية المسجد بالقبلتين.',
            halalFood: 'فطور عربي تقليدي في مقهى تراثي.',
            time: '06:00 - 11:30',
          },
          afternoon: {
            activity: 'زيارة معرض القرآن الكريم ومعرض عمارة المسجد النبوي الشريف.',
            landmark: 'معرض القرآن الكريم بالمدينة',
            prayer: 'الظهر والعصر بالمسجد النبوي الشريف.',
            halalFood: 'غداء عائلي في مطعم حلال معتمد.',
            time: '12:00 - 16:30',
          },
          evening: {
            activity: 'السلام الوداعي على النبي ﷺ وصاحبيه، والدعاء بالقبول وحسن الخاتمة.',
            landmark: 'المواجهة الشريفة بالمسجد النبوي',
            prayer: 'المغرب والعشاء بالمسجد النبوي الشريف.',
            halalFood: 'وجبة عشاء خفيفة والتزود بماء زمزم.',
            time: '17:00 - 21:00',
          },
          night: {
            activity: 'التوجه إلى مطار الأمير محمد بن عبد العزيز بالمدينة المنورة للعودة بسلامة الله.',
            landmark: 'مطار المدينة المنورة',
          },
          tips: 'التأكد من أمتعة السفر وماء زمزم المغلف المعتمد في المطار.',
        },
      ];

      return {
        tripTitle: `برنامج العمرة وزيارة الحرمين الشريفين (${maxDays} أيام)`,
        destination: 'Makkah & Madinah',
        country: 'Saudi Arabia',
        durationDays: maxDays,
        summary: 'رحلة إيمانية متكاملة تجمع بين أداء مناسك العمرة في رحاب مكة المكرمة والصلاة بالروضة الشريفة وزيارة معالم السيرة بالمدينة المنورة.',
        estimatedBudget: budget,
        bestSeason: 'على مدار العام (الأجواء الشتوية معتدلة ولطيفة)',
        islamicHighlights: [
          'أداء العمرة والطواف بالبيت الحرام (100,000 صلاة)',
          'الصلاة في الروضة الشريفة والسلام على الحبيب المصطفى ﷺ',
          'الصلاة في مسجد قباء بأجر عمرة تامة',
          'زيارة جبل النور، أحد، البقيع، ومسجد القبلتين',
          'التنقل بقطار الحرمين السريع المريح',
        ],
        fiqhAdvice: 'مضاعفة أجر الصلاة بالحرمين وتطبيق رخص السفر (قصر وجمع) عند الانتقال بين مكة والمدينة (450 كم).',
        days: arDays.slice(0, maxDays),
      };
    }

    // Default English Makkah & Madinah Itinerary
    const enDays: ItineraryDay[] = [
      {
        dayNumber: 1,
        title: 'Day 1: Arrival in Holy Makkah, Ihram & Performing Sacred Umrah',
        theme: 'Talbiyah, Tawaf around the Holy Kaaba, Zamzam & Sa\'i between Safa & Marwah',
        fiqhGuidance: 'Enter state of Ihram before or at designated Miqat with Talbiyah. Observe all Ihram prohibitions strictly until Halq/Taqsir.',
        morning: {
          activity: 'Arrival in Makkah al-Mukarramah, hotel check-in around the Haram, perform Ghusl, and enter Al-Masjid al-Haram via Bab as-Salam with veneration and supplication upon seeing the Kaaba.',
          landmark: 'Al-Masjid al-Haram & The Holy Kaaba',
          prayer: 'Enter Masjid al-Haram (Tawaf is the greeting of the Holy Sanctuary; 100,000x reward).',
          halalFood: 'Light breakfast and drinking blessed Zamzam water with authentic prophetic Dua.',
          time: '06:00 - 11:30',
        },
        afternoon: {
          activity: 'Umrah Rituals: 7 circuits of Tawaf al-Umrah starting from the Black Stone, 2 rak\'ahs behind Maqam Ibrahim, drinking abundant Zamzam, followed by 7 laps of Sa\'i between Mount Safa and Marwah, ending with Halq (shaving) or Taqsir (trimming) to exit Ihram.',
          landmark: 'Mataf (Kaaba Courtyard) & Masa\'a (Safa & Marwah)',
          prayer: 'Dhuhr in congregation in Masjid al-Haram and 2 rak\'ahs of Tawaf at Maqam Ibrahim.',
          halalFood: 'Traditional Saudi Kabsa / Bukhari rice and roast chicken at Clock Tower Food Court.',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: 'Rest and peaceful contemplation in front of the Holy Kaaba. Maghrib and Isha prayers in the open Mataf courtyard.',
          landmark: 'Al-Masjid al-Haram Mataf',
          prayer: 'Maghrib and Isha prayers in congregation facing the Kaaba.',
          halalFood: 'Al-Tazaj fresh BBQ chicken, garlic dip, and chilled fresh juices in Ajyad.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Quiet Adhkar, recitation of Surah al-Kahf / Quran, and late-night Tahajjud prayer in the Haram.',
          landmark: 'Al-Masjid al-Haram Courtyard',
        },
        tips: 'Verify your Umrah permit slot on the Nusuk app. Drink plenty of Zamzam water with the intention of cure and forgiveness.',
      },
      {
        dayNumber: 2,
        title: 'Day 2: Historical Sanctuaries of Makkah & The Sacred Hajj Sites',
        theme: 'Jabal al-Noor (Hira Cave), Jabal Thawr, Mina, Muzdalifah & Mount Arafat',
        fiqhGuidance: 'Every prayer within the Haram sanctuary carries 100,000 rewards. Voluntary (Nafl) Tawaf is highly recommended at non-peak hours.',
        morning: {
          activity: 'Early morning visit to Jabal al-Noor (Cave of Hira cultural district), where the very first Quranic revelation "Iqra" descended upon Prophet Muhammad ﷺ.',
          landmark: 'Jabal al-Noor & Hira Cultural District',
          prayer: 'Fajr at Masjid al-Haram followed by morning Adhkar.',
          halalFood: 'Hijazi breakfast with Shakshouka, Foul Mudammas, and freshly baked Tamees bread.',
          time: '05:30 - 11:00',
        },
        afternoon: {
          activity: 'Explore the monumental sites of Hajj pilgrimage: Mina tent city, the Jamarat pedestrian bridges, Muzdalifah plain, and Mount Arafat (Jabal ar-Rahmah / Mount of Mercy) with Nimrah Mosque.',
          landmark: 'Mount Arafat (Jabal ar-Rahmah) & Mina Valley',
          prayer: 'Dhuhr and Asr at Masjid al-Haram or Masjid Nimrah area.',
          halalFood: 'Famous Yemeni slow-roasted Mandi and fresh salad in Al-Aziziyah district.',
          time: '11:30 - 16:30',
        },
        evening: {
          activity: 'Visit Jabal Thawr (the cave where the Prophet ﷺ and Abu Bakr as-Siddiq ra sought refuge during the Hijrah migration).',
          landmark: 'Jabal Thawr & Revelation Exhibition',
          prayer: 'Maghrib and Isha in congregation at Masjid al-Haram.',
          halalFood: 'Middle Eastern mixed shawarma platters and mint lemonade in Ajyad street.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Visit the Clock Towers Museum or spend tranquil nighttime hours in recitation around the Kaaba.',
          landmark: 'Makkah Clock Tower Museum',
        },
        tips: 'Carry an umbrella for midday sun and drink plenty of electrolyte water and Zamzam.',
      },
      {
        dayNumber: 3,
        title: 'Day 3: Haramain High-Speed Train & The City of the Prophet ﷺ (Madinah)',
        theme: 'Tawaf al-Wada\', Bullet Train Transit, Al-Masjid an-Nabawi & Rawdah Sharif',
        fiqhGuidance: 'The 450 km journey between Makkah and Madinah qualifies for Shafi\'i Qasr (shortening) and Jam\' (combining) prayer concessions.',
        morning: {
          activity: 'Perform Farewell Tawaf (Tawaf al-Wada\') at the Kaaba, then board the sleek Haramain High-Speed Train from Makkah Station to Al-Madinah Al-Munawwarah (2 hrs 20 mins).',
          landmark: 'Haramain High-Speed Railway',
          prayer: 'Fajr in Masjid al-Haram with heartfelt farewell Duas.',
          halalFood: 'Onboard train cafe breakfast with warm pastries and authentic Saudi Qahwa coffee.',
          time: '06:00 - 11:00',
        },
        afternoon: {
          activity: 'Arrival in the luminous city of Madinah. Check into hotel near the Prophet\'s Mosque. Enter Al-Masjid an-Nabawi with deep tranquility and reverence.',
          landmark: 'Al-Masjid an-Nabawi (The Prophet\'s Mosque)',
          prayer: 'Dhuhr & Asr inside the Prophet\'s Mosque under the majestic retractable umbrellas (1,000x reward).',
          halalFood: 'Traditional Saudi Madghout and grilled lamb chops at Al-Romansiah restaurant in Madinah.',
          time: '11:30 - 16:30',
        },
        evening: {
          activity: 'Visit Rawdah Sharif (Riyadh al-Jannah - Garden of Paradise between the Prophet\'s pulpit and chamber). Send greetings of Salam to Prophet Muhammad ﷺ, Abu Bakr (RA), and Umar (RA) at the sacred golden chamber.',
          landmark: 'Rawdah ash-Sharifah & Bab as-Salam',
          prayer: 'Maghrib and Isha under the Green Dome at the Prophet\'s Mosque.',
          halalFood: 'Charcoal grills, freshly baked flatbreads, and pistachio gelato on Sultanah Street.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Contemplation and Salawat in the tranquil marble courtyards of the Prophet\'s Mosque under the stars.',
          landmark: 'Prophet\'s Mosque Marble Courtyard',
        },
        tips: 'Book your Rawdah Sharif permit slot well in advance on the Nusuk app.',
      },
      {
        dayNumber: 4,
        title: 'Day 4: Sacred Ziyarat of Madinah & The Heroes of Uhud',
        theme: 'Masjid Quba (Full Umrah Reward), Mount Uhud, Martyrs Cemetery & Jannat al-Baqi\'',
        fiqhGuidance: 'Whoever purifies themselves in their house then comes to Masjid Quba and prays two rak\'ahs has a reward equal to an Umrah (Sahih Hadith).',
        morning: {
          activity: 'Walk along the pedestrian Quba Avenue to Masjid Quba (the first mosque established in Islam) and pray 2 voluntary rak\'ahs.',
          landmark: 'Masjid Quba & Quba Walking Avenue',
          prayer: 'Fajr at Al-Masjid an-Nabawi and 2 rak\'ahs at Masjid Quba for full Umrah reward.',
          halalFood: 'Artisan bakery treats, honeycomb with cream, and tea on Quba Avenue.',
          time: '06:00 - 11:00',
        },
        afternoon: {
          activity: 'Visit Mount Uhud, climb the Archers\' Hill (Jabal al-Rumat), and pay respects at the cemetery of the Martyrs of Uhud (Sayyiduna Hamzah ra and the 70 martyrs).',
          landmark: 'Mount Uhud & Martyrs of Uhud Cemetery',
          prayer: 'Dhuhr and Asr at Sayyid al-Shuhada Mosque in Uhud.',
          halalFood: 'Chef Khalil traditional grills and tandoori naan.',
          time: '11:30 - 16:30',
        },
        evening: {
          activity: 'Visit Jannat al-Baqi\' cemetery adjacent to the Prophet\'s Mosque (open after Fajr and Asr). Convey Salam to the Mothers of the Believers, Ahl al-Bayt, and companions.',
          landmark: 'Jannat al-Baqi\' Cemetery',
          prayer: 'Maghrib and Isha at Al-Masjid an-Nabawi.',
          halalFood: 'Traditional Madinah date pancakes and Karak tea.',
          time: '16:30 - 21:00',
        },
        night: {
          activity: 'Explore the Central Date Market (Souq al-Tumoor) to purchase authentic Ajwa, Safawi, and Mabroom dates.',
          landmark: 'Central Dates Souq (Souq al-Tumoor)',
        },
        tips: 'Select authentic Ajwa dates of Madinah as blessed by the Prophet ﷺ.',
      },
      {
        dayNumber: 5,
        title: 'Day 5: Mosque of the Two Qiblas, Trench Battle Sites & Farewell Salam',
        theme: 'Masjid al-Qiblatayn, Seven Mosques (Khandaq), Prophet\'s Wells & Departure',
        fiqhGuidance: 'When departing the blessed city of Madinah, offer an affectionate farewell greeting of Salam to Rasulullah ﷺ.',
        morning: {
          activity: 'Visit Masjid al-Qiblatayn (where the prayer direction was shifted toward Makkah), and Saba\' Masajid at the historical site of the Battle of the Trench (Khandaq).',
          landmark: 'Masjid al-Qiblatayn & Khandaq Battlefield',
          prayer: 'Fajr at the Prophet\'s Mosque; Tahiyyat al-Masjid at Masjid al-Qiblatayn.',
          halalFood: 'Traditional Arabic breakfast buffet in Madinah.',
          time: '06:00 - 11:30',
        },
        afternoon: {
          activity: 'Visit the historic wells of the Prophet ﷺ (Bir Ghars, Bir Uthman) and tour the Holy Quran Exhibition next to the Prophet\'s Mosque.',
          landmark: 'Bir Ghars Well & Holy Quran Exhibition',
          prayer: 'Dhuhr and Asr in congregation at Al-Masjid an-Nabawi.',
          halalFood: 'Family Halal dining with fresh grilled fish and spiced rice.',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: 'Heartfelt farewell visit to the Rawdah Sharif and Bab as-Salam, offering sincere tears and prayers to the Prophet ﷺ for an accepted pilgrimage.',
          landmark: 'Al-Masjid an-Nabawi Golden Chamber',
          prayer: 'Maghrib and Isha at the Prophet\'s Mosque.',
          halalFood: 'Light dinner and refreshing mint tea before airport transfer.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: 'Transfer to Prince Mohammad bin Abdulaziz Airport (Madinah) for return flight home.',
          landmark: 'Prince Mohammad bin Abdulaziz Airport',
        },
        tips: 'Ensure your approved 5-litre Zamzam packaging is ready for airline baggage check-in.',
      },
    ];

    return {
      tripTitle: `${maxDays}-Day Sacred Umrah & Prophetic Journey to Makkah & Madinah`,
      destination: 'Makkah & Madinah',
      country: 'Saudi Arabia',
      durationDays: maxDays,
      summary: 'A spiritually transformative pilgrimage combining the sacred rites of Umrah and Tawaf in Makkah with the serene veneration of the Prophet ﷺ in luminous Madinah.',
      estimatedBudget: budget,
      bestSeason: 'Year-Round (Pleasant autumn and winter months from October to March)',
      islamicHighlights: [
        'Umrah & Tawaf around the Holy Kaaba (100,000x prayer reward)',
        'Al-Masjid an-Nabawi, Rawdah Sharif & Salam to Rasulullah ﷺ',
        'Masjid Quba visit (Reward equivalent to a complete Umrah)',
        'Historical Sanctuaries: Cave of Hira, Cave of Thawr & Mount Uhud',
        'Haramain High-Speed Bullet Train Journey',
      ],
      fiqhAdvice: 'Observe the 100,000x and 1,000x multiplication of prayer rewards in the two sanctuaries. The 450 km transit between Makkah and Madinah validates Shafi\'i Qasr & Jam\' concessions.',
      days: enDays.slice(0, maxDays),
    };
  }

  // ==============================================================
  // 2. KERALA / MALABAR (INDIA)
  // ==============================================================
  const isKerala =
    destLower.includes('kerala') ||
    destLower.includes('kochi') ||
    destLower.includes('calicut') ||
    destLower.includes('kozhikode') ||
    destLower.includes('malabar') ||
    destLower.includes('കൊച്ചി') ||
    destLower.includes('കോഴിക്കോട്') ||
    destLower.includes('കേരളം');

  if (isKerala) {
    const defaultKeralaDays: ItineraryDay[] = [
      {
        dayNumber: 1,
        title: lang === 'ml' ? 'ദിനം 1: കൊടുങ്ങല്ലൂർ ചേരമാൻ ജുമാ മസ്ജിദ് & ചരിത്രപൈതൃകം' : 'Day 1: Cheraman Juma Masjid & Musiris Islamic Heritage',
        theme: lang === 'ml' ? 'ഭാരതത്തിലെ പ്രഥമ മസ്ജിദും ആദ്യകാല ഇസ്‌ലാമിക ചരിത്രവും' : 'The Gateway of Islam in India (629 CE)',
        fiqhGuidance: lang === 'ml' ? 'യാത്രാ ദൂരം 81 കി.മീറ്ററിലധികം: ഖസ്റും ജംഉം അനുവദനീയം.' : 'Travel distance >81 km (Marhalatayn) allows Qasr & Jam\' in the Shafi\'i school.',
        morning: {
          activity: lang === 'ml' ? 'കൊടുങ്ങല്ലൂരിലെ ചരിത്രപ്രസിദ്ധമായ ചേരമാൻ ജുമാ മസ്ജിദ് സന്ദർശനം. പൗരാണിക വിളക്കും മ്യൂസിയവും കാണൽ.' : 'Visit the historic Cheraman Juma Masjid in Kodungallur (built 629 CE), India\'s oldest mosque, with its ancient oil lamp and heritage museum.',
          landmark: 'Cheraman Juma Masjid (Kodungallur)',
          prayer: lang === 'ml' ? 'സുബ്ഹി ചേരമാൻ മസ്ജിദിൽ, തുടർന്ന് പ്രഭാത അദ്കാറുകൾ.' : 'Fajr at Cheraman Juma Masjid followed by morning Adhkar.',
          halalFood: lang === 'ml' ? 'പരമ്പരാഗത കേരളീയ ഹലാൽ പ്രഭാതഭക്ഷണം (അപ്പം, ഇടിയപ്പം, മുട്ടക്കറി).' : 'Traditional Kerala Halal breakfast of Appam, Idiyappam, and egg roast at local heritage cafe.',
          time: '05:30 - 11:30',
        },
        afternoon: {
          activity: lang === 'ml' ? 'മുസിരിസ് പൈതൃക പദ്ധതി, പള്ളിവളപ്പുകൾ, കോട്ടപ്പുറം കോട്ട എന്നിവ സന്ദർശനം.' : 'Tour the Muziris Heritage Project, ancient port excavations, and Kottappuram waterfront fort.',
          landmark: 'Muziris Heritage Centre',
          prayer: lang === 'ml' ? 'ളുഹ്റും അസ്വ്റും ജംഅ് തഖ്ദീമായി ചേരമാൻ മസ്ജിദിൽ.' : 'Dhuhr & Asr combined (Jam\' Taqdim 2+2) at Cheraman Juma Masjid.',
          halalFood: lang === 'ml' ? 'രുചികരമായ മലബാർ ദം ബിരിയാണി & കായവറുത്തത്.' : 'Authentic Malabar Dum Biryani with dates pickle and crispy banana chips.',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: lang === 'ml' ? 'മുനക്കൽ അഴീക്കോട് ബീച്ച് സൂര്യാസ്തമയ നടപ്പ്, ശാന്തമായ കായൽ കാഴ്ചകൾ.' : 'Sunset walk at Munakkal Azhikode beach where the river meets the Arabian sea.',
          landmark: 'Munakkal Beach & Estuary',
          prayer: lang === 'ml' ? 'മഗ്‌രിബും ഇശാഉം കടലോര പള്ളിയിൽ.' : 'Maghrib & Isha at coastal Juma masjid.',
          halalFood: lang === 'ml' ? 'ഫ്രഷ് പൊരിച്ച മീൻ വിഭവങ്ങളും സുലൈമാനിയും.' : 'Fresh grilled fish and aromatic spiced Sulaimani tea.',
          time: '17:00 - 20:30',
        },
        night: {
          activity: lang === 'ml' ? 'കായലോരത്ത് വെച്ച് കുടുംബത്തോടൊപ്പം വിശ്രമം, ദിക്ർ.' : 'Peaceful family relaxation by the backwaters.',
          landmark: 'Riverside Backwater Resort',
        },
        tips: lang === 'ml' ? 'വുളൂ ചെയ്യാനുള്ള സൗകര്യങ്ങൾ എല്ലാ ചരിത്ര മസ്ജിദുകളിലുമുണ്ട്.' : 'Historic mosques have dedicated wudu tanks; remove shoes before entering the wooden halls.',
      },
      {
        dayNumber: 2,
        title: lang === 'ml' ? 'ദിനം 2: കോഴിക്കോട് കുറ്റിച്ചിറ പൈതൃകവും മിശ്കാൽ പള്ളിയും' : 'Day 2: Kuttichira Islamic Architecture & Mishkal Mosque in Kozhikode',
        theme: lang === 'ml' ? 'മധ്യകാല മലബാർ വാസ്തുവിദ്യയും സാമൂതിരി കാലത്തെ ഇസ്‌ലാമിക ജീവിതവും' : 'Medieval Malabar Wooden Architecture & Zamorin Era',
        fiqhGuidance: lang === 'ml' ? 'യാത്ര 4 ദിവസത്തിൽ കുറവായതിനാൽ ഇളവുകൾ പൂർണ്ണമായും ഉപയോഗിക്കാം.' : 'Traveler retains prayer concessions as stay is under 4 full days.',
        morning: {
          activity: lang === 'ml' ? 'കുറ്റിച്ചിറ മിശ്കാൽ പള്ളി (14-ാം നൂറ്റാണ്ട്), ജുമാ മസ്ജിദ്, മുച്ചുന്തി പള്ളി എന്നിവ സന്ദർശിക്കൽ.' : 'Explore Kuttichira heritage quarter: 14th-century Mishkal Mosque (4-tiered wooden structure) and Muchundi Mosque with ancient Vatteluttu inscriptions.',
          landmark: 'Mishkal Mosque (Kozhikode)',
          prayer: lang === 'ml' ? 'സുബ്ഹി മിശ്കാൽ പള്ളിയുടെ ശാന്തമായ തടിത്തൂണുകൾക്കിടയിൽ.' : 'Fajr in the tranquil wooden prayer hall of Mishkal Mosque.',
          halalFood: lang === 'ml' ? 'കുറ്റിച്ചിറയിലെ പ്രഭാത പലഹാരങ്ങൾ (പത്തിരി, ഇറച്ചി റോൾ, ഉന്നക്കായ, ചായ).' : 'Famous Kuttichira breakfast: soft Pathiri, meat roll, Unnakaya, and piping hot Malabar chai.',
          time: '06:00 - 11:00',
        },
        afternoon: {
          activity: lang === 'ml' ? 'മിഠായിത്തെരുവ് (SM Street) ഷോപ്പിംഗ്, കോഴിക്കോടൻ ഹൽവ, സുഗന്ധവ്യഞ്ജന വ്യാപാരം.' : 'Browse the historic Sweet Meat Street (SM Street) for fresh Kozhikodan Halwa, spices, and perfumes.',
          landmark: 'S.M. Street (Mittai Theruvu)',
          prayer: lang === 'ml' ? 'ളുഹ്റും അസ്വ്റും പാളയം ജുമാ മസ്ജിദിലോ പട്ടാളപ്പള്ളിയിലോ.' : 'Dhuhr & Asr at Palayam Juma Masjid.',
          halalFood: lang === 'ml' ? 'പ്രസിദ്ധമായ കോഴിക്കോടൻ പാരഗൺ അല്ലെങ്കിൽ സാഗർ റസ്റ്റോറന്റിൽ ചിക്കൻ ബിരിയാണി.' : 'World-famous Malabar Biryani at Paragon or Sagar Restaurant.',
          time: '12:00 - 16:30',
        },
        evening: {
          activity: lang === 'ml' ? 'കോഴിക്കോട് ബീച്ച്, സൗത്ത് പിയർ സൂര്യാസ്തമയം, കടപ്പുറത്തെ കാഴ്ചകൾ.' : 'Sunset stroll along Kozhikode Beach and historical pier.',
          landmark: 'Kozhikode Beach Promenade',
          prayer: lang === 'ml' ? 'മഗ്‌രിബും ഇശാഉം ബീച്ച് റോഡ് പള്ളിയിൽ.' : 'Maghrib & Isha at Beach Road Juma Masjid.',
          halalFood: lang === 'ml' ? 'കടപ്പുറത്തെ തനത് കോഴിക്കോടൻ സ്നാക്സ്, അവൽ മിൽക്ക്, ബീഫ് കബാബ്.' : 'Beachfront Kallummakkaya (stuffed mussels), Aval Milk, and tender beef kebabs.',
          time: '17:00 - 21:00',
        },
        night: {
          activity: lang === 'ml' ? 'കടൽത്തീരത്തെ ഇളംകാറ്റേറ്റ് ദിക്റുകളും വായനയും.' : 'Evening tea and reflection by the Arabian sea breeze.',
          landmark: 'Beach Promenade',
        },
        tips: lang === 'ml' ? 'മിശ്കാൽ പള്ളിയിൽ പ്രവേശിക്കുമ്പോൾ കേരളീയ തനിമയുള്ള പാരമ്പര്യ മരപ്പണികൾ ശ്രദ്ധിക്കുക.' : 'Respect historic timber columns; no footwear on upper verandas.',
      },
    ];

    return {
      tripTitle: lang === 'ml' ? `${maxDays}-ദിവസത്തെ മലബാർ ഇസ്‌ലാമിക പൈതൃക യാത്ര (കേരളം)` : `${maxDays}-Day Malabar Islamic Heritage Journey (Kerala)`,
      destination: 'Kerala (Kochi & Kozhikode)',
      country: 'India',
      durationDays: maxDays,
      summary: lang === 'ml' ? 'ഭാരതത്തിലെ ഇസ്‌ലാമിക പ്രവേശന കവാടമായ കൊടുങ്ങല്ലൂരും കുറ്റിച്ചിറയിലെ പൗരാണിക വാസ്തുവിദ്യയും സമന്വയിപ്പിച്ച ഉത്തമ യാത്ര.' : 'A spiritual and cultural journey connecting India\'s oldest mosques, medieval wooden architecture, and world-renowned Halal culinary traditions.',
      estimatedBudget: budget,
      bestSeason: 'October to March',
      islamicHighlights: [
        'Cheraman Juma Masjid (629 CE)',
        'Mishkal Mosque & Muchundi Mosque in Kuttichira',
        'Ancient spice trade heritage of Malabar',
        'World-famous authentic Malabar Halal cuisine',
      ],
      fiqhAdvice: 'Shafi\'i jurisprudence is historically predominant in Malabar. Qasr and Jam\' apply if journey exceeds 81 km from home base.',
      days: defaultKeralaDays.slice(0, maxDays),
    };
  }

  // ==============================================================
  // 3. ISTANBUL / TÜRKIYE
  // ==============================================================
  const isIstanbul =
    destLower.includes('istanbul') ||
    destLower.includes('turkey') ||
    destLower.includes('türkiye');

  if (isIstanbul) {
    const istanbulDays: ItineraryDay[] = [
      {
        dayNumber: 1,
        title: 'Day 1: Sultanahmet Historic Core & Ottoman Splendor',
        theme: 'The Imperial Heart of Islam & Byzantine Heritage',
        fiqhGuidance: 'International travel distance (>81 km) permits Qasr (2 rak\'ahs) and Jam\' in the Shafi\'i school.',
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
      days: istanbulDays.slice(0, maxDays),
    };
  }

  // ==============================================================
  // 4. DYNAMIC GLOBAL GENERATOR (ANY CITY WORLDWIDE)
  // ==============================================================
  const globalDays: ItineraryDay[] = [];
  for (let i = 1; i <= maxDays; i++) {
    const isDay1 = i === 1;
    const isDay2 = i === 2;
    const isLast = i === maxDays;

    if (lang === 'ml') {
      globalDays.push({
        dayNumber: i,
        title: `ദിനം ${i}: ${destination} പൈതൃകവും ഇസ്‌ലാമിക കേന്ദ്രങ്ങളും`,
        theme: `${destination} നഗരക്കാഴ്ചകളും ചരിത്ര സ്മാരകങ്ങളും`,
        fiqhGuidance: 'യാത്രാ ദൂരം 81 കിലോമീറ്ററിലധികം ആണെങ്കിൽ ഫത്ഹുൽ മുഈൻ അനുസരിച്ച് ഖസ്റും ജംഉം നിർവ്വഹിക്കാം.',
        morning: {
          activity: `${destination}-ലെ പ്രധാന ചരിത്ര പൈതൃക കേന്ദ്രങ്ങളും കേന്ദ്ര മസ്ജിദുകളും സന്ദർശിക്കൽ.`,
          landmark: `സെൻട്രൽ സിറ്റി, ${destination}`,
          prayer: `സുബ്ഹി ${destination}-ലെ പ്രധാന മസ്ജിദിൽ, തുടർന്ന് പ്രഭാത അദ്കാറുകൾ.`,
          halalFood: `തനത് ഹലാൽ പ്രാദേശിക പ്രഭാതഭക്ഷണ ശാല.`,
          time: '06:30 - 11:30',
        },
        afternoon: {
          activity: `${destination}-ലെ മ്യൂസിയങ്ങൾ, വാസ്തുവിദ്യാ വിസ്മയങ്ങൾ, കമ്പോളങ്ങൾ എന്നിവ കാണൽ.`,
          landmark: `പൈതൃക സ്മാരകം, ${destination}`,
          prayer: `ളുഹ്റും അസ്വ്റും ജംആയി ഖസ്റ് (2+2) ചെയ്തു നിസ്കരിക്കൽ.`,
          halalFood: `വിശ്വസനീയമായ ഹലാൽ റസ്റ്റോറന്റിൽ ഉച്ചഭക്ഷണം.`,
          time: '12:00 - 16:30',
        },
        evening: {
          activity: `സൂര്യാസ്തമയ നടപ്പ്, സാംസ്കാരിക കാഴ്ചകൾ, സുവനീർ ഷോപ്പിംഗ്.`,
          landmark: `സിറ്റി പ്രൊമനേഡ് / വ്യൂപോയിന്റ്`,
          prayer: `മഗ്‌രിബും ഇശാഉം ജംആയി നിസ്കരിക്കൽ.`,
          halalFood: `പരമ്പരാഗത അത്താഴ വിഭവങ്ങളും പലഹാരങ്ങളും.`,
          time: '17:00 - 21:00',
        },
        night: {
          activity: `ഹോട്ടലിൽ കുടുംബത്തോടൊപ്പം വിശ്രമം, നാളത്തെ യാത്രാപദ്ധതി അവലോകനം.`,
          landmark: `ഹോട്ടൽ ലോഞ്ച്`,
        },
        tips: `വുളൂ ചെയ്യാനുള്ള സൗകര്യവും ചെറിയ യാത്രാ മുസല്ലയും കയ്യിൽ കരുതുക.`,
      });
    } else if (lang === 'ar') {
      globalDays.push({
        dayNumber: i,
        title: `اليوم ${i}: استكشاف معالم ${destination} الإسلامية والثقافية`,
        theme: `أبرز معالم ${destination} التاريخية والمساجد العريقة`,
        fiqhGuidance: 'مسافة السفر فوق 81 كم تجيز للمسافر رخص القصر والجمع في المذهب الشافعي.',
        morning: {
          activity: `جولة صباحية لاستكشاف المعالم التاريخية والمساجد المركزية في ${destination}.`,
          landmark: `المركز التاريخي في ${destination}`,
          prayer: `صلاة الفجر في المسجد المركزي متبوعة بأذكار الصباح.`,
          halalFood: `وجبة فطور حلال في مقهى محلي معتمد.`,
          time: '06:30 - 11:30',
        },
        afternoon: {
          activity: `زيارة المتاحف الشهيرة والأسواق التراثية في ${destination}.`,
          landmark: `المعالم الثقافية في ${destination}`,
          prayer: `الظهر والعصر قصراً وجمعاً بالمسجد الكبير.`,
          halalFood: `وجبة غداء حلال شهية من المطبخ المحلي.`,
          time: '12:00 - 16:30',
        },
        evening: {
          activity: `جولة مسائية لمشاهدة الغروب والاستمتاع بالأجواء الثقافية للمدينة.`,
          landmark: `الممشى الثقافي / الواجهة البحرية`,
          prayer: `المغرب والعشاء جماعة في أقرب مصلى.`,
          halalFood: `عشاء حلال مميز وحلويات تقليدية.`,
          time: '17:00 - 21:00',
        },
        night: {
          activity: `جلسة استرخاء وتأمل ومراجعة برنامج الغد.`,
          landmark: `مقر الإقامة`,
        },
        tips: 'التحقق من مواقيت الصلاة واتجاه القبلة عبر تطبيق مسافر.',
      });
    } else {
      globalDays.push({
        dayNumber: i,
        title: isDay1
          ? `Day 1: Historic Heart & Grand Mosques of ${destination}`
          : isDay2
          ? `Day 2: Cultural Heritage & Halal Gastronomy in ${destination}`
          : isLast
          ? `Day ${i}: Panoramic Sights, Souvenirs & Farewell in ${destination}`
          : `Day ${i}: Exploring ${destination}'s Culture & Faith`,
        theme: `Day ${i} Highlights & Scenic Landmarks in ${destination}`,
        fiqhGuidance: 'Observe the 81 km travel distance rule and 4-day stay rule in Shafi\'i jurisprudence.',
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
  }

  return {
    tripTitle:
      lang === 'ml'
        ? `${maxDays}-ദിവസത്തെ ഇസ്‌ലാമിക യാത്രാ പ്ലാൻ: ${destination}`
        : lang === 'ar'
        ? `برنامج سفر إسلامي لـ ${destination} (${maxDays} أيام)`
        : `${maxDays}-Day Muslim-Friendly Experience in ${destination}`,
    destination,
    country: 'International',
    durationDays: maxDays,
    summary:
      lang === 'ml'
        ? `${destination}-ലെ പ്രധാന കാഴ്ചകളും കൃത്യമായ നിസ്കാര സമയങ്ങളും ഹലാൽ ഭക്ഷണശാലകളും സമന്വയിപ്പിച്ച ഉത്തമ യാത്രാ പ്ലാൻ.`
        : lang === 'ar'
        ? `خطة سفر متوازنة لـ ${destination} تجمع بين أهم المعالم ومواقيت الصلاة والمطاعم الحلال المعتمدة.`
        : `A carefully balanced travel itinerary for ${destination} combining top sights with seamless prayer times and halal dining.`,
    estimatedBudget: budget,
    bestSeason: 'Spring & Autumn',
    islamicHighlights: [
      `Historic & congregational mosques of ${destination}`,
      `Authentic Halal culinary discovery`,
      `Cultural landmarks with comfortable prayer access`,
    ],
    fiqhAdvice: 'Observe the 81 km travel distance rule and 4-day stay rule in Shafi\'i jurisprudence.',
    days: globalDays,
  };
}
