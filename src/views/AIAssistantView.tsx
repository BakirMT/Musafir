import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage, Language } from '../types';
import {
  Bot,
  Send,
  User,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Trash2,
  Share2,
  BookmarkCheck,
  Compass,
  Plane,
  Clock,
  Landmark,
  Shield,
  HelpCircle,
  Languages,
  Loader2,
  WifiOff,
  Wifi,
} from 'lucide-react';

interface MasalaTopic {
  id: string;
  icon: string;
  labels: Record<Language, string>;
  prompt: Record<Language, string>;
}

const MASALA_TOPICS: MasalaTopic[] = [
  {
    id: 'qasr-jama',
    icon: '🕌',
    labels: {
      ml: 'ഖസ്റും ജംഉം',
      ar: 'القصر والجمع',
      en: 'Qasr & Jam\'',
    },
    prompt: {
      ml: 'യാത്രയിൽ ഖസ്റും ജംഉം ആക്കാനുള്ള നിബന്ധനകളും ദൂരവും ഫത്ഹുൽ മുഈൻ, കൻസുർറാഗിബീൻ പ്രകാരം വിശദീകരിക്കുക.',
      ar: 'ما هي شروط ومسافة قصر الصلاة وجمعها في فتح المعين وكنز الراغبين للإمام المحلي؟',
      en: 'What are the conditions and distance for shortening (Qasr) and combining (Jam\') prayers in Fath al-Mu\'in and Kanz al-Raghibin?',
    },
  },
  {
    id: 'plane-train',
    icon: '✈️',
    labels: {
      ml: 'വിമാനത്തിലെ നിസ്കാരം',
      ar: 'الصلاة في الطائرة',
      en: 'Flight & Train',
    },
    prompt: {
      ml: 'വിമാനത്തിലോ ട്രെയിനിലോ നിൽക്കാനും ഖിബ്‌ലയിലേക്ക് തിരിയാനും കഴിഞ്ഞില്ലെങ്കിൽ നിസ്കാരം എങ്ങനെ? ഹുർമത്തുൽ വഖ്തും ഇആദത്തും ഫത്ഹുൽ മുഈൻ അടിസ്ഥാനത്തിൽ വ്യക്തമാക്കുക.',
      ar: 'كيف يصلي المسافر في الطائرة والقطار مع تعذر القيام واستقبال القبلة التام؟ وما حكم حرمة الوقت والإعادة في فتح المعين والمحلي؟',
      en: 'How does a traveller pray on an airplane or train when unable to stand or face Qibla? Explain Hurmat al-Waqt and I\'adah in Fath al-Mu\'in and Kanz al-Raghibin.',
    },
  },
  {
    id: 'boundary',
    icon: '🏙️',
    labels: {
      ml: 'നാട്ടതിർത്തി കടക്കൽ',
      ar: 'مجاوزة العمران',
      en: 'City Boundary',
    },
    prompt: {
      ml: 'എപ്പോഴാണ് യാത്രാ ആനുകൂല്യം ആരംഭിക്കുന്നത്? വീട്ടിൽ വെച്ചോ എയർപോർട്ടിൽ വെച്ചോ ഖസ്റാക്കാമോ? (മുറൂറുൽ ഉംറാൻ - കൻസുർറാഗിബീൻ & ഫത്ഹുൽ മുഈൻ)',
      ar: 'متى يبدأ المسافر في الترخص بالقصر والجمع؟ وهل يترخص في بيته قبل مفارقة البلد؟ (مجاوزة العمران في كنز الراغبين وفتح المعين)',
      en: 'When do travel concessions begin? Can one shorten prayer at home or at the local airport before leaving the city boundary? (Murur al-Umran in Shafi\'i Fiqh)',
    },
  },
  {
    id: 'duration',
    icon: '⏳',
    labels: {
      ml: '4 ദിവസത്തെ നിയമം',
      ar: 'مدة ٤ أيام صحاح',
      en: '4-Day Stay Rule',
    },
    prompt: {
      ml: 'യാത്രയിൽ ഒരു സ്ഥലത്ത് എത്തിയാൽ എത്ര ദിവസം വരെ ഖസ്റും ജംഉം ആക്കാം? 4 ദിവസത്തെ നിയമവും 18 ദിവസത്തെ നിയമവും ഫത്ഹുൽ മുഈൻ പ്രകാരം പറയുക.',
      ar: 'كم مدة الإقامة التي تقطع رخصة السفر؟ بين حكم نية أربعة أيام صحاح وحكم من يتوقع قضاء حاجته (١٨ يوماً) في فتح المعين وكنز الراغبين.',
      en: 'How long can a traveller shorten prayers at a destination? Explain the 4-day rule and the 18-day rule according to Fath al-Mu\'in and Kanz al-Raghibin.',
    },
  },
  {
    id: 'fasting',
    icon: '🌙',
    labels: {
      ml: 'യാത്രയിലെ നോമ്പ്',
      ar: 'صوم المسافر',
      en: 'Travel Fasting',
    },
    prompt: {
      ml: 'റമളാനിൽ യാത്ര ചെയ്യുന്ന ഒരാൾക്ക് നോമ്പ് ഒഴിവാക്കാനുള്ള നിബന്ധനകൾ എന്തൊക്കെയാണ്? സുബ്ഹിക്ക് മുൻപ് യാത്ര തുടങ്ങണമോ? (ഫത്ഹുൽ മുഈൻ)',
      ar: 'ما هي شروط فطر المسافر في شهر رمضان في فتح المعين وكنز الراغبين؟ وهل يشترط مفارقة العمران قبل الفجر؟',
      en: 'What are the Shafi\'i conditions for breaking the fast while travelling in Ramadan according to Fath al-Mu\'in? Does one need to leave before dawn?',
    },
  },
  {
    id: 'tayammum',
    icon: '🏜️',
    labels: {
      ml: 'യാത്രയിലെ തയമ്മും',
      ar: 'تيمم المسافر',
      en: 'Travel Tayammum',
    },
    prompt: {
      ml: 'യാത്രയിലും വിമാനത്തിലും തയമ്മും ചെയ്യുന്നതിന്റെ നിബന്ധനകൾ എന്തൊക്കെയാണ്? വിമാന സീറ്റിലെ പൊടി തയമ്മുമിന് സാധുവാകുമോ? (ഫത്ഹുൽ മുഈൻ)',
      ar: 'ما هي شروط تيمم المسافر في فتح المعين؟ وهل يصح التيمم بغبار مقاعد الطائرة أو الجدران؟',
      en: 'What are the conditions for Tayammum while travelling or flying? Can one use dust on airplane seats according to Fath al-Mu\'in?',
    },
  },
  {
    id: 'resident-imam',
    icon: '👥',
    labels: {
      ml: 'മുഖീമിനെ തുടരൽ',
      ar: 'الاقتداء بمتم',
      en: 'Behind Resident Imam',
    },
    prompt: {
      ml: 'യാത്രക്കാരൻ നാട്ടുകാരനായ (പൂർത്തിയാക്കുന്ന) ഇമാമിനെ തുടർന്നാൽ ഖസ്റാക്കാൻ പറ്റുമോ? അവസാന റക്അത്തിൽ തുടർന്നാലോ? (ഫത്ഹുൽ മുഈൻ & കൻസുർറാഗിബീൻ)',
      ar: 'إذا صلى المسافر خلف إمام مقيم يتم صلاته، هل يلزمه الإتمام؟ وهل يفرق إن أدركه في التشهد الأخير؟ (فتح المعين وكنز الراغبين)',
      en: 'Can a traveller shorten prayer if following a resident (Muqim) Imam? What if they joined in the final Tashahhud? (Fath al-Mu\'in & Kanz al-Raghibin)',
    },
  },
  {
    id: 'friday-jumah',
    icon: '🕌',
    labels: {
      ml: 'വെള്ളിയാഴ്ച യാത്രയും ജുമുഅയും',
      ar: 'سفر الجمعة',
      en: 'Friday Travel & Jum\'ah',
    },
    prompt: {
      ml: 'വെള്ളിയാഴ്ച സുബ്ഹിക്ക് ശേഷം യാത്ര തിരിക്കാമോ? യാത്രക്കാരന് ജുമുഅ നിർബന്ധമാണോ? (ഫത്ഹുൽ മുഈൻ)',
      ar: 'هل يجوز السفر يوم الجمعة بعد الفجر؟ وهل تجب الجمعة على المسافر في طريقه؟ (فتح المعين)',
      en: 'Is it permissible to begin a journey after dawn on Friday? Is Jum\'ah obligatory upon a traveller? (Fath al-Mu\'in)',
    },
  },
];

