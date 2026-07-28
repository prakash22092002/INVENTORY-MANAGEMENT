import api from './axios'
import type { SignUpPayload, LoginPayload, GetAllPaymentPayload, CreateProductPayload, EditProductPayload } from '@/types/auth'

export const signUpApi = async (payload: SignUpPayload) => {
    const response = await api.post('/api/users/signup', payload)
    return response.data
}

export const signInApi = async (payload: LoginPayload) => {
    const response = await api.post('/api/users/signin', payload)
    return response.data
}

export const getAllProductsApi = async (payload: GetAllPaymentPayload) => {
    const response = await api.post('/api/product', payload)
    return response.data;
}

export const createProductApi = async (payload: CreateProductPayload) => {
    const response = await api.post('/api/product/add', payload);
    return response.data;
}

export const editProductApi = async (payload: EditProductPayload) => {
    const response = await api.post('/api/product/edit', payload);
    return response.data;
}

export const getProductByIdApi = async (productId: string) => {
    const response = await api.get(`/api/product/${productId}`);
    return response.data;
}

export const deleteProductByIdApi = async (productId: string) => {
    const response = await api.get(`/api/product/delete/${productId}`);
    return response.data;
}

