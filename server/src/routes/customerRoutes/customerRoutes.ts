import { Router } from "express";
import { addCustomerController } from "../../controllers/CustomerController/CustomerController";
import { addCustomerValidation } from "../../validations/customerValidation/addCustomerValidation";

const router = Router();

router.post('/add', addCustomerValidation, addCustomerController);

export default router;