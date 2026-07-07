export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface Product {
    id: string
    name: string
    sku: string
    category: string
    price: number
    stock: number
    status: ProductStatus
    description: string
    createdAt: string
    updatedAt: string
}
