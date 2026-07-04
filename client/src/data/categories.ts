import type { Category } from '@/types/category'

export const mockCategories: Category[] = [
    { id: 'CAT-001', name: 'Electronics', slug: 'electronics', description: 'Electronic devices and components including monitors, speakers, and webcams.', productCount: 45, status: 'Active', createdAt: '2026-01-15' },
    { id: 'CAT-002', name: 'Accessories', slug: 'accessories', description: 'Computer accessories such as hubs, adapters, and mouse pads.', productCount: 32, status: 'Active', createdAt: '2026-01-20' },
    { id: 'CAT-003', name: 'Peripherals', slug: 'peripherals', description: 'Input and output devices like keyboards, mice, and webcams.', productCount: 28, status: 'Active', createdAt: '2026-02-01' },
    { id: 'CAT-004', name: 'Cables', slug: 'cables', description: 'Various cables including USB-C, HDMI, and charging cables.', productCount: 18, status: 'Active', createdAt: '2026-02-10' },
    { id: 'CAT-005', name: 'Storage', slug: 'storage', description: 'Data storage solutions including SSDs and external drives.', productCount: 15, status: 'Active', createdAt: '2026-03-01' },
    { id: 'CAT-006', name: 'Networking', slug: 'networking', description: 'Networking equipment like routers, switches, and adapters.', productCount: 0, status: 'Inactive', createdAt: '2026-03-15' },
]
