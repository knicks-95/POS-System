import { create } from 'zustand';
import { Currency, CurrencyState } from '../types';

const currencies: Currency[] = [
  {
    code: 'ZAR',
    symbol: 'R',
    name: 'South African Rand',
    rate: 1
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 0.053
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.049
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.042
  }
];

interface CurrencyStore extends CurrencyState {
  setCurrentCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
  convertPrice: (amount: number, fromCurrency: Currency, toCurrency: Currency) => number;
}

export const useCurrencyStore = create<CurrencyStore>((set, get) => ({
  currencies,
  currentCurrency: currencies[0], // ZAR by default

  setCurrentCurrency: (currency) => {
    set({ currentCurrency: currency });
  },

  formatPrice: (amount: number) => {
    const { currentCurrency } = get();
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currentCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  },

  convertPrice: (amount: number, fromCurrency: Currency, toCurrency: Currency) => {
    // Convert to ZAR first (base currency)
    const inZAR = amount / fromCurrency.rate;
    // Then convert to target currency
    return inZAR * toCurrency.rate;
  }
}));