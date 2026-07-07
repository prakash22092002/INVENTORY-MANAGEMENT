export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export interface OrderItem {
    productId: string
    name: string
    quantity: number
    price: number
}

export interface Order {
    id: string
    customer: string
    email: string
    items: OrderItem[]
    total: number
    status: OrderStatus
    shippingAddress: string
    paymentMethod: string
    createdAt: string
    updatedAt: string
}
