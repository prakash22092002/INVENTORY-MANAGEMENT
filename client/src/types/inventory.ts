
import type { Category } from './category'

export interface Product {
    id: string
    name: string
    sku: string
    category?: Category | string | Record<string, any>
    categoryId?: string
    price: number
    stock: number
    barcode: string
    status: string
    description: string
    createdAt: string
    updatedAt: string
    createdBy?: string
    updatedBy?: string
}

