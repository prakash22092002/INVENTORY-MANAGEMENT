import { Router } from "express";
import addProductValidation from "../../validations/productValidation/addProductValidation";
import { addProductController, getProductController } from "../../controllers/ProductController/productController";
import getAllProductvalidation from "../../validations/productValidation/getProductValidation";

const router = Router();

router.post('/', getAllProductvalidation, getProductController)

router.post('/add', addProductValidation, addProductController);

export default router;