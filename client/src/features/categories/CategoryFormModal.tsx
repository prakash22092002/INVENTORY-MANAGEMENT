import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/types/category'
import { createCategoryApi, editCategoryApi } from '@/services/api/auth'
import { toast } from 'sonner'

type CategoryFormData = {
    name: string
    slug: string
    description: string
    status: 'Active' | 'Inactive'
}

type CategoryFormModalProps = {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
    category?: Category
}

const emptyForm: CategoryFormData = {
    name: '',
    slug: '',
    description: '',
    status: 'Active',
}

const CategoryFormModal = ({ open, onClose, onSuccess, category }: CategoryFormModalProps) => {
    const [form, setForm] = useState<CategoryFormData>(emptyForm)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (category) {
            setForm({
                name: category.categoryName || category.name || '',
                slug: category.slug,
                description: category.description || '',
                status: category.status || 'Active',
            })
        } else {
            setForm(emptyForm)
        }
    }, [category, open])

    const handleChange = (field: keyof CategoryFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {

            let response

            if (isEdit) {
                const categoryId = category?._id || category?.id || ''
                const editCategoryPayload = {
                    _id: categoryId,
                    categoryName: form.name,
                    slug: form.slug,
                    description: form.description,
                    status: form.status,
                }
                response = await editCategoryApi(editCategoryPayload)
            } else {
                const createCategoryPayload = {
                    categoryName: form.name,
                    slug: form.slug,
                    description: form.description,
                    status: form.status,
                }
                response = await createCategoryApi(createCategoryPayload)
            }

            if (response?.statusCode === 200 || response?.statusCode === 201 || response?.es === 0) {
                toast.success(response?.data?.message || 'Category created successfully')
                onSuccess?.()
                onClose()
            } else {
                toast.error(response?.data?.message || 'Failed to create category')
            }
        } catch (error: any) {
            console.error('Error creating category:', error)
            const errorMessage =
                error?.response?.data?.data?.message ||
                error?.response?.data?.message ||
                error?.message ||
                'Failed to create category'
            toast.error(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    const isEdit = !!category

    const generateSlug = (name: string) =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    return (
        <>
            {open && (
                <div
                    className="category-form-modal-backdrop fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
                    onClick={() => !submitting && onClose()}
                />
            )}
            <div
                className={cn(
                    'category-form-modal-panel fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 shadow-2xl shadow-zinc-900/10 backdrop-blur-2xl transition-all duration-300 dark:border-zinc-700/40 dark:bg-zinc-900/80',
                    open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none',
                )}
            >
                <div className="category-form-modal-header flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                    <h2 className="category-form-modal-title text-base font-semibold">
                        {isEdit ? 'Edit Category' : 'Create Category'}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        className="category-form-modal-close-btn flex size-7 items-center justify-center rounded-lg transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800"
                    >
                        <X className="category-form-modal-close-icon size-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="category-form-modal-form space-y-4 px-5 py-4">
                    <div className="category-form-modal-field">
                        <label className="category-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => {
                                const val = e.target.value
                                handleChange('name', val)
                                if (!isEdit) {
                                    handleChange('slug', generateSlug(val))
                                }
                            }}
                            required
                            disabled={submitting}
                            className="category-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                            placeholder="Electronics"
                        />
                    </div>

                    <div className="category-form-modal-field">
                        <label className="category-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => handleChange('slug', e.target.value)}
                            required
                            disabled={submitting}
                            className="category-form-modal-input h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                            placeholder="electronics"
                        />
                    </div>

                    <div className="category-form-modal-field">
                        <label className="category-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            rows={3}
                            disabled={submitting}
                            className="category-form-modal-textarea w-full resize-none rounded-lg border border-zinc-200 bg-white/60 px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                            placeholder="Category description..."
                        />
                    </div>

                    <div className="category-form-modal-field">
                        <label className="category-form-modal-field-label text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Status
                        </label>
                        <select
                            value={form.status}
                            onChange={(e) => handleChange('status', e.target.value as 'Active' | 'Inactive')}
                            disabled={submitting}
                            className="category-form-modal-select h-9 w-full rounded-lg border border-zinc-200 bg-white/60 px-3 text-sm outline-none transition-colors focus:border-zinc-400 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:focus:border-zinc-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="category-form-modal-actions flex items-center justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="category-form-modal-cancel-btn rounded-lg px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-100/70 hover:text-zinc-800 disabled:opacity-50 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="category-form-modal-submit-btn inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                        >
                            {submitting && <Loader2 className="size-4 animate-spin text-current" />}
                            {isEdit ? 'Save Changes' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CategoryFormModal
