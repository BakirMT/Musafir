export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rateToUSD: number; // 1 USD = X Currency
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyRate> = {
  TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rateToUSD: 34.25 },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rateToUSD: 1.0 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rateToUSD: 0.92 },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateToUSD: 83.8 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rateToUSD: 3.67 },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', rateToUSD: 3.75 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rateToUSD: 0.77 },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', rateToUSD: 4.38 },
};

export function convertCurrency(amount: number, fromCode: string, toCode: string): number {
  if (fromCode === toCode) return amount;
  const from = SUPPORTED_CURRENCIES[fromCode] || SUPPORTED_CURRENCIES.USD;
  const to = SUPPORTED_CURRENCIES[toCode] || SUPPORTED_CURRENCIES.TRY;

  // Convert to USD first then to target
  const inUSD = amount / from.rateToUSD;
  const inTarget = inUSD * to.rateToUSD;

  return Math.round(inTarget * 100) / 100;
}
