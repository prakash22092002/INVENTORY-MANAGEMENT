import { deleteCategoryRepo } from "../../repositories/categoryRepository";

export const deleteCategoryService = async (categoryId: string) => {

    try {

        const categoryService = await deleteCategoryRepo(categoryId);
        return categoryService;

    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Failed to delete category";
        throw new Error(message);
    }

}