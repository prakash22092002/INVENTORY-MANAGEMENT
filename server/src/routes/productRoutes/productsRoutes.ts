import { Router } from "express";
import addProductValidation from "../../validations/productValidation/addProductValidation";
import { addProductController, deleteProductController, editProductController, getProductByIdController, getProductController } from "../../controllers/ProductController/productController";
import getAllProductvalidation from "../../validations/productValidation/getProductValidation";
import editProductValidation from "../../validations/productValidation/editProductValidation";
import { deleteProductValidation } from "../../validations/productValidation/deleteProductValidation";

const router = Router();

router.post('/', getAllProductvalidation, getProductController)

router.get('/:productId', getProductByIdController)

router.post('/add', addProductValidation, addProductController);

router.post('/edit', editProductValidation, editProductController)

router.get('/delete/:productId', deleteProductValidation, deleteProductController)

export default router;