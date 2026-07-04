import Inventory from '@/features/inventory/Inventory'
import Dashboard from '../features/dashboard/Dashboard'

export const routes = [
    {
        path: '/',
        element: <Dashboard />,
    },
    {
        path: '/inventory',
        element: <Inventory />,
    },
    {
        path: '/orders',
        element: <div>Orders</div>,
    },
    {
        path: '/customers',
        element: <div>Customers</div>,
    },
    {
        path: '/suppliers',
        element: <div>Suppliers</div>,
    },
    {
        path: '/categories',
        element: <div>Categories</div>,
    },
    {
        path: '/reports',
        element: <div>Reports</div>,
    },
    {
        path: '/settings',
        element: <div>Settings</div>,
    },
]
