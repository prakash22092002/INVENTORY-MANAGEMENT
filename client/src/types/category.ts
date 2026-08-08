export interface Category {
    _id?: string
    id?: string
    name?: string
    categoryName?: string
    slug: string
    description?: string
    productsCount?: number
    status?: 'Active' | 'Inactive'
    createdAt?: string
}

export interface CreateCategoryPayload {
    categoryName: string,
    slug: string,
    description?: string,
}

export interface EditCategoryPayload {
    categoryId: string,
    categoryName?: string,
    slug?: string,
    description?: string,
}

export interface getCategoryPayload {
    page?: number;
    pageSize?: number;
    search?: string;
}