import { useEffect, useState } from 'react'
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
    FolderTree,
    Plus,
    Pencil,
    Trash2,
    Loader2,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import { toast } from 'sonner'
import type { Category } from '@/types/category'
import CategoryFormModal from './CategoryFormModal'
import SearchBar from '@/components/common/SearchBar'
import { deleteCategoryApi, getAllCategoriesApi } from '@/services/api/auth'

const Categories = () => {
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined)
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)

    // Pagination & search states
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalCategories, setTotalCategories] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    // delete
    const [deleteCategories, setDeleteCategories] = useState<boolean>(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleEdit = (category: Category) => {
        setEditingCategory(category)
        setModalOpen(true)
    }

    const handleDelete = async (_category: Category) => {
        const catId = _category._id || _category.id
        if (!catId) return

        setDeleteCategories(true)
        setDeletingId(catId)

        try {
            const response = await deleteCategoryApi(catId)

            if (response?.es === 0 || response?.statusCode === 200) {
                toast.success(response?.data?.message || 'Category deleted successfully')
                fetchCategories(currentPage, pageSize, searchQuery)
            } else {
                toast.error(response?.data?.message || 'Failed to delete category')
            }
        } catch (err: any) {
            console.error('Error deleting category:', err)
            const errorMsg = err?.response?.data?.data?.message || err?.message || 'Failed to delete category'
            toast.error(errorMsg)
        } finally {
            setDeleteCategories(false)
            setDeletingId(null)
        }
    }

    const handleClose = () => {
        setModalOpen(false)
        setEditingCategory(undefined)
    }

    const fetchCategories = async (
        page: number = currentPage,
        size: number = pageSize,
        search: string = searchQuery
    ) => {
        setLoading(true)
        try {
            const response = await getAllCategoriesApi({
                page: page - 1, // backend 0-indexed page
                pageSize: size,
                search: search,
            })

            const categoryData = response?.data?.category

            if (categoryData) {
                const list = categoryData?.categories || []
                const totalDoc = categoryData?.totalDocuments ?? list?.length
                const pages = categoryData?.totalPages || Math.ceil(totalDoc / size) || 1

                setCategories(list)
                setTotalCategories(totalDoc)
                setTotalPages(pages)

            } else {
                setCategories([])
                setTotalCategories(0)
                setTotalPages(1)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            setCategories([])
            setTotalCategories(0)
            setTotalPages(1)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCategories(currentPage, pageSize, searchQuery)
        }, 300)

        return () => clearTimeout(timer)
    }, [currentPage, pageSize, searchQuery])

    const startIndex = (currentPage - 1) * pageSize

    return (
        <div className="categories flex flex-col gap-6">
            <div className="categories-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="categories-header-info flex flex-col gap-1">
                    <h1 className="categories-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Categories
                    </h1>
                    <p className="categories-header-subtitle text-sm text-muted-foreground">
                        Organize your products into categories.
                    </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <SearchBar
                        value={searchQuery}
                        onChange={(val) => {
                            setSearchQuery(val)
                            setCurrentPage(1)
                        }}
                        onClear={() => {
                            setSearchQuery('')
                            setCurrentPage(1)
                        }}
                        placeholder="Search categories..."
                        loading={loading}
                    />

                    <button
                        onClick={() => {
                            setEditingCategory(undefined)
                            setModalOpen(true)
                        }}
                        className="categories-create-btn inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-800 dark:hover:bg-zinc-300"
                    >
                        <Plus className="categories-create-btn-icon size-4" />
                        Create Category
                    </button>
                </div>
            </div>

            <Card className="categories-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="categories-table-card-header">
                    <CardTitle className="categories-table-card-title text-sm font-semibold">
                        All Categories
                    </CardTitle>
                </CardHeader>
                <CardContent className="categories-table-card-body p-0 sm:p-6">
                    <Table className="categories-table">
                        <TableHeader className="categories-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Slug</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Description</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Products</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="categories-table-body">
                            {loading ? (
                                <TableRow className="categories-table-loading-row">
                                    <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="size-5 animate-spin text-zinc-500" />
                                            <span>Loading categories...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow className="categories-table-empty-row">
                                    <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                                        {searchQuery ? `No categories matching "${searchQuery}"` : 'No categories found.'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category, index) => {
                                    const name = category.categoryName || category.name || 'Unnamed Category'
                                    const key = category._id || category.id || index
                                    const status = category.status || 'Active'
                                    const productCount = category.productsCount ?? 0

                                    return (
                                        <TableRow
                                            key={key}
                                            onClick={() => navigate(`/inventory?category=${category.slug}`)}
                                            className="categories-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                        >
                                            <TableCell className="categories-table-cell categories-table-cell--name py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                        <FolderTree className="size-4 text-zinc-500" />
                                                    </div>
                                                    <span className="text-sm font-medium">{name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="categories-table-cell categories-table-cell--slug py-3 text-sm text-muted-foreground">
                                                {category.slug}
                                            </TableCell>
                                            <TableCell className="categories-table-cell categories-table-cell--description py-3 text-sm text-muted-foreground max-w-xs truncate">
                                                {category.description || '-'}
                                            </TableCell>
                                            <TableCell className="categories-table-cell categories-table-cell--products py-3 text-right text-sm">
                                                {productCount}
                                            </TableCell>
                                            <TableCell className="categories-table-cell categories-table-cell--status py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Badge
                                                        variant={status === 'Active' ? 'default' : 'secondary'}
                                                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                                    >
                                                        {status}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="categories-table-cell categories-table-cell--products py-3 text-right text-sm">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleEdit(category)
                                                        }}
                                                        className="flex size-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                                        title="Edit Category"
                                                    >
                                                        <Pencil className="size-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleDelete(category)
                                                        }}
                                                        disabled={Boolean(deleteCategories && deletingId === (category._id || category.id))}
                                                        className="flex size-7 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                                                        title="Delete Category"
                                                    >
                                                        {deleteCategories && deletingId === (category._id || category.id) ? (
                                                            <Loader2 className="size-3.5 animate-spin text-red-500 dark:text-red-400" />
                                                        ) : (
                                                            <Trash2 className="size-3.5 text-red-500 dark:text-red-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination Controls Footer */}
                    {totalCategories > 0 && (
                        <div className="flex flex-col gap-3 px-6 py-4 border-t border-zinc-200/50 dark:border-zinc-700/40 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-xs text-muted-foreground">
                                    Showing <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalCategories > 0 ? startIndex + 1 : 0}</span> to{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{Math.min(startIndex + categories.length, totalCategories)}</span> of{' '}
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totalCategories}</span> entries
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
                                    disabled={currentPage === 1 || loading}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="First Page"
                                >
                                    <ChevronsLeft className="size-4" />
                                </button>

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1 || loading}
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
                                    disabled={currentPage === totalPages || loading}
                                    className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-white/80 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-40 disabled:hover:bg-white dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:hover:bg-zinc-800"
                                    title="Next Page"
                                >
                                    <ChevronRight className="size-4" />
                                </button>

                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages || loading}
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

            <CategoryFormModal
                open={modalOpen}
                onClose={handleClose}
                onSuccess={() => fetchCategories(currentPage, pageSize, searchQuery)}
                category={editingCategory}
            />
        </div>
    )
}

export default Categories
