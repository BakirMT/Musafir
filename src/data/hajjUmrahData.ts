export interface DuaItem {
  id: string;
  category: 'talbiyah' | 'tawaf' | 'sai' | 'arafah' | 'muzdalifah' | 'jamarat' | 'madinah' | 'general';
  title: string;
  titleMl?: string;
  titleAr?: string;
  arabic: string;
  transliteration: string;
  translationEn: string;
  translationMl: string;
  occasion: string;
  virtue?: string;
}

export interface FiqhRuleItem {
  id: string;
  titleEn: string;
  titleMl: string;
  titleAr: string;
  descriptionEn: string;
  descriptionMl: string;
  details: string[];
  reference: string;
}

export interface MuharramatItem {
  id: string;
  titleEn: string;
  titleMl: string;
  titleAr: string;
  penaltyCategory: 'takhyir_taqdir' | 'tarteeb_taqdir' | 'tarteeb_tadeel' | 'nikah_no_damm';
  penaltyNameEn: string;
  penaltyNameMl: string;
  penaltyDescriptionEn: string;
  penaltyDescriptionMl: string;
  rules: string[];
}

export interface RitualStep {
  id: number;
  type: 'umrah' | 'hajj';
  dayNameEn?: string;
  dayNameMl?: string;
  hijriDate?: string;
  titleEn: string;
  titleMl: string;
  titleAr: string;
  category: 'fard' | 'wajib' | 'sunnah';
  location: string;
  summaryEn: string;
  summaryMl: string;
  actionsEn: string[];
  actionsMl: string[];
  duas: DuaItem[];
  commonMistakes: string[];
}

