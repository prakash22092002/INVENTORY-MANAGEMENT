import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, ArrowLeft, Mail, Phone, MapPin, Building, Calendar, ShoppingCart, DollarSign } from 'lucide-react'
import { mockCustomers, customerStatusVariant } from '@/data/customers'

const CustomerPreview = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const customer = mockCustomers.find((c) => c.id === id)

    if (!customer) {
        return (
            <div className="customer-preview-not-found flex flex-col items-center justify-center gap-4 py-24">
                <Users className="customer-preview-not-found-icon size-12 text-zinc-300" />
                <h2 className="customer-preview-not-found-title text-lg font-semibold">Customer not found</h2>
                <p className="customer-preview-not-found-desc text-sm text-muted-foreground">The customer you're looking for doesn't exist.</p>
                <Link to="/customers" className="customer-preview-not-found-link inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    <ArrowLeft className="size-4" />
                    Back to Customers
                </Link>
            </div>
        )
    }

    const detailItems = [
        { label: 'Customer ID', value: customer.id, icon: Users },
        { label: 'Email', value: customer.email, icon: Mail },
        { label: 'Phone', value: customer.phone, icon: Phone },
        { label: 'Company', value: customer.company, icon: Building },
        { label: 'Total Orders', value: customer.totalOrders.toString(), icon: ShoppingCart },
        { label: 'Total Spent', value: `$${customer.totalSpent.toFixed(2)}`, icon: DollarSign },
        { label: 'Joined', value: customer.joinDate, icon: Calendar },
        { label: 'Last Order', value: customer.lastOrderDate, icon: Calendar },
    ]

    return (
        <div className="customer-preview flex flex-col gap-6">
            <div className="customer-preview-back">
                <button
                    onClick={() => navigate('/customers')}
                    className="customer-preview-back-btn inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                    <ArrowLeft className="customer-preview-back-icon size-4" />
                    Back to Customers
                </button>
            </div>

            <div className="customer-preview-hero flex flex-col gap-4 rounded-2xl border border-zinc-200/50 bg-white/60 p-5 shadow-sm shadow-zinc-900/5 backdrop-blur-xl sm:flex-row sm:items-start sm:justify-between dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <div className="customer-preview-hero-info flex items-start gap-4">
                    <div className="customer-preview-hero-icon-wrapper flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <Users className="customer-preview-hero-icon size-7 text-zinc-500" />
                    </div>
                    <div className="customer-preview-hero-text flex flex-col gap-1.5">
                        <div className="customer-preview-hero-title-row flex items-center gap-2.5">
                            <h1 className="customer-preview-hero-name text-xl font-semibold tracking-tight sm:text-2xl">{customer.name}</h1>
                            <Badge
                                variant={customerStatusVariant[customer.status]}
                                className="customer-preview-hero-badge rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            >
                                {customer.status}
                            </Badge>
                        </div>
                        <p className="customer-preview-hero-desc text-sm text-muted-foreground">
                            {customer.company} &middot; {customer.city}, {customer.country}
                        </p>
                    </div>
                </div>
            </div>

            <div className="customer-preview-grid grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Card className="customer-preview-details border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="customer-preview-details-header">
                        <CardTitle className="customer-preview-details-title text-sm font-semibold">
                            Customer Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="customer-preview-details-body">
                        <div className="customer-preview-detail-grid grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                            {detailItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={item.label}
                                        className="customer-preview-detail-item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
                                    >
                                        <Icon className="customer-preview-detail-item-icon size-4 text-zinc-400" />
                                        <div className="customer-preview-detail-item-text flex flex-col">
                                            <span className="customer-preview-detail-item-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                {item.label}
                                            </span>
                                            <span className="customer-preview-detail-item-value text-sm font-medium">{item.value}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card className="customer-preview-address border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="customer-preview-address-header">
                        <CardTitle className="customer-preview-address-title text-sm font-semibold">
                            Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="customer-preview-address-body">
                        <div className="customer-preview-address-detail flex items-start gap-3 rounded-lg px-3 py-2.5">
                            <MapPin className="customer-preview-address-icon size-4 text-zinc-400 mt-0.5" />
                            <div className="customer-preview-address-text flex flex-col gap-0.5">
                                <span className="customer-preview-address-line text-sm">{customer.address}</span>
                                <span className="customer-preview-address-city text-sm text-muted-foreground">
                                    {customer.city}, {customer.country}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CustomerPreview
