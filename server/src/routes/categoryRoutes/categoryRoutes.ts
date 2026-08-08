import { Router } from "express";
import addCategoryValidation from "../../validations/categoryValidation/addCategoryValidation";
import { addCategoryController, deleteCategoryController, getCategoryController } from "../../controllers/CategoryController/CategoryController";


const router = Router()


router.post('/add', addCategoryValidation, addCategoryController);

router.post('/', getCategoryController)

router.delete(`/delete/:categoryId`, deleteCategoryController)



export default router