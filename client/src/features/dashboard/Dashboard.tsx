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
import {
    Package,
    AlertTriangle,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Star,
    Users,
    PackageCheck,
    RotateCcw,
    Wallet,
} from 'lucide-react'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    BarChart,
    Bar,
} from 'recharts'

const statCardsData = [
    {
        id: 'stat-total-products',
        title: 'Total Products',
        value: '2,845',
        change: '+12.5%',
        icon: Package,
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-500 dark:text-blue-400',
        trendColor: 'text-emerald-600 dark:text-emerald-400',
        trendBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    },
    {
        id: 'stat-low-stock',
        title: 'Low Stock Items',
        value: '48',
        change: '+8.2%',
        icon: AlertTriangle,
        iconBg: 'bg-amber-50 dark:bg-amber-950/40',
        iconColor: 'text-amber-500 dark:text-amber-400',
        trendColor: 'text-rose-500 dark:text-rose-400',
        trendBg: 'bg-rose-50/80 dark:bg-rose-950/30',
    },
    {
        id: 'stat-total-orders',
        title: 'Total Orders',
        value: '1,632',
        change: '+23.1%',
        icon: ShoppingCart,
        iconBg: 'bg-sky-50 dark:bg-sky-950/40',
        iconColor: 'text-sky-500 dark:text-sky-400',
        trendColor: 'text-emerald-600 dark:text-emerald-400',
        trendBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    },
    {
        id: 'stat-revenue',
        title: 'Revenue',
        value: '$48,290',
        change: '+18.7%',
        icon: DollarSign,
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
        iconColor: 'text-emerald-500 dark:text-emerald-400',
        trendColor: 'text-emerald-600 dark:text-emerald-400',
        trendBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    },
]

const chartData = [
    { name: 'Mon', sales: 4000, orders: 2400 },
    { name: 'Tue', sales: 3000, orders: 1398 },
    { name: 'Wed', sales: 2000, orders: 3800 },
    { name: 'Thu', sales: 2780, orders: 3908 },
    { name: 'Fri', sales: 1890, orders: 4800 },
    { name: 'Sat', sales: 2390, orders: 3800 },
    { name: 'Sun', sales: 3490, orders: 4300 },
]

const recentOrders = [
    {
        id: '#ORD-001',
        customer: 'Alice Johnson',
        product: 'Wireless Mouse',
        status: 'Delivered',
        amount: '$29.99',
        date: '2026-07-04',
    },
    {
        id: '#ORD-002',
        customer: 'Bob Smith',
        product: 'Mechanical Keyboard',
        status: 'Pending',
        amount: '$89.99',
        date: '2026-07-03',
    },
    {
        id: '#ORD-003',
        customer: 'Carol White',
        product: 'USB-C Hub',
        status: 'Processing',
        amount: '$45.00',
        date: '2026-07-03',
    },
    {
        id: '#ORD-004',
        customer: 'David Lee',
        product: '27" Monitor',
        status: 'Delivered',
        amount: '$349.00',
        date: '2026-07-02',
    },
    {
        id: '#ORD-005',
        customer: 'Eve Davis',
        product: 'Webcam HD',
        status: 'Cancelled',
        amount: '$59.99',
        date: '2026-07-02',
    },
]

const statusVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'> = {
    Delivered: 'default',
    Processing: 'secondary',
    Pending: 'outline',
    Cancelled: 'destructive',
}

const summaryItems = [
    { label: 'Top Product', value: 'Wireless Mouse', icon: Star, iconColor: 'text-amber-500 dark:text-amber-400' },
    { label: 'New Customers', value: '+128 this month', icon: Users, iconColor: 'text-blue-500 dark:text-blue-400' },
    { label: 'Order Fulfillment', value: '94.2%', icon: PackageCheck, iconColor: 'text-emerald-500 dark:text-emerald-400' },
    { label: 'Pending Returns', value: '12 items', icon: RotateCcw, iconColor: 'text-orange-500 dark:text-orange-400' },
    { label: 'Avg. Order Value', value: '$52.40', icon: Wallet, iconColor: 'text-violet-500 dark:text-violet-400' },
]

const topProducts = [
    { rank: 1, name: 'Wireless Mouse', category: 'Peripherals', units: 1240, revenue: '$24,800' },
    { rank: 2, name: 'Mechanical Keyboard', category: 'Peripherals', units: 890, revenue: '$53,400' },
    { rank: 3, name: 'USB-C Hub', category: 'Accessories', units: 654, revenue: '$29,430' },
    { rank: 4, name: '27" Monitor', category: 'Electronics', units: 432, revenue: '$150,768' },
    { rank: 5, name: 'Webcam HD', category: 'Electronics', units: 387, revenue: '$23,181' },
]

const categoryDistribution = [
    { name: 'Electronics', products: 45, value: 45 },
    { name: 'Accessories', products: 32, value: 32 },
    { name: 'Peripherals', products: 28, value: 28 },
    { name: 'Cables', products: 18, value: 18 },
    { name: 'Storage', products: 15, value: 15 },
]

