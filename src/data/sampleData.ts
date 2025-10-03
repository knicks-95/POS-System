import { Product, User, Order } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const sampleProducts: Product[] = [
  // Beers
  {
    id: '1',
    name: 'IPA Craft Beer',
    category: 'beer',
    subCategory: 'IPA',
    price: 5.99,
    cost: 2.50,
    stock: 48,
    lowStockThreshold: 10,
    barcode: '123456789012',
    imageUrl: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg',
    description: 'Hoppy craft IPA with citrus notes',
    abv: 6.2,
    volume: '12oz',
    brand: 'Craft Brewery Co.'
  },
  {
    id: '2',
    name: 'Light Lager',
    category: 'beer',
    subCategory: 'Lager',
    price: 4.99,
    cost: 1.75,
    stock: 72,
    lowStockThreshold: 15,
    barcode: '223456789012',
    imageUrl: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg',
    description: 'Refreshing light lager',
    abv: 4.2,
    volume: '12oz',
    brand: 'American Beer Co.'
  },
  {
    id: '3',
    name: 'Stout',
    category: 'beer',
    subCategory: 'Stout',
    price: 6.99,
    cost: 3.25,
    stock: 36,
    lowStockThreshold: 8,
    barcode: '323456789012',
    imageUrl: 'https://images.pexels.com/photos/5711001/pexels-photo-5711001.jpeg',
    description: 'Rich, dark stout with coffee notes',
    abv: 7.5,
    volume: '16oz',
    brand: 'Dark Brew Ltd.'
  },
  
  // Wines
  {
    id: '4',
    name: 'Cabernet Sauvignon',
    category: 'wine',
    subCategory: 'Red',
    price: 24.99,
    cost: 12.50,
    stock: 24,
    lowStockThreshold: 5,
    barcode: '423456789012',
    imageUrl: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg',
    description: 'Full-bodied red wine with blackberry notes',
    abv: 14.5,
    volume: '750ml',
    brand: 'Napa Valley Vineyards'
  },
  {
    id: '5',
    name: 'Chardonnay',
    category: 'wine',
    subCategory: 'White',
    price: 19.99,
    cost: 9.75,
    stock: 18,
    lowStockThreshold: 4,
    barcode: '523456789012',
    imageUrl: 'https://images.pexels.com/photos/2995333/pexels-photo-2995333.jpeg',
    description: 'Crisp white wine with apple and pear notes',
    abv: 13.2,
    volume: '750ml',
    brand: 'Sonoma Wines'
  },
  {
    id: '6',
    name: 'Rosé',
    category: 'wine',
    subCategory: 'Rosé',
    price: 16.99,
    cost: 7.50,
    stock: 12,
    lowStockThreshold: 3,
    barcode: '623456789012',
    imageUrl: 'https://images.pexels.com/photos/2531188/pexels-photo-2531188.jpeg',
    description: 'Refreshing rosé with strawberry notes',
    abv: 12.5,
    volume: '750ml',
    brand: 'Provence Estates'
  },
  
  // Spirits
  {
    id: '7',
    name: 'Bourbon Whiskey',
    category: 'spirits',
    subCategory: 'Whiskey',
    price: 39.99,
    cost: 22.00,
    stock: 10,
    lowStockThreshold: 2,
    barcode: '723456789012',
    imageUrl: 'https://images.pexels.com/photos/4667030/pexels-photo-4667030.jpeg',
    description: 'Smooth bourbon with vanilla and caramel notes',
    abv: 45.0,
    volume: '750ml',
    brand: 'Kentucky Spirits'
  },
  {
    id: '8',
    name: 'Vodka',
    category: 'spirits',
    subCategory: 'Vodka',
    price: 29.99,
    cost: 14.50,
    stock: 15,
    lowStockThreshold: 3,
    barcode: '823456789012',
    imageUrl: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg',
    description: 'Premium distilled vodka, triple filtered',
    abv: 40.0,
    volume: '750ml',
    brand: 'Crystal Clear'
  },
  {
    id: '9',
    name: 'Gin',
    category: 'spirits',
    subCategory: 'Gin',
    price: 34.99,
    cost: 18.25,
    stock: 8,
    lowStockThreshold: 2,
    barcode: '923456789012',
    imageUrl: 'https://images.pexels.com/photos/6638510/pexels-photo-6638510.jpeg',
    description: 'London dry gin with botanical notes',
    abv: 42.0,
    volume: '750ml',
    brand: 'British Distillery'
  },
  
  // Mixers
  {
    id: '10',
    name: 'Tonic Water',
    category: 'mixers',
    subCategory: 'Soda',
    price: 3.99,
    cost: 1.25,
    stock: 36,
    lowStockThreshold: 10,
    barcode: '023456789013',
    imageUrl: 'https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg',
    description: 'Premium tonic water',
    abv: 0,
    volume: '500ml',
    brand: 'Mixer Co.'
  }
];

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'admin',
    pin: '1234',
    email: 'admin@alcopos.com'
  },
  {
    id: '2',
    name: 'Manager User',
    role: 'manager',
    pin: '2345',
    email: 'manager@alcopos.com'
  },
  {
    id: '3',
    name: 'Cashier User',
    role: 'cashier',
    pin: '3456',
    email: 'cashier@alcopos.com'
  },
  {
    id: '4',
    name: 'Bartender',
    role: 'bartender',
    pin: '4567',
    email: 'bartender@alcopos.com'
  }
];

