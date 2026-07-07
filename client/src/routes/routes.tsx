import Login from '@/features/auth/Login'
import SignUp from '@/features/auth/SignUp'
import Inventory from '@/features/inventory/Inventory'
import ProductPreview from '@/features/inventory/ProductPreview'
import Dashboard from '../features/dashboard/Dashboard'
import Categories from '@/features/categories/Categories'
import Orders from '@/features/orders/Orders'
import OrderPreview from '@/features/orders/OrderPreview'
import Settings from '@/features/settings/Settings'
import Customers from '@/features/customers/Customers'
import CustomerPreview from '@/features/customers/CustomerPreview'

export const routes = [
    {
        path: '/login',
        element: <Login />,
        hideNavbar: true,
    },
    {
        path: '/signup',
        element: <SignUp />,
        hideNavbar: true,
    },
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
        element: <Customers />,
    },
    {
        path: '/customers/:id',
        element: <CustomerPreview />,
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
        element: <Settings />,
    },
]
