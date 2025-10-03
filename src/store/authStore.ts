import { create } from 'zustand';
import { AuthState, User } from '../types';
import { sampleUsers } from '../data/sampleData';

interface AuthStore extends AuthState {
  login: (pin: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  
  login: (pin: string) => {
    const user = sampleUsers.find(user => user.pin === pin);
    
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  }
}));