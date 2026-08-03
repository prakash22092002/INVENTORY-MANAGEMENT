import { getAllCategoryRepo } from "../../repositories/categoryRepository";

export const getCategoryService = async ({ page, pageSize, search }: { page?: number; pageSize?: number; search?: string } = {}) => {
    const category = await getAllCategoryRepo({ page, pageSize, search });
    return category;
};