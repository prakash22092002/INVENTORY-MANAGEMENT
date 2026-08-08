import { Category, categoryData } from "../../models/CategoryModal/CategoryModal"
import { editCategoryRepo } from "../../repositories/categoryRepository";




const editCategoryService = async (categoryData: categoryData) => {
    try {
        const category = await editCategoryRepo(categoryData);

        return category
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update category"
        throw new Error(message)
    }
}

export default editCategoryService