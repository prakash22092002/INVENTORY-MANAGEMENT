export interface Customer {
    id: string
    name: string
    email: string
    phone: string
    company: string
    totalOrders: number
    totalSpent: number
    status: 'Active' | 'Inactive'
    joinDate: string
    lastOrderDate: string
    address: string
    city: string
    country: string
}
