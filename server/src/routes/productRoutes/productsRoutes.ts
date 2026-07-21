import { Router } from "express";
import addProductValidation from "../../validations/productValidation/addProductValidation";
import { addProductController } from "../../controllers/ProductController/productController";

const router = Router();

router.post('/add', addProductValidation, addProductController);

export default router;