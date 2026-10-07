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
  ArrowUpDown,
  FileDown,
  WifiOff,
} from 'lucide-react';

export const TripsView: React.FC = () => {
  const {
    activeTrip,
    updateTrip,
    currentLocation,
    downloadTripOffline,
    offlineModeActive,
  } = useApp();

  const [activeDayTab, setActiveDayTab] = useState(1);
  const [aiGeneratorOpen, setAiGeneratorOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  // Form states for AI itinerary generator
  const [destInput, setDestInput] = useState(currentLocation.city);
  const [daysInput, setDaysInput] = useState(5);
  const [budgetInput, setBudgetInput] = useState('₹50,000 / $600');
  const [styleInput, setStyleInput] = useState('History + Culinary');
  const [prayerPref, setPrayerPref] = useState('Pray in historic congregational mosques');

  // Handle AI generation
  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: destInput,
          days: daysInput,
          budget: budgetInput,
          travelStyle: styleInput,
          prayerPreference: prayerPref,
        }),
      });

      const data = await response.json();
      if (data.plan && data.plan.days) {
        // Map AI days into active Trip structure
        const newDays: TripDay[] = data.plan.days.map((d: any, idx: number) => ({
          dayNumber: idx + 1,
          title: d.title || `Day ${idx + 1}: Highlights of ${destInput}`,
          activities: [
            {
              id: `act-${idx}-m`,
              timeSlot: 'morning',
              activity: d.morning?.activity || 'Morning tour of local cultural sights.',
              prayerNote: d.morning?.prayer || 'Fajr at central mosque',
              halalFoodSpot: d.morning?.halalFood || 'Local Halal breakfast cafe',
            },
            {
              id: `act-${idx}-a`,
              timeSlot: 'afternoon',
              activity: d.afternoon?.activity || 'Afternoon visit to historic monuments and markets.',
              prayerNote: d.afternoon?.prayer || 'Dhuhr & Asr prayers',
              halalFoodSpot: d.afternoon?.halalFood || 'Verified Halal traditional lunch',
            },
            {
              id: `act-${idx}-e`,
              timeSlot: 'evening',
              activity: d.evening?.activity || 'Sunset stroll and evening tea.',
              prayerNote: d.evening?.prayer || 'Maghrib & Isha prayers',
              halalFoodSpot: d.evening?.halalFood || 'Halal dinner & sweets',
            },
          ],
          notes: d.tips || '',
        }));

        const updatedTrip: Trip = {
          ...activeTrip,
          title: data.plan.tripTitle || `${daysInput}-Day Muslim Journey to ${destInput}`,
          destination: `${destInput}, Türkiye`,
          days: newDays,
        };

        updateTrip(updatedTrip);
        setActiveDayTab(1);
        setAiGeneratorOpen(false);
      }
    } catch (err) {
      console.error('Failed to generate AI itinerary:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    downloadTripOffline();
    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3000);
  };

  const selectedDay =
    activeTrip.days.find((d) => d.dayNumber === activeDayTab) || activeTrip.days[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <Map className="w-4 h-4" />
            <span>Smart Travel Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {activeTrip.title}
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            📍 {activeTrip.destination} • {activeTrip.startDate} — {activeTrip.endDate} • Budget: ${activeTrip.budgetTotal}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Download Trip Offline Button */}
          <button
            onClick={handleDownload}
            className="px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 text-xs font-bold text-[#0F5C4D] dark:text-[#E8DCC2] flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-all active:scale-95"
            title="Cache all data for zero-connectivity offline access"
          >
            <Download className="w-4 h-4 text-[#C9A45C]" />
            <span>Download Offline</span>
          </button>

          {/* AI Itinerary Generator Trigger */}
          <button
            onClick={() => setAiGeneratorOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0F5C4D] to-[#083C34] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-[#C9A45C]" />
            <span>AI Itinerary Generator</span>
          </button>
        </div>
      </div>

      {downloadSuccessToast && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Trip and prayer offline package downloaded successfully! Accessible anytime without internet.</span>
        </div>
      )}

      {/* Day Selector Tabs (Day 1, Day 2, Day 3...) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {activeTrip.days.map((day) => (
          <button
            key={day.dayNumber}
            onClick={() => setActiveDayTab(day.dayNumber)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeDayTab === day.dayNumber
                ? 'bg-[#0F5C4D] text-white shadow-md shadow-[#0F5C4D]/25'
                : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
            }`}
          >
            Day {day.dayNumber}
          </button>
        ))}
      </div>

      {/* Selected Day Details Card */}
      {selectedDay && (
        <div className="rounded-3xl p-6 bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-xs font-bold text-[#C9A45C] uppercase tracking-wider">
                DAY {selectedDay.dayNumber} TIMELINE
              </span>
              <h2 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
                {selectedDay.title}
              </h2>
            </div>
            <div className="text-xs text-[#6B756F] dark:text-[#9AA9A2] italic hidden sm:block">
              {selectedDay.notes}
            </div>
          </div>

          {/* Activities List Synchronized with Prayers */}
          <div className="space-y-4">
            {selectedDay.activities.map((act) => (
              <div
                key={act.id}
                className="rounded-2xl p-4.5 bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200/80 dark:border-gray-800 space-y-3 relative overflow-hidden"
              >
                {/* Time Slot Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-[#C9A45C] border border-[#0F5C4D]/20">
                    {act.timeSlot}
                  </span>
                </div>

                {/* Activity Description */}
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-relaxed">
                  {act.activity}
                </p>

                {/* Prayer Sync Box & Halal Dining */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#0F5C4D] dark:text-[#C9A45C] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase">
                        Prayer Window
                      </span>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {act.prayerNote}
                      </div>
                    </div>
                  </div>

                  {act.halalFoodSpot && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 flex items-start gap-2">
                      <UtensilsCrossed className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] uppercase">
                          Halal Dining Recommendation
                        </span>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">
                          {act.halalFoodSpot}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Generator Modal (Requirement 17) */}
      {aiGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-lg w-full border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-[#0F5C4D] to-[#083C34] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#C9A45C]" />
                <h3 className="text-base font-bold">Musafir AI Itinerary Generator</h3>
              </div>
              <button
                onClick={() => setAiGeneratorOpen(false)}
                className="text-white/80 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleGenerateItinerary} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Destination City
                </label>
                <input
                  type="text"
                  required
                  value={destInput}
                  onChange={(e) => setDestInput(e.target.value)}
                  placeholder="e.g. Istanbul, Kuala Lumpur, Cairo, London"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={daysInput}
                    onChange={(e) => setDaysInput(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Budget
                  </label>
                  <input
                    type="text"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    placeholder="e.g. ₹50,000 / $600"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Travel Style & Interests
                </label>
                <input
                  type="text"
                  value={styleInput}
                  onChange={(e) => setStyleInput(e.target.value)}
                  placeholder="e.g. Ottoman History, Street Food, Family-friendly"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Prayer Preference
                </label>
                <select
                  value={prayerPref}
                  onChange={(e) => setPrayerPref(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
                >
                  <option value="Pray in historic congregational mosques">
                    Pray in historic congregational mosques
                  </option>
                  <option value="Flexible traveller combining (Jama' Taqdim/Ta'khir)">
                    Flexible traveller combining (Jama' Taqdim/Ta'khir)
                  </option>
                  <option value="Near hotel prayer facilities">
                    Near hotel prayer facilities
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3 rounded-2xl bg-[#0F5C4D] hover:bg-[#083C34] text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-[#0F5C4D]/25 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                  <span>
                    {generating
                      ? 'Synthesizing Prayer-Balanced Itinerary...'
                      : 'Generate Muslim-Friendly Itinerary'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
