import Inventory from '@/features/inventory/Inventory'
import ProductPreview from '@/features/inventory/ProductPreview'
import Dashboard from '../features/dashboard/Dashboard'
import Categories from '@/features/categories/Categories'
import Orders from '@/features/orders/Orders'
import OrderPreview from '@/features/orders/OrderPreview'

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
        path: '/inventory/:id',
        element: <ProductPreview />,
    },
    {
        path: '/orders',
        element: <Orders />,
    },
    {
        path: '/orders/:id',
        element: <OrderPreview />,
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
        element: <Categories />,
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
