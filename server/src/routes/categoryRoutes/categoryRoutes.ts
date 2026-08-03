import { Router } from "express";
import addCategoryValidation from "../../validations/categoryValidation/addCategoryValidation";
import { addCategoryController, getCategoryController } from "../../controllers/CategoryController/CategoryController";


const router = Router()


router.post('/add', addCategoryValidation, addCategoryController);

router.post('/', getCategoryController)



export default router