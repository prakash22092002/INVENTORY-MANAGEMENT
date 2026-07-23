import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
import { Package, Plus, X } from 'lucide-react'
import { mockProducts, statusVariant } from '@/data/products'
import { mockCategories } from '@/data/categories'
import ProductFormModal from './ProductFormModal'

const Inventory = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [createOpen, setCreateOpen] = useState(false)

    const categorySlug = searchParams.get('category')
    const activeCategory = categorySlug
        ? mockCategories.find((c) => c.slug === categorySlug)
        : null

    const filteredProducts = useMemo(() => {
        if (!activeCategory) return mockProducts
        return mockProducts.filter(
            (p) => p.category.toLowerCase() === activeCategory.name.toLowerCase(),
        )
    }, [activeCategory])

    return (
        <div className="inventory flex flex-col gap-6">
            <div className="inventory-header flex items-center justify-between">
                <div className="inventory-header-info flex flex-col gap-1">
                    <h1 className="inventory-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        {activeCategory ? activeCategory.name : 'Inventory'}
                    </h1>
                    <p className="inventory-header-subtitle text-sm text-muted-foreground">
                        {activeCategory
                            ? `Showing products in ${activeCategory.name}`
                            : 'Manage your products and stock levels.'}
                    </p>
                </div>
                <button
                    onClick={() => setCreateOpen(true)}
                    className="inventory-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                >
                    <Plus className="inventory-create-btn-icon size-4" />
                    Create Product
                </button>
            </div>

            {activeCategory && (
                <div className="inventory-filter-bar flex items-center gap-2">
                    <span className="inventory-filter-label text-sm text-muted-foreground">Filtered by:</span>
                    <Badge
                        variant="outline"
                        className="inventory-filter-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    >
                        <span className="inventory-filter-badge-text">{activeCategory.name}</span>
                        <button
                            onClick={() => navigate('/inventory')}
                            className="inventory-filter-clear-btn flex size-4 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                            <X className="inventory-filter-clear-icon size-3" />
                        </button>
                    </Badge>
                </div>
            )}

            <Card className="inventory-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="inventory-table-card-header">
                    <CardTitle className="inventory-table-card-title text-sm font-semibold">
                        {activeCategory ? `${activeCategory.name} Products` : 'All Products'}
                    </CardTitle>
                </CardHeader>
                <CardContent className="inventory-table-card-body">
                    <Table className="inventory-table">
                        <TableHeader className="inventory-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">SKU</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Price</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Stock</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="inventory-table-body">
                            {filteredProducts.length === 0 ? (
                                <TableRow className="inventory-table-empty-row">
                                    <TableCell colSpan={6} className="inventory-table-empty-cell py-12 text-center text-sm text-muted-foreground">
                                        No products found in this category.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredProducts.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        onClick={() => navigate(`/inventory/${product.id}`)}
                                        className="inventory-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                    >
                                        <TableCell className="inventory-table-cell inventory-table-cell--name py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                    <Package className="size-4 text-zinc-500" />
                                                </div>
                                                <span className="text-sm font-medium">{product.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="inventory-table-cell inventory-table-cell--sku py-3 text-sm text-muted-foreground">
                                            {product.sku}
                                        </TableCell>
                                        <TableCell className="inventory-table-cell inventory-table-cell--category py-3 text-sm text-muted-foreground">
                                            {product.category}
                                        </TableCell>
                                        <TableCell className="inventory-table-cell inventory-table-cell--price py-3 text-right text-sm font-medium">
                                            ${product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="inventory-table-cell inventory-table-cell--stock py-3 text-right text-sm">
                                            {product.stock}
                                        </TableCell>
                                        <TableCell className="inventory-table-cell inventory-table-cell--status py-3 text-right">
                                            <Badge
                                                variant={statusVariant[product.status]}
                                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                            >
                                                {product.status.split('_').join(' ')}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <ProductFormModal open={createOpen} onClose={() => setCreateOpen(false)} />
        </div>
    )
}

export default Inventory
