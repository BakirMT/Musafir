import { RitualStep } from './hajjUmrahData';
import { HAJJ_UMRAH_DUAS } from './hajjDuaData';

export const UMRAH_FULL_STEPS: RitualStep[] = [
  {
    id: 1,
    type: 'umrah',
    titleEn: '1. Ihram & Miqat Boundary (ഇഹ്‌റാം & മീഖാത്ത്)',
    titleMl: '1. മീഖാത്തും ഇഹ്‌റാമും',
    titleAr: 'الإحرام من الميقات',
    category: 'fard',
    location: 'Canonical Miqat (Dhul Hulaifah, Yalamlam, Qarn al-Manazil, etc.)',
    summaryEn: 'Perform ritual bath (Ghusl), wear 2 unstitched white towels (Rida & Izaar) for men or modest attire for women, formulate the Niyyah in the heart, and continuously chant the Talbiyah.',
    summaryMl: 'ശുദ്ധിയായി കുളിച്ച് സുഗന്ധം പൂശി (ഇഹ്‌റാമിന് മുമ്പ് മാത്രം), പുരുഷന്മാർ 2 വെള്ള തുണികളും സ്ത്രീകൾ മുഖവും കൈപ്പത്തിയും ഒഴിച്ചുള്ള സാധാരണ വസ്ത്രവും ധരിച്ച് ഉംറയുടെ നിയ്യത്ത് മനസ്സിൽ കരുതുകയും തൽബിയ്യത്ത് ചൊല്ലിത്തുടങ്ങുകയും ചെയ്യുക.',
    actionsEn: [
      'Perform Sunnah Ghusl for Ihram and clip nails beforehand.',
      'Men wear 2 unstitched white cloths; women wear modest dress with face and hands uncovered.',
      'Pray 2 Rak\'ahs Sunnah of Ihram if not at a disliked prayer time.',
      'Make intention: "Nawaytul-\'Umrata wa ahramtu biha lillahi Ta\'ala".',
      'Begin the sacred Talbiyah loudly for men and softly for women.',
      'Strictly avoid all 10 prohibitions of Ihram (no perfume, no hair clipping, no head cover for men).'
    ],
    actionsMl: [
      'ഇഹ്‌റാമിന്റെ സുന്നത്ത് കുളി കുളിക്കുക.',
      'പുരുഷന്മാർ തുന്നലില്ലാത്ത രണ്ട് തുണികൾ ധരിക്കുക (കണങ്കാലുകൾ പുറത്തുകാണുന്ന ചെരുപ്പ്).',
      'ഇഹ്‌റാമിന്റെ 2 റക്അത്ത് സുന്നത്ത് നമസ്കരിക്കുക.',
      'ഉംറയുടെ നിയ്യത്ത് വെക്കുക: "നവൈതുൽ ഉംറത വ അഹ്റമ്തു ബിഹാ ലില്ലാഹി തആലാ".',
      'ഉറക്കെ തൽബിയ്യത്ത് ചൊല്ലിത്തുടങ്ങുക.',
      'ഇഹ്‌റാമിലെ നിഷിദ്ധ കാര്യങ്ങളിൽ നിന്ന് പൂർണ്ണമായി വിട്ടുനിൽക്കുക.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-ihram-niyyah-umrah' || d.id === 'dua-talbiyah-main'),
    commonMistakes: [
      'Passing the Miqat on flight without being in Ihram (requires Damm expiation).',
      'Using scented soap or wet wipes containing fragrance after entering Ihram.',
      'Wearing stitched underwear or socks under the Ihram sheets for men.'
    ]
  },
  {
    id: 2,
    type: 'umrah',
    titleEn: '2. Tawaf al-Umrah (ത്വവാഫുൽ ഉംറ - 7 Circuits)',
    titleMl: '2. കഅ്ബക്ക് ചുറ്റും ത്വവാഫ് ചെയ്യൽ',
    titleAr: 'طواف العمرة سبعة أشواط',
    category: 'fard',
    location: 'Al-Masjid al-Haram (Mataf)',
    summaryEn: 'Perform 7 counter-clockwise circuits around the Holy Kaaba starting and ending at the Black Stone (Hajar al-Aswad) with valid wudu and the Kaaba on your left.',
    summaryMl: 'ഹജറുൽ അസ്‌വദിന് നേരെ നിന്ന് തുടങ്ങി കഅ്ബയെ ഇടതുഭാഗത്താക്കി 7 തവണ പ്രദക്ഷിണം ചെയ്യുക. ഓരോ ചുറ്റും പൂർത്തിയാകുമ്പോഴും റുക്‌നുൽ യമാനിക്കും ഹജറുൽ അസ്‌വദിനുമിടയിൽ പ്രാർത്ഥിക്കുക.',
    actionsEn: [
      'Ensure complete Wudu ritual purity (indispensable condition in Shafi\'i Fiqh).',
      'For men: Uncover right shoulder (Idtiba\') throughout the 7 circuits.',
      'For men: Walk briskly with small steps (Raml) during the first 3 circuits if space permits.',
      'Raise right hand towards Black Stone at each circuit: "Bismillahi wallahu Akbar".',
      'Supplicate: "Rabbana atina fid-dunya hasanatan..." between Yemeni Corner and Black Stone.',
      'Upon completing 7 circuits, cover both shoulders and pray 2 Rak\'ahs behind Maqam Ibrahim.',
      'Drink Zamzam water facing the Kaaba and make heartfelt supplications.'
    ],
    actionsMl: [
      'പൂർണ്ണ ശുദ്ധിയും വുളൂഉം ഉറപ്പുവരുത്തുക.',
      'പുരുഷന്മാർ വലത് തോൾ തുറന്നിടുക (ഇള്തിബാഅ്).',
      'ആദ്യത്തെ 3 ചുറ്റുകളിൽ പുരുഷന്മാർ ചെറിയ ചുവടുകളോടെ വേഗത്തിൽ നടക്കുക (റമൽ).',
      'ഓരോ ചുറ്റിന്റെ തുടക്കത്തിലും ഹജറുൽ അസ്‌വദിന് നേരെ കൈയുയർത്തി ബിസ്മില്ലാഹി അല്ലാഹു അക്ബർ ചൊല്ലുക.',
      'റുക്‌നുൽ യമാനിക്കും ഹജറുൽ അസ്‌വദിനുമിടയിൽ "റബ്ബനാ ആതിനാ ഫിദ്ദുൻയാ..." പ്രാർത്ഥിക്കുക.',
      'ത്വവാഫ് കഴിഞ്ഞയുടൻ തോളുകൾ പുതച്ച് മഖാമു ഇബ്‌റാഹീമിന് പിന്നിൽ 2 റക്അത്ത് നമസ്കരിക്കുക.',
      'ഖിബ്‌ലക്ക് നേരെ നിന്ന് ആവശ്യത്തിന് സംസം വെള്ളം കുടിക്കുകയും പ്രാർത്ഥിക്കുകയും ചെയ്യുക.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.category === 'tawaf'),
    commonMistakes: [
      'Touching the Shadharwan (base marble) or entering inside Hijr Ismail during Tawaf (the lap will not count).',
      'Pushing aggressively to kiss the Black Stone (touching is only Sunnah, harming people is Haram).',
      'Reciting collective loud mantras that disturb other worshipers.'
    ]
  },
  {
    id: 3,
    type: 'umrah',
    titleEn: '3. Sa\'i between Safa and Marwah (സഈ - 7 Laps)',
    titleMl: '3. സ്വഫാ-മർവ്വ സഈ',
    titleAr: 'السعي بين الصفا والمروة',
    category: 'fard',
    location: 'Mas\'a Gallery (Safa to Marwah)',
    summaryEn: 'Walk 7 distinct intervals between Mount Safa and Mount Marwah, beginning on Safa and finishing the 7th interval on Marwah.',
    summaryMl: 'സ്വഫാ മലയിൽ നിന്ന് തുടങ്ങി മർവ്വയിൽ അവസാനിക്കുന്ന വിധം 7 തവണ സഈ ചെയ്യുക. സ്വഫായിലും മർവ്വയിലും കഅ്ബക്ക് നേരെ നിന്ന് തക്ബീറുകളും ദുആകളും ചൊല്ലുക.',
    actionsEn: [
      'Ascend Safa and recite: "Innas-Safa wal-Marwata min sha\'a\'irillah...".',
      'Face the Kaaba on Safa, raise hands, make Takbeer 3 times, and recite the master Tawheed dhikr.',
      'Walk towards Marwah: Lap 1 ends at Marwah. Lap 2 goes Marwah to Safa.',
      'Men jog lightly between the green fluorescent light markers.',
      'Repeat the 3-fold supplication standing on Marwah and each time you reach Safa/Marwah.',
      'The 7th lap culminates on Mount Marwah.'
    ],
    actionsMl: [
      'സ്വഫായിലേക്ക് കയറുമ്പോൾ "ഇന്നസ്സ്വഫാ വൽ മർവ്വത മിൻ ശആഇരില്ലാഹ്..." ഓതുക.',
      'സ്വഫായിലും മർവ്വയിലും കഅ്ബയെ നോക്കി കൈ ഉയർത്തി 3 തവണ തക്ബീറും ദിക്റും ദുആയും ചെയ്യുക.',
      'പച്ച ലൈറ്റുകൾക്കിടയിൽ പുരുഷന്മാർ വേഗത കൂട്ടി നടക്കുക.',
      '1: സ്വഫാ->മർവ്വ, 2: മർവ്വ->സ്വഫാ... 7-ാമത്തെ നടത്തം മർവ്വയിൽ അവസാനിക്കുന്നു.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.category === 'sai'),
    commonMistakes: [
      'Counting Safa to Marwah and back to Safa as 1 lap (each single direction is 1 complete lap, totaling 7).',
      'Rushing through Safa and Marwah without standing to face Kaaba for supplication.'
    ]
  },
  {
    id: 4,
    type: 'umrah',
    titleEn: '4. Halq or Taqsir - Exit from Ihram (തഹല്ലുൽ)',
    titleMl: '4. മുടി കളയലോ മുറിക്കലോ (ഉംറ പൂർത്തിയാകൽ)',
    titleAr: 'الحلق أو التقصير والتحلل من الإحرام',
    category: 'fard',
    location: 'Licensed Barbershops in Makkah Towers / Clock Tower',
    summaryEn: 'Conclude your Umrah by shaving the entire head (Halq - triple reward for men) or trimming (Taqsir - fingertip length). Women trim a fingertip (1-2 cm) from the end of all hair.',
    summaryMl: 'പുരുഷന്മാർ തല മുണ്ഡനം ചെയ്യലോ മുടി വെട്ടലോ നടത്തുക (വടിക്കലാണ് ഉത്തമം). സ്ത്രീകൾ മുടിയുടെ അറ്റത്ത് നിന്ന് ഒരു വിരൽത്തുമ്പളവ് മുറിക്കുക. ഇതോടെ ഉംറ പൂർത്തിയായി ഇഹ്‌റാമിൽ നിന്ന് വിരമിക്കുന്നു.',
    actionsEn: [
      'Men: Shaving the whole head (Halq) is highly meritorious as the Prophet ﷺ supplicated for them three times.',
      'Men alternate: Trimming hair evenly across the entire head (Taqsir).',
      'Women: Cut approximately 1-2 cm from the ends of the gathered hair.',
      'Recite praise: "Alhamdulillahil-ladhee bi-ni\'matihi tatimmus-salihat".',
      'All Ihram restrictions are now lifted and regular clothing is worn.'
    ],
    actionsMl: [
      'പുരുഷന്മാർ തല വടിക്കൽ (ഹൽഖ്) മൂന്ന് ഇരട്ടി പ്രതിഫലാർഹമാണ്.',
      'സ്ത്രീകൾ മുടിയുടെ തുമ്പിൽ നിന്ന് അല്പം മുറിക്കുക.',
      'ഇതോടെ ഇഹ്‌റാമിന്റെ എല്ലാ വിലക്കുകളും നീങ്ങി സാധാരണ വസ്ത്രത്തിലേക്ക് മടങ്ങാം.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-zamzam-drinking'),
    commonMistakes: [
      'Cutting only 2 or 3 single strands of hair from one side instead of trimming broadly.',
      'Clipping someone else\'s hair before cutting one\'s own hair (scholars allow, but better to cut one\'s own first).'
    ]
  }
];

export const HAJJ_FULL_DAYS: RitualStep[] = [
  {
    id: 101,
    type: 'hajj',
    dayNameEn: 'Day 1: 8th Dhul Hijjah (Yawm al-Tarwiyah)',
    dayNameMl: 'ഒന്നാം ദിനം: ദുൽഹിജ്ജ 8 (തർവിയാ ദിനം - മിനാ)',
    hijriDate: '8th Dhul Hijjah',
    titleEn: 'Day 1: Ihram & Departure to Mina (മിനായിലേക്ക്)',
    titleMl: 'മിനായിലെ രാപ്പാർക്കലും 5 വഖ്ത് നമസ്കാരങ്ങളും',
    titleAr: 'يوم التروية - الإحرام والتوجه إلى منى',
    category: 'sunnah',
    location: 'Makkah hotel -> Mina Tents Valley',
    summaryEn: 'Enter Ihram for Hajj from your accommodation in Makkah, state intention, and proceed to Mina before Dhuhr. Pray Dhuhr, Asr, Maghrib, Isha, and Fajr of 9th in Mina in Qasr (shortened) without combining (Jam\').',
    summaryMl: 'താമസസ്ഥലത്ത് നിന്ന് ഹജ്ജിന്റെ ഇഹ്‌റാം ചെയ്ത് തൽബിയ്യത്തുമായി മിനായിലേക്ക് പുറപ്പെടുക. ളുഹ്‌റ്, അസ്വർ, മഗ്‌രിബ്, ഇശാഅ്, ഒമ്പതാം രാവിന്റെ സുബ്ഹി എന്നിവ മിനായിൽ വെച്ച് നമസ്കരിക്കുക.',
    actionsEn: [
      'Perform Ghusl, wear Ihram, and make intention: "Nawaytul-Hajja wa ahramtu bihi lillahi Ta\'ala".',
      'Chant the Talbiyah continuously during the journey to Mina.',
      'Stay in Mina camp for the entire day and night of 8th Dhul Hijjah.',
      'Shorten 4-rak\'ah prayers to 2 rak\'ahs (Qasr) at their respective times without combining (Jam\').',
      'Spend the night in worship, Quran recitation, and rest for the Great Day of Arafah.'
    ],
    actionsMl: [
      'കുളിച്ച് ഇഹ്‌റാം വസ്ത്രം ധരിച്ച് ഹജ്ജിന്റെ നിയ്യത്ത് വെക്കുക.',
      'തൽബിയ്യത്ത് ചൊല്ലി മിനായിലേക്ക് നീങ്ങുക.',
      'മിനായിൽ 5 വഖ്ത് നമസ്കാരങ്ങൾ അതത് സമയങ്ങളിൽ ഖസ്വ്‌റായി നമസ്കരിക്കുക.',
      'അറഫാ ദിനത്തിനായി പ്രാർത്ഥനകളോടെ തയ്യാറെടുക്കുക.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-ihram-niyyah-hajj' || d.id === 'dua-talbiyah-main'),
    commonMistakes: [
      'Combining Dhuhr and Asr at Mina (Sunnah is to pray each prayer at its own time in Qasr).',
      'Skipping the Mina stay on 8th without necessity (it is a blessed Sunnah of the Prophet ﷺ).'
    ]
  },
  {
    id: 102,
    type: 'hajj',
    dayNameEn: 'Day 2: 9th Dhul Hijjah (Yawm Arafah - The Core Pillar)',
    dayNameMl: 'രണ്ടാം ദിനം: ദുൽഹിജ്ജ 9 (അറഫാ സംഗമം - ഹജ്ജിന്റെ റുക്ൻ)',
    hijriDate: '9th Dhul Hijjah',
    titleEn: 'Day 2: Wuqoof at Arafah & Night in Muzdalifah',
    titleMl: 'അറഫാ വുഖൂഫും മുസ്ദലിഫാ രാപ്പാർക്കലും',
    titleAr: 'يوم عرفة - الوقوف بعرفة والإفاضة إلى مزدلفة',
    category: 'fard',
    location: 'Arafah Plains / Jabal ar-Rahmah -> Muzdalifah',
    summaryEn: 'Proceed to Arafah after sunrise. Listen to Khutbah at Masjid Nimrah. Pray Dhuhr and Asr combined and shortened (Jam\' Taqdim & Qasr). Stand in Wuqoof from noon until sunset engaged in fervent dua. Depart for Muzdalifah immediately after sunset without praying Maghrib at Arafah.',
    summaryMl: 'സൂര്യോദയ ശേഷം അറഫയിലേക്ക് നീങ്ങുക. ളുഹ്‌റും അസ്വറും ജംഉം ഖസ്വ്‌റുമായി മുൻകൂട്ടി (ജംഉ തഖ്ദീം) നമസ്കരിക്കുക. സൂര്യാസ്തമയം വരെ അറഫയുടെ അതിർത്തിക്കുള്ളിൽ നിന്ന് കണ്ണീരോടെ പ്രാർത്ഥിക്കുക. സൂര്യാസ്തമയ ശേഷം നമസ്കരിക്കാതെ മുസ്ദലിഫയിലേക്ക് പുറപ്പെടുക.',
    actionsEn: [
      'Ensure you are inside the designated boundaries of Arafah (Uranah valley is outside).',
      'Pray Dhuhr and Asr with 1 Adhan and 2 Iqamahs at Dhuhr time in Jam\' Taqdim and Qasr.',
      'Engage in non-stop Dhikr, Istighfar, Quran, and the Master Dua of Arafah until sunset.',
      'Stand facing Qiblah with hands raised at Jabal ar-Rahmah or inside your tent.',
      'Stay inside Arafah until the sun completely sets below the horizon (Wajib).',
      'Proceed tranquilly to Muzdalifah after Maghrib enters; pray Maghrib and Isha combined at Muzdalifah in Jam\' Ta\'kheer.',
      'Sleep under the open sky at Muzdalifah and remain there past midnight (Wajib).'
    ],
    actionsMl: [
      'അറഫയുടെ അതിർത്തിക്കുള്ളിലാണെന്ന് ഉറപ്പുവരുത്തുക.',
      'ളുഹ്‌റും അസ്വറും ജംഉ തഖ്ദീമായി നമസ്കരിക്കുക.',
      'സൂര്യാസ്തമയം വരെ തഹ്ലീലും തസ്ബീഹും ഇസ്തിഗ്ഫാറും ദുആയും വർദ്ധിപ്പിക്കുക.',
      'സൂര്യാസ്തമയം പൂർണ്ണമായ ശേഷം മാത്രം മുസ്ദലിഫയിലേക്ക് പുറപ്പെടുക.',
      'മുസ്ദലിഫയിലെത്തി മഗ്‌രിബും ഇശാഉം ജംഉ താഖീറായി നമസ്കരിക്കുക.',
      'രാത്രിയുടെ പകുതിക്ക് ശേഷവും മുസ്ദലിഫയിൽ തങ്ങുക (വാജിബ്).'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.category === 'arafah' || d.id === 'dua-muzdalifah-mashar'),
    commonMistakes: [
      'Leaving Arafah before sunset (prohibited; incurs expiation if intentional without return).',
      'Thinking you must climb to the very top of Jabal ar-Rahmah (the entire plain of Arafah is a valid standing place).',
      'Praying Maghrib at Arafah before leaving instead of delaying to Muzdalifah as Rasulullah ﷺ did.'
    ]
  },
  {
    id: 103,
    type: 'hajj',
    dayNameEn: 'Day 3: 10th Dhul Hijjah (Yawm al-Nahr - Eid Day)',
    dayNameMl: 'മൂന്നാം ദിനം: ദുൽഹിജ്ജ 10 (ബലിപെരുന്നാൾ ദിനം)',
    hijriDate: '10th Dhul Hijjah (Eid)',
    titleEn: 'Day 3: Jamarat al-Aqaba, Sacrifice, Shaving & Tawaf al-Ifadah',
    titleMl: 'ജംറതുൽ അഖബ എറിയൽ, ബലി, മുടി കളയൽ & ത്വവാഫുൽ ഇഫാള',
    titleAr: 'يوم النحر - رمي جمرة العقبة والنحر والحلق وطواف الإفاضة',
    category: 'fard',
    location: 'Muzdalifah -> Mina Jamarat -> Makkah Haram -> Mina',
    summaryEn: 'Pray Fajr at Mash\'ar al-Haram in Muzdalifah, collect 70 small pebbles, and head to Mina. Throw 7 pebbles at Jamarat al-Aqaba (stop Talbiyah on first throw). Offer Hady sacrifice. Shave/trim hair (First Tahallul). Go to Makkah to perform Tawaf al-Ifadah and Sa\'i (Second Tahallul). Return to Mina.',
    summaryMl: 'മുസ്ദലിഫയിൽ നിന്ന് സുബ്ഹിക്ക് ശേഷം 70 കല്ലുകൾ പെറുക്കി മിനായിലേക്ക് നീങ്ങുക. ജംറതുൽ അഖബയിൽ 7 കല്ലെറിയുക. ബലി നിർവ്വഹിക്കുക. മുടി കളഞ്ഞ് ഒന്നാം തഹല്ലുൽ ചെയ്യുക. മക്കയിലെത്തി ത്വവാഫുൽ ഇഫാളയും സഈയും പൂർത്തിയാക്കി (രണ്ടാം തഹല്ലുൽ) മിനായിലേക്ക് മടങ്ങുക.',
    actionsEn: [
      'Collect small pebbles (chickpea size) at Muzdalifah.',
      'Throw 7 pebbles at the Big Pillar (Jamarat al-Aqaba) chanting "Allahu Akbar" with each throw.',
      'Stop reciting Talbiyah upon throwing the very first stone.',
      'Slaughter the sacrificial sheep/goat (Hady) for Tamattu\' or Qiran pilgrims.',
      'Perform Halq (shaving) or Taqsir (trimming) -> Achieves First Tahallul (Tahallul Asghar): all prohibitions lifted except marital relations.',
      'Travel to Al-Masjid al-Haram in Makkah and perform Tawaf al-Ifadah (7 circuits) and Sa\'i (7 laps).',
      'Achieves Second Tahallul (Tahallul Akbar): all prohibitions including marital relations are now fully permissible.',
      'Return to Mina before nightfall to fulfill the obligatory overnight stay (Mabit).'
    ],
    actionsMl: [
      'മുസ്ദലിഫയിൽ നിന്ന് കടലമണിയോളം വലിപ്പമുള്ള കല്ലുകൾ പെറുക്കുക.',
      'ജംറതുൽ അഖബയിൽ 7 കല്ലുകൾ തക്ബീറോടെ ഓരോന്നായി എറിയുക.',
      'ബലി അറുക്കുക.',
      'മുടി വടിക്കുകയോ വെട്ടുകയോ ചെയ്യുക -> ഒന്നാം തഹല്ലുൽ (ദാമ്പത്യ ബന്ധമൊഴികെ എല്ലാം അനുവദനീയം).',
      'മക്കയിലെത്തി ഫർള് ത്വവാഫും (ഇഫാള) സഈയും ചെയ്യുക -> രണ്ടാം തഹല്ലുൽ (എല്ലാം അനുവദനീയം).',
      'രാത്രി മിനായിലേക്ക് തന്നെ തിരിച്ചെത്തി രാപ്പാർക്കുക.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-jamarat-pebble' || d.category === 'tawaf'),
    commonMistakes: [
      'Throwing all 7 pebbles at once (counts only as 1 single throw; each pebble must be thrown individually).',
      'Using shoes or huge rocks instead of small pebbles (violates Sunnah).',
      'Staying overnight in Makkah instead of returning to Mina without a valid Shariah excuse.'
    ]
  },
  {
    id: 104,
    type: 'hajj',
    dayNameEn: 'Day 4: 11th Dhul Hijjah (Ayyam at-Tashreeq Day 1)',
    dayNameMl: 'നാലാം ദിനം: ദുൽഹിജ്ജ 11 (തശ്‌രീഖിന്റെ ഒന്നാം ദിനം)',
    hijriDate: '11th Dhul Hijjah',
    titleEn: 'Day 4: Mina Stay & Stoning the 3 Jamarat (21 Pebbles)',
    titleMl: 'മിനാ രാപ്പാർക്കലും 3 ജംറകളിലെ ഏറും (21 കല്ലുകൾ)',
    titleAr: 'أول أيام التشريق - رمي الجمرات الثلاث والمبيت بمنى',
    category: 'wajib',
    location: 'Mina Jamarat Bridge',
    summaryEn: 'Spend the day in Mina. After Zawal (noon meridian time), pelt all 3 Jamarat with 7 pebbles each in strict sequence: 1. Small Pillar (Sughra) + Dua, 2. Middle Pillar (Wusta) + Dua, 3. Big Pillar (Aqaba). Total 21 pebbles.',
    summaryMl: 'മിനായിൽ തങ്ങുക. ളുഹ്‌റ് സമയം ആരംഭിച്ച ശേഷം ക്രമപ്രകാരം മൂന്ന് ജംറകളിലും 7 വീതം കല്ലെറിയുക. ഒന്നാം ജംറയിലും രണ്ടാം ജംറയിലും എറിഞ്ഞ ശേഷം മാറിനിന്ന് ഖിബ്‌ലക്ക് മുന്നിൽ കൈയുയർത്തി ദീർഘമായി പ്രാർത്ഥിക്കുക.',
    actionsEn: [
      'Ramy starts ONLY after Zawal (meridian Dhuhr time) according to classical Shafi\'i rules.',
      '1. Jamarat al-Sughra (First/Small): Throw 7 pebbles with Takbeer -> Move aside and make long supplication facing Kaaba.',
      '2. Jamarat al-Wusta (Middle): Throw 7 pebbles with Takbeer -> Move aside and make long supplication facing Kaaba.',
      '3. Jamarat al-Aqaba (Big): Throw 7 pebbles with Takbeer -> Leave without standing for dua.',
      'Stay overnight in Mina for the majority of the night (Wajib).'
    ],
    actionsMl: [
      'ളുഹ്‌റ് സമയത്തിന് ശേഷം മാത്രം കല്ലെറിയാൻ ആരംഭിക്കുക.',
      'ഒന്നാം ജംറ (7 കല്ല്) -> മാറിനിന്ന് ദുആ.',
      'രണ്ടാം ജംറ (7 കല്ല്) -> മാറിനിന്ന് ദുആ.',
      'മൂന്നാം ജംറ (7 കല്ല്) -> ദുആക്ക് നിൽക്കാതെ പിരിയുക.',
      'രാത്രി മിനായിൽ ഭൂരിഭാഗം സമയവും രാപ്പാർക്കുക.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-jamarat-pebble'),
    commonMistakes: [
      'Throwing pebbles before Dhuhr time on Tashreeq days (invalid in Shafi\'i Madhhab and must be repeated after Zawal).',
      'Skipping the beautiful Sunnah supplications after the 1st and 2nd Jamarat.'
    ]
  },
  {
    id: 105,
    type: 'hajj',
    dayNameEn: 'Day 5: 12th Dhul Hijjah (Ayyam at-Tashreeq Day 2 / Nafar Awwal)',
    dayNameMl: 'അഞ്ചാം ദിനം: ദുൽഹിജ്ജ 12 (നഫറുൽ അവ്വൽ - ആദ്യ യാത്രയയപ്പ്)',
    hijriDate: '12th Dhul Hijjah',
    titleEn: 'Day 5: Stoning 3 Jamarat & Option for Early Departure (Nafar Awwal)',
    titleMl: 'മൂന്ന് ജംറകളിലെ ഏറും നഫറുൽ അവ്വലും',
    titleAr: 'ثاني أيام التشريق - رمي الجمرات والنفر الأول لمن تعجل',
    category: 'wajib',
    location: 'Mina Jamarat Bridge -> Makkah',
    summaryEn: 'Pelt all 3 Jamarat after Zawal with 21 pebbles. Pilgrims choosing early departure (Nafar Awwal) must depart Mina completely before Maghrib sunset to conclude Mina obligations and return to Makkah.',
    summaryMl: 'ളുഹ്‌റിന് ശേഷം 3 ജംറകളിലും 7 വീതം (21) കല്ലെറിയുക. നഫറുൽ അവ്വൽ ഉദ്ദേശിക്കുന്നവർ സൂര്യാസ്തമയത്തിന് (മഗ്‌രിബിന്) മുമ്പായി മിനായുടെ അതിർത്തി വിട്ട് മക്കയിലേക്ക് പുറപ്പെടുക.',
    actionsEn: [
      'Pelt Sughra (7) + dua, Wusta (7) + dua, and Aqaba (7) after Zawal.',
      'If taking Nafar Awwal (early departure), pack luggage and cross the outer boundaries of Mina before the sunset of 12th.',
      'If the sun sets while still inside Mina without having departed, you must stay for the 13th night and pelt on 13th (Nafar Thani).'
    ],
    actionsMl: [
      '3 ജംറകളിലും 21 കല്ലുകൾ എറിയുക.',
      'നേരത്തെ മടങ്ങാൻ ആഗ്രഹിക്കുന്നവർ മഗ്‌രിബ് ബാങ്കിന് മുമ്പായി മിനായുടെ അതിർത്തി വിടുക.',
      'സൂര്യാസ്തമയ സമയത്ത് മിനായിൽ തുടരുന്നവർ 13-ാം രാവും മിനായിൽ തങ്ങി 13-ന് കല്ലെറിയണം.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-jamarat-pebble'),
    commonMistakes: [
      'Delaying departure so that Maghrib enters while still lingering inside Mina camps.'
    ]
  },
  {
    id: 106,
    type: 'hajj',
    dayNameEn: 'Day 6: 13th Dhul Hijjah (Ayyam at-Tashreeq Day 3 / Nafar Thani)',
    dayNameMl: 'ആറാം ദിനം: ദുൽഹിജ്ജ 13 (നഫറുസ്സ്വാനീ - ഹജ്ജ് പൂർത്തീകരണം)',
    hijriDate: '13th Dhul Hijjah',
    titleEn: 'Day 6: Final Stoning & Completion of Hajj in Mina',
    titleMl: 'അവസാനത്തെ കല്ലേറും മിനായോട് വിടപറയലും',
    titleAr: 'ثالث أيام التشريق - إتمام الرمي والنفر الثاني إلى مكة',
    category: 'wajib',
    location: 'Mina -> Makkah al-Mukarramah',
    summaryEn: 'For pilgrims remaining in Mina: Pelt all 3 Jamarat after Zawal with 21 pebbles (completing 70 total pebbles for Hajj). Conclude the sacred Mina stay and proceed to Makkah.',
    summaryMl: 'മിനായിൽ തങ്ങിയവർ ളുഹ്‌റിന് ശേഷം 3 ജംറകളിലും 21 കല്ലെറിഞ്ഞ് ആകെ 70 കല്ലുകൾ പൂർത്തിയാക്കി ഹജ്ജിന്റെ മിനാ കർമ്മങ്ങൾ പൂർത്തിയാക്കി മക്കയിലേക്ക് മടങ്ങുക.',
    actionsEn: [
      'Throw 7 pebbles at Sughra + dua, 7 at Wusta + dua, and 7 at Aqaba.',
      'This completes the full sunnah quota of 70 pebbles (7 on Eid + 21 + 21 + 21).',
      'Return safely to Makkah al-Mukarramah.'
    ],
    actionsMl: [
      'മൂന്ന് ജംറകളിലും കല്ലെറിയൽ പൂർത്തിയാക്കുക.',
      'ഇതോടെ ഹജ്ജിന്റെ മിനാ ഘട്ടം പൂർണ്ണമായി സമാപിക്കുന്നു.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.id === 'dua-jamarat-pebble'),
    commonMistakes: []
  },
  {
    id: 107,
    type: 'hajj',
    dayNameEn: 'Conclusion: Tawaf al-Wada\' (The Farewell Tawaf)',
    dayNameMl: 'സമാപനം: ത്വവാഫുൽ വിദാഅ് (യാത്രയയപ്പ് ത്വവാഫ്)',
    hijriDate: 'Before Leaving Makkah',
    titleEn: 'Farewell Tawaf (ത്വവാഫുൽ വിദാഅ്)',
    titleMl: 'മക്കയോട് വിടപറയുമ്പോഴുള്ള വാജിബായ ത്വവാഫ്',
    titleAr: 'طواف الوداع قبل مغادرة مكة المكرمة',
    category: 'wajib',
    location: 'Al-Masjid al-Haram (Mataf)',
    summaryEn: 'Perform 7 circuits of Tawaf without Sa\'i immediately before packing and leaving Makkah al-Mukarramah. It is an independent Wajib duty.',
    summaryMl: 'മക്ക വിട്ടുപോകുമ്പോൾ ഏറ്റവും അവസാനത്തെ കർമ്മമായി 7 തവണ കഅ്ബ പ്രദക്ഷിണം ചെയ്യുക. സഈ ആവശ്യമില്ല.',
    actionsEn: [
      'Must be the very last action performed in Makkah before departing for the airport or Madinah.',
      'No Sa\'i is required for Tawaf al-Wada\'.',
      'Menstruating women and women with post-natal bleeding are excused from Tawaf al-Wada\' without any penalty or Damm.'
    ],
    actionsMl: [
      'യാത്ര തിരിക്കുന്നതിന് തൊട്ടുമുമ്പ് ചെയ്യുക.',
      'ഇതിന് സഈ ആവശ്യമില്ല.',
      'ആർത്തവമുള്ള സ്ത്രീകൾക്ക് ഇളവുണ്ട്; അവർക്ക് ദമ്മോ കുറ്റമോ ഇല്ല.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.category === 'tawaf'),
    commonMistakes: [
      'Doing extensive shopping or lingering in Makkah for hours after doing Tawaf al-Wada\' (requires repeating Tawaf).'
    ]
  },
  {
    id: 108,
    type: 'hajj',
    dayNameEn: 'Ziyarah of Madinah al-Munawwarah',
    dayNameMl: 'മദീനാ സിയാറത്ത് & റൗളാ ശരീഫ്',
    hijriDate: 'Pre or Post Hajj',
    titleEn: 'Visiting the Prophet\'s Mosque & Rawdah ash-Sharifah',
    titleMl: 'തിരുനബി ﷺ യുടെ റൗളയും മദീനാ പള്ളിയും സന്ദർശിക്കൽ',
    titleAr: 'زيارة المسجد النبوي الشريف والروضة المباركة',
    category: 'sunnah',
    location: 'Al-Masjid an-Nabawi, Madinah',
    summaryEn: 'Visit Al-Masjid an-Nabawi, pray in the blessed Rawdah ash-Sharifah ("a garden from the gardens of Paradise"), send Salawat and Salam upon the Prophet ﷺ, Abu Bakr (RA), and Umar (RA), and visit Quba Mosque and Jannat al-Baqi\'.',
    summaryMl: 'മദീനയിലെ മസ്ജിദുന്നബവി സന്ദർശിക്കുക, റൗളാ ശരീഫിൽ നമസ്കരിക്കുക, തിരുനബി ﷺ ക്കും സിദ്ധീഖ് (റ), ഉമർ (റ) എന്നിവർക്കും സലാം പറയുക. മസ്ജിദുൽ ഖുബാഅ്, ബഖീഅ് എന്നിവ സന്ദർശിക്കുക.',
    actionsEn: [
      'Enter with humility and recite Salawat on the Prophet ﷺ abundantly.',
      'Pray 2 Rak\'ahs Tahiyyat al-Masjid in Rawdah ash-Sharifah if permitted.',
      'Stand with decorum at the Muwajahah Sharifa facing the Prophet\'s ﷺ tomb and convey your Salam and peace.',
      'Step slightly to the right to convey Salam to Abu Bakr as-Siddiq (RA), then further to Umar ibn al-Khattab (RA).',
      'Visit Masjid Quba on Saturday or any morning and pray 2 rak\'ahs (equals the reward of an Umrah).',
      'Visit the Martyrs of Uhud (Sayyiduna Hamzah RA) and the Baqi\' cemetery.'
    ],
    actionsMl: [
      'ഭയഭക്തിയോടെയും വിനയത്തോടെയും മദീനയിൽ പ്രവേശിക്കുക.',
      'റൗളയിൽ വെച്ച് നമസ്കരിക്കുക.',
      'തിരുനബി ﷺ യുടെ മുഖാമുഖം നിന്ന് അദബോടെ സലാമും സ്വലാത്തും അർപ്പിക്കുക.',
      'അബൂബക്കർ (റ), ഉമർ (റ) തങ്ങൾക്കും സലാം പറയുക.',
      'ഖുബാഅ് പള്ളി സന്ദർശിച്ച് 2 റക്അത്ത് നമസ്കരിക്കുക (ഒരു ഉംറയുടെ പ്രതിഫലം).',
      'ഉഹ്ദ് ശുഹദാക്കൾ, ജന്നത്തുൽ ബഖീഅ് സന്ദർശിക്കുക.'
    ],
    duas: HAJJ_UMRAH_DUAS.filter((d) => d.category === 'madinah'),
    commonMistakes: [
      'Raising voices near the sacred chamber (contrary to Qur\'an Surah al-Hujurat 49:2).',
      'Pushing or causing harm to fellow pilgrims in the Rawdah.'
    ]
  }
];
