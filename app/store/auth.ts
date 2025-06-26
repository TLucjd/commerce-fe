import { create } from 'zustand'
import { api } from '@/lib/api'

interface AuthState {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { access_token } = res.data as { access_token: string }
    localStorage.setItem('access_token', access_token)
    set({ isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('access_token')
    set({ isAuthenticated: false })
  },
}))
