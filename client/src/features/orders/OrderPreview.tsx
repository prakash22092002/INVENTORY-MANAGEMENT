import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ShoppingCart, ArrowLeft, Package, Mail, MapPin, CreditCard, Calendar } from 'lucide-react'
import { mockOrders, orderStatusVariant } from '@/data/orders'

const OrderPreview = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const order = mockOrders.find((o) => o.id === id)

    if (!order) {
        return (
            <div className="order-preview-not-found flex flex-col items-center justify-center gap-4 py-24">
                <ShoppingCart className="order-preview-not-found-icon size-12 text-zinc-300" />
                <h2 className="order-preview-not-found-title text-lg font-semibold">Order not found</h2>
                <p className="order-preview-not-found-desc text-sm text-muted-foreground">The order you're looking for doesn't exist.</p>
                <Link to="/orders" className="order-preview-not-found-link inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    <ArrowLeft className="size-4" />
                    Back to Orders
                </Link>
            </div>
        )
    }

    const detailItems = [
        { label: 'Order ID', value: order.id, icon: ShoppingCart },
        { label: 'Email', value: order.email, icon: Mail },
        { label: 'Payment', value: order.paymentMethod, icon: CreditCard },
        { label: 'Created', value: order.createdAt, icon: Calendar },
        { label: 'Updated', value: order.updatedAt, icon: Calendar },
    ]

    return (
        <div className="order-preview flex flex-col gap-6">
            <div className="order-preview-back">
                <button
                    onClick={() => navigate('/orders')}
                    className="order-preview-back-btn inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                    <ArrowLeft className="order-preview-back-icon size-4" />
                    Back to Orders
                </button>
            </div>

            <div className="order-preview-hero flex flex-col gap-4 rounded-2xl border border-zinc-200/50 bg-white/60 p-5 shadow-sm shadow-zinc-900/5 backdrop-blur-xl sm:flex-row sm:items-start sm:justify-between dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <div className="order-preview-hero-info flex items-start gap-4">
                    <div className="order-preview-hero-icon-wrapper flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <ShoppingCart className="order-preview-hero-icon size-7 text-zinc-500" />
                    </div>
                    <div className="order-preview-hero-text flex flex-col gap-1.5">
                        <div className="order-preview-hero-title-row flex items-center gap-2.5">
                            <h1 className="order-preview-hero-name text-xl font-semibold tracking-tight sm:text-2xl">{order.id}</h1>
                            <Badge
                                variant={orderStatusVariant[order.status]}
                                className="order-preview-hero-badge rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            >
                                {order.status}
                            </Badge>
                        </div>
                        <p className="order-preview-hero-desc text-sm text-muted-foreground">
                            {order.customer} &middot; ${order.total.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="order-preview-grid grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Card className="order-preview-details border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="order-preview-details-header">
                        <CardTitle className="order-preview-details-title text-sm font-semibold">
                            Order Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="order-preview-details-body">
                        <div className="order-preview-detail-grid grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
                            {detailItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={item.label}
                                        className="order-preview-detail-item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
                                    >
                                        <Icon className="order-preview-detail-item-icon size-4 text-zinc-400" />
                                        <div className="order-preview-detail-item-text flex flex-col">
                                            <span className="order-preview-detail-item-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                                {item.label}
                                            </span>
                                            <span className="order-preview-detail-item-value text-sm font-medium">{item.value}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card className="order-preview-shipping border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="order-preview-shipping-header">
                        <CardTitle className="order-preview-shipping-title text-sm font-semibold">
                            Shipping Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="order-preview-shipping-body">
                        <div className="order-preview-shipping-address flex items-start gap-3 rounded-lg px-3 py-2.5">
                            <MapPin className="order-preview-shipping-icon size-4 text-zinc-400 mt-0.5" />
                            <span className="order-preview-shipping-text text-sm">{order.shippingAddress}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="order-preview-items border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="order-preview-items-header">
                    <CardTitle className="order-preview-items-title text-sm font-semibold">
                        Order Items
                    </CardTitle>
                </CardHeader>
                <CardContent className="order-preview-items-body">
                    <Table className="order-preview-items-table">
                        <TableHeader className="order-preview-items-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Qty</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Price</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="order-preview-items-table-body">
                            {order.items.map((item) => (
                                <TableRow
                                    key={item.productId}
                                    className="border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                >
                                    <TableCell className="order-preview-items-cell order-preview-items-cell--product py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                <Package className="size-4 text-zinc-500" />
                                            </div>
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="order-preview-items-cell order-preview-items-cell--qty py-3 text-right text-sm">
                                        {item.quantity}
                                    </TableCell>
                                    <TableCell className="order-preview-items-cell order-preview-items-cell--price py-3 text-right text-sm text-muted-foreground">
                                        ${item.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="order-preview-items-cell order-preview-items-cell--subtotal py-3 text-right text-sm font-medium">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="order-preview-items-total flex items-center justify-end gap-6 border-t border-zinc-200/50 px-3 py-3 dark:border-zinc-700/40">
                        <span className="text-sm font-semibold">Total</span>
                        <span className="text-sm font-semibold">${order.total.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default OrderPreview
