import api from './axios'
import type { SignUpPayload, LoginPayload } from '@/types/auth'

export const signUpApi = async (payload: SignUpPayload) => {
    const response = await api.post('/api/users/signup', payload)
    return response.data
}

export const signInApi = async (payload: LoginPayload) => {
    const response = await api.post('/api/users/signin', payload)
    return response.data
}
