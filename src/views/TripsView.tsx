import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trip, TripActivity, TripDay } from '../types';
import {
  Map,
  Calendar,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Clock,
  Landmark,
  UtensilsCrossed,
  CheckCircle2,
  Circle,
  FileDown,
  WifiOff,
  Compass,
  Copy,
  Share2,
  Check,
  ChevronRight,
  ShieldCheck,
  Info,
  Globe2,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Printer,
  Edit3,
  X,
  Navigation,
  Award,
  CheckSquare,
  Square,
  RotateCcw,
  Zap,
} from 'lucide-react';

const PRESET_DESTINATIONS = [
  { name: 'Istanbul', country: 'Türkiye', flag: '🇹🇷', style: 'Ottoman History & Mosques' },
  { name: 'Makkah & Madinah', country: 'Saudi Arabia', flag: '🇸🇦', style: 'Umrah & Holy Sanctuaries' },
  { name: 'Kochi & Kozhikode', country: 'Kerala, India', flag: '🇮🇳', style: 'Malabar Heritage & Cuisine' },
  { name: 'Kuala Lumpur', country: 'Malaysia', flag: '🇲🇾', style: 'Modern Islamic Architecture & Halal Food' },
  { name: 'Cairo', country: 'Egypt', flag: '🇪🇬', style: 'Al-Azhar, Citadel & Islamic Cairo' },
  { name: 'Dubai & Abu Dhabi', country: 'UAE', flag: '🇦🇪', style: 'Grand Mosques & Cultural Heritage' },
  { name: 'Cordoba & Granada', country: 'Spain', flag: '🇪🇸', style: 'Andalusian Moorish History' },
  { name: 'Tashkent & Samarkand', country: 'Uzbekistan', flag: '🇺🇿', style: 'Silk Road Islamic Architecture' },
  { name: 'London', country: 'United Kingdom', flag: '🇬🇧', style: 'Historic Landmarks & Halal Foodie' },
  { name: 'Tokyo & Kyoto', country: 'Japan', flag: '🇯🇵', style: 'Muslim-Friendly Exploration' },
];

const TRAVEL_STYLES = [
  'Spiritual & Historic Mosques',
  'Ottoman & Classical Heritage',
  'Culinary & Halal Street Food',
  'Family-Friendly Leisure',
  'Scenic Nature & Architecture',
  'Budget Backpacking',
];

const PRAYER_PREFERENCES = [
  { id: 'historic_mosques', label: 'Pray in historic congregational mosques', desc: 'Prioritize famous grand masjids for each salah' },
  { id: 'qasr_shafii', label: 'Shafi\'i Qasr & Jam\' fast-travel mode', desc: 'Combine & shorten prayers during long transit (>81 km)' },
  { id: 'nearby_rooms', label: 'Convenient nearby prayer facilities', desc: 'Select sights within 5 mins walk of clean prayer rooms' },
  { id: 'jumua_focus', label: 'Friday Jumu\'ah priority', desc: 'Schedule Friday midday at the central regional grand mosque' },
];

