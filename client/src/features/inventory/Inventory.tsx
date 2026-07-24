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
import { Package, Plus, X, Loader2 } from 'lucide-react'

import ProductFormModal from './ProductFormModal'
import { getAllProductsApi } from '@/services/api/auth'

const Inventory = () => {
    const navigate = useNavigate()
    const [createOpen, setCreateOpen] = useState(false)

    const [productLoader, setProductLoader] = useState(false);
    const [productData, setProductData] = useState<any[]>([]);


    const handleGetAllProducts = async () => {
        setProductLoader(true);
        try {

            const payload = {
                page: 0,
                pageSize: 50,
                search: ""
            }

            const response = await getAllProductsApi(payload);

            if (response.es === 0 && response.data?.products) {
                setProductData(response.data.products);
            } else if (Array.isArray(response.data)) {
                setProductData(response.data);
            } else if (Array.isArray(response)) {
                setProductData(response);
            } else {
                setProductData([]);
            }
        } catch (error) {
            console.log(error);
        }
        setProductLoader(false);
    }

    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        handleGetAllProducts();
    }, []);



    return (
        <div className="inventory flex flex-col gap-6">
            <div className="inventory-header flex items-center justify-between">
                <div className="inventory-header-info flex flex-col gap-1">
                    <h1 className="inventory-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Inventory
                    </h1>
                    <p className="inventory-header-subtitle text-sm text-muted-foreground">
                        Manage your products and stock levels.
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

            {productData.length > 0 && (
                <div className="inventory-filter-bar flex items-center gap-2">
                    <span className="inventory-filter-label text-sm text-muted-foreground">Filtered by:</span>
                    <Badge
                        variant="outline"
                        className="inventory-filter-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    >
                        <span className="inventory-filter-badge-text">All Products</span>
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
                        All Products
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
                                        No products found in this Inventory.
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
                                                {product.category}
                                            </TableCell>
                                            <TableCell className="inventory-table-cell inventory-table-cell--price py-3 text-right text-sm font-medium">
                                                ${price.toFixed(2)}
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
                </CardContent>
            </Card>
            <ProductFormModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={handleGetAllProducts} />
        </div>
    )
}

export default Inventory
