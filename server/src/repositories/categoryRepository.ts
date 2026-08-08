import { Category, categoryData } from "../models/CategoryModal/CategoryModal";


export const getAllCategoryRepo = async ({ page = 0, pageSize = 10, search }: { page?: number; pageSize?: number; search?: string } = {}) => {

    const query: any = {};

    if (search && search.trim().length > 0) {
        query.categoryName = { $regex: search, $options: "i" };
    }

    const pageNum = Number(page) || 0;
    const limitNum = Number(pageSize) || 10;
    const skip = pageNum * limitNum;


    const totalDocuments = await Category.countDocuments(query);

    const totalPages = Math.ceil(totalDocuments / limitNum);

    const categories = await Category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "categoryName",
                foreignField: "category",
                as: "products"
            }
        },
        {
            $project: {
                id: 1,
                categoryName: 1,
                slug: 1,
                createdAt: 1,
                updatedAt: 1,
                products: 1,
                productsCount: { $size: "$products" },
                description: 1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limitNum
        }
    ])

    return { categories, totalDocuments, totalPages, currentPage: pageNum };
}

export const getCategoryRepo = async (categoryData: categoryData) => {
    const category = await Category.findOne({ categoryName: categoryData.categoryName, slug: categoryData.slug });
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


export const deleteCategoryRepo = async (categoryId: string) => {
    const categoryPresent = await Category.findById(categoryId);

    if (!categoryPresent) {
        throw new Error("Category not found");
    }

    const categoryToDelete = await Category.findByIdAndDelete(categoryId);

    if (!categoryToDelete) {
        throw new Error("Failed to delete category");
    }

    return categoryToDelete;

}

export const editCategoryRepo = async (categoryData: categoryData) => {
    const { _id } = categoryData;

    const category = await Category.findByIdAndUpdate(_id, categoryData, { new: true });

    if (!category) {
        throw new Error("Category not found")
    }

    return category;

}