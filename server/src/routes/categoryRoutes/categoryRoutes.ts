import { Router } from "express";
import addCategoryValidation from "../../validations/categoryValidation/addCategoryValidation";
import { addCategoryController, deleteCategoryController, editCategoryController, getCategoryController } from "../../controllers/CategoryController/CategoryController";
import editCategoryValidation from "../../validations/categoryValidation/editCategoryValidation";

const router = Router()


router.post('/add', addCategoryValidation, addCategoryController);

router.post(`/edit`, editCategoryValidation, editCategoryController)

router.post('/', getCategoryController)

router.delete(`/delete/:categoryId`, deleteCategoryController)



export default router