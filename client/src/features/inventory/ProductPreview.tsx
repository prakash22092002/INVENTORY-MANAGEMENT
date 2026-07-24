// import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, ArrowLeft, Edit, Tag, Box } from 'lucide-react'

// import ProductFormModal from './ProductFormModal'

const ProductPreview = () => {
    const navigate = useNavigate()
    // const [editOpen, setEditOpen] = useState(false)



    if (true) {
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

            <div className="product-preview-hero flex flex-col gap-4 rounded-2xl border border-zinc-200/50 bg-white/60 p-5 shadow-sm shadow-zinc-900/5 backdrop-blur-xl sm:flex-row sm:items-start sm:justify-between dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <div className="product-preview-hero-info flex items-start gap-4">
                    <div className="product-preview-hero-icon-wrapper flex size-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                        <Package className="product-preview-hero-icon size-7 text-zinc-500" />
                    </div>
                    <div className="product-preview-hero-text flex flex-col gap-1.5">
                        <div className="product-preview-hero-title-row flex items-center gap-2.5">
                            <h1 className="product-preview-hero-name text-xl font-semibold tracking-tight sm:text-2xl">{"name"}</h1>
                            <Badge
                                variant={"default"}
                                className="product-preview-hero-badge rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            >
                                {"status"}
                            </Badge>
                        </div>
                        <p className="product-preview-hero-desc max-w-lg text-sm text-muted-foreground">{"description"}</p>
                    </div>
                </div>
                <button
                    // onClick={() => setEditOpen(true)}
                    className="product-preview-edit-btn inline-flex items-center gap-1.5 self-start rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                >
                    <Edit className="product-preview-edit-icon size-4" />
                    Edit Product
                </button>
            </div>

            <Card className="product-preview-details border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="product-preview-details-header">
                    <CardTitle className="product-preview-details-title text-sm font-semibold">
                        Product Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="product-preview-details-body">
                    <div className="product-preview-detail-grid grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            <div
                                key={"id"}
                                className="product-preview-detail-item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
                            >
                                <Tag className="product-preview-detail-item-icon size-4 text-zinc-400" />
                                <div className="product-preview-detail-item-text flex flex-col">
                                    <span className="product-preview-detail-item-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        {"id"}
                                    </span>
                                    <span className="product-preview-detail-item-value text-sm font-medium">{"value"}</span>
                                </div>
                            </div>
                        }
                    </div>
                </CardContent>
            </Card>

            <Card className="product-preview-stock border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="product-preview-stock-header">
                    <CardTitle className="product-preview-stock-title text-sm font-semibold">
                        Stock History
                    </CardTitle>
                </CardHeader>
                <CardContent className="product-preview-stock-body">
                    <div className="product-preview-stock-empty flex flex-col items-center justify-center gap-2 py-8">
                        <Box className="product-preview-stock-empty-icon size-8 text-zinc-300" />
                        <p className="product-preview-stock-empty-text text-sm text-muted-foreground">No stock history available yet.</p>
                    </div>
                </CardContent>
            </Card>
            {/* <ProductFormModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                product={null}
            /> */}
        </div>
    )
}

export default ProductPreview
