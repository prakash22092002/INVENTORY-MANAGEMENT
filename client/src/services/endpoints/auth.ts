import api from '../api/axios'
import type { AuthResponse, SignUpPayload, LoginPayload } from '@/types/auth'

export const signUp = async (payload: SignUpPayload) => {
    const { data } = await api.post<AuthResponse>('/auth/signup', payload)
    return data
}

export const login = async (payload: LoginPayload) => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload)
    return data
}

export const getMe = async () => {
    const { data } = await api.get<AuthResponse>('/auth/me')
    return data
}

export const logout = async () => {
    await api.post('/auth/logout')
}
