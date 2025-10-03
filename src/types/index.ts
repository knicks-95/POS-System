// Product types
export interface Product {
  id: string;
  name: string;
  category: 'beer' | 'wine' | 'spirits' | 'mixers' | 'other';
  subCategory?: string;
  price: number;
  cost: number;
  stock: number;
  lowStockThreshold: number;
  barcode?: string;
  imageUrl: string;
  description?: string;
  abv: number; // Alcohol by volume percentage
  volume: string; // e.g., "750ml", "12oz"
  brand: string;
}

// Cart and order types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  employeeId: string;
  customerAge?: number;
  idVerified: boolean;
  tip?: number;
  status: 'completed' | 'refunded' | 'open-tab';
  tabName?: string;
  currency: Currency;
}

export type PaymentMethod = 'cash' | 'credit' | 'debit' | 'mobile';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to base currency (ZAR)
}

// User types
export type UserRole = 'admin' | 'manager' | 'cashier' | 'bartender';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  pin: string;
  email?: string;
}

// Analytics and reporting types
export interface DailySales {
  date: string;
  total: number;
  itemsSold: number;
  transactions: number;
  currency: Currency;
}

export interface ProductSales {
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
  currency: Currency;
}

// Authentication types
export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

// Currency store types
export interface CurrencyState {
  currencies: Currency[];
  currentCurrency: Currency;
}