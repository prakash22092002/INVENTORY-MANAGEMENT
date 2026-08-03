import { Category, categoryData } from "../models/CategoryModal/CategoryModal";


export const getAllCategoryRepo = async ({ page = 0, pageSize = 10, search }: { page?: number; pageSize?: number; search?: string } = {}) => {

    const query: any = {};

    if (search && search.trim().length > 0) {
        query.categoryName = { $regex: search, $options: "i" };
    }

    const pageNum = Number(page) || 0;
    const limitNum = Number(pageSize) || 10;
    const skip = pageNum * limitNum;

    const category = await Category.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

    const totalDocuments = await Category.countDocuments(query);

    const totalPages = Math.ceil(totalDocuments / limitNum);

    return { category, totalDocuments, totalPages, currentPage: pageNum };
}

export const getCategoryRepo = async (categoryName?: string, slug?: string) => {
    const category = await Category.findOne({ categoryName, slug });
    return category;
}


export const addCategoryRepo = async (categoryData: categoryData) => {
    const category = await Category.create(categoryData);

    if (!category) {
        throw new Error("Failed to create category");
    }

    const saveCategory = await category.save();
    return saveCategory;
}
