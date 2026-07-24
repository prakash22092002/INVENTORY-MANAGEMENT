import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Package,
    ArrowLeft,
    Edit,
    Tag,
    Box,
    Folder,
    Calendar,
    Clock,
    DollarSign,
    Loader2,
    Barcode,
    CheckCircle2,
    AlertTriangle,
    AlertCircle
} from 'lucide-react'
import { useEffect, useState } from 'react'

import ProductFormModal from './ProductFormModal'
import { getProductByIdApi } from '@/services/api/auth'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import type { Product as ModalProduct } from '@/types/inventory'

export interface ProductPreviewData {
    _id?: string
    id?: string
    productName?: string
    name?: string
    sku?: string
    category?: string
    barcode?: string
    price?: number
    stockQuantity?: number
    stock?: number
    description?: string
    stockAlert?: string
    status?: string
    createdAt?: string
    updatedAt?: string
}

const ProductPreview = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [editOpen, setEditOpen] = useState(false)

    const [productPreviewData, setProductPreviewData] = useState<ProductPreviewData | null>(null)
    const [productPreviewDataLoading, setProductPreviewDataLoading] = useState(true)

    const fetchProductPreviewData = async () => {
        try {
            setProductPreviewDataLoading(true)
            if (!id) {
                toast.error("Product ID not found")
                return
            }

            const data = await getProductByIdApi(id)

            if (data.es !== 0) {
                toast.error(data.data?.message || 'Failed to fetch Product by Id')
                return
            } else {
                setProductPreviewData(data.data?.product || null)
            }
        } catch (error) {
            console.log(error)
            toast.error("An error occurred while fetching product")
        } finally {
            setProductPreviewDataLoading(false)
        }
    }

    useEffect(() => {
        fetchProductPreviewData()
    }, [id])

    const getStockAlertBadge = (alertStatus?: string) => {
        const status = alertStatus?.toLowerCase() || 'in_stock'
        if (status === 'in_stock' || status === 'instock') {
            return (
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded-full px-3 py-0.5 text-xs font-semibold gap-1">
                    <CheckCircle2 className="size-3.5" />
                    In Stock
                </Badge>
            )
        } else if (status === 'low_stock' || status === 'lowstock') {
            return (
                <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 rounded-full px-3 py-0.5 text-xs font-semibold gap-1">
                    <AlertTriangle className="size-3.5" />
                    Low Stock
                </Badge>
            )
        } else {
            return (
                <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30 rounded-full px-3 py-0.5 text-xs font-semibold gap-1">
                    <AlertCircle className="size-3.5" />
                    Out of Stock
                </Badge>
            )
        }
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return 'N/A'
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })
        } catch {
            return dateStr
        }
    }

    const modalProduct: ModalProduct | undefined = productPreviewData ? {
        id: productPreviewData._id || productPreviewData.id || '',
        name: productPreviewData.productName || productPreviewData.name || '',
        sku: productPreviewData.sku || '',
        category: productPreviewData.category || '',
        price: productPreviewData.price || 0,
        stock: productPreviewData.stockQuantity ?? productPreviewData.stock ?? 0,
        barcode: productPreviewData.barcode || '',
        status: productPreviewData.stockAlert || productPreviewData.status || '',
        description: productPreviewData.description || '',
        createdAt: productPreviewData.createdAt || '',
        updatedAt: productPreviewData.updatedAt || '',
    } : undefined

    if (productPreviewDataLoading) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-32">
                <Loader2 className="size-10 animate-spin text-zinc-500" />
                <p className="text-sm font-medium text-muted-foreground">Loading product details...</p>
            </div>
        )
    }

    if (!productPreviewData || (!productPreviewData._id && !productPreviewData.id)) {
        return (
            <div className="product-preview-not-found flex flex-col items-center justify-center gap-4 py-24">
                <Package className="product-preview-not-found-icon size-12 text-zinc-300" />
                <h2 className="product-preview-not-found-title text-lg font-semibold">Product not found</h2>
                <p className="product-preview-not-found-desc text-sm text-muted-foreground">The product you're looking for doesn't exist.</p>
                <Link to="/inventory" className="product-preview-not-found-link inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    <ArrowLeft className="size-4" />
                    Back to Inventory
                </Link>
            </div>
        )
    }

    const productName = productPreviewData.productName || productPreviewData.name || 'Untitled Product'
    const stockQuantity = productPreviewData.stockQuantity ?? productPreviewData.stock ?? 0

    return (
        <div className="product-preview flex flex-col gap-6">
            <div className="product-preview-back">
                <button
                    onClick={() => navigate('/inventory')}
                    className="product-preview-back-btn inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                    <ArrowLeft className="product-preview-back-icon size-4" />
                    Back to Inventory
                </button>
            </div>

            {/* Hero Banner */}
            <div className="product-preview-hero flex flex-col gap-4 rounded-2xl border border-zinc-200/50 bg-white/60 p-6 shadow-sm shadow-zinc-900/5 backdrop-blur-xl sm:flex-row sm:items-start sm:justify-between dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <div className="product-preview-hero-info flex items-start gap-4">
                    <div className="product-preview-hero-icon-wrapper flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <Package className="product-preview-hero-icon size-7 text-zinc-500" />
                    </div>
                    <div className="product-preview-hero-text flex flex-col gap-2">
                        <div className="product-preview-hero-title-row flex items-center gap-3 flex-wrap">
                            <h1 className="product-preview-hero-name text-xl font-bold tracking-tight sm:text-2xl text-zinc-900 dark:text-zinc-100">
                                {productName}
                            </h1>
                            {getStockAlertBadge(productPreviewData.stockAlert || productPreviewData.status)}
                        </div>
                        <p className="product-preview-hero-desc max-w-lg text-sm text-muted-foreground">
                            {productPreviewData.description || 'No description provided.'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setEditOpen(true)}
                    className="product-preview-edit-btn inline-flex items-center gap-1.5 self-start rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm"
                >
                    <Edit className="product-preview-edit-icon size-4" />
                    Edit Product
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-zinc-200/50 bg-white/60 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                            <DollarSign className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Unit Price</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                ₹{productPreviewData.price?.toFixed(2) ?? '0.00'}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200/50 bg-white/60 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                            <Box className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stock Quantity</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                {stockQuantity} units
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-zinc-200/50 bg-white/60 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                            <Folder className="size-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</p>
                            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                {productPreviewData.category || 'Uncategorized'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Info Grid */}
            <Card className="product-preview-details border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="product-preview-details-header">
                    <CardTitle className="product-preview-details-title text-base font-semibold">
                        Product Specification & Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="product-preview-details-body">
                    <div className="product-preview-detail-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200/40 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                            <Tag className="size-5 text-zinc-500" />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    SKU Code
                                </span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {productPreviewData.sku || 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200/40 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                            <Barcode className="size-5 text-zinc-500" />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Barcode
                                </span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {productPreviewData.barcode || 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200/40 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                            <Folder className="size-5 text-zinc-500" />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Category
                                </span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {productPreviewData.category || 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200/40 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                            <Calendar className="size-5 text-zinc-500" />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Created At
                                </span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {formatDate(productPreviewData.createdAt)}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-zinc-200/40 bg-zinc-50/50 p-3.5 dark:border-zinc-800 dark:bg-zinc-800/40">
                            <Clock className="size-5 text-zinc-500" />
                            <div className="flex flex-col">
                                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    Last Updated
                                </span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {formatDate(productPreviewData.updatedAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stock History */}
            <Card className="product-preview-stock border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="product-preview-stock-header">
                    <CardTitle className="product-preview-stock-title text-base font-semibold">
                        Stock History & Movement
                    </CardTitle>
                </CardHeader>
                <CardContent className="product-preview-stock-body">
                    <div className="product-preview-stock-empty flex flex-col items-center justify-center gap-2 py-8">
                        <Box className="product-preview-stock-empty-icon size-8 text-zinc-300" />
                        <p className="product-preview-stock-empty-text text-sm text-muted-foreground">No stock history available yet.</p>
                    </div>
                </CardContent>
            </Card>

            <ProductFormModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                product={modalProduct}
                onSuccess={() => fetchProductPreviewData()}
            />
        </div>
    )
}

export default ProductPreview
