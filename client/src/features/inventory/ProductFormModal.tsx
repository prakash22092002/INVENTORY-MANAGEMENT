import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/types/inventory'
import type { CreateProductPayload } from '@/types/auth'
import { toast } from 'sonner'
import { createProductApi } from '@/services/api/auth'

const categories = ['Electronics', 'Accessories', 'Peripherals', 'Cables', 'Storage']

type ProductFormData = {
    name: string
    sku: string
    category: string
    price: string
    stock: string
    barcode: string
    description: string
}

type ProductFormModalProps = {
    open: boolean
    onClose: () => void
    product?: Product
    onSuccess?: () => void
}

const emptyForm: ProductFormData = {
    name: '',
    sku: '',
    category: 'Electronics',
    price: '',
    stock: '',
    barcode: '',
    description: '',
}

const ProductFormModal = ({ open, onClose, product, onSuccess }: ProductFormModalProps) => {
    const [form, setForm] = useState<ProductFormData>(emptyForm)
    const [formLoader, setFormLoader] = useState<boolean>(false)

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                sku: product.sku,
                category: product.category,
                price: product.price.toString(),
                stock: product.stock.toString(),
                barcode: product.barcode.toString(),
                description: product.description,
            })
        } else {
            setForm(emptyForm)
        }
    }, [product, open])

    const handleChange = (field: keyof ProductFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {

        try {

            e.preventDefault()
            setFormLoader(true)

            const formData: CreateProductPayload = {
                productName: form.name,
                sku: form.sku,
                category: form.category,
                barcode: form.barcode,
                price: parseFloat(form.price),
                stockQuantity: parseInt(form.stock),
                description: form.description,
            }

            const response = await createProductApi(formData);

            if (response?.es === 0) {
                toast.success(response?.data?.message || 'Product created successfully');
                onSuccess?.();
            } else {
                toast.error(response?.data?.message || 'Failed to create product');
            }

            setForm(emptyForm)
            onClose()

        } catch (err) {
            toast.error('Failed to create product');
        }
        finally {
            setFormLoader(false)
        }

    }

    const isEdit = !!product

    return (
        <>
            {open && (
                <div
                    className="product-form-modal-backdrop fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
                    onClick={onClose}
                />
            )}
            <div
                className={cn(
                    'product-form-modal-panel fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-2xl shadow-zinc-900/10 backdrop-blur-2xl transition-all duration-300 dark:border-zinc-700/40 dark:bg-zinc-900/80',
                    open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
                )}
            >
                <div className="product-form-modal-header flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                    <h2 className="product-form-modal-title text-base font-semibold">
                        {isEdit ? 'Edit Product' : 'Create Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="product-form-modal-close-btn flex size-7 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <X className="product-form-modal-close-icon size-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="product-form-modal-form space-y-4 px-5 py-4">
                    <div className="product-form-modal-field-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="product-form-modal-field">
                            <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                required
                                className="product-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                                placeholder="Wireless Mouse"
                            />
                        </div>
                        <div className="product-form-modal-field">
                            <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                SKU
                            </label>
                            <input
                                type="text"
                                value={form.sku}
                                onChange={(e) => handleChange('sku', e.target.value)}
                                required
                                className="product-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                                placeholder="WM-001"
                            />
                        </div>
                        <div className="product-form-modal-field">
                            <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Category
                            </label>
                            <select
                                value={form.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className="product-form-modal-select h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="product-form-modal-field">
                            <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Barcode
                            </label>
                            <input
                                type="text"
                                value={form.barcode}
                                onChange={(e) => handleChange('barcode', e.target.value)}
                                required
                                className="product-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                                placeholder="Add Barcode"
                            />
                        </div>
                        <div className="product-form-modal-field">
                            <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={form.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                required
                                className="product-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                                placeholder="Add Price"
                            />
                        </div>
                        <div className="product-form-modal-field">
                            <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={form.stock}
                                onChange={(e) => handleChange('stock', e.target.value)}
                                required
                                className="product-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                                placeholder="Add Stock Quantity"
                            />
                        </div>
                    </div>

                    <div className="product-form-modal-field product-form-modal-field--description">
                        <label className="product-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={3}
                            className="product-form-modal-textarea w-full resize-none rounded-lg border border-zinc-200 bg-white/60 px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                            placeholder="Add Description"
                        />
                    </div>

                    <div className="product-form-modal-actions flex items-center justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="product-form-modal-cancel-btn rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100/70 hover:text-zinc-800 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={formLoader}
                            type="submit"
                            className="product-form-modal-submit-btn rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                        >
                            {formLoader ? 'Creating...' : (isEdit ? 'Save Changes' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProductFormModal
