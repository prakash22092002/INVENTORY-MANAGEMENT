import { useNavigate } from 'react-router-dom'
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
import { ShoppingCart, Plus } from 'lucide-react'
import { mockOrders, orderStatusVariant } from '@/data/orders'

const Orders = () => {
    const navigate = useNavigate()

    return (
        <div className="orders flex flex-col gap-6">
            <div className="orders-header flex items-center justify-between">
                <div className="orders-header-info flex flex-col gap-1">
                    <h1 className="orders-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Orders
                    </h1>
                    <p className="orders-header-subtitle text-sm text-muted-foreground">
                        Track and manage customer orders.
                    </p>
                </div>
                <button className="orders-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300">
                    <Plus className="orders-create-btn-icon size-4" />
                    Create Order
                </button>
            </div>

            <Card className="orders-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="orders-table-card-header">
                    <CardTitle className="orders-table-card-title text-sm font-semibold">
                        All Orders
                    </CardTitle>
                </CardHeader>
                <CardContent className="orders-table-card-body">
                    <Table className="orders-table">
                        <TableHeader className="orders-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Order</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Customer</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Items</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="orders-table-body">
                            {mockOrders.length === 0 ? (
                                <TableRow className="orders-table-empty-row">
                                    <TableCell colSpan={6} className="orders-table-empty-cell py-12 text-center text-sm text-muted-foreground">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                mockOrders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        onClick={() => navigate(`/orders/${order.id}`)}
                                        className="orders-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                    >
                                        <TableCell className="orders-table-cell orders-table-cell--order py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                    <ShoppingCart className="size-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm font-medium">{order.id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="orders-table-cell orders-table-cell--customer py-3 text-sm">
                                            {order.customer}
                                        </TableCell>
                                        <TableCell className="orders-table-cell orders-table-cell--items py-3 text-sm text-muted-foreground">
                                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                        </TableCell>
                                        <TableCell className="orders-table-cell orders-table-cell--total py-3 text-right text-sm font-medium">
                                            ${order.total.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="orders-table-cell orders-table-cell--status py-3 text-right">
                                            <Badge
                                                variant={orderStatusVariant[order.status]}
                                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="orders-table-cell orders-table-cell--date py-3 text-right text-sm text-muted-foreground">
                                            {order.createdAt}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Orders