const SUGGESTED_PROMPTS_BY_LANG: Record<Language, string[]> = {
  ml: [
    'യാത്രയിൽ ഖസ്റും ജംഉം ആക്കാനുള്ള നിബന്ധനകൾ ഫത്ഹുൽ മുഈൻ പ്രകാരം എന്തൊക്കെയാണ്?',
    'വിമാനത്തിലോ ട്രെയിനിലോ നിൽക്കാനും ഖിബ്‌ലയിലേക്ക് തിരിയാനും കഴിഞ്ഞില്ലെങ്കിൽ നിസ്കാരം എങ്ങനെ? (ഹുർമത്തുൽ വഖ്ത് & ഇആദത്ത്)',
    'എപ്പോഴാണ് യാത്രാ ആനുകൂല്യം ആരംഭിക്കുന്നത്? നാട്ടിൽ വെച്ചു തന്നെ ജംഅ് ആക്കാമോ? (കൻസുർറാഗിബീൻ)',
    'ഒരു സ്ഥലത്ത് എത്ര ദിവസം നിന്നാൽ ഖസ്റാക്കാം? 4 ദിവസത്തെ നിയമം വിശദീകരിക്കുക.',
    'യാത്രയിലെ തയമ്മുമിൻ്റെയും റമളാൻ നോമ്പിൻ്റെയും വിധികൾ ഫത്ഹുൽ മുഈൻ അടിസ്ഥാനത്തിൽ പറയുക',
  ],
  en: [
    'What are the conditions for Qasr & Jam\' prayers according to Fath al-Mu\'in and Kanz al-Raghibin?',
    'How should one pray on an airplane if unable to stand or face Qibla? (Hurmat al-Waqt & I\'adah)',
    'When does traveller status begin when departing a city in the Shafi\'i school?',
    'Can a traveller shorten prayer if following a resident (Muqim) Imam?',
    'What are the rulings for fasting while travelling according to Fath al-Mu\'in?',
  ],
  ar: [
    'ما هي شروط قصر الصلاة وجمعها في فتح المعين وكنز الراغبين للإمام المحلي؟',
    'حكم الصلاة في الطائرة والقطار مع تعذر القيام واستقبال القبلة (حرمة الوقت والإعادة)',
    'متى يبدأ المسافر في الترخص بالقصر والجمع في المذهب الشافعي؟',
    'هل يجوز للمسافر القصر إذا ائتم بمقيم يتم صلاته؟',
    'أحكام التيمم والصوم للمسافر في فتح المعين',
  ],
};

