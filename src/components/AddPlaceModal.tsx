import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlaceCategory, HalalVerificationLevel } from '../types';
import { X, Send, MapPin, CheckCircle2 } from 'lucide-react';

export const AddPlaceModal: React.FC = () => {
  const { addPlaceModalOpen, setAddPlaceModalOpen, addCommunitySubmission, currentLocation } =
    useApp();

  const [placeName, setPlaceName] = useState('');
  const [category, setCategory] = useState<PlaceCategory>('mosque');
  const [address, setAddress] = useState(`${currentLocation.city}, ${currentLocation.country}`);
  const [halalStatus, setHalalStatus] = useState<HalalVerificationLevel>('community');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!addPlaceModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName.trim()) return;

    addCommunitySubmission({
      placeName: placeName.trim(),
      category,
      address: address.trim(),
      notes: notes.trim(),
      halalVerification: category === 'restaurant' ? halalStatus : undefined,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAddPlaceModalOpen(false);
      setPlaceName('');
      setNotes('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#0D1C18] rounded-3xl max-w-md w-full border border-[#0F5C4D]/20 dark:border-[#C9A45C]/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Contribute to Musafir Community
            </h3>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              Suggest a mosque, halal eatery, or prayer room
            </p>
          </div>
          <button
            onClick={() => setAddPlaceModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#0F5C4D] dark:text-[#C9A45C] mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
              JazakAllah Khair! Submission Received.
            </h4>
            <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
              Your submission has been queued for verification with status{' '}
              <span className="font-bold text-amber-600 dark:text-amber-400">"Pending Moderation"</span>.
              Once confirmed, it will be published globally to assist fellow travellers.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PlaceCategory)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
              >
                <option value="mosque">Mosque (Masjid / Juma'ah)</option>
                <option value="restaurant">Halal Restaurant / Cafe</option>
                <option value="prayer_room">Prayer Room / Musalla</option>
                <option value="hotel">Muslim-Friendly Hotel</option>
                <option value="halal_store">Halal Grocery / Store</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Place Name *
              </label>
              <input
                type="text"
                required
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="e.g. Sultanahmet Mescidi or Istanbul Doner House"
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Address or Neighborhood *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, city"
                  className="w-full px-3 py-2 pl-8 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
                />
                <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {category === 'restaurant' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Halal Status Claim
                </label>
                <select
                  value={halalStatus}
                  onChange={(e) => setHalalStatus(e.target.value as HalalVerificationLevel)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-semibold"
                >
                  <option value="community">Community Reported (Owner verbally confirms)</option>
                  <option value="verified">Verified Certificate on Display</option>
                  <option value="unverified">Unverified / Halal options only</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Useful Travel Notes & Facilities
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Has women's prayer area on upper floor; clean wudu; alcohol-free..."
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0F5C4D]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAddPlaceModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0F5C4D] hover:bg-[#083C34] text-white flex items-center gap-1.5 shadow-md shadow-[#0F5C4D]/25"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit for Moderation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
