import { useState } from 'react'
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
import { FolderTree, Plus, Pencil } from 'lucide-react'
import type { Category } from '@/types/category'
import { mockCategories } from '@/data/categories'
import CategoryFormModal from './CategoryFormModal'

const Categories = () => {
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined)

    const handleEdit = (category: Category) => {
        setEditingCategory(category)
        setModalOpen(true)
    }

    const handleClose = () => {
        setModalOpen(false)
        setEditingCategory(undefined)
    }

    return (
        <div className="categories flex flex-col gap-6">
            <div className="categories-header flex items-center justify-between">
                <div className="categories-header-info flex flex-col gap-1">
                    <h1 className="categories-header-title text-2xl font-semibold tracking-tight sm:text-3xl">
                        Categories
                    </h1>
                    <p className="categories-header-subtitle text-sm text-muted-foreground">
                        Organize your products into categories.
                    </p>
                </div>
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

            <Card className="categories-table-card border-zinc-200/50 bg-white/60 shadow-sm shadow-zinc-900/5 backdrop-blur-xl dark:border-zinc-700/40 dark:bg-zinc-900/50">
                <CardHeader className="categories-table-card-header">
                    <CardTitle className="categories-table-card-title text-sm font-semibold">
                        All Categories
                    </CardTitle>
                </CardHeader>
                <CardContent className="categories-table-card-body">
                    <Table className="categories-table">
                        <TableHeader className="categories-table-header">
                            <TableRow className="border-zinc-200/50 dark:border-zinc-700/40">
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Category</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Slug</TableHead>
                                <TableHead className="h-9 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Description</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Products</TableHead>
                                <TableHead className="h-9 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="categories-table-body">
                            {mockCategories.map((category) => (
                                <TableRow
                                    key={category.id}
                                    onClick={() => navigate(`/inventory?category=${category.slug}`)}
                                    className="categories-table-row cursor-pointer border-zinc-200/50 transition-colors hover:bg-zinc-100/50 dark:border-zinc-700/40 dark:hover:bg-zinc-800/40"
                                >
                                    <TableCell className="categories-table-cell categories-table-cell--name py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                                <FolderTree className="size-4 text-zinc-500" />
                                            </div>
                                            <span className="text-sm font-medium">{category.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="categories-table-cell categories-table-cell--slug py-3 text-sm text-muted-foreground">
                                        {category.slug}
                                    </TableCell>
                                    <TableCell className="categories-table-cell categories-table-cell--description py-3 text-sm text-muted-foreground max-w-xs truncate">
                                        {category.description}
                                    </TableCell>
                                    <TableCell className="categories-table-cell categories-table-cell--products py-3 text-right text-sm">
                                        {category.productCount}
                                    </TableCell>
                                    <TableCell className="categories-table-cell categories-table-cell--status py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Badge
                                                variant={category.status === 'Active' ? 'default' : 'secondary'}
                                                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                            >
                                                {category.status}
                                            </Badge>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEdit(category)
                                                }}
                                                className="flex size-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                                            >
                                                <Pencil className="size-3.5" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <CategoryFormModal
                open={modalOpen}
                onClose={handleClose}
                category={editingCategory}
            />
        </div>
    )
}

export default Categories