// 1. SHUROOT (Prerequisites)
export const HAJJ_UMRAH_SHUROOT: FiqhRuleItem[] = [
  {
    id: 'sharth-islam',
    titleEn: '1. Islam (ഇസ്‌ലാം)',
    titleMl: '1. മുസ്‌ലിമായിരിക്കുക',
    titleAr: 'الإسلام',
    descriptionEn: 'The pilgrim must be a Muslim. Non-believers are not obligated to perform the rituals nor is it valid from them.',
    descriptionMl: 'ഹജ്ജും ഉംറയും നിർബന്ധമാവാനും സാധുവാകാനും ഒന്നാമത്തെ നിബന്ധന മുസ്‌ലിമായിരിക്കുക എന്നതാണ്.',
    details: ['Essential foundation for all acts of worship in Shafi\'i Fiqh.'],
    reference: 'Fath al-Mu\'in, Bab al-Hajj'
  },
  {
    id: 'sharth-bulugh',
    titleEn: '2. Bulugh (പ്രായപൂർത്തി / Puberty)',
    titleMl: '2. പ്രായപൂർത്തിയാവുക (ബുലൂഗ്)',
    titleAr: 'البلوغ',
    descriptionEn: 'Hajj/Umrah performed before puberty is valid as a voluntary act (Sunnah), but does not fulfill the once-in-a-lifetime Farz obligation of Islam.',
    descriptionMl: 'പ്രായപൂർത്തിയാകാത്ത കുട്ടിയുടെ ഹജ്ജ് സാധുവാകുമെങ്കിലും അത് സുന്നത്ത് മാത്രമാണ്; പ്രായപൂർത്തിയായ ശേഷം നിർബന്ധ ഹജ്ജ് വീണ്ടും നിർവ്വഹിക്കണം.',
    details: ['Guardians can assist young children in entering Ihram.'],
    reference: 'Tuhfat al-Muhtaj'
  },
  {
    id: 'sharth-aql',
    titleEn: '3. Aql (ബുദ്ധിസ്ഥിരത / Sanity)',
    titleMl: '3. ബുദ്ധിസ്ഥിരതയുണ്ടായിരിക്കുക',
    titleAr: 'العقل',
    descriptionEn: 'The individual must possess sound mind and mental capacity.',
    descriptionMl: 'മാനസിക ശേഷിയും സമചിത്തതയും ഉള്ളവർക്ക് മാത്രമേ നിർബന്ധമാകൂ.',
    details: ['Insane or unconscious individuals have no obligation.'],
    reference: 'Minhaj at-Talibin'
  },
  {
    id: 'sharth-hurriyyah',
    titleEn: '4. Hurriyyah (സ്വാതന്ത്ര്യം / Freedom)',
    titleMl: '4. സ്വതന്ത്രനായിരിക്കുക',
    titleAr: 'الحرية',
    descriptionEn: 'Full personal freedom and autonomy to travel without servitude constraints.',
    descriptionMl: 'വ്യക്തിപരമായ സ്വാതന്ത്ര്യം ഉണ്ടായിരിക്കുക.',
    details: ['Classical prerequisite of obligation.'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'sharth-istitaah',
    titleEn: '5. Istita\'ah (കഴിവ് / Ability & Capability)',
    titleMl: '5. വഴിയിലെ സുരക്ഷിതത്വവും സാമ്പത്തിക ശാരീരിക ശേഷിയും (ഇസ്തിത്വോഅത്ത്)',
    titleAr: 'الاستطاعة',
    descriptionEn: 'Capacity comprising: 1. Sufficient lawful wealth for travel and family maintenance, 2. Physical health, 3. Safe route (Amn at-Tariq), 4. Transportation availability, 5. For women, accompaniment by Mahram, husband, or trusted trustworthy group of women (Niswah Thiqat) in Shafi\'i madhhab.',
    descriptionMl: 'കഴിവ് എന്നത് 5 കാര്യങ്ങളാൽ പൂർത്തിയാകുന്നു: 1. ചെലവിനുള്ള ശുദ്ധമായ സമ്പത്ത്, 2. യാത്രയിലുടനീളം കുടുംബത്തിന്റെ ചെലവ്, 3. ശാരീരിക ആരോഗ്യം, 4. വഴിയിലെ നിർഭയത്വം, 5. സ്ത്രീകൾക്ക് ഭർത്താവോ മഹ്റമോ അല്ലെങ്കിൽ വിശ്വസ്തരായ സ്ത്രീ സംഘമോ കൂടെയുണ്ടായിരിക്കൽ.',
    details: [
      'Shafi\'i Fiqh explicitly permits a woman performing her obligatory first Hajj to travel with a reliable company of trustworthy women (Niswah Thiqat) if a Mahram is unavailable.'
    ],
    reference: 'Fath al-Mu\'in & Al-Majmu\''
  }
];

// 2. ARKAAN / FARZ (Pillars)
export const HAJJ_ARKAAN: FiqhRuleItem[] = [
  {
    id: 'arkan-hajj-1',
    titleEn: '1. Ihram with Intention (ഇഹ്‌റാം നിയ്യത്ത്)',
    titleMl: '1. ഹജ്ജിന്റെ ഇഹ്‌റാം ചെയ്യൽ (നിയ്യത്ത്)',
    titleAr: 'الإحرام مع النية',
    descriptionEn: 'Forming the internal intention in the heart to enter the sacred pilgrim state of Hajj.',
    descriptionMl: 'ഹജ്ജ് നിർവ്വഹിക്കാനായി മനസ്സിൽ കരുതി ഇഹ്‌റാമിൽ പ്രവേശിക്കൽ. (നവൈതുൽ ഹജ്ജ വ അഹ്റമ്തു ബിഹീ ലില്ലാഹി തആലാ).',
    details: ['Forming intention is an indispensable pillar. Without it, Hajj is void.'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'arkan-hajj-2',
    titleEn: '2. Wuqoof at Arafah (അറഫാ സംഗമം)',
    titleMl: '2. അറഫയിൽ നിൽക്കൽ (വുഖൂഫ്)',
    titleAr: 'الوقوف بعرفة',
    descriptionEn: 'Being physically present inside the boundaries of Arafah for any moment between the Zawal (meridian sun) of 9th Dhul Hijjah and the true dawn (Fajr) of 10th Dhul Hijjah (Eid Day).',
    descriptionMl: 'ദുൽഹിജ്ജ 9-ന് ളുഹ്‌റിന്റെ സമയം മുതൽ ദുൽഹിജ്ജ 10-ന്റെ സുബ്ഹിക്ക് മുമ്പുള്ള ഏത് സമയത്തും അറഫയുടെ അതിർത്തിക്കുള്ളിൽ അൽപ്പ സമയമെങ്കിലും സന്നിഹിതനാവുക. "അൽ-ഹജ്ജു അറഫാ".',
    details: ['Missing Wuqoof completely nullifies Hajj with no expiation substitute.'],
    reference: 'Sahih Hadith: "Al-Hajju Arafah" / Tuhfah'
  },
  {
    id: 'arkan-hajj-3',
    titleEn: '3. Tawaf al-Ifadah (ത്വവാഫുൽ ഇഫാള)',
    titleMl: '3. ത്വവാഫുൽ ഇഫാള (ഹജ്ജിന്റെ ഫർള് ത്വവാഫ്)',
    titleAr: 'طواف الإفاضة',
    descriptionEn: 'Circumambulating the Kaaba 7 times with wudu after midnight of Eid night (10th Dhul Hijjah) and Wuqoof at Arafah.',
    descriptionMl: 'അറഫാ വുഖൂഫിനും പത്താം രാവിന്റെ പകുതിക്കും ശേഷം കഅ്ബക്ക് ചുറ്റും വുളൂഓടെ 7 വട്ടം ത്വവാഫ് ചെയ്യൽ.',
    details: ['Prerequisites of Tawaf: Ritual wudu, covering Awrah, keeping Kaaba on left outside Hijr Ismail.'],
    reference: 'Minhaj at-Talibin'
  },
  {
    id: 'arkan-hajj-4',
    titleEn: '4. Sa\'i between Safa and Marwah (സഈ ചെയ്യൽ)',
    titleMl: '4. സ്വഫാ-മർവ്വക്കിടയിൽ സഈ ചെയ്യൽ',
    titleAr: 'السعي بين الصفا والمروة',
    descriptionEn: 'Walking 7 laps starting at Safa and ending at Marwah, performed after a valid Tawaf (either Tawaf al-Qudum or Tawaf al-Ifadah).',
    descriptionMl: 'ത്വവാഫിന് ശേഷം സ്വഫായിൽ നിന്ന് തുടങ്ങി മർവ്വയിൽ അവസാനിക്കുന്ന വിധം 7 തവണ സഈ ചെയ്യൽ.',
    details: ['Lap 1: Safa->Marwah, Lap 2: Marwah->Safa ... Lap 7: Ends at Marwah.'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'arkan-hajj-5',
    titleEn: '5. Halq or Taqsir (മുടി കളയൽ / മുറിക്കൽ)',
    titleMl: '5. മുടി കളയലോ മുറിക്കലോ (ഹൽഖ് / തഖ്സീർ)',
    titleAr: 'الحلق أو التقصير',
    descriptionEn: 'Removing at least 3 hairs from the head by shaving (Halq - highly recommended for men) or trimming (Taqsir - recommended for women). Shafi\'i madhhab counts this as a fundamental pillar (Rukn).',
    descriptionMl: 'തലയിൽ നിന്ന് ചുരുങ്ങിയത് 3 മുടിയെങ്കിലും വടിക്കുകയോ മുറിക്കുകയോ ചെയ്യൽ. ഷാഫിഈ മദ്ഹബിൽ ഇത് ഒരു ഫർളായ റുക്‌നാണ്.',
    details: ['Valid after midnight of Eid night (10th Dhul Hijjah).'],
    reference: 'Tuhfat al-Muhtaj'
  },
  {
    id: 'arkan-hajj-6',
    titleEn: '6. Tarteeb / Sequential Order (തർതീബ്)',
    titleMl: '6. ക്രമം പാലിക്കൽ (തർതീബ്)',
    titleAr: 'الترتيب في معظم الأركان',
    descriptionEn: 'Maintaining sequence: Ihram precedes all, Wuqoof at Arafah precedes Tawaf al-Ifadah and Halq, and Tawaf precedes Sa\'i (if Sa\'i was not performed after Tawaf al-Qudum).',
    descriptionMl: 'ഇഹ്‌റാം മറ്റെല്ലാറ്റിനും മുമ്പും, അറഫാ വുഖൂഫ് ത്വവാഫിനും മുടി മുറിക്കലിനും മുമ്പും, ത്വവാഫ് സഈയിന് മുമ്പും ചെയ്യൽ.',
    details: ['Rukn in the Shafi\'i school.'],
    reference: 'Fath al-Mu\'in'
  }
];

export const UMRAH_ARKAAN: FiqhRuleItem[] = [
  {
    id: 'arkan-umrah-1',
    titleEn: '1. Ihram with Intention (ഇഹ്‌റാം)',
    titleMl: '1. ഇഹ്‌റാം ചെയ്യൽ (ഉംറയുടെ നിയ്യത്ത്)',
    titleAr: 'الإحرام',
    descriptionEn: 'Intention for Umrah: "Nawaytul-\'Umrata wa ahramtu biha lillahi Ta\'ala".',
    descriptionMl: 'മനസ്സിൽ ഉംറ കരുതലും തൽബിയ്യത്ത് ചൊല്ലലും.',
    details: ['Must occur at or before reaching the Miqat boundary.'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'arkan-umrah-2',
    titleEn: '2. Tawaf around the Kaaba (ത്വവാഫ്)',
    titleMl: '2. കഅ്ബക്ക് ചുറ്റും 7 തവണ ത്വവാഫ് ചെയ്യൽ',
    titleAr: 'الطواف',
    descriptionEn: '7 complete counter-clockwise circuits starting from the Black Stone in complete wudu.',
    descriptionMl: 'ശുദ്ധിയോടെ ഹജറുൽ അസ്‌വദിൽ നിന്ന് തുടങ്ങി 7 തവണ കഅ്ബ പ്രദക്ഷിണം ചെയ്യൽ.',
    details: ['Wudu is an absolute condition for validity.'],
    reference: 'Minhaj at-Talibin'
  },
  {
    id: 'arkan-umrah-3',
    titleEn: '3. Sa\'i between Safa and Marwah (സഈ)',
    titleMl: '3. സ്വഫാ-മർവ്വക്കിടയിലെ സഈ (7 തവണ)',
    titleAr: 'السعي',
    descriptionEn: '7 intervals starting on Mount Safa and ending on Mount Marwah.',
    descriptionMl: 'സ്വഫായിൽ തുടങ്ങി മർവ്വയിൽ അവസാനിക്കുന്ന 7 നടത്തം.',
    details: ['Must be performed after the Umrah Tawaf.'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'arkan-umrah-4',
    titleEn: '4. Halq or Taqsir (മുടി കളയൽ / മുറിക്കൽ)',
    titleMl: '4. മുടി കളയലോ മുറിക്കലോ',
    titleAr: 'الحلق أو التقصير',
    descriptionEn: 'Shaving the head for men or trimming fingertip length for women and men.',
    descriptionMl: 'പുരുഷന്മാർ തല മുണ്ഡനം ചെയ്യൽ കൂടുതൽ ശ്രേഷ്ഠം; സ്ത്രീകൾ വിരൽത്തുമ്പളവ് മുടി മുറിക്കൽ.',
    details: ['Exits the pilgrim completely from the state of Ihram for Umrah.'],
    reference: 'Tuhfah'
  },
  {
    id: 'arkan-umrah-5',
    titleEn: '5. Tarteeb / Order (തർതീബ്)',
    titleMl: '5. ഈ ക്രമം അതേപടി പാലിക്കൽ',
    titleAr: 'الترتيب',
    descriptionEn: 'Observing the exact order: Ihram -> Tawaf -> Sa\'i -> Halq/Taqsir.',
    descriptionMl: 'ഇഹ്‌റാം, ത്വവാഫ്, സഈ, മുടി മുറിക്കൽ എന്ന ക്രമം പാലിക്കൽ.',
    details: ['Pillar in Shafi\'i Madhhab.'],
    reference: 'Fath al-Mu\'in'
  }
];

// 3. WAJIBAT (Duties)
export const HAJJ_WAJIBAT: FiqhRuleItem[] = [
  {
    id: 'wajib-hajj-1',
    titleEn: '1. Ihram from the Designated Miqat (മീഖാത്തുകളിൽ നിന്ന് ഇഹ്‌റാം)',
    titleMl: '1. നിർദ്ദിഷ്ട മീഖാത്തുകളിൽ നിന്ന് ഇഹ്‌റാമിൽ പ്രവേശിക്കൽ',
    titleAr: 'الإحرام من الميقات المكاني',
    descriptionEn: 'Entering Ihram at or before the canonical geographic boundaries (Dhul Hulaifah/Abyar Ali, Al-Juhfah/Rabigh, Qarn al-Manazil/As-Sail, Yalamlam, Dhat Irq). Crossing without Ihram requires Damm (slaughtering a sheep).',
    descriptionMl: 'തനിക്ക് ബാധകമായ മീഖാത്ത് അതിർത്തിയിൽ നിന്നോ അതിന് മുമ്പോ ഇഹ്‌റാം ചെയ്യൽ. മീഖാത്ത് വിട്ടുപോയാൽ ദമ്മ് (ബലി) നിർബന്ധമാകും.',
    details: ['For air travelers from India/Kerala, enter Ihram before plane crosses Yalamlam/Qarn al-Manazil.'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'wajib-hajj-2',
    titleEn: '2. Overnight stay in Muzdalifah (മുസ്ദലിഫയിലെ രാത്രി പാർക്കൽ / മബീത്ത്)',
    titleMl: '2. മുസ്ദലിഫയിൽ ദുൽഹിജ്ജ 10-ന്റെ രാവിന്റെ പകുതിക്ക് ശേഷം അൽപ്പനേരം തങ്ങൽ',
    titleAr: 'المبيت بمزدلفة',
    descriptionEn: 'Remaining in Muzdalifah for at least a brief moment after midnight of 10th Dhul Hijjah.',
    descriptionMl: 'പത്താം രാവിന്റെ പകുതിക്ക് ശേഷം അൽപ്പസമയമെങ്കിലും മുസ്ദലിഫയിൽ തങ്ങൽ വാജിബാണ്.',
    details: ['Sunnah to pick 70 small pebbles (Hasa al-Khadhaf) here for Jamarat.'],
    reference: 'Minhaj at-Talibin'
  },
  {
    id: 'wajib-hajj-3',
    titleEn: '3. Ramy Jamarat al-Aqaba on Eid Day (പത്താം നാളിലെ ജംറതുൽ അഖബ എറിയൽ)',
    titleMl: '3. പെരുന്നാൾ ദിനത്തിൽ (10th) ജംറതുൽ അഖബയിൽ 7 കല്ലെറിയൽ',
    titleAr: 'رمي جمرة العقبة يوم النحر',
    descriptionEn: 'Throwing 7 pebbles one by one into the basin of Jamarat al-Aqaba on 10th Dhul Hijjah after midnight.',
    descriptionMl: 'ഓരോ കല്ലിനൊപ്പവും തക്ബീർ (അല്ലാഹു അക്ബർ) ചൊല്ലി ഓരോന്നായി എറിയുക.',
    details: ['Time extends throughout the day until sunset.'],
    reference: 'Tuhfah'
  },
  {
    id: 'wajib-hajj-4',
    titleEn: '4. Overnight stay in Mina during Tashreeq (മിനായിലെ രാത്രി പാർക്കൽ)',
    titleMl: '4. തശ്‌രീഖിന്റെ രാവുകളിൽ മിനായിൽ കൂടുതൽ സമയവും തങ്ങൽ (മബീത്ത്)',
    titleAr: 'المبيت بمنى ليالي أيام التشريق',
    descriptionEn: 'Spending the majority of the nights of 11th, 12th (and 13th for those not taking early departure Nafar Awwal) in Mina.',
    descriptionMl: '11, 12 രാവുകളിലും നഫറുൽ അവ്വൽ ചെയ്യാത്തവർ 13-ാം രാവിലും മിനായിൽ ഭൂരിഭാഗം സമയവും രാപ്പാർക്കൽ.',
    details: ['Leaving Mina without a valid excuse before dawn incurs expiation (Damm).'],
    reference: 'Fath al-Mu\'in'
  },
  {
    id: 'wajib-hajj-5',
    titleEn: '5. Ramy of the 3 Jamarat on Tashreeq Days (തശ്‌രീഖ് ദിവസങ്ങളിലെ 3 ജംറകളിലെ ഏറ്)',
    titleMl: '5. തശ്‌രീഖ് ദിനങ്ങളിൽ മൂന്ന് ജംറകളിലും 7 വീതം (മൊത്തം 21) കല്ലെറിയൽ',
    titleAr: 'رمي الجمرات الثلاث في أيام التشريق',
    descriptionEn: 'Throwing 7 pebbles at each of the 3 pillars (Sughra -> Wusta -> Kubra/Aqaba = 21 stones daily) starting after Zawal (meridian sun).',
    descriptionMl: 'ളുഹ്‌റ് സമയം ആരംഭിച്ച ശേഷം ക്രമപ്രകാരം: ഒന്നാം ജംറ (7) -> രണ്ടാം ജംറ (7) -> മൂന്നാം ജംറ (7).',
    details: ['Supplication with raised hands after 1st and 2nd Jamarat is Sunnah.'],
    reference: 'Minhaj at-Talibin'
  },
  {
    id: 'wajib-hajj-6',
    titleEn: '6. Tawaf al-Wada\' / Farewell Tawaf (വിടനൽകൽ ത്വവാഫ്)',
    titleMl: '6. മക്കയിൽ നിന്ന് മടങ്ങുമ്പോൾ ത്വവാഫുൽ വിദാഅ് ചെയ്യൽ',
    titleAr: 'طواف الوداع',
    descriptionEn: 'Performing 7 circuits around the Kaaba right before final departure from Makkah al-Mukarramah.',
    descriptionMl: 'മക്ക വിട്ടുപോകുമ്പോൾ ഏറ്റവും അവസാനത്തെ കർമ്മമായി ത്വവാഫ് ചെയ്യൽ. (ആർത്തവകാരികൾക്ക് ഇളവുണ്ട്).',
    details: ['Menstruating women are exempt with no sin or penalty.'],
    reference: 'Fath al-Mu\'in'
  }
];

// 4. MUHARRAMAT (Prohibitions of Ihram & Expiations)
export const MUHARRAMAT_LIST: MuharramatItem[] = [
  {
    id: 'muharram-1',
    titleEn: '1. Wearing Stitched / Form-Fitting Garments (for Men)',
    titleMl: '1. തുന്നിയതോ ഉടലിന്റെ ആകൃതിയിലുള്ളതോ ആയ വസ്ത്രം ധരിക്കൽ (പുരുഷന്മാർക്ക്)',
    titleAr: 'لبس المخيط للرجال',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Damm Takhyir & Taqdir',
    penaltyNameMl: 'തഖ്‌യീറും തഖ്ദീറുമുള്ള ദമ്മ് (തിരഞ്ഞെടുപ്പുള്ള ബലി)',
    penaltyDescriptionEn: 'Option between: 1. Slaughtering 1 sheep in the Haram, OR 2. Feeding 6 poor people of the Haram (2 Mudd / 1.6kg foodgrain each), OR 3. Fasting 3 days anywhere.',
    penaltyDescriptionMl: 'തിരഞ്ഞെടുക്കാം: 1. ഹറമിൽ ഒരാടിനെ അറുക്കുക, അല്ലെങ്കിൽ 2. ഹറമിലെ 6 സാധുക്കൾക്ക് 2 മുദ്ദ് വീതം ഭക്ഷണം നൽകുക, അല്ലെങ്കിൽ 3. മൂന്ന് ദിവസം നോമ്പനുഷ്ഠിക്കുക.',
    rules: ['Men must not wear shirts, trousers, underwear, jackets, gloves, or socks enclosing ankles.']
  },
  {
    id: 'muharram-2',
    titleEn: '2. Covering the Head (for Men)',
    titleMl: '2. പുരുഷന്മാർ തലയോ തലയുടെ ഭാഗമോ മറക്കൽ',
    titleAr: 'تغطية الرأس للرجال',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Damm Takhyir & Taqdir',
    penaltyNameMl: 'തഖ്‌യീറും തഖ്ദീറുമുള്ള ദമ്മ്',
    penaltyDescriptionEn: '1 Sheep OR Feeding 6 poor people OR Fasting 3 days.',
    penaltyDescriptionMl: 'ആട് അറുക്കൽ / 6 സാധുക്കൾക്ക് ഭക്ഷണം / 3 നോമ്പ്.',
    rules: ['Caps, turbans, hats, hood, or headbands are prohibited. Umbrellas and shading without touching head are permissible.']
  },
  {
    id: 'muharram-3',
    titleEn: '3. Covering Face or Hands with Gloves (for Women)',
    titleMl: '3. സ്ത്രീകൾ മുഖമോ കയ്യുറ കൊണ്ട് കൈപ്പത്തിയോ മറക്കൽ',
    titleAr: 'تغطية الوجه والقفازين للمرأة',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Damm Takhyir & Taqdir',
    penaltyNameMl: 'തഖ്‌യീറും തഖ്ദീറുമുള്ള ദമ്മ്',
    penaltyDescriptionEn: '1 Sheep OR Feeding 6 poor people OR Fasting 3 days.',
    penaltyDescriptionMl: 'ആട് അറുക്കൽ / 6 സാധുക്കൾക്ക് ഭക്ഷണം / 3 നോമ്പ്.',
    rules: ['Women can drape a veil without touching the facial skin directly in front of non-mahram men according to Shafi\'i rules.']
  },
  {
    id: 'muharram-4',
    titleEn: '4. Applying Perfume, Fragrance or Scent',
    titleMl: '4. ശരീരത്തിലോ വസ്ത്രത്തിലോ സുഗന്ധം ഉപയോഗിക്കൽ',
    titleAr: 'الطيب في البدن أو الثوب',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Damm Takhyir & Taqdir',
    penaltyNameMl: 'തഖ്‌യീറും തഖ്ദീറുമുള്ള ദമ്മ്',
    penaltyDescriptionEn: '1 Sheep OR Feeding 6 poor people OR Fasting 3 days.',
    penaltyDescriptionMl: 'ആട് അറുക്കൽ / 6 സാധുക്കൾക്ക് ഭക്ഷണം / 3 നോമ്പ്.',
    rules: ['Includes scented soaps, perfumes, colognes, attar, scented tissues, or scented lotions.']
  },
  {
    id: 'muharram-5',
    titleEn: '5. Oiling Hair or Beard',
    titleMl: '5. തലമുടിയിലോ താടിയിലോ എണ്ണ തേക്കൽ',
    titleAr: 'ادهان شعر الرأس أو اللحية',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Damm Takhyir & Taqdir',
    penaltyNameMl: 'തഖ്‌യീറും തഖ്ദീറുമുള്ള ദമ്മ്',
    penaltyDescriptionEn: '1 Sheep OR Feeding 6 poor people OR Fasting 3 days.',
    penaltyDescriptionMl: 'ആട് അറുക്കൽ / 6 സാധുക്കൾക്ക് ഭക്ഷണം / 3 നോമ്പ്.',
    rules: ['Oiling head hair or beard with any oil (even unscented coconut/olive oil) is forbidden while in Ihram.']
  },
  {
    id: 'muharram-6',
    titleEn: '6. Trimming, Cutting or Plucking Hair',
    titleMl: '6. ശരീരത്തിലെ ഏതെങ്കിലും ഭാഗത്തെ രോമം നീക്കം ചെയ്യൽ',
    titleAr: 'إزالة الشعر من الرأس أو الجسد',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Graded Damm based on quantity',
    penaltyNameMl: 'എണ്ണത്തിനനുസരിച്ചുള്ള ദമ്മ്',
    penaltyDescriptionEn: 'Removing 1 hair: 1 Mudd of grain. Removing 2 hairs: 2 Mudds. Removing 3 or more hairs: Full Damm (1 Sheep OR Feeding 6 poor people OR 3 Fasting days).',
    penaltyDescriptionMl: 'ഒരു മുടി: 1 മുദ്ദ് ഭക്ഷണം. 2 മുടി: 2 മുദ്ദ് ഭക്ഷണം. 3 അതിലധികമോ മുടി: പൂർണ്ണ ദമ്മ് (ആട്/6 സാധുക്കൾ/3 നോമ്പ്).',
    rules: ['Do not comb hair aggressively in Ihram to avoid unintentionally shedding hair.']
  },
  {
    id: 'muharram-7',
    titleEn: '7. Clipping or Cutting Nails',
    titleMl: '7. നഖങ്ങൾ മുറിക്കൽ',
    titleAr: 'تقليم الأظفار',
    penaltyCategory: 'takhyir_taqdir',
    penaltyNameEn: 'Graded Damm based on count',
    penaltyNameMl: 'എണ്ണത്തിനനുസരിച്ചുള്ള ദമ്മ്',
    penaltyDescriptionEn: '1 nail: 1 Mudd. 2 nails: 2 Mudds. 3+ nails: Full Damm (1 sheep / 6 poor / 3 fasts).',
    penaltyDescriptionMl: '1 നഖം: 1 മുദ്ദ്. 2 നഖം: 2 മുദ്ദ്. 3 എണ്ണമോ അതിലധികമോ: പൂർണ്ണ ദമ്മ്.',
    rules: ['If a nail is partially broken and causing painful harm, it may be clipped with no sin or penalty.']
  },
  {
    id: 'muharram-8',
    titleEn: '8. Hunting or Killing Wild Terrestrial Game Animals',
    titleMl: '8. വേട്ടയാടലും കാട്ടുമൃഗങ്ങളെ ഉപദ്രവിക്കലും മരങ്ങൾ വെട്ടലും',
    titleAr: 'قتل الصيد البري وقطع شجر الحرم',
    penaltyCategory: 'tarteeb_tadeel',
    penaltyNameEn: 'Damm Tarteeb & Ta\'deel (Equivalent Value)',
    penaltyNameMl: 'തർതീബും തഅ്ദീലുമുള്ള ദമ്മ് (തുല്യ മൂല്യം)',
    penaltyDescriptionEn: 'Slaughtering livestock of equivalent value in Haram -> OR buying food for Haram poor of equal value -> OR fasting 1 day for every Mudd of food value.',
    penaltyDescriptionMl: 'തത്തുല്യമായ വളർത്തുമൃഗത്തെ ബലി നൽകുക -> അല്ലെങ്കിൽ അത്രയും മൂല്യത്തിനുള്ള ഭക്ഷണം ഹറമിലെ സാധുക്കൾക്ക് വിതരണം ചെയ്യുക -> അല്ലെങ്കിൽ ഓരോ മുദ്ദിനും ഓരോ ദിവസത്തെ നോമ്പ്.',
    rules: ['Harmful pests (snake, scorpion, rat, rabid dog, crow) may be killed if threatening.']
  },
  {
    id: 'muharram-9',
    titleEn: '9. Solemnizing a Marriage Contract (Nikah)',
    titleMl: '9. നിക്കാഹ് നടത്തൽ (വിവാഹ ഉടമ്പടി)',
    titleAr: 'عقد النكاح',
    penaltyCategory: 'nikah_no_damm',
    penaltyNameEn: 'Contract is Invalid (Batil) - No Damm',
    penaltyNameMl: 'നിക്കാഹ് അസാധുവാകും (ബാത്വിലാണ്) - ദമ്മില്ല',
    penaltyDescriptionEn: 'The marriage contract executed while in Ihram is invalid and void in Islamic jurisprudence. No sacrificial Damm is required, but marriage must be re-contracted after exiting Ihram.',
    penaltyDescriptionMl: 'ഇഹ്‌റാമിലായിരിക്കെയുള്ള നിക്കാഹ് അസാധുവാണ് (ബാത്വിലാണ്). ഇതിൽ ദമ്മില്ലെങ്കിലും ഇഹ്‌റാമിൽ നിന്ന് വിരമിച്ച ശേഷം വീണ്ടും നിക്കാഹ് കഴിക്കണം.',
    rules: ['A Muhrim cannot marry, nor act as guardian (Wali), nor propose officially in Ihram.']
  },
  {
    id: 'muharram-10',
    titleEn: '10. Marital Intercourse & Sexual Relations',
    titleMl: '10. ലൈംഗിക ബന്ധം (ജിമാഅ്)',
    titleAr: 'الجماع ومقدماته الشهوانية',
    penaltyCategory: 'tarteeb_taqdir',
    penaltyNameEn: 'Damm Tarteeb & Taqdir (Hajj Nullification if before 1st Tahallul)',
    penaltyNameMl: 'ഹജ്ജ് ബാത്വിലാക്കുന്ന ഏറ്റവും ഗൗരവകരമായ ദമ്മ് (ബദന ബലി)',
    penaltyDescriptionEn: 'Intercourse before the First Tahallul (Tahallul Asghar) completely ruins and invalidates the Hajj. The pilgrim MUST still complete the remaining rituals, slaughter a female camel (Badanah) or cow in Haram, and repeat the obligatory Hajj in the subsequent year immediately.',
    penaltyDescriptionMl: 'ഒന്നാം തഹല്ലുലിന് മുമ്പുള്ള ബന്ധപ്പെടൽ ഹജ്ജിനെ ബാത്വിലാക്കും. എന്നിരുന്നാലും ആ ഹജ്ജ് പൂർത്തിയാക്കലും, ഹറമിൽ ഒട്ടകത്തെ ബലി നൽകലും, അടുത്ത വർഷം നിർബന്ധമായും ഖളാഅ് വീട്ടലും വാജിബാണ്.',
    rules: ['Foreplay without penetration before Tahallul requires a sheep (Takhyir/Taqdir) but does not invalidate the Hajj.']
  }
];
