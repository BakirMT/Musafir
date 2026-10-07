import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChecklistItem } from '../types';
import {
  CheckSquare,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  BookMarked,
  ShieldCheck,
} from 'lucide-react';

export const ChecklistView: React.FC = () => {
  const { checklist, toggleChecklistItem, addChecklistItem, deleteChecklistItem } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newText, setNewText] = useState('');
  const [newCat, setNewCat] = useState<ChecklistItem['category']>('Islamic Items');

  const categories: ('All' | ChecklistItem['category'])[] = [
    'All',
    'Islamic Items',
    'Documents',
    'Clothing',
    'Electronics',
    'Money',
    'Health',
  ];

  const totalItems = checklist.length;
  const completedItems = checklist.filter((i) => i.completed).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const filteredItems =
    selectedCategory === 'All'
      ? checklist
      : checklist.filter((i) => i.category === selectedCategory);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    addChecklistItem({
      category: newCat,
      text: newText.trim(),
      completed: false,
    });
    setNewText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
            <CheckSquare className="w-4 h-4" />
            <span>Travel Readiness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Travel Checklist
          </h1>
          <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
            Comprehensive packing inventory tailored for Islamic and travel essentials
          </p>
        </div>
      </div>

      {/* Completion Percentage Progress Bar (Requirement 18) */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#0F5C4D] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#E8DCC2] uppercase tracking-wider">
            PACKING READINESS
          </span>
          <span className="text-sm font-extrabold text-[#C9A45C] font-mono">
            {completedItems} of {totalItems} items packed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-black/25 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C9A45C] to-emerald-300 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add New Item Form */}
      <form
        onSubmit={handleAdd}
        className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center gap-2.5"
      >
        <select
          value={newCat}
          onChange={(e) => setNewCat(e.target.value as ChecklistItem['category'])}
          className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-semibold"
        >
          <option value="Islamic Items">Islamic Items</option>
          <option value="Documents">Documents</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Money">Money</option>
          <option value="Health">Health</option>
        </select>

        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Add packing item (e.g. Travel Wudu Bottle, Passport, Ihram)..."
          className="flex-1 w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-medium focus:outline-none"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#0F5C4D] text-white shadow-sm'
                : 'bg-white dark:bg-[#0D1C18] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Items Grid */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleChecklistItem(item.id)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              item.completed
                ? 'bg-[#F7F5EF]/60 dark:bg-[#071310]/60 border-gray-200 dark:border-gray-800 opacity-75'
                : 'bg-white dark:bg-[#0D1C18] border-gray-200 dark:border-gray-800 hover:border-[#0F5C4D]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  item.completed
                    ? 'bg-[#0F5C4D] border-[#0F5C4D] text-white'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {item.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>

              <div>
                <span
                  className={`text-xs font-semibold ${
                    item.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {item.text}
                </span>
                <span className="block text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
                  {item.category}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChecklistItem(item.id);
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
