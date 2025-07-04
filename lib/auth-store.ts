import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
}));