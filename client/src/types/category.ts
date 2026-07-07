export interface Category {
    id: string
    name: string
    slug: string
    description: string
    productCount: number
    status: 'Active' | 'Inactive'
    createdAt: string
}
