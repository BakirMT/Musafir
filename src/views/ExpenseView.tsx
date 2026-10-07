import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  SUPPORTED_CURRENCIES,
  convertCurrency,
} from '../services/currencyService';
import { ExpenseItem } from '../types';
import {
  Coins,
  ArrowRightLeft,
  Plus,
  Trash2,
  PieChart,
  Wallet,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export const ExpenseView: React.FC = () => {
  const { expenses, addExpense, deleteExpense, activeTrip } = useApp();

  // Currency Converter states
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('TRY');
  const [amount, setAmount] = useState<number>(100);

  // New Expense states
  const [title, setTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<ExpenseItem['category']>('Food');

  const convertedValue = convertCurrency(Number(amount) || 0, fromCurr, toCurr);

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !expenseAmount) return;

    addExpense({
      tripId: activeTrip.id,
      title: title.trim(),
      amount: Number(expenseAmount),
      currency: 'USD',
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setExpenseAmount('');
  };

  const totalSpentUSD = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudgetUSD = Math.max(0, activeTrip.budgetTotal - totalSpentUSD);
  const budgetUsagePercent = Math.min(
    100,
    Math.round((totalSpentUSD / (activeTrip.budgetTotal || 1)) * 100)
  );

  // Category breakdown
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A45C]">
          <Coins className="w-4 h-4" />
          <span>Travel Finances</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Currency Converter & Expense Tracker
        </h1>
        <p className="text-xs text-[#6B756F] dark:text-[#9AA9A2]">
          Live conversion calculator and trip budget management
        </p>
      </div>

      {/* SECTION 1: Currency Converter (Requirement 23) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0D1C18] border border-[#0F5C4D]/15 dark:border-[#C9A45C]/20 shadow-sm space-y-5">
        <h2 className="text-base font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Coins className="w-5 h-5 text-[#C9A45C]" />
          <span>Instant Currency Converter</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          {/* Amount and From Currency */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B756F] dark:text-[#9AA9A2]">
              You Send / Pay
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-sm font-bold font-mono focus:outline-none"
              />
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                className="px-3 py-2.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-extrabold"
              >
                {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-[#0F5C4D]/10 hover:text-[#0F5C4D] text-gray-600 dark:text-gray-300 transition-colors"
              title="Swap Currencies"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Converted Value and To Currency */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B756F] dark:text-[#9AA9A2]">
              You Receive
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3.5 py-2.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-sm font-bold font-mono text-[#0F5C4D] dark:text-[#C9A45C]">
                {convertedValue.toLocaleString()}
              </div>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="px-3 py-2.5 rounded-2xl bg-[#F7F5EF] dark:bg-[#071310] border border-gray-200 dark:border-gray-800 text-xs font-extrabold"
              >
                {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Amount Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] mr-1">
            Quick Amounts:
          </span>
          {[50, 100, 500, 1000, 5000].map((quick) => (
            <button
              key={quick}
              onClick={() => setAmount(quick)}
              className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-[#071310] text-[11px] font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            >
              {quick.toLocaleString()} {fromCurr}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2: Trip Expense Tracker (Requirement 23) */}
      <div className="space-y-4">
        {/* Budget Progress Summary */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0F5C4D] to-[#083C34] text-white shadow-xl shadow-[#0F5C4D]/25 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#E8DCC2] uppercase tracking-wider">
                {activeTrip.title}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold mt-1">
                ${totalSpentUSD.toLocaleString()}{' '}
                <span className="text-sm font-normal text-white/80">
                  spent of ${activeTrip.budgetTotal.toLocaleString()} budget
                </span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-white/80">Remaining Balance:</span>
              <div className="text-xl font-black text-[#C9A45C]">
                ${remainingBudgetUSD.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-black/25 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C9A45C] to-emerald-300 rounded-full transition-all duration-500"
              style={{ width: `${budgetUsagePercent}%` }}
            />
          </div>
        </div>

        {/* Category Breakdown Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
          {Object.entries(categoryTotals).map(([cat, val]) => (
            <div
              key={cat}
              className="p-3 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 text-center"
            >
              <span className="text-[10px] font-bold text-[#6B756F] dark:text-[#9AA9A2] block truncate">
                {cat}
              </span>
              <span className="font-extrabold text-gray-900 dark:text-gray-100 font-mono mt-0.5 block">
                ${val}
              </span>
            </div>
          ))}
        </div>

        {/* Add Expense Form */}
        <form
          onSubmit={handleAddExpense}
          className="p-4 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center gap-2.5 text-xs"
        >
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Expense description (e.g. Lunch at Tarihi Köftecisi)..."
            className="flex-1 w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-medium"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseItem['category'])}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Hotel">Hotel</option>
            <option value="Shopping">Shopping</option>
            <option value="Tickets">Tickets</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            required
            min="1"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Amount ($)"
            className="w-full sm:w-28 px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#071310] border border-gray-200 dark:border-gray-800 font-semibold font-mono"
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0F5C4D] hover:bg-[#083C34] text-white font-bold flex items-center justify-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </form>

        {/* Recent Expenses List */}
        <div className="space-y-2">
          {expenses.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-[#0D1C18] border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#0F5C4D]" />
                <div>
                  <div className="font-extrabold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-[#6B756F] dark:text-[#9AA9A2]">
                    {item.category} • {item.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="font-extrabold text-gray-900 dark:text-gray-100 font-mono text-sm">
                  ${item.amount}
                </div>
                <button
                  onClick={() => deleteExpense(item.id)}
                  className="p-1 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
