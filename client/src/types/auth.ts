export interface User {
    id: string
    name: string
    email: string
}

export interface AuthResponse {
    user: User
    token: string
}

export interface SignUpPayload {
    name: string
    email: string
    password: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface GetAllPaymentPayload {
    page: number,
    pageSize: number,
    search: string
}

export interface CreateProductPayload {
    productName: string,
    sku: string,
    category: string,
    barcode: string,
    price: number,
    stockQuantity: number,
    description: string
}