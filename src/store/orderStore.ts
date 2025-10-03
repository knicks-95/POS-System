import { create } from 'zustand';
import { Order, ProductSales, DailySales } from '../types';
import { sampleOrders, generateDailySalesData } from '../data/sampleData';
import { format } from 'date-fns';

interface OrderState {
  orders: Order[];
  openTabs: Order[];
}

interface OrderStore extends OrderState {
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  closeTab: (orderId: string, paymentMethod: Order['paymentMethod'], tipAmount?: number) => void;
  getDailySales: () => DailySales[];
  getTopSellingProducts: (limit?: number) => ProductSales[];
  getRecentOrders: (limit?: number) => Order[];
  getOrdersByEmployee: (employeeId: string) => Order[];
  getTotalSales: (timeframe?: 'today' | 'week' | 'month') => number;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [...sampleOrders],
  openTabs: sampleOrders.filter(order => order.status === 'open-tab'),
  
  addOrder: (order) => {
    set(state => {
      const newOrders = [...state.orders, order];
      return { 
        orders: newOrders,
        openTabs: order.status === 'open-tab' 
          ? [...state.openTabs, order]
          : state.openTabs
      };
    });
  },
  
  updateOrder: (orderId, updates) => {
    set(state => {
      const updatedOrders = state.orders.map(order => 
        order.id === orderId ? { ...order, ...updates } : order
      );
      
      // Update open tabs if status changed
      let updatedOpenTabs = state.openTabs;
      const updatedOrder = updatedOrders.find(o => o.id === orderId);
      
      if (updatedOrder) {
        if (updates.status === 'open-tab') {
          // Add to open tabs if not already there
          if (!state.openTabs.some(tab => tab.id === orderId)) {
            updatedOpenTabs = [...state.openTabs, updatedOrder];
          }
        } else if (updates.status && updates.status !== 'open-tab') {
          // Remove from open tabs
          updatedOpenTabs = state.openTabs.filter(tab => tab.id !== orderId);
        }
      }
      
      return { 
        orders: updatedOrders,
        openTabs: updatedOpenTabs
      };
    });
  },
  
  closeTab: (orderId, paymentMethod, tipAmount = 0) => {
    set(state => {
      const updatedOrders = state.orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'completed',
            paymentMethod,
            tip: tipAmount,
            total: order.total + tipAmount
          };
        }
        return order;
      });
      
      return {
        orders: updatedOrders,
        openTabs: state.openTabs.filter(tab => tab.id !== orderId)
      };
    });
  },
  
  getDailySales: () => {
    // In a real app, this would aggregate the actual orders
    // For demo purposes, we're using generated data
    return generateDailySalesData();
  },
  
  getTopSellingProducts: (limit = 5) => {
    const { orders } = get();
    const productSales: Record<string, ProductSales> = {};
    
    // Calculate sales for each product
    orders
      .filter(order => order.status === 'completed')
      .forEach(order => {
        order.items.forEach(item => {
          const { id, name } = item.product;
          
          if (!productSales[id]) {
            productSales[id] = {
              productId: id,
              productName: name,
              quantity: 0,
              revenue: 0
            };
          }
          
          productSales[id].quantity += item.quantity;
          productSales[id].revenue += item.product.price * item.quantity;
        });
      });
    
    // Convert to array and sort by quantity
    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
  },
  
  getRecentOrders: (limit = 10) => {
    return [...get().orders]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  },
  
  getOrdersByEmployee: (employeeId) => {
    return get().orders.filter(order => order.employeeId === employeeId);
  },
  
  getTotalSales: (timeframe = 'today') => {
    const { orders } = get();
    const now = new Date();
    let minDate: Date;
    
    switch (timeframe) {
      case 'week':
        minDate = new Date(now);
        minDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        minDate = new Date(now);
        minDate.setMonth(now.getMonth() - 1);
        break;
      case 'today':
      default:
        minDate = new Date(now);
        minDate.setHours(0, 0, 0, 0);
        break;
    }
    
    return orders
      .filter(order => 
        order.status === 'completed' && 
        new Date(order.timestamp) >= minDate
      )
      .reduce((total, order) => total + order.total, 0);
  }
}));