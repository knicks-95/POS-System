import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { CartItem, Order, Product, PaymentMethod } from '../types';
import { useAuthStore } from './authStore';
import { useOrderStore } from './orderStore';
import { useProductStore } from './productStore';

interface CartState {
  items: CartItem[];
  isAgeVerified: boolean;
  customerAge: number | null;
  tabName: string;
}

interface CartStore extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  verifyAge: (age: number) => void;
  resetAgeVerification: () => void;
  setTabName: (name: string) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  processPayment: (paymentMethod: PaymentMethod, tipAmount?: number) => Order;
  createTab: () => Order;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isAgeVerified: false,
  customerAge: null,
  tabName: '',
  
  addItem: (product, quantity = 1) => {
    set(state => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { product, quantity }]
        };
      }
    });
  },
  
  removeItem: (productId) => {
    set(state => ({
      items: state.items.filter(item => item.product.id !== productId)
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set(state => ({
      items: state.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    }));
  },
  
  clearCart: () => {
    set({ 
      items: [],
      isAgeVerified: false,
      customerAge: null,
      tabName: ''
    });
  },
  
  verifyAge: (age) => {
    set({ 
      isAgeVerified: age >= 21, 
      customerAge: age 
    });
  },
  
  resetAgeVerification: () => {
    set({ 
      isAgeVerified: false, 
      customerAge: null 
    });
  },
  
  setTabName: (name) => {
    set({ tabName: name });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  },
  
  getTax: () => {
    return get().getSubtotal() * 0.1; // 10% tax rate
  },
  
  getTotal: () => {
    return get().getSubtotal() + get().getTax();
  },
  
  processPayment: (paymentMethod, tipAmount = 0) => {
    const { items, customerAge, isAgeVerified } = get();
    const currentUser = useAuthStore.getState().currentUser;
    const productStore = useProductStore.getState();
    
    if (!currentUser) {
      throw new Error('No authenticated user');
    }
    
    if (!isAgeVerified) {
      throw new Error('Age verification required');
    }
    
    // Create the order
    const order: Order = {
      id: uuidv4(),
      items: [...items],
      subtotal: get().getSubtotal(),
      tax: get().getTax(),
      total: get().getTotal() + tipAmount,
      paymentMethod,
      timestamp: new Date().toISOString(),
      employeeId: currentUser.id,
      customerAge: customerAge || undefined,
      idVerified: isAgeVerified,
      tip: tipAmount,
      status: 'completed'
    };
    
    // Add order to the store
    useOrderStore.getState().addOrder(order);
    
    // Update inventory
    items.forEach(item => {
      productStore.updateStock(item.product.id, item.product.stock - item.quantity);
    });
    
    // Clear the cart
    get().clearCart();
    
    return order;
  },
  
  createTab: () => {
    const { items, customerAge, isAgeVerified, tabName } = get();
    const currentUser = useAuthStore.getState().currentUser;
    
    if (!currentUser) {
      throw new Error('No authenticated user');
    }
    
    if (!isAgeVerified) {
      throw new Error('Age verification required');
    }
    
    if (!tabName) {
      throw new Error('Tab name required');
    }
    
    // Create the tab order
    const order: Order = {
      id: uuidv4(),
      items: [...items],
      subtotal: get().getSubtotal(),
      tax: get().getTax(),
      total: get().getTotal(),
      paymentMethod: 'credit', // Default for tabs
      timestamp: new Date().toISOString(),
      employeeId: currentUser.id,
      customerAge: customerAge || undefined,
      idVerified: isAgeVerified,
      tabName,
      status: 'open-tab'
    };
    
    // Add order to the store
    useOrderStore.getState().addOrder(order);
    
    // Clear the cart
    get().clearCart();
    
    return order;
  }
}));