export const sampleOrders: Order[] = [
  {
    id: uuidv4(),
    items: [
      { product: sampleProducts[0], quantity: 2 },
      { product: sampleProducts[9], quantity: 1 }
    ],
    subtotal: 15.97,
    tax: 1.60,
    total: 17.57,
    paymentMethod: 'credit',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    employeeId: '3',
    idVerified: true,
    customerAge: 28,
    status: 'completed'
  },
  {
    id: uuidv4(),
    items: [
      { product: sampleProducts[3], quantity: 1 }
    ],
    subtotal: 24.99,
    tax: 2.50,
    total: 27.49,
    paymentMethod: 'cash',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    employeeId: '3',
    idVerified: true,
    customerAge: 35,
    status: 'completed'
  },
  {
    id: uuidv4(),
    items: [
      { product: sampleProducts[6], quantity: 1 },
      { product: sampleProducts[9], quantity: 2 }
    ],
    subtotal: 47.97,
    tax: 4.80,
    total: 52.77,
    paymentMethod: 'credit',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    employeeId: '4',
    idVerified: true,
    customerAge: 42,
    tip: 5.00,
    status: 'completed'
  },
  {
    id: uuidv4(),
    items: [
      { product: sampleProducts[1], quantity: 6 }
    ],
    subtotal: 29.94,
    tax: 3.00,
    total: 32.94,
    paymentMethod: 'credit',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    employeeId: '3',
    idVerified: true,
    customerAge: 26,
    status: 'completed'
  },
  {
    id: uuidv4(),
    items: [
      { product: sampleProducts[7], quantity: 1 },
      { product: sampleProducts[9], quantity: 2 }
    ],
    subtotal: 37.97,
    tax: 3.80,
    total: 41.77,
    paymentMethod: 'debit',
    timestamp: new Date().toISOString(),
    employeeId: '4',
    idVerified: true,
    customerAge: 31,
    tabName: "John's Tab",
    status: 'open-tab'
  }
];

// Generate daily sales for the past 7 days
export const generateDailySalesData = () => {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random sales data
    const total = Math.floor(Math.random() * 1000) + 500;
    const itemsSold = Math.floor(Math.random() * 50) + 20;
    const transactions = Math.floor(Math.random() * 20) + 10;
    
    data.push({
      date: date.toISOString().split('T')[0],
      total,
      itemsSold,
      transactions
    });
  }
  return data;
};