export const TripsView: React.FC = () => {
  const {
    trips,
    setTrips,
    activeTrip,
    updateTrip,
    currentLocation,
    downloadTripOffline,
    offlineModeActive,
    language,
    t,
  } = useApp();

  const [selectedTripId, setSelectedTripId] = useState(activeTrip?.id || trips[0]?.id || 'trip-1');
  const displayedTrip: Trip = trips.find((t) => t.id === selectedTripId) || activeTrip || trips[0];

  const [activeDayTab, setActiveDayTab] = useState(1);
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Form states for AI itinerary generator
  const [destInput, setDestInput] = useState(currentLocation?.city || 'Istanbul');
  const [countryInput, setCountryInput] = useState(currentLocation?.country || 'Türkiye');
  const [daysInput, setDaysInput] = useState(3);
  const [budgetInput, setBudgetInput] = useState('$600 - $900');
  const [styleInput, setStyleInput] = useState('Spiritual & Historic Mosques');
  const [prayerPref, setPrayerPref] = useState('Pray in historic congregational mosques');
  const [targetLang, setTargetLang] = useState<'en' | 'ml' | 'ar'>(language || 'en');
  const [strictHalalOnly, setStrictHalalOnly] = useState(true);

  // Custom activity addition modal
  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const [newActivitySlot, setNewActivitySlot] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [newActivityText, setNewActivityText] = useState('');
  const [newActivityPrayer, setNewActivityPrayer] = useState('');
  const [newActivityFood, setNewActivityFood] = useState('');
  const [newActivityLocation, setNewActivityLocation] = useState('');

  // Handle AI generation
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setGenerationStep('Connecting with Musafir AI Jurisprudence & Travel Engine...');

    try {
      const stepTimer1 = setTimeout(() => {
        setGenerationStep('Mapping 5 daily Salah windows and congregational mosques...');
      }, 900);

      const stepTimer2 = setTimeout(() => {
        setGenerationStep('Curating verified Halal dining and Shafi\'i travel concessions...');
      }, 1800);

      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destInput,
          country: countryInput,
          days: daysInput,
          budget: budgetInput,
          travelStyle: styleInput,
          prayerPreference: prayerPref,
          language: targetLang,
          strictHalalOnly,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const data = await response.json();
      if (data.plan && Array.isArray(data.plan.days) && data.plan.days.length > 0) {
        // Map AI days into Trip structure
        const newDays: TripDay[] = data.plan.days.map((d: any, idx: number) => {
          const activities: TripActivity[] = [];

          if (d.morning) {
            activities.push({
              id: `act-${idx + 1}-m-${Date.now()}`,
              timeSlot: 'morning',
              activity: d.morning.activity || 'Morning tour and heritage sights.',
              prayerNote: d.morning.prayer || 'Fajr at central mosque',
              halalFoodSpot: d.morning.halalFood || 'Local Halal breakfast cafe',
              locationName: d.morning.landmark || destInput,
              completed: false,
            });
          }

          if (d.afternoon) {
            activities.push({
              id: `act-${idx + 1}-a-${Date.now()}`,
              timeSlot: 'afternoon',
              activity: d.afternoon.activity || 'Afternoon visit to historic monuments.',
              prayerNote: d.afternoon.prayer || 'Dhuhr & Asr prayers in congregation',
              halalFoodSpot: d.afternoon.halalFood || 'Verified Halal traditional lunch',
              locationName: d.afternoon.landmark || destInput,
              completed: false,
            });
          }

          if (d.evening) {
            activities.push({
              id: `act-${idx + 1}-e-${Date.now()}`,
              timeSlot: 'evening',
              activity: d.evening.activity || 'Sunset stroll and cultural market walk.',
              prayerNote: d.evening.prayer || 'Maghrib & Isha prayers',
              halalFoodSpot: d.evening.halalFood || 'Halal dinner & sweets',
              locationName: d.evening.landmark || destInput,
              completed: false,
            });
          }

          if (d.night && d.night.activity) {
            activities.push({
              id: `act-${idx + 1}-n-${Date.now()}`,
              timeSlot: 'night',
              activity: d.night.activity,
              prayerNote: 'Late evening Adhkar & rest',
              locationName: d.night.landmark || 'Promenade / Courtyard',
              completed: false,
            });
          }

          return {
            dayNumber: idx + 1,
            title: d.title || `Day ${idx + 1}: Highlights of ${destInput}`,
            theme: d.theme || 'Spiritual & Cultural Heritage',
            fiqhGuidance: d.fiqhGuidance || data.plan.fiqhAdvice || '',
            activities,
            notes: d.tips || '',
          };
        });

        const newTripId = `trip-${destInput.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
        const newTrip: Trip = {
          id: newTripId,
          title: data.plan.tripTitle || `${daysInput}-Day Muslim Journey to ${destInput}`,
          destination: countryInput ? `${destInput}, ${countryInput}` : destInput,
          country: countryInput || data.plan.country || '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + (daysInput - 1) * 86400000).toISOString().split('T')[0],
          budgetTotal: parseInt(budgetInput.replace(/[^0-9]/g, '')) || 700,
          currency: 'USD',
          days: newDays,
          notes: data.plan.summary || `Personalized ${daysInput}-day Muslim-friendly journey to ${destInput}.`,
          summary: data.plan.summary,
          travelStyle: styleInput,
          islamicHighlights: data.plan.islamicHighlights || [],
          language: targetLang,
          downloadedOffline: false,
        };

        setTrips((prev) => [newTrip, ...prev.filter((t) => t.id !== newTrip.id)]);
        setSelectedTripId(newTrip.id);
        updateTrip(newTrip);
        setActiveDayTab(1);
        setAiGeneratorOpen(false);
      }
    } catch (err) {
      console.error('Failed to generate AI itinerary:', err);
    } finally {
      setGenerating(false);
      setGenerationStep('');
    }
  };

  const handleDownload = () => {
    downloadTripOffline();
    if (displayedTrip) {
      const updated = { ...displayedTrip, downloadedOffline: true };
      updateTrip(updated);
    }
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3500);
  };

  const handleToggleActivity = (actId: string) => {
    if (!displayedTrip) return;
    const updatedDays = displayedTrip.days.map((day) => {
      if (day.dayNumber !== activeDayTab) return day;
      return {
        ...day,
        activities: day.activities.map((act) =>
          act.id === actId ? { ...act, completed: !act.completed } : act
        ),
      };
    });

    const updatedTrip: Trip = { ...displayedTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const handleToggleAllDayActivities = (shouldComplete: boolean) => {
    if (!displayedTrip) return;
    const updatedDays = displayedTrip.days.map((day) => {
      if (day.dayNumber !== activeDayTab) return day;
      return {
        ...day,
        activities: day.activities.map((act) => ({ ...act, completed: shouldComplete })),
      };
    });

    const updatedTrip: Trip = { ...displayedTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const handleDeleteActivity = (actId: string) => {
    if (!displayedTrip) return;
    const updatedDays = displayedTrip.days.map((day) => {
      if (day.dayNumber !== activeDayTab) return day;
      return {
        ...day,
        activities: day.activities.filter((act) => act.id !== actId),
      };
    });

    const updatedTrip: Trip = { ...displayedTrip, days: updatedDays };
    updateTrip(updatedTrip);
  };

  const handleAddCustomActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityText.trim() || !displayedTrip) return;

    const newAct: TripActivity = {
      id: `custom-act-${Date.now()}`,
      timeSlot: newActivitySlot,
      activity: newActivityText.trim(),
      prayerNote: newActivityPrayer.trim() || 'Pray on time with local congregation',
      halalFoodSpot: newActivityFood.trim() || undefined,
      locationName: newActivityLocation.trim() || undefined,
      completed: false,
    };

    const updatedDays = displayedTrip.days.map((day) => {
      if (day.dayNumber !== activeDayTab) return day;
      return {
        ...day,
        activities: [...day.activities, newAct],
      };
    });

    const updatedTrip: Trip = { ...displayedTrip, days: updatedDays };
    updateTrip(updatedTrip);

    setNewActivityText('');
    setNewActivityPrayer('');
    setNewActivityFood('');
    setNewActivityLocation('');
    setAddActivityOpen(false);
  };

  const handleCopyItinerary = () => {
    if (!displayedTrip) return;
    let text = `🕌 ${displayedTrip.title}\n📍 Destination: ${displayedTrip.destination}\n📅 Duration: ${displayedTrip.days.length} Days\n\n`;

    if (displayedTrip.summary) {
      text += `Overview: ${displayedTrip.summary}\n\n`;
    }

    displayedTrip.days.forEach((day) => {
      text += `━━━━━━━━━━━━━━━━━━━━━\n📅 DAY ${day.dayNumber}: ${day.title}\n`;
      if (day.fiqhGuidance) text += `⚖️ Shafi'i Fiqh Guidance: ${day.fiqhGuidance}\n`;
      day.activities.forEach((act) => {
        const checkMark = act.completed ? '✅' : '⬜';
        text += `\n${checkMark} [${act.timeSlot.toUpperCase()}] ${act.activity}\n`;
        text += `   🕌 Prayer: ${act.prayerNote}\n`;
        if (act.halalFoodSpot) text += `   🍽️ Halal Food: ${act.halalFoodSpot}\n`;
      });
      if (day.notes) text += `\n💡 Tips: ${day.notes}\n`;
      text += '\n';
    });

    text += 'Generated with Musafir Smart Islamic Travel Planner • https://musafir.app';

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedDay =
    displayedTrip?.days?.find((d) => d.dayNumber === activeDayTab) || displayedTrip?.days?.[0];

  const completedActivitiesCount =
    selectedDay?.activities?.filter((a) => a.completed).length || 0;
  const totalActivitiesCount = selectedDay?.activities?.length || 0;
  const dayProgressPercentage =
    totalActivitiesCount > 0
      ? Math.round((completedActivitiesCount / totalActivitiesCount) * 100)
      : 0;

  // Total Trip completion calculation
  const allTripActivities = displayedTrip?.days?.flatMap((d) => d.activities) || [];
  const totalTripActsCount = allTripActivities.length;
  const totalTripCompletedCount = allTripActivities.filter((a) => a.completed).length;
  const tripProgressPercentage =
    totalTripActsCount > 0
      ? Math.round((totalTripCompletedCount / totalTripActsCount) * 100)
      : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Trip Switcher Pills & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#6B756F] dark:text-[#9AA9A2] mr-1 shrink-0 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#0F5C4D] dark:text-[#C9A45C]" />
            <span>My Trips:</span>
          </span>
          {trips.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTripId(t.id);
                setActiveDayTab(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                displayedTrip?.id === t.id
                  ? 'bg-[#0F5C4D] text-white shadow-sm ring-2 ring-[#C9A45C]/40'
                  : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
              }`}
            >
              <span>{t.destination.includes('Kerala') || t.id.includes('kerala') ? '🇮🇳' : t.destination.includes('Makkah') ? '🇸🇦' : t.destination.includes('Malaysia') ? '🇲🇾' : '🇹🇷'}</span>
              <span>{t.title.split('—')[0].split(':')[0]}</span>
              {t.downloadedOffline && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Cached for Offline Roaming" />
              )}
            </button>
          ))}
        </div>

        {/* AI Generator CTA Pill */}
        <button
          onClick={() => setAiGeneratorOpen(true)}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#0F5C4D] via-[#0D4B3F] to-[#C9A45C] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md shadow-[#0F5C4D]/25 transition-all hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-[#F2D785] animate-pulse" />
          <span>Generate Muslim-Friendly Itinerary</span>
        </button>
      </div>

      {/* Main Trip Card Header */}
      {displayedTrip && (
        <div className="rounded-3xl p-6 bg-gradient-to-br from-[#0F5C4D]/10 via-white to-amber-500/5 dark:from-[#071D18] dark:via-[#0D1C18] dark:to-[#17231E] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center flex-wrap gap-2 text-xs font-bold text-[#C9A45C]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0F5C4D]/15 dark:bg-[#C9A45C]/15 border border-[#0F5C4D]/25 text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider text-[11px] font-black">
                  ✨ SMART TRAVEL PLANNER AI
                </span>
                {displayedTrip.travelStyle && (
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px]">
                    {displayedTrip.travelStyle}
                  </span>
                )}
                {displayedTrip.downloadedOffline && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[11px] flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Offline Roaming Ready</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
                {displayedTrip.title}
              </h1>

              <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2] flex items-center flex-wrap gap-2">
                <span>📍 <strong>{displayedTrip.destination}</strong></span>
                <span>•</span>
                <span>📅 {displayedTrip.days.length} Days</span>
                <span>•</span>
                <span>💰 Budget: ${displayedTrip.budgetTotal}</span>
                {displayedTrip.language && (
                  <>
                    <span>•</span>
                    <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 font-bold">
                      {displayedTrip.language}
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center flex-wrap gap-2 shrink-0">
              <button
                onClick={handleCopyItinerary}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 flex items-center gap-1.5 transition-all shadow-sm"
                title="Copy trip itinerary"
              >
                {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                <span>{copiedToast ? 'Copied!' : 'Copy'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 flex items-center gap-1.5 transition-all shadow-sm"
                title="Print or export as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-gray-500" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl bg-[#0F5C4D]/10 dark:bg-[#0F5C4D]/25 border border-[#0F5C4D]/30 text-xs font-bold text-[#0F5C4D] dark:text-[#E8DCC2] flex items-center gap-1.5 shadow-sm hover:bg-[#0F5C4D]/20 transition-all active:scale-95"
                title="Cache all data for zero-connectivity offline access"
              >
                <Download className="w-3.5 h-3.5 text-[#C9A45C]" />
                <span>Save Offline</span>
              </button>
            </div>
          </div>

          {/* Overall Journey Completion Tracker */}
          {totalTripActsCount > 0 && (
            <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-[#071310]/90 border border-gray-200 dark:border-gray-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C9A45C]" />
                  <span>Overall Trip Completion</span>
                </span>
                <span className="font-black text-[#0F5C4D] dark:text-[#C9A45C]">
                  {totalTripCompletedCount} of {totalTripActsCount} activities ({tripProgressPercentage}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#0F5C4D] via-[#168a74] to-[#C9A45C] transition-all duration-500 rounded-full"
                  style={{ width: `${tripProgressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Trip Summary & Highlights */}
          {displayedTrip.notes && (
            <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-[#0D1C18]/80 border border-gray-200/80 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{displayedTrip.notes}</p>
            </div>
          )}

          {/* Islamic Highlights Tags */}
          {displayedTrip.islamicHighlights && displayedTrip.islamicHighlights.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="font-bold text-[#C9A45C] text-[11px] uppercase tracking-wider flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" />
                <span>Highlights:</span>
              </span>
              {displayedTrip.islamicHighlights.map((hl, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-xl bg-[#0F5C4D]/10 dark:bg-[#0F5C4D]/20 text-[#0F5C4D] dark:text-[#E8DCC2] font-semibold text-[11px] border border-[#0F5C4D]/15"
                >
                  ✓ {hl}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {downloadSuccessToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Trip itinerary, prayer schedule, and offline places downloaded successfully! Accessible in Offline Roaming mode.</span>
        </div>
      )}

      {/* Day Navigation Tabs with Mini Completion Ring */}
      {displayedTrip && displayedTrip.days && (
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2">
            {displayedTrip.days.map((day) => {
              const acts = day.activities || [];
              const doneCount = acts.filter((a) => a.completed).length;
              const isAllDone = acts.length > 0 && doneCount === acts.length;

              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setActiveDayTab(day.dayNumber)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeDayTab === day.dayNumber
                      ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25 ring-2 ring-[#C9A45C]/30'
                      : isAllDone
                      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>Day {day.dayNumber}</span>
                  {acts.length > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                        activeDayTab === day.dayNumber
                          ? 'bg-white/20 text-white'
                          : isAllDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {isAllDone ? '✓ Done' : `${doneCount}/${acts.length}`}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setAddActivityOpen(true)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-[#0D1C18] border border-dashed border-[#0F5C4D]/40 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C] hover:bg-[#0F5C4D]/5 flex items-center gap-1.5 shrink-0 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Activity</span>
          </button>
        </div>
      )}

      {/* Selected Day Timeline Card */}
      {selectedDay && (
        <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-6">
          {/* Day Header & Visual Progress Tracker */}
          <div className="space-y-4 pb-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-[#C9A45C] uppercase tracking-wider">
                    DAY {selectedDay.dayNumber} OF {displayedTrip.days.length}
                  </span>
                  {selectedDay.theme && (
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      • {selectedDay.theme}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
                  {selectedDay.title}
                </h2>
              </div>

              {/* Day Quick Action Toggles */}
              {totalActivitiesCount > 0 && (
                <div className="flex items-center gap-2">
                  {completedActivitiesCount < totalActivitiesCount ? (
                    <button
                      onClick={() => handleToggleAllDayActivities(true)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>Check All ({totalActivitiesCount})</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleAllDayActivities(false)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Day</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Visual Day Progress Bar with Dynamic Color */}
            {totalActivitiesCount > 0 && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-emerald-50/50 dark:from-[#071310] dark:to-[#0D1C18] border border-gray-200/90 dark:border-gray-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-gray-800 dark:text-gray-200">
                      Day {selectedDay.dayNumber} Completion Tracker
                    </span>
                    {dayProgressPercentage === 100 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider animate-bounce">
                        🎉 Day Complete!
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400 font-semibold">
                      {completedActivitiesCount} of {totalActivitiesCount} done
                    </span>
                    <span className="font-black text-sm text-[#0F5C4D] dark:text-[#C9A45C]">
                      {dayProgressPercentage}%
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full h-3 rounded-full bg-gray-200/80 dark:bg-gray-800 overflow-hidden shadow-inner relative">
                  <div
                    className={`h-full transition-all duration-500 rounded-full shadow-sm ${
                      dayProgressPercentage === 100
                        ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400'
                        : dayProgressPercentage >= 50
                        ? 'bg-gradient-to-r from-[#0F5C4D] to-emerald-500'
                        : 'bg-gradient-to-r from-[#C9A45C] to-[#0F5C4D]'
                    }`}
                    style={{ width: `${dayProgressPercentage}%` }}
                  />
                </div>

                {/* Day 100% Celebration Banner */}
                {dayProgressPercentage === 100 && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between animate-in fade-in duration-300">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Masha'Allah! All Day {selectedDay.dayNumber} activities, prayers & sights completed!</span>
                    </div>
                    {activeDayTab < displayedTrip.days.length && (
                      <button
                        onClick={() => setActiveDayTab(activeDayTab + 1)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-black hover:bg-emerald-700 flex items-center gap-1 shadow-sm shrink-0"
                      >
                        <span>Next Day</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Shafi'i Fiqh Guidance Ribbon for this Day */}
          {selectedDay.fiqhGuidance && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-[#1A1810] border border-amber-200 dark:border-amber-900/40 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold uppercase tracking-wider text-[10px] text-amber-700 dark:text-amber-400 block">
                  Shafi'i Fiqh & Travel Concession Notice
                </span>
                <p className="font-medium mt-0.5 leading-relaxed">{selectedDay.fiqhGuidance}</p>
              </div>
            </div>
          )}

          {/* Timeline Activities List */}
          <div className="space-y-4">
            {selectedDay.activities.map((act) => {
              const isMorning = act.timeSlot === 'morning';
              const isAfternoon = act.timeSlot === 'afternoon';
              const isEvening = act.timeSlot === 'evening';
              const isNight = act.timeSlot === 'night';

              return (
                <div
                  key={act.id}
                  className={`rounded-2xl p-4 sm:p-5 border transition-all relative overflow-hidden ${
                    act.completed
                      ? 'bg-emerald-500/10 dark:bg-emerald-950/20 border-emerald-500/40 shadow-sm ring-1 ring-emerald-500/20'
                      : 'bg-[#F7F5EF] dark:bg-[#071310] border-gray-200/80 dark:border-gray-800 hover:border-[#0F5C4D]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Time Slot Badge & Location */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                          isMorning
                            ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25'
                            : isAfternoon
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25'
                            : isEvening
                            ? 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/25'
                            : 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25'
                        }`}
                      >
                        {isMorning && <Sun className="w-3 h-3 text-amber-500" />}
                        {isAfternoon && <Sun className="w-3 h-3 text-blue-500" />}
                        {isEvening && <Sunset className="w-3 h-3 text-purple-500" />}
                        {isNight && <Moon className="w-3 h-3 text-indigo-500" />}
                        <span>{act.timeSlot}</span>
                      </span>

                      {act.locationName && (
                        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Landmark className="w-3 h-3 text-[#C9A45C]" />
                          <span>{act.locationName}</span>
                        </span>
                      )}

                      {act.completed && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Done</span>
                        </span>
                      )}
                    </div>

                    {/* Completion Checkmark & Delete button */}
                    <div className="flex items-center gap-2">
                      {/* Interactive Tactile Checkbox Button */}
                      <button
                        onClick={() => handleToggleActivity(act.id)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                          act.completed
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 ring-2 ring-emerald-400/40'
                            : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50'
                        }`}
                        title={act.completed ? 'Click to uncheck' : 'Click to mark activity completed'}
                      >
                        {act.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-xs">
                          {act.completed ? 'Completed' : 'Mark Done'}
                        </span>
                      </button>

                      <button
                        onClick={() => handleDeleteActivity(act.id)}
                        className="p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                        title="Remove activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Activity Description */}
                  <p
                    className={`text-sm font-bold text-gray-900 dark:text-gray-100 leading-relaxed mt-2.5 ${
                      act.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                    }`}
                  >
                    {act.activity}
                  </p>

                  {/* Prayer & Halal Dining Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 text-xs">
                    {/* Prayer Box with Prayer Status */}
                    <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${
                      act.completed
                        ? 'bg-white/90 dark:bg-[#0D1C18] border-emerald-500/30'
                        : 'bg-white dark:bg-[#0D1C18] border-gray-200/80 dark:border-gray-800'
                    }`}>
                      <div className="w-7 h-7 rounded-lg bg-[#0F5C4D]/10 dark:bg-[#0F5C4D]/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-black text-[#0F5C4D] dark:text-[#C9A45C] uppercase tracking-wider block">
                          🕌 Prayer Window & Mosque
                        </span>
                        <div className="font-semibold text-gray-800 dark:text-gray-200 leading-snug mt-0.5">
                          {act.prayerNote}
                        </div>
                      </div>
                    </div>

                    {/* Halal Dining Box */}
                    {act.halalFoodSpot && (
                      <div className={`p-3 rounded-xl border flex items-start gap-2.5 transition-colors ${
                        act.completed
                          ? 'bg-white/90 dark:bg-[#0D1C18] border-emerald-500/30'
                          : 'bg-white dark:bg-[#0D1C18] border-gray-200/80 dark:border-gray-800'
                      }`}>
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <UtensilsCrossed className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                            🍽️ Verified Halal Dining
                          </span>
                          <div className="font-semibold text-gray-800 dark:text-gray-200 leading-snug mt-0.5">
                            {act.halalFoodSpot}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Day Travel Tips */}
          {selectedDay.notes && (
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs space-y-1">
              <span className="font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#0F5C4D] dark:text-[#C9A45C]" />
                <span>Traveler Tips for Day {selectedDay.dayNumber}</span>
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {selectedDay.notes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* AI Itinerary Generator Modal */}
      {aiGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-xl w-full border border-[#0F5C4D]/25 dark:border-[#C9A45C]/35 shadow-2xl overflow-hidden my-6">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#0F5C4D] via-[#0D4B3F] to-[#C9A45C] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#F2D785]" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold">Musafir AI Smart Travel Planner</h3>
                  <p className="text-[11px] text-white/80">Generate Prayer-Synchronized Muslim-Friendly Itinerary</p>
                </div>
              </div>
              <button
                onClick={() => !generating && setAiGeneratorOpen(false)}
                disabled={generating}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Destination Presets */}
            <div className="p-4 bg-[#F7F5EF] dark:bg-[#071310] border-b border-gray-200 dark:border-gray-800">
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-2">
                Popular Muslim Travel Destinations:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {PRESET_DESTINATIONS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setDestInput(preset.name);
                      setCountryInput(preset.country);
                      setStyleInput(preset.style);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 border ${
                      destInput === preset.name
                        ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                        : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D]/40'
                    }`}
                  >
                    <span>{preset.flag}</span>
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleGenerateItinerary} className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Destination & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Destination City / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={destInput}
                    onChange={(e) => setDestInput(e.target.value)}
                    placeholder="e.g. Istanbul, Makkah, Kochi, Cairo"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value)}
                    placeholder="e.g. Türkiye, Saudi Arabia, India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                  />
                </div>
              </div>

              {/* Number of Days & Budget */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Trip Duration ({daysInput} Days)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={daysInput}
                    onChange={(e) => setDaysInput(Number(e.target.value))}
                    className="w-full accent-[#0F5C4D]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold px-0.5">
                    <span>1 Day</span>
                    <span>3 Days</span>
                    <span>5 Days</span>
                    <span>7 Days</span>
                    <span>10 Days</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Budget
                  </label>
                  <input
                    type="text"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    placeholder="e.g. ₹50,000 / $700"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                  />
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Travel Style & Interests
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mb-2">
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setStyleInput(style)}
                      className={`p-2 rounded-xl text-left text-[11px] font-bold border transition-all ${
                        styleInput === style
                          ? 'bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] border-[#0F5C4D]'
                          : 'bg-gray-50 dark:bg-[#071310] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prayer Preference */}
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Prayer & Fiqh Preference
                </label>
                <select
                  value={prayerPref}
                  onChange={(e) => setPrayerPref(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                >
                  {PRAYER_PREFERENCES.map((p) => (
                    <option key={p.id} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Selector & Strict Halal Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Output Language
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTargetLang('en')}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        targetLang === 'en'
                          ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                          : 'bg-gray-50 dark:bg-[#071310] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetLang('ml')}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        targetLang === 'ml'
                          ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                          : 'bg-gray-50 dark:bg-[#071310] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      മലയാളം
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetLang('ar')}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        targetLang === 'ar'
                          ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                          : 'bg-gray-50 dark:bg-[#071310] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={strictHalalOnly}
                      onChange={(e) => setStrictHalalOnly(e.target.checked)}
                      className="rounded accent-[#0F5C4D] w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-emerald-900 dark:text-emerald-300 text-[11px] block">
                        100% Halal / Alcohol-Free Only
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                        Strict Muslim-owned / certified food
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Status Message while Generating */}
              {generating && (
                <div className="p-3.5 rounded-2xl bg-[#0F5C4D]/10 border border-[#0F5C4D]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F5C4D] dark:text-[#C9A45C]">
                    <Sparkles className="w-4 h-4 animate-spin text-[#C9A45C]" />
                    <span>{generationStep || 'Synthesizing Itinerary...'}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0F5C4D] h-full w-2/3 animate-pulse rounded-full" />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={generating || !destInput.trim()}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0F5C4D] via-[#0D4B3F] to-[#C9A45C] hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0F5C4D]/30 transition-all active:scale-98 disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 text-[#F2D785] ${generating ? 'animate-spin' : ''}`} />
                  <span>
                    {generating
                      ? 'Synthesizing Muslim-Friendly Itinerary...'
                      : `Generate ${daysInput}-Day Itinerary for ${destInput}`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Custom Activity Modal */}
      {addActivityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-md w-full border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C]" />
                <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100">
                  Add Activity to Day {selectedDay?.dayNumber}
                </h3>
              </div>
              <button
                onClick={() => setAddActivityOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomActivity} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Time Slot
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['morning', 'afternoon', 'evening', 'night'] as const).map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setNewActivitySlot(slot)}
                      className={`py-1.5 rounded-xl capitalize font-bold text-[11px] border ${
                        newActivitySlot === slot
                          ? 'bg-[#0F5C4D] text-white border-[#0F5C4D]'
                          : 'bg-gray-50 dark:bg-[#071310] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Activity Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newActivityText}
                  onChange={(e) => setNewActivityText(e.target.value)}
                  placeholder="e.g. Visit Museum of Islamic Arts and walk in neighboring park"
                  className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Prayer Window & Mosque Note
                </label>
                <input
                  type="text"
                  value={newActivityPrayer}
                  onChange={(e) => setNewActivityPrayer(e.target.value)}
                  placeholder="e.g. Dhuhr at Al-Azhar Mosque (Jama' Taqdim)"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Halal Food Spot (Optional)
                </label>
                <input
                  type="text"
                  value={newActivityFood}
                  onChange={(e) => setNewActivityFood(e.target.value)}
                  placeholder="e.g. Naguib Mahfouz Cafe (Halal Egyptian breakfast)"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Landmark Name (Optional)
                </label>
                <input
                  type="text"
                  value={newActivityLocation}
                  onChange={(e) => setNewActivityLocation(e.target.value)}
                  placeholder="e.g. Khan el-Khalili Bazaar"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold focus:ring-2 focus:ring-[#0F5C4D] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddActivityOpen(false)}
                  className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 font-bold text-gray-600 dark:text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white font-bold shadow-sm"
                >
                  Add to Itinerary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
