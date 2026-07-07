import type { Product } from '@/types/inventory'

export const mockProducts: Product[] = [
    { id: 'PROD-001', name: 'Wireless Mouse', sku: 'WM-001', category: 'Peripherals', price: 29.99, stock: 5, status: 'Low Stock', description: 'Ergonomic wireless mouse with USB-C charging.', createdAt: '2026-06-01', updatedAt: '2026-07-01' },
    { id: 'PROD-002', name: 'Mechanical Keyboard', sku: 'MK-002', category: 'Peripherals', price: 89.99, stock: 120, status: 'In Stock', description: 'RGB mechanical keyboard with Cherry MX switches.', createdAt: '2026-05-15', updatedAt: '2026-07-02' },
    { id: 'PROD-003', name: 'USB-C Hub 7-in-1', sku: 'UC-003', category: 'Accessories', price: 45.0, stock: 3, status: 'Low Stock', description: '7-port USB-C hub with HDMI, SD card, and USB 3.0.', createdAt: '2026-06-10', updatedAt: '2026-07-01' },
    { id: 'PROD-004', name: '27" 4K Monitor', sku: 'MN-004', category: 'Electronics', price: 349.0, stock: 22, status: 'In Stock', description: '27-inch 4K UHD IPS monitor with HDR support.', createdAt: '2026-04-20', updatedAt: '2026-06-28' },
    { id: 'PROD-005', name: 'Webcam HD 1080p', sku: 'WC-005', category: 'Electronics', price: 59.99, stock: 0, status: 'Out of Stock', description: 'Full HD 1080p webcam with built-in microphone.', createdAt: '2026-06-05', updatedAt: '2026-06-30' },
    { id: 'PROD-006', name: 'USB-C Cable 2m', sku: 'UC-006', category: 'Cables', price: 12.99, stock: 3, status: 'Low Stock', description: 'Braided USB-C to USB-C cable, 2 meters.', createdAt: '2026-06-15', updatedAt: '2026-07-01' },
    { id: 'PROD-007', name: 'Bluetooth Speaker', sku: 'BS-007', category: 'Electronics', price: 39.99, stock: 45, status: 'In Stock', description: 'Portable Bluetooth 5.0 speaker with 12hr battery.', createdAt: '2026-05-01', updatedAt: '2026-07-03' },
    { id: 'PROD-008', name: 'Mouse Pad XL', sku: 'MP-008', category: 'Accessories', price: 19.99, stock: 8, status: 'Low Stock', description: 'Extra-large gaming mouse pad with stitched edges.', createdAt: '2026-06-20', updatedAt: '2026-07-02' },
    { id: 'PROD-009', name: 'External SSD 1TB', sku: 'SS-009', category: 'Storage', price: 109.99, stock: 18, status: 'In Stock', description: 'Portable 1TB SSD with USB 3.2 Gen 2, up to 1050MB/s.', createdAt: '2026-04-10', updatedAt: '2026-06-25' },
    { id: 'PROD-010', name: 'HDMI Cable 3m', sku: 'HC-010', category: 'Cables', price: 9.99, stock: 60, status: 'In Stock', description: 'High-speed HDMI 2.1 cable, 3 meters, 4K@120Hz.', createdAt: '2026-06-25', updatedAt: '2026-07-01' },
]

export const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'In Stock': 'default',
    'Low Stock': 'secondary',
    'Out of Stock': 'destructive',
}