const INITIAL_GREETING_BY_LANG: Record<Language, (userName: string, city: string) => string> = {
  ml: (userName, city) => `ബിസ്മില്ലാഹിർറഹ്‌മാനിർറഹീം • അസ്സലാമു അലൈക്കും വരഹ്‌മത്തുല്ലാഹി വബറകാതുഹ്, ${userName}!

ഞാൻ **മുസാഫിർ AI** ആണ്. യാത്രയിലെ കർമ്മശാസ്ത്ര മസ്അലകൾക്ക് (ഖസ്റ്, ജംഅ്, വിമാനത്തിലെയും ട്രെയിനിലെയും നിസ്കാരം, നാട്ടതിർത്തി വിടൽ, 4 ദിവസത്തെ താമസ നിയമം, തയമ്മും, യാത്രയിലെ നോമ്പ്) ശാഫിഈ മദ്ഹബിലെ പ്രാമാണിക ഗ്രന്ഥങ്ങളായ:
- 📖 **ഫത്ഹുൽ മുഈൻ (فتح المعين)** - അല്ലാമ സൈനുദ്ദീൻ മഖ്ദൂം അൽ മലൈബാരി
- 📖 **കൻസുർറാഗിബീൻ (كنز الراغبين)** - ഇമാം ജലാലുദ്ദീൻ അൽ മഹല്ലി
എന്നിവയുടെ അടിസ്ഥാനത്തിൽ കൃത്യമായ പ്രമാണങ്ങളോടെയും അറബിക് ഇബാറത്തുകളോടെയും ഞാൻ മറുപടി നൽകുന്നു.

യാത്രയിലെ ഏതു മസ്അലയും ഇവിടെ ചോദിക്കാം!`,
  en: (userName, city) => `Bismillahir-Rahmanir-Rahim • Assalamu Alaikum wa Rahmatullahi wa Barakatuh, ${userName}!

I am **Musafir AI**, your dedicated Islamic travel jurisprudence scholar. I answer travelling mas'ala (Qasr, Jam', praying on airplanes/trains, travel boundaries, 4-day stay rule, Tayammum, fasting) with verified references from the master classical Shafi'i texts:
- 📖 **Fath al-Mu'in bi Sharh Qurrat al-'Ayn** by Allama Zayn al-Din al-Malibari
- 📖 **Kanz al-Raghibin Sharh Minhaj al-Talibin** by Imam Jalal al-Din al-Mahalli

Ask any travelling mas'ala or pick a topic above to begin!`,
  ar: (userName, city) => `بسم الله الرحمن الرحيم • السلام عليكم ورحمة الله وبركاته، ${userName}!

أنا **مساعد مسافر الذكي**، رفيقك الفقهي والعملي في السفر. أجيبك عن جميع مسائل السفر ورخص الصلاة (القصر، الجمع، الصلاة في الطائرة والقطار، مجاوزة العمران، مدة الإقامة، التيمم، وصوم المسافر) معتمدًا على نصوص أئمة المذهب الشافعي:
- 📖 **فتح المعين بشرح قرة العين** للعلامة أحمد زين الدين المليباري رحمه الله
- 📖 **كنز الراغبين شرح منهاج الطالبين** للإمام جلال الدين المحلي رحمه الله

تفضل بطرح مسألتك الفقهية أو اختر أحد الأبواب أعلاه!`,
};