const stockAlerts = [
    { product: 'Wireless Mouse', sku: 'WM-001', quantity: 5, threshold: 20 },
    { product: 'USB-C Cable 2m', sku: 'UC-012', quantity: 3, threshold: 30 },
    { product: 'HDMI Adapter', sku: 'HD-008', quantity: 2, threshold: 15 },
    { product: 'Mouse Pad XL', sku: 'MP-022', quantity: 8, threshold: 25 },
    { product: 'Bluetooth Speaker', sku: 'BS-005', quantity: 4, threshold: 10 },
]

const Dashboard = () => {
    return (
        <div className="dashboard flex flex-col gap-6">
            <div className="dashboard-header flex flex-col gap-1">
                <h1 className="dashboard-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                    Prakash Paudel
                </h1>
                <p className="dashboard-header-subtitle text-sm text-muted-foreground">
                    Welcome back, Prakash.
                </p>
            </div>

            <div className="dashboard-stat-grid grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {statCardsData?.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card
                            key={stat.id}
                            className="dashboard-stat-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl transition-all duration-200 hover:bg-white/80 hover:shadow-md dark:border-zinc-700/40 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/70"
                        >
                            <CardHeader className="dashboard-stat-card-header flex flex-row items-center justify-between gap-3">
                                <div className={`dashboard-stat-card-icon-wrapper flex size-9 items-center justify-center rounded-xl ${stat.iconBg}`}>
                                    <Icon className={`dashboard-stat-card-icon size-4.5 ${stat.iconColor}`} />
                                </div>
                                <span className={`dashboard-stat-card-trend-badge ${stat.trendBg} ${stat.trendColor} inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium`}>
                                    <TrendingUp className="dashboard-stat-card-trend-icon size-3" />
                                    {stat.change}
                                </span>
                            </CardHeader>
                            <CardContent className="dashboard-stat-card-body">
                                <p className="dashboard-stat-card-label text-xs text-muted-foreground">
                                    {stat.title}
                                </p>
                                <p className={`dashboard-stat-card-value mt-0.5 text-xl font-semibold tracking-tight`}>
                                    {stat.value}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="dashboard-chart-summary-grid grid grid-cols-1 gap-3 lg:grid-cols-3">
                <Card className="dashboard-chart-card lg:col-span-2 border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="dashboard-chart-card-header">
                        <CardTitle className="dashboard-chart-card-title text-sm font-semibold">
                            Sales Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="dashboard-chart-card-body">
                        <div className="dashboard-chart-container h-72 sm:h-80">
                            <ResponsiveContainer className="dashboard-chart-responsive" width="100%" height="100%">
                                <AreaChart className="dashboard-area-chart" data={chartData}>
                                    <defs className="dashboard-chart-defs">
                                        <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.12} />
                                            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid className="dashboard-chart-grid" strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} />
                                    <XAxis
                                        className="dashboard-chart-xaxis"
                                        dataKey="name"
                                        stroke="var(--muted-foreground)"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={8}
                                    />
                                    <YAxis
                                        className="dashboard-chart-yaxis"
                                        stroke="var(--muted-foreground)"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-4}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--popover)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius)',
                                            fontSize: '12px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                    />
                                    <Area
                                        className="dashboard-chart-area-sales"
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="var(--chart-1)"
                                        strokeWidth={1.5}
                                        fill="url(#salesFill)"
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                    />
                                    <Area
                                        className="dashboard-chart-area-orders"
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="var(--chart-2)"
                                        strokeWidth={1.5}
                                        fill="url(#ordersFill)"
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="dashboard-summary-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="dashboard-summary-card-header">
                        <CardTitle className="dashboard-summary-card-title text-sm font-semibold">
                            Quick Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="dashboard-summary-card-body flex flex-col gap-0">
                        {summaryItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.label}
                                    className="dashboard-summary-item group flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
                                >
                                    <span className="dashboard-summary-item-label flex items-center gap-2.5 text-sm text-muted-foreground">
                                        <Icon className={`dashboard-summary-item-icon size-3.5 ${item.iconColor}`} />
                                        {item.label}
                                    </span>
                                    <span className="dashboard-summary-item-value text-sm font-medium">
                                        {item.value}
                                    </span>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
            </div>

            <div className="dashboard-insights-grid grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Card className="dashboard-top-products border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="dashboard-top-products-header">
                        <CardTitle className="dashboard-top-products-title text-sm font-semibold">
                            Top Selling Products
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="dashboard-top-products-body">
                        <Table className="dashboard-top-products-table">
                            <TableHeader className="dashboard-top-products-table-header">
                                <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                    <TableHead className="h-8 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">#</TableHead>
                                    <TableHead className="h-8 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product</TableHead>
                                    <TableHead className="h-8 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Units</TableHead>
                                    <TableHead className="h-8 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {topProducts.map((p) => (
                                    <TableRow
                                        key={p.rank}
                                        className="border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                    >
                                        <TableCell className="py-2 text-xs text-muted-foreground">{p.rank}</TableCell>
                                        <TableCell className="py-2 text-sm font-medium">{p.name}</TableCell>
                                        <TableCell className="py-2 text-right text-sm">{p.units.toLocaleString()}</TableCell>
                                        <TableCell className="py-2 text-right text-sm font-medium">{p.revenue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="dashboard-category-chart border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardHeader className="dashboard-category-chart-header">
                        <CardTitle className="dashboard-category-chart-title text-sm font-semibold">
                            Inventory by Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="dashboard-category-chart-body">
                        <div className="dashboard-category-chart-container h-56">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryDistribution} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.4} horizontal={false} />
                                    <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        stroke="var(--muted-foreground)"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        width={90}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--popover)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 'var(--radius)',
                                            fontSize: '12px',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                            backdropFilter: 'blur(12px)',
                                        }}
                                    />
                                    <Bar dataKey="products" radius={[0, 4, 4, 0]} fill="var(--chart-1)" barSize={14} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="dashboard-stock-alerts border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="dashboard-stock-alerts-header">
                    <CardTitle className="dashboard-stock-alerts-title flex items-center gap-2 text-sm font-semibold">
                        <AlertTriangle className="size-4 text-amber-500" />
                        Low Stock Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent className="dashboard-stock-alerts-body">
                    <Table className="dashboard-stock-alerts-table">
                        <TableHeader className="dashboard-stock-alerts-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-8 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product</TableHead>
                                <TableHead className="h-8 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">SKU</TableHead>
                                <TableHead className="h-8 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">On Hand</TableHead>
                                <TableHead className="h-8 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Threshold</TableHead>
                                <TableHead className="h-8 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stockAlerts.map((item) => (
                                <TableRow
                                    key={item.sku}
                                    className="border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                >
                                    <TableCell className="py-2.5 text-sm font-medium">{item.product}</TableCell>
                                    <TableCell className="py-2.5 text-sm text-muted-foreground">{item.sku}</TableCell>
                                    <TableCell className="py-2.5 text-right text-sm font-medium text-rose-500">{item.quantity}</TableCell>
                                    <TableCell className="py-2.5 text-right text-sm text-muted-foreground">{item.threshold}</TableCell>
                                    <TableCell className="py-2.5 text-right">
                                        <Badge
                                            variant="destructive"
                                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                        >
                                            Reorder
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="dashboard-orders-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="dashboard-orders-card-header">
                    <CardTitle className="dashboard-orders-card-title text-sm font-semibold">
                        Recent Orders
                    </CardTitle>
                </CardHeader>
                <CardContent className="dashboard-orders-card-body">
                    <Table className="dashboard-orders-table">
                        <TableHeader className="dashboard-orders-table-header">
                            <TableRow className="dashboard-orders-table-head-row border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="dashboard-orders-table-head-cell dashboard-orders-table-head-cell--order h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Order
                                </TableHead>
                                <TableHead className="dashboard-orders-table-head-cell dashboard-orders-table-head-cell--customer h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Customer
                                </TableHead>
                                <TableHead className="dashboard-orders-table-head-cell dashboard-orders-table-head-cell--product h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Product
                                </TableHead>
                                <TableHead className="dashboard-orders-table-head-cell dashboard-orders-table-head-cell--status h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Status
                                </TableHead>
                                <TableHead className="dashboard-orders-table-head-cell dashboard-orders-table-head-cell--amount h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Amount
                                </TableHead>
                                <TableHead className="dashboard-orders-table-head-cell dashboard-orders-table-head-cell--date h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Date
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="dashboard-orders-table-body">
                            {recentOrders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    className="dashboard-orders-table-row border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                >
                                    <TableCell className="dashboard-orders-table-cell dashboard-orders-table-cell--order py-2.5 text-sm font-medium">
                                        {order.id}
                                    </TableCell>
                                    <TableCell className="dashboard-orders-table-cell dashboard-orders-table-cell--customer py-2.5 text-sm">
                                        {order.customer}
                                    </TableCell>
                                    <TableCell className="dashboard-orders-table-cell dashboard-orders-table-cell--product py-2.5 text-sm text-muted-foreground">
                                        {order.product}
                                    </TableCell>
                                    <TableCell className="dashboard-orders-table-cell dashboard-orders-table-cell--status py-2.5">
                                        <Badge
                                            variant={statusVariantMap[order.status]}
                                            className="dashboard-orders-table-badge rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                        >
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="dashboard-orders-table-cell dashboard-orders-table-cell--amount py-2.5 text-sm font-medium">
                                        {order.amount}
                                    </TableCell>
                                    <TableCell className="dashboard-orders-table-cell dashboard-orders-table-cell--date py-2.5 text-sm text-muted-foreground">
                                        {order.date}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard
