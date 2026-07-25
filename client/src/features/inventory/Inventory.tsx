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
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'

import ProductFormModal from './ProductFormModal'
import { getAllProductsApi } from '@/services/api/auth'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const Inventory = () => {
    const navigate = useNavigate()
    const [createOpen, setCreateOpen] = useState(false)

    const [productLoader, setProductLoader] = useState(false)
    const [productData, setProductData] = useState<any[]>([])

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Search states & refs
    const [search, setSearch] = useState('')
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const isInitialMount = useRef(true)

    const handleGetAllProducts = async (searchQuery: string = search) => {
        setProductLoader(true)
        try {
            const payload = {
                page: 0,
                pageSize: pageSize,
                search: searchQuery,
            }

            const response = await getAllProductsApi(payload)

            if (response.es === 0 && response.data?.products) {
                setProductData(response.data.products)
            } else if (Array.isArray(response.data)) {
                setProductData(response.data)
            } else if (Array.isArray(response)) {
                setProductData(response)
            } else {
                setProductData([])
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'An error occurred while fetching products')
        }
        setProductLoader(false)
    }

    // Debounced search effect
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            handleGetAllProducts('')
            return
        }

        const timer = setTimeout(() => {
            setCurrentPage(1)
            handleGetAllProducts(search)
        }, 300)

        return () => clearTimeout(timer)
    }, [search])

    // Click outside to collapse if empty
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                if (!search) {
                    setIsSearchOpen(false)
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [search])

    const handleOpenSearch = () => {
        setIsSearchOpen(true)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 50)
    }

    const handleClearSearch = () => {
        setSearch('')
        setCurrentPage(1)
        if (!search) {
            setIsSearchOpen(false)
        }
    }

    const filteredProducts = productData.filter((product: any) => {
        if (!search) return true
        const term = search.toLowerCase()
        const name = (product.productName || product.name || '').toLowerCase()
        const sku = (product.sku || '').toLowerCase()
        const category = (product.category || '').toLowerCase()
        const barcode = (product.barcode || '').toLowerCase()
        return name.includes(term) || sku.includes(term) || category.includes(term) || barcode.includes(term)
    })

    // Pagination calculations
    const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1
    const startIndex = (currentPage - 1) * pageSize
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize)

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
                    {/* Standalone Minimalist Icon to Expanding Ultra-Smooth Search Bar */}
                    <div ref={searchRef} className="relative flex items-center">
                        <div
                            className={cn(
                                "relative flex h-10 items-center overflow-hidden transition-all duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                                isSearchOpen
                                    ? "w-48 sm:w-56 rounded-xl border border-zinc-300/80 bg-white/90 shadow-md backdrop-blur-xl ring-2 ring-zinc-900/5 dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:ring-zinc-100/10"
                                    : "w-10 rounded-full border border-zinc-200/80 bg-white/60 shadow-sm hover:border-zinc-300 hover:bg-zinc-100/80 dark:border-zinc-700/60 dark:bg-zinc-800/60 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/90"
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    if (!isSearchOpen) handleOpenSearch()
                                    else inputRef.current?.focus()
                                }}
                                className="flex size-10 items-center justify-center text-zinc-500 transition-all duration-500 shrink-0 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-90"
                                title="Search products"
                            >
                                {productLoader ? (
                                    <Loader2 className="size-4 animate-spin text-zinc-600 dark:text-zinc-300" />
                                ) : (
                                    <Search className={cn("size-4 transition-transform duration-700", isSearchOpen ? "scale-105 text-zinc-900 dark:text-zinc-100" : "scale-100")} />
                                )}
                            </button>

                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') {
                                        setSearch('')
                                        setIsSearchOpen(false)
                                    }
                                }}
                                placeholder="Search by product name..."
                                className={cn(
                                    "w-full bg-transparent py-2 pr-8 text-sm outline-none placeholder:text-muted-foreground/60 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
                                    isSearchOpen
                                        ? "opacity-100 translate-x-0 delay-200 pointer-events-auto"
                                        : "opacity-0 -translate-x-3 pointer-events-none"
                                )}
                            />

                            {isSearchOpen && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className={cn(
                                        "absolute right-2 flex size-6 items-center justify-center rounded-full text-zinc-400 transition-all duration-500 hover:bg-zinc-200/80 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 active:scale-90",
                                        search ? "opacity-100 scale-100" : "opacity-70 hover:opacity-100 scale-95"
                                    )}
                                    title="Clear or close search"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => setCreateOpen(true)}
                        className="inventory-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm"
                    >
                        <Plus className="inventory-create-btn-icon size-4" />
                        Create Product
                    </button>
                </div>
            </div>

            {(productData.length > 0 || search) && (
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
                        All Products ({filteredProducts.length})
                    </CardTitle>
                </CardHeader>
                <CardContent className="inventory-table-card-body p-0">
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
                            {productLoader ? (
                                <TableRow className="inventory-table-loading-row">
                                    <TableCell colSpan={6} className="py-12 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                                            <Loader2 className="size-6 animate-spin text-zinc-500" />
                                            <span>Loading products...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedProducts.length === 0 ? (
                                <TableRow className="inventory-table-empty-row">
                                    <TableCell colSpan={6} className="inventory-table-empty-cell py-12 text-center text-sm text-muted-foreground">
                                        {search ? `No products matching "${search}"` : 'No products found in this Inventory.'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedProducts.map((product: any) => {
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
                                                {product.category}
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
                    {filteredProducts.length > 0 && (
                        <div className="flex flex-col gap-3 px-6 py-4 border-t border-zinc-200/50 dark:border-zinc-700/40 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-xs text-muted-foreground">
                                    Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{startIndex + 1}</span> to{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{Math.min(startIndex + pageSize, filteredProducts.length)}</span> of{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{filteredProducts.length}</span> entries
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
            <ProductFormModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={() => handleGetAllProducts(search)} />
        </div>
    )
}

export default Inventory