export const AIAssistantView: React.FC = () => {
  const {
    currentLocation,
    userName,
    language,
    setLanguage,
    offlineModeActive,
    setOfflineRoamingModalOpen,
    t,
  } = useApp();

  const [aiLang, setAiLang] = useState<Language>(language || 'en');
  const [showFiqhGuide, setShowFiqhGuide] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [translatingMsgId, setTranslatingMsgId] = useState<string | null>(null);
  const [translations, setTranslations] = useState<Record<string, Partial<Record<Language, string>>>>({});
  const [activeViewLang, setActiveViewLang] = useState<Record<string, Language | 'original'>>({});

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      role: 'assistant',
      text: INITIAL_GREETING_BY_LANG[language || 'en'](userName, currentLocation.city),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      disclaimer: 'Classical Shafi\'i Fiqh Guidance (Fath al-Mu\'in & Kanz al-Raghibin)',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync initial message if language changes and chat is fresh
  useEffect(() => {
    setAiLang(language);
    if (messages.length === 1 && messages[0].id === 'msg-init') {
      setMessages([
        {
          id: 'msg-init',
          role: 'assistant',
          text: INITIAL_GREETING_BY_LANG[language](userName, currentLocation.city),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          disclaimer: 'Classical Shafi\'i Fiqh Guidance (Fath al-Mu\'in & Kanz al-Raghibin)',
        },
      ]);
    }
  }, [language, userName, currentLocation.city]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown hashes/stars for cleaner audio read
    const cleanText = text
      .replace(/[#*`_>«»]/g, '')
      .replace(/\n\s*\n/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick appropriate voice language
    if (/[\u0D00-\u0D7F]/.test(text) || aiLang === 'ml') {
      utterance.lang = 'ml-IN';
    } else if (/[\u0600-\u06FF]/.test(text) || aiLang === 'ar') {
      utterance.lang = 'ar-SA';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslateMessage = async (msgId: string, originalText: string, targetLang: Language) => {
    // If already cached, switch view language directly
    if (translations[msgId]?.[targetLang]) {
      setActiveViewLang((prev) => ({ ...prev, [msgId]: targetLang }));
      return;
    }

    const actionKey = `${msgId}-${targetLang}`;
    setTranslatingMsgId(actionKey);

    try {
      const response = await fetch('/api/translate-ruling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: originalText,
          targetLang,
        }),
      });

      const data = await response.json();
      const translated = data.translatedText || originalText;

      setTranslations((prev) => ({
        ...prev,
        [msgId]: {
          ...prev[msgId],
          [targetLang]: translated,
        },
      }));
      setActiveViewLang((prev) => ({ ...prev, [msgId]: targetLang }));
    } catch (err) {
      console.error('Error translating ruling:', err);
    } finally {
      setTranslatingMsgId(null);
    }
  };

  const handleClearChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        text: INITIAL_GREETING_BY_LANG[aiLang](userName, currentLocation.city),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: 'Classical Shafi\'i Fiqh Guidance (Fath al-Mu\'in & Kanz al-Raghibin)',
      },
    ]);
  };

  const handleSend = async (messageText?: string) => {
    const query = messageText || input;
    if (!query.trim() || loading) return;

    // Detect if user typed in Malayalam or Arabic
    const activeQueryLang: Language = /[\u0D00-\u0D7F]/.test(query)
      ? 'ml'
      : /[\u0600-\u06FF]/.test(query)
      ? 'ar'
      : aiLang;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
          userLocation: `${currentLocation.city}, ${currentLocation.country}`,
          language: activeQueryLang,
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        text: data.text || 'Could not generate an answer at this moment.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: data.disclaimer || 'Verified with Fath al-Mu\'in & Kanz al-Raghibin (Shafi\'i Fiqh)',
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error fetching chat response:', err);
      const fallbackText =
        activeQueryLang === 'ml'
          ? `### യാത്രാ മസ്അല ചുരുക്കം (ഫത്ഹുൽ മുഈൻ & കൻസുർറാഗിബീൻ)
യാത്രയിൽ 81 കി.മീ (മർഹലത്തൈൻ) ദൂരമുണ്ടെങ്കിൽ 4 റക്അത്തുള്ള നിസ്കാരം 2 റക്അത്തായി ഖസ്റാക്കാനും ജംഅ് ആക്കാനും അനുവാദമുണ്ട്. എന്നാൽ നാട്ടതിർത്തി (സൂറുള്ള അല്ലെങ്കിൽ വീടുകൾ) പിന്നിട്ട ശേഷമേ ഇത് പാടുള്ളൂ. വിമാനത്തിൽ നിൽക്കാനോ ഖിബ്‌ലയിലേക്ക് തിരിയാനോ സാധ്യമല്ലെങ്കിൽ വഖ്തിൻ്റെ പവിത്രത മാനിച്ച് 'ഹുർമത്തുൽ വഖ്ത്' ആയി നിസ്കരിക്കുകയും പിന്നീട് ലാൻഡ് ചെയ്ത ശേഷം മടക്കി നിസ്കരിക്കുകയും (ഇആദത്ത്) വേണം (ഫത്ഹുൽ മുഈൻ & കൻസുർറാഗിബീൻ).`
          : activeQueryLang === 'ar'
          ? `### خلاصة أحكام السفر (فتح المعين وكنز الراغبين)
يجوز للمسافر سفراً طويلاً مباحاً (٨١ كم) قصر الرباعية إلى ركعتين والجمع بين الظهر والعصر وبين المغرب والعشاء. ويشترط مجاوزة سور البلد أو عمرانه. وإذا صلى في الطائرة قاعداً لتعذر القيام والاستقبال صلى لحرمة الوقت وأعاد عند الشافعية.`
          : `### Traveller's Salah Summary (Fath al-Mu'in & Kanz al-Raghibin)
In the Shafi'i school, a permissible journey of at least 81 km (Marhalatayn) permits shortening (Qasr) 4-rak'ah prayers to 2, and combining (Jam') Dhuhr with Asr, and Maghrib with Isha. Concessions begin only upon crossing the city boundary. When praying on an airplane without full standing or Qibla alignment, one prays to respect the time (*Hurmat al-Waqt*) and repeats it (*I'adah*) upon landing.`;

      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        disclaimer: 'Classical Shafi\'i Fiqh Reference (Fath al-Mu\'in & Kanz al-Raghibin)',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topic: MasalaTopic) => {
    const promptText = topic.prompt[aiLang];
    handleSend(promptText);
  };

  const switchLanguage = (lang: Language) => {
    setAiLang(lang);
    setLanguage(lang);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] pb-4 sm:pb-6 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header with Scholarship Authority and Language Selector */}
      <div className="pb-3 border-b border-gray-200 dark:border-gray-800 shrink-0 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F5C4D] to-[#083C34] flex items-center justify-center text-white shadow-md shadow-[#0F5C4D]/25 shrink-0">
              <Bot className="w-5 h-5 text-[#C9A45C]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  {aiLang === 'ml' ? 'മുസാഫിർ AI ഫിഖ്ഹ് സ്കോളർ' : aiLang === 'ar' ? 'مساعد مسافر الذكي للفقه' : 'Musafir AI Scholar'}
                </h2>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>Shafi'i Fiqh Authority</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#6B756F] dark:text-[#9AA9A2]">
                {aiLang === 'ml'
                  ? 'ഫത്ഹുൽ മുഈൻ (സൈനുദ്ദീൻ മഖ്ദൂം) & കൻസുർറാഗിബീൻ (ഇമാം മഹല്ലി)'
                  : aiLang === 'ar'
                  ? 'مسائل السفر موثقة من فتح المعين وكنز الراغبين للمحلي'
                  : 'Travel Mas\'ala verified with Fath al-Mu\'in & Kanz al-Raghibin (Mahalli)'}
              </p>
            </div>
          </div>

          {/* Right Header: Language Switcher, Audio Clear, and Quick Fiqh Guide Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto flex-wrap">
            {/* AI Response Language Selector */}
            <div className="flex items-center p-0.5 bg-gray-100 dark:bg-[#071310] rounded-xl border border-gray-200 dark:border-gray-800 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  aiLang === 'en'
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
                title="English language"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('ml')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  aiLang === 'ml'
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
                title="മലയാളം ഭാഷ"
              >
                മലയാളം
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('ar')}
                className={`px-2.5 py-1 rounded-lg font-arabic transition-all ${
                  aiLang === 'ar'
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
                title="اللغة العربية"
              >
                العربية
              </button>
            </div>

            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              className="p-1.5 sm:p-2 rounded-xl text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Fiqh Quick Reference Button */}
            <button
              onClick={() => setShowFiqhGuide(!showFiqhGuide)}
              className="px-2.5 py-1.5 rounded-xl bg-[#C9A45C]/15 hover:bg-[#C9A45C]/25 text-[#0F5C4D] dark:text-[#E8DCC2] border border-[#C9A45C]/35 text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span className="hidden xs:inline">
                {aiLang === 'ml' ? 'മസ്അല ഗൈഡ്' : aiLang === 'ar' ? 'دليل الفقه' : 'Fiqh Guide'}
              </span>
              {showFiqhGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Collapsible Shafi'i Fiqh Quick Summary Box */}
        {showFiqhGuide && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 text-xs text-gray-800 dark:text-gray-200 space-y-2.5 animate-in slide-in-from-top-2 duration-150">
            <div className="font-extrabold flex items-center justify-between text-[#0F5C4D] dark:text-[#C9A45C]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>
                  {aiLang === 'ml'
                    ? 'ഫത്ഹുൽ മുഈനും കൻസുർറാഗിബീനും വ്യക്തമാക്കുന്ന പ്രധാന യാത്രാ നിയമങ്ങൾ:'
                    : aiLang === 'ar'
                    ? 'القواعد الكلية لصلاة المسافر في فتح المعين وكنز الراغبين للمحلي:'
                    : 'Key Travel Jurisprudence Rules in Fath al-Mu\'in & Kanz al-Raghibin:'}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 font-bold">
                Shafi'i Madhhab
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] leading-relaxed">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-amber-500/20">
                <strong>1. {aiLang === 'ml' ? 'യാത്രാ ദൂരം (മർഹലത്തൈൻ):' : aiLang === 'ar' ? 'مسافة القصر (مرحلتان):' : 'Travel Distance (Marhalatayn):'}</strong>{' '}
                {aiLang === 'ml'
                  ? '16 ഫർസഖ് = ഏകദേശം 81 കിലോമീറ്റർ. ഇതിൽ കുറഞ്ഞ യാത്രയിൽ ഖസ്റോ ജംഓ അനുവദനീയമല്ല.'
                  : aiLang === 'ar'
                  ? '١٦ فرسخاً = ٨١ كم تقريباً، ولا يجوز القصر في أقل منها.'
                  : 'Approx 81 km (16 Farsakhs / 48 Hashimi miles). Shorter trips do not permit Qasr or Jam\'.'}
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-amber-500/20">
                <strong>2. {aiLang === 'ml' ? 'നാട്ടതിർത്തി കടക്കൽ:' : aiLang === 'ar' ? 'مجاوزة العمران:' : 'Boundary Rule (Murur al-Umran):'}</strong>{' '}
                {aiLang === 'ml'
                  ? 'നാടിൻ്റെ പരിധി (മതിലുകളോ വീടുകളോ) വിട്ടുകടക്കാതെ വീട്ടിൽ വെച്ച് ഖസ്റോ ജംഓ ആരംഭിക്കാൻ പാടില്ല.'
                  : aiLang === 'ar'
                  ? 'لا يترخص حتى يجاوز سور البلد أو عمرانه الخالي عن السور.'
                  : 'Concessions begin strictly after passing the city boundary/residential perimeter, not from home.'}
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-amber-500/20">
                <strong>3. {aiLang === 'ml' ? 'വിമാനത്തിലെ നിസ്കാരം (ഹുർമത്തുൽ വഖ്ത്):' : aiLang === 'ar' ? 'الصلاة في الطائرة (حرمة الوقت):' : 'Airplane Prayer (Hurmat al-Waqt):'}</strong>{' '}
                {aiLang === 'ml'
                  ? 'നിൽക്കാനോ ഖിബ്‌ല തിരിയാനോ കഴിഞ്ഞില്ലെങ്കിൽ ഇരുന്നുകൊണ്ട് ഹുർമത്തുൽ വഖ്ത് ആയി നിസ്കരിക്കുകയും പിന്നീട് ഇആദത്ത് ചെയ്യുകയും വേണം.'
                  : aiLang === 'ar'
                  ? 'إذا عجز عن القيام أو القبلة صلى لحرمة الوقت وتلزمه الإعادة بعد النزول.'
                  : 'If unable to stand or face Qibla, pray seated for the time\'s sanctity (*Hurmat al-Waqt*) and repeat (*I\'adah*) upon landing.'}
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-amber-500/20">
                <strong>4. {aiLang === 'ml' ? 'താമസ കാലാവധി (4 ദിവസത്തെ നിയമം):' : aiLang === 'ar' ? 'مدة الإقامة (٤ أيام صحاح):' : '4-Day Stay Rule:'}</strong>{' '}
                {aiLang === 'ml'
                  ? 'പ്രവേശന-പുറപ്പെടൽ ദിനങ്ങളൊഴിച്ച് 4 പൂർണ്ണ ദിവസം തങ്ങാൻ ഉദ്ദേശിച്ചാൽ എത്തിയ ഉടനെ യാത്രാ ഇളവ് തീരും.'
                  : aiLang === 'ar'
                  ? 'نية إقامة أربعة أيام صحاح غير يومي الدخول والخروج تقطع السفر فور الوصول.'
                  : 'Intending 4 complete clear days (excluding arrival & departure) ends concessions upon entering the destination.'}
              </div>
            </div>
          </div>
        )}

        {/* Quick Mas'ala Topic Selector Bar */}
        <div className="overflow-x-auto flex items-center gap-1.5 scrollbar-none pt-0.5">
          {MASALA_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic)}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] text-[11px] font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap shadow-xs hover:bg-[#0F5C4D]/5 flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
            >
              <span>{topic.icon}</span>
              <span>{topic.labels[aiLang]}</span>
            </button>
          ))}
        </div>

        {/* Offline Mode Active Ribbon in Assistant */}
        {offlineModeActive && (
          <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/35 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 min-w-0">
              <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-[11px] font-semibold truncate">
                {aiLang === 'ml'
                  ? 'ഓഫ്‌ലൈൻ റോമിംഗ് സജീവം: ഫത്ഹുൽ മുഈൻ & കൻസുർറാഗിബീൻ ലോക്കൽ എഞ്ചിൻ പ്രവർത്തിക്കുന്നു'
                  : aiLang === 'ar'
                  ? 'وضع عدم الاتصال نشط: يجيب المساعد محلياً بنصوص فتح المعين وكنز الراغبين بدون استهلاك للبيانات'
                  : 'Offline Roaming Active: Musafir AI serves verified Shafi\'i rulings locally with zero data usage.'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOfflineRoamingModalOpen(true)}
              className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg bg-amber-500 text-white shrink-0 shadow-xs"
            >
              Packs
            </button>
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const activeLang = activeViewLang[msg.id];
          const currentText =
            !isUser && activeLang && activeLang !== 'original' && translations[msg.id]?.[activeLang]
              ? translations[msg.id]![activeLang]!
              : msg.text;
          const isArabic = /[\u0600-\u06FF]/.test(currentText);

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-[#0F5C4D] text-white shadow-sm'
                    : 'bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/20 text-[#0F5C4D] dark:text-[#C9A45C]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-3.5 sm:p-5 space-y-2 text-xs sm:text-sm leading-relaxed shadow-sm relative group ${
                  isUser
                    ? 'bg-[#0F5C4D] text-white rounded-tr-none'
                    : 'bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none'
                }`}
                dir={isArabic && !isUser ? 'rtl' : 'ltr'}
              >
                {/* Assistant Verified Badge & Controls */}
                {!isUser && (
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Fath al-Mu'in & Kanz al-Raghibin Authority</span>
                    </span>
                    <div className="flex items-center gap-1">
                      {/* Audio TTS button */}
                      <button
                        onClick={() => handleSpeak(currentText, msg.id)}
                        className={`p-1 rounded-md transition-colors ${
                          speakingId === msg.id
                            ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                            : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                        title={speakingId === msg.id ? 'Stop reading' : 'Read aloud'}
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Copy button */}
                      <button
                        onClick={() => handleCopyText(currentText, msg.id)}
                        className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className={`whitespace-pre-wrap font-normal ${
                    isArabic ? 'font-arabic text-sm sm:text-base leading-loose' : ''
                  }`}
                >
                  {currentText}
                </div>

                {/* Assistant Multi-Language Translation Bar */}
                {!isUser && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-2 mt-2 border-t border-gray-100 dark:border-gray-800 text-[10px]">
                    <span className="flex items-center gap-1 text-[#6B756F] dark:text-[#9AA9A2] font-semibold">
                      <Languages className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>Translate / വിവർത്തനം:</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setActiveViewLang((prev) => ({ ...prev, [msg.id]: 'original' }))}
                      className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                        !activeLang || activeLang === 'original'
                          ? 'bg-[#0F5C4D] text-white shadow-xs'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900'
                      }`}
                    >
                      Original
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTranslateMessage(msg.id, msg.text, 'ml')}
                      disabled={translatingMsgId === `${msg.id}-ml`}
                      className={`px-2 py-0.5 rounded-md font-bold transition-all flex items-center gap-1 ${
                        activeLang === 'ml'
                          ? 'bg-[#0F5C4D] text-white shadow-xs'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900'
                      }`}
                    >
                      {translatingMsgId === `${msg.id}-ml` ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>വിവർത്തനം...</span>
                        </>
                      ) : (
                        'മലയാളം'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTranslateMessage(msg.id, msg.text, 'ar')}
                      disabled={translatingMsgId === `${msg.id}-ar`}
                      className={`px-2 py-0.5 rounded-md font-bold transition-all flex items-center gap-1 font-arabic ${
                        activeLang === 'ar'
                          ? 'bg-[#0F5C4D] text-white shadow-xs'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900'
                      }`}
                    >
                      {translatingMsgId === `${msg.id}-ar` ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>جارٍ الترجمة...</span>
                        </>
                      ) : (
                        'العربية'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTranslateMessage(msg.id, msg.text, 'en')}
                      disabled={translatingMsgId === `${msg.id}-en`}
                      className={`px-2 py-0.5 rounded-md font-bold transition-all flex items-center gap-1 ${
                        activeLang === 'en'
                          ? 'bg-[#0F5C4D] text-white shadow-xs'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-gray-900'
                      }`}
                    >
                      {translatingMsgId === `${msg.id}-en` ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Translating...</span>
                        </>
                      ) : (
                        'English'
                      )}
                    </button>
                  </div>
                )}

                <div
                  className={`text-[10px] pt-1 flex items-center justify-between border-t ${
                    isUser
                      ? 'border-white/15 text-white/70'
                      : 'border-gray-100 dark:border-gray-800 text-[#6B756F] dark:text-[#9AA9A2]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.disclaimer && !isUser && (
                    <span className="italic ml-2 text-[9px] sm:text-[10px] hidden sm:inline truncate max-w-[280px]">
                      {msg.disclaimer}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F7F5EF] dark:bg-[#071310] border border-[#0F5C4D]/20 text-[#0F5C4D] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl p-3.5 sm:p-4 bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-xs text-[#6B756F] dark:text-[#9AA9A2] flex items-center gap-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C9A45C] animate-spin" />
              <span>
                {aiLang === 'ml'
                  ? 'ഫത്ഹുൽ മുഈനും കൻസുർറാഗിബീനും (ഇമാം മഹല്ലി) പരിശോധിച്ച് മറുപടി തയ്യാറാക്കുന്നു...'
                  : aiLang === 'ar'
                  ? 'جارٍ استخراج الحكم وتوثيقه من فتح المعين وكنز الراغبين للإمام المحلي...'
                  : 'Musafir AI is consulting Fath al-Mu\'in and Kanz al-Raghibin...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Query Chips based on Selected Language */}
      <div className="pb-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none shrink-0 pt-1">
        {SUGGESTED_PROMPTS_BY_LANG[aiLang].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D] dark:hover:border-[#C9A45C] text-[11px] font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap shadow-xs hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/25 dark:border-[#C9A45C]/35 shadow-lg flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            aiLang === 'ml'
              ? 'യാത്രാ മസ്അലകൾ (ഖസ്റ്, ജംഅ്, വിമാനത്തിലെ നിസ്കാരം, ഫത്ഹുൽ മുഈൻ) ചോദിക്കുക...'
              : aiLang === 'ar'
              ? 'اسأل عن مسائل السفر والقصر والجمع في فتح المعين والمحلي...'
              : 'Ask any travelling mas\'ala (Qasr, Jam\', flight prayer, Fath al-Mu\'in)...'
          }
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 sm:p-2.5 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white disabled:opacity-40 transition-all shadow-md shadow-[#0F5C4D]/25 active:scale-95 shrink-0 cursor-pointer"
          aria-label="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
