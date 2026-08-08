import { useState, useEffect, useRef } from 'react'
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
import {
    Package,
    Plus,
    X,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'

import ProductFormModal from './ProductFormModal'
import { getAllProductsApi } from '@/services/api/auth'
import { toast } from 'sonner'
import SearchBar from '@/components/common/SearchBar'

const Inventory = () => {
    const navigate = useNavigate()
    const [createOpen, setCreateOpen] = useState(false)

    const [productLoader, setProductLoader] = useState(false)
    const [productData, setProductData] = useState<any[]>([])
    const [totalProducts, setTotalProducts] = useState(0)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Search state
    const [search, setSearch] = useState('')
    const isInitialMount = useRef(true)

    const handleGetAllProducts = async (
        pageNum: number = currentPage,
        size: number = pageSize,
        searchQuery: string = search
    ) => {
        setProductLoader(true)
        try {
            const payload = {
                page: pageNum - 1,
                pageSize: size,
                search: searchQuery,
            }

            const response = await getAllProductsApi(payload)

            if (response.es === 0 && response.data) {
                setProductData(response.data.products || [])
                setTotalProducts(response.data.total ?? 0)
            } else if (Array.isArray(response.data)) {
                setProductData(response.data)
                setTotalProducts(response.data.length)
            } else if (Array.isArray(response)) {
                setProductData(response)
                setTotalProducts(response.length)
            } else {
                setProductData([])
                setTotalProducts(0)
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'An error occurred while fetching products')
        }
        setProductLoader(false)
    }

    // Effect to refetch products whenever currentPage, pageSize, or search changes
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            handleGetAllProducts(1, pageSize, '')
            return
        }

        const timer = setTimeout(() => {
            handleGetAllProducts(currentPage, pageSize, search)
        }, 300)

        return () => clearTimeout(timer)
    }, [currentPage, pageSize, search])

    // Server-side pagination calculations
    const totalPages = Math.ceil(totalProducts / pageSize) || 1
    const startIndex = (currentPage - 1) * pageSize

    return (
        <div className="inventory flex flex-col gap-6">
            <div className="inventory-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="inventory-header-info flex flex-col gap-1">
                    <h1 className="inventory-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Inventory
                    </h1>
                    <p className="inventory-header-subtitle text-sm text-muted-foreground">
                        Manage your products and stock levels.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <SearchBar
                        value={search}
                        onChange={(val) => {
                            setSearch(val)
                            setCurrentPage(1)
                        }}
                        onClear={() => setCurrentPage(1)}
                        placeholder="Search by product name..."
                        loading={productLoader}
                    />

                    <button
                        onClick={() => setCreateOpen(true)}
                        className="inventory-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm"
                    >
                        <Plus className="inventory-create-btn-icon size-4" />
                        Create Product
                    </button>
                </div>
            </div>

            {(totalProducts > 0 || search) && (
                <div className="inventory-filter-bar flex items-center gap-2 flex-wrap">
                    <span className="inventory-filter-label text-sm text-muted-foreground">Filtered by:</span>
                    <Badge
                        variant="outline"
                        className="inventory-filter-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    >
                        <span className="inventory-filter-badge-text">
                            {search ? `Search: "${search}"` : 'All Products'}
                        </span>
                        {search && (
                            <button
                                onClick={() => {
                                    setSearch('')
                                    setCurrentPage(1)
                                }}
                                className="inventory-filter-clear-btn flex size-4 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            >
                                <X className="inventory-filter-clear-icon size-3" />
                            </button>
                        )}
                    </Badge>
                </div>
            )}

            <Card className="inventory-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="inventory-table-card-header">
                    <CardTitle className="inventory-table-card-title text-sm font-semibold">
                        All Products ({totalProducts})
                    </CardTitle>
                </CardHeader>
                <CardContent className="inventory-table-card-body p-0">
                    <Table className="inventory-table">
                        <TableHeader className="inventory-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Product</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">SKU</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Barcode</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Price</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Stock</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="inventory-table-body">
                            {productLoader ? (
                                <TableRow className="inventory-table-loading-row">
                                    <TableCell colSpan={6} className="py-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                                            <Loader2 className="size-6 animate-spin text-zinc-500" />
                                            <span>Loading products...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : productData.length === 0 ? (
                                <TableRow className="inventory-table-empty-row">
                                    <TableCell colSpan={6} className="inventory-table-empty-cell py-12 text-center text-sm text-muted-foreground">
                                        {search ? `No products matching "${search}"` : 'No products found in this Inventory.'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                productData.map((product: any) => {
                                    const productId = product._id || product.id;
                                    const productName = product.productName || product.name;
                                    const stockQuantity = product.stockQuantity ?? product.stock ?? 0;
                                    const status = product.stockAlert || product.status || 'in_stock';
                                    const price = typeof product.price === 'number' ? product.price : parseFloat(product.price || '0');

                                    return (
                                        <TableRow
                                            key={productId}
                                            onClick={() => navigate(`/inventory/${productId}`)}
                                            className="inventory-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                        >
                                            <TableCell className="inventory-table-cell inventory-table-cell--name py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                        <Package className="size-4 text-zinc-500" />
                                                    </div>
                                                    <span className="text-sm font-medium">{productName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--sku py-3 text-sm text-muted-foreground">
                                                {product.sku}
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--category py-3 text-sm text-muted-foreground">
                                                {product.barcode || 'N/A'}
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--category py-3 text-sm text-muted-foreground">
                                                {product.category?.categoryName || "N/A"}
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--price py-3 text-right text-sm font-medium">
                                                ₹{price.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--stock py-3 text-right text-sm">
                                                {stockQuantity}
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--status py-3 text-right">
                                                <Badge
                                                    variant={status === 'out_of_stock' ? 'destructive' : status === 'low_stock' ? 'outline' : 'default'}
                                                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                                >
                                                    {status.replace(/_/g, ' ')}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls Footer */}
                    {totalProducts > 0 && (
                        <div className="flex flex-col gap-3 px-6 py-4 border-t border-zinc-200/50 dark:border-zinc-700/40 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-xs text-muted-foreground">
                                    Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalProducts > 0 ? startIndex + 1 : 0}</span> to{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{Math.min(startIndex + productData.length, totalProducts)}</span> of{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalProducts}</span> entries
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Rows per page:</span>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(Number(e.target.value))
                                            setCurrentPage(1)
                                        }}
                                        className="h-8 rounded-lg border border-zinc-200/80 bg-white/80 px-2 text-xs font-medium text-zinc-900 outline-none hover:border-zinc-300 dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-600"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1 || productLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="First Page"
                                >
                                    <ChevronsLeft className="size-4" />
                                </button>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || productLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Previous Page"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>

                                <span className="px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || productLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Next Page"
                                >
                                    <ChevronRight className="size-4" />
                                </button>

                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages || productLoader}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Last Page"
                                >
                                    <ChevronsRight className="size-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
            <ProductFormModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={() => handleGetAllProducts(currentPage, pageSize, search)} />
        </div>
    )
}

export default Inventory
