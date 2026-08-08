import { categoryData } from "../../models/CategoryModal/CategoryModal";
import { addCategoryRepo, getCategoryRepo } from "../../repositories/categoryRepository";

const addCategoryService = async (categoryData: categoryData) => {
    const existCategory = await getCategoryRepo(categoryData);

    if (existCategory) {
        throw new Error("Category already exists");
    }

    const category = await addCategoryRepo(categoryData);
    return category;
};

export default addCategoryService;