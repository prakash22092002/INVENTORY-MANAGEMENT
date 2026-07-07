import { create } from 'zustand'
import type { User, SignUpPayload, LoginPayload } from '@/types/auth'

const MOCK_USER: User = {
    id: '1',
    name: 'Prakash Paudel',
    email: 'prakash@example.com',
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null

    signUp: (payload: SignUpPayload) => Promise<void>
    login: (payload: LoginPayload) => Promise<void>
    checkAuth: () => Promise<void>
    logout: () => Promise<void>
    clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    signUp: async (payload) => {
        set({ isLoading: true, error: null })
        await new Promise((r) => setTimeout(r, 800))
        const user: User = { id: Date.now().toString(), name: payload.name, email: payload.email }
        set({ user, isAuthenticated: true, isLoading: false })
    },

    login: async (payload) => {
        set({ isLoading: true, error: null })
        await new Promise((r) => setTimeout(r, 800))

        if (!payload.email || !payload.password) {
            set({ error: 'Email and password are required', isLoading: false })
            return
        }

        set({ user: MOCK_USER, isAuthenticated: true, isLoading: false })
    },

    checkAuth: async () => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 300))
        set({ user: MOCK_USER, isAuthenticated: true, isLoading: false })
    },

    logout: async () => {
        await new Promise((r) => setTimeout(r, 200))
        set({ user: null, isAuthenticated: false, error: null })
    },

    clearError: () => set({ error: null }),
}))
