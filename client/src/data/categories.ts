import type { Category } from '@/types/category'

export const mockCategories: Category[] = [
    { id: 'CAT-001', name: 'Oil', slug: 'oil', description: 'Oil and related products.', productCount: 45, status: 'Active', createdAt: '2026-01-15' },
    { id: 'CAT-002', name: 'Powder', slug: 'powder', description: 'Powder and related products.', productCount: 32, status: 'Active', createdAt: '2026-01-20' },
    { id: 'CAT-003', name: 'Fruits', slug: 'fruits', description: 'Fruits and related products.', productCount: 28, status: 'Active', createdAt: '2026-02-01' },
    { id: 'CAT-004', name: 'Vegetables', slug: 'vegetables', description: 'Vegetables and related products.', productCount: 18, status: 'Active', createdAt: '2026-02-10' },
    { id: 'CAT-005', name: 'Storage', slug: 'storage', description: 'Data storage solutions including SSDs and external drives.', productCount: 15, status: 'Active', createdAt: '2026-03-01' },
